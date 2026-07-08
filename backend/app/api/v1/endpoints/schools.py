from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app import models
from pydantic import BaseModel, EmailStr
from typing import List

router = APIRouter()

# Schema for incoming school onboarding requests
class SchoolCreate(BaseModel):
    name: str
    slug: str
    admin_email: EmailStr
    phone_number: str

@post("/", status_code=status.HTTP_201_CREATED)
def onboard_school(school_in: SchoolCreate, db: Session = Depends(get_db)):
    # Verify slug uniqueness to preserve routing boundaries
    existing_slug = db.query(models.School).filter(models.School.slug == school_in.slug).first()
    if existing_slug:
        raise HTTPException(status_code=400, detail="This workspace URL slug is already taken.")
        
    new_school = models.School(
        name=school_in.name,
        slug=school_in.slug,
        admin_email=school_in.admin_email,
        phone_number=school_in.phone_number
    )
    db.add(new_school)
    db.commit()
    db.refresh(new_school)
    return {"message": "School onboarded successfully", "school_id": new_school.id}

@get("/{school_id}/analytics")
def get_school_dashboard_metrics(school_id: str, db: Session = Depends(get_db)):
    # Dynamically compute running financial states across this unique tenant isolate
    school = db.query(models.School).filter(models.School.id == school_id).first()
    if not school:
        raise HTTPException(status_code=404, detail="School workspace not found.")
        
    total_students = db.query(models.Student).filter(models.Student.school_id == school_id).count()
    
    # Calculate aggregate successful payments
    successful_payments = db.query(models.Payment).filter(
        models.Payment.school_id == school_id,
        models.Payment.status == "SUCCESS"
    ).all()
    
    total_collected = sum(p.amount for p in successful_payments)
    
    return {
        "school_name": school.name,
        "active_students": total_students,
        "total_collected": float(total_collected),
        "currency": school.currency
    }