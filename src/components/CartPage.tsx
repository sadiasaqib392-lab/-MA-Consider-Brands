import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Truck, RotateCcw, ArrowLeft } from 'lucide-react';
import { MABadge } from './MABadge';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartSubtotal,
    cartDiscount,
    cartTax,
    cartShipping,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    navigateTo,
    setIsCheckoutModalOpen,
    getImageUrl
  } = useStore();

  const [couponCode, setCouponCode] = React.useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim()) {
      applyCoupon(couponCode.trim());
      setCouponCode('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="bg-zinc-950 min-h-[70vh] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600 mb-6">
          <ShoppingCart className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-zinc-100 font-display">Your Cart is Empty</h2>
        <p className="text-sm text-zinc-400 mt-2 max-w-md">
          Explore our collection of authentic MA CONSIDER tools, cordless kits, and accessories.
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="mt-6 px-8 py-3.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-400/20"
        >
          Browse Tool Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 min-h-screen py-12 px-4 sm:px-6 lg:px-8 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-100 font-display">
              Shopping Cart ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Review your selected MA CONSIDER tools before secure checkout.
            </p>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-amber-400 font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden divide-y divide-zinc-800">
              {cart.map((item) => {
                const img = getImageUrl(item.product.imageSlotId, item.product.images[0]);
                return (
                  <div key={item.product.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-5">
                    {/* Item Image with MA Badge */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-zinc-950 p-2 border border-zinc-800 shrink-0 flex items-center justify-center overflow-hidden">
                      <MABadge size="xs" variant="amber" position="top-left" />
                      <img
                        src={img}
                        alt={item.product.name}
                        className="w-full h-full object-contain filter brightness-110 contrast-105"
                      />
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 space-y-1 text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        <span className="text-[10px] font-black uppercase text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
                          {item.product.brand}
                        </span>
                        <span className="text-xs font-mono text-zinc-400">
                          SKU: {item.product.modelSku}
                        </span>
                      </div>
                      <h3
                        onClick={() => navigateTo('product-detail', undefined, item.product)}
                        className="text-sm font-bold text-zinc-100 hover:text-amber-400 transition-colors cursor-pointer"
                      >
                        {item.product.name}
                      </h3>
                      <p className="text-xs text-zinc-400">
                        Unit Price: <span className="font-bold text-amber-400">${item.product.price.toFixed(2)}</span>
                      </p>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-lg p-1">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-zinc-100">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Total Item Price */}
                      <div className="text-right min-w-[70px]">
                        <span className="text-base font-black text-amber-400 font-display">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      {/* Delete */}
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 text-zinc-500 hover:text-red-400 rounded-lg hover:bg-zinc-800/80 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between items-center text-xs text-zinc-400 pt-2">
              <button
                onClick={clearCart}
                className="hover:text-red-400 transition-colors underline cursor-pointer"
              >
                Clear Entire Shopping Cart
              </button>
              <span>Authentic MA CONSIDER Pro Warranty Included</span>
            </div>
          </div>

          {/* Cart Summary Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-5">
              <h2 className="text-lg font-black text-zinc-100 font-display border-b border-zinc-800 pb-3">
                Order Financial Summary
              </h2>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo Code (e.g. USA10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 uppercase font-mono focus:border-amber-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-amber-400 hover:text-zinc-950 text-zinc-200 text-xs font-bold uppercase transition-colors"
                >
                  Apply
                </button>
              </form>

              {appliedCoupon && (
                <div className="flex items-center justify-between text-xs p-2.5 rounded bg-amber-400/10 border border-amber-400/30 text-amber-400">
                  <span>Coupon Applied: {appliedCoupon.code}</span>
                  <button
                    onClick={removeCoupon}
                    className="text-red-400 hover:underline font-bold text-[11px]"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Cost Rows */}
              <div className="space-y-2.5 text-xs text-zinc-300">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Subtotal</span>
                  <span className="font-bold">${cartSubtotal.toFixed(2)}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Discount</span>
                    <span>-${cartDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-zinc-400">Estimated Shipping (USA)</span>
                  <span className="font-bold">
                    {cartShipping === 0 ? (
                      <span className="text-emerald-400 uppercase font-extrabold">FREE</span>
                    ) : (
                      `$${cartShipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Estimated Sales Tax</span>
                  <span className="font-bold">${cartTax.toFixed(2)}</span>
                </div>

                <div className="pt-3 border-t border-zinc-800 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-zinc-100">Total</span>
                  <span className="text-2xl font-black text-amber-400 font-display">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Action */}
              <button
                onClick={() => setIsCheckoutModalOpen(true)}
                className="w-full py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-400/20 active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="space-y-2 pt-3 border-t border-zinc-800/80 text-[11px] text-zinc-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>256-Bit SSL Encrypted USA Checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Tracked Nationwide Dispatch (24-48h)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
