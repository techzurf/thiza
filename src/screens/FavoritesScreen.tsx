import React, { useState, useMemo } from 'react';
import { Heart } from 'lucide-react';
import { Business } from '../types';
import { BusinessCard } from '../components/common/BusinessCard';
import { EmptyState } from '../components/common/EmptyState';
import { useLanguage } from '../context/LanguageContext';

interface FavoritesScreenProps {
  businesses: Business[];
  favorites: string[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectBusiness: (business: Business) => void;
  onExplore: () => void;
}

export const FavoritesScreen: React.FC<FavoritesScreenProps> = ({
  businesses,
  favorites,
  onToggleFavorite,
  onSelectBusiness,
  onExplore,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const { t, tCategory, language } = useLanguage();

  // Filter only the favorited businesses
  const favoritedBusinesses = useMemo(() => {
    return businesses.filter((b) => favorites.includes(b.id));
  }, [businesses, favorites]);

  // Dynamic category tabs derived from user's actual favorited businesses
  const categoryTabs = useMemo(() => {
    const cats = new Set<string>();
    favoritedBusinesses.forEach((b) => {
      if (b.category) cats.add(b.category);
    });

    const list: { id: string; label: string }[] = [{ id: 'all', label: 'All' }];
    cats.forEach((cat) => {
      const sample = favoritedBusinesses.find((b) => b.category === cat);
      const label = sample?.categoryName?.split('&')[0]?.trim() || cat.charAt(0).toUpperCase() + cat.slice(1);
      list.push({ id: cat, label });
    });

    return list;
  }, [favoritedBusinesses]);

  // Filtered by selected tab
  const displayedBusinesses = useMemo(() => {
    if (activeCategory === 'all') return favoritedBusinesses;
    return favoritedBusinesses.filter((b) => b.category === activeCategory);
  }, [favoritedBusinesses, activeCategory]);

  return (
    <div className="w-full min-h-[100dvh] bg-[#F5F8FC] pb-nav">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] pt-safe px-4 pb-3 shadow-[0_2px_12px_rgba(7,27,82,0.03)]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-brand font-extrabold text-2xl text-[#172033] tracking-tight">
              {t('Favorites')}
            </h1>
            <p className="text-xs text-[#667085]">
              {favorites.length} {favorites.length === 1 ? t('business') : t('businesses')} {language === 'Tamil' ? 'சேமிக்கப்பட்டுள்ளது' : 'saved for quick access'}
            </p>
          </div>

          <div className="w-9 h-9 rounded-full bg-[#EBF3FF] flex items-center justify-center text-[#0757D9]">
            <Heart className="w-5 h-5 fill-[#0757D9] text-[#0757D9]" />
          </div>
        </div>

        {/* Category Tabs (only when multiple categories are present) */}
        {categoryTabs.length > 2 && (
          <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none">
            {categoryTabs.map((tab) => {
              const isActive = activeCategory === tab.id;
              const displayLabel = tab.id === 'all' ? t('All') : tCategory(tab.label);
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#0757D9] text-white shadow-xs'
                      : 'bg-[#F5F8FC] text-[#667085] hover:bg-slate-100'
                  }`}
                >
                  {displayLabel}
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Main List Area */}
      <main className="p-4 flex flex-col gap-4">
        {displayedBusinesses.length > 0 ? (
          displayedBusinesses.map((b) => (
            <BusinessCard
              key={b.id}
              business={b}
              variant="vertical"
              isFavorite={favorites.includes(b.id)}
              onToggleFavorite={onToggleFavorite}
              onClick={onSelectBusiness}
            />
          ))
        ) : favorites.length === 0 ? (
          /* Clean Empty State when no favorites */
          <EmptyState
            icon={Heart}
            title={t('No Favorites Yet')}
            description={t('Explore businesses and tap the heart icon to save your favorites here.')}
            actionText={language === 'Tamil' ? 'ஆராயத் தொடங்குங்கள்' : 'Explore Tizara'}
            onAction={onExplore}
            className="my-12 bg-white rounded-3xl border border-[#E2E8F0] shadow-xs"
          />
        ) : (
          /* Tab empty state */
          <div className="text-center py-12 bg-white rounded-3xl border border-[#E2E8F0] p-6 shadow-xs flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-[#F5F8FC] text-[#0757D9] flex items-center justify-center mb-3">
              <Heart className="w-7 h-7 stroke-[1.8]" />
            </div>
            <h3 className="font-brand font-bold text-base text-[#172033]">
              {language === 'Tamil' ? 'இந்த வகையில் சேமிக்கப்பட்டவை இல்லை' : 'No businesses in this category'}
            </h3>
            <p className="text-xs text-[#667085] mt-1.5 max-w-xs leading-relaxed">
              {language === 'Tamil' ? 'மற்ற பிரிவுகளின் கீழ் வணிகங்கள் சேமிக்கப்பட்டுள்ளன.' : `You have ${favorites.length} saved businesses under other categories.`}
            </p>
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className="mt-4 px-4 py-2 bg-[#0757D9] hover:bg-[#008CFF] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              {t('All')}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
