import React from 'react';
import { Star, MapPin, Heart, ShieldCheck } from 'lucide-react';
import { Business } from '../../types';

interface BusinessCardProps {
  business: Business;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onClick: (business: Business) => void;
  variant?: 'vertical' | 'horizontal' | 'compact';
}

const isImageUrl = (src?: string) => Boolean(src && (src.startsWith('http') || src.startsWith('/') || src.startsWith('data:')));

export const BusinessCard: React.FC<BusinessCardProps> = ({
  business,
  isFavorite,
  onToggleFavorite,
  onClick,
  variant = 'vertical',
}) => {
  // Horizontal layout for Carousels
  if (variant === 'horizontal') {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={() => onClick(business)}
        onKeyDown={(e) => e.key === 'Enter' && onClick(business)}
        className="group relative flex-none w-[280px] bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_4px_16px_rgba(7,27,82,0.04)] overflow-hidden cursor-pointer active:scale-[0.98] transition-all"
      >
        {/* Cover Media - Clean image, heart button only */}
        <div className="h-32 w-full relative overflow-hidden bg-slate-100">
          {isImageUrl(business.coverImage) ? (
            <img
              src={business.coverImage}
              alt={business.name}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div
              className="w-full h-full"
              style={{ background: business.coverImage }}
            />
          )}

          {/* Favorite button - floating in top-right corner */}
          <button
            type="button"
            onClick={(e) => onToggleFavorite(business.id, e)}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-700 shadow-sm active:scale-90 transition-transform hover:bg-white"
          >
            <Heart
              className={`w-4 h-4 ${
                isFavorite
                  ? 'fill-[#0757D9] text-[#0757D9]'
                  : 'text-slate-600'
              }`}
            />
          </button>
        </div>

        {/* Content - Below Image */}
        <div className="p-3 flex flex-col gap-1.5">
          <div className="flex items-start justify-between gap-1.5">
            <div className="min-w-0 flex-1">
              <h4 className="font-bold text-sm text-[#172033] truncate group-hover:text-[#0757D9] transition-colors">
                {business.name}
              </h4>
              <p className="text-xs text-[#667085] truncate mt-0.5">
                {business.categoryName} · {business.locality}
              </p>
            </div>
            {business.priceRange && (
              <span className="text-[11px] font-bold text-[#071B52] bg-[#F5F8FC] px-1.5 py-0.5 rounded border border-[#E2E8F0]/60 shrink-0">
                {business.priceRange}
              </span>
            )}
          </div>

          {business.isVerified && (
            <div className="flex items-center gap-1 text-[11px] font-semibold text-[#008CFF]">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>Verified</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-1 border-t border-slate-100">
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-0.5 bg-[#E8F5FF] text-[#0757D9] px-1.5 py-0.5 rounded font-bold text-xs">
                <Star className="w-3 h-3 fill-[#0757D9] text-[#0757D9]" />
                <span>{business.rating.toFixed(1)}</span>
              </div>
              <span className="text-xs text-[#667085]">
                ({business.reviewCount})
              </span>
            </div>

            <div className="flex items-center gap-1 text-[11px] font-medium text-[#667085]">
              <MapPin className="w-3 h-3 text-[#0757D9] shrink-0" />
              <span>{business.distance}</span>
            </div>
          </div>

          {/* Status indicators: Open Now / Closed and Featured */}
          <div className="flex items-center gap-1.5 pt-0.5">
            <div
              className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${
                business.isOpen
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                  : 'bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  business.isOpen ? 'bg-emerald-500' : 'bg-slate-400'
                }`}
              />
              <span>{business.isOpen ? 'Open Now' : 'Closed'}</span>
            </div>

            {business.isFeatured && (
              <span className="inline-flex items-center text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-[#E8F5FF] text-[#0757D9] border border-[#0757D9]/20">
                Featured
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Compact layout for Search results list
  if (variant === 'compact') {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={() => onClick(business)}
        onKeyDown={(e) => e.key === 'Enter' && onClick(business)}
        className="group flex items-center gap-3 p-3 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs cursor-pointer active:scale-[0.99] transition-all"
      >
        {/* Clean Image Thumbnail - NO overlays */}
        <div className="w-20 h-20 rounded-xl shrink-0 overflow-hidden bg-slate-100 relative">
          {isImageUrl(business.coverImage) ? (
            <img
              src={business.coverImage}
              alt={business.name}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full"
              style={{ background: business.coverImage }}
            />
          )}
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
          <div className="flex items-start justify-between gap-1">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1">
                <h4 className="font-bold text-sm text-[#172033] truncate group-hover:text-[#0757D9]">
                  {business.name}
                </h4>
                {business.isVerified && (
                  <ShieldCheck className="w-3.5 h-3.5 text-[#008CFF] shrink-0" />
                )}
              </div>
              <p className="text-xs text-[#667085] truncate mt-0.5">
                {business.categoryName} · {business.locality}
              </p>
            </div>

            <button
              type="button"
              onClick={(e) => onToggleFavorite(business.id, e)}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              className="p-1.5 rounded-full text-slate-400 hover:text-[#0757D9] shrink-0"
            >
              <Heart
                className={`w-4 h-4 ${
                  isFavorite ? 'fill-[#0757D9] text-[#0757D9]' : ''
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between text-xs mt-1 pt-1 border-t border-slate-100">
            <div className="flex items-center gap-1">
              <span className="font-bold text-[#0757D9] flex items-center gap-0.5">
                <Star className="w-3 h-3 fill-[#0757D9]" />
                {business.rating.toFixed(1)}
              </span>
              <span className="text-[#667085]">({business.reviewCount})</span>
            </div>

            <div className="flex items-center gap-1 text-[#667085] font-medium">
              <MapPin className="w-3 h-3 text-[#0757D9] shrink-0" />
              <span>{business.distance}</span>
            </div>
          </div>

          {/* Status indicators */}
          <div className="flex items-center gap-1.5 mt-1">
            <div
              className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${
                business.isOpen
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                  : 'bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  business.isOpen ? 'bg-emerald-500' : 'bg-slate-400'
                }`}
              />
              <span>{business.isOpen ? 'Open Now' : 'Closed'}</span>
            </div>

            {business.isFeatured && (
              <span className="inline-flex items-center text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-[#E8F5FF] text-[#0757D9] border border-[#0757D9]/20">
                Featured
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Standard Vertical Card (Explore, Popular, Category listing, Favorites, Find)
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick(business)}
      onKeyDown={(e) => e.key === 'Enter' && onClick(business)}
      className="group relative bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_4px_18px_rgba(7,27,82,0.04)] overflow-hidden cursor-pointer active:scale-[0.99] transition-all"
    >
      {/* Clean Cover Image Area - ONLY image & heart button */}
      <div className="h-44 w-full relative overflow-hidden bg-slate-100">
        {isImageUrl(business.coverImage) ? (
          <img
            src={business.coverImage}
            alt={business.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div
            className="w-full h-full"
            style={{ background: business.coverImage }}
          />
        )}

        {/* Favorite button - floating in top-right corner */}
        <button
          type="button"
          onClick={(e) => onToggleFavorite(business.id, e)}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute top-2.5 right-2.5 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-700 shadow-md active:scale-90 transition-transform hover:bg-white"
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorite
                ? 'fill-[#0757D9] text-[#0757D9]'
                : 'text-slate-600'
            }`}
          />
        </button>
      </div>

      {/* Business Information Area - Below Image */}
      <div className="p-3.5 flex flex-col gap-2">
        {/* Business Name and Price */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-base text-[#172033] leading-snug truncate group-hover:text-[#0757D9] transition-colors">
            {business.name}
          </h3>
          {business.priceRange && (
            <span className="text-xs font-bold text-[#071B52] bg-[#F5F8FC] px-2 py-0.5 rounded border border-[#E2E8F0]/60 shrink-0">
              {business.priceRange}
            </span>
          )}
        </div>

        {/* Category / Description */}
        <p className="text-xs text-[#667085] truncate -mt-0.5">
          {business.categoryName} {business.tagline ? `· ${business.tagline}` : ''}
        </p>

        {/* Verified Badge */}
        {business.isVerified && (
          <div className="flex items-center gap-1 text-[11px] font-semibold text-[#008CFF]">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span>Verified</span>
          </div>
        )}

        {/* Rating and Distance / Locality */}
        <div className="flex items-center justify-between text-xs pt-1.5 border-t border-slate-100">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1 bg-[#E8F5FF] text-[#0757D9] px-1.5 py-0.5 rounded font-bold text-xs">
              <Star className="w-3 h-3 fill-[#0757D9] text-[#0757D9]" />
              <span>{business.rating.toFixed(1)}</span>
            </div>
            <span className="text-[#667085] font-medium">
              ({business.reviewCount} reviews)
            </span>
          </div>

          <div className="flex items-center gap-1 text-[#667085] font-medium text-xs">
            <MapPin className="w-3 h-3 text-[#0757D9] shrink-0" />
            <span>{business.distance}</span>
            <span className="text-slate-300">·</span>
            <span className="truncate max-w-[100px]">{business.locality}</span>
          </div>
        </div>

        {/* Status Indicators: Open Now / Closed and Featured */}
        <div className="flex items-center gap-2 pt-0.5">
          <div
            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
              business.isOpen
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                : 'bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                business.isOpen ? 'bg-emerald-500' : 'bg-slate-400'
              }`}
            />
            <span>{business.isOpen ? 'Open Now' : 'Closed'}</span>
          </div>

          {business.isFeatured && (
            <span className="inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#E8F5FF] text-[#0757D9] border border-[#0757D9]/20">
              Featured
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

