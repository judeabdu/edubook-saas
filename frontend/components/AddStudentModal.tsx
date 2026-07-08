import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AddStudentModal({ isOpen, onClose, onAdd }: { isOpen: boolean, onClose: () => void, onAdd: () => void }) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    // Replace with your actual school_id logic later
    const { error } = await supabase.from('students').insert([
      {
        school_id: 'YOUR_ACTUAL_SCHOOL_UUID', 
        name: formData.get('name'),
        token_id: formData.get('token'),
        class_cohort: formData.get('class'),
        parent_phone: formData.get('phone'),
      }
    ]);

    if (!error) {
      onAdd();
      onClose();
    }
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">
        <h2 className="text-lg font-bold">Register New Student</h2>
        <input name="name" placeholder="Full Name" className="w-full border p-2 rounded" required />
        <input name="token" placeholder="Class Token (e.g. KSS-001)" className="w-full border p-2 rounded" required />
        <input name="class" placeholder="Cohort (e.g. S.4)" className="w-full border p-2 rounded" required />
        <input name="phone" placeholder="Parent Phone (+256...)" className="w-full border p-2 rounded" required />
        <div className="flex justify-end space-x-2">
          <button type="button" onClick={onClose} className="px-4 py-2 text-gray-500">Cancel</button>
          <button disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
            {loading ? 'Adding...' : 'Save Student'}
          </button>
        </div>
      </form>
    </div>
  );
}