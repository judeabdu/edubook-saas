from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel, Field
from typing import Any
import uuid
from decimal import Decimal

from app.core.database import get_db
from app.models.payment import MobileMoneyTransaction, School
from app.services.momo import momo_service

router = APIRouter()

# Schema for incoming fees collections
class PaymentInitiateRequest(BaseModel):
    school_id: uuid.UUID = Field(..., description="The unique tenant school ID")
    amount: Decimal = Field(..., gt=0, description="Payment transaction total amount")
    phone_number: str = Field(..., example="256771234567")
    student_identifier: str = Field(..., description="Roll registration code or student tracking index")

@router.post("/initiate", status_code=status.HTTP_201_CREATED)
async def initiate_fee_payment(
    payload: PaymentInitiateRequest,
    db: AsyncSession = Depends(get_db)
) -> Any:
    """
    Creates a localized system ledger record and pushes a structural payload 
    to trigger a handset authorization loop.
    """
    # 1. Verify that the school tenant partition exists inside the multi-tenant engine
    school_check = await db.get(School, payload.school_id)
    if not school_check:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The targeted multi-tenant school partition context was not identified."
        )

    # 2. Build our system tracking reference entity layout
    transaction_id = uuid.uuid4()
    
    new_transaction = MobileMoneyTransaction(
        id=transaction_id,
        school_id=payload.school_id,
        amount=payload.amount,
        phone_number=payload.phone_number,
        student_identifier=payload.student_identifier,
        status="PENDING"
    )

    db.add(new_transaction)
    await db.flush()  # Extract state adjustments cleanly without dropping the database handle scope

    # 3. Dispatches payload processing asynchronously to the gateway
    momo_response = await momo_service.initiate_collection(
        amount=payload.amount,
        phone_number=payload.phone_number,
        reference_id=str(transaction_id),
        student_id=payload.student_identifier
    )

    if not momo_response["success"]:
        # Update record fallback immediately inside tracking history lifecycle
        new_transaction.status = "FAILED"
        await db.commit()
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=momo_response["message"]
        )

    # Persist the system references cleanly
    new_transaction.provider_reference = str(transaction_id)
    await db.commit()

    return {
        "transaction_id": transaction_id,
        "school": school_check.name,
        "status": new_transaction.status,
        "message": momo_response["message"]
    }