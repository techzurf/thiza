import React, { useState, useMemo } from 'react';
import { ArrowLeft, Search, X, Sparkles } from 'lucide-react';
import { Category } from '../types';
import { ALL_CATEGORIES_LIST } from '../data/allCategories';
import { CategoryIcon } from '../components/common/CategoryIcon';

interface AllCategoriesScreenProps {
  onBack: () => void;
  onSelectCategory: (category: Category) => void;
}

export const AllCategoriesScreen: React.FC<AllCategoriesScreenProps> = ({
  onBack,
  onSelectCategory,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter categories dynamically based on user input
  const filteredCategories = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return ALL_CATEGORIES_LIST;

    return ALL_CATEGORIES_LIST.filter((cat) =>
      cat.name.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="w-full min-h-[100dvh] bg-[#F5F8FC] flex flex-col text-[#172033] pb-12">
      {/* Sticky Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] pt-safe px-4 pb-3.5 shadow-[0_2px_12px_rgba(7,27,82,0.03)]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back"
            className="w-10 h-10 -ml-1 rounded-full flex items-center justify-center text-[#172033] hover:bg-slate-100 active:scale-95 transition-all"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>

          <div>
            <h1 className="font-brand font-extrabold text-xl text-[#071B52] leading-tight">
              All Categories
            </h1>
            <p className="text-xs text-[#667085] mt-0.5">
              Explore businesses and services on Tizara
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
              placeholder="Search categories..."
              className="w-full pl-10 pr-9 py-2.5 bg-[#F5F8FC] border border-[#E2E8F0] rounded-xl text-sm font-medium text-[#172033] placeholder-[#94A3B8] focus:outline-none focus:border-[#0757D9] focus:bg-white focus:ring-2 focus:ring-[#0757D9]/15 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-3 p-1 rounded-full text-[#667085] hover:text-[#172033] hover:bg-slate-200 transition-colors"
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
                Found <strong className="text-[#071B52]">{filteredCategories.length}</strong> {filteredCategories.length === 1 ? 'category' : 'categories'}
              </>
            ) : (
              <>
                All Categories <span className="text-[#0757D9]">({ALL_CATEGORIES_LIST.length})</span>
              </>
            )}
          </span>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-[#0757D9] hover:underline"
            >
              Clear filter
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
                className="group flex flex-col items-center justify-between p-3 bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_2px_8px_rgba(7,27,82,0.03)] hover:shadow-md hover:border-[#008CFF]/50 active:scale-[0.97] transition-all min-h-[112px] text-center"
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
                <span className="text-xs font-semibold text-[#172033] group-hover:text-[#0757D9] leading-tight line-clamp-2 px-0.5 transition-colors">
                  {category.name}
                </span>

                {/* Subtle verified count badge */}
                <span className="text-[10px] text-[#94A3B8] font-medium mt-1">
                  {category.count}+ listings
                </span>
              </button>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-3xl border border-[#E2E8F0] shadow-xs mt-2">
            <div className="w-14 h-14 rounded-2xl bg-[#EBF3FF] flex items-center justify-center text-[#0757D9] mb-3.5">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="font-brand font-bold text-base text-[#172033]">
              No categories found
            </h3>
            <p className="text-xs text-[#667085] mt-1.5 max-w-xs leading-relaxed">
              Try searching for another service like "Doctors", "Restaurants", "Salons", or "Automotive".
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="mt-4 px-4 py-2 bg-[#0757D9] hover:bg-[#008CFF] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
            >
              Show All Categories
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
