'use client';

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import type { ShopifyCart } from './shopify';
import { createCart, addToCart, removeFromCart } from './shopify';

interface CartContextType {
  cart: ShopifyCart | null;
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
  openCart: () => void;
  closeCart: () => void;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cartRef = useRef<ShopifyCart | null>(null);

  const commitCart = useCallback((nextCart: ShopifyCart | null) => {
    cartRef.current = nextCart;
    setCart(nextCart);
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback(async (variantId: string, quantity = 1) => {
    setIsLoading(true);
    setError(null);
    const currentCart = cartRef.current;

    try {
      const nextCart = currentCart
        ? await addToCart(currentCart.id, variantId, quantity)
        : await createCart(variantId, quantity);

      commitCart(nextCart);
      setIsOpen(true);
    } catch (err) {
      console.error('Failed to add to cart:', err);
      setError(err instanceof Error ? err.message : 'Failed to add item to cart.');
    } finally {
      setIsLoading(false);
    }
  }, [commitCart]);

  const removeItem = useCallback(async (lineId: string) => {
    const currentCart = cartRef.current;
    if (!currentCart) return;

    setIsLoading(true);
    setError(null);

    try {
      const updated = await removeFromCart(currentCart.id, lineId);
      commitCart(updated);
    } catch (err) {
      console.error('Failed to remove from cart:', err);
      setError(err instanceof Error ? err.message : 'Failed to remove item from cart.');
    } finally {
      setIsLoading(false);
    }
  }, [commitCart]);

  return (
    <CartContext.Provider value={{ cart, isOpen, isLoading, error, openCart, closeCart, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
}
