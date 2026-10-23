import React from 'react';
import { ArrowRight, MessageCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { WhatsAppConfig } from '../types';
import { FRY_DAYS_LOGO } from '../data/menu';

interface HeroProps {
  whatsAppConfig: WhatsAppConfig;
  onOpenWhatsAppWidget: () => void;
}

export const Hero: React.FC<HeroProps> = ({ whatsAppConfig, onOpenWhatsAppWidget }) => {
  return (
    <section className="relative pt-6 pb-12 sm:pt-12 sm:pb-20 overflow-hidden border-b border-[#141210]/10 dark:border-white/10 transition-colors">
      {/* Background ambient glow */}
      <div className="absolute top-10 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-[#f2b134]/15 dark:bg-[#f2b134]/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-64 sm:w-80 h-64 sm:h-80 bg-[#c8392b]/10 dark:bg-[#c8392b]/15 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
            {/* Top Logo and City Pill */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#c8392b] dark:text-[#f2b134] bg-[#c8392b]/10 dark:bg-[#f2b134]/10 px-3 py-1.5 rounded-full border border-[#c8392b]/20 dark:border-[#f2b134]/20">
                <span className="w-2 h-2 rounded-full bg-[#c8392b] dark:bg-[#f2b134] animate-pulse"></span>
                <span>Fries • Burgers • Wraps in Lahore</span>
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-[#141210] dark:text-white leading-[1.08] tracking-tight">
              Good food, <br />
              <span className="relative inline-block text-[#c8392b] dark:text-[#f2b134]">
                great fry days.
                <span className="absolute -bottom-1 left-0 right-0 h-2.5 sm:h-3 bg-[#f2b134] dark:bg-[#c8392b] -z-10 rounded-sm -rotate-1 skew-x-3 opacity-80"></span>
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-sm sm:text-base text-[#4a443f] dark:text-[#b8b0a5] max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Hand-pressed smash burgers, double-fried crispy chicken, flavor-packed wraps, and signature loaded fries made fresh to order. No freezers, no shortcuts.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1">
              <a
                href="#menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#141210] dark:bg-white text-[#f6f1e9] dark:text-[#141210] font-bold text-sm sm:text-base hover:bg-black dark:hover:bg-gray-100 transition-all shadow-lg active:scale-95"
              >
                <span>Browse the Menu</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenWhatsAppWidget}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] text-white font-bold text-sm sm:text-base hover:bg-[#20ba59] transition-all shadow-lg shadow-[#25D366]/25 active:scale-95"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Order on WhatsApp</span>
              </button>
            </div>

            {/* Meat & Delivery Quality Guarantee Badges */}
            <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 text-[11px] sm:text-xs font-semibold text-[#4a443f] dark:text-[#b8b0a5]">
              <span className="flex items-center gap-1.5 bg-white/80 dark:bg-white/5 px-2.5 py-1.5 rounded-lg border border-[#141210]/10 dark:border-white/10">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2f5d3a] dark:text-[#25D366]" /> 100% Fresh Halal Meat
              </span>
              <span className="flex items-center gap-1.5 bg-white/80 dark:bg-white/5 px-2.5 py-1.5 rounded-lg border border-[#141210]/10 dark:border-white/10">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2f5d3a] dark:text-[#25D366]" /> Cash on Delivery
              </span>
              <span className="flex items-center gap-1.5 bg-white/80 dark:bg-white/5 px-2.5 py-1.5 rounded-lg border border-[#141210]/10 dark:border-white/10">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2f5d3a] dark:text-[#25D366]" /> WhatsApp: {whatsAppConfig.displayPhone}
              </span>
            </div>

            {/* Stats */}
            <div className="pt-4 sm:pt-6 grid grid-cols-3 gap-3 sm:gap-4 border-t border-[#141210]/10 dark:border-white/10 max-w-lg mx-auto lg:mx-0">
              <div>
                <strong className="block font-display font-black text-2xl sm:text-3xl text-[#141210] dark:text-white">12k+</strong>
                <span className="text-[11px] sm:text-xs text-[#4a443f] dark:text-[#b8b0a5] font-medium">Happy Regulars</span>
              </div>
              <div>
                <strong className="block font-display font-black text-2xl sm:text-3xl text-[#141210] dark:text-white">4.8 ★</strong>
                <span className="text-[11px] sm:text-xs text-[#4a443f] dark:text-[#b8b0a5] font-medium">Google Rating</span>
              </div>
              <div>
                <strong className="block font-display font-black text-2xl sm:text-3xl text-[#141210] dark:text-white">30m</strong>
                <span className="text-[11px] sm:text-xs text-[#4a443f] dark:text-[#b8b0a5] font-medium">Avg Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              {/* Main Plate Card */}
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#141210]/10 dark:border-white/10 bg-[#141210] relative group">
                <img
                  src="https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1000&q=80"
                  alt="Loaded Cheese Fries with Fresh Jalapeños"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-5 sm:p-6 text-white">
                  <span className="inline-block self-start text-[10px] sm:text-[11px] font-black uppercase tracking-wider bg-[#f2b134] text-[#141210] px-2.5 py-1 rounded-md mb-1.5">
                    Lahore Fan Favorite
                  </span>
                  <h3 className="font-display font-black text-xl sm:text-2xl">Loaded Cheese & Jalapeño Fries</h3>
                  <p className="text-[11px] sm:text-xs text-white/80 line-clamp-1 mt-0.5">Double-fried hand-cut fries, warm cheddar sauce, pickled peppers.</p>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 bg-white/95 dark:bg-[#1c1916]/95 backdrop-blur-md border border-[#141210]/15 dark:border-white/15 rounded-2xl p-2.5 sm:p-3.5 shadow-xl flex items-center gap-2.5 animate-float-slow">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2f5d3a] dark:bg-[#25D366] animate-ping" />
                <div className="text-[11px] sm:text-xs">
                  <p className="font-bold text-[#141210] dark:text-white">Made fresh today</p>
                  <p className="text-[10px] text-[#4a443f] dark:text-[#b8b0a5]">Cut fresh every morning</p>
                </div>
              </div>

              <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 bg-[#f2b134] text-[#141210] rounded-2xl p-2.5 sm:p-3.5 shadow-xl border border-[#141210]/10 animate-float-fast">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#c8392b]" />
                  <span className="text-[11px] sm:text-xs font-black">Best Seller: Smash Double</span>
                </div>
                <p className="text-[10px] font-semibold text-[#141210]/80 mt-0.5">Rs. 890 • 100% Beef</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
