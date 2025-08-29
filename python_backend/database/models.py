from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey, JSON, DECIMAL, Date
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    student_id = Column(String(50), unique=True)
    phone = Column(String(20))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Canteen(Base):
    __tablename__ = "canteens"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    location = Column(String(255))
    is_active = Column(Boolean, default=True)
    current_queue_count = Column(Integer, default=0)
    estimated_wait_time = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class MenuItem(Base):
    __tablename__ = "menu_items"
    
    id = Column(Integer, primary_key=True, index=True)
    canteen_id = Column(Integer, ForeignKey("canteens.id"))
    name = Column(String(255), nullable=False)
    name_tamil = Column(String(255))
    description = Column(Text)
    price = Column(DECIMAL(8, 2), nullable=False)
    category = Column(String(100))
    image_url = Column(String(500))
    is_available = Column(Boolean, default=True)
    preparation_time = Column(Integer, default=15)
    rating = Column(DECIMAL(3, 2), default=0.0)
    stock_quantity = Column(Integer, default=100)
    min_stock_level = Column(Integer, default=10)
    max_daily_orders = Column(Integer, default=50)
    daily_orders_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    canteen = relationship("Canteen")
    inventory = relationship("Inventory", back_populates="menu_item")

class Order(Base):
    __tablename__ = "orders"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    canteen_id = Column(Integer, ForeignKey("canteens.id"))
    order_number = Column(String(50), unique=True)
    items = Column(JSON)
    total_amount = Column(DECIMAL(10, 2), nullable=False)
    status = Column(String(50), default="pending")
    payment_status = Column(String(50), default="pending")
    payment_method = Column(String(50))
    pickup_time = Column(DateTime)
    ready_at = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user = relationship("User")
    canteen = relationship("Canteen")

class Inventory(Base):
    __tablename__ = "inventory"
    
    id = Column(Integer, primary_key=True, index=True)
    menu_item_id = Column(Integer, ForeignKey("menu_items.id"))
    ingredient_name = Column(String(255), nullable=False)
    current_stock = Column(Integer, default=0)
    min_stock = Column(Integer, default=5)
    max_stock = Column(Integer, default=100)
    unit = Column(String(50), default="kg")
    cost_per_unit = Column(DECIMAL(8, 2), default=0.0)
    supplier = Column(String(255))
    last_restocked = Column(DateTime)
    expiry_date = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    menu_item = relationship("MenuItem", back_populates="inventory")

class StockAlert(Base):
    __tablename__ = "stock_alerts"
    
    id = Column(Integer, primary_key=True, index=True)
    inventory_id = Column(Integer, ForeignKey("inventory.id"))
    alert_type = Column(String(50))  # low_stock, out_of_stock, expiring_soon
    message = Column(Text)
    is_resolved = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    resolved_at = Column(DateTime)
    
    inventory = relationship("Inventory")

class QueueStatus(Base):
    __tablename__ = "queue_status"
    
    id = Column(Integer, primary_key=True, index=True)
    canteen_id = Column(Integer, ForeignKey("canteens.id"))
    current_number = Column(Integer, default=1)
    total_orders = Column(Integer, default=0)
    estimated_wait = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    canteen = relationship("Canteen")