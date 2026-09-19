import React from 'react';
import PageHeader from '../components/PageHeader';
import AboutSection from '../components/AboutSection';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Award } from 'lucide-react';

export default function AboutPage({ firmInfo }) {
  return (
    <div>
      <PageHeader
        title="About Tax Assistance (TA)"
        subtitle="Independent member of the Dhaka Taxes Bar Association. Delivering integrated Audit, Tax, Legal, Consulting, and Business Support Services with local depth and uncompromising ethics."
        badge="Firm Profile & Principles"
        breadcrumbs={[{ name: 'About Us' }]}
      />

      <AboutSection firmInfo={firmInfo} />

      {/* Bottom CTA Banner */}
      <section className="py-16 bg-slate-100 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-4">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">Partner with Tax Assistance</h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Experience professional advisory that understands your business, protects your interests, and provides sustainable solutions.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link
              to="/services"
              className="px-5 py-2.5 bg-[#0f2942] hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow transition"
            >
              Explore Our Services
            </Link>
            <Link
              to="/contact"
              className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-xl border border-slate-300 shadow-2xs transition"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
