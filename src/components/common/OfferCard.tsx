import React from 'react';
import { Tag, Calendar, Copy, Check } from 'lucide-react';
import { BusinessOffer } from '../../types';

interface OfferCardProps {
  offer: BusinessOffer;
  onViewOffer: (offer: BusinessOffer) => void;
  onSelectBusiness?: (businessId: string) => void;
  compact?: boolean;
  colorThemeIndex?: number;
}

export interface CouponTheme {
  id: string;
  name: string;
  gradient: string;
  glow: string;
  claimText: string;
  accentIcon: string;
}

export const COUPON_THEMES: CouponTheme[] = [
  // CARD 1: Blue -> Cyan (#0757D9 -> #08D9F5)
  {
    id: 'blue-cyan',
    name: 'Blue to Cyan',
    gradient: 'linear-gradient(135deg, #0757D9 0%, #08D9F5 100%)',
    glow: 'rgba(8, 217, 245, 0.35)',
    claimText: '#0757D9',
    accentIcon: '#E0F9FE',
  },
  // CARD 2: Purple -> Violet (#7C3AED -> #A855F7)
  {
    id: 'purple-violet',
    name: 'Purple to Violet',
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
    glow: 'rgba(168, 85, 247, 0.35)',
    claimText: '#6D28D9',
    accentIcon: '#F3E8FF',
  },
  // CARD 3: Orange -> Pink (#EA580C -> #F43F5E)
  {
    id: 'orange-pink',
    name: 'Orange to Pink',
    gradient: 'linear-gradient(135deg, #EA580C 0%, #F43F5E 100%)',
    glow: 'rgba(244, 63, 94, 0.35)',
    claimText: '#BE123C',
    accentIcon: '#FFE4E6',
  },
  // CARD 4: Green -> Teal (#059669 -> #0D9488)
  {
    id: 'green-teal',
    name: 'Green to Teal',
    gradient: 'linear-gradient(135deg, #059669 0%, #0D9488 100%)',
    glow: 'rgba(13, 148, 136, 0.35)',
    claimText: '#0F766E',
    accentIcon: '#CCFBF1',
  },
  // CARD 5: Indigo -> Blue (#4338CA -> #2563EB)
  {
    id: 'indigo-blue',
    name: 'Indigo to Blue',
    gradient: 'linear-gradient(135deg, #4338CA 0%, #2563EB 100%)',
    glow: 'rgba(37, 99, 235, 0.35)',
    claimText: '#1D4ED8',
    accentIcon: '#DBEAFE',
  },
  // CARD 6: Pink -> Purple (#DB2777 -> #9333EA)
  {
    id: 'pink-purple',
    name: 'Pink to Purple',
    gradient: 'linear-gradient(135deg, #DB2777 0%, #9333EA 100%)',
    glow: 'rgba(219, 39, 119, 0.35)',
    claimText: '#9333EA',
    accentIcon: '#FAE8FF',
  },
];

/**
 * Deterministically get coupon theme by index or offer ID string
 */
export function getCouponTheme(index?: number, offerId?: string): CouponTheme {
  if (typeof index === 'number') {
    const safeIdx = ((index % COUPON_THEMES.length) + COUPON_THEMES.length) % COUPON_THEMES.length;
    return COUPON_THEMES[safeIdx];
  }
  if (offerId) {
    let hash = 0;
    for (let i = 0; i < offerId.length; i++) {
      hash = (hash << 5) - hash + offerId.charCodeAt(i);
      hash |= 0;
    }
    const safeIdx = Math.abs(hash) % COUPON_THEMES.length;
    return COUPON_THEMES[safeIdx];
  }
  return COUPON_THEMES[0];
}

export const OfferCard: React.FC<OfferCardProps> = ({
  offer,
  onViewOffer,
  onSelectBusiness,
  compact = false,
  colorThemeIndex,
}) => {
  const [copied, setCopied] = React.useState(false);

  const theme = getCouponTheme(colorThemeIndex, offer.id);

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
        style={{ background: theme.gradient }}
        className="group flex-none w-[270px] text-white p-4 rounded-2xl shadow-md cursor-pointer active:scale-[0.98] transition-all relative overflow-hidden"
      >
        {/* Glow ambient background effect */}
        <div
          className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-xl pointer-events-none"
          style={{ background: theme.glow }}
        />

        <div className="flex items-center justify-between gap-2 relative z-10">
          <span className="text-[11px] font-bold uppercase tracking-wider text-white bg-white/20 px-2.5 py-0.5 rounded-full backdrop-blur-xs shadow-xs">
            {offer.discount}
          </span>
          <span className="text-[11px] text-white/90 flex items-center gap-1 font-medium">
            <Calendar className="w-3 h-3" style={{ color: theme.accentIcon }} />
            {offer.validUntil}
          </span>
        </div>

        <h4 className="font-bold text-sm text-white mt-2.5 line-clamp-1 relative z-10 drop-shadow-xs">
          {offer.title}
        </h4>

        <p className="text-xs text-white/90 mt-0.5 line-clamp-1 relative z-10 font-medium">
          {offer.businessName}
        </p>

        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-white/20 relative z-10">
          <div className="flex items-center gap-1.5 bg-black/25 px-2.5 py-1 rounded-lg backdrop-blur-xs">
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
            style={{ color: theme.claimText }}
            className="text-xs font-bold bg-white hover:bg-slate-50 px-3.5 py-1 rounded-lg active:scale-95 transition-transform shadow-xs cursor-pointer"
          >
            Claim
          </button>
        </div>
      </div>
    );
  }

  // Full Coupon Card for Offers/Deals Screen
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onViewOffer(offer)}
      onKeyDown={(e) => e.key === 'Enter' && onViewOffer(offer)}
      className="group bg-white rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md cursor-pointer transition-all overflow-hidden relative"
    >
      {/* Top Banner with Individual Unique Gradient */}
      <div
        style={{ background: theme.gradient }}
        className="p-4 text-white relative overflow-hidden transition-all"
      >
        <div
          className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl pointer-events-none"
          style={{ background: theme.glow }}
        />

        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-xs px-2.5 py-1 rounded-full shadow-xs">
            <Tag className="w-3.5 h-3.5 text-white" />
            <span className="text-xs font-extrabold tracking-wide text-white">
              {offer.discount}
            </span>
          </div>

          <div className="flex items-center gap-1 text-xs text-white/95 font-medium">
            <Calendar className="w-3.5 h-3.5" style={{ color: theme.accentIcon }} />
            <span>Valid till {offer.validUntil}</span>
          </div>
        </div>

        <h3 className="font-bold text-lg text-white mt-2.5 line-clamp-1 relative z-10 drop-shadow-xs">
          {offer.title}
        </h3>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (onSelectBusiness) onSelectBusiness(offer.businessId);
          }}
          className="text-xs text-white/95 font-medium hover:underline flex items-center gap-1 mt-1 relative z-10"
        >
          <span>at {offer.businessName}</span>
          <span className="text-white">→</span>
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
            className="flex items-center gap-1.5 bg-[#F5F8FC] border border-dashed border-[#008CFF] px-3 py-1.5 rounded-xl text-xs font-mono font-bold text-[#0757D9] hover:bg-[#EBF3FF] transition-colors cursor-pointer"
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
            style={{ background: theme.gradient }}
            className="px-4 py-2 rounded-xl text-white text-xs font-bold active:scale-95 transition-transform shadow-xs cursor-pointer"
          >
            View Offer
          </button>
        </div>
      </div>
    </div>
  );
};
