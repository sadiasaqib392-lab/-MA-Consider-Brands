import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  Phone,
  Mail,
  Globe,
  ShieldCheck,
  Truck,
  RotateCcw,
  SlidersHorizontal,
  Lock,
  ChevronRight,
  HardHat,
  Award
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  const { navigateTo, setActivePolicyModal, setIsImageManagerOpen } = useStore();

  return (
    <footer className="bg-zinc-950 text-zinc-300 border-t border-zinc-800 text-xs">
      {/* Top Value Assurance Strip */}
      <div className="border-b border-zinc-800/80 py-8 px-4 sm:px-6 lg:px-8 bg-zinc-900/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/25 flex items-center justify-center text-amber-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-zinc-100">Free USA Shipping</div>
              <div className="text-zinc-500 text-[11px]">On contractor orders over $99</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/25 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-zinc-100">Genuine MA CONSIDER Tools</div>
              <div className="text-zinc-500 text-[11px]">Factory-verified model specifications</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/25 flex items-center justify-center text-amber-400 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-zinc-100">30-Day Returns</div>
              <div className="text-zinc-500 text-[11px]">Hassle-free return & refund window</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/25 flex items-center justify-center text-amber-400 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-zinc-100">256-Bit SSL Checkout</div>
              <div className="text-zinc-500 text-[11px]">Secure encrypted US payment gateway</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Brand & Store Info (Col 1 & 2) */}
        <div className="lg:col-span-2 space-y-4">
          <BrandLogo
            size="md"
            variant="full"
            onClick={() => navigateTo('home')}
          />

          <p className="text-zinc-400 text-xs leading-relaxed max-w-sm">
            Delivering high-performance, contractor-grade MA CONSIDER power tools, XR brushless kits, cordless saws, and lithium battery systems across the United States.
          </p>

          {/* Contact Details */}
          <div className="space-y-2 pt-2 text-xs">
            <a
              href="tel:+923155959375"
              className="flex items-center gap-2.5 text-zinc-300 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="font-mono font-bold">+92 315 5959375</span>
            </a>
            <a
              href="mailto:chabidjani06@gmail.com"
              className="flex items-center gap-2.5 text-zinc-300 hover:text-amber-400 transition-colors"
            >
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <span>chabidjani06@gmail.com</span>
            </a>
            <div className="flex items-center gap-2.5 text-zinc-400">
              <Globe className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Primary Market: United States of America</span>
            </div>
          </div>

          {/* Image Space Slot Trigger */}
          <div className="pt-2">
            <button
              onClick={() => setIsImageManagerOpen(true)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-amber-400/40 text-amber-400 hover:bg-amber-400 hover:text-zinc-950 text-xs font-bold transition-all"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>10 Image Slots Manager (Add Your Own Images)</span>
            </button>
          </div>
        </div>

        {/* Quick Navigation Links (Col 3) */}
        <div className="space-y-3">
          <h4 className="font-bold text-zinc-100 uppercase tracking-wider text-xs border-b border-zinc-800 pb-2">
            Store Navigation
          </h4>
          <ul className="space-y-2 text-zinc-400">
            <li>
              <button onClick={() => navigateTo('home')} className="hover:text-amber-400 transition-colors">
                Home
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('about')} className="hover:text-amber-400 transition-colors">
                About MA Consider Brands
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('services')} className="hover:text-amber-400 transition-colors">
                Contractor Services & Fleet
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('gallery')} className="hover:text-amber-400 transition-colors">
                Tool & Jobsite Gallery
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('contact')} className="hover:text-amber-400 transition-colors">
                Contact & Support Desk
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('shop')} className="hover:text-amber-400 transition-colors">
                Shop All Products Catalog
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('categories')} className="hover:text-amber-400 transition-colors">
                Tool Categories Explorer
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('deals')} className="hover:text-amber-400 transition-colors text-amber-400 font-bold">
                Exclusive Deals & Specials
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('compare')} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                <span>Compare Tools Specs</span>
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('wishlist')} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                <span>Saved Wishlist</span>
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('warranty')} className="hover:text-amber-400 transition-colors">
                3-Year Warranty & Service
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('pro-contractor')} className="hover:text-amber-400 transition-colors">
                Pro Contractor Quotes
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('track-order')} className="hover:text-amber-400 transition-colors">
                Track USA Shipment
              </button>
            </li>
          </ul>
        </div>

        {/* Popular Categories (Col 4) */}
        <div className="space-y-3">
          <h4 className="font-bold text-zinc-100 uppercase tracking-wider text-xs border-b border-zinc-800 pb-2">
            Tool Categories
          </h4>
          <ul className="space-y-2 text-zinc-400">
            {CATEGORIES.slice(0, 6).map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => navigateTo('shop', cat.slug)}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Policies & Payments (Col 5) */}
        <div className="space-y-3">
          <h4 className="font-bold text-zinc-100 uppercase tracking-wider text-xs border-b border-zinc-800 pb-2">
            Policies & Security
          </h4>
          <ul className="space-y-2 text-zinc-400">
            <li>
              <button onClick={() => setActivePolicyModal('shipping')} className="hover:text-amber-400 transition-colors">
                USA Shipping Policy
              </button>
            </li>
            <li>
              <button onClick={() => setActivePolicyModal('returns')} className="hover:text-amber-400 transition-colors">
                30-Day Return Policy
              </button>
            </li>
            <li>
              <button onClick={() => setActivePolicyModal('privacy')} className="hover:text-amber-400 transition-colors">
                Privacy Policy
              </button>
            </li>
            <li>
              <button onClick={() => setActivePolicyModal('terms')} className="hover:text-amber-400 transition-colors">
                Terms of Service
              </button>
            </li>
          </ul>

          <div className="pt-2">
            <span className="text-[11px] text-zinc-500 font-semibold uppercase block mb-2">
              Accepted US Payment Methods
            </span>
            <div className="flex flex-wrap gap-1.5 text-[10px] font-bold font-mono">
              <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">VISA</span>
              <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">MASTERCARD</span>
              <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">AMEX</span>
              <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">DISCOVER</span>
              <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-amber-400">APPLE PAY</span>
              <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-amber-400">GOOGLE PAY</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Disclaimer & Copyright */}
      <div className="border-t border-zinc-800 py-6 px-4 sm:px-6 lg:px-8 bg-zinc-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500 text-center md:text-left">
          <p>
            © {new Date().getFullYear()} MA Consider Brands. All Rights Reserved. Professional Tools & Power Equipment for the United States.
          </p>

          <p className="max-w-md text-zinc-600">
            MA Consider Brands is a premier online provider of heavy-duty professional tools, equipment, and accessories built for American jobsites.
          </p>
        </div>
      </div>
    </footer>
  );
};
