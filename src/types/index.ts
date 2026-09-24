export type StockStatus = 'Disponible' | 'Últimas unidades' | 'Agotado';

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  category: string;
  material: string;
  color: string;
  dimensions: string;
  sizes?: string[];
  stockStatus: StockStatus;
  stockQuantity: number;
  images: string[];
  description: string;
  careGuide?: string;
  shippingInfo?: string;
  warrantyInfo?: string;
  isFeatured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  tags: string[];
  relatedProductIds?: string[];
  bundleProductIds?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
}

export interface CartItem {
  id: string; // unique item id (productId + selectedSize)
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface OrderDetails {
  customerName: string;
  phone: string;
  city: string;
  address: string;
  notes: string;
}

export interface StoreConfig {
  brandName: string;
  brandTagline: string;
  whatsappNumber: string; // E.g. "573001234567" (clean numbers only for wa.me)
  whatsappDisplayNumber: string; // E.g. "+57 300 123 4567"
  instagramHandle: string;
  instagramUrl: string;
  currencySymbol: string;
  freeShippingThreshold: number;
}
