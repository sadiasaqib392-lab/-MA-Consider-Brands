import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, ChevronLeft, ChevronRight, Zap, ShieldCheck, Award, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MABadge } from './MABadge';

export const Hero: React.FC = () => {
  const { navigateTo, getImageUrl, products } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Slides configuration with imageSlotId, title, short subtitle, and model
  const slides = [
    {
      slotId: 2,
      model: 'DCD996B',
      tag: '20V MAX XR BRUSHLESS',
      title: '3-Speed Hammer Drill',
      spec: '820 UWO Max Power • 38,250 BPM',
      price: '$159.00',
      productId: 'dcd996b-hammer-drill'
    },
    {
      slotId: 3,
      model: 'DCF887B',
      tag: 'PRECISION DRIVE 3-SPEED',
      title: '1/4" Hex Impact Driver',
      spec: '1,825 in-lbs Torque • 3,250 RPM',
      price: '$129.00',
      productId: 'dcf887b-impact-driver'
    },
    {
      slotId: 4,
      model: 'DCS570B',
      tag: '7-1/4" CORDLESS CIRCULAR',
      title: 'XR Heavy-Duty Circular Saw',
      spec: '5,500 RPM • 2-9/16" Cut Depth at 90°',
      price: '$189.00',
      productId: 'dcs570b-circular-saw'
    },
    {
      slotId: 5,
      model: 'DCG413B',
      tag: 'KICKBACK BRAKE SYSTEM',
      title: '4-1/2" Paddle Angle Grinder',
      spec: '9,000 RPM • E-Clutch & Brake < 2s',
      price: '$169.00',
      productId: 'dcg413b-angle-grinder'
    },
    {
      slotId: 7,
      model: 'DCK280C2',
      tag: 'PRO CONTRACTOR VALUE',
      title: '2-Tool Cordless Combo Kit',
      spec: 'Drill + Driver + 2x Batteries + Bag',
      price: '$229.00',
      productId: 'dck280c2-combo-kit'
    },
    {
      slotId: 6,
      model: 'DCB205-2',
      tag: 'EXTENDED RUNTIME XR',
      title: '5.0Ah Lithium Battery 2-Pack',
      spec: 'Fuel Gauge LED • Zero Memory Effect',
      price: '$149.00',
      productId: 'dcb205-2-battery-pack'
    },
    {
      slotId: 8,
      model: 'DWE7491RS',
      tag: 'SITE-PRO 10" TABLE SAW',
      title: 'Jobsite Table Saw & Rolling Stand',
      spec: '32-1/2" Rip Capacity • Rack & Pinion',
      price: '$599.00',
      productId: 'dwe7491rs-table-saw'
    },
    {
      slotId: 10,
      model: 'DWST08165',
      tag: 'TOUGHSYSTEM 2.0',
      title: 'Extra Large Modular Storage',
      spec: 'IP65 Water/Dust Sealed • Heavy Duty',
      price: '$89.00',
      productId: 'dwst08165-toughsystem-box'
    }
  ];

  // 1.5-second automatic rotation
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 1500); // 1.5 sec as requested

    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const activeSlideData = slides[currentSlide];
  const activeImage = getImageUrl(activeSlideData.slotId);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleSlideSelect = (idx: number) => {
    setCurrentSlide(idx);
  };

  const handleSlideProductClick = () => {
    const prod = products.find((p) => p.id === activeSlideData.productId);
    if (prod) {
      navigateTo('product-detail', undefined, prod);
    } else {
      navigateTo('shop');
    }
  };

  return (
    <div
      className="relative overflow-hidden bg-zinc-950 border-b border-zinc-800"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Graphic with Enhanced Brightness & Clarity */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-zinc-950/30 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-15 z-10"
          style={{
            backgroundImage: `radial-gradient(#f59e0b 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />
        {/* Active Slide Background glow effect */}
        <AnimatePresence mode="wait">
          <motion.img
            key={currentSlide}
            src={activeImage}
            alt={activeSlideData.title}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.35, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-cover object-center filter brightness-125 contrast-110"
          />
        </AnimatePresence>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Concise, High-Impact Top Copy */}
          <div className="lg:col-span-6 space-y-4 text-left">
            {/* Top Compact Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-400/15 border border-amber-400/40 text-amber-400 text-xs font-black uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>MA CONSIDER • PRO TOOLS STORE</span>
            </div>

            {/* Concise, Powerful Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-100 tracking-tight leading-[1.1] font-display">
              MA CONSIDER{' '}
              <span className="text-amber-400 block drop-shadow-sm">
                HEAVY-DUTY PRO TOOLS
              </span>
            </h1>

            {/* Concise 1-sentence tagline */}
            <p className="text-sm sm:text-base text-zinc-300 max-w-xl font-medium leading-normal">
              High-performance cordless tools, brushless power equipment, and modular storage built for contractors across the USA.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => navigateTo('shop')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black text-xs uppercase tracking-wider transition-all duration-150 shadow-lg shadow-amber-400/25 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                id="hero-shop-all-tools-btn"
              >
                <span>Shop All Tools</span>
                <ArrowRight className="w-4 h-4 text-zinc-950" />
              </button>

              <button
                onClick={() => navigateTo('deals')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-amber-400 hover:text-amber-300 font-bold text-xs border border-amber-400/30 hover:border-amber-400/60 transition-all cursor-pointer"
                id="hero-deals-btn"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Deals & Specials</span>
              </button>

              <button
                onClick={() => navigateTo('categories')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white font-bold text-xs border border-zinc-700 transition-all cursor-pointer"
                id="hero-categories-btn"
              >
                <span>Categories</span>
              </button>
            </div>

            {/* Compact Trust Badges */}
            <div className="pt-4 border-t border-zinc-800/80 flex items-center gap-6 text-xs text-zinc-400">
              <div className="flex items-center gap-1.5 font-bold text-zinc-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Authentic MA</span>
              </div>
              <div className="flex items-center gap-1.5 font-bold text-zinc-200">
                <Award className="w-4 h-4 text-amber-400" />
                <span>USA Fast Fulfillment</span>
              </div>
              <div className="flex items-center gap-1.5 font-bold text-zinc-200">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>20V MAX XR</span>
              </div>
            </div>
          </div>

          {/* Right: Dynamic 1.5s Slider Card Showcase with Bright Image & "MA" Brand Badge */}
          <div className="lg:col-span-6">
            <div className="relative p-5 sm:p-6 rounded-2xl bg-zinc-900/95 border border-zinc-800 shadow-2xl overflow-hidden backdrop-blur-sm">
              {/* Slider Header Control */}
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                  <span className="font-extrabold uppercase tracking-wider text-zinc-200">
                    Featured Pro Tool (1.5s Carousel)
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-zinc-400 font-mono">
                  <span className="text-amber-400 font-bold">{currentSlide + 1}</span>
                  <span>/</span>
                  <span>{slides.length}</span>
                </div>
              </div>

              {/* Slide Image Box with Prominent "MA" Badge & Bright Clear Visual */}
              <div
                onClick={handleSlideProductClick}
                className="relative my-4 aspect-[16/10] w-full rounded-xl bg-zinc-950 p-4 border border-zinc-800 flex items-center justify-center overflow-hidden cursor-pointer group shadow-inner"
              >
                {/* MA Brand Badge Overlay on top of image */}
                <MABadge size="md" variant="amber" position="top-left" />

                {/* SKU / Tag Badge */}
                <span className="absolute top-3 right-3 z-10 bg-zinc-900/90 text-amber-400 text-[11px] font-black px-2.5 py-1 rounded border border-zinc-700 shadow">
                  {activeSlideData.model}
                </span>

                {/* Bright, high-contrast tool image with 1.5s transition */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentSlide}
                    src={activeImage}
                    alt={activeSlideData.title}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="h-full w-full object-contain filter brightness-110 contrast-105 group-hover:scale-105 transition-transform duration-300"
                  />
                </AnimatePresence>

                {/* Prev & Next Arrow Controls */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 hover:text-amber-400 border border-zinc-700 backdrop-blur-sm transition-all cursor-pointer shadow-md"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 hover:text-amber-400 border border-zinc-700 backdrop-blur-sm transition-all cursor-pointer shadow-md"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Slide Meta Info & Fast Buy CTA */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                      {activeSlideData.tag}
                    </span>
                    <h3
                      onClick={handleSlideProductClick}
                      className="text-base sm:text-lg font-extrabold text-zinc-100 hover:text-amber-400 transition-colors cursor-pointer mt-1"
                    >
                      MA CONSIDER {activeSlideData.title}
                    </h3>
                    <p className="text-xs text-zinc-400 font-medium mt-0.5">
                      {activeSlideData.spec}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xl sm:text-2xl font-black text-amber-400 font-display">
                      {activeSlideData.price}
                    </span>
                    <span className="block text-[10px] text-emerald-400 font-bold">
                      In Stock • US Hub
                    </span>
                  </div>
                </div>

                {/* Slide Indicators / Dots */}
                <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                  <div className="flex gap-1.5">
                    {slides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSlideSelect(idx)}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          currentSlide === idx
                            ? 'w-6 bg-amber-400'
                            : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleSlideProductClick}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <span>View Product Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
