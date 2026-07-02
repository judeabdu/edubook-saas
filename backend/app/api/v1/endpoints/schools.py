from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from app.core.database import get_db
from app.models.school import School
from app.schemas.school import SchoolCreate, SchoolOut

router = APIRouter()

@router.post("/", response_model=SchoolOut, status_code=status.HTTP_201_CREATED)
async def create_school(payload: SchoolCreate, db: AsyncSession = Depends(get_db)):
    """
    Provisions a new institutional tenant partition space inside EduBook.
    """
    # Check if subdomain is already taken
    existing_subdomain = await db.execute(select(School).where(School.subdomain == payload.subdomain))
    if existing_subdomain.scalars().first():
        raise HTTPException(status_code=400, detail="This institutional subdomain is already registered.")
    
    new_school = School(name=payload.name, subdomain=payload.subdomain)
    db.add(new_school)
    await db.commit()
    await db.refresh(new_school)
    return new_school

@router.get("/", response_model=List[SchoolOut])
async def list_schools(db: AsyncSession = Depends(get_db)):
    """
    Returns all registered tenant schools to populate the frontend selection interfaces.
    """
    result = await db.execute(select(School).order_by(School.name.asc()))
    return result.scalars().all()