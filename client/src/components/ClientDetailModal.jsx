import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  X, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Briefcase, 
  FileText, 
  Calendar, 
  Lock,
  Landmark,
  Globe2,
  ShoppingBag,
  Factory,
  Microscope,
  Cpu,
  Pill,
  Zap,
  Hotel,
  Users
} from 'lucide-react';

const getSectorMeta = (category) => {
  switch (category) {
    case 'Banking, Finance, Insurance & Securities':
      return {
        icon: Landmark,
        color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
        title: 'Banking & Financial Institutions',
        engagementScope: [
          'Corporate Income Tax Planning & Assessment (Section 177)',
          'Advance Income Tax (AIT) Reconciliations & Refund Adjustments',
          'Mushak 9.1 Monthly VAT Compliance & Withholding (VDS) Audit',
          'Taxes Appellate Tribunal & Alternative Dispute Resolution (ADR)',
          'Provident Fund (PF) & Gratuity Fund (GF) Statutory Approval'
        ],
        regulatoryBody: 'Bangladesh Bank & National Board of Revenue (NBR)'
      };
    case 'NGO / Not-for-Profit':
    case 'Development & Social Organizations':
      return {
        icon: Globe2,
        color: 'text-sky-600 bg-sky-50 border-sky-200',
        badgeColor: 'bg-sky-100 text-sky-900 border-sky-300',
        title: 'Development & International NGOs',
        engagementScope: [
          'NGO Affairs Bureau (NGOAB) FD-4 Statutory Audit Working Papers',
          'Foreign Grant Tax Exemption & NBR SRO Clarifications',
          'Expatriate Specialist Work Permit (BIDA) & Expat Tax Assessments',
          'Withholding Tax (TDS/VDS) Deductions & Monthly Deposition',
          'Donor Financial Compliance & Internal Control Reviews'
        ],
        regulatoryBody: 'NGO Affairs Bureau (NGOAB) & NBR'
      };
    case 'Consumer Products':
      return {
        icon: ShoppingBag,
        color: 'text-amber-600 bg-amber-50 border-amber-200',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
        title: 'Consumer Brands & Retail Enterprises',
        engagementScope: [
          'Monthly Mushak 9.1 VAT Preparation, Review & Submissions',
          'Input-Output Coefficient (Mushak 4.3) Technical Formulations',
          'Annual Corporate Tax Return & Audit Documentation',
          'Distributor & Vendor Withholding Tax Compliance',
          'Transfer Pricing Documentation for Multinational FMCGs'
        ],
        regulatoryBody: 'Customs, Excise & VAT Commissionerates & NBR'
      };
    case 'Textile & Garments':
      return {
        icon: Factory,
        color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300',
        title: 'Textile, Apparel & Manufacturing',
        engagementScope: [
          'Export Cash Incentive Audit Working Papers',
          'Bonded Warehouse Compliance & Duty Exemption Verification',
          'Corporate Tax Return Preparation under Specialized Export Rates',
          'Fixed Asset Tagging & Physical Inventory Audits',
          'Workers Profit Participation Fund (WPPF) Compliance'
        ],
        regulatoryBody: 'BGMEA/BKMEA, Customs Bond & NBR'
      };
    case 'Services':
      return {
        icon: Microscope,
        color: 'text-purple-600 bg-purple-50 border-purple-200',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
        title: 'Specialized Bio-Science & Professional Services',
        engagementScope: [
          'FDI Inward Remittance & BIDA Reporting',
          'QuickBooks Cloud & Financial SOP Manual Development',
          'Clinical Trial / Research Withholding Tax Clarifications',
          'Statutory External Audit Preparation under IFRS',
          'Cross-Border Service Royalty & Tax Treaty (DTAA) Advisory'
        ],
        regulatoryBody: 'BIDA, Bangladesh Bank & Taxes Zone'
      };
    case 'IT & Telecommunications':
      return {
        icon: Cpu,
        color: 'text-cyan-600 bg-cyan-50 border-cyan-200',
        badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300',
        title: 'Technology & Digital Platforms',
        engagementScope: [
          'IT Enabled Services (ITES) Tax Exemption Certification',
          'Digital Platform VAT Accounting & Automated Invoicing',
          'Software Developer Payroll & Tax Deductions',
          'Venture Capital / FDI Equity Inflow Documentation',
          'RJSC Annual Returns & Corporate Secretarial Governance'
        ],
        regulatoryBody: 'BASIS, BIDA & Taxes Zone'
      };
    case 'Pharmaceuticals':
      return {
        icon: Pill,
        color: 'text-rose-600 bg-rose-50 border-rose-200',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300',
        title: 'Pharmaceuticals & Life Sciences',
        engagementScope: [
          'Pharma API Raw Material VAT & Advance Tax Compliance',
          'Drug Administration Pricing & Statutory Working Papers',
          'Annual Corporate Tax Assessments & Appellate Representation',
          'Provident & Gratuity Fund Approval & Management',
          'Comprehensive Withholding Tax Audits'
        ],
        regulatoryBody: 'Directorate General of Drug Administration (DGDA) & NBR'
      };
    case 'Energy, Power & Infrastructure':
      return {
        icon: Zap,
        color: 'text-yellow-600 bg-yellow-50 border-yellow-200',
        badgeColor: 'bg-yellow-100 text-yellow-900 border-yellow-300',
        title: 'Energy, Power & Heavy Engineering',
        engagementScope: [
          'Power Sector Tax Holiday & SRO Exemption Compliance',
          'Heavy Equipment Import Duty & Advance Tax Clearance',
          'Project Audit & Joint Venture Consortium Tax Planning',
          'Expatriate EPC Contractor Tax Deductions (TDS)',
          'High Court & Tribunal Legal Advisory Support'
        ],
        regulatoryBody: 'BPDB, BIDA & Large Taxpayers Unit (LTU)'
      };
    case 'Hospitality':
      return {
        icon: Hotel,
        color: 'text-blue-600 bg-blue-50 border-blue-200',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
        title: 'Hospitality & Luxury Resorts',
        engagementScope: [
          'Hotel Room, Banquet & Food VAT Accounting',
          'Service Charge Distribution & Payroll Tax Structuring',
          'Statutory Annual Corporate Income Tax Return',
          'Periodic Fixed Asset Verification & Cash Counting',
          'Foreign Brand Royalty & Management Fee TDS'
        ],
        regulatoryBody: 'Civil Aviation & Tourism Ministry, LTU-VAT & NBR'
      };
    default:
      return {
        icon: Users,
        color: 'text-slate-600 bg-slate-50 border-slate-200',
        badgeColor: 'bg-slate-100 text-slate-900 border-slate-300',
        title: 'High Net-Worth Personal Advisory',
        engagementScope: [
          'Annual Individual Income Tax Computation & Submission',
          'Statement of Assets, Liabilities & Expenses (IT-10B)',
          'Foreign Asset Disclosure & Offshore Income Tax Planning',
          'Tax Clearance Certificate for Emigration or Bank Credit',
          'Representation before Deputy Commissioner of Taxes (DCT)'
        ],
        regulatoryBody: 'NBR Personal Taxes Zones'
      };
  }
};

