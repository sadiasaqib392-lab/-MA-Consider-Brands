import React from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Heart, ShoppingCart, Eye, Star, Check, Zap } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    addToCart,
    toggleWishlist,
    isWishlisted,
    navigateTo,
    setQuickViewProduct,
    getImageUrl
  } = useStore();

  const wish = isWishlisted(product.id);
  const displayImage = getImageUrl(product.imageSlotId, product.images[0]);
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  return (
    <div className="group relative flex flex-col justify-between rounded-xl bg-zinc-900 border border-zinc-800 hover:border-amber-400/50 transition-all duration-200 overflow-hidden shadow-lg hover:shadow-xl hover:shadow-amber-400/5">
      {/* Badges & Actions Overlay */}
      <div className="relative aspect-square w-full bg-zinc-950 p-4 flex items-center justify-center overflow-hidden border-b border-zinc-800/80">
        {/* Discount / Deal Tag */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {product.dealTag && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-400 text-zinc-950 shadow-sm">
              {product.dealTag}
            </span>
          )}
          {hasDiscount && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-zinc-800 text-amber-400 border border-zinc-700">
              -{discountPercent}% OFF
            </span>
          )}
          {product.voltage && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-zinc-900/90 text-zinc-300 border border-zinc-800">
              {product.voltage}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all ${
            wish
              ? 'bg-amber-400 text-zinc-950 scale-110 shadow-md'
              : 'bg-zinc-900/80 text-zinc-400 hover:text-amber-400 hover:bg-zinc-900'
          }`}
          aria-label={wish ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${wish ? 'fill-zinc-950' : ''}`} />
        </button>

        {/* Product Image */}
        <img
          src={displayImage}
          alt={product.name}
          onClick={() => navigateTo('product-detail', undefined, product)}
          className="h-full w-full object-contain p-2 filter contrast-105 group-hover:scale-105 transition-transform duration-300 cursor-pointer"
          loading="lazy"
        />

        {/* Quick View Button Hover overlay */}
        <div className="absolute inset-x-4 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
          <button
            onClick={() => setQuickViewProduct(product)}
            className="w-full py-2 px-3 rounded-lg bg-zinc-900/95 hover:bg-zinc-800 text-zinc-200 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border border-zinc-700 backdrop-blur-sm shadow-md"
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Card Content & Details */}
      <div className="flex flex-1 flex-col p-4">
        {/* Brand & SKU Header */}
        <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
          <span className="text-amber-400 font-extrabold">{product.brand}</span>
          <span className="font-mono bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-800 text-zinc-300">
            {product.modelSku}
          </span>
        </div>

        {/* Product Name */}
        <h3
          onClick={() => navigateTo('product-detail', undefined, product)}
          className="mt-2 text-sm font-bold text-zinc-100 line-clamp-2 hover:text-amber-400 transition-colors cursor-pointer leading-snug"
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Short Spec summary */}
        <p className="mt-1 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
          {product.shortSpec}
        </p>

        {/* Rating and Reviews */}
        <div className="mt-2.5 flex items-center gap-1 text-xs">
          <div className="flex items-center text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span className="ml-1 font-bold text-zinc-200">{product.rating.toFixed(1)}</span>
          </div>
          <span className="text-zinc-500 text-[11px]">({product.reviewCount} verified reviews)</span>
        </div>

        {/* Pricing & Stock Section */}
        <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-amber-400 font-display">
                ${product.price.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-zinc-500 line-through font-medium">
                  ${product.originalPrice?.toFixed(2)}
                </span>
              )}
            </div>
            <div className="mt-0.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-semibold text-emerald-400">
                In Stock ({product.stockCount} left)
              </span>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(product, 1)}
            className="flex items-center gap-1.5 py-2 px-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 font-extrabold text-xs uppercase tracking-wider shadow-sm transition-all active:scale-95 cursor-pointer shrink-0"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
