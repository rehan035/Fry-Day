import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, Bike, Store, CheckCircle2 } from 'lucide-react';
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
  // All hooks declared unconditionally before early return (Fixes React Rules of Hooks bug)
  const [orderType, setOrderType] = useState<OrderType>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [completedOrder, setCompletedOrder] = useState<{ id: string; total: number } | null>(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => {
    let itemPrice = item.product.price;
    if (item.extraCheese) itemPrice += 80;
    if (item.extraJalapeno) itemPrice += 50;
    return sum + itemPrice * item.quantity;
  }, 0);

  const deliveryFee = orderType === 'delivery' ? (subtotal >= 1500 || subtotal === 0 ? 0 : 100) : 0;
  const grandTotal = subtotal + deliveryFee;
  const fryPointsEarned = Math.floor(grandTotal / 100);

  const validateForm = (): boolean => {
    if (cartItems.length === 0) {
      setErrorMsg('Your bag is empty.');
      return false;
    }
    if (!customerName.trim()) {
      setErrorMsg('Please enter your full name.');
      return false;
    }
    if (!validatePakistanPhone(customerPhone.trim())) {
      setErrorMsg('Enter a valid mobile number (e.g. 0326 1180202).');
      return false;
    }
    if (orderType === 'delivery' && !deliveryAddress.trim()) {
      setErrorMsg('Please provide your delivery address in Lahore.');
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
      aria-labelledby="cart-modal-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/65 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#F7F5F0] dark:bg-[#181614] w-full max-w-lg rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl border border-[#161412]/10 dark:border-white/10 max-h-[92vh] flex flex-col"
      >
        {/* Mobile Drag Handle */}
        <div className="sm:hidden pt-2.5 pb-1 bg-white dark:bg-[#141210]">
          <div className="w-10 h-1.5 bg-[#161412]/20 dark:bg-white/20 rounded-full mx-auto" />
        </div>

        {/* Header */}
        <div className="px-5 py-4 bg-white dark:bg-[#141210] border-b border-[#161412]/10 dark:border-white/10 flex items-center justify-between">
          <div>
            <h3 id="cart-modal-title" className="font-display font-bold text-xl text-[#161412] dark:text-[#F4F1EA]">
              Your Order Bag
            </h3>
            <p className="text-xs text-[#57524C] dark:text-[#B5AEA4]">
              Direct Kitchen Dispatch · {whatsAppConfig.displayPhone}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close bag"
            className="min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center text-[#161412] dark:text-[#F4F1EA] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Post-Order Confirmation State */}
        {completedOrder ? (
          <div className="p-6 sm:p-8 text-center space-y-4 my-auto">
            <div className="w-14 h-14 rounded-full bg-[#25D366]/15 text-[#25D366] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-display font-bold text-2xl text-[#161412] dark:text-[#F4F1EA]">
              Order #{completedOrder.id} Confirmed
            </h4>
            <p className="text-sm text-[#57524C] dark:text-[#B5AEA4] max-w-sm mx-auto">
              Total Payable: <strong className="font-mono-num text-[#161412] dark:text-white">{formatPKR(completedOrder.total)}</strong>
              <br />
              Our Gulberg kitchen is preparing your fresh order now.
            </p>

            <div className="pt-2 flex flex-col gap-2.5 max-w-xs mx-auto">
              <button
                type="button"
                onClick={() => {
                  const url = `https://wa.me/${whatsAppConfig.phoneNumber}?text=${encodeURIComponent(
                    `Hi Fry Days! I placed Order #${completedOrder.id} (${formatPKR(completedOrder.total)}). Please share live rider status.`
                  )}`;
                  window.open(url, '_blank', 'noopener,noreferrer');
                }}
                className="min-h-[48px] px-4 rounded-xl bg-[#25D366] text-[#11100E] font-bold text-sm inline-flex items-center justify-center gap-2 hover:bg-[#20BD5A] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Track Order on WhatsApp</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setCompletedOrder(null);
                  onClose();
                }}
                className="min-h-[44px] px-4 rounded-xl border border-[#161412]/15 dark:border-white/15 text-xs font-semibold text-[#161412] dark:text-[#F4F1EA]"
              >
                Return to Menu
              </button>
            </div>
          </div>
        ) : (
          /* Cart Body */
          <div className="p-5 overflow-y-auto space-y-6 flex-1">
            {cartItems.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <h4 className="font-display font-bold text-lg text-[#161412] dark:text-[#F4F1EA]">
                  Your bag is currently empty
                </h4>
                <p className="text-xs sm:text-sm text-[#57524C] dark:text-[#B5AEA4] max-w-xs mx-auto">
                  Add hand-pressed smash burgers, crispy wraps, or loaded cheese fries from the menu.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-2 min-h-[44px] px-5 rounded-xl bg-[#161412] dark:bg-[#F2B134] text-[#F7F5F0] dark:text-[#161412] text-xs font-bold"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <>
                {/* Itemized List with Hairline Dividers (No Nested Cards) */}
                <div className="divide-y divide-[#161412]/10 dark:divide-white/10">
                  {cartItems.map((item) => {
                    let itemUnit = item.product.price;
                    if (item.extraCheese) itemUnit += 80;
                    if (item.extraJalapeno) itemUnit += 50;
                    const lineTotal = itemUnit * item.quantity;

                    return (
                      <div
                        key={item.id}
                        className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={item.product.img}
                            alt={item.product.name}
                            referrerPolicy="no-referrer"
                            className="w-14 h-14 rounded-xl object-cover shrink-0 bg-[#1C1916]"
                          />
                          <div className="min-w-0">
                            <h4 className="font-semibold text-sm text-[#161412] dark:text-[#F4F1EA] truncate">
                              {item.product.name}
                            </h4>
                            <div className="text-xs text-[#57524C] dark:text-[#B5AEA4]">
                              <span className="font-mono-num">{formatPKR(itemUnit)}</span> each
                              {(item.extraCheese || item.extraJalapeno || (item.spiceLevel && item.spiceLevel !== 'Regular')) && (
                                <span className="block text-[11px] text-[#C8392B] dark:text-[#F2B134]">
                                  {[
                                    item.extraCheese && '+Cheddar',
                                    item.extraJalapeno && '+Jalapeños',
                                    item.spiceLevel !== 'Regular' && item.spiceLevel
                                  ]
                                    .filter(Boolean)
                                    .join(' · ')}
                                </span>
                              )}
                            </div>
                            <span className="font-mono-num font-bold text-xs text-[#161412] dark:text-[#F4F1EA]">
                              {formatPKR(lineTotal)}
                            </span>
                          </div>
                        </div>

                        {/* 44px Touch Steppers */}
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            aria-label="Decrease item quantity"
                            className="min-h-[40px] min-w-[40px] rounded-xl bg-white dark:bg-[#221F1C] border border-[#161412]/10 dark:border-white/10 text-[#161412] dark:text-white flex items-center justify-center"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-6 text-center font-mono-num text-xs font-bold text-[#161412] dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            aria-label="Increase item quantity"
                            className="min-h-[40px] min-w-[40px] rounded-xl bg-white dark:bg-[#221F1C] border border-[#161412]/10 dark:border-white/10 text-[#161412] dark:text-white flex items-center justify-center"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.id)}
                            aria-label="Remove item"
                            className="min-h-[40px] min-w-[40px] rounded-xl text-[#C8392B] hover:bg-red-500/10 flex items-center justify-center"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Segmented Order Mode Control */}
                <div className="pt-4 border-t border-[#161412]/10 dark:border-white/10 space-y-2">
                  <label className="text-xs font-semibold text-[#161412] dark:text-[#F4F1EA] block">
                    Fulfillment Method
                  </label>
                  <div className="grid grid-cols-2 gap-2 p-1 bg-[#161412]/5 dark:bg-white/5 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setOrderType('delivery')}
                      className={`min-h-[44px] px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                        orderType === 'delivery'
                          ? 'bg-white dark:bg-[#262320] text-[#161412] dark:text-white shadow-sm'
                          : 'text-[#57524C] dark:text-[#B5AEA4]'
                      }`}
                    >
                      <Bike className="w-4 h-4" />
                      <span>Home Delivery</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType('pickup')}
                      className={`min-h-[44px] px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                        orderType === 'pickup'
                          ? 'bg-white dark:bg-[#262320] text-[#161412] dark:text-white shadow-sm'
                          : 'text-[#57524C] dark:text-[#B5AEA4]'
                      }`}
                    >
                      <Store className="w-4 h-4" />
                      <span>Self Pickup</span>
                    </button>
                  </div>
                </div>

                {/* Customer Verification Fields */}
                <div className="pt-4 border-t border-[#161412]/10 dark:border-white/10 space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-[#57524C] dark:text-[#B5AEA4] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Rehan Gujjar"
                      className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-[#161412]/15 dark:border-white/15 bg-white dark:bg-[#221F1C] text-[#161412] dark:text-white focus:outline-none focus:border-[#161412] dark:focus:border-[#F2B134]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#57524C] dark:text-[#B5AEA4] mb-1">
                      Mobile / WhatsApp Number (03xx xxxxxxx) *
                    </label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="0326 1180202"
                      className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-[#161412]/15 dark:border-white/15 bg-white dark:bg-[#221F1C] text-[#161412] dark:text-white focus:outline-none focus:border-[#161412] dark:focus:border-[#F2B134]"
                    />
                  </div>

                  {orderType === 'delivery' && (
                    <div>
                      <label className="block text-xs font-medium text-[#57524C] dark:text-[#B5AEA4] mb-1">
                        Complete Delivery Address in Lahore *
                      </label>
                      <textarea
                        rows={2}
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder="House #, Street, Block / Phase (Gulberg, DHA, Model Town, Johar Town)"
                        className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-[#161412]/15 dark:border-white/15 bg-white dark:bg-[#221F1C] text-[#161412] dark:text-white focus:outline-none focus:border-[#161412] dark:focus:border-[#F2B134]"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-medium text-[#57524C] dark:text-[#B5AEA4] mb-1">
                      Kitchen / Rider Instructions (Optional)
                    </label>
                    <input
                      type="text"
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      placeholder="Extra garlic mayo, ring bell on arrival..."
                      className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-[#161412]/15 dark:border-white/15 bg-white dark:bg-[#221F1C] text-[#161412] dark:text-white focus:outline-none focus:border-[#161412] dark:focus:border-[#F2B134]"
                    />
                  </div>
                </div>

                {errorMsg && (
                  <div role="alert" className="text-xs font-semibold text-[#C8392B] dark:text-[#FF6B6B]">
                    {errorMsg}
                  </div>
                )}

                {/* Tabular Summary */}
                <div className="pt-4 border-t border-[#161412]/10 dark:border-white/10 space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#57524C] dark:text-[#B5AEA4]">
                    <span>Items Subtotal</span>
                    <span className="font-mono-num text-[#161412] dark:text-white">{formatPKR(subtotal)}</span>
                  </div>

                  {orderType === 'delivery' && (
                    <div className="flex justify-between text-[#57524C] dark:text-[#B5AEA4]">
                      <span>Lahore Delivery (Free over Rs. 1,500)</span>
                      <span className="font-mono-num text-[#161412] dark:text-white">
                        {deliveryFee === 0 ? 'Free' : formatPKR(deliveryFee)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-[#57524C] dark:text-[#B5AEA4]">
                    <span>FryPoints Earned</span>
                    <span className="font-mono-num text-[#161412] dark:text-[#F2B134]">+{fryPointsEarned} pts</span>
                  </div>

                  <div className="pt-2 border-t border-[#161412]/10 dark:border-white/10 flex justify-between font-display font-bold text-base text-[#161412] dark:text-white">
                    <span>Total Payable (COD)</span>
                    <span className="font-mono-num text-[#C8392B] dark:text-[#F2B134]">{formatPKR(grandTotal)}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Sticky Checkout Actions */}
        {!completedOrder && cartItems.length > 0 && (
          <div className="p-4 bg-white dark:bg-[#141210] border-t border-[#161412]/10 dark:border-white/10 space-y-2">
            <button
              type="button"
              onClick={handleOrderViaWhatsApp}
              className="w-full min-h-[48px] px-4 rounded-xl bg-[#25D366] text-[#11100E] font-bold text-sm sm:text-base flex items-center justify-center gap-2 hover:bg-[#20BD5A] active:scale-[0.99] transition-all whitespace-nowrap"
            >
              <MessageCircle className="w-5 h-5 shrink-0" />
              <span>Send Order on WhatsApp · {formatPKR(grandTotal)}</span>
            </button>

            <button
              type="button"
              onClick={handleCashOnDelivery}
              className="w-full min-h-[44px] px-4 rounded-xl bg-[#161412] dark:bg-[#262320] text-[#F7F5F0] font-semibold text-xs hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Confirm Cash on Delivery Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
