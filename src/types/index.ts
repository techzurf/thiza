export type CategoryId = 
  | 'restaurants'
  | 'shopping'
  | 'doctors'
  | 'education'
  | 'travel'
  | 'hotels'
  | 'salons'
  | 'automotive'
  | 'real-estate'
  | 'electronics'
  | 'professionals'
  | 'services'
  | (string & {});

export interface Category {
  id: CategoryId;
  name: string;
  iconName: string;
  fontIconClass?: string;
  color: string;
  bgColor: string;
  count: number;
}

export interface BusinessReview {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
  verifiedUser: boolean;
}

export interface BusinessService {
  id: string;
  name: string;
  price?: string;
  duration?: string;
  description: string;
}

export interface BusinessOffer {
  id: string;
  businessId: string;
  businessName: string;
  category: CategoryId;
  title: string;
  discount: string;
  code: string;
  validUntil: string;
  description: string;
  terms: string;
  imageUrl?: string;
}

export interface Business {
  id: string;
  name: string;
  tagline: string;
  category: CategoryId;
  categoryName: string;
  rating: number;
  reviewCount: number;
  distance: string;
  isOpen: boolean;
  openingHours: string;
  address: string;
  locality: string;
  city: string;
  phone: string;
  whatsapp: string;
  email: string;
  website: string;
  description: string;
  isVerified: boolean;
  isFeatured: boolean;
  priceRange: '₹' | '₹₹' | '₹₹₹' | '₹₹₹₹';
  lat: number;
  lng: number;
  coverImage: string;
  logo: string;
  gallery: string[];
  services: BusinessService[];
  reviews: BusinessReview[];
  offers: BusinessOffer[];
}

export interface EnquiryData {
  businessId: string;
  businessName: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  preferredDate: string;
  preferredTime: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'offer' | 'enquiry' | 'update';
  isRead: boolean;
  businessId?: string;
}

export type ScreenId =
  | 'splash'
  | 'onboarding'
  | 'home'
  | 'all-categories'
  | 'find'
  | 'explore'
  | 'category-listing'
  | 'search-results'
  | 'business-profile'
  | 'map-discovery'
  | 'favorites'
  | 'offers'
  | 'enquiry'
  | 'list-business'
  | 'my-business'
  | 'notifications'
  | 'profile';

export type BottomTabId = 'home' | 'explore' | 'add' | 'favorites' | 'profile';
