import React, { useState } from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';
import { VisualServiceCardItem } from '../../data/homeServicesData';

interface VisualServiceCardProps {
  item: VisualServiceCardItem;
  onClick: (item: VisualServiceCardItem) => void;
}

export const VisualServiceCard: React.FC<VisualServiceCardProps> = ({ item, onClick }) => {
  const [imageError, setImageError] = useState(false);

  if (item.textPosition === 'below') {
    return (
      <button
        type="button"
        onClick={() => onClick(item)}
        aria-label={item.name}
        className="group flex flex-col w-[136px] sm:w-[145px] shrink-0 text-left cursor-pointer select-none active:scale-95 transition-transform duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0757D9] rounded-2xl"
      >
        {/* Visual Image Card */}
        <div className="relative w-full h-[145px] sm:h-[155px] rounded-2xl overflow-hidden bg-[#071B52] shadow-xs border border-black/5">
          {!imageError ? (
            <img
              src={item.image}
              alt={item.name}
              loading="lazy"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#071B52] to-[#0757D9] text-white p-3 text-center">
              <Sparkles className="w-6 h-6 text-[#08D9F5] mb-2" />
              <span className="text-[11px] font-bold tracking-wide">{item.name}</span>
            </div>
          )}
        </div>

        {/* Clean Typography Below Card (Matching Education Reference) */}
        <div className="mt-2 w-full px-0.5">
          <p className="font-brand font-bold text-[13px] text-[#172033] leading-snug truncate">
            {item.name}
          </p>
          {item.subtitle && (
            <p className="text-[11px] text-[#667085] truncate font-normal mt-0.5">
              {item.subtitle}
            </p>
          )}
        </div>
      </button>
    );
  }

  // Default: Overlay text on bottom dark gradient (Matching Home Services & Shopping Reference)
  return (
    <button
      type="button"
      onClick={() => onClick(item)}
      aria-label={item.name}
      className="group relative flex flex-col justify-end w-[136px] sm:w-[145px] h-[190px] sm:h-[205px] rounded-2xl overflow-hidden shrink-0 text-left cursor-pointer select-none bg-[#071B52] shadow-xs border border-black/5 transition-all duration-200 active:scale-95 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#08D9F5]"
    >
      {/* Background Image */}
      {!imageError ? (
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          onError={() => setImageError(true)}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#071B52] via-[#0757D9] to-[#008CFF]" />
      )}

      {/* Bottom Gradient Overlay for High Contrast Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 via-45% to-transparent pointer-events-none" />

      {/* Prominent White Typography Over Gradient */}
      <div className="relative z-10 p-3 flex flex-col justify-end w-full">
        <span className="font-brand font-extrabold text-[12px] sm:text-[13px] tracking-wide uppercase text-white leading-tight drop-shadow-md">
          {item.name}
        </span>
        {item.subtitle && (
          <span className="text-[10px] text-white/80 font-medium mt-1 truncate drop-shadow-xs">
            {item.subtitle}
          </span>
        )}
      </div>
    </button>
  );
};

interface VisualServiceSectionProps {
  title: string;
  subtitle?: string;
  items: VisualServiceCardItem[];
  onViewAll?: () => void;
  onSelectItem: (item: VisualServiceCardItem) => void;
}

export const VisualServiceSection: React.FC<VisualServiceSectionProps> = ({
  title,
  subtitle,
  items,
  onViewAll,
  onSelectItem,
}) => {
  return (
    <section className="px-4">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="font-brand font-bold text-lg text-[#172033] uppercase tracking-wide">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-[#667085] mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        {onViewAll && (
          <button
            type="button"
            onClick={onViewAll}
            className="flex items-center gap-0.5 text-xs font-bold text-[#0757D9] hover:text-[#008CFF] min-h-[44px] py-2 px-1 focus:outline-none transition-colors"
            aria-label={`View all in ${title}`}
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4 text-[#0757D9]" />
          </button>
        )}
      </div>

      {/* Horizontally Scrollable Row */}
      <div className="flex items-start gap-3 overflow-x-auto pb-2 pt-0.5 -mx-4 px-4 scrollbar-none touch-pan-x">
        {items.map((item) => (
          <VisualServiceCard
            key={item.id}
            item={item}
            onClick={onSelectItem}
          />
        ))}
      </div>
    </section>
  );
};
