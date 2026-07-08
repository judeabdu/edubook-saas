'use client';

import React, { useState } from 'react';
import { CreditCard, Loader2, CheckCircle2, XCircle } from 'lucide-react';

interface PaymentModalProps {
  schoolId: string;
  onClose: () => void;
}

export default function PaymentModal({ schoolId, onClose }: PaymentModalProps) {
  const [studentId, setStudentId] = useState('');
  const [amount, setAmount] = useState('');
  const [payerName, setPayerName] = useState('');
  const [loading, setLoading] = useState(false);
  const [txRef, setTxRef] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'https://edubook-saas.vercel.app';

    try {
      const response = await fetch(`${apiBase}/api/v1/payments/initiate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          school_id: schoolId,
          student_id: studentId,
          amount: parseFloat(amount),
          payment_method: 'MOBILE_MONEY',
          payer_name: payerName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Failed to initiate payment transaction.');
      }

      setTxRef(data.transaction_reference);
      setStatusMessage('Transaction Initiated! Awaiting customer network confirmation handshake...');
    } catch (err: any) {
      setStatusMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 max-w-md w-full p-6 relative animate-in fade-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition text-lg">&times;</button>
        
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2.5 bg-blue-50 rounded-lg text-blue-600">
            <CreditCard className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Collect School Fees</h3>
            <p className="text-xs text-gray-500">Initiate immediate Mobile Money transactions</p>
          </div>
        </div>

        {!txRef ? (
          <form onSubmit={handlePaymentSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Student Database Token ID</label>
              <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} placeholder="e.g. 550e8400-e29b-41d4-a716" required className="w-full text-sm px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-gray-50/50" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Payer Full Name</label>
              <input type="text" value={payerName} onChange={(e) => setPayerName(e.target.value)} placeholder="Parent or Guardian name" required className="w-full text-sm px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-gray-50/50" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Amount to Settle</label>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" min="1" required className="w-full text-sm px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-gray-50/50" />
            </div>

            <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-medium text-sm py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center space-x-2 shadow-sm disabled:opacity-50">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Requesting network token...</span>
                </>
              ) : (
                <span>Push Mobile Money Prompt</span>
              )}
            </button>
          </form>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="inline-flex p-3 bg-emerald-50 text-emerald-600 rounded-full">
              <CheckCircle2 className="h-8 w-8 animate-pulse" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Reference Generated</h4>
              <p className="text-mono text-xs bg-gray-100 px-2.5 py-1 rounded mt-1 font-semibold text-gray-700 inline-block">{txRef}</p>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto">{statusMessage}</p>
            <button onClick={onClose} className="w-full mt-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm py-2.5 rounded-lg transition">
              Close Panel View
            </button>
          </div>
        )}

        {statusMessage && !txRef && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-xs font-medium flex items-center space-x-2">
            <XCircle className="h-4 w-4 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
}