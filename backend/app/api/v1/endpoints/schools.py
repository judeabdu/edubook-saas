from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.school import SchoolCreate, SchoolResponse

router = APIRouter()

# Temporary in-memory mock database for testing your structure
MOCK_SCHOOLS_DB = []

@router.post("/", response_model=SchoolResponse)
def create_school(school_in: SchoolCreate):
    new_school = {
        "id": len(MOCK_SCHOOLS_DB) + 1,
        "name": school_in.name,
        "license_code": school_in.license_code,
        "is_active": True
    }
    MOCK_SCHOOLS_DB.append(new_school)
    return new_school

@router.get("/", response_model=List[SchoolResponse])
def get_schools():
    return MOCK_SCHOOLS_DB