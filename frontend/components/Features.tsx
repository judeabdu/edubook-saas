"use client";

import {
  School,
  Wallet,
  Users,
  BarChart3,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

const features = [
  {
    icon: School,
    title: "School Management",
    description:
      "Manage students, teachers, classes and academic records from one dashboard.",
  },
  {
    icon: Wallet,
    title: "Fee Collection",
    description:
      "Accept Mobile Money and other supported payment methods securely.",
  },
  {
    icon: Users,
    title: "Parent Portal",
    description:
      "Parents can monitor balances, receipts and student information.",
  },
  {
    icon: BarChart3,
    title: "Reports",
    description:
      "Generate financial and academic reports instantly.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Platform",
    description:
      "Built with modern security practices to protect school data.",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description:
      "Works beautifully on phones, tablets and desktops.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="bg-slate-50 py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-slate-900">
            Everything Your School Needs
          </h2>

          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            EduBook combines school administration, fee collection and
            reporting into one modern cloud platform.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl bg-white p-8 shadow-sm border hover:shadow-xl transition"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-100">
                  <Icon className="text-indigo-600" />
                </div>

                <h3 className="text-xl font-bold">
                  {feature.title}
                </h3>

                <p className="mt-3 text-slate-600 leading-7">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}