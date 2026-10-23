import React, { useState } from 'react';
import { X, Check, MessageCircle, AlertCircle, RefreshCw } from 'lucide-react';
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
  if (!isOpen) return null;

  const [inputPhone, setInputPhone] = useState(config.displayPhone);
  const [branchName, setBranchName] = useState(config.branchName);
  const [success, setSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const sanitized = sanitizePhoneNumber(inputPhone);
    if (!sanitized || sanitized.length < 9) {
      alert('Please enter a valid phone number with country code (e.g. +92 300 1234567 or 0300 1234567)');
      return;
    }

    const updatedConfig: WhatsAppConfig = {
      phoneNumber: sanitized,
      displayPhone: inputPhone,
      branchName: branchName.trim() || 'Frydays Lahore',
      city: 'Lahore, Pakistan'
    };

    onSave(updatedConfig);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 900);
  };

  const handleTestWhatsApp = () => {
    const sanitized = sanitizePhoneNumber(inputPhone);
    const testUrl = `https://wa.me/${sanitized}?text=${encodeURIComponent(
      '🍔 Salam Frydays! This is a test WhatsApp message from the Frydays ordering website.'
    )}`;
    window.open(testUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#f6f1e9] w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-[#141210]/15"
      >
        <div className="p-5 bg-white border-b border-[#141210]/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#25D366]/20 text-[#128C7E] flex items-center justify-center">
              <MessageCircle className="w-4 h-4 fill-[#25D366]" />
            </div>
            <div>
              <h3 className="font-display font-black text-lg text-[#141210]">WhatsApp Settings</h3>
              <p className="text-[11px] text-[#4a443f]">Connect your store number</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f6f1e9] flex items-center justify-center hover:bg-[#141210] hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-5 space-y-4 text-xs">
          <div className="bg-[#25D366]/10 border border-[#25D366]/30 p-3 rounded-xl flex items-start gap-2.5 text-[#128C7E]">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              When customers click <strong>"Order on WhatsApp"</strong> or chat, messages are sent directly to this WhatsApp number.
            </p>
          </div>

          <div>
            <label className="block font-bold text-[#141210] uppercase tracking-wider text-[11px] mb-1">
              Store WhatsApp Number
            </label>
            <input
              type="text"
              value={inputPhone}
              onChange={(e) => setInputPhone(e.target.value)}
              placeholder="+92 300 0000000 or 03001234567"
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#141210]/15 bg-white focus:outline-none focus:border-[#25D366]"
              required
            />
            <p className="text-[10px] text-[#4a443f] mt-1">
              Supports Pakistani numbers (03xx) or international with country code.
            </p>
          </div>

          <div>
            <label className="block font-bold text-[#141210] uppercase tracking-wider text-[11px] mb-1">
              Branch Name
            </label>
            <input
              type="text"
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
              placeholder="Frydays Gulberg Branch"
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#141210]/15 bg-white focus:outline-none focus:border-[#25D366]"
            />
          </div>

          <div className="pt-2 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={handleTestWhatsApp}
              className="py-2.5 px-3 rounded-xl border border-[#25D366] text-[#128C7E] font-bold text-xs flex items-center gap-1.5 hover:bg-[#25D366]/10 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-[#25D366]" />
              Test Live Chat
            </button>

            <button
              type="submit"
              className="py-2.5 px-5 rounded-xl bg-[#141210] text-[#f6f1e9] font-bold text-xs hover:bg-black transition-all flex items-center gap-1.5 shadow-md"
            >
              {success ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#25D366]" /> Saved!
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
