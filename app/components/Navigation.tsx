'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, ChevronDown, Palette } from 'lucide-react';
import { useTheme } from '../lib/theme-context';
import { useCart } from '../lib/cart-context';
import { THEMES, LAYOUTS } from '../lib/themes';
import type { ThemeId, LayoutId } from '../lib/themes';

export default function Navigation() {
  const { theme, layout, setTheme, setLayout } = useTheme();
  const { cart, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileThemeOpen, setMobileThemeOpen] = useState(false);

  const currentTheme = THEMES.find((t) => t.id === theme);

  const navLinks = [
    { label: 'Oracle Deck', href: '#cards' },
    { label: 'Products', href: '#products' },
    { label: 'Chapters', href: '#chapters' },
    { label: 'The Triptych', href: '#triptych' },
    { label: 'NFC Bridge', href: '#nfc' },
  ];

  return (
    <>
      {/* Fixed navbar */}
      <nav className="fixed top-0 left-0 right-0 z-[60]" style={{
        background: 'rgb(var(--bg-primary) / 0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgb(var(--border) / 0.1)',
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 no-underline">
              <svg width="24" height="24" viewBox="0 0 28 28" className="opacity-80">
                <circle cx="14" cy="14" r="4.2" fill="none" stroke="rgb(var(--accent))" strokeWidth="0.6" />
                {[0, 60, 120, 180, 240, 300].map(angle => (
                  <circle
                    key={angle}
                    cx={14 + 4.2 * Math.cos(angle * Math.PI / 180)}
                    cy={14 + 4.2 * Math.sin(angle * Math.PI / 180)}
                    r="4.2"
                    fill="none"
                    stroke="rgb(var(--accent))"
                    strokeWidth="0.6"
                    opacity="0.4"
                  />
                ))}
              </svg>
              <span className="text-xs font-heading tracking-[0.15em] uppercase" style={{ color: 'rgb(var(--text-primary))' }}>
                Meaning Full Power
              </span>
            </a>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[10px] tracking-[0.12em] uppercase no-underline transition-colors"
                  style={{ color: 'rgb(var(--text-secondary) / 0.7)' }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Cart + Mobile */}
            <div className="flex items-center gap-2">
              <button
                onClick={openCart}
                className="p-2 rounded-lg transition-colors relative cursor-pointer"
                style={{ color: 'rgb(var(--text-secondary))' }}
              >
                <ShoppingBag size={16} />
                {cart && cart.totalQuantity > 0 && (
                  <span
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-bold"
                    style={{ background: 'rgb(var(--accent))', color: 'rgb(var(--bg-primary))' }}
                  >
                    {cart.totalQuantity}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2 cursor-pointer"
                style={{ color: 'rgb(var(--text-secondary))' }}
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Theme switcher bar — horizontal, below navbar */}
      <div className="sticky top-14 z-50" style={{
        background: 'rgb(var(--bg-primary) / 0.7)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgb(var(--border) / 0.08)',
      }}>
        {/* Desktop — full horizontal row */}
        <div className="hidden md:block">
          <div className="flex items-center overflow-x-auto px-4 py-1.5" style={{ scrollbarWidth: 'none' }}>
            <div className="mx-auto flex items-center gap-0.5 p-0.5 rounded-lg" style={{
              background: 'rgb(var(--surface) / 0.4)',
              border: '1px solid rgb(var(--border) / 0.1)',
            }}>
              {THEMES.map(t => {
                const isActive = theme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id as ThemeId)}
                    className="relative z-10 cursor-pointer px-3 py-1.5 text-[10px] font-medium transition-colors whitespace-nowrap rounded-md"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="mfp-theme-pill"
                        className="absolute inset-0 rounded-md"
                        style={{
                          background: 'rgb(var(--accent) / 0.15)',
                          border: '1px solid rgb(var(--accent) / 0.25)',
                        }}
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      />
                    )}
                    <span className="relative" style={{
                      color: isActive ? 'rgb(var(--accent))' : 'rgb(var(--text-secondary) / 0.5)',
                    }}>
                      {t.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Layout sub-row */}
          <div className="flex items-center justify-center px-4 pb-1.5 -mt-0.5">
            <div className="flex items-center gap-1">
              <span className="text-[9px] font-medium uppercase tracking-[0.15em] mr-2" style={{ color: 'rgb(var(--text-secondary) / 0.3)' }}>
                Layout
              </span>
              {LAYOUTS.map(l => {
                const isActive = layout === l.id;
                return (
                  <button
                    key={l.id}
                    onClick={() => setLayout(l.id as LayoutId)}
                    className="relative z-10 cursor-pointer px-2.5 py-1 text-[9px] font-medium transition-colors whitespace-nowrap rounded-md"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="mfp-layout-pill"
                        className="absolute inset-0 rounded-md"
                        style={{
                          background: 'rgb(var(--accent) / 0.1)',
                          border: '1px solid rgb(var(--accent) / 0.2)',
                        }}
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      />
                    )}
                    <span className="relative" style={{
                      color: isActive ? 'rgb(var(--accent))' : 'rgb(var(--text-secondary) / 0.4)',
                    }}>
                      {l.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile — compact toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileThemeOpen(!mobileThemeOpen)}
            className="w-full flex items-center justify-between px-4 py-2 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Palette size={12} style={{ color: 'rgb(var(--accent))' }} />
              <span className="text-[10px] font-medium" style={{ color: 'rgb(var(--text-primary))' }}>
                {currentTheme?.name || 'Theme'}
              </span>
              <span className="text-[9px] px-2 py-0.5 rounded" style={{
                background: 'rgb(var(--surface) / 0.5)',
                color: 'rgb(var(--text-secondary))',
                border: '1px solid rgb(var(--border) / 0.1)',
              }}>
                {layout.charAt(0).toUpperCase() + layout.slice(1)}
              </span>
            </div>
            <ChevronDown size={12} className={`transition-transform ${mobileThemeOpen ? 'rotate-180' : ''}`} style={{ color: 'rgb(var(--text-secondary) / 0.5)' }} />
          </button>

          <AnimatePresence>
            {mobileThemeOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
                style={{ borderTop: '1px solid rgb(var(--border) / 0.05)' }}
              >
                <div className="px-4 py-3 space-y-3">
                  <div>
                    <p className="text-[8px] uppercase tracking-[0.2em] mb-2" style={{ color: 'rgb(var(--text-secondary) / 0.3)' }}>Realm</p>
                    <div className="flex flex-wrap gap-1">
                      {THEMES.map(t => (
                        <button
                          key={t.id}
                          onClick={() => { setTheme(t.id as ThemeId); setMobileThemeOpen(false); }}
                          className="px-2 py-1 text-[9px] font-medium cursor-pointer transition-colors rounded"
                          style={{
                            background: theme === t.id ? 'rgb(var(--accent) / 0.15)' : 'transparent',
                            color: theme === t.id ? 'rgb(var(--accent))' : 'rgb(var(--text-secondary) / 0.5)',
                            border: theme === t.id ? '1px solid rgb(var(--accent) / 0.25)' : '1px solid rgb(var(--border) / 0.1)',
                          }}
                        >
                          {t.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[8px] uppercase tracking-[0.2em] mb-2" style={{ color: 'rgb(var(--text-secondary) / 0.3)' }}>Layout</p>
                    <div className="flex gap-1">
                      {LAYOUTS.map(l => (
                        <button
                          key={l.id}
                          onClick={() => { setLayout(l.id as LayoutId); setMobileThemeOpen(false); }}
                          className="px-2.5 py-1 text-[9px] font-medium cursor-pointer transition-colors rounded"
                          style={{
                            background: layout === l.id ? 'rgb(var(--accent) / 0.15)' : 'transparent',
                            color: layout === l.id ? 'rgb(var(--accent))' : 'rgb(var(--text-secondary) / 0.5)',
                            border: layout === l.id ? '1px solid rgb(var(--accent) / 0.25)' : '1px solid rgb(var(--border) / 0.1)',
                          }}
                        >
                          {l.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile nav overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[55] pt-14 lg:hidden"
            style={{ background: 'rgb(var(--bg-primary) / 0.95)', backdropFilter: 'blur(20px)' }}
          >
            <div className="flex flex-col items-center gap-6 pt-12">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-lg tracking-[0.15em] uppercase no-underline font-heading"
                  style={{ color: 'rgb(var(--text-primary))' }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
