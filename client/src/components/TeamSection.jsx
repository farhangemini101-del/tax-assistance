import React, { useState } from 'react';
import { 
  Users, 
  Award, 
  ShieldCheck, 
  Sparkles, 
  Mail, 
  Phone, 
  Briefcase, 
  Network, 
  CheckCircle2, 
  ArrowRight,
  BookOpen,
  Scale,
  Calendar,
  Layers,
  MessageSquare,
  FileCheck
} from 'lucide-react';
import TiltCard from './TiltCard';

export default function TeamSection({ team = [], onBookConsultation }) {
  const [activeLeaderTab, setActiveLeaderTab] = useState('expertise');

  const leader = team.find(m => m.id === 'mehedi-hasan') || team[0];
  const secretary = team.find(m => m.id === 'rahatul-jannat-anni') || team[1];

  const philosophyPillars = [
    {
      title: "Continuous Professional Learning",
      desc: "Regular technical updates on ICAB, CPA, and Dhaka Taxes Bar Association jurisprudence to give clients actionable legal advantage.",
      icon: BookOpen,
      badge: "Knowledge R&D"
    },
    {
      title: "Collaborative Multi-Disciplinary Teams",
      desc: "Harmonizing tax specialists, auditors, corporate secretarial experts, and AI automators for comprehensive coverage.",
      icon: Layers,
      badge: "Integrated Synergy"
    },
    {
      title: "Strict Ethical Practice & Confidentiality",
      desc: "Absolute compliance with professional secrecy codes, conflict-of-interest checks, and statutory transparency.",
      icon: Scale,
      badge: "Fiduciary Trust"
    },
    {
      title: "Responsive Value Creation",
      desc: "Going beyond routine compliance to formulate tangible strategies that reduce risk, optimize deductions, and drive growth.",
      icon: Sparkles,
      badge: "Client Impact"
    }
  ];

  const affiliateSpecialisms = [
    {
      role: "High Court & Tribunal Advocates",
      desc: "Senior advocates handling complex tax reference applications and legal appeals before the High Court Division.",
      tag: "Litigation & ADR"
    },
    {
      role: "Chartered Accounting Affiliates",
      desc: "Fellow Chartered Accountants (FCA) collaborating on statutory external audits, group consolidations, and IFRS audits.",
      tag: "Audit & Assurance"
    },
    {
      role: "Transfer Pricing & Cross-Border Experts",
      desc: "Specialists assessing multinational benchmark transactions and international double taxation avoidance treaties (DTAA).",
      tag: "Global Tax"
    },
    {
      role: "BIDA & Foreign Exchange Advisors",
      desc: "Ex-regulatory specialists guiding FDI compliance, outward remittances, and Bangladesh Bank approvals.",
      tag: "Regulatory Clearances"
    }
  ];

  return (
    <section id="team" className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3 border border-blue-200">
            <Users className="w-3.5 h-3.5 text-blue-700" />
            <span>Executive Leadership & Professionals</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f2942] tracking-tight">
            Meet Our Leadership Team
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            Our strength comes from our people. Our professionals bring together diverse technical knowledge, 
            practical experience, and sector-specific understanding to provide solutions that address the real needs of our clients.
          </p>
        </div>

        {/* 1. Founder & CEO Featured Executive Showcase (Mehedi Hasan, CPA, ITP) */}
        {leader && (
          <div className="mb-20">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#091b30] via-[#0f2945] to-[#071424] text-white border border-blue-500/30 shadow-2xl p-6 sm:p-10 lg:p-12">
              {/* Background ambient lighting */}
              <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                
                {/* Left: Founder 3D Portrait Card */}
                <div className="lg:col-span-5">
                  <TiltCard 
                    maxTilt={10} 
                    className="relative rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-2xl bg-slate-900 group"
                  >
                    <div className="aspect-[4/5] overflow-hidden">
                      <img 
                        src={leader.photo} 
                        alt={leader.name} 
                        className="w-full h-full object-cover object-top filter brightness-95 group-hover:scale-105 group-hover:brightness-105 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                    </div>

                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-full bg-blue-950/90 text-amber-300 border border-amber-500/40 backdrop-blur-md shadow-md">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                        <span>Dhaka Taxes Bar Member</span>
                      </span>
                    </div>

                    <div className="absolute bottom-5 left-5 right-5">
                      <span className="text-[11px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded bg-amber-500 text-slate-950 shadow">
                        {leader.role}
                      </span>
                      <h3 className="text-2xl font-black text-white mt-2 drop-shadow-md">
                        {leader.name}
                      </h3>
                      <p className="text-xs text-blue-200 font-medium">
                        CPA • ITP • Member, Dhaka Taxes Bar Association
                      </p>
                    </div>
                  </TiltCard>
                </div>

                {/* Right: Detailed Tabs & Professional Accreditations */}
                <div className="lg:col-span-7 space-y-6">
                  
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                        Executive Leadership Profile
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                      Mehedi Hasan, CPA, ITP
                    </h3>
                    <p className="text-xs text-blue-300 font-semibold mt-1">
                      Founder & Chief Executive Officer • Tax Assistance (TA), RHA Advisory & Co.
                    </p>
                  </div>

                  {/* Quote Banner */}
                  <blockquote className="p-4 rounded-xl bg-slate-800/60 border-l-4 border-amber-400 text-xs sm:text-sm text-slate-200 italic leading-relaxed">
                    "At Tax Assistance, our standard of care is defined not merely by filing compliance forms, but by understanding our clients' businesses, identifying their challenges, and delivering practical solutions that create sustainable value."
                  </blockquote>

                  {/* Interactive Profile Detail Tabs */}
                  <div>
                    <div className="flex gap-2 pb-3 border-b border-slate-700/80">
                      <button
                        onClick={() => setActiveLeaderTab('expertise')}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                          activeLeaderTab === 'expertise'
                            ? 'bg-amber-500 text-slate-950 shadow'
                            : 'text-slate-300 hover:text-white hover:bg-slate-800'
                        }`}
                      >
                        Core Practice Mastery
                      </button>
                      <button
                        onClick={() => setActiveLeaderTab('credentials')}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                          activeLeaderTab === 'credentials'
                            ? 'bg-amber-500 text-slate-950 shadow'
                            : 'text-slate-300 hover:text-white hover:bg-slate-800'
                        }`}
                      >
                        Accreditations & Bar
                      </button>
                      <button
                        onClick={() => setActiveLeaderTab('bio')}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                          activeLeaderTab === 'bio'
                            ? 'bg-amber-500 text-slate-950 shadow'
                            : 'text-slate-300 hover:text-white hover:bg-slate-800'
                        }`}
                      >
                        Leadership Overview
                      </button>
                    </div>

                    <div className="pt-4">
                      {activeLeaderTab === 'expertise' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <h5 className="text-xs font-bold text-white">Corporate Direct Taxation</h5>
                              <p className="text-[11px] text-slate-400 mt-0.5">Section 177 returns, AIT optimization & group assessments</p>
                            </div>
                          </div>
                          <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <h5 className="text-xs font-bold text-white">Taxes Appellate Tribunal</h5>
                              <p className="text-[11px] text-slate-400 mt-0.5">Appeals against DCT orders & ADR representation</p>
                            </div>
                          </div>
                          <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <h5 className="text-xs font-bold text-white">Assurance & IFRS Compliance</h5>
                              <p className="text-[11px] text-slate-400 mt-0.5">Audit coordination, internal control & financial review</p>
                            </div>
                          </div>
                          <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <h5 className="text-xs font-bold text-white">FDI & BIDA Consultancy</h5>
                              <p className="text-[11px] text-slate-400 mt-0.5">Cross-border inward investment & outward remittances</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeLeaderTab === 'credentials' && (
                        <div className="space-y-2.5">
                          <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Award className="w-5 h-5 text-amber-400" />
                              <div>
                                <h5 className="text-xs font-bold text-white">Certified Public Accountant (CPA)</h5>
                                <p className="text-[11px] text-slate-400">Professional accounting & corporate governance</p>
                              </div>
                            </div>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950 text-blue-300 font-bold border border-blue-800">Verified</span>
                          </div>

                          <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Scale className="w-5 h-5 text-amber-400" />
                              <div>
                                <h5 className="text-xs font-bold text-white">Income Tax Practitioner (ITP)</h5>
                                <p className="text-[11px] text-slate-400">Authorized statutory tax representative before NBR</p>
                              </div>
                            </div>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950 text-blue-300 font-bold border border-blue-800">Authorized</span>
                          </div>

                          <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <ShieldCheck className="w-5 h-5 text-emerald-400" />
                              <div>
                                <h5 className="text-xs font-bold text-white">Dhaka Taxes Bar Association</h5>
                                <p className="text-[11px] text-slate-400">Official independent member advocate</p>
                              </div>
                            </div>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold border border-emerald-800">Standing Member</span>
                          </div>
                        </div>
                      )}

                      {activeLeaderTab === 'bio' && (
                        <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/40 p-4 rounded-xl border border-slate-700/60">
                          {leader.bio}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Bottom Action */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => onBookConsultation && onBookConsultation('Consultation with Founder & CEO - Mehedi Hasan, CPA, ITP')}
                      className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-md transition flex items-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4 text-slate-950" />
                      <span>Request Consultation with Mehedi Hasan</span>
                    </button>
                    
                    <a
                      href="mailto:info@tax-assistance.com?subject=Consultation%20Inquiry%20for%20Mehedi%20Hasan,%20CPA"
                      className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition"
                    >
                      Direct Email
                    </a>
                  </div>

                </div>

              </div>
            </div>
          </div>
        )}

        {/* 2. Corporate Secretarial & Administration Leadership (Rahatul Jannat Anni) */}
        {secretary && (
          <div className="mb-20">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                
                {/* Photo Card */}
                <div className="md:col-span-4 lg:col-span-3">
                  <TiltCard maxTilt={8} className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100">
                    <div className="aspect-[4/5] overflow-hidden">
                      <img 
                        src={secretary.photo} 
                        alt={secretary.name} 
                        className="w-full h-full object-cover object-top hover:scale-105 transition duration-500"
                      />
                    </div>
                    <div className="p-3.5 bg-slate-900 text-white text-center">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                        {secretary.role}
                      </span>
                      <h4 className="text-sm font-extrabold mt-0.5">{secretary.name}</h4>
                    </div>
                  </TiltCard>
                </div>

                {/* Details */}
                <div className="md:col-span-8 lg:col-span-9 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                    <div>
                      <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">
                        Corporate Secretarial & Administration
                      </span>
                      <h3 className="text-2xl font-black text-slate-900 mt-0.5">
                        {secretary.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">{secretary.role} • Tax Assistance (TA)</p>
                    </div>

                    <button
                      onClick={() => onBookConsultation && onBookConsultation('Secretarial Inquiry with Rahatul Jannat Anni')}
                      className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-900 text-xs font-bold rounded-xl border border-blue-200 transition flex items-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5 text-blue-700" />
                      <span>Contact Secretarial Office</span>
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {secretary.bio}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                      <FileCheck className="w-4 h-4 text-blue-700 flex-shrink-0 mt-0.5" />
                      <div>
                        <h5 className="text-xs font-bold text-slate-900">Governance & RJSC Filing Oversight</h5>
                        <p className="text-[11px] text-slate-500 mt-0.5">Ensuring timely statutory filings, AGM minutes, and Schedule X compliance.</p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                      <Users className="w-4 h-4 text-blue-700 flex-shrink-0 mt-0.5" />
                      <div>
                        <h5 className="text-xs font-bold text-slate-900">Client Liaison & Assignment Tracking</h5>
                        <p className="text-[11px] text-slate-500 mt-0.5">Continuous communication channel between clients and senior partners.</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* 3. Our Leadership Philosophy & Cultural Tenets (4 3D Tilt Cards) */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Our Fiduciary Standard</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0f2942] mt-1">
              Our People, Our Strength
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Four institutional values that drive our professionals' conduct and deliver consistent client results.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {philosophyPillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <TiltCard
                  key={idx}
                  maxTilt={10}
                  className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-xl hover:border-blue-400 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition flex items-center justify-center font-bold shadow-xs">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                        {p.badge}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-900 transition mb-2">
                      {p.title}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-100 text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Active Team Standard</span>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </div>

        {/* 4. Strategic Affiliates & Advisory Specialist Network */}
        <div className="rounded-3xl navy-gradient text-white p-8 sm:p-12 border border-slate-800 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-700/80">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-2 border border-blue-400/30">
                <Network className="w-3.5 h-3.5 text-amber-400" />
                <span>Inter-Firm Collaboration</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white">
                Our Affiliates & Specialist Advisory Network
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Our affiliate network is currently being developed to provide seamless cross-disciplinary capabilities.
              </p>
            </div>

            <span className="px-3.5 py-1 rounded-full bg-slate-800 text-amber-300 text-xs font-bold border border-slate-700 self-start md:self-auto">
              Active Network Development
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {affiliateSpecialisms.map((aff, aIdx) => (
              <TiltCard
                key={aIdx}
                maxTilt={6}
                className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/70 hover:border-blue-400/50 transition flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 mb-3 inline-block">
                    {aff.tag}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-white mb-1.5 leading-snug">
                    {aff.role}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {aff.desc}
                  </p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
