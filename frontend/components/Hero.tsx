'use client';

import Link from 'next/link';
import { Menu, School } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-2">
            <School className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl text-gray-900">EduBook</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <Link href="#features" className="text-gray-600 hover:text-blue-600">Features</Link>
            <Link href="#how-it-works" className="text-gray-600 hover:text-blue-600">How It Works</Link>
            <Link href="#pricing" className="text-gray-600 hover:text-blue-600">Pricing</Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-gray-700 hover:text-gray-900 font-medium">
              Sign In
            </Link>
            <Link href="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}