import dynamic from 'next/dynamic';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import ProductsSection from './components/ProductsSection';
import ErrorBoundary from './components/ErrorBoundary';
import ChapterJourney from './components/ChapterJourney';
import TriptychSection from './components/TriptychSection';
import NFCBridge from './components/NFCBridge';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import { getProducts } from './lib/shopify';
import type { ShopifyProduct } from './lib/shopify';

const CardBrowser = dynamic(() => import('./components/CardBrowser'), {
  loading: () => (
    <div className="flex h-96 items-center justify-center font-heading text-sm opacity-50">
      Loading deck...
    </div>
  ),
});

export default async function Home() {
  let products: ShopifyProduct[] = [];
  try {
    products = await getProducts();
  } catch (e) {
    console.error('Failed to fetch products on server:', e);
  }

  return (
    <main className="pt-14">
      <Navigation />
      <CartDrawer />
      <HeroSection />
      <ErrorBoundary sectionName="card browser">
        <CardBrowser />
      </ErrorBoundary>
      <ErrorBoundary sectionName="products section">
        <ProductsSection initialProducts={products} />
      </ErrorBoundary>
      <ErrorBoundary sectionName="chapter journey">
        <ChapterJourney />
      </ErrorBoundary>
      <ErrorBoundary sectionName="triptych section">
        <TriptychSection />
      </ErrorBoundary>
      <ErrorBoundary sectionName="nfc bridge">
        <NFCBridge />
      </ErrorBoundary>
      <ErrorBoundary sectionName="testimonials">
        <Testimonials />
      </ErrorBoundary>
      <ErrorBoundary sectionName="newsletter signup">
        <Newsletter />
      </ErrorBoundary>
      <Footer />
    </main>
  );
}
