'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Loader2 } from 'lucide-react';
import { getProducts, formatPrice } from '../lib/shopify';
import type { ShopifyProduct } from '../lib/shopify';
import { useCart } from '../lib/cart-context';
import { useTheme } from '../lib/theme-context';

const PRODUCT_DETAILS: Record<string, { tagline: string; features: string[]; fallbackImage: string }> = {
  'booster': {
    tagline: '5 random oracle cards. Open the unknown.',
    features: ['5 random cards', 'Mixed rarities', 'NFC-enabled', 'Surprise triptych fragments'],
    fallbackImage: '/booster-pack.png',
  },
  'chapter': {
    tagline: 'Choose your chapter. Receive the complete triptych.',
    features: ['3 cards per chapter', 'Complete A/B/C triptych', 'NFC-enabled', 'Deep chapter immersion'],
    fallbackImage: '/chapter-pack.png',
  },
  'oracle': {
    tagline: 'The complete 45-card oracle experience.',
    features: ['All 45 cards', 'All 15 chapters', 'Premium box', 'Complete NFC library'],
    fallbackImage: '/oracle-deck.png',
  },
  'display': {
    tagline: '24 booster packs. For the devoted collector.',
    features: ['24 booster packs', '120 total cards', 'Display box', 'Collector tier'],
    fallbackImage: '/display-box.png',
  },
};

function getProductKey(handle: string): string {
  if (handle.includes('booster')) return 'booster';
  if (handle.includes('chapter')) return 'chapter';
  if (handle.includes('oracle')) return 'oracle';
  if (handle.includes('display')) return 'display';
  return 'oracle';
}

// Fallback products in case API fails
const FALLBACK_PRODUCTS = [
  {
    title: 'Booster Pack',
    handle: 'booster',
    price: '$15.00',
    key: 'booster',
  },
  {
    title: 'Chapter Pack',
    handle: 'chapter',
    price: '$25.00',
    key: 'chapter',
  },
  {
    title: 'Oracle Deck',
    handle: 'oracle',
    price: '$39.99',
    key: 'oracle',
  },
  {
    title: 'Display Box',
    handle: 'display',
    price: '$150.00',
    key: 'display',
  },
];

export default function ProductsSection() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { addItem, isLoading } = useCart();
  const { layout } = useTheme();

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const gridClass = layout === 'minimal'
    ? 'grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto'
    : layout === 'codex'
    ? 'flex flex-col gap-6 max-w-2xl mx-auto'
    : layout === 'triptych'
    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
    : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6';

  return (
    <section id="products" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <p className="text-[10px] tracking-[0.4em] uppercase font-heading mb-3" style={{ color: 'rgb(var(--accent) / 0.5)' }}>
          Acquire
        </p>
        <h2 className="font-heading text-3xl sm:text-4xl mb-4" style={{ color: 'rgb(var(--text-primary))' }}>
          Choose Your Path
        </h2>
        <p className="text-sm max-w-md mx-auto" style={{ color: 'rgb(var(--text-body) / 0.6)' }}>
          Every card holds a truth. Every pack holds a journey.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 size={24} className="animate-spin" style={{ color: 'rgb(var(--accent) / 0.3)' }} />
        </div>
      ) : (
        <div className={gridClass}>
          {(products.length > 0 ? products : []).map((product, i) => {
            const key = getProductKey(product.handle);
            const details = PRODUCT_DETAILS[key] || PRODUCT_DETAILS['oracle'];
            const img = product.images.edges[0]?.node;
            const variant = product.variants.edges[0]?.node;
            const price = formatPrice(
              product.priceRange.minVariantPrice.amount,
              product.priceRange.minVariantPrice.currencyCode
            );

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-2xl overflow-hidden flex flex-col"
                style={{
                  background: 'rgb(var(--surface))',
                  border: '1px solid rgb(var(--border) / 0.1)',
                }}
              >
                {/* Product image area */}
                <div
                  className="h-48 relative flex items-center justify-center overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, rgb(var(--bg-tertiary)), rgb(var(--bg-secondary)))`,
                  }}
                >
                  <img
                    src={img?.url || details.fallbackImage}
                    alt={img?.altText || product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-heading text-lg mb-1" style={{ color: 'rgb(var(--text-primary))' }}>
                    {product.title}
                  </h3>
                  <p className="text-xs mb-4 leading-relaxed" style={{ color: 'rgb(var(--text-body) / 0.6)' }}>
                    {details.tagline}
                  </p>

                  <ul className="mb-6 flex-1">
                    {details.features.map(f => (
                      <li
                        key={f}
                        className="text-[10px] py-1 flex items-center gap-2"
                        style={{ color: 'rgb(var(--text-secondary) / 0.5)' }}
                      >
                        <span className="w-1 h-1 rounded-full" style={{ background: 'rgb(var(--accent) / 0.3)' }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between">
                    <span className="font-heading text-xl" style={{ color: 'rgb(var(--accent))' }}>
                      {price}
                    </span>
                    <button
                      onClick={() => variant && addItem(variant.id)}
                      disabled={isLoading || !variant?.availableForSale}
                      className="px-5 py-2 rounded-lg font-heading text-[10px] tracking-[0.15em] uppercase cursor-pointer transition-all disabled:opacity-50"
                      style={{
                        background: 'rgb(var(--accent) / 0.1)',
                        color: 'rgb(var(--accent))',
                        border: '1px solid rgb(var(--accent) / 0.2)',
                      }}
                    >
                      {isLoading ? 'Adding...' : 'Acquire'}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Fallback if no products loaded */}
          {error && FALLBACK_PRODUCTS.map((fp, i) => {
            const details = PRODUCT_DETAILS[fp.key];
            return (
              <motion.div
                key={fp.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl overflow-hidden flex flex-col"
                style={{
                  background: 'rgb(var(--surface))',
                  border: '1px solid rgb(var(--border) / 0.1)',
                }}
              >
                <div
                  className="h-48 relative overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, rgb(var(--bg-tertiary)), rgb(var(--bg-secondary)))' }}
                >
                  <img src={details.fallbackImage} alt={fp.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-heading text-lg mb-1" style={{ color: 'rgb(var(--text-primary))' }}>{fp.title}</h3>
                  <p className="text-xs mb-4" style={{ color: 'rgb(var(--text-body) / 0.6)' }}>{details.tagline}</p>
                  <ul className="mb-6 flex-1">
                    {details.features.map(f => (
                      <li key={f} className="text-[10px] py-1 flex items-center gap-2" style={{ color: 'rgb(var(--text-secondary) / 0.5)' }}>
                        <span className="w-1 h-1 rounded-full" style={{ background: 'rgb(var(--accent) / 0.3)' }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-xl" style={{ color: 'rgb(var(--accent))' }}>{fp.price}</span>
                    <span className="px-5 py-2 rounded-lg font-heading text-[10px] tracking-[0.15em] uppercase" style={{ color: 'rgb(var(--accent) / 0.4)' }}>
                      Coming Soon
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}
