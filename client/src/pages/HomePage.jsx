import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import TiltCard from '../components/TiltCard';
import TechAIConsultingBanner from '../components/TechAIConsultingBanner';
import ClientLogoMarquee from '../components/ClientLogoMarquee';
import CorporateTaxCalculator from '../components/CorporateTaxCalculator';
import { 
  ShieldCheck, 
  ArrowRight, 
  Building2, 
  Users, 
  BookOpen, 
  GraduationCap, 
  Receipt, 
  TrendingUp, 
  Sparkles,
  CheckCircle2,
  Cpu
} from 'lucide-react';

export default function HomePage({ firmInfo, services, portfolio, clients, team, libraryResources }) {
  const navigate = useNavigate();

  const clientsWithLogos = clients.filter(c => c.logo).slice(0, 12);

  return (
    <div>
      {/* 3D Interactive Hero */}
      <Hero 
        onNavigate={(target) => {
          if (target.startsWith('services')) navigate(`/${target}`);
          else if (target === 'contact') navigate('/contact');
          else navigate(`/${target}`);
        }} 
        stats={firmInfo?.stats} 
      />

      {/* Infinite Client Logos Marquee */}
      <ClientLogoMarquee clients={clients} />

      {/* About Preview Banner with 3D Tilt */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-bold uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5 text-blue-600" />
                <span>About The Firm</span>
              </div>
              <h2 className="text-3xl font-extrabold text-[#0f2942] tracking-tight">
                Practical Advice. Ethical Leadership. Measurable Value.
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Tax Assistance (TA), RHA Advisory & Co. was established in 2025 as an independent professional services firm and proud member of the Dhaka Taxes Bar Association. We bridge the gap between complex statutory regulations and commercial strategy.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Dhaka Taxes Bar Association Member</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>250+ High Net-Worth Tax Clients</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Multi-sector Assurance & Audit</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>AI-Enabled Compliance & QuickBooks</span>
                </div>
              </div>

              <div className="pt-3">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-blue-900 text-white text-xs font-bold rounded-xl shadow-xs transition"
                >
                  <span>Learn More About Our Firm & Leadership</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <TiltCard className="bg-slate-50 border border-slate-200 rounded-3xl p-7 shadow-sm space-y-4">
                <div className="border-l-4 border-blue-600 pl-4 py-1">
                  <h4 className="text-sm font-bold text-slate-900">Our Mission</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    To provide professional services ethically through leadership, collaboration, and practical solutions that create value for our clients.
                  </p>
                </div>
                <div className="border-l-4 border-amber-500 pl-4 py-1">
                  <h4 className="text-sm font-bold text-slate-900">Our Vision</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    To evolve as a leading institution of international standards and become a benchmark for professional services among our clients and peers.
                  </p>
                </div>
              </TiltCard>
            </div>
          </div>
        </div>
      </section>

      {/* Services Showcase with 3D Tilt Cards */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">Practice Areas</span>
              <h2 className="text-3xl font-extrabold text-[#0f2942] tracking-tight mt-1">
                Integrated Advisory & Compliance
              </h2>
            </div>
            <Link
              to="/services"
              className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1.5"
            >
              <span>Explore All 4 Practice Pillars</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((svc) => (
              <TiltCard
                key={svc.id}
                maxTilt={10}
                className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs hover:border-blue-400 hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold mb-4 group-hover:bg-blue-600 group-hover:text-white transition duration-300 shadow-xs">
                    {svc.id === 'audit-assurance' && <ShieldCheck className="w-6 h-6" />}
                    {svc.id === 'taxation' && <Receipt className="w-6 h-6" />}
                    {svc.id === 'consulting' && <TrendingUp className="w-6 h-6" />}
                    {svc.id === 'business-support' && <Building2 className="w-6 h-6" />}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-900 transition mb-2">
                    {svc.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {svc.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    to={`/services/${svc.id}`}
                    className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center justify-between"
                  >
                    <span>View Specific Services</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Technology & AI Automation Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TechAIConsultingBanner 
            onInquire={() => navigate('/contact', { state: { preSelectedService: 'Consulting - Automation with AI' } })} 
          />
        </div>
      </section>

      {/* Featured Client Logos with 3D Tilt */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Trusted Partnerships</span>
            <h2 className="text-3xl font-extrabold text-[#0f2942] tracking-tight mt-1">
              Serving Industry Leaders Across Bangladesh
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center">
            {clientsWithLogos.map((client) => (
              <TiltCard 
                key={client.id}
                maxTilt={12}
                className="group p-4 rounded-2xl border border-slate-100 hover:border-blue-300 bg-slate-50/50 hover:bg-white transition-all shadow-2xs hover:shadow-lg flex flex-col items-center justify-center text-center h-28"
              >
                <div className="w-full h-14 flex items-center justify-center overflow-hidden mb-2">
                  <img 
                    src={client.logo} 
                    alt={client.name} 
                    className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition duration-300"
                  />
                </div>
                <span className="text-[11px] font-bold text-slate-700 group-hover:text-blue-900 line-clamp-1">
                  {client.name}
                </span>
              </TiltCard>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/clients"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-bold shadow-2xs transition"
            >
              <span>View All 40+ Corporate & Institutional Clients</span>
              <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Bangladesh Corporate Tax Liability Calculator */}
      <section className="py-20 bg-slate-100/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CorporateTaxCalculator />
        </div>
      </section>

      {/* Quick CTA to Contact */}
      <section className="py-16 navy-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl text-center md:text-left">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Ready to Engage?</span>
            <h3 className="text-2xl font-bold">Schedule an Advisory Consultation with Our Partners</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Direct, confidential guidance for corporate direct tax, VAT compliance, audit support, or business incorporation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition"
            >
              Submit Inquiry
            </Link>
            <a
              href="https://wa.me/8801767690408"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 transition"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
