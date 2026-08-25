import React from 'react';
import { useStore } from '../context/StoreContext';
import { MABadge } from './MABadge';
import {
  Scale,
  Plus,
  Trash2,
  Check,
  X,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles
} from 'lucide-react';

export const ComparePage: React.FC = () => {
  const {
    compareList,
    products,
    toggleCompare,
    clearCompare,
    addToCart,
    navigateTo,
    getImageUrl
  } = useStore();

  const comparedProducts = products.filter(p => compareList.includes(p.id));

  // Suggested tools when compare list is low
  const suggestedTools = products
    .filter(p => !compareList.includes(p.id))
    .slice(0, 4);

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
            <span className="text-amber-400 font-semibold">Compare Power Tools</span>
          </div>
          <span className="text-zinc-400">
            <strong className="text-amber-400 font-bold">{comparedProducts.length}</strong> / 4 tools selected
          </span>
        </div>
      </div>

      {/* 2. Header Banner */}
      <div className="bg-gradient-to-b from-zinc-900 via-zinc-900/80 to-zinc-950 border-b border-zinc-800/80 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/10 text-amber-400 border border-amber-400/20 mb-3">
              <Scale className="w-3.5 h-3.5" />
              <span>HEAD-TO-HEAD TOOL BENCHMARK</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Compare Jobsite Tools & Specs
            </h1>
            <p className="text-zinc-400 text-sm mt-2 max-w-2xl">
              Evaluate voltage systems, brushless motor outputs, maximum torque, warranty terms, and pricing side-by-side to make the right gear choice for your crew.
            </p>
          </div>

          {comparedProducts.length > 0 && (
            <button
              onClick={clearCompare}
              className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-red-400 font-semibold text-sm px-4 py-2.5 rounded-xl border border-zinc-800 hover:border-red-900/40 transition-all cursor-pointer w-fit"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Comparison</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. Main Comparison View */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {comparedProducts.length === 0 ? (
          <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-10 text-center max-w-2xl mx-auto my-8">
            <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-5 text-amber-400">
              <Scale className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">No tools selected for comparison</h2>
            <p className="text-zinc-400 text-sm max-w-md mx-auto mb-8 leading-relaxed">
              Add any tools from our catalog to compare voltages, brushless motors, RPM speeds, battery runtimes, and prices side-by-side.
            </p>

            <div className="border-t border-zinc-800/80 pt-6 text-left">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Quick-Add Popular Tools to Compare:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {suggestedTools.map(tool => (
                  <div
                    key={tool.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-amber-400/40 transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={getImageUrl(tool.imageSlotId, tool.images[0])}
                        alt={tool.name}
                        className="w-10 h-10 object-contain rounded bg-zinc-950 p-1 border border-zinc-800 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white truncate">{tool.name}</div>
                        <div className="text-[11px] text-amber-400 font-semibold">${tool.price.toFixed(2)} • {tool.voltage || 'Pro Series'}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleCompare(tool.id)}
                      className="shrink-0 p-2 rounded-lg bg-amber-400/10 text-amber-400 hover:bg-amber-400 hover:text-zinc-950 transition-colors ml-2 cursor-pointer"
                      title="Add to Compare"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto pb-6">
            <div className="min-w-[760px] bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden">
              {/* Product Header Cards Row */}
              <div className="grid grid-cols-5 border-b border-zinc-800 divide-x divide-zinc-800 bg-zinc-900/90">
                <div className="p-6 flex flex-col justify-end">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                    Side-by-Side
                  </span>
                  <h3 className="text-lg font-black text-white">Tool Specs</h3>
                </div>

                {comparedProducts.map(product => {
                  const displayImg = getImageUrl(product.imageSlotId, product.images[0]);
                  return (
                    <div key={product.id} className="p-6 flex flex-col justify-between relative group">
                      <button
                        onClick={() => toggleCompare(product.id)}
                        className="absolute top-3 right-3 p-1.5 rounded-lg bg-zinc-950/80 text-zinc-500 hover:text-red-400 border border-zinc-800 transition-colors cursor-pointer"
                        title="Remove from comparison"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      <div className="relative aspect-square rounded-xl bg-zinc-950 border border-zinc-800 p-4 mb-4 flex items-center justify-center overflow-hidden">
                        <MABadge size="xs" variant="amber" position="top-left" showText={false} />
                        <img
                          src={displayImg}
                          alt={product.name}
                          className="max-h-full max-w-full object-contain filter brightness-110 contrast-105"
                        />
                      </div>

                      <div>
                        <span className="text-[10px] font-mono text-zinc-500 block mb-1">
                          SKU: {product.modelSku}
                        </span>
                        <h4
                          onClick={() => navigateTo('product-detail', null, product)}
                          className="text-sm font-bold text-white hover:text-amber-400 transition-colors cursor-pointer line-clamp-2 mb-2"
                        >
                          {product.name}
                        </h4>
                        <div className="text-xl font-black text-amber-400 mb-4">
                          ${product.price.toFixed(2)}
                        </div>

                        <button
                          onClick={() => addToCart(product, 1)}
                          className="w-full flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs py-2.5 px-3 rounded-lg transition-all shadow-md active:scale-95 cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* Empty Add Slot placeholders */}
                {Array.from({ length: 4 - comparedProducts.length }).map((_, idx) => (
                  <div key={idx} className="p-6 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 rounded-full bg-zinc-950 border border-dashed border-zinc-700 flex items-center justify-center text-zinc-600 mb-3">
                      <Plus className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold text-zinc-500 mb-2">Slot {comparedProducts.length + idx + 1} Open</span>
                    <button
                      onClick={() => navigateTo('shop')}
                      className="text-xs font-bold text-amber-400 hover:underline cursor-pointer"
                    >
                      + Add Tool
                    </button>
                  </div>
                ))}
              </div>

              {/* Specs Rows */}
              <div className="divide-y divide-zinc-800 text-xs">
                {/* Brand */}
                <div className="grid grid-cols-5 divide-x divide-zinc-800 bg-zinc-950/40">
                  <div className="p-3.5 font-bold text-zinc-400">Brand / Ecosystem</div>
                  {comparedProducts.map(p => (
                    <div key={p.id} className="p-3.5 font-semibold text-white">
                      {p.brand}
                    </div>
                  ))}
                  {Array.from({ length: 4 - comparedProducts.length }).map((_, i) => (
                    <div key={i} className="p-3.5 text-zinc-700">-</div>
                  ))}
                </div>

                {/* Voltage */}
                <div className="grid grid-cols-5 divide-x divide-zinc-800">
                  <div className="p-3.5 font-bold text-zinc-400">Voltage Platform</div>
                  {comparedProducts.map(p => (
                    <div key={p.id} className="p-3.5 font-bold text-amber-400">
                      {p.voltage || '120V AC Corded / Manual'}
                    </div>
                  ))}
                  {Array.from({ length: 4 - comparedProducts.length }).map((_, i) => (
                    <div key={i} className="p-3.5 text-zinc-700">-</div>
                  ))}
                </div>

                {/* Category */}
                <div className="grid grid-cols-5 divide-x divide-zinc-800 bg-zinc-950/40">
                  <div className="p-3.5 font-bold text-zinc-400">Category</div>
                  {comparedProducts.map(p => (
                    <div key={p.id} className="p-3.5 text-zinc-300 capitalize">
                      {p.category.replace('-', ' ')}
                    </div>
                  ))}
                  {Array.from({ length: 4 - comparedProducts.length }).map((_, i) => (
                    <div key={i} className="p-3.5 text-zinc-700">-</div>
                  ))}
                </div>

                {/* Motor Type */}
                <div className="grid grid-cols-5 divide-x divide-zinc-800">
                  <div className="p-3.5 font-bold text-zinc-400">Motor Technology</div>
                  {comparedProducts.map(p => (
                    <div key={p.id} className="p-3.5 text-zinc-300">
                      {p.specifications['Motor Type'] || p.specifications['Motor'] || 'Brushless High Output'}
                    </div>
                  ))}
                  {Array.from({ length: 4 - comparedProducts.length }).map((_, i) => (
                    <div key={i} className="p-3.5 text-zinc-700">-</div>
                  ))}
                </div>

                {/* Performance / Speed / Torque */}
                <div className="grid grid-cols-5 divide-x divide-zinc-800 bg-zinc-950/40">
                  <div className="p-3.5 font-bold text-zinc-400">Primary Output Specs</div>
                  {comparedProducts.map(p => (
                    <div key={p.id} className="p-3.5 text-zinc-300">
                      {p.shortSpec}
                    </div>
                  ))}
                  {Array.from({ length: 4 - comparedProducts.length }).map((_, i) => (
                    <div key={i} className="p-3.5 text-zinc-700">-</div>
                  ))}
                </div>

                {/* Stock Status */}
                <div className="grid grid-cols-5 divide-x divide-zinc-800">
                  <div className="p-3.5 font-bold text-zinc-400">Availability</div>
                  {comparedProducts.map(p => (
                    <div key={p.id} className="p-3.5 text-emerald-400 font-semibold flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" />
                      <span>In Stock ({p.stockCount} available)</span>
                    </div>
                  ))}
                  {Array.from({ length: 4 - comparedProducts.length }).map((_, i) => (
                    <div key={i} className="p-3.5 text-zinc-700">-</div>
                  ))}
                </div>

                {/* Warranty */}
                <div className="grid grid-cols-5 divide-x divide-zinc-800 bg-zinc-950/40">
                  <div className="p-3.5 font-bold text-zinc-400">Warranty Coverage</div>
                  {comparedProducts.map(p => (
                    <div key={p.id} className="p-3.5 text-zinc-300 font-medium flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{p.specifications['Warranty'] || '3-Year Limited Warranty'}</span>
                    </div>
                  ))}
                  {Array.from({ length: 4 - comparedProducts.length }).map((_, i) => (
                    <div key={i} className="p-3.5 text-zinc-700">-</div>
                  ))}
                </div>

                {/* Package Inclusions */}
                <div className="grid grid-cols-5 divide-x divide-zinc-800">
                  <div className="p-3.5 font-bold text-zinc-400">Included In Box</div>
                  {comparedProducts.map(p => (
                    <div key={p.id} className="p-3.5 text-zinc-400 text-[11px] space-y-1">
                      {p.included.map((inc, i) => (
                        <div key={i}>• {inc}</div>
                      ))}
                    </div>
                  ))}
                  {Array.from({ length: 4 - comparedProducts.length }).map((_, i) => (
                    <div key={i} className="p-3.5 text-zinc-700">-</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
