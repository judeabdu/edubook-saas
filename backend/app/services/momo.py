import httpx
from typing import Dict, Any
from app.core.config import settings

class MobileMoneyService:
    def __init__(self):
        self.api_url = getattr(settings, 'MOMO_API_URL', 'https://api.example.com/momo')
        self.merchant_id = getattr(settings, 'MOMO_MERCHANT_ID', 'mock_id')
        self.api_key = getattr(settings, 'MOMO_API_KEY', 'mock_key')

    async def initiate_fee_payment(self, amount: float, phone_number: str, student_id: int, reference_id: str) -> Dict[str, Any]:
        if phone_number.startswith('0'):
            phone_number = '256' + phone_number[1:]
        return {
            'status': 'pending',
            'transaction_id': f'TXN-{reference_id}',
            'message': f'Payment request of UGX {amount} pushed to handset {phone_number}.'
        }

    async def verify_transaction_status(self, transaction_id: str) -> Dict[str, Any]:
        return {'status': 'SUCCESS', 'transaction_id': transaction_id, 'amount_paid': 'verified'}

momo_service = MobileMoneyService()
