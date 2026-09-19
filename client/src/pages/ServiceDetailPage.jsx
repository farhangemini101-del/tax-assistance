import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { 
  ShieldCheck, 
  Receipt, 
  TrendingUp, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight,
  Phone,
  MessageSquare
} from 'lucide-react';

export default function ServiceDetailPage({ services }) {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const service = services.find(s => s.id === serviceId) || services[0];

  const getIcon = (id) => {
    switch(id) {
      case 'audit-assurance': return ShieldCheck;
      case 'taxation': return Receipt;
      case 'consulting': return TrendingUp;
      case 'business-support': return Building2;
      default: return ShieldCheck;
    }
  };

  const Icon = getIcon(service?.id);

  if (!service) {
    return (
      <div className="py-32 text-center">
        <h2 className="text-xl font-bold">Service Not Found</h2>
        <Link to="/services" className="text-blue-600 underline text-sm mt-2 block">
          Return to Services Directory
        </Link>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={service.title}
        subtitle={service.summary}
        badge={service.category}
        breadcrumbs={[
          { name: 'Services', path: '/services' },
          { name: service.title }
        ]}
      />

      <div className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Main Content (8 cols) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Pillar Intro Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Practice Scope</span>
                    <h2 className="text-2xl font-bold text-slate-900">{service.title}</h2>
                  </div>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {service.summary}
                </p>
              </div>

              {/* Subcategories Detailed Breakdown */}
              <div className="space-y-6">
                {service.subcategories?.map((sub, sIdx) => (
                  <div 
                    key={sIdx}
                    className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs"
                  >
                    <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                        <h3 className="text-lg font-bold text-slate-900">{sub.title}</h3>
                      </div>
                      <span className="text-xs font-semibold text-slate-400">
                        {sub.items?.length || 0} Statutory Deliverables
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {sub.items?.map((item, iIdx) => (
                        <div key={iIdx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-slate-700 font-medium leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                      <button
                        onClick={() => navigate('/contact', { state: { preSelectedService: `${service.title} - ${sub.title}` } })}
                        className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1.5 transition"
                      >
                        <span>Request Specific Engagement for {sub.title}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* All Services Navigation Menu */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                  All Practice Pillars
                </h4>
                <div className="space-y-1">
                  {services.map((s) => {
                    const isCurrent = s.id === service.id;
                    return (
                      <Link
                        key={s.id}
                        to={`/services/${s.id}`}
                        className={`flex items-center justify-between p-3 rounded-xl text-xs font-bold transition ${
                          isCurrent
                            ? 'bg-[#0f2942] text-white shadow-xs'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{s.title}</span>
                        <ChevronRight className={`w-3.5 h-3.5 ${isCurrent ? 'text-amber-400' : 'text-slate-400'}`} />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Consultation Card */}
              <div className="navy-gradient text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-md">
                <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">Direct Access</span>
                <h4 className="text-lg font-bold mt-1 mb-2">Speak With a Qualified Partner</h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  Schedule a private, confidential consultation regarding your company's {service.title} requirements.
                </p>

                <div className="space-y-3">
                  <button
                    onClick={() => navigate('/contact', { state: { preSelectedService: service.title } })}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow transition text-center"
                  >
                    Submit Consultation Request
                  </button>

                  <a
                    href="https://wa.me/8801767690408?text=Hello,%20I%20would%20like%20to%20inquire%20about%20your%20services."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-emerald-600/30 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/30 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Advisory Line</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
