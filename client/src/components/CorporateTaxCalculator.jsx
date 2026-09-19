import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  ArrowRight, 
  HelpCircle, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  Info,
  TrendingDown
} from 'lucide-react';
import TiltCard from './TiltCard';

// Bangladesh Corporate Tax Rates under Finance Act & Income Tax Act 2023
const ENTITY_RATES = [
  {
    id: 'private_regular',
    name: 'Private Limited Company (Regular / Standard)',
    rate: 27.5,
    cashlessRate: 25.0,
    note: '25% applicable if all receipts/income and payments/expenses exceeding threshold are made through banking/cashless channels; otherwise 27.5%.',
    sector: 'General Corporate'
  },
  {
    id: 'public_listed',
    name: 'Publicly Listed Company',
    rate: 20.0,
    cashlessRate: 20.0,
    note: 'Listed with DSE/CSE, compliant with securities regulations.',
    sector: 'Capital Markets'
  },
  {
    id: 'opc',
    name: 'One Person Company (OPC)',
    rate: 22.5,
    cashlessRate: 20.0,
    note: '20% if cashless transactions criterion is satisfied; standard rate 22.5%.',
    sector: 'SME / Proprietorship'
  },
  {
    id: 'textile_export',
    name: 'RMG & Textile Manufacturing / Export',
    rate: 12.0,
    cashlessRate: 10.0,
    note: '10% for green certified factories; 12% standard export rate under statutory SRO.',
    sector: 'Manufacturing & Export'
  },
  {
    id: 'bank_insurance',
    name: 'Commercial Bank, NBFI & Insurance',
    rate: 40.0,
    cashlessRate: 37.5,
    note: '37.5% for publicly listed banks; 40% for non-listed financial entities.',
    sector: 'Financial Sector'
  }
];

export default function CorporateTaxCalculator() {
  const [selectedEntity, setSelectedEntity] = useState(ENTITY_RATES[0].id);
  const [profitAmount, setProfitAmount] = useState(10000000); // 1 Crore BDT default
  const [isCashlessCompliant, setIsCashlessCompliant] = useState(true);

  const currentEntity = ENTITY_RATES.find(e => e.id === selectedEntity) || ENTITY_RATES[0];
  const appliedRate = isCashlessCompliant ? currentEntity.cashlessRate : currentEntity.rate;

  // Calculations
  const estimatedTaxLiability = Math.round((profitAmount * appliedRate) / 100);
  const savings = Math.round(profitAmount * ((currentEntity.rate - currentEntity.cashlessRate) / 100));

  const formatBDT = (num) => {
    return 'BDT ' + Number(num).toLocaleString('en-IN');
  };

  return (
    <div className="bg-gradient-to-br from-[#061424] via-[#0a1e36] to-[#040e1a] rounded-3xl p-6 sm:p-10 border border-slate-700/80 shadow-2xl text-white relative overflow-hidden">
      
      {/* Background Lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-700/70">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-black uppercase tracking-wider mb-2">
              <Calculator className="w-3.5 h-3.5" />
              <span>Interactive Decision Tool</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Bangladesh Corporate Tax Liability Estimator
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Indicative statutory assessment engine based on Bangladesh Finance Act & Income Tax Act 2023.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto px-3.5 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Income Tax Act 2023 Aligned</span>
          </div>
        </div>

        {/* Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Entity Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                1. Select Corporate Entity Structure
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {ENTITY_RATES.map((entity) => {
                  const isSelected = selectedEntity === entity.id;
                  return (
                    <button
                      key={entity.id}
                      type="button"
                      onClick={() => setSelectedEntity(entity.id)}
                      className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-amber-500/20 border-amber-400 text-white shadow-md'
                          : 'bg-slate-900/60 border-slate-700/70 text-slate-300 hover:bg-slate-800/60 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-bold leading-snug">{entity.name}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 font-bold flex-shrink-0">
                          {entity.rate}%
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400">{entity.sector}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Taxable Net Profit Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  2. Estimated Annual Taxable Net Profit
                </label>
                <span className="text-xs font-mono font-bold text-amber-300">
                  {formatBDT(profitAmount)}
                </span>
              </div>

              <input
                type="range"
                min="500000"
                max="100000000"
                step="500000"
                value={profitAmount}
                onChange={(e) => setProfitAmount(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />

              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                <span>BDT 5 Lac</span>
                <span>BDT 2.5 Crore</span>
                <span>BDT 5 Crore</span>
                <span>BDT 10 Crore</span>
              </div>
            </div>

            {/* Cashless Compliance Toggle */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/80 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">Cashless / Banking Channel Compliance</span>
                  <span className="text-[10px] px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                    Statutory Rebate
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Under NBR statutory requirements, companies transacting through official banking and digital channels qualify for reduced corporate tax rates.
                </p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 mt-1">
                <input
                  type="checkbox"
                  checked={isCashlessCompliant}
                  onChange={(e) => setIsCashlessCompliant(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
              </label>
            </div>

          </div>

          {/* Result Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0e2746] to-[#07172b] border border-blue-500/30 shadow-xl space-y-6">
            
            <div>
              <div className="flex items-center justify-between text-xs text-blue-200 border-b border-blue-800/60 pb-3 mb-4">
                <span>Statutory Computation</span>
                <span className="font-mono text-amber-300 font-bold">{appliedRate}% Effective Rate</span>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                  Indicative Corporate Tax Liability
                </span>
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight font-mono text-amber-400">
                  {formatBDT(estimatedTaxLiability)}
                </div>
                <span className="text-[10px] text-slate-400 block mt-1">
                  Subject to statutory minimum turnover tax, allowable deductions, and depreciation schedules.
                </span>
              </div>

              {/* Savings callout if cashless */}
              {isCashlessCompliant && savings > 0 && (
                <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2.5 text-xs text-emerald-300">
                  <TrendingDown className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>
                    Estimated banking compliance savings: <strong>{formatBDT(savings)}</strong>
                  </span>
                </div>
              )}
            </div>

            {/* Note & CTA */}
            <div className="space-y-3 pt-4 border-t border-blue-800/60">
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {currentEntity.note}
              </p>

              <Link
                to={`/contact?service=Corporate%20Tax&estimatedProfit=${profitAmount}`}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#071526] font-extrabold text-xs tracking-wider uppercase transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 text-center"
              >
                <span>Request Formal Tax Advisory Assessment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
