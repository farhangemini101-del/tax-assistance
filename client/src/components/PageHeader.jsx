import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function PageHeader({ title, subtitle, badge, breadcrumbs = [] }) {
  return (
    <div className="relative pt-32 pb-16 md:pt-36 md:pb-20 bg-slate-900 text-white overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-700 via-slate-900 to-black pointer-events-none"></div>
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
          <Link to="/" className="hover:text-white transition flex items-center gap-1">
            <Home className="w-3.5 h-3.5 text-slate-400" />
            <span>Home</span>
          </Link>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3 h-3 text-slate-600" />
              {crumb.path ? (
                <Link to={crumb.path} className="hover:text-white transition">
                  {crumb.name}
                </Link>
              ) : (
                <span className="text-amber-400 font-semibold">{crumb.name}</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Badge & Title */}
        {badge && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800 text-blue-300 text-xs font-bold uppercase tracking-wider mb-3">
            <span>{badge}</span>
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-4xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl font-normal">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
