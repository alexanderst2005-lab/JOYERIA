import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CategoryGrid: React.FC = () => {
  const { categories, products, setSelectedCategory, selectedCategory } = useStore();

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    const catalogElement = document.getElementById('catalogo');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getProductCount = (categoryName: string) => {
    return products.filter(
      p => p.category.toLowerCase() === categoryName.toLowerCase()
    ).length;
  };

  return (
    <section id="categorias" className="py-24 bg-luxury-950 border-b border-luxury-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="inline-flex items-center space-x-2 text-gold-400 text-xs tracking-luxury uppercase mb-2">
              <span className="w-6 h-[1px] bg-gold-400" />
              <span>Categorías</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-ivory-50 tracking-wide uppercase font-light">
              EXPLORA LA COLECCIÓN
            </h2>
          </div>
          <p className="text-luxury-400 text-xs sm:text-sm font-light tracking-wide max-w-md mt-4 md:mt-0">
            Piezas curadas con una estética universal y neutra. Diseños concebidos para convivir en perfecta armonía.
          </p>
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
                className={`group relative h-64 sm:h-80 overflow-hidden cursor-pointer bg-luxury-900 border transition-all duration-500 ${
                  isSelected
                    ? 'border-gold-500 ring-1 ring-gold-500/50'
                    : 'border-luxury-800/80 hover:border-luxury-600'
                }`}
              >
                {/* Background Image with Zoom */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{ backgroundImage: `url(${category.image})` }}
                />

                {/* Dark Editorial Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-950 via-luxury-950/40 to-transparent opacity-85 group-hover:opacity-75 transition-opacity duration-300" />

                {/* Content */}
                <div className="relative z-10 h-full p-5 sm:p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-[11px] font-mono tracking-widest text-gold-400">
                      {count > 0 ? `${count} ${count === 1 ? 'PIEZA' : 'PIEZAS'}` : 'DISPONIBLE'}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-luxury-950/60 backdrop-blur-sm border border-luxury-700 flex items-center justify-center text-luxury-300 group-hover:text-gold-400 group-hover:border-gold-500/50 transition-colors">
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl text-ivory-50 tracking-wide uppercase group-hover:text-gold-300 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-luxury-400 text-[11px] tracking-wide line-clamp-1 mt-1 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {category.description}
                    </p>
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
