"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CreditCard, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-blue-600 text-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:flex lg:items-center lg:justify-between">

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .6 }}
          className="max-w-2xl"
        >
          <span className="rounded-full bg-white/20 px-4 py-2 text-sm">
            🇺🇬 Built for African Schools
          </span>

          <h1 className="mt-6 text-5xl font-black leading-tight">
            Modern School Management &
            <span className="block text-yellow-300">
              Secure Fee Collection
            </span>
          </h1>

          <p className="mt-6 text-lg text-indigo-100">
            EduBook simplifies school administration, student management,
            and Mobile Money fee collection through one secure cloud platform.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/checkout"
              className="rounded-xl bg-white px-6 py-4 font-bold text-indigo-700 hover:scale-105 transition"
            >
              Pay School Fees
            </Link>

            <Link
              href="/login"
              className="rounded-xl border border-white px-6 py-4 font-bold hover:bg-white hover:text-indigo-700 transition"
            >
              School Login
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
          className="mt-14 lg:mt-0"
        >
          <div className="rounded-3xl bg-white p-8 text-slate-800 shadow-2xl">

            <div className="flex items-center gap-3">
              <CreditCard className="text-indigo-600" />
              <h3 className="font-bold text-xl">
                Fee Payment
              </h3>
            </div>

            <p className="mt-3 text-slate-500">
              MTN • Airtel • Visa • Bank
            </p>

            <div className="mt-8 rounded-xl bg-emerald-50 p-5">
              <ShieldCheck className="text-emerald-600 mb-2" />
              <p className="font-semibold">
                Secure Mobile Money Transactions
              </p>
            </div>

            <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-4 font-semibold text-white">
              Get Started
              <ArrowRight size={18}/>
            </button>

          </div>
        </motion.div>

      </div>
    </section>
  );
}