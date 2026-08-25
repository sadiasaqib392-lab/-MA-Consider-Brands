import React from 'react';
import { Hero } from './Hero';
import { TrustStrip } from './TrustStrip';
import { CategoryGrid } from './CategoryGrid';
import { FeaturedTools } from './FeaturedTools';
import { ProContractorSection } from './ProContractorSection';
import { WhyChooseUs } from './WhyChooseUs';
import { Zap, Wrench, HardHat, ShieldCheck, Phone, Mail, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const HomePage: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <div className="flex flex-col w-full bg-zinc-950 text-zinc-100">
      {/* =========================================================
          SECTION 1: HERO & BRAND INNOVATION (Top Section)
          ========================================================= */}
      <section id="section-hero" className="w-full relative border-b border-zinc-800">
        <div className="bg-zinc-900/60 border-b border-zinc-800/80 py-2 px-4 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>SECTION 1: MA CONSIDER BRANDS • USA POWER TOOLS</span>
          </div>
        </div>

        {/* Hero Slider */}
        <Hero />

        {/* Brand Trust Strip */}
        <TrustStrip />
      </section>

      {/* =========================================================
          SECTION 2: TOOLS & CATEGORY SHOWCASE (Middle Section)
          ========================================================= */}
      <section id="section-products" className="w-full relative bg-zinc-950 border-b border-zinc-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 font-black text-sm">
                02
              </div>
              <div>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                  Product Catalog & Equipment
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-100 font-display">
                  Tool Categories & Featured Inventory
                </h2>
              </div>
            </div>

            <button
              onClick={() => navigateTo('shop')}
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors"
            >
              <span>View All Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Grid */}
        <CategoryGrid />

        {/* Featured Tools Grid with filter tabs */}
        <FeaturedTools />
      </section>

      {/* =========================================================
          SECTION 3: SERVICES, ABOUT & CONTACT (Bottom Section)
          ========================================================= */}
      <section id="section-services-contact" className="w-full relative bg-zinc-900/40 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 font-black text-sm">
                03
              </div>
              <div>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                  Commercial Fleet & Customer Support
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-100 font-display">
                  Pro Services, About Us & Direct Contact
                </h2>
              </div>
            </div>

            <button
              onClick={() => navigateTo('contact')}
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors"
            >
              <span>Support Desk</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Contractor Section */}
        <ProContractorSection />

        {/* Why Choose Us & Standards */}
        <WhyChooseUs />

        {/* Quick Contact & Info Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1.5 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-amber-400/10 text-amber-400 text-[11px] font-bold uppercase">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Authorized USA Commercial Supplier</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-zinc-100 font-display">
                Need Help Selecting the Right Tools or Fleet Packages?
              </h3>
              <p className="text-xs text-zinc-400 max-w-xl">
                Our power tool specialists and contractor account reps are available 7 days a week.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="tel:+923155959375"
                className="px-5 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md shadow-amber-400/20"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call +92 315 5959375</span>
              </a>

              <button
                onClick={() => navigateTo('contact')}
                className="px-5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-amber-400/40 text-zinc-200 hover:text-amber-400 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>Contact Desk</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
