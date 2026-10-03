import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowDown } from 'lucide-react';
import { HERO_SLIDES } from '../data/initialData';
import { useStore } from '../context/StoreContext';

export const HeroSlider: React.FC = () => {
  const { setSelectedCategory, setCurrentView } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Mobile Touch Swipe Handling
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const totalSlides = HERO_SLIDES.length;

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
  };

  // Auto-advance every 4.2 seconds
  useEffect(() => {
    if (isPaused) return;

    timeoutRef.current = setTimeout(() => {
      nextSlide();
    }, 4200);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentSlide, isPaused]);

  // Touch Swipe Listeners
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      // Swiped Left -> Move to Next Slide (right to left motion)
      nextSlide();
    } else if (diff < -45) {
      // Swiped Right -> Move to Prev Slide
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleCtaClick = (categoryTarget?: string) => {
    if (categoryTarget) {
      setSelectedCategory(categoryTarget);
    }
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full overflow-hidden bg-luxury-950">
      {/* FULLSCREEN HERO */}
      <section
        className="relative w-full h-[100dvh] min-h-[600px] overflow-hidden select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Horizontal Carousel Track */}
        <div
          className="flex h-full w-full transition-transform duration-700 ease-out"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {HERO_SLIDES.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={slide.id}
                className="relative w-full h-full flex-shrink-0 flex items-end overflow-hidden"
                style={{ minWidth: '100%' }}
              >
                {/* Background Image with subtle Ken Burns zoom */}
                <div
                  className={`absolute inset-0 bg-cover bg-center transition-transform duration-7000 ease-out ${
                    isActive ? 'scale-105' : 'scale-100'
                  }`}
                  style={{ backgroundImage: `url(${slide.image})` }}
                />

                {/* Editorial Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-950 via-luxury-950/60 to-luxury-950/20" />
                <div className="absolute inset-0 bg-gradient-to-r from-luxury-950/90 via-luxury-950/50 to-transparent" />

                {/* Slide Text Content (Centered Layout) */}
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-4 pt-20">
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-ivory-50 tracking-[0.2em] uppercase font-light drop-shadow-2xl mb-3 sm:mb-4">
                      AUREUM
                    </h1>
                    <span className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-gold-500 font-sans drop-shadow-md">
                      COMPRAVENTA Y JOYERIA
                    </span>
                  </div>

                  <div className="pb-16 sm:pb-20 flex flex-col items-center">
                    <button
                      onClick={() => handleCtaClick(slide.categoryTarget)}
                      className="px-8 sm:px-12 py-3 sm:py-4 bg-luxury-950/40 backdrop-blur-sm border border-gold-500/50 hover:border-gold-400 hover:bg-gold-500/10 text-gold-400 text-xs sm:text-sm font-medium uppercase tracking-[0.25em] transition-all duration-300 flex items-center space-x-3 cursor-pointer group mb-10 sm:mb-12 shadow-lg"
                    >
                      <span>EXPLORAR COLECCIÓN</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                        →
                      </span>
                    </button>
                    
                    <div className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-luxury-400 mb-4 opacity-80">
                      Descubrir
                    </div>
                    <div className="w-[1.5px] h-12 sm:h-16 bg-gradient-to-b from-gold-500 to-transparent opacity-70"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Manual Arrow Controls - Positioned in the upper third on mobile so they NEVER overlap headline or text */}
        <button
          onClick={prevSlide}
          aria-label="Slide anterior"
          className="absolute left-2.5 sm:left-8 top-[28%] sm:top-1/2 -translate-y-1/2 z-20 w-8 sm:w-14 h-8 sm:h-14 rounded-full sm:rounded-none flex items-center justify-center text-luxury-300 hover:text-gold-300 bg-luxury-950/80 hover:bg-luxury-900 border border-luxury-800 hover:border-gold-500/70 transition-all cursor-pointer backdrop-blur-md shadow-2xl"
        >
          <ChevronLeft className="w-4 sm:w-7 h-4 sm:h-7 stroke-[1.5]" />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Slide siguiente"
          className="absolute right-2.5 sm:right-8 top-[28%] sm:top-1/2 -translate-y-1/2 z-20 w-8 sm:w-14 h-8 sm:h-14 rounded-full sm:rounded-none flex items-center justify-center text-luxury-300 hover:text-gold-300 bg-luxury-950/80 hover:bg-luxury-900 border border-luxury-800 hover:border-gold-500/70 transition-all cursor-pointer backdrop-blur-md shadow-2xl"
        >
          <ChevronRight className="w-4 sm:w-7 h-4 sm:h-7 stroke-[1.5]" />
        </button>

        {/* Slide Indicators & Timeline Bars (Bottom) */}
        <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-12 lg:left-16 z-20 flex items-center space-x-3 sm:space-x-4">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Ir al slide ${idx + 1}`}
              className="group py-3 cursor-pointer focus:outline-none"
            >
              <div
                className={`h-[3px] transition-all duration-500 rounded-full ${
                  idx === currentSlide
                    ? 'w-12 sm:w-16 bg-gold-400 shadow-[0_0_10px_rgba(200,162,74,0.8)]'
                    : 'w-6 sm:w-8 bg-luxury-700/80 group-hover:bg-luxury-400'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Floating Counter */}
        <div className="absolute bottom-6 sm:bottom-10 right-6 sm:right-12 lg:right-16 z-20 flex items-center space-x-3 text-luxury-400 font-mono text-xs sm:text-sm tracking-widest uppercase">
          <span className="text-gold-400 font-bold">0{currentSlide + 1}</span>
          <span>/</span>
          <span>0{totalSlides}</span>
          <ArrowDown className="w-4 h-4 ml-2 animate-bounce text-gold-400 hidden sm:inline" />
        </div>
      </section>
    </div>
  );
};
