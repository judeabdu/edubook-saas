'use client';

import React, { useEffect, useState } from 'react';
import { UserPlus, Search, GraduationCap, Phone } from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { supabase } from '@/lib/supabase';

export default function StudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudents() {
      const { data, error } = await supabase
        .from('students')
        .select('*');
      
      if (!error) setStudents(data || []);
      setLoading(false);
    }
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Student Information Hub</h1>
      
      <input 
        type="text" 
        placeholder="Search students..." 
        className="border p-2 rounded-lg w-full max-w-sm"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? <p>Loading registry...</p> : (
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
                <TableCell>{student.name}</TableCell>
                <TableCell className="font-mono">{student.token_id}</TableCell>
                <TableCell>{student.class_cohort}</TableCell>
                <TableCell>{student.parent_phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}