import React from 'react';
import { MessageCircle, Instagram, MapPin, Phone, Heart } from 'lucide-react';
import { WhatsAppConfig } from '../types';
import { FRY_DAYS_LOGO } from '../data/menu';

interface FooterProps {
  whatsAppConfig: WhatsAppConfig;
  onOpenWhatsAppWidget: () => void;
  onOpenConfigModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  whatsAppConfig,
  onOpenWhatsAppWidget,
  onOpenConfigModal
}) => {
  return (
    <footer className="bg-[#141210] dark:bg-[#0a0908] text-[#f6f1e9] pt-12 sm:pt-16 pb-24 md:pb-12 border-t border-white/10 transition-colors">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 mb-10">
          {/* Brand info with Official Logo */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="inline-block">
              <img
                src={FRY_DAYS_LOGO}
                alt="FRY DAYS"
                className="h-12 sm:h-14 w-auto object-contain drop-shadow"
              />
            </a>
            <p className="text-xs sm:text-sm text-[#f6f1e9]/70 leading-relaxed max-w-sm">
              Hand-pressed burgers, double-fried crispy chicken, flavor-packed wraps, and loaded fries made fresh in Lahore. No compromises.
            </p>
            <div className="pt-1 flex items-center gap-3">
              <button
                onClick={onOpenWhatsAppWidget}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#25D366] text-white text-xs font-bold hover:bg-[#20ba59] transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp: {whatsAppConfig.displayPhone}</span>
              </button>
            </div>
          </div>

          {/* Column 1: Food Menu */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[#f2b134] mb-3">
              Food Menu
            </h4>
            <ul className="space-y-2 text-xs text-[#f6f1e9]/70">
              <li>
                <a href="#menu" className="hover:text-white transition-colors">Smash Beef Burgers</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">Crispy Chicken & Wraps</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">Buffalo & Honey Wings</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">Loaded Cheese Fries</a>
              </li>
              <li>
                <a href="#deals" className="hover:text-white transition-colors">Combo Feast Deals</a>
              </li>
            </ul>
          </div>

          {/* Column 2: Rewards & Story */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[#f2b134] mb-3">
              Fry Days Club
            </h4>
            <ul className="space-y-2 text-xs text-[#f6f1e9]/70">
              <li>
                <a href="#rewards" className="hover:text-white transition-colors">FryPoints Rewards</a>
              </li>
              <li>
                <a href="#story" className="hover:text-white transition-colors">Our Kitchen Story</a>
              </li>
              <li>
                <a href="#visit" className="hover:text-white transition-colors">Lahore Location & Hours</a>
              </li>
              <li>
                <button
                  onClick={onOpenConfigModal}
                  className="hover:text-white transition-colors text-left"
                >
                  Configure WhatsApp #
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[#f2b134] mb-3">
              Quick Connect
            </h4>
            <ul className="space-y-2 text-xs text-[#f6f1e9]/70">
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#f2b134]" /> Gulberg III, Lahore
              </li>
              <li className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#f2b134]" /> {whatsAppConfig.displayPhone}
              </li>
              <li>
                <a
                  href={`https://wa.me/${whatsAppConfig.phoneNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-[#25D366]"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" /> Order via WhatsApp ↗
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#f2b134]" /> @frydays.pk ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#f6f1e9]/50">
          <p>© {new Date().getFullYear()} Fry Days Lahore. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Freshly fried with <Heart className="w-3.5 h-3.5 text-[#c8392b] fill-current" /> in Lahore, Pakistan
          </p>
        </div>
      </div>
    </footer>
  );
};
