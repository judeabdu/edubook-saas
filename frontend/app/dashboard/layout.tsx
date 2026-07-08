import React from 'react';
import Link from 'next/link';
import { School, LayoutDashboard, CreditCard, Users, LogOut, BarChart3 } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 flex text-gray-900">
      {/* Fixed Sidebar Panel */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col justify-between p-6 fixed h-full top-0 left-0 z-50">
        <div className="space-y-8">
          <div className="flex items-center space-x-2">
            <School className="h-6 w-6 text-blue-400" />
            <span className="font-bold text-xl tracking-tight text-white">EduBook</span>
          </div>
          <nav className="space-y-2">
            <Link href="/dashboard" className="w-full flex items-center space-x-3 p-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white transition">
              <LayoutDashboard className="h-5 w-5" />
              <span>Overview</span>
            </Link>
            <Link href="/dashboard/fee-collection" className="w-full flex items-center space-x-3 p-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white transition">
              <CreditCard className="h-5 w-5" />
              <span>Fee Collection</span>
            </Link>
            <Link href="/dashboard/students" className="w-full flex items-center space-x-3 p-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white transition">
              <Users className="h-5 w-5" />
              <span>Students</span>
            </Link>
            <Link href="/dashboard/analytics" className="w-full flex items-center space-x-3 p-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white transition">
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

      {/* Main Workspace Content Area */}
      <div className="flex-1 pl-64 w-full">
        <main className="min-h-screen w-full bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}