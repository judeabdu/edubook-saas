"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { name: "Features", href: "#features" },
  { name: "How it Works", href: "#how-it-works" },
  { name: "Pricing", href: "#pricing" },
  { name: "Contact", href: "#footer" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="rounded-xl bg-indigo-600 p-2 text-white">
            <GraduationCap size={22} />
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-900">
              EduBook
            </h1>
            <p className="text-xs text-slate-500">
              School Management SaaS
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-xl border border-slate-300 px-5 py-2 text-sm font-semibold hover:bg-slate-100 transition"
          >
            Login
          </Link>

          <Link
            href="/checkout"
            className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700 transition"
          >
            Pay Fees
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="border-t bg-white md:hidden"
          >
            <div className="flex flex-col gap-5 p-6">

              {links.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-medium text-slate-700"
                >
                  {item.name}
                </a>
              ))}

              <Link
                href="/login"
                className="rounded-xl border border-slate-300 px-4 py-3 text-center font-semibold"
              >
                Login
              </Link>

              <Link
                href="/checkout"
                className="rounded-xl bg-indigo-600 px-4 py-3 text-center font-semibold text-white"
              >
                Pay School Fees
              </Link>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}