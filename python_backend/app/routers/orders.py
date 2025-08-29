from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.database import get_db
from database.connection_pool import get_optimized_db
from database.models import Order, User, Canteen, MenuItem
from app.schemas import OrderCreate, OrderResponse
from app.services.notification import notification_service
from typing import List
from app.realtime import broadcast_event
import asyncio
import random
import string
from datetime import datetime, timedelta
import logging

router = APIRouter(prefix="/orders", tags=["orders"])

# Set up logging
logger = logging.getLogger(__name__)

def generate_order_number():
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))

@router.get("/", response_model=List[OrderResponse])
def get_orders(db: Session = Depends(get_db)):
    try:
        orders = db.query(Order).order_by(Order.created_at.desc()).all()
        return orders
    except Exception as e:
        logger.error(f"Error fetching orders: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching orders")

@router.post("/", response_model=OrderResponse)
async def create_order(order: OrderCreate, db: Session = Depends(get_db)):
    try:
        # Check inventory availability for all items
        for item in order.items:
            menu_item = db.query(MenuItem).filter(MenuItem.id == item['id']).first()
            if not menu_item:
                raise HTTPException(status_code=404, detail=f"Menu item {item['id']} not found")
            
            quantity = item.get('quantity', 1)
            
            # Check availability
            if not menu_item.is_available:
                raise HTTPException(status_code=400, detail=f"{menu_item.name} is currently unavailable")
            
            if menu_item.stock_quantity < quantity:
                raise HTTPException(status_code=400, detail=f"Insufficient stock for {menu_item.name}. Available: {menu_item.stock_quantity}")
            
            if (menu_item.daily_orders_count + quantity) > menu_item.max_daily_orders:
                remaining = menu_item.max_daily_orders - menu_item.daily_orders_count
                raise HTTPException(status_code=400, detail=f"Daily limit reached for {menu_item.name}. Remaining: {remaining}")
        
        # Update inventory for all items
        for item in order.items:
            menu_item = db.query(MenuItem).filter(MenuItem.id == item['id']).first()
            quantity = item.get('quantity', 1)
            
            menu_item.stock_quantity -= quantity
            menu_item.daily_orders_count += quantity
            
            # Mark as unavailable if stock is depleted
            if menu_item.stock_quantity <= 0 or menu_item.daily_orders_count >= menu_item.max_daily_orders:
                menu_item.is_available = False
        
        order_number = generate_order_number()
        pickup_time = datetime.utcnow() + timedelta(minutes=20)
        
        db_order = Order(
            user_id=1,
            canteen_id=order.canteen_id,
            order_number=order_number,
            items=order.items,
            total_amount=order.total_amount,
            payment_method=order.payment_method,
            status="pending",
            payment_status="confirmed",
            pickup_time=pickup_time
        )
        
        db.add(db_order)
        db.commit()
        db.refresh(db_order)

        user = db.query(User).filter(User.id == 1).first()
        
        order_data = {
            'order_number': db_order.order_number,
            'total_amount': str(db_order.total_amount),
            'status': db_order.status,
            'items': db_order.items,
            'pickup_time': pickup_time.strftime('%I:%M %p')
        }

        if user:
            try:
                await notification_service.send_order_email(user.email, order_data)
                await notification_service.send_order_sms(user.phone, order_data)
            except Exception as e:
                logger.error(f"Error sending notifications: {str(e)}")

        try:
            await broadcast_event('order_created', {
                'order': {
                    'id': db_order.id,
                    'order_number': db_order.order_number,
                    'status': db_order.status,
                    'total_amount': str(db_order.total_amount),
                    'pickup_time': pickup_time.isoformat(),
                    'items_count': len(db_order.items)
                }
            })
        except Exception as e:
            logger.error(f"Error broadcasting order created event: {str(e)}")
        
        return db_order
        
    except Exception as e:
        logger.error(f"Error creating order: {str(e)}")
        raise HTTPException(status_code=500, detail="Error creating order")

@router.get("/{order_id}", response_model=OrderResponse)
def get_order(order_id: int, db: Session = Depends(get_db)):
    try:
        order = db.query(Order).filter(Order.id == order_id).first()
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        return order
    except Exception as e:
        logger.error(f"Error fetching order {order_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching order")

@router.patch("/{order_id}/status")
def update_order_status(order_id: int, status: str, db: Session = Depends(get_db)):
    try:
        order = db.query(Order).filter(Order.id == order_id).first()
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        
        order.status = status
        if status == "ready":
            order.ready_at = datetime.utcnow()
        
        db.commit()

        # Broadcast order status update
        try:
            asyncio.create_task(broadcast_event('order_updated', {
                'order_id': order.id,
                'status': order.status,
                'ready_at': order.ready_at.isoformat() if order.ready_at else None,
            }))
        except Exception as e:
            logger.error(f"Error broadcasting order update event: {str(e)}")

        return {"message": "Order status updated successfully"}
        
    except Exception as e:
        logger.error(f"Error updating order status: {str(e)}")
        raise HTTPException(status_code=500, detail="Error updating order status")
