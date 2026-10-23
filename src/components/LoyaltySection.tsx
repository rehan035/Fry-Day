import React from 'react';
import { FRY_DAYS_LOGO } from '../data/menu';

interface LoyaltySectionProps {
  currentPoints: number;
}

export const LoyaltySection: React.FC<LoyaltySectionProps> = ({ currentPoints }) => {
  const goalPoints = 100;
  const progressPercent = Math.min(100, Math.round((currentPoints / goalPoints) * 100));

  let currentTier = 'Fry Rookie';
  if (currentPoints >= 100) currentTier = 'Fry Legend';
  else if (currentPoints >= 50) currentTier = 'Fry Regular';

  return (
    <section id="rewards" className="py-14 sm:py-20 border-b border-[#161412]/10 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Explanation (Unboxed Editorial Hierarchy) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="text-xs font-semibold text-[#C8392B] dark:text-[#F2B134]">
              FryPoints Loyalty Club · Automatic on WhatsApp Orders
            </div>

            <h2 className="font-display font-bold text-2xl sm:text-4xl text-[#161412] dark:text-[#F4F1EA] tracking-tight leading-tight">
              Every Rs. 100 spent earns 1 FryPoint toward a complimentary feast.
            </h2>

            <p className="text-sm sm:text-base text-[#57524C] dark:text-[#B5AEA4] leading-relaxed max-w-2xl">
              No plastic cards or app downloads required. Your FryPoints balance is tied directly to your WhatsApp phone number. Reach 100 points and redeem any signature burger or wrap meal on the house.
            </p>

            {/* Hairline-divided tier breakdown (No nested bordered cards) */}
            <div className="pt-4 border-t border-[#161412]/10 dark:border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <div className="font-mono-num text-xs font-semibold text-[#57524C] dark:text-[#B5AEA4]">
                  01 · 0–49 PTS
                </div>
                <div className="font-display font-bold text-base text-[#161412] dark:text-[#F4F1EA] mt-0.5">
                  Fry Rookie
                </div>
                <p className="text-xs text-[#57524C] dark:text-[#B5AEA4] mt-1">
                  Complimentary house garlic or chipotle dip on every order.
                </p>
              </div>

              <div>
                <div className="font-mono-num text-xs font-semibold text-[#57524C] dark:text-[#B5AEA4]">
                  02 · 50–99 PTS
                </div>
                <div className="font-display font-bold text-base text-[#161412] dark:text-[#F4F1EA] mt-0.5">
                  Fry Regular
                </div>
                <p className="text-xs text-[#57524C] dark:text-[#B5AEA4] mt-1">
                  Free upgrade to large double-fried skin-on fries.
                </p>
              </div>

              <div>
                <div className="font-mono-num text-xs font-semibold text-[#C8392B] dark:text-[#F2B134]">
                  03 · 100+ PTS
                </div>
                <div className="font-display font-bold text-base text-[#161412] dark:text-[#F4F1EA] mt-0.5">
                  Fry Legend
                </div>
                <p className="text-xs text-[#57524C] dark:text-[#B5AEA4] mt-1">
                  Full Smash Burger or Crispy Wrap combo meal on the house.
                </p>
              </div>
            </div>
          </div>

          {/* Right Single-Elevation Member Pass */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-[#F2B134] text-[#161412] p-6 sm:p-8 rounded-2xl shadow-lg space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold text-[#161412]/75">
                    Lahore Diner Pass
                  </div>
                  <h3 className="font-display font-bold text-xl">
                    FryPoints Balance
                  </h3>
                </div>
                <img
                  src={FRY_DAYS_LOGO}
                  alt="Fry Days"
                  referrerPolicy="no-referrer"
                  className="h-10 w-auto object-contain"
                />
              </div>

              <div>
                <div className="font-mono-num font-bold text-4xl sm:text-5xl tracking-tight text-[#161412]">
                  {currentPoints} <span className="text-lg font-semibold">pts</span>
                </div>
                <div className="text-xs font-medium text-[#161412]/80 mt-1">
                  Active Standing: <strong>{currentTier}</strong>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#161412]/15">
                <div className="flex justify-between text-xs font-semibold text-[#161412]/85">
                  <span>Reward Unlock Progress</span>
                  <span className="font-mono-num">{progressPercent}%</span>
                </div>
                <div className="h-2 bg-[#161412]/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#161412] rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <p className="text-xs text-[#161412]/80">
                  {currentPoints >= 100
                    ? 'You have unlocked a complimentary meal — mention FryPoints on WhatsApp checkout.'
                    : `Add ${100 - currentPoints} more points from your bag to unlock a free combo meal.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
