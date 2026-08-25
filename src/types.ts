export interface Product {
  id: string;
  name: string;
  brand: string;
  modelSku: string;
  category: string;
  voltage?: string;
  toolType: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  isDeal?: boolean;
  dealTag?: string;
  shortSpec: string;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  included: string[];
  images: string[];
  imageSlotId?: number; // mapped to customizable 10-slot manager
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  image: string;
  imageSlotId?: number;
  count: number;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedOption?: string;
}

export interface CustomerOrder {
  id: string;
  orderNumber: string;
  date: string;
  status: 'Processing' | 'Preparing Shipment' | 'In Transit' | 'Out for Delivery' | 'Delivered';
  items: CartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  shippingCost: number;
  total: number;
  shippingAddress: {
    fullName: string;
    email: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  shippingMethod: string;
  paymentMethod: string;
  trackingNumber: string;
  carrier: string;
  estimatedDelivery: string;
}

export interface ImageSlot {
  id: number;
  title: string;
  location: string;
  description: string;
  defaultUrl: string;
  customUrl: string;
}

export type PageView =
  | 'home'
  | 'about'
  | 'services'
  | 'gallery'
  | 'contact'
  | 'shop'
  | 'categories'
  | 'deals'
  | 'wishlist'
  | 'compare'
  | 'pro-contractor'
  | 'warranty'
  | 'track-order'
  | 'product-detail'
  | 'cart';
