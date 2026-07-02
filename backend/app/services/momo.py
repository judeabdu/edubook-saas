import httpx
import logging
from typing import Dict, Any, Optional
from decimal import Decimal

logger = logging.getLogger(__name__)

class MobileMoneyService:
    def __init__(self):
        # In a production setup, these pull cleanly via app.core.config.settings
        self.api_url = "https://sandbox.momodeveloper.mtn.com"  # Base provider endpoint
        self.timeout = 30.0

    async def initiate_collection(
        self, 
        amount: Decimal, 
        phone_number: str, 
        reference_id: str,
        student_id: str
    ) -> Dict[str, Any]:
        """
        Triggers an asynchronous push notification (USSD Pin Prompt) 
        to the client handset (MTN MoMo / Airtel Money).
        """
        # Ensure regional MSISDN formatting (e.g., matching Uganda 256 tracking)
        formatted_phone = phone_number.strip().replace("+", "")
        if formatted_phone.startswith("0"):
            formatted_phone = "256" + formatted_phone[1:]

        # Sandbox payload map example matching standardized telecom gateway parameters
        payload = {
            "amount": str(amount),
            "currency": "UGX",
            "externalId": reference_id,
            "payer": {
                "partyIdType": "MSISDN",
                "partyId": formatted_phone
            },
            "payerMessage": f"School Fees Payment for Student {student_id}",
            "payeeNote": "EduBook Collection"
        }

        headers = {
            "X-Reference-Id": reference_id,
            "Content-Type": "application/json",
            # "Authorization": f"Bearer {token}" -> Provided by authorization routines
        }

        async with httpx.AsyncClient(timeout=self.timeout) as client:
            try:
                # Simulation target — swap out with specific local aggregator/telecom endpoints
                logger.info(f"Initiating MoMo collection for reference: {reference_id}")
                
                # For local testing, we capture execution without crashing if mock lines aren't ready
                # response = await client.post(f"{self.api_url}/collection/v1_0/requesttopay", json=payload, headers=headers)
                
                # Mocking a successful structural validation return from gateway pipeline
                return {
                    "success": True,
                    "provider_status": "PENDING",
                    "message": "USSD prompt sent successfully."
                }
            except httpx.HTTPError as exc:
                logger.error(f"HTTP Gateway breakdown initiating MoMo payment: {exc}")
                return {
                    "success": False,
                    "provider_status": "FAILED",
                    "message": "Network transport timeout or gateway failure."
                }

# Export an accessible singleton instance
momo_service = MobileMoneyService()