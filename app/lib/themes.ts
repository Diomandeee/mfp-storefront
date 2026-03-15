export type ThemeId =
  | 'sacred-gold'
  | 'moonlit'
  | 'ember'
  | 'crystal'
  | 'forest'
  | 'desert'
  | 'arctic'
  | 'cosmic'
  | 'blood'
  | 'dawn';

export type LayoutId = 'classic' | 'codex' | 'minimal' | 'gallery' | 'triptych';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  dataAttr: string; // value for data-theme attribute (empty string = default/root)
  bgPrimary: string;
  accentHex: string;
  fontHeading: string;
  fontBody: string;
  description: string;
}

export interface LayoutConfig {
  id: LayoutId;
  name: string;
  description: string;
  icon: string; // lucide icon name
}

export const THEMES: ThemeConfig[] = [
  {
    id: 'sacred-gold',
    name: 'Sacred Gold',
    dataAttr: '',
    bgPrimary: '#120A04',
    accentHex: '#D4AF37',
    fontHeading: 'Cinzel',
    fontBody: 'Cormorant Garamond',
    description: 'The signature oracle aesthetic. Gold foil on obsidian.',
  },
  {
    id: 'moonlit',
    name: 'Moonlit Oracle',
    dataAttr: 'moonlit',
    bgPrimary: '#0a0f1a',
    accentHex: '#c0c0c0',
    fontHeading: 'Cormorant Garamond',
    fontBody: 'Cormorant Garamond',
    description: 'Lunar, ethereal. Silver light on midnight blue.',
  },
  {
    id: 'ember',
    name: 'Ember Wisdom',
    dataAttr: 'ember',
    bgPrimary: '#1a0e06',
    accentHex: '#e8a317',
    fontHeading: 'Playfair Display',
    fontBody: 'Playfair Display',
    description: 'Firelit, ancient scroll. Warm amber on dark earth.',
  },
  {
    id: 'crystal',
    name: 'Crystal Seer',
    dataAttr: 'crystal',
    bgPrimary: '#120024',
    accentHex: '#a78bfa',
    fontHeading: 'Space Grotesk',
    fontBody: 'Space Grotesk',
    description: 'Prismatic, modern mystical. Crystal violet on deep purple.',
  },
  {
    id: 'forest',
    name: 'Forest Oracle',
    dataAttr: 'forest',
    bgPrimary: '#0a1a0f',
    accentHex: '#34d399',
    fontHeading: 'Merriweather',
    fontBody: 'Merriweather',
    description: 'Natural, woodland sage. Emerald on deep forest.',
  },
  {
    id: 'desert',
    name: 'Desert Prophet',
    dataAttr: 'desert',
    bgPrimary: '#1a1510',
    accentHex: '#c2855a',
    fontHeading: 'Libre Baskerville',
    fontBody: 'Libre Baskerville',
    description: 'Earthy, archeological. Terracotta on sand dark.',
  },
  {
    id: 'arctic',
    name: 'Arctic Rune',
    dataAttr: 'arctic',
    bgPrimary: '#0d1520',
    accentHex: '#7dd3fc',
    fontHeading: 'Inter',
    fontBody: 'Inter',
    description: 'Nordic, minimalist. Glacier blue on ice dark.',
  },
  {
    id: 'cosmic',
    name: 'Cosmic Deck',
    dataAttr: 'cosmic',
    bgPrimary: '#080012',
    accentHex: '#f472b6',
    fontHeading: 'Syne',
    fontBody: 'Syne',
    description: 'Galactic, star-scattered. Nebula pink on deep space.',
  },
  {
    id: 'blood',
    name: 'Blood Ink',
    dataAttr: 'blood',
    bgPrimary: '#0a0000',
    accentHex: '#dc2626',
    fontHeading: 'Bitter',
    fontBody: 'Bitter',
    description: 'Brutalist, raw, intense. Crimson on near-black.',
  },
  {
    id: 'dawn',
    name: 'Dawn Light',
    dataAttr: 'dawn',
    bgPrimary: '#fdf8f0',
    accentHex: '#b8860b',
    fontHeading: 'Jost',
    fontBody: 'Jost',
    description: 'Morning clarity. Soft gold on warm cream.',
  },
];

export const LAYOUTS: LayoutConfig[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Bento grid, balanced composition',
    icon: 'LayoutGrid',
  },
  {
    id: 'codex',
    name: 'Codex',
    description: 'Book manuscript, numbered entries, wide margins',
    icon: 'BookOpen',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Single column, centered, contemplative',
    icon: 'AlignCenter',
  },
  {
    id: 'gallery',
    name: 'Gallery',
    description: 'Masonry grid, card-dominant, hover reveals',
    icon: 'GalleryHorizontalEnd',
  },
  {
    id: 'triptych',
    name: 'Triptych',
    description: 'Three-column symmetric, A/B/C structure',
    icon: 'Columns3',
  },
];

export function getTheme(id: ThemeId): ThemeConfig {
  return THEMES.find(t => t.id === id) || THEMES[0];
}

export function getLayout(id: LayoutId): LayoutConfig {
  return LAYOUTS.find(l => l.id === id) || LAYOUTS[0];
}
