import React from 'react';
import { MessageCircle } from 'lucide-react';
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
    <footer className="bg-[#161412] dark:bg-[#0D0C0B] text-[#F4F1EA] pt-14 pb-20 sm:pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column with Official Logo */}
          <div className="lg:col-span-5 space-y-4">
            <a href="#" className="inline-block">
              <img
                src={FRY_DAYS_LOGO}
                alt="FRY DAYS — Fries, Burgers, Wraps"
                referrerPolicy="no-referrer"
                className="h-14 sm:h-16 w-auto object-contain"
              />
            </a>
            <p className="text-xs sm:text-sm text-[#B5AEA4] leading-relaxed max-w-sm">
              Hand-pressed smash burgers, 24-hour buttermilk crispy chicken wraps, and double-fried loaded fries cooked fresh daily in Gulberg III, Lahore.
            </p>
            <div className="pt-1">
              <button
                type="button"
                onClick={onOpenWhatsAppWidget}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-[#25D366] text-[#11100E] text-xs font-bold inline-flex items-center gap-2 hover:bg-[#20BD5A] transition-colors"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span className="font-mono-num">WhatsApp: {whatsAppConfig.displayPhone}</span>
              </button>
            </div>
          </div>

          {/* Menu Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display font-bold text-sm text-white">
              Menu
            </h4>
            <ul className="space-y-2 text-xs text-[#B5AEA4]">
              <li><a href="#menu" className="hover:text-white transition-colors">Smash Burgers</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">Toasted Wraps</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">Glazed Wings</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">Loaded Cheese Fries</a></li>
              <li><a href="#combos" className="hover:text-white transition-colors">Combo Feasts</a></li>
            </ul>
          </div>

          {/* Kitchen Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display font-bold text-sm text-white">
              Fry Days
            </h4>
            <ul className="space-y-2 text-xs text-[#B5AEA4]">
              <li><a href="#rewards" className="hover:text-white transition-colors">FryPoints Club</a></li>
              <li><a href="#kitchen" className="hover:text-white transition-colors">Our Kitchen Story</a></li>
              <li><a href="#kitchen" className="hover:text-white transition-colors">Gulberg III Branch</a></li>
              <li>
                <button
                  type="button"
                  onClick={onOpenConfigModal}
                  className="hover:text-white transition-colors text-left"
                >
                  Store WhatsApp Setup
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-sm text-white">
              Lahore Dispatch
            </h4>
            <div className="space-y-1.5 text-xs text-[#B5AEA4]">
              <p>Main Market Area, Gulberg III, Lahore</p>
              <p className="font-mono-num text-white font-semibold">{whatsAppConfig.displayPhone}</p>
              <p>Daily 11:00 AM – 02:00 AM</p>
              <p className="pt-1">
                <a
                  href={`https://wa.me/${whatsAppConfig.phoneNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] font-semibold hover:underline"
                >
                  Open Direct WhatsApp Chat
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Quiet Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#B5AEA4]">
          <p>© {new Date().getFullYear()} Fry Days Lahore. All rights reserved.</p>
          <p>Freshly prepared in Gulberg III, Lahore, Pakistan.</p>
        </div>
      </div>
    </footer>
  );
};
