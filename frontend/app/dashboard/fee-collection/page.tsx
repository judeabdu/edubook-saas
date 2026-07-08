'use client';

import React, { useState } from 'react';
import { CreditCard, ArrowUpRight, DollarSign, History } from 'lucide-react';
import PaymentModal from '../components/PaymentModal';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

export default function FeeCollectionPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const transactions = [
    { id: 'TX-102', student: 'Nalubega Sarah', amount: '450,000', method: 'MTN MoMo', date: 'Today, 10:14 AM', status: 'SUCCESS' },
    { id: 'TX-101', student: 'Mukasa John', amount: '1,200,000', method: 'Bank Slip Entry', date: 'Yesterday', status: 'SUCCESS' },
    { id: 'TX-100', student: 'Ochen David', amount: '350,000', method: 'Airtel Money', date: '04 July 2026', status: 'PENDING' },
  ];

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Fee Collection Terminal</h1>
          <p className="text-sm text-gray-500">Collect real-time mobile entries, verify manual balances, and review audit parameters.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg font-medium text-sm hover:bg-blue-700 shadow-sm transition self-start sm:self-auto"
        >
          <CreditCard className="h-4 w-4" />
          <span>Collect Direct Fees</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900 text-base">Instant Payment Integration Hooks</h3>
            <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-medium">Gateways Active</span>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            EduBook triggers cellular system push notifications directly down to parental mobile networks to maximize structural cash liquidity instantly.
          </p>
          <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-gray-600">
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-yellow-400" /> MTN MoMo API</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-red-500" /> Airtel Money API</span>
          </div>
        </div>

        <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Expected Term Influx</p>
              <h2 className="text-2xl font-black text-gray-900">48,250,000 <span className="text-sm font-normal text-gray-500">UGX</span></h2>
            </div>
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl"><DollarSign className="h-5 w-5" /></div>
          </div>
          <div className="text-xs text-gray-500 mt-4 flex items-center text-emerald-600 font-medium">
            <ArrowUpRight className="h-4 w-4 mr-1" />
            <span>72% collection rate achieved relative to current cycle target projections</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-gray-900 font-bold text-base">
          <History className="h-4 w-4 text-gray-400" />
          <h3>Recent Operational Influx Ledger</h3>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction Reference</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Amount (UGX)</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Execution Window</TableHead>
              <TableHead>Status Code</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell className="font-mono font-semibold text-gray-900 text-xs">{tx.id}</TableCell>
                <TableCell className="font-medium text-gray-700">{tx.student}</TableCell>
                <TableCell className="font-mono font-bold text-gray-900">{tx.amount}</TableCell>
                <TableCell className="text-gray-600 text-xs">{tx.method}</TableCell>
                <TableCell className="text-gray-500 text-xs">{tx.date}</TableCell>
                <TableCell>
                  <span className={`inline-flex px-2 py-0.5 rounded-md text-xs font-bold tracking-wide ${
                    tx.status === 'SUCCESS' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {tx.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {isModalOpen && (
        <PaymentModal schoolId="main-tenant-uuid" onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}