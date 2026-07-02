from pydantic import BaseModel
from uuid import UUID
from datetime import datetime

class SchoolCreate(BaseModel):
    name: str
    subdomain: str

class SchoolOut(BaseModel):
    id: UUID
    name: str
    subdomain: str
    created_at: datetime

    class Config:
        from_attributes = True