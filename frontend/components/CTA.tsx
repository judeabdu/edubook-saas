import Link from 'next/link';

export default function CTA() {
  return (
    <section className="bg-gray-900 py-16 sm:py-24">
      <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Ready to Modernize Your Fee Ledger?</h2>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
          Join educational institutions streamlining workflows, securing transparent financial statements, and reclaiming administrative time instantly.
        </p>
        <div className="mt-8 flex justify-center">
          <Link href="/register" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg transition">
            Create Your Account Today
          </Link>
        </div>
      </div>
    </section>
  );
}