'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ShopifyCart } from './shopify';
import { createCart, addToCart, removeFromCart } from './shopify';

interface CartContextType {
  cart: ShopifyCart | null;
  isOpen: boolean;
  isLoading: boolean;
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

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback(async (variantId: string, quantity = 1) => {
    setIsLoading(true);
    try {
      if (cart) {
        const updated = await addToCart(cart.id, variantId, quantity);
        setCart(updated);
      } else {
        const newCart = await createCart(variantId, quantity);
        setCart(newCart);
      }
      setIsOpen(true);
    } catch (err) {
      console.error('Failed to add to cart:', err);
    } finally {
      setIsLoading(false);
    }
  }, [cart]);

  const removeItem = useCallback(async (lineId: string) => {
    if (!cart) return;
    setIsLoading(true);
    try {
      const updated = await removeFromCart(cart.id, lineId);
      setCart(updated);
    } catch (err) {
      console.error('Failed to remove from cart:', err);
    } finally {
      setIsLoading(false);
    }
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, isOpen, isLoading, openCart, closeCart, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
}
