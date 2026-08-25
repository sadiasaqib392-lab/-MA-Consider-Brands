import React from 'react';
import {
  CheckCircle2,
  PackageCheck,
  ShieldAlert,
  Smartphone,
  Headphones,
  Lock,
  Flag
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: PackageCheck,
      title: 'Carefully Selected Tool Products',
      description: 'We curate high-demand, reliable MA CONSIDER power tools and accessories with verified manufacturer part numbers and specifications.'
    },
    {
      icon: CheckCircle2,
      title: 'Professional-Focused Selection',
      description: 'Engineered specifically to fulfill the demanding requirements of commercial trades, builders, mechanics, and serious DIY hobbyists.'
    },
    {
      icon: Smartphone,
      title: 'Easy Online Shopping',
      description: 'Intuitive tool filters by voltage, category, and model number, with fast 1-click cart management and transparent pricing.'
    },
    {
      icon: Headphones,
      title: 'Responsive Customer Support',
      description: 'Direct phone and email contact channels for order inquiries, tool compatibility questions, and contractor quotes.'
    },
    {
      icon: Lock,
      title: 'Secure Checkout',
      description: 'Encrypted order processing protecting your billing and payment information through standardized modern security protocols.'
    },
    {
      icon: Flag,
      title: 'USA Customer Focus',
      description: 'Dedicated to serving customers across the United States with tracked courier fulfillment and direct customer service.'
    }
  ];

  return (
    <section className="py-16 bg-zinc-950 px-4 sm:px-6 lg:px-8 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Contractor Trust & Reliability
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 font-display tracking-tight mt-1.5">
            Why Shop MA Consider Brands?
          </h2>
          <p className="text-sm text-zinc-400 mt-2">
            Built on a commitment to dependable contractor equipment, transparent service, and American jobsite reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl bg-zinc-900/80 border border-zinc-800/80 hover:border-amber-400/40 transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-amber-400/10 border border-amber-400/25 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6 text-amber-400" />
                  </div>
                  <h3 className="text-base font-bold text-zinc-100 mb-2 font-display">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center text-[11px] font-semibold text-zinc-500 group-hover:text-amber-400 transition-colors">
                  <span>Pillar 0{idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
