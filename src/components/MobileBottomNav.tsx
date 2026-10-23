import React from 'react';
import { UtensilsCrossed, Flame, MessageCircle, ShoppingBag } from 'lucide-react';
import { CartItem, WhatsAppConfig } from '../types';
import { formatPKR } from '../utils/whatsapp';

interface MobileBottomNavProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onOpenWhatsAppWidget: () => void;
  whatsAppConfig: WhatsAppConfig;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  cartItems,
  onOpenCart,
  onOpenWhatsAppWidget
}) => {
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#f6f1e9]/95 dark:bg-[#141210]/95 backdrop-blur-lg border-t border-[#141210]/10 dark:border-white/10 px-3 py-2 flex items-center justify-around shadow-2xl safe-area-pb">
      {/* Menu link */}
      <a
        href="#menu"
        className="flex flex-col items-center gap-0.5 text-[#4a443f] dark:text-[#b8b0a5] hover:text-[#141210] dark:hover:text-white py-1 px-2.5 active:scale-95 transition-transform"
      >
        <UtensilsCrossed className="w-5 h-5 text-[#141210] dark:text-white" />
        <span className="text-[10px] font-bold">Menu</span>
      </a>

      {/* Deals link */}
      <a
        href="#deals"
        className="flex flex-col items-center gap-0.5 text-[#c8392b] dark:text-[#f2b134] py-1 px-2.5 active:scale-95 transition-transform"
      >
        <Flame className="w-5 h-5 fill-current" />
        <span className="text-[10px] font-bold">Combos</span>
      </a>

      {/* WhatsApp Chat button */}
      <button
        onClick={onOpenWhatsAppWidget}
        className="flex flex-col items-center gap-0.5 text-[#128C7E] dark:text-[#25D366] py-1 px-2.5 active:scale-95 transition-transform relative"
      >
        <div className="w-7 h-7 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md">
          <MessageCircle className="w-4 h-4 fill-white" />
        </div>
        <span className="text-[10px] font-bold text-[#128C7E] dark:text-[#25D366]">WhatsApp</span>
      </button>

      {/* Cart button */}
      <button
        onClick={onOpenCart}
        className="flex flex-col items-center gap-0.5 text-[#141210] dark:text-white py-1 px-2.5 active:scale-95 transition-transform relative"
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5 text-[#141210] dark:text-white" />
          {totalCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-[#c8392b] text-white text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center">
              {totalCount}
            </span>
          )}
        </div>
        <span className="text-[10px] font-bold">
          {totalCount > 0 ? formatPKR(cartSubtotal) : 'Bag'}
        </span>
      </button>
    </div>
  );
};
