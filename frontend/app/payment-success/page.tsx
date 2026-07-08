'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle, ArrowRight, FileText } from 'lucide-react';

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-sm w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center space-y-6">
        <div className="inline-flex p-3 bg-emerald-50 rounded-full text-emerald-600">
          <CheckCircle className="h-12 w-12" />
        </div>
        
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payment Cleared Successfully</h1>
          <p className="text-sm text-gray-500 mt-2">
            The fee reconciliation transaction has processed. Your school account allocation profile has updated in real-time.
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 text-left border border-gray-100 space-y-2 text-xs">
          <div className="flex justify-between text-gray-500"><span>Transaction ID:</span> <span className="font-mono text-gray-900 font-medium">TXN-8402941</span></div>
          <div className="flex justify-between text-gray-500"><span>Amount Remitted:</span> <span className="font-bold text-gray-900">$450.00</span></div>
          <div className="flex justify-between text-gray-500"><span>Status Code:</span> <span className="text-emerald-600 font-semibold">SUCCESS</span></div>
        </div>

        <div className="flex flex-col gap-2">
          <Link href="/receipt" className="inline-flex items-center justify-center bg-gray-900 text-white font-medium p-2.5 rounded-lg text-sm hover:bg-gray-800 transition">
            <FileText className="h-4 w-4 mr-2" />
            Generate PDF Receipt
          </Link>
          <Link href="/dashboard" className="text-xs text-gray-500 hover:text-blue-600 transition font-medium">
            Return to school portal interface
          </Link>
        </div>
      </div>
    </div>
  );
}