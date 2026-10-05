import React, { useState, useMemo } from 'react';
import { ArrowLeft, Search, X } from 'lucide-react';
import { Category } from '../types';
import { ALL_CATEGORIES_LIST } from '../data/allCategories';
import { CategoryIcon } from '../components/common/CategoryIcon';
import { useLanguage } from '../context/LanguageContext';

interface AllCategoriesScreenProps {
  onBack: () => void;
  onSelectCategory: (category: Category) => void;
}

export const AllCategoriesScreen: React.FC<AllCategoriesScreenProps> = ({
  onBack,
  onSelectCategory,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { t, tCategory, language } = useLanguage();

  // Filter categories dynamically based on user input
  const filteredCategories = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return ALL_CATEGORIES_LIST;

    return ALL_CATEGORIES_LIST.filter((cat) =>
      cat.name.toLowerCase().includes(query) ||
      (tCategory(cat.id)).toLowerCase().includes(query)
    );
  }, [searchQuery, tCategory]);

  return (
    <div className="w-full min-h-[100dvh] bg-[#F5F8FC] flex flex-col text-[#172033] pb-12">
      {/* Sticky Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] pt-safe px-4 pb-3.5 shadow-[0_2px_12px_rgba(7,27,82,0.03)]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            aria-label={t('Back')}
            className="w-10 h-10 -ml-1 rounded-full flex items-center justify-center text-[#172033] hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>

          <div>
            <h1 className="font-brand font-extrabold text-xl text-[#071B52] leading-tight">
              {t('All Categories')}
            </h1>
            <p className="text-xs text-[#667085] mt-0.5">
              {t('Discover verified businesses across Chennai')}
            </p>
          </div>
        </div>

        {/* Search Categories Field */}
        <div className="mt-3.5 relative">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-[#667085] absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'Tamil' ? 'வகைகளைத் தேடுங்கள்...' : 'Search categories...'}
              className="w-full pl-10 pr-9 py-2.5 bg-[#F5F8FC] border border-[#E2E8F0] rounded-xl text-sm font-medium text-[#172033] placeholder-[#94A3B8] focus:outline-none focus:border-[#0757D9] focus:bg-white focus:ring-2 focus:ring-[#0757D9]/15 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label={t('Clear')}
                className="absolute right-3 p-1 rounded-full text-[#667085] hover:text-[#172033] hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="px-4 pt-4 flex-1">
        {/* Results Counter / Section Label */}
        <div className="flex items-center justify-between mb-3 text-xs font-semibold text-[#667085]">
          <span>
            {searchQuery ? (
              <>
                {t('Showing')} <strong className="text-[#071B52]">{filteredCategories.length}</strong> {t('businesses')}
              </>
            ) : (
              <>
                {t('All Categories')} <span className="text-[#0757D9]">({ALL_CATEGORIES_LIST.length})</span>
              </>
            )}
          </span>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-[#0757D9] hover:underline cursor-pointer"
            >
              {t('Clear')}
            </button>
          )}
        </div>

        {/* Categories Grid (3-column mobile grid with large icons) */}
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
            {filteredCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => onSelectCategory(category)}
                className="group flex flex-col items-center justify-between p-3 bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_2px_8px_rgba(7,27,82,0.03)] hover:shadow-md hover:border-[#008CFF]/50 active:scale-[0.97] transition-all min-h-[112px] text-center cursor-pointer"
              >
                {/* Large Category Icon Container */}
                <div
                  className="w-13 h-13 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-xs mb-2"
                  style={{
                    backgroundColor: category.bgColor,
                  }}
                >
                  {category.id === 'automotive' ? (
                    <img
                      src="https://res.cloudinary.com/jevuqbu8/image/upload/v1790407256/new-car_1.gif"
                      alt={category.name}
                      className="w-7 h-7 object-contain block"
                      loading="eager"
                    />
                  ) : category.fontIconClass ? (
                    <i
                      className={`${category.fontIconClass} text-[26px] inline-flex items-center justify-center transition-colors`}
                      style={{
                        fontSize: '26px',
                        color: category.color,
                        lineHeight: 1,
                      }}
                    />
                  ) : (
                    <CategoryIcon
                      name={category.iconName}
                      className="w-7 h-7 transition-colors"
                      style={{
                        color: category.color,
                      }}
                    />
                  )}
                </div>

                {/* Category Name */}
                <span className="font-bold text-xs text-[#172033] line-clamp-1 leading-tight group-hover:text-[#0757D9] transition-colors">
                  {tCategory(category.id || category.name)}
                </span>

                {/* Verified business count */}
                <span className="text-[10px] text-[#667085] mt-0.5">
                  {category.count}+ {t('businesses')}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4">
            <div className="w-14 h-14 rounded-2xl bg-[#F5F8FC] flex items-center justify-center mx-auto mb-3 text-slate-400">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-brand font-bold text-base text-[#172033]">
              {t('No businesses found')}
            </h3>
            <p className="text-xs text-[#667085] mt-1 max-w-xs mx-auto">
              {t('Try another business name, category or service.')}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};
