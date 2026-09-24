import React from 'react';
import { Clock } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';

export const RecentlyViewedSection: React.FC = () => {
  const { recentlyViewed } = useStore();

  if (!recentlyViewed || recentlyViewed.length === 0) return null;

  return (
    <section className="py-20 bg-luxury-950 border-b border-luxury-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 text-gold-400 text-xs tracking-luxury uppercase mb-3">
          <Clock className="w-3.5 h-3.5 text-gold-500" />
          <span>Historial de Navegación</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl text-ivory-50 tracking-wide uppercase font-light mb-8">
          VISTOS RECIENTEMENTE
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {recentlyViewed.slice(0, 4).map((product) => (
            <ProductCard key={`recent-${product.id}`} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
