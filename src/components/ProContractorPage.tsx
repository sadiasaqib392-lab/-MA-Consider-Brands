import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  HardHat,
  Building,
  CheckCircle,
  FileText,
  Send,
  Calculator,
  ShieldCheck,
  Truck,
  Percent,
  Phone,
  Mail,
  Download,
  Check
} from 'lucide-react';

export const ProContractorPage: React.FC = () => {
  const { navigateTo, showToast } = useStore();

  const [toolQuantity, setToolQuantity] = useState<number>(10);
  const [avgPrice, setAvgPrice] = useState<number>(199);

  const [rfqForm, setRfqForm] = useState({
    contractorName: '',
    companyName: '',
    taxId: '',
    email: '',
    phone: '',
    tradeType: 'General Contracting',
    toolList: '',
    timeline: 'Within 2 Weeks'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Volume discount tier logic
  const discountPercent = toolQuantity >= 25 ? 22 : toolQuantity >= 10 ? 15 : toolQuantity >= 5 ? 10 : 0;
  const grossSubtotal = toolQuantity * avgPrice;
  const discountAmount = (grossSubtotal * discountPercent) / 100;
  const netEstimatedTotal = grossSubtotal - discountAmount;

  const handleRfqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rfqForm.contractorName || !rfqForm.companyName || !rfqForm.email || !rfqForm.phone) {
      showToast('Missing Fields', 'Please complete all required company and contact fields.', 'warning');
      return;
    }
    setIsSubmitted(true);
    showToast('Quote Request Submitted', `Thank you ${rfqForm.contractorName}. An official commercial quote will be sent to ${rfqForm.email} within 24 hours.`);
  };

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen pb-20">
      {/* 1. Breadcrumbs */}
      <div className="bg-zinc-900/60 border-b border-zinc-800/80 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateTo('home')}
              className="hover:text-amber-400 transition-colors font-medium cursor-pointer"
            >
              Home
            </button>
            <span className="text-zinc-600">/</span>
            <span className="text-amber-400 font-semibold">Pro Contractor & Commercial Portal</span>
          </div>
          <span className="text-amber-400 font-bold flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5" /> Direct Wholesale & Tax-Exempt B2B
          </span>
        </div>
      </div>

      {/* 2. Page Header Banner */}
      <div className="bg-gradient-to-b from-zinc-900 via-zinc-900/80 to-zinc-950 border-b border-zinc-800/80 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/10 text-amber-400 border border-amber-400/20 mb-3">
              <HardHat className="w-3.5 h-3.5" />
              <span>COMMERCIAL FLEET & TRADE DISCOUNTS</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Pro Contractor Fleet & Bulk Solutions
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
              Equip your jobsite crew with heavy-duty MA CONSIDER power tools. Unlock tiered volume discounts up to 22%, dedicated account managers, tax-exempt billing, and priority dispatch across the United States.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <a
              href="tel:+923155959375"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-amber-400/10 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Call Commercial Desk</span>
            </a>
            <button
              onClick={() => {
                const el = document.getElementById('rfq-form-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs py-3.5 px-6 rounded-xl border border-zinc-800 hover:border-amber-400/30 transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Request Custom RFQ</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Tiered Discounts & Interactive Estimator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive Calculator */}
          <div className="lg:col-span-6 bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Live Volume Discount Estimator</h3>
                <p className="text-xs text-zinc-400">Calculate immediate fleet savings on tool packages</p>
              </div>
            </div>

            <div className="space-y-5 text-xs">
              <div>
                <div className="flex justify-between font-bold text-zinc-300 mb-2">
                  <span>Tool Units Required:</span>
                  <span className="text-amber-400 text-sm font-black">{toolQuantity} Units</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={50}
                  value={toolQuantity}
                  onChange={e => setToolQuantity(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-950 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
                  <span>1 Unit (Standard)</span>
                  <span>10 Units (15% Off)</span>
                  <span>25+ Units (22% Off)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-zinc-300 mb-2">
                  <span>Average Tool Price:</span>
                  <span className="text-amber-400 text-sm font-black">${avgPrice} USD</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[129, 199, 299].map(p => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setAvgPrice(p)}
                      className={`py-2 rounded-lg font-bold transition-all cursor-pointer ${
                        avgPrice === p
                          ? 'bg-amber-400 text-zinc-950 font-black'
                          : 'bg-zinc-950 text-zinc-400 border border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      ${p} Average
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Savings Calculation Output Card */}
              <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3 pt-4">
                <div className="flex justify-between text-zinc-400">
                  <span>Retail Value ({toolQuantity} items):</span>
                  <span className="font-mono text-zinc-300">${grossSubtotal.toLocaleString()}.00</span>
                </div>
                <div className="flex justify-between text-amber-400 font-bold">
                  <span>Contractor Tier Discount ({discountPercent}%):</span>
                  <span className="font-mono">-${discountAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="border-t border-zinc-800 pt-3 flex justify-between items-baseline">
                  <span className="text-white font-extrabold text-sm">Estimated Fleet Total:</span>
                  <div className="text-right">
                    <span className="text-2xl font-black text-amber-400">
                      ${netEstimatedTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className="text-[10px] text-zinc-500 block">Free Freight Ground Shipping Included</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Wholesale Perks */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0">
                <Percent className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Tiered Jobsite Bulk Discounts</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Automatic progressive discounts on mixed orders of drills, drivers, saws, grinders, batteries, and accessories for contractors and tradespeople.
                </p>
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Priority Pallet & Jobsite Freight</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Direct delivery to your jobsite trailer, shop, or commercial address with scheduled delivery windows and liftgate service.
                </p>
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Tax-Exempt Resale Processing</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Submit your state resale certificate or contractor tax-exemption number for zero-sales-tax invoicing on all commercial purchases.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. RFQ Submission Form */}
        <div id="rfq-form-section" className="mt-16 bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-10">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded text-xs font-bold bg-amber-400/10 text-amber-400 border border-amber-400/20 mb-2">
              <FileText className="w-3.5 h-3.5" />
              <span>OFFICIAL COMMERCIAL QUOTATION</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Submit Request for Quotation (RFQ)
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1">
              Provide your required tool models, quantities, and project timeline. Our contractor sales team will prepare an itemized PDF quote with competitive volume discounts.
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-10 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-center max-w-xl mx-auto">
              <CheckCircle className="w-14 h-14 text-emerald-400 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">RFQ Successfully Received!</h4>
              <p className="text-xs text-zinc-300 mb-6">
                Our commercial desk is reviewing your equipment list for <strong className="text-amber-400">{rfqForm.companyName}</strong>. You will receive an itemized quote within 24 hours.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setRfqForm({
                    contractorName: '',
                    companyName: '',
                    taxId: '',
                    email: '',
                    phone: '',
                    tradeType: 'General Contracting',
                    toolList: '',
                    timeline: 'Within 2 Weeks'
                  });
                }}
                className="text-xs font-bold text-amber-400 hover:underline cursor-pointer"
              >
                Submit Another Quote Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleRfqSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-zinc-400 font-bold uppercase tracking-wider text-[10px] mb-1.5">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mike Henderson"
                    value={rfqForm.contractorName}
                    onChange={e => setRfqForm({ ...rfqForm, contractorName: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 font-bold uppercase tracking-wider text-[10px] mb-1.5">
                    Company / Trade Business *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Henderson Builders LLC"
                    value={rfqForm.companyName}
                    onChange={e => setRfqForm({ ...rfqForm, companyName: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 font-bold uppercase tracking-wider text-[10px] mb-1.5">
                    Tax ID / Resale Certificate (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 12-3456789"
                    value={rfqForm.taxId}
                    onChange={e => setRfqForm({ ...rfqForm, taxId: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-zinc-400 font-bold uppercase tracking-wider text-[10px] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="m.henderson@hendersonbuilders.com"
                    value={rfqForm.email}
                    onChange={e => setRfqForm({ ...rfqForm, email: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 font-bold uppercase tracking-wider text-[10px] mb-1.5">
                    Direct Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(415) 555-0182"
                    value={rfqForm.phone}
                    onChange={e => setRfqForm({ ...rfqForm, phone: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 font-bold uppercase tracking-wider text-[10px] mb-1.5">
                    Primary Trade
                  </label>
                  <select
                    value={rfqForm.tradeType}
                    onChange={e => setRfqForm({ ...rfqForm, tradeType: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 focus:outline-none focus:border-amber-400"
                  >
                    <option value="General Contracting">General Contracting</option>
                    <option value="Electrical Trade">Electrical Trade</option>
                    <option value="Plumbing & Mechanical">Plumbing & Mechanical</option>
                    <option value="Framing & Carpentry">Framing & Carpentry</option>
                    <option value="HVAC / Sheet Metal">HVAC / Sheet Metal</option>
                    <option value="Facility Maintenance">Facility Maintenance</option>
                    <option value="Municipal / Government">Municipal / Government</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 font-bold uppercase tracking-wider text-[10px] mb-1.5">
                  Required Tool Models, Kits & Accessories
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="e.g. 10x 20V MAX Hammer Drills (DCD999B), 10x 60V MAX FLEXVOLT 9.0Ah Batteries (DCB609), 4x 12-Inch Miter Saws (DWS780), 50x Impact Ready Screwdriving sets."
                  value={rfqForm.toolList}
                  onChange={e => setRfqForm({ ...rfqForm, toolList: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <p className="text-zinc-500 text-[11px]">
                  All quotes include full 3-year warranty, direct ground freight & net 30 invoicing terms upon approval.
                </p>
                <button
                  type="submit"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black py-3.5 px-8 rounded-xl transition-all shadow-lg shadow-amber-400/10 cursor-pointer active:scale-95 text-xs sm:text-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Commercial RFQ</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
