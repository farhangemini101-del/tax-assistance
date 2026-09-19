import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building, 
  Users, 
  Filter, 
  Search, 
  ExternalLink,
  ShieldCheck,
  Building2,
  Briefcase,
  Landmark,
  Globe2,
  ShoppingBag,
  Factory,
  Microscope,
  Cpu,
  Pill,
  Zap,
  Hotel,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  Grid3X3,
  SlidersHorizontal,
  ChevronRight,
  Eye
} from 'lucide-react';
import TiltCard from './TiltCard';
import ClientDetailModal from './ClientDetailModal';

// Sector Classification & Metadata
const SECTOR_CONFIG = [
  {
    id: 'banking',
    categoryMatch: ['Banking, Finance, Insurance & Securities'],
    title: 'Banking, Capital Markets & Financial Institutions',
    shortTitle: 'Banking & Finance',
    icon: Landmark,
    accent: 'from-emerald-600 to-teal-700',
    borderAccent: 'border-emerald-200 hover:border-emerald-400',
    badgeBg: 'bg-emerald-50 text-emerald-900 border-emerald-200',
    color: 'emerald',
    description: 'Statutory corporate tax returns, AIT reconciliations, Mushak 9.1 VAT withholding audits, and Taxes Appellate Tribunal representation for commercial banks and NBFI financial institutions.'
  },
  {
    id: 'development',
    categoryMatch: ['Development & Social Organizations', 'NGO / Not-for-Profit'],
    title: 'International Development & Not-for-Profit Organizations',
    shortTitle: 'Development & NGOs',
    icon: Globe2,
    accent: 'from-sky-600 to-blue-700',
    borderAccent: 'border-sky-200 hover:border-sky-400',
    badgeBg: 'bg-sky-50 text-sky-900 border-sky-200',
    color: 'sky',
    description: 'NGO Affairs Bureau (NGOAB) FD-4 audit working papers, foreign grant tax exemption certifications, expatriate specialist tax filings, and donor compliance assurance.'
  },
  {
    id: 'consumer',
    categoryMatch: ['Consumer Products'],
    title: 'Fast-Moving Consumer Goods (FMCG) & Retail Enterprises',
    shortTitle: 'Consumer Brands',
    icon: ShoppingBag,
    accent: 'from-amber-600 to-orange-700',
    borderAccent: 'border-amber-200 hover:border-amber-400',
    badgeBg: 'bg-amber-50 text-amber-900 border-amber-200',
    color: 'amber',
    description: 'Monthly Mushak 9.1 VAT accounting, Input-Output Coefficient (Mushak 4.3) formulations, distributor TDS/VDS compliance, and multi-tier corporate tax returns.'
  },
  {
    id: 'textiles',
    categoryMatch: ['Textile & Garments'],
    title: 'Textile, Apparel & Industrial Manufacturing',
    shortTitle: 'Textile & Garments',
    icon: Factory,
    accent: 'from-indigo-600 to-purple-700',
    borderAccent: 'border-indigo-200 hover:border-indigo-400',
    badgeBg: 'bg-indigo-50 text-indigo-900 border-indigo-200',
    color: 'indigo',
    description: 'Export cash incentive audit documentation, bonded warehouse duty exemptions, specialized export tax assessments, and physical inventory audits.'
  },
  {
    id: 'services',
    categoryMatch: ['Services'],
    title: 'Bio-Sciences, Clinical Research & Professional Services',
    shortTitle: 'Bio-Science & Services',
    icon: Microscope,
    accent: 'from-purple-600 to-fuchsia-700',
    borderAccent: 'border-purple-200 hover:border-purple-400',
    badgeBg: 'bg-purple-50 text-purple-900 border-purple-200',
    color: 'purple',
    description: 'FDI inward remittances, BIDA reporting, QuickBooks cloud integration, IFRS financial statements, and cross-border service royalty tax advisory.'
  },
  {
    id: 'tech',
    categoryMatch: ['IT & Telecommunications'],
    title: 'Technology Platforms & Digital Communications',
    shortTitle: 'Technology & Telecom',
    icon: Cpu,
    accent: 'from-cyan-600 to-blue-700',
    borderAccent: 'border-cyan-200 hover:border-cyan-400',
    badgeBg: 'bg-cyan-50 text-cyan-900 border-cyan-200',
    color: 'cyan',
    description: 'IT Enabled Services (ITES) tax exemption certification, software developer payroll tax structuring, digital platform VAT compliance, and VC venture reporting.'
  },
  {
    id: 'energy',
    categoryMatch: ['Energy, Power & Infrastructure'],
    title: 'Energy, Power & Infrastructure Engineering',
    shortTitle: 'Energy & Infrastructure',
    icon: Zap,
    accent: 'from-yellow-600 to-amber-700',
    borderAccent: 'border-yellow-200 hover:border-yellow-400',
    badgeBg: 'bg-yellow-50 text-yellow-900 border-yellow-200',
    color: 'yellow',
    description: 'Independent Power Producer (IPP) tax holiday compliance, heavy machinery import duty clearance, consortium joint venture tax planning, and Large Taxpayers Unit (LTU) representation.'
  },
  {
    id: 'pharma',
    categoryMatch: ['Pharmaceuticals'],
    title: 'Pharmaceuticals & Life Sciences',
    shortTitle: 'Pharmaceuticals',
    icon: Pill,
    accent: 'from-rose-600 to-red-700',
    borderAccent: 'border-rose-200 hover:border-rose-400',
    badgeBg: 'bg-rose-50 text-rose-900 border-rose-200',
    color: 'rose',
    description: 'Pharma API raw material advance tax compliance, DGDA statutory pricing schedules, corporate income tax returns, and comprehensive TDS withholding audits.'
  },
  {
    id: 'hospitality',
    categoryMatch: ['Hospitality'],
    title: 'Hospitality, Luxury Hotels & Resorts',
    shortTitle: 'Hospitality',
    icon: Hotel,
    accent: 'from-blue-600 to-indigo-700',
    borderAccent: 'border-blue-200 hover:border-blue-400',
    badgeBg: 'bg-blue-50 text-blue-900 border-blue-200',
    color: 'blue',
    description: 'Banquet & luxury accommodation VAT accounting, service charge distribution payroll tax compliance, fixed asset registers, and foreign franchise brand royalty withholding tax.'
  }
];

