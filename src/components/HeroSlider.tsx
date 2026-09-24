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
      {/* FULLSCREEN HORIZONTAL SLIDING HERO (Physically translates Right to Left) */}
      <section
        className="relative w-full h-[85vh] min-h-[580px] max-h-[960px] overflow-hidden select-none"
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

                {/* Slide Text Content */}
                <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16 pb-20 sm:pb-28 lg:pb-32">
                  <div className="max-w-3xl">
                    {/* Badge */}
                    <div className="inline-flex items-center space-x-3 text-gold-400 text-xs sm:text-sm tracking-[0.3em] uppercase mb-4 sm:mb-6 font-medium">
                      <span className="w-10 sm:w-16 h-[1.5px] bg-gold-400" />
                      <span>{slide.tag}</span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-ivory-50 tracking-wide uppercase font-light leading-[1.08] mb-4 sm:mb-6 drop-shadow-lg">
                      {slide.title}
                    </h1>

                    {/* Subtitle */}
                    <p className="text-luxury-200 text-sm sm:text-lg lg:text-xl font-light tracking-wide max-w-2xl mb-8 sm:mb-10 leading-relaxed drop-shadow-md">
                      {slide.subtitle}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
                      <button
                        onClick={() => handleCtaClick(slide.categoryTarget)}
                        className="px-8 sm:px-10 py-4 sm:py-5 bg-gold-500 hover:bg-gold-400 text-luxury-950 text-xs sm:text-sm font-bold uppercase tracking-[0.25em] transition-all duration-300 shadow-2xl flex items-center justify-center space-x-3 cursor-pointer group"
                      >
                        <span>DESCUBRIR COLECCIÓN</span>
                        <span className="transition-transform duration-300 group-hover:translate-x-1.5 text-base font-bold">
                          →
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          const el = document.getElementById('editorial');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-8 sm:px-10 py-4 sm:py-5 border border-luxury-600 hover:border-gold-500 text-luxury-100 hover:text-gold-300 text-xs sm:text-sm font-medium uppercase tracking-[0.25em] transition-all duration-300 cursor-pointer bg-luxury-950/60 backdrop-blur-md text-center"
                      >
                        Ver Campaña Editorial
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Manual Arrow Controls */}
        <button
          onClick={prevSlide}
          aria-label="Slide anterior"
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center text-luxury-300 hover:text-gold-300 bg-luxury-950/70 hover:bg-luxury-900 border border-luxury-800 hover:border-gold-500/70 transition-all cursor-pointer backdrop-blur-md shadow-2xl"
        >
          <ChevronLeft className="w-6 sm:w-8 h-6 sm:h-8 stroke-[1.5]" />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Slide siguiente"
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center text-luxury-300 hover:text-gold-300 bg-luxury-950/70 hover:bg-luxury-900 border border-luxury-800 hover:border-gold-500/70 transition-all cursor-pointer backdrop-blur-md shadow-2xl"
        >
          <ChevronRight className="w-6 sm:w-8 h-6 sm:h-8 stroke-[1.5]" />
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
