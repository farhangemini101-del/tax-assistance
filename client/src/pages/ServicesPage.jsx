import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import ServicesSection from '../components/ServicesSection';
import ServiceSolutionFinder from '../components/ServiceSolutionFinder';
import ComplianceProcessFlow from '../components/ComplianceProcessFlow';
import BangladeshTaxCalendarWidget from '../components/BangladeshTaxCalendarWidget';
import TiltCard from '../components/TiltCard';
import { 
  Search, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Filter, 
  Layers, 
  ShieldCheck, 
  HelpCircle,
  PhoneCall
} from 'lucide-react';

export default function ServicesPage({ services }) {
  const navigate = useNavigate();
  const [globalSearch, setGlobalSearch] = useState('');

  const handleSelectServiceForInquiry = (serviceTitle) => {
    navigate('/contact', { state: { preSelectedService: serviceTitle } });
  };

  // Collect all searchable deliverables across all 4 pillars
  const allDeliverables = [];
  services.forEach(pillar => {
    pillar.subcategories?.forEach(sub => {
      sub.items?.forEach(item => {
        allDeliverables.push({
          pillarTitle: pillar.title,
          pillarId: pillar.id,
          subTitle: sub.title,
          itemText: item
        });
      });
    });
  });

  const matchingDeliverables = globalSearch.trim()
    ? allDeliverables.filter(d => 
        d.itemText.toLowerCase().includes(globalSearch.toLowerCase()) ||
        d.subTitle.toLowerCase().includes(globalSearch.toLowerCase()) ||
        d.pillarTitle.toLowerCase().includes(globalSearch.toLowerCase())
      )
    : [];

  return (
    <div className="space-y-20 pb-20">
      {/* Page Header */}
      <PageHeader
        title="Comprehensive Advisory & Statutory Practice Areas"
        subtitle="Four specialized service pillars delivering integrated Audit & Assurance, Direct & Indirect Taxation, Financial Consulting & AI Automation, and RJSC/BIDA Business Support."
        badge="Enterprise Capabilities"
        breadcrumbs={[{ name: 'Services' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* 1. Interactive Deliverable Search Engine Bar */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">
                Instant Deliverable Search
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                Search Across 80+ Statutory & Advisory Deliverables
              </h3>
            </div>
            <span className="text-xs text-slate-500">
              e.g. "Section 177", "Mushak 9.1", "BIDA work permit", "QuickBooks", "Transfer Pricing"
            </span>
          </div>

          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Type any tax, audit, VAT, or legal deliverable to pinpoint exact services..."
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 text-xs sm:text-sm border border-slate-200 rounded-2xl focus:outline-none focus:border-blue-500 bg-slate-50 shadow-inner"
            />
          </div>

          {/* Search Results Dropdown / Grid */}
          {globalSearch.trim() && (
            <div className="mt-6 pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-500">
                <span>Matching Deliverables ({matchingDeliverables.length})</span>
                {matchingDeliverables.length > 0 && (
                  <button onClick={() => setGlobalSearch('')} className="text-blue-600 hover:underline">
                    Clear Search
                  </button>
                )}
              </div>

              {matchingDeliverables.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400">
                  No deliverables matched "{globalSearch}". Try searching for "VAT", "Tax", "Audit", "SOP", or "RJSC".
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-1">
                  {matchingDeliverables.map((res, rIdx) => (
                    <div
                      key={rIdx}
                      onClick={() => handleSelectServiceForInquiry(`${res.pillarTitle} - ${res.subTitle}: ${res.itemText}`)}
                      className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 bg-slate-50/70 hover:bg-white transition cursor-pointer flex flex-col justify-between group shadow-2xs"
                    >
                      <div>
                        <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider block">
                          {res.pillarTitle} → {res.subTitle}
                        </span>
                        <h5 className="text-xs font-bold text-slate-900 mt-1 group-hover:text-blue-900 transition">
                          {res.itemText}
                        </h5>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-200/60 text-[10px] text-blue-600 font-bold">
                        <span>Inquire About This Item</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* 2. Interactive Service Solution Matcher Quiz */}
        <ServiceSolutionFinder onSelectPackage={handleSelectServiceForInquiry} />

        {/* 3. Core 4 Pillars Directory */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">Practice Directory</span>
            <h3 className="text-3xl font-extrabold text-[#0f2942] mt-1">
              Explore Every Service Pillar
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Select any practice area below for granular details or click for an individual deep-dive.
            </p>
          </div>

          <ServicesSection 
            services={services} 
            onSelectServiceForInquiry={handleSelectServiceForInquiry}
          />
        </div>

        {/* 4. Disciplined 4-Phase Engagement Methodology */}
        <ComplianceProcessFlow />

        {/* 5. Bangladesh Statutory Deadlines & Compliance Monitor */}
        <BangladeshTaxCalendarWidget />

        {/* 6. High-Impact Advisory Consultation Banner */}
        <div className="rounded-3xl navy-gradient p-8 sm:p-12 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800">
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Direct Partner Consultation</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold">
              Need Tailored Corporate Advisory for Your Organization?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Our partners will analyze your statutory status, corporate filings, or audit challenges and provide a confidential, actionable opinion.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => handleSelectServiceForInquiry('General Advisory & Compliance Consultation')}
              className="w-full sm:w-auto px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition transform hover:-translate-y-0.5 text-center"
            >
              Request Advisory Consultation
            </button>
            <a
              href="https://wa.me/8801767690408?text=Hello,%20I%20would%20like%20to%20discuss%20a%20service%20inquiry."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 transition text-center"
            >
              WhatsApp Us
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
