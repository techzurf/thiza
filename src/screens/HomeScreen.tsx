import React, { useRef, useEffect } from 'react';
import {
  ChevronRight,
  ShieldCheck,
  Star,
  Compass,
  Send,
  Sparkles,
  SlidersHorizontal,
} from 'lucide-react';
import { Business, BusinessOffer, Category } from '../types';
import { CATEGORIES, ALL_OFFERS } from '../data/mockBusinesses';
import { Header } from '../components/common/Header';
import { SearchBar } from '../components/common/SearchBar';
import { CategoryCard } from '../components/common/CategoryCard';
import { BusinessCard } from '../components/common/BusinessCard';
import { OfferCard } from '../components/common/OfferCard';

interface HomeScreenProps {
  currentLocation: string;
  onOpenLocationModal: () => void;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  onSearchFocus: () => void;
  onSelectCategory: (cat: Category) => void;
  onSelectBusiness: (business: Business) => void;
  onSelectOffer: (offer: BusinessOffer) => void;
  onViewAllCategories: () => void;
  onViewAllOffers: () => void;
  onViewAllPopular: () => void;
  onFindVideoClick?: () => void;
  businesses: Business[];
  favorites: string[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  unreadCount?: number;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  currentLocation,
  onOpenLocationModal,
  onOpenNotifications,
  onOpenProfile,
  onSearchFocus,
  onSelectCategory,
  onSelectBusiness,
  onSelectOffer,
  onViewAllCategories,
  onViewAllOffers,
  onViewAllPopular,
  onFindVideoClick,
  businesses,
  favorites,
  onToggleFavorite,
  unreadCount = 2,
}) => {
  const featuredBusinesses = businesses.filter((b) => b.isFeatured);
  const popularBusinesses = [...businesses].sort((a, b) => b.rating - a.rating);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.defaultMuted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className="w-full min-h-[100dvh] bg-[#F5F8FC] pb-nav">
      {/* Native App Top Header */}
      <Header
        currentLocation={currentLocation}
        onLocationClick={onOpenLocationModal}
        onNotificationClick={onOpenNotifications}
        onProfileClick={onOpenProfile}
        unreadCount={unreadCount}
      />

      {/* Main Container */}
      <main className="flex flex-col gap-6">
        {/* Hero Section & Search Header */}
        <section className="bg-white px-4 pt-5 pb-6 border-b border-[#E2E8F0] shadow-[0_2px_10px_rgba(7,27,82,0.02)]">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#0757D9] uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#008CFF]" />
            <span>Discover Local Quality</span>
          </div>

          <h1 className="font-brand font-extrabold text-2xl text-[#172033] tracking-tight">
            What are you looking for?
          </h1>

          <div className="mt-3.5">
            <SearchBar
              value=""
              isReadOnly
              onFocus={onSearchFocus}
              onChange={() => {}}
              placeholder="Search businesses, services, products..."
              onFilterClick={onSearchFocus}
            />
          </div>

          {/* Quick Search Chips */}
          <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] font-semibold text-[#667085] shrink-0">
              Popular:
            </span>
            {['Mobile Shops', 'Restaurants', 'Clinics', 'Salons', 'Car Care'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={onSearchFocus}
                className="text-[11px] font-semibold text-[#0757D9] bg-[#E8F5FF] hover:bg-[#D4E8FF] px-2.5 py-1 rounded-full shrink-0 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </section>

        {/* SECTION: Explore Categories */}
        <section className="px-4">
          <div className="flex items-center justify-between mb-3.5">
            <div>
              <h2 className="font-brand font-bold text-lg text-[#172033]">
                Explore Categories
              </h2>
              <p className="text-xs text-[#667085]">
                Discover verified businesses across Chennai
              </p>
            </div>

            <button
              type="button"
              onClick={onViewAllCategories}
              className="text-xs font-bold text-[#0757D9] hover:text-[#008CFF] flex items-center gap-0.5 min-h-[44px] py-2"
            >
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* 4-column responsive category grid */}
          <div className="grid grid-cols-4 gap-y-4 gap-x-2 bg-white p-4 rounded-3xl border border-[#E2E8F0] shadow-xs items-stretch">
            {/* Video Tile spanning the combined visual area of Restaurants + Travel */}
            <button
              type="button"
              onClick={onFindVideoClick}
              aria-label="Discover"
              className="row-span-2 col-span-1 relative flex items-center justify-center w-full h-full min-h-[148px] rounded-2xl overflow-hidden cursor-pointer focus:outline-none transition-transform active:scale-95 bg-[#071B52] shadow-xs"
            >
              <video
                ref={videoRef}
                src="https://res.cloudinary.com/jevuqbu8/video/upload/v1790410373/Find_2.mp4"
                autoPlay
                muted
                loop
                playsInline
                webkit-playsinline="true"
                x5-playsinline="true"
                disablePictureInPicture
                controlsList="nodownload nofullscreen noremoteplayback"
                className="w-full h-full object-cover rounded-2xl block pointer-events-none"
                style={{ objectFit: 'cover' }}
              />
            </button>

            {/* Remaining 6 categories: Shopping, Doctors, Education, Hotels, Salons, Automotive */}
            {CATEGORIES.slice(0, 8)
              .filter((cat) => cat.id !== 'restaurants' && cat.id !== 'travel')
              .map((cat) => (
                <CategoryCard
                  key={cat.id}
                  category={cat}
                  videoUrl={
                    cat.id === 'automotive'
                      ? 'https://res.cloudinary.com/jevuqbu8/video/upload/v1790406938/new-car.mp4'
                      : undefined
                  }
                  fontIconClass={
                    cat.id === 'doctors'
                      ? 'fi fi-sr-user-md'
                      : cat.id === 'education'
                      ? 'fi fi-ss-graduation-cap'
                      : undefined
                  }
                  onClick={onSelectCategory}
                />
              ))}
          </div>
        </section>

        {/* SECTION: Featured on Tizara */}
        <section className="px-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="font-brand font-bold text-lg text-[#172033]">
                Featured on Tizara
              </h2>
              <p className="text-xs text-[#667085]">
                Hand-picked top verified partners
              </p>
            </div>
          </div>

          {/* Horizontal scrollable cards */}
          <div className="flex items-center gap-3.5 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none">
            {featuredBusinesses.map((b) => (
              <BusinessCard
                key={b.id}
                business={b}
                variant="horizontal"
                isFavorite={favorites.includes(b.id)}
                onToggleFavorite={onToggleFavorite}
                onClick={onSelectBusiness}
              />
            ))}
          </div>
        </section>

        {/* SECTION: Offers Near You */}
        <section className="px-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="font-brand font-bold text-lg text-[#172033]">
                Offers Near You
              </h2>
              <p className="text-xs text-[#667085]">
                Exclusive deals for Tizara members
              </p>
            </div>

            <button
              type="button"
              onClick={onViewAllOffers}
              className="text-xs font-bold text-[#0757D9] hover:text-[#008CFF] flex items-center gap-0.5 min-h-[44px] py-2"
            >
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Horizontal compact offer cards */}
          <div className="flex items-center gap-3.5 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none">
            {ALL_OFFERS.slice(0, 4).map((offer) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                compact
                onViewOffer={onSelectOffer}
                onSelectBusiness={(id) => {
                  const b = businesses.find((item) => item.id === id);
                  if (b) onSelectBusiness(b);
                }}
              />
            ))}
          </div>
        </section>

        {/* SECTION: Popular Near You */}
        <section className="px-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="font-brand font-bold text-lg text-[#172033]">
                Popular Near You
              </h2>
              <p className="text-xs text-[#667085]">
                Highly rated by local customers
              </p>
            </div>

            <button
              type="button"
              onClick={onViewAllPopular}
              className="text-xs font-bold text-[#0757D9] hover:text-[#008CFF] flex items-center gap-0.5 min-h-[44px] py-2"
            >
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Vertical cards stack */}
          <div className="flex flex-col gap-4">
            {popularBusinesses.slice(0, 4).map((b) => (
              <BusinessCard
                key={b.id}
                business={b}
                variant="vertical"
                isFavorite={favorites.includes(b.id)}
                onToggleFavorite={onToggleFavorite}
                onClick={onSelectBusiness}
              />
            ))}
          </div>
        </section>

        {/* SECTION: Why Tizara? */}
        <section className="px-4 mb-2">
          <div className="bg-gradient-to-br from-[#071B52] to-[#0757D9] text-white p-5 rounded-3xl shadow-sm">
            <h3 className="font-brand font-bold text-base text-white">
              Why Tizara?
            </h3>
            <p className="text-xs text-white/80 mt-1 mb-4">
              Building authentic trust between local customers and high-standard businesses.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/10">
                <ShieldCheck className="w-6 h-6 text-[#08D9F5] mb-1.5" />
                <h4 className="font-bold text-xs text-white">Verified Businesses</h4>
                <p className="text-[11px] text-white/70 mt-0.5">Checked identity & address</p>
              </div>

              <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/10">
                <Star className="w-6 h-6 text-[#08D9F5] mb-1.5" />
                <h4 className="font-bold text-xs text-white">Trusted Reviews</h4>
                <p className="text-[11px] text-white/70 mt-0.5">Real verified customer feedback</p>
              </div>

              <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/10">
                <Compass className="w-6 h-6 text-[#08D9F5] mb-1.5" />
                <h4 className="font-bold text-xs text-white">Local Discovery</h4>
                <p className="text-[11px] text-white/70 mt-0.5">Find nearby gems quickly</p>
              </div>

              <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/10">
                <Send className="w-6 h-6 text-[#08D9F5] mb-1.5" />
                <h4 className="font-bold text-xs text-white">Easy Enquiries</h4>
                <p className="text-[11px] text-white/70 mt-0.5">Direct quotes & instant chat</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
