import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Heart,
  ShoppingCart,
  Zap,
  Check,
  Plus,
  Minus,
  ArrowLeft,
  Share2,
  ChevronRight,
  HelpCircle,
  Package,
  Wrench,
  CheckCircle2
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProduct,
    navigateTo,
    addToCart,
    toggleWishlist,
    isWishlisted,
    products,
    getImageUrl,
    setIsCheckoutModalOpen,
    showToast
  } = useStore();

  if (!selectedProduct) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-zinc-950 p-8 text-center">
        <h2 className="text-xl font-bold text-zinc-100">No Product Selected</h2>
        <button
          onClick={() => navigateTo('shop')}
          className="mt-4 px-6 py-2.5 bg-amber-400 text-zinc-950 font-bold rounded-lg text-xs uppercase"
        >
          Browse Shop Catalog
        </button>
      </div>
    );
  }

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'specs' | 'included' | 'faq'>('overview');

  const mainImage = getImageUrl(
    selectedImageIdx === 0 ? selectedProduct.imageSlotId : undefined,
    selectedProduct.images[selectedImageIdx] || selectedProduct.images[0]
  );

  const wish = isWishlisted(selectedProduct.id);
  const hasDiscount = selectedProduct.originalPrice && selectedProduct.originalPrice > selectedProduct.price;
  const discountAmount = hasDiscount ? (selectedProduct.originalPrice! - selectedProduct.price).toFixed(2) : '0.00';

  const relatedProducts = products
    .filter((p) => p.id !== selectedProduct.id && (p.category === selectedProduct.category || p.voltage === selectedProduct.voltage))
    .slice(0, 4);

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity);
    setIsCheckoutModalOpen(true);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link Copied', 'Product link copied to clipboard.');
    }
  };

  const faqs = [
    {
      q: `Is the ${selectedProduct.modelSku} compatible with existing MA CONSIDER 20V MAX battery packs?`,
      a: 'Yes, this tool works seamlessly with the entire ecosystem of authentic MA CONSIDER 20V MAX and 60V FLEXVOLT lithium-ion batteries.'
    },
    {
      q: 'How fast does this item ship to locations in the United States?',
      a: 'Standard orders process in 24 hours. Transit to US addresses takes approximately 3-5 business days via tracked commercial couriers.'
    },
    {
      q: 'What is your return policy if the tool does not fit my project requirements?',
      a: 'We offer a 30-day return policy for items in original unused condition with all factory packaging and accessories intact.'
    }
  ];

  return (
    <div className="bg-zinc-950 min-h-screen py-10 px-4 sm:px-6 lg:px-8 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-8 text-xs">
          <button
            onClick={() => navigateTo('shop')}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-amber-400 transition-colors font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Tools</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Tool</span>
            </button>
          </div>
        </div>

        {/* Top Product Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Interactive Multi-Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/3] w-full rounded-2xl bg-zinc-900 border border-zinc-800 p-8 flex items-center justify-center overflow-hidden shadow-xl">
              {selectedProduct.dealTag && (
                <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded bg-amber-400 text-zinc-950 text-xs font-black uppercase tracking-wider">
                  {selectedProduct.dealTag}
                </span>
              )}

              <img
                src={mainImage}
                alt={selectedProduct.name}
                className="max-h-full max-w-full object-contain filter contrast-105"
              />
            </div>

            {/* Thumbnail Selector */}
            {selectedProduct.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {selectedProduct.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIdx(index)}
                    className={`relative w-20 h-20 rounded-xl bg-zinc-900 p-2 border transition-all overflow-hidden shrink-0 ${
                      selectedImageIdx === index
                        ? 'border-amber-400 ring-2 ring-amber-400/20'
                        : 'border-zinc-800 hover:border-zinc-700 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Value Checkpoints below image */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-zinc-300">USA Nationwide Tracked Delivery</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-zinc-300">Guaranteed Authentic Tools</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-center gap-2.5">
                <RotateCcw className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-zinc-300">30-Day Return Policy</span>
              </div>
            </div>
          </div>

          {/* Right: Purchasing Details & Specifications */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              {/* Brand & Model SKU */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-black uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded border border-amber-400/30">
                  {selectedProduct.brand}
                </span>
                <span className="text-xs font-mono font-bold text-zinc-300 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                  Model: {selectedProduct.modelSku}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-100 font-display leading-snug">
                {selectedProduct.name}
              </h1>

              {/* Ratings */}
              <div className="mt-2.5 flex items-center gap-3 text-xs">
                <div className="flex items-center text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="ml-1 font-bold text-zinc-200">{selectedProduct.rating.toFixed(1)}</span>
                </div>
                <span className="text-zinc-500">•</span>
                <span className="text-zinc-400">
                  {selectedProduct.reviewCount} contractor ratings
                </span>
                <span className="text-zinc-500">•</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> In Stock ({selectedProduct.stockCount} available)
                </span>
              </div>
            </div>

            {/* Price section */}
            <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-amber-400 font-display">
                  ${selectedProduct.price.toFixed(2)}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-base text-zinc-500 line-through">
                      ${selectedProduct.originalPrice?.toFixed(2)}
                    </span>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/30">
                      Save ${discountAmount}
                    </span>
                  </>
                )}
              </div>
              <p className="text-[11px] text-zinc-400">
                Orders over $99 qualify for Free USA Ground Delivery. Taxes calculated at checkout.
              </p>
            </div>

            {/* Quantity Selector & Action CTAs */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  Quantity:
                </label>
                <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-xs font-bold text-zinc-100">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(selectedProduct.stockCount, q + 1))}
                    className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Primary Add to Cart & Buy Now Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => addToCart(selectedProduct, quantity)}
                  className="w-full py-3.5 px-4 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-400/15 transition-all active:scale-98 cursor-pointer"
                  id="pdp-add-to-cart-btn"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full py-3.5 px-4 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
                  id="pdp-buy-now-btn"
                >
                  <Zap className="w-4 h-4 fill-zinc-950" />
                  <span>Buy Now (Instant Checkout)</span>
                </button>
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(selectedProduct.id)}
                className={`w-full py-2.5 px-4 rounded-lg border text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${
                  wish
                    ? 'bg-amber-400/15 border-amber-400/40 text-amber-400'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800'
                }`}
              >
                <Heart className={`w-4 h-4 ${wish ? 'fill-amber-400 text-amber-400' : ''}`} />
                <span>{wish ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
              </button>
            </div>

            {/* Quick Contractor Inquiries */}
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-xs text-zinc-400 space-y-1.5">
              <div className="font-bold text-zinc-200 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-amber-400" />
                <span>Questions about this tool?</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Contact our sales desk at{' '}
                <a href="tel:+923155959375" className="text-amber-400 font-bold hover:underline">
                  +92 315 5959375
                </a>{' '}
                or email{' '}
                <a href="mailto:chabidjani06@gmail.com" className="text-amber-400 font-bold hover:underline">
                  chabidjani06@gmail.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs (Overview, Features, Specifications, Included, FAQs) */}
        <div className="mt-16 border-t border-zinc-800 pt-10">
          <div className="flex border-b border-zinc-800 gap-2 sm:gap-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'text-amber-400 border-b-2 border-amber-400'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Product Overview
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${
                activeTab === 'features'
                  ? 'text-amber-400 border-b-2 border-amber-400'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Key Features ({selectedProduct.features.length})
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${
                activeTab === 'specs'
                  ? 'text-amber-400 border-b-2 border-amber-400'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab('included')}
              className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${
                activeTab === 'included'
                  ? 'text-amber-400 border-b-2 border-amber-400'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              What's Included ({selectedProduct.included.length})
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${
                activeTab === 'faq'
                  ? 'text-amber-400 border-b-2 border-amber-400'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Frequently Asked Questions
            </button>
          </div>

          <div className="py-8">
            {/* Overview */}
            {activeTab === 'overview' && (
              <div className="max-w-3xl space-y-4 text-sm text-zinc-300 leading-relaxed">
                <h3 className="text-lg font-bold text-zinc-100 font-display">
                  About {selectedProduct.name}
                </h3>
                <p>{selectedProduct.description}</p>
                <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 space-y-2 mt-4">
                  <div className="font-bold text-zinc-200">Contractor Note:</div>
                  <p>
                    All MA CONSIDER power tools supplied by MA Consider Brands undergo rigorous serial and barcode inspection before dispatch to ensure authentic performance on demanding commercial and residential jobsites.
                  </p>
                </div>
              </div>
            )}

            {/* Key Features */}
            {activeTab === 'features' && (
              <div className="max-w-3xl space-y-3">
                <h3 className="text-lg font-bold text-zinc-100 font-display mb-4">
                  Engineered Features
                </h3>
                <ul className="space-y-3">
                  {selectedProduct.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-200"
                    >
                      <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specifications Table */}
            {activeTab === 'specs' && (
              <div className="max-w-2xl">
                <h3 className="text-lg font-bold text-zinc-100 font-display mb-4">
                  Technical Specifications
                </h3>
                <div className="rounded-xl border border-zinc-800 overflow-hidden">
                  <table className="w-full text-xs text-left">
                    <tbody className="divide-y divide-zinc-800">
                      <tr className="bg-zinc-900/90">
                        <td className="p-3 font-bold text-zinc-400 w-1/3">Brand</td>
                        <td className="p-3 text-amber-400 font-bold">{selectedProduct.brand}</td>
                      </tr>
                      <tr className="bg-zinc-950">
                        <td className="p-3 font-bold text-zinc-400">Model / SKU</td>
                        <td className="p-3 text-zinc-200 font-mono">{selectedProduct.modelSku}</td>
                      </tr>
                      {selectedProduct.voltage && (
                        <tr className="bg-zinc-900/50">
                          <td className="p-3 font-bold text-zinc-400">Voltage Platform</td>
                          <td className="p-3 text-zinc-200">{selectedProduct.voltage}</td>
                        </tr>
                      )}
                      <tr className="bg-zinc-950">
                        <td className="p-3 font-bold text-zinc-400">Tool Type</td>
                        <td className="p-3 text-zinc-200">{selectedProduct.toolType}</td>
                      </tr>
                      {Object.entries(selectedProduct.specifications).map(([key, val], i) => (
                        <tr key={key} className={i % 2 === 0 ? 'bg-zinc-900/50' : 'bg-zinc-950'}>
                          <td className="p-3 font-bold text-zinc-400">{key}</td>
                          <td className="p-3 text-zinc-200">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* What's Included */}
            {activeTab === 'included' && (
              <div className="max-w-2xl space-y-3">
                <h3 className="text-lg font-bold text-zinc-100 font-display mb-4">
                  Package Contents
                </h3>
                <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4 space-y-2.5">
                  {selectedProduct.included.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs text-zinc-200">
                      <Package className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Frequently Asked Questions */}
            {activeTab === 'faq' && (
              <div className="max-w-3xl space-y-4">
                <h3 className="text-lg font-bold text-zinc-100 font-display mb-4">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-3">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                      <div className="text-xs font-bold text-amber-400 flex items-center gap-2">
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>{faq.q}</span>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed pl-5.5">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 border-t border-zinc-800 pt-12">
            <h3 className="text-2xl font-bold text-zinc-100 font-display mb-6">
              Related Tools & Accessories
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
