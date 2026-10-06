import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  LayoutGrid,
  List,
  SearchX,
  Compass,
} from 'lucide-react';
import { Business, Category } from '../types';
import { BusinessCard } from '../components/common/BusinessCard';
import {
  filterBusinessesByCategory,
  getCategoryHeaderTitle,
} from '../utils/categoryFilter';
import { useLanguage } from '../context/LanguageContext';

interface CategoryListingScreenProps {
  category: Category;
  businesses: Business[];
  favorites: string[];
  currentLocation?: string;
  onBack: () => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectBusiness: (business: Business) => void;
  onBrowseAll?: () => void;
}

export const CategoryListingScreen: React.FC<CategoryListingScreenProps> = ({
  category,
  businesses,
  favorites,
  currentLocation: _currentLocation,
  onBack,
  onToggleFavorite,
  onSelectBusiness,
  onBrowseAll,
}) => {
  const [viewMode, setViewMode] = useState<'card' | 'compact'>('card');
  const [isCategoryFilterCleared, setIsCategoryFilterCleared] = useState<boolean>(false);
  const { t, tCategory, language } = useLanguage();

  // Filter ONLY businesses belonging to the selected category (strict filtering)
  const categoryBusinesses = useMemo(() => {
    if (isCategoryFilterCleared) {
      return businesses;
    }
    return filterBusinessesByCategory(businesses, category);
  }, [businesses, category, isCategoryFilterCleared]);

  const headerTitle = useMemo(() => {
    if (isCategoryFilterCleared) {
      return t('All Verified Businesses');
    }
    if (language === 'Tamil') {
      const translatedCat = tCategory(category.id);
      return translatedCat ? `${translatedCat}` : getCategoryHeaderTitle(category);
    }
    return getCategoryHeaderTitle(category);
  }, [isCategoryFilterCleared, language, category, t, tCategory]);

  return (
    <div className="w-full min-h-[100dvh] bg-[#F5F8FC] pb-nav">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] pt-safe px-4 pb-3 shadow-[0_2px_12px_rgba(7,27,82,0.03)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              aria-label={t('Back')}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#172033] hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
            </button>

            <div>
              <h1 className="font-brand font-extrabold text-xl text-[#172033]">
                {headerTitle}
              </h1>
              <p className="text-xs text-[#667085]">
                {isCategoryFilterCleared
                  ? `${businesses.length} ${t('total verified businesses')}`
                  : categoryBusinesses.length > 0
                  ? `${categoryBusinesses.length} ${t('listings in category')}`
                  : t('No businesses available')}
              </p>
            </div>
          </div>

          {/* List vs Card view toggle */}
          <div className="flex items-center bg-[#F5F8FC] p-1 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode('card')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'card'
                  ? 'bg-white text-[#0757D9] shadow-xs'
                  : 'text-[#667085]'
              }`}
              aria-label="Card view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('compact')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'compact'
                  ? 'bg-white text-[#0757D9] shadow-xs'
                  : 'text-[#667085]'
              }`}
              aria-label="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Business List Content */}
      <main className="p-4 flex flex-col gap-3.5">
        {categoryBusinesses.length > 0 && (
          <div className="flex items-center justify-between text-xs text-[#667085]">
            <span>
              {t('Showing')} <strong className="text-[#172033]">{categoryBusinesses.length}</strong>{' '}
              {categoryBusinesses.length === 1 ? t('business') : t('businesses')}
            </span>
            <span className="text-[#0757D9] font-bold">{t('Verified Partners')}</span>
          </div>
        )}

        {/* Business cards list */}
        {categoryBusinesses.map((b) => (
          <BusinessCard
            key={b.id}
            business={b}
            variant={viewMode === 'card' ? 'vertical' : 'compact'}
            isFavorite={favorites.includes(b.id)}
            onToggleFavorite={onToggleFavorite}
            onClick={onSelectBusiness}
          />
        ))}

        {/* Clean Empty State when no businesses found in category */}
        {categoryBusinesses.length === 0 && (
          <div className="text-center py-14 bg-white rounded-3xl border border-[#E2E8F0] p-6 shadow-xs flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-[#F5F8FC] text-[#0757D9] flex items-center justify-center mb-3.5">
              <SearchX className="w-7 h-7 stroke-[1.8]" />
            </div>
            <h3 className="font-brand font-bold text-lg text-[#172033]">
              {t('No businesses available')}
            </h3>
            <p className="text-xs text-[#667085] mt-1.5 max-w-xs leading-relaxed">
              {t('There are currently no businesses listed in this location.')}
            </p>
            <button
              type="button"
              onClick={() => {
                if (onBrowseAll) {
                  onBrowseAll();
                } else {
                  setIsCategoryFilterCleared(true);
                }
              }}
              className="mt-5 px-5 py-2.5 bg-[#0757D9] hover:bg-[#008CFF] text-white text-xs font-bold rounded-xl shadow-xs active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>{t('Browse All Businesses')}</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
