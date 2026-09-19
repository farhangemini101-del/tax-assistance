import React from 'react';
import { 
  X, 
  Download, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink,
  MessageSquare,
  Tag
} from 'lucide-react';

export default function ResourcePreviewModal({ resource, onClose, onConsult }) {
  if (!resource) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="bg-[#0b1e33] text-white p-6 flex items-start justify-between flex-shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                {resource.category}
              </span>
              <span className="text-[11px] font-mono text-amber-400 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {resource.year} Publication
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
              {resource.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Metadata Bar */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Format</span>
              <span className="text-xs font-extrabold text-slate-800 mt-0.5 block">{resource.format}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">File Size</span>
              <span className="text-xs font-extrabold text-slate-800 mt-0.5 block">{resource.size}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Target Audience</span>
              <span className="text-xs font-extrabold text-blue-700 mt-0.5 block">CFOs & Tax Leads</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Bar Verified</span>
              <span className="text-xs font-extrabold text-emerald-600 mt-0.5 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified</span>
              </span>
            </div>
          </div>

          {/* Overview */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Statutory Executive Summary
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {resource.description}
            </p>
          </div>

          {/* Key Advisory Takeaways */}
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-blue-700" />
              <h5 className="text-xs font-bold text-blue-950 uppercase tracking-wider">
                Key Compliance Takeaways for Organizations
              </h5>
            </div>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0 mt-1.5"></span>
                <span>Aligned with Income Tax Act 2023 and latest National Board of Revenue (NBR) gazettes.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0 mt-1.5"></span>
                <span>Includes procedural checkpoints for withholding tax, advance tax installments, and statutory reporting schedules.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0 mt-1.5"></span>
                <span>Mitigates default surcharges, penalty assessments, and audit selection vulnerabilities.</span>
              </li>
            </ul>
          </div>

          {/* Advisory Notice */}
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200/80 text-[11px] text-amber-900 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <span>
              Disclaimer: This publication is prepared for general informational purposes under professional standards. For specific corporate transactions, direct legal consultation is recommended.
            </span>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          <button
            onClick={() => onConsult && onConsult(`Inquiry regarding publication: ${resource.title}`)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-bold transition flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-blue-600" />
            <span>Discuss This With Tax Advisor</span>
          </button>

          <button
            onClick={() => {
              alert(`Downloading "${resource.title}" (${resource.format} - ${resource.size}) from repository.`);
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0f2942] hover:bg-blue-900 text-white text-xs font-black shadow transition flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Full Document</span>
          </button>
        </div>

      </div>
    </div>
  );
}