export default function ClientDetailModal({ client, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!client) return null;

  const meta = getSectorMeta(client.category);
  const Icon = meta.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10">
        
        {/* Header Ribbon */}
        <div className="bg-[#071526] px-6 sm:px-8 py-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
            title="Close Window"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-4 pr-8">
            {client.logo ? (
              <div className="w-16 h-16 rounded-2xl bg-white p-2 shadow-md flex items-center justify-center flex-shrink-0">
                <img 
                  src={client.logo} 
                  alt={client.name} 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-amber-500 text-[#071526] font-black text-xl flex items-center justify-center flex-shrink-0 shadow-md">
                {client.name.substring(0, 2).toUpperCase()}
              </div>
            )}

            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${meta.badgeColor}`}>
                  {meta.title}
                </span>
                {client.priority === '1st' && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Tier 1 Partner
                  </span>
                )}
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white tracking-tight leading-snug">
                {client.name}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Official Institutional Mandate • Tax Assistance Advisory Portfolio
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Executive Overview Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3.5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${meta.color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                Industry Vertical & Compliance Framework
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Institutional engagement executed under the statutory regulations of the{' '}
                <span className="font-semibold text-slate-900">{meta.regulatoryBody}</span> and aligned with international accounting benchmarks.
              </p>
            </div>
          </div>

          {/* Practice Mandate & Deliverables */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-600" />
                <span>Standard Engagement Scope for this Sector</span>
              </h4>
              <span className="text-[11px] text-slate-400 font-medium">Verified Practice Scope</span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {meta.engagementScope.map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-3 rounded-xl bg-white border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/20 transition flex items-start gap-2.5 text-xs text-slate-700"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Confidentiality & Integrity Guarantee */}
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-[11px] text-amber-950 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-bold">Strict Professional Privilege & Ethical Code:</span>{' '}
              In accordance with ICAB code of ethics and Dhaka Taxes Bar Association regulations, specific transactional figures, proprietary working papers, and audit schedules remain strictly confidential.
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] text-slate-500 text-center sm:text-left">
            Seeking advisory in this industry?
          </span>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition"
            >
              Close
            </button>

            <Link
              to={`/contact?sector=${encodeURIComponent(client.category)}`}
              onClick={onClose}
              className="w-1/2 sm:w-auto px-5 py-2 rounded-xl bg-[#0f2942] hover:bg-blue-900 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>Request Mandate</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
