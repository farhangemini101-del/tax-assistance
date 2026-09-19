import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  ChevronDown, 
  ArrowRight, 
  ShieldCheck, 
  MessageSquare,
  Search,
  Sparkles,
  Calculator,
  FileText,
  Briefcase,
  Users,
  Compass,
  Clock,
  Building2,
  CheckCircle2,
  FileSpreadsheet,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesMegaMenuOpen, setServicesMegaMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(false);

  const megaMenuRef = useRef(null);
  const searchInputRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesMegaMenuOpen(false);
    setSearchModalOpen(false);
  }, [location.pathname]);

  // Global Ctrl + K / Cmd + K keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setSearchModalOpen(false);
        setServicesMegaMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus input when search modal opens
  useEffect(() => {
    if (searchModalOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    } else {
      setSearchQuery('');
    }
  }, [searchModalOpen]);

  // Mega-menu services data with rich metadata
  const practicePillars = [
    {
      id: 'audit-assurance',
      title: 'Audit & Assurance',
      subtitle: 'Statutory & Independent Audit',
      path: '/services/audit-assurance',
      icon: ShieldCheck,
      color: 'from-blue-600 to-indigo-700',
      badge: 'IFRS / ISA',
      items: [
        'Statutory Financial Statements Audit',
        'Special Purpose & Project Audits',
        'NGO / MRA Regulatory Audits',
        'Internal Control Review & Governance'
      ]
    },
    {
      id: 'taxation',
      title: 'Taxation & VAT',
      subtitle: 'Income Tax Act 2023 Compliance',
      path: '/services/taxation',
      icon: Calculator,
      color: 'from-amber-600 to-orange-700',
      badge: 'Sec 177 / NBR',
      items: [
        'Corporate Tax Assessment & Filing',
        'Mushak 9.1 VAT Return Management',
        'International Transfer Pricing Study',
        'Taxes Appellate Tribunal & ADR'
      ]
    },
    {
      id: 'consulting',
      title: 'Consulting & AI Automation',
      subtitle: 'Digital Accounting & ERP',
      path: '/services/consulting',
      icon: Sparkles,
      color: 'from-emerald-600 to-teal-700',
      badge: 'QuickBooks / AI',
      items: [
        'QuickBooks & Cloud Accounting Setup',
        'AI Invoice & Statutory Extraction',
        'Fixed Asset Register & Valuation',
        'PF, Gratuity & WPPF Management'
      ]
    },
    {
      id: 'business-support',
      title: 'Business Support & Secretarial',
      subtitle: 'Corporate Legal & FDI',
      path: '/services/business-support',
      icon: Building2,
      color: 'from-purple-600 to-violet-700',
      badge: 'RJSC / BIDA',
      items: [
        'RJSC Company Formation & Secretarial',
        'BIDA Work Permits & E-Visa Processing',
        'Trade License, IRC, ERC & Chamber',
        'Trademark & Copyright Registration'
      ]
    }
  ];

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services', isMega: true },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Our Clients', path: '/clients' },
    { name: 'Team', path: '/team' },
    { name: 'Library', path: '/library', badge: 'Act 2023' },
    { name: 'Career', path: '/career', badge: 'Hiring' },
    { name: 'Contact Us', path: '/contact' },
  ];

  // Search items database for instant command search
  const searchableDirectory = [
    { title: 'Corporate Tax Return Filing (Section 177)', category: 'Taxation', path: '/services/taxation', keywords: 'income tax act 2023 annual corporate return nbr' },
    { title: 'Monthly VAT Return (Mushak 9.1)', category: 'Taxation', path: '/services/taxation', keywords: 'vat challan deposition mushak 9.1 monthly 15th' },
    { title: 'Taxes Appellate Tribunal Representation', category: 'Taxation', path: '/services/taxation', keywords: 'dispute appeal adr high court commissioner' },
    { title: 'Transfer Pricing Documentation (TP)', category: 'Taxation', path: '/services/taxation', keywords: 'multinational related party fdi transfer pricing' },
    { title: 'Statutory Financial Audit (IFRS / ISA)', category: 'Audit', path: '/services/audit-assurance', keywords: 'external audit chartered accountancy working papers' },
    { title: 'NGO Affairs Bureau & Project Audit', category: 'Audit', path: '/services/audit-assurance', keywords: 'ngo ngob foreign donation fdr fd6 fd7' },
    { title: 'QuickBooks Cloud & ERP Automation', category: 'Consulting', path: '/services/consulting', keywords: 'cloud accounting general ledger erp synchronization' },
    { title: 'AI & Robotic Accounting Automation', category: 'Consulting', path: '/services/consulting', keywords: 'ai document processing statutory precision bots' },
    { title: 'RJSC Company Incorporation & Secretarial', category: 'Business Support', path: '/services/business-support', keywords: 'private limited share capital form xii schedule x' },
    { title: 'BIDA Work Permit & Expatriate Visa', category: 'Business Support', path: '/services/business-support', keywords: 'foreign investor work permit e-visa pi visa security clearance' },
    { title: 'Corporate Tax Calculator (Income Tax Act 2023)', category: 'Tools', path: '/#tax-calculator', keywords: 'calculator corporate rates 27.5% 25% 20% 12% nbr' },
    { title: 'Mehedi Hasan, CPA, ITP (Founder & CEO)', category: 'Leadership', path: '/team', keywords: 'managing partner chartered professional accountant tax bar' },
    { title: 'Client Roster & Mandates (40+ Institutions)', category: 'Clients', path: '/clients', keywords: 'rmg fmcg ngo pharmaceutical bank healthcare' },
    { title: 'Statutory SRO & Gazettes Tracker', category: 'Library', path: '/library', keywords: 'sro gazette circular statutory regulatory downloads' },
    { title: 'Career Opportunities & Traineeships', category: 'Career', path: '/career', keywords: 'jobs vacancies article student audit trainee cpa' },
  ];

  const filteredSearchResults = searchQuery.trim() === ''
    ? searchableDirectory.slice(0, 6)
    : searchableDirectory.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.keywords.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleSelectSearchResult = (path) => {
    setSearchModalOpen(false);
    if (path.startsWith('/#')) {
      navigate('/');
      setTimeout(() => {
        const id = path.replace('/#', '');
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      navigate(path);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        {/* Top Executive Utility Bar */}
        <div className="bg-[#050e1a] text-slate-300 border-b border-slate-800/80">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 py-2.5 flex flex-wrap justify-between items-center gap-4">
            
            {/* Left Info: Phone, Email, Office Status */}
            <div className="flex items-center gap-5 sm:gap-7 flex-wrap">
              <a href="tel:+8801767690408" className="flex items-center gap-2 text-slate-200 hover:text-amber-300 transition text-[13px] font-medium">
                <div className="w-6 h-6 rounded-full bg-amber-500/15 flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                </div>
                +880 1767-690408
              </a>

              <a href="mailto:info@tax-assistance.com" className="hidden sm:flex items-center gap-2 text-slate-300 hover:text-amber-300 transition text-[13px]">
                <div className="w-6 h-6 rounded-full bg-amber-500/15 flex items-center justify-center">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                </div>
                info@tax-assistance.com
              </a>

              {/* Live Office Status Badge */}
              <div className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-[12px] text-emerald-300 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Dhaka HQ — Open 9:30 AM – 6:30 PM BST</span>
              </div>
            </div>

            {/* Right Info: Live Ticker & Bar Association Credential */}
            <div className="flex items-center gap-4">
              {/* Statutory Notice Ticker */}
              <div className="hidden lg:flex items-center gap-2 text-[12px] text-slate-400">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 font-bold text-[11px]">
                  ⚡ NBR Alert
                </span>
                <span>Monthly Mushak 9.1 VAT Return due on the 15th</span>
              </div>

              {/* Verified Bar Standing */}
              <div className="inline-flex items-center gap-1.5 text-[12px] bg-blue-950/90 px-3 py-1 rounded-lg text-sky-200 border border-blue-500/30 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Dhaka Taxes Bar Association</span>
                <span className="sm:hidden">Bar Member</span>
              </div>
            </div>

          </div>
        </div>

        {/* Main Floating Glassmorphic Header */}
        <nav 
          className={`transition-all duration-300 ${
            isScrolled 
              ? 'bg-[#0a192c]/97 backdrop-blur-xl shadow-2xl shadow-slate-950/30 py-3.5 border-b border-slate-700/60 text-white' 
              : 'bg-white/97 backdrop-blur-md py-4 border-b border-slate-200/90 text-slate-900'
          }`}
        >
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 flex justify-between items-center">
            
            {/* Brand Logo & Corporate Monogram */}
            <Link 
              to="/" 
              className="flex items-center gap-4 group flex-shrink-0"
            >
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-white shadow-md border border-slate-200 flex items-center justify-center p-1.5 group-hover:scale-105 transition-transform duration-300 group-hover:shadow-lg">
                <img 
                  src="/logo.webp" 
                  alt="Tax Assistance (TA) Logo" 
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-amber-400/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl"></div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-xl font-black tracking-tight transition leading-tight ${isScrolled ? 'text-white' : 'text-[#0a192c]'}`}>
                    Tax Assistance
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-black bg-amber-500/20 text-amber-500 border border-amber-500/30 tracking-wider">
                    TA
                  </span>
                </div>
                <p className={`text-[11px] font-semibold tracking-wide mt-0.5 ${isScrolled ? 'text-slate-400' : 'text-slate-500'}`}>
                  RHA Advisory & Co. · Chartered Tax & Advisory
                </p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden xl:flex items-center gap-1">
              {navLinks.map((link) => {
                if (link.isMega) {
                  return (
                    <div 
                      key={link.path}
                      className="relative"
                      onMouseEnter={() => setServicesMegaMenuOpen(true)}
                      onMouseLeave={() => setServicesMegaMenuOpen(false)}
                      ref={megaMenuRef}
                    >
                      <NavLink
                        to={link.path}
                        className={({ isActive }) =>
                          `flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-bold rounded-xl transition-all ${
                            isActive || location.pathname.startsWith('/services')
                              ? isScrolled 
                                ? 'bg-blue-600/30 text-sky-300 border border-blue-500/30' 
                                : 'bg-blue-50 text-blue-900 border border-blue-200/60'
                              : isScrolled
                                ? 'text-slate-200 hover:text-white hover:bg-slate-800/60'
                                : 'text-slate-600 hover:text-blue-900 hover:bg-slate-100/80'
                          }`
                        }
                      >
                        <span>{link.name}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesMegaMenuOpen ? 'rotate-180 text-amber-400' : 'text-slate-400'}`} />
                      </NavLink>

                      {/* Elite 4-Column Mega Menu */}
                      {servicesMegaMenuOpen && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[840px] z-50 animate-in fade-in zoom-in-95 duration-150">
                          <div className="bg-[#0b1b30] border border-slate-700/80 rounded-2xl shadow-2xl p-6 text-white overflow-hidden relative">
                            {/* Subtle Ambient Background Light */}
                            <div className="absolute -top-24 -right-24 w-60 h-60 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
                            <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

                            {/* Header Row of Mega-Menu */}
                            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                              <div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                                  Our Practice Pillars
                                </span>
                                <h4 className="text-sm font-bold text-white">
                                  Integrated Chartered Advisory & Statutory Solutions
                                </h4>
                              </div>
                              <Link
                                to="/services"
                                onClick={() => setServicesMegaMenuOpen(false)}
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-300 hover:text-white px-3 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition"
                              >
                                <span>View Full Directory</span>
                                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                              </Link>
                            </div>

                            {/* 4 Pillar Grid */}
                            <div className="grid grid-cols-2 gap-4">
                              {practicePillars.map((pillar) => {
                                const IconComponent = pillar.icon;
                                return (
                                  <Link
                                    key={pillar.id}
                                    to={pillar.path}
                                    onClick={() => setServicesMegaMenuOpen(false)}
                                    className="group/card p-4 rounded-xl bg-slate-900/60 hover:bg-slate-850 border border-slate-800/90 hover:border-blue-500/50 transition-all duration-200 flex flex-col justify-between"
                                  >
                                    <div>
                                      <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${pillar.color} flex items-center justify-center text-white shadow-sm`}>
                                            <IconComponent className="w-4 h-4" />
                                          </div>
                                          <div>
                                            <h5 className="text-xs font-bold text-white group-hover/card:text-amber-300 transition">
                                              {pillar.title}
                                            </h5>
                                            <p className="text-[10px] text-slate-400">
                                              {pillar.subtitle}
                                            </p>
                                          </div>
                                        </div>
                                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                                          {pillar.badge}
                                        </span>
                                      </div>

                                      <ul className="space-y-1 mt-2">
                                        {pillar.items.map((item, idx) => (
                                          <li key={idx} className="text-[11px] text-slate-300 flex items-center gap-1.5">
                                            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
                                            <span className="line-clamp-1">{item}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>

                                    <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-sky-400 group-hover/card:text-white font-medium">
                                      <span>Explore Pillar Scope</span>
                                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>

                            {/* Bottom Interactive Mega-Menu Banner */}
                            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs bg-slate-900/40 -mx-6 -mb-6 px-6 py-3">
                              <div className="flex items-center gap-2 text-slate-300">
                                <Sparkles className="w-4 h-4 text-amber-400" />
                                <span className="font-medium text-slate-200">
                                  Not sure which framework fits your business?
                                </span>
                              </div>
                              <Link
                                to="/services#solution-finder"
                                onClick={() => setServicesMegaMenuOpen(false)}
                                className="font-bold text-amber-300 hover:text-amber-200 flex items-center gap-1 hover:underline"
                              >
                                <span>Launch 3-Step Solution Matcher</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            </div>

                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `relative px-4 py-2.5 text-[13px] font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                        isActive
                          ? isScrolled 
                            ? 'bg-blue-600/30 text-sky-300 border border-blue-500/30' 
                            : 'bg-blue-50 text-blue-900 border border-blue-200/60'
                          : isScrolled
                            ? 'text-slate-200 hover:text-white hover:bg-slate-800/60'
                            : 'text-slate-600 hover:text-blue-900 hover:bg-slate-100/80'
                      }`
                    }
                  >
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-amber-400/25 text-amber-500 border border-amber-400/40 leading-none">
                        {link.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>

            {/* Right Interactive Controls: Search + WhatsApp + Consultation CTA */}
            <div className="hidden xl:flex items-center gap-3 flex-shrink-0">
              
              {/* Quick Search Trigger */}
              <button
                onClick={() => setSearchModalOpen(true)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl transition border text-[13px] font-medium ${
                  isScrolled 
                    ? 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white hover:bg-slate-700' 
                    : 'bg-slate-100 text-slate-600 border-slate-200/80 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
                title="Search services, acts, team (Ctrl + K)"
              >
                <Search className="w-4 h-4 text-amber-400" />
                <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-slate-200/60 text-slate-500 border border-slate-300/50">
                  ⌘K
                </span>
              </button>

              {/* WhatsApp Live Desk */}
              <a
                href="https://wa.me/8801767690408?text=Hello%20Tax%20Assistance,%20I%20would%20like%20to%20inquire%20about%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-[13px] font-bold text-emerald-300 bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-500/40 rounded-xl transition"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
                </span>
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp</span>
              </a>

              {/* Consultation CTA */}
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-bold text-white bg-gradient-to-r from-blue-700 to-[#0e2840] hover:from-blue-600 hover:to-blue-900 rounded-xl shadow-lg shadow-blue-900/30 transition-all transform hover:-translate-y-0.5 border border-blue-400/30"
              >
                <span>Consultation</span>
                <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Mobile / Tablet Controls */}
            <div className="flex xl:hidden items-center gap-2">
              <button
                onClick={() => setSearchModalOpen(true)}
                className={`p-2.5 rounded-xl border ${isScrolled ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-100 border-slate-200 text-slate-700'}`}
              >
                <Search className="w-5 h-5 text-amber-400" />
              </button>
              <a
                href="https://wa.me/8801767690408"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl text-emerald-700 bg-emerald-50 border border-emerald-200"
              >
                <MessageSquare className="w-5 h-5" />
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2.5 rounded-xl transition border ${isScrolled ? 'text-white hover:bg-slate-800 border-slate-700' : 'text-slate-700 hover:bg-slate-100 border-slate-200'}`}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>

          {/* Mobile Drawer */}
          {mobileMenuOpen && (
            <div className="lg:hidden bg-[#071322] border-b border-slate-800 px-4 pt-4 pb-8 max-h-[85vh] overflow-y-auto text-white shadow-2xl">
              
              {/* Mobile Quick Search Input */}
              <div 
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSearchModalOpen(true);
                }}
                className="mb-4 p-3 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-between text-slate-400 text-xs cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-amber-400" />
                  <span>Search services, acts, or resources...</span>
                </span>
                <span className="font-mono text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">
                  Ctrl+K
                </span>
              </div>

              {/* Navigation Links List */}
              <div className="space-y-1.5">
                {navLinks.map((link) => {
                  if (link.isMega) {
                    return (
                      <div key={link.path} className="border-b border-slate-800/80 pb-2">
                        <button
                          onClick={() => setMobileServicesExpanded(!mobileServicesExpanded)}
                          className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-bold text-left rounded-xl hover:bg-slate-850"
                        >
                          <span className="text-white">{link.name}</span>
                          <ChevronDown className={`w-4 h-4 text-amber-400 transition-transform ${mobileServicesExpanded ? 'rotate-180' : ''}`} />
                        </button>

                        {mobileServicesExpanded && (
                          <div className="pl-3 pr-1 py-2 space-y-2 bg-slate-900/80 rounded-xl border border-slate-800 mt-1">
                            <Link
                              to="/services"
                              onClick={() => setMobileMenuOpen(false)}
                              className="block p-2 text-xs font-bold text-sky-400 hover:text-white"
                            >
                              • Full Practice Directory Overview
                            </Link>

                            {practicePillars.map((pillar) => (
                              <Link
                                key={pillar.id}
                                to={pillar.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block p-2 text-xs font-medium text-slate-300 hover:text-amber-300 hover:bg-slate-800 rounded-lg"
                              >
                                <div className="font-bold text-white">{pillar.title}</div>
                                <div className="text-[10px] text-slate-400">{pillar.subtitle}</div>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3 py-2.5 text-sm font-bold rounded-xl transition ${
                          isActive 
                            ? 'text-sky-300 bg-blue-900/40 border border-blue-500/30' 
                            : 'text-slate-200 hover:bg-slate-850'
                        }`
                      }
                    >
                      <span>{link.name}</span>
                      {link.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                          {link.badge}
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </div>

              {/* Mobile CTA Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-800 space-y-2.5">
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 px-4 text-center font-bold text-xs text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg block"
                >
                  Request Corporate Consultation
                </Link>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 px-1">
                  <span>Hotline: +880 1767-690408</span>
                  <span className="text-amber-400 font-semibold">Dhaka Taxes Bar</span>
                </div>
              </div>

            </div>
          )}
        </nav>
      </header>

      {/* Global Interactive Command & Search Palette Modal (Ctrl + K) */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="w-full max-w-2xl bg-[#0b1b30] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden text-white animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="relative border-b border-slate-700/80 p-4 flex items-center gap-3">
              <Search className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Type to search services, Income Tax Act 2023, VAT, Team, or Tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
              />
              <button
                onClick={() => setSearchModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Results List */}
            <div className="p-3 max-h-96 overflow-y-auto space-y-1">
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                <span>Directory Matches</span>
                <span>{filteredSearchResults.length} found</span>
              </div>

              {filteredSearchResults.length > 0 ? (
                filteredSearchResults.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectSearchResult(item.path)}
                    className="w-full text-left p-3 rounded-xl hover:bg-slate-800/80 transition flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-amber-300 transition">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Category: <span className="text-sky-300">{item.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 group-hover:text-white">
                      <span>Jump</span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-6 text-center text-slate-400 text-xs">
                  No matching services or resources found for "{searchQuery}".
                </div>
              )}
            </div>

            {/* Modal Footer Key Hints */}
            <div className="p-3 bg-slate-900/60 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">ESC</kbd> to close</span>
              <span className="flex items-center gap-1 text-amber-400 font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Direct Chartered Assistance</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

