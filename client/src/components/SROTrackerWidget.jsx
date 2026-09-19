import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Download, 
  ExternalLink, 
  Calendar, 
  CheckCircle2, 
  Landmark, 
  Building,
  ShieldCheck,
  Scale
} from 'lucide-react';
import TiltCard from './TiltCard';

export default function SROTrackerWidget({ onRequestSRO }) {
  const [activeAuthority, setActiveAuthority] = useState('All');

  const sroList = [
    {
      sroNo: "S.R.O. No. 182-Ain/2025",
      authority: "National Board of Revenue (NBR)",
      category: "Income Tax",
      title: "Statutory Clarification on Withholding Tax Rates under Section 117 and 118",
      date: "August 2025",
      scope: "Mandatory TDS rates on contractual payments, technical fees, and professional services."
    },
    {
      sroNo: "Mushak Circular No. 04/Mushak/2025",
      authority: "Customs & VAT Wing",
      category: "VAT & SD",
      title: "Standard Operational Guideline for Mushak 4.3 Input-Output Coefficient Revision",
      date: "July 2025",
      scope: "Mandatory timelines for re-declaring raw material coefficients upon 7.5% price variance."
    },
    {
      sroNo: "FE Circular No. 12/2025",
      authority: "Bangladesh Bank",
      category: "Foreign Exchange",
      title: "Guidelines for Outward Remittances of Royalty, Franchise, and Technical Assistance Fees",
      date: "May 2025",
      scope: "Procedures for obtaining Bangladesh Investment Development Authority (BIDA) pre-approval."
    },
    {
      sroNo: "Gazette Notification RJSC-2025/08",
      authority: "Registrar of Joint Stock Companies",
      category: "Company Law",
      title: "Statutory Procedures for Electronic Annual Return (Schedule X) Filing & Biometric Signatures",
      date: "April 2025",
      scope: "Mandatory digital filing rules for private and public limited companies in Bangladesh."
    }
  ];

  const filtered = activeAuthority === 'All' 
    ? sroList 
    : sroList.filter(s => s.category === activeAuthority);

  return (
    <div className="bg-[#091a2e] text-white rounded-3xl p-8 sm:p-12 border border-blue-900/60 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 mb-8 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-2 border border-blue-400/30">
            <Scale className="w-3.5 h-3.5 text-amber-400" />
            <span>Gazettes & Circulars Monitor</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Official Regulatory & SRO Tracker
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Tracking gazette notifications from the NBR, Bangladesh Bank, and Registrar of Joint Stock Companies.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 self-start md:self-auto">
          {['All', 'Income Tax', 'VAT & SD', 'Foreign Exchange', 'Company Law'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveAuthority(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activeAuthority === cat
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item, idx) => (
          <TiltCard
            key={idx}
            maxTilt={6}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-blue-400/50 transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  {item.sroNo}
                </span>
                <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {item.date}
                </span>
              </div>

              <h4 className="text-sm font-bold text-white mb-2 leading-snug">
                {item.title}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {item.scope}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-[11px] text-blue-300 font-semibold">{item.authority}</span>
              <button
                onClick={() => onRequestSRO && onRequestSRO(`Request for copy & opinion on ${item.sroNo}`)}
                className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 text-[11px]"
              >
                <span>Request Legal Opinion</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </TiltCard>
        ))}
      </div>
    </div>
  );
}
