import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, CustomerOrder, ImageSlot, PageView } from '../types';
import { PRODUCTS } from '../data/products';
import { INITIAL_IMAGE_SLOTS } from '../data/imageSlots';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message: string;
}

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  orders: CustomerOrder[];
  activePage: PageView;
  selectedCategory: string | null;
  selectedProduct: Product | null;
  quickViewProduct: Product | null;
  isCartDrawerOpen: boolean;
  isCheckoutModalOpen: boolean;
  isImageManagerOpen: boolean;
  searchQuery: string;
  imageSlots: ImageSlot[];
  appliedCoupon: { code: string; discountPercent: number; discountAmount?: number } | null;
  toasts: ToastMessage[];

  // Navigation actions
  navigateTo: (page: PageView, categoryFilter?: string | null, product?: Product | null) => void;
  setSelectedProduct: (product: Product | null) => void;
  setQuickViewProduct: (product: Product | null) => void;
  setIsCartDrawerOpen: (open: boolean) => void;
  setIsCheckoutModalOpen: (open: boolean) => void;
  setIsImageManagerOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (cat: string | null) => void;

  // Cart actions
  addToCart: (product: Product, quantity?: number, selectedOption?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Wishlist actions
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Order actions
  createOrder: (orderData: Omit<CustomerOrder, 'id' | 'orderNumber' | 'date' | 'status' | 'trackingNumber' | 'carrier' | 'estimatedDelivery'>) => CustomerOrder;
  findOrderByTracking: (trackingOrOrderNum: string) => CustomerOrder | undefined;

  // Image Slot Manager actions
  updateImageSlot: (id: number, customUrl: string) => void;
  resetImageSlot: (id: number) => void;
  resetAllImageSlots: () => void;
  getImageUrl: (slotId?: number, fallbackUrl?: string) => string;

  // Toast
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;

  // Financial calculations
  cartSubtotal: number;
  cartDiscount: number;
  cartTax: number;
  cartShipping: number;
  cartTotal: number;
  cartCount: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state from localStorage where available
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ma_consider_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ma_consider_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<CustomerOrder[]>(() => {
    try {
      const saved = localStorage.getItem('ma_consider_orders');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback sample order
    }
    return [
      {
        id: 'ord-sample-1',
        orderNumber: 'MAC-89241',
        date: '2026-08-20',
        status: 'In Transit',
        items: [
          { product: PRODUCTS[0], quantity: 1 },
          { product: PRODUCTS[4], quantity: 1 }
        ],
        subtotal: 308.00,
        discount: 30.80,
        tax: 22.18,
        shippingCost: 0,
        total: 299.38,
        shippingAddress: {
          fullName: 'Robert Harrison',
          email: 'r.harrison.contractor@gmail.com',
          phone: '(415) 555-0192',
          addressLine1: '482 Industrial Parkway',
          city: 'Dallas',
          state: 'TX',
          zipCode: '75201',
          country: 'United States'
        },
        shippingMethod: 'Free USA Contractor Ground (3-5 Days)',
        paymentMethod: 'Credit Card (ending in 4242)',
        trackingNumber: 'USPS-940010009823471203',
        carrier: 'USPS Priority Commercial',
        estimatedDelivery: 'August 26, 2026'
      }
    ];
  });

  const [imageSlots, setImageSlots] = useState<ImageSlot[]>(() => {
    try {
      const saved = localStorage.getItem('ma_consider_image_slots');
      if (saved) {
        const parsed: ImageSlot[] = JSON.parse(saved);
        return INITIAL_IMAGE_SLOTS.map((initSlot) => {
          const match = parsed.find((p) => p.id === initSlot.id);
          return {
            ...initSlot,
            customUrl: match?.customUrl || ''
          };
        });
      }
      return INITIAL_IMAGE_SLOTS;
    } catch {
      return INITIAL_IMAGE_SLOTS;
    }
  });

  const [activePage, setActivePage] = useState<PageView>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isImageManagerOpen, setIsImageManagerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPercent: number; discountAmount?: number } | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('ma_consider_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('ma_consider_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('ma_consider_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('ma_consider_image_slots', JSON.stringify(imageSlots));
  }, [imageSlots]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage, selectedProduct]);

  // Toast handler
  const showToast = (title: string, message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const navigateTo = (page: PageView, categoryFilter?: string | null, product?: Product | null) => {
    setActivePage(page);
    if (categoryFilter !== undefined) {
      setSelectedCategory(categoryFilter);
    }
    if (product !== undefined) {
      setSelectedProduct(product);
    }
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1, selectedOption?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.selectedOption === selectedOption);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id && item.selectedOption === selectedOption
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedOption }];
    });
    showToast('Added to Cart', `${product.name} (x${quantity}) has been added to your shopping cart.`);
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Item Removed', 'Product removed from your cart.', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, quantity } : item));
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'PRO10' || clean === 'CONTRACTOR10') {
      setAppliedCoupon({ code: clean, discountPercent: 10 });
      showToast('Coupon Applied', '10% Contractor Discount applied successfully!');
      return { success: true, message: '10% discount applied to eligible items!' };
    }
    if (clean === 'WELCOME5' || clean === 'MACONSIDER5' || clean === 'MA5') {
      setAppliedCoupon({ code: clean, discountPercent: 5 });
      showToast('Coupon Applied', '5% First-Time Buyer Discount applied!');
      return { success: true, message: '5% discount applied to your order!' };
    }
    if (clean === 'USAFREE') {
      setAppliedCoupon({ code: clean, discountPercent: 0, discountAmount: 15 });
      showToast('Coupon Applied', 'Express Priority Shipping voucher applied!');
      return { success: true, message: 'Priority Shipping voucher applied!' };
    }
    showToast('Invalid Coupon', 'The discount code you entered is invalid or expired.', 'warning');
    return { success: false, message: 'Invalid promo code. Try PRO10 for 10% off.' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon Removed', 'Promo code removed from your order.', 'info');
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Wishlist', 'Item removed from your saved tools list.', 'info');
        return prev.filter(id => id !== productId);
      } else {
        const prod = PRODUCTS.find(p => p.id === productId);
        showToast('Saved to Wishlist', `${prod ? prod.name : 'Tool'} saved to your wishlist.`);
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  // Financial computations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartDiscount = appliedCoupon
    ? appliedCoupon.discountPercent > 0
      ? (cartSubtotal * appliedCoupon.discountPercent) / 100
      : (appliedCoupon.discountAmount || 0)
    : 0;
  
  // Free ground shipping for orders over $99 in USA
  const cartShipping = cartSubtotal >= 99 || cartSubtotal === 0 ? 0 : 9.99;
  const cartTax = (cartSubtotal - cartDiscount) > 0 ? (cartSubtotal - cartDiscount) * 0.0725 : 0; // Estimated 7.25% average state sales tax
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartTax + cartShipping);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Image slots
  const updateImageSlot = (id: number, customUrl: string) => {
    setImageSlots(prev =>
      prev.map(slot => (slot.id === id ? { ...slot, customUrl: customUrl.trim() } : slot))
    );
    showToast('Image Slot Updated', `Slot ${id} image updated. Live previews updated immediately!`);
  };

  const resetImageSlot = (id: number) => {
    setImageSlots(prev =>
      prev.map(slot => (slot.id === id ? { ...slot, customUrl: '' } : slot))
    );
    showToast('Slot Reset', `Slot ${id} restored to default tool image.`);
  };

  const resetAllImageSlots = () => {
    setImageSlots(INITIAL_IMAGE_SLOTS);
    showToast('All Slots Reset', 'All 10 image placeholders reset to original high-res defaults.');
  };

  const getImageUrl = (slotId?: number, fallbackUrl?: string) => {
    if (slotId) {
      const slot = imageSlots.find(s => s.id === slotId);
      if (slot && slot.customUrl && slot.customUrl.trim().length > 0) {
        return slot.customUrl;
      }
      if (slot && slot.defaultUrl) {
        return slot.defaultUrl;
      }
    }
    return fallbackUrl || 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1000&q=80';
  };

  // Order creation
  const createOrder = (orderData: Omit<CustomerOrder, 'id' | 'orderNumber' | 'date' | 'status' | 'trackingNumber' | 'carrier' | 'estimatedDelivery'>): CustomerOrder => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const trackingCode = `USPS-94001000${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    const today = new Date().toISOString().split('T')[0];
    
    // Estimate delivery in 3-4 business days
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 4);
    const formattedDelivery = deliveryDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    const newOrder: CustomerOrder = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: `MAC-${randomNum}`,
      date: today,
      status: 'Processing',
      trackingNumber: trackingCode,
      carrier: 'USPS Priority Commercial',
      estimatedDelivery: formattedDelivery
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setAppliedCoupon(null);
    showToast('Order Placed Successfully!', `Order #${newOrder.orderNumber} confirmed. Confirmation receipt ready.`);
    return newOrder;
  };

  const findOrderByTracking = (query: string): CustomerOrder | undefined => {
    const clean = query.trim().toUpperCase();
    return orders.find(
      o => o.orderNumber.toUpperCase() === clean ||
           o.trackingNumber.toUpperCase() === clean ||
           o.trackingNumber.replace(/[^a-zA-Z0-9]/g, '').includes(clean.replace(/[^a-zA-Z0-9]/g, ''))
    );
  };

  return (
    <StoreContext.Provider
      value={{
        products: PRODUCTS,
        cart,
        wishlist,
        orders,
        activePage,
        selectedCategory,
        selectedProduct,
        quickViewProduct,
        isCartDrawerOpen,
        isCheckoutModalOpen,
        isImageManagerOpen,
        searchQuery,
        imageSlots,
        appliedCoupon,
        toasts,
        navigateTo,
        setSelectedProduct,
        setQuickViewProduct,
        setIsCartDrawerOpen,
        setIsCheckoutModalOpen,
        setIsImageManagerOpen,
        setSearchQuery,
        setSelectedCategory,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        toggleWishlist,
        isWishlisted,
        createOrder,
        findOrderByTracking,
        updateImageSlot,
        resetImageSlot,
        resetAllImageSlots,
        getImageUrl,
        showToast,
        removeToast,
        cartSubtotal,
        cartDiscount,
        cartTax,
        cartShipping,
        cartTotal,
        cartCount
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
