import React, { useState, useMemo } from 'react';
import { Map } from 'lucide-react';
import { Business, Category } from '../types';
import { CATEGORIES } from '../data/mockBusinesses';
import { SearchBar } from '../components/common/SearchBar';
import { BusinessCard } from '../components/common/BusinessCard';
import { CategoryCard } from '../components/common/CategoryCard';
import { filterBusinessesByCategory } from '../utils/categoryFilter';
import { useLanguage } from '../context/LanguageContext';

interface ExploreScreenProps {
  businesses: Business[];
  favorites: string[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectBusiness: (business: Business) => void;
  onSelectCategory: (category: Category) => void;
  onOpenMap: () => void;
  onOpenSearch: () => void;
}

type SortOption = 'recommended' | 'distance' | 'rating' | 'newest';

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  businesses,
  favorites,
  onToggleFavorite,
  onSelectBusiness,
  onSelectCategory: _onSelectCategory,
  onOpenMap,
  onOpenSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSort, setActiveSort] = useState<SortOption>('recommended');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const { t, language } = useLanguage();

  const sortOptions: { id: SortOption; label: string }[] = useMemo(() => [
    { id: 'recommended', label: t('Recommended') },
    { id: 'distance', label: t('Nearest First') },
    { id: 'rating', label: t('Highest Rated') },
    { id: 'newest', label: t('Trending & Popular') },
  ], [t]);

  const filteredBusinesses = useMemo(() => {
    let result = [...businesses];

    // Category filter
    if (selectedCategoryId) {
      result = filterBusinessesByCategory(result, selectedCategoryId);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.categoryName.toLowerCase().includes(q) ||
          b.locality.toLowerCase().includes(q)
      );
    }

    // Sort
    if (activeSort === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (activeSort === 'distance') {
      result.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
    } else if (activeSort === 'newest') {
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [businesses, selectedCategoryId, searchQuery, activeSort]);

  return (
    <div className="w-full min-h-[100dvh] bg-[#F5F8FC] pb-nav">
      {/* Sticky Header with Search & Map Trigger */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] pt-safe px-4 pb-3 shadow-[0_2px_12px_rgba(7,27,82,0.03)]">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div>
            <h1 className="font-brand font-extrabold text-2xl text-[#172033] tracking-tight">
              {t('Explore')} Tizara
            </h1>
            <p className="text-xs text-[#667085]">
              {t('Discover verified businesses across Chennai')}
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenMap}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-tizara-vibrant text-white font-bold text-xs shadow-xs active:scale-95 transition-transform cursor-pointer"
          >
            <Map className="w-4 h-4 stroke-[2.2]" />
            <span>{language === 'Tamil' ? 'வரைபடம்' : 'Map View'}</span>
          </button>
        </div>

        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onFocus={onOpenSearch}
          placeholder="Search by business, service or area..."
        />
      </header>

      {/* Main Content Area */}
      <div className="flex flex-col gap-4 p-4">
        {/* Categories Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#667085] uppercase tracking-wider">
              {t('FILTER BY CATEGORY')}
            </span>
            {selectedCategoryId && (
              <button
                type="button"
                onClick={() => setSelectedCategoryId(null)}
                className="text-xs font-bold text-[#0757D9] cursor-pointer"
              >
                {t('Clear')}
              </button>
            )}
          </div>
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4">
            {CATEGORIES.map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                size="sm"
                isSelected={selectedCategoryId === cat.id}
                onClick={(c) => {
                  setSelectedCategoryId(selectedCategoryId === c.id ? null : c.id);
                }}
              />
            ))}
          </div>
        </div>

        {/* Sort Selector Bar & Counter */}
        <div className="flex items-center justify-between text-xs text-[#667085] pt-2 border-t border-slate-200">
          <span className="font-semibold">
            {t('Showing')} <strong className="text-[#172033]">{filteredBusinesses.length}</strong> {t('businesses')}
          </span>

          <div className="flex items-center gap-1.5">
            <span className="font-medium">{t('Sort:')}</span>
            <select
              value={activeSort}
              onChange={(e) => setActiveSort(e.target.value as SortOption)}
              className="bg-white border border-[#E2E8F0] rounded-lg px-2 py-1 text-xs font-bold text-[#071B52] outline-none cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Business Listing Cards Stack */}
        <div className="flex flex-col gap-4 mt-1">
          {filteredBusinesses.map((b) => (
            <BusinessCard
              key={b.id}
              business={b}
              variant="vertical"
              isFavorite={favorites.includes(b.id)}
              onToggleFavorite={onToggleFavorite}
              onClick={onSelectBusiness}
            />
          ))}

          {filteredBusinesses.length === 0 && (
            <div className="text-center py-12 bg-white rounded-3xl border border-[#E2E8F0] p-6">
              <p className="font-bold text-base text-[#172033]">
                {language === 'Tamil' ? 'வணிகங்கள் எதுவும் பொருந்தவில்லை' : 'No businesses match your filter'}
              </p>
              <p className="text-xs text-[#667085] mt-1">
                {t('Try another business name, category or service.')}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategoryId(null);
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 bg-[#0757D9] text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                {t('Reset Filters')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
