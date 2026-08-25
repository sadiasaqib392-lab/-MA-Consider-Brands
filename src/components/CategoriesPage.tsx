import React from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/categories';
import {
  Zap,
  Wrench,
  Gauge,
  Scissors,
  Disc,
  BatteryCharging,
  Package,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle
} from 'lucide-react';
import { MABadge } from './MABadge';

export const CategoriesPage: React.FC = () => {
  const { navigateTo } = useStore();

  const getIcon = (name: string) => {
    switch (name) {
      case 'Zap':
        return <Zap className="w-5 h-5" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5" />;
      case 'Gauge':
        return <Gauge className="w-5 h-5" />;
      case 'Scissors':
        return <Scissors className="w-5 h-5" />;
      case 'Disc':
        return <Disc className="w-5 h-5" />;
      case 'BatteryCharging':
        return <BatteryCharging className="w-5 h-5" />;
      case 'Package':
        return <Package className="w-5 h-5" />;
      case 'Layers':
        return <Layers className="w-5 h-5" />;
      default:
        return <Zap className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-zinc-950 min-h-screen py-12 px-4 sm:px-6 lg:px-8 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            <span>Equipment Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-zinc-100 font-display tracking-tight">
            Tool Categories & Equipment
          </h1>
          <p className="text-sm sm:text-base text-zinc-400">
            Explore authentic MA CONSIDER tools across drills, saws, grinders, modular storage, and battery systems.
          </p>
        </div>

        {/* Categories Full Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigateTo('shop', cat.slug)}
              className="group relative flex flex-col justify-between rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-amber-400/60 p-5 transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-amber-400/5 cursor-pointer"
            >
              {/* Category Image Box with MA Badge */}
              <div className="relative aspect-[4/3] w-full rounded-xl bg-zinc-950 p-3 overflow-hidden border border-zinc-800 flex items-center justify-center">
                {/* MA Badge on category picture */}
                <MABadge size="xs" variant="amber" position="top-left" />

                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-full w-full object-contain filter brightness-110 contrast-105 group-hover:scale-105 transition-transform duration-300"
                />

                <span className="absolute bottom-2 right-2 z-10 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-zinc-900/90 text-zinc-300 border border-zinc-700">
                  {cat.count} Items
                </span>
              </div>

              {/* Text Info */}
              <div className="mt-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-2 text-amber-400">
                    {getIcon(cat.iconName)}
                    <h3 className="text-base font-extrabold text-zinc-100 group-hover:text-amber-400 transition-colors">
                      {cat.name}
                    </h3>
                  </div>
                  <p className="mt-1 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs font-bold text-amber-400">
                  <span>Explore Equipment</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contractor Guarantee Banner */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase">
              <ShieldCheck className="w-4 h-4" />
              <span>Full Ecosystem Guarantee</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-zinc-100 font-display">
              Looking for commercial volume or custom jobsite packages?
            </h3>
            <p className="text-xs text-zinc-400 max-w-2xl">
              We provide specialized contractor support, tier discounts on mixed tool lots, and rapid dispatch across all US states.
            </p>
          </div>

          <button
            onClick={() => navigateTo('contact')}
            className="px-6 py-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black text-xs uppercase tracking-wider transition-colors shrink-0 shadow-lg shadow-amber-400/15"
          >
            Contact Commercial Sales
          </button>
        </div>
      </div>
    </div>
  );
};
