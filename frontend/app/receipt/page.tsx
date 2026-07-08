'use client';

import React from 'react';
import Link from 'next/link';
import { School, Printer, Download, Receipt } from 'lucide-react';

export default function ReceiptView() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white border border-gray-200 shadow-sm rounded-2xl p-8 space-y-8">
        
        <header className="flex justify-between items-start border-b border-gray-100 pb-6">
          <div className="flex items-center space-x-2">
            <School className="h-6 w-6 text-blue-600" />
            <div>
              <span className="font-bold text-lg text-gray-900 block">EduBook Portal</span>
              <span className="text-xs text-gray-400">Kampala Campus Node</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs uppercase tracking-wider text-gray-400 font-bold">Official Invoice Receipt</span>
            <div className="text-sm font-mono text-gray-900 font-medium mt-1">#EB-9481-2026</div>
          </div>
        </header>

        <section className="grid grid-cols-2 gap-4 text-xs text-gray-600">
          <div>
            <span className="font-bold block text-gray-400 uppercase tracking-wider mb-1">Billed To</span>
            <p className="font-semibold text-gray-900">Ssenkindu Abdushakuluh</p>
            <p>Computer Science Cohort</p>
          </div>
          <div className="text-right">
            <span className="font-bold block text-gray-400 uppercase tracking-wider mb-1">Date Realized</span>
            <p className="font-semibold text-gray-900">{new Date().toLocaleDateString()}</p>
            <p>Settlement Gateway Mode: Digital Clearing</p>
          </div>
        </section>

        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-xs font-bold text-gray-400 uppercase tracking-wider">
              <th className="py-2">Fee Allocation Segment</th>
              <th className="py-2 text-right">Sum Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            <tr><td className="py-3">Semester Tuition Fee Allocation Matrix</td><td className="py-3 text-right font-medium">$400.00</td></tr>
            <tr><td className="py-3">Examination Processing Assessment Charge</td><td className="py-3 text-right font-medium">$50.00</td></tr>
          </tbody>
        </table>

        <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md font-semibold">
            <Receipt className="h-4 w-4" />
            <span>PAID IN FULL</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-400 font-medium">Aggregate Remittance:</span>
            <div className="text-2xl font-extrabold text-gray-900">$450.00</div>
          </div>
        </div>

        <footer className="pt-6 border-t border-gray-100 flex justify-between items-center gap-4">
          <button onClick={() => window.print()} className="inline-flex items-center text-xs text-gray-500 hover:text-gray-900 font-semibold transition">
            <Printer className="h-4 w-4 mr-1.5" /> Print Statement
          </button>
          <Link href="/dashboard" className="text-xs text-blue-600 hover:text-blue-700 font-bold transition">
            Return to central ledger overview
          </Link>
        </footer>

      </div>
    </div>
  );
}