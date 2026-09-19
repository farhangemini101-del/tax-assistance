import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Building } from 'lucide-react';

export default function ClientLogoMarquee({ clients = [] }) {
  const logos = clients.filter(c => c.logo);
  // Duplicate for seamless infinite loop
  const marqueeList = [...logos, ...logos];

  return (
    <div className="py-12 bg-[#040d1a] border-y border-slate-800/80 text-white overflow-hidden relative">
      
      {/* Side Fade Gradients */}
      <div className="absolute top-0 left-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[#040d1a] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[#040d1a] to-transparent z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">
            Trusted by Premier Institutional Brands in Bangladesh
          </span>
        </div>

        <Link
          to="/clients"
          className="text-xs font-bold text-amber-400 hover:text-amber-300 transition flex items-center gap-1 self-start sm:self-auto"
        >
          <span>Explore All 40+ Corporate Partners</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Marquee Track */}
      <div className="relative w-full overflow-hidden flex">
        <div className="flex items-center gap-8 sm:gap-12 animate-marquee whitespace-nowrap hover:[animation-play-state:paused] py-2">
          {marqueeList.map((client, idx) => (
            <Link
              key={`${client.id}-${idx}`}
              to="/clients"
              className="group flex-shrink-0 w-36 sm:w-44 h-20 rounded-2xl bg-white/5 hover:bg-white border border-white/10 hover:border-amber-400/50 transition-all duration-300 p-3 flex items-center justify-center shadow-inner hover:shadow-xl"
              title={client.name}
            >
              <img
                src={client.logo}
                alt={client.name}
                className="max-h-12 max-w-full object-contain filter brightness-90 contrast-125 grayscale group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-300 group-hover:scale-105"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