export default function ClientsSection({ clients = [] }) {
  const [activeViewMode, setActiveViewMode] = useState('grouped'); // 'grouped' | 'matrix' | 'featured'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [inspectingClient, setInspectingClient] = useState(null);

  // Sector Filters List with dynamic counts
  const categoryOptions = useMemo(() => {
    const list = [
      { name: 'All', count: clients.length },
      { name: 'Banking & Finance', filterKey: 'Banking, Finance, Insurance & Securities' },
      { name: 'Development & NGOs', filterKey: ['NGO / Not-for-Profit', 'Development & Social Organizations'] },
      { name: 'Consumer Brands', filterKey: 'Consumer Products' },
      { name: 'Bio-Science & Services', filterKey: 'Services' },
      { name: 'Textile & Garments', filterKey: 'Textile & Garments' },
      { name: 'Technology', filterKey: 'IT & Telecommunications' },
      { name: 'Energy & Power', filterKey: 'Energy, Power & Infrastructure' },
      { name: 'Pharmaceuticals', filterKey: 'Pharmaceuticals' },
      { name: 'Hospitality', filterKey: 'Hospitality' }
    ];

    return list.map(item => {
      if (item.name === 'All') return item;
      const count = clients.filter(c => {
        if (Array.isArray(item.filterKey)) {
          return item.filterKey.includes(c.category);
        }
        return c.category === item.filterKey;
      }).length;
      return { ...item, count };
    });
  }, [clients]);

  // Filtered Clients for Matrix View
  const filteredClients = useMemo(() => {
    return clients.filter((c) => {
      let matchesCategory = true;
      if (selectedCategory !== 'All') {
        const option = categoryOptions.find(o => o.name === selectedCategory);
        if (option?.filterKey) {
          if (Array.isArray(option.filterKey)) {
            matchesCategory = option.filterKey.includes(c.category);
          } else {
            matchesCategory = c.category === option.filterKey;
          }
        }
      }

      const q = search.toLowerCase().trim();
      const matchesSearch = !q || 
        c.name.toLowerCase().includes(q) || 
        c.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [clients, selectedCategory, search, categoryOptions]);

  // Featured Clients with real brand logos
  const featuredClients = useMemo(() => {
    return clients.filter(c => c.logo && c.priority !== 'text-only');
  }, [clients]);

  // Grouped Clients by Sector
  const groupedSectors = useMemo(() => {
    const q = search.toLowerCase().trim();
    return SECTOR_CONFIG.map(sector => {
      const sectorClients = clients.filter(c => {
        const matchesCategory = sector.categoryMatch.includes(c.category);
        const matchesSearch = !q || 
          c.name.toLowerCase().includes(q) || 
          c.category.toLowerCase().includes(q);
        return matchesCategory && matchesSearch;
      });

      return {
        ...sector,
        clients: sectorClients
      };
    }).filter(s => s.clients.length > 0);
  }, [clients, search]);

  return (
    <section id="clients" className="py-24 bg-slate-50 border-b border-slate-200 selection:bg-amber-500 selection:text-white">
      
      {/* Client Detail Inspector Modal */}
      {inspectingClient && (
        <ClientDetailModal 
          client={inspectingClient} 
          onClose={() => setInspectingClient(null)} 
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* ========================================================================= */}
        {/* SECTION HEADER & EXECUTIVE METRICS BAR */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100/80 text-blue-900 text-xs font-bold uppercase tracking-wider border border-blue-200">
            <Building className="w-3.5 h-3.5 text-blue-700" />
            <span>Institutional Client Portfolio</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f2942] tracking-tight">
            Trusted by Market Leaders Across Bangladesh
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            From premier commercial banks and multinational corporations to international NGOs, pharmaceutical giants, and over 250+ private family offices, our partners rely on Tax Assistance (TA) for precision audit, taxation, and regulatory compliance.
          </p>
        </div>

        {/* 4-Stat Metric Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <TiltCard maxTilt={8} className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold mb-3 border border-emerald-100">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="text-3xl font-black text-slate-900 tracking-tight">40+</div>
            <div className="text-xs font-bold text-slate-900 mt-1">Corporate Institutional Clients</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Commercial Banks, Multinationals & Public Ltd.</div>
          </TiltCard>

          <TiltCard maxTilt={8} className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition">
            <div className="w-11 h-11 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center font-bold mb-3 border border-sky-100">
              <Layers className="w-5 h-5" />
            </div>
            <div className="text-3xl font-black text-slate-900 tracking-tight">10</div>
            <div className="text-xs font-bold text-slate-900 mt-1">Strategic Industry Sectors</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Banking, FMCG, INGOs, Pharma, Power, Textiles</div>
          </TiltCard>

          <TiltCard maxTilt={8} className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition">
            <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold mb-3 border border-amber-100">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-3xl font-black text-slate-900 tracking-tight">250+</div>
            <div className="text-xs font-bold text-slate-900 mt-1">High Net-Worth Individuals</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Managing Directors, Expatriates & Family Offices</div>
          </TiltCard>

          <TiltCard maxTilt={8} className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold mb-3 border border-blue-100">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-3xl font-black text-slate-900 tracking-tight">100%</div>
            <div className="text-xs font-bold text-slate-900 mt-1">Statutory Adherence Track</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Zero Default Record across NBR & Taxes Zones</div>
          </TiltCard>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE CONTROLS: VIEW MODES, SEARCH & CATEGORY PILLS */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          
          {/* Top Control Row: Search + View Switcher */}
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center pb-6 border-b border-slate-100">
            
            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by client name, industry, or service..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs font-medium border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600 bg-slate-50/70 transition"
              />
              {search && (
                <button 
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700"
                >
                  Clear
                </button>
              )}
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200 self-start sm:self-auto">
              <button
                onClick={() => setActiveViewMode('grouped')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  activeViewMode === 'grouped'
                    ? 'bg-[#0f2942] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Categorized by Industry Vertical"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Grouped by Sector</span>
              </button>

              <button
                onClick={() => setActiveViewMode('matrix')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  activeViewMode === 'matrix'
                    ? 'bg-[#0f2942] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Unified Filterable Client Grid"
              >
                <Grid3X3 className="w-3.5 h-3.5" />
                <span>Unified Matrix ({clients.length})</span>
              </button>

              <button
                onClick={() => setActiveViewMode('featured')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  activeViewMode === 'featured'
                    ? 'bg-[#0f2942] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Featured Brand Partners with Logos"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Featured Brands ({featuredClients.length})</span>
              </button>
            </div>

          </div>

          {/* Sector Filter Chips (Active for Matrix Mode or Quick Jumping) */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-bold text-slate-500 mr-2 flex items-center gap-1">
              <Filter className="w-3 h-3 text-slate-400" />
              <span>Sector:</span>
            </span>

            {categoryOptions.map((opt) => (
              <button
                key={opt.name}
                onClick={() => {
                  setSelectedCategory(opt.name);
                  if (activeViewMode === 'featured') setActiveViewMode('matrix');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
                  selectedCategory === opt.name
                    ? 'bg-[#0f2942] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                }`}
              >
                <span>{opt.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedCategory === opt.name
                    ? 'bg-white/20 text-white font-black'
                    : 'bg-slate-200 text-slate-700'
                }`}>
                  {opt.count}
                </span>
              </button>
            ))}
          </div>

        </div>

        {/* ========================================================================= */}
        {/* VIEW 1: GROUPED BY INDUSTRY VERTICAL (HIGHLY ORGANIZED & EXECUTIVE) */}
        {/* ========================================================================= */}
        {activeViewMode === 'grouped' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            {groupedSectors.map((sector) => {
              const Icon = sector.icon;
              return (
                <div 
                  key={sector.id} 
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6"
                >
                  {/* Sector Header Banner */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${sector.accent} text-white flex items-center justify-center flex-shrink-0 shadow-md`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                            {sector.title}
                          </h3>
                          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-black border ${sector.badgeBg}`}>
                            {sector.clients.length} Mandates
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed max-w-4xl">
                          {sector.description}
                        </p>
                      </div>
                    </div>

                    <Link
                      to={`/contact?sector=${encodeURIComponent(sector.title)}`}
                      className="self-start md:self-center px-4 py-2 rounded-xl bg-slate-100 hover:bg-[#0f2942] text-slate-700 hover:text-white text-xs font-bold transition flex items-center gap-1.5 flex-shrink-0"
                    >
                      <span>Inquire for {sector.shortTitle}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {/* Sector Client Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {sector.clients.map((client) => (
                      <div
                        key={client.id}
                        onClick={() => setInspectingClient(client)}
                        className="group p-4 rounded-2xl bg-slate-50/70 hover:bg-white border border-slate-200/80 hover:border-blue-300 transition-all shadow-2xs hover:shadow-md cursor-pointer flex flex-col justify-between"
                      >
                        <div className="flex items-start gap-3.5 mb-3">
                          {client.logo ? (
                            <div className="w-12 h-12 rounded-xl bg-white border border-slate-200/70 p-1.5 flex items-center justify-center flex-shrink-0 shadow-2xs group-hover:scale-105 transition">
                              <img 
                                src={client.logo} 
                                alt={client.name} 
                                className="max-h-full max-w-full object-contain"
                              />
                            </div>
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-slate-800 text-amber-300 border border-slate-700 font-black text-sm flex items-center justify-center flex-shrink-0 shadow-2xs group-hover:scale-105 transition">
                              {client.name.substring(0, 2).toUpperCase()}
                            </div>
                          )}

                          <div className="min-w-0 flex-grow">
                            <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-blue-900 transition leading-snug line-clamp-2">
                              {client.name}
                            </h4>
                            <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                              {sector.shortTitle}
                            </span>
                          </div>
                        </div>

                        {/* Bottom Row */}
                        <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px]">
                          <span className={`font-bold ${
                            client.priority === '1st' 
                              ? 'text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200' 
                              : 'text-slate-500'
                          }`}>
                            {client.priority === '1st' ? 'Tier 1 Partner' : 'Corporate Mandate'}
                          </span>

                          <span className="text-blue-600 font-bold opacity-0 group-hover:opacity-100 transition flex items-center gap-1">
                            <span>Details</span>
                            <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: UNIFIED CLIENT MATRIX (SEARCH & FILTER GRID) */}
        {/* ========================================================================= */}
        {activeViewMode === 'matrix' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between text-xs text-slate-500 px-1">
              <span>Showing <strong>{filteredClients.length}</strong> matching clients</span>
              <span>Category: <strong>{selectedCategory}</strong></span>
            </div>

            {filteredClients.length === 0 ? (
              <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 text-slate-500">
                <Search className="w-8 h-8 mx-auto text-slate-300 mb-3" />
                <h4 className="text-sm font-bold text-slate-800">No matching clients found</h4>
                <p className="text-xs text-slate-500 mt-1">Try clearing your search query or selecting "All" categories.</p>
                <button
                  onClick={() => { setSearch(''); setSelectedCategory('All'); }}
                  className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredClients.map((client) => (
                  <div
                    key={client.id}
                    onClick={() => setInspectingClient(client)}
                    className="group p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md hover:border-blue-400 transition cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        {client.logo ? (
                          <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200/80 p-1.5 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition">
                            <img 
                              src={client.logo} 
                              alt={client.name} 
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-[#0f2942] text-amber-300 font-black text-sm flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition">
                            {client.name.substring(0, 2).toUpperCase()}
                          </div>
                        )}

                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          client.priority === '1st'
                            ? 'bg-amber-100 text-amber-900 border border-amber-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {client.priority === '1st' ? 'Tier 1' : 'Corporate'}
                        </span>
                      </div>

                      <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-blue-900 transition leading-snug line-clamp-2">
                        {client.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-1 font-medium">
                        {client.category}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 group-hover:text-blue-600 transition font-bold">
                      <span>Inspect Mandate</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: FEATURED BRAND PARTNERS GALLERY (LUXURY 3D LOGO CARDS) */}
        {/* ========================================================================= */}
        {activeViewMode === 'featured' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                Tier-1 & Tier-2 Strategic Brand Partners
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                Prominent Institutional Partnerships
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Displaying organizations with verified institutional brand consent.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {featuredClients.map((client) => (
                <TiltCard
                  key={client.id}
                  maxTilt={10}
                  onClick={() => setInspectingClient(client)}
                  className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-xl hover:border-blue-400 transition flex flex-col items-center justify-between text-center h-44 cursor-pointer group"
                >
                  <div className="w-full h-20 flex items-center justify-center p-1 overflow-hidden">
                    <img 
                      src={client.logo} 
                      alt={client.name} 
                      className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-110"
                    />
                  </div>

                  <div className="w-full">
                    <h5 className="text-[11px] font-bold text-slate-800 group-hover:text-blue-900 transition line-clamp-1">
                      {client.name}
                    </h5>
                    <span className="text-[9px] text-slate-400 block truncate mt-0.5">
                      {client.category.split(',')[0]}
                    </span>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* EXECUTIVE SPOTLIGHT: 250+ HIGH NET-WORTH INDIVIDUALS */}
        {/* ========================================================================= */}
        <div className="rounded-3xl bg-gradient-to-br from-[#061424] via-[#091f38] to-[#040e1a] text-white p-8 sm:p-12 border border-slate-700/80 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-black uppercase tracking-wider">
                <Users className="w-3.5 h-3.5" />
                <span>Executive & HNI Private Advisory</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                250+ High Net-Worth Individuals & Corporate Leaders
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
                In addition to corporate mandates, TA manages the confidential personal tax portfolios of Managing Directors, Board Chairs, Senior Expatriates, Consulting Specialists, Senior Advocates, and Family Office Principals.
              </p>

              {/* Service Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {[
                  'Annual Wealth Statement (IT-10B) Computation',
                  'Foreign Asset & Global Income Disclosure Planning',
                  'Income Tax Clearance Certificates for Banking / Travel',
                  'DCT Assessment Defense & Tax Refund Claims'
                ].map((text, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center w-full max-w-sm space-y-4">
                <div className="text-amber-400 font-black text-2xl">Confidential Advisory</div>
                <p className="text-[11px] text-slate-300">
                  Direct representation by Certified Chartered Professionals and Authorized Income Tax Practitioners (ITP).
                </p>
                <Link
                  to="/contact?service=Personal%20Tax"
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#071526] font-black text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                >
                  <span>Consult Executive Tax Desk</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* CONFIDENTIALITY & STATUTORY PLEDGE */}
        {/* ========================================================================= */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 text-center max-w-3xl mx-auto shadow-2xs space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Professional Confidentiality & ICAB Ethical Standards</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Client names and corporate identities are referenced in adherence to professional confidentiality guidelines, client consent agreements, and Dhaka Taxes Bar Association regulations. Detailed financial balances and internal tax audits are protected under strict professional privilege.
          </p>
        </div>

      </div>
    </section>
  );
}
