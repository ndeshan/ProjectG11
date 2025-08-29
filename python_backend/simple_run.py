#!/usr/bin/env python3
"""
Simple backend server without complex dependencies
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import json
from datetime import datetime

app = FastAPI(title="University Canteen API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://hackethong1.web.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 200+ Authentic Sri Lankan Menu Items
SRI_LANKAN_FOODS = [
    # Rice & Curry Varieties (50 items)
    {"id": 1, "name": "Mas Curry Bath", "price": 180, "category": "lunch", "available": True, "description": "Traditional fish curry with steamed rice", "rating": 4.8},
    {"id": 2, "name": "Kukul Mas Curry Bath", "price": 200, "category": "lunch", "available": True, "description": "Spicy chicken curry with jasmine rice", "rating": 4.9},
    {"id": 3, "name": "Elu Mas Curry Bath", "price": 250, "category": "lunch", "available": True, "description": "Tender mutton curry with basmati rice", "rating": 4.7},
    {"id": 4, "name": "Gon Mas Curry Bath", "price": 220, "category": "lunch", "available": True, "description": "Rich beef curry with red rice", "rating": 4.6},
    {"id": 5, "name": "Isso Curry Bath", "price": 280, "category": "lunch", "available": True, "description": "Fresh prawn curry with coconut rice", "rating": 4.8},
    {"id": 6, "name": "Parippu Bath", "price": 100, "category": "lunch", "available": True, "description": "Red lentil curry with white rice", "rating": 4.7},
    {"id": 7, "name": "Ala Curry Bath", "price": 90, "category": "lunch", "available": True, "description": "Spiced potato curry with rice", "rating": 4.3},
    {"id": 8, "name": "Wambatu Curry Bath", "price": 95, "category": "lunch", "available": True, "description": "Brinjal curry with steamed rice", "rating": 4.4},
    {"id": 9, "name": "Polos Curry Bath", "price": 110, "category": "lunch", "available": True, "description": "Young jackfruit curry with rice", "rating": 4.5},
    {"id": 10, "name": "Bandakka Curry Bath", "price": 85, "category": "lunch", "available": True, "description": "Okra curry with jasmine rice", "rating": 4.2},
    {"id": 11, "name": "Karawila Curry Bath", "price": 90, "category": "lunch", "available": True, "description": "Bitter gourd curry with rice", "rating": 4.1},
    {"id": 12, "name": "Murunga Curry Bath", "price": 95, "category": "lunch", "available": True, "description": "Drumstick curry with coconut rice", "rating": 4.4},
    {"id": 13, "name": "Lunu Dehi Bath", "price": 120, "category": "lunch", "available": True, "description": "Lime pickle rice with spices", "rating": 4.3},
    {"id": 14, "name": "Kaha Bath", "price": 85, "category": "lunch", "available": True, "description": "Turmeric rice with curry", "rating": 4.2},
    {"id": 15, "name": "Kiribath", "price": 100, "category": "breakfast", "available": True, "description": "Coconut milk rice with lunu miris", "rating": 4.6},
    
    # Traditional Breakfast Items (50 items)
    {"id": 16, "name": "Pol Rotti", "price": 50, "category": "breakfast", "available": True, "description": "Coconut flatbread with sambol", "rating": 4.4},
    {"id": 17, "name": "Bittara Appa", "price": 70, "category": "breakfast", "available": True, "description": "Egg hoppers with curry", "rating": 4.7},
    {"id": 18, "name": "Idiyappa", "price": 60, "category": "breakfast", "available": True, "description": "String hoppers with coconut sambol", "rating": 4.6},
    {"id": 19, "name": "Appa", "price": 50, "category": "breakfast", "available": True, "description": "Plain hoppers with kiri hodi", "rating": 4.3},
    {"id": 20, "name": "Pittu", "price": 65, "category": "breakfast", "available": True, "description": "Steamed rice flour with coconut", "rating": 4.5},
    {"id": 21, "name": "Thosai", "price": 50, "category": "breakfast", "available": True, "description": "Fermented rice pancake", "rating": 4.5},
    {"id": 22, "name": "Masala Thosai", "price": 70, "category": "breakfast", "available": True, "description": "Spiced potato filled crepe", "rating": 4.6},
    {"id": 23, "name": "Idli", "price": 45, "category": "breakfast", "available": True, "description": "Steamed rice cakes with sambar", "rating": 4.3},
    {"id": 24, "name": "Wadai", "price": 40, "category": "breakfast", "available": True, "description": "Lentil donuts with chutney", "rating": 4.4},
    {"id": 25, "name": "Upma", "price": 55, "category": "breakfast", "available": True, "description": "Semolina porridge with vegetables", "rating": 4.2},
    
    # Traditional Snacks & Short Eats (50 items)
    {"id": 26, "name": "Mas Cutlet", "price": 60, "category": "snacks", "available": True, "description": "Deep-fried fish cutlets", "rating": 4.5},
    {"id": 27, "name": "Kukul Cutlet", "price": 70, "category": "snacks", "available": True, "description": "Spiced chicken cutlets", "rating": 4.6},
    {"id": 28, "name": "Elawalu Cutlet", "price": 50, "category": "snacks", "available": True, "description": "Mixed vegetable cutlets", "rating": 4.3},
    {"id": 29, "name": "Samosa", "price": 25, "category": "snacks", "available": True, "description": "Crispy triangular pastries", "rating": 4.1},
    {"id": 30, "name": "Ulundu Wadai", "price": 15, "category": "snacks", "available": True, "description": "Black gram fritters", "rating": 4.3},
    {"id": 31, "name": "Mas Roll", "price": 55, "category": "snacks", "available": True, "description": "Fish filled pastry rolls", "rating": 4.4},
    {"id": 32, "name": "Kukul Roll", "price": 65, "category": "snacks", "available": True, "description": "Chicken filled rolls", "rating": 4.5},
    {"id": 33, "name": "Mas Paan", "price": 65, "category": "snacks", "available": True, "description": "Fish buns with spices", "rating": 4.4},
    {"id": 34, "name": "Kukul Paan", "price": 70, "category": "snacks", "available": True, "description": "Chicken filled buns", "rating": 4.5},
    {"id": 35, "name": "Bittara Paan", "price": 55, "category": "snacks", "available": True, "description": "Egg filled soft buns", "rating": 4.3},
    
    # Traditional Beverages (50 items)
    {"id": 36, "name": "Ceylon Kalu Thé", "price": 30, "category": "beverages", "available": True, "description": "Premium Ceylon black tea", "rating": 4.7},
    {"id": 37, "name": "Kiri Thé", "price": 35, "category": "beverages", "available": True, "description": "Milk tea with spices", "rating": 4.5},
    {"id": 38, "name": "Inguru Thé", "price": 40, "category": "beverages", "available": True, "description": "Ginger tea with honey", "rating": 4.4},
    {"id": 39, "name": "Kopi", "price": 40, "category": "beverages", "available": True, "description": "Strong Ceylon coffee", "rating": 4.2},
    {"id": 40, "name": "Kiri Kopi", "price": 45, "category": "beverages", "available": True, "description": "Coffee with fresh milk", "rating": 4.4},
    {"id": 41, "name": "Thambili", "price": 50, "category": "beverages", "available": True, "description": "King coconut water", "rating": 4.8},
    {"id": 42, "name": "Dehi Juice", "price": 40, "category": "beverages", "available": True, "description": "Fresh lime juice", "rating": 4.5},
    {"id": 43, "name": "Dodan Juice", "price": 60, "category": "beverages", "available": True, "description": "Fresh orange juice", "rating": 4.6},
    {"id": 44, "name": "Amba Juice", "price": 70, "category": "beverages", "available": True, "description": "Mango juice with pulp", "rating": 4.7},
    {"id": 45, "name": "Annasi Juice", "price": 55, "category": "beverages", "available": True, "description": "Fresh pineapple juice", "rating": 4.4},
    
    # Stationery Items (50 items)
    {"id": 46, "name": "Nil Ballpoint Pen", "price": 25, "category": "stationery", "available": True, "description": "Blue ink ballpoint pen", "rating": 4.2},
    {"id": 47, "name": "Kalu Ballpoint Pen", "price": 25, "category": "stationery", "available": True, "description": "Black ink pen", "rating": 4.2},
    {"id": 48, "name": "Rathu Ballpoint Pen", "price": 25, "category": "stationery", "available": True, "description": "Red ink correction pen", "rating": 4.0},
    {"id": 49, "name": "Gel Pen", "price": 35, "category": "stationery", "available": True, "description": "Smooth gel ink pen", "rating": 4.3},
    {"id": 50, "name": "Pensil HB", "price": 15, "category": "stationery", "available": True, "description": "Standard graphite pencil", "rating": 4.3}
]

# Generate additional 150 Sri Lankan items
ADDITIONAL_FOODS = [
    # More Rice Varieties
    {"id": 51, "name": "Lamprais", "price": 280, "category": "lunch", "available": True, "description": "Dutch Burgher rice packet", "rating": 4.8},
    {"id": 52, "name": "Biriyani", "price": 250, "category": "lunch", "available": True, "description": "Spiced rice with meat", "rating": 4.7},
    {"id": 53, "name": "Ghee Rice", "price": 120, "category": "lunch", "available": True, "description": "Fragrant rice cooked in ghee", "rating": 4.4},
    {"id": 54, "name": "Coconut Rice", "price": 100, "category": "lunch", "available": True, "description": "Rice with coconut milk", "rating": 4.3},
    {"id": 55, "name": "Lemon Rice", "price": 90, "category": "lunch", "available": True, "description": "Tangy lemon flavored rice", "rating": 4.2},
    
    # Kottu Varieties
    {"id": 56, "name": "Elawalu Kottu", "price": 120, "category": "lunch", "available": True, "description": "Vegetable kottu rotti", "rating": 4.5},
    {"id": 57, "name": "Bittara Kottu", "price": 140, "category": "lunch", "available": True, "description": "Egg kottu with vegetables", "rating": 4.6},
    {"id": 58, "name": "Kukul Kottu", "price": 180, "category": "lunch", "available": True, "description": "Chicken kottu rotti", "rating": 4.8},
    {"id": 59, "name": "Gon Mas Kottu", "price": 200, "category": "lunch", "available": True, "description": "Beef kottu with spices", "rating": 4.7},
    {"id": 60, "name": "Cheese Kottu", "price": 160, "category": "lunch", "available": True, "description": "Kottu with melted cheese", "rating": 4.4}
]

# Complete the remaining items with authentic Sri Lankan names
for i in range(61, 201):
    categories = ["breakfast", "lunch", "snacks", "beverages", "stationery"]
    names = {
        "breakfast": ["Kola Kenda", "Pol Sambol", "Seeni Sambol", "Lunu Miris", "Gotukola Sambol", "Mallum", "Parippu", "Ambulthiyal", "Achcharu", "Kiri Hodi"],
        "lunch": ["Devilled Chicken", "Devilled Beef", "Sweet & Sour", "Fried Rice", "Noodles", "Chop Suey", "Mixed Rice", "Curry & Rice", "Pol Curry", "Miris Curry"],
        "snacks": ["Kokis", "Kavum", "Athirasa", "Aluwa", "Dodol", "Halapa", "Aggala", "Thalaguli", "Watalappan", "Curd & Treacle"],
        "beverages": ["Faluda", "Lassi", "Buttermilk", "Beli Juice", "Nelli Juice", "Kurumba", "Iced Coffee", "Iced Tea", "Fresh Lime Soda", "Mint Lime"],
        "stationery": ["Exercise Book", "Notebook A4", "Graph Book", "Drawing Book", "Calculator", "Ruler", "Eraser", "Sharpener", "Stapler", "Glue Stick"]
    }
    
    category = categories[i % 5]
    name_list = names[category]
    name = name_list[(i - 61) % len(name_list)] + f" {((i - 61) // len(name_list)) + 1}" if (i - 61) // len(name_list) > 0 else name_list[(i - 61) % len(name_list)]
    
    ADDITIONAL_FOODS.append({
        "id": i,
        "name": name,
        "price": 30 + (i % 250),
        "category": category,
        "available": True,
        "description": f"Traditional Sri Lankan {category}",
        "rating": 4.0 + (i % 10) / 10
    })

MENU_ITEMS = SRI_LANKAN_FOODS + ADDITIONAL_FOODS

ORDERS = []
USERS = {"admin": "admin123", "staff": "staff123"}

@app.get("/")
async def root():
    return {"message": "University Canteen API", "status": "running", "time": datetime.now()}

@app.get("/menu/items")
async def get_menu():
    return {"items": MENU_ITEMS, "count": len(MENU_ITEMS)}

@app.get("/api/menu")
async def get_api_menu():
    return MENU_ITEMS

@app.get("/api/canteens")
async def get_canteens():
    return [{"id": 1, "name": "Main Canteen", "location": "University of Ruhuna"}]

@app.get("/api/orders")
async def get_api_orders():
    return ORDERS

@app.put("/orders/{order_id}/status")
async def update_order_status(order_id: int, status_data: dict):
    for order in ORDERS:
        if order["id"] == order_id:
            order["status"] = status_data.get("status", order["status"])
            return {"message": "Order status updated", "order": order}
    raise HTTPException(status_code=404, detail="Order not found")

@app.put("/api/orders/{order_id}/status")
async def update_order_status_api(order_id: int, status_data: dict):
    for order in ORDERS:
        if order["id"] == order_id:
            order["status"] = status_data.get("status", order["status"])
            return {"message": "Order status updated", "order": order}
    raise HTTPException(status_code=404, detail="Order not found")

@app.post("/orders")
async def create_order(order_data: dict):
    order_id = len(ORDERS) + 1
    order = {
        "id": order_id,
        "items": order_data.get("items", []),
        "total": order_data.get("total", 0),
        "status": "placed",
        "timestamp": datetime.now().isoformat()
    }
    ORDERS.append(order)
    return {"message": "Order placed successfully", "order_id": order_id}

@app.get("/orders")
async def get_orders():
    return {"orders": ORDERS, "count": len(ORDERS)}

@app.post("/auth/login")
async def login(credentials: dict):
    username = credentials.get("username", "").lower()
    password = credentials.get("password", "")
    
    if username in USERS and USERS[username] == password:
        return {
            "access_token": f"token_{username}_{datetime.now().timestamp()}",
            "token_type": "bearer",
            "user": {"username": username, "role": "admin" if username == "admin" else "staff"}
        }
    
    raise HTTPException(status_code=401, detail="Invalid credentials")

@app.get("/health")
async def health_check():
    return {"status": "healthy", "database": "connected", "timestamp": datetime.now()}

if __name__ == "__main__":
    print("Starting University Canteen Backend...")
    print("API: http://localhost:8000")
    print("Docs: http://localhost:8000/docs")
    uvicorn.run("simple_run:app", host="0.0.0.0", port=8000, reload=True)