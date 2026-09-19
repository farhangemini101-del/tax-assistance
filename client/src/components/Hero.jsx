import React from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Award,
  Building,
  Sparkles,
  TrendingUp,
  Cpu,
  Bot
} from 'lucide-react';
import Hero3DCanvas from './Hero3DCanvas';
import TiltCard from './TiltCard';

export default function Hero({ onNavigate, stats = [] }) {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#071322] text-white">
      {/* Dynamic Background Gradients & Glow */}
      <div className="absolute inset-0 z-0 opacity-40 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-700 via-slate-900 to-black"></div>
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Futuristic Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b18_1px,transparent_1px),linear-gradient(to_bottom,#1e293b18_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Affiliation Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-750/80 text-blue-200 text-xs font-semibold backdrop-blur-md shadow-inner">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Independent Member: Dhaka Taxes Bar Association</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            </div>

            <div className="space-y-3">
              <p className="text-amber-400 font-bold tracking-wider uppercase text-xs sm:text-sm flex items-center gap-2">
                <span>Tax Assistance (TA), RHA Advisory & Co.</span>
                <span className="px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 text-[10px] font-mono border border-blue-700/50">
                  EST. 2025
                </span>
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Professional Solutions. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-amber-300">
                  Practical Advice.
                </span> <br />
                Trusted Partnership.
              </h1>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
              An independent professional services firm with distinctive local strength, practical understanding, and modern technology. We provide integrated 
              <span className="text-white font-semibold"> Audit, Tax, Financial Consulting, and Business Support Services </span> 
              to businesses, development organizations, and individuals across Bangladesh.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('services')}
                className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-900/40 flex items-center gap-2 transition transform hover:-translate-y-0.5"
              >
                <span>Explore Practice Pillars</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-100 font-bold text-xs sm:text-sm border border-slate-700 flex items-center gap-2 transition"
              >
                <span>Schedule Consultation</span>
              </button>

              <a
                href="https://wa.me/8801767690408?text=Hello,%20I%20would%20like%20to%20consult%20with%20Tax%20Assistance%20partners."
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3.5 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/70 text-emerald-300 text-xs font-semibold border border-emerald-700/60 flex items-center gap-2 transition"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Talk to an Expert</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Statutory Compliance & Return Filing</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Taxes Appellate Tribunal & ADR</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>AI Automation & QuickBooks</span>
              </span>
            </div>
          </div>

          {/* Right Hero: Interactive 3D Canvas & Tilt Pillar Card (5 cols) */}
          <div className="lg:col-span-5 relative">
            
            {/* 3D Canvas Floating in the Background of the Card */}
            <div className="absolute -inset-10 -top-16 opacity-75 pointer-events-none">
              <Hero3DCanvas />
            </div>

            {/* 3D Tilt Card containing Practice Pillars */}
            <TiltCard 
              maxTilt={8}
              glare={true}
              className="relative bg-gradient-to-b from-slate-900/90 to-[#0b1c2f]/95 border border-blue-500/30 rounded-3xl p-6 sm:p-7 shadow-2xl backdrop-blur-xl z-20"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                    <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      Core Practice Pillars
                    </h3>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">3D Interactive Advisory Architecture</p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
                  <Award className="w-4 h-4 text-amber-400" />
                </div>
              </div>

              <div className="space-y-3">
                <div 
                  onClick={() => onNavigate('services/audit-assurance')}
                  className="p-3.5 rounded-xl bg-slate-800/60 hover:bg-blue-900/30 border border-slate-700/60 hover:border-blue-500/50 transition cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-100 group-hover:text-blue-300 transition">Audit & Assurance</h4>
                      <p className="text-[11px] text-slate-400">External, Project, NGO/NGOB & IFRS Audit</p>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-300 group-hover:translate-x-1 transition" />
                </div>

                <div 
                  onClick={() => onNavigate('services/taxation')}
                  className="p-3.5 rounded-xl bg-slate-800/60 hover:bg-amber-900/30 border border-slate-700/60 hover:border-amber-500/50 transition cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-100 group-hover:text-amber-300 transition">Direct Tax & VAT</h4>
                      <p className="text-[11px] text-slate-400">Corporate, Personal, Sec 177, Transfer Pricing</p>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-300 group-hover:translate-x-1 transition" />
                </div>

                <div 
                  onClick={() => onNavigate('services/consulting')}
                  className="p-3.5 rounded-xl bg-slate-800/60 hover:bg-emerald-900/30 border border-slate-700/60 hover:border-emerald-500/50 transition cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-100 group-hover:text-emerald-300 transition">Consulting & AI Automation</h4>
                      <p className="text-[11px] text-slate-400">Accounting, QuickBooks, SOPs & AI Solutions</p>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-300 group-hover:translate-x-1 transition" />
                </div>

                <div 
                  onClick={() => onNavigate('services/business-support')}
                  className="p-3.5 rounded-xl bg-slate-800/60 hover:bg-purple-900/30 border border-slate-700/60 hover:border-purple-500/50 transition cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
                      <Building className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-100 group-hover:text-purple-300 transition">Business Support (RJSC & BIDA)</h4>
                      <p className="text-[11px] text-slate-400">Incorporation, Work Permits, Licenses & Certs</p>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-300 group-hover:translate-x-1 transition" />
                </div>
              </div>

              {/* Bottom Micro Action */}
              <div className="mt-5 p-3 rounded-xl bg-blue-950/60 border border-blue-800/50 flex items-center justify-between text-xs">
                <span className="text-slate-300">Need immediate regulatory support?</span>
                <button 
                  onClick={() => onNavigate('contact')}
                  className="text-amber-400 hover:text-amber-300 font-bold transition flex items-center gap-1"
                >
                  <span>Submit Inquiry</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </TiltCard>

          </div>

        </div>

        {/* Hero Bottom Stats Counters with 3D Tilt Cards */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <TiltCard className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xs">
            <div className="text-2xl sm:text-3xl font-black text-white">250+</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Individual Clients Served</div>
          </TiltCard>
          <TiltCard className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xs">
            <div className="text-2xl sm:text-3xl font-black text-white">40+</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Corporate & NGO Clients</div>
          </TiltCard>
          <TiltCard className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xs">
            <div className="text-2xl sm:text-3xl font-black text-sky-400">10+</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Sectors & Industries</div>
          </TiltCard>
          <TiltCard className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xs">
            <div className="text-2xl sm:text-3xl font-black text-amber-400">100%</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Ethical & Statutory Adherence</div>
          </TiltCard>
        </div>

      </div>
    </section>
  );
}
