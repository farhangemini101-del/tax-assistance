import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  Users, 
  FileText, 
  ShieldCheck, 
  RotateCcw,
  Zap,
  ChevronRight
} from 'lucide-react';
import TiltCard from './TiltCard';

export default function ServiceSolutionFinder({ onSelectPackage }) {
  const [step, setStep] = useState(1);
  const [entityType, setEntityType] = useState('');
  const [objective, setObjective] = useState('');

  const entityOptions = [
    { id: 'private-ltd', title: 'Private Limited Company', icon: Building2, desc: 'Domestic operational enterprise in Bangladesh' },
    { id: 'multinational', title: 'Multinational / FDI Entity', icon: Zap, desc: 'Foreign branch office, liaison office, or subsidiary' },
    { id: 'ngo', title: 'NGO / Not-for-Profit / Donor', icon: ShieldCheck, desc: 'Development partner, foundation, or trust' },
    { id: 'individual', title: 'Individual / Expatriate', icon: Users, desc: 'High net-worth executive, director, or expat' }
  ];

  const objectiveOptions = {
    'private-ltd': [
      { id: 'tax-vat', title: 'Corporate Tax & VAT Compliance', service: 'Taxation - Corporate Tax Return & Monthly VAT', deliverables: ['Return under Sec 177', 'Advance Income Tax (AIT)', 'Monthly Mushak 9.1 VAT'] },
      { id: 'audit', title: 'Statutory External & Internal Audit', service: 'Audit & Assurance - External Audit', deliverables: ['External Audit Report', 'Internal Control Review', 'IFRS Compliance'] },
      { id: 'automation', title: 'Accounting & AI Process Automation', service: 'Consulting - Automation with AI', deliverables: ['QuickBooks Setup', 'Financial Dashboard', 'SOP Development'] },
      { id: 'rjsc', title: 'RJSC Secretarial & Capital Changes', service: 'Business Support Services - RJSC Services', deliverables: ['Annual Return Filing', 'Share Transfer / Director Change', 'MoA & AoA Amendments'] }
    ],
    'multinational': [
      { id: 'bida', title: 'BIDA Approvals & Liaison Setup', service: 'Business Support Services - BIDA Consultancy', deliverables: ['Liaison Office Renewal', 'Work Permits & E-Visas', 'Outward Remittance of Royalty/Technical Fees'] },
      { id: 'transfer-pricing', title: 'Transfer Pricing & Cross-Border Tax', service: 'Taxation - Direct Tax Corporate', deliverables: ['TP Documentation & Study Report', 'Statement of International Transactions', 'DTAA Exemption Certs'] },
      { id: 'fdi', title: 'FDI Return & Bangladesh Bank Clearances', service: 'Consulting - Accounting Services', deliverables: ['FDI Return Filing', 'Foreign Exchange Advisory', 'Statutory Financial Review'] }
    ],
    'ngo': [
      { id: 'ngo-audit', title: 'Donor & Project Specific Audit', service: 'Audit & Assurance - Assistance in NGO/NGOB Audit', deliverables: ['NGOB Audit Compliance', 'Project Specific Auditing', 'Fund Utilization Certs'] },
      { id: 'fund-accounts', title: 'PF, Gratuity & WPPF Management', service: 'Consulting - Accounting Services', deliverables: ['Provident Fund Approval', 'Gratuity Fund Trust Accounts', 'Withholding Tax Submissions'] }
    ],
    'individual': [
      { id: 'personal-tax', title: 'Executive Tax Planning & Filing', service: 'Taxation - Direct Tax Personal', deliverables: ['Income Tax Return Filing', 'Wealth Statement & Surcharge Optimization', 'Tax Clearance Certificate'] },
      { id: 'tribunal', title: 'Assessment Appeals & ADR Representation', service: 'Taxation - Direct Tax Personal', deliverables: ['DCT Level Assessment Defenses', 'Taxes Appellate Tribunal', 'Alternative Dispute Resolution'] }
    ]
  };

  const getRecommendations = () => {
    if (!entityType || !objectiveOptions[entityType]) return [];
    if (!objective) return objectiveOptions[entityType];
    return objectiveOptions[entityType].filter(o => o.id === objective);
  };

  const resetWizard = () => {
    setStep(1);
    setEntityType('');
    setObjective('');
  };

  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0a1f38] via-[#0f294a] to-[#081524] text-white p-8 sm:p-12 border border-blue-500/30 shadow-2xl">
      {/* Background Ambient Glows */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-slate-700/60">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Interactive Solution Matcher</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Discover Your Exact Regulatory & Advisory Package
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Select your organization type and objectives to instantly generate a tailored compliance roadmap.
            </p>
          </div>

          {step > 1 && (
            <button
              onClick={resetWizard}
              className="self-start sm:self-auto px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition border border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Matcher</span>
            </button>
          )}
        </div>

        {/* Step Progress Bar */}
        <div className="flex items-center gap-3 mb-8">
          <div className={`flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-lg ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-500'}`}>
            <span>Step 1:</span>
            <span>Entity Type</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-600" />
          <div className={`flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-lg ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-500'}`}>
            <span>Step 2:</span>
            <span>Key Objective</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-600" />
          <div className={`flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-lg ${step === 3 ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-500'}`}>
            <span>Step 3:</span>
            <span>Tailored Solution</span>
          </div>
        </div>

        {/* Step 1: Entity Type */}
        {step === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {entityOptions.map((opt) => {
              const Icon = opt.icon;
              return (
                <TiltCard
                  key={opt.id}
                  onClick={() => {
                    setEntityType(opt.id);
                    setStep(2);
                  }}
                  className="cursor-pointer p-6 rounded-2xl bg-slate-800/60 hover:bg-blue-900/40 border border-slate-700/80 hover:border-blue-400 transition-all flex flex-col justify-between group h-48"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 mb-4 group-hover:bg-blue-600 group-hover:text-white transition">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition">
                      {opt.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      {opt.desc}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-blue-400 group-hover:text-white mt-4">
                    <span>Select</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" />
                  </div>
                </TiltCard>
              );
            })}
          </div>
        )}

        {/* Step 2: Key Objective */}
        {step === 2 && (
          <div>
            <div className="mb-4">
              <span className="text-xs font-semibold text-slate-400">Selected Entity: </span>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                {entityOptions.find(e => e.id === entityType)?.title}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {objectiveOptions[entityType]?.map((obj) => (
                <TiltCard
                  key={obj.id}
                  onClick={() => {
                    setObjective(obj.id);
                    setStep(3);
                  }}
                  className="cursor-pointer p-6 rounded-2xl bg-slate-800/60 hover:bg-blue-900/40 border border-slate-700/80 hover:border-blue-400 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition">
                        {obj.title}
                      </h4>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                        {obj.deliverables.length} Deliverables
                      </span>
                    </div>
                    
                    <ul className="space-y-1.5 my-3">
                      {obj.deliverables.map((d, dIdx) => (
                        <li key={dIdx} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-bold text-blue-400 group-hover:text-white mt-4 pt-3 border-t border-slate-700/60">
                    <span>Generate Custom Package</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Result & Package Card */}
        {step === 3 && (
          <div className="space-y-6">
            {getRecommendations().map((rec, idx) => (
              <div 
                key={idx}
                className="p-8 rounded-3xl bg-slate-900/90 border-2 border-amber-500/40 shadow-2xl backdrop-blur-md"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      Recommended Strategic Package
                    </span>
                    <h4 className="text-2xl font-extrabold text-white mt-1">
                      {rec.title}
                    </h4>
                    <p className="text-xs text-blue-300 mt-1 font-medium">
                      Primary Service Category: {rec.service}
                    </p>
                  </div>

                  <button
                    onClick={() => onSelectPackage(rec.service)}
                    className="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-amber-900/30 flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5"
                  >
                    <span>Request Quotation & Engagement</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-6">
                  <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4">
                    Core Statutory & Advisory Deliverables Included:
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {rec.deliverables.map((item, iIdx) => (
                      <div key={iIdx} className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="text-xs font-semibold text-slate-200">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
                  <span>Guaranteed compliance with Income Tax Act 2023 & NBR SROs.</span>
                  <button
                    onClick={() => setStep(2)}
                    className="text-amber-400 hover:underline font-semibold"
                  >
                    ← Choose a different objective
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
