import uuid
from sqlalchemy import Column, String, DateTime, ForeignKey, Numeric, Integer, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from app.core.database import Base

def generate_uuid():
    return str(uuid.uuid4())

class School(Base):
    __tablename__ = "schools"

    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String, nullable=False, index=True)
    slug = Column(String, unique=True, nullable=False)
    admin_email = Column(String, unique=True, nullable=False)
    phone_number = Column(String, nullable=True)
    currency = Column(String, default="UGX")  # Widening for local currency processing (UGX, KES, USD)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    students = relationship("Student", back_populates="school", cascade="all, delete-orphan")
    payments = relationship("Payment", back_populates="school", cascade="all, delete-orphan")


class Student(Base):
    __tablename__ = "students"

    id = Column(String, primary_key=True, default=generate_uuid)
    school_id = Column(String, ForeignKey("schools.id", ondelete="CASCADE"), nullable=False, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    student_id_number = Column(String, nullable=False, index=True)  # e.g., KSS-2026-042
    cohort = Column(String, nullable=True)  # e.g., "Senior 4 Blue"
    parent_phone = Column(String, nullable=True)  # Crucial for automated SMS billing loops
    total_fees_due = Column(Numeric(12, 2), default=0.00)  # Total term charges
    fees_paid = Column(Numeric(12, 2), default=0.00)      # Track running installment balances
    
    school = relationship("School", back_populates="students")
    payments = relationship("Payment", back_populates="student", cascade="all, delete-orphan")


class Payment(Base):
    __tablename__ = "payments"

    id = Column(String, primary_key=True, default=generate_uuid)
    school_id = Column(String, ForeignKey("schools.id", ondelete="CASCADE"), nullable=False, index=True)
    student_id = Column(String, ForeignKey("students.id", ondelete="CASCADE"), nullable=False, index=True)
    amount = Column(Numeric(12, 2), nullable=False)
    payment_method = Column(String, default="MOBILE_MONEY")  # MOBILE_MONEY, BANK_SLIP, CASH
    status = Column(String, default="PENDING", nullable=False)  # PENDING, SUCCESS, FAILED
    transaction_reference = Column(String, unique=True, nullable=True, index=True)  # Network tracking reference
    payer_name = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    school = relationship("School", back_populates="payments")
    student = relationship("Student", back_populates="payments")