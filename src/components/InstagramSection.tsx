import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { InstagramIcon } from './icons/InstagramIcon';
import { INSTAGRAM_POSTS } from '../data/initialData';
import { useStore } from '../context/StoreContext';

export const InstagramSection: React.FC = () => {
  const { config } = useStore();

  return (
    <section className="py-24 bg-luxury-950 border-b border-luxury-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 text-gold-400 text-xs tracking-luxury uppercase mb-3">
            <InstagramIcon className="w-3.5 h-3.5 text-gold-500" />
            <span>Comunidad & Estilo</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-ivory-50 tracking-wide uppercase font-light">
            SÍGUENOS EN NUESTRO UNIVERSO
          </h2>
          <p className="text-luxury-400 text-xs sm:text-sm font-light mt-3 tracking-wide">
            Inspiración editorial, procesos de forja artesanal y lanzamientos exclusivos en {config.instagramHandle}
          </p>
        </div>

        {/* 6-Photo Curated Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-12">
          {INSTAGRAM_POSTS.map(post => (
            <a
              key={post.id}
              href={config.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden bg-luxury-900 border border-luxury-800/80 block cursor-pointer"
            >
              <img
                src={post.image}
                alt="Instagram post"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-luxury-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center">
                <InstagramIcon className="w-6 h-6 text-gold-400 mb-2 transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300" />
                <span className="text-[10px] text-luxury-200 line-clamp-3 font-light">
                  {post.caption}
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Follow CTA Button */}
        <div className="text-center">
          <a
            href={config.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-8 py-3.5 border border-luxury-700 hover:border-gold-500 text-luxury-200 hover:text-gold-300 text-xs uppercase tracking-luxury transition-all bg-luxury-900/40 backdrop-blur-sm cursor-pointer shadow-lg"
          >
            <span>VER INSTAGRAM ({config.instagramHandle})</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
