import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { MABadge } from './MABadge';
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Heart,
  Scale,
  ShoppingCart,
  Zap,
  Check,
  Plus,
  Minus,
  ArrowLeft,
  Share2,
  HelpCircle,
  Package,
  Wrench,
  CheckCircle2,
  BatteryCharging,
  FileText,
  MessageSquare,
  Sparkles,
  MapPin,
  ExternalLink
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const {
    selectedProduct: contextProduct,
    navigateTo,
    addToCart,
    toggleWishlist,
    isWishlisted,
    toggleCompare,
    isInCompare,
    products,
    getImageUrl,
    setIsCheckoutModalOpen,
    showToast
  } = useStore();

  const selectedProduct = contextProduct || products.find(p => p.id === id) || products[0];

  if (!selectedProduct) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-zinc-950 p-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-400 mb-4">
          <Wrench className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-zinc-100">No Tool Selected</h2>
        <p className="text-xs text-zinc-400 mt-1 max-w-sm">
          Please select an authentic MA CONSIDER tool from our catalog.
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="mt-6 px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold rounded-lg text-xs uppercase tracking-wider transition-colors"
        >
          Browse Tool Catalog
        </button>
      </div>
    );
  }

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'specs' | 'included' | 'battery' | 'reviews' | 'warranty' | 'faq'>('overview');
  const [zipCode, setZipCode] = useState('');
  const [shippingResult, setShippingResult] = useState<string | null>(null);

  // Review form state
  const [reviewName, setReviewName] = useState('');
  const [reviewTrade, setReviewTrade] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [customReviews, setCustomReviews] = useState<Array<{ name: string; trade: string; rating: number; date: string; comment: string }>>([
    {
      name: 'Michael R.',
      trade: 'General Contractor (Texas)',
      rating: 5,
      date: '2 days ago',
      comment: 'Super heavy-duty and great balance. The brushless motor handles high torque continuous framing without any bog down. Excellent tool from MA CONSIDER.'
    },
    {
      name: 'Dave K.',
      trade: 'Master Electrician (Ohio)',
      rating: 5,
      date: '1 week ago',
      comment: 'Fast shipping to our jobsite in Columbus. The LED worklight and 3-speed transmission make conduit and panel work effortless.'
    },
    {
      name: 'Carlos M.',
      trade: 'Commercial Carpenter (California)',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Solid build quality. Paired it with our 5.0Ah XR batteries and it ran all day on heavy timber. Highly recommended.'
    }
  ]);

  const mainImage = getImageUrl(
    selectedImageIdx === 0 ? selectedProduct.imageSlotId : undefined,
    selectedProduct.images[selectedImageIdx] || selectedProduct.images[0]
  );

  const wish = isWishlisted(selectedProduct.id);
  const hasDiscount = selectedProduct.originalPrice && selectedProduct.originalPrice > selectedProduct.price;
  const discountAmount = hasDiscount ? (selectedProduct.originalPrice! - selectedProduct.price).toFixed(2) : '0.00';
  const discountPercent = hasDiscount
    ? Math.round(((selectedProduct.originalPrice! - selectedProduct.price) / selectedProduct.originalPrice!) * 100)
    : 0;

  // Contractor Tier calculation
  const getTierPrice = (qty: number) => {
    if (qty >= 10) return selectedProduct.price * 0.85; // 15% off
    if (qty >= 5) return selectedProduct.price * 0.90;  // 10% off
    if (qty >= 2) return selectedProduct.price * 0.95;  // 5% off
    return selectedProduct.price;
  };

  const currentUnitTierPrice = getTierPrice(quantity);
  const totalLinePrice = (currentUnitTierPrice * quantity).toFixed(2);

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

  const handleZipCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipCode.length >= 5) {
      setShippingResult(`Estimated Delivery to ZIP ${zipCode}: 2-4 Business Days via Tracked US Courier (In Stock at Regional Fulfillment Hub).`);
    } else {
      setShippingResult('Please enter a valid 5-digit US ZIP code.');
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewName.trim() && reviewComment.trim()) {
      setCustomReviews([
        {
          name: reviewName.trim(),
          trade: reviewTrade.trim() || 'Verified Tool Operator',
          rating: reviewRating,
          date: 'Just now',
          comment: reviewComment.trim()
        },
        ...customReviews
      ]);
      setReviewName('');
      setReviewTrade('');
      setReviewComment('');
      showToast('Review Submitted', 'Thank you for your verified contractor feedback!');
    }
  };

  const faqs = [
    {
      q: `Is the MA CONSIDER ${selectedProduct.modelSku} compatible with existing 20V MAX battery packs?`,
      a: 'Yes, this tool is fully compatible with the authentic MA CONSIDER 20V MAX, XR High Capacity (5.0Ah, 6.0Ah), and 60V FLEXVOLT battery platform.'
    },
    {
      q: 'How fast does this equipment ship to US addresses?',
      a: 'Orders placed before 2:00 PM EST ship same-day from our nationwide US fulfillment hubs. Transit takes 2-4 business days.'
    },
    {
      q: 'What is the manufacturer warranty coverage on this tool?',
      a: 'This tool comes with our 3-Year Limited Pro Warranty, 1-Year Free Service Agreement, and 90-Day Satisfaction Money-Back Guarantee.'
    },
    {
      q: 'Are volume and contractor tax-exempt discounts available?',
      a: 'Yes! Automated tier pricing is applied on quantities of 2+, 5+, and 10+. For commercial tax-exempt purchase orders, contact our sales desk directly.'
    },
    {
      q: 'What maintenance is required for the brushless motor system?',
      a: 'MA CONSIDER brushless motors are maintenance-free with sealed ball bearings and electronic commutators, eliminating carbon brush replacements.'
    }
  ];

  return (
    <div className="bg-zinc-950 min-h-screen py-10 px-4 sm:px-6 lg:px-8 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Navigation Breadcrumb & Actions */}
        <div className="flex items-center justify-between text-xs border-b border-zinc-800/80 pb-4">
          <div className="flex items-center gap-2 text-zinc-400">
            <button
              onClick={() => navigateTo('shop')}
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>All Shop</span>
            </button>
            <span>/</span>
            <button
              onClick={() => navigateTo('shop', selectedProduct.category)}
              className="hover:text-amber-400 capitalize"
            >
              {selectedProduct.category.replace('-', ' ')}
            </button>
            <span>/</span>
            <span className="text-zinc-200 font-mono">{selectedProduct.modelSku}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Tool</span>
            </button>
          </div>
        </div>

        {/* Top Product Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Interactive High-Res Image Gallery with "MA" Branding & Bright Filter */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/3] w-full rounded-2xl bg-zinc-900 border border-zinc-800 p-6 sm:p-10 flex items-center justify-center overflow-hidden shadow-2xl">
              {/* Prominent MA CONSIDER Brand Badge on top of Main Image */}
              <MABadge size="md" variant="amber" position="top-left" />

              {/* Deal / Special Tag */}
              {selectedProduct.dealTag && (
                <span className="absolute top-3 right-3 z-10 px-3 py-1 rounded bg-amber-400 text-zinc-950 text-xs font-black uppercase tracking-wider shadow">
                  {selectedProduct.dealTag}
                </span>
              )}

              {/* Bright, Vivid High-Contrast Tool Image */}
              <img
                src={mainImage}
                alt={selectedProduct.name}
                className="max-h-full max-w-full object-contain filter brightness-110 contrast-105 transition-all duration-300"
              />

              {/* Voltage Monogram */}
              {selectedProduct.voltage && (
                <span className="absolute bottom-3 left-3 z-10 px-2.5 py-1 rounded text-xs font-mono font-black bg-zinc-950/90 text-amber-400 border border-zinc-700">
                  {selectedProduct.voltage}
                </span>
              )}
            </div>

            {/* Thumbnail Selector with MA Badges */}
            {selectedProduct.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {selectedProduct.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIdx(index)}
                    className={`relative w-20 h-20 rounded-xl bg-zinc-900 p-2 border transition-all overflow-hidden shrink-0 cursor-pointer ${
                      selectedImageIdx === index
                        ? 'border-amber-400 ring-2 ring-amber-400/30'
                        : 'border-zinc-800 hover:border-zinc-700 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <MABadge size="xs" variant="amber" position="top-left" showText={false} />
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-contain filter brightness-110 contrast-105"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Value Checkpoints below image */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-zinc-300 font-medium">USA Nationwide Tracked 2-4 Day Delivery</span>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-zinc-300 font-medium">100% Authentic MA CONSIDER Certified</span>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center gap-2.5">
                <RotateCcw className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-zinc-300 font-medium">30-Day Hassle-Free Jobsite Return Policy</span>
              </div>
            </div>

            {/* US ZIP Code Shipping Estimator */}
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-200">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Estimate USA Delivery Date</span>
              </div>
              <form onSubmit={handleZipCheck} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter 5-digit US ZIP (e.g. 90210, 10001)"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 focus:border-amber-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-amber-400 hover:text-zinc-950 text-zinc-200 text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Calculate
                </button>
              </form>
              {shippingResult && (
                <p className="text-xs text-amber-400 font-medium pt-1">
                  {shippingResult}
                </p>
              )}
            </div>
          </div>

          {/* Right: Purchasing Details, Pricing, Bulk Tiers & Action CTAs */}
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
                  {selectedProduct.reviewCount + customReviews.length - 3} verified contractor ratings
                </span>
                <span className="text-zinc-500">•</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> In Stock ({selectedProduct.stockCount} in USA)
                </span>
              </div>
            </div>

            {/* Price section */}
            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-black text-amber-400 font-display">
                      ${currentUnitTierPrice.toFixed(2)}
                    </span>
                    {hasDiscount && (
                      <>
                        <span className="text-base text-zinc-500 line-through">
                          ${selectedProduct.originalPrice?.toFixed(2)}
                        </span>
                        <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/30">
                          Save ${discountAmount} ({discountPercent}% OFF)
                        </span>
                      </>
                    )}
                  </div>
                  {quantity > 1 && (
                    <div className="text-xs text-zinc-400 mt-1">
                      Line Total: <span className="font-bold text-amber-400">${totalLinePrice}</span> for {quantity} units
                    </div>
                  )}
                </div>
              </div>

              {/* Contractor Bulk Tier Table */}
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
                <div className="text-[11px] font-black uppercase text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Pro Contractor Bulk Savings Tier:</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                  <div className={`p-1.5 rounded border ${quantity >= 2 && quantity < 5 ? 'bg-amber-400/10 border-amber-400 text-amber-400 font-bold' : 'bg-zinc-900 border-zinc-800 text-zinc-400'}`}>
                    <div>Buy 2-4</div>
                    <div className="text-emerald-400 font-extrabold">Save 5%</div>
                  </div>
                  <div className={`p-1.5 rounded border ${quantity >= 5 && quantity < 10 ? 'bg-amber-400/10 border-amber-400 text-amber-400 font-bold' : 'bg-zinc-900 border-zinc-800 text-zinc-400'}`}>
                    <div>Buy 5-9</div>
                    <div className="text-emerald-400 font-extrabold">Save 10%</div>
                  </div>
                  <div className={`p-1.5 rounded border ${quantity >= 10 ? 'bg-amber-400/10 border-amber-400 text-amber-400 font-bold' : 'bg-zinc-900 border-zinc-800 text-zinc-400'}`}>
                    <div>Buy 10+</div>
                    <div className="text-emerald-400 font-extrabold">Save 15%</div>
                  </div>
                </div>
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
                    className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 cursor-pointer"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-xs font-bold text-zinc-100">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(selectedProduct.stockCount, q + 1))}
                    className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Primary Add to Cart & Buy Now Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => addToCart(selectedProduct, quantity)}
                  className="w-full py-4 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 transition-all active:scale-98 cursor-pointer"
                  id="pdp-add-to-cart-btn"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full py-4 px-4 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer shadow-lg"
                  id="pdp-buy-now-btn"
                >
                  <Zap className="w-4 h-4 fill-zinc-950" />
                  <span>Buy Now (Instant Checkout)</span>
                </button>
              </div>

              {/* Secondary Actions: Wishlist + Compare Specs */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => toggleWishlist(selectedProduct.id)}
                  className={`py-2.5 px-3 rounded-lg border text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                    wish
                      ? 'bg-amber-400/15 border-amber-400/40 text-amber-400'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${wish ? 'fill-amber-400 text-amber-400' : ''}`} />
                  <span>{wish ? 'Saved' : 'Wishlist'}</span>
                </button>

                <button
                  onClick={() => {
                    toggleCompare(selectedProduct.id);
                  }}
                  className={`py-2.5 px-3 rounded-lg border text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                    isInCompare(selectedProduct.id)
                      ? 'bg-amber-400/15 border-amber-400/40 text-amber-400'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  <Scale className="w-4 h-4" />
                  <span>{isInCompare(selectedProduct.id) ? 'Comparing' : 'Compare'}</span>
                </button>
              </div>
            </div>

            {/* Quick Contractor Inquiries */}
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-xs text-zinc-400 space-y-1.5">
              <div className="font-bold text-zinc-200 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-amber-400" />
                <span>Need Contractor Assistance or Bulk Lot Pricing?</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Contact our customer support desk at{' '}
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

        {/* Detailed Multi-Section Tabs */}
        <div className="border-t border-zinc-800 pt-10">
          {/* Tab Buttons */}
          <div className="flex border-b border-zinc-800 gap-2 sm:gap-6 overflow-x-auto pb-1">
            {[
              { id: 'overview', label: 'Product Overview' },
              { id: 'features', label: `Key Features (${selectedProduct.features.length})` },
              { id: 'specs', label: 'Technical Specs' },
              { id: 'included', label: `What's Included (${selectedProduct.included.length})` },
              { id: 'battery', label: 'Battery Compatibility' },
              { id: 'reviews', label: `Contractor Reviews (${customReviews.length})` },
              { id: 'warranty', label: 'Warranty & Service' },
              { id: 'faq', label: 'Tech FAQs' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'text-amber-400 border-b-2 border-amber-400'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="py-8">
            {/* 1. Overview */}
            {activeTab === 'overview' && (
              <div className="max-w-4xl space-y-6 text-sm text-zinc-300 leading-relaxed">
                <div>
                  <h3 className="text-lg font-bold text-zinc-100 font-display">
                    About {selectedProduct.name}
                  </h3>
                  <p className="mt-2 text-zinc-300">{selectedProduct.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                    <div className="font-bold text-amber-400 text-xs flex items-center gap-1.5">
                      <Zap className="w-4 h-4" />
                      <span>XR Brushless Motor Efficiency</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Equipped with high-output brushless motor architecture providing up to 57% more runtime over standard brushed alternatives while generating minimal thermal buildup under heavy load.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                    <div className="font-bold text-emerald-400 text-xs flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Contractor Quality Assurance</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Every tool features all-metal transmission gears, rugged jobsite housing, and sealed electronic control modules for enduring reliability in dust, moisture, and extreme temperatures.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Key Features */}
            {activeTab === 'features' && (
              <div className="max-w-4xl space-y-4">
                <h3 className="text-lg font-bold text-zinc-100 font-display">
                  Engineered Professional Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedProduct.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-200"
                    >
                      <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Specifications Table */}
            {activeTab === 'specs' && (
              <div className="max-w-3xl space-y-4">
                <h3 className="text-lg font-bold text-zinc-100 font-display">
                  Technical Specifications
                </h3>
                <div className="rounded-xl border border-zinc-800 overflow-hidden shadow-lg">
                  <table className="w-full text-xs text-left">
                    <tbody className="divide-y divide-zinc-800">
                      <tr className="bg-zinc-900/90">
                        <td className="p-3.5 font-bold text-zinc-400 w-1/3">Brand</td>
                        <td className="p-3.5 text-amber-400 font-black">{selectedProduct.brand}</td>
                      </tr>
                      <tr className="bg-zinc-950">
                        <td className="p-3.5 font-bold text-zinc-400">Model / SKU</td>
                        <td className="p-3.5 text-zinc-200 font-mono font-bold">{selectedProduct.modelSku}</td>
                      </tr>
                      {selectedProduct.voltage && (
                        <tr className="bg-zinc-900/50">
                          <td className="p-3.5 font-bold text-zinc-400">Voltage Platform</td>
                          <td className="p-3.5 text-zinc-200">{selectedProduct.voltage}</td>
                        </tr>
                      )}
                      <tr className="bg-zinc-950">
                        <td className="p-3.5 font-bold text-zinc-400">Tool Type</td>
                        <td className="p-3.5 text-zinc-200">{selectedProduct.toolType}</td>
                      </tr>
                      {Object.entries(selectedProduct.specifications).map(([key, val], i) => (
                        <tr key={key} className={i % 2 === 0 ? 'bg-zinc-900/50' : 'bg-zinc-950'}>
                          <td className="p-3.5 font-bold text-zinc-400">{key}</td>
                          <td className="p-3.5 text-zinc-200 font-medium">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 4. What's Included */}
            {activeTab === 'included' && (
              <div className="max-w-3xl space-y-4">
                <h3 className="text-lg font-bold text-zinc-100 font-display">
                  What's in the Box
                </h3>
                <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-3">
                  {selectedProduct.included.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs text-zinc-200">
                      <div className="w-7 h-7 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0">
                        <Package className="w-3.5 h-3.5 text-amber-400" />
                      </div>
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Battery Compatibility */}
            {activeTab === 'battery' && (
              <div className="max-w-3xl space-y-4">
                <h3 className="text-lg font-bold text-zinc-100 font-display">
                  Battery & Ecosystem Compatibility
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                    <div className="flex items-center gap-2 text-amber-400 font-bold">
                      <BatteryCharging className="w-4 h-4" />
                      <span>20V MAX Lithium-Ion</span>
                    </div>
                    <p className="text-zinc-400">
                      Compatible with DCB200, DCB203 (2.0Ah), DCB204 (4.0Ah), DCB205 (5.0Ah), and DCB206 (6.0Ah) packs.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                    <div className="flex items-center gap-2 text-amber-400 font-bold">
                      <Zap className="w-4 h-4" />
                      <span>60V FLEXVOLT</span>
                    </div>
                    <p className="text-zinc-400">
                      Auto-switches voltage when paired with DCB606, DCB609, or DCB612 packs for maximum power output.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                    <div className="flex items-center gap-2 text-amber-400 font-bold">
                      <Sparkles className="w-4 h-4" />
                      <span>POWERSTACK Pouch</span>
                    </div>
                    <p className="text-zinc-400">
                      Compatible with next-gen stacked pouch cell batteries (DCBP034, DCBP520) for 50% more power in 25% more compact size.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 6. Reviews */}
            {activeTab === 'reviews' && (
              <div className="max-w-4xl space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-100 font-display">
                      Verified Contractor Reviews
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-sm font-bold text-zinc-100">{selectedProduct.rating.toFixed(1)} out of 5</span>
                      <span className="text-xs text-zinc-400">({selectedProduct.reviewCount + customReviews.length - 3} ratings)</span>
                    </div>
                  </div>
                </div>

                {/* Review Cards */}
                <div className="space-y-4">
                  {customReviews.map((rev, idx) => (
                    <div key={idx} className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-zinc-100">{rev.name}</span>
                          <span className="text-zinc-500">•</span>
                          <span className="text-amber-400 font-semibold">{rev.trade}</span>
                        </div>
                        <span className="text-zinc-500 text-[11px]">{rev.date}</span>
                      </div>
                      <div className="flex text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed pt-1">
                        "{rev.comment}"
                      </p>
                    </div>
                  ))}
                </div>

                {/* Write Review Form */}
                <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
                  <h4 className="text-sm font-bold text-zinc-100 uppercase tracking-wider flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-amber-400" />
                    <span>Submit Contractor Feedback</span>
                  </h4>
                  <form onSubmit={handleAddReview} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Your Name (e.g. John D.)"
                        required
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                        className="px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 focus:border-amber-400 focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Your Trade/Location (e.g. Commercial Electrician - FL)"
                        value={reviewTrade}
                        onChange={(e) => setReviewTrade(e.target.value)}
                        className="px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-300">
                      <span>Rating:</span>
                      <select
                        value={reviewRating}
                        onChange={(e) => setReviewRating(Number(e.target.value))}
                        className="px-2 py-1 rounded bg-zinc-950 border border-zinc-800 text-amber-400 font-bold"
                      >
                        <option value={5}>5 Stars - Excellent Pro Tool</option>
                        <option value={4}>4 Stars - Great Performance</option>
                        <option value={3}>3 Stars - Average</option>
                      </select>
                    </div>
                    <textarea
                      placeholder="Write your jobsite experience with this tool..."
                      rows={3}
                      required
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 focus:border-amber-400 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Post Review
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* 7. Warranty & Service */}
            {activeTab === 'warranty' && (
              <div className="max-w-3xl space-y-4 text-xs text-zinc-300 leading-relaxed">
                <h3 className="text-lg font-bold text-zinc-100 font-display">
                  MA CONSIDER Pro Protection & Warranty
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                    <div className="text-amber-400 font-black text-sm">3-YEAR LIMITED</div>
                    <p className="text-zinc-400">
                      Full coverage against defects in materials or factory craftsmanship on the tool housing, motor, and gear assembly.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                    <div className="text-amber-400 font-black text-sm">1-YEAR FREE SERVICE</div>
                    <p className="text-zinc-400">
                      Free maintenance and replacement of worn parts caused by normal wear and tear through authorized USA service centers.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                    <div className="text-emerald-400 font-black text-sm">90-DAY MONEY BACK</div>
                    <p className="text-zinc-400">
                      If you are not completely satisfied with the tool performance on your jobs, return within 90 days for a refund.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 8. FAQs */}
            {activeTab === 'faq' && (
              <div className="max-w-3xl space-y-4">
                <h3 className="text-lg font-bold text-zinc-100 font-display mb-4">
                  Frequently Asked Technical Questions
                </h3>
                <div className="space-y-3">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                      <div className="text-xs font-bold text-amber-400 flex items-center gap-2">
                        <HelpCircle className="w-3.5 h-3.5 shrink-0" />
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
          <div className="border-t border-zinc-800 pt-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-black text-zinc-100 font-display">
                  Related Equipment & Systems
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Frequently paired tools and compatible accessories.
                </p>
              </div>
              <button
                onClick={() => navigateTo('shop')}
                className="text-xs font-bold text-amber-400 hover:underline"
              >
                View Full Catalog
              </button>
            </div>
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
