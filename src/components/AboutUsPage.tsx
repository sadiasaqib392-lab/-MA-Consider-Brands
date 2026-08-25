import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  Wrench,
  ShieldCheck,
  Truck,
  CheckCircle,
  Phone,
  Mail,
  ArrowRight,
  HardHat,
  Award
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export const AboutUsPage: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <div className="bg-zinc-950 min-h-screen py-12 px-4 sm:px-6 lg:px-8 border-b border-zinc-800">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Page Header */}
        <div className="text-center space-y-4 flex flex-col items-center">
          <BrandLogo size="lg" variant="stacked" />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider mt-2">
            <HardHat className="w-3.5 h-3.5" />
            <span>About MA Consider Brands</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-100 font-display tracking-tight">
            Built for Serious Work Across America
          </h1>
          <p className="text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Supplying dependable, professional-grade power tools, cordless equipment, and contractor accessories to tradespeople and DIYers nationwide.
          </p>
        </div>

        {/* Brand Mission Card */}
        <div className="p-8 sm:p-10 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-6 shadow-xl">
          <h2 className="text-2xl font-bold text-zinc-100 font-display">
            Our Purpose & Brand Focus
          </h2>
          <div className="space-y-4 text-sm text-zinc-300 leading-relaxed">
            <p>
              <strong>MA Consider Brands</strong> is an independent online retailer dedicated to supplying genuine, high-performance tools and power equipment. We focus primarily on contractor-favorite MA CONSIDER professional tools, providing tradespeople, carpenters, electricians, mechanics, and serious DIY builders with the tools they need to complete demanding jobs with precision.
            </p>
            <p>
              We understand that tool downtime costs time and money. That is why we specialize in proven, high-demand cordless platforms—such as 20V MAX XR brushless drills, high-torque impact drivers, circular saws, and long-lasting lithium battery systems.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-zinc-800">
            <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-1">
              <div className="text-xl font-black text-amber-400 font-display">USA FOCUSED</div>
              <div className="text-xs text-zinc-400">Nationwide courier delivery across all 50 states.</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-1">
              <div className="text-xl font-black text-zinc-100 font-display">AUTHENTICITY</div>
              <div className="text-xs text-zinc-400">Real models, genuine manufacturer specifications.</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-1">
              <div className="text-xl font-black text-amber-400 font-display">DIRECT SERVICE</div>
              <div className="text-xs text-zinc-400">Dedicated phone & email support for tool inquiries.</div>
            </div>
          </div>
        </div>

        {/* Core Principles */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-zinc-100 font-display text-center">
            Our Commitments to Customers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-2">
              <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/25 flex items-center justify-center text-amber-400 mb-3">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-zinc-100 font-display">Jobsite-Ready Equipment</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                We select power tools built to endure harsh conditions, drop impacts, and continuous high-load applications.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-2">
              <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/25 flex items-center justify-center text-amber-400 mb-3">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-zinc-100 font-display">Reliable Logistics</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Transparent order fulfillment with tracking numbers provided for every order so you know exactly when your equipment arrives.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-2">
              <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/25 flex items-center justify-center text-amber-400 mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-zinc-100 font-display">30-Day Return Window</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Shop with confidence. If a product does not match your project requirements, return it in original condition within 30 days.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-2">
              <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/25 flex items-center justify-center text-amber-400 mb-3">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-zinc-100 font-display">Human Customer Care</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Have questions regarding bit compatibility or battery runtimes? Reach us directly via phone or email for quick assistance.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Banner */}
        <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-left">
            <h3 className="text-lg font-bold text-zinc-100 font-display">
              Have Questions or Need a Commercial Quote?
            </h3>
            <div className="flex flex-wrap gap-4 text-xs text-zinc-400">
              <a href="tel:+923155959375" className="flex items-center gap-1.5 text-amber-400 hover:underline">
                <Phone className="w-3.5 h-3.5" />
                <span>+92 315 5959375</span>
              </a>
              <a href="mailto:chabidjani06@gmail.com" className="flex items-center gap-1.5 text-zinc-300 hover:underline">
                <Mail className="w-3.5 h-3.5" />
                <span>chabidjani06@gmail.com</span>
              </a>
            </div>
          </div>

          <button
            onClick={() => navigateTo('contact')}
            className="px-6 py-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Contact Us</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
