import React from 'react';
import { Star, MapPin, Heart, ShieldCheck, Clock } from 'lucide-react';
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
        {/* Cover Media */}
        <div className="h-32 w-full relative flex items-end p-3 overflow-hidden bg-slate-800">
          {isImageUrl(business.coverImage) ? (
            <img
              src={business.coverImage}
              alt={business.name}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div
              className="absolute inset-0 w-full h-full"
              style={{ background: business.coverImage }}
            />
          )}

          {/* Subtle gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          {/* Status pill & distance */}
          <div className="relative z-10 flex items-center justify-between w-full">
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                business.isOpen
                  ? 'bg-emerald-500/90 text-white'
                  : 'bg-rose-500/90 text-white'
              }`}
            >
              {business.isOpen ? 'Open Now' : 'Closed'}
            </span>

            <div className="flex items-center gap-1 text-[11px] font-medium text-white/95 bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-xs">
              <MapPin className="w-3 h-3 text-[#08D9F5]" />
              <span>{business.distance}</span>
            </div>
          </div>

          {/* Favorite button */}
          <button
            type="button"
            onClick={(e) => onToggleFavorite(business.id, e)}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            className="absolute top-2.5 right-2.5 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-700 shadow-sm active:scale-90 transition-transform"
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

        {/* Content */}
        <div className="p-3.5 flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <h4 className="font-bold text-sm text-[#172033] truncate group-hover:text-[#0757D9] transition-colors">
              {business.name}
            </h4>
            {business.isVerified && (
              <ShieldCheck className="w-4 h-4 text-[#008CFF] shrink-0" />
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-[#667085]">
            <span>{business.categoryName}</span>
            <span aria-hidden="true">·</span>
            <span>{business.locality}</span>
          </div>

          <div className="flex items-center justify-between mt-1 pt-1.5 border-t border-slate-100">
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-0.5 bg-[#E8F5FF] text-[#0757D9] px-1.5 py-0.5 rounded font-bold text-xs">
                <Star className="w-3 h-3 fill-[#0757D9] text-[#0757D9]" />
                <span>{business.rating.toFixed(1)}</span>
              </div>
              <span className="text-xs text-[#667085]">
                ({business.reviewCount})
              </span>
            </div>
            <span className="text-xs font-semibold text-[#071B52]">
              {business.priceRange}
            </span>
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
        <div className="w-20 h-20 rounded-xl shrink-0 flex items-center justify-center font-bold text-base shadow-xs relative overflow-hidden bg-slate-800">
          {isImageUrl(business.coverImage) ? (
            <img
              src={business.coverImage}
              alt={business.name}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div
              className="absolute inset-0 w-full h-full"
              style={{ background: business.coverImage }}
            />
          )}
          <div className="absolute inset-0 bg-black/25" />
          <span className="relative z-10 text-white font-bold text-xs bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-xs">
            {business.logo}
          </span>
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
          <div className="flex items-start justify-between gap-1">
            <div className="min-w-0">
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
              className="p-1.5 rounded-full text-slate-400 hover:text-[#0757D9] shrink-0"
            >
              <Heart
                className={`w-4 h-4 ${
                  isFavorite ? 'fill-[#0757D9] text-[#0757D9]' : ''
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between text-xs mt-1.5 pt-1 border-t border-slate-100">
            <div className="flex items-center gap-1">
              <span className="font-bold text-[#0757D9] flex items-center gap-0.5">
                <Star className="w-3 h-3 fill-[#0757D9]" />
                {business.rating.toFixed(1)}
              </span>
              <span className="text-[#667085]">({business.reviewCount})</span>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`text-[10px] font-bold ${
                  business.isOpen ? 'text-emerald-600' : 'text-slate-400'
                }`}
              >
                {business.isOpen ? 'Open Now' : 'Closed'}
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-[#667085] font-medium">{business.distance}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standard Vertical Card (Explore, Popular, Category listing)
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick(business)}
      onKeyDown={(e) => e.key === 'Enter' && onClick(business)}
      className="group relative bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_4px_18px_rgba(7,27,82,0.04)] overflow-hidden cursor-pointer active:scale-[0.99] transition-all"
    >
      {/* Cover Image & Scrim */}
      <div className="h-44 w-full relative flex items-between p-3.5 overflow-hidden bg-slate-800">
        {isImageUrl(business.coverImage) ? (
          <img
            src={business.coverImage}
            alt={business.name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div
            className="absolute inset-0 w-full h-full"
            style={{ background: business.coverImage }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/30" />
        
        {/* Top badges & Favorite */}
        <div className="relative z-10 flex items-center justify-between w-full">
          <div className="flex items-center gap-1.5">
            <span
              className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                business.isOpen
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-700/80 text-white'
              }`}
            >
              {business.isOpen ? 'Open Now' : 'Closed'}
            </span>
            {business.isFeatured && (
              <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-tizara-vibrant text-white">
                Featured
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={(e) => onToggleFavorite(business.id, e)}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            className="w-9 h-9 rounded-full bg-white/95 backdrop-blur-xs flex items-center justify-center text-slate-700 shadow-md active:scale-90 transition-transform"
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

        {/* Business Logo & Quick Distance pinned to bottom of media */}
        <div className="absolute -bottom-4 left-3.5 z-10 flex items-end gap-2.5">
          <div className="w-12 h-12 rounded-xl bg-white border-2 border-white shadow-md flex items-center justify-center font-bold text-sm text-[#071B52]">
            {business.logo}
          </div>
        </div>

        <div className="absolute bottom-2 right-3.5 z-10 flex items-center gap-1 text-xs font-semibold text-white/95 bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-xs">
          <MapPin className="w-3 h-3 text-[#08D9F5]" />
          <span>{business.distance}</span>
        </div>
      </div>

      {/* Card Info */}
      <div className="pt-6 p-4 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <h3 className="font-bold text-base text-[#172033] truncate group-hover:text-[#0757D9] transition-colors">
              {business.name}
            </h3>
            {business.isVerified && (
              <ShieldCheck className="w-4 h-4 text-[#008CFF] shrink-0" />
            )}
          </div>
          <span className="text-xs font-bold text-[#071B52] bg-[#F5F8FC] px-2 py-0.5 rounded">
            {business.priceRange}
          </span>
        </div>

        <p className="text-xs text-[#667085] truncate">
          {business.tagline}
        </p>

        <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1 bg-[#E8F5FF] text-[#0757D9] px-2 py-0.5 rounded-md font-bold text-xs">
              <Star className="w-3 h-3 fill-[#0757D9]" />
              <span>{business.rating.toFixed(1)}</span>
            </div>
            <span className="text-[#667085] font-medium">
              ({business.reviewCount} reviews)
            </span>
          </div>

          <div className="flex items-center gap-1 text-[#667085] text-xs">
            <Clock className="w-3 h-3 text-slate-400" />
            <span className="truncate max-w-[120px]">{business.locality}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
