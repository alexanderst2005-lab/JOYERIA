import React, { useState } from 'react';
import { Heart, Eye, Plus, Check } from 'lucide-react';
import type { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { formatCurrency } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    config,
    addToCart,
    toggleFavorite,
    isFavorite,
    setActiveProduct,
    addRecentlyViewed,
  } = useStore();

  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const favorite = isFavorite(product.id);
  const isOutOfStock = product.stockStatus === 'Agotado' || product.stockQuantity <= 0;

  const handleOpenDetail = () => {
    addRecentlyViewed(product);
    setActiveProduct(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock) return;

    const defaultSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined;
    const success = addToCart(product, 1, defaultSize, product.color);
    if (success) {
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  const primaryImage = product.images[0] || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80';
  const secondaryImage = product.images[1] || primaryImage;

  return (
    <div
      onClick={handleOpenDetail}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex flex-col bg-luxury-950 border border-luxury-900/80 hover:border-luxury-700/80 transition-all duration-300 cursor-pointer relative"
    >
      {/* Product Image Area */}
      <div className="relative aspect-square w-full overflow-hidden bg-luxury-900">
        {/* Primary Image */}
        <img
          src={primaryImage}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
            isHovered && product.images.length > 1 ? 'opacity-0' : 'opacity-100 scale-100 group-hover:scale-105'
          }`}
          loading="lazy"
        />

        {/* Secondary Image for smooth crossfade on hover */}
        {product.images.length > 1 && (
          <img
            src={secondaryImage}
            alt={`${product.name} detalle`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
            loading="lazy"
          />
        )}

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1.5 z-10">
          {product.stockStatus === 'Últimas unidades' && (
            <span className="bg-gold-500/90 text-luxury-950 font-medium text-[9px] uppercase tracking-luxury px-2 py-0.5 backdrop-blur-sm">
              Últimas unidades
            </span>
          )}
          {isOutOfStock && (
            <span className="bg-luxury-800 text-luxury-300 font-medium text-[9px] uppercase tracking-luxury px-2 py-0.5 border border-luxury-700">
              Agotado
            </span>
          )}
          {product.isNew && !isOutOfStock && (
            <span className="bg-luxury-900/90 text-luxury-200 text-[9px] uppercase tracking-luxury px-2 py-0.5 border border-luxury-700 backdrop-blur-sm">
              Nuevo
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleToggleFavorite}
          aria-label={favorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            favorite
              ? 'bg-gold-500 text-luxury-950'
              : 'bg-luxury-950/70 text-luxury-300 hover:text-gold-400 hover:bg-luxury-950 backdrop-blur-sm'
          }`}
        >
          <Heart
            className={`w-4 h-4 ${favorite ? 'fill-luxury-950 stroke-luxury-950' : 'stroke-[1.5]'}`}
          />
        </button>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hidden sm:block">
          <div className="flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleOpenDetail();
              }}
              className="flex-1 bg-luxury-950/90 hover:bg-luxury-900 text-luxury-200 text-[10px] tracking-luxury uppercase py-2.5 px-3 border border-luxury-700 flex items-center justify-center space-x-1.5 backdrop-blur-md transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Ver Pieza</span>
            </button>

            {!isOutOfStock && (
              <button
                onClick={handleAddToCart}
                disabled={justAdded}
                className="bg-gold-500 hover:bg-gold-400 text-luxury-950 text-[10px] tracking-luxury uppercase py-2.5 px-3 font-semibold flex items-center justify-center transition-colors"
                title="Añadir a la bolsa"
              >
                {justAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <div className="text-[10px] tracking-editorial uppercase text-gold-500 mb-1">
            {product.category}
          </div>
          <h4 className="font-serif text-base sm:text-lg text-ivory-50 group-hover:text-gold-300 transition-colors leading-snug">
            {product.name}
          </h4>
          <p className="text-luxury-400 text-[11px] line-clamp-1 mt-1 font-light">
            {product.material}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-luxury-900 flex items-center justify-between">
          <div className="flex items-baseline space-x-2">
            <span className="font-sans text-sm sm:text-base font-medium text-luxury-100 tracking-wide">
              {formatCurrency(product.price, config.currencySymbol)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-luxury-500 line-through text-xs font-light">
                {formatCurrency(product.originalPrice, config.currencySymbol)}
              </span>
            )}
          </div>

          {/* Availability Status Dot */}
          <div className="flex items-center space-x-1.5 text-[10px] text-luxury-400">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isOutOfStock
                  ? 'bg-rose-500'
                  : product.stockStatus === 'Últimas unidades'
                  ? 'bg-amber-400 animate-pulse'
                  : 'bg-emerald-500'
              }`}
            />
            <span className="hidden sm:inline font-light">
              {isOutOfStock ? 'Agotado' : product.stockStatus}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
