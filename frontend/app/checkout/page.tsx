"use client";

import React, { useState, useEffect } from "react";

interface SchoolTenant {
  id: string;
  name: string;
  subdomain: string;
}

export default function CheckoutPage() {
  const [schools, setSchools] = useState<SchoolTenant[]>([]);
  const [schoolId, setSchoolId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingSchools, setFetchingSchools] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  // Automatically fetch live registered schools from the cloud database
  useEffect(() => {
    async function loadSchools() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/schools/`);
        if (!res.ok) throw new Error("Failed to capture institution indices.");
        const data = await res.get_db ? await res.json() : await res.json();
        setSchools(data);
      } catch (err) {
        console.error("Error pulling schools:", err);
      } finally {
        setFetchingSchools(false);
      }
    }
    loadSchools();
  }, [API_BASE_URL]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/payments/initiate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          school_id: schoolId,
          amount: parseFloat(amount),
          phone_number: phoneNumber,
          student_identifier: studentId,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Transaction processing failed.");

      setMessage({
        type: "success",
        text: `🚀 ${data.message || "USSD Pin Prompt dispatched to your handset!"}`,
      });
    } catch (error: any) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        
        <div className="bg-indigo-600 px-6 py-8 text-center text-white">
          <h2 className="text-2xl font-bold tracking-tight">EduBook Portal</h2>
          <p className="text-indigo-100 text-sm mt-1">Multi-Tenant Institutional Fees Collection</p>
        </div>

        <form onSubmit={handlePayment} className="p-6 space-y-5">
          
          {/* Dynamic School Dropdown Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Select School / Institution
            </label>
            <select
              required
              value={schoolId}
              onChange={(e) => setSchoolId(e.target.value)}
              disabled={fetchingSchools}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            >
              <option value="">{fetchingSchools ? "Loading institutions..." : "-- Select your School --"}</option>
              {schools.map((school) => (
                <option key={school.id} value={school.id}>
                  {school.name} ({school.subdomain}.edubook)
                </option>
              ))}
            </select>
          </div>

          {/* Student ID Code */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Student Registration No.
            </label>
            <input
              type="text"
              required
              placeholder="e.g., REG/KU/2026/08"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>

          {/* Phone Number Field */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Mobile Money Phone Number
            </label>
            <div className="relative">
              <input
                type="tel"
                required
                placeholder="e.g., 256771234567"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm pl-12"
              />
              <span className="absolute left-4 top-3 text-slate-400 text-sm font-medium">🇺🇬</span>
            </div>
          </div>

          {/* Amount field */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Amount to Pay (UGX)
            </label>
            <input
              type="number"
              required
              min="500"
              placeholder="Enter fee amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold text-sm"
            />
          </div>

          {message.text && (
            <div className={`p-4 rounded-xl text-xs font-medium border ${message.type === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-rose-50 border-rose-200 text-rose-800"}`}>
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || fetchingSchools}
            className={`w-full py-3 px-4 rounded-xl font-medium text-white transition-all text-sm shadow-md ${loading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]"}`}
          >
            {loading ? "Processing Gateway Connection..." : "Initiate Mobile Money Fee Securely"}
          </button>
        </form>
      </div>
    </div>
  );
}