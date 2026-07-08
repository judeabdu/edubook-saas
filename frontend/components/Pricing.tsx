import { Check } from 'lucide-react';
import Link from 'next/link';

export default function Pricing() {
  const tiers = [
    { name: 'Starter Academy', price: '$29', features: ['Up to 250 registered students', 'Single branch system', 'Standard mobile invoicing', 'Email ledger alerts'] },
    { name: 'Institutional Pro', price: '$79', features: ['Up to 1500 students included', 'Multi-branch sync capabilities', 'Automated text alerts integration', 'Advanced audit matrix exports', '24/7 Priority support channel'] },
    { name: 'District Enterprise', price: 'Custom', features: ['Unlimited structural student load', 'Custom subdomains & white labeling', 'Direct dedicated API endpoints hook', 'Comprehensive localized server setup'] }
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Clear Pricing Built for any Scale</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, idx) => (
            <div key={idx} className={`bg-white border rounded-2xl p-8 flex flex-col justify-between shadow-sm relative ${idx === 1 ? 'ring-2 ring-blue-600 border-transparent' : 'border-gray-200'}`}>
              {idx === 1 && <span className="absolute top-0 right-6 transform -translate-y-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Most Popular</span>}
              <div>
                <h3 className="text-xl font-bold text-gray-900">{tier.name}</h3>
                <div className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-4xl font-extrabold tracking-tight">{tier.price}</span>
                  {tier.price !== 'Custom' && <span className="ml-1 text-xl font-semibold text-gray-500">/mo</span>}
                </div>
                <ul className="mt-6 space-y-4">
                  {tier.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start text-sm text-gray-600">
                      <Check className="h-5 w-5 text-blue-600 shrink-0 mr-2" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link href="/register" className={`mt-8 block w-full text-center py-3 px-4 rounded-xl font-semibold text-sm transition ${idx === 1 ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}