import React from 'react';
import { ArrowRight, MessageCircle, Plus, Sun, Moon, MapPin } from 'lucide-react';
import { Product, WhatsAppConfig } from '../types';
import { FRY_DAYS_STOREFRONT, PRODUCTS } from '../data/menu';
import { formatPKR } from '../utils/whatsapp';

interface HeroProps {
  whatsAppConfig: WhatsAppConfig;
  onOpenWhatsAppWidget: () => void;
  onAddFeaturedDeal: (product: Product) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  whatsAppConfig,
  onOpenWhatsAppWidget,
  onAddFeaturedDeal,
  darkMode,
  onToggleDarkMode
}) => {
  const featuredDeal = PRODUCTS[0]; // Fry Days Duo Feast

  return (
    <section className="pt-4 pb-10 sm:pt-8 sm:pb-16 border-b border-[#161412]/10 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Utility & Location Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 sm:pb-5 sm:mb-7 border-b border-[#161412]/10 dark:border-white/10 text-xs text-[#57524C] dark:text-[#B5AEA4]">
          <div className="flex flex-wrap items-center gap-2 font-medium">
            <span className="font-semibold text-[#161412] dark:text-[#F4F1EA]">Gulberg III, Lahore</span>
            <span aria-hidden="true">·</span>
            <span>Open 11:00 AM – 2:00 AM</span>
            <span aria-hidden="true" className="hidden md:inline">·</span>
            <span className="hidden md:inline">Dine-In, Takeaway & Fast Doorstep Delivery</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href={`https://wa.me/${whatsAppConfig.phoneNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-num font-semibold text-[#161412] dark:text-[#F2B134] hover:underline whitespace-nowrap shrink-0"
            >
              {whatsAppConfig.displayPhone}
            </a>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={onToggleDarkMode}
              className="inline-flex items-center gap-1.5 font-semibold text-[#161412] dark:text-[#F4F1EA] hover:text-[#C8392B] dark:hover:text-[#F2B134] transition-colors whitespace-nowrap shrink-0"
            >
              {darkMode ? <Sun className="w-3.5 h-3.5 text-[#F2B134]" /> : <Moon className="w-3.5 h-3.5" />}
              <span>{darkMode ? 'Light' : 'Dark'}</span>
            </button>
          </div>
        </div>

        {/* Main Hero Split — Storefront Image First on Mobile (order-1) & Dominant Right Stage on PC (lg:order-2) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-stretch">
          {/* Editorial Column (Left on PC, Immediately Below Storefront Image on Mobile) */}
          <div className="order-2 lg:order-1 lg:col-span-5 flex flex-col justify-between space-y-5 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              <div className="text-xs font-semibold tracking-wide text-[#C8392B] dark:text-[#F2B134]">
                Flagship Kitchen · Fries · Smash Burgers · Wraps
              </div>

              <h1
                className="font-display font-extrabold text-[#161412] dark:text-[#F4F1EA] tracking-tight leading-[1.06]"
                style={{ fontSize: 'clamp(2rem, 3.6vw, 3.35rem)' }}
              >
                Smashed on the flattop. Double-fried fresh daily.
              </h1>

              <p className="text-sm sm:text-base text-[#57524C] dark:text-[#B5AEA4] leading-relaxed">
                Visit our flagship Gulberg III restaurant or order directly on WhatsApp. Every burger is hand-pressed from fresh halal chuck beef, paired with twice-fried Punjab potatoes and 24-hour buttermilk chicken wraps.
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-3.5 pt-1">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                <a
                  href="#menu"
                  className="min-h-[48px] px-5 py-3 rounded-xl bg-[#C8392B] text-white font-semibold text-sm sm:text-base inline-flex items-center justify-center gap-2 hover:bg-[#B12F22] active:scale-[0.99] transition-all whitespace-nowrap shrink-0 shadow-sm"
                >
                  <span>Browse Full Menu</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </a>

                <button
                  type="button"
                  onClick={onOpenWhatsAppWidget}
                  className="min-h-[48px] px-5 py-3 rounded-xl bg-[#25D366] text-[#11100E] font-bold text-sm sm:text-base inline-flex items-center justify-center gap-2 hover:bg-[#20BD5A] active:scale-[0.99] transition-all whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>Order on WhatsApp</span>
                </button>
              </div>

              {/* Unboxed Service Metadata */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#57524C] dark:text-[#B5AEA4]">
                <span>Free Delivery over Rs. 1,500</span>
                <span aria-hidden="true">·</span>
                <span>Cash on Delivery</span>
                <span aria-hidden="true">·</span>
                <span>Outdoor & Indoor Dining</span>
              </div>
            </div>
          </div>

          {/* Storefront Showcase Column — Visible Immediately at Startup on Both Mobile & PC */}
          <div className="order-1 lg:order-2 lg:col-span-7 flex flex-col">
            <div className="w-full rounded-2xl overflow-hidden border border-[#161412]/10 dark:border-white/10 bg-[#181614] shadow-md flex flex-col h-full">
              {/* Unobstructed Flagship Storefront Image */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:flex-1 min-h-[220px] sm:min-h-[320px] overflow-hidden">
                <img
                  src={FRY_DAYS_STOREFRONT}
                  alt="Fry Days Flagship Restaurant Storefront in Lahore"
                  fetchPriority="high"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Clean Contiguous Bottom Bar Under Storefront Photo (Does Not Obstruct Building Facade) */}
              <div className="px-4 py-3 sm:px-5 sm:py-3.5 bg-white dark:bg-[#181614] border-t border-[#161412]/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <MapPin className="w-4 h-4 text-[#C8392B] dark:text-[#F2B134] shrink-0" />
                  <span className="font-semibold text-[#161412] dark:text-[#F4F1EA]">
                    Fry Days Flagship · Gulberg III
                  </span>
                  <span aria-hidden="true" className="text-[#57524C] dark:text-[#B5AEA4] hidden sm:inline">·</span>
                  <span className="text-xs text-[#57524C] dark:text-[#B5AEA4] hidden sm:inline">
                    Try our {featuredDeal.name}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onAddFeaturedDeal(featuredDeal)}
                  className="min-h-[40px] px-3.5 py-1.5 rounded-xl bg-[#F2B134] hover:bg-[#E09E22] text-[#161412] font-bold text-xs inline-flex items-center gap-1.5 active:scale-[0.98] transition-all whitespace-nowrap shrink-0"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Add Duo Feast · {formatPKR(featuredDeal.price)}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Quantitative Proof Strip */}
        <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-[#161412]/10 dark:border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          <div>
            <div className="font-mono-num font-bold text-xl sm:text-2xl text-[#161412] dark:text-[#F4F1EA]">
              12,400+
            </div>
            <div className="text-xs text-[#57524C] dark:text-[#B5AEA4] mt-0.5">
              Regular diners served across Lahore since 2019
            </div>
          </div>

          <div>
            <div className="font-mono-num font-bold text-xl sm:text-2xl text-[#161412] dark:text-[#F4F1EA]">
              4.8 / 5.0
            </div>
            <div className="text-xs text-[#57524C] dark:text-[#B5AEA4] mt-0.5">
              Verified rating across 1,850+ local orders
            </div>
          </div>

          <div>
            <div className="font-mono-num font-bold text-xl sm:text-2xl text-[#161412] dark:text-[#F4F1EA]">
              28–35 min
            </div>
            <div className="text-xs text-[#57524C] dark:text-[#B5AEA4] mt-0.5">
              Hot kitchen-to-doorstep dispatch in Gulberg & DHA
            </div>
          </div>

          <div>
            <div className="font-mono-num font-bold text-lg sm:text-2xl text-[#161412] dark:text-[#F2B134]">
              {whatsAppConfig.displayPhone}
            </div>
            <div className="text-xs text-[#57524C] dark:text-[#B5AEA4] mt-0.5">
              Direct WhatsApp line — zero third-party fees
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
