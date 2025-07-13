import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem, User, FilterOptions, ViewMode } from '@/types';

interface StoreState {
  // Products
  products: Product[];
  filteredProducts: Product[];
  loading: boolean;
  error: string | null;
  
  // Search & Filters
  searchQuery: string;
  filters: FilterOptions;
  viewMode: ViewMode;
  
  // Cart
  cart: CartItem[];
  cartOpen: boolean;
  
  // User
  user: User | null;
  
  // Actions
  setProducts: (products: Product[]) => void;
  setFilteredProducts: (products: Product[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: FilterOptions) => void;
  setViewMode: (mode: ViewMode) => void;
  addToCart: (product: Product, quantity?: number, size?: string, color?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setUser: (user: User | null) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Initial state
      products: [],
      filteredProducts: [],
      loading: false,
      error: null,
      searchQuery: '',
      filters: {},
      viewMode: 'grid',
      cart: [],
      cartOpen: false,
      user: null,
      
      // Actions
      setProducts: (products) => set({ products }),
      setFilteredProducts: (products) => set({ filteredProducts: products }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setFilters: (filters) => set({ filters }),
      setViewMode: (mode) => set({ viewMode: mode }),
      
      addToCart: (product, quantity = 1, size, color) => {
        const { cart } = get();
        const existingItem = cart.find(
          (item) => 
            item.product.id === product.id && 
            item.selectedSize === size && 
            item.selectedColor === color
        );
        
        if (existingItem) {
          set({
            cart: cart.map((item) =>
              item.product.id === product.id && 
              item.selectedSize === size && 
              item.selectedColor === color
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({
            cart: [...cart, { product, quantity, selectedSize: size, selectedColor: color }],
          });
        }
      },
      
      removeFromCart: (productId) => {
        const { cart } = get();
        set({ cart: cart.filter((item) => item.product.id !== productId) });
      },
      
      updateCartQuantity: (productId, quantity) => {
        const { cart } = get();
        if (quantity <= 0) {
          set({ cart: cart.filter((item) => item.product.id !== productId) });
        } else {
          set({
            cart: cart.map((item) =>
              item.product.id === productId ? { ...item, quantity } : item
            ),
          });
        }
      },
      
      clearCart: () => set({ cart: [] }),
      toggleCart: () => set((state) => ({ cartOpen: !state.cartOpen })),
      setUser: (user) => set({ user }),
      
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      },
    }),
    {
      name: 'ecommerce-store',
      partialize: (state) => ({
        cart: state.cart,
        user: state.user,
        viewMode: state.viewMode,
      }),
    }
  )
);