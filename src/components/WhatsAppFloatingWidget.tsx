import React, { useState } from 'react';
import { MessageCircle, X, Send, ShoppingBag, Settings } from 'lucide-react';
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
      {/* Floating WhatsApp Trigger (Desktop & Mobile when drawer is closed) */}
      <div className="fixed bottom-5 right-4 sm:right-6 z-40">
        <button
          type="button"
          onClick={onToggle}
          aria-label={isOpen ? 'Close WhatsApp support drawer' : 'Open WhatsApp support drawer'}
          className="min-h-[48px] px-4 py-2.5 rounded-full bg-[#25D366] text-[#11100E] font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg hover:bg-[#20BD5A] active:scale-95 transition-all whitespace-nowrap"
        >
          {isOpen ? (
            <>
              <X className="w-4 h-4 stroke-[2.5]" />
              <span>Close Chat</span>
            </>
          ) : (
            <>
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp Order</span>
            </>
          )}
        </button>
      </div>

      {/* WhatsApp Direct Drawer */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="WhatsApp Direct Kitchen Desk"
          className="fixed bottom-20 right-3 sm:right-6 z-50 w-[calc(100vw-1.5rem)] sm:w-96 max-h-[80vh] bg-[#F7F5F0] dark:bg-[#181614] rounded-2xl shadow-2xl border border-[#161412]/15 dark:border-white/15 overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="bg-[#161412] text-white px-4 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={FRY_DAYS_LOGO}
                alt="Fry Days"
                referrerPolicy="no-referrer"
                className="h-9 w-auto object-contain"
              />
              <div>
                <h4 className="font-display font-bold text-sm text-white leading-tight">
                  Fry Days Kitchen Desk
                </h4>
                <p className="font-mono-num text-[11px] text-[#25D366]">
                  {whatsAppConfig.displayPhone}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={onOpenConfigModal}
                aria-label="Configure WhatsApp phone number"
                className="min-h-[40px] min-w-[40px] rounded-lg flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Settings className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onToggle}
                aria-label="Close drawer"
                className="min-h-[40px] min-w-[40px] rounded-lg flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Drawer Body */}
          <div className="p-4 overflow-y-auto space-y-4 flex-1">
            <p className="text-xs text-[#57524C] dark:text-[#B5AEA4] leading-relaxed">
              Message our Gulberg III kitchen directly on WhatsApp for custom burger orders, live delivery ETA, or late-night group platters.
            </p>

            {/* Active Cart Shortcut */}
            {totalCount > 0 && (
              <div className="pt-3 border-t border-[#161412]/10 dark:border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs text-[#161412] dark:text-white">
                  <span className="font-semibold flex items-center gap-1.5">
                    <ShoppingBag className="w-3.5 h-3.5 text-[#C8392B]" />
                    <span>{totalCount} item(s) ready in bag</span>
                  </span>
                  <span className="font-mono-num font-bold">{formatPKR(cartTotal)}</span>
                </div>
                <button
                  type="button"
                  onClick={onOpenCartModal}
                  className="w-full min-h-[44px] px-3 rounded-xl bg-[#25D366] text-[#11100E] font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#20BD5A] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Checkout Bag via WhatsApp</span>
                </button>
              </div>
            )}

            {/* Quick Pre-Filled Questions */}
            <div className="pt-3 border-t border-[#161412]/10 dark:border-white/10 space-y-2">
              <span className="block text-xs font-semibold text-[#161412] dark:text-[#F4F1EA]">
                Quick Kitchen Questions
              </span>
              <div className="flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={() => handleQuickChipClick('Hi Fry Days! What is the current delivery time to my area in Lahore?')}
                  className="min-h-[42px] text-left text-xs bg-white dark:bg-[#221F1C] hover:border-[#25D366] text-[#161412] dark:text-[#F4F1EA] font-medium px-3 py-2 rounded-xl border border-[#161412]/10 dark:border-white/10 transition-colors"
                >
                  Current delivery time in Lahore?
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickChipClick('Hi Fry Days! Please share today’s combo deals and family platters.')}
                  className="min-h-[42px] text-left text-xs bg-white dark:bg-[#221F1C] hover:border-[#25D366] text-[#161412] dark:text-[#F4F1EA] font-medium px-3 py-2 rounded-xl border border-[#161412]/10 dark:border-white/10 transition-colors"
                >
                  Today’s combo deals & platters
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickChipClick('Hi Fry Days! Please share your Gulberg III dine-in location pin.')}
                  className="min-h-[42px] text-left text-xs bg-white dark:bg-[#221F1C] hover:border-[#25D366] text-[#161412] dark:text-[#F4F1EA] font-medium px-3 py-2 rounded-xl border border-[#161412]/10 dark:border-white/10 transition-colors"
                >
                  Gulberg III dine-in & pickup pin
                </button>
              </div>
            </div>
          </div>

          {/* Direct Message Composer */}
          <form
            onSubmit={handleSendCustomMessage}
            className="p-3 bg-white dark:bg-[#141210] border-t border-[#161412]/10 dark:border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              placeholder="Write a message to Fry Days..."
              className="flex-1 text-sm px-3.5 py-2.5 rounded-xl border border-[#161412]/15 dark:border-white/15 bg-[#F7F5F0] dark:bg-[#221F1C] text-[#161412] dark:text-white focus:outline-none focus:border-[#25D366]"
            />
            <button
              type="submit"
              aria-label="Send message to WhatsApp"
              className="min-h-[44px] min-w-[44px] rounded-xl bg-[#25D366] text-[#11100E] flex items-center justify-center hover:bg-[#20BD5A] transition-colors shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
