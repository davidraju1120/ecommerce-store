export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  category: string;
  subcategory?: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  features: string[];
  sizes?: string[];
  colors?: string[];
  discount?: number;
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  user: User;
  shippingAddress: ShippingAddress;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  paymentMethod: 'stripe' | 'paypal' | 'cash';
  paymentStatus: 'pending' | 'completed' | 'failed';
}

export interface FilterOptions {
  category?: string;
  priceRange?: [number, number];
  brand?: string;
  rating?: number;
  inStock?: boolean;
  sortBy?: 'price-low' | 'price-high' | 'rating' | 'newest' | 'popularity';
}

export type ViewMode = 'grid' | 'list';