import React from 'react';
import { CATEGORIES } from '../data/categories';
import { useStore } from '../context/StoreContext';
import {
  ArrowRight,
  ChevronRight,
  Zap,
  Wrench,
  Gauge,
  Scissors,
  Disc,
  BatteryCharging,
  Hammer,
  Layers,
  Package,
  TreePine,
  HardHat,
  Box,
  LucideIcon
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Zap,
  Wrench,
  Gauge,
  Scissors,
  Disc,
  BatteryCharging,
  Hammer,
  Layers,
  Package,
  TreePine,
  HardHat,
  Box
};

export const CategoryGrid: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <section className="py-16 bg-zinc-950 px-4 sm:px-6 lg:px-8 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1.5">
              <Zap className="w-3.5 h-3.5" />
              <span>Full Tool Catalog</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 font-display tracking-tight">
              Shop Tools by Category
            </h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-xl">
              Explore contractor-grade cordless power systems, premium accessories, batteries, and jobsite gear.
            </p>
          </div>

          <button
            onClick={() => navigateTo('shop')}
            className="inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300 group self-start md:self-auto"
          >
            <span>View All Categories & Tools</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 12 Categories Grid (Without Image) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {CATEGORIES.map((category) => {
            const IconComponent = ICON_MAP[category.iconName] || Wrench;

            return (
              <div
                key={category.id}
                onClick={() => navigateTo('shop', category.slug)}
                className="group relative flex flex-col justify-between rounded-xl bg-zinc-900/90 border border-zinc-800/90 hover:border-amber-400/60 p-5 cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-amber-400/5 hover:-translate-y-0.5"
              >
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/5 rounded-full blur-2xl group-hover:bg-amber-400/10 transition-colors" />

                <div>
                  {/* Category Icon & Count Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/25 flex items-center justify-center text-amber-400 group-hover:scale-105 group-hover:bg-amber-400/20 transition-all shadow-inner">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold bg-zinc-950 text-amber-400 border border-zinc-800 px-2.5 py-1 rounded-full">
                      {category.count} Models
                    </span>
                  </div>

                  {/* Category Name */}
                  <h3 className="text-base font-bold text-zinc-100 group-hover:text-amber-400 transition-colors font-display">
                    {category.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                {/* Shop Now Action */}
                <div className="mt-5 pt-3 border-t border-zinc-800/70 flex items-center justify-between text-xs font-bold text-amber-400 group-hover:text-amber-300">
                  <span className="uppercase tracking-wider text-[11px]">Explore Category</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
