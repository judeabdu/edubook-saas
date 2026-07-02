"use client";

import React, { useEffect, useState } from "react";

type School = {
  id: string; // UUID
  name: string;
  subdomain: string;
};

export default function Home() {
  const [schools, setSchools] = useState<School[]>([]);
  const [schoolId, setSchoolId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingSchools, setLoadingSchools] = useState(true);
  const [message, setMessage] = useState("");

  const API_BASE = "https://edubook-saas.vercel.app";

  // ===================== LOAD SCHOOLS =====================
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/v1/schools/`);

        if (!res.ok) throw new Error("Failed to load schools");

        const data = await res.json();
        setSchools(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setMessage("❌ Failed to load schools");
      } finally {
        setLoadingSchools(false);
      }
    };

    fetchSchools();
  }, []);

  // ===================== PAYMENT =====================
  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        `${API_BASE}/api/v1/payments/initiate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            school_id: schoolId, // MUST be UUID
            amount: Number(amount),
            phone_number: phoneNumber,
            student_identifier: studentId,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data?.detail || "Payment failed");

      setMessage("✅ Payment initiated successfully");
    } catch (err: any) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>EduBook Portal</h1>

      {/* SCHOOL SELECT */}
      <div>
        <label>School</label>
        <br />
        <select
          value={schoolId}
          onChange={(e) => setSchoolId(e.target.value)}
        >
          <option value="">
            {loadingSchools ? "Loading schools..." : "Select School"}
          </option>

          {schools.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <br />

      {/* STUDENT ID */}
      <input
        placeholder="Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />

      <br /><br />

      {/* PHONE */}
      <input
        placeholder="Phone (256...)"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />

      <br /><br />

      {/* AMOUNT */}
      <input
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <br /><br />

      {/* BUTTON */}
      <button onClick={handlePayment} disabled={loading}>
        {loading ? "Processing..." : "Pay Now"}
      </button>

      {/* MESSAGE */}
      {message && (
        <p style={{ marginTop: 10 }}>{message}</p>
      )}
    </div>
  );
}