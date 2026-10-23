import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Sun, Moon, MessageCircle } from 'lucide-react';
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
    <header className="sticky top-0 z-40 bg-[#F7F5F0]/95 dark:bg-[#11100E]/95 backdrop-blur-md border-b border-[#161412]/10 dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Lockup */}
        <a
          href="#"
          className="flex items-center gap-3 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#C8392B]"
        >
          <img
            src={FRY_DAYS_LOGO}
            alt="Fry Days"
            referrerPolicy="no-referrer"
            className="h-10 sm:h-12 w-auto object-contain"
          />
          <span className="hidden lg:inline font-display font-extrabold text-lg tracking-tight text-[#161412] dark:text-[#F4F1EA]">
            FRY DAYS
          </span>
        </a>

        {/* Zone 2: 4 Clean Single-Line Text Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#57524C] dark:text-[#B5AEA4]"
        >
          <a
            href="#menu"
            className="hover:text-[#161412] dark:hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#C8392B]"
          >
            Full Menu
          </a>
          <a
            href="#combos"
            className="hover:text-[#161412] dark:hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#C8392B]"
          >
            Combo Deals
          </a>
          <a
            href="#rewards"
            className="hover:text-[#161412] dark:hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#C8392B]"
          >
            FryPoints
          </a>
          <a
            href="#kitchen"
            className="hover:text-[#161412] dark:hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#C8392B]"
          >
            Lahore Kitchen
          </a>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label="Open Order Bag"
            className="min-h-[44px] px-4 py-2 rounded-xl bg-[#161412] dark:bg-[#F2B134] text-[#F7F5F0] dark:text-[#161412] font-semibold text-xs sm:text-sm inline-flex items-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="w-4 h-4 shrink-0" />
            <span>Order Bag</span>
            <span className="font-mono-num font-semibold px-1.5 py-0.5 rounded bg-white/15 dark:bg-black/15 text-xs">
              {totalCartCount}
            </span>
          </button>

          {/* Mobile Drawer Trigger (44x44px minimum touch target) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center text-[#161412] dark:text-[#F4F1EA] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F7F5F0] dark:bg-[#181614] border-b border-[#161412]/10 dark:border-white/10 px-4 py-4 space-y-2 shadow-lg">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-[#161412]/10 dark:border-white/10">
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[44px] px-3 rounded-xl flex items-center font-semibold text-sm text-[#161412] dark:text-[#F4F1EA] hover:bg-black/5 dark:hover:bg-white/5"
            >
              Full Menu
            </a>
            <a
              href="#combos"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[44px] px-3 rounded-xl flex items-center font-semibold text-sm text-[#161412] dark:text-[#F4F1EA] hover:bg-black/5 dark:hover:bg-white/5"
            >
              Combo Deals
            </a>
            <a
              href="#rewards"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[44px] px-3 rounded-xl flex items-center font-semibold text-sm text-[#161412] dark:text-[#F4F1EA] hover:bg-black/5 dark:hover:bg-white/5"
            >
              FryPoints Club
            </a>
            <a
              href="#kitchen"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[44px] px-3 rounded-xl flex items-center font-semibold text-sm text-[#161412] dark:text-[#F4F1EA] hover:bg-black/5 dark:hover:bg-white/5"
            >
              Lahore Kitchen
            </a>
          </div>

          <div className="pt-1 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => {
                onToggleDarkMode();
              }}
              className="min-h-[44px] px-3.5 rounded-xl border border-[#161412]/15 dark:border-white/15 text-xs font-semibold text-[#161412] dark:text-[#F4F1EA] inline-flex items-center gap-2"
            >
              {darkMode ? <Sun className="w-4 h-4 text-[#F2B134]" /> : <Moon className="w-4 h-4" />}
              <span>{darkMode ? 'Light Theme' : 'Dark Theme'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWhatsAppWidget();
              }}
              className="flex-1 min-h-[44px] px-4 rounded-xl bg-[#25D366] text-[#11100E] font-bold text-xs inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp {whatsAppConfig.displayPhone}</span>
            </button>
          </div>

          <div className="pt-1 text-right">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConfigModal();
              }}
              className="text-xs text-[#57524C] dark:text-[#B5AEA4] underline py-1"
            >
              Configure Store WhatsApp Number
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
