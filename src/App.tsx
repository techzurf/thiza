/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  ScreenId,
  BottomTabId,
  Business,
  Category,
  BusinessOffer,
  AppNotification,
} from './types';
import { BUSINESSES, CATEGORIES, ALL_OFFERS, INITIAL_NOTIFICATIONS } from './data/mockBusinesses';

// Common Components
import { BottomNavigation } from './components/common/BottomNavigation';
import { LocationModal } from './components/common/LocationModal';
import { ShareModal } from './components/common/ShareModal';

// 16 Screens
import { SplashScreen } from './screens/SplashScreen';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { HomeScreen } from './screens/HomeScreen';
import { AllCategoriesScreen } from './screens/AllCategoriesScreen';
import { FindScreen } from './screens/FindScreen';
import { ExploreScreen } from './screens/ExploreScreen';
import { CategoryListingScreen } from './screens/CategoryListingScreen';
import { SearchResultsScreen } from './screens/SearchResultsScreen';
import { BusinessProfileScreen } from './screens/BusinessProfileScreen';
import { MapDiscoveryScreen } from './screens/MapDiscoveryScreen';
import { FavoritesScreen } from './screens/FavoritesScreen';
import { OffersScreen } from './screens/OffersScreen';
import { EnquiryScreen } from './screens/EnquiryScreen';
import { ListBusinessScreen } from './screens/ListBusinessScreen';
import { MyBusinessScreen } from './screens/MyBusinessScreen';
import { NotificationsScreen } from './screens/NotificationsScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { BusinessPlansScreen } from './screens/BusinessPlansScreen';
import { AcServiceDetailScreen } from './screens/AcServiceDetailScreen';
import { PestControlDetailScreen } from './screens/PestControlDetailScreen';
import { ElectricianDetailScreen } from './screens/ElectricianDetailScreen';
import { CleaningServicesDetailScreen } from './screens/CleaningServicesDetailScreen';
import { PackersMoversDetailScreen } from './screens/PackersMoversDetailScreen';
import { PlumbingServicesDetailScreen } from './screens/PlumbingServicesDetailScreen';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

