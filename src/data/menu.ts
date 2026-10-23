import { Product } from '../types';

export const FRY_DAYS_LOGO = '/assets/aistudio/fry_days_logo_small_c6ff3652.png';

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
    name: 'Fry Days Duo Feast Deal',
    cat: 'Deals',
    price: 1599,
    tag: 'Save Rs. 350',
    desc: '2x Classic Fry Days Burgers + 1x Loaded Cheese Fries + 2x Chilled Soft Drinks.',
    img: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80',
    isDeal: true,
    dealItems: ['2x Classic Burger', '1x Loaded Cheese Fries', '2x Soft Drinks']
  },
  {
    id: 102,
    name: 'Wrap & Crunch Box Deal',
    cat: 'Deals',
    price: 1150,
    tag: 'Special Combo',
    desc: '1x Crispy Chicken Garlic Mayo Wrap + 1x Large Salted Fries + 1x Soft Drink + Garlic Dip.',
    img: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80',
    isDeal: true,
    dealItems: ['1x Crispy Chicken Wrap', '1x Large Fries', '1x Soft Drink', 'Garlic Mayo Dip']
  },
  {
    id: 103,
    name: 'Wings & Crunch Platter',
    cat: 'Deals',
    price: 1290,
    tag: 'Hot Deal',
    desc: '12x Buffalo Wings + 1x Classic Salted Fries + 2x House Dips + 2x Drinks.',
    img: 'https://images.unsplash.com/photo-1527477321055-43615862e771?auto=format&fit=crop&w=800&q=80',
    isDeal: true,
    dealItems: ['12x Buffalo Wings', 'Large Salted Fries', '2 Dips', '2 Drinks']
  },
  {
    id: 1,
    name: 'Classic Fry Days Burger',
    cat: 'Burgers',
    price: 650,
    tag: 'Best seller',
    desc: 'Hand-pressed smash beef patty, aged cheddar, crunch pickles, house secret relish on toasted brioche.',
    img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80',
    calories: '640 kcal'
  },
  {
    id: 2,
    name: 'Crispy Buttermilk Chicken Burger',
    cat: 'Burgers',
    price: 620,
    tag: 'Fan Favorite',
    desc: '24-hour buttermilk soaked crispy chicken breast, purple cabbage slaw, spicy chipotle mayo.',
    img: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=700&q=80',
    calories: '590 kcal',
    spicy: true
  },
  {
    id: 3,
    name: 'Double Smash Monster',
    cat: 'Burgers',
    price: 890,
    tag: 'Chef Special',
    desc: 'Two 120g seared beef patties, double melted gouda & cheddar, caramelized onions, smoked bacon jam.',
    img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=700&q=80',
    calories: '820 kcal'
  },
  {
    id: 201,
    name: 'Crispy Chicken Garlic Mayo Wrap',
    cat: 'Wraps',
    price: 580,
    tag: 'Top Wrap',
    desc: 'Golden crispy chicken strips, shredded lettuce, diced tomatoes, pickles, and creamy garlic yogurt mayo in a toasted tortilla.',
    img: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=700&q=80',
    calories: '520 kcal'
  },
  {
    id: 202,
    name: 'Spicy Tikka Crunch Wrap',
    cat: 'Wraps',
    price: 550,
    tag: 'Spicy 🔥',
    desc: 'Chargrilled clay-oven chicken tikka chunks, crisp cucumbers, pickled red onions, mint raita, and spicy chili sauce.',
    img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=700&q=80',
    calories: '490 kcal',
    spicy: true
  },
  {
    id: 203,
    name: 'Smoky BBQ Beef Loaded Wrap',
    cat: 'Wraps',
    price: 640,
    tag: 'Signature',
    desc: 'Juicy pulled grilled beef, cheddar drizzle, crispy onion straws, house hickory BBQ sauce in a warm flatbread.',
    img: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=700&q=80',
    calories: '580 kcal'
  },
  {
    id: 4,
    name: 'Buffalo Tangy Wings (6pc)',
    cat: 'Wings',
    price: 520,
    tag: 'Spicy 🔥',
    desc: 'Double-fried for crispness, drenched in fiery hot sauce, accompanied by cool blue cheese dip.',
    img: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?auto=format&fit=crop&w=700&q=80',
    calories: '480 kcal',
    spicy: true
  },
  {
    id: 5,
    name: 'Honey Garlic Wings (6pc)',
    cat: 'Wings',
    price: 540,
    tag: 'Sweet & Savory',
    desc: 'Glazed with organic Sidr honey, roasted garlic reduction, toasted sesame seeds, and chives.',
    img: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=700&q=80',
    calories: '510 kcal'
  },
  {
    id: 6,
    name: 'Loaded Signature Cheese Fries',
    cat: 'Loaded Fries',
    price: 480,
    tag: 'Best seller',
    desc: 'Golden skin-on fries, warm cheddar lava, charred jalapeños, crispy beef bacon bits, spring onions.',
    img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=80',
    calories: '560 kcal'
  },
  {
    id: 7,
    name: 'Chicken Tikka Melt Fries',
    cat: 'Loaded Fries',
    price: 560,
    tag: 'Lahore Special',
    desc: 'Chargrilled clay-oven tikka cubes, mint garlic yogurt drizzle, pickled red onion, crispy sev topping.',
    img: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=700&q=80',
    calories: '610 kcal',
    spicy: true
  },
  {
    id: 8,
    name: 'Classic Golden Salted Fries',
    cat: 'Sides',
    price: 250,
    tag: 'Hand-Cut',
    desc: 'Locally grown potatoes hand-sliced fresh daily, blanched and twice-fried with flaky sea salt.',
    img: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=700&q=80',
    calories: '320 kcal'
  },
  {
    id: 9,
    name: 'Crispy Onion Rings (8pc)',
    cat: 'Sides',
    price: 320,
    tag: 'Crispy',
    desc: 'Sweet yellow onions dipped in spiced craft batter and fried to light golden crunch. Ranch dip included.',
    img: 'https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=700&q=80',
    calories: '340 kcal'
  },
  {
    id: 10,
    name: 'Creamy Apple Slaw',
    cat: 'Sides',
    price: 180,
    tag: 'Fresh',
    desc: 'Thin shredded red and green cabbage, crisp green apples, cider Dijon vinaigrette dressing.',
    img: 'https://images.unsplash.com/photo-1625938145313-8e4f0b8b8e0e?auto=format&fit=crop&w=700&q=80',
    calories: '150 kcal'
  },
  {
    id: 11,
    name: 'Chilled Soft Drink Can (250ml)',
    cat: 'Drinks',
    price: 120,
    desc: 'Ice-cold can of Coke, Sprite, Fanta, or Diet Coke.',
    img: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?auto=format&fit=crop&w=700&q=80',
    calories: '140 kcal'
  },
  {
    id: 12,
    name: 'Fresh Mint Lemonade',
    cat: 'Drinks',
    price: 220,
    tag: 'Refreshing',
    desc: 'Freshly squeezed lemons, garden mint leaves, black salt, and sparkling soda.',
    img: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=700&q=80',
    calories: '95 kcal'
  }
];

export const DEFAULT_WHATSAPP_CONFIG = {
  phoneNumber: '923261180202',
  displayPhone: '+92 326 1180202',
  branchName: 'Fry Days Lahore',
  city: 'Lahore, Pakistan'
};
