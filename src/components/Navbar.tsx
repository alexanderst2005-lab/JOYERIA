import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface NavbarProps {
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const {
    config,
    cartCount,
    favorites,
    setIsCartOpen,
    setIsFavoritesOpen,
    setIsAdminOpen,
    searchQuery,
    setSearchQuery,
    setSelectedCategory,
    currentView,
    setCurrentView,
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string, category?: string) => {
    setMobileMenuOpen(false);
    if (category) {
      setSelectedCategory(category);
    }

    if (id === 'catalogo') {
      setCurrentView('catalog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 60);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Ensure clean brand name without intra-letter breaks
  const cleanBrandName = config.brandName ? config.brandName.replace(/\s+/g, '') : 'AUREUM';

  return (
    <>
      {/* Top Moving Ribbon: glides continuously from right to left */}
      <div className="bg-luxury-900 border-b border-luxury-800/80 py-2 sm:py-2.5 overflow-hidden select-none z-40 relative">
        <div className="animate-marquee flex items-center space-x-8 text-[11px] sm:text-xs uppercase tracking-[0.25em] text-gold-400 font-medium whitespace-nowrap">
          <span>✦ ALTA JOYERÍA CONTEMPORÁNEA</span>
          <span>✦ METALES NOBLES 100% CERTIFICADOS</span>
          <span>✦ ORO 18K & PLATA 925</span>
          <span>✦ ENVÍOS NACIONALES ASEGURADOS</span>
          <span>✦ PIEZAS DE AUTOR CON IDENTIDAD</span>
          <span>✦ ATENCIÓN PERSONALIZADA POR WHATSAPP</span>
          <span>✦ PACKAGING EXCLUSIVO DE LUJO</span>
          {/* Loop copy */}
          <span>✦ ALTA JOYERÍA CONTEMPORÁNEA</span>
          <span>✦ METALES NOBLES 100% CERTIFICADOS</span>
          <span>✦ ORO 18K & PLATA 925</span>
          <span>✦ ENVÍOS NACIONALES ASEGURADOS</span>
          <span>✦ PIEZAS DE AUTOR CON IDENTIDAD</span>
          <span>✦ ATENCIÓN PERSONALIZADA POR WHATSAPP</span>
          <span>✦ PACKAGING EXCLUSIVO DE LUJO</span>
        </div>
      </div>

      {/* Main Navbar: LOGO A LA IZQUIERDA | NAVEGACIÓN CENTRADA | ACCIONES A LA DERECHA */}
      <header
        className={`sticky top-0 z-30 transition-all duration-300 ${
          isScrolled
            ? 'bg-luxury-950/98 backdrop-blur-md py-4 sm:py-5 border-b border-luxury-800 shadow-2xl'
            : 'bg-luxury-950/90 backdrop-blur-sm py-5 sm:py-6 border-b border-luxury-900/80'
        }`}
      >
        <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-12 items-center w-full gap-4">
            
            {/* 1. LOGO A LA IZQUIERDA (col-span-1 en mobile, col-span-3 en desktop) */}
            <div className="lg:col-span-3 flex items-center justify-start">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentView('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex flex-col items-start group select-none whitespace-nowrap"
              >
                <span className="font-serif text-2xl sm:text-3xl lg:text-4xl tracking-[0.25em] text-ivory-50 uppercase font-light transition-all duration-300 group-hover:text-gold-300 drop-shadow-md whitespace-nowrap">
                  {cleanBrandName}
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-[0.35em] uppercase text-gold-500 font-sans mt-0.5 whitespace-nowrap">
                  Haute Joaillerie
                </span>
              </a>
            </div>

            {/* 2. NAVEGACIÓN TOTALMENTE CENTRADA (col-span-6 en desktop) */}
            <nav className="hidden lg:flex lg:col-span-6 items-center justify-center space-x-8 xl:space-x-10 text-sm font-medium tracking-[0.22em] uppercase text-luxury-200 whitespace-nowrap">
              <button
                onClick={() => scrollToSection('catalogo')}
                className="hover:text-gold-400 transition-colors cursor-pointer py-1 relative group"
              >
                Colección
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gold-400 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button
                onClick={() => scrollToSection('categorias')}
                className="hover:text-gold-400 transition-colors cursor-pointer py-1 relative group"
              >
                Categorías
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gold-400 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button
                onClick={() => scrollToSection('destacados')}
                className="hover:text-gold-400 transition-colors cursor-pointer py-1 relative group"
              >
                Destacados
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gold-400 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button
                onClick={() => scrollToSection('editorial')}
                className="hover:text-gold-400 transition-colors cursor-pointer py-1 relative group"
              >
                Editorial
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gold-400 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="hover:text-gold-400 transition-colors cursor-pointer py-1 relative group"
              >
                Dudas Frecuentes
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gold-400 transition-all duration-300 group-hover:w-full"></span>
              </button>
            </nav>

            {/* 3. ACCIONES A LA DERECHA (col-span-1 en mobile, col-span-3 en desktop) */}
            <div className="lg:col-span-3 flex items-center justify-end space-x-3 sm:space-x-6">
              {/* Search Toggle */}
              <div className="relative">
                {showSearchInput ? (
                  <div className="flex items-center bg-luxury-900 border border-luxury-700 px-3.5 py-2 animate-fade-in shadow-xl">
                    <Search className="w-4 h-4 text-luxury-400 mr-2" />
                    <input
                      type="text"
                      placeholder="Buscar joya..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        scrollToSection('catalogo');
                      }}
                      className="bg-transparent border-none text-xs sm:text-sm text-luxury-100 placeholder-luxury-500 focus:outline-none w-28 sm:w-44"
                      autoFocus
                    />
                    <button
                      onClick={() => setShowSearchInput(false)}
                      className="text-luxury-400 hover:text-white ml-1 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setShowSearchInput(true);
                      scrollToSection('catalogo');
                    }}
                    className="text-luxury-200 hover:text-gold-400 p-2 sm:p-2.5 transition-colors cursor-pointer"
                    aria-label="Buscar joyas"
                    title="Buscar joyas"
                  >
                    <Search className="w-5 sm:w-6 h-5 sm:h-6 stroke-[1.5]" />
                  </button>
                )}
              </div>

              {/* Wishlist / Favorites */}
              <button
                onClick={() => setIsFavoritesOpen(true)}
                className="text-luxury-200 hover:text-gold-400 p-2 sm:p-2.5 transition-colors relative cursor-pointer"
                aria-label="Favoritos"
                title="Piezas favoritas guardadas"
              >
                <Heart className="w-5 sm:w-6 h-5 sm:h-6 stroke-[1.5]" />
                {favorites.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 sm:w-5 h-4 sm:h-5 bg-gold-500 text-luxury-950 font-bold text-[10px] sm:text-xs rounded-full flex items-center justify-center animate-pulse">
                    {favorites.length}
                  </span>
                )}
              </button>

              {/* Shopping Bag / Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="text-luxury-100 hover:text-gold-400 p-2 sm:p-2.5 transition-colors relative flex items-center space-x-2.5 cursor-pointer"
                aria-label="Bolsa de compras"
              >
                <div className="relative">
                  <ShoppingBag className="w-5 sm:w-6 h-5 sm:h-6 stroke-[1.5]" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1.5 w-4 sm:w-5 h-4 sm:h-5 bg-gold-500 text-luxury-950 font-bold text-[10px] sm:text-xs rounded-full flex items-center justify-center shadow-lg">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline text-xs sm:text-sm uppercase tracking-widest text-luxury-200 font-semibold">
                  Bolsa
                </span>
              </button>

              {/* Mobile Menu Hamburger (Visible on small screens) */}
              <div className="flex items-center lg:hidden ml-1">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-luxury-100 hover:text-gold-400 p-2 transition-colors focus:outline-none"
                  aria-label="Abrir menú"
                >
                  {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[75px] z-50 bg-luxury-950/98 backdrop-blur-2xl border-t border-luxury-800 p-6 flex flex-col justify-between animate-fade-in overflow-y-auto">
            <div className="space-y-6 text-center pt-6">
              <div className="text-xs tracking-[0.3em] uppercase text-gold-500">Navegación Exclusiva</div>
              <nav className="flex flex-col space-y-6 text-lg tracking-[0.25em] uppercase font-light">
                <button
                  onClick={() => scrollToSection('catalogo')}
                  className="hover:text-gold-400 transition-colors py-2"
                >
                  Colección Completa
                </button>
                <button
                  onClick={() => scrollToSection('categorias')}
                  className="hover:text-gold-400 transition-colors py-2"
                >
                  Categorías
                </button>
                <button
                  onClick={() => scrollToSection('destacados')}
                  className="hover:text-gold-400 transition-colors py-2"
                >
                  Piezas Destacadas
                </button>
                <button
                  onClick={() => scrollToSection('editorial')}
                  className="hover:text-gold-400 transition-colors py-2"
                >
                  Editorial & Estilo
                </button>
                <button
                  onClick={() => scrollToSection('faq')}
                  className="hover:text-gold-400 transition-colors py-2"
                >
                  Preguntas Frecuentes
                </button>
              </nav>

              <div className="pt-8 border-t border-luxury-800">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAdminOpen(true);
                  }}
                  className="text-xs uppercase tracking-widest text-luxury-400 hover:text-gold-400 flex items-center justify-center space-x-2 mx-auto py-2"
                >
                  <SlidersHorizontal className="w-4 h-4 text-gold-500" />
                  <span>Configuración & Catálogo</span>
                </button>
              </div>
            </div>

            <div className="pb-10 pt-8 text-center text-xs text-luxury-400 tracking-wider">
              <p className="mb-3 text-[11px] text-luxury-500 uppercase tracking-widest">Atención Directa</p>
              <a
                href={`https://wa.me/${config.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-gold-400 hover:underline space-x-1.5 text-sm font-mono"
              >
                <span>{config.whatsappDisplayNumber}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
