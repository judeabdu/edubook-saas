from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel, Field
from typing import Dict, Any
from app.services.momo import momo_service

router = APIRouter()

class FeePaymentRequest(BaseModel):
    student_id: int = Field(..., description="ID of the student whose fees are being paid")
    amount: float = Field(..., gt=0, description="Amount in UGX")
    phone_number: str = Field(..., description="Parent's mobile money phone number (e.g., 077XXXXXXX or 070XXXXXXX)")
    reference_id: str = Field(..., description="Unique transaction reference code from your system")

@router.post("/collect", response_model=Dict[str, Any])
async def collect_school_fees(payload: FeePaymentRequest):
    """
    Triggers an asynchronous push notification (STK Push) to the parent's phone
    to initiate school fee collection.
    """
    result = await momo_service.initiate_fee_payment(
        amount=payload.amount,
        phone_number=payload.phone_number,
        student_id=payload.student_id,
        reference_id=payload.reference_id
    )
    
    if result.get("status") == "failed":
        raise HTTPException(status_code=400, detail="Mobile Money push initiation failed.")
        
    return result

@router.get("/status/{transaction_id}", response_model=Dict[str, Any])
async def check_payment_status(transaction_id: str):
    """
    Polls the telecom API gateway to confirm if the parent entered their PIN
    and completed the payment.
    """
    status = await momo_service.verify_transaction_status(transaction_id)
    return status