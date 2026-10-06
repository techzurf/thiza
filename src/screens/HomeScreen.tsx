import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  ChevronRight,
  Sparkles,
  SlidersHorizontal,
  MapPin,
  Star,
  SearchX,
  ArrowRight,
  X,
} from 'lucide-react';
import { Business, BusinessOffer, Category } from '../types';
import { CATEGORIES, ALL_OFFERS } from '../data/mockBusinesses';
import { Header } from '../components/common/Header';
import { SearchBar } from '../components/common/SearchBar';
import { CategoryCard } from '../components/common/CategoryCard';
import { BusinessCard } from '../components/common/BusinessCard';
import { OfferCard } from '../components/common/OfferCard';
import { HomePromoCarousel } from '../components/home/HomePromoCarousel';
import { filterBusinesses } from '../utils/searchMatcher';
import { useLanguage } from '../context/LanguageContext';

interface LocalServiceItem {
  id: string;
  title: string;
  image: string;
  categorySlug: string;
}

const COMPACT_SERVICES: LocalServiceItem[] = [
  {
    id: 'ac-repair',
    title: 'AC Service',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=200&q=80',
    categorySlug: 'services',
  },
  {
    id: 'pest-control',
    title: 'Pest Control',
    image: 'https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&w=200&q=80',
    categorySlug: 'services',
  },
  {
    id: 'packers-movers',
    title: 'Packers & Movers',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=200&q=80',
    categorySlug: 'services',
  },
  {
    id: 'deep-cleaning',
    title: 'Cleaning Services',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=200&q=80',
    categorySlug: 'services',
  },
  {
    id: 'plumbing',
    title: 'Plumbing Services',
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=200&q=80',
    categorySlug: 'services',
  },
  {
    id: 'electricians',
    title: 'Electrician',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=200&q=80',
    categorySlug: 'services',
  },
];

const HOME_SERVICES_3D_LAYERS = [
  { z: -1.5, color: '#00D0F5' },
  { z: -3.0, color: '#00B8E6' },
  { z: -4.5, color: '#00A8DE' },
  { z: -6.0, color: '#0099D6' },
  { z: -7.5, color: '#008BCE' },
  { z: -9.0, color: '#007DC5' },
  { z: -10.5, color: '#0077C8' },
  { z: -12.0, color: '#0066BC' },
  { z: -13.5, color: '#005FAF' },
  { z: -15.0, color: '#074896' },
];

