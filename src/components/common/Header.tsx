import React from 'react';
import { MapPin, Bell, ChevronDown } from 'lucide-react';
import { TizaraLogo } from './TizaraLogo';

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
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] pt-safe px-4 pb-2.5 shadow-[0_2px_12px_rgba(7,27,82,0.03)]">
      <div className="flex items-center justify-between gap-2">
        {/* Brand & Location Lockup */}
        <div className="flex items-center gap-3">
          <TizaraLogo variant="mark" size="md" />
          
          <button
            type="button"
            onClick={onLocationClick}
            className="flex items-center gap-1.5 text-left group min-h-[44px] py-1"
            aria-label="Change location"
          >
            <MapPin className="w-4 h-4 text-[#008CFF] shrink-0 stroke-[2.2]" />
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-[#667085] uppercase tracking-wider">
                Location
              </span>
              <div className="flex items-center gap-0.5">
                <span className="text-xs font-bold text-[#172033] truncate max-w-[140px] group-hover:text-[#0757D9]">
                  {currentLocation.split(',')[0]}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-[#667085] group-hover:text-[#0757D9] transition-transform" />
              </div>
            </div>
          </button>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <button
            type="button"
            onClick={onNotificationClick}
            aria-label="View notifications"
            className="relative w-10 h-10 rounded-full flex items-center justify-center text-[#172033] hover:bg-[#F5F8FC] active:scale-95 transition-all"
          >
            <Bell className="w-5 h-5 stroke-[2]" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#008CFF] ring-2 ring-white" />
            )}
          </button>

          {/* Profile Avatar */}
          <button
            type="button"
            onClick={onProfileClick}
            aria-label="View profile"
            className="w-9 h-9 rounded-full bg-tizara-gradient p-[2px] active:scale-95 transition-all"
          >
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
              <span className="text-xs font-bold text-[#0757D9]">TZ</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
