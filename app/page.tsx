import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import CardBrowser from './components/CardBrowser';
import ProductsSection from './components/ProductsSection';
import ChapterJourney from './components/ChapterJourney';
import TriptychSection from './components/TriptychSection';
import NFCBridge from './components/NFCBridge';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';

export default function Home() {
  return (
    <main>
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
