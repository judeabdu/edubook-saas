from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app import models
from pydantic import BaseModel, Field
from typing import List
from decimal import Decimal

router = APIRouter()

# Schema for initiating a payment
class PaymentInitiate(BaseModel):
    school_id: str
    student_id: str
    amount: Decimal = Field(..., gt=0, description="Amount to be paid")
    payment_method: str = "MOBILE_MONEY"  # MOBILE_MONEY, BANK_SLIP, CASH
    payer_name: str

# Schema for simulating a network webhook confirmation callback
class WebhookCallback(BaseModel):
    transaction_reference: str
    status: str  # SUCCESS or FAILED

@router.post("/initiate", status_code=status.HTTP_201_CREATED)
def initiate_payment(payment_in: PaymentInitiate, db: Session = Depends(get_db)):
    # 1. Verify the student exists and belongs to the designated school tenant
    student = db.query(models.Student).filter(
        models.Student.id == payment_in.student_id,
        models.Student.school_id == payment_in.school_id
    ).first()
    
    if not student:
        raise HTTPException(
            status_code=404, 
            detail="Student record not found within this school workspace."
        )
    
    # 2. Log the transaction into the ledger as PENDING
    import uuid
    tx_ref = f"EB-TX-{uuid.uuid4().hex[:8].upper()}"
    
    new_payment = models.Payment(
        school_id=payment_in.school_id,
        student_id=payment_in.student_id,
        amount=payment_in.amount,
        payment_method=payment_in.payment_method,
        status="PENDING",
        transaction_reference=tx_ref,
        payer_name=payment_in.payer_name
    )
    
    db.add(new_payment)
    db.commit()
    db.refresh(new_payment)
    
    return {
        "message": "Payment transaction initiated successfully.",
        "transaction_reference": tx_ref,
        "status": "PENDING"
    }

@router.post("/webhook/callback")
def payment_webhook_callback(payload: WebhookCallback, db: Session = Depends(get_db)):
    # Find the corresponding transaction entry
    payment = db.query(models.Payment).filter(
        models.Payment.transaction_reference == payload.transaction_reference
    ).first()
    
    if not payment:
        raise HTTPException(status_code=404, detail="Transaction reference not found.")
        
    if payment.status != "PENDING":
        return {"message": "Transaction has already been processed settled.", "status": payment.status}
        
    # Update payment status
    payment.status = payload.status
    
    # If the transaction is verified successful, dynamically offset the student's ledger arrears balance
    if payload.status == "SUCCESS":
        student = db.query(models.Student).filter(models.Student.id == payment.student_id).first()
        if student:
            # Increment total amount paid
            student.fees_paid = (student.fees_paid or Decimal("0.00")) + payment.amount
            
    db.commit()
    return {"message": f"Ledger reconciled successfully as {payload.status}."}