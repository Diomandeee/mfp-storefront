import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from './lib/theme-context';
import { CartProvider } from './lib/cart-context';
import { 
  cinzel, 
  cormorantGaramond, 
  playfairDisplay, 
  spaceGrotesk, 
  merriweather, 
  libreBaskerville, 
  inter, 
  syne, 
  bitter, 
  jost 
} from './fonts';

export const metadata: Metadata = {
  title: 'Meaning Full Power | 45 Oracle Cards, 15 Chapters, One Journey',
  description:
    'A premium wisdom oracle card game with 45 NFC-enabled cards across 15 life chapters. Draw your card. Begin your journey.',
  openGraph: {
    title: 'Meaning Full Power',
    description: '45 Cards. 15 Chapters. One Journey.',
    type: 'website',
    url: 'https://meaningfullpower.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={`
          ${cinzel.variable} 
          ${cormorantGaramond.variable} 
          ${playfairDisplay.variable} 
          ${spaceGrotesk.variable} 
          ${merriweather.variable} 
          ${libreBaskerville.variable} 
          ${inter.variable} 
          ${syne.variable} 
          ${bitter.variable} 
          ${jost.variable}
        `}
        style={{ background: 'rgb(var(--bg-primary))', color: 'rgb(var(--text-body))', minHeight: '100vh' }}
      >
        <ThemeProvider>
          <CartProvider>{children}</CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
