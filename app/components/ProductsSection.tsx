'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { getProducts, formatPrice } from '../lib/shopify';
import type { ShopifyProduct } from '../lib/shopify';
import { useCart } from '../lib/cart-context';
import { useTheme } from '../lib/theme-context';

type ProductKey = 'booster' | 'chapter' | 'oracle' | 'display';
type FallbackProduct = { title: string; handle: ProductKey; price: string; key: ProductKey };

const PRODUCT_KEYS: readonly ProductKey[] = ['booster', 'chapter', 'oracle', 'display'];

const PRODUCT_DETAILS: Record<ProductKey, { tagline: string; features: string[]; fallbackImage: string }> = {
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

function getProductKey(handle: string): ProductKey {
  const normalizedHandle = handle.toLowerCase();
  const matchedKey = PRODUCT_KEYS.find((key) => normalizedHandle.includes(key));

  switch (matchedKey) {
    case 'booster':
    case 'chapter':
    case 'oracle':
    case 'display':
      return matchedKey;
    default:
      return 'oracle';
  }
}

const FALLBACK_PRODUCTS: readonly FallbackProduct[] = [
  { title: 'Booster Pack', handle: 'booster', price: '$15.00', key: 'booster' },
  { title: 'Chapter Pack', handle: 'chapter', price: '$25.00', key: 'chapter' },
  { title: 'Oracle Deck', handle: 'oracle', price: '$39.99', key: 'oracle' },
  { title: 'Display Box', handle: 'display', price: '$150.00', key: 'display' },
];

/* ===== Layout-specific product card renderers ===== */

interface ProductCardProps {
  product: ShopifyProduct;
  index: number;
  onAdd: (variantId: string) => void;
  isLoading: boolean;
}

function ClassicProductCard({ product, index, onAdd, isLoading }: ProductCardProps) {
  const key = getProductKey(product.handle);
  const details = PRODUCT_DETAILS[key];
  const img = product.images.edges[0]?.node;
  const variant = product.variants.edges[0]?.node;
  const price = formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group rounded-2xl overflow-hidden flex flex-col product-card"
      style={{ background: 'rgb(var(--surface))', border: '1px solid rgb(var(--border) / 0.1)' }}
    >
      <div className="h-48 relative flex items-center justify-center overflow-hidden product-image"
        style={{ background: `linear-gradient(135deg, rgb(var(--bg-tertiary)), rgb(var(--bg-secondary)))` }}
      >
        <img src={img?.url || details.fallbackImage} alt={img?.altText || product.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="font-heading text-lg mb-1" style={{ color: 'rgb(var(--text-primary))' }}>{product.title}</h3>
        <p className="text-xs mb-4 leading-relaxed" style={{ color: 'rgb(var(--text-body) / 0.6)' }}>{details.tagline}</p>
        <ul className="mb-6 flex-1">
          {details.features.map(f => (
            <li key={f} className="text-[10px] py-1 flex items-center gap-2" style={{ color: 'rgb(var(--text-secondary) / 0.5)' }}>
              <span className="w-1 h-1 rounded-full" style={{ background: 'rgb(var(--accent) / 0.3)' }} />
              {f}
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between">
          <span className="font-heading text-xl" style={{ color: 'rgb(var(--accent))' }}>{price}</span>
          <button
            onClick={() => variant && onAdd(variant.id)}
            disabled={isLoading || !variant?.availableForSale}
            className="px-5 py-2 rounded-lg font-heading text-[10px] tracking-[0.15em] uppercase cursor-pointer transition-all disabled:opacity-50 btn-primary"
            style={{ background: 'rgb(var(--accent) / 0.1)', color: 'rgb(var(--accent))', border: '1px solid rgb(var(--accent) / 0.2)' }}
          >
            {isLoading ? 'Adding...' : 'Acquire'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function CodexProductCard({ product, index, onAdd, isLoading }: ProductCardProps) {
  const key = getProductKey(product.handle);
  const details = PRODUCT_DETAILS[key];
  const img = product.images.edges[0]?.node;
  const variant = product.variants.edges[0]?.node;
  const price = formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="flex flex-col sm:flex-row gap-6 py-8 section-entry product-card"
      style={{ borderBottom: '1px solid rgb(var(--border) / 0.08)' }}
    >
      <div className="w-full sm:w-48 h-48 sm:h-auto flex-shrink-0 rounded-lg overflow-hidden product-image"
        style={{ background: `linear-gradient(135deg, rgb(var(--bg-tertiary)), rgb(var(--bg-secondary)))` }}
      >
        <img src={img?.url || details.fallbackImage} alt={product.title} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1">
        <h3 className="font-heading text-xl mb-2" style={{ color: 'rgb(var(--text-primary))' }}>{product.title}</h3>
        <p className="text-sm mb-4 leading-relaxed" style={{ color: 'rgb(var(--text-body) / 0.6)' }}>{details.tagline}</p>
        <ul className="mb-6">
          {details.features.map(f => (
            <li key={f} className="text-xs py-0.5" style={{ color: 'rgb(var(--text-secondary) / 0.5)' }}>
              - {f}
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-6">
          <span className="font-heading text-2xl" style={{ color: 'rgb(var(--accent))' }}>{price}</span>
          <button
            onClick={() => variant && onAdd(variant.id)}
            disabled={isLoading || !variant?.availableForSale}
            className="px-6 py-2.5 font-heading text-xs tracking-[0.15em] uppercase cursor-pointer transition-all disabled:opacity-50 btn-primary"
            style={{ background: 'rgb(var(--accent) / 0.1)', color: 'rgb(var(--accent))', border: '1px solid rgb(var(--accent) / 0.2)' }}
          >
            {isLoading ? 'Adding...' : 'Acquire'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function MinimalProductCard({ product, index, onAdd, isLoading }: ProductCardProps) {
  const key = getProductKey(product.handle);
  const details = PRODUCT_DETAILS[key];
  const img = product.images.edges[0]?.node;
  const variant = product.variants.edges[0]?.node;
  const price = formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      className="text-center product-card"
    >
      <div className="mb-6 rounded-2xl overflow-hidden product-image"
        style={{ background: `linear-gradient(135deg, rgb(var(--bg-tertiary)), rgb(var(--bg-secondary)))` }}
      >
        <img src={img?.url || details.fallbackImage} alt={product.title} className="w-full h-auto" />
      </div>
      <h3 className="font-heading text-lg mb-2" style={{ color: 'rgb(var(--text-primary))' }}>{product.title}</h3>
      <p className="text-xs mb-6 leading-relaxed" style={{ color: 'rgb(var(--text-body) / 0.5)' }}>{details.tagline}</p>
      <div className="flex items-center justify-center gap-6">
        <span className="font-heading text-xl" style={{ color: 'rgb(var(--accent))' }}>{price}</span>
        <button
          onClick={() => variant && onAdd(variant.id)}
          disabled={isLoading || !variant?.availableForSale}
          className="px-6 py-2.5 rounded-full font-heading text-[10px] tracking-[0.15em] uppercase cursor-pointer transition-all disabled:opacity-50 btn-primary"
          style={{ background: 'rgb(var(--accent))', color: 'rgb(var(--bg-primary))' }}
        >
          {isLoading ? 'Adding...' : 'Acquire'}
        </button>
      </div>
    </motion.div>
  );
}

/* ===== Fallback product card ===== */

function FallbackProductCard({ fp, index, layout }: { fp: FallbackProduct; index: number; layout: string }) {
  const details = PRODUCT_DETAILS[fp.key];
  const isCodex = layout === 'codex';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`overflow-hidden flex ${isCodex ? 'flex-col sm:flex-row gap-6 py-8' : 'flex-col rounded-2xl'}`}
      style={isCodex ? { borderBottom: '1px solid rgb(var(--border) / 0.08)' } : { background: 'rgb(var(--surface))', border: '1px solid rgb(var(--border) / 0.1)' }}
    >
      <div className={`${isCodex ? 'w-full sm:w-48 flex-shrink-0 rounded-lg' : 'h-48'} relative overflow-hidden`}
        style={{ background: 'linear-gradient(135deg, rgb(var(--bg-tertiary)), rgb(var(--bg-secondary)))' }}
      >
        <img src={details.fallbackImage} alt={fp.title} className="w-full h-full object-cover" />
      </div>
      <div className={isCodex ? 'flex-1' : 'p-6 flex-1 flex flex-col'}>
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
}

/* ===== Main Component ===== */

export default function ProductsSection() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { addItem, isLoading } = useCart();
  const { layout } = useTheme();

  useEffect(() => {
    const controller = new AbortController();

    getProducts(controller.signal)
      .then((nextProducts) => {
        setProducts(nextProducts);
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name === 'AbortError') return;
        setError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  const gridClass =
    layout === 'codex' ? 'flex flex-col max-w-3xl mx-auto'
    : layout === 'minimal' ? 'grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-3xl mx-auto'
    : layout === 'gallery' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'
    : layout === 'triptych' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
    : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6';

  const headerAlignment = layout === 'codex' ? 'text-left max-w-3xl mx-auto' : 'text-center';

  const ProductCard = layout === 'codex' ? CodexProductCard : layout === 'minimal' ? MinimalProductCard : ClassicProductCard;

  return (
    <section id="products" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className={`section-header mb-16 ${headerAlignment}`}>
        <p className="text-[10px] tracking-[0.4em] uppercase font-heading section-eyebrow mb-3" style={{ color: 'rgb(var(--accent) / 0.5)' }}>
          {layout === 'codex' ? 'Catalogue' : 'Acquire'}
        </p>
        <h2 className="font-heading text-3xl sm:text-4xl mb-4" style={{ color: 'rgb(var(--text-primary))' }}>
          {layout === 'codex' ? 'Product Catalogue' : layout === 'minimal' ? 'Products' : 'Choose Your Path'}
        </h2>
        {layout !== 'minimal' && (
          <p className={`text-sm ${layout === 'codex' ? '' : 'max-w-md mx-auto'}`} style={{ color: 'rgb(var(--text-body) / 0.6)' }}>
            Every card holds a truth. Every pack holds a journey.
          </p>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 size={24} className="animate-spin" style={{ color: 'rgb(var(--accent) / 0.3)' }} />
        </div>
      ) : (
        <div className={gridClass}>
          {(products.length > 0 ? products : []).map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              onAdd={(variantId) => addItem(variantId)}
              isLoading={isLoading}
            />
          ))}

          {error && FALLBACK_PRODUCTS.map((fp, i) => (
            <FallbackProductCard key={fp.key} fp={fp} index={i} layout={layout} />
          ))}
        </div>
      )}
    </section>
  );
}
