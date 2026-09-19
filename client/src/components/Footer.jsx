import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  ArrowUp, 
  Globe,
  ExternalLink,
  Lock
} from 'lucide-react';

export default function Footer({ onNavigate }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About Us', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Portfolio', id: 'portfolio' },
    { name: 'Our Clients', id: 'clients' },
    { name: 'Team', id: 'team' },
    { name: 'Library', id: 'library' },
    { name: 'Career', id: 'career' },
    { name: 'Contact Us', id: 'contact' }
  ];

  const servicesLinks = [
    'External & Project Audit',
    'IFRS Compliance & Assurance',
    'Corporate Tax Compliance (Sec 177)',
    'Personal Income Tax Planning',
    'Indirect Tax & Monthly VAT Return',
    'QuickBooks Automation & Accounting',
    'Financial Manuals & SOP Development',
    'RJSC Incorporations & BIDA Permits'
  ];

  return (
    <footer className="bg-[#071524] text-slate-400 text-xs border-t border-slate-800">
      
      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Firm Overview (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-white p-0.5">
                <img 
                  src="/logo.webp" 
                  alt="Tax Assistance (TA) Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white tracking-tight">
                  Tax Assistance (TA)
                </h3>
                <p className="text-[11px] text-amber-400 font-semibold">
                  RHA Advisory & Co. | Financial Advisory
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              An independent professional services firm providing integrated Audit, Tax, Consulting, and Business Support Services. Independent member of the Dhaka Taxes Bar Association.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1 text-[11px] bg-slate-900 border border-slate-800 text-slate-300 px-3 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Professional Solutions. Practical Advice. Trusted Partnership.</span>
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    to={link.id === 'home' ? '/' : `/${link.id}`}
                    onClick={scrollToTop}
                    className="hover:text-white transition text-xs text-slate-400 block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Key Practice Areas (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Key Services
            </h4>
            <ul className="space-y-2">
              {servicesLinks.map((svc, idx) => (
                <li key={idx}>
                  <Link
                    to="/services"
                    onClick={scrollToTop}
                    className="hover:text-white transition text-xs text-slate-400 block text-left"
                  >
                    {svc}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Office (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Contact & Address
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Level 3, Ventura Iconia, Holding 37, Road No. 11, Dhaka 1213, Bangladesh</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href="tel:+8801767690408" className="hover:text-white transition">
                  +880 1767-690408
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href="mailto:info@tax-assistance.com" className="hover:text-white transition">
                  info@tax-assistance.com
                </a>
              </div>
            </div>

            {/* Social Channels */}
            <div className="pt-3 flex items-center gap-3">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white flex items-center justify-center transition"
                title="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white flex items-center justify-center transition"
                title="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/></svg>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white flex items-center justify-center transition"
                title="Twitter / X"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Sub-Footer / Copyright */}
      <div className="bg-[#050e18] border-t border-slate-800/80 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-slate-500 text-center sm:text-left">
            Copyright © 2026 Tax Assistance (TA), RHA Advisory & Co. All Rights Reserved.
          </p>

          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms & Conditions</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Disclaimer</span>
            <span>•</span>
            <Link 
              to="/admin" 
              className="opacity-20 hover:opacity-100 hover:text-amber-400 text-slate-500 transition-opacity p-0.5 inline-flex items-center" 
              title="CMS Staff Login"
            >
              <Lock className="w-3 h-3" />
            </Link>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="p-1 rounded-md bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
              title="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
}
