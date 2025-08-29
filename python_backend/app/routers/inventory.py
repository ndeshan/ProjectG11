from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.database import get_db
from database.models import MenuItem, Inventory, StockAlert
from app.schemas import InventoryCreate, InventoryUpdate, StockAlertResponse
from datetime import datetime, timedelta
from typing import List

router = APIRouter(prefix="/inventory", tags=["inventory"])

@router.get("/menu-items/availability")
async def check_menu_availability(db: Session = Depends(get_db)):
    """Check availability of all menu items"""
    items = db.query(MenuItem).all()
    availability = []
    
    for item in items:
        is_available = (
            item.is_available and 
            item.stock_quantity > 0 and 
            item.daily_orders_count < item.max_daily_orders
        )
        
        availability.append({
            "id": item.id,
            "name": item.name,
            "stock_quantity": item.stock_quantity,
            "daily_orders_count": item.daily_orders_count,
            "max_daily_orders": item.max_daily_orders,
            "is_available": is_available,
            "availability_reason": get_availability_reason(item)
        })
    
    return availability

@router.get("/alerts")
async def get_stock_alerts(db: Session = Depends(get_db)):
    """Get all active stock alerts"""
    alerts = db.query(StockAlert).filter(StockAlert.is_resolved == False).all()
    return alerts

@router.post("/check-stock/{menu_item_id}")
async def check_item_stock(menu_item_id: int, quantity: int, db: Session = Depends(get_db)):
    """Check if item has sufficient stock for order"""
    item = db.query(MenuItem).filter(MenuItem.id == menu_item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Menu item not found")
    
    can_fulfill = (
        item.is_available and
        item.stock_quantity >= quantity and
        (item.daily_orders_count + quantity) <= item.max_daily_orders
    )
    
    return {
        "can_fulfill": can_fulfill,
        "available_quantity": min(item.stock_quantity, item.max_daily_orders - item.daily_orders_count),
        "reason": get_availability_reason(item) if not can_fulfill else "Available"
    }

@router.post("/update-stock/{menu_item_id}")
async def update_item_stock(menu_item_id: int, quantity_used: int, db: Session = Depends(get_db)):
    """Update stock after order placement"""
    item = db.query(MenuItem).filter(MenuItem.id == menu_item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Menu item not found")
    
    # Update stock and daily orders
    item.stock_quantity = max(0, item.stock_quantity - quantity_used)
    item.daily_orders_count += quantity_used
    item.updated_at = datetime.utcnow()
    
    # Check for low stock alert
    if item.stock_quantity <= item.min_stock_level:
        create_stock_alert(db, item, "low_stock")
    
    # Check if item should be marked unavailable
    if item.stock_quantity == 0 or item.daily_orders_count >= item.max_daily_orders:
        item.is_available = False
        create_stock_alert(db, item, "out_of_stock")
    
    db.commit()
    return {"message": "Stock updated successfully", "remaining_stock": item.stock_quantity}

@router.post("/restock/{menu_item_id}")
async def restock_item(menu_item_id: int, quantity: int, db: Session = Depends(get_db)):
    """Restock menu item"""
    item = db.query(MenuItem).filter(MenuItem.id == menu_item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Menu item not found")
    
    item.stock_quantity += quantity
    item.is_available = True
    item.updated_at = datetime.utcnow()
    
    # Resolve low stock alerts
    alerts = db.query(StockAlert).join(Inventory).filter(
        Inventory.menu_item_id == menu_item_id,
        StockAlert.is_resolved == False
    ).all()
    
    for alert in alerts:
        alert.is_resolved = True
        alert.resolved_at = datetime.utcnow()
    
    db.commit()
    return {"message": "Item restocked successfully", "new_stock": item.stock_quantity}

@router.post("/reset-daily-counts")
async def reset_daily_counts(db: Session = Depends(get_db)):
    """Reset daily order counts (run daily)"""
    db.query(MenuItem).update({"daily_orders_count": 0})
    db.commit()
    return {"message": "Daily counts reset successfully"}

def get_availability_reason(item: MenuItem) -> str:
    """Get reason why item is not available"""
    if not item.is_available:
        return "Manually disabled"
    if item.stock_quantity <= 0:
        return "Out of stock"
    if item.daily_orders_count >= item.max_daily_orders:
        return "Daily limit reached"
    return "Available"

def create_stock_alert(db: Session, item: MenuItem, alert_type: str):
    """Create stock alert"""
    messages = {
        "low_stock": f"Low stock alert: {item.name} has only {item.stock_quantity} units left",
        "out_of_stock": f"Out of stock: {item.name} is no longer available"
    }
    
    alert = StockAlert(
        inventory_id=None,  # Direct menu item alert
        alert_type=alert_type,
        message=messages.get(alert_type, "Stock alert"),
        created_at=datetime.utcnow()
    )
    db.add(alert)