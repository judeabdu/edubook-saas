"use client";

import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="bg-slate-900 text-white"
    >
      <div className="mx-auto max-w-7xl px-6 py-14">

        <div className="grid gap-12 md:grid-cols-3">

          <div>

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-indigo-600 p-2">
                <GraduationCap />
              </div>

              <div>

                <h3 className="text-xl font-bold">
                  EduBook
                </h3>

                <p className="text-slate-400 text-sm">
                  School Management SaaS
                </p>

              </div>

            </div>

            <p className="mt-5 text-slate-400 leading-7">
              Modern school management and secure fee collection
              platform built for African educational institutions.
            </p>

          </div>

          <div>

            <h4 className="font-bold">
              Quick Links
            </h4>

            <div className="mt-5 flex flex-col gap-3">

              <Link href="/">Home</Link>

              <Link href="/checkout">
                Pay Fees
              </Link>

              <Link href="/login">
                Login
              </Link>

            </div>

          </div>

          <div>

            <h4 className="font-bold">
              Contact
            </h4>

            <p className="mt-5 text-slate-400">
              support@edubook.africa
            </p>

            <p className="mt-2 text-slate-400">
              Kampala, Uganda
            </p>

          </div>

        </div>

        <div className="mt-12 border-t border-slate-700 pt-6 text-center text-slate-400 text-sm">
          © {new Date().getFullYear()} EduBook. All rights reserved.
        </div>

      </div>
    </footer>
  );
}