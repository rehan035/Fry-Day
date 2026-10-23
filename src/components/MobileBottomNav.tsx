import React from 'react';
import { ShoppingBag, MessageCircle } from 'lucide-react';
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
  onOpenCart
}) => {
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => {
    let unit = item.product.price;
    if (item.extraCheese) unit += 80;
    if (item.extraJalapeno) unit += 50;
    return acc + unit * item.quantity;
  }, 0);

  // Only show the sticky bottom checkout bar when items are in the bag (respects 15% mobile sticky cap)
  if (totalCount === 0) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 p-3 bg-gradient-to-t from-[#F7F5F0] via-[#F7F5F0] to-transparent dark:from-[#11100E] dark:via-[#11100E]">
      <button
        type="button"
        onClick={onOpenCart}
        className="w-full min-h-[48px] px-4 rounded-xl bg-[#161412] dark:bg-[#F2B134] text-[#F7F5F0] dark:text-[#161412] font-bold text-sm flex items-center justify-between shadow-lg active:scale-[0.99] transition-transform"
      >
        <span className="inline-flex items-center gap-2">
          <ShoppingBag className="w-4 h-4" />
          <span>View Order Bag ({totalCount})</span>
        </span>
        <span className="font-mono-num font-bold inline-flex items-center gap-1.5">
          <span>{formatPKR(cartSubtotal)}</span>
          <MessageCircle className="w-4 h-4 text-[#25D366] dark:text-[#161412]" />
        </span>
      </button>
    </div>
  );
};
