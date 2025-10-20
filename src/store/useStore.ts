
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  part_code: string;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
  stock: number;
}

export interface User {
  id: string;
  email: string;
  role: string;
  full_name?: string;
}

interface StoreState {
  // Cart
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;

  // User
  user: User | null;
  setUser: (user: User | null) => void;

  // Theme
  isDarkMode: boolean;
  toggleTheme: () => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Cart
      cart: [],
      addToCart: (item) => {
        const { cart } = get();
        const existingItem = cart.find((cartItem) => cartItem.id === item.id);
        
        if (existingItem) {
          set({
            cart: cart.map((cartItem) =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: Math.min(cartItem.quantity + 1, item.stock) }
                : cartItem
            ),
          });
        } else {
          set({
            cart: [...cart, { ...item, quantity: 1 }],
          });
        }
      },
      removeFromCart: (id) => {
        set({
          cart: get().cart.filter((item) => item.id !== id),
        });
      },
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id);
          return;
        }
        
        set({
          cart: get().cart.map((item) =>
            item.id === id ? { ...item, quantity: Math.min(quantity, item.stock) } : item
          ),
        });
      },
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => {
        return get().cart.reduce((total, item) => total + item.price * item.quantity, 0);
      },
      getCartItemsCount: () => {
        return get().cart.reduce((total, item) => total + item.quantity, 0);
      },

      // User
      user: null,
      setUser: (user) => set({ user }),

      // Theme
      isDarkMode: false,
      toggleTheme: () => set({ isDarkMode: !get().isDarkMode }),

      // Search
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
    }),
    {
      name: '724parcabul-store',
      partialize: (state) => ({
        cart: state.cart,
        isDarkMode: state.isDarkMode,
      }),
    }
  )
);
