import React, { useState } from 'react';
import { ShoppingBag, MessageCircle, Menu, X, Clock, Sun, Moon, Flame } from 'lucide-react';
import { CartItem, WhatsAppConfig } from '../types';
import { FRY_DAYS_LOGO } from '../data/menu';

interface NavbarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  whatsAppConfig: WhatsAppConfig;
  onOpenWhatsAppWidget: () => void;
  onOpenConfigModal: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItems,
  onOpenCart,
  whatsAppConfig,
  onOpenWhatsAppWidget,
  onOpenConfigModal,
  darkMode,
  onToggleDarkMode
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-[#f6f1e9]/95 dark:bg-[#12100e]/95 backdrop-blur-md border-b border-[#141210]/10 dark:border-white/10 transition-colors duration-200">
      {/* Top Banner for Live Kitchen & WhatsApp Hotline */}
      <div className="bg-[#141210] dark:bg-[#0a0908] text-[#f6f1e9] text-xs py-1.5 px-3 sm:px-4 font-medium border-b border-white/5">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 truncate">
            <span className="inline-block w-2 h-2 rounded-full bg-[#25D366] animate-pulse shrink-0"></span>
            <span className="truncate text-[11px] sm:text-xs">
              Kitchen Live in Lahore • WhatsApp Orders: <strong className="text-[#25D366]">{whatsAppConfig.displayPhone}</strong>
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs shrink-0">
            <span className="hidden md:flex items-center gap-1 text-white/70">
              <Clock className="w-3.5 h-3.5 text-[#f2b134]" /> 11 AM – 2 AM
            </span>

            {/* Direct WhatsApp Call/Chat link */}
            <a
              href={`https://wa.me/${whatsAppConfig.phoneNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#25D366] hover:underline font-bold text-[11px] sm:text-xs"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>Chat Live</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 h-16 sm:h-18 flex items-center justify-between gap-3">
        {/* Brand with Official Logo */}
        <a href="#" className="flex items-center gap-2 group py-1">
          <img
            src={FRY_DAYS_LOGO}
            alt="FRY DAYS — Fries, Burgers, Wraps"
            className="h-10 sm:h-12 w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
          />
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-[#4a443f] dark:text-[#b8b0a5]">
          <a href="#menu" className="hover:text-[#141210] dark:hover:text-white transition-colors relative py-1">
            Menu
          </a>
          <a href="#deals" className="hover:text-[#141210] dark:hover:text-white flex items-center gap-1 transition-colors relative py-1 text-[#c8392b] dark:text-[#f2b134]">
            <Flame className="w-4 h-4 fill-current" /> Combos
          </a>
          <a href="#rewards" className="hover:text-[#141210] dark:hover:text-white transition-colors relative py-1">
            FryPoints
          </a>
          <a href="#story" className="hover:text-[#141210] dark:hover:text-white transition-colors relative py-1">
            Our Story
          </a>
          <a href="#visit" className="hover:text-[#141210] dark:hover:text-white transition-colors relative py-1">
            Visit & Hours
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[#141210] dark:text-[#f6f1e9] bg-[#141210]/5 dark:bg-white/10 hover:bg-[#141210]/10 dark:hover:bg-white/15 transition-all"
            title={darkMode ? 'Light mode' : 'Dark mode'}
          >
            {darkMode ? (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-[#f2b134]" />
            ) : (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-[#141210]" />
            )}
          </button>

          {/* Quick WhatsApp Action Button */}
          <button
            onClick={onOpenWhatsAppWidget}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold bg-[#25D366]/15 text-[#128C7E] dark:text-[#25D366] border border-[#25D366]/40 hover:bg-[#25D366] hover:text-white transition-all shadow-sm"
            title="Chat directly on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366] group-hover:text-white fill-current" />
            <span>Order on WhatsApp</span>
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            aria-label="Open Cart Bag"
            className="relative inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-[#141210] dark:bg-white text-[#f6f1e9] dark:text-[#141210] font-bold text-xs sm:text-sm hover:bg-black dark:hover:bg-gray-100 transition-transform active:scale-95 shadow-md"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden xs:inline">Bag</span>
            {totalCartCount > 0 && (
              <span className="bg-[#c8392b] text-white text-[11px] font-black min-w-[18px] h-4.5 rounded-full flex items-center justify-center px-1">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#141210] dark:text-white hover:bg-[#141210]/5 dark:hover:bg-white/10 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#f6f1e9] dark:bg-[#1c1916] border-b border-[#141210]/15 dark:border-white/10 px-5 py-4 flex flex-col gap-3 shadow-xl">
          <a
            href="#menu"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-bold py-2 border-b border-[#141210]/10 dark:border-white/10 text-[#141210] dark:text-white"
          >
            Browse Full Menu
          </a>
          <a
            href="#deals"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-bold py-2 border-b border-[#141210]/10 dark:border-white/10 flex items-center gap-2 text-[#c8392b] dark:text-[#f2b134]"
          >
            <Flame className="w-4 h-4 fill-current" /> Hot Combos & Deals
          </a>
          <a
            href="#rewards"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-bold py-2 border-b border-[#141210]/10 dark:border-white/10 text-[#141210] dark:text-white"
          >
            FryPoints Rewards Club
          </a>
          <a
            href="#story"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-bold py-2 border-b border-[#141210]/10 dark:border-white/10 text-[#141210] dark:text-white"
          >
            Our Lahore Kitchen Story
          </a>
          <a
            href="#visit"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-bold py-2 border-b border-[#141210]/10 dark:border-white/10 text-[#141210] dark:text-white"
          >
            Location & Hours (Gulberg III)
          </a>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWhatsAppWidget();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] text-white font-bold text-sm shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              Order on WhatsApp ({whatsAppConfig.displayPhone})
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConfigModal();
              }}
              className="text-xs text-[#4a443f] dark:text-[#b8b0a5] text-center underline pt-1"
            >
              Change WhatsApp Order Number
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
