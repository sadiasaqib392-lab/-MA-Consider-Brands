import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Shield, Zap, Award, CheckCircle, Wrench } from 'lucide-react';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  const { navigateTo, getImageUrl } = useStore();
  const heroImage = getImageUrl(1);

  return (
    <div className="relative overflow-hidden bg-zinc-950 border-b border-zinc-800">
      {/* Background Graphic & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Professional jobsite tools background"
          className="w-full h-full object-cover object-center opacity-25 filter brightness-75 contrast-125 scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/85 to-zinc-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
        {/* Subtle industrial grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(#f59e0b 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>MA Consider Brands • USA Tools Store</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-100 tracking-tight leading-[1.1] font-display">
              Professional Tools.{' '}
              <span className="text-amber-400 inline-block drop-shadow-sm">
                Built to Get the Job Done.
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed font-normal">
              Shop dependable MA CONSIDER tools and professional equipment designed for demanding jobs,
              serious projects, and everyday performance across the United States.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => navigateTo('shop')}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 font-extrabold text-sm uppercase tracking-wider transition-all duration-150 shadow-lg shadow-amber-400/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                id="hero-shop-tools-btn"
              >
                <span>Shop Tools</span>
                <ArrowRight className="w-4 h-4 text-zinc-950" />
              </button>

              <button
                onClick={() => navigateTo('shop', 'power-tools')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-white font-bold text-sm border border-zinc-700 hover:border-amber-400/50 transition-all cursor-pointer"
                id="hero-explore-categories-btn"
              >
                <span>Explore Categories</span>
              </button>
            </div>

            {/* Verified Trust Metrics */}
            <div className="pt-6 border-t border-zinc-800/80 grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <div className="text-xl sm:text-2xl font-black text-zinc-100 font-display">20V & 60V</div>
                <div className="text-xs text-zinc-400 font-medium">MAX & FLEXVOLT</div>
              </div>
              <div className="border-l border-zinc-800 pl-4">
                <div className="text-xl sm:text-2xl font-black text-amber-400 font-display">100% USA</div>
                <div className="text-xs text-zinc-400 font-medium">Nationwide Fulfillment</div>
              </div>
              <div className="border-l border-zinc-800 pl-4">
                <div className="text-xl sm:text-2xl font-black text-zinc-100 font-display">PRO-GRADE</div>
                <div className="text-xs text-zinc-400 font-medium">Contractor Ready</div>
              </div>
            </div>
          </div>

          {/* Right Floating Equipment Preview Showcase */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative p-6 rounded-2xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800/90 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                    Contractor Featured Selection
                  </span>
                </div>
                <span className="text-[11px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                  XR BRUSHLESS
                </span>
              </div>

              {/* Product Preview Spotlight */}
              <div className="my-5 relative rounded-xl overflow-hidden bg-zinc-950 p-4 border border-zinc-800/80 group">
                <img
                  src={getImageUrl(2)}
                  alt="Cordless Brushless Hammer Drill"
                  className="w-full h-56 object-contain filter contrast-110 group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-zinc-900/90 text-amber-400 text-[11px] font-black px-2.5 py-1 rounded border border-zinc-700">
                  DCD996B
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <h4 className="text-sm font-bold text-zinc-100">
                    MA CONSIDER 20V MAX XR 3-Speed Hammer Drill
                  </h4>
                  <span className="text-lg font-black text-amber-400 font-display">
                    $159.00
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>820 UWO Max Power</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>38,250 BPM Hammer</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>1/2" Nitro-Carb Chuck</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>In Stock (USA Hub)</span>
                  </div>
                </div>

                <button
                  onClick={() => navigateTo('shop')}
                  className="w-full mt-2 py-2.5 px-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border border-zinc-700 transition-colors"
                >
                  <span>View Product Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
