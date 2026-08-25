import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Wrench,
  ShieldCheck,
  Truck,
  HardHat,
  Gauge,
  BatteryCharging,
  Settings,
  Headphones,
  CheckCircle,
  ArrowRight,
  Clock,
  Award,
  FileCheck,
  Layers,
  Sparkles,
  Phone,
  Mail
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export const ServicesPage: React.FC = () => {
  const { navigateTo, showToast } = useStore();
  const [selectedService, setSelectedService] = useState<string>('fleet');
  const [rfqName, setRfqName] = useState('');
  const [rfqEmail, setRfqEmail] = useState('');
  const [rfqCompany, setRfqCompany] = useState('');
  const [rfqService, setRfqService] = useState('Contractor Fleet Outfitting');
  const [rfqNotes, setRfqNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRfqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rfqName || !rfqEmail) {
      showToast('Missing Fields', 'Please enter your name and contact email.', 'warning');
      return;
    }
    setIsSubmitted(true);
    showToast('Service Request Received', 'Our commercial service manager will contact you within 24 business hours.');
  };

  const servicesList = [
    {
      id: 'fleet',
      title: 'Contractor Fleet Outfitting',
      icon: HardHat,
      badge: 'Commercial',
      description: 'Customized high-volume tool packages for construction crews, electrical contractors, framing teams, and commercial workshops.',
      highlights: [
        'Custom 20V MAX XR cordless kits configured for your team size',
        'Tiered volume fleet pricing (up to 22% off MSRP)',
        'Unified battery ecosystems to eliminate jobsite charging chaos',
        'Standardized heavy-duty storage and organizational modules'
      ],
      turnaround: '2-3 Business Days'
    },
    {
      id: 'calibration',
      title: 'Tool Maintenance & Calibration',
      icon: Gauge,
      badge: 'Precision',
      description: 'Factory-grade torque calibration, brushless motor diagnostics, brush wear checks, and laser level accuracy alignments.',
      highlights: [
        'High-torque impact driver digital torque verification',
        'Laser level horizontal & vertical plane recalibration',
        'Motor commutator and cooling fan airflow cleaning',
        'Certified compliance paperwork for commercial inspections'
      ],
      turnaround: '3-5 Business Days'
    },
    {
      id: 'warranty',
      title: 'Warranty Support & Depot Repairs',
      icon: ShieldCheck,
      badge: 'Protection',
      description: 'Comprehensive 3-year warranty management, genuine OEM part replacements, and fast-track RMA repair tickets.',
      highlights: [
        'Dedicated nationwide USA authorized depot network',
        '100% genuine replacement switches, chucks, and housings',
        'Prepaid return shipping labels for verified warranty claims',
        '1-Year complimentary preventative service on all registered tools'
      ],
      turnaround: '48-Hour Priority RMA'
    },
    {
      id: 'battery',
      title: 'Battery Health & Refresh Diagnostic',
      icon: BatteryCharging,
      badge: 'Power Care',
      description: 'Advanced capacity profiling, thermal sensor checks, balancing, and certified battery recycling programs.',
      highlights: [
        'Individual lithium-ion cell voltage impedance check',
        'Overcharge & thermal shutdown circuit testing',
        'Safe commercial lithium recycling & disposal credits',
        'Rapid high-output 6.0Ah/8.0Ah battery upgrade bundles'
      ],
      turnaround: 'Same-Day Evaluation'
    },
    {
      id: 'procurement',
      title: 'Custom Tool Procurement & Sourcing',
      icon: Settings,
      badge: 'Specialized',
      description: 'Direct factory sourcing for specialized heavy-duty tools, rare voltage attachments, and discontinued OEM accessories.',
      highlights: [
        'Special orders for industrial SDS-MAX rotary hammers',
        'Heavy magnetic drills, pipe cutters, and concrete rebar tiers',
        'Volume purchase orders with Net-30 payment terms for verified businesses',
        'Complete packing and palletizing for direct jobsite drop-shipping'
      ],
      turnaround: 'Direct Factory Allocation'
    },
    {
      id: 'consultation',
      title: 'Jobsite Technical Consultation',
      icon: Headphones,
      badge: 'Expertise',
      description: 'One-on-one tool advisory for specialized applications: masonry drilling, heavy steel fastening, timber framing, and dust extraction.',
      highlights: [
        'OSHA Table 1 compliant dust extraction system pairings',
        'Fastener compatibility calculations for high-torque impact wrenches',
        'Runtime estimation based on amp-hour capacity under heavy continuous load',
        'Direct phone consultation with experienced power tool veterans'
      ],
      turnaround: 'Instant Phone / Video Call'
    }
  ];

  return (
    <div className="bg-zinc-950 min-h-screen py-12 px-4 sm:px-6 lg:px-8 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <BrandLogo size="lg" variant="stacked" className="mx-auto" />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider mt-2">
            <Wrench className="w-3.5 h-3.5" />
            <span>Contractor & Tool Services</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-100 font-display tracking-tight">
            Professional Equipment Services & Contractor Solutions
          </h1>
          <p className="text-base text-zinc-400 leading-relaxed">
            Beyond supplying premier tools, MA CONSIDER Brands provides comprehensive fleet outfitting, factory-grade calibration, 3-year warranty servicing, and dedicated contractor support across the USA.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.id}
                className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between group shadow-lg"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded bg-zinc-950 border border-zinc-800 text-amber-400">
                      {srv.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-zinc-100 font-display group-hover:text-amber-400 transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                      {srv.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-zinc-800/80">
                    <span className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider block">
                      Key Capabilities:
                    </span>
                    <ul className="space-y-1.5">
                      {srv.highlights.map((h, i) => (
                        <li key={i} className="text-xs text-zinc-400 flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-mono text-[11px]">{srv.turnaround}</span>
                  </div>
                  <button
                    onClick={() => {
                      setRfqService(srv.title);
                      const el = document.getElementById('service-request-form');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-all cursor-pointer"
                  >
                    <span>Request Info</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contractor Service SLA & Standards Banner */}
        <div className="p-8 sm:p-10 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Industry-Leading Standards
              </div>
              <h2 className="text-2xl font-bold text-zinc-100 font-display mt-1">
                The MA CONSIDER Commercial Service Commitment
              </h2>
            </div>
            <button
              onClick={() => navigateTo('warranty')}
              className="px-5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-amber-400/40 text-xs font-bold text-zinc-200 hover:text-amber-400 flex items-center gap-2 self-start md:self-auto cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Explore 3-Year Warranty Terms</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="text-amber-400 font-black text-xl font-display">48-HR RMA</div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Fast diagnosis and turnaround on critical tools to keep project timelines on schedule.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-zinc-100 font-black text-xl font-display">GENUINE OEM</div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Only authentic factory-tested replacement components, armature assemblies, and housings.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-amber-400 font-black text-xl font-display">NET-30 ACCOUNTS</div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Flexible trade credit and billing terms available for registered US commercial contractors.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-zinc-100 font-black text-xl font-display">DIRECT PHONE</div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Direct access to tool specialists (+92 315 5959375) without automated phone trees.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Service Request / RFQ Form */}
        <div id="service-request-form" className="p-8 sm:p-10 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-amber-400/10 text-amber-400 border border-amber-400/30 text-xs font-bold uppercase">
                <FileCheck className="w-3.5 h-3.5" />
                <span>Direct Inquiries</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100 font-display">
                Request Tool Service or Fleet Consultation
              </h2>
              <p className="text-xs text-zinc-400 max-w-xl mx-auto">
                Tell us about your tools, crew requirements, or calibration needs. We provide tailored recommendations and itemized estimates.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-8 rounded-xl bg-zinc-950 border border-emerald-400/40 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-400/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-zinc-100 font-display">
                  Service Request Successfully Submitted
                </h3>
                <p className="text-xs text-zinc-400 max-w-md mx-auto">
                  Thank you, <strong>{rfqName}</strong>. Our service specialists have received your inquiry for <strong>{rfqService}</strong> and will contact you at <strong>{rfqEmail}</strong> shortly.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setRfqName('');
                    setRfqEmail('');
                    setRfqCompany('');
                    setRfqNotes('');
                  }}
                  className="px-6 py-2.5 rounded-lg bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleRfqSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. David Vance"
                      value={rfqName}
                      onChange={(e) => setRfqName(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">Business / Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="david@vance-builders.com"
                      value={rfqEmail}
                      onChange={(e) => setRfqEmail(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">Company / Trade Name (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Apex Electrical Solutions"
                      value={rfqCompany}
                      onChange={(e) => setRfqCompany(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">Primary Service Needed *</label>
                    <select
                      value={rfqService}
                      onChange={(e) => setRfqService(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:border-amber-400 focus:outline-none"
                    >
                      <option>Contractor Fleet Outfitting</option>
                      <option>Tool Maintenance & Calibration</option>
                      <option>Warranty Support & Depot Repairs</option>
                      <option>Battery Health & Refresh Diagnostic</option>
                      <option>Custom Tool Procurement & Sourcing</option>
                      <option>Jobsite Technical Consultation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Project Details / Tool Model Numbers</label>
                  <textarea
                    rows={4}
                    placeholder="Describe your crew size, specific tool models (e.g. DCD996, DCF887), repair symptoms, or volume requirements..."
                    value={rfqNotes}
                    onChange={(e) => setRfqNotes(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-3 text-zinc-400 text-xs">
                    <a href="tel:+923155959375" className="flex items-center gap-1 text-amber-400 hover:underline">
                      <Phone className="w-3.5 h-3.5" />
                      <span>+92 315 5959375</span>
                    </a>
                    <span>•</span>
                    <a href="mailto:chabidjani06@gmail.com" className="hover:underline">
                      chabidjani06@gmail.com
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 cursor-pointer"
                  >
                    <span>Submit Service Inquiry</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
