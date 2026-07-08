'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { School, CreditCard, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Checkout() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center space-x-2 mb-8">
          <School className="h-6 w-6 text-blue-600" />
          <span className="font-bold text-xl text-gray-900">EduBook Secure Pay</span>
        </div>

        <div className="bg-blue-50 rounded-xl p-4 mb-6">
          <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">Invoice Summary</span>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm font-medium text-gray-700">Term 1 Tuition Fees</span>
            <span className="text-xl font-bold text-gray-900">$450.00</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Student ID: EB-2026-0941</p>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide">Payer Name</label>
            <input type="text" required className="mt-1 block w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:ring-blue-500 focus:border-blue-500" placeholder="John Doe" />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide">Mobile Money Number / Card</label>
            <div className="relative mt-1">
              <input type="text" required className="block w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:ring-blue-500 focus:border-blue-500" placeholder="0700 000 000 / Card Number" />
              <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide">Expiry</label>
              <input type="text" className="mt-1 block w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:ring-blue-500 focus:border-blue-500" placeholder="MM/YY" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide">CVV / PIN</label>
              <input type="password" required className="mt-1 block w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:ring-blue-500 focus:border-blue-500" placeholder="***" />
            </div>
          </div>

          <div className="pt-4">
            <Link href="/payment-success" className="w-full flex justify-center items-center py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm transition shadow-sm">
              Authorize Payment ($450.00)
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </form>

        <div className="mt-6 flex items-center justify-center space-x-2 text-xs text-gray-400 border-t border-gray-50 pt-4">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          <span>Encrypted payment gateway integration layer.</span>
        </div>
      </div>
    </div>
  );
}