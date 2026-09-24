import React, { useState } from 'react';
import { X, Send, ShieldCheck, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import type { OrderDetails } from '../types';
import { formatCurrency, generateWhatsAppOrderUrl } from '../utils/formatters';

export const WhatsAppCheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    config,
    clearCart,
  } = useStore();

  const [formData, setFormData] = useState<OrderDetails>({
    customerName: '',
    phone: '',
    city: '',
    address: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof OrderDetails, string>>>({});
  const [orderSent, setOrderSent] = useState(false);

  if (!isCheckoutOpen) return null;

  const isFreeShipping = cartSubtotal >= config.freeShippingThreshold;
  const shippingCost = isFreeShipping || cart.length === 0 ? 0 : 15000;
  const total = cartSubtotal + shippingCost;

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof OrderDetails, string>> = {};
    if (!formData.customerName.trim()) newErrors.customerName = 'Por favor ingresa tu nombre completo';
    if (!formData.phone.trim()) newErrors.phone = 'Por favor ingresa tu número de teléfono / WhatsApp';
    if (!formData.city.trim()) newErrors.city = 'Indica la ciudad de entrega';
    if (!formData.address.trim()) newErrors.address = 'Indica la dirección completa de entrega';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Generate WhatsApp url with comprehensive formatted order details
    const waUrl = generateWhatsAppOrderUrl(cart, formData, config, cartSubtotal, shippingCost);

    // Open WhatsApp in new tab/window
    window.open(waUrl, '_blank');

    setOrderSent(true);
  };

  const handleFinish = () => {
    clearCart();
    setIsCheckoutOpen(false);
    setOrderSent(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-luxury-950/90 backdrop-blur-md flex justify-center items-start sm:p-4 lg:p-6 animate-fade-in text-luxury-100">
      <div className="relative w-full max-w-4xl bg-luxury-950 border border-luxury-800 shadow-2xl my-0 sm:my-8 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-luxury-800 flex items-center justify-between bg-luxury-900/50">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-gold-500/10 border border-gold-500/40 rounded-full flex items-center justify-center text-gold-400">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] tracking-luxury uppercase text-gold-500">
                Paso Final
              </div>
              <h3 className="font-serif text-xl sm:text-2xl tracking-wide uppercase text-ivory-50">
                Finalizar Pedido por WhatsApp
              </h3>
            </div>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            aria-label="Cerrar checkout"
            className="text-luxury-400 hover:text-white p-1 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {orderSent ? (
          /* Confirmation Screen after WhatsApp launch */
          <div className="p-8 sm:p-12 text-center max-w-lg mx-auto">
            <div className="w-16 h-16 bg-emerald-950 border border-emerald-500/40 rounded-full flex items-center justify-center text-emerald-400 mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-serif text-2xl text-ivory-50 mb-3 uppercase tracking-wide">
              ¡Pedido Enviado a WhatsApp!
            </h4>
            <p className="text-luxury-300 text-sm font-light leading-relaxed mb-6">
              Se ha generado y enviado el detalle de tu compra a nuestro número oficial <strong>{config.whatsappDisplayNumber}</strong>. Uno de nuestros asesores confirmará la disponibilidad y te facilitará el método de pago elegido.
            </p>
            <div className="p-4 bg-luxury-900 border border-luxury-800 text-left text-xs mb-8 space-y-1">
              <div className="text-luxury-400">Cliente: <span className="text-luxury-100 font-medium">{formData.customerName}</span></div>
              <div className="text-luxury-400">Ciudad: <span className="text-luxury-100 font-medium">{formData.city}</span></div>
              <div className="text-luxury-400">Total: <span className="text-gold-400 font-mono font-medium">{formatCurrency(total, config.currencySymbol)}</span></div>
            </div>
            <button
              onClick={handleFinish}
              className="px-8 py-3.5 bg-gold-500 hover:bg-gold-400 text-luxury-950 text-xs font-semibold uppercase tracking-luxury transition-all cursor-pointer"
            >
              Completar y Regresar a la Tienda
            </button>
          </div>
        ) : (
          /* Form & Order Summary Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Form Column */}
            <div className="lg:col-span-7 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-luxury-800">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="text-xs uppercase tracking-luxury text-gold-400 font-medium mb-2">
                  Datos de Envío y Contacto
                </div>

                {/* Nombre */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-luxury-300 mb-1">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Mateo Gómez"
                    value={formData.customerName}
                    onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full bg-luxury-900 border border-luxury-700 focus:border-gold-500 px-3.5 py-2.5 text-xs text-luxury-100 placeholder-luxury-600 focus:outline-none transition-colors"
                  />
                  {errors.customerName && (
                    <span className="text-rose-400 text-[10px] mt-1 block">{errors.customerName}</span>
                  )}
                </div>

                {/* Teléfono */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-luxury-300 mb-1">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Ej. +57 300 123 4567"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-luxury-900 border border-luxury-700 focus:border-gold-500 px-3.5 py-2.5 text-xs text-luxury-100 placeholder-luxury-600 focus:outline-none transition-colors"
                  />
                  {errors.phone && (
                    <span className="text-rose-400 text-[10px] mt-1 block">{errors.phone}</span>
                  )}
                </div>

                {/* Ciudad */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-luxury-300 mb-1">
                    Ciudad / Municipio *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Medellín, Antioquia"
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-luxury-900 border border-luxury-700 focus:border-gold-500 px-3.5 py-2.5 text-xs text-luxury-100 placeholder-luxury-600 focus:outline-none transition-colors"
                  />
                  {errors.city && (
                    <span className="text-rose-400 text-[10px] mt-1 block">{errors.city}</span>
                  )}
                </div>

                {/* Dirección */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-luxury-300 mb-1">
                    Dirección de Entrega *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Carrera 43A # 1-50, Apto / Oficina 402"
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-luxury-900 border border-luxury-700 focus:border-gold-500 px-3.5 py-2.5 text-xs text-luxury-100 placeholder-luxury-600 focus:outline-none transition-colors"
                  />
                  {errors.address && (
                    <span className="text-rose-400 text-[10px] mt-1 block">{errors.address}</span>
                  )}
                </div>

                {/* Notas */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-luxury-300 mb-1">
                    Notas o Instrucciones Especiales (Opcional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Ej. Empaque para regalo, grabado personalizado, horario específico de entrega..."
                    value={formData.notes}
                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-luxury-900 border border-luxury-700 focus:border-gold-500 px-3.5 py-2.5 text-xs text-luxury-100 placeholder-luxury-600 focus:outline-none transition-colors"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 px-6 bg-gold-500 hover:bg-gold-400 text-luxury-950 text-xs font-semibold uppercase tracking-luxury flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-xl"
                  >
                    <Send className="w-4 h-4" />
                    <span>ENVIAR PEDIDO POR WHATSAPP</span>
                  </button>
                  <p className="text-[11px] text-luxury-500 text-center mt-2.5">
                    Al presionar, se abrirá WhatsApp con el resumen de tu compra para confirmar directamente.
                  </p>
                </div>
              </form>
            </div>

            {/* Order Summary Column */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-luxury-900/30 flex flex-col justify-between">
              <div>
                <div className="text-xs uppercase tracking-luxury text-gold-400 font-medium mb-4">
                  Resumen de tu Orden ({cart.reduce((a, b) => a + b.quantity, 0)} piezas)
                </div>

                {/* Itemized Mini List */}
                <div className="divide-y divide-luxury-800 max-h-64 overflow-y-auto pr-1 mb-6">
                  {cart.map(item => (
                    <div key={item.id} className="py-3 flex items-center space-x-3 text-xs">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover bg-luxury-900 border border-luxury-800"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-serif text-ivory-50 truncate">{item.product.name}</div>
                        <div className="text-luxury-400 text-[11px]">
                          Cant: {item.quantity} {item.selectedSize ? `• Talla: ${item.selectedSize}` : ''}
                        </div>
                      </div>
                      <div className="font-mono text-luxury-200">
                        {formatCurrency(item.product.price * item.quantity, config.currencySymbol)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Calculations */}
                <div className="space-y-2 border-t border-luxury-800 pt-4 text-xs">
                  <div className="flex justify-between text-luxury-400">
                    <span>Subtotal</span>
                    <span className="font-mono">{formatCurrency(cartSubtotal, config.currencySymbol)}</span>
                  </div>
                  <div className="flex justify-between text-luxury-400">
                    <span>Envío nacional</span>
                    <span className="font-mono">
                      {shippingCost === 0 ? 'Gratis (Asegurado)' : formatCurrency(shippingCost, config.currencySymbol)}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-medium text-ivory-50 border-t border-luxury-800 pt-3">
                    <span className="font-serif uppercase tracking-wider">Total a pagar</span>
                    <span className="font-mono text-gold-400">{formatCurrency(total, config.currencySymbol)}</span>
                  </div>
                </div>
              </div>

              {/* Guarantees Badge */}
              <div className="mt-8 pt-6 border-t border-luxury-800 space-y-2 text-[11px] text-luxury-400">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-gold-500" />
                  <span>Atención directa y privada con un orfebre / asesor</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-gold-500" />
                  <span>Pagos seguros tras confirmación de stock</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
