import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import TiltCard from './TiltCard';

export default function LibraryFAQSection({ onAskQuestion }) {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "Who is required to file a corporate tax return under Section 177 of the Income Tax Act 2023?",
      a: "Every company incorporated in Bangladesh, foreign branch/liaison office, cooperative society, and trust is required to file an annual income tax return under Section 177. The return must be accompanied by audited financial statements certified by a Chartered Accountant, detailed withholding tax statements, and relevant depreciation schedules."
    },
    {
      q: "What is the consequence of missing the 15th-of-the-month Mushak 9.1 VAT filing deadline?",
      a: "Under the Value Added Tax & Supplementary Duty Act 2012, failure to submit the monthly VAT return (Mushak 9.1) by the 15th day of the following month attracts a mandatory non-negotiable monetary penalty, interest on unpaid VAT, and potential suspension of input tax credits until regularized."
    },
    {
      q: "When is Transfer Pricing documentation (Statement of International Transactions) mandatory?",
      a: "Under Chapter XI of the Income Tax Act, any Bangladeshi enterprise that enters into international transactions with an associated enterprise exceeding BDT 30 Million (3 Crore) within an income year must prepare and submit a Statement of International Transactions (Form) and maintain a comprehensive Transfer Pricing Study Report verified by a Chartered Accountant."
    },
    {
      q: "What documents are required for BIDA work permit renewals and expatriate tax clearance?",
      a: "Work permit renewals require company board resolution, updated tax clearance certificate of the expat, salary breakdown, proof of inward remittances, audited accounts of the sponsor company, and clearance from the Ministry of Home Affairs. Prior to departure from Bangladesh, expatriates must secure a formal Final Tax Clearance Certificate from the DCT."
    },
    {
      q: "How does Tax Assistance (TA) assist in Taxes Appellate Tribunal and ADR hearings?",
      a: "Our authorized advocates and ITP practitioners prepare technical grounds of appeal, re-compute disputed assessment disallowances, represent before the Commissioner (Appeals), and present defense arguments before the Taxes Appellate Tribunal. We also negotiate settlements through Alternative Dispute Resolution (ADR) under statutory frameworks."
    },
    {
      q: "Can Tax Assistance help setup QuickBooks and AI-powered accounting automation?",
      a: "Yes. We configure multi-currency QuickBooks setups, integrate automated VAT Mushak 9.1 ledger mapping, establish digital expense approval matrices, and formulate tailored Finance & Accounts Standard Operating Procedures (SOPs)."
    }
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm">
      <div className="max-w-3xl mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
          <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
          <span>Statutory Knowledge Base</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0f2942]">
          Frequently Asked Questions (FAQs)
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
          Clear, practical answers to common statutory, taxation, VAT, and regulatory challenges facing businesses in Bangladesh.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div 
              key={idx}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen 
                  ? 'border-blue-300 bg-blue-50/20 shadow-xs' 
                  : 'border-slate-200/90 bg-white hover:border-slate-300'
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:text-blue-900 transition"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full text-xs flex items-center justify-center font-black ${
                    isOpen ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    Q{idx + 1}
                  </span>
                  <span>{faq.q}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                  isOpen ? 'transform rotate-180 text-blue-600' : ''
                }`} />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-blue-100/60 ml-9">
                  <p>{faq.a}</p>
                  <div className="mt-3 pt-2 flex items-center gap-3">
                    <button
                      onClick={() => onAskQuestion && onAskQuestion(`Inquiry regarding FAQ: ${faq.q}`)}
                      className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1"
                    >
                      <span>Need specific counsel on this question?</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Help Banner */}
      <div className="mt-8 p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h5 className="text-xs font-bold text-slate-900">Have a nuanced statutory question not listed here?</h5>
            <p className="text-[11px] text-slate-500">Our tax and audit practitioners will provide a tailored opinion.</p>
          </div>
        </div>

        <button
          onClick={() => onAskQuestion && onAskQuestion('Custom Statutory Question from Library FAQs')}
          className="px-4 py-2 bg-[#0f2942] hover:bg-blue-900 text-white text-xs font-bold rounded-xl shadow transition"
        >
          Ask an Expert
        </button>
      </div>

    </div>
  );
}
