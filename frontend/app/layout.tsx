'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { School, LayoutDashboard, CreditCard, Users, LogOut, BarChart3 } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Helper function to dynamically add active blue highlighting based on current route tracking
  const getLinkClass = (path: string) => {
    const baseClass = "w-full flex items-center space-x-3 p-2.5 rounded-lg text-sm font-medium transition";
    if (pathname === path) {
      return `${baseClass} bg-gray-800 text-blue-400`;
    }
    return `${baseClass} text-gray-400 hover:bg-gray-800 hover:text-white`;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* PERSISTENT SIDEBAR PANEL */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col justify-between p-6 fixed h-full z-10">
        <div className="space-y-8">
          <div className="flex items-center space-x-2">
            <School className="h-6 w-6 text-blue-400" />
            <span className="font-bold text-xl tracking-tight">EduBook</span>
          </div>
          <nav className="space-y-2">
            <Link href="/dashboard" className={getLinkClass('/dashboard')}>
              <LayoutDashboard className="h-5 w-5" />
              <span>Overview</span>
            </Link>

            <Link href="/dashboard/fee-collection" className={getLinkClass('/dashboard/fee-collection')}>
              <CreditCard className="h-5 w-5" />
              <span>Fee Collection</span>
            </Link>

            <Link href="/dashboard/students" className={getLinkClass('/dashboard/students')}>
              <Users className="h-5 w-5" />
              <span>Students</span>
            </Link>

            <Link href="/dashboard/analytics" className={getLinkClass('/dashboard/analytics')}>
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

      {/* DYNAMIC RIGHT-HAND CONTAINER WORKSPACE */}
      <div className="flex-1 pl-64 w-full">
        <main className="min-h-screen w-full">
          {children}
        </main>
      </div>
    </div>
  );
}