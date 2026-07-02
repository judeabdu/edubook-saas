"use client";

import React, { useState } from "react";

export default function CheckoutPage() {
  const [schoolId, setSchoolId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      // Pointing directly to our backend endpoint we just wired up
      const response = await fetch("http://localhost:8000/api/v1/payments/initiate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          school_id: schoolId,
          amount: parseFloat(amount),
          phone_number: phoneNumber,
          student_identifier: studentId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Something went wrong processing payment.");
      }

      setMessage({
        type: "success",
        text: `🚀 ${data.message || "USSD prompt dispatched! Please check your phone to confirm your PIN."}`,
      });
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.message || "Failed to establish a network connection with the payment gateway.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        
        {/* Header/Branding Banner */}
        <div className="bg-indigo-600 px-6 py-8 text-center text-white">
          <h2 className="text-2xl font-bold tracking-tight">EduBook Portal</h2>
          <p className="text-indigo-100 text-sm mt-1">Multi-Tenant Institutional Fees Collection</p>
        </div>

        {/* Form Elements */}
        <form onSubmit={handlePayment} className="p-6 space-y-5">
          
          {/* School Identifier UUID */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              School Instance ID
            </label>
            <input
              type="text"
              required
              placeholder="e.g., d3b07384-d113-4ec2-a5d2..."
              value={schoolId}
              onChange={(e) => setSchoolId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
            />
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
            <p className="text-[11px] text-slate-400 mt-1">Supports MTN MoMo & Airtel Money formats.</p>
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
              placeholder="Enter fee breakdown sum"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold text-sm"
            />
          </div>

          {/* User Feedback Notifications */}
          {message.text && (
            <div
              className={`p-4 rounded-xl text-xs font-medium border ${
                message.type === "success"
                  ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                  : "bg-rose-50 border-rose-200 text-rose-800"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Action Trigger Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-xl font-medium text-white transition-all text-sm shadow-md shadow-indigo-100 ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Processing Gateway Connection...
              </span>
            ) : (
              "Initiate Mobile Money Fee Securely"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}