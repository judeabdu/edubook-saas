'use client';

import React from 'react';
import Link from 'next/link';
import { XCircle, RefreshCw, HelpCircle } from 'lucide-react';

export default function PaymentFailed() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-sm w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center space-y-6">
        <div className="inline-flex p-3 bg-red-50 rounded-full text-red-600">
          <XCircle className="h-12 w-12" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transaction Authorization Declined</h1>
          <p className="text-sm text-gray-500 mt-2">
            The balance clearing gateway rejected the transaction payload. Ensure valid liquidity or network handshake state.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Link href="/checkout" className="inline-flex items-center justify-center bg-blue-600 text-white font-medium p-2.5 rounded-lg text-sm hover:bg-blue-700 transition shadow-xs">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry Settlement Call
          </Link>
          <Link href="/" className="inline-flex items-center justify-center bg-white border border-gray-200 text-gray-600 text-sm font-medium p-2.5 rounded-lg hover:bg-gray-50 transition">
            <HelpCircle className="h-4 w-4 mr-2" />
            Contact Bursar Office Support
          </Link>
        </div>
      </div>
    </div>
  );
}