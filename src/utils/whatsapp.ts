import { CartItem, CustomerDetails, Product } from '../types';

export const formatPKR = (amount: number): string => {
  return `Rs. ${amount.toLocaleString('en-PK')}`;
};

export const sanitizePhoneNumber = (raw: string): string => {
  // Remove non-digit characters
  let digits = raw.replace(/\D/g, '');
  // If starts with 03..., replace leading 0 with 92
  if (digits.startsWith('03')) {
    digits = '92' + digits.slice(1);
  } else if (digits.startsWith('3') && digits.length === 10) {
    digits = '92' + digits;
  }
  return digits;
};

export const validatePakistanPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/[\s\-()]/g, '').replace(/^\+?92/, '0');
  return /^03\d{9}$/.test(cleaned);
};

export const generateWhatsAppOrderUrl = (
  items: CartItem[],
  customer: CustomerDetails,
  total: number,
  deliveryFee: number,
  fryPointsEarned: number,
  storePhone: string
): string => {
  const cleanPhone = sanitizePhoneNumber(storePhone) || '923000000000';

  const orderTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const orderDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  let text = `🍔 *NEW ORDER — FRYDAYS LAHORE*\n`;
  text += `📅 *Date & Time:* ${orderDate} at ${orderTime}\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `👤 *Customer:* ${customer.name || 'Valued Guest'}\n`;
  text += `📱 *Phone:* ${customer.phone}\n`;
  text += `🛵 *Order Type:* ${customer.orderType === 'delivery' ? 'Home Delivery 🏠' : 'Self Pickup 🛍️'}\n`;

  if (customer.orderType === 'delivery') {
    text += `📍 *Delivery Address:* ${customer.address || 'To be shared on call'}\n`;
  }

  if (customer.notes && customer.notes.trim()) {
    text += `📝 *Special Instructions:* ${customer.notes.trim()}\n`;
  }

  text += `━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `*ITEMS ORDERED:*\n`;

  items.forEach((item, index) => {
    let itemPrice = item.product.price;
    const extras: string[] = [];
    if (item.extraCheese) {
      itemPrice += 80;
      extras.push('+Extra Cheddar (+Rs.80)');
    }
    if (item.extraJalapeno) {
      itemPrice += 50;
      extras.push('+Jalapeños (+Rs.50)');
    }
    if (item.spiceLevel && item.spiceLevel !== 'Regular') {
      extras.push(`Spice: ${item.spiceLevel}`);
    }

    const subtotal = itemPrice * item.quantity;
    text += `${index + 1}. *${item.quantity}x ${item.product.name}*\n`;
    text += `   ↳ ${formatPKR(itemPrice)} each = *${formatPKR(subtotal)}*\n`;
    if (extras.length > 0) {
      text += `   ↳ _(${extras.join(', ')})_\n`;
    }
    if (item.notes) {
      text += `   ↳ _Note: ${item.notes}_\n`;
    }
  });

  text += `━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `Subtotal: ${formatPKR(total - deliveryFee)}\n`;
  if (customer.orderType === 'delivery') {
    text += `Delivery Fee: ${deliveryFee > 0 ? formatPKR(deliveryFee) : 'FREE (Special Offer! 🎉)'}\n`;
  }
  text += `💰 *TOTAL PAYABLE:* *${formatPKR(total)}*\n`;
  text += `🎁 *FryPoints Earned:* +${fryPointsEarned} pts\n`;
  text += `💳 *Payment:* Cash on Delivery / Handover\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `Please confirm availability and estimated preparation time. Thank you!`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
};

export const generateSingleProductWhatsAppUrl = (
  product: Product,
  storePhone: string
): string => {
  const cleanPhone = sanitizePhoneNumber(storePhone) || '923000000000';
  const text = `Hi Frydays! 👋 I would like to order:\n\n🍔 *1x ${product.name}* (${formatPKR(product.price)})\n\nCould you please let me know current availability & delivery time to my address in Lahore?`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
};

export const generateQuickInquiryWhatsAppUrl = (
  inquiry: string,
  storePhone: string
): string => {
  const cleanPhone = sanitizePhoneNumber(storePhone) || '923000000000';
  const text = `Hi Frydays! 👋 ${inquiry}`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
};
