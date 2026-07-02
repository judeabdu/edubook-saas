from pydantic import BaseModel

class SchoolBase(BaseModel):
    name: str
    license_code: str

class SchoolCreate(SchoolBase):
    pass

class SchoolResponse(SchoolBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True