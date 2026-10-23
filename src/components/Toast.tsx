import React, { useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 2500);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#141210] text-[#f6f1e9] text-xs sm:text-sm font-semibold py-2.5 px-5 rounded-full shadow-2xl flex items-center gap-2 border border-white/10 animate-in fade-in slide-in-from-bottom-3 duration-200 pointer-events-none">
      <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
      <span>{message}</span>
    </div>
  );
};
