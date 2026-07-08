'use client';

import React from 'react';
import { History } from 'lucide-react';

export default function DashboardOverviewPage() {
  const metrics = [
    { label: 'Total Fees Collected', value: '$12,450', change: '+14% this month' },
    { label: 'Pending Invoices', value: '42', change: 'Requires review' },
    { label: 'Active Registered Students', value: '380', change: '2 branches' },
  ];

  return (
    <div className="p-8 overflow-y-auto">
      <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Administrative Overview</h1>
          <p className="text-sm text-gray-500">Welcome back, Main Office Administrator</p>
        </div>
        <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-xs font-semibold text-blue-600">
          Tenant: Active Branch Sync
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {metrics.map((m, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{m.label}</span>
            <div className="text-3xl font-extrabold text-gray-900 mt-2">{m.value}</div>
            <div className="text-xs font-medium text-emerald-600 mt-2">{m.change}</div>
          </div>
        ))}
      </section>

      <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center space-x-2 text-gray-900 font-bold mb-4">
          <History className="h-5 w-5 text-gray-400" />
          <h2>Recent Payment Real-Time Ledger Logs</h2>
        </div>
        <div className="text-center py-8 text-sm text-gray-400 italic">
          Connected live back-end instances are checking queries...
        </div>
      </section>
    </div>
  );
}