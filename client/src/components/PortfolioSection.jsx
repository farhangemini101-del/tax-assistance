import React, { useState } from 'react';
import { 
  Briefcase, 
  Calendar, 
  CheckCircle, 
  ArrowUpRight, 
  ShieldCheck, 
  Star,
  Clock,
  Sparkles
} from 'lucide-react';

export default function PortfolioSection({ portfolio = [] }) {
  const [selectedYear, setSelectedYear] = useState('2026');

  const commitments = [
    "Provide knowledgeable, competent, flexible, and personalized services",
    "Deliver services in accordance with agreed contractual requirements",
    "Maintain continuous communication throughout the assignment",
    "Provide value-added information and practical recommendations",
    "Protect our clients' interests with complete confidentiality",
    "Support clients' progress, operational resilience, and sustainable growth",
    "Build and maintain long-term client trust across generations"
  ];

  const activePortfolio = portfolio.find(p => p.year === selectedYear) || portfolio[0];

  return (
    <section id="portfolio" className="py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Briefcase className="w-3.5 h-3.5 text-blue-600" />
            <span>Track Record & Evolution</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2942] tracking-tight">
            Our Service Portfolio
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            Our portfolio reflects our commitment to delivering knowledgeable, competent, flexible, 
            and personalized professional services with quality, integrity, and excellence.
          </p>
        </div>

        {/* Year Selector Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200/80 gap-1 sm:gap-2">
            {portfolio.map((item) => {
              const isActive = selectedYear === item.year;
              return (
                <button
                  key={item.year}
                  onClick={() => setSelectedYear(item.year)}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#0f2942] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.year} Portfolio</span>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-amber-400 text-slate-900' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Portfolio Content Box */}
        {activePortfolio && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-10 mb-16 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
                  Milestones & Scope
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">
                  {activePortfolio.year}: {activePortfolio.title}
                </h3>
              </div>
              <div className="self-start sm:self-auto px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-semibold">
                {activePortfolio.items?.length || 0} Key Focus Areas
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activePortfolio.items?.map((act, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-blue-300 hover:shadow-xs transition flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-700 mt-0.5">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-800 font-medium leading-snug">
                    {act}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Our Service Commitment */}
        <div className="bg-[#0c1f33] rounded-2xl p-8 sm:p-12 text-white border border-slate-800 shadow-xl">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase mb-3 border border-blue-400/20">
              <Star className="w-3.5 h-3.5 text-amber-400" />
              <span>Engagement Principles</span>
            </div>
            <h3 className="text-2xl font-bold text-white">Our Service Commitment For Every Assignment</h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              For every corporate engagement, audit assistance, tax review, or business advisory mandate, our standard of care remains immutable:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {commitments.map((cmt, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 text-emerald-400 mt-0.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs text-slate-200 font-medium leading-relaxed">
                  {cmt}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
