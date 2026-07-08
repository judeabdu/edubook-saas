import { CreditCard, Landmark, Shield, Users, Layers, Bell } from 'lucide-react';

export default function Features() {
  const items = [
    { icon: Layers, title: 'Multi-Tenant Isolation', desc: 'Completely separated databases, branches, data rules, and assets configuration unique to your school system layout.' },
    { icon: CreditCard, title: 'Instant Mobile & Card Invoicing', desc: 'Generate customized tuition fee invoices instantly via instant system notification triggers.' },
    { icon: Landmark, title: 'Bank Reconciliation Gateway', desc: 'Direct mapping matches payment systems transactions and slips smoothly to mitigate standard human audit delays.' },
    { icon: Users, title: 'User Access Matrix Roles', desc: 'Provide structural dashboards for Directors, Bursars, Registrars, and individual Parents.' },
    { icon: Bell, title: 'Automatic Reminders', desc: 'Send automated text alerts or balance notices to accounts immediately clear of structured due target limits.' },
    { icon: Shield, title: 'Enterprise Data Shielding', desc: 'High tier security schemas protecting system user accounting data records perfectly on any transaction scale.' },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Engineered for Robust Financial Workflows</h2>
          <p className="mt-4 text-gray-600">Everything needed to eradicate manual tracing errors and unify operations across your entire administration spectrum.</p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((feat, index) => (
            <div key={index} className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className="bg-blue-50 text-blue-600 p-3 rounded-lg inline-block mb-4">
                <feat.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feat.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}