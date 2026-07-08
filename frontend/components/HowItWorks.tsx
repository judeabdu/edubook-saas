import { UserPlus, Settings, CheckCircle2 } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    { icon: UserPlus, label: '1. Register Subdomain', title: 'Onboard Institution', description: 'Configure custom domains, tenants, name spaces, and campus branch clusters in under 2 minutes.' },
    { icon: Settings, label: '2. Structuring Classes', title: 'Assign Fee Structure', description: 'Map out targeted structural fees broken down specifically across distinct streams or academic terms.' },
    { icon: CheckCircle2, label: '3. Collect Live Payments', title: 'Track System Influx', description: 'Parents view ledger states and initiate transparent digital collections routed straight to your clearing accounts.' }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Simple Three Step Lifecycle Integration</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => (
            <div key={idx} className="text-center flex flex-col items-center">
              <div className="bg-blue-600 text-white p-4 rounded-full shadow-lg mb-6">
                <step.icon className="h-8 w-8" />
              </div>
              <span className="text-xs font-bold text-blue-600 tracking-wider uppercase mb-2">{step.label}</span>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm max-w-xs">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}