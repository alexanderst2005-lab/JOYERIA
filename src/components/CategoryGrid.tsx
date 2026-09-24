import React from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CategoryGrid: React.FC = () => {
  const { categories, products, setSelectedCategory, selectedCategory, setCurrentView } = useStore();

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewAll = () => {
    setSelectedCategory('all');
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getProductCount = (categoryName: string) => {
    return products.filter(
      p => p.category.toLowerCase() === categoryName.toLowerCase()
    ).length;
  };

  return (
    <section id="categorias" className="py-24 bg-luxury-950 border-b border-luxury-900">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-16">
          <div>
            <div className="inline-flex items-center space-x-2 text-gold-400 text-xs tracking-[0.25em] uppercase mb-3">
              <span className="w-8 h-[1px] bg-gold-400" />
              <span>Categorías</span>
            </div>
            <h2
              onClick={handleViewAll}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ivory-50 tracking-wide uppercase font-light cursor-pointer hover:text-gold-300 transition-colors inline-block"
              title="Ver todo el catálogo"
            >
              EXPLORA LA COLECCIÓN
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-6 md:mt-0">
            <p className="text-luxury-400 text-xs sm:text-sm font-light tracking-wide max-w-md">
              Piezas curadas con una estética universal y neutra. Selecciona una categoría para ver sus joyas.
            </p>
            <button
              onClick={handleViewAll}
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-gold-400 hover:text-gold-300 pb-1 border-b border-gold-500/50 hover:border-gold-300 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Ver Catálogo Completo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category) => {
            const count = getProductCount(category.name);
            const isSelected = selectedCategory.toLowerCase() === category.name.toLowerCase();

            return (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.name)}
                className={`group relative h-64 sm:h-80 overflow-hidden cursor-pointer bg-luxury-900 border transition-all duration-300 ${
                  isSelected
                    ? 'border-gold-500 ring-1 ring-gold-500/50 shadow-lg'
                    : 'border-luxury-800/80 hover:border-gold-500/60'
                }`}
              >
                {/* Background Image: steady, clear, high quality */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${category.image})` }}
                />

                {/* Dark Editorial Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-950 via-luxury-950/40 to-transparent opacity-85 group-hover:opacity-70 transition-opacity duration-300" />

                {/* Content: Clean, no jumping popup text on cursor hover */}
                <div className="relative z-10 h-full p-5 sm:p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-[11px] font-mono tracking-widest text-gold-400 bg-luxury-950/70 px-2 py-0.5 border border-luxury-800/60">
                      {count > 0 ? `${count} ${count === 1 ? 'PIEZA' : 'PIEZAS'}` : 'DISPONIBLE'}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-luxury-950/70 backdrop-blur-sm border border-luxury-700 flex items-center justify-center text-luxury-300 group-hover:text-gold-400 group-hover:border-gold-500/60 transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl text-ivory-50 tracking-wide uppercase group-hover:text-gold-300 transition-colors">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
