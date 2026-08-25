import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { Sparkles, Tag, Percent, Zap, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

export const DealsPage: React.FC = () => {
  const { products, navigateTo, applyCoupon } = useStore();

  const dealProducts = products.filter((p) => p.isDeal || (p.originalPrice && p.originalPrice > p.price));

  const promoCodes = [
    { code: 'USA10', discount: '10% OFF', desc: 'Site-wide on any power tool order over $150' },
    { code: 'PROBUILD', discount: '$25 OFF', desc: 'Instant contractor discount on orders over $250' },
    { code: 'FREESHIP', discount: 'FREE EXPRESS', desc: 'Free tracked 2-day delivery upgrade over $99' }
  ];

  return (
    <div className="bg-zinc-950 min-h-screen py-12 px-4 sm:px-6 lg:px-8 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Deals Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-500/20 via-zinc-900 to-zinc-950 border border-amber-400/30 p-8 sm:p-12">
          <div className="relative z-10 max-w-2xl space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-400 text-zinc-950 text-xs font-black uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Limited-Time Specials</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-zinc-100 font-display tracking-tight leading-tight">
              Exclusive MA CONSIDER Tool Deals & Bundles
            </h1>
            <p className="text-sm sm:text-base text-zinc-300">
              Save up to 35% on authentic cordless hammer drills, high-capacity XR battery packs, combo kits, and jobsite saws.
            </p>
          </div>
        </div>

        {/* Promo Codes Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {promoCodes.map((promo) => (
            <div
              key={promo.code}
              className="p-5 rounded-xl bg-zinc-900 border border-amber-400/20 flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-black text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded border border-amber-400/30">
                  CODE: {promo.code}
                </span>
                <span className="text-sm font-black text-emerald-400">{promo.discount}</span>
              </div>
              <p className="text-xs text-zinc-400">{promo.desc}</p>
              <button
                onClick={() => applyCoupon(promo.code)}
                className="w-full py-2 rounded bg-zinc-800 hover:bg-amber-400 hover:text-zinc-950 text-zinc-200 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Apply Promo Code
              </button>
            </div>
          ))}
        </div>

        {/* Deals Product Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <h2 className="text-2xl font-black text-zinc-100 font-display flex items-center gap-2">
              <Tag className="w-5 h-5 text-amber-400" />
              <span>Featured Deals ({dealProducts.length} Items)</span>
            </h2>
            <button
              onClick={() => navigateTo('shop')}
              className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
            >
              <span>View All Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dealProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
