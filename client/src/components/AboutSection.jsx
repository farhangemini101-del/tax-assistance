import React, { useState } from 'react';
import { 
  Target, 
  Eye, 
  Shield, 
  Users2, 
  Lightbulb, 
  Scale, 
  CheckCircle, 
  Compass,
  Building2,
  Award,
  Sparkles,
  ArrowRight,
  Clock,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  FileText,
  Briefcase,
  TrendingUp,
  Landmark
} from 'lucide-react';
import TiltCard from './TiltCard';

export default function AboutSection({ firmInfo }) {
  const [activeTab, setActiveTab] = useState('overview');

  const coreValues = [
    {
      title: "Service",
      desc: "Delivering responsive, practical, and high-quality professional services that address immediate statutory challenges and long-term strategic needs.",
      icon: Lightbulb,
      color: "blue",
      badge: "Responsive & Agile"
    },
    {
      title: "Collaboration",
      desc: "Partnering closely with corporate leadership and finance teams to solve complex tax hurdles and build sustainable operational resilience.",
      icon: Users2,
      color: "emerald",
      badge: "Executive Partnership"
    },
    {
      title: "Leadership",
      desc: "Leading the market through technical rigor, sector mastery, modern digital accounting tools, and responsible statutory decision-making.",
      icon: Target,
      color: "amber",
      badge: "Technical Foresight"
    },
    {
      title: "Integrity",
      desc: "Upholding unwavering honesty, absolute client confidentiality, objectivity, and adherence to the Dhaka Taxes Bar Association code of ethics.",
      icon: Scale,
      color: "indigo",
      badge: "Fiduciary Trust"
    }
  ];

  const approaches = [
    "Comprehensive diagnostic of business operations, supply chain, and statutory risks",
    "Tailored financial modeling, allowable tax deductions, and legal SRO optimization",
    "Zero-default statutory filing discipline across Section 177 returns and Mushak 9.1 VAT",
    "Direct representation before DCT, Commissioner (Appeals), and Taxes Appellate Tribunal",
    "Continuous partner-level communication and real-time regulatory gazette alerts",
    "Long-term institutional value creation and sustainable corporate governance"
  ];

  const comparisonPoints = [
    {
      criteria: "Statutory Filing Approach",
      ta: "Proactive, multi-tier diagnostic scoping with 100% statutory clearance guarantee",
      traditional: "Reactive, year-end scramble with potential default penalties"
    },
    {
      criteria: "Senior Partner Involvement",
      ta: "Direct strategic leadership by Mehedi Hasan, CPA, ITP & specialist chartered advisors",
      traditional: "Delegated to junior interns and non-qualified audit trainees"
    },
    {
      criteria: "Accounting & Tax Technology",
      ta: "QuickBooks Cloud, AI document processing, and real-time CFO compliance monitors",
      traditional: "Manual paper registers, disconnected desktop spreadsheets"
    },
    {
      criteria: "Dispute & Tribunal Defense",
      ta: "End-to-end representation from DCT assessment up to Taxes Appellate Tribunal & High Court ADR",
      traditional: "Limited to initial filing; requires external counsel for appeals"
    },
    {
      criteria: "Ethics & Confidentiality",
      ta: "Strict Non-Disclosure (NDA) and ICAB/Taxes Bar institutional fiduciary standards",
      traditional: "Generic, non-specialized confidentiality precautions"
    }
  ];

  const milestones = [
    {
      year: "2023",
      title: "Foundation & Inception",
      description: "Established foundational practice focusing on High Net-Worth personal tax planning, corporate statutory return preparation, and BIDA work permit documentation."
    },
    {
      year: "2024",
      title: "Portfolio & Regulatory Expansion",
      description: "Expanded into international development NGOs, multi-tier corporate audits, and specialized transfer pricing documentation for multinational subsidiaries."
    },
    {
      year: "2025",
      title: "Institutional Integration & Advisory Firm Launch",
      description: "Formalized Tax Assistance (TA), RHA Advisory & Co. as an independent member of Dhaka Taxes Bar Association, surpassing 40+ corporate partners and 250+ private clients."
    },
    {
      year: "2026",
      title: "Next-Gen Accounting & AI Automation",
      description: "Deployed cloud accounting infrastructure, automated VAT Mushak 9.1 reconciliation engines, and full-stack client intelligence dashboard."
    }
  ];

  return (
    <section id="about" className="py-24 bg-white border-b border-slate-200 selection:bg-amber-500 selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-bold uppercase tracking-wider border border-blue-200">
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Firm Profile & Heritage</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f2942] tracking-tight">
            Independent Expertise. <br />
            Uncompromising Fiduciary Standards.
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Tax Assistance (TA), RHA Advisory & Co. is a premier professional services firm delivering integrated Audit, Tax, Legal, Consulting, and Business Support Services with Bangladeshi regulatory depth and global advisory rigor.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* WHO WE ARE: 2-COLUMN EXECUTIVE SHOWCASE */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                Institutional Creed
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                Professional Advisory That Extends Far Beyond Routine Compliance
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                At Tax Assistance, we believe corporate advisory should be clear, commercially sound, and aligned with your actual operational strategy. Our mission is to immerse ourselves in your operating environment, isolate statutory exposures, and implement robust tax and accounting structures that protect your bottom line.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                We represent premier commercial banks, multinational corporations, international NGOs, manufacturing conglomerates, and over 250+ private family offices. As an accredited member of the <strong className="text-slate-900">Dhaka Taxes Bar Association</strong>, our practice unites technical precision with strategic appellate advocacy.
              </p>
            </div>

            {/* Benchmark Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50/80 to-slate-50 border border-blue-200/80 flex items-start gap-4 shadow-2xs">
              <div className="w-12 h-12 rounded-xl bg-[#0f2942] text-amber-400 flex items-center justify-center flex-shrink-0 shadow-sm">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  Our Fiduciary Benchmark Commitment
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed italic">
                  "We strive to become a leading institution in professional advisory by providing world-class, ethical services to a selected group of institutional and private clients who share our commitment to integrity and excellence."
                </p>
              </div>
            </div>
          </div>

          {/* Mission & Vision Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <TiltCard maxTilt={8} className="p-6 rounded-3xl bg-gradient-to-br from-[#07172b] to-[#0c2442] text-white shadow-xl border border-slate-700/80 space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
                <Target className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white tracking-tight">Our Mission</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                To provide professional services ethically through leadership, collaboration, and practical solutions that create measurable, sustainable value for our clients.
              </p>
              <div className="pt-2 text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                Ethical • Practical • Value-Driven
              </div>
            </TiltCard>

            <TiltCard maxTilt={8} className="p-6 rounded-3xl bg-gradient-to-br from-[#0c2442] to-[#051120] text-white shadow-xl border border-slate-700/80 space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
                <Eye className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white tracking-tight">Our Vision</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                To evolve as a leading institution of international standards and become a benchmark for professional advisory and compliance among our clients and peers.
              </p>
              <div className="pt-2 text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                Benchmark Standards • Peer Recognition
              </div>
            </TiltCard>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* CHRONOLOGICAL FIRM EVOLUTION TIMELINE (2023 - 2026) */}
        {/* ========================================================================= */}
        <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200/90 space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-100/60 px-3 py-1 rounded-full border border-blue-200">
              Institutional Growth Track
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              The Journey of Tax Assistance (TA)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              A chronological overview of our expansion across Bangladesh's corporate regulatory landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {milestones.map((m, idx) => (
              <div 
                key={m.year}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md hover:border-blue-400 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-black font-mono text-blue-900">{m.year}</span>
                    <span className="w-7 h-7 rounded-full bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center border border-blue-200">
                      0{idx + 1}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-2">{m.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4 CORE VALUES WITH 3D TILT CARDS */}
        {/* ========================================================================= */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Institutional DNA
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">Our Four Core Values</h3>
            <p className="text-xs text-slate-500 mt-1">Guiding principles for every mandate, calculation, and client engagement</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <TiltCard 
                  key={idx} 
                  maxTilt={10}
                  className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-xl transition flex flex-col justify-between h-72"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                        {val.badge}
                      </span>
                    </div>

                    <h4 className="text-base font-extrabold text-slate-900 mb-2">{val.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{val.desc}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Core Practice Tenet
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* "WHY TA VS TRADITIONAL FIRMS" COMPARISON MATRIX */}
        {/* ========================================================================= */}
        <div className="bg-[#071526] rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-2xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30">
              The Advisory Advantage
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Why Corporate Leaders Choose Tax Assistance
            </h3>
            <p className="text-xs text-slate-300">
              A transparent comparison between our proactive chartered advisory and conventional compliance processors.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400 uppercase text-[10px] font-black tracking-wider">
                  <th className="py-3 px-4">Evaluation Dimension</th>
                  <th className="py-3 px-4 text-amber-400 bg-amber-500/10 rounded-t-xl font-bold">Tax Assistance (TA) Practice</th>
                  <th className="py-3 px-4 text-slate-400">Traditional Accounting Outfits</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {comparisonPoints.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40 transition">
                    <td className="py-4 px-4 font-bold text-slate-200">
                      {row.criteria}
                    </td>
                    <td className="py-4 px-4 bg-amber-500/5 text-amber-200 font-medium">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        <span>{row.ta}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-400">
                      <div className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                        <span>{row.traditional}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* STRUCTURED LIFECYCLE & BUSINESS ETHICS */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* 6 Approaches (7 cols) */}
          <div className="lg:col-span-7 bg-slate-50 rounded-3xl p-8 border border-slate-200/90 space-y-6">
            <div className="flex items-center gap-2.5">
              <Compass className="w-5 h-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-900">Our Structured Engagement Lifecycle</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              We collaborate with corporate stakeholders through a disciplined diagnostic methodology formulated for institutional stability:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {approaches.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-700 font-medium leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ethics Card (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#091d34] to-[#040e1b] text-white rounded-3xl p-8 border border-slate-800 flex flex-col justify-between shadow-xl space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black uppercase tracking-wider border border-amber-500/30">
                <Shield className="w-3.5 h-3.5" />
                <span>Statutory Governance & Ethics</span>
              </div>
              <h4 className="text-xl font-extrabold text-white">
                Fiduciary Responsibility at the Core of Every Advisory
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                At Tax Assistance, ethical conduct is not merely an aspiration—it is our operating standard. We adhere to the highest standards of integrity, professional confidentiality, transparency, and fiduciary accountability in every audit, assessment, and legal filing.
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                All client engagements are conducted in strict compliance with the Dhaka Taxes Bar Association bylaws and national regulatory codes.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Bar Association Member</span>
              </span>
              <span className="font-mono text-amber-400">Code: DTBA-2025</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
