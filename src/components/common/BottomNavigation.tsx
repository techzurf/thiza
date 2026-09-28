import React from 'react';
import { Home, Compass, Plus, Bookmark, User } from 'lucide-react';
import { BottomTabId } from '../../types';

interface BottomNavigationProps {
  currentTab: BottomTabId;
  onTabChange: (tab: BottomTabId) => void;
  favoritesCount?: number;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentTab,
  onTabChange,
  favoritesCount = 0,
}) => {
  const tabs = [
    { id: 'home' as BottomTabId, label: 'HOME', icon: Home },
    { id: 'explore' as BottomTabId, label: 'EXPLORE', icon: Compass },
    { id: 'add' as BottomTabId, label: 'ADD', icon: Plus, isAdd: true },
    { id: 'favorites' as BottomTabId, label: 'FAVORITES', icon: Bookmark, badge: favoritesCount },
    { id: 'profile' as BottomTabId, label: 'PROFILE', icon: User },
  ];

  return (
    <nav 
      aria-label="Bottom Navigation" 
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E2E8F0] pb-safe shadow-[0_-4px_20px_rgba(7,27,82,0.06)]"
    >
      <div className="grid grid-cols-5 items-center h-16 max-w-lg mx-auto px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          if (tab.isAdd) {
            return (
              <div key={tab.id} className="flex flex-col items-center justify-center">
                <button
                  type="button"
                  onClick={() => onTabChange(tab.id)}
                  aria-label="Add Business"
                  className="relative -top-3 w-12 h-12 rounded-full bg-tizara-gradient flex items-center justify-center text-white shadow-lg shadow-[#0757D9]/30 active:scale-95 transition-transform"
                >
                  <Plus className="w-6 h-6 stroke-[2.5]" />
                </button>
                <span className={`text-[10px] font-semibold -mt-2 transition-colors ${isActive ? 'text-[#0757D9]' : 'text-[#667085]'}`}>
                  {tab.label}
                </span>
              </div>
            );
          }

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors relative"
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive
                      ? 'text-[#0757D9] stroke-[2.5] scale-105'
                      : 'text-[#667085] stroke-[1.8]'
                  }`}
                />
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#008CFF] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] font-semibold tracking-tight mt-1 transition-colors ${
                  isActive ? 'text-[#0757D9]' : 'text-[#667085]'
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#0757D9] mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
