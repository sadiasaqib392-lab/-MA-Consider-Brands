import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { HardHat, CheckCircle, ArrowRight, Building, FileText, Send, X } from 'lucide-react';

export const ProContractorSection: React.FC = () => {
  const { navigateTo, getImageUrl, showToast } = useStore();
  const bannerImage = getImageUrl(9);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    contractorName: '',
    companyName: '',
    email: '',
    phone: '',
    projectType: 'Commercial Construction',
    toolRequirements: '',
    estimatedQuantity: '5-15 Tools'
  });

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteForm.contractorName || !quoteForm.email || !quoteForm.phone) {
      showToast('Missing Fields', 'Please provide your name, phone, and email address.', 'warning');
      return;
    }
    showToast(
      'Quote Request Received',
      `Thank you ${quoteForm.contractorName}. Our commercial sales desk will respond within 24 hours.`
    );
    setIsQuoteOpen(false);
    setQuoteForm({
      contractorName: '',
      companyName: '',
      email: '',
      phone: '',
      projectType: 'Commercial Construction',
      toolRequirements: '',
      estimatedQuantity: '5-15 Tools'
    });
  };

  return (
    <section className="relative py-20 bg-zinc-950 px-4 sm:px-6 lg:px-8 border-b border-zinc-800 overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0 opacity-20">
        <img
          src={bannerImage}
          alt="Jobsite contractor operating tools"
          className="w-full h-full object-cover filter contrast-125"
        />
        <div className="absolute inset-0 bg-zinc-950 via-zinc-950/80 to-zinc-950" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Pro Pitch */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <HardHat className="w-4 h-4 text-amber-400" />
              <span>Contractors & Tradespeople Support</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-100 font-display tracking-tight leading-tight">
              Tools for the Work That Matters.
            </h2>

            <p className="text-base text-zinc-300 leading-relaxed max-w-2xl">
              Whether you're on a construction site, working in the workshop, handling repairs, or
              taking on a serious DIY project, find tools designed to help you work with confidence.
            </p>

            {/* Benefit Checkpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-zinc-200 bg-zinc-900/60 p-3 rounded-lg border border-zinc-800">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Heavy-Duty Brushless XR Durability</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-zinc-200 bg-zinc-900/60 p-3 rounded-lg border border-zinc-800">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Commercial Volume Purchase Inquiries</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-zinc-200 bg-zinc-900/60 p-3 rounded-lg border border-zinc-800">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Standardized 20V & 60V Battery Eco-system</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-zinc-200 bg-zinc-900/60 p-3 rounded-lg border border-zinc-800">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Direct Courier Logistics Across USA</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => navigateTo('shop', 'power-tools')}
                className="px-6 py-3.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-400/20 transition-all cursor-pointer"
              >
                <span>Explore Professional Tools</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsQuoteOpen(true)}
                className="px-6 py-3.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-bold text-xs uppercase tracking-wider flex items-center gap-2 border border-zinc-700 hover:border-amber-400/40 transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Request Contractor Quote</span>
              </button>
            </div>
          </div>

          {/* Right Column: Commercial Support Card */}
          <div className="lg:col-span-5">
            <div className="p-7 rounded-2xl bg-zinc-900/90 border border-zinc-800 shadow-2xl backdrop-blur-md space-y-5">
              <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
                <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center">
                  <Building className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-100 uppercase tracking-wide">
                    MA Consider Commercial Desk
                  </h4>
                  <p className="text-xs text-zinc-400">Serving US trades & jobsite requirements</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-zinc-300">
                <div className="flex justify-between py-1.5 border-b border-zinc-800/60">
                  <span className="text-zinc-400">Phone Support:</span>
                  <a href="tel:+923155959375" className="font-bold text-amber-400 hover:underline">
                    +92 315 5959375
                  </a>
                </div>
                <div className="flex justify-between py-1.5 border-b border-zinc-800/60">
                  <span className="text-zinc-400">Email Desk:</span>
                  <a href="mailto:chabidjani06@gmail.com" className="font-bold text-zinc-200 hover:underline">
                    chabidjani06@gmail.com
                  </a>
                </div>
                <div className="flex justify-between py-1.5 border-b border-zinc-800/60">
                  <span className="text-zinc-400">Primary Delivery:</span>
                  <span className="font-bold text-zinc-200">United States of America</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-zinc-400">Bulk Inquiries:</span>
                  <span className="font-bold text-emerald-400">Available on Request</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 text-[11px] text-zinc-400 leading-relaxed">
                <strong className="text-zinc-200">Direct Contractor Service:</strong> Need multiple combo kits, extra high-capacity 5.0Ah or 6.0Ah batteries, or jobsite saws for an upcoming commercial project? Contact our team directly for expedited invoice processing.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contractor Quote Modal */}
      {isQuoteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl bg-zinc-900 border border-zinc-800 p-6 shadow-2xl">
            <button
              onClick={() => setIsQuoteOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-amber-400/10 border border-amber-400/30">
                <FileText className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-100 font-display">
                  Commercial Tool Quote Request
                </h3>
                <p className="text-xs text-zinc-400">
                  Fill in your requirements for commercial and contractor tool packages.
                </p>
              </div>
            </div>

            <form onSubmit={handleQuoteSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={quoteForm.contractorName}
                  onChange={(e) => setQuoteForm({ ...quoteForm, contractorName: e.target.value })}
                  placeholder="e.g. David Miller"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Company / Trade Name</label>
                  <input
                    type="text"
                    value={quoteForm.companyName}
                    onChange={(e) => setQuoteForm({ ...quoteForm, companyName: e.target.value })}
                    placeholder="e.g. Apex Electrical LLC"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Estimated Quantity</label>
                  <select
                    value={quoteForm.estimatedQuantity}
                    onChange={(e) => setQuoteForm({ ...quoteForm, estimatedQuantity: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:border-amber-400 focus:outline-none"
                  >
                    <option>1-4 Tools</option>
                    <option>5-15 Tools</option>
                    <option>16-30 Tools</option>
                    <option>30+ Tools / Full Crew Set</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={quoteForm.email}
                    onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={quoteForm.phone}
                    onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                    placeholder="(555) 000-0000"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Tool Models & Specifications Needed</label>
                <textarea
                  rows={3}
                  value={quoteForm.toolRequirements}
                  onChange={(e) => setQuoteForm({ ...quoteForm, toolRequirements: e.target.value })}
                  placeholder="e.g. 4x DCD996B Hammer Drills, 4x DCF887B Impact Drivers, 8x DCB205-2 Batteries, 2x ToughSystem rolling boxes..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsQuoteOpen(false)}
                  className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Quote Request</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
