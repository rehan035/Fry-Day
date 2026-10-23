import { Product } from '../types';
import heroFeastImg from '../assets/images/hero_frydays_feast_1792772947765.jpg';
import smashBurgerImg from '../assets/images/smash_burger_closeup_1792772949139.jpg';
import loadedFriesImg from '../assets/images/loaded_cheese_fries_1792772950224.jpg';
import chickenWrapImg from '../assets/images/crispy_chicken_wrap_1792772950951.jpg';
import buffaloWingsImg from '../assets/images/buffalo_wings_platter_1792772951147.jpg';

export const FRY_DAYS_LOGO = '/assets/aistudio/fry_days_logo_small_c6ff3652.png';
export const FRY_DAYS_STOREFRONT = '/assets/aistudio/ChatGPT_Image_Oct_23__2026__09_57_39_PM_b006631e.png';
export const HERO_FEAST_IMAGE = heroFeastImg;

export const CATEGORIES = [
  'All',
  'Deals',
  'Burgers',
  'Wraps',
  'Wings',
  'Loaded Fries',
  'Sides',
  'Drinks'
] as const;

export const PRODUCTS: Product[] = [
  {
    id: 101,
    name: 'Fry Days Duo Feast',
    cat: 'Deals',
    price: 1599,
    tag: 'Best Value',
    desc: 'Two hand-pressed Classic Smash Burgers, one full boat of Loaded Signature Cheese Fries, and two chilled 250ml soft drinks.',
    img: heroFeastImg,
    calories: '1,680 kcal',
    isDeal: true,
    dealItems: ['2x Classic Smash Burger', '1x Loaded Cheese Fries', '2x Chilled Soft Drinks']
  },
  {
    id: 102,
    name: 'Wrap & Crunch Box',
    cat: 'Deals',
    price: 1150,
    tag: 'Signature Box',
    desc: 'Crispy Chicken Garlic Mayo Wrap paired with double-fried salted skin-on fries, roasted garlic dip, and a chilled drink.',
    img: chickenWrapImg,
    calories: '980 kcal',
    isDeal: true,
    dealItems: ['1x Crispy Chicken Wrap', '1x Large Salted Fries', '1x Garlic Mayo Dip', '1x Soft Drink']
  },
  {
    id: 103,
    name: 'Midnight Wings & Fries Platter',
    cat: 'Deals',
    price: 1290,
    tag: 'Late Night',
    desc: '12 double-fried Buffalo & Honey Garlic wings, large seasoned fries, two house dips, and two soft drinks.',
    img: buffaloWingsImg,
    calories: '1,340 kcal',
    isDeal: true,
    dealItems: ['12x Glazed Wings', '1x Large Salted Fries', '2x House Dips', '2x Soft Drinks']
  },
  {
    id: 1,
    name: 'Classic Fry Days Smash',
    cat: 'Burgers',
    price: 650,
    tag: 'Bestseller',
    desc: 'Hand-pressed 130g chuck beef patty seared with lacy edges, aged American cheddar, dill pickles, and house burger relish on toasted brioche.',
    img: smashBurgerImg,
    calories: '640 kcal'
  },
  {
    id: 2,
    name: 'Double Smash Monster',
    cat: 'Burgers',
    price: 890,
    tag: 'House Special',
    desc: 'Two 120g smashed beef patties, double melted cheddar, charred sweet onions, dill pickles, and smoky peppercorn sauce.',
    img: heroFeastImg,
    calories: '820 kcal'
  },
  {
    id: 3,
    name: 'Crispy Buttermilk Chicken Burger',
    cat: 'Burgers',
    price: 620,
    tag: 'Spicy',
    desc: '24-hour buttermilk brined chicken thigh fried golden, crisp shredded cabbage slaw, and fiery chipotle mayo.',
    img: smashBurgerImg,
    calories: '590 kcal',
    spicy: true
  },
  {
    id: 201,
    name: 'Crispy Chicken Garlic Mayo Wrap',
    cat: 'Wraps',
    price: 580,
    tag: 'Bestseller',
    desc: 'Crunchy buttermilk chicken tenders, crisp romaine, diced tomatoes, pickled red onions, and roasted garlic herb mayo in a grilled tortilla.',
    img: chickenWrapImg,
    calories: '520 kcal'
  },
  {
    id: 202,
    name: 'Chargrilled Tikka Crunch Wrap',
    cat: 'Wraps',
    price: 550,
    tag: 'Spicy',
    desc: 'Smoky clay-oven chicken tikka strips, crisp onions, fresh mint yogurt drizzle, and crushed chili glaze in warm flatbread.',
    img: chickenWrapImg,
    calories: '490 kcal',
    spicy: true
  },
  {
    id: 203,
    name: 'Smoky BBQ Beef Loaded Wrap',
    cat: 'Wraps',
    price: 640,
    desc: 'Seared spiced beef strips, molten cheddar drizzle, crispy onion strings, and hickory BBQ sauce wrapped in a toasted tortilla.',
    img: chickenWrapImg,
    calories: '580 kcal'
  },
  {
    id: 4,
    name: 'Buffalo Tangy Wings (6 pcs)',
    cat: 'Wings',
    price: 520,
    tag: 'Spicy',
    desc: 'Double-fried skin-on chicken wings tossed in cayenne butter buffalo glaze, served with cool herb ranch dip.',
    img: buffaloWingsImg,
    calories: '480 kcal',
    spicy: true
  },
  {
    id: 5,
    name: 'Honey Garlic Sesame Wings (6 pcs)',
    cat: 'Wings',
    price: 540,
    desc: 'Crispy wings glazed in wildflower honey, slow-roasted garlic reduction, toasted white sesame seeds, and scallions.',
    img: buffaloWingsImg,
    calories: '510 kcal'
  },
  {
    id: 6,
    name: 'Loaded Signature Cheese Fries',
    cat: 'Loaded Fries',
    price: 480,
    tag: 'Bestseller',
    desc: 'Hand-cut skin-on fries twice-fried golden, smothered in warm cheddar cheese sauce, charred jalapeños, smoky beef bits, and spring onions.',
    img: loadedFriesImg,
    calories: '560 kcal'
  },
  {
    id: 7,
    name: 'Lahori Tikka Melt Fries',
    cat: 'Loaded Fries',
    price: 560,
    tag: 'Spicy',
    desc: 'Double-fried potato fries topped with smoky chicken tikka cubes, cheddar melt, mint garlic yogurt, and pickled red onions.',
    img: loadedFriesImg,
    calories: '610 kcal',
    spicy: true
  },
  {
    id: 8,
    name: 'Hand-Cut Sea Salt Fries',
    cat: 'Sides',
    price: 250,
    desc: 'Fresh Punjab potatoes hand-sliced every morning, soaked, blanched, and double-fried crisp with flaky sea salt.',
    img: loadedFriesImg,
    calories: '320 kcal'
  },
  {
    id: 9,
    name: 'Spiced Craft Onion Rings (8 pcs)',
    cat: 'Sides',
    price: 320,
    desc: 'Thick-cut sweet yellow onion rings in seasoned crispy batter, served hot with house garlic ranch dip.',
    img: loadedFriesImg,
    calories: '340 kcal'
  },
  {
    id: 10,
    name: 'Fresh Mint Lemonade',
    cat: 'Drinks',
    price: 220,
    desc: 'Freshly squeezed lemons, crushed garden mint leaves, black salt, and chilled sparkling soda.',
    img: heroFeastImg,
    calories: '95 kcal'
  },
  {
    id: 11,
    name: 'Chilled Soft Drink (250ml Can)',
    cat: 'Drinks',
    price: 120,
    desc: 'Ice-cold can — Coca-Cola, Sprite, Fanta, or Coke Zero.',
    img: heroFeastImg,
    calories: '140 kcal'
  }
];

export const DEFAULT_WHATSAPP_CONFIG = {
  phoneNumber: '923261180202',
  displayPhone: '+92 326 1180202',
  branchName: 'Fry Days Gulberg III',
  city: 'Lahore, Pakistan'
};
