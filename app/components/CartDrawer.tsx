'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../lib/cart-context';
import { formatPrice } from '../lib/shopify';

export default function CartDrawer() {
  const { cart, isOpen, isLoading, closeCart, removeItem } = useCart();

  const lines = cart?.lines?.edges?.map(e => e.node) || [];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50"
            style={{ background: 'rgb(0 0 0 / 0.6)', backdropFilter: 'blur(4px)' }}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md flex flex-col"
            style={{
              background: 'rgb(var(--bg-primary))',
              borderLeft: '1px solid rgb(var(--border) / 0.15)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6" style={{ borderBottom: '1px solid rgb(var(--border) / 0.1)' }}>
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} style={{ color: 'rgb(var(--accent))' }} />
                <span className="font-heading text-sm tracking-[0.15em] uppercase" style={{ color: 'rgb(var(--text-primary))' }}>
                  Your Collection
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 cursor-pointer rounded-full transition-colors"
                style={{ color: 'rgb(var(--text-secondary))' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {lines.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: 'rgb(var(--surface))' }}
                  >
                    <ShoppingBag size={24} style={{ color: 'rgb(var(--accent) / 0.4)' }} />
                  </div>
                  <p className="font-heading text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                    Your oracle collection awaits
                  </p>
                  <p className="text-xs" style={{ color: 'rgb(var(--text-body) / 0.5)' }}>
                    Draw your first card from the deck below
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {lines.map(line => {
                    const img = line.merchandise.product.images.edges[0]?.node;
                    return (
                      <div
                        key={line.id}
                        className="flex gap-4 p-4 rounded-xl"
                        style={{ background: 'rgb(var(--surface))' }}
                      >
                        {img && (
                          <div
                            className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0"
                            style={{ background: 'rgb(var(--bg-tertiary))' }}
                          >
                            <img
                              src={img.url}
                              alt={img.altText || line.merchandise.product.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-heading truncate" style={{ color: 'rgb(var(--text-primary))' }}>
                            {line.merchandise.product.title}
                          </p>
                          <p className="text-xs mt-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                            Qty: {line.quantity}
                          </p>
                          <p className="text-sm mt-1 font-heading" style={{ color: 'rgb(var(--accent))' }}>
                            {formatPrice(line.merchandise.price.amount, line.merchandise.price.currencyCode)}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(line.id)}
                          className="self-start p-1 cursor-pointer"
                          style={{ color: 'rgb(var(--text-secondary) / 0.5)' }}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {lines.length > 0 && cart && (
              <div className="p-6" style={{ borderTop: '1px solid rgb(var(--border) / 0.1)' }}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>Total</span>
                  <span className="font-heading text-lg" style={{ color: 'rgb(var(--text-primary))' }}>
                    {formatPrice(cart.cost.totalAmount.amount, cart.cost.totalAmount.currencyCode)}
                  </span>
                </div>
                <a
                  href={cart.checkoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 text-center rounded-xl font-heading text-sm tracking-[0.15em] uppercase no-underline transition-all"
                  style={{
                    background: 'rgb(var(--accent))',
                    color: 'rgb(var(--bg-primary))',
                  }}
                >
                  {isLoading ? 'Preparing...' : 'Claim Your Cards'}
                </a>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
