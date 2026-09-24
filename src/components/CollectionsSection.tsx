import React from 'react';
import { ArrowRight, Sparkles, TrendingUp, Clock } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CollectionsSection: React.FC = () => {
  const { setSelectedCategory, setCurrentView, setSortBy } = useStore();

  const handleOpenCatalog = (sortOption?: string, categoryOption?: string) => {
    if (sortOption) setSortBy(sortOption);
    if (categoryOption) {
      setSelectedCategory(categoryOption);
    } else {
      setSelectedCategory('all');
    }
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const collections = [
    {
      id: 'destacadas',
      badge: 'Colección Permanente',
      icon: Sparkles,
      title: 'Piezas Destacadas',
      desc: 'Iconos forjados en oro de 18K y plata de ley con proporciones arquitectónicas esenciales.',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=85',
      action: () => handleOpenCatalog('destacados'),
      btnText: 'Ver Selección Destacada',
    },
    {
      id: 'mas-elegidos',
      badge: 'Favoritos Contemporáneos',
      icon: TrendingUp,
      title: 'Más Elegidos',
      desc: 'Las piezas insignia predilectas por su balance universal y versatilidad atemporal.',
      image: 'https://images.unsplash.com/photo-1611591475104-749e7b231ff6?auto=format&fit=crop&w=800&q=85',
      action: () => handleOpenCatalog('destacados'),
      btnText: 'Ver Más Elegidos',
    },
    {
      id: 'novedades',
      badge: 'Edición Limitada',
      icon: Clock,
      title: 'Novedades',
      desc: 'Nuevas incorporaciones con biselados milimétricos y contrastes de metales y texturas.',
      image: 'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=800&q=85',
      action: () => handleOpenCatalog('recientes'),
      btnText: 'Explorar Novedades',
    },
  ];

  return (
    <section id="destacados" className="py-24 sm:py-32 bg-luxury-900/30 border-b border-luxury-900">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Banner Editorial Principal: NUEVA COLECCIÓN */}
        <div className="relative mb-20 overflow-hidden border border-luxury-800 bg-luxury-950 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left text column */}
            <div className="lg:col-span-6 p-8 sm:p-14 lg:p-16 z-10">
              <div className="inline-flex items-center space-x-2 text-gold-400 text-xs tracking-[0.25em] uppercase mb-4">
                <span className="w-8 h-[1px] bg-gold-400" />
                <span>Lanzamiento de Temporada</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-ivory-50 tracking-wide uppercase font-light leading-tight mb-5">
                NUEVA COLECCIÓN: ARQUITECTURA DEL METAL
              </h3>
              <p className="text-luxury-300 text-sm sm:text-base font-light leading-relaxed max-w-xl mb-8">
                Formas angulares, pureza estructural y el contraste impoluto entre el oro de 18 quilates y la profundidad del ónix negro. Piezas diseñadas para quien busca distinción sin estridencias.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => handleOpenCatalog('recientes')}
                  className="px-8 py-4 bg-gold-500 hover:bg-gold-400 text-luxury-950 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] transition-all cursor-pointer shadow-xl flex items-center space-x-2"
                >
                  <span>Descubrir Colección en el Catálogo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleOpenCatalog(undefined, 'Anillos')}
                  className="px-6 py-4 border border-luxury-700 text-luxury-300 hover:text-white hover:border-luxury-500 text-xs sm:text-sm uppercase tracking-[0.2em] transition-all cursor-pointer"
                >
                  Ver Anillos
                </button>
              </div>
            </div>

            {/* Right visual image column */}
            <div className="lg:col-span-6 h-80 sm:h-96 lg:h-[460px] relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=85"
                alt="Nueva Colección Joyería"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-950/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-luxury-950 lg:via-transparent lg:to-transparent" />
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center space-x-2 text-gold-400 text-xs tracking-[0.25em] uppercase mb-2">
              <span className="w-6 h-[1px] bg-gold-400" />
              <span>Curaduría</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ivory-50 tracking-wide uppercase font-light">
              COLECCIONES SELECTAS
            </h2>
          </div>
          <p className="text-luxury-400 text-xs sm:text-sm font-light tracking-wide max-w-md mt-4 md:mt-0 leading-relaxed">
            Una selección conceptual diseñada con armonía unisex. Haz clic en cualquier selección para explorarla en el catálogo completo.
          </p>
        </div>

        {/* Lookbook / Collections Triad (Zero Product Cards, Pure Editorial Photography) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {collections.map((col) => {
            const Icon = col.icon;
            return (
              <div
                key={col.id}
                onClick={col.action}
                className="group relative bg-luxury-950 border border-luxury-800/80 hover:border-gold-500/60 transition-all duration-500 overflow-hidden cursor-pointer flex flex-col h-full shadow-lg"
              >
                {/* Visual Image container */}
                <div className="relative h-72 sm:h-80 overflow-hidden bg-luxury-900">
                  <img
                    src={col.image}
                    alt={col.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-950 via-luxury-950/20 to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-4 left-4 inline-flex items-center space-x-1.5 px-3 py-1 bg-luxury-950/80 backdrop-blur-md border border-luxury-800 text-[10px] uppercase tracking-widest text-gold-400">
                    <Icon className="w-3 h-3 text-gold-400" />
                    <span>{col.badge}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between bg-luxury-950">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl text-ivory-50 tracking-wide uppercase font-light mb-3 group-hover:text-gold-300 transition-colors">
                      {col.title}
                    </h3>
                    <p className="text-luxury-300 text-xs sm:text-sm font-light leading-relaxed mb-6">
                      {col.desc}
                    </p>
                  </div>

                  <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-gold-400 font-medium pt-4 border-t border-luxury-800/60 group-hover:text-gold-300">
                    <span>{col.btnText}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
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
