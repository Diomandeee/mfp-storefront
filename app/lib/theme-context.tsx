'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { ThemeId, LayoutId } from './themes';

interface ThemeContextType {
  theme: ThemeId;
  layout: LayoutId;
  setTheme: (t: ThemeId) => void;
  setLayout: (l: LayoutId) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const THEME_ATTR_MAP: Record<ThemeId, string> = {
  'sacred-gold': '',
  'moonlit': 'moonlit',
  'ember': 'ember',
  'crystal': 'crystal',
  'forest': 'forest',
  'desert': 'desert',
  'arctic': 'arctic',
  'cosmic': 'cosmic',
  'blood': 'blood',
  'dawn': 'dawn',
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>('sacred-gold');
  const [layout, setLayoutState] = useState<LayoutId>('classic');

  const setTheme = useCallback((t: ThemeId) => {
    setThemeState(t);
    if (typeof window !== 'undefined') {
      localStorage.setItem('mfp-theme', t);
    }
  }, []);

  const setLayout = useCallback((l: LayoutId) => {
    setLayoutState(l);
    if (typeof window !== 'undefined') {
      localStorage.setItem('mfp-layout', l);
    }
  }, []);

  // Apply data attributes
  useEffect(() => {
    const attr = THEME_ATTR_MAP[theme];
    if (attr) {
      document.documentElement.setAttribute('data-theme', attr);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    document.documentElement.setAttribute('data-layout', layout);
  }, [theme, layout]);

  // Restore from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('mfp-theme') as ThemeId | null;
    const savedLayout = localStorage.getItem('mfp-layout') as LayoutId | null;
    if (saved && THEME_ATTR_MAP[saved] !== undefined) setThemeState(saved);
    if (savedLayout) setLayoutState(savedLayout);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, layout, setTheme, setLayout }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be inside ThemeProvider');
  return ctx;
}
