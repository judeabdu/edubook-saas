import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
        <div>
          &copy; {new Date().getFullYear()} EduBook SaaS. All rights reserved.
        </div>
        <div className="flex space-x-6">
          <Link href="#features" className="hover:text-blue-600">Features</Link>
          <Link href="#pricing" className="hover:text-blue-600">Pricing</Link>
          <Link href="/terms" className="hover:text-blue-600">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}