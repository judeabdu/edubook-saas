'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Settings, Sliders, LayoutDashboard, Database, ArrowLeft } from 'lucide-react';

export default function AdminPanel() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-gray-900 text-white p-6 flex flex-col justify-between">
        <div className="space-y-8">
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-indigo-400" />
            <span className="font-bold text-xl tracking-tight">SuperAdmin</span>
          </div>
          <nav className="space-y-2">
            <div className="flex items-center space-x-3 bg-gray-800 text-indigo-400 p-2.5 rounded-lg text-sm font-medium">
              <Settings className="h-4 w-4" />
              <span>System Configuration</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-400 p-2.5 rounded-lg text-sm font-medium">
              <Database className="h-4 w-4" />
              <span>Tenant Databases</span>
            </div>
          </nav>
        </div>
        <Link href="/dashboard" className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition pt-4 border-t border-gray-800">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </Link>
      </aside>

      <main className="flex-1 p-8 md:p-12">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">System Controls</h1>
          <p className="text-sm text-gray-500 mt-1">Manage network parameters, cross-tenant isolation profiles, and active clusters.</p>
        </header>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 max-w-3xl">
          <div className="flex items-center space-x-2 mb-6 text-gray-800 font-bold">
            <Sliders className="h-5 w-5 text-indigo-500" />
            <h2>Global Tenant Rule Allocations</h2>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-gray-800">Enforce Hard Multi-Tenancy Matrix</p>
                <p className="text-xs text-gray-500">Isolate database schema routing completely at connection strings boundaries.</p>
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full">ACTIVE</span>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-gray-800">Global Webhook Influx Gate</p>
                <p className="text-xs text-gray-500">Reroute mobile money validation calls through automated fallback relays.</p>
              </div>
              <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-2.5 py-1 rounded-full">STANDBY</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}