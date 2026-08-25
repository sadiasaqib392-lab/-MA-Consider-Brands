import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  Percent,
  CheckCircle,
  ShoppingBag
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MABadge } from './MABadge';

export const CartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cart,
    cartSubtotal,
    cartDiscount,
    cartTax,
    cartShipping,
    cartTotal,
    updateCartQuantity,
    removeFromCart,
    applyCoupon,
    appliedCoupon,
    removeCoupon,
    setIsCheckoutModalOpen,
    navigateTo,
    getImageUrl
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartDrawerOpen) return null;

  const freeShippingThreshold = 99;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  const handleProceedCheckout = () => {
    setIsCartDrawerOpen(false);
    setIsCheckoutModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartDrawerOpen(false)}
        className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-zinc-900 border-l border-zinc-800 shadow-2xl flex flex-col justify-between text-zinc-100">
          {/* Drawer Header */}
          <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold text-zinc-100 font-display">
                Your Tool Cart ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="bg-zinc-950 px-5 py-3 border-b border-zinc-800 text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-zinc-300 font-medium flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-amber-400" />
                {remainingForFreeShipping === 0 ? (
                  <span className="text-emerald-400 font-bold">You unlocked Free USA Ground Delivery!</span>
                ) : (
                  <span>
                    Add <strong className="text-amber-400">${remainingForFreeShipping.toFixed(2)}</strong> for Free USA Ground
                  </span>
                )}
              </span>
              <span className="text-[10px] font-bold text-zinc-500 font-mono">
                {Math.round(freeShippingProgress)}%
              </span>
            </div>
            <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-amber-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-zinc-800/80 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-400 space-y-3">
                <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-600">
                  <ShoppingCart className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-zinc-200">Your cart is currently empty</h3>
                <p className="text-xs text-zinc-500 max-w-xs">
                  Browse our selection of MA CONSIDER drills, saws, batteries, and jobsite tools to get started.
                </p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigateTo('shop');
                  }}
                  className="px-5 py-2.5 rounded-lg bg-amber-400 text-zinc-950 font-bold text-xs uppercase"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const prodImg = getImageUrl(item.product.imageSlotId, item.product.images[0]);
                return (
                  <div key={item.product.id} className="pt-4 first:pt-0 flex gap-4">
                    {/* Item Image with MA Badge */}
                    <div className="relative w-16 h-16 rounded-lg bg-zinc-950 border border-zinc-800 p-1.5 shrink-0 flex items-center justify-center overflow-hidden">
                      <MABadge size="xs" variant="amber" position="top-left" showText={false} />
                      <img
                        src={prodImg}
                        alt={item.product.name}
                        className="w-full h-full object-contain filter brightness-110 contrast-105"
                      />
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4
                          onClick={() => {
                            setIsCartDrawerOpen(false);
                            navigateTo('product-detail', undefined, item.product);
                          }}
                          className="text-xs font-bold text-zinc-200 hover:text-amber-400 transition-colors line-clamp-2 cursor-pointer"
                        >
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-zinc-500 hover:text-red-400 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] font-mono text-zinc-500 mt-0.5">
                        SKU: {item.product.modelSku}
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded p-0.5">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 text-zinc-400 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-zinc-200">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 text-zinc-400 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-sm font-black text-amber-400 font-display">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer & Checkout Controls */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-zinc-800 bg-zinc-950 space-y-4">
              {/* Coupon Code Input */}
              <form onSubmit={handleApplyCoupon} className="space-y-1">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2 rounded bg-amber-400/10 border border-amber-400/30 text-xs text-amber-400 font-bold">
                    <span className="flex items-center gap-1.5">
                      <Percent className="w-3.5 h-3.5" />
                      Promo Code ({appliedCoupon.code}) Applied
                    </span>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-zinc-400 hover:text-red-400 text-xs"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Promo Code (e.g. PRO10)"
                      className="flex-1 bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs px-3 py-2 rounded focus:border-amber-400 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold rounded"
                    >
                      Apply
                    </button>
                  </div>
                )}
                {couponError && (
                  <p className="text-[11px] text-red-400">{couponError}</p>
                )}
              </form>

              {/* Cost Breakdown */}
              <div className="space-y-1.5 text-xs text-zinc-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-zinc-200 font-mono">${cartSubtotal.toFixed(2)}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Discount</span>
                    <span className="font-mono">-${cartDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated USA Shipping</span>
                  <span className="text-zinc-200 font-mono">
                    {cartShipping === 0 ? <span className="text-emerald-400 font-bold">FREE</span> : `$${cartShipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Sales Tax</span>
                  <span className="text-zinc-200 font-mono">${cartTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-zinc-100 pt-2 border-t border-zinc-800">
                  <span>Total Due</span>
                  <span className="text-base font-black text-amber-400 font-display">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <button
                onClick={handleProceedCheckout}
                className="w-full py-3.5 px-4 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 cursor-pointer"
                id="drawer-proceed-checkout-btn"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>256-Bit Encrypted USA Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
