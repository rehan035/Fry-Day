import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, MessageCircle, ShoppingBag, Check } from 'lucide-react';
import { CartItem, Product, WhatsAppConfig } from '../types';
import { formatPKR, sanitizePhoneNumber } from '../utils/whatsapp';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
  whatsAppConfig: WhatsAppConfig;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  whatsAppConfig
}) => {
  const [quantity, setQuantity] = useState(1);
  const [spiceLevel, setSpiceLevel] = useState<'Mild' | 'Regular' | 'Extra Spicy'>('Regular');
  const [extraCheese, setExtraCheese] = useState(false);
  const [extraJalapeno, setExtraJalapeno] = useState(false);
  const [specialNotes, setSpecialNotes] = useState('');

  // Reset form state whenever a new product is opened
  useEffect(() => {
    if (product) {
      setQuantity(1);
      setSpiceLevel('Regular');
      setExtraCheese(false);
      setExtraJalapeno(false);
      setSpecialNotes('');
    }
  }, [product]);

  if (!product) return null;

  let unitPrice = product.price;
  if (extraCheese) unitPrice += 80;
  if (extraJalapeno) unitPrice += 50;

  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    onAddToCart({
      id: Date.now(),
      product,
      quantity,
      spiceLevel,
      extraCheese,
      extraJalapeno,
      notes: specialNotes.trim()
    });
    onClose();
  };

  const handleWhatsAppOrder = () => {
    const cleanPhone = sanitizePhoneNumber(whatsAppConfig.phoneNumber);
    const extras: string[] = [];
    if (extraCheese) extras.push('+Extra Cheddar (+Rs.80)');
    if (extraJalapeno) extras.push('+Pickled Jalapeños (+Rs.50)');
    if (spiceLevel !== 'Regular') extras.push(`Spice: ${spiceLevel}`);

    let text = `Hi Fry Days! I would like to order:\n\n`;
    text += `*${quantity}x ${product.name}*\n`;
    text += `Price: ${formatPKR(unitPrice)} each = *${formatPKR(totalPrice)}*\n`;
    if (extras.length > 0) {
      text += `Modifiers: ${extras.join(', ')}\n`;
    }
    if (specialNotes.trim()) {
      text += `Notes: ${specialNotes.trim()}\n`;
    }
    text += `\nPlease confirm delivery time to my address in Lahore.`;

    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/65 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#F7F5F0] dark:bg-[#181614] w-full max-w-lg rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl border border-[#161412]/10 dark:border-white/10 max-h-[92vh] flex flex-col"
      >
        {/* Mobile Drag Handle */}
        <div className="sm:hidden pt-2.5 pb-1 bg-[#161412]">
          <div className="w-10 h-1.5 bg-white/30 rounded-full mx-auto" />
        </div>

        {/* Product Image Header */}
        <div className="relative aspect-[16/9] overflow-hidden bg-[#161412]">
          <img
            src={product.img}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close customization dialog"
            className="absolute top-3 right-3 min-h-[44px] min-w-[44px] rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          <div>
            <div className="text-xs text-[#57524C] dark:text-[#B5AEA4] mb-1">
              <span>{product.cat}</span>
              {product.calories && (
                <>
                  <span aria-hidden="true"> · </span>
                  <span className="font-mono-num">{product.calories}</span>
                </>
              )}
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <h3
                id="product-modal-title"
                className="font-display font-bold text-xl sm:text-2xl text-[#161412] dark:text-[#F4F1EA]"
              >
                {product.name}
              </h3>
              <span className="font-mono-num font-bold text-lg sm:text-xl text-[#C8392B] dark:text-[#F2B134] shrink-0">
                {formatPKR(unitPrice)}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#57524C] dark:text-[#B5AEA4] mt-1.5 leading-relaxed">
              {product.desc}
            </p>
          </div>

          {/* Spice Level Selector */}
          <div className="pt-4 border-t border-[#161412]/10 dark:border-white/10 space-y-2">
            <label className="text-xs font-semibold text-[#161412] dark:text-[#F4F1EA] block">
              Seasoning & Heat Level
            </label>
            <div className="grid grid-cols-3 gap-2 p-1 bg-[#161412]/5 dark:bg-white/5 rounded-xl">
              {(['Mild', 'Regular', 'Extra Spicy'] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setSpiceLevel(level)}
                  className={`min-h-[40px] px-3 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                    spiceLevel === level
                      ? 'bg-white dark:bg-[#262320] text-[#161412] dark:text-white shadow-sm'
                      : 'text-[#57524C] dark:text-[#B5AEA4] hover:text-[#161412] dark:hover:text-white'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Add-on Modifiers */}
          <div className="pt-4 border-t border-[#161412]/10 dark:border-white/10 space-y-2.5">
            <label className="text-xs font-semibold text-[#161412] dark:text-[#F4F1EA] block">
              Kitchen Extras
            </label>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setExtraCheese(!extraCheese)}
                className="w-full min-h-[44px] flex items-center justify-between py-2 px-3 rounded-xl bg-white dark:bg-[#221F1C] text-xs sm:text-sm font-medium text-[#161412] dark:text-[#F4F1EA] transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <span
                    className={`w-4 h-4 rounded flex items-center justify-center border ${
                      extraCheese
                        ? 'bg-[#F2B134] border-[#E09E22]'
                        : 'border-[#57524C]/40'
                    }`}
                  >
                    {extraCheese && <Check className="w-3 h-3 text-[#161412] stroke-[3]" />}
                  </span>
                  <span>Extra Molten Cheddar Sauce</span>
                </span>
                <span className="font-mono-num font-semibold text-xs">+Rs. 80</span>
              </button>

              <button
                type="button"
                onClick={() => setExtraJalapeno(!extraJalapeno)}
                className="w-full min-h-[44px] flex items-center justify-between py-2 px-3 rounded-xl bg-white dark:bg-[#221F1C] text-xs sm:text-sm font-medium text-[#161412] dark:text-[#F4F1EA] transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <span
                    className={`w-4 h-4 rounded flex items-center justify-center border ${
                      extraJalapeno
                        ? 'bg-[#F2B134] border-[#E09E22]'
                        : 'border-[#57524C]/40'
                    }`}
                  >
                    {extraJalapeno && <Check className="w-3 h-3 text-[#161412] stroke-[3]" />}
                  </span>
                  <span>Charred Pickled Jalapeños</span>
                </span>
                <span className="font-mono-num font-semibold text-xs">+Rs. 50</span>
              </button>
            </div>
          </div>

          {/* Kitchen Note & Quantity Stepper */}
          <div className="pt-4 border-t border-[#161412]/10 dark:border-white/10 space-y-4">
            <div>
              <label
                htmlFor="kitchen-note"
                className="text-xs font-semibold text-[#161412] dark:text-[#F4F1EA] block mb-1.5"
              >
                Preparation Note (Optional)
              </label>
              <input
                id="kitchen-note"
                type="text"
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                placeholder="No onions, sauce on the side, well done..."
                className="w-full text-sm px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#221F1C] text-[#161412] dark:text-[#F4F1EA] border border-[#161412]/15 dark:border-white/15 focus:outline-none focus:border-[#161412] dark:focus:border-[#F2B134]"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#161412] dark:text-[#F4F1EA]">
                Quantity
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                  className="min-h-[44px] min-w-[44px] rounded-xl bg-white dark:bg-[#221F1C] border border-[#161412]/15 dark:border-white/15 flex items-center justify-center hover:bg-[#161412] hover:text-white transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-mono-num font-bold text-base min-w-[24px] text-center text-[#161412] dark:text-[#F4F1EA]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                  className="min-h-[44px] min-w-[44px] rounded-xl bg-white dark:bg-[#221F1C] border border-[#161412]/15 dark:border-white/15 flex items-center justify-center hover:bg-[#161412] hover:text-white transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Bottom Action Bar */}
        <div className="p-4 bg-white dark:bg-[#141210] border-t border-[#161412]/10 dark:border-white/10 flex flex-col sm:flex-row gap-2.5">
          <button
            type="button"
            onClick={handleAdd}
            className="flex-1 min-h-[48px] px-4 rounded-xl bg-[#161412] dark:bg-[#F2B134] text-[#F7F5F0] dark:text-[#161412] font-bold text-sm inline-flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.99] transition-all whitespace-nowrap"
          >
            <ShoppingBag className="w-4 h-4 shrink-0" />
            <span>Add to Bag · {formatPKR(totalPrice)}</span>
          </button>

          <button
            type="button"
            onClick={handleWhatsAppOrder}
            className="min-h-[48px] px-5 rounded-xl bg-[#25D366] text-[#11100E] font-bold text-sm inline-flex items-center justify-center gap-2 hover:bg-[#20BD5A] active:scale-[0.99] transition-all whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span>Order via WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
