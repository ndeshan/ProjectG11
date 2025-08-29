from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.database import get_db
from database.models import Canteen, QueueStatus, Order
from app.schemas import CanteenResponse
from typing import List
from datetime import datetime, date

router = APIRouter(prefix="/canteens", tags=["canteens"])

@router.get("/", response_model=List[CanteenResponse])
def get_canteens(db: Session = Depends(get_db)):
    canteens = db.query(Canteen).filter(Canteen.is_active == True).all()
    return canteens

@router.get("/{canteen_id}", response_model=CanteenResponse)
def get_canteen(canteen_id: int, db: Session = Depends(get_db)):
    canteen = db.query(Canteen).filter(Canteen.id == canteen_id).first()
    if not canteen:
        raise HTTPException(status_code=404, detail="Canteen not found")
    return canteen

@router.get("/{canteen_id}/queue-status")
def get_queue_status(canteen_id: int, db: Session = Depends(get_db)):
    canteen = db.query(Canteen).filter(Canteen.id == canteen_id).first()
    if not canteen:
        raise HTTPException(status_code=404, detail="Canteen not found")
    
    queue_status = db.query(QueueStatus).filter(QueueStatus.canteen_id == canteen_id).first()
    
    if not queue_status:
        queue_status = QueueStatus(
            canteen_id=canteen_id,
            current_number=1,
            total_orders=0,
            estimated_wait=0
        )
        db.add(queue_status)
        db.commit()
        db.refresh(queue_status)
    
    return {
        "canteen_id": canteen_id,
        "current_number": queue_status.current_number,
        "total_orders": queue_status.total_orders,
        "estimated_wait": queue_status.estimated_wait,
        "queue_length": canteen.current_queue_count
    }