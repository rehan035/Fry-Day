/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Search, Flame, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { CATEGORIES, PRODUCTS, DEFAULT_WHATSAPP_CONFIG } from './data/menu';
import { CartItem, Product, WhatsAppConfig } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartModal } from './components/CartModal';
import { WhatsAppFloatingWidget } from './components/WhatsAppFloatingWidget';
import { LoyaltySection } from './components/LoyaltySection';
import { StoryAndVisit } from './components/StoryAndVisit';
import { WhatsAppConfigModal } from './components/WhatsAppConfigModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

export default function App() {
  // Dark mode state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('frydays_dark_mode');
      if (saved !== null) return saved === 'true';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('frydays_dark_mode', String(darkMode));
    } catch {
      // storage unavailable
    }
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Category & Filter state
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlySpicy, setOnlySpicy] = useState(false);

  // Cart state persisted to localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('frydays_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Store WhatsApp config (defaulted to +92 326 1180202)
  const [whatsAppConfig, setWhatsAppConfig] = useState<WhatsAppConfig>(() => {
    try {
      const saved = localStorage.getItem('frydays_wa_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure new phone +92 326 1180202 is used if old default was present
        if (parsed.phoneNumber === '923000000000') {
          return DEFAULT_WHATSAPP_CONFIG;
        }
        return parsed;
      }
      return DEFAULT_WHATSAPP_CONFIG;
    } catch {
      return DEFAULT_WHATSAPP_CONFIG;
    }
  });

  // Modals & Widgets state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWhatsAppWidgetOpen, setIsWhatsAppWidgetOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('frydays_cart_items', JSON.stringify(cartItems));
    } catch {
      // storage unavailable
    }
  }, [cartItems]);

  // Sync WhatsApp config to localStorage
  const handleSaveConfig = (newConfig: WhatsAppConfig) => {
    setWhatsAppConfig(newConfig);
    try {
      localStorage.setItem('frydays_wa_config', JSON.stringify(newConfig));
    } catch {
      // storage unavailable
    }
    setToastMessage(`WhatsApp updated to ${newConfig.displayPhone}`);
  };

  // Add product to cart directly (from card)
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && !item.extraCheese && !item.extraJalapeno && item.spiceLevel === 'Regular'
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + 1
        };
        return next;
      }
      return [
        ...prev,
        {
          id: Date.now(),
          product,
          quantity: 1,
          spiceLevel: 'Regular'
        }
      ];
    });
    setToastMessage(`${product.name} added to bag!`);
  };

  // Add customized item from ProductModal
  const handleAddCustomCartItem = (newItem: CartItem) => {
    setCartItems((prev) => [...prev, newItem]);
    setToastMessage(`${newItem.product.name} customized and added to bag!`);
  };

  // Update item quantity in cart
  const handleUpdateQuantity = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  // Remove specific item from cart
  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    setToastMessage('Item removed from bag');
  };

  // Clear entire cart
  const handleClearCart = () => {
    setCartItems([]);
  };

  // Calculate accumulated points (from cart & demo base)
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const currentFryPoints = 48 + Math.floor(cartSubtotal / 100);

  // Filtered products list
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory =
      activeCategory === 'All'
        ? true
        : activeCategory === 'Deals'
        ? product.isDeal || product.cat === 'Deals'
        : product.cat === activeCategory;

    const matchesSearch =
      !searchQuery.trim() ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.desc.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSpicy = !onlySpicy || product.spicy;

    return matchesCategory && matchesSearch && matchesSpicy;
  });

  // Separate combo deals for the Deals spotlight
  const dealProducts = PRODUCTS.filter((p) => p.isDeal);

  return (
    <div className="min-h-screen bg-[#f6f1e9] dark:bg-[#12100e] text-[#141210] dark:text-[#f6f1e9] flex flex-col font-sans transition-colors duration-200">
      {/* Top Navigation */}
      <Navbar
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        whatsAppConfig={whatsAppConfig}
        onOpenWhatsAppWidget={() => setIsWhatsAppWidgetOpen(true)}
        onOpenConfigModal={() => setIsConfigModalOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      {/* Hero Section */}
      <Hero
        whatsAppConfig={whatsAppConfig}
        onOpenWhatsAppWidget={() => setIsWhatsAppWidgetOpen(true)}
      />

      {/* Featured Deals Spotlight */}
      <section id="deals" className="py-10 sm:py-16 bg-[#efe7da]/50 dark:bg-[#1a1714] border-b border-[#141210]/10 dark:border-white/10 transition-colors">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8">
            <div>
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#c8392b] dark:text-[#f2b134] bg-[#c8392b]/10 dark:bg-[#f2b134]/10 px-3 py-1 rounded-full">
                🔥 Hot Feasts & Combos
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-[#141210] dark:text-white mt-2">
                Fry Days Mega Deals
              </h2>
              <p className="text-xs sm:text-sm text-[#4a443f] dark:text-[#b8b0a5] mt-1">
                Value-packed deals designed for Lahore food lovers. Save up to Rs. 350 on every combo.
              </p>
            </div>
            <button
              onClick={() => {
                setActiveCategory('Deals');
                const menuEl = document.getElementById('menu');
                menuEl?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#c8392b] dark:text-[#f2b134] hover:underline self-start sm:self-auto"
            >
              <span>View all deals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {dealProducts.map((deal) => (
              <ProductCard
                key={deal.id}
                product={deal}
                onAddToCart={handleAddToCart}
                onSelectProduct={(p) => setSelectedProduct(p)}
                whatsAppConfig={whatsAppConfig}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-12 sm:py-20 border-b border-[#141210]/10 dark:border-white/10">
        <div className="max-w-6xl mx-auto px-4">
          {/* Menu Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-6 sm:mb-8">
            <div>
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#c8392b] dark:text-[#f2b134] bg-[#c8392b]/10 dark:bg-[#f2b134]/10 px-3 py-1 rounded-full">
                Our Kitchen Menu
              </span>
              <h2 className="font-display font-black text-2xl sm:text-4xl text-[#141210] dark:text-white mt-2">
                Fries, Burgers & Wraps
              </h2>
              <p className="text-xs sm:text-sm text-[#4a443f] dark:text-[#b8b0a5] mt-1">
                Everything cooked to order. Tap <strong>+</strong> to add to bag, or tap <strong>WhatsApp</strong> for 1-click dispatch.
              </p>
            </div>

            {/* Search Input & Spicy Toggle */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search burgers, wraps, fries..."
                  className="w-full sm:w-64 text-sm pl-9 pr-8 py-2 sm:py-2.5 rounded-full border border-[#141210]/15 dark:border-white/10 bg-white dark:bg-[#1c1916] text-[#141210] dark:text-white focus:outline-none focus:border-[#141210] dark:focus:border-[#f2b134] shadow-2xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-black dark:hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() => setOnlySpicy(!onlySpicy)}
                className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2 sm:py-2.5 rounded-full text-xs font-bold border transition-all ${
                  onlySpicy
                    ? 'bg-[#c8392b] text-white border-[#c8392b]'
                    : 'bg-white dark:bg-[#1c1916] text-[#4a443f] dark:text-[#b8b0a5] border-[#141210]/15 dark:border-white/10 hover:border-[#141210]'
                }`}
              >
                <Flame className={`w-3.5 h-3.5 ${onlySpicy ? 'text-white' : 'text-[#c8392b]'}`} />
                <span>Spicy Only</span>
              </button>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="relative mb-6 sm:mb-8 pb-1">
            <div className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-[#141210] dark:bg-white text-[#f6f1e9] dark:text-[#141210] shadow-md scale-105'
                      : 'bg-white dark:bg-[#1c1916] text-[#141210] dark:text-white border border-[#141210]/15 dark:border-white/10 hover:border-[#141210]'
                  }`}
                >
                  {cat === 'Deals' && '🔥 '}
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count Banner */}
          <div className="flex items-center justify-between text-xs text-[#4a443f] dark:text-[#b8b0a5] mb-5 px-1">
            <span>
              Showing <strong>{filteredProducts.length}</strong> item{filteredProducts.length !== 1 ? 's' : ''}
              {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
            </span>
            <button
              onClick={() => setIsWhatsAppWidgetOpen(true)}
              className="text-[#128C7E] dark:text-[#25D366] font-semibold hover:underline flex items-center gap-1"
            >
              <MessageCircle className="w-3.5 h-3.5" /> Direct WhatsApp ({whatsAppConfig.displayPhone})
            </button>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onSelectProduct={(p) => setSelectedProduct(p)}
                  whatsAppConfig={whatsAppConfig}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-[#1c1916] rounded-3xl p-8 sm:p-12 text-center border border-[#141210]/10 dark:border-white/10 max-w-md mx-auto space-y-3">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#f6f1e9] dark:bg-white/10 flex items-center justify-center mx-auto text-2xl sm:text-3xl">
                🔍
              </div>
              <h3 className="font-display font-black text-xl text-[#141210] dark:text-white">No items found</h3>
              <p className="text-xs text-[#4a443f] dark:text-[#b8b0a5]">
                Try changing your search keyword or switching categories.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                  setOnlySpicy(false);
                }}
                className="mt-2 py-2 px-5 rounded-full bg-[#141210] dark:bg-white text-[#f6f1e9] dark:text-[#141210] text-xs font-bold hover:bg-black transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Loyalty FryPoints Section */}
      <LoyaltySection currentPoints={currentFryPoints} />

      {/* Story & Visit Lahore Section */}
      <StoryAndVisit
        whatsAppConfig={whatsAppConfig}
        onOpenWhatsAppWidget={() => setIsWhatsAppWidgetOpen(true)}
      />

      {/* Footer */}
      <Footer
        whatsAppConfig={whatsAppConfig}
        onOpenWhatsAppWidget={() => setIsWhatsAppWidgetOpen(true)}
        onOpenConfigModal={() => setIsConfigModalOpen(true)}
      />

      {/* Mobile Sticky Bottom Navigation (App-like thumb experience) */}
      <MobileBottomNav
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWhatsAppWidget={() => setIsWhatsAppWidgetOpen(true)}
        whatsAppConfig={whatsAppConfig}
      />

      {/* Floating WhatsApp Live Chat & Order Concierge */}
      <WhatsAppFloatingWidget
        isOpen={isWhatsAppWidgetOpen}
        onToggle={() => setIsWhatsAppWidgetOpen(!isWhatsAppWidgetOpen)}
        cartItems={cartItems}
        whatsAppConfig={whatsAppConfig}
        onOpenConfigModal={() => setIsConfigModalOpen(true)}
        onOpenCartModal={() => {
          setIsWhatsAppWidgetOpen(false);
          setIsCartOpen(true);
        }}
      />

      {/* Cart Modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        whatsAppConfig={whatsAppConfig}
        onOrderSuccess={(orderId) => {
          setToastMessage(`Order #${orderId} submitted! Check your WhatsApp.`);
        }}
      />

      {/* Product Customization Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddCustomCartItem}
        whatsAppConfig={whatsAppConfig}
      />

      {/* WhatsApp Configuration Modal */}
      <WhatsAppConfigModal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        config={whatsAppConfig}
        onSave={handleSaveConfig}
      />

      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
