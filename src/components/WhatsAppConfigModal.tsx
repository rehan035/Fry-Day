import React, { useState, useEffect } from 'react';
import { X, Check, MessageCircle } from 'lucide-react';
import { WhatsAppConfig } from '../types';
import { sanitizePhoneNumber } from '../utils/whatsapp';

interface WhatsAppConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: WhatsAppConfig;
  onSave: (newConfig: WhatsAppConfig) => void;
}

export const WhatsAppConfigModal: React.FC<WhatsAppConfigModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave
}) => {
  // Declare all hooks before conditional return (Fixes React Rules of Hooks bug)
  const [inputPhone, setInputPhone] = useState(config.displayPhone);
  const [branchName, setBranchName] = useState(config.branchName);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setInputPhone(config.displayPhone);
      setBranchName(config.branchName);
      setErrorMsg('');
      setSuccess(false);
    }
  }, [isOpen, config]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const sanitized = sanitizePhoneNumber(inputPhone);
    if (!sanitized || sanitized.length < 9) {
      setErrorMsg('Enter a valid phone number with country code (e.g. +92 326 1180202).');
      return;
    }

    setErrorMsg('');
    const updatedConfig: WhatsAppConfig = {
      phoneNumber: sanitized,
      displayPhone: inputPhone.trim(),
      branchName: branchName.trim() || 'Fry Days Lahore',
      city: 'Lahore, Pakistan'
    };

    onSave(updatedConfig);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 700);
  };

  const handleTestWhatsApp = () => {
    const sanitized = sanitizePhoneNumber(inputPhone);
    const testUrl = `https://wa.me/${sanitized}?text=${encodeURIComponent(
      'Salam Fry Days! Testing our live WhatsApp ordering line.'
    )}`;
    window.open(testUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="wa-config-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#F7F5F0] dark:bg-[#181614] w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-[#161412]/10 dark:border-white/10"
      >
        <div className="px-5 py-4 bg-white dark:bg-[#141210] border-b border-[#161412]/10 dark:border-white/10 flex items-center justify-between">
          <div>
            <h3 id="wa-config-title" className="font-display font-bold text-lg text-[#161412] dark:text-[#F4F1EA]">
              Store WhatsApp Line
            </h3>
            <p className="text-xs text-[#57524C] dark:text-[#B5AEA4]">
              Configure destination number for direct orders
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close settings"
            className="min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center text-[#161412] dark:text-[#F4F1EA] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-5 space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-[#161412] dark:text-[#F4F1EA] mb-1.5">
              Store WhatsApp Number
            </label>
            <input
              type="text"
              value={inputPhone}
              onChange={(e) => setInputPhone(e.target.value)}
              placeholder="+92 326 1180202"
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-[#161412]/15 dark:border-white/15 bg-white dark:bg-[#221F1C] text-[#161412] dark:text-white focus:outline-none focus:border-[#25D366]"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-[#161412] dark:text-[#F4F1EA] mb-1.5">
              Branch Name
            </label>
            <input
              type="text"
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
              placeholder="Fry Days Gulberg III"
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-[#161412]/15 dark:border-white/15 bg-white dark:bg-[#221F1C] text-[#161412] dark:text-white focus:outline-none focus:border-[#25D366]"
            />
          </div>

          {errorMsg && (
            <p className="text-xs font-semibold text-[#C8392B] dark:text-[#FF6B6B]">
              {errorMsg}
            </p>
          )}

          <div className="pt-2 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={handleTestWhatsApp}
              className="min-h-[44px] px-3.5 rounded-xl border border-[#161412]/15 dark:border-white/15 text-[#161412] dark:text-[#F4F1EA] font-semibold text-xs inline-flex items-center gap-1.5 hover:border-[#25D366] transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Test Link</span>
            </button>

            <button
              type="submit"
              className="min-h-[44px] px-5 rounded-xl bg-[#161412] dark:bg-[#F2B134] text-[#F7F5F0] dark:text-[#161412] font-bold text-xs inline-flex items-center gap-1.5"
            >
              {success ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Saved</span>
                </>
              ) : (
                <span>Save Number</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
