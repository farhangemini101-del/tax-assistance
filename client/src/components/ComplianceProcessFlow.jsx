import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  FileSpreadsheet, 
  Send, 
  Award, 
  ArrowRight, 
  CheckCircle,
  Clock,
  ShieldCheck
} from 'lucide-react';
import TiltCard from './TiltCard';

export default function ComplianceProcessFlow() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: "phase-1",
      number: "01",
      title: "Diagnostic Scoping & Gap Audit",
      timeline: "Days 1 – 3",
      icon: ClipboardCheck,
      summary: "We conduct an in-depth review of your business structure, prior tax assessment orders, and accounting ledgers to detect statutory exposure.",
      deliverables: [
        "Assessment of existing tax & VAT records",
        "Statutory deficiency & compliance gap report",
        "Clear engagement scope and fixed milestone timeline"
      ]
    },
    {
      id: "phase-2",
      number: "02",
      title: "Technical Computation & Documentation",
      timeline: "Days 4 – 10",
      icon: FileSpreadsheet,
      summary: "Our CPAs and tax practitioners perform technical calculations, withholding tax verifications, and draft required schedules.",
      deliverables: [
        "Corporate tax computation under Section 177",
        "Input-Output coefficient (Mushak 4.3) review",
        "Transfer Pricing statement & working papers"
      ]
    },
    {
      id: "phase-3",
      number: "03",
      title: "Statutory Filing & Authority Representation",
      timeline: "Days 11 – 15",
      icon: Send,
      summary: "Direct submission through National Board of Revenue (NBR), RJSC portal, or Bangladesh Bank, with authorized advocate representation.",
      deliverables: [
        "Official submission acknowledgment & challans",
        "DCT level hearing defense & clarification notes",
        "Taxes Appellate Tribunal or ADR documentation"
      ]
    },
    {
      id: "phase-4",
      number: "04",
      title: "Clearance, SOP Delivery & Monitoring",
      timeline: "Ongoing",
      icon: Award,
      summary: "Procurement of statutory clearance certificates, SOP delivery, and quarterly tracking to safeguard future tax health.",
      deliverables: [
        "Income Tax Clearance Certificate issuance",
        "Finance & Procurement SOP blueprint delivery",
        "Quarterly advance tax & VAT compliance reminders"
      ]
    }
  ];

  const current = steps[activeStep];
  const CurrentIcon = current.icon;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm">
      <div className="max-w-3xl mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-2">
          <Clock className="w-3.5 h-3.5 text-blue-700" />
          <span>Proven Delivery Architecture</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0f2942]">
          How We Deliver Every Assignment
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-2">
          A disciplined, four-phase engagement methodology ensuring 100% statutory precision and proactive client communication.
        </p>
      </div>

      {/* 4 Steps Stepper Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          const isActive = activeStep === idx;
          return (
            <button
              key={s.id}
              onClick={() => setActiveStep(idx)}
              className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                isActive 
                  ? 'bg-[#0f2942] text-white border-[#0f2942] shadow-lg transform -translate-y-1' 
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-black ${isActive ? 'text-amber-400' : 'text-slate-400'}`}>
                  PHASE {s.number}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${isActive ? 'bg-blue-800 text-blue-200' : 'bg-slate-200 text-slate-600'}`}>
                  {s.timeline}
                </span>
              </div>
              <h4 className={`text-xs font-bold leading-snug line-clamp-2 ${isActive ? 'text-white' : 'text-slate-900'}`}>
                {s.title}
              </h4>
            </button>
          );
        })}
      </div>

      {/* Active Phase Deep Dive Detail Card */}
      <TiltCard maxTilt={6} className="bg-slate-50 rounded-2xl border border-slate-200/90 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-sm">
              <CurrentIcon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">
                Phase {current.number} • {current.timeline}
              </span>
              <h4 className="text-xl font-extrabold text-slate-900">
                {current.title}
              </h4>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Adheres to Dhaka Taxes Bar Standards</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 mt-4 leading-relaxed max-w-3xl">
          {current.summary}
        </p>

        <div className="mt-6">
          <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
            Key Milestone Deliverables
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {current.deliverables.map((del, dIdx) => (
              <div key={dIdx} className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-xs font-medium text-slate-800 leading-snug">{del}</span>
              </div>
            ))}
          </div>
        </div>
      </TiltCard>
    </div>
  );
}
