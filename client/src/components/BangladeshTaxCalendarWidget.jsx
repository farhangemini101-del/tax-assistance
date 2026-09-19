import React, { useState } from 'react';
import { 
  Calendar, 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  Building2, 
  User, 
  ArrowRight,
  Bell
} from 'lucide-react';
import TiltCard from './TiltCard';

export default function BangladeshTaxCalendarWidget() {
  const [tab, setTab] = useState('corporate');

  const corporateDeadlines = [
    {
      date: "15th of Every Month",
      title: "Monthly VAT Return (Mushak 9.1) & VDS Challan",
      desc: "Mandatory filing of monthly VAT return along with proof of treasury deposition for VAT deducted at source.",
      urgency: "Monthly Recurring",
      status: "Active"
    },
    {
      date: "15th Sep, Dec, Mar, Jun",
      title: "Quarterly Advance Income Tax (AIT)",
      desc: "Four equal quarterly installments for corporate taxpayers whose estimated total income exceeds statutory threshold.",
      urgency: "Quarterly",
      status: "Mandatory"
    },
    {
      date: "15th January / Tax Day",
      title: "Corporate Tax Return under Section 177",
      desc: "Submission of annual return along with audited financial statements, tax computation, and CA certificate.",
      urgency: "Annual Milestone",
      status: "Crucial"
    },
    {
      date: "Within 30 Days of AGM",
      title: "RJSC Annual Return (Schedule X) Filing",
      desc: "Mandatory annual statutory return filing with the Registrar of Joint Stock Companies following Annual General Meeting.",
      urgency: "Statutory Filing",
      status: "Mandatory"
    }
  ];

  const personalDeadlines = [
    {
      date: "30th November (National Tax Day)",
      title: "Individual Income Tax Return Submission",
      desc: "Statutory deadline for all Bangladeshi resident taxpayers, directors, and registered TIN holders.",
      urgency: "National Tax Day",
      status: "Crucial"
    },
    {
      date: "Prior to Departure / Annual",
      title: "Expatriate Income Tax Clearance Certificate",
      desc: "Mandatory clearance from the Deputy Commissioner of Taxes (DCT) for foreign nationals working in Bangladesh.",
      urgency: "Prior to Exit",
      status: "Mandatory"
    },
    {
      date: "30th June",
      title: "Wealth Statement & Asset Reconciliation",
      desc: "Comprehensive declaration of local and global assets, liabilities, and source of funds for surcharge calculation.",
      urgency: "Fiscal Close",
      status: "Active"
    }
  ];

  const items = tab === 'corporate' ? corporateDeadlines : personalDeadlines;

  return (
    <div className="bg-[#0b1c2f] text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 mb-8 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-500/30">
            <Bell className="w-3.5 h-3.5 text-amber-400" />
            <span>Statutory Compliance Calendar</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Bangladesh Tax & Regulatory Deadlines
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Stay ahead of penalty provisions with our proactive statutory timeline monitor.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 self-start md:self-auto">
          <button
            onClick={() => setTab('corporate')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              tab === 'corporate'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Corporate Compliance</span>
          </button>
          <button
            onClick={() => setTab('personal')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              tab === 'personal'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Personal & Expatriate</span>
          </button>
        </div>
      </div>

      {/* Deadlines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, idx) => (
          <TiltCard
            key={idx}
            maxTilt={6}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-blue-500/40 transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.date}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                  {item.urgency}
                </span>
              </div>

              <h4 className="text-sm font-bold text-white mb-2 leading-snug">
                {item.title}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {item.desc}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/70 flex items-center justify-between text-[11px] text-slate-400">
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Assistance Available</span>
              </span>
              <span className="text-slate-500">Tax Assistance Monitoring</span>
            </div>
          </TiltCard>
        ))}
      </div>
    </div>
  );
}
