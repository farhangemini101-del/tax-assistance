import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Download, 
  FileText, 
  Calendar, 
  Tag, 
  Eye, 
  ExternalLink,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import TiltCard from './TiltCard';
import ResourcePreviewModal from './ResourcePreviewModal';

export default function LibrarySection({ resources = [], onConsultResource }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedFormat, setSelectedFormat] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [previewItem, setPreviewItem] = useState(null);

  const categories = [
    'All',
    'Tax Updates',
    'VAT Updates',
    'Regulatory Updates',
    'Templates & Resources',
    'Articles & Insights',
    'Guides & Checklists'
  ];

  const years = ['All', '2026', '2025'];
  const formats = ['All', 'PDF Document', 'DOCX Template', 'Whitepaper', 'Checklist / Guide'];

  const filteredResources = resources.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesYear = selectedYear === 'All' || item.year === selectedYear;
    const matchesFormat = selectedFormat === 'All' || item.format.toLowerCase().includes(selectedFormat.toLowerCase());
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesYear && matchesFormat && matchesSearch;
  });

  const handleDownload = (res) => {
    alert(`Downloading "${res.title}" (${res.format} - ${res.size}) from Tax Assistance resource repository.`);
  };

  return (
    <section id="library" className="py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5 text-blue-700" />
            <span>Knowledge Hub & Intelligence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f2942] tracking-tight">
            Professional Library & Insights
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            Curated statutory circulars, tax amendments, VAT guides, SOP blueprints, and financial advisory resources 
            engineered to keep your enterprise fully compliant and ahead of regulatory shifts.
          </p>
        </div>

        {/* Filter, Format & Search Bar */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-10 space-y-5">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search updates, circulars, SROs, guides by keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 text-xs sm:text-sm border border-slate-200 rounded-2xl focus:outline-none focus:border-blue-500 bg-slate-50 shadow-inner"
              />
            </div>

            {/* Year Selector */}
            <div className="flex items-center gap-2 self-start lg:self-auto">
              <span className="text-xs font-bold text-slate-500">Year:</span>
              <div className="flex gap-1">
                {years.map(y => (
                  <button
                    key={y}
                    onClick={() => setSelectedYear(y)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                      selectedYear === y 
                        ? 'bg-[#0f2942] text-white shadow' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid with 3D TiltCards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredResources.length === 0 ? (
            <div className="col-span-3 py-16 text-center text-slate-400 text-xs bg-white rounded-3xl border border-slate-200">
              No publications matched your search query. Try choosing "All" or resetting filters.
            </div>
          ) : (
            filteredResources.map((res) => (
              <TiltCard
                key={res.id}
                maxTilt={8}
                className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:border-blue-400 hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-100">
                      {res.category}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {res.year}
                    </span>
                  </div>

                  <h3 
                    onClick={() => setPreviewItem(res)}
                    className="text-sm font-extrabold text-slate-900 group-hover:text-blue-900 transition leading-snug cursor-pointer"
                  >
                    {res.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed line-clamp-3">
                    {res.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-slate-500" />
                    <span>{res.format}</span>
                    <span>•</span>
                    <span>{res.size}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setPreviewItem(res)}
                      className="p-2 rounded-xl text-slate-600 hover:text-blue-900 hover:bg-blue-50 transition"
                      title="Quick Preview"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDownload(res)}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </TiltCard>
            ))
          )}
        </div>

        {/* Quick Circular Request Callout */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 flex-shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Need a specific SRO, Tax Order, or Regulatory Clarification?
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Our research team maintains an exhaustive archive of National Board of Revenue (NBR), Bangladesh Bank, and RJSC gazettes.
              </p>
            </div>
          </div>

          <button
            onClick={() => onConsultResource && onConsultResource('Custom SRO / Circular Request from Library')}
            className="flex-shrink-0 px-6 py-3 bg-[#0f2942] hover:bg-blue-900 text-white text-xs font-bold rounded-xl shadow transition"
          >
            Request Specific Circular
          </button>
        </div>

      </div>

      {/* Interactive Document Preview Modal */}
      {previewItem && (
        <ResourcePreviewModal
          resource={previewItem}
          onClose={() => setPreviewItem(null)}
          onConsult={(note) => {
            setPreviewItem(null);
            if (onConsultResource) onConsultResource(note);
          }}
        />
      )}
    </section>
  );
}
