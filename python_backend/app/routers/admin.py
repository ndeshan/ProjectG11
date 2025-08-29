from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database.database import get_db
from database.models import User, MenuItem, Order, Canteen
from app.schemas import MenuItemResponse
from app.middleware.security import verify_admin_token, JWTBearer, rate_limit
from app.auth import create_access_token
from typing import List
import bcrypt

router = APIRouter(prefix="/admin", tags=["admin"])

@router.post("/login")
@rate_limit(max_requests=5, window=300)  # 5 attempts per 5 minutes
async def admin_login(username: str, password: str):
    # Simple admin authentication
    if username == "admin" and password == "admin123":
        token = create_access_token(data={"sub": "admin", "role": "admin"})
        return {"access_token": token, "token_type": "bearer", "role": "admin"}
    raise HTTPException(status_code=401, detail="Invalid credentials")

@router.get("/dashboard")
async def get_dashboard_stats(token: str = Depends(JWTBearer()), db: Session = Depends(get_db)):
    if not verify_admin_token(token):
        raise HTTPException(status_code=403, detail="Admin access required")
    
    total_orders = db.query(Order).count()
    pending_orders = db.query(Order).filter(Order.status == "pending").count()
    total_revenue = db.query(Order).filter(Order.status == "completed").count() * 150  # Estimate
    total_users = db.query(User).count()
    
    return {
        "total_orders": total_orders,
        "pending_orders": pending_orders,
        "total_revenue": total_revenue,
        "total_users": total_users,
        "active_menu_items": db.query(MenuItem).filter(MenuItem.is_available == True).count()
    }

@router.get("/orders")
async def get_all_orders(token: str = Depends(JWTBearer()), db: Session = Depends(get_db)):
    if not verify_admin_token(token):
        raise HTTPException(status_code=403, detail="Admin access required")
    
    orders = db.query(Order).order_by(Order.created_at.desc()).all()
    return {"orders": orders}

@router.patch("/orders/{order_id}/status")
async def update_order_status_admin(
    order_id: int, 
    status: str, 
    token: str = Depends(JWTBearer()), 
    db: Session = Depends(get_db)
):
    if not verify_admin_token(token):
        raise HTTPException(status_code=403, detail="Admin access required")
    
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    order.status = status
    db.commit()
    return {"message": "Order status updated successfully"}

@router.post("/menu-items")
async def create_menu_item(
    item_data: dict,
    token: str = Depends(JWTBearer()),
    db: Session = Depends(get_db)
):
    if not verify_admin_token(token):
        raise HTTPException(status_code=403, detail="Admin access required")
    
    menu_item = MenuItem(
        canteen_id=item_data.get("canteen_id", 1),
        name=item_data["name"],
        name_tamil=item_data.get("name_tamil"),
        description=item_data.get("description"),
        price=item_data["price"],
        category=item_data["category"],
        image_url=item_data.get("image_url"),
        is_available=True
    )
    
    db.add(menu_item)
    db.commit()
    db.refresh(menu_item)
    
    return {"message": "Menu item created successfully", "item": menu_item}

@router.put("/menu-items/{item_id}")
async def update_menu_item(
    item_id: int,
    item_data: dict,
    token: str = Depends(JWTBearer()),
    db: Session = Depends(get_db)
):
    if not verify_admin_token(token):
        raise HTTPException(status_code=403, detail="Admin access required")
    
    menu_item = db.query(MenuItem).filter(MenuItem.id == item_id).first()
    if not menu_item:
        raise HTTPException(status_code=404, detail="Menu item not found")
    
    for key, value in item_data.items():
        setattr(menu_item, key, value)
    
    db.commit()
    return {"message": "Menu item updated successfully"}

@router.delete("/menu-items/{item_id}")
async def delete_menu_item(
    item_id: int,
    token: str = Depends(JWTBearer()),
    db: Session = Depends(get_db)
):
    if not verify_admin_token(token):
        raise HTTPException(status_code=403, detail="Admin access required")
    
    menu_item = db.query(MenuItem).filter(MenuItem.id == item_id).first()
    if not menu_item:
        raise HTTPException(status_code=404, detail="Menu item not found")
    
    db.delete(menu_item)
    db.commit()
    return {"message": "Menu item deleted successfully"}

@router.get("/users")
async def get_all_users(token: str = Depends(JWTBearer()), db: Session = Depends(get_db)):
    if not verify_admin_token(token):
        raise HTTPException(status_code=403, detail="Admin access required")
    
    users = db.query(User).all()
    return {"users": users}