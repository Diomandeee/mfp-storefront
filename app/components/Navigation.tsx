'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Palette, LayoutGrid } from 'lucide-react';
import { useTheme } from '../lib/theme-context';
import { useCart } from '../lib/cart-context';
import { THEMES, LAYOUTS } from '../lib/themes';
import type { ThemeId, LayoutId } from '../lib/themes';

export default function Navigation() {
  const { theme, layout, setTheme, setLayout } = useTheme();
  const { cart, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const navLinks = [
    { label: 'Oracle Deck', href: '#cards' },
    { label: 'Products', href: '#products' },
    { label: 'Chapters', href: '#chapters' },
    { label: 'The Triptych', href: '#triptych' },
    { label: 'NFC Bridge', href: '#nfc' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50" style={{
        background: 'rgb(var(--bg-primary) / 0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgb(var(--border) / 0.1)',
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 no-underline">
              <svg width="28" height="28" viewBox="0 0 28 28" className="opacity-80">
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
                    opacity="0.5"
                  />
                ))}
              </svg>
              <span className="font-heading text-sm tracking-[0.2em] uppercase" style={{ color: 'rgb(var(--text-primary))' }}>
                Meaning Full Power
              </span>
            </a>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs tracking-[0.15em] uppercase no-underline transition-colors hover:opacity-100"
                  style={{ color: 'rgb(var(--text-secondary))', opacity: 0.7 }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              {/* Theme/Layout picker */}
              <button
                onClick={() => setSettingsOpen(!settingsOpen)}
                className="p-2 rounded-full transition-colors cursor-pointer"
                style={{ color: 'rgb(var(--text-secondary))' }}
                aria-label="Theme settings"
              >
                <Palette size={18} />
              </button>

              {/* Cart */}
              <button
                onClick={openCart}
                className="p-2 rounded-full transition-colors relative cursor-pointer"
                style={{ color: 'rgb(var(--text-secondary))' }}
                aria-label="Open cart"
              >
                <ShoppingBag size={18} />
                {cart && cart.totalQuantity > 0 && (
                  <span
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold"
                    style={{
                      background: 'rgb(var(--accent))',
                      color: 'rgb(var(--bg-primary))',
                    }}
                  >
                    {cart.totalQuantity}
                  </span>
                )}
              </button>

              {/* Mobile menu */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2 cursor-pointer"
                style={{ color: 'rgb(var(--text-secondary))' }}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 pt-16 lg:hidden"
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

      {/* Theme/Layout settings panel */}
      <AnimatePresence>
        {settingsOpen && (
          <>
          {/* Backdrop to dismiss */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={() => setSettingsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed top-16 right-4 z-50 w-72 rounded-xl overflow-hidden"
            style={{
              background: 'rgb(var(--bg-secondary))',
              border: '1px solid rgb(var(--border) / 0.15)',
              boxShadow: '0 20px 60px rgb(0 0 0 / 0.4)',
            }}
          >
            <div className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Palette size={14} style={{ color: 'rgb(var(--accent))' }} />
                <span className="text-xs tracking-[0.2em] uppercase font-heading" style={{ color: 'rgb(var(--text-primary))' }}>
                  Theme
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 mb-6">
                {THEMES.map(t => (
                  <button
                    key={t.id}
                    onClick={() => { setTheme(t.id as ThemeId); setSettingsOpen(false); }}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg cursor-pointer transition-all text-left"
                    style={{
                      background: theme === t.id ? 'rgb(var(--accent) / 0.1)' : 'transparent',
                      border: theme === t.id
                        ? '1px solid rgb(var(--accent) / 0.3)'
                        : '1px solid transparent',
                    }}
                  >
                    <span
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ background: t.accentHex }}
                    />
                    <span className="text-[10px] font-medium" style={{ color: theme === t.id ? 'rgb(var(--text-primary))' : 'rgb(var(--text-secondary))' }}>
                      {t.name}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 mb-4">
                <LayoutGrid size={14} style={{ color: 'rgb(var(--accent))' }} />
                <span className="text-xs tracking-[0.2em] uppercase font-heading" style={{ color: 'rgb(var(--text-primary))' }}>
                  Layout
                </span>
              </div>
              <div className="flex flex-col gap-1">
                {LAYOUTS.map(l => (
                  <button
                    key={l.id}
                    onClick={() => setLayout(l.id as LayoutId)}
                    className="text-left px-3 py-2 rounded-lg text-xs cursor-pointer transition-all"
                    style={{
                      background: layout === l.id ? 'rgb(var(--accent) / 0.1)' : 'transparent',
                      color: layout === l.id ? 'rgb(var(--text-primary))' : 'rgb(var(--text-secondary))',
                      border: layout === l.id ? '1px solid rgb(var(--accent) / 0.2)' : '1px solid transparent',
                    }}
                  >
                    <span className="font-heading tracking-wide">{l.name}</span>
                    <span className="block opacity-50 mt-0.5">{l.description}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
