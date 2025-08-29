from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from database.database import get_db
from database.models import MenuItem, Canteen
from app.schemas import MenuItemResponse
from typing import Optional, List

router = APIRouter(prefix="/menu", tags=["menu"])

@router.get("/", response_model=List[MenuItemResponse])
def get_menu(
    canteen_id: Optional[int] = Query(None),
    category: Optional[str] = Query(None),
    include_unavailable: bool = Query(False),
    db: Session = Depends(get_db)
):
    query = db.query(MenuItem)
    
    if not include_unavailable:
        query = query.filter(
            MenuItem.is_available == True,
            MenuItem.stock_quantity > 0,
            MenuItem.daily_orders_count < MenuItem.max_daily_orders
        )
    
    if canteen_id:
        query = query.filter(MenuItem.canteen_id == canteen_id)
    
    if category:
        query = query.filter(MenuItem.category == category)
    
    menu_items = query.order_by(MenuItem.rating.desc()).all()
    return menu_items

@router.get("/favorites", response_model=List[MenuItemResponse])
def get_favorites(db: Session = Depends(get_db)):
    favorites = db.query(MenuItem).filter(
        MenuItem.is_available == True,
        MenuItem.stock_quantity > 0,
        MenuItem.daily_orders_count < MenuItem.max_daily_orders,
        MenuItem.rating >= 4.0
    ).order_by(MenuItem.rating.desc()).limit(10).all()
    
    return favorites

@router.get("/canteens/{canteen_id}/category/{category}", response_model=List[MenuItemResponse])
def get_by_category(canteen_id: int, category: str, db: Session = Depends(get_db)):
    menu_items = db.query(MenuItem).filter(
        MenuItem.canteen_id == canteen_id,
        MenuItem.category == category,
        MenuItem.is_available == True,
        MenuItem.stock_quantity > 0,
        MenuItem.daily_orders_count < MenuItem.max_daily_orders
    ).order_by(MenuItem.rating.desc()).all()
    
    return menu_items

@router.get("/item/{item_id}/availability")
def check_item_availability(item_id: int, db: Session = Depends(get_db)):
    item = db.query(MenuItem).filter(MenuItem.id == item_id).first()
    if not item:
        return {"available": False, "reason": "Item not found"}
    
    is_available = (
        item.is_available and 
        item.stock_quantity > 0 and 
        item.daily_orders_count < item.max_daily_orders
    )
    
    reason = "Available"
    if not item.is_available:
        reason = "Temporarily unavailable"
    elif item.stock_quantity <= 0:
        reason = "Out of stock"
    elif item.daily_orders_count >= item.max_daily_orders:
        reason = "Daily limit reached"
    
    return {
        "available": is_available,
        "reason": reason,
        "stock_quantity": item.stock_quantity,
        "daily_orders_count": item.daily_orders_count,
        "max_daily_orders": item.max_daily_orders
    }