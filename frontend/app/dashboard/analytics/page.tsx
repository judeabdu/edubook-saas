'use client';

import React from 'react';
import { BarChart3, TrendingUp, Users, Wallet } from 'lucide-react';
import { SimpleBarChart } from '@/components/ui/chart';

export default function AnalyticsPage() {
  const collectionData = [
    { label: 'Week 1 (Term Open)', value: 12450000 },
    { label: 'Week 2 (Installments)', value: 18200000 },
    { label: 'Week 3 (Current Frame)', value: 8900000 },
    { label: 'Week 4 (Projections)', value: 4100000 },
  ];

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Institutional Revenue Analytics</h1>
        <p className="text-sm text-gray-500">High-level financial performance metrics and collection timelines.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Wallet className="h-5 w-5" /></div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Gross Income Liquidity</p>
            <h3 className="text-xl font-bold text-gray-900">39,550,000 UGX</h3>
          </div>
        </div>
        <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><TrendingUp className="h-5 w-5" /></div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Arrears Outstanding</p>
            <h3 className="text-xl font-bold text-gray-900 text-amber-600">8,700,000 UGX</h3>
          </div>
        </div>
        <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><Users className="h-5 w-5" /></div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Paying Coverage</p>
            <h3 className="text-xl font-bold text-gray-900">84.2% Active</h3>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm space-y-6">
        <div className="flex items-center space-x-2 text-gray-900 font-bold text-base">
          <BarChart3 className="h-4 w-4 text-gray-400" />
          <h3>Weekly Fee Volume Trajectory</h3>
        </div>
        <div className="max-w-3xl pt-2">
          <SimpleBarChart data={collectionData} />
        </div>
      </div>
    </div>
  );
}