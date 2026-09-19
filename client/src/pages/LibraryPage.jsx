import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import LibrarySection from '../components/LibrarySection';
import LibraryFAQSection from '../components/LibraryFAQSection';
import SROTrackerWidget from '../components/SROTrackerWidget';
import { BookOpen, Sparkles, PhoneCall } from 'lucide-react';

export default function LibraryPage({ resources }) {
  const navigate = useNavigate();

  const handleConsult = (note) => {
    navigate('/contact', { state: { preSelectedService: note } });
  };

  return (
    <div className="space-y-20 pb-20">
      <PageHeader
        title="Professional Library, Circulars & Statutory FAQs"
        subtitle="Authoritative publications, Finance Act amendments, VAT compliance checklists, transfer pricing guides, SRO trackers, and practical FAQs curated by our tax and assurance practitioners."
        badge="Regulatory Intelligence"
        breadcrumbs={[{ name: 'Library' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* 1. Core Searchable & Filterable Library with Document Inspector */}
        <LibrarySection 
          resources={resources} 
          onConsultResource={handleConsult}
        />

        {/* 2. Official SRO & Regulatory Gazettes Monitor */}
        <SROTrackerWidget 
          onRequestSRO={handleConsult} 
        />

        {/* 3. Statutory FAQs Section (Section 7 of Requirements) */}
        <LibraryFAQSection 
          onAskQuestion={handleConsult} 
        />

        {/* 4. Bottom Advisory Callout Banner */}
        <div className="rounded-3xl navy-gradient p-8 sm:p-12 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-2 max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Specialized Statutory R&D</span>
            </div>
            <h3 className="text-2xl font-extrabold">Need Custom SRO Research or Corporate Policy Drafting?</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Our research department drafts customized Standard Operating Procedures (SOPs), transfer pricing studies, and technical tax opinions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleConsult('Custom Research / SOP Policy Drafting')}
              className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow transition"
            >
              Request Research Engagement
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
