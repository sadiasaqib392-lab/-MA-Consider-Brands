import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  ShieldCheck,
  Award,
  Wrench,
  RotateCcw,
  CheckCircle2,
  Clock,
  Send,
  Phone,
  Mail,
  FileCheck2,
  HelpCircle
} from 'lucide-react';

export const WarrantyPage: React.FC = () => {
  const { navigateTo, showToast } = useStore();

  const [regForm, setRegForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    modelSku: '',
    serialNumber: '',
    purchaseDate: '',
    retailer: 'MA CONSIDER Official Store',
    invoiceNumber: ''
  });

  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regForm.modelSku || !regForm.serialNumber || !regForm.fullName || !regForm.email) {
      showToast('Missing Fields', 'Please complete all required fields including Serial Number.', 'warning');
      return;
    }
    setIsRegistered(true);
    showToast('Tool Registered Successfully!', `Serial #${regForm.serialNumber} is now registered under MA CONSIDER 3-Year Protection.`);
  };

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen pb-20">
      {/* 1. Breadcrumbs */}
      <div className="bg-zinc-900/60 border-b border-zinc-800/80 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateTo('home')}
              className="hover:text-amber-400 transition-colors font-medium cursor-pointer"
            >
              Home
            </button>
            <span className="text-zinc-600">/</span>
            <span className="text-amber-400 font-semibold">Warranty & Protection</span>
          </div>
          <span className="text-emerald-400 font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% Genuine Jobsite Guarantee
          </span>
        </div>
      </div>

      {/* 2. Hero Header */}
      <div className="bg-gradient-to-b from-zinc-900 via-zinc-900/80 to-zinc-950 border-b border-zinc-800/80 py-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/10 text-amber-400 border border-amber-400/20 mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>MA CONSIDER CONTRACTOR PROMISE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Guaranteed Tough. Guaranteed Supported.
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base mt-4 leading-relaxed">
            Every MA CONSIDER power tool and accessory is engineered to withstand grueling jobsite abuse. Backed by industry-leading warranty coverage, certified US service centers, and no-hassle claims.
          </p>
        </div>
      </div>

      {/* 3. Three Pillars of Protection */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Pillar 1 */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden group hover:border-amber-400/40 transition-all">
            <div className="absolute top-0 right-0 w-28 h-28 bg-amber-400/5 rounded-full blur-2xl group-hover:bg-amber-400/10 transition-all" />
            <div>
              <div className="w-14 h-14 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-6">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <span className="text-xs font-black text-amber-400 uppercase tracking-wider block mb-1">
                Standard Coverage
              </span>
              <h3 className="text-2xl font-black text-white mb-3">3-Year Limited Warranty</h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                MA CONSIDER will repair or replace, without charge, any defects due to faulty materials or workmanship for three full years from the date of purchase.
              </p>
            </div>
            <ul className="mt-6 space-y-2 text-xs text-zinc-300 border-t border-zinc-800/80 pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Brushless motor & gearbox failure coverage</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Electronic switch & trigger replacement</span>
              </li>
            </ul>
          </div>

          {/* Pillar 2 */}
          <div className="bg-zinc-900/60 border border-amber-400/30 rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden group shadow-lg shadow-amber-400/5">
            <div className="absolute top-0 right-0 w-28 h-28 bg-amber-400/10 rounded-full blur-2xl" />
            <div>
              <div className="w-14 h-14 rounded-xl bg-amber-400 text-zinc-950 flex items-center justify-center font-black mb-6">
                <Wrench className="w-7 h-7" />
              </div>
              <span className="text-xs font-black text-amber-400 uppercase tracking-wider block mb-1">
                VIP Contractor Care
              </span>
              <h3 className="text-2xl font-black text-white mb-3">1-Year Free Service</h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                MA CONSIDER will maintain the tool and replace worn parts caused by normal use, for free, any time during the first year after purchase.
              </p>
            </div>
            <ul className="mt-6 space-y-2 text-xs text-zinc-300 border-t border-zinc-800/80 pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Free calibration, tune-up & safety inspection</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Fast 48-hour depot turnaround time</span>
              </li>
            </ul>
          </div>

          {/* Pillar 3 */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden group hover:border-amber-400/40 transition-all">
            <div className="absolute top-0 right-0 w-28 h-28 bg-amber-400/5 rounded-full blur-2xl group-hover:bg-amber-400/10 transition-all" />
            <div>
              <div className="w-14 h-14 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-6">
                <RotateCcw className="w-7 h-7" />
              </div>
              <span className="text-xs font-black text-amber-400 uppercase tracking-wider block mb-1">
                Zero Risk Trial
              </span>
              <h3 className="text-2xl font-black text-white mb-3">90-Day Money Back</h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                If you are not completely satisfied with the performance of your MA CONSIDER tool for any reason, return it within 90 days for a full refund.
              </p>
            </div>
            <ul className="mt-6 space-y-2 text-xs text-zinc-300 border-t border-zinc-800/80 pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>No restocking fee on standard returns</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Prepaid return shipping label available</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 4. Registration Form & Service Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Tool Registration Box */}
          <div className="lg:col-span-7 bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Register Your Tool</h3>
                <p className="text-xs text-zinc-400">
                  Register your serial number to activate expedited warranty claims and priority firmware/safety notices.
                </p>
              </div>
            </div>

            {isRegistered ? (
              <div className="p-8 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">Tool Successfully Registered!</h4>
                <p className="text-xs text-zinc-300 mb-6">
                  Confirmation receipt and digital warranty certificate have been logged for Model <strong className="text-amber-400">{regForm.modelSku}</strong> (Serial #{regForm.serialNumber}).
                </p>
                <button
                  onClick={() => {
                    setIsRegistered(false);
                    setRegForm({
                      fullName: '',
                      email: '',
                      phone: '',
                      modelSku: '',
                      serialNumber: '',
                      purchaseDate: '',
                      retailer: 'MA CONSIDER Official Store',
                      invoiceNumber: ''
                    });
                  }}
                  className="text-xs font-bold text-amber-400 hover:underline cursor-pointer"
                >
                  Register Another Tool
                </button>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-400 font-bold uppercase tracking-wider text-[10px] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Miller"
                      value={regForm.fullName}
                      onChange={e => setRegForm({ ...regForm, fullName: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 font-bold uppercase tracking-wider text-[10px] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@contractor.com"
                      value={regForm.email}
                      onChange={e => setRegForm({ ...regForm, email: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-400 font-bold uppercase tracking-wider text-[10px] mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="(555) 000-0000"
                      value={regForm.phone}
                      onChange={e => setRegForm({ ...regForm, phone: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 font-bold uppercase tracking-wider text-[10px] mb-1.5">
                      Model SKU / Tool Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. DCD999B or DCF887"
                      value={regForm.modelSku}
                      onChange={e => setRegForm({ ...regForm, modelSku: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-400 font-bold uppercase tracking-wider text-[10px] mb-1.5">
                      Serial Number (Found on tool nameplate) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. SN-2026-889104"
                      value={regForm.serialNumber}
                      onChange={e => setRegForm({ ...regForm, serialNumber: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 font-bold uppercase tracking-wider text-[10px] mb-1.5">
                      Purchase Date
                    </label>
                    <input
                      type="date"
                      value={regForm.purchaseDate}
                      onChange={e => setRegForm({ ...regForm, purchaseDate: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 font-bold uppercase tracking-wider text-[10px] mb-1.5">
                    Order # / Invoice Number (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. MAC-89241"
                    value={regForm.invoiceNumber}
                    onChange={e => setRegForm({ ...regForm, invoiceNumber: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-amber-400/10 cursor-pointer active:scale-95 text-xs sm:text-sm mt-4"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Register Tool & Activate 3-Year Warranty</span>
                </button>
              </form>
            )}
          </div>

          {/* How to Claim Warranty */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 sm:p-8">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                How to Submit a Service Claim
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-400 text-zinc-950 font-black flex items-center justify-center shrink-0">1</span>
                  <div>
                    <strong className="text-white block">Locate Serial & SKU</strong>
                    <span className="text-zinc-400">Check the barcode sticker on the battery foot or tool housing.</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-400 text-zinc-950 font-black flex items-center justify-center shrink-0">2</span>
                  <div>
                    <strong className="text-white block">Contact Support Hotline</strong>
                    <span className="text-zinc-400">Call +92 315 5959375 or email chabidjani06@gmail.com with your issue.</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-400 text-zinc-950 font-black flex items-center justify-center shrink-0">3</span>
                  <div>
                    <strong className="text-white block">Prepaid Shipping Label</strong>
                    <span className="text-zinc-400">We email you a prepaid shipping label for inspection at our nearest authorized service facility.</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-400 text-zinc-950 font-black flex items-center justify-center shrink-0">4</span>
                  <div>
                    <strong className="text-white block">Rapid Return or Replacement</strong>
                    <span className="text-zinc-400">Tool is serviced or brand new replacement is dispatched within 48-72 hours.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Support Contact Strip */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Need Immediate Help?</span>
              <div className="flex flex-col gap-2.5 text-xs text-zinc-300">
                <a
                  href="tel:+923155959375"
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-amber-400/40 transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <div>
                    <div className="text-[11px] text-zinc-500 font-semibold">Contractor Warranty Phone</div>
                    <div className="font-bold text-white">+92 315 5959375</div>
                  </div>
                </a>

                <a
                  href="mailto:chabidjani06@gmail.com"
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-amber-400/40 transition-colors"
                >
                  <Mail className="w-4 h-4 text-amber-400" />
                  <div>
                    <div className="text-[11px] text-zinc-500 font-semibold">Official Support Email</div>
                    <div className="font-bold text-white">chabidjani06@gmail.com</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
