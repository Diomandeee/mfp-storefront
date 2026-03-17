'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { ShopifyCart } from './shopify';
import { createCart, addToCart, removeFromCart, updateCartLineQuantity } from './shopify';

interface CartContextType {
  cart: ShopifyCart | null;
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
  openCart: () => void;
  closeCart: () => void;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  updateItemQuantity: (lineId: string, quantity: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const cartRef = useRef<ShopifyCart | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const commitCart = useCallback((nextCart: ShopifyCart | null) => {
    cartRef.current = nextCart;
    setCart(nextCart);
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const showToast = useCallback((message: string) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    setToastMessage(message);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
      toastTimeoutRef.current = null;
    }, 3000);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

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
      showToast('Added to cart');
    } catch (err) {
      console.error('Failed to add to cart:', err);
      setError(err instanceof Error ? err.message : 'Failed to add item to cart.');
    } finally {
      setIsLoading(false);
    }
  }, [commitCart, showToast]);

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

  const updateItemQuantity = useCallback(async (lineId: string, quantity: number) => {
    const currentCart = cartRef.current;
    if (!currentCart) return;

    setIsLoading(true);
    setError(null);

    try {
      const updated = quantity <= 0
        ? await removeFromCart(currentCart.id, lineId)
        : await updateCartLineQuantity(currentCart.id, lineId, quantity);

      commitCart(updated);
    } catch (err) {
      console.error('Failed to update cart quantity:', err);
      setError(err instanceof Error ? err.message : 'Failed to update cart quantity.');
    } finally {
      setIsLoading(false);
    }
  }, [commitCart]);

  return (
    <CartContext.Provider value={{ cart, isOpen, isLoading, error, openCart, closeCart, addItem, removeItem, updateItemQuantity }}>
      {children}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed bottom-6 left-1/2 z-[70] -translate-x-1/2 px-5 py-3 rounded-full text-sm font-heading tracking-[0.14em] uppercase"
            style={{
              background: 'rgb(var(--accent))',
              color: 'rgb(var(--bg-primary))',
              boxShadow: '0 14px 40px rgb(0 0 0 / 0.25)',
            }}
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
}
