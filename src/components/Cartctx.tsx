'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
// import { hhgApi } from '@/lib/hhgApi';
// import { useHHGAuth } from '@/lib/authContext';

// 1. Data Type Interfaces
export interface CartItem {
  id?: string;
  productId: string;
  name?: string;
  price?: number;
  quantity: number;
  image?: string;
}

export interface CartData {
  id: string;
  subtotal?: number;
  total?: number;
  userId?: string;
  [key: string]: unknown;
}

export interface ApiResponse<T = any> {
  ok: boolean;
  data?: {
    data?: T;
  };
  error?: string;
}

// 2. Context Type Interface
export interface CartContextType {
  cart: CartData | null;
  items: CartItem[];
  loading: boolean;
  itemCount: number;
  refresh: (cartId?: string) => Promise<void>;
  addToCart: (productId: string) => Promise<ApiResponse>;
  removeFromCart: (productId: string) => Promise<ApiResponse>;
  increment: (productId: string) => Promise<ApiResponse>;
  decrement: (productId: string) => Promise<ApiResponse>;
}

const CART_ID_KEY = 'hhg_cart_id';

const CartCtx = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
//   const { user } = useHHGAuth();
const user = true;
  const [cart, setCart] = useState<CartData | null>(null);
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const refresh = useCallback(async (cartId?: string) => {
    // Check window/localStorage safety for Next.js SSR execution
    const storedId = typeof window !== 'undefined' ? localStorage.getItem(CART_ID_KEY) : null;
    const id = cartId || storedId;

    if (!id) {
      setCart(null);
      setItems([]);
      return;
    }

    setLoading(true);
    // try {
    //   const res: ApiResponse = await hhgApi.getCart(id);
    //   if (res.ok && res.data?.data) {
    //     const data = res.data.data;
    //     setCart((data.cart || data) as CartData);
    //     setItems((data.cart_items || data.cartItems || []) as CartItem[]);
    //   }
    // } catch {
    //   // Silently ignore cart fetch failures
    // } finally {
    //   setLoading(false);
    // }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh, user]); // Refetches/updates if user state changes

  // After any mutation that returns cart data, persist the cartId
  const handleCartResponse = async (res: ApiResponse): Promise<ApiResponse> => {
    if (res.ok && res.data?.data) {
      const data = res.data.data;
      const cartId = data.cart?.id || data.cartId || data.id;

      if (cartId && typeof window !== 'undefined') {
        localStorage.setItem(CART_ID_KEY, cartId);
      }
      await refresh(cartId);
    }
    return res;
  };

  const addToCart = async (productId: string): Promise<ApiResponse> => {
    const res: ApiResponse = await addToCart(productId);
    return handleCartResponse(res);
    console.log("cart added")
  };

  const removeFromCart = async (productId: string): Promise<ApiResponse> => {
    const res: ApiResponse = await removeFromCart(productId);
    if (res.ok) await refresh();
    return res;
    console.log("cart removed")
  };

  const increment = async (productId: string): Promise<ApiResponse> => {
    const res: ApiResponse = await increment(productId);
    if (res.ok) await refresh();
    return res;
    console.log("Increment")
  };

  const decrement = async (productId: string): Promise<ApiResponse> => {
    const res: ApiResponse = await decrement(productId);
    if (res.ok) await refresh();
    return res;
    console.log("decrement")
  };

  const itemCount = items.reduce((s, i) => s + (i?.quantity || 0), 0);

  return (
    <CartCtx.Provider
      value={{
        cart,
        items,
        loading,
        itemCount,
        refresh,
        addToCart,
        removeFromCart,
        increment,
        decrement,
      }}
    >
      {children}
    </CartCtx.Provider>
  );
}

// 3. Custom Hook with Type Guarding Safety
export const useCart = (): CartContextType => {
  const context = useContext(CartCtx);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};