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

const storeJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'Meaning Full Power',
      url: 'https://meaningfullpower.com',
      description: 'A premium oracle card game storefront with 45 NFC-enabled trading cards across 15 life chapters.',
    },
    {
      '@type': 'Product',
      name: 'Meaning Full Power Oracle Deck',
      description: 'The complete 45-card oracle experience spanning 15 life chapters, with NFC-enabled trading cards and premium presentation.',
      brand: {
        '@type': 'Brand',
        name: 'Meaning Full Power',
      },
      category: 'Oracle Deck',
      offers: {
        '@type': 'Offer',
        price: '39.99',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://meaningfullpower.com/#products',
      },
    },
  ],
};

export const metadata: Metadata = {
  title: 'Meaning Full Power | 45 Oracle Cards, 15 Chapters, One Journey',
  description:
    'A premium wisdom oracle card game with 45 NFC-enabled cards across 15 life chapters. Draw your card. Begin your journey.',
  icons: {
    icon: '/favicon.svg',
  },
  keywords: ['oracle cards', 'wisdom deck', 'NFC cards', 'meditation cards', 'self-reflection', 'card game', 'meaning full power', 'triptych'],
  authors: [{ name: 'Meaning Full Power' }],
  openGraph: {
    title: 'Meaning Full Power | 45 Oracle Cards, 15 Chapters, One Journey',
    description: '45 Cards. 15 Chapters. One Journey. A premium wisdom oracle card game with NFC-enabled cards.',
    type: 'website',
    url: 'https://meaningfullpower.com',
    siteName: 'Meaning Full Power',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meaning Full Power | 45 Oracle Cards',
    description: '45 Cards. 15 Chapters. One Journey. A premium wisdom oracle card game.',
  },
  robots: {
    index: true,
    follow: true,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(storeJsonLd) }}
        />
        <ThemeProvider>
          <CartProvider>{children}</CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
