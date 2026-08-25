import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { CATEGORIES } from '../data/categories';
import {
  Search,
  SlidersHorizontal,
  X,
  Check,
  ChevronDown,
  Grid3X3,
  LayoutGrid,
  RotateCcw,
  Sparkles,
  Zap
} from 'lucide-react';

export const ShopPage: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery
  } = useStore();

  const [selectedVoltage, setSelectedVoltage] = useState<string | null>(null);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [dealsOnly, setDealsOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(700);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const voltages = ['20V MAX', '120V Corded', '60V FLEXVOLT'];

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          product.name.toLowerCase().includes(q) ||
          product.modelSku.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          product.toolType.toLowerCase().includes(q);
        if (!match) return false;
      }

      // Category
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }

      // Voltage
      if (selectedVoltage && product.voltage !== selectedVoltage) {
        return false;
      }

      // In stock
      if (inStockOnly && !product.inStock) {
        return false;
      }

      // Deals only
      if (dealsOnly && !product.isDeal) {
        return false;
      }

      // Price
      if (product.price > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return b.reviewCount - a.reviewCount;
      return 0; // featured default order
    });
  }, [products, searchQuery, selectedCategory, selectedVoltage, inStockOnly, dealsOnly, maxPrice, sortBy]);

  const resetAllFilters = () => {
    setSelectedCategory(null);
    setSelectedVoltage(null);
    setInStockOnly(false);
    setDealsOnly(false);
    setMaxPrice(700);
    setSearchQuery('');
    setSortBy('featured');
  };

  const hasActiveFilters =
    Boolean(selectedCategory) ||
    Boolean(selectedVoltage) ||
    inStockOnly ||
    dealsOnly ||
    maxPrice < 700 ||
    searchQuery.trim().length > 0;

  return (
    <div className="bg-zinc-950 min-h-screen py-10 px-4 sm:px-6 lg:px-8 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto">
        {/* Page Title & Breadcrumb header */}
        <div className="mb-8 border-b border-zinc-800/80 pb-6">
          <div className="flex items-center gap-2 text-xs text-zinc-500 mb-2">
            <span>Home</span>
            <span>/</span>
            <span className="text-amber-400 font-semibold">Shop Tools</span>
            {selectedCategory && (
              <>
                <span>/</span>
                <span className="text-zinc-300 capitalize">
                  {CATEGORIES.find((c) => c.slug === selectedCategory)?.name || selectedCategory}
                </span>
              </>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 font-display tracking-tight">
                {selectedCategory
                  ? CATEGORIES.find((c) => c.slug === selectedCategory)?.name
                  : 'Professional Power Tools & Equipment'}
              </h1>
              <p className="text-sm text-zinc-400 mt-1">
                Showing {filteredProducts.length} verified contractor tools & accessories
              </p>
            </div>

            {/* Mobile Filter Toggle & Search */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs font-bold"
              >
                <SlidersHorizontal className="w-4 h-4 text-amber-400" />
                <span>Filters {hasActiveFilters && '(Active)'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar Filters */}
          <aside
            className={`lg:block ${
              isMobileFilterOpen ? 'block fixed inset-0 z-50 bg-zinc-950/95 p-6 overflow-y-auto' : 'hidden'
            } lg:relative lg:p-0`}
          >
            {isMobileFilterOpen && (
              <div className="lg:hidden flex items-center justify-between pb-4 mb-4 border-b border-zinc-800">
                <h3 className="text-base font-bold text-zinc-100">Filter Tools</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            <div className="space-y-6 bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800/90 sticky top-28">
              {/* Filter Header with Reset */}
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
                  Filter Catalog
                </span>
                {hasActiveFilters && (
                  <button
                    onClick={resetAllFilters}
                    className="text-[11px] font-bold text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset All
                  </button>
                )}
              </div>

              {/* Keyword Search in Filter */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                  Keyword / SKU Search
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g. DCD996B, 20V, Saw..."
                    className="w-full bg-zinc-950 text-zinc-200 text-xs pl-8 pr-3 py-2 rounded-lg border border-zinc-800 focus:border-amber-400 focus:outline-none"
                  />
                  <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                  Tool Category
                </label>
                <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-2.5 py-1.5 rounded text-xs font-medium transition-colors flex items-center justify-between ${
                      selectedCategory === null
                        ? 'bg-amber-400/15 text-amber-400 font-bold'
                        : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200'
                    }`}
                  >
                    <span>All Categories</span>
                    <span className="text-[10px] text-zinc-500 font-mono">{products.length}</span>
                  </button>

                  {CATEGORIES.map((cat) => {
                    const isSel = selectedCategory === cat.slug;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.slug)}
                        className={`w-full text-left px-2.5 py-1.5 rounded text-xs font-medium transition-colors flex items-center justify-between ${
                          isSel
                            ? 'bg-amber-400/15 text-amber-400 font-bold'
                            : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200'
                        }`}
                      >
                        <span className="truncate pr-2">{cat.name}</span>
                        <span className="text-[10px] text-zinc-500 font-mono">{cat.count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Voltage & Platform Filter */}
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                  Voltage / Power Platform
                </label>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setSelectedVoltage(null)}
                    className={`px-2.5 py-1 rounded text-xs font-semibold ${
                      selectedVoltage === null
                        ? 'bg-amber-400 text-zinc-950 font-bold'
                        : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
                    }`}
                  >
                    Any Platform
                  </button>
                  {voltages.map((v) => (
                    <button
                      key={v}
                      onClick={() => setSelectedVoltage(selectedVoltage === v ? null : v)}
                      className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                        selectedVoltage === v
                          ? 'bg-amber-400 text-zinc-950 font-bold'
                          : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Max Price Range Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                    Max Price
                  </label>
                  <span className="text-xs font-black text-amber-400 font-display">
                    ${maxPrice.toFixed(0)}
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="700"
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-amber-400 bg-zinc-950 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
                  <span>$20</span>
                  <span>$700</span>
                </div>
              </div>

              {/* Quick Checkboxes */}
              <div className="space-y-2.5 pt-2 border-t border-zinc-800">
                <label className="flex items-center gap-2.5 text-xs text-zinc-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="rounded bg-zinc-950 border-zinc-700 text-amber-400 focus:ring-0 w-4 h-4 accent-amber-400"
                  />
                  <span>In Stock Only (Ready for USA Delivery)</span>
                </label>

                <label className="flex items-center gap-2.5 text-xs text-zinc-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={dealsOnly}
                    onChange={(e) => setDealsOnly(e.target.checked)}
                    className="rounded bg-zinc-950 border-zinc-700 text-amber-400 focus:ring-0 w-4 h-4 accent-amber-400"
                  />
                  <span>Special Deals & Discounts</span>
                </label>
              </div>

              {isMobileFilterOpen && (
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full py-3 bg-amber-400 text-zinc-950 font-bold rounded-lg text-xs uppercase"
                >
                  Apply Filters ({filteredProducts.length} Tools)
                </button>
              )}
            </div>
          </aside>

          {/* Right Main Products Display */}
          <main className="lg:col-span-3 space-y-6">
            {/* Sorting & Result Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-xs">
              <div className="text-zinc-400">
                Showing <strong className="text-zinc-100">{filteredProducts.length}</strong> of{' '}
                <strong className="text-zinc-100">{products.length}</strong> products
              </div>

              <div className="flex items-center gap-2">
                <span className="text-zinc-400 font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-zinc-200 text-xs font-semibold focus:border-amber-400 focus:outline-none"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Most Popular</option>
                </select>
              </div>
            </div>

            {/* Active filter pills */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-zinc-500">Active filters:</span>
                {selectedCategory && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-700 text-amber-400 text-xs">
                    Category: {selectedCategory}
                    <button onClick={() => setSelectedCategory(null)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedVoltage && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-700 text-amber-400 text-xs">
                    Voltage: {selectedVoltage}
                    <button onClick={() => setSelectedVoltage(null)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-700 text-amber-400 text-xs">
                    "{searchQuery}"
                    <button onClick={() => setSearchQuery('')}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {inStockOnly && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-700 text-amber-400 text-xs">
                    In Stock
                    <button onClick={() => setInStockOnly(false)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {dealsOnly && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-700 text-amber-400 text-xs">
                    Deals Only
                    <button onClick={() => setDealsOnly(false)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Product Cards Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="p-12 text-center rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
                <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-zinc-100">No tools matched your criteria</h3>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  Try adjusting your price range, clearing specific filters, or searching for broader terms like "Drill" or "Saw".
                </p>
                <button
                  onClick={resetAllFilters}
                  className="px-4 py-2 rounded-lg bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
