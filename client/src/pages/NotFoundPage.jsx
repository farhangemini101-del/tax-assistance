import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div>
      <PageHeader
        title="Page Not Found (404)"
        subtitle="The requested page or resource could not be found. Please check the URL or return to our homepage."
        badge="Notice"
      />

      <div className="py-24 bg-white text-center">
        <div className="max-w-md mx-auto px-4">
          <div className="text-6xl font-black text-slate-300 mb-4">404</div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Looking for a specific tax or audit service?</h2>
          <p className="text-xs text-slate-600 mb-6 leading-relaxed">
            Our comprehensive practice areas include Audit & Assurance, Direct Tax, Indirect Tax (VAT), Consulting, and RJSC Business Support.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0f2942] hover:bg-blue-900 text-white font-bold text-xs shadow transition"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
