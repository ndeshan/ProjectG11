from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict, Any
from datetime import datetime
from decimal import Decimal

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    student_id: str
    phone: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(BaseModel):
    id: int
    name: str
    email: str
    student_id: Optional[str] = None
    phone: Optional[str] = None
    
    class Config:
        from_attributes = True

class MenuItemResponse(BaseModel):
    id: int
    name: str
    name_tamil: Optional[str] = None
    description: Optional[str] = None
    price: Decimal
    category: Optional[str] = None
    image_url: Optional[str] = None
    is_available: bool
    preparation_time: int
    rating: Decimal
    stock_quantity: int = 100
    min_stock_level: int = 10
    max_daily_orders: int = 50
    daily_orders_count: int = 0
    
    class Config:
        from_attributes = True

class OrderCreate(BaseModel):
    canteen_id: int
    items: List[Dict[str, Any]]
    total_amount: Decimal
    payment_method: str

class OrderResponse(BaseModel):
    id: int
    order_number: str
    items: List[Dict[str, Any]]
    total_amount: Decimal
    status: str
    payment_status: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class CanteenResponse(BaseModel):
    id: int
    name: str
    location: Optional[str] = None
    is_active: bool
    current_queue_count: int
    estimated_wait_time: int
    
    class Config:
        from_attributes = True

class InventoryCreate(BaseModel):
    menu_item_id: int
    ingredient_name: str
    current_stock: int
    min_stock: int
    max_stock: int
    unit: str
    cost_per_unit: Decimal
    supplier: Optional[str] = None

class InventoryUpdate(BaseModel):
    current_stock: Optional[int] = None
    min_stock: Optional[int] = None
    max_stock: Optional[int] = None
    supplier: Optional[str] = None

class InventoryResponse(BaseModel):
    id: int
    menu_item_id: int
    ingredient_name: str
    current_stock: int
    min_stock: int
    max_stock: int
    unit: str
    cost_per_unit: Decimal
    supplier: Optional[str] = None
    last_restocked: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class StockAlertResponse(BaseModel):
    id: int
    alert_type: str
    message: str
    is_resolved: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class MenuItemWithStock(MenuItemResponse):
    stock_quantity: int
    min_stock_level: int
    max_daily_orders: int
    daily_orders_count: int