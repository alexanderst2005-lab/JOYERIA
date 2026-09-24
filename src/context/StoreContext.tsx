import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { Product, Category, StoreConfig, CartItem } from '../types';
import { INITIAL_CONFIG, INITIAL_CATEGORIES, INITIAL_PRODUCTS } from '../data/initialData';

interface StoreContextType {
  // Store Config
  config: StoreConfig;
  updateConfig: (newConfig: Partial<StoreConfig>) => void;

  // Catalog Data
  products: Product[];
  categories: Category[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, updated: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  resetToDefaults: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedSize?: string, selectedColor?: string) => boolean;
  updateCartQuantity: (itemId: string, delta: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartSubtotal: number;
  cartCount: number;

  // Favorites / Wishlist
  favorites: string[]; // product IDs
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  isFavoritesOpen: boolean;
  setIsFavoritesOpen: (open: boolean) => void;

  // Recently Viewed
  recentlyViewed: Product[];
  addRecentlyViewed: (product: Product) => void;

  // View Navigation
  currentView: 'home' | 'catalog';
  setCurrentView: (view: 'home' | 'catalog') => void;

  // Modals & Active Views
  activeProduct: Product | null;
  setActiveProduct: (product: Product | null) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;

  // Filters & Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedMaterial: string;
  setSelectedMaterial: (mat: string) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  selectedAvailability: string;
  setSelectedAvailability: (avail: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  resetFilters: () => void;
  activeFilterCount: number;
  filteredProducts: Product[];
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Config state
  const [config, setConfig] = useState<StoreConfig>(() => {
    try {
      const saved = localStorage.getItem('aureum_config');
      return saved ? JSON.parse(saved) : INITIAL_CONFIG;
    } catch {
      return INITIAL_CONFIG;
    }
  });

  // Products state
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('aureum_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Categories state
  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem('aureum_categories');
      return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('aureum_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Favorites state
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aureum_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Recently viewed IDs
  const [recentIds, setRecentIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aureum_recent');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI Drawers & Modals
  const [currentView, setCurrentView] = useState<'home' | 'catalog'>('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500000]);
  const [selectedMaterial, setSelectedMaterial] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');
  const [selectedAvailability, setSelectedAvailability] = useState('all');
  const [sortBy, setSortBy] = useState('destacados');

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('aureum_config', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem('aureum_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('aureum_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('aureum_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('aureum_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('aureum_recent', JSON.stringify(recentIds));
  }, [recentIds]);

  const updateConfig = (newConfig: Partial<StoreConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  };

  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const id = `prod-${Date.now()}`;
    const product: Product = { ...newProd, id };
    setProducts(prev => [product, ...prev]);
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...updated } : p)));
    if (activeProduct && activeProduct.id === id) {
      setActiveProduct(prev => (prev ? { ...prev, ...updated } : null));
    }
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setCart(prev => prev.filter(item => item.product.id !== id));
    setFavorites(prev => prev.filter(favId => favId !== id));
    if (activeProduct && activeProduct.id === id) {
      setActiveProduct(null);
    }
  };

  const addCategory = (newCat: Omit<Category, 'id'>) => {
    const id = newCat.slug || `cat-${Date.now()}`;
    setCategories(prev => [...prev, { ...newCat, id }]);
  };

  const updateCategory = (id: string, updated: Partial<Category>) => {
    setCategories(prev => prev.map(c => (c.id === id ? { ...c, ...updated } : c)));
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  const resetToDefaults = () => {
    setConfig(INITIAL_CONFIG);
    setProducts(INITIAL_PRODUCTS);
    setCategories(INITIAL_CATEGORIES);
    localStorage.removeItem('aureum_config');
    localStorage.removeItem('aureum_products');
    localStorage.removeItem('aureum_categories');
  };

  // Cart Management
  const addToCart = (product: Product, quantity = 1, selectedSize?: string, selectedColor?: string): boolean => {
    if (product.stockStatus === 'Agotado' || product.stockQuantity <= 0) {
      return false;
    }

    const itemId = `${product.id}-${selectedSize || 'default'}-${selectedColor || 'default'}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, product.stockQuantity);
        return prev.map(item => (item.id === itemId ? { ...item, quantity: newQty } : item));
      } else {
        return [
          ...prev,
          {
            id: itemId,
            product,
            quantity: Math.min(quantity, product.stockQuantity),
            selectedSize,
            selectedColor,
          },
        ];
      }
    });

    setIsCartOpen(true);
    return true;
  };

  const updateCartQuantity = (itemId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            const cappedQty = Math.min(newQty, item.product.stockQuantity);
            return { ...item, quantity: cappedQty };
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  // Favorites Management
  const toggleFavorite = (productId: string) => {
    setFavorites(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  // Recently Viewed
  const addRecentlyViewed = (product: Product) => {
    setRecentIds(prev => {
      const filtered = prev.filter(id => id !== product.id);
      return [product.id, ...filtered].slice(0, 8);
    });
  };

  const recentlyViewed = useMemo(() => {
    return recentIds
      .map(id => products.find(p => p.id === id))
      .filter((p): p is Product => p !== undefined);
  }, [recentIds, products]);

  // Filters logic
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setPriceRange([0, 1500000]);
    setSelectedMaterial('all');
    setSelectedColor('all');
    setSelectedAvailability('all');
    setSortBy('destacados');
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (searchQuery.trim()) count++;
    if (selectedCategory !== 'all') count++;
    if (priceRange[0] > 0 || priceRange[1] < 1500000) count++;
    if (selectedMaterial !== 'all') count++;
    if (selectedColor !== 'all') count++;
    if (selectedAvailability !== 'all') count++;
    return count;
  }, [searchQuery, selectedCategory, priceRange, selectedMaterial, selectedColor, selectedAvailability]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.color.toLowerCase().includes(q) ||
          p.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }

    // Category
    if (selectedCategory !== 'all') {
      result = result.filter(
        p => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Price range
    result = result.filter(
      p => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Material
    if (selectedMaterial !== 'all') {
      result = result.filter(p =>
        p.material.toLowerCase().includes(selectedMaterial.toLowerCase())
      );
    }

    // Color
    if (selectedColor !== 'all') {
      result = result.filter(p =>
        p.color.toLowerCase().includes(selectedColor.toLowerCase())
      );
    }

    // Availability
    if (selectedAvailability !== 'all') {
      result = result.filter(p => p.stockStatus === selectedAvailability);
    }

    // Sort
    switch (sortBy) {
      case 'recientes':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'precio-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'precio-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'destacados':
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return result;
  }, [
    products,
    searchQuery,
    selectedCategory,
    priceRange,
    selectedMaterial,
    selectedColor,
    selectedAvailability,
    sortBy,
  ]);

  return (
    <StoreContext.Provider
      value={{
        config,
        updateConfig,
        products,
        categories,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        resetToDefaults,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartSubtotal,
        cartCount,
        favorites,
        toggleFavorite,
        isFavorite,
        isFavoritesOpen,
        setIsFavoritesOpen,
        recentlyViewed,
        addRecentlyViewed,
        currentView,
        setCurrentView,
        activeProduct,
        setActiveProduct,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAdminOpen,
        setIsAdminOpen,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        priceRange,
        setPriceRange,
        selectedMaterial,
        setSelectedMaterial,
        selectedColor,
        setSelectedColor,
        selectedAvailability,
        setSelectedAvailability,
        sortBy,
        setSortBy,
        resetFilters,
        activeFilterCount,
        filteredProducts,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
