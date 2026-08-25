import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Search,
  Truck,
  CheckCircle2,
  Package,
  Clock,
  MapPin,
  ShieldCheck,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { CustomerOrder } from '../types';

export const TrackOrderPage: React.FC = () => {
  const { orders, findOrderByTracking, navigateTo } = useStore();
  const [searchInput, setSearchInput] = useState('MAC-89241');
  const [searchedOrder, setSearchedOrder] = useState<CustomerOrder | null>(() => orders[0] || null);
  const [hasSearched, setHasSearched] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    const result = findOrderByTracking(searchInput.trim());
    setSearchedOrder(result || null);
    setHasSearched(true);
  };

  const steps = [
    { label: 'Order Placed & Verified', date: 'Day 1' },
    { label: 'Warehouse Pick & Inspection', date: 'Day 1' },
    { label: 'In Transit with Courier', date: 'Active' },
    { label: 'Out for USA Delivery', date: 'Pending' },
    { label: 'Delivered', date: 'Pending' }
  ];

  return (
    <div className="bg-zinc-950 min-h-screen py-12 px-4 sm:px-6 lg:px-8 border-b border-zinc-800">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Page Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Truck className="w-3.5 h-3.5" />
            <span>USA Nationwide Order Tracking</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 font-display tracking-tight">
            Track Your Tool Shipment
          </h1>
          <p className="text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Enter your Order Number (e.g. <strong>MAC-89241</strong>) or USPS tracking number to check real-time dispatch and delivery status.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter Order # (e.g. MAC-89241) or Tracking Code..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-xs text-zinc-100 focus:border-amber-400 focus:outline-none font-mono"
              />
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-extrabold text-xs uppercase tracking-wider shrink-0 cursor-pointer"
            >
              Track Order
            </button>
          </form>
        </div>

        {/* Tracking Details View */}
        {hasSearched && searchedOrder ? (
          <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-8 shadow-2xl">
            {/* Status Header */}
            <div className="flex flex-wrap items-center justify-between border-b border-zinc-800 pb-6 gap-4">
              <div>
                <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">
                  Order Status
                </span>
                <div className="text-2xl font-black text-amber-400 font-display flex items-center gap-2 mt-0.5">
                  <Truck className="w-6 h-6" />
                  <span>{searchedOrder.status}</span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  Estimated Delivery by <strong>{searchedOrder.estimatedDelivery}</strong>
                </p>
              </div>

              <div className="text-left sm:text-right text-xs space-y-1">
                <div>
                  <span className="text-zinc-500">Order ID: </span>
                  <span className="font-bold text-zinc-200 font-mono">#{searchedOrder.orderNumber}</span>
                </div>
                <div>
                  <span className="text-zinc-500">Carrier: </span>
                  <span className="font-bold text-zinc-200">{searchedOrder.carrier}</span>
                </div>
                <div>
                  <span className="text-zinc-500">Tracking #: </span>
                  <span className="font-mono text-amber-400 font-bold">{searchedOrder.trackingNumber}</span>
                </div>
              </div>
            </div>

            {/* Visual Step Progression */}
            <div className="py-2">
              <div className="relative flex items-center justify-between max-w-2xl mx-auto">
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-zinc-800 z-0" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-amber-400 z-0 w-3/5" />

                {[
                  { step: 1, name: 'Placed', active: true, done: true },
                  { step: 2, name: 'Picked', active: true, done: true },
                  { step: 3, name: 'In Transit', active: true, done: true },
                  { step: 4, name: 'Out for Delivery', active: false, done: false },
                  { step: 5, name: 'Delivered', active: false, done: false }
                ].map((s, idx) => (
                  <div key={idx} className="relative z-10 flex flex-col items-center">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${
                        s.done
                          ? 'bg-amber-400 text-zinc-950 ring-4 ring-zinc-900 shadow-lg'
                          : 'bg-zinc-800 text-zinc-500 ring-4 ring-zinc-900'
                      }`}
                    >
                      {s.done ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                    </div>
                    <span className="text-[11px] font-semibold text-zinc-300 mt-2 text-center whitespace-nowrap">
                      {s.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Destination & Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-800 text-xs">
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                <span className="font-bold text-zinc-200 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>Delivery Destination</span>
                </span>
                <div className="text-zinc-300">
                  <div className="font-bold">{searchedOrder.shippingAddress.fullName}</div>
                  <div>{searchedOrder.shippingAddress.addressLine1}</div>
                  {searchedOrder.shippingAddress.addressLine2 && (
                    <div>{searchedOrder.shippingAddress.addressLine2}</div>
                  )}
                  <div>
                    {searchedOrder.shippingAddress.city}, {searchedOrder.shippingAddress.state} {searchedOrder.shippingAddress.zipCode}
                  </div>
                  <div className="text-zinc-500 mt-1">{searchedOrder.shippingAddress.country}</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                <span className="font-bold text-zinc-200 flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-amber-400" />
                  <span>Package Contents</span>
                </span>
                <div className="space-y-1.5">
                  {searchedOrder.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-zinc-300">
                      <span className="truncate pr-2">{item.product.name} (x{item.quantity})</span>
                      <span className="font-mono text-zinc-400 shrink-0">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-zinc-900 flex justify-between font-bold text-zinc-200">
                    <span>Order Total:</span>
                    <span className="text-amber-400 font-mono">${searchedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : hasSearched ? (
          <div className="p-12 text-center rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
            <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
            <h3 className="text-lg font-bold text-zinc-100">Order Not Found</h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              We couldn't locate an active order matching "{searchInput}". Please double check your order number or contact customer support.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};
