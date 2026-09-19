import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  X, 
  Calendar, 
  Clock, 
  HelpCircle, 
  Phone, 
  Mail, 
  ArrowRight, 
  ExternalLink, 
  Sparkles,
  BookOpen,
  Building2,
  FileSpreadsheet,
  AlertTriangle,
  Zap
} from 'lucide-react';

export default function StatutoryCommandWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [daysToVat, setDaysToVat] = useState(15);

  useEffect(() => {
    // Calculate days until next 15th (Mushak 9.1 deadline)
    const now = new Date();
    const currentDay = now.getDate();
    if (currentDay <= 15) {
      setDaysToVat(15 - currentDay);
    } else {
      // Days left in current month + 15 days of next month
      const daysInCurrentMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
      setDaysToVat((daysInCurrentMonth - currentDay) + 15);
    }
  }, []);

  return (
    <>
      {/* Floating Trigger Pill */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#07172b] to-[#0f2942] text-white border border-amber-500/40 shadow-2xl hover:shadow-amber-500/20 hover:border-amber-400 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
          title="Open Statutory Compliance Desk & Live Tax Rates"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
          </span>
          <span className="text-xs font-black tracking-wide text-amber-300 group-hover:text-white transition">
            Compliance Desk
          </span>
          <span className="hidden sm:inline text-[11px] text-slate-300 font-medium">
            • Mushak 9.1: <span className="text-amber-400 font-bold">{daysToVat}d left</span>
          </span>
        </button>
      </div>

      {/* Floating Modal / Drawer */}
      {isOpen && (
        <div className="fixed bottom-22 right-4 sm:right-6 z-50 w-full max-w-sm sm:max-w-md bg-[#050f1f]/95 backdrop-blur-xl rounded-3xl border border-slate-700/80 shadow-2xl text-white overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="p-5 bg-gradient-to-r from-[#07182c] to-[#0d2644] border-b border-slate-700/70 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-white">
                  Statutory Advisory Desk
                </h4>
                <p className="text-[10px] text-slate-300">
                  Dhaka Taxes Bar Association Member Credentials
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto text-xs">
            
            {/* Live Deadline Alert */}
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 flex items-start gap-3">
              <Clock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-amber-300">
                  Monthly Mushak 9.1 VAT Return
                </div>
                <div className="text-[11px] text-slate-300 mt-0.5">
                  Due on or before the 15th of the month. <strong>{daysToVat} days</strong> remaining in this cycle.
                </div>
              </div>
            </div>

            {/* Quick Rates Reference Box */}
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                Bangladesh Corporate Tax Rates (FY 2025-26)
              </span>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 block">Non-Listed Ltd:</span>
                  <span className="font-mono font-bold text-amber-400 text-xs">27.5% / 25.0%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 block">Publicly Listed:</span>
                  <span className="font-mono font-bold text-amber-400 text-xs">20.0%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 block">RMG / Textile:</span>
                  <span className="font-mono font-bold text-amber-400 text-xs">12.0% / 10.0%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 block">Banks / NBFI:</span>
                  <span className="font-mono font-bold text-amber-400 text-xs">37.5% – 40%</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                Executive Support Channels
              </span>

              <div className="grid grid-cols-1 gap-2">
                <a
                  href="tel:+8801767690408"
                  className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 flex items-center justify-between transition"
                >
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Direct Hotline: +880 1767-690408</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </a>

                <Link
                  to="/library"
                  onClick={() => setIsOpen(false)}
                  className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 flex items-center justify-between transition"
                >
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                    <span>Regulatory Library & SRO Gazettes</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </Link>

                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="p-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#071526] font-bold text-xs uppercase tracking-wider text-center block transition shadow-md"
                >
                  Schedule Partner Consultation
                </Link>
              </div>
            </div>

          </div>

        </div>
      )}
    </>
  );
}
