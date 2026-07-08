'use client';

import React from 'react';
import Link from 'next/link';
import { School, LayoutDashboard, CreditCard, Users, History, LogOut, BarChart3 } from 'lucide-react';

export default function Dashboard() {
  const metrics = [
    { label: 'Total Fees Collected', value: '$12,450', change: '+14% this month' },
    { label: 'Pending Invoices', value: '42', change: 'Requires review' },
    { label: 'Active Registered Students', value: '380', change: '2 branches' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar navigation alignment */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col justify-between p-6">
        <div className="space-y-8">
          <div className="flex items-center space-x-2">
            <School className="h-6 w-6 text-blue-400" />
            <span className="font-bold text-xl tracking-tight">EduBook</span>
          </div>
          <nav className="space-y-2">
            {/* Overview Link - Currently Active */}
            <Link href="/dashboard" className="w-full flex items-center space-x-3 bg-gray-800 text-blue-400 p-2.5 rounded-lg text-sm font-medium transition">
              <LayoutDashboard className="h-5 w-5" />
              <span>Overview</span>
            </Link>

            {/* Fee Collection Link */}
            <Link href="/dashboard/fee-collection" className="w-full flex items-center space-x-3 text-gray-400 hover:bg-gray-800 hover:text-white p-2.5 rounded-lg text-sm font-medium transition">
              <CreditCard className="h-5 w-5" />
              <span>Fee Collection</span>
            </Link>

            {/* Students Link */}
            <Link href="/dashboard/students" className="w-full flex items-center space-x-3 text-gray-400 hover:bg-gray-800 hover:text-white p-2.5 rounded-lg text-sm font-medium transition">
              <Users className="h-5 w-5" />
              <span>Students</span>
            </Link>

            {/* Analytics Link */}
            <Link href="/dashboard/analytics" className="w-full flex items-center space-x-3 text-gray-400 hover:bg-gray-800 hover:text-white p-2.5 rounded-lg text-sm font-medium transition">
              <BarChart3 className="h-5 w-5" />
              <span>Analytics</span>
            </Link>
          </nav>
        </div>
        
        <Link href="/" className="flex items-center space-x-3 text-gray-400 hover:text-red-400 text-sm font-medium pt-4 border-t border-gray-800 transition">
          <LogOut className="h-5 w-5" />
          <span>Exit Workspace</span>
        </Link>
      </aside>

      {/* Primary Dashboard Working Screen content view */}
      <main className="flex-1 p-8 overflow-y-auto">
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
      </main>
    </div>
  );
}