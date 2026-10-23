/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Search, MessageCircle, X } from 'lucide-react';
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
  // Dark mode state persisted to localStorage
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

  useEffect(() => {
    try {
      localStorage.setItem('frydays_cart_items', JSON.stringify(cartItems));
    } catch {
      // storage unavailable
    }
  }, [cartItems]);

  const handleSaveConfig = (newConfig: WhatsAppConfig) => {
    setWhatsAppConfig(newConfig);
    try {
      localStorage.setItem('frydays_wa_config', JSON.stringify(newConfig));
    } catch {
      // storage unavailable
    }
    setToastMessage(`WhatsApp updated to ${newConfig.displayPhone}`);
  };

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          !item.extraCheese &&
          !item.extraJalapeno &&
          item.spiceLevel === 'Regular'
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
    setToastMessage(`${product.name} added to bag`);
  };

  const handleAddCustomCartItem = (newItem: CartItem) => {
    setCartItems((prev) => [...prev, newItem]);
    setToastMessage(`${newItem.product.name} added to bag`);
  };

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

  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    setToastMessage('Item removed from bag');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const currentFryPoints = 48 + Math.floor(cartSubtotal / 100);

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

  const dealProducts = PRODUCTS.filter((p) => p.isDeal);

  return (
    <div className="min-h-screen bg-[#F7F5F0] dark:bg-[#11100E] text-[#161412] dark:text-[#F4F1EA] flex flex-col font-sans">
      {/* Top Bar Contract Navigation */}
      <Navbar
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        whatsAppConfig={whatsAppConfig}
        onOpenWhatsAppWidget={() => setIsWhatsAppWidgetOpen(true)}
        onOpenConfigModal={() => setIsConfigModalOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      {/* Hero Section with Prominent Official Logo & Studio Feast */}
      <Hero
        whatsAppConfig={whatsAppConfig}
        onOpenWhatsAppWidget={() => setIsWhatsAppWidgetOpen(true)}
        onAddFeaturedDeal={handleAddToCart}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      {/* Featured Combo Platters Section */}
      <section id="combos" className="py-12 sm:py-16 border-b border-[#161412]/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-semibold text-[#C8392B] dark:text-[#F2B134] mb-1">
                Value Platters · Prepared Fresh to Order
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#161412] dark:text-[#F4F1EA]">
                Signature Combo Feasts
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#57524C] dark:text-[#B5AEA4]">
              Save up to Rs. 350 on house burger, wrap, and wing combinations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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

      {/* Main Kitchen Menu Catalog */}
      <section id="menu" className="py-14 sm:py-20 border-b border-[#161412]/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header & Search Controls */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div>
              <div className="text-xs font-semibold text-[#C8392B] dark:text-[#F2B134] mb-1">
                Full Kitchen Menu · Gulberg III, Lahore
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-4xl text-[#161412] dark:text-[#F4F1EA]">
                Fries, Smash Burgers & Wraps
              </h2>
            </div>

            {/* Search & Spicy Filter Toolbar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-[#57524C] dark:text-[#B5AEA4] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search burgers, wraps, wings..."
                  className="w-full min-h-[44px] text-sm pl-10 pr-9 py-2 rounded-xl border border-[#161412]/15 dark:border-white/15 bg-white dark:bg-[#181614] text-[#161412] dark:text-[#F4F1EA] focus:outline-none focus:border-[#161412] dark:focus:border-[#F2B134]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#57524C] hover:text-[#161412] dark:hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() => setOnlySpicy(!onlySpicy)}
                className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 ${
                  onlySpicy
                    ? 'bg-[#C8392B] text-white border-[#C8392B]'
                    : 'bg-white dark:bg-[#181614] text-[#57524C] dark:text-[#B5AEA4] border-[#161412]/15 dark:border-white/15 hover:text-[#161412] dark:hover:text-white'
                }`}
              >
                {onlySpicy ? 'Showing Spicy Only' : 'Filter: Spicy'}
              </button>
            </div>
          </div>

          {/* Interactive Segmented Category Filter Bar */}
          <div className="mb-8 overflow-x-auto no-scrollbar">
            <div
              role="tablist"
              aria-label="Menu Categories"
              className="inline-flex items-center gap-1 p-1.5 bg-[#161412]/5 dark:bg-white/5 rounded-2xl min-w-max"
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`min-h-[40px] px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    activeCategory === cat
                      ? 'bg-white dark:bg-[#262320] text-[#161412] dark:text-white shadow-sm'
                      : 'text-[#57524C] dark:text-[#B5AEA4] hover:text-[#161412] dark:hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Unboxed Results Count & Direct WhatsApp Assist */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#57524C] dark:text-[#B5AEA4] mb-6">
            <div>
              <span>Showing </span>
              <strong className="font-mono-num text-[#161412] dark:text-white">
                {filteredProducts.length}
              </strong>
              <span> item{filteredProducts.length !== 1 ? 's' : ''}</span>
              {activeCategory !== 'All' && <span> · {activeCategory}</span>}
            </div>

            <button
              type="button"
              onClick={() => setIsWhatsAppWidgetOpen(true)}
              className="font-semibold text-[#161412] dark:text-[#25D366] hover:underline inline-flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>Custom order? Chat on WhatsApp ({whatsAppConfig.displayPhone})</span>
            </button>
          </div>

          {/* 3-Column Product Collection Grid (Desktop) / 2-Column (Tablet) */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
            <div className="bg-white dark:bg-[#181614] rounded-2xl p-10 text-center border border-[#161412]/10 dark:border-white/10 max-w-md mx-auto space-y-3">
              <h3 className="font-display font-bold text-lg text-[#161412] dark:text-[#F4F1EA]">
                No matching menu items
              </h3>
              <p className="text-xs sm:text-sm text-[#57524C] dark:text-[#B5AEA4]">
                Reset your filters to view all smash burgers, wraps, wings, and loaded fries.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                  setOnlySpicy(false);
                }}
                className="min-h-[44px] px-5 rounded-xl bg-[#161412] dark:bg-[#F2B134] text-[#F7F5F0] dark:text-[#161412] text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* FryPoints Loyalty Section */}
      <LoyaltySection currentPoints={currentFryPoints} />

      {/* Kitchen Story & Lahore Branch Info */}
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

      {/* Context-Aware Mobile Sticky Bag Bar */}
      <MobileBottomNav
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWhatsAppWidget={() => setIsWhatsAppWidgetOpen(true)}
        whatsAppConfig={whatsAppConfig}
      />

      {/* Floating WhatsApp Direct Concierge */}
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

      {/* Cart Drawer / Modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        whatsAppConfig={whatsAppConfig}
        onOrderSuccess={(orderId) => {
          setToastMessage(`Order #${orderId} confirmed`);
        }}
      />

      {/* Product Customization Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddCustomCartItem}
        whatsAppConfig={whatsAppConfig}
      />

      {/* WhatsApp Store Number Settings Modal */}
      <WhatsAppConfigModal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        config={whatsAppConfig}
        onSave={handleSaveConfig}
      />

      {/* Action Feedback Toast */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
