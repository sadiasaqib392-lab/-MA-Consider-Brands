import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, ShieldCheck, Truck, RotateCcw, FileText } from 'lucide-react';

export const PolicyModals: React.FC = () => {
  const { activePolicyModal, setActivePolicyModal } = useStore();

  if (!activePolicyModal) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/85 backdrop-blur-md p-4 sm:p-6 flex items-center justify-center">
      <div className="relative w-full max-w-2xl rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl p-6 sm:p-8 text-zinc-100 max-h-[85vh] overflow-y-auto">
        <button
          onClick={() => setActivePolicyModal(null)}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-lg bg-zinc-950/80 border border-zinc-800"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {activePolicyModal === 'shipping' && (
          <div className="space-y-4 text-xs text-zinc-300 leading-relaxed">
            <div className="flex items-center gap-2 text-amber-400">
              <Truck className="w-5 h-5" />
              <h3 className="text-lg font-bold text-zinc-100 font-display">
                USA Shipping & Fulfillment Policy
              </h3>
            </div>
            <p>
              At <strong>MA Consider Brands</strong>, we are committed to delivering genuine contractor tools quickly and securely across the United States.
            </p>
            <h4 className="font-bold text-zinc-100 text-sm pt-2">1. Processing Time</h4>
            <p>
              All tool orders placed Monday through Friday before 2:00 PM EST are processed and queued for courier pickup within 24–48 hours.
            </p>
            <h4 className="font-bold text-zinc-100 text-sm pt-2">2. Delivery Speeds & Rates</h4>
            <ul className="list-disc pl-5 space-y-1 text-zinc-400">
              <li><strong>Free Ground Shipping:</strong> Available on all orders over $99.00 USD.</li>
              <li><strong>Standard Ground Shipping (Orders under $99):</strong> Flat rate of $9.95. Transit takes 3–5 business days.</li>
              <li><strong>Priority 2-Day Air:</strong> Available at checkout for urgent jobsite requirements ($18.00).</li>
            </ul>
            <h4 className="font-bold text-zinc-100 text-sm pt-2">3. Package Tracking</h4>
            <p>
              Every shipment is assigned a valid carrier tracking number (USPS or FedEx) sent via email immediately upon warehouse dispatch.
            </p>
          </div>
        )}

        {activePolicyModal === 'returns' && (
          <div className="space-y-4 text-xs text-zinc-300 leading-relaxed">
            <div className="flex items-center gap-2 text-amber-400">
              <RotateCcw className="w-5 h-5" />
              <h3 className="text-lg font-bold text-zinc-100 font-display">
                30-Day Return & Refund Policy
              </h3>
            </div>
            <p>
              We want you to be completely satisfied with your tool purchase. If a tool does not meet your project specifications, you may return it within 30 days of delivery.
            </p>
            <h4 className="font-bold text-zinc-100 text-sm pt-2">1. Return Eligibility</h4>
            <ul className="list-disc pl-5 space-y-1 text-zinc-400">
              <li>Item must be in new, unused condition with no signs of heavy jobsite wear.</li>
              <li>Must include all original manufacturer packaging, manuals, batteries, chargers, and accessories.</li>
              <li>Proof of purchase (Order Number) must be provided.</li>
            </ul>
            <h4 className="font-bold text-zinc-100 text-sm pt-2">2. How to Initiate a Return</h4>
            <p>
              Email <span className="text-amber-400 font-bold">chabidjani06@gmail.com</span> or call <span className="text-amber-400 font-bold">+92 315 5959375</span> with your Order Number. Our team will issue a Return Merchandise Authorization (RMA) and return shipping instructions.
            </p>
            <h4 className="font-bold text-zinc-100 text-sm pt-2">3. Refunds</h4>
            <p>
              Once received and inspected at our logistics depot, refunds are issued to the original payment method within 3–5 business days.
            </p>
          </div>
        )}

        {activePolicyModal === 'privacy' && (
          <div className="space-y-4 text-xs text-zinc-300 leading-relaxed">
            <div className="flex items-center gap-2 text-amber-400">
              <ShieldCheck className="w-5 h-5" />
              <h3 className="text-lg font-bold text-zinc-100 font-display">
                Customer Privacy & Security
              </h3>
            </div>
            <p>
              MA Consider Brands respects and safeguards your personal privacy. We never sell, rent, or trade your contact or order information to third parties.
            </p>
            <h4 className="font-bold text-zinc-100 text-sm pt-2">1. Information We Collect</h4>
            <p>
              We collect customer name, shipping address, email address, and phone number solely to fulfill tool orders, calculate applicable taxes, and provide delivery notifications.
            </p>
            <h4 className="font-bold text-zinc-100 text-sm pt-2">2. Payment Security</h4>
            <p>
              All payment transactions are encrypted using industry-standard TLS 256-bit protocol. We do not store raw credit card numbers on our servers.
            </p>
          </div>
        )}

        {activePolicyModal === 'terms' && (
          <div className="space-y-4 text-xs text-zinc-300 leading-relaxed">
            <div className="flex items-center gap-2 text-amber-400">
              <FileText className="w-5 h-5" />
              <h3 className="text-lg font-bold text-zinc-100 font-display">
                Terms of Service & Trade
              </h3>
            </div>
            <p>
              By accessing or purchasing from MA Consider Brands, you agree to standard retail terms of commercial trade and online sales within the United States.
            </p>
            <h4 className="font-bold text-zinc-100 text-sm pt-2">1. Product Authenticity & Disclaimers</h4>
            <p>
              MA Consider Brands provides high-performance professional tools and equipment. All brand marks and product references remain the property of MA Consider Brands.
            </p>
          </div>
        )}

        <div className="pt-6 border-t border-zinc-800 flex justify-end">
          <button
            onClick={() => setActivePolicyModal(null)}
            className="px-5 py-2.5 rounded-lg bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
