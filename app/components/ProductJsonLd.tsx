import type { ShopifyProduct } from '../lib/shopify';

export default function ProductJsonLd({ products }: { products: ShopifyProduct[] }) {
  if (!products.length) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.title,
        description: product.description,
        url: `https://meaningfullpower.com/products/${product.handle}`,
        offers: {
          '@type': 'Offer',
          price: product.priceRange.minVariantPrice.amount,
          priceCurrency: product.priceRange.minVariantPrice.currencyCode,
          availability: 'https://schema.org/InStock',
        },
        ...(product.images.edges[0] && {
          image: product.images.edges[0].node.url,
        }),
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
