import React from 'react';
import { ArrowUp, MessageCircle, ShieldCheck } from 'lucide-react';
import { InstagramIcon } from './icons/InstagramIcon';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { config, categories, setSelectedCategory, setIsAdminOpen } = useStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryNav = (catName: string) => {
    setSelectedCategory(catName);
    const el = document.getElementById('catalogo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-luxury-950 text-luxury-300 border-t border-luxury-900 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="font-serif text-3xl tracking-[0.35em] text-ivory-50 uppercase font-light mb-3">
              {config.brandName}
            </div>
            <div className="text-[10px] tracking-[0.25em] uppercase text-gold-500 mb-6">
              Haute Joaillerie Contemporaine
            </div>
            <p className="text-luxury-400 text-xs font-light leading-relaxed max-w-sm mb-6">
              Joyería de alta gama con identidad universal y atemporal. Piezas concebidas para trascender modas efímeras con diseño sobrio y metales nobles garantizados.
            </p>
            <div className="flex items-center space-x-3 text-luxury-400">
              <a
                href={config.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-luxury-800 hover:border-gold-500 flex items-center justify-center text-luxury-300 hover:text-gold-400 transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${config.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-luxury-800 hover:border-gold-500 flex items-center justify-center text-luxury-300 hover:text-gold-400 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Catalog Column */}
          <div>
            <h5 className="font-serif text-sm uppercase tracking-luxury text-ivory-50 mb-5">
              Catálogo
            </h5>
            <ul className="space-y-3 text-xs tracking-wider uppercase font-light text-luxury-400">
              <li>
                <a
                  href="#catalogo"
                  onClick={e => {
                    e.preventDefault();
                    setSelectedCategory('all');
                    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-gold-400 transition-colors"
                >
                  Todas las Piezas
                </a>
              </li>
              <li>
                <a
                  href="#destacados"
                  className="hover:text-gold-400 transition-colors"
                >
                  Piezas Destacadas
                </a>
              </li>
              <li>
                <a
                  href="#destacados"
                  className="hover:text-gold-400 transition-colors"
                >
                  Más Elegidos
                </a>
              </li>
              <li>
                <a
                  href="#editorial"
                  className="hover:text-gold-400 transition-colors"
                >
                  Campaña Editorial
                </a>
              </li>
            </ul>
          </div>

          {/* Categories Column */}
          <div>
            <h5 className="font-serif text-sm uppercase tracking-luxury text-ivory-50 mb-5">
              Categorías
            </h5>
            <ul className="space-y-2.5 text-xs tracking-wider uppercase font-light text-luxury-400">
              {categories.slice(0, 6).map(c => (
                <li key={c.id}>
                  <button
                    onClick={() => handleCategoryNav(c.name)}
                    className="hover:text-gold-400 transition-colors cursor-pointer text-left"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support Column */}
          <div>
            <h5 className="font-serif text-sm uppercase tracking-luxury text-ivory-50 mb-5">
              Atención & Legal
            </h5>
            <ul className="space-y-3 text-xs tracking-wider text-luxury-400 font-light">
              <li>
                <a
                  href={`https://wa.me/${config.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-400 transition-colors flex items-center space-x-1.5"
                >
                  <span>WhatsApp: {config.whatsappDisplayNumber}</span>
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-gold-400 transition-colors uppercase">
                  Preguntas Frecuentes
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-gold-400 transition-colors uppercase">
                  Políticas de Envío
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-gold-400 transition-colors uppercase">
                  Garantía & Cambios
                </a>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => setIsAdminOpen(true)}
                  className="text-gold-500 hover:text-gold-400 underline text-[11px] uppercase tracking-wider cursor-pointer"
                >
                  Panel de Administración
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-luxury-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-luxury-500 font-light">
          <div className="flex items-center space-x-2 mb-4 sm:mb-0">
            <ShieldCheck className="w-4 h-4 text-gold-500" />
            <span>© {new Date().getFullYear()} {config.brandName}. Todos los derechos reservados. Alta Joyería Unisex.</span>
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={scrollToTop}
              className="hover:text-gold-400 flex items-center space-x-1 transition-colors cursor-pointer"
            >
              <span>Subir al inicio</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
