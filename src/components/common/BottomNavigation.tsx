import React from 'react';
import { Home, Compass, Plus, Heart, User } from 'lucide-react';
import { BottomTabId } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

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
  const { t } = useLanguage();

  const tabs = [
    { id: 'home' as BottomTabId, label: t('Home'), icon: Home },
    { id: 'explore' as BottomTabId, label: t('Explore'), icon: Compass },
    { id: 'add' as BottomTabId, label: t('Add'), icon: Plus, isAdd: true },
    { id: 'favorites' as BottomTabId, label: t('Favorites'), icon: Heart, badge: favoritesCount },
    { id: 'profile' as BottomTabId, label: t('Profile'), icon: User },
  ];

  return (
    <nav
      aria-label="Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E2E8F0] pb-safe shadow-[0_-4px_20px_rgba(7,27,82,0.06)]"
    >
      <div className="max-w-lg mx-auto h-16 px-2">
        <div className="grid grid-cols-5 items-center h-full">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;

            if (tab.isAdd) {
              return (
                <div key={tab.id} className="flex flex-col items-center justify-center relative">
                  <button
                    type="button"
                    onClick={() => onTabChange(tab.id)}
                    aria-label="Add Business"
                    className={`relative -top-3 w-12 h-12 rounded-full bg-tizara-gradient flex items-center justify-center text-white shadow-lg shadow-[#0757D9]/30 z-30 cursor-pointer ${
                      isActive ? 'ring-2 ring-white/80' : ''
                    }`}
                  >
                    <Plus className="w-6 h-6 stroke-[2.5]" />
                  </button>
                  <span
                    className={`text-[10px] font-semibold -mt-2 tracking-tight select-none ${
                      isActive ? 'text-[#0757D9] font-bold' : 'text-[#667085]'
                    }`}
                  >
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
                className="flex flex-col items-center justify-center min-h-[44px] h-full py-1 relative focus:outline-none select-none cursor-pointer"
              >
                <div className="relative flex items-center justify-center w-10 h-7">
                  <Icon
                    className={`w-5 h-5 transition-colors ${
                      isActive
                        ? `text-[#0757D9] stroke-[2.3] ${tab.id === 'favorites' ? 'fill-[#0757D9]' : ''}`
                        : 'text-[#667085] stroke-[1.8]'
                    }`}
                  />
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#08D9F5] text-[#071B52] text-[9px] font-black rounded-full min-w-4 h-4 px-1 flex items-center justify-center border border-white">
                      {tab.badge}
                    </span>
                  )}
                </div>

                <span
                  className={`text-[10px] tracking-tight leading-tight -mt-0.5 ${
                    isActive ? 'text-[#0757D9] font-bold' : 'text-[#667085] font-semibold'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
