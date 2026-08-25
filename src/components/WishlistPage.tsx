import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { Heart, ShoppingBag, ArrowRight, Trash2, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, products, toggleWishlist, navigateTo, addToCart } = useStore();

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  const handleAddAllToCart = () => {
    wishlistedProducts.forEach(product => {
      addToCart(product, 1);
    });
  };

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
            <span className="text-amber-400 font-semibold">Saved Wishlist</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-zinc-400">
              <strong className="text-amber-400 font-bold">{wishlistedProducts.length}</strong> items saved
            </span>
          </div>
        </div>
      </div>

      {/* 2. Page Header Banner */}
      <div className="bg-gradient-to-b from-zinc-900 via-zinc-900/80 to-zinc-950 border-b border-zinc-800/80 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/10 text-amber-400 border border-amber-400/20 mb-3">
              <Heart className="w-3.5 h-3.5 fill-amber-400" />
              <span>SAVED FOR LATER</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              My Jobsite Wishlist
            </h1>
            <p className="text-zinc-400 text-sm mt-2 max-w-xl">
              Save essential tools for future projects, compare upcoming purchases, or quickly move all items to your cart when ready.
            </p>
          </div>

          {wishlistedProducts.length > 0 && (
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleAddAllToCart}
                className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-sm px-5 py-3 rounded-xl transition-all shadow-lg shadow-amber-400/10 hover:shadow-amber-400/20 cursor-pointer active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add All to Cart</span>
              </button>

              <button
                onClick={() => {
                  wishlistedProducts.forEach(p => toggleWishlist(p.id));
                }}
                className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-red-400 font-semibold text-sm px-4 py-3 rounded-xl border border-zinc-800 hover:border-red-900/50 transition-all cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear All</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 3. Wishlist Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {wishlistedProducts.length === 0 ? (
          <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-12 text-center max-w-2xl mx-auto my-8">
            <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-6 text-zinc-600">
              <Heart className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Your wishlist is empty</h2>
            <p className="text-zinc-400 text-sm max-w-md mx-auto mb-8 leading-relaxed">
              You haven&apos;t saved any heavy-duty power tools or accessories yet. Tap the heart icon on any tool in our catalog to save it here for fast ordering.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigateTo('shop')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-extrabold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-amber-400/10 cursor-pointer"
              >
                <span>Browse All Tools</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigateTo('deals')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-amber-400 font-bold px-6 py-3.5 rounded-xl border border-zinc-800 hover:border-amber-400/30 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>View Today&apos;s Deals</span>
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistedProducts.map(product => (
                <div key={product.id} className="relative">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Quick Contractor Perks Strip */}
            <div className="mt-14 p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">3-Year Official Jobsite Warranty</h4>
                  <p className="text-zinc-400 text-xs mt-0.5">
                    All items in your wishlist include full 3-year limited warranty, 1-year free service & 90-day money-back guarantee.
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigateTo('shop')}
                className="shrink-0 inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
              >
                <span>Continue Shopping Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
