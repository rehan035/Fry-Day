import React, { useState } from 'react';
import { MessageCircle, X, Send, ShoppingBag, Sparkles, Settings } from 'lucide-react';
import { CartItem, WhatsAppConfig } from '../types';
import { formatPKR, generateQuickInquiryWhatsAppUrl } from '../utils/whatsapp';
import { FRY_DAYS_LOGO } from '../data/menu';

interface WhatsAppFloatingWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
  cartItems: CartItem[];
  whatsAppConfig: WhatsAppConfig;
  onOpenConfigModal: () => void;
  onOpenCartModal: () => void;
}

export const WhatsAppFloatingWidget: React.FC<WhatsAppFloatingWidgetProps> = ({
  isOpen,
  onToggle,
  cartItems,
  whatsAppConfig,
  onOpenConfigModal,
  onOpenCartModal
}) => {
  const [customMsg, setCustomMsg] = useState('');

  const cartTotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleSendCustomMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    const url = generateQuickInquiryWhatsAppUrl(customMsg.trim(), whatsAppConfig.phoneNumber);
    window.open(url, '_blank', 'noopener,noreferrer');
    setCustomMsg('');
  };

  const handleQuickChipClick = (text: string) => {
    const url = generateQuickInquiryWhatsAppUrl(text, whatsAppConfig.phoneNumber);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Floating Trigger Button (hidden when drawer is open) */}
      <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 flex items-center gap-2">
        {!isOpen && (
          <button
            onClick={onToggle}
            className="hidden sm:flex items-center gap-2 bg-[#141210] dark:bg-white text-[#f6f1e9] dark:text-[#141210] text-xs font-bold px-3.5 py-2.5 rounded-full shadow-xl border border-white/10 hover:scale-105 active:scale-95 transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
            <span>WhatsApp: {whatsAppConfig.displayPhone}</span>
          </button>
        )}

        <button
          onClick={onToggle}
          aria-label="Open WhatsApp live chat"
          className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 ring-4 ring-[#25D366]/30"
        >
          {isOpen ? (
            <X className="w-6 h-6 stroke-[2.5]" />
          ) : (
            <>
              <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white" />
              <span className="absolute top-0 right-0 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#2f5d3a] border-2 border-white rounded-full flex items-center justify-center">
                <span className="w-2 h-2 bg-[#25D366] rounded-full animate-ping"></span>
              </span>
            </>
          )}
        </button>
      </div>

      {/* Floating Chat Modal / Drawer */}
      {isOpen && (
        <div className="fixed bottom-20 md:bottom-22 right-2 sm:right-6 z-50 w-[calc(100vw-1rem)] sm:w-96 max-h-[82vh] bg-white dark:bg-[#1c1916] rounded-3xl shadow-2xl border border-[#141210]/15 dark:border-white/15 overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#128C7E] to-[#25D366] text-white p-3.5 sm:p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shadow-inner">
                  <img src={FRY_DAYS_LOGO} alt="Fry Days" className="w-full h-full object-contain" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#25D366] border-2 border-white rounded-full"></span>
              </div>
              <div>
                <h4 className="font-bold text-sm sm:text-base leading-tight">Fry Days Kitchen</h4>
                <p className="text-[11px] text-white/90 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                  Online • {whatsAppConfig.displayPhone}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-white/80">
              <button
                onClick={onOpenConfigModal}
                title="Change WhatsApp Phone Number"
                className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
              >
                <Settings className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={onToggle}
                className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-3.5 sm:p-4 overflow-y-auto space-y-3 sm:space-y-4 bg-[#efe7da]/30 dark:bg-black/30 flex-1 max-h-[380px]">
            {/* Store Greeting Bubble */}
            <div className="bg-white dark:bg-[#141210] p-3 sm:p-3.5 rounded-2xl rounded-tl-sm shadow-sm border border-[#141210]/10 dark:border-white/10 text-xs sm:text-sm text-[#141210] dark:text-white space-y-1.5">
              <p className="font-bold flex items-center gap-1.5 text-[#128C7E] dark:text-[#25D366]">
                <Sparkles className="w-4 h-4 text-[#f2b134]" /> Salam from Fry Days Lahore! 🍟
              </p>
              <p className="text-[#4a443f] dark:text-[#b8b0a5] text-xs">
                Burgers, wraps, and loaded fries delivered hot to your doorstep. How can we help you?
              </p>
              <p className="text-[10px] text-gray-400 text-right">{whatsAppConfig.displayPhone}</p>
            </div>

            {/* Cart Quick Order Card (if items are in bag) */}
            {totalCount > 0 && (
              <div className="bg-[#f6f1e9] dark:bg-white/5 border-2 border-[#25D366]/40 p-3 rounded-2xl shadow-sm space-y-2">
                <div className="flex items-center justify-between text-xs text-[#141210] dark:text-white">
                  <span className="font-bold flex items-center gap-1.5">
                    <ShoppingBag className="w-3.5 h-3.5 text-[#c8392b]" /> {totalCount} item(s) in bag
                  </span>
                  <span className="font-extrabold">{formatPKR(cartTotal)}</span>
                </div>
                <button
                  onClick={onOpenCartModal}
                  className="w-full py-2 px-3 rounded-xl bg-[#25D366] text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#20ba59] transition-all shadow-md active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  Proceed to WhatsApp Checkout →
                </button>
              </div>
            )}

            {/* Quick Inquiry Prompts */}
            <div className="space-y-1.5">
              <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#4a443f] dark:text-[#b8b0a5]">
                Tap for Quick WhatsApp Reply
              </p>
              <div className="flex flex-col gap-1.5">
                <button
                  onClick={() => handleQuickChipClick("Hi! What is the estimated delivery time to my location in Lahore?")}
                  className="text-left text-xs bg-white dark:bg-[#141210] hover:bg-[#f6f1e9] dark:hover:bg-white/10 text-[#141210] dark:text-white font-medium p-2.5 rounded-xl border border-[#141210]/10 dark:border-white/10 transition-all shadow-2xs hover:border-[#25D366]"
                >
                  🛵 What's your delivery time in Lahore?
                </button>
                <button
                  onClick={() => handleQuickChipClick("Hi! What are today's special deals and combos?")}
                  className="text-left text-xs bg-white dark:bg-[#141210] hover:bg-[#f6f1e9] dark:hover:bg-white/10 text-[#141210] dark:text-white font-medium p-2.5 rounded-xl border border-[#141210]/10 dark:border-white/10 transition-all shadow-2xs hover:border-[#25D366]"
                >
                  🔥 Today's hot combo deals & prices
                </button>
                <button
                  onClick={() => handleQuickChipClick("Hi! Can I place a custom order or bulk party order?")}
                  className="text-left text-xs bg-white dark:bg-[#141210] hover:bg-[#f6f1e9] dark:hover:bg-white/10 text-[#141210] dark:text-white font-medium p-2.5 rounded-xl border border-[#141210]/10 dark:border-white/10 transition-all shadow-2xs hover:border-[#25D366]"
                >
                  🎉 Party / Bulk burger & wrap orders
                </button>
              </div>
            </div>
          </div>

          {/* Custom Message Input Form */}
          <form onSubmit={handleSendCustomMessage} className="p-3 bg-white dark:bg-[#141210] border-t border-[#141210]/10 dark:border-white/10">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                placeholder="Type your message or order..."
                className="flex-1 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-[#141210]/15 dark:border-white/10 bg-[#f6f1e9]/50 dark:bg-white/5 text-[#141210] dark:text-white focus:outline-none focus:border-[#25D366] transition-all"
              />
              <button
                type="submit"
                aria-label="Send WhatsApp message"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center hover:bg-[#20ba59] active:scale-95 transition-all shadow-md shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-between text-[10px] text-[#4a443f] dark:text-[#b8b0a5] mt-1.5 px-1">
              <span>Direct WhatsApp: {whatsAppConfig.displayPhone}</span>
              <button
                type="button"
                onClick={onOpenConfigModal}
                className="text-[#128C7E] dark:text-[#25D366] underline"
              >
                Settings
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
