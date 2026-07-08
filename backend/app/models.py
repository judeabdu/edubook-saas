import uuid
from sqlalchemy import Column, String, DateTime, ForeignKey, Numeric
from sqlalchemy.orm import relationship
from datetime import datetime
# Importing cleanly from your exact core configuration path
from app.core.database import Base

def generate_uuid():
    return str(uuid.uuid4())

class School(Base):
    __tablename__ = "schools"

    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String, nullable=False, index=True)
    slug = Column(String, unique=True, nullable=False)
    admin_email = Column(String, unique=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    students = relationship("Student", back_populates="school", cascade="all, delete-orphan")
    payments = relationship("Payment", back_populates="school", cascade="all, delete-orphan")


class Student(Base):
    __tablename__ = "students"

    id = Column(String, primary_key=True, default=generate_uuid)
    school_id = Column(String, ForeignKey("schools.id", ondelete="CASCADE"), nullable=False, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    student_id_number = Column(String, nullable=False, index=True)
    cohort = Column(String, nullable=True)

    school = relationship("School", back_populates="students")
    payments = relationship("Payment", back_populates="student", cascade="all, delete-orphan")


class Payment(Base):
    __tablename__ = "payments"

    id = Column(String, primary_key=True, default=generate_uuid)
    school_id = Column(String, ForeignKey("schools.id", ondelete="CASCADE"), nullable=False, index=True)
    student_id = Column(String, ForeignKey("students.id", ondelete="CASCADE"), nullable=False, index=True)
    amount = Column(Numeric(10, 2), nullable=False)
    status = Column(String, default="PENDING", nullable=False) # PENDING, SUCCESS, FAILED
    transaction_reference = Column(String, unique=True, nullable=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    school = relationship("School", back_populates="payments")
    student = relationship("Student", back_populates="payments")