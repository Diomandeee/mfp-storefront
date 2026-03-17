import dynamic from 'next/dynamic';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import ProductsSection from './components/ProductsSection';
import ChapterJourney from './components/ChapterJourney';
import TriptychSection from './components/TriptychSection';
import NFCBridge from './components/NFCBridge';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';

const CardBrowser = dynamic(() => import('./components/CardBrowser'), {
  loading: () => (
    <div className="flex h-96 items-center justify-center font-heading text-sm opacity-50">
      Loading deck...
    </div>
  ),
});

export default function Home() {
  return (
    <main className="pt-14">
      <Navigation />
      <CartDrawer />
      <HeroSection />
      <CardBrowser />
      <ProductsSection />
      <ChapterJourney />
      <TriptychSection />
      <NFCBridge />
      <Testimonials />
      <Newsletter />
      <Footer />
    </main>
  );
}
