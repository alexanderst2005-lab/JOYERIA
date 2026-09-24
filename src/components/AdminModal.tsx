import React, { useState } from 'react';
import {
  X,
  Settings,
  Phone,
  Tag,
  Package,
  Plus,
  Trash2,
  Edit2,
  Check,
  RotateCcw,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import type { Product, StockStatus } from '../types';
import { formatCurrency } from '../utils/formatters';

type AdminTab = 'config' | 'products' | 'categories';

export const AdminModal: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    config,
    updateConfig,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    categories,
    addCategory,
    deleteCategory,
    resetToDefaults,
  } = useStore();

  const [activeTab, setActiveTab] = useState<AdminTab>('config');

  // Config Form State
  const [brandName, setBrandName] = useState(config.brandName);
  const [whatsappNumber, setWhatsappNumber] = useState(config.whatsappNumber);
  const [whatsappDisplayNumber, setWhatsappDisplayNumber] = useState(config.whatsappDisplayNumber);
  const [instagramHandle, setInstagramHandle] = useState(config.instagramHandle);
  const [savedConfigMessage, setSavedConfigMessage] = useState(false);

  // New Category State
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [newCatImage, setNewCatImage] = useState('');

  // Product Editing / Creation State
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [prodForm, setProdForm] = useState<Partial<Product>>({
    name: '',
    category: 'Anillos',
    price: 250000,
    material: 'Oro Amarillo 18K',
    color: 'Dorado',
    dimensions: 'Ancho: 6mm',
    stockStatus: 'Disponible',
    stockQuantity: 10,
    images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85'],
    description: '',
    isFeatured: true,
    isNew: true,
    isBestSeller: false,
    tags: ['joyeria'],
  });

  if (!isAdminOpen) return null;

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig({
      brandName,
      whatsappNumber,
      whatsappDisplayNumber,
      instagramHandle,
    });
    setSavedConfigMessage(true);
    setTimeout(() => setSavedConfigMessage(false), 2500);
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    addCategory({
      name: newCatName.trim(),
      slug: newCatName.toLowerCase().replace(/\s+/g, '-'),
      description: newCatDesc.trim() || 'Colección exclusiva de piezas seleccionadas.',
      image: newCatImage.trim() || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    });
    setNewCatName('');
    setNewCatDesc('');
    setNewCatImage('');
  };

  const handleStartAddProduct = () => {
    setEditingProductId(null);
    setProdForm({
      name: '',
      slug: '',
      category: categories[0]?.name || 'Anillos',
      price: 250000,
      material: 'Oro Amarillo 18K',
      color: 'Dorado',
      dimensions: 'Ancho: 6mm',
      stockStatus: 'Disponible',
      stockQuantity: 10,
      images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85'],
      description: 'Pieza de joyería fina contemporánea con acabados impecables.',
      isFeatured: true,
      isNew: true,
      isBestSeller: false,
      tags: ['joya', 'exclusivo'],
      sizes: ['S', 'M', 'L'],
    });
    setIsEditingProduct(true);
  };

  const handleStartEditProduct = (p: Product) => {
    setEditingProductId(p.id);
    setProdForm({ ...p });
    setIsEditingProduct(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodForm.name) return;

    if (editingProductId) {
      updateProduct(editingProductId, prodForm);
    } else {
      addProduct({
        name: prodForm.name!,
        slug: prodForm.name!.toLowerCase().replace(/\s+/g, '-'),
        price: Number(prodForm.price) || 0,
        originalPrice: prodForm.originalPrice ? Number(prodForm.originalPrice) : undefined,
        category: prodForm.category || 'Anillos',
        material: prodForm.material || 'Oro 18K',
        color: prodForm.color || 'Dorado',
        dimensions: prodForm.dimensions || 'Estándar',
        sizes: prodForm.sizes || ['Única'],
        stockStatus: (prodForm.stockStatus as StockStatus) || 'Disponible',
        stockQuantity: Number(prodForm.stockQuantity) || 1,
        images: prodForm.images && prodForm.images.length > 0 ? prodForm.images : ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80'],
        description: prodForm.description || '',
        isFeatured: prodForm.isFeatured ?? false,
        isNew: prodForm.isNew ?? false,
        isBestSeller: prodForm.isBestSeller ?? false,
        tags: prodForm.tags || ['joyeria'],
      });
    }

    setIsEditingProduct(false);
    setEditingProductId(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-luxury-950/90 backdrop-blur-md flex justify-center items-start sm:p-4 lg:p-6 animate-fade-in text-luxury-100">
      <div className="relative w-full max-w-4xl bg-luxury-950 border border-luxury-800 shadow-2xl my-0 sm:my-8 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-luxury-800 flex items-center justify-between bg-luxury-900/60">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-gold-500/10 border border-gold-500/40 flex items-center justify-center text-gold-400">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] tracking-luxury uppercase text-gold-500">
                Panel de Control
              </div>
              <h3 className="font-serif text-xl sm:text-2xl tracking-wide uppercase text-ivory-50">
                Administración de la Joyería
              </h3>
            </div>
          </div>
          <button
            onClick={() => setIsAdminOpen(false)}
            className="text-luxury-400 hover:text-white p-1 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-luxury-800 bg-luxury-950">
          <button
            onClick={() => {
              setActiveTab('config');
              setIsEditingProduct(false);
            }}
            className={`flex items-center space-x-2 px-6 py-3.5 text-xs uppercase tracking-luxury font-medium border-b-2 transition-all cursor-pointer ${
              activeTab === 'config'
                ? 'border-gold-500 text-gold-300 bg-luxury-900/50'
                : 'border-transparent text-luxury-400 hover:text-luxury-200'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>WhatsApp & Marca</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('products');
              setIsEditingProduct(false);
            }}
            className={`flex items-center space-x-2 px-6 py-3.5 text-xs uppercase tracking-luxury font-medium border-b-2 transition-all cursor-pointer ${
              activeTab === 'products'
                ? 'border-gold-500 text-gold-300 bg-luxury-900/50'
                : 'border-transparent text-luxury-400 hover:text-luxury-200'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Productos ({products.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('categories');
              setIsEditingProduct(false);
            }}
            className={`flex items-center space-x-2 px-6 py-3.5 text-xs uppercase tracking-luxury font-medium border-b-2 transition-all cursor-pointer ${
              activeTab === 'categories'
                ? 'border-gold-500 text-gold-300 bg-luxury-900/50'
                : 'border-transparent text-luxury-400 hover:text-luxury-200'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Categorías ({categories.length})</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto">
          {/* TAB 1: STORE & WHATSAPP CONFIG */}
          {activeTab === 'config' && (
            <div className="space-y-8 max-w-xl">
              <div>
                <h4 className="font-serif text-xl text-ivory-50 uppercase tracking-wide mb-2">
                  Configuración General de la Tienda
                </h4>
                <p className="text-luxury-400 text-xs font-light">
                  Actualiza el número de WhatsApp oficial donde se recibirán todos los pedidos en tiempo real, así como la identidad de la marca.
                </p>
              </div>

              <form onSubmit={handleSaveConfig} className="space-y-5">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-luxury-300 mb-1.5">
                    Nombre de la Marca
                  </label>
                  <input
                    type="text"
                    value={brandName}
                    onChange={e => setBrandName(e.target.value)}
                    className="w-full bg-luxury-900 border border-luxury-700 px-3.5 py-2.5 text-xs text-luxury-100 focus:border-gold-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-luxury-300 mb-1.5">
                    Número de WhatsApp (Sin signos ni espacios para el link directo)
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. 573001234567"
                    value={whatsappNumber}
                    onChange={e => setWhatsappNumber(e.target.value)}
                    className="w-full bg-luxury-900 border border-luxury-700 px-3.5 py-2.5 text-xs text-luxury-100 font-mono focus:border-gold-500 focus:outline-none"
                  />
                  <span className="text-[11px] text-luxury-500 mt-1 block">
                    Formato internacional sin símbolo '+': ej. 57 para Colombia + 10 dígitos (573001234567).
                  </span>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-luxury-300 mb-1.5">
                    Número para Mostrar al Cliente
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. +57 300 123 4567"
                    value={whatsappDisplayNumber}
                    onChange={e => setWhatsappDisplayNumber(e.target.value)}
                    className="w-full bg-luxury-900 border border-luxury-700 px-3.5 py-2.5 text-xs text-luxury-100 focus:border-gold-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-luxury-300 mb-1.5">
                    Usuario de Instagram
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. @aureum.finejewelry"
                    value={instagramHandle}
                    onChange={e => setInstagramHandle(e.target.value)}
                    className="w-full bg-luxury-900 border border-luxury-700 px-3.5 py-2.5 text-xs text-luxury-100 focus:border-gold-500 focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex items-center space-x-4">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gold-500 hover:bg-gold-400 text-luxury-950 text-xs uppercase tracking-luxury font-semibold transition-colors cursor-pointer"
                  >
                    Guardar Configuración
                  </button>
                  {savedConfigMessage && (
                    <span className="text-emerald-400 text-xs flex items-center space-x-1 animate-fade-in">
                      <Check className="w-4 h-4" />
                      <span>¡Guardado con éxito!</span>
                    </span>
                  )}
                </div>
              </form>

              {/* Reset to Defaults */}
              <div className="pt-8 border-t border-luxury-800">
                <h5 className="text-xs uppercase tracking-luxury text-luxury-400 mb-2">
                  Restablecer Catálogo Demo
                </h5>
                <p className="text-[11px] text-luxury-500 mb-3">
                  Si deseas recargar los productos iniciales y configuraciones de muestra de joyería fina:
                </p>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('¿Seguro que deseas reiniciar los datos a la muestra inicial?')) {
                      resetToDefaults();
                    }
                  }}
                  className="px-4 py-2 border border-luxury-700 hover:border-rose-500/50 text-luxury-400 hover:text-rose-400 text-xs uppercase tracking-wider transition-colors inline-flex items-center space-x-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Restablecer Todo a Valores de Fábrica</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS MANAGER */}
          {activeTab === 'products' && (
            <div>
              {isEditingProduct ? (
                /* Edit / Add Product Form */
                <form onSubmit={handleSaveProduct} className="space-y-6 max-w-2xl animate-fade-in">
                  <div className="flex items-center justify-between border-b border-luxury-800 pb-4">
                    <h4 className="font-serif text-xl text-ivory-50 uppercase tracking-wide">
                      {editingProductId ? 'Modificar Joya' : 'Añadir Nueva Pieza al Catálogo'}
                    </h4>
                    <button
                      type="button"
                      onClick={() => setIsEditingProduct(false)}
                      className="text-xs uppercase tracking-wider text-luxury-400 hover:text-white"
                    >
                      Cancelar
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs uppercase tracking-wider text-luxury-300 mb-1">
                        Nombre de la Pieza *
                      </label>
                      <input
                        type="text"
                        required
                        value={prodForm.name || ''}
                        onChange={e => setProdForm({ ...prodForm, name: e.target.value })}
                        className="w-full bg-luxury-900 border border-luxury-700 px-3.5 py-2 text-xs text-luxury-100 focus:border-gold-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-luxury-300 mb-1">
                        Categoría *
                      </label>
                      <select
                        value={prodForm.category}
                        onChange={e => setProdForm({ ...prodForm, category: e.target.value })}
                        className="w-full bg-luxury-900 border border-luxury-700 px-3.5 py-2 text-xs text-luxury-100 focus:border-gold-500 focus:outline-none"
                      >
                        {categories.map(c => (
                          <option key={c.id} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-luxury-300 mb-1">
                        Precio ($ COP) *
                      </label>
                      <input
                        type="number"
                        required
                        value={prodForm.price || ''}
                        onChange={e => setProdForm({ ...prodForm, price: Number(e.target.value) })}
                        className="w-full bg-luxury-900 border border-luxury-700 px-3.5 py-2 text-xs text-luxury-100 focus:border-gold-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-luxury-300 mb-1">
                        Material y Ley *
                      </label>
                      <input
                        type="text"
                        placeholder="Ej. Oro Amarillo 18K"
                        value={prodForm.material || ''}
                        onChange={e => setProdForm({ ...prodForm, material: e.target.value })}
                        className="w-full bg-luxury-900 border border-luxury-700 px-3.5 py-2 text-xs text-luxury-100 focus:border-gold-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-luxury-300 mb-1">
                        Color / Tono *
                      </label>
                      <input
                        type="text"
                        placeholder="Ej. Dorado / Negro"
                        value={prodForm.color || ''}
                        onChange={e => setProdForm({ ...prodForm, color: e.target.value })}
                        className="w-full bg-luxury-900 border border-luxury-700 px-3.5 py-2 text-xs text-luxury-100 focus:border-gold-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-luxury-300 mb-1">
                        Estado de Stock *
                      </label>
                      <select
                        value={prodForm.stockStatus}
                        onChange={e => setProdForm({ ...prodForm, stockStatus: e.target.value as StockStatus })}
                        className="w-full bg-luxury-900 border border-luxury-700 px-3.5 py-2 text-xs text-luxury-100 focus:border-gold-500 focus:outline-none"
                      >
                        <option value="Disponible">Disponible</option>
                        <option value="Últimas unidades">Últimas unidades</option>
                        <option value="Agotado">Agotado</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-luxury-300 mb-1">
                        Cantidad en Inventario
                      </label>
                      <input
                        type="number"
                        value={prodForm.stockQuantity || 0}
                        onChange={e => setProdForm({ ...prodForm, stockQuantity: Number(e.target.value) })}
                        className="w-full bg-luxury-900 border border-luxury-700 px-3.5 py-2 text-xs text-luxury-100 focus:border-gold-500 focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs uppercase tracking-wider text-luxury-300 mb-1">
                        URL de Fotografía Principal
                      </label>
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/..."
                        value={prodForm.images?.[0] || ''}
                        onChange={e => setProdForm({ ...prodForm, images: [e.target.value] })}
                        className="w-full bg-luxury-900 border border-luxury-700 px-3.5 py-2 text-xs text-luxury-100 focus:border-gold-500 focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs uppercase tracking-wider text-luxury-300 mb-1">
                        Descripción de la Joya
                      </label>
                      <textarea
                        rows={3}
                        value={prodForm.description || ''}
                        onChange={e => setProdForm({ ...prodForm, description: e.target.value })}
                        className="w-full bg-luxury-900 border border-luxury-700 px-3.5 py-2 text-xs text-luxury-100 focus:border-gold-500 focus:outline-none"
                      />
                    </div>

                    {/* Curated Collection Toggles */}
                    <div className="sm:col-span-2 pt-2 flex flex-wrap gap-4 text-xs">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={prodForm.isFeatured || false}
                          onChange={e => setProdForm({ ...prodForm, isFeatured: e.target.checked })}
                          className="accent-gold-500"
                        />
                        <span>Destacado en portada</span>
                      </label>

                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={prodForm.isBestSeller || false}
                          onChange={e => setProdForm({ ...prodForm, isBestSeller: e.target.checked })}
                          className="accent-gold-500"
                        />
                        <span>Más Elegido (Best Seller)</span>
                      </label>

                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={prodForm.isNew || false}
                          onChange={e => setProdForm({ ...prodForm, isNew: e.target.checked })}
                          className="accent-gold-500"
                        />
                        <span>Novedad</span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-4 flex space-x-3">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-gold-500 hover:bg-gold-400 text-luxury-950 text-xs uppercase tracking-luxury font-semibold transition-colors cursor-pointer"
                    >
                      {editingProductId ? 'Actualizar Pieza' : 'Guardar en Catálogo'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingProduct(false)}
                      className="px-6 py-3 border border-luxury-700 text-luxury-400 hover:text-white text-xs uppercase tracking-luxury transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              ) : (
                /* Products Table / List */
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="font-serif text-xl text-ivory-50 uppercase tracking-wide">
                      Catálogo de Joyas ({products.length})
                    </h4>
                    <button
                      onClick={handleStartAddProduct}
                      className="px-4 py-2.5 bg-gold-500 hover:bg-gold-400 text-luxury-950 text-xs uppercase tracking-luxury font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Nueva Joya</span>
                    </button>
                  </div>

                  <div className="divide-y divide-luxury-800 border border-luxury-800">
                    {products.map(p => (
                      <div
                        key={p.id}
                        className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-luxury-900/40 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-12 h-12 object-cover bg-luxury-900 border border-luxury-800"
                          />
                          <div>
                            <div className="text-[10px] uppercase font-mono text-gold-500">{p.category}</div>
                            <div className="font-serif text-sm text-ivory-50 font-medium">{p.name}</div>
                            <div className="text-xs text-luxury-400 font-mono">
                              {formatCurrency(p.price, config.currencySymbol)} • Stock: {p.stockQuantity} ({p.stockStatus})
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 self-end sm:self-center">
                          <button
                            onClick={() => handleStartEditProduct(p)}
                            className="p-2 border border-luxury-700 hover:border-gold-500 text-luxury-300 hover:text-gold-400 text-xs transition-colors cursor-pointer"
                            title="Editar pieza"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`¿Eliminar ${p.name}?`)) {
                                deleteProduct(p.id);
                              }
                            }}
                            className="p-2 border border-luxury-700 hover:border-rose-500 text-luxury-300 hover:text-rose-400 text-xs transition-colors cursor-pointer"
                            title="Eliminar pieza"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CATEGORIES MANAGER */}
          {activeTab === 'categories' && (
            <div className="space-y-8">
              {/* Add category form */}
              <form onSubmit={handleAddCategory} className="p-5 bg-luxury-900/40 border border-luxury-800 space-y-4">
                <h4 className="font-serif text-lg text-ivory-50 uppercase tracking-wide">
                  Crear Nueva Categoría
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-luxury-300 mb-1">
                      Nombre
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Dijes Exclusivos"
                      value={newCatName}
                      onChange={e => setNewCatName(e.target.value)}
                      className="w-full bg-luxury-950 border border-luxury-700 px-3 py-2 text-xs text-luxury-100 focus:border-gold-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-luxury-300 mb-1">
                      Descripción Corta
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Diseños con gemas de precisión..."
                      value={newCatDesc}
                      onChange={e => setNewCatDesc(e.target.value)}
                      className="w-full bg-luxury-950 border border-luxury-700 px-3 py-2 text-xs text-luxury-100 focus:border-gold-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-luxury-300 mb-1">
                      URL de Imagen
                    </label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={newCatImage}
                      onChange={e => setNewCatImage(e.target.value)}
                      className="w-full bg-luxury-950 border border-luxury-700 px-3 py-2 text-xs text-luxury-100 focus:border-gold-500 focus:outline-none"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gold-500 hover:bg-gold-400 text-luxury-950 text-xs uppercase tracking-luxury font-semibold transition-colors cursor-pointer"
                >
                  Agregar Categoría
                </button>
              </form>

              {/* Categories list */}
              <div>
                <h4 className="font-serif text-lg text-ivory-50 uppercase tracking-wide mb-4">
                  Categorías Actuales ({categories.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {categories.map(c => (
                    <div
                      key={c.id}
                      className="p-3 bg-luxury-900/30 border border-luxury-800 flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={c.image}
                          alt={c.name}
                          className="w-10 h-10 object-cover bg-luxury-950 border border-luxury-800"
                        />
                        <div>
                          <div className="font-serif text-sm text-ivory-50 font-medium">{c.name}</div>
                          <div className="text-[10px] text-luxury-500 truncate max-w-[200px]">{c.description}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          if (window.confirm(`¿Eliminar la categoría ${c.name}?`)) {
                            deleteCategory(c.id);
                          }
                        }}
                        className="text-luxury-500 hover:text-rose-400 p-1.5"
                        title="Eliminar categoría"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
