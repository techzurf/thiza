import React, { useState, useMemo } from 'react';
import { ArrowLeft, Search, Clock, TrendingUp, X, Sparkles } from 'lucide-react';
import { Business } from '../types';
import { SEARCH_SUGGESTIONS } from '../data/mockBusinesses';
import { SearchBar } from '../components/common/SearchBar';
import { BusinessCard } from '../components/common/BusinessCard';

interface SearchResultsScreenProps {
  initialQuery?: string;
  businesses: Business[];
  favorites: string[];
  onBack: () => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectBusiness: (business: Business) => void;
}

export const SearchResultsScreen: React.FC<SearchResultsScreenProps> = ({
  initialQuery = '',
  businesses,
  favorites,
  onBack,
  onToggleFavorite,
  onSelectBusiness,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Mobile Shops',
    'Noor Electronics',
    'Dental Clinic Chetpet',
    'Coastal Dining',
  ]);

  const removeRecent = (search: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches(recentSearches.filter((s) => s !== search));
  };

  const handleSelectTag = (tag: string) => {
    setQuery(tag);
  };

  const searchResults = useMemo(() => {
    if (!query.trim()) {
      return businesses;
    }
    const q = query.toLowerCase();
    return businesses.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.categoryName.toLowerCase().includes(q) ||
        b.locality.toLowerCase().includes(q) ||
        b.tagline.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.services.some((s) => s.name.toLowerCase().includes(q))
    );
  }, [businesses, query]);

  return (
    <div className="w-full min-h-[100dvh] bg-[#F5F8FC] pb-nav">
      {/* Top Search Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] pt-safe px-4 pb-3 shadow-[0_2px_12px_rgba(7,27,82,0.03)]">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back"
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#172033] hover:bg-slate-100 active:scale-95 transition-all shrink-0"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>

          <div className="flex-1">
            <SearchBar
              value={query}
              onChange={setQuery}
              autoFocus={true}
              placeholder="Search businesses, services..."
            />
          </div>
        </div>
      </header>

      {/* Main Search Body */}
      <main className="p-4 flex flex-col gap-4">
        {/* Recent Searches Section (shown when no deep query or for quick access) */}
        {recentSearches.length > 0 && !query && (
          <section className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-xs">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#667085] uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5 text-[#0757D9]" />
                <span>Recent Searches</span>
              </div>
              <button
                type="button"
                onClick={() => setRecentSearches([])}
                className="text-xs font-semibold text-[#0757D9]"
              >
                Clear All
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {recentSearches.map((item) => (
                <div
                  key={item}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleSelectTag(item)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSelectTag(item)}
                  className="flex items-center gap-1.5 bg-[#F5F8FC] hover:bg-[#EBF3FF] text-[#172033] px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors"
                >
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={(e) => removeRecent(item, e)}
                    className="text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Popular Searches */}
        {!query && (
          <section className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#667085] uppercase tracking-wider mb-2.5">
              <TrendingUp className="w-3.5 h-3.5 text-[#008CFF]" />
              <span>Popular Searches</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {SEARCH_SUGGESTIONS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleSelectTag(tag)}
                  className="bg-[#F5F8FC] hover:bg-[#E8F5FF] text-[#0757D9] px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Results Header */}
        <div className="flex items-center justify-between text-xs text-[#667085]">
          <span>
            {query ? (
              <>
                <strong className="text-[#172033]">{searchResults.length}</strong> businesses found for &quot;{query}&quot;
              </>
            ) : (
              <span>Recommended businesses</span>
            )}
          </span>
          <span className="font-semibold text-[#0757D9]">Chennai</span>
        </div>

        {/* Compact Result Cards */}
        <div className="flex flex-col gap-3">
          {searchResults.map((b) => (
            <BusinessCard
              key={b.id}
              business={b}
              variant="compact"
              isFavorite={favorites.includes(b.id)}
              onToggleFavorite={onToggleFavorite}
              onClick={onSelectBusiness}
            />
          ))}

          {searchResults.length === 0 && (
            <div className="text-center py-12 bg-white rounded-3xl border border-[#E2E8F0] p-6">
              <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="font-bold text-base text-[#172033]">
                No businesses found for &quot;{query}&quot;
              </p>
              <p className="text-xs text-[#667085] mt-1">
                Try searching with another keyword like &quot;Mobile&quot;, &quot;Salon&quot; or &quot;Dining&quot;.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
