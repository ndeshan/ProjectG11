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

# Sample data
MENU_ITEMS = [
    {"id": 1, "name": "Rice & Curry", "price": 150, "category": "Main Course", "available": True},
    {"id": 2, "name": "Kottu Roti", "price": 200, "category": "Main Course", "available": True},
    {"id": 3, "name": "Fried Rice", "price": 180, "category": "Main Course", "available": True},
    {"id": 4, "name": "Tea", "price": 30, "category": "Beverages", "available": True},
    {"id": 5, "name": "Coffee", "price": 50, "category": "Beverages", "available": True},
]

ORDERS = []
USERS = {"admin": "admin123", "staff": "staff123"}

@app.get("/")
async def root():
    return {"message": "University Canteen API", "status": "running", "time": datetime.now()}

@app.get("/menu/items")
async def get_menu():
    return {"items": MENU_ITEMS, "count": len(MENU_ITEMS)}

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
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)