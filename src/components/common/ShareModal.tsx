import React, { useState } from 'react';
import { X, Copy, Check, MessageSquare, Send, Share2 } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  title,
  url = window.location.href,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard?.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl animate-in slide-in-from-bottom duration-200 pb-safe"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-[#0757D9]" />
            <h3 className="font-bold text-base text-[#172033]">Share via Tizara</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-[#667085] mt-3">
          Share <span className="font-bold text-[#172033]">{title}</span> with your friends and network.
        </p>

        {/* Share buttons */}
        <div className="grid grid-cols-3 gap-3 my-5">
          <button
            type="button"
            onClick={handleCopy}
            className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-[#F5F8FC] hover:bg-[#EBF3FF] transition-colors"
          >
            <div className="w-11 h-11 rounded-full bg-white shadow-xs flex items-center justify-center text-[#0757D9]">
              {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
            </div>
            <span className="text-[11px] font-semibold text-[#172033]">
              {copied ? 'Copied!' : 'Copy Link'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out ${title} on Tizara: ${url}`)}`, '_blank');
              onClose();
            }}
            className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-[#F5F8FC] hover:bg-[#EBF3FF] transition-colors"
          >
            <div className="w-11 h-11 rounded-full bg-emerald-500 text-white shadow-xs flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-[#172033]">WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title, url }).catch(() => {});
              } else {
                handleCopy();
              }
              onClose();
            }}
            className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-[#F5F8FC] hover:bg-[#EBF3FF] transition-colors"
          >
            <div className="w-11 h-11 rounded-full bg-tizara-vibrant text-white shadow-xs flex items-center justify-center">
              <Send className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-[#172033]">More</span>
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-slate-100 font-bold text-xs text-[#172033]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
