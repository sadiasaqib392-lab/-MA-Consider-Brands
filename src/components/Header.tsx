import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Search,
  ShoppingCart,
  Heart,
  Scale,
  Menu,
  X,
  Phone,
  Mail,
  ShieldCheck,
  Zap,
  SlidersHorizontal,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Package,
  Wrench,
  Award,
  HardHat
} from 'lucide-react';
import { PageView } from '../types';
import { BrandLogo } from './BrandLogo';

export const Header: React.FC = () => {
  const {
    activePage,
    navigateTo,
    cartCount,
    wishlist,
    compareList,
    setIsCartDrawerOpen,
    setIsImageManagerOpen,
    searchQuery,
    setSearchQuery,
    products,
    setSelectedCategory
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const searchResults = localSearch.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(localSearch.toLowerCase()) ||
          p.modelSku.toLowerCase().includes(localSearch.toLowerCase()) ||
          p.category.toLowerCase().includes(localSearch.toLowerCase()) ||
          p.toolType.toLowerCase().includes(localSearch.toLowerCase())
      )
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchQuery(localSearch.trim());
      navigateTo('shop');
      setIsSearchOpen(false);
    }
  };

  const navLinks: { label: string; page: PageView; category?: string; highlight?: boolean; badge?: string }[] = [
    { label: 'Home', page: 'home' },
    { label: 'All Products', page: 'shop' },
    { label: 'Categories', page: 'categories' },
    { label: 'Deals & Specials', page: 'deals', highlight: true, badge: 'HOT' },
    { label: 'Pro Contractor', page: 'pro-contractor', badge: 'B2B' },
    { label: 'Compare', page: 'compare' },
    { label: 'Wishlist', page: 'wishlist' },
    { label: 'Track Order', page: 'track-order' },
    { label: 'Warranty', page: 'warranty' },
    { label: 'About Us', page: 'about' },
    { label: 'Contact', page: 'contact' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/80 transition-all duration-200">
      {/* 1. Slim Announcement Bar */}
      <div className="bg-zinc-900 border-b border-zinc-800 text-zinc-300 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-bold bg-amber-400/15 text-amber-400 border border-amber-400/30">
              <Zap className="w-3 h-3 text-amber-400" /> USA STORE
            </span>
            <span className="font-medium text-zinc-300">
              Professional Tools. Built for the Job.
            </span>
            <span className="hidden md:inline text-zinc-500">•</span>
            <span className="hidden md:inline text-zinc-400">
              Quality Tools for USA Professionals & DIYers
            </span>
          </div>

          <div className="flex items-center gap-4 text-zinc-400 text-xs">
            <a
              href="tel:+923155959375"
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>+92 315 5959375</span>
            </a>
            <span className="text-zinc-700">|</span>
            <a
              href="mailto:chabidjani06@gmail.com"
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>chabidjani06@gmail.com</span>
            </a>
            <button
              onClick={() => setIsImageManagerOpen(true)}
              className="hidden lg:flex items-center gap-1 text-[11px] font-semibold bg-amber-400/10 text-amber-400 hover:bg-amber-400/20 px-2 py-0.5 rounded border border-amber-400/30 transition-colors"
              title="Configure 10 custom image slots"
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span>10 Image Slots</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Aesthetic Brand Logo */}
          <BrandLogo
            size="md"
            variant="full"
            onClick={() => navigateTo('home')}
            className="shrink-0"
          />

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  placeholder="Search tools, models (e.g. DCD996B, Saws)..."
                  className="w-full bg-zinc-900/90 text-zinc-100 text-sm pl-10 pr-10 py-2.5 rounded-lg border border-zinc-800 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all placeholder:text-zinc-500"
                />
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                {localSearch && (
                  <button
                    type="button"
                    onClick={() => setLocalSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </form>

              {/* Instant Search Suggestions dropdown */}
              {localSearch.trim().length > 1 && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-zinc-900 border border-zinc-800 rounded-lg shadow-2xl overflow-hidden z-50 divide-y divide-zinc-800">
                  <div className="p-2 text-xs font-semibold text-zinc-400 bg-zinc-950/60 flex justify-between">
                    <span>Matching Products ({searchResults.length})</span>
                    <button
                      onClick={handleSearchSubmit}
                      className="text-amber-400 hover:underline"
                    >
                      View all results
                    </button>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {searchResults.length > 0 ? (
                      searchResults.slice(0, 5).map((p) => (
                        <div
                          key={p.id}
                          onClick={() => {
                            navigateTo('product-detail', undefined, p);
                            setLocalSearch('');
                          }}
                          className="flex items-center gap-3 p-3 hover:bg-zinc-800/70 cursor-pointer transition-colors"
                        >
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-10 h-10 rounded object-cover bg-zinc-950 border border-zinc-800"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-zinc-200 truncate">
                              {p.name}
                            </p>
                            <p className="text-[11px] text-amber-400 font-mono">
                              {p.modelSku} • ${p.price.toFixed(2)}
                            </p>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-xs text-zinc-500">
                        No tools found matching "{localSearch}".
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="lg:hidden p-2 rounded-lg text-zinc-300 hover:text-amber-400 hover:bg-zinc-900 transition-colors"
              aria-label="Toggle Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Image Slots Manager quick launch */}
            <button
              onClick={() => setIsImageManagerOpen(true)}
              className="hidden sm:flex items-center gap-1 text-[11px] font-bold bg-zinc-900 text-amber-400 hover:bg-zinc-800 p-2 sm:px-2.5 sm:py-1.5 rounded-lg border border-zinc-800 hover:border-amber-400/40 transition-colors cursor-pointer"
              title="Configure 10 Image Slots"
              aria-label="Image Slots"
            >
              <SlidersHorizontal className="w-4 h-4 text-amber-400" />
              <span className="hidden md:inline">Image Slots</span>
            </button>

            {/* Compare Tools Button */}
            <button
              onClick={() => navigateTo('compare')}
              className={`relative p-2 rounded-lg transition-colors cursor-pointer ${
                activePage === 'compare'
                  ? 'bg-amber-400/10 text-amber-400 border border-amber-400/30'
                  : 'text-zinc-300 hover:text-amber-400 hover:bg-zinc-900'
              }`}
              title="Compare Tools Head-to-Head"
              aria-label="Compare Tools"
            >
              <Scale className="w-5 h-5" />
              {compareList.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-400 text-zinc-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                  {compareList.length}
                </span>
              )}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => navigateTo('wishlist')}
              className={`relative p-2 rounded-lg transition-colors cursor-pointer ${
                activePage === 'wishlist'
                  ? 'bg-amber-400/10 text-amber-400 border border-amber-400/30'
                  : 'text-zinc-300 hover:text-amber-400 hover:bg-zinc-900'
              }`}
              title="Saved Wishlist Tools"
              aria-label="Saved Tools"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-400 text-zinc-950 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Trigger */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-amber-400/40 text-zinc-100 px-3 py-2 rounded-lg transition-all cursor-pointer"
              id="header-cart-button"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-amber-400" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-400 text-zinc-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">
                Cart
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-zinc-300 hover:text-amber-400 hover:bg-zinc-900 transition-colors cursor-pointer"
              aria-label="Open Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Multi-Page Navigation Row */}
        <nav className="hidden lg:flex items-center justify-between border-t border-zinc-900 py-2.5 text-xs font-semibold overflow-x-auto">
          <div className="flex items-center space-x-5 xl:space-x-6 shrink-0">
            {navLinks.map((item) => {
              const isActive = activePage === item.page;

              return (
                <button
                  key={item.label}
                  onClick={() => {
                    navigateTo(item.page, item.category || null);
                  }}
                  className={`relative py-1 tracking-wide transition-colors uppercase flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'text-amber-400 font-bold'
                      : 'text-zinc-400 hover:text-zinc-100'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-amber-400 text-zinc-950 uppercase tracking-tighter">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4 text-zinc-400 text-xs shrink-0 pl-4">
            <button
              onClick={() => navigateTo('warranty')}
              className="flex items-center gap-1.5 text-zinc-400 hover:text-amber-400 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>3-Yr Warranty</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="lg:hidden p-4 bg-zinc-900 border-t border-zinc-800">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              ref={searchInputRef}
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search MA CONSIDER tools, SKU, voltage..."
              className="w-full bg-zinc-950 text-zinc-100 text-sm pl-10 pr-10 py-3 rounded-lg border border-zinc-800 focus:border-amber-400 focus:outline-none"
            />
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-amber-400 text-zinc-950 text-xs font-bold px-3 py-1.5 rounded"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-28 bg-zinc-950/98 backdrop-blur-xl z-50 overflow-y-auto p-6 border-t border-zinc-800">
          <div className="flex flex-col space-y-4">
            <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-2">
              Navigation Menu
            </div>
            {navLinks.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  navigateTo(item.page, item.category || null);
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-between p-3 rounded-lg text-left text-zinc-200 hover:bg-zinc-900 hover:text-amber-400 text-base font-semibold border border-transparent hover:border-zinc-800 transition-all"
              >
                <span>{item.label}</span>
                <ArrowRight className="w-4 h-4 text-zinc-600" />
              </button>
            ))}

            <div className="pt-6 border-t border-zinc-800 flex flex-col gap-3">
              <button
                onClick={() => {
                  setIsImageManagerOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-amber-400/10 border border-amber-400/30 text-amber-400 font-bold text-sm"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Customize 10 Image Slots</span>
              </button>

              <div className="p-4 rounded-lg bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-400 space-y-2">
                <div className="font-bold text-zinc-200">Customer Assistance</div>
                <div>Phone: +92 315 5959375</div>
                <div>Email: chabidjani06@gmail.com</div>
                <div className="text-[11px] text-zinc-500">
                  Primary Market: United States of America
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
