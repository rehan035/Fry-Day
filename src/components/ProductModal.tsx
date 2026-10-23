import React, { useState } from 'react';
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
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [spiceLevel, setSpiceLevel] = useState<'Mild' | 'Regular' | 'Extra Spicy'>('Regular');
  const [extraCheese, setExtraCheese] = useState(false);
  const [extraJalapeno, setExtraJalapeno] = useState(false);
  const [specialNotes, setSpecialNotes] = useState('');

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

    let text = `Hi Fry Days! 👋 I want to order this directly:\n\n`;
    text += `🍔 *${quantity}x ${product.name}*\n`;
    text += `💵 *Price:* ${formatPKR(unitPrice)} each = *${formatPKR(totalPrice)}*\n`;
    if (extras.length > 0) {
      text += `✨ *Modifiers:* ${extras.join(', ')}\n`;
    }
    if (specialNotes.trim()) {
      text += `📝 *Notes:* ${specialNotes.trim()}\n`;
    }
    text += `\nPlease confirm if this can be delivered to my address in Lahore. Thank you!`;

    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#f6f1e9] dark:bg-[#1c1916] w-full max-w-lg rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl border border-[#141210]/15 dark:border-white/10 max-h-[92vh] sm:max-h-[90vh] flex flex-col"
      >
        {/* Header with image */}
        <div className="relative aspect-[16/9] overflow-hidden bg-[#141210]">
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          {product.tag && (
            <span className="absolute top-3.5 left-3.5 bg-[#c8392b] text-white text-[11px] sm:text-xs font-black uppercase tracking-wider px-3 py-1 rounded-md shadow-sm">
              {product.tag}
            </span>
          )}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-5 flex-1">
          <div>
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-display font-black text-xl sm:text-2xl text-[#141210] dark:text-white">
                {product.name}
              </h3>
              <span className="font-display font-black text-xl sm:text-2xl text-[#c8392b] dark:text-[#f2b134]">
                {formatPKR(unitPrice)}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#4a443f] dark:text-[#b8b0a5] mt-1 leading-relaxed">
              {product.desc}
            </p>
          </div>

          {/* Spice Level Selection */}
          <div className="space-y-1.5">
            <label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#141210] dark:text-white block">
              Select Spice Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Mild', 'Regular', 'Extra Spicy'] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setSpiceLevel(level)}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all ${
                    spiceLevel === level
                      ? 'bg-[#141210] dark:bg-white text-[#f6f1e9] dark:text-[#141210] border-[#141210] dark:border-white shadow-sm'
                      : 'bg-white dark:bg-white/5 text-[#4a443f] dark:text-[#b8b0a5] border-[#141210]/15 dark:border-white/10 hover:border-[#141210]'
                  }`}
                >
                  {level === 'Extra Spicy' ? '🔥 Extra Spicy' : level}
                </button>
              ))}
            </div>
          </div>

          {/* Add-ons */}
          <div className="space-y-1.5">
            <label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#141210] dark:text-white block">
              Optional Add-ons & Extra Flavor
            </label>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setExtraCheese(!extraCheese)}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs font-semibold transition-all ${
                  extraCheese
                    ? 'bg-[#f2b134]/20 border-[#f2b134] text-[#141210] dark:text-white'
                    : 'bg-white dark:bg-white/5 border-[#141210]/15 dark:border-white/10 text-[#4a443f] dark:text-[#b8b0a5]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center border ${
                      extraCheese ? 'bg-[#f2b134] border-[#e08e1b]' : 'border-gray-400'
                    }`}
                  >
                    {extraCheese && <Check className="w-3 h-3 text-[#141210] stroke-[3]" />}
                  </div>
                  <span>Extra Melted Cheddar Lava</span>
                </div>
                <span className="font-bold text-[#141210] dark:text-[#f2b134]">+Rs. 80</span>
              </button>

              <button
                type="button"
                onClick={() => setExtraJalapeno(!extraJalapeno)}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs font-semibold transition-all ${
                  extraJalapeno
                    ? 'bg-[#f2b134]/20 border-[#f2b134] text-[#141210] dark:text-white'
                    : 'bg-white dark:bg-white/5 border-[#141210]/15 dark:border-white/10 text-[#4a443f] dark:text-[#b8b0a5]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center border ${
                      extraJalapeno ? 'bg-[#f2b134] border-[#e08e1b]' : 'border-gray-400'
                    }`}
                  >
                    {extraJalapeno && <Check className="w-3 h-3 text-[#141210] stroke-[3]" />}
                  </div>
                  <span>Charred Pickled Jalapeños</span>
                </div>
                <span className="font-bold text-[#141210] dark:text-[#f2b134]">+Rs. 50</span>
              </button>
            </div>
          </div>

          {/* Special Instructions */}
          <div className="space-y-1">
            <label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#141210] dark:text-white block">
              Kitchen Instructions (Optional)
            </label>
            <input
              type="text"
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              placeholder="e.g. No pickles, sauce on side..."
              className="w-full text-sm p-3 rounded-xl border border-[#141210]/15 dark:border-white/10 bg-white dark:bg-white/5 text-[#141210] dark:text-white focus:outline-none focus:border-[#141210] dark:focus:border-[#f2b134]"
            />
          </div>

          {/* Quantity selector */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#141210] dark:text-white">
              Quantity
            </span>
            <div className="flex items-center gap-3 bg-white dark:bg-white/5 px-3 py-1.5 rounded-full border border-[#141210]/15 dark:border-white/10">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-7 h-7 rounded-full bg-[#f6f1e9] dark:bg-white/10 flex items-center justify-center hover:bg-[#141210] hover:text-white transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-display font-black text-base min-w-[20px] text-center text-[#141210] dark:text-white">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-7 h-7 rounded-full bg-[#f6f1e9] dark:bg-white/10 flex items-center justify-center hover:bg-[#141210] hover:text-white transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-3.5 sm:p-4 bg-white dark:bg-[#141210] border-t border-[#141210]/10 dark:border-white/10 flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            onClick={handleAdd}
            className="flex-1 py-3 px-4 rounded-full bg-[#141210] dark:bg-white text-[#f6f1e9] dark:text-[#141210] font-bold text-sm flex items-center justify-center gap-2 hover:bg-black dark:hover:bg-gray-100 transition-all shadow-md active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Bag • {formatPKR(totalPrice)}</span>
          </button>

          <button
            type="button"
            onClick={handleWhatsAppOrder}
            className="py-3 px-5 rounded-full bg-[#25D366] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#20ba59] transition-all shadow-md active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Order on WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
