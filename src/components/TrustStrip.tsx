import React from 'react';
import { Wrench, CheckCircle, Truck, HeadphonesIcon, ShieldCheck } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const trustItems = [
    {
      icon: Wrench,
      title: 'Professional-Grade Tools',
      description: 'Heavy-duty cordless power tools & equipment engineered for tradespeople, contractors, and serious DIY.'
    },
    {
      icon: CheckCircle,
      title: 'Quality Products',
      description: 'Carefully curated MA CONSIDER tools, authentic model numbers, brushless motors, and verified accessories.'
    },
    {
      icon: Truck,
      title: 'USA-Focused Shopping',
      description: 'Dedicated shipping across all 50 US States with expedited fulfillment options and real-time tracking.'
    },
    {
      icon: HeadphonesIcon,
      title: 'Reliable Customer Support',
      description: 'Direct contact via phone & email to help with tool inquiries, bulk contractor orders, and tracking.'
    }
  ];

  return (
    <section className="bg-zinc-900/90 border-b border-zinc-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 hover:border-amber-400/40 transition-colors group"
              >
                <div className="w-11 h-11 rounded-lg bg-amber-400/10 border border-amber-400/25 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5 text-amber-400" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-zinc-100 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
