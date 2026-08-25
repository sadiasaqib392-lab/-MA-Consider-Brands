import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Printer,
  PackageCheck,
  Zap,
  Building,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CustomerOrder } from '../types';
import { BrandLogo } from './BrandLogo';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    cart,
    cartSubtotal,
    cartDiscount,
    cartTax,
    cartShipping,
    cartTotal,
    appliedCoupon,
    createOrder,
    navigateTo,
    getImageUrl
  } = useStore();

  const [step, setStep] = useState<'details' | 'shipping' | 'payment' | 'confirmation'>('details');
  const [completedOrder, setCompletedOrder] = useState<CustomerOrder | null>(null);

  // Form Fields
  const [formData, setFormData] = useState({
    fullName: 'David Harrison',
    email: 'dharrison.builder@gmail.com',
    phone: '(555) 392-1084',
    addressLine1: '742 Evergreen Terrace',
    addressLine2: 'Suite 400',
    city: 'Springfield',
    state: 'IL',
    zipCode: '62704',
    country: 'United States',
    shippingMethod: 'Standard USA Contractor Ground (3-5 Business Days)',
    shippingCost: cartShipping,
    paymentMethod: 'Credit Card',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '09/28',
    cardCvc: '849',
    orderNotes: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCheckoutModalOpen) return null;

  const usStates = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  const handleDetailsNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('shipping');
  };

  const handleShippingNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleFinalOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const newOrder = createOrder({
        items: cart,
        subtotal: cartSubtotal,
        discount: cartDiscount,
        tax: cartTax,
        shippingCost: formData.shippingCost,
        total: cartTotal,
        shippingAddress: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: 'United States'
        },
        shippingMethod: formData.shippingMethod,
        paymentMethod: formData.paymentMethod
      });

      setCompletedOrder(newOrder);
      setIsProcessing(false);
      setStep('confirmation');

      // Trigger Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // silent
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/85 backdrop-blur-md p-4 sm:p-6 lg:p-10 flex items-center justify-center">
      <div className="relative w-full max-w-4xl rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden flex flex-col text-zinc-100 max-h-[90vh]">
        {/* Modal Top Header */}
        <div className="p-5 border-b border-zinc-800 bg-zinc-950/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BrandLogo size="sm" variant="compact" />
            <div className="pl-3 border-l border-zinc-800">
              <h2 className="text-xs font-bold text-zinc-100 uppercase tracking-wider">
                USA Secure Checkout
              </h2>
              <p className="text-[10px] text-zinc-400">
                Encrypted 256-Bit SSL Order Portal
              </p>
            </div>
          </div>

          {step !== 'confirmation' && (
            <button
              onClick={() => setIsCheckoutModalOpen(false)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
              aria-label="Close checkout"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Step Progression Indicator */}
        {step !== 'confirmation' && (
          <div className="bg-zinc-950 px-6 py-3 border-b border-zinc-800 flex items-center justify-between text-xs font-semibold">
            <div className={`flex items-center gap-2 ${step === 'details' ? 'text-amber-400 font-bold' : 'text-zinc-400'}`}>
              <span className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px]">1</span>
              <span>Customer & Address</span>
            </div>
            <div className="h-0.5 w-8 bg-zinc-800 hidden sm:block" />
            <div className={`flex items-center gap-2 ${step === 'shipping' ? 'text-amber-400 font-bold' : 'text-zinc-400'}`}>
              <span className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px]">2</span>
              <span>Shipping Method</span>
            </div>
            <div className="h-0.5 w-8 bg-zinc-800 hidden sm:block" />
            <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-amber-400 font-bold' : 'text-zinc-400'}`}>
              <span className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px]">3</span>
              <span>Payment & Review</span>
            </div>
          </div>
        )}

        {/* Modal Main Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {/* STEP 1: Customer Info & USA Address */}
          {step === 'details' && (
            <form onSubmit={handleDetailsNext} className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-zinc-100 font-display mb-1">
                  1. Contact Information
                </h3>
                <p className="text-xs text-zinc-400 mb-4">
                  We will send order confirmation and courier tracking details to this email.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-zinc-300 font-semibold mb-1">Phone Number (For Delivery Alerts) *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800">
                <h3 className="text-base font-bold text-zinc-100 font-display mb-1">
                  2. USA Shipping Address
                </h3>
                <p className="text-xs text-zinc-400 mb-4">
                  Shipment destination across the United States.
                </p>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">Street Address *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 742 Evergreen Terrace"
                      value={formData.addressLine1}
                      onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 font-semibold mb-1">Apartment / Suite / Jobsite Unit (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Suite 400 or Jobsite Trailer #2"
                      value={formData.addressLine2}
                      onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-zinc-300 font-semibold mb-1">City *</label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-300 font-semibold mb-1">State *</label>
                      <select
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:border-amber-400 focus:outline-none"
                      >
                        {usStates.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-zinc-300 font-semibold mb-1">ZIP Code *</label>
                      <input
                        type="text"
                        required
                        placeholder="62704"
                        value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2"
                >
                  <span>Continue to Shipping Method</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Shipping Method */}
          {step === 'shipping' && (
            <form onSubmit={handleShippingNext} className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-zinc-100 font-display mb-1">
                  Select Delivery Speed
                </h3>
                <p className="text-xs text-zinc-400 mb-4">
                  Fulfilled via commercial USA carriers with door-to-door tracking.
                </p>

                <div className="space-y-3 text-xs">
                  <label
                    onClick={() =>
                      setFormData({
                        ...formData,
                        shippingMethod: 'Standard USA Contractor Ground (3-5 Business Days)',
                        shippingCost: cartShipping
                      })
                    }
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${
                      formData.shippingMethod.includes('Standard')
                        ? 'bg-amber-400/10 border-amber-400/50 text-zinc-100'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-amber-400" />
                      <div>
                        <div className="font-bold text-zinc-200">Standard Contractor Ground</div>
                        <div className="text-[11px] text-zinc-400">3-5 business days across US</div>
                      </div>
                    </div>
                    <span className="font-bold font-mono text-zinc-200">
                      {cartShipping === 0 ? 'FREE' : `$${cartShipping.toFixed(2)}`}
                    </span>
                  </label>

                  <label
                    onClick={() =>
                      setFormData({
                        ...formData,
                        shippingMethod: 'Priority Express 2-Day Air (USPS/FedEx)',
                        shippingCost: 18.00
                      })
                    }
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${
                      formData.shippingMethod.includes('Priority Express')
                        ? 'bg-amber-400/10 border-amber-400/50 text-zinc-100'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5 text-amber-400" />
                      <div>
                        <div className="font-bold text-zinc-200">Priority Express 2-Day Air</div>
                        <div className="text-[11px] text-zinc-400">Guaranteed 2 business day delivery</div>
                      </div>
                    </div>
                    <span className="font-bold font-mono text-zinc-200">$18.00</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="px-5 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-xs"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Payment & Order Review */}
          {step === 'payment' && (
            <form onSubmit={handleFinalOrderSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Payment Selection */}
                <div className="md:col-span-7 space-y-4">
                  <h3 className="text-base font-bold text-zinc-100 font-display">
                    Payment Method
                  </h3>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: 'Credit Card' })}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 ${
                        formData.paymentMethod === 'Credit Card'
                          ? 'bg-amber-400/15 border-amber-400 text-amber-400'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Credit Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: 'Apple / Google Pay' })}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 ${
                        formData.paymentMethod === 'Apple / Google Pay'
                          ? 'bg-amber-400/15 border-amber-400 text-amber-400'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                      }`}
                    >
                      <Zap className="w-4 h-4" />
                      <span>Express Pay</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: 'Commercial Purchase Order' })}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 ${
                        formData.paymentMethod === 'Commercial Purchase Order'
                          ? 'bg-amber-400/15 border-amber-400 text-amber-400'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                      }`}
                    >
                      <Building className="w-4 h-4" />
                      <span>Trade PO</span>
                    </button>
                  </div>

                  {formData.paymentMethod === 'Credit Card' && (
                    <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3 text-xs">
                      <div>
                        <label className="block text-zinc-400 font-semibold mb-1">Card Number</label>
                        <input
                          type="text"
                          required
                          value={formData.cardNumber}
                          onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 font-mono focus:border-amber-400 focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-zinc-400 font-semibold mb-1">Expiration (MM/YY)</label>
                          <input
                            type="text"
                            required
                            value={formData.cardExp}
                            onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 font-mono focus:border-amber-400 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-zinc-400 font-semibold mb-1">Security Code (CVC)</label>
                          <input
                            type="text"
                            required
                            value={formData.cardCvc}
                            onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 font-mono focus:border-amber-400 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod !== 'Credit Card' && (
                    <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-400">
                      Payment will be processed securely via {formData.paymentMethod}. An invoice receipt with order ID will be generated upon authorization.
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-[11px] text-zinc-500">
                    <Lock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Your transaction is encrypted with end-to-end TLS security.</span>
                  </div>
                </div>

                {/* Order Summary Sidebar */}
                <div className="md:col-span-5 bg-zinc-950 p-4 rounded-xl border border-zinc-800 space-y-3 text-xs">
                  <h4 className="font-bold text-zinc-200 border-b border-zinc-800 pb-2">
                    Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
                  </h4>

                  <div className="max-h-40 overflow-y-auto space-y-2 pr-1 divide-y divide-zinc-900">
                    {cart.map((item) => (
                      <div key={item.product.id} className="pt-2 first:pt-0 flex justify-between gap-2">
                        <div className="min-w-0">
                          <p className="font-bold text-zinc-200 truncate">{item.product.name}</p>
                          <p className="text-[10px] text-zinc-500 font-mono">
                            Qty: {item.quantity} • SKU: {item.product.modelSku}
                          </p>
                        </div>
                        <span className="font-bold text-zinc-300 font-mono shrink-0">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-zinc-800 space-y-1.5 text-zinc-400 text-xs">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-mono text-zinc-200">${cartSubtotal.toFixed(2)}</span>
                    </div>
                    {cartDiscount > 0 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>Discount ({appliedCoupon?.code})</span>
                        <span className="font-mono">-${cartDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="font-mono text-zinc-200">
                        {formData.shippingCost === 0 ? 'FREE' : `$${formData.shippingCost.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sales Tax</span>
                      <span className="font-mono text-zinc-200">${cartTax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-zinc-100 pt-2 border-t border-zinc-800">
                      <span>Total Amount</span>
                      <span className="text-base font-black text-amber-400 font-display">
                        ${(cartSubtotal - cartDiscount + cartTax + formData.shippingCost).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className="px-5 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-xs"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-8 py-3.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-400/20 disabled:opacity-50"
                  id="submit-order-btn"
                >
                  {isProcessing ? (
                    <span>Authorizing Payment...</span>
                  ) : (
                    <>
                      <span>Place & Confirm Order</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Order Confirmation & Invoice */}
          {step === 'confirmation' && completedOrder && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-400/15 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-zinc-100 font-display">
                  Order Successfully Placed!
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Thank you for choosing MA Consider Brands. Your tools are being queued for commercial dispatch.
                </p>
              </div>

              {/* Order Metadata Receipt Card */}
              <div className="max-w-xl mx-auto rounded-xl bg-zinc-950 border border-zinc-800 p-6 text-left space-y-4 text-xs">
                <div className="flex flex-wrap justify-between items-center border-b border-zinc-800 pb-3 gap-2">
                  <div>
                    <span className="text-zinc-500 uppercase font-semibold">Order Number:</span>
                    <div className="text-sm font-black text-amber-400 font-mono">
                      #{completedOrder.orderNumber}
                    </div>
                  </div>
                  <div>
                    <span className="text-zinc-500 uppercase font-semibold">Tracking Code:</span>
                    <div className="text-xs font-mono font-bold text-zinc-200">
                      {completedOrder.trackingNumber}
                    </div>
                  </div>
                  <div>
                    <span className="text-zinc-500 uppercase font-semibold">Estimated Delivery:</span>
                    <div className="text-xs font-bold text-emerald-400">
                      {completedOrder.estimatedDelivery}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-zinc-300">
                  <div>
                    <span className="text-zinc-500 font-semibold block mb-1">Shipping To:</span>
                    <div className="font-bold">{completedOrder.shippingAddress.fullName}</div>
                    <div>{completedOrder.shippingAddress.addressLine1}</div>
                    {completedOrder.shippingAddress.addressLine2 && (
                      <div>{completedOrder.shippingAddress.addressLine2}</div>
                    )}
                    <div>
                      {completedOrder.shippingAddress.city}, {completedOrder.shippingAddress.state} {completedOrder.shippingAddress.zipCode}
                    </div>
                  </div>

                  <div>
                    <span className="text-zinc-500 font-semibold block mb-1">Contact & Method:</span>
                    <div>{completedOrder.shippingAddress.email}</div>
                    <div>{completedOrder.shippingAddress.phone}</div>
                    <div className="mt-1 text-zinc-400">{completedOrder.shippingMethod}</div>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-800 flex justify-between font-bold text-sm">
                  <span>Total Paid:</span>
                  <span className="text-amber-400 font-mono">${completedOrder.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt / Invoice</span>
                </button>

                <button
                  onClick={() => {
                    setIsCheckoutModalOpen(false);
                    navigateTo('track-order');
                  }}
                  className="px-5 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase"
                >
                  Track Shipment Timeline
                </button>

                <button
                  onClick={() => {
                    setIsCheckoutModalOpen(false);
                    navigateTo('home');
                  }}
                  className="px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 font-bold text-xs"
                >
                  Return to Home
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