interface HomeScreenProps {
  currentLocation: string;
  onOpenLocationModal: () => void;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  onSearchFocus: () => void;
  onSearchSubmit?: (query: string) => void;
  onSelectCategory: (cat: Category) => void;
  onSelectBusiness: (business: Business) => void;
  onSelectOffer: (offer: BusinessOffer) => void;
  onViewAllCategories: () => void;
  onViewAllOffers: () => void;
  onViewAllPopular: () => void;
  onFindVideoClick?: () => void;
  onSelectAcService?: () => void;
  onSelectPestControl?: () => void;
  onSelectElectrician?: () => void;
  onSelectCleaningService?: () => void;
  onSelectPackersMovers?: () => void;
  onSelectPlumbingService?: () => void;
  onListBusiness?: () => void;
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
  onSearchSubmit,
  onSelectCategory,
  onSelectBusiness,
  onSelectOffer,
  onViewAllCategories,
  onViewAllOffers,
  onViewAllPopular,
  onFindVideoClick,
  onSelectAcService,
  onSelectPestControl,
  onSelectElectrician,
  onSelectCleaningService,
  onSelectPackersMovers,
  onSelectPlumbingService,
  onListBusiness,
  businesses,
  favorites,
  onToggleFavorite,
  unreadCount = 2,
}) => {
  const { t, tCategory, language } = useLanguage();
  const EXCLUDED_FEATURED_IDS = ['b5', 'b11', 'b12', 'b20'];
  const EXCLUDED_FEATURED_NAMES = [
    'Urban Threads',
    'Aura Unisex Salon & Spa',
    'Grand Marina Bay Hotel',
  ];
  const featuredBusinesses = businesses.filter(
    (b) =>
      b.isFeatured &&
      !EXCLUDED_FEATURED_IDS.includes(b.id) &&
      !EXCLUDED_FEATURED_NAMES.includes(b.name)
  );
  const popularBusinesses = [...businesses].sort((a, b) => b.rating - a.rating);

  // Offers belonging strictly to businesses in the currently selected location
  const locationOffers = useMemo(() => {
    return ALL_OFFERS.filter((o) =>
      businesses.some((b) => b.id === o.businessId)
    );
  }, [businesses]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const homeServicesCardRef = useRef<HTMLDivElement>(null);
  const [isHomeServicesVisible, setIsHomeServicesVisible] = useState(false);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | null>(null);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsSearchDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, []);

  // Filtered search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim() && !selectedCategoryFilter) {
      return [];
    }
    return filterBusinesses(businesses, searchQuery, selectedCategoryFilter);
  }, [businesses, searchQuery, selectedCategoryFilter]);

  // Voice Search handler
  const handleVoiceSearch = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-IN';
        recognition.start();
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            setSearchQuery(transcript);
            setIsSearchDropdownOpen(true);
          }
        };
      } catch (err) {
        // Voice recognition error fallback
      }
    }
  };

  const handleServiceClick = (service: LocalServiceItem) => {
    // 1. Packers & Movers
    if (
      service.id === 'packers-movers' ||
      service.title.toLowerCase().includes('packer') ||
      service.title.toLowerCase().includes('mover')
    ) {
      if (onSelectPackersMovers) {
        onSelectPackersMovers();
        return;
      }
    }

    // 2. AC Service (use word boundary \bac\b or air condition, not substring 'ac' which matches 'packers')
    if (
      service.id === 'ac-repair' ||
      service.id === 'ac-service' ||
      /\bac\b/i.test(service.title) ||
      service.title.toLowerCase().includes('air condition')
    ) {
      if (onSelectAcService) {
        onSelectAcService();
        return;
      }
    }

    // 3. Pest Control
    if (
      service.id === 'pest-control' ||
      service.title.toLowerCase().includes('pest')
    ) {
      if (onSelectPestControl) {
        onSelectPestControl();
        return;
      }
    }

    // 4. Electrician
    if (
      service.id === 'electricians' ||
      service.id === 'electrician' ||
      service.title.toLowerCase().includes('electr')
    ) {
      if (onSelectElectrician) {
        onSelectElectrician();
        return;
      }
    }

    // 5. Cleaning Services
    if (
      service.id === 'deep-cleaning' ||
      service.id === 'cleaning-services' ||
      service.title.toLowerCase().includes('clean')
    ) {
      if (onSelectCleaningService) {
        onSelectCleaningService();
        return;
      }
    }

    // 6. Plumbing Services
    if (
      service.id === 'plumbing' ||
      service.id === 'plumbing-services' ||
      service.title.toLowerCase().includes('plumb')
    ) {
      if (onSelectPlumbingService) {
        onSelectPlumbingService();
        return;
      }
    }

    const targetCategory =
      CATEGORIES.find((c) => c.id === service.categorySlug) ||
      CATEGORIES.find((c) => c.id === 'services') ||
      CATEGORIES[0];
    onSelectCategory(targetCategory);
  };

  useEffect(() => {
    const el = homeServicesCardRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsHomeServicesVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHomeServicesVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
        {/* Hero Section & Search Header with Background Banner */}
        <section
          className="relative px-4 pt-5 pb-6 border-b border-[#E2E8F0] shadow-[0_2px_12px_rgba(7,27,82,0.04)] overflow-visible bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://res.cloudinary.com/dv16a8l1l/image/upload/v1790664810/Vesa_Online_Shopping_Banner_m81vqz.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Subtle translucent overlay to ensure crisp readability while keeping the banner clearly visible */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/65 to-white/80 backdrop-blur-[1px] pointer-events-none" />

          {/* Foreground content container */}
          <div className="relative z-10">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#0757D9] uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#008CFF]" />
              <span className="drop-shadow-xs">{t('Discover Local Quality')}</span>
            </div>

            <h1 className="font-brand font-extrabold text-2xl text-[#172033] tracking-tight drop-shadow-xs">
              {language === 'Tamil' ? 'நீங்கள் என்ன தேடுகிறீர்கள்?' : 'What are you looking for?'}
            </h1>

            <div className="mt-3.5 relative z-30" ref={searchContainerRef}>
              <SearchBar
                value={searchQuery}
                isReadOnly={false}
                onFocus={() => {
                  if (searchQuery.trim().length > 0) {
                    setIsSearchDropdownOpen(true);
                  }
                }}
                onChange={(val) => {
                  setSearchQuery(val);
                  setIsSearchDropdownOpen(val.trim().length > 0);
                }}
                onSearch={() => {
                  if (searchQuery.trim()) {
                    setIsSearchDropdownOpen(false);
                    if (onSearchSubmit) {
                      onSearchSubmit(searchQuery);
                    } else {
                      onSearchFocus();
                    }
                  }
                }}
                placeholder="Search businesses, services, products..."
                onFilterClick={onSearchFocus}
                onVoiceClick={handleVoiceSearch}
              />

              {/* Active Category Filter Tag if selected */}
              {selectedCategoryFilter && (
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="text-[11px] font-semibold text-[#475467]">
                    Searching in:
                  </span>
                  <div className="inline-flex items-center gap-1 bg-[#0757D9] text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-2xs">
                    <span>{selectedCategoryFilter}</span>
                    <button
                      type="button"
                      onClick={() => setSelectedCategoryFilter(null)}
                      className="hover:opacity-80 p-0.5 cursor-pointer"
                      aria-label="Remove category filter"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}

              {/* Live search results dropdown */}
              {isSearchDropdownOpen && searchQuery.trim().length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-[#E2E8F0] shadow-2xl overflow-hidden z-50 max-h-[380px] flex flex-col">
                  {searchResults.length > 0 ? (
                    <>
                      <div className="px-3.5 py-2 bg-[#F8FAFD] border-b border-[#E2E8F0] flex items-center justify-between text-[11px] font-bold text-[#64748B]">
                        <span>Matching Businesses ({searchResults.length})</span>
                        {selectedCategoryFilter && (
                          <span className="text-[#0757D9]">in {selectedCategoryFilter}</span>
                        )}
                      </div>

                      <div className="overflow-y-auto divide-y divide-[#F1F5F9] max-h-[290px] scrollbar-thin">
                        {searchResults.map((b) => (
                          <button
                            key={b.id}
                            type="button"
                            onClick={() => {
                              setIsSearchDropdownOpen(false);
                              onSelectBusiness(b);
                            }}
                            className="w-full p-3 flex items-center gap-3 text-left hover:bg-[#F8FAFD] active:bg-[#EBF3FF] transition-colors cursor-pointer"
                          >
                            {/* Existing Business Image */}
                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-[#E2E8F0] shadow-2xs">
                              <img
                                src={b.coverImage || b.gallery[0] || 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=200&q=80'}
                                alt={b.name}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            </div>

                            {/* Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <h4 className="font-brand font-bold text-sm text-[#172033] truncate">
                                  {b.name}
                                </h4>
                                <div className="flex items-center gap-1 shrink-0 bg-[#FFF9E6] px-1.5 py-0.5 rounded text-[11px] font-bold text-[#B58500]">
                                  <Star className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />
                                  <span>{b.rating.toFixed(1)}</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 mt-0.5 text-xs text-[#64748B]">
                                <span className="font-semibold text-[#0757D9] truncate">
                                  {b.categoryName}
                                </span>
                                <span>•</span>
                                <span className="truncate flex items-center gap-0.5">
                                  <MapPin className="w-3 h-3 shrink-0 text-[#94A3B8]" />
                                  <span>{b.locality || b.city}</span>
                                </span>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>

                      {/* Footer: View all results on full search page */}
                      <button
                        type="button"
                        onClick={() => {
                          setIsSearchDropdownOpen(false);
                          if (onSearchSubmit) {
                            onSearchSubmit(searchQuery);
                          } else {
                            onSearchFocus();
                          }
                        }}
                        className="p-3 text-center text-xs font-bold text-[#0757D9] bg-[#F8FAFD] border-t border-[#E2E8F0] hover:bg-[#EBF3FF] active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>View all {searchResults.length} results</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </>
                  ) : (
                    <div className="py-7 px-4 text-center">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-2 text-[#64748B]">
                        <SearchX className="w-5 h-5 stroke-[2]" />
                      </div>
                      <p className="font-brand font-bold text-sm text-[#172033]">
                        No businesses found
                      </p>
                      <p className="text-xs text-[#64748B] mt-1 max-w-[240px] mx-auto">
                        Try another business name, category or service.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quick Search Chips */}
            <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[11px] font-semibold text-[#475467] shrink-0 bg-white/70 px-2 py-0.5 rounded-md backdrop-blur-xs shadow-2xs">
                {t('Popular:')}
              </span>
              {['Mobile Shops', 'Restaurants', 'Clinics', 'Salons', 'Car Care'].map((tag) => {
                const isSelected = searchQuery === tag || selectedCategoryFilter === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      if (isSelected) {
                        setSearchQuery('');
                        setSelectedCategoryFilter(null);
                        setIsSearchDropdownOpen(false);
                      } else {
                        setSearchQuery(tag);
                        setSelectedCategoryFilter(null);
                        setIsSearchDropdownOpen(true);
                      }
                    }}
                    className={`text-[11px] font-semibold border shadow-xs px-2.5 py-1 rounded-full shrink-0 transition-colors backdrop-blur-xs cursor-pointer ${
                      isSelected
                        ? 'bg-[#0757D9] text-white border-[#0757D9]'
                        : 'text-[#0757D9] bg-white/90 hover:bg-white border-[#E2E8F0]/70'
                    }`}
                  >
                    {t(tag)}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION: Explore Categories */}
        <section className="px-4">
          <div className="flex items-center justify-between mb-3.5">
            <div>
              <h2 className="font-brand font-bold text-lg text-[#172033]">
                {t('Explore Categories')}
              </h2>
              <p className="text-xs text-[#667085]">
                {language === 'Tamil'
                  ? `${currentLocation.split(',')[0]} முழுவதிலும் சரிபார்க்கப்பட்ட வணிகங்களைக் கண்டறியுங்கள்`
                  : `Discover verified businesses across ${currentLocation.split(',')[0]}`}
              </p>
            </div>

            <button
              type="button"
              onClick={onViewAllCategories}
              className="text-xs font-bold text-[#0757D9] hover:text-[#008CFF] flex items-center gap-0.5 min-h-[44px] py-2 cursor-pointer"
            >
              <span>{t('View All')}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* 4-column responsive category grid */}
          <div className="grid grid-cols-4 gap-y-4 gap-x-2 bg-white p-4 rounded-3xl border border-[#E2E8F0] shadow-xs items-stretch">
            {/* Video Tile representing Restaurants category */}
            <button
              type="button"
              onClick={() => {
                const restaurantCat =
                  CATEGORIES.find((cat) => cat.id === 'restaurants') || {
                    id: 'restaurants',
                    name: 'Restaurants',
                    iconName: 'Utensils',
                    color: '#0757D9',
                    bgColor: '#EBF3FF',
                    count: 342,
                  };
                onSelectCategory(restaurantCat);
              }}
              aria-label="Explore Restaurants"
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
                  imageUrl={
                    cat.id === 'shopping'
                      ? 'https://res.cloudinary.com/jevuqbu8/image/upload/v1790857946/Untitled_design_19.png'
                      : cat.id === 'doctors'
                      ? 'https://res.cloudinary.com/jevuqbu8/image/upload/v1790857524/Untitled_design_16.png'
                      : cat.id === 'education'
                      ? 'https://res.cloudinary.com/jevuqbu8/image/upload/v1790857229/Untitled_design_15.png'
                      : cat.id === 'hotels'
                      ? 'https://res.cloudinary.com/jevuqbu8/image/upload/v1790857814/Untitled_design_18.png'
                      : cat.id === 'salons'
                      ? 'https://res.cloudinary.com/jevuqbu8/image/upload/v1790858659/Untitled_design_20.png'
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
                {t('Featured on Tizara')}
              </h2>
              <p className="text-xs text-[#667085]">
                {t('Hand-picked top verified partners')}
              </p>
            </div>
          </div>

          {/* Horizontal scrollable cards */}
          {featuredBusinesses.length > 0 ? (
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
          ) : (
            <div className="w-full text-center py-7 bg-white rounded-3xl border border-[#E2E8F0] p-5 shadow-xs flex flex-col items-center justify-center">
              <p className="font-bold text-sm text-[#172033]">
                {t('No businesses available')}
              </p>
              <p className="text-xs text-[#667085] mt-1">
                {t('There are currently no businesses listed in this location.')}
              </p>
            </div>
          )}
        </section>

        {/* SECTION: Single Compact Service Category Card (3x2 Grid) */}
        <section className="px-4" ref={homeServicesCardRef}>
          <div
            className="relative rounded-2xl p-4 border border-[#E2E8F0] shadow-[0_2px_12px_rgba(7,27,82,0.04)] overflow-hidden bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url("https://res.cloudinary.com/jevuqbu8/image/upload/v1790750130/Untitled_design_2.jpg")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {/* Subtle translucent white overlay for crisp text readability while keeping the image clearly visible */}
            <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] pointer-events-none" />

            <div className="relative z-10">
              {/* Single Card Heading with Layered 3D Text Animation */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/60 min-h-[44px]">
                <div className="home-services-3d-wrapper gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#008CFF] shrink-0 shadow-sm" />
                  <div
                    className="home-services-3d-text font-brand font-bold text-[22px] md:text-[24px] tracking-tight"
                    aria-label={t('Home Services')}
                  >
                    {/* Background 3D Extrusion Layers (Progressively moved backward on Z axis) */}
                    {HOME_SERVICES_3D_LAYERS.map((layer, idx) => (
                      <span
                        key={idx}
                        aria-hidden="true"
                        className="home-services-3d-layer"
                        style={{
                          transform: `translateZ(${layer.z}px)`,
                          color: layer.color,
                        }}
                      >
                        {t('Home Services')}
                      </span>
                    ))}
                    {/* Foreground Sharp White Text */}
                    <span
                      className="home-services-3d-front"
                      style={{
                        transform: 'translateZ(0px)',
                        color: '#FFFFFF',
                        textShadow:
                          '0 1px 3px rgba(7, 27, 82, 0.55), 0 0 1px rgba(7, 27, 82, 0.8)',
                      }}
                    >
                      {t('Home Services')}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const servicesCat = CATEGORIES.find((c) => c.id === 'services') || CATEGORIES[0];
                    onSelectCategory(servicesCat);
                  }}
                  className="text-xs font-bold text-[#0757D9] hover:text-[#008CFF] flex items-center gap-0.5 active:scale-95 transition-transform min-h-[32px] px-1 cursor-pointer"
                >
                  <span>{t('View All')}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 3-Column x 2-Row Compact Grid */}
              <div className="grid grid-cols-3 gap-y-3.5 gap-x-2">
                {COMPACT_SERVICES.map((service) => (
                  <div
                    key={service.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => handleServiceClick(service)}
                    onKeyDown={(e) => e.key === 'Enter' && handleServiceClick(service)}
                    className="flex flex-col items-center cursor-pointer active:scale-95 transition-transform group py-0.5"
                  >
                    {/* Small rounded icon/image thumbnail */}
                    <div className="w-13 h-13 rounded-2xl overflow-hidden bg-white/90 p-0.5 border border-white/80 shadow-xs group-hover:border-[#0757D9]/40 group-hover:shadow-sm transition-all flex items-center justify-center shrink-0 backdrop-blur-xs">
                      <img
                        src={service.image}
                        alt={tCategory(service.title)}
                        loading="lazy"
                        className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    {/* Short category name underneath */}
                    <span className="text-[11px] font-bold text-[#172033] text-center leading-tight mt-1.5 px-0.5 line-clamp-2 group-hover:text-[#0757D9] transition-colors drop-shadow-xs">
                      {tCategory(service.title)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: Offers Near You */}
        <section className="px-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="font-brand font-bold text-lg text-[#172033]">
                {language === 'Tamil' ? 'அருகிலுள்ள சலுகைகள்' : 'Offers Near You'}
              </h2>
              <p className="text-xs text-[#667085]">
                {language === 'Tamil' ? 'டிசாரா உறுப்பினர்களுக்கான பிரத்யேக சலுகைகள்' : 'Exclusive deals for Tizara members'}
              </p>
            </div>

            {locationOffers.length > 0 && (
              <button
                type="button"
                onClick={onViewAllOffers}
                className="text-xs font-bold text-[#0757D9] hover:text-[#008CFF] flex items-center gap-0.5 min-h-[44px] py-2 cursor-pointer"
              >
                <span>{t('View All')}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Horizontal compact offer cards */}
          {locationOffers.length > 0 ? (
            <div className="flex items-center gap-3.5 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none">
              {locationOffers.slice(0, 4).map((offer, index) => (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                  compact
                  colorThemeIndex={index}
                  onViewOffer={onSelectOffer}
                  onSelectBusiness={(id) => {
                    const b = businesses.find((item) => item.id === id);
                    if (b) onSelectBusiness(b);
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-6 bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-xs">
              <p className="font-bold text-sm text-[#172033]">
                {t('No offers available')}
              </p>
              <p className="text-xs text-[#667085] mt-1">
                {t('There are currently no offers listed in this location.')}
              </p>
            </div>
          )}
        </section>

        {/* SECTION: Popular Near You */}
        <section className="px-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="font-brand font-bold text-lg text-[#172033]">
                {language === 'Tamil' ? 'பிரபலமானவை' : 'Popular Near You'}
              </h2>
              <p className="text-xs text-[#667085]">
                {language === 'Tamil' ? 'உள்ளூர் வாடிக்கையாளர்களால் அதிகம் மதிப்பிடப்பட்டது' : 'Highly rated by local customers'}
              </p>
            </div>

            {popularBusinesses.length > 0 && (
              <button
                type="button"
                onClick={onViewAllPopular}
                className="text-xs font-bold text-[#0757D9] hover:text-[#008CFF] flex items-center gap-0.5 min-h-[44px] py-2 cursor-pointer"
              >
                <span>{t('View All')}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Vertical cards stack */}
          {popularBusinesses.length > 0 ? (
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
          ) : (
            <div className="text-center py-8 bg-white rounded-3xl border border-[#E2E8F0] p-6 shadow-xs flex flex-col items-center justify-center">
              <p className="font-bold text-base text-[#172033]">
                {t('No businesses available')}
              </p>
              <p className="text-xs text-[#667085] mt-1">
                {t('There are currently no businesses listed in this location.')}
              </p>
            </div>
          )}
        </section>

        {/* SECTION: 3-Slide Image Carousel */}
        <section className="px-4 mb-3">
          <HomePromoCarousel />
        </section>
      </main>
    </div>
  );
};
