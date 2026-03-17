'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { ShopifyCart } from './shopify';
import { createCart, addToCart, removeFromCart, updateCartLine } from './shopify';
import Toast, { type ToastMessage } from '../components/Toast';

interface CartContextType {
  cart: ShopifyCart | null;
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
  openCart: () => void;
  closeCart: () => void;
  addItem: (variantId: string, quantity?: number, productName?: string) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  updateItemQuantity: (lineId: string, quantity: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [errorToast, setErrorToast] = useState<string | null>(null);
  const cartRef = useRef<ShopifyCart | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const errorToastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const commitCart = useCallback((nextCart: ShopifyCart | null) => {
    cartRef.current = nextCart;
    setCart(nextCart);
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const showToast = useCallback((nextToast: ToastMessage) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    if (errorToastTimeoutRef.current) {
      clearTimeout(errorToastTimeoutRef.current);
      errorToastTimeoutRef.current = null;
    }

    setErrorToast(null);
    setToast(nextToast);
    toastTimeoutRef.current = setTimeout(() => {
      setToast(null);
      toastTimeoutRef.current = null;
    }, 3000);
  }, []);

  const showErrorToast = useCallback((message: string) => {
    if (errorToastTimeoutRef.current) {
      clearTimeout(errorToastTimeoutRef.current);
    }
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = null;
    }

    setToast(null);
    setErrorToast(message);
    errorToastTimeoutRef.current = setTimeout(() => {
      setErrorToast(null);
      errorToastTimeoutRef.current = null;
    }, 4000);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
      if (errorToastTimeoutRef.current) {
        clearTimeout(errorToastTimeoutRef.current);
      }
    };
  }, []);

  const addItem = useCallback(async (variantId: string, quantity = 1, productName = 'Unknown Card') => {
    setIsLoading(true);
    setError(null);
    const currentCart = cartRef.current;

    try {
      const nextCart = currentCart
        ? await addToCart(currentCart.id, variantId, quantity)
        : await createCart(variantId, quantity);

      commitCart(nextCart);
      setIsOpen(true);
      showToast({
        title: 'Card acquired',
        detail: productName,
      });
    } catch (err) {
      console.error('Failed to add to cart:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to add item to cart.';
      setError(errorMessage);
      showErrorToast(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [commitCart, showErrorToast, showToast]);

  const removeItem = useCallback(async (lineId: string) => {
    const currentCart = cartRef.current;
    if (!currentCart) return;

    setIsLoading(true);
    setError(null);

    try {
      const updated = await removeFromCart(currentCart.id, lineId);
      commitCart(updated);
      showToast({ title: 'Card released', detail: 'Item removed from collection' });
    } catch (err) {
      console.error('Failed to remove from cart:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to remove item from cart.';
      setError(errorMessage);
      showErrorToast(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [commitCart, showErrorToast, showToast]);

  const updateItemQuantity = useCallback(async (lineId: string, quantity: number) => {
    const currentCart = cartRef.current;
    if (!currentCart) return;
    const currentLine = currentCart.lines.edges.find((edge) => edge.node.id === lineId)?.node;
    const previousQuantity = currentLine?.quantity ?? 0;

    setIsLoading(true);
    setError(null);

    try {
      const updated = quantity <= 0
        ? await removeFromCart(currentCart.id, lineId)
        : await updateCartLine(currentCart.id, lineId, quantity);

      commitCart(updated);
      if (quantity <= 0) {
        showToast({ title: 'Card released', detail: 'Item removed from collection' });
      } else if (quantity < previousQuantity) {
        showToast({ title: 'Quantity updated', detail: 'Collection adjusted' });
      } else if (quantity > previousQuantity) {
        showToast({ title: 'Card stacked', detail: 'Quantity increased' });
      }
    } catch (err) {
      console.error('Failed to update cart quantity:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to update cart quantity.';
      setError(errorMessage);
      showErrorToast(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [commitCart, showErrorToast, showToast]);

  return (
    <CartContext.Provider value={{ cart, isOpen, isLoading, error, openCart, closeCart, addItem, removeItem, updateItemQuantity }}>
      {children}
      <Toast toast={toast} />
      <AnimatePresence>
        {errorToast && (
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="fixed bottom-6 left-1/2 z-[70] w-[min(92vw,24rem)] -translate-x-1/2 overflow-hidden rounded-[24px] px-5 py-4"
            style={{
              background: 'linear-gradient(135deg, rgb(var(--surface)), rgb(var(--bg-secondary)))',
              color: 'rgb(var(--status-error))',
              border: '1px solid rgb(var(--status-error) / 0.24)',
              boxShadow: '0 0 28px rgb(var(--status-error) / 0.12), 0 18px 52px rgb(0 0 0 / 0.3)',
            }}
          >
            <p className="text-[10px] tracking-[0.28em] uppercase font-heading" style={{ color: 'rgb(var(--status-error) / 0.7)' }}>
              Oracle Error
            </p>
            <p className="mt-1 font-heading text-sm" style={{ color: 'rgb(var(--status-error-soft))' }}>
              {errorToast}
            </p>
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
