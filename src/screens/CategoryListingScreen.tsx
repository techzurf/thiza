import React, { useState, useMemo } from 'react';
import { ArrowLeft, SlidersHorizontal, LayoutGrid, List, Star, ShieldCheck } from 'lucide-react';
import { Business, Category } from '../types';
import { BusinessCard } from '../components/common/BusinessCard';

interface CategoryListingScreenProps {
  category: Category;
  businesses: Business[];
  favorites: string[];
  onBack: () => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectBusiness: (business: Business) => void;
}

export const CategoryListingScreen: React.FC<CategoryListingScreenProps> = ({
  category,
  businesses,
  favorites,
  onBack,
  onToggleFavorite,
  onSelectBusiness,
}) => {
  const [viewMode, setViewMode] = useState<'card' | 'compact'>('card');
  const [filterRating, setFilterRating] = useState<boolean>(false);
  const [filterOpenNow, setFilterOpenNow] = useState<boolean>(false);
  const [filterOffers, setFilterOffers] = useState<boolean>(false);
  const [filterDistance, setFilterDistance] = useState<boolean>(false);

  const categoryBusinesses = useMemo(() => {
    const catId = category.id.toLowerCase();
    const catName = category.name.toLowerCase();

    // Smart semantic matching across mock businesses
    let list = businesses.filter((b) => {
      const bCat = b.category.toLowerCase();
      const bName = b.categoryName.toLowerCase();
      const bDesc = (b.tagline + ' ' + b.description).toLowerCase();

      // Direct category match
      if (bCat === catId || bName.includes(catName) || catName.includes(bCat)) {
        return true;
      }

      // Domain-specific matching
      if (catId.includes('doctor') || catId.includes('medic') || catId.includes('dental') || catId.includes('health') || catId.includes('pharm') || catId.includes('diag') || catId.includes('clinic')) {
        return bCat === 'doctors' || bName.includes('health') || bName.includes('clinic') || bName.includes('care');
      }
      if (catId.includes('rest') || catId.includes('cafe') || catId.includes('bake') || catId.includes('cater') || catId.includes('food')) {
        return bCat === 'restaurants' || bName.includes('bistro') || bName.includes('kitchen') || bName.includes('cafe');
      }
      if (catId.includes('auto') || catId.includes('car') || catId.includes('bike')) {
        return bCat === 'automotive' || bName.includes('motor') || bName.includes('auto');
      }
      if (catId.includes('educ') || catId.includes('school') || catId.includes('college') || catId.includes('coach') || catId.includes('train')) {
        return bCat === 'education' || bName.includes('academy') || bName.includes('learning');
      }
      if (catId.includes('clean') || catId.includes('plumb') || catId.includes('elect') || catId.includes('ac-') || catId.includes('repair') || catId.includes('home') || catId.includes('laundry')) {
        return bCat === 'services' || bName.includes('service') || bName.includes('repair');
      }
      if (catId.includes('legal') || catId.includes('account') || catId.includes('insur') || catId.includes('softw') || catId.includes('market') || catId.includes('job') || catId.includes('prof')) {
        return bCat === 'professionals' || bName.includes('legal') || bName.includes('advisory');
      }
      if (catId.includes('shop') || catId.includes('fash') || catId.includes('groc') || catId.includes('furn') || catId.includes('jewel') || catId.includes('hardw') || catId.includes('print')) {
        return bCat === 'shopping' || bName.includes('threads') || bName.includes('store') || bName.includes('hub');
      }
      if (catId.includes('tour') || catId.includes('hajj') || catId.includes('travel')) {
        return bCat === 'travel' || bName.includes('travel') || bName.includes('horizon');
      }
      if (catId.includes('hotel')) {
        return bCat === 'hotels' || bName.includes('hotel') || bName.includes('resort');
      }
      if (catId.includes('salon') || catId.includes('beauty')) {
        return bCat === 'salons' || bName.includes('salon') || bName.includes('spa');
      }
      if (catId.includes('real-estate') || catId.includes('construct') || catId.includes('interior')) {
        return bCat === 'real-estate' || bName.includes('realty') || bName.includes('properties');
      }
      if (catId.includes('electron') || catId.includes('mobile')) {
        return bCat === 'electronics' || bName.includes('mobile') || bName.includes('tech');
      }
      return bDesc.includes(catName);
    });

    if (list.length === 0) {
      list = businesses.slice(0, 4); // fallback graceful showcase
    }

    if (filterRating) {
      list = list.filter((b) => b.rating >= 4.8);
    }
    if (filterOpenNow) {
      list = list.filter((b) => b.isOpen);
    }
    if (filterOffers) {
      list = list.filter((b) => b.offers.length > 0);
    }
    if (filterDistance) {
      list = list.filter((b) => parseFloat(b.distance) <= 2.0);
    }

    return list;
  }, [businesses, category.id, filterRating, filterOpenNow, filterOffers, filterDistance]);

  return (
    <div className="w-full min-h-[100dvh] bg-[#F5F8FC] pb-nav">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] pt-safe px-4 pb-3 shadow-[0_2px_12px_rgba(7,27,82,0.03)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              aria-label="Back"
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#172033] hover:bg-slate-100 active:scale-95 transition-all"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
            </button>

            <div>
              <h1 className="font-brand font-extrabold text-xl text-[#172033]">
                {category.name}
              </h1>
              <p className="text-xs text-[#667085]">
                {category.count} Businesses in Chennai
              </p>
            </div>
          </div>

          {/* List vs Card toggle */}
          <div className="flex items-center bg-[#F5F8FC] p-1 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode('card')}
              className={`p-1.5 rounded-lg transition-colors ${
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
              className={`p-1.5 rounded-lg transition-colors ${
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

        {/* Filter Chips Bar */}
        <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none">
          <button
            type="button"
            onClick={() => setFilterRating(!filterRating)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1 ${
              filterRating
                ? 'bg-[#0757D9] text-white'
                : 'bg-white text-[#667085] border border-[#E2E8F0]'
            }`}
          >
            <Star className="w-3 h-3 fill-current" />
            <span>4.8+ Rating</span>
          </button>

          <button
            type="button"
            onClick={() => setFilterDistance(!filterDistance)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              filterDistance
                ? 'bg-[#0757D9] text-white'
                : 'bg-white text-[#667085] border border-[#E2E8F0]'
            }`}
          >
            {'< 2 km Distance'}
          </button>

          <button
            type="button"
            onClick={() => setFilterOpenNow(!filterOpenNow)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              filterOpenNow
                ? 'bg-[#0757D9] text-white'
                : 'bg-white text-[#667085] border border-[#E2E8F0]'
            }`}
          >
            Open Now
          </button>

          <button
            type="button"
            onClick={() => setFilterOffers(!filterOffers)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              filterOffers
                ? 'bg-[#0757D9] text-white'
                : 'bg-white text-[#667085] border border-[#E2E8F0]'
            }`}
          >
            Offers Available
          </button>
        </div>
      </header>

      {/* List content */}
      <main className="p-4 flex flex-col gap-3.5">
        <div className="flex items-center justify-between text-xs text-[#667085]">
          <span>
            Showing <strong className="text-[#172033]">{categoryBusinesses.length}</strong> verified listings
          </span>
          <span className="text-[#0757D9] font-bold">Sorted by Popularity</span>
        </div>

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

        {categoryBusinesses.length === 0 && (
          <div className="text-center py-12 bg-white rounded-3xl border border-[#E2E8F0] p-6">
            <p className="font-bold text-base text-[#172033]">
              No listings found with these filters
            </p>
            <p className="text-xs text-[#667085] mt-1">
              Try clearing some filters to see all businesses in {category.name}.
            </p>
            <button
              type="button"
              onClick={() => {
                setFilterRating(false);
                setFilterOpenNow(false);
                setFilterOffers(false);
                setFilterDistance(false);
              }}
              className="mt-4 px-4 py-2 bg-[#0757D9] text-white text-xs font-bold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
