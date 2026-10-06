import React from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface HeaderProps {
  currentLocation: string;
  onLocationClick: () => void;
  onNotificationClick: () => void;
  onProfileClick?: () => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentLocation,
  onLocationClick,
  onNotificationClick,
  unreadCount = 0,
}) => {
  const { t } = useLanguage();

  return (
    <header
      className="sticky top-0 z-40 pt-safe px-4 py-2.5 transition-all border-b border-[#E2E8F0] shadow-[0_2px_10px_rgba(15,23,42,0.04)]"
      style={{
        background: 'linear-gradient(135deg, #F1F5F9 0%, #FFFFFF 50%, #E2E8F0 100%)',
      }}
    >
      <div className="relative flex items-center justify-between gap-3 max-w-lg mx-auto">
        {/* Location Section - Begins immediately on left, no logo */}
        <button
          type="button"
          onClick={onLocationClick}
          className="flex items-center gap-2.5 text-left group min-h-[44px] py-1 active:opacity-90 transition-opacity z-10"
          aria-label={t('Change location')}
        >
          <div className="w-8 h-8 rounded-full bg-white border border-[#CBD5E1] shadow-xs flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4 text-[#0057D9] shrink-0 stroke-[2.4]" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider leading-tight">
              {t('Location')}
            </span>
            <div className="flex items-center gap-1">
              <span className="text-sm font-extrabold text-[#0F172A] truncate max-w-[120px] sm:max-w-[150px] leading-tight">
                {currentLocation.split(',')[0]}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#64748B] group-hover:translate-y-0.5 transition-transform shrink-0 stroke-[2.2]" />
            </div>
          </div>
        </button>

        {/* Center Logo - Perfectly centered horizontally and vertically */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
          <img
            src="https://res.cloudinary.com/dv16a8l1l/image/upload/v1791267372/Untitled_design_24_jmddjq.png"
            alt="Tizara"
            className="h-7 sm:h-8 w-auto max-w-[100px] object-contain select-none"
          />
        </div>

        {/* Action icons on right */}
        <div className="flex items-center z-10">
          {/* Notifications */}
          <button
            type="button"
            onClick={onNotificationClick}
            aria-label="View notifications"
            className="relative w-10 h-10 rounded-full flex items-center justify-center bg-white border border-[#E2E8F0] shadow-xs hover:bg-slate-50 active:scale-95 transition-all"
          >
            <img
              src="https://res.cloudinary.com/dv16a8l1l/image/upload/e_make_transparent/v1791180181/notification_1_mju3b1.gif"
              alt="Notifications"
              className="w-[26px] h-[26px] object-contain pointer-events-none select-none"
            />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#FF4757] ring-2 ring-white" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

