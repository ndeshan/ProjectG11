from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.models import Base
from database.database import engine
from app.routers import auth, menu, orders, canteens, admin, inventory
from app.middleware.security import security_headers_middleware
from app import realtime

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Campus Canteen API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
# Add security middleware
app.middleware("http")(security_headers_middleware)

# Include routers
app.include_router(auth.router, prefix="/api")
app.include_router(menu.router, prefix="/api")
app.include_router(orders.router, prefix="/api")
app.include_router(canteens.router, prefix="/api")
app.include_router(admin.router, prefix="/api")
app.include_router(inventory.router, prefix="/api")
app.include_router(realtime.router)

@app.get("/")
def root():
    return {"message": "Campus Canteen API is running"}

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "message": "API is working properly"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)