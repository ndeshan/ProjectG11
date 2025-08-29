from sqlalchemy.orm import Session
from database.database import SessionLocal
from database.models import Canteen, MenuItem, User, Order, Inventory, StockAlert
from app.auth import get_password_hash
from decimal import Decimal
import random
from datetime import datetime, timedelta
import json

def seed_database():
    db = SessionLocal()
    
    # Clear existing data
    db.query(StockAlert).delete()
    db.query(Order).delete()
    db.query(MenuItem).delete()
    db.query(User).delete()
    db.query(Canteen).delete()
    db.commit()
    
    # Create canteens
    canteens_data = [
        {"name": "Main Canteen", "location": "Faculty of Engineering", "is_active": True},
        {"name": "Science Canteen", "location": "Faculty of Science", "is_active": True},
        {"name": "Arts Canteen", "location": "Faculty of Arts", "is_active": True}
    ]
    
    for canteen_data in canteens_data:
        canteen = Canteen(**canteen_data)
        db.add(canteen)
    
    db.commit()
    
    # Create comprehensive menu items with inventory data
    menu_items = [
        # Main Canteen - Main Course
        {"canteen_id": 1, "name": "Rice & Curry", "name_tamil": "சாதம் & கறி", "description": "Traditional Sri Lankan rice with mixed curry", "price": Decimal("150.00"), "category": "lunch", "rating": Decimal("4.5"), "stock_quantity": 45, "min_stock_level": 10, "max_daily_orders": 100, "daily_orders_count": 15},
        {"canteen_id": 1, "name": "Kottu Rotti", "name_tamil": "கொத்து ரொட்டி", "description": "Chopped roti with vegetables and spices", "price": Decimal("200.00"), "category": "dinner", "rating": Decimal("4.7"), "stock_quantity": 25, "min_stock_level": 5, "max_daily_orders": 50, "daily_orders_count": 8},
        {"canteen_id": 1, "name": "Fried Rice", "name_tamil": "வறுத்த சாதம்", "description": "Stir-fried rice with vegetables", "price": Decimal("180.00"), "category": "lunch", "rating": Decimal("4.3"), "stock_quantity": 20, "min_stock_level": 8, "max_daily_orders": 40, "daily_orders_count": 12},
        {"canteen_id": 1, "name": "Chicken Curry", "name_tamil": "கோழி கறி", "description": "Spicy chicken curry with coconut milk", "price": Decimal("250.00"), "category": "lunch", "rating": Decimal("4.8"), "stock_quantity": 30, "min_stock_level": 5, "max_daily_orders": 60, "daily_orders_count": 18},
        {"canteen_id": 1, "name": "Fish Curry", "name_tamil": "மீன் கறி", "description": "Fresh fish curry with spices", "price": Decimal("220.00"), "category": "lunch", "rating": Decimal("4.6"), "stock_quantity": 15, "min_stock_level": 3, "max_daily_orders": 30, "daily_orders_count": 22},
        
        # Main Canteen - Breakfast
        {"canteen_id": 1, "name": "Hoppers", "name_tamil": "ஆப்பம்", "description": "Bowl-shaped pancakes", "price": Decimal("25.00"), "category": "breakfast", "rating": Decimal("4.6"), "stock_quantity": 80, "min_stock_level": 20, "max_daily_orders": 200, "daily_orders_count": 45},
        {"canteen_id": 1, "name": "String Hoppers", "name_tamil": "இடியாப்பம்", "description": "Steamed rice noodle nests", "price": Decimal("30.00"), "category": "breakfast", "rating": Decimal("4.4"), "stock_quantity": 60, "min_stock_level": 15, "max_daily_orders": 150, "daily_orders_count": 38},
        {"canteen_id": 1, "name": "Rotti", "name_tamil": "ரொட்டி", "description": "Flatbread with coconut", "price": Decimal("35.00"), "category": "breakfast", "rating": Decimal("4.2"), "stock_quantity": 40, "min_stock_level": 10, "max_daily_orders": 80, "daily_orders_count": 25},
        
        # Science Canteen
        {"canteen_id": 2, "name": "Vegetable Fried Rice", "name_tamil": "காய்கறி வறுத்த சாதம்", "description": "Healthy vegetable fried rice", "price": Decimal("160.00"), "category": "lunch", "rating": Decimal("4.4"), "stock_quantity": 35, "min_stock_level": 8, "max_daily_orders": 70, "daily_orders_count": 20},
        {"canteen_id": 2, "name": "Dhal Curry", "name_tamil": "பருப்பு கறி", "description": "Lentil curry with spices", "price": Decimal("120.00"), "category": "lunch", "rating": Decimal("4.3"), "stock_quantity": 50, "min_stock_level": 12, "max_daily_orders": 90, "daily_orders_count": 28},
        {"canteen_id": 2, "name": "Samosa", "name_tamil": "சமோசா", "description": "Crispy pastry with filling", "price": Decimal("40.00"), "category": "snacks", "rating": Decimal("4.5"), "stock_quantity": 25, "min_stock_level": 5, "max_daily_orders": 100, "daily_orders_count": 35},
        
        # Arts Canteen - Beverages & Snacks
        {"canteen_id": 3, "name": "Tea", "name_tamil": "தேநீர்", "description": "Ceylon black tea", "price": Decimal("20.00"), "category": "beverages", "rating": Decimal("4.2"), "stock_quantity": 150, "min_stock_level": 50, "max_daily_orders": 500, "daily_orders_count": 120},
        {"canteen_id": 3, "name": "Coffee", "name_tamil": "காபி", "description": "Fresh brewed coffee", "price": Decimal("30.00"), "category": "beverages", "rating": Decimal("4.0"), "stock_quantity": 100, "min_stock_level": 30, "max_daily_orders": 200, "daily_orders_count": 65},
        {"canteen_id": 3, "name": "Fresh Juice", "name_tamil": "புதிய ஜூஸ்", "description": "Mixed fruit juice", "price": Decimal("80.00"), "category": "beverages", "rating": Decimal("4.6"), "stock_quantity": 40, "min_stock_level": 10, "max_daily_orders": 60, "daily_orders_count": 22},
        {"canteen_id": 3, "name": "Biscuits", "name_tamil": "பிஸ்கட்", "description": "Assorted biscuits", "price": Decimal("15.00"), "category": "snacks", "rating": Decimal("3.8"), "stock_quantity": 200, "min_stock_level": 50, "max_daily_orders": 300, "daily_orders_count": 85},
        
        # Stationery Items
        {"canteen_id": 1, "name": "Pen", "name_tamil": "பேனா", "description": "Blue ink ballpoint pen", "price": Decimal("25.00"), "category": "stationery", "rating": Decimal("4.1"), "stock_quantity": 100, "min_stock_level": 20, "max_daily_orders": 50, "daily_orders_count": 12},
        {"canteen_id": 1, "name": "Notebook", "name_tamil": "குறிப்பேடு", "description": "A4 ruled notebook", "price": Decimal("120.00"), "category": "stationery", "rating": Decimal("4.3"), "stock_quantity": 50, "min_stock_level": 10, "max_daily_orders": 30, "daily_orders_count": 8},
        {"canteen_id": 2, "name": "Calculator", "name_tamil": "கணிப்பான்", "description": "Scientific calculator", "price": Decimal("450.00"), "category": "stationery", "rating": Decimal("4.7"), "stock_quantity": 15, "min_stock_level": 3, "max_daily_orders": 10, "daily_orders_count": 2}
    ]
    
    for item_data in menu_items:
        menu_item = MenuItem(**item_data)
        db.add(menu_item)
    
    # Create multiple demo users
    users_data = [
        {"name": "Amal Perera", "email": "amal@campus.lk", "student_id": "STU2024001", "phone": "0771234567"},
        {"name": "Saman Silva", "email": "saman@campus.lk", "student_id": "STU2024002", "phone": "0772345678"},
        {"name": "Nimal Fernando", "email": "nimal@campus.lk", "student_id": "STU2024003", "phone": "0773456789"},
        {"name": "Kamal Jayasinghe", "email": "kamal@campus.lk", "student_id": "STU2024004", "phone": "0774567890"},
        {"name": "Sunil Rathnayake", "email": "sunil@campus.lk", "student_id": "STU2024005", "phone": "0775678901"}
    ]
    
    for user_data in users_data:
        user = User(
            name=user_data["name"],
            email=user_data["email"],
            password=get_password_hash("password123"),
            student_id=user_data["student_id"],
            phone=user_data["phone"]
        )
        db.add(user)
    
    db.commit()
    
    # Create random orders
    order_statuses = ['pending', 'confirmed', 'preparing', 'ready', 'completed']
    payment_methods = ['digital', 'cash', 'card']
    
    for i in range(25):
        # Random order data
        user_id = random.randint(1, 5)
        canteen_id = random.randint(1, 3)
        status = random.choice(order_statuses)
        
        # Random items for order
        num_items = random.randint(1, 4)
        order_items = []
        total_amount = 0
        
        available_items = [item for item in menu_items if item['canteen_id'] == canteen_id]
        selected_items = random.sample(available_items, min(num_items, len(available_items)))
        
        for item in selected_items:
            quantity = random.randint(1, 3)
            item_total = float(item['price']) * quantity
            total_amount += item_total
            
            order_items.append({
                'id': len([x for x in menu_items if x['name'] == item['name']]) + 1,
                'name': item['name'],
                'price': float(item['price']),
                'quantity': quantity,
                'total': item_total
            })
        
        # Create order
        order_time = datetime.utcnow() - timedelta(days=random.randint(0, 7), hours=random.randint(0, 23))
        pickup_time = order_time + timedelta(minutes=random.randint(15, 45))
        
        order = Order(
            user_id=user_id,
            canteen_id=canteen_id,
            order_number=f"ORD{1000 + i}",
            items=order_items,
            total_amount=Decimal(str(total_amount)),
            status=status,
            payment_status='confirmed',
            payment_method=random.choice(payment_methods),
            pickup_time=pickup_time,
            ready_at=pickup_time if status in ['ready', 'completed'] else None,
            created_at=order_time
        )
        db.add(order)
    
    db.commit()
    
    # Create stock alerts for low stock items
    low_stock_items = [item for item in menu_items if item['stock_quantity'] <= item['min_stock_level']]
    
    for item in low_stock_items:
        alert = StockAlert(
            alert_type='low_stock',
            message=f"Low stock alert: {item['name']} has only {item['stock_quantity']} units left",
            is_resolved=False,
            created_at=datetime.utcnow() - timedelta(hours=random.randint(1, 24))
        )
        db.add(alert)
    
    db.commit()
    db.close()
    print(f"Database seeded successfully with {len(menu_items)} menu items, {len(users_data)} users, 25 orders, and {len(low_stock_items)} stock alerts!")

if __name__ == "__main__":
    seed_database()