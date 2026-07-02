from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, Numeric
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid
from app.core.database import Base

class School(Base):
    __tablename__ = "schools"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False, index=True)
    subdomain = Column(String, unique=True, nullable=False, index=True) # e.g., "kampala-uni"
    created_at = Column(DateTime, default=datetime.utcnow)

class MobileMoneyTransaction(Base):
    __tablename__ = "momo_transactions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    school_id = Column(UUID(as_uuid=True), ForeignKey("schools.id", ondelete="CASCADE"), nullable=False)
    
    # Financial details
    amount = Column(Numeric(10, 2), nullable=False)
    phone_number = Column(String, nullable=False) # e.g., "25677xxxxxx"
    student_identifier = Column(String, nullable=False, index=True)
    
    # Provider integration sync
    provider_reference = Column(String, unique=True, nullable=True) # Tracking key from MTN/Airtel
    status = Column(String, default="PENDING") # PENDING, SUCCESSFUL, FAILED
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)