import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { ArrowRight, Flame, Sparkles } from 'lucide-react';

export const FeaturedTools: React.FC = () => {
  const { products, navigateTo } = useStore();
  const [activeTab, setActiveTab] = useState<'all' | 'drills' | 'saws' | 'batteries'>('all');

  const filterProducts = () => {
    switch (activeTab) {
      case 'drills':
        return products.filter((p) => p.category === 'drills-drivers' || p.category === 'impact-drivers-wrenches');
      case 'saws':
        return products.filter((p) => p.category === 'saws' || p.category === 'grinders');
      case 'batteries':
        return products.filter((p) => p.category === 'batteries-chargers' || p.category === 'combo-kits');
      default:
        return products.filter((p) => p.isFeatured);
    }
  };

  const displayedTools = filterProducts();

  const tabs: { id: 'all' | 'drills' | 'saws' | 'batteries'; label: string }[] = [
    { id: 'all', label: 'All Featured Tools' },
    { id: 'drills', label: 'Drills & Impacts' },
    { id: 'saws', label: 'Saws & Grinders' },
    { id: 'batteries', label: 'Batteries & Kits' }
  ];

  return (
    <section className="py-16 bg-zinc-950 px-4 sm:px-6 lg:px-8 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Contractor High Performance Selection</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 font-display tracking-tight">
              Featured Tools
            </h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-xl">
              Authentic XR brushless cordless power tools, high-capacity lithium battery packs, and commercial jobsite saws.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-amber-400 text-zinc-950 shadow-md shadow-amber-400/20'
                    : 'bg-zinc-900 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedTools.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom Banner & CTA */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shrink-0">
              <Flame className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h4 className="text-base font-bold text-zinc-100">
                Looking for specific MA CONSIDER model numbers or contractor bulk kits?
              </h4>
              <p className="text-xs text-zinc-400">
                Browse our complete online catalog with voltage filters, specifications, and instant shipping estimates.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigateTo('shop')}
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md shrink-0 cursor-pointer"
          >
            <span>Explore Full Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
