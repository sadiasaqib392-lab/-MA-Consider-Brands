import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Star,
  ShieldCheck,
  ShoppingCart,
  Zap,
  ArrowRight,
  Heart,
  Plus,
  Minus,
  CheckCircle2
} from 'lucide-react';
import { MABadge } from './MABadge';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isWishlisted,
    navigateTo,
    getImageUrl,
    setIsCheckoutModalOpen
  } = useStore();

  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const displayImage = getImageUrl(quickViewProduct.imageSlotId, quickViewProduct.images[0]);
  const wish = isWishlisted(quickViewProduct.id);

  const handleBuyNow = () => {
    addToCart(quickViewProduct, quantity);
    setQuickViewProduct(null);
    setIsCheckoutModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/85 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center">
      <div className="relative w-full max-w-3xl rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden text-zinc-100">
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-zinc-950/80 text-zinc-400 hover:text-white border border-zinc-800 cursor-pointer"
          aria-label="Close Quick View"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Image Spotlight with MA Badge */}
          <div className="relative aspect-square bg-zinc-950 p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-zinc-800">
            <MABadge size="sm" variant="amber" position="top-left" />

            {quickViewProduct.dealTag && (
              <span className="absolute top-4 right-14 text-xs font-black bg-amber-400 text-zinc-950 px-2.5 py-0.5 rounded uppercase">
                {quickViewProduct.dealTag}
              </span>
            )}
            <img
              src={displayImage}
              alt={quickViewProduct.name}
              className="max-h-full max-w-full object-contain filter brightness-110 contrast-105"
            />
          </div>

          {/* Right Product Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1 text-xs">
                <span className="font-black text-amber-400 uppercase">{quickViewProduct.brand}</span>
                <span className="font-mono text-zinc-400 bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-800">
                  {quickViewProduct.modelSku}
                </span>
              </div>

              <h3 className="text-lg font-bold text-zinc-100 font-display leading-snug">
                {quickViewProduct.name}
              </h3>

              <div className="mt-2 flex items-center gap-2 text-xs">
                <div className="flex items-center text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="ml-1 font-bold text-zinc-200">{quickViewProduct.rating.toFixed(1)}</span>
                </div>
                <span className="text-zinc-500">•</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> In Stock ({quickViewProduct.stockCount} left)
                </span>
              </div>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-2xl font-black text-amber-400 font-display">
                  ${quickViewProduct.price.toFixed(2)}
                </span>
                {quickViewProduct.originalPrice && quickViewProduct.originalPrice > quickViewProduct.price && (
                  <span className="text-xs text-zinc-500 line-through">
                    ${quickViewProduct.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <p className="mt-3 text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                {quickViewProduct.shortSpec}
              </p>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded p-0.5">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-1 text-zinc-400 hover:text-white"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="px-3 text-xs font-bold text-zinc-200">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(quickViewProduct.stockCount, q + 1))}
                    className="p-1 text-zinc-400 hover:text-white"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <button
                  onClick={() => addToCart(quickViewProduct, quantity)}
                  className="flex-1 py-2.5 px-4 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleBuyNow}
                  className="py-2.5 px-3 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5 fill-zinc-950" />
                  <span>Buy Now</span>
                </button>

                <button
                  onClick={() => {
                    const prod = quickViewProduct;
                    setQuickViewProduct(null);
                    navigateTo('product-detail', undefined, prod);
                  }}
                  className="py-2.5 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1"
                >
                  <span>Full Details</span>
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
