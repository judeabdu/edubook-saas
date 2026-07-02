from sqlalchemy import Column, String, DateTime, ForeignKey, Numeric
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid

from app.core.database import Base
from app.models.school import School  # Import the existing School model

class MobileMoneyTransaction(Base):
    __tablename__ = "momo_transactions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    school_id = Column(
        UUID(as_uuid=True),
        ForeignKey("schools.id", ondelete="CASCADE"),
        nullable=False
    )

    # Financial details
    amount = Column(Numeric(10, 2), nullable=False)
    phone_number = Column(String, nullable=False)
    student_identifier = Column(String, nullable=False, index=True)

    # Provider integration
    provider_reference = Column(String, unique=True, nullable=True)
    status = Column(String, default="PENDING")

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)