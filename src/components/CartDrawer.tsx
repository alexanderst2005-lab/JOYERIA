import React from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatCurrency } from '../utils/formatters';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    config,
    setIsCheckoutOpen,
  } = useStore();

  if (!isCartOpen) return null;

  const isFreeShipping = cartSubtotal >= config.freeShippingThreshold;
  const shippingCost = isFreeShipping || cart.length === 0 ? 0 : 15000;
  const total = cartSubtotal + shippingCost;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-luxury-950/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-luxury-950 border-l border-luxury-800 flex flex-col justify-between shadow-2xl animate-fade-in text-luxury-100">
          {/* Header */}
          <div className="p-6 border-b border-luxury-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-gold-500" />
              <h3 className="font-serif text-xl tracking-wide uppercase text-ivory-50">
                Tu Bolsa de Compras ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              aria-label="Cerrar bolsa"
              className="text-luxury-400 hover:text-white p-1 cursor-pointer transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Body: Items List or Empty State */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-20">
                <ShoppingBag className="w-12 h-12 text-luxury-700 mx-auto mb-4 stroke-1" />
                <h4 className="font-serif text-xl text-ivory-50 mb-2">Tu bolsa está vacía</h4>
                <p className="text-luxury-400 text-xs font-light max-w-xs mx-auto mb-6">
                  Descubre piezas atemporales diseñadas para perdurar en el tiempo.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-3 bg-gold-500 hover:bg-gold-400 text-luxury-950 text-xs uppercase tracking-luxury font-semibold transition-colors cursor-pointer"
                >
                  Explorar Catálogo
                </button>
              </div>
            ) : (
              <>
                {/* Free shipping progress indicator */}
                <div className="bg-luxury-900/60 p-3.5 border border-luxury-800 text-xs">
                  {isFreeShipping ? (
                    <div className="flex items-center space-x-2 text-gold-400">
                      <ShieldCheck className="w-4 h-4 text-gold-500" />
                      <span className="font-medium">¡Calificas para Envío Nacional Asegurado Gratuito!</span>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between text-luxury-300 mb-1.5 text-[11px]">
                        <span>Faltan {formatCurrency(config.freeShippingThreshold - cartSubtotal, config.currencySymbol)} para envío gratuito</span>
                        <span>{Math.round((cartSubtotal / config.freeShippingThreshold) * 100)}%</span>
                      </div>
                      <div className="w-full h-1 bg-luxury-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gold-500 transition-all duration-300"
                          style={{ width: `${Math.min(100, (cartSubtotal / config.freeShippingThreshold) * 100)}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Items */}
                <div className="divide-y divide-luxury-800/80">
                  {cart.map((item) => (
                    <div key={item.id} className="py-4 flex space-x-4">
                      {/* Product Thumbnail */}
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover bg-luxury-900 border border-luxury-800 flex-shrink-0"
                      />

                      {/* Info & Controls */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[10px] font-mono text-gold-500 uppercase block">
                              {item.product.category}
                            </span>
                            <h4 className="font-serif text-sm text-ivory-50 leading-snug">
                              {item.product.name}
                            </h4>
                            {item.selectedSize && (
                              <span className="text-[11px] text-luxury-400 block mt-0.5">
                                Talla / Medida: {item.selectedSize}
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-luxury-500 hover:text-rose-400 p-1 transition-colors"
                            title="Eliminar de la bolsa"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          {/* Quantity control */}
                          <div className="flex items-center border border-luxury-800 bg-luxury-900">
                            <button
                              onClick={() => updateCartQuantity(item.id, -1)}
                              className="p-1.5 text-luxury-400 hover:text-white"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 text-xs font-mono text-luxury-200">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.id, 1)}
                              disabled={item.quantity >= item.product.stockQuantity}
                              className="p-1.5 text-luxury-400 hover:text-white disabled:opacity-30"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Item Price */}
                          <span className="font-mono text-xs text-luxury-100 font-medium">
                            {formatCurrency(item.product.price * item.quantity, config.currencySymbol)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-right">
                  <button
                    onClick={clearCart}
                    className="text-[11px] uppercase tracking-wider text-luxury-500 hover:text-rose-400 transition-colors"
                  >
                    Vaciar bolsa
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Footer Totals & Checkout Trigger */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-luxury-800 bg-luxury-950 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-luxury-400">
                  <span>Subtotal</span>
                  <span className="font-mono">{formatCurrency(cartSubtotal, config.currencySymbol)}</span>
                </div>
                <div className="flex justify-between text-luxury-400">
                  <span>Envío asegurado</span>
                  <span className="font-mono">
                    {shippingCost === 0 ? 'Gratis' : formatCurrency(shippingCost, config.currencySymbol)}
                  </span>
                </div>
                <div className="pt-2 border-t border-luxury-800 flex justify-between text-sm sm:text-base font-medium text-ivory-50">
                  <span className="font-serif uppercase tracking-wider">Total Estimado</span>
                  <span className="font-mono text-gold-400">{formatCurrency(total, config.currencySymbol)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-4 px-6 bg-gold-500 hover:bg-gold-400 text-luxury-950 text-xs font-semibold uppercase tracking-luxury transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-xl"
                >
                  <span>FINALIZAR PEDIDO</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-3 text-xs uppercase tracking-luxury text-luxury-400 hover:text-white transition-colors cursor-pointer text-center"
                >
                  Continuar comprando
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
