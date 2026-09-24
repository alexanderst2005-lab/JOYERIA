import React, { useState } from 'react';
import {
  X,
  Heart,
  ShoppingBag,
  MessageCircle,
  ChevronDown,
  Plus,
  Minus,
  Check,
  Ruler,
  Layers,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatCurrency, generateWhatsAppProductInquiryUrl } from '../utils/formatters';

export const ProductDetailModal: React.FC = () => {
  const {
    activeProduct,
    setActiveProduct,
    addToCart,
    toggleFavorite,
    isFavorite,
    config,
    products,
  } = useStore();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>('descripcion');

  if (!activeProduct) return null;

  const favorite = isFavorite(activeProduct.id);
  const isOutOfStock = activeProduct.stockStatus === 'Agotado' || activeProduct.stockQuantity <= 0;

  // Initialize selected size if not set
  const currentSize = selectedSize || (activeProduct.sizes && activeProduct.sizes.length > 0 ? activeProduct.sizes[0] : '');

  const handleClose = () => {
    setActiveProduct(null);
    setSelectedImageIndex(0);
    setQuantity(1);
    setSelectedSize('');
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    const ok = addToCart(activeProduct, quantity, currentSize, activeProduct.color);
    if (ok) {
      setAddedAnimation(true);
      setTimeout(() => setAddedAnimation(false), 2000);
    }
  };

  const handleWhatsAppConsult = () => {
    const url = generateWhatsAppProductInquiryUrl(
      activeProduct.name,
      activeProduct.price,
      config,
      window.location.href
    );
    window.open(url, '_blank');
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordion(prev => (prev === id ? null : id));
  };

  // Related products ("TAMBIÉN TE PUEDE INTERESAR")
  const relatedProducts = products
    .filter(
      p =>
        p.id !== activeProduct.id &&
        (p.category === activeProduct.category ||
          (activeProduct.relatedProductIds && activeProduct.relatedProductIds.includes(p.id)))
    )
    .slice(0, 3);

  // Bundle / "COMPLETA TU COLECCIÓN - Combina tus piezas"
  const bundleProducts = products
    .filter(
      p =>
        p.id !== activeProduct.id &&
        activeProduct.bundleProductIds &&
        activeProduct.bundleProductIds.includes(p.id)
    )
    .slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-luxury-950/90 backdrop-blur-md flex justify-center items-start sm:p-4 lg:p-6 animate-fade-in">
      <div className="relative w-full max-w-5xl bg-luxury-950 border border-luxury-800 shadow-2xl my-0 sm:my-8 text-luxury-100 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={handleClose}
          aria-label="Cerrar vista de producto"
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-luxury-900/80 hover:bg-luxury-800 text-luxury-300 hover:text-white border border-luxury-700 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left Column: Visual Gallery */}
          <div className="lg:col-span-7 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-luxury-800 bg-luxury-900/30">
            {/* Main Stage Image */}
            <div className="relative aspect-square w-full bg-luxury-900 overflow-hidden border border-luxury-800 group">
              <img
                src={activeProduct.images[selectedImageIndex] || activeProduct.images[0]}
                alt={activeProduct.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Status Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span
                  className={`text-[10px] uppercase tracking-luxury px-3 py-1 font-medium ${
                    isOutOfStock
                      ? 'bg-rose-950/90 text-rose-300 border border-rose-800'
                      : activeProduct.stockStatus === 'Últimas unidades'
                      ? 'bg-amber-950/90 text-amber-300 border border-amber-800'
                      : 'bg-luxury-950/90 text-emerald-300 border border-emerald-800'
                  }`}
                >
                  {isOutOfStock ? 'Agotado temporalmente' : activeProduct.stockStatus}
                </span>
              </div>
            </div>

            {/* Thumbnails Row */}
            {activeProduct.images.length > 1 && (
              <div className="flex items-center space-x-3 mt-4 overflow-x-auto pb-2">
                {activeProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-20 flex-shrink-0 bg-luxury-900 border overflow-hidden transition-all cursor-pointer ${
                      selectedImageIndex === idx
                        ? 'border-gold-500 ring-1 ring-gold-500/60'
                        : 'border-luxury-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Info & Actions */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Category & Favorite */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono tracking-widest uppercase text-gold-500">
                  {activeProduct.category}
                </span>
                <button
                  onClick={() => toggleFavorite(activeProduct.id)}
                  className="text-luxury-400 hover:text-gold-400 p-1 transition-colors cursor-pointer"
                  title="Guardar en favoritos"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorite ? 'fill-gold-500 stroke-gold-500' : 'stroke-[1.5]'
                    }`}
                  />
                </button>
              </div>

              {/* Title */}
              <h2 className="font-serif text-2xl sm:text-3xl text-ivory-50 tracking-wide uppercase font-light leading-snug mb-3">
                {activeProduct.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline space-x-3 mb-6 pb-6 border-b border-luxury-800">
                <span className="font-sans text-2xl sm:text-3xl font-medium text-luxury-50 tracking-tight">
                  {formatCurrency(activeProduct.price, config.currencySymbol)}
                </span>
                {activeProduct.originalPrice && activeProduct.originalPrice > activeProduct.price && (
                  <span className="text-luxury-500 line-through text-sm font-light">
                    {formatCurrency(activeProduct.originalPrice, config.currencySymbol)}
                  </span>
                )}
              </div>

              {/* Quick Specs Overview */}
              <div className="grid grid-cols-2 gap-3 text-xs mb-6 bg-luxury-900/50 p-3.5 border border-luxury-800/80">
                <div>
                  <span className="text-luxury-500 block text-[10px] uppercase tracking-wider">Material:</span>
                  <span className="text-luxury-200 font-medium">{activeProduct.material}</span>
                </div>
                <div>
                  <span className="text-luxury-500 block text-[10px] uppercase tracking-wider">Tono / Acabado:</span>
                  <span className="text-luxury-200 font-medium">{activeProduct.color}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-luxury-500 block text-[10px] uppercase tracking-wider">Dimensiones:</span>
                  <span className="text-luxury-200 font-medium">{activeProduct.dimensions}</span>
                </div>
              </div>

              {/* Size Selector (if applicable) */}
              {activeProduct.sizes && activeProduct.sizes.length > 0 && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs uppercase tracking-luxury text-luxury-300 font-medium">
                      Medida / Talla:
                    </label>
                    <span className="text-[11px] text-gold-400 font-mono flex items-center space-x-1">
                      <Ruler className="w-3 h-3" />
                      <span>{currentSize}</span>
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeProduct.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-2 text-xs border transition-all cursor-pointer ${
                          currentSize === size
                            ? 'border-gold-500 bg-luxury-900 text-gold-300 font-semibold'
                            : 'border-luxury-800 text-luxury-400 hover:border-luxury-600'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              {!isOutOfStock && (
                <div className="mb-6 flex items-center space-x-4">
                  <span className="text-xs uppercase tracking-luxury text-luxury-300 font-medium">
                    Cantidad:
                  </span>
                  <div className="flex items-center border border-luxury-700 bg-luxury-900">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      className="p-2 text-luxury-400 hover:text-white disabled:opacity-30 cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 text-xs font-mono text-luxury-100">{quantity}</span>
                    <button
                      onClick={() => setQuantity(q => Math.min(activeProduct.stockQuantity, q + 1))}
                      disabled={quantity >= activeProduct.stockQuantity}
                      className="p-2 text-luxury-400 hover:text-white disabled:opacity-30 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="text-[11px] text-luxury-500">
                    ({activeProduct.stockQuantity} disponibles)
                  </span>
                </div>
              )}

              {/* Primary Action Buttons */}
              <div className="space-y-3 mb-8">
                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`w-full py-4 px-6 text-xs uppercase tracking-luxury font-semibold flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-xl ${
                    isOutOfStock
                      ? 'bg-luxury-800 text-luxury-500 cursor-not-allowed border border-luxury-700'
                      : addedAnimation
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gold-500 hover:bg-gold-400 text-luxury-950'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>¡Añadido a la Bolsa!</span>
                    </>
                  ) : isOutOfStock ? (
                    <span>Agotado temporalmente</span>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>AGREGAR AL CARRITO</span>
                    </>
                  )}
                </button>

                {/* WhatsApp Direct Inquiry Button */}
                <button
                  onClick={handleWhatsAppConsult}
                  className="w-full py-3.5 px-6 border border-luxury-700 hover:border-gold-500/60 bg-luxury-900/60 hover:bg-luxury-900 text-luxury-200 hover:text-gold-300 text-xs uppercase tracking-luxury font-medium flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>CONSULTAR POR WHATSAPP</span>
                </button>
              </div>

              {/* Accordion Blocks */}
              <div className="border-t border-luxury-800 divide-y divide-luxury-800/80">
                {/* Descripción */}
                <div>
                  <button
                    onClick={() => toggleAccordion('descripcion')}
                    className="w-full py-3.5 flex items-center justify-between text-left text-xs uppercase tracking-luxury text-luxury-300 hover:text-gold-400 cursor-pointer"
                  >
                    <span>Descripción</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        openAccordion === 'descripcion' ? 'rotate-180 text-gold-400' : ''
                      }`}
                    />
                  </button>
                  {openAccordion === 'descripcion' && (
                    <div className="pb-4 text-xs text-luxury-400 font-light leading-relaxed animate-fade-in">
                      {activeProduct.description}
                    </div>
                  )}
                </div>

                {/* Material & Acabados */}
                <div>
                  <button
                    onClick={() => toggleAccordion('material')}
                    className="w-full py-3.5 flex items-center justify-between text-left text-xs uppercase tracking-luxury text-luxury-300 hover:text-gold-400 cursor-pointer"
                  >
                    <span>Material y Calidad</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        openAccordion === 'material' ? 'rotate-180 text-gold-400' : ''
                      }`}
                    />
                  </button>
                  {openAccordion === 'material' && (
                    <div className="pb-4 text-xs text-luxury-400 font-light leading-relaxed animate-fade-in space-y-2">
                      <p>
                        <strong className="text-luxury-200">Composición:</strong> {activeProduct.material}.
                      </p>
                      <p>
                        Diseñada bajo estándares de orfebrería de alta gama con aleaciones hipoalergénicas libres de níquel.
                      </p>
                    </div>
                  )}
                </div>

                {/* Medidas y Tallas */}
                <div>
                  <button
                    onClick={() => toggleAccordion('medidas')}
                    className="w-full py-3.5 flex items-center justify-between text-left text-xs uppercase tracking-luxury text-luxury-300 hover:text-gold-400 cursor-pointer"
                  >
                    <span>Medidas y Dimensiones</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        openAccordion === 'medidas' ? 'rotate-180 text-gold-400' : ''
                      }`}
                    />
                  </button>
                  {openAccordion === 'medidas' && (
                    <div className="pb-4 text-xs text-luxury-400 font-light leading-relaxed animate-fade-in">
                      <p className="mb-2">{activeProduct.dimensions}</p>
                      <p className="text-[11px] text-luxury-500">
                        Si necesitas una medida personalizada o asesoría para determinar tu talla exacta, puedes escribirnos por WhatsApp.
                      </p>
                    </div>
                  )}
                </div>

                {/* Cuidados */}
                <div>
                  <button
                    onClick={() => toggleAccordion('cuidados')}
                    className="w-full py-3.5 flex items-center justify-between text-left text-xs uppercase tracking-luxury text-luxury-300 hover:text-gold-400 cursor-pointer"
                  >
                    <span>Cuidados de la Pieza</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        openAccordion === 'cuidados' ? 'rotate-180 text-gold-400' : ''
                      }`}
                    />
                  </button>
                  {openAccordion === 'cuidados' && (
                    <div className="pb-4 text-xs text-luxury-400 font-light leading-relaxed animate-fade-in">
                      {activeProduct.careGuide ||
                        'Limpiar suavemente con un paño de microfibra seco. Evitar la exposición directa a químicos abrasivos, piscinas tratadas con cloro y perfumes.'}
                    </div>
                  )}
                </div>

                {/* Envíos */}
                <div>
                  <button
                    onClick={() => toggleAccordion('envios')}
                    className="w-full py-3.5 flex items-center justify-between text-left text-xs uppercase tracking-luxury text-luxury-300 hover:text-gold-400 cursor-pointer"
                  >
                    <span>Envíos y Tiempos</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        openAccordion === 'envios' ? 'rotate-180 text-gold-400' : ''
                      }`}
                    />
                  </button>
                  {openAccordion === 'envios' && (
                    <div className="pb-4 text-xs text-luxury-400 font-light leading-relaxed animate-fade-in">
                      {activeProduct.shippingInfo ||
                        'Envíos asegurados a nivel nacional. Despacho en 24-48h hábiles. Entregas en ciudades principales de 2 a 4 días hábiles.'}
                    </div>
                  )}
                </div>

                {/* Cambios y Garantía */}
                <div>
                  <button
                    onClick={() => toggleAccordion('cambios')}
                    className="w-full py-3.5 flex items-center justify-between text-left text-xs uppercase tracking-luxury text-luxury-300 hover:text-gold-400 cursor-pointer"
                  >
                    <span>Cambios y Garantía</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        openAccordion === 'cambios' ? 'rotate-180 text-gold-400' : ''
                      }`}
                    />
                  </button>
                  {openAccordion === 'cambios' && (
                    <div className="pb-4 text-xs text-luxury-400 font-light leading-relaxed animate-fade-in">
                      {activeProduct.warrantyInfo ||
                        'Certificado de autenticidad en cada orden. 15 días para cambios de talla en empaque original y garantía de 12 meses en manufactura.'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section: "COMPLETA TU COLECCIÓN - Combina tus piezas" */}
        {bundleProducts.length > 0 && (
          <div className="p-6 sm:p-8 bg-luxury-900/60 border-t border-luxury-800">
            <div className="flex items-center space-x-2 text-gold-400 text-xs tracking-luxury uppercase mb-3">
              <Layers className="w-4 h-4 text-gold-500" />
              <span>Completa Tu Colección</span>
            </div>
            <h4 className="font-serif text-xl sm:text-2xl text-ivory-50 tracking-wide uppercase mb-6 font-light">
              COMBINA TUS PIEZAS
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {bundleProducts.map(bundleItem => (
                <div
                  key={bundleItem.id}
                  onClick={() => setActiveProduct(bundleItem)}
                  className="flex items-center p-3 bg-luxury-950 border border-luxury-800 hover:border-gold-500/50 transition-colors cursor-pointer"
                >
                  <img
                    src={bundleItem.images[0]}
                    alt={bundleItem.name}
                    className="w-16 h-16 object-cover bg-luxury-900 mr-4"
                  />
                  <div className="flex-1">
                    <span className="text-[10px] font-mono uppercase text-gold-500 block">
                      {bundleItem.category}
                    </span>
                    <h5 className="font-serif text-sm text-ivory-50 hover:text-gold-300 transition-colors">
                      {bundleItem.name}
                    </h5>
                    <span className="text-xs font-mono text-luxury-200">
                      {formatCurrency(bundleItem.price, config.currencySymbol)}
                    </span>
                  </div>
                  <span className="text-xs uppercase tracking-wider text-gold-400 ml-2">
                    Ver →
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section: "TAMBIÉN TE PUEDE INTERESAR" */}
        {relatedProducts.length > 0 && (
          <div className="p-6 sm:p-8 border-t border-luxury-800 bg-luxury-950">
            <div className="text-[10px] tracking-luxury uppercase text-gold-500 mb-1">
              Sugerencias de Joyería
            </div>
            <h4 className="font-serif text-xl sm:text-2xl text-ivory-50 tracking-wide uppercase mb-6 font-light">
              TAMBIÉN TE PUEDE INTERESAR
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {relatedProducts.map(rel => (
                <div
                  key={rel.id}
                  onClick={() => setActiveProduct(rel)}
                  className="group bg-luxury-900/40 border border-luxury-800/80 hover:border-luxury-600 transition-all p-3 cursor-pointer"
                >
                  <div className="aspect-square w-full overflow-hidden bg-luxury-950 mb-3">
                    <img
                      src={rel.images[0]}
                      alt={rel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="text-[10px] uppercase font-mono text-gold-500">
                    {rel.category}
                  </div>
                  <h5 className="font-serif text-sm text-ivory-50 group-hover:text-gold-300 transition-colors truncate">
                    {rel.name}
                  </h5>
                  <div className="text-xs font-mono text-luxury-200 mt-1">
                    {formatCurrency(rel.price, config.currencySymbol)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
