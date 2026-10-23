import React from 'react';
import { MapPin, Clock, MessageCircle, ExternalLink, ShieldCheck, HeartHandshake } from 'lucide-react';
import { WhatsAppConfig } from '../types';

interface StoryAndVisitProps {
  whatsAppConfig: WhatsAppConfig;
  onOpenWhatsAppWidget: () => void;
}

export const StoryAndVisit: React.FC<StoryAndVisitProps> = ({
  whatsAppConfig,
  onOpenWhatsAppWidget
}) => {
  return (
    <>
      {/* Story Section */}
      <section id="story" className="py-12 sm:py-20 border-b border-[#141210]/10 dark:border-white/10 bg-white dark:bg-[#12100e] transition-colors">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-6 space-y-4 sm:space-y-5">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#c8392b] dark:text-[#f2b134] bg-[#c8392b]/10 dark:bg-[#f2b134]/10 px-3 py-1 rounded-full">
                Lahore Born & Raised
              </span>
              <h2 className="font-display font-black text-2xl sm:text-4xl text-[#141210] dark:text-white leading-tight">
                Started with one fryer and an uncompromising standard.
              </h2>
              <p className="text-xs sm:text-sm text-[#4a443f] dark:text-[#b8b0a5] leading-relaxed">
                Fry Days started back in 2019 in Lahore with a simple principle: <span className="font-semibold text-[#141210] dark:text-white">fast food shouldn't taste like it came from a frozen warehouse.</span>
              </p>
              <p className="text-xs sm:text-sm text-[#4a443f] dark:text-[#b8b0a5] leading-relaxed">
                We hand-cut our fries every morning, double-fry them for that unbeatable crunch, hand-press our smash beef patties on the screaming hot flat-top, roll our chicken into toasted wraps, and soak our crispy tenders for 24 hours in buttermilk. Zero shortcuts.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2.5 bg-[#f6f1e9] dark:bg-white/5 p-3 rounded-xl border border-[#141210]/5 dark:border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-[#f2b134]/20 flex items-center justify-center text-[#e08e1b] shrink-0">
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#141210] dark:text-white">100% Halal</h4>
                    <p className="text-[10px] text-[#4a443f] dark:text-[#b8b0a5]">Fresh daily meat cuts</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 bg-[#f6f1e9] dark:bg-white/5 p-3 rounded-xl border border-[#141210]/5 dark:border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-[#25D366]/20 flex items-center justify-center text-[#128C7E] dark:text-[#25D366] shrink-0">
                    <HeartHandshake className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#141210] dark:text-white">Direct Kitchen</h4>
                    <p className="text-[10px] text-[#4a443f] dark:text-[#b8b0a5]">Direct WhatsApp care</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80"
                    alt="Sizzling smash burger on griddle"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
                    <img
                      src="https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=600&q=80"
                      alt="Crispy Chicken Wrap"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
                    <img
                      src="https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=600&q=80"
                      alt="Golden salted fries"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visit & Locations */}
      <section id="visit" className="py-12 sm:py-20 border-b border-[#141210]/10 dark:border-white/10 bg-[#f6f1e9] dark:bg-[#1a1714] transition-colors">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#c8392b] dark:text-[#f2b134] bg-[#c8392b]/10 dark:bg-[#f2b134]/10 px-3 py-1 rounded-full">
              Dine-In, Takeaway & Delivery
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-[#141210] dark:text-white mt-2">
              Visit our Lahore Kitchen
            </h2>
            <p className="text-xs sm:text-sm text-[#4a443f] dark:text-[#b8b0a5] mt-1.5">
              Serving till 2:00 AM nightly. Walk in or WhatsApp us your order.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Card 1: Address */}
            <div className="bg-white dark:bg-[#1c1916] p-5 sm:p-6 rounded-2xl border border-[#141210]/10 dark:border-white/10 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#c8392b]/10 text-[#c8392b] dark:text-[#ff6b6b] flex items-center justify-center mb-3">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="font-display font-black text-lg text-[#141210] dark:text-white">Location</h3>
                <p className="text-xs sm:text-sm text-[#4a443f] dark:text-[#b8b0a5] mt-1 leading-relaxed">
                  Gulberg III, Main Market Area, Lahore, Pakistan
                </p>
                <p className="text-[11px] text-[#4a443f] dark:text-[#b8b0a5] mt-2">
                  Delivery to: Gulberg, DHA, Cavalry, Model Town, Cantt, Johar Town & Garden Town.
                </p>
              </div>
              <a
                href="https://maps.google.com/?q=Gulberg+III+Lahore"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#c8392b] dark:text-[#f2b134] hover:underline"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Card 2: Operating Hours */}
            <div className="bg-white dark:bg-[#1c1916] p-5 sm:p-6 rounded-2xl border border-[#141210]/10 dark:border-white/10 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#f2b134]/20 text-[#e08e1b] flex items-center justify-center mb-3">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-display font-black text-lg text-[#141210] dark:text-white">Opening Hours</h3>
                <div className="text-xs text-[#4a443f] dark:text-[#b8b0a5] mt-2 space-y-1.5">
                  <div className="flex justify-between border-b border-[#141210]/5 dark:border-white/5 pb-1">
                    <span>Monday – Thursday</span>
                    <strong className="text-[#141210] dark:text-white">11:00 AM – 2:00 AM</strong>
                  </div>
                  <div className="flex justify-between border-b border-[#141210]/5 dark:border-white/5 pb-1">
                    <span>Friday (Jummah Break 1-2pm)</span>
                    <strong className="text-[#141210] dark:text-white">2:00 PM – 3:00 AM</strong>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span>Saturday – Sunday</span>
                    <strong className="text-[#141210] dark:text-white">11:00 AM – 3:00 AM</strong>
                  </div>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2f5d3a] dark:text-[#25D366] mt-4">
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
                Currently Open & Frying
              </span>
            </div>

            {/* Card 3: WhatsApp Dispatch */}
            <div className="bg-gradient-to-br from-[#128C7E] to-[#25D366] text-white p-5 sm:p-6 rounded-2xl shadow-lg flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center mb-3">
                  <MessageCircle className="w-5 h-5 fill-white" />
                </div>
                <h3 className="font-display font-black text-xl text-white">Direct WhatsApp Order</h3>
                <p className="text-xs sm:text-sm text-white/90 mt-1 leading-relaxed">
                  Send your location pin, voice note or customized order directly on WhatsApp.
                </p>
                <div className="mt-3 text-lg font-display font-black tracking-wide">
                  {whatsAppConfig.displayPhone}
                </div>
              </div>

              <button
                onClick={onOpenWhatsAppWidget}
                className="mt-4 w-full py-2.5 px-4 rounded-xl bg-white text-[#128C7E] font-bold text-xs flex items-center justify-center gap-2 hover:bg-gray-100 transition-all shadow-md active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-[#128C7E]" />
                <span>Chat on WhatsApp Now</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
