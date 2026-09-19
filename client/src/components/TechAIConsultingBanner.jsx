import React, { useState } from 'react';
import { 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  BarChart3, 
  ArrowRight, 
  ShieldCheck, 
  FileSpreadsheet, 
  PieChart, 
  Building2, 
  Clock,
  Briefcase
} from 'lucide-react';
import TiltCard from './TiltCard';

export default function TechAIConsultingBanner({ onInquire }) {
  const [activeWorkflow, setActiveWorkflow] = useState(0);

  const corporateWorkflows = [
    {
      id: "tax-compliance",
      title: "Statutory Tax & VAT Automation",
      status: "Reconciled & Filed",
      badge: "Section 177 & Mushak 9.1",
      metric: "100% Precision",
      desc: "End-to-end automation of monthly VAT return preparations, withholding tax (TDS) schedules, and corporate return computations under the Income Tax Act 2023."
    },
    {
      id: "quickbooks-erp",
      title: "QuickBooks & Cloud ERP Integration",
      status: "Synchronized",
      badge: "Live Ledger Sync",
      metric: "Real-time Reporting",
      desc: "Structured chart of accounts setup, multi-currency ledger automated reconciliation, and automated bank feeds configured for Bangladesh foreign exchange standards."
    },
    {
      id: "cfo-dashboard",
      title: "Executive Financial & Tax Dashboards",
      status: "Live Analytics",
      badge: "CFO Intelligence",
      metric: "Instant Visibility",
      desc: "Custom interactive dashboards tracking cash flow forecasting, advance tax liabilities, inventory turnover, and statutory audit readiness at a glance."
    },
    {
      id: "payroll-funds",
      title: "Payroll & Fund Management Systems",
      status: "Automated Pay-run",
      badge: "PF, GF & WPPF",
      metric: "Tax-Optimized",
      desc: "Automated monthly payroll processing with employee tax deduction certificates, individual salary advice, and Worker's Profit Participation Fund tracking."
    }
  ];

  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#08182b] via-[#0d233d] to-[#061220] border border-blue-400/20 p-8 sm:p-12 text-white shadow-2xl">
      {/* Background Ambience */}
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Column: Executive Advisory Value Proposition (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-700/60 text-blue-200 text-xs font-bold shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Modern Advisory Practice • Digital Finance Transformation</span>
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
            Empowering Modern Finance with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-amber-300">
              Intelligent Financial Systems & Process Automation
            </span>
          </h3>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl font-normal">
            At Tax Assistance (TA), we fuse deep professional accounting and tax expertise with modern technology. We assist businesses in adopting streamlined accounting software, automated statutory compliance workflows, executive financial dashboards, and practical Standard Operating Procedures (SOPs).
          </p>

          {/* 4 Core Pillars from Untitled document.docx */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="flex items-start gap-2.5 text-xs text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>Accounting & QuickBooks Bookkeeping Automation</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>VAT & Corporate Tax Compliance Automation</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>Executive Financial Reporting & Real-Time Dashboards</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>Digital Approval & Standard Operating Procedures (SOPs)</span>
            </div>
          </div>

          <div className="pt-3 flex flex-wrap items-center gap-4">
            <button
              onClick={onInquire}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-900/30 flex items-center gap-2 transition transform hover:-translate-y-0.5"
            >
              <Briefcase className="w-4 h-4 text-slate-950" />
              <span>Schedule Finance Transformation Consultation</span>
            </button>
            <span className="text-[11px] text-slate-400">
              Zero disruption to ongoing daily corporate operations
            </span>
          </div>
        </div>

        {/* Right Column: Executive CFO Compliance & Financial Health Dashboard (5 cols) */}
        <div className="lg:col-span-5">
          <TiltCard maxTilt={8} className="rounded-3xl border border-blue-400/30 bg-gradient-to-b from-[#0e243d] to-[#09182a] p-6 sm:p-7 shadow-2xl backdrop-blur-md">
            
            {/* Dashboard Header */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-700/80">
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                  Enterprise Advisory View
                </span>
                <h4 className="text-sm font-extrabold text-white mt-0.5">
                  Corporate Financial & Tax Health Overview
                </h4>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Statutory Compliant</span>
              </span>
            </div>

            {/* Statutory Health Metrics Card */}
            <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-700/70 mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-300">Overall Statutory Adherence</span>
                <span className="text-sm font-black text-amber-400">99.8%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 via-sky-400 to-amber-400 h-full rounded-full w-[99.8%]"></div>
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-400 mt-2">
                <span>Direct Tax (Sec 177) • VAT 9.1</span>
                <span>Audit Ready</span>
              </div>
            </div>

            {/* Interactive Workflow Tabs */}
            <div className="space-y-2 mb-5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Integrated Systems Status:
              </span>
              
              <div className="space-y-2">
                {corporateWorkflows.map((wf, idx) => (
                  <div
                    key={wf.id}
                    onClick={() => setActiveWorkflow(idx)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      activeWorkflow === idx
                        ? 'bg-blue-900/40 border-blue-400/60 shadow-sm'
                        : 'bg-slate-800/40 border-slate-800 hover:bg-slate-800/70'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-2 h-2 rounded-full ${activeWorkflow === idx ? 'bg-amber-400' : 'bg-slate-600'}`}></div>
                      <div>
                        <h5 className="text-xs font-bold text-slate-100">{wf.title}</h5>
                        <span className="text-[10px] text-slate-400">{wf.badge}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-900">
                      {wf.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Executive Impact Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-700/70">
              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60">
                <div className="text-lg font-black text-amber-400">70%</div>
                <div className="text-[10px] text-slate-300 font-medium">Reduction in Administrative Reporting Hours</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60">
                <div className="text-lg font-black text-sky-400">Zero</div>
                <div className="text-[10px] text-slate-300 font-medium">Statutory Default Penalties Guaranteed</div>
              </div>
            </div>

            <div className="mt-3 pt-2 text-center text-[10px] text-slate-400">
              Validated by Chartered Accounting & Tax Bar Methodologies
            </div>

          </TiltCard>
        </div>

      </div>
    </div>
  );
}
