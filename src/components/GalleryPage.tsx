import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Image as ImageIcon,
  ZoomIn,
  X,
  ExternalLink,
  ChevronRight,
  Sparkles,
  SlidersHorizontal,
  HardHat,
  Zap,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { MABadge } from './MABadge';

interface GalleryItem {
  id: string;
  title: string;
  category: 'all' | 'drills' | 'impacts' | 'saws' | 'workshop' | 'batteries';
  categoryLabel: string;
  image: string;
  imageSlotId?: number;
  modelSku: string;
  spec: string;
  description: string;
  featured?: boolean;
}

export const GalleryPage: React.FC = () => {
  const { navigateTo, getImageUrl, setIsImageManagerOpen, products } = useStore();
  const [activeFilter, setActiveFilter] = useState<'all' | 'drills' | 'impacts' | 'saws' | 'workshop' | 'batteries'>('all');
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'gal-1',
      title: 'MA CONSIDER 20V MAX XR 3-Speed Hammerdrill',
      category: 'drills',
      categoryLabel: 'Cordless Drills',
      image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1200&q=80',
      imageSlotId: 1,
      modelSku: 'DCD996B',
      spec: '20V MAX • 0-2,000 RPM • 820 UWO',
      description: 'High-performance brushless motor delivering 820 Unit Watts Out (UWO) for demanding masonry and structural framing jobs.',
      featured: true
    },
    {
      id: 'gal-2',
      title: 'MA CONSIDER 20V 1/4" Brushless 3-Speed Impact Driver',
      category: 'impacts',
      categoryLabel: 'Impact Drivers',
      image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=1200&q=80',
      imageSlotId: 2,
      modelSku: 'DCF887B',
      spec: '20V MAX • 1,825 in-lbs Torque • 3,250 RPM',
      description: 'Precision drive mode prevents overtightening on cabinet installation and heavy timber structural screws.',
      featured: true
    },
    {
      id: 'gal-3',
      title: 'MA CONSIDER 20V 7-1/4" Circular Saw With Brake',
      category: 'saws',
      categoryLabel: 'Saws & Cutting',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      imageSlotId: 3,
      modelSku: 'DCS570B',
      spec: '20V MAX • 5,500 RPM • 2-9/16" Cut Depth',
      description: 'Delivers 5500 RPM to power through stacked 2x4s and dense plywood decking with electronic blade brake.',
      featured: true
    },
    {
      id: 'gal-4',
      title: 'MA CONSIDER 20V 4-1/2" - 5" Brushless Paddle Grinder',
      category: 'workshop',
      categoryLabel: 'Workshop & Cutting',
      image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
      imageSlotId: 4,
      modelSku: 'DCG413B',
      spec: '20V MAX • 9,000 RPM • Kickback Brake',
      description: 'E-Clutch and Kickback Brake stops the wheel in under 2 seconds when a pinch or bind-up is detected.',
      featured: false
    },
    {
      id: 'gal-5',
      title: 'MA CONSIDER 20V MAX Lithium 5.0Ah High Capacity Pack',
      category: 'batteries',
      categoryLabel: 'Batteries & Power',
      image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80',
      imageSlotId: 5,
      modelSku: 'DCB205-2',
      spec: '20V 5.0Ah • 3-LED Fuel Gauge • Premium Cells',
      description: 'High capacity lithium-ion chemistry providing up to 60% more runtime per charge under heavy contractor workload.',
      featured: false
    },
    {
      id: 'gal-6',
      title: 'MA CONSIDER Atomic 20V Compact 1/2" Drill/Driver',
      category: 'drills',
      categoryLabel: 'Cordless Drills',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      imageSlotId: 6,
      modelSku: 'DCD708C2',
      spec: '20V MAX • 6.3" Compact Head • 340 UWO',
      description: 'Engineered for overhead HVAC work, tight electrical stud bays, and finish carpentry.',
      featured: false
    },
    {
      id: 'gal-7',
      title: 'MA CONSIDER 20V XR Reciprocating Saw',
      category: 'saws',
      categoryLabel: 'Saws & Cutting',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      imageSlotId: 7,
      modelSku: 'DCS367B',
      spec: '20V MAX • 0-2,900 SPM • 4-Position Clamp',
      description: 'Keyless 4-position blade clamp allows for flush cutting and improved versatility in plumbing cutouts.',
      featured: true
    },
    {
      id: 'gal-8',
      title: 'MA CONSIDER 20V 1/2" High Torque Impact Wrench',
      category: 'impacts',
      categoryLabel: 'Impact Drivers',
      image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1200&q=80',
      imageSlotId: 8,
      modelSku: 'DCF899B',
      spec: '20V MAX • 700 ft-lbs Torque • 1,200 Breakaway',
      description: 'Massive torque output designed for structural steel bolting, heavy automotive, and diesel equipment maintenance.',
      featured: true
    },
    {
      id: 'gal-9',
      title: 'MA CONSIDER ToughSystem 2.0 Mobile Tool Storage Cart',
      category: 'workshop',
      categoryLabel: 'Workshop & Storage',
      image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=1200&q=80',
      imageSlotId: 9,
      modelSku: 'DWST08450',
      spec: 'IP65 Dust & Water Seal • 8" All-Terrain Wheels',
      description: 'Rugged modular jobsite box system with heavy-duty metal latches and reinforced padlock eyelets.',
      featured: false
    }
  ];

  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <div className="bg-zinc-950 min-h-screen py-12 px-4 sm:px-6 lg:px-8 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Gallery Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <BrandLogo size="lg" variant="stacked" className="mx-auto" />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider mt-2">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Equipment & Jobsite Showcase</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-100 font-display tracking-tight">
            MA CONSIDER Visual Tool Gallery
          </h1>
          <p className="text-base text-zinc-400 leading-relaxed">
            Explore our professional lineup of 20V MAX cordless tools, brushless motors, heavy-duty attachments, and real jobsite setups in high resolution.
          </p>

          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={() => setIsImageManagerOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-amber-400/40 text-amber-400 hover:bg-amber-400 hover:text-zinc-950 text-xs font-bold transition-all cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Customize with 10 Image Slots</span>
            </button>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-zinc-800 pb-4">
          {[
            { key: 'all', label: 'All Equipment' },
            { key: 'drills', label: 'Cordless Drills' },
            { key: 'impacts', label: 'Impact Drivers' },
            { key: 'saws', label: 'Saws & Cutting' },
            { key: 'workshop', label: 'Workshop & Storage' },
            { key: 'batteries', label: 'Batteries & Chargers' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key as any)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === tab.key
                  ? 'bg-amber-400 text-zinc-950 shadow-md shadow-amber-400/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const displayImg = getImageUrl(item.imageSlotId, item.image);

            return (
              <div
                key={item.id}
                onClick={() => setActiveLightbox(item)}
                className="group relative rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden hover:border-amber-400/50 transition-all duration-300 shadow-xl cursor-pointer flex flex-col"
              >
                {/* Image Container with Brightness & Crisp Filters */}
                <div className="relative aspect-4/3 w-full bg-zinc-950 overflow-hidden">
                  <img
                    src={displayImg}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-105 contrast-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <MABadge size="sm" variant="gold" />
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-zinc-950/80 text-amber-400 border border-amber-400/30">
                      {item.categoryLabel}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="p-2 rounded-full bg-zinc-950/90 text-amber-400 border border-amber-400/40 backdrop-blur-md">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>

                  {/* SKU & Short Specs Bottom Overlay */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[11px] font-mono text-amber-400 font-bold block">
                      {item.modelSku}
                    </span>
                    <h3 className="text-sm font-bold text-zinc-100 font-display leading-tight truncate">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3 bg-zinc-900/90">
                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>

                  <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                    <span className="font-mono text-[11px] text-zinc-300 font-semibold">
                      {item.spec}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Find matching product or navigate to shop
                        const match = products.find(p => p.modelSku === item.modelSku || p.name.includes(item.modelSku));
                        if (match) {
                          navigateTo('product-detail', undefined, match);
                        } else {
                          navigateTo('shop');
                        }
                      }}
                      className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Tool</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contractor Image Slots Callout */}
        <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-left">
            <h3 className="text-lg font-bold text-zinc-100 font-display flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Customize This Gallery With Your Real Tool Photos</span>
            </h3>
            <p className="text-xs text-zinc-400 max-w-xl">
              Use the built-in 10-slot Image Manager to upload or paste your custom jobsite photos, workshop builds, and equipment images directly into the gallery.
            </p>
          </div>

          <button
            onClick={() => setIsImageManagerOpen(true)}
            className="px-6 py-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider shrink-0 flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-400/20"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Open Image Manager</span>
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div
          onClick={() => setActiveLightbox(null)}
          className="fixed inset-0 z-50 bg-zinc-950/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl space-y-0"
          >
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-zinc-950/80 text-zinc-300 hover:text-amber-400 border border-zinc-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-16/10 w-full bg-zinc-950">
              <img
                src={getImageUrl(activeLightbox.imageSlotId, activeLightbox.image)}
                alt={activeLightbox.title}
                className="w-full h-full object-contain p-4"
              />
            </div>

            <div className="p-6 bg-zinc-900 border-t border-zinc-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <MABadge size="sm" variant="gold" />
                    <span className="text-xs font-mono font-bold text-amber-400">
                      {activeLightbox.modelSku}
                    </span>
                    <span className="text-zinc-600">•</span>
                    <span className="text-xs text-zinc-400">{activeLightbox.categoryLabel}</span>
                  </div>
                  <h3 className="text-xl font-bold text-zinc-100 font-display">
                    {activeLightbox.title}
                  </h3>
                </div>

                <button
                  onClick={() => {
                    const match = products.find(p => p.modelSku === activeLightbox.modelSku || p.name.includes(activeLightbox.modelSku));
                    setActiveLightbox(null);
                    if (match) {
                      navigateTo('product-detail', undefined, match);
                    } else {
                      navigateTo('shop');
                    }
                  }}
                  className="px-5 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 self-start sm:self-auto cursor-pointer"
                >
                  <span>View in Catalog</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">
                {activeLightbox.description}
              </p>

              <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-between text-xs">
                <span className="text-zinc-400 font-semibold">Technical Specifications:</span>
                <span className="text-amber-400 font-mono font-bold">{activeLightbox.spec}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
