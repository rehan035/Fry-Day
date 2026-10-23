import React from 'react';
import { Sparkles } from 'lucide-react';
import { FRY_DAYS_LOGO } from '../data/menu';

interface LoyaltySectionProps {
  currentPoints: number;
}

export const LoyaltySection: React.FC<LoyaltySectionProps> = ({ currentPoints }) => {
  const goalPoints = 100;
  const progressPercent = Math.min(100, Math.round((currentPoints / goalPoints) * 100));

  let currentTier = 'Fry Rookie';
  if (currentPoints >= 100) currentTier = 'Fry Legend 🏆';
  else if (currentPoints >= 50) currentTier = 'Fry Fan ⭐';

  return (
    <section id="rewards" className="py-12 sm:py-20 border-b border-[#141210]/10 dark:border-white/10 bg-[#f6f1e9] dark:bg-[#12100e] transition-colors">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-[#141210] dark:bg-[#1c1916] text-[#f6f1e9] rounded-3xl p-5 sm:p-10 lg:p-12 relative overflow-hidden shadow-2xl border border-white/10">
          {/* Background Radial Glow */}
          <div className="absolute -top-24 -right-24 w-80 sm:w-96 h-80 sm:h-96 bg-[#f2b134]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left explanation */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#f2b134] bg-white/10 px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5" /> FryPoints Loyalty Club
              </div>

              <h2 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
                Earn while you eat. Free meals every month.
              </h2>

              <p className="text-xs sm:text-base text-[#f6f1e9]/80 leading-relaxed max-w-xl">
                Every <strong className="text-white">Rs. 100</strong> spent on Fry Days earns you <strong className="text-[#f2b134]">1 FryPoint</strong>. Collect 100 points and redeem a complete loaded burger or wrap meal on the house. No cards to carry — just your WhatsApp number.
              </p>

              {/* Tiers */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-2.5 sm:p-3 text-[11px] sm:text-xs">
                  <span className="block font-bold text-[#f2b134] text-xs sm:text-sm mb-0.5">Fry Rookie</span>
                  <span className="text-[#f6f1e9]/70">0–49 pts</span>
                  <p className="text-[10px] text-[#f6f1e9]/50 mt-1 hidden sm:block">Free dip with order</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-2.5 sm:p-3 text-[11px] sm:text-xs">
                  <span className="block font-bold text-[#f2b134] text-xs sm:text-sm mb-0.5">Fry Fan</span>
                  <span className="text-[#f6f1e9]/70">50–99 pts</span>
                  <p className="text-[10px] text-[#f6f1e9]/50 mt-1 hidden sm:block">Free fries upgrade</p>
                </div>
                <div className="bg-white/5 border border-[#f2b134]/30 rounded-2xl p-2.5 sm:p-3 text-[11px] sm:text-xs relative">
                  <span className="block font-bold text-[#f2b134] text-xs sm:text-sm mb-0.5">Fry Legend</span>
                  <span className="text-[#f6f1e9]/70">100+ pts</span>
                  <p className="text-[10px] text-[#f6f1e9]/50 mt-1 hidden sm:block">Free Feast on us!</p>
                </div>
              </div>
            </div>

            {/* Right Loyalty Gold Card preview */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm bg-gradient-to-br from-[#f2b134] via-[#e08e1b] to-[#c87610] text-[#141210] p-5 sm:p-7 rounded-3xl shadow-2xl sm:-rotate-2 hover:rotate-0 transition-transform duration-300 border border-white/20">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#141210]/70">
                      Member Card
                    </span>
                    <h3 className="font-display font-black text-lg sm:text-xl">FryPoints Gold</h3>
                  </div>
                  <div className="w-12 h-10 rounded-xl bg-white/90 p-1 flex items-center justify-center">
                    <img src={FRY_DAYS_LOGO} alt="Fry Days" className="w-full h-full object-contain" />
                  </div>
                </div>

                <div className="my-4 sm:my-6">
                  <div className="font-display font-black text-3xl sm:text-5xl tracking-tight text-[#141210]">
                    {currentPoints}{' '}
                    <span className="text-lg sm:text-xl font-bold text-[#141210]/70">pts</span>
                  </div>
                  <p className="text-xs font-semibold text-[#141210]/80 mt-1">
                    Current Tier: <strong className="text-[#141210]">{currentTier}</strong>
                  </p>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] sm:text-[11px] font-bold text-[#141210]/80">
                    <span>Progress to Free Feast</span>
                    <span>{progressPercent}%</span>
                  </div>
                  <div className="h-2.5 bg-[#141210]/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#141210] rounded-full transition-all duration-700"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-[#141210]/80">
                    {currentPoints >= 100
                      ? '🎉 You have a free meal ready to redeem on WhatsApp!'
                      : `${100 - currentPoints} more points to unlock your next free meal.`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
