export interface Product {
  id: number;
  name: string;
  cat: 'Burgers' | 'Wraps' | 'Wings' | 'Loaded Fries' | 'Sides' | 'Drinks' | 'Deals';
  price: number;
  tag?: string;
  desc: string;
  img: string;
  calories?: string;
  spicy?: boolean;
  isDeal?: boolean;
  dealItems?: string[];
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  spiceLevel?: 'Mild' | 'Regular' | 'Extra Spicy';
  extraCheese?: boolean;
  extraJalapeno?: boolean;
  notes?: string;
}

export type OrderType = 'delivery' | 'pickup';

export interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
  orderType: OrderType;
  notes: string;
}

export interface WhatsAppConfig {
  phoneNumber: string; // e.g. '923261180202'
  displayPhone: string; // e.g. '+92 326 1180202'
  branchName: string;
  city: string;
}
