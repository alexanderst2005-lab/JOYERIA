import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const EditorialCampaignSection: React.FC = () => {
  const { setSelectedCategory } = useStore();

  const handleExplore = (categoryName?: string) => {
    if (categoryName) setSelectedCategory(categoryName);
    const el = document.getElementById('catalogo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="editorial" className="py-28 bg-luxury-950 border-b border-luxury-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Campaign Layout 1: Hero Editorial Collage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Main Visual Image */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-luxury-900 border border-luxury-800 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1400&q=85"
                alt="Campaña Editorial Joyería Unisex"
                className="w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-950/80 via-transparent to-transparent" />

              {/* Floating Architectural Badge */}
              <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-xs bg-luxury-950/90 backdrop-blur-md p-5 border border-luxury-700/80">
                <span className="text-[10px] font-mono tracking-luxury uppercase text-gold-400 block mb-1">
                  MANIFIESTO VISUAL
                </span>
                <p className="font-serif text-lg text-ivory-50 tracking-wide leading-snug">
                  "El lujo reside en la ausencia de artificios."
                </p>
              </div>
            </div>

            {/* Overlapping Secondary Macro Detail Accent */}
            <div className="hidden sm:block absolute -bottom-10 -right-8 w-56 h-56 bg-luxury-900 border-2 border-luxury-950 shadow-2xl overflow-hidden z-10">
              <img
                src="https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=600&q=85"
                alt="Detalle macro joyería"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-luxury-950/20" />
            </div>
          </div>

          {/* Copy Column */}
          <div className="lg:col-span-5 lg:pl-6">
            <div className="inline-flex items-center space-x-2 text-gold-400 text-xs tracking-luxury uppercase mb-4">
              <span className="w-8 h-[1px] bg-gold-400" />
              <span>Editorial • Temporada</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl text-ivory-50 tracking-wide uppercase font-light leading-[1.15] mb-6">
              EL DETALLE DEFINE EL ESTILO.
            </h2>

            <div className="space-y-5 text-luxury-300 text-sm font-light leading-relaxed mb-8">
              <p>
                Creemos en piezas que no necesitan explicarse. Joyas con peso, sustancia y equilibrio, diseñadas bajo una perspectiva contemporánea y neutra que desafía las convenciones tradicionales.
              </p>
              <p className="text-luxury-400 text-xs leading-relaxed">
                Cada eslabón, cada ángulo biselado y cada engaste ha sido concebido para resistir el paso del tiempo y fundirse de manera natural con quien lo porta, sin importar el género ni la ocasión.
              </p>
            </div>

            {/* Three Brand Pillars */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-luxury-800 mb-8">
              <div>
                <span className="font-serif text-xl sm:text-2xl text-gold-300 block mb-1">100%</span>
                <span className="text-[11px] uppercase tracking-wider text-luxury-400 block font-light">
                  Metales nobles certificados
                </span>
              </div>
              <div>
                <span className="font-serif text-xl sm:text-2xl text-gold-300 block mb-1">Unisex</span>
                <span className="text-[11px] uppercase tracking-wider text-luxury-400 block font-light">
                  Estética universal y neutra
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => handleExplore()}
                className="px-8 py-4 bg-luxury-100 hover:bg-gold-400 text-luxury-950 text-xs font-semibold uppercase tracking-luxury transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-xl"
              >
                <span>Descubrir la Visión</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
