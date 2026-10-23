import React from 'react';
import { MapPin, Clock, MessageCircle, ExternalLink } from 'lucide-react';
import { WhatsAppConfig } from '../types';
import smashBurgerImg from '../assets/images/smash_burger_closeup_1792772949139.jpg';
import chickenWrapImg from '../assets/images/crispy_chicken_wrap_1792772950951.jpg';
import loadedFriesImg from '../assets/images/loaded_cheese_fries_1792772950224.jpg';

interface StoryAndVisitProps {
  whatsAppConfig: WhatsAppConfig;
  onOpenWhatsAppWidget: () => void;
}

export const StoryAndVisit: React.FC<StoryAndVisitProps> = ({
  whatsAppConfig,
  onOpenWhatsAppWidget
}) => {
  return (
    <section id="kitchen" className="py-14 sm:py-20 border-b border-[#161412]/10 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Craftsmanship & Kitchen Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="text-xs font-semibold text-[#C8392B] dark:text-[#F2B134]">
              Our Lahore Kitchen · Established 2019
            </div>

            <h2 className="font-display font-bold text-2xl sm:text-4xl text-[#161412] dark:text-[#F4F1EA] leading-tight">
              Started with one fryer and a refusal to serve frozen patties.
            </h2>

            <p className="text-sm sm:text-base text-[#57524C] dark:text-[#B5AEA4] leading-relaxed">
              Fry Days began in 2019 in a small Gulberg kitchen with a straightforward conviction: fast food does not have to taste factory-made. Every morning, our prep team hand-slices fresh local potatoes, double-fries them so they stay crisp on delivery across Lahore, and grinds fresh chuck beef for the flat-top.
            </p>

            <div className="pt-4 border-t border-[#161412]/10 dark:border-white/10 grid grid-cols-2 gap-6 text-xs sm:text-sm">
              <div>
                <h3 className="font-display font-bold text-[#161412] dark:text-[#F4F1EA]">
                  100% Fresh Halal Cuts
                </h3>
                <p className="text-[#57524C] dark:text-[#B5AEA4] mt-1">
                  Never-frozen chuck beef and 24-hour buttermilk-brined chicken thighs.
                </p>
              </div>
              <div>
                <h3 className="font-display font-bold text-[#161412] dark:text-[#F4F1EA]">
                  Direct Kitchen Dispatch
                </h3>
                <p className="text-[#57524C] dark:text-[#B5AEA4] mt-1">
                  Order directly via WhatsApp with zero third-party platform markups.
                </p>
              </div>
            </div>
          </div>

          {/* 3-Image Editorial Grid using Bundled Local Studio Photography */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-[#1C1916]">
              <img
                src={smashBurgerImg}
                alt="Hand-pressed double smash burger on toasted brioche"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-4">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#1C1916]">
                <img
                  src={chickenWrapImg}
                  alt="Crispy buttermilk chicken wrap sliced on butcher paper"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#1C1916]">
                <img
                  src={loadedFriesImg}
                  alt="Loaded cheddar cheese and jalapeño fries"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Location, Hours & Direct WhatsApp Dispatch Strip */}
        <div className="pt-12 border-t border-[#161412]/10 dark:border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Gulberg III Branch */}
          <div className="bg-white dark:bg-[#181614] p-6 rounded-2xl border border-[#161412]/10 dark:border-white/10 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#C8392B] dark:text-[#F2B134]">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>Dine-In & Takeaway</span>
              </div>
              <h3 className="font-display font-bold text-lg text-[#161412] dark:text-[#F4F1EA]">
                Gulberg III, Lahore
              </h3>
              <p className="text-xs sm:text-sm text-[#57524C] dark:text-[#B5AEA4] leading-relaxed">
                Main Market Commercial Area, Gulberg III, Lahore. Fast delivery across Gulberg, DHA Phases 1–8, Cavalry Ground, Model Town, Cantt & Johar Town.
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=Gulberg+III+Lahore"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[#161412] dark:text-[#F2B134] hover:underline"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 2: Kitchen Hours */}
          <div className="bg-white dark:bg-[#181614] p-6 rounded-2xl border border-[#161412]/10 dark:border-white/10 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#C8392B] dark:text-[#F2B134]">
                <Clock className="w-4 h-4 shrink-0" />
                <span>Daily Service Hours</span>
              </div>
              <h3 className="font-display font-bold text-lg text-[#161412] dark:text-[#F4F1EA]">
                Open Late Night
              </h3>
              <div className="text-xs space-y-2 text-[#57524C] dark:text-[#B5AEA4]">
                <div className="flex justify-between pb-1.5 border-b border-[#161412]/10 dark:border-white/10">
                  <span>Monday – Thursday</span>
                  <span className="font-mono-num font-semibold text-[#161412] dark:text-white">11:00 AM – 02:00 AM</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-[#161412]/10 dark:border-white/10">
                  <span>Friday</span>
                  <span className="font-mono-num font-semibold text-[#161412] dark:text-white">02:00 PM – 03:00 AM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday – Sunday</span>
                  <span className="font-mono-num font-semibold text-[#161412] dark:text-white">11:00 AM – 03:00 AM</span>
                </div>
              </div>
            </div>
            <div className="mt-5 text-xs font-medium text-[#57524C] dark:text-[#B5AEA4]">
              Hot kitchen dispatch active all night
            </div>
          </div>

          {/* Card 3: Direct WhatsApp Order Line */}
          <div className="bg-[#161412] dark:bg-[#221F1C] text-white p-6 rounded-2xl flex flex-col justify-between">
            <div className="space-y-2">
              <div className="text-xs font-semibold text-[#25D366]">
                Instant WhatsApp Ordering
              </div>
              <h3 className="font-display font-bold text-xl text-white">
                {whatsAppConfig.displayPhone}
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                Send your order, share your live location pin in Lahore, or request custom spice levels directly on WhatsApp.
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenWhatsAppWidget}
              className="mt-5 min-h-[44px] w-full px-4 rounded-xl bg-[#25D366] text-[#11100E] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-[#20BD5A] transition-colors"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span>Start WhatsApp Order</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
