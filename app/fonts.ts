import {
  Cinzel,
  Cormorant_Garamond,
  Playfair_Display,
  Space_Grotesk,
  Merriweather,
  Libre_Baskerville,
  Inter,
  Syne,
  Bitter,
  Jost,
} from 'next/font/google';

export const cinzel = Cinzel({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cinzel',
});

export const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-cormorant',
});

export const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  preload: false,
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  preload: false,
});

export const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-merriweather',
  preload: false,
});

export const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-libre-baskerville',
  preload: false,
});

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: false,
});

export const syne = Syne({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-syne',
  preload: false,
});

export const bitter = Bitter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bitter',
  preload: false,
});

export const jost = Jost({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jost',
  preload: false,
});
