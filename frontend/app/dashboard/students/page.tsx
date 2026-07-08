'use client';

import React, { useState } from 'react';
import { UserPlus, Search, GraduationCap, Phone, ShieldAlert } from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Local state preview array simulating database query entries
  const students = [
    { id: '1', name: 'Mukasa John', structuralClass: 'Senior 4 Blue', token: 'KSS-2026-001', phone: '+256 701 234567', balanceStatus: 'Cleared' },
    { id: '2', name: 'Nalubega Sarah', structuralClass: 'Senior 1 Gold', token: 'KSS-2026-089', phone: '+256 772 987654', balanceStatus: 'Arrears Pending' },
    { id: '3', name: 'Ochen David', structuralClass: 'Senior 6 Arts', token: 'KSS-2026-142', phone: '+256 755 443322', balanceStatus: 'Arrears Pending' },
  ];

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.token.includes(searchTerm)
  );

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Student Information Hub</h1>
          <p className="text-sm text-gray-500">Manage enrollment rosters, tracking credentials, and institutional billing profiles.</p>
        </div>
        <button className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg font-medium text-sm hover:bg-blue-700 shadow-sm transition self-start sm:self-auto">
          <UserPlus className="h-4 w-4" />
          <span>Register New Student</span>
        </button>
      </div>

      <div className="flex items-center bg-white border border-gray-200 rounded-xl px-3.5 py-2 w-full max-w-md shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition">
        <Search className="h-4 w-4 text-gray-400 mr-2.5 shrink-0" />
        <input 
          type="text" 
          placeholder="Search student names or token IDs..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-sm bg-transparent outline-none text-gray-700"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student Name</TableHead>
            <TableHead>Class Token</TableHead>
            <TableHead>Class/Cohort</TableHead>
            <TableHead>Parent Phone</TableHead>
            <TableHead>Fee Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStudents.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-semibold text-gray-900 flex items-center space-x-2">
                <div className="p-1.5 bg-gray-100 text-gray-600 rounded-md"><GraduationCap className="h-4 w-4" /></div>
                <span>{student.name}</span>
              </TableCell>
              <TableCell className="font-mono font-medium text-xs text-gray-500">{student.token}</TableCell>
              <TableCell>{student.structuralClass}</TableCell>
              <TableCell className="inline-flex items-center text-gray-600 gap-1.5"><Phone className="h-3 w-3" />{student.phone}</TableCell>
              <TableCell>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                  student.balanceStatus === 'Cleared' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                }`}>
                  {student.balanceStatus}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}