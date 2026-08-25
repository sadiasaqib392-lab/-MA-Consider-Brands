import React, { useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { CategoryGrid } from './components/CategoryGrid';
import { FeaturedTools } from './components/FeaturedTools';
import { ProContractorSection } from './components/ProContractorSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ShopPage } from './components/ShopPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { AboutUsPage } from './components/AboutUsPage';
import { ContactPage } from './components/ContactPage';
import { TrackOrderPage } from './components/TrackOrderPage';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ImageManagerModal } from './components/ImageManagerModal';
import { QuickViewModal } from './components/QuickViewModal';
import { PolicyModals } from './components/PolicyModals';
import { ToastContainer } from './components/ToastContainer';
import { Footer } from './components/Footer';

const MainContent: React.FC = () => {
  const { activePage } = useStore();

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-amber-400 selection:text-zinc-950">
      {/* Sticky Header with Navigation, Search, Wishlist, Cart & 10-Image Slots */}
      <Header />

      {/* Main Dynamic View Router */}
      <main className="flex-1">
        {activePage === 'home' && (
          <>
            <Hero />
            <TrustStrip />
            <CategoryGrid />
            <FeaturedTools />
            <ProContractorSection />
            <WhyChooseUs />
          </>
        )}

        {activePage === 'shop' && <ShopPage />}

        {activePage === 'product-detail' && <ProductDetailPage />}

        {activePage === 'pro-contractor' && (
          <>
            <ProContractorSection />
            <WhyChooseUs />
          </>
        )}

        {activePage === 'about' && <AboutUsPage />}

        {activePage === 'contact' && <ContactPage />}

        {activePage === 'track-order' && <TrackOrderPage />}
      </main>

      {/* Universal Store Modals & Drawers */}
      <CartDrawer />
      <CheckoutModal />
      <ImageManagerModal />
      <QuickViewModal />
      <PolicyModals />
      <ToastContainer />

      {/* Global Comprehensive Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}
