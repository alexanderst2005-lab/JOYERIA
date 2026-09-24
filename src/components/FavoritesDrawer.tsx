import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatCurrency } from '../utils/formatters';

export const FavoritesDrawer: React.FC = () => {
  const {
    isFavoritesOpen,
    setIsFavoritesOpen,
    favorites,
    toggleFavorite,
    products,
    addToCart,
    setActiveProduct,
    config,
  } = useStore();

  if (!isFavoritesOpen) return null;

  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-luxury-950/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsFavoritesOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-luxury-950 border-l border-luxury-800 flex flex-col justify-between shadow-2xl animate-fade-in text-luxury-100">
          {/* Header */}
          <div className="p-6 border-b border-luxury-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-gold-500 fill-gold-500" />
              <h3 className="font-serif text-xl tracking-wide uppercase text-ivory-50">
                Tus Favoritos ({favoriteProducts.length})
              </h3>
            </div>
            <button
              onClick={() => setIsFavoritesOpen(false)}
              className="text-luxury-400 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            {favoriteProducts.length === 0 ? (
              <div className="text-center py-20">
                <Heart className="w-12 h-12 text-luxury-700 mx-auto mb-4 stroke-1" />
                <h4 className="font-serif text-xl text-ivory-50 mb-2">No tienes piezas guardadas</h4>
                <p className="text-luxury-400 text-xs font-light max-w-xs mx-auto mb-6">
                  Guarda las joyas que más te cautiven para consultarlas o adquirirlas más adelante.
                </p>
                <button
                  onClick={() => setIsFavoritesOpen(false)}
                  className="px-6 py-3 bg-gold-500 hover:bg-gold-400 text-luxury-950 text-xs uppercase tracking-luxury font-semibold transition-colors cursor-pointer"
                >
                  Ver Catálogo
                </button>
              </div>
            ) : (
              <div className="divide-y divide-luxury-800">
                {favoriteProducts.map((product) => {
                  const isOutOfStock = product.stockStatus === 'Agotado' || product.stockQuantity <= 0;
                  return (
                    <div key={product.id} className="py-4 flex space-x-4">
                      {/* Image */}
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        onClick={() => {
                          setIsFavoritesOpen(false);
                          setActiveProduct(product);
                        }}
                        className="w-20 h-20 object-cover bg-luxury-900 border border-luxury-800 flex-shrink-0 cursor-pointer"
                      />

                      {/* Info & Actions */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <span className="text-[10px] font-mono text-gold-500 uppercase block">
                              {product.category}
                            </span>
                            <button
                              onClick={() => toggleFavorite(product.id)}
                              className="text-luxury-500 hover:text-rose-400 p-1 transition-colors"
                              title="Eliminar de favoritos"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <h4
                            onClick={() => {
                              setIsFavoritesOpen(false);
                              setActiveProduct(product);
                            }}
                            className="font-serif text-sm text-ivory-50 leading-snug cursor-pointer hover:text-gold-300"
                          >
                            {product.name}
                          </h4>
                          <span className="font-mono text-xs text-luxury-200 mt-1 block">
                            {formatCurrency(product.price, config.currencySymbol)}
                          </span>
                        </div>

                        <div className="mt-3">
                          <button
                            onClick={() => {
                              if (!isOutOfStock) {
                                addToCart(product, 1, product.sizes?.[0], product.color);
                              }
                            }}
                            disabled={isOutOfStock}
                            className={`w-full py-2 px-3 text-[10px] uppercase tracking-luxury font-semibold flex items-center justify-center space-x-1.5 transition-all ${
                              isOutOfStock
                                ? 'bg-luxury-800 text-luxury-500 cursor-not-allowed'
                                : 'bg-gold-500 hover:bg-gold-400 text-luxury-950 cursor-pointer'
                            }`}
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>{isOutOfStock ? 'Agotado' : 'Mover a la Bolsa'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {favoriteProducts.length > 0 && (
            <div className="p-6 border-t border-luxury-800 bg-luxury-950">
              <button
                onClick={() => setIsFavoritesOpen(false)}
                className="w-full py-3.5 border border-luxury-700 hover:border-gold-500 text-luxury-200 text-xs uppercase tracking-luxury flex items-center justify-center space-x-2 transition-colors cursor-pointer"
              >
                <span>Continuar explorando</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