function AppContent() {
  // Navigation State
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [currentTab, setCurrentTab] = useState<BottomTabId>('home');
  const [screenHistory, setScreenHistory] = useState<ScreenId[]>([]);
  const [showSplash, setShowSplash] = useState<boolean>(true);

  // Data State
  const [businesses, setBusinesses] = useState<Business[]>(BUSINESSES);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('tizara_favorites');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // fallback
    }
    return ['b1', 'b2', 'b6'];
  });

  useEffect(() => {
    try {
      localStorage.setItem('tizara_favorites', JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [currentLocation, setCurrentLocation] = useState<string>('Tiruppur, Tamil Nadu');

  // Selected Entities
  const [selectedBusiness, setSelectedBusiness] = useState<Business>(BUSINESSES[0]);
  const [selectedCategory, setSelectedCategory] = useState<Category>(CATEGORIES[0]);
  const [selectedOfferModal, setSelectedOfferModal] = useState<BusinessOffer | null>(null);
  const [shareBusiness, setShareBusiness] = useState<Business | null>(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [searchInitialQuery, setSearchInitialQuery] = useState<string>('');

  // Navigate to screen with history tracking
  const navigateTo = (screen: ScreenId) => {
    setScreenHistory((prev) => [...prev, currentScreen]);
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  };

  // Back navigation
  const handleBack = () => {
    if (screenHistory.length > 0) {
      const prev = screenHistory[screenHistory.length - 1];
      setScreenHistory((h) => h.slice(0, -1));
      setCurrentScreen(prev);
    } else {
      setCurrentScreen('home');
      setCurrentTab('home');
    }
  };

  // Handle Tab switches from Bottom Navigation
  const handleTabChange = (tab: BottomTabId) => {
    setCurrentTab(tab);
    if (tab === 'home') {
      setCurrentScreen('home');
    } else if (tab === 'explore') {
      setCurrentScreen('explore');
    } else if (tab === 'add') {
      setCurrentScreen('list-business');
    } else if (tab === 'favorites') {
      setCurrentScreen('favorites');
    } else if (tab === 'profile') {
      setCurrentScreen('profile');
    }
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  };

  // Favorite toggle handler
  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Open Business Profile
  const handleSelectBusiness = (business: Business) => {
    setSelectedBusiness(business);
    navigateTo('business-profile');
  };

  // Open Category Listing
  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    navigateTo('category-listing');
  };

  // Open Enquiry flow
  const handleEnquire = (business: Business) => {
    setSelectedBusiness(business);
    navigateTo('enquiry');
  };

  // Add business callback
  const handleBusinessAdded = (newBiz: Business) => {
    setBusinesses((prev) => [newBiz, ...prev]);
    setSelectedBusiness(newBiz);
    setCurrentScreen('my-business');
  };

  // Mark all notifications read
  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  // Notification click handler
  const handleNotificationClick = (notif: AppNotification) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, isRead: true } : n))
    );
    if (notif.businessId) {
      const target = businesses.find((b) => b.id === notif.businessId);
      if (target) {
        handleSelectBusiness(target);
      }
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Decide whether bottom tab navigation should be visible
  const showBottomNav =
    currentScreen === 'home' ||
    currentScreen === 'explore' ||
    currentScreen === 'favorites' ||
    currentScreen === 'offers' ||
    currentScreen === 'profile' ||
    currentScreen === 'ac-service-detail' ||
    currentScreen === 'pest-control-detail' ||
    currentScreen === 'electrician-detail' ||
    currentScreen === 'cleaning-services-detail' ||
    currentScreen === 'packers-movers-detail' ||
    currentScreen === 'plumbing-services-detail';

  return (
    <div className="w-full min-h-[100dvh] bg-[#F5F8FC] text-[#172033] relative flex flex-col">
      {/* TIZARA ANIMATED SPLASH SCREEN (Shown on launch & smooth fade into Home screen) */}
      {(showSplash || currentScreen === 'splash') && (
        <SplashScreen
          onFinish={() => {
            setShowSplash(false);
            if (currentScreen === 'splash') {
              setCurrentScreen('home');
              setCurrentTab('home');
            }
          }}
          onContinue={() => {
            setShowSplash(false);
            if (currentScreen === 'splash') {
              setCurrentScreen('home');
              setCurrentTab('home');
            }
          }}
          onExploreDirectly={() => {
            setShowSplash(false);
            if (currentScreen === 'splash') {
              setCurrentScreen('home');
              setCurrentTab('home');
            }
          }}
        />
      )}

      {/* SCREEN 2: ONBOARDING */}
      {currentScreen === 'onboarding' && (
        <OnboardingScreen
          onFinish={() => {
            setCurrentScreen('home');
            setCurrentTab('home');
          }}
        />
      )}

      {/* SCREEN 3: HOME */}
      {currentScreen === 'home' && (
        <HomeScreen
          currentLocation={currentLocation}
          onOpenLocationModal={() => setIsLocationModalOpen(true)}
          onOpenNotifications={() => navigateTo('notifications')}
          onOpenProfile={() => {
            setCurrentTab('profile');
            setCurrentScreen('profile');
          }}
          onSearchFocus={() => {
            setSearchInitialQuery('');
            navigateTo('search-results');
          }}
          onSearchSubmit={(query: string) => {
            setSearchInitialQuery(query);
            navigateTo('search-results');
          }}
          onSelectCategory={handleSelectCategory}
          onSelectBusiness={handleSelectBusiness}
          onSelectOffer={(offer) => {
            setSelectedOfferModal(offer);
            navigateTo('offers');
          }}
          onViewAllCategories={() => {
            navigateTo('all-categories');
          }}
          onViewAllOffers={() => navigateTo('offers')}
          onViewAllPopular={() => {
            setCurrentTab('explore');
            setCurrentScreen('explore');
          }}
          onFindVideoClick={() => {
            navigateTo('find');
          }}
          onSelectAcService={() => {
            navigateTo('ac-service-detail');
          }}
          onSelectPestControl={() => {
            navigateTo('pest-control-detail');
          }}
          onSelectElectrician={() => {
            navigateTo('electrician-detail');
          }}
          onSelectCleaningService={() => {
            navigateTo('cleaning-services-detail');
          }}
          onSelectPackersMovers={() => {
            navigateTo('packers-movers-detail');
          }}
          onSelectPlumbingService={() => {
            navigateTo('plumbing-services-detail');
          }}
          onListBusiness={() => navigateTo('list-business')}
          businesses={businesses}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          unreadCount={unreadCount}
        />
      )}

      {/* SCREEN: FIND / DISCOVER */}
      {currentScreen === 'find' && (
        <FindScreen
          businesses={businesses}
          favorites={favorites}
          onBack={handleBack}
          onToggleFavorite={handleToggleFavorite}
          onSelectBusiness={handleSelectBusiness}
        />
      )}

      {/* SCREEN: ALL CATEGORIES */}
      {currentScreen === 'all-categories' && (
        <AllCategoriesScreen
          onBack={handleBack}
          onSelectCategory={handleSelectCategory}
        />
      )}

      {/* SCREEN 4: EXPLORE */}
      {currentScreen === 'explore' && (
        <ExploreScreen
          businesses={businesses}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onSelectBusiness={handleSelectBusiness}
          onSelectCategory={handleSelectCategory}
          onOpenMap={() => navigateTo('map-discovery')}
          onOpenSearch={() => navigateTo('search-results')}
        />
      )}

      {/* SCREEN 5: CATEGORY LISTING */}
      {currentScreen === 'category-listing' && (
        <CategoryListingScreen
          category={selectedCategory}
          businesses={businesses}
          favorites={favorites}
          onBack={handleBack}
          onToggleFavorite={handleToggleFavorite}
          onSelectBusiness={handleSelectBusiness}
          onBrowseAll={() => {
            setCurrentTab('explore');
            setCurrentScreen('explore');
          }}
        />
      )}

      {/* SCREEN 6: SEARCH RESULTS */}
      {currentScreen === 'search-results' && (
        <SearchResultsScreen
          initialQuery={searchInitialQuery}
          businesses={businesses}
          favorites={favorites}
          onBack={handleBack}
          onToggleFavorite={handleToggleFavorite}
          onSelectBusiness={handleSelectBusiness}
        />
      )}

      {/* SCREEN 7: BUSINESS PROFILE */}
      {currentScreen === 'business-profile' && selectedBusiness && (
        <BusinessProfileScreen
          business={selectedBusiness}
          isFavorite={favorites.includes(selectedBusiness.id)}
          onBack={handleBack}
          onToggleFavorite={handleToggleFavorite}
          onShare={(b) => setShareBusiness(b)}
          onEnquire={handleEnquire}
          onSelectOffer={(offer) => {
            setSelectedOfferModal(offer);
            navigateTo('offers');
          }}
        />
      )}

      {/* SCREEN 8: MAP DISCOVERY */}
      {currentScreen === 'map-discovery' && (
        <MapDiscoveryScreen
          businesses={businesses}
          onBack={handleBack}
          onSelectBusiness={handleSelectBusiness}
          onSwitchToList={() => {
            setCurrentTab('explore');
            setCurrentScreen('explore');
          }}
        />
      )}

      {/* SCREEN 9: FAVORITES */}
      {currentScreen === 'favorites' && (
        <FavoritesScreen
          businesses={businesses}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onSelectBusiness={handleSelectBusiness}
          onExplore={() => {
            setCurrentTab('explore');
            setCurrentScreen('explore');
          }}
        />
      )}

      {/* SCREEN 10: OFFERS */}
      {currentScreen === 'offers' && (
        <OffersScreen
          businesses={businesses}
          onSelectBusiness={handleSelectBusiness}
          selectedOfferModal={selectedOfferModal}
          onSetSelectedOfferModal={setSelectedOfferModal}
        />
      )}

      {/* SCREEN 11: ENQUIRY */}
      {currentScreen === 'enquiry' && selectedBusiness && (
        <EnquiryScreen
          business={selectedBusiness}
          onBack={handleBack}
          onDone={() => {
            setCurrentScreen('home');
            setCurrentTab('home');
          }}
        />
      )}

      {/* SCREEN 12: LIST YOUR BUSINESS (ADD) */}
      {currentScreen === 'list-business' && (
        <ListBusinessScreen
          onBack={handleBack}
          onBusinessAdded={handleBusinessAdded}
        />
      )}

      {/* SCREEN 13: MY BUSINESS */}
      {currentScreen === 'my-business' && (
        <MyBusinessScreen
          business={selectedBusiness}
          onBack={handleBack}
          onViewProfile={handleSelectBusiness}
        />
      )}

      {/* SCREEN 14: NOTIFICATIONS */}
      {currentScreen === 'notifications' && (
        <NotificationsScreen
          notifications={notifications}
          onBack={handleBack}
          onMarkAllAsRead={handleMarkAllNotificationsRead}
          onNotificationClick={handleNotificationClick}
        />
      )}

      {/* SCREEN: AC SERVICE DETAIL */}
      {currentScreen === 'ac-service-detail' && (
        <AcServiceDetailScreen
          onBack={handleBack}
          onEnquire={() => {
            const acBiz =
              businesses.find((b) => b.category === 'services') || businesses[0];
            handleEnquire(acBiz);
          }}
        />
      )}

      {/* SCREEN: PEST CONTROL DETAIL */}
      {currentScreen === 'pest-control-detail' && (
        <PestControlDetailScreen
          onBack={handleBack}
          onEnquire={() => {
            const pestBiz =
              businesses.find((b) => b.category === 'services') || businesses[0];
            handleEnquire(pestBiz);
          }}
        />
      )}

      {/* SCREEN: ELECTRICIAN DETAIL */}
      {currentScreen === 'electrician-detail' && (
        <ElectricianDetailScreen
          onBack={handleBack}
          onEnquire={() => {
            const elecBiz =
              businesses.find((b) => b.category === 'services') || businesses[0];
            handleEnquire(elecBiz);
          }}
        />
      )}

      {/* SCREEN: CLEANING SERVICES DETAIL */}
      {currentScreen === 'cleaning-services-detail' && (
        <CleaningServicesDetailScreen
          onBack={handleBack}
          onEnquire={() => {
            const cleanBiz =
              businesses.find((b) => b.category === 'services') || businesses[0];
            handleEnquire(cleanBiz);
          }}
        />
      )}

      {/* SCREEN: PACKERS & MOVERS DETAIL */}
      {currentScreen === 'packers-movers-detail' && (
        <PackersMoversDetailScreen
          onBack={handleBack}
          onEnquire={() => {
            const moveBiz =
              businesses.find((b) => b.category === 'services') || businesses[0];
            handleEnquire(moveBiz);
          }}
        />
      )}

      {/* SCREEN: PLUMBING SERVICES DETAIL */}
      {currentScreen === 'plumbing-services-detail' && (
        <PlumbingServicesDetailScreen
          onBack={handleBack}
          onEnquire={() => {
            const plumbBiz =
              businesses.find((b) => b.category === 'services') || businesses[0];
            handleEnquire(plumbBiz);
          }}
        />
      )}

      {/* SCREEN 15: PROFILE */}
      {currentScreen === 'profile' && (
        <ProfileScreen
          currentLocation={currentLocation}
          onNavigateFavorites={() => {
            setCurrentTab('favorites');
            setCurrentScreen('favorites');
          }}
          onNavigateMyBusiness={() => navigateTo('my-business')}
          onNavigatePricingPlans={() => navigateTo('pricing-plans')}
          onNavigateNotifications={() => navigateTo('notifications')}
          onOpenLocationModal={() => setIsLocationModalOpen(true)}
          onResetIntro={() => {
            setShowSplash(true);
            setCurrentScreen('home');
            setCurrentTab('home');
          }}
        />
      )}

      {/* SCREEN: BUSINESS PRICING & LISTING PLANS */}
      {currentScreen === 'pricing-plans' && (
        <BusinessPlansScreen
          onBack={handleBack}
        />
      )}

      {/* Global Fixed Bottom Navigation (for primary screens) */}
      {showBottomNav && (
        <BottomNavigation
          currentTab={currentTab}
          onTabChange={handleTabChange}
          favoritesCount={favorites.length}
        />
      )}

      {/* Global Location Selector Modal */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        selectedCity={currentLocation}
        onSelectCity={(city) => setCurrentLocation(city)}
      />

      {/* Global Share Sheet Modal */}
      {shareBusiness && (
        <ShareModal
          isOpen={!!shareBusiness}
          onClose={() => setShareBusiness(null)}
          title={shareBusiness.name}
          url={shareBusiness.website || window.location.href}
        />
      )}
    </div>
  );
}
