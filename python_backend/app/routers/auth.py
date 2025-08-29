from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
import jwt
import hashlib
import time
from datetime import datetime, timedelta

router = APIRouter()
security = HTTPBearer()

SECRET_KEY = "your-secret-key-here"
ALGORITHM = "HS256"

class LoginRequest(BaseModel):
    username: str
    password: str

# Demo users with hashed passwords
DEMO_USERS = {
    "admin": {
        "password_hash": hashlib.sha256("admin123".encode()).hexdigest(),
        "role": "admin"
    },
    "staff": {
        "password_hash": hashlib.sha256("staff123".encode()).hexdigest(),
        "role": "staff"
    }
}

# Track failed attempts for security
failed_attempts = {}

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(hours=24)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

@router.post("/login")
async def login(request: LoginRequest):
    username = request.username.lower().strip()
    
    # Security: Check failed attempts
    if username in failed_attempts:
        if failed_attempts[username]["count"] >= 3:
            if time.time() - failed_attempts[username]["last_attempt"] < 30:
                raise HTTPException(
                    status_code=429, 
                    detail="Too many failed attempts. Try again in 30 seconds."
                )
            else:
                failed_attempts[username] = {"count": 0, "last_attempt": 0}
    
    # Validate credentials
    if username not in DEMO_USERS:
        # Track failed attempt
        if username not in failed_attempts:
            failed_attempts[username] = {"count": 0, "last_attempt": 0}
        failed_attempts[username]["count"] += 1
        failed_attempts[username]["last_attempt"] = time.time()
        
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    password_hash = hashlib.sha256(request.password.encode()).hexdigest()
    if password_hash != DEMO_USERS[username]["password_hash"]:
        # Track failed attempt
        if username not in failed_attempts:
            failed_attempts[username] = {"count": 0, "last_attempt": 0}
        failed_attempts[username]["count"] += 1
        failed_attempts[username]["last_attempt"] = time.time()
        
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Reset failed attempts on successful login
    if username in failed_attempts:
        del failed_attempts[username]
    
    # Create token
    token_data = {
        "sub": username,
        "role": DEMO_USERS[username]["role"],
        "iat": datetime.utcnow()
    }
    
    access_token = create_access_token(token_data)
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "username": username,
            "role": DEMO_USERS[username]["role"]
        }
    }

@router.get("/verify")
async def verify_token_endpoint(current_user: dict = Depends(verify_token)):
    return {"valid": True, "user": current_user}