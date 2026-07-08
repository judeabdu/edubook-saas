'use client';

import React, { useEffect, useState } from 'react';
import { UserPlus, Loader2 } from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { supabase } from '@/lib/supabase';

export default function StudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adding, setAdding] = useState(false);

  async function fetchStudents() {
    setLoading(true);
    const { data } = await supabase.from('students').select('*');
    setStudents(data || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchStudents();
  }, []);

  async function handleAddStudent(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAdding(true);
    const formData = new FormData(e.currentTarget);
    
    // Note: Replace 'YOUR_UUID' with your actual school ID from the schools table
    await supabase.from('students').insert([
      {
        school_id: 'YOUR_UUID_HERE', 
        name: formData.get('name'),
        token_id: formData.get('token'),
        class_cohort: formData.get('class'),
        parent_phone: formData.get('phone'),
      }
    ]);

    setAdding(false);
    setIsModalOpen(false);
    fetchStudents(); // Refresh list
  }

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Registry</h1>
          <p className="text-sm text-gray-500">Manage student profiles and enrollment data.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition"
        >
          <UserPlus className="h-4 w-4" /> <span>Add New Student</span>
        </button>
      </div>
      
      <input 
        type="text" 
        placeholder="Search by name..." 
        className="border border-gray-200 p-2 rounded-lg w-full max-w-sm focus:ring-2 focus:ring-blue-500 outline-none"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <div className="flex justify-center p-10"><Loader2 className="animate-spin text-blue-600" /></div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Class Token</TableHead>
                <TableHead>Cohort</TableHead>
                <TableHead>Phone</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell className="font-mono text-blue-600">{student.token_id}</TableCell>
                  <TableCell>{student.class_cohort}</TableCell>
                  <TableCell>{student.parent_phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Add Student Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <form onSubmit={handleAddStudent} className="bg-white p-6 rounded-2xl w-full max-w-md space-y-4 shadow-xl">
            <h2 className="text-lg font-bold">Register New Student</h2>
            <input name="name" placeholder="Full Name" className="w-full border p-2 rounded-lg" required />
            <input name="token" placeholder="Class Token" className="w-full border p-2 rounded-lg" required />
            <input name="class" placeholder="Cohort (e.g. S.4)" className="w-full border p-2 rounded-lg" required />
            <input name="phone" placeholder="Parent Phone (+256...)" className="w-full border p-2 rounded-lg" required />
            <div className="flex justify-end space-x-3 pt-4">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-500 hover:text-gray-700">Cancel</button>
              <button disabled={adding} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                {adding ? 'Saving...' : 'Register Student'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}