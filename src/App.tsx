import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { CategoryGrid } from './components/CategoryGrid';
import { CollectionsSection } from './components/CollectionsSection';
import { CatalogSection } from './components/CatalogSection';
import { EditorialCampaignSection } from './components/EditorialCampaignSection';
import { RecentlyViewedSection } from './components/RecentlyViewedSection';
import { BenefitsSection } from './components/BenefitsSection';
import { InstagramSection } from './components/InstagramSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { WhatsAppCheckoutModal } from './components/WhatsAppCheckoutModal';
import { AdminModal } from './components/AdminModal';

function MainStore() {
  const { currentView } = useStore();

  return (
    <div className="min-h-screen bg-luxury-950 text-luxury-100 selection:bg-gold-500/30 selection:text-gold-300 font-sans">
      {/* Navigation */}
      <Navbar />

      {/* Main Content Flow: HOME vs CATALOG */}
      <main>
        {currentView === 'home' ? (
          <>
            {/* 1. Fullscreen Hero Slider with continuous horizontal motion */}
            <HeroSlider />

            {/* 2. Luxury Perks & Guarantees bar */}
            <BenefitsSection />

            {/* 3. Visual Categories Showcase ("EXPLORA LA COLECCIÓN") */}
            <CategoryGrid />

            {/* 4. Editorial Collections Lookbook */}
            <CollectionsSection />

            {/* 5. Campaign Story ("EL DETALLE DEFINE EL ESTILO") */}
            <EditorialCampaignSection />

            {/* 6. Instagram Feed ("SÍGUENOS") */}
            <InstagramSection />

            {/* 7. FAQs */}
            <FaqSection />
          </>
        ) : (
          <>
            {/* Dedicated Complete Catalog View with Search, Filters, Sorting & Breadcrumbs */}
            <CatalogSection />

            {/* Recently Viewed Items */}
            <RecentlyViewedSection />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Slide-over Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <FavoritesDrawer />
      <WhatsAppCheckoutModal />
      <AdminModal />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <MainStore />
    </StoreProvider>
  );
}
