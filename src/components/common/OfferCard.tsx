import React from 'react';
import { Tag, Calendar, Copy, Check } from 'lucide-react';
import { BusinessOffer } from '../../types';

interface OfferCardProps {
  offer: BusinessOffer;
  onViewOffer: (offer: BusinessOffer) => void;
  onSelectBusiness?: (businessId: string) => void;
  compact?: boolean;
}

export const OfferCard: React.FC<OfferCardProps> = ({
  offer,
  onViewOffer,
  onSelectBusiness,
  compact = false,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(offer.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (compact) {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={() => onViewOffer(offer)}
        onKeyDown={(e) => e.key === 'Enter' && onViewOffer(offer)}
        className="group flex-none w-[270px] bg-gradient-to-br from-[#071B52] via-[#0757D9] to-[#008CFF] text-white p-4 rounded-2xl shadow-md cursor-pointer active:scale-[0.98] transition-all relative overflow-hidden"
      >
        {/* Glow ambient background effect */}
        <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#08D9F5]/30 rounded-full blur-xl pointer-events-none" />

        <div className="flex items-center justify-between gap-2 relative z-10">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#08D9F5] bg-white/10 px-2 py-0.5 rounded-full backdrop-blur-xs">
            {offer.discount}
          </span>
          <span className="text-[11px] text-white/80 flex items-center gap-1 font-medium">
            <Calendar className="w-3 h-3 text-[#08D9F5]" />
            {offer.validUntil}
          </span>
        </div>

        <h4 className="font-bold text-sm text-white mt-2.5 line-clamp-1 relative z-10">
          {offer.title}
        </h4>

        <p className="text-xs text-white/80 mt-0.5 line-clamp-1 relative z-10">
          {offer.businessName}
        </p>

        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-white/15 relative z-10">
          <div className="flex items-center gap-1.5 bg-black/25 px-2.5 py-1 rounded-lg">
            <span className="font-mono text-xs font-bold text-white tracking-wider">
              {offer.code}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onViewOffer(offer);
            }}
            className="text-xs font-bold text-[#071B52] bg-white hover:bg-slate-100 px-3 py-1 rounded-lg active:scale-95 transition-transform"
          >
            Claim
          </button>
        </div>
      </div>
    );
  }

  // Full Card for Offers Screen
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onViewOffer(offer)}
      onKeyDown={(e) => e.key === 'Enter' && onViewOffer(offer)}
      className="group bg-white rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md cursor-pointer transition-all overflow-hidden relative"
    >
      {/* Top Banner with Tizara Brand Gradient */}
      <div className="bg-tizara-gradient p-4 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-xs px-2.5 py-1 rounded-full">
            <Tag className="w-3.5 h-3.5 text-[#08D9F5]" />
            <span className="text-xs font-extrabold tracking-wide text-white">
              {offer.discount}
            </span>
          </div>

          <div className="flex items-center gap-1 text-xs text-white/90">
            <Calendar className="w-3.5 h-3.5 text-[#08D9F5]" />
            <span>Valid till {offer.validUntil}</span>
          </div>
        </div>

        <h3 className="font-bold text-lg text-white mt-2.5 line-clamp-1 relative z-10">
          {offer.title}
        </h3>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (onSelectBusiness) onSelectBusiness(offer.businessId);
          }}
          className="text-xs text-white/90 font-medium hover:underline flex items-center gap-1 mt-1 relative z-10"
        >
          <span>at {offer.businessName}</span>
          <span className="text-[#08D9F5]">→</span>
        </button>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-3">
        <p className="text-xs text-[#667085] line-clamp-2">
          {offer.description}
        </p>

        <div className="flex items-center justify-between pt-1">
          <button
            type="button"
            onClick={handleCopyCode}
            aria-label="Copy promo coupon code"
            className="flex items-center gap-1.5 bg-[#F5F8FC] border border-dashed border-[#008CFF] px-3 py-1.5 rounded-xl text-xs font-mono font-bold text-[#0757D9] hover:bg-[#EBF3FF] transition-colors"
          >
            <span>{offer.code}</span>
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-[#667085]" />
            )}
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onViewOffer(offer);
            }}
            className="px-4 py-2 rounded-xl bg-tizara-vibrant text-white text-xs font-bold active:scale-95 transition-transform shadow-xs"
          >
            View Offer
          </button>
        </div>
      </div>
    </div>
  );
};
