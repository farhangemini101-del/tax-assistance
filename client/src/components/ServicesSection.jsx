import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Receipt, 
  TrendingUp, 
  Building2, 
  Check, 
  ArrowRight, 
  Sparkles,
  Search,
  CheckCircle2,
  FileSpreadsheet,
  Layers,
  ChevronRight
} from 'lucide-react';

export default function ServicesSection({ services = [], onSelectServiceForInquiry }) {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const currentService = services[activeCategoryIndex] || services[0];

  const getIcon = (id) => {
    switch(id) {
      case 'audit-assurance': return ShieldCheck;
      case 'taxation': return Receipt;
      case 'consulting': return TrendingUp;
      case 'business-support': return Building2;
      default: return Layers;
    }
  };

  return (
    <section id="services" className="py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5 text-blue-700" />
            <span>Comprehensive Practice Areas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2942] tracking-tight">
            Integrated Professional Services
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            Four specialized pillars designed to protect your assets, minimize compliance risk, 
            optimize tax structures, and accelerate sustainable operational growth.
          </p>
        </div>

        {/* Pillar Category Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {services.map((svc, idx) => {
            const Icon = getIcon(svc.id);
            const isActive = activeCategoryIndex === idx;
            return (
              <button
                key={svc.id}
                onClick={() => {
                  setActiveCategoryIndex(idx);
                  setSearchQuery('');
                }}
                className={`p-4 rounded-xl text-left transition-all flex flex-col justify-between border ${
                  isActive 
                    ? 'bg-[#0f2942] text-white border-[#0f2942] shadow-md transform -translate-y-0.5' 
                    : 'bg-white text-slate-700 border-slate-200/80 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isActive ? 'bg-blue-600/30 text-amber-400' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                    isActive ? 'bg-blue-800/80 text-blue-200' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {svc.subcategories?.length || 0} Areas
                  </span>
                </div>
                <div>
                  <h3 className={`text-sm font-bold leading-snug ${isActive ? 'text-white' : 'text-slate-900'}`}>
                    {svc.title}
                  </h3>
                  <p className={`text-[11px] mt-1 line-clamp-1 ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                    {svc.category}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Service Deep Dive Banner */}
        {currentService && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                  <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">Practice Overview</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">{currentService.title}</h3>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                  {currentService.summary}
                </p>
              </div>

              <button
                onClick={() => onSelectServiceForInquiry(currentService.title)}
                className="self-start md:self-auto px-5 py-2.5 bg-[#0f2942] hover:bg-blue-900 text-white text-xs font-bold rounded-lg shadow transition flex items-center gap-2"
              >
                <span>Inquire About {currentService.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Subcategories Grid */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentService.subcategories?.map((sub, sIdx) => (
                <div 
                  key={sIdx}
                  className="rounded-xl border border-slate-200/90 bg-slate-50/50 p-5 flex flex-col justify-between hover:border-blue-300 hover:bg-blue-50/20 transition group"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200">
                      <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-950 transition">
                        {sub.title}
                      </h4>
                    </div>

                    <ul className="space-y-2.5">
                      {sub.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span className="leading-tight">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-200/60">
                    <button
                      onClick={() => onSelectServiceForInquiry(`${currentService.title} - ${sub.title}`)}
                      className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1 transition"
                    >
                      <span>Get assistance for {sub.title}</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* Special AI Automation & SOP Notice */}
        <div className="rounded-2xl navy-gradient p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Modern Advisory Advantage</span>
            </div>
            <h4 className="text-xl font-bold">Process Automation & AI-Enabled Financial Systems</h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We assist Bangladeshi and multinational businesses in adopting technology-driven solutions: QuickBooks automation, real-time reporting dashboards, AI document processing, and VAT compliance automation.
            </p>
          </div>

          <button
            onClick={() => onSelectServiceForInquiry('Consulting - Automation with AI')}
            className="flex-shrink-0 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition transform hover:-translate-y-0.5"
          >
            Schedule AI Consultation
          </button>
        </div>

      </div>
    </section>
  );
}
