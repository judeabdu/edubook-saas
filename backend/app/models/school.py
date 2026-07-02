from sqlalchemy import Column, String, DateTime
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid
from app.core.database import Base

class School(Base):
    __tablename__ = "schools"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False, index=True)
    subdomain = Column(String, unique=True, nullable=False, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)