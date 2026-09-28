import React, { useState, useMemo } from 'react';
import { Bookmark, Sparkles, Compass } from 'lucide-react';
import { Business } from '../types';
import { BusinessCard } from '../components/common/BusinessCard';
import { EmptyState } from '../components/common/EmptyState';

interface FavoritesScreenProps {
  businesses: Business[];
  favorites: string[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectBusiness: (business: Business) => void;
  onExplore: () => void;
}

type FavTab = 'all' | 'restaurants' | 'shopping' | 'services' | 'professionals';

export const FavoritesScreen: React.FC<FavoritesScreenProps> = ({
  businesses,
  favorites,
  onToggleFavorite,
  onSelectBusiness,
  onExplore,
}) => {
  const [activeTab, setActiveTab] = useState<FavTab>('all');

  const tabs: { id: FavTab; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'restaurants', label: 'Restaurants' },
    { id: 'shopping', label: 'Shopping' },
    { id: 'services', label: 'Services' },
    { id: 'professionals', label: 'Professionals' },
  ];

  const savedBusinesses = useMemo(() => {
    const list = businesses.filter((b) => favorites.includes(b.id));
    if (activeTab === 'all') return list;
    return list.filter((b) => b.category === activeTab);
  }, [businesses, favorites, activeTab]);

  return (
    <div className="w-full min-h-[100dvh] bg-[#F5F8FC] pb-nav">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] pt-safe px-4 pb-3 shadow-[0_2px_12px_rgba(7,27,82,0.03)]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-brand font-extrabold text-2xl text-[#172033] tracking-tight">
              Saved Businesses
            </h1>
            <p className="text-xs text-[#667085]">
              {favorites.length} places bookmarked for quick access
            </p>
          </div>

          <div className="w-9 h-9 rounded-full bg-[#EBF3FF] flex items-center justify-center text-[#0757D9]">
            <Bookmark className="w-5 h-5 fill-[#0757D9]" />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-[#0757D9] text-white shadow-xs'
                    : 'bg-[#F5F8FC] text-[#667085] hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main List Area */}
      <main className="p-4 flex flex-col gap-4">
        {savedBusinesses.length > 0 ? (
          savedBusinesses.map((b) => (
            <BusinessCard
              key={b.id}
              business={b}
              variant="vertical"
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
              onClick={onSelectBusiness}
            />
          ))
        ) : (
          <EmptyState
            icon={Bookmark}
            title="Your saved businesses will appear here"
            description="Save businesses you want to visit again by tapping the heart icon anywhere in Tizara."
            actionText="Explore Tizara"
            onAction={onExplore}
            className="my-12 bg-white rounded-3xl border border-[#E2E8F0] shadow-xs"
          />
        )}
      </main>
    </div>
  );
};
