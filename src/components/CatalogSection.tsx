import React, { useState } from 'react';
import { Search, SlidersHorizontal, X, RotateCcw, ChevronDown, Check, ArrowLeft } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { formatCurrency } from '../utils/formatters';

export const CatalogSection: React.FC = () => {
  const {
    products,
    categories,
    filteredProducts,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    selectedMaterial,
    setSelectedMaterial,
    selectedColor,
    setSelectedColor,
    selectedAvailability,
    setSelectedAvailability,
    sortBy,
    setSortBy,
    resetFilters,
    activeFilterCount,
    config,
    setCurrentView,
  } = useStore();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Extract unique materials & colors
  const materials = ['all', 'Oro', 'Plata', 'Titanio', 'Ónix', 'Cerámica', 'Rodio'];
  const colors = ['all', 'Dorado', 'Plateado', 'Negro', 'Gris'];
  const availabilities = [
    { label: 'Todos', value: 'all' },
    { label: 'Disponible', value: 'Disponible' },
    { label: 'Últimas unidades', value: 'Últimas unidades' },
  ];

  return (
    <section id="catalogo" className="py-24 sm:py-32 bg-luxury-950">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Navigation Breadcrumb / Return to Home */}
        <div className="mb-10 flex items-center justify-between border-b border-luxury-800/80 pb-4">
          <button
            onClick={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center space-x-2 text-xs sm:text-sm uppercase tracking-[0.2em] text-luxury-400 hover:text-gold-400 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-gold-400" />
            <span>Volver a la Portada</span>
          </button>
          <span className="text-xs sm:text-sm tracking-[0.25em] text-luxury-500 uppercase font-mono">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'pieza' : 'piezas disponibles'}
          </span>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center space-x-3 text-gold-400 text-xs sm:text-sm tracking-[0.3em] uppercase mb-4">
            <span className="w-10 sm:w-16 h-[1.5px] bg-gold-400" />
            <span>Colección & Catálogo</span>
            <span className="w-10 sm:w-16 h-[1.5px] bg-gold-400" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl xl:text-7xl text-ivory-50 tracking-wide uppercase font-light leading-tight">
            PIEZAS QUE DEFINEN EL TIEMPO
          </h2>
          <p className="text-luxury-200 text-base sm:text-xl font-light tracking-wide mt-4 max-w-2xl mx-auto leading-relaxed">
            Metales nobles, manufactura rigurosa y proporciones neutras pensadas para acompañarte toda la vida.
          </p>
        </div>

        {/* Dedicated Category Selection Bar (Spacious, Clear & Scrollable) */}
        <div className="mb-8 overflow-x-auto pb-3">
          <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-max">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-5 sm:px-7 py-3 text-xs sm:text-sm uppercase tracking-[0.2em] transition-all cursor-pointer font-medium ${
                selectedCategory === 'all'
                  ? 'bg-gold-500 text-luxury-950 font-bold shadow-lg ring-1 ring-gold-400'
                  : 'text-luxury-300 hover:text-white bg-luxury-900/90 border border-luxury-800 hover:border-gold-500/50'
              }`}
            >
              Todas las Piezas
            </button>
            {categories.map(cat => {
              const isSelected = selectedCategory.toLowerCase() === cat.name.toLowerCase();
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-5 sm:px-7 py-3 text-xs sm:text-sm uppercase tracking-[0.2em] transition-all cursor-pointer font-medium ${
                    isSelected
                      ? 'bg-gold-500 text-luxury-950 font-bold shadow-lg ring-1 ring-gold-400'
                      : 'text-luxury-300 hover:text-white bg-luxury-900/90 border border-luxury-800 hover:border-gold-500/50'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search, Filter & Sort Control Toolbar */}
        <div className="bg-luxury-900/70 border border-luxury-800 p-4 sm:p-6 mb-10 shadow-2xl">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input (Generous & Legible) */}
            <div className="relative flex-1 max-w-xl">
              <Search className="w-5 h-5 text-luxury-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por nombre, material o estilo (ej. Oro 18K, Cubana, Sello)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full h-13 bg-luxury-950 border border-luxury-700/80 focus:border-gold-500 pl-12 pr-12 text-sm sm:text-base text-luxury-100 placeholder-luxury-400 focus:outline-none transition-colors shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-luxury-400 hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Filter Drawer Trigger & Sort */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Filter Button */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="h-13 flex-1 sm:flex-initial flex items-center justify-center space-x-2.5 px-6 sm:px-8 bg-luxury-950 border border-luxury-700 hover:border-gold-500 text-xs sm:text-sm uppercase tracking-[0.2em] font-medium text-luxury-100 hover:text-gold-300 transition-colors cursor-pointer shadow-md"
              >
                <SlidersHorizontal className="w-4 h-4 text-gold-500" />
                <span>Filtros</span>
                {activeFilterCount > 0 && (
                  <span className="w-5 h-5 bg-gold-500 text-luxury-950 rounded-full text-xs font-bold flex items-center justify-center ml-1">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Sort Dropdown */}
              <div className="relative flex-1 sm:flex-initial">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="h-13 appearance-none w-full bg-luxury-950 border border-luxury-700 hover:border-gold-500 text-xs sm:text-sm uppercase tracking-[0.2em] text-luxury-100 py-2.5 pl-5 pr-11 focus:outline-none focus:border-gold-500 cursor-pointer shadow-md font-medium"
                >
                  <option value="destacados">Destacados</option>
                  <option value="recientes">Más recientes</option>
                  <option value="precio-asc">Precio: menor a mayor</option>
                  <option value="precio-desc">Precio: mayor a menor</option>
                </select>
                <ChevronDown className="w-4 h-4 text-luxury-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Active Filters Summary Chips */}
          {activeFilterCount > 0 && (
            <div className="mt-5 pt-4 border-t border-luxury-800 flex flex-wrap items-center gap-2.5 text-xs sm:text-sm">
              <span className="text-luxury-400 uppercase tracking-wider font-light">Filtros aplicados:</span>

              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center space-x-2 bg-luxury-950 border border-gold-500/60 text-gold-300 px-3.5 py-1.5 shadow-sm">
                  <span>Categoría: {selectedCategory}</span>
                  <button onClick={() => setSelectedCategory('all')} className="hover:text-white p-0.5">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}

              {selectedMaterial !== 'all' && (
                <span className="inline-flex items-center space-x-2 bg-luxury-950 border border-gold-500/60 text-gold-300 px-3.5 py-1.5 shadow-sm">
                  <span>Material: {selectedMaterial}</span>
                  <button onClick={() => setSelectedMaterial('all')} className="hover:text-white p-0.5">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}

              {selectedColor !== 'all' && (
                <span className="inline-flex items-center space-x-2 bg-luxury-950 border border-gold-500/60 text-gold-300 px-3.5 py-1.5 shadow-sm">
                  <span>Color: {selectedColor}</span>
                  <button onClick={() => setSelectedColor('all')} className="hover:text-white p-0.5">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}

              {selectedAvailability !== 'all' && (
                <span className="inline-flex items-center space-x-2 bg-luxury-950 border border-gold-500/60 text-gold-300 px-3.5 py-1.5 shadow-sm">
                  <span>Estado: {selectedAvailability}</span>
                  <button onClick={() => setSelectedAvailability('all')} className="hover:text-white p-0.5">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}

              {(priceRange[0] > 0 || priceRange[1] < 1500000) && (
                <span className="inline-flex items-center space-x-2 bg-luxury-950 border border-gold-500/60 text-gold-300 px-3.5 py-1.5 shadow-sm">
                  <span>Hasta {formatCurrency(priceRange[1], config.currencySymbol)}</span>
                  <button onClick={() => setPriceRange([0, 1500000])} className="hover:text-white p-0.5">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}

              <button
                onClick={resetFilters}
                className="text-xs uppercase tracking-wider text-luxury-400 hover:text-gold-400 ml-3 inline-flex items-center space-x-1.5 py-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Limpiar todos</span>
              </button>
            </div>
          )}
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-sm sm:text-base text-luxury-300 mb-8 px-1">
          <div>
            Mostrando <span className="text-gold-400 font-bold">{filteredProducts.length}</span> de {products.length} piezas exclusivas
          </div>
        </div>

        {/* Product Grid: 2 columns on mobile, 3-4 columns on desktop with generous gaps */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-24 border border-luxury-800 bg-luxury-900/30 max-w-xl mx-auto px-6 shadow-2xl">
            <SlidersHorizontal className="w-14 h-14 text-luxury-600 mx-auto mb-5 stroke-1" />
            <h3 className="font-serif text-3xl text-ivory-50 mb-3">No se encontraron piezas</h3>
            <p className="text-luxury-300 text-sm sm:text-base font-light mb-8 leading-relaxed">
              No hay joyas que coincidan con los filtros seleccionados. Intenta ampliar tus criterios de búsqueda.
            </p>
            <button
              onClick={resetFilters}
              className="px-8 py-4 bg-gold-500 hover:bg-gold-400 text-luxury-950 text-xs sm:text-sm uppercase tracking-[0.2em] font-bold transition-colors cursor-pointer shadow-xl"
            >
              Restablecer Filtros
            </button>
          </div>
        )}
      </div>

      {/* Filter Slide-over Drawer (Desktop & Mobile) */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-luxury-950/80 backdrop-blur-md transition-opacity"
            onClick={() => setMobileFilterOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
            <div className="w-screen max-w-md bg-luxury-950 border-l border-luxury-800 flex flex-col justify-between shadow-2xl animate-fade-in">
              {/* Drawer Header */}
              <div className="p-6 border-b border-luxury-800 flex items-center justify-between bg-luxury-900/60">
                <div className="flex items-center space-x-2.5">
                  <SlidersHorizontal className="w-5 h-5 text-gold-500" />
                  <span className="font-serif text-xl sm:text-2xl tracking-wide uppercase text-ivory-50">
                    Filtros de Colección
                  </span>
                </div>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="text-luxury-400 hover:text-white p-1"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="p-6 overflow-y-auto space-y-8 flex-1">
                {/* Categoría */}
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-gold-400 mb-3">
                    Categoría
                  </h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`w-full text-left px-4 py-3 text-xs sm:text-sm flex items-center justify-between border transition-all ${
                        selectedCategory === 'all'
                          ? 'border-gold-500 bg-luxury-900 text-gold-300 font-semibold'
                          : 'border-luxury-800 text-luxury-300 hover:border-luxury-700'
                      }`}
                    >
                      <span>Todas las categorías</span>
                      {selectedCategory === 'all' && <Check className="w-4 h-4 text-gold-500" />}
                    </button>
                    {categories.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.name)}
                        className={`w-full text-left px-4 py-3 text-xs sm:text-sm flex items-center justify-between border transition-all ${
                          selectedCategory.toLowerCase() === cat.name.toLowerCase()
                            ? 'border-gold-500 bg-luxury-900 text-gold-300 font-semibold'
                            : 'border-luxury-800 text-luxury-300 hover:border-luxury-700'
                        }`}
                      >
                        <span>{cat.name}</span>
                        {selectedCategory.toLowerCase() === cat.name.toLowerCase() && (
                          <Check className="w-4 h-4 text-gold-500" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Precio Máximo */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
                      Rango de Precio
                    </h4>
                    <span className="text-xs sm:text-sm font-mono text-luxury-100 font-semibold">
                      Hasta {formatCurrency(priceRange[1], config.currencySymbol)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="150000"
                    max="1500000"
                    step="50000"
                    value={priceRange[1]}
                    onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-gold-500 bg-luxury-800 cursor-pointer h-2"
                  />
                  <div className="flex justify-between text-xs text-luxury-400 mt-2 font-mono">
                    <span>$ 150.000</span>
                    <span>$ 1.500.000+</span>
                  </div>
                </div>

                {/* Material */}
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-gold-400 mb-3">
                    Material
                  </h4>
                  <div className="grid grid-cols-2 gap-2.5">
                    {materials.map(mat => (
                      <button
                        key={mat}
                        onClick={() => setSelectedMaterial(mat)}
                        className={`px-3.5 py-2.5 text-xs sm:text-sm text-center border transition-all ${
                          selectedMaterial === mat
                            ? 'border-gold-500 bg-luxury-900 text-gold-300 font-semibold'
                            : 'border-luxury-800 text-luxury-400 hover:border-luxury-700'
                        }`}
                      >
                        {mat === 'all' ? 'Cualquiera' : mat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tono / Color */}
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-gold-400 mb-3">
                    Tono / Color
                  </h4>
                  <div className="grid grid-cols-2 gap-2.5">
                    {colors.map(col => (
                      <button
                        key={col}
                        onClick={() => setSelectedColor(col)}
                        className={`px-3.5 py-2.5 text-xs sm:text-sm text-center border transition-all ${
                          selectedColor === col
                            ? 'border-gold-500 bg-luxury-900 text-gold-300 font-semibold'
                            : 'border-luxury-800 text-luxury-400 hover:border-luxury-700'
                        }`}
                      >
                        {col === 'all' ? 'Cualquiera' : col}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Disponibilidad */}
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-gold-400 mb-3">
                    Disponibilidad
                  </h4>
                  <div className="space-y-2">
                    {availabilities.map(av => (
                      <button
                        key={av.value}
                        onClick={() => setSelectedAvailability(av.value)}
                        className={`w-full text-left px-4 py-3 text-xs sm:text-sm flex items-center justify-between border transition-all ${
                          selectedAvailability === av.value
                            ? 'border-gold-500 bg-luxury-900 text-gold-300 font-semibold'
                            : 'border-luxury-800 text-luxury-300 hover:border-luxury-700'
                        }`}
                      >
                        <span>{av.label}</span>
                        {selectedAvailability === av.value && (
                          <Check className="w-4 h-4 text-gold-500" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="p-6 border-t border-luxury-800 bg-luxury-950 flex space-x-3">
                <button
                  onClick={resetFilters}
                  className="flex-1 py-3.5 border border-luxury-700 text-luxury-300 hover:text-white text-xs sm:text-sm uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Restablecer
                </button>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="flex-1 py-3.5 bg-gold-500 hover:bg-gold-400 text-luxury-950 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Ver Resultados ({filteredProducts.length})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
