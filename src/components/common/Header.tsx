import React from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface HeaderProps {
  currentLocation: string;
  onLocationClick: () => void;
  onNotificationClick: () => void;
  onProfileClick: () => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentLocation,
  onLocationClick,
  onNotificationClick,
  onProfileClick,
  unreadCount = 0,
}) => {
  const { t } = useLanguage();

  return (
    <header
      className="sticky top-0 z-40 pt-safe px-4 py-2.5 text-white transition-all shadow-[0_4px_16px_rgba(0,87,217,0.18)]"
      style={{
        background: 'linear-gradient(135deg, #0057D9 0%, #087FF5 55%, #00CFE8 100%)',
      }}
    >
      <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
        {/* Location Section - Begins immediately on left, no logo */}
        <button
          type="button"
          onClick={onLocationClick}
          className="flex items-center gap-2.5 text-left group min-h-[44px] py-1 active:opacity-90 transition-opacity"
          aria-label={t('Change location')}
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 backdrop-blur-xs">
            <MapPin className="w-4 h-4 text-white shrink-0 stroke-[2.4]" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider leading-tight">
              {t('Location')}
            </span>
            <div className="flex items-center gap-1">
              <span className="text-sm font-extrabold text-white truncate max-w-[170px] leading-tight drop-shadow-xs">
                {currentLocation.split(',')[0]}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-white/90 group-hover:translate-y-0.5 transition-transform shrink-0 stroke-[2.2]" />
            </div>
          </div>
        </button>

        {/* Action icons on right */}
        <div className="flex items-center gap-2.5">
          {/* Notifications */}
          <button
            type="button"
            onClick={onNotificationClick}
            aria-label="View notifications"
            className="relative w-10 h-10 rounded-full flex items-center justify-center text-white bg-white/15 hover:bg-white/25 active:scale-95 transition-all backdrop-blur-xs"
          >
            <img
              src="https://res.cloudinary.com/dv16a8l1l/image/upload/e_make_transparent/v1791180181/notification_1_mju3b1.gif"
              alt="Notifications"
              className="w-[26px] h-[26px] object-contain pointer-events-none select-none mix-blend-multiply"
              style={{ mixBlendMode: 'multiply' }}
            />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#FF4757] ring-2 ring-white" />
            )}
          </button>

          {/* Profile Avatar */}
          <button
            type="button"
            onClick={onProfileClick}
            aria-label="View profile"
            className="w-10 h-10 rounded-full bg-white p-[2px] shadow-sm active:scale-95 transition-all"
          >
            <div className="w-full h-full rounded-full bg-[#EBF5FF] flex items-center justify-center overflow-hidden">
              <span className="text-xs font-black text-[#0057D9]">TZ</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

