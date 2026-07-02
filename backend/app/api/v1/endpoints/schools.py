from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.school import School
from app.schemas.school import SchoolCreate, SchoolOut

router = APIRouter()

@router.post("/", response_model=SchoolOut, status_code=status.HTTP_201_CREATED)
def create_school(payload: SchoolCreate, db: Session = Depends(get_db)):

    existing = db.query(School).filter(School.subdomain == payload.subdomain).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="This institutional subdomain is already registered."
        )

    new_school = School(
        name=payload.name,
        subdomain=payload.subdomain
    )

    db.add(new_school)
    db.commit()
    db.refresh(new_school)

    return new_school


@router.get("/", response_model=list[SchoolOut])
def list_schools(db: Session = Depends(get_db)):

    schools = db.query(School).order_by(School.name.asc()).all()
    return schools