import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, Bike, Store, Sparkles, CheckCircle2 } from 'lucide-react';
import { CartItem, CustomerDetails, OrderType, WhatsAppConfig } from '../types';
import { formatPKR, generateWhatsAppOrderUrl, validatePakistanPhone } from '../utils/whatsapp';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemoveItem: (id: number) => void;
  onClearCart: () => void;
  whatsAppConfig: WhatsAppConfig;
  onOrderSuccess: (orderId: string) => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  whatsAppConfig,
  onOrderSuccess
}) => {
  if (!isOpen) return null;

  const [orderType, setOrderType] = useState<OrderType>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [completedOrder, setCompletedOrder] = useState<{ id: string; total: number } | null>(null);

  // Subtotal calculation
  const subtotal = cartItems.reduce((sum, item) => {
    let itemPrice = item.product.price;
    if (item.extraCheese) itemPrice += 80;
    if (item.extraJalapeno) itemPrice += 50;
    return sum + itemPrice * item.quantity;
  }, 0);

  // Free delivery over 1500 PKR, else 100 PKR delivery in Lahore
  const deliveryFee = orderType === 'delivery' ? (subtotal >= 1500 || subtotal === 0 ? 0 : 100) : 0;
  const grandTotal = subtotal + deliveryFee;
  const fryPointsEarned = Math.floor(grandTotal / 100);

  const validateForm = (): boolean => {
    if (cartItems.length === 0) {
      setErrorMsg('Your bag is empty.');
      return false;
    }
    if (!customerName.trim()) {
      setErrorMsg('Please enter your name.');
      return false;
    }
    if (!validatePakistanPhone(customerPhone.trim())) {
      setErrorMsg('Please enter a valid mobile number (e.g. 0326 1180202).');
      return false;
    }
    if (orderType === 'delivery' && !deliveryAddress.trim()) {
      setErrorMsg('Please provide your complete delivery address in Lahore.');
      return false;
    }
    setErrorMsg('');
    return true;
  };

  const handleOrderViaWhatsApp = () => {
    if (!validateForm()) return;

    const customer: CustomerDetails = {
      name: customerName.trim(),
      phone: customerPhone.trim(),
      address: deliveryAddress.trim(),
      orderType,
      notes: orderNotes.trim()
    };

    const waUrl = generateWhatsAppOrderUrl(
      cartItems,
      customer,
      grandTotal,
      deliveryFee,
      fryPointsEarned,
      whatsAppConfig.phoneNumber
    );

    // Open WhatsApp
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    const orderId = `FRY-${Math.floor(1000 + Math.random() * 9000)}`;
    setCompletedOrder({ id: orderId, total: grandTotal });
    onClearCart();
    onOrderSuccess(orderId);
  };

  const handleCashOnDelivery = () => {
    if (!validateForm()) return;

    const orderId = `FRY-${Math.floor(1000 + Math.random() * 9000)}`;
    setCompletedOrder({ id: orderId, total: grandTotal });
    onClearCart();
    onOrderSuccess(orderId);
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
        {/* Header */}
        <div className="p-4 sm:p-5 bg-white dark:bg-[#141210] border-b border-[#141210]/10 dark:border-white/10 flex items-center justify-between">
          <div>
            <h3 className="font-display font-black text-xl sm:text-2xl text-[#141210] dark:text-white">Your Order Bag</h3>
            <p className="text-[11px] sm:text-xs text-[#4a443f] dark:text-[#b8b0a5]">
              Freshly cooked & dispatched in Lahore • WhatsApp: <span className="text-[#25D366] font-bold">{whatsAppConfig.displayPhone}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart modal"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#f6f1e9] dark:bg-white/10 text-[#141210] dark:text-white flex items-center justify-center hover:bg-[#141210] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success View */}
        {completedOrder ? (
          <div className="p-6 sm:p-8 text-center space-y-4 my-auto">
            <div className="w-16 h-16 rounded-full bg-[#25D366]/20 text-[#128C7E] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-[#25D366]" />
            </div>
            <h3 className="font-display font-black text-2xl text-[#141210] dark:text-white">
              Order Placed Successfully!
            </h3>
            <p className="text-xs sm:text-sm text-[#4a443f] dark:text-[#b8b0a5] max-w-sm mx-auto">
              Order ID: <span className="font-bold text-[#141210] dark:text-white">#{completedOrder.id}</span>
              <br />
              Total: <span className="font-bold text-[#c8392b] dark:text-[#f2b134]">{formatPKR(completedOrder.total)}</span>
              <br />
              Our kitchen has received your order and is firing up the grill!
            </p>

            <div className="pt-2 flex flex-col gap-2 max-w-xs mx-auto">
              <button
                onClick={() => {
                  const url = `https://wa.me/${whatsAppConfig.phoneNumber}?text=${encodeURIComponent(
                    `Hi Fry Days! 👋 I placed Order #${completedOrder.id}. Please confirm when rider departs.`
                  )}`;
                  window.open(url, '_blank', 'noopener,noreferrer');
                }}
                className="py-3 px-4 rounded-full bg-[#25D366] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#20ba59] transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                Track on WhatsApp
              </button>
              <button
                onClick={() => {
                  setCompletedOrder(null);
                  onClose();
                }}
                className="py-2.5 px-4 rounded-full border border-[#141210]/20 dark:border-white/20 text-xs font-bold text-[#141210] dark:text-white hover:bg-[#141210] hover:text-white transition-colors"
              >
                Back to Menu
              </button>
            </div>
          </div>
        ) : (
          /* Normal Cart Body */
          <div className="p-4 sm:p-5 overflow-y-auto space-y-4 sm:space-y-5 flex-1">
            {cartItems.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#efe7da] dark:bg-white/10 flex items-center justify-center mx-auto text-2xl">
                  🍟
                </div>
                <h4 className="font-display font-bold text-lg text-[#141210] dark:text-white">Your bag is hungry</h4>
                <p className="text-xs text-[#4a443f] dark:text-[#b8b0a5] max-w-xs mx-auto">
                  Browse our smash burgers, wings, wraps, and loaded fries to add some flavor.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 py-2 px-5 rounded-full bg-[#141210] dark:bg-white text-[#f6f1e9] dark:text-[#141210] text-xs font-bold hover:bg-black"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              <>
                {/* Cart Items List */}
                <div className="space-y-2.5">
                  {cartItems.map((item) => {
                    let itemUnit = item.product.price;
                    if (item.extraCheese) itemUnit += 80;
                    if (item.extraJalapeno) itemUnit += 50;
                    const lineTotal = itemUnit * item.quantity;

                    return (
                      <div
                        key={item.id}
                        className="bg-white dark:bg-[#141210] p-3 sm:p-3.5 rounded-2xl border border-[#141210]/10 dark:border-white/10 flex items-center justify-between gap-3 shadow-2xs"
                      >
                        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                          <img
                            src={item.product.img}
                            alt={item.product.name}
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover shrink-0 bg-[#efe7da]"
                          />
                          <div className="min-w-0">
                            <h4 className="font-bold text-xs sm:text-sm text-[#141210] dark:text-white truncate">
                              {item.product.name}
                            </h4>
                            <div className="text-[10px] sm:text-[11px] text-[#4a443f] dark:text-[#b8b0a5]">
                              {formatPKR(itemUnit)} each
                              {(item.extraCheese || item.extraJalapeno || (item.spiceLevel && item.spiceLevel !== 'Regular')) && (
                                <span className="block text-[10px] text-[#c8392b] dark:text-[#f2b134]">
                                  {[
                                    item.extraCheese && '+Cheese',
                                    item.extraJalapeno && '+Jalapeños',
                                    item.spiceLevel !== 'Regular' && item.spiceLevel
                                  ]
                                    .filter(Boolean)
                                    .join(' • ')}
                                </span>
                              )}
                            </div>
                            <span className="font-display font-black text-xs text-[#141210] dark:text-white">
                              {formatPKR(lineTotal)}
                            </span>
                          </div>
                        </div>

                        {/* Quantity Buttons */}
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#f6f1e9] dark:bg-white/10 text-[#141210] dark:text-white flex items-center justify-center hover:bg-[#141210] hover:text-white transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-5 text-center text-xs font-bold text-[#141210] dark:text-white">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#f6f1e9] dark:bg-white/10 text-[#141210] dark:text-white flex items-center justify-center hover:bg-[#141210] hover:text-white transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full text-red-500 hover:bg-red-50 dark:hover:bg-red-950 flex items-center justify-center transition-colors ml-0.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Order Type Selector */}
                <div className="space-y-1">
                  <label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#141210] dark:text-white block">
                    Choose Delivery or Pickup
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setOrderType('delivery')}
                      className={`p-2.5 sm:p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                        orderType === 'delivery'
                          ? 'bg-[#141210] dark:bg-white text-[#f6f1e9] dark:text-[#141210] border-[#141210] dark:border-white shadow-sm'
                          : 'bg-white dark:bg-white/5 text-[#4a443f] dark:text-[#b8b0a5] border-[#141210]/15 dark:border-white/10'
                      }`}
                    >
                      <Bike className="w-4 h-4 text-[#f2b134]" />
                      <span>Home Delivery</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType('pickup')}
                      className={`p-2.5 sm:p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                        orderType === 'pickup'
                          ? 'bg-[#141210] dark:bg-white text-[#f6f1e9] dark:text-[#141210] border-[#141210] dark:border-white shadow-sm'
                          : 'bg-white dark:bg-white/5 text-[#4a443f] dark:text-[#b8b0a5] border-[#141210]/15 dark:border-white/10'
                      }`}
                    >
                      <Store className="w-4 h-4 text-[#f2b134]" />
                      <span>Takeaway Pickup</span>
                    </button>
                  </div>
                </div>

                {/* Customer Details Form */}
                <div className="space-y-2.5 bg-white dark:bg-[#141210] p-3.5 sm:p-4 rounded-2xl border border-[#141210]/10 dark:border-white/10">
                  <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#141210] dark:text-white">
                    Customer & Delivery Info
                  </h4>

                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-semibold text-[#4a443f] dark:text-[#b8b0a5] mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Rehan Gujjar"
                      className="w-full text-sm p-2.5 rounded-xl border border-[#141210]/15 dark:border-white/10 bg-[#f6f1e9]/30 dark:bg-white/5 text-[#141210] dark:text-white focus:outline-none focus:border-[#141210] dark:focus:border-[#f2b134]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-semibold text-[#4a443f] dark:text-[#b8b0a5] mb-1">
                      WhatsApp Phone Number (03xx xxxxxxx) *
                    </label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="0326 1180202"
                      className="w-full text-sm p-2.5 rounded-xl border border-[#141210]/15 dark:border-white/10 bg-[#f6f1e9]/30 dark:bg-white/5 text-[#141210] dark:text-white focus:outline-none focus:border-[#141210] dark:focus:border-[#f2b134]"
                    />
                  </div>

                  {orderType === 'delivery' && (
                    <div>
                      <label className="block text-[10px] sm:text-[11px] font-semibold text-[#4a443f] dark:text-[#b8b0a5] mb-1">
                        Delivery Address in Lahore *
                      </label>
                      <textarea
                        rows={2}
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder="House #, Street, Phase / Block, Area (e.g. Gulberg, DHA, Johar Town)"
                        className="w-full text-sm p-2.5 rounded-xl border border-[#141210]/15 dark:border-white/10 bg-[#f6f1e9]/30 dark:bg-white/5 text-[#141210] dark:text-white focus:outline-none focus:border-[#141210] dark:focus:border-[#f2b134]"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-semibold text-[#4a443f] dark:text-[#b8b0a5] mb-1">
                      Special Order Note (Optional)
                    </label>
                    <input
                      type="text"
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      placeholder="e.g. Extra garlic mayo, call on arrival"
                      className="w-full text-sm p-2.5 rounded-xl border border-[#141210]/15 dark:border-white/10 bg-[#f6f1e9]/30 dark:bg-white/5 text-[#141210] dark:text-white focus:outline-none focus:border-[#141210] dark:focus:border-[#f2b134]"
                    />
                  </div>
                </div>

                {/* Error Banner */}
                {errorMsg && (
                  <div className="bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 text-xs font-semibold p-2.5 rounded-xl border border-red-200 dark:border-red-900 text-center">
                    {errorMsg}
                  </div>
                )}

                {/* Pricing Breakdown & Rewards */}
                <div className="bg-white dark:bg-[#141210] p-3.5 sm:p-4 rounded-2xl border border-[#141210]/10 dark:border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between text-[#4a443f] dark:text-[#b8b0a5]">
                    <span>Items Subtotal</span>
                    <span className="text-[#141210] dark:text-white font-medium">{formatPKR(subtotal)}</span>
                  </div>

                  {orderType === 'delivery' && (
                    <div className="flex justify-between text-[#4a443f] dark:text-[#b8b0a5]">
                      <span>Lahore Delivery</span>
                      <span>{deliveryFee === 0 ? <strong className="text-[#2f5d3a] dark:text-[#25D366]">FREE</strong> : formatPKR(deliveryFee)}</span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-[#141210]/10 dark:border-white/10 flex justify-between font-display font-black text-base text-[#141210] dark:text-white">
                    <span>Total Amount</span>
                    <span className="text-[#c8392b] dark:text-[#f2b134]">{formatPKR(grandTotal)}</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#e08e1b] dark:text-[#f2b134] font-bold bg-[#f2b134]/15 dark:bg-[#f2b134]/10 px-3 py-1.5 rounded-lg">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> FryPoints Earned
                    </span>
                    <span>+{fryPointsEarned} pts</span>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Footer Checkout Buttons */}
        {!completedOrder && cartItems.length > 0 && (
          <div className="p-3.5 sm:p-4 bg-white dark:bg-[#141210] border-t border-[#141210]/10 dark:border-white/10 space-y-2">
            <button
              onClick={handleOrderViaWhatsApp}
              className="w-full py-3 sm:py-3.5 px-4 rounded-full bg-[#25D366] text-white font-display font-black text-sm sm:text-base flex items-center justify-center gap-2 hover:bg-[#20ba59] transition-all shadow-lg shadow-[#25D366]/25 active:scale-95"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Send Order to WhatsApp ({formatPKR(grandTotal)})</span>
            </button>

            <button
              onClick={handleCashOnDelivery}
              className="w-full py-2.5 px-4 rounded-full bg-[#141210] dark:bg-white text-[#f6f1e9] dark:text-[#141210] font-bold text-xs hover:bg-black dark:hover:bg-gray-100 transition-colors"
            >
              Or Place with Cash on Delivery
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
