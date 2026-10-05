import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'English' | 'Tamil';

// Comprehensive dictionary for natural, professional Tamil translations
const TAMIL_DICTIONARY: Record<string, string> = {
  // Navigation tabs
  'Home': 'முகப்பு',
  'Explore': 'ஆராயுங்கள்',
  'Add': 'சேர்க்க',
  'Add Business': 'வணிகத்தைச் சேர்க்க',
  'Favorites': 'விருப்பங்கள்',
  'Favourites': 'விருப்பங்கள்',
  'Profile': 'சுயவிவரம்',

  // Header & Common Actions
  'Location': 'இருப்பிடம்',
  'Change location': 'இருப்பிடத்தை மாற்றவும்',
  'Notifications': 'அறிவிப்புகள்',
  'Back': 'பின்செல்க',
  'Close': 'மூடு',
  'Skip': 'தவிர்',
  'Done': 'முடிந்தது',
  'Cancel': 'ரத்து',
  'Clear': 'அழிக்க',
  'Clear All': 'அனைத்தையும் அழிக்க',
  'Save': 'சேமிக்கவும்',
  'Save Changes': 'மாற்றங்களைச் சேமிக்கவும்',
  'Search': 'தேடு',
  'Sort': 'வரிசைப்படுத்து',
  'Sort:': 'வரிசைப்படுத்து:',
  'Filter': 'வடிகட்டவும்',
  'Popular:': 'பிரபலமானது:',
  'View all': 'அனைத்தையும் பார்க்க',
  'View All': 'அனைத்தையும் பார்க்க',
  'View All Offers': 'அனைத்து சலுகைகளையும் பார்க்க',
  'Browse All': 'அனைத்தையும் உலாவவும்',
  'Browse All Businesses': 'அனைத்து வணிகங்களையும் பார்க்க',
  'Browse All Categories': 'அனைத்து வகைகளையும் பார்க்க',
  'Reset Filters': 'வடிகட்டிகளை மீட்டமை',
  'Share': 'பகிரவும்',
  'Share Business': 'வணிகத்தைப் பகிரவும்',
  'Call': 'அழைக்க',
  'Call Now': 'இப்போது அழைக்க',
  'Call Expert': 'நிபுணரை அழைக்க',
  'Directions': 'வழிகாட்டல்',
  'Get Directions': 'வழிகாட்டல் பெற',
  'Enquire': 'விசாரிக்க',
  'Enquire Now': 'இப்போது விசாரிக்கவும்',
  'Send Enquiry': 'விசாரணையை அனுப்புக',
  'Submit Enquiry': 'விசாரணையைச் சமர்ப்பிக்கவும்',
  'Book Service': 'சேவையை முன்பதிவு செய்ய',
  'Book Now': 'இப்போது முன்பதிவு செய்ய',
  'Get Quote': 'விலைப்பட்டியல் பெற',
  'Get Instant Quote': 'உடனடி விலைப்பட்டியல் பெற',
  'Claim Offer': 'சலுகையைப் பெறுங்கள்',
  'Get Started': 'தொடங்குங்கள்',
  'Select Plan': 'திட்டத்தைத் தேர்ந்தெடுக்கவும்',
  'Choose Plan': 'திட்டத்தைத் தேர்வுசெய்க',
  'Edit Profile': 'சுயவிவரத்தைத் திருத்து',
  'Logout': 'வெளியேறு',

  // Status & Badges
  'Verified': 'சரிபார்க்கப்பட்டது',
  'Verified Partner': 'சரிபார்க்கப்பட்ட கூட்டாளர்',
  'Verified Partners': 'சரிபார்க்கப்பட்ட கூட்டாளர்கள்',
  'Verified Listings': 'சரிபார்க்கப்பட்ட பட்டியல்கள்',
  'Open': 'திறந்துள்ளது',
  'Open Now': 'இப்போது திறந்துள்ளது',
  'Closed': 'மூடப்பட்டுள்ளது',
  'Featured': 'பிரத்யேகமானது',
  'Trending': 'பிரபலமானது',
  'Popular': 'பிரபலமானது',
  'Top Rated': 'அதிக மதிப்பீடு',
  'Recommended': 'பரிந்துரைக்கப்பட்டது',
  'Chennai': 'சென்னை',
  'Tiruppur': 'திருப்பூர்',
  'Active': 'செயலில் உள்ளது',
  'Pending': 'நிலுவையில் உள்ளது',
  'Completed': 'முடிவடைந்தது',

  // Categories & Services
  'Restaurants': 'உணவகங்கள்',
  'Restaurants & Dining': 'உணவகங்கள் & உணவு',
  'Shopping': 'ஷாப்பிங்',
  'Shopping & Retail': 'ஷாப்பிங் & சில்லறை',
  'Doctors': 'மருத்துவர்கள்',
  'Doctors & Clinics': 'மருத்துவர்கள் & கிளினிக்குகள்',
  'Education': 'கல்வி',
  'Education & Training': 'கல்வி & பயிற்சி',
  'Hotels': 'ஹோட்டல்கள்',
  'Hotels & Stays': 'ஹோட்டல்கள் & தங்குமிடம்',
  'Salons': 'அழகு நிலையங்கள்',
  'Salons & Beauty': 'அழகு நிலையங்கள் & ஸ்பா',
  'Automotive': 'வாகன பராமரிப்பு',
  'Automotive & Car Care': 'வாகன பராமரிப்பு & பழுது',
  'Home Services': 'வீட்டுச் சேவைகள்',
  'Home & Local Services': 'வீடு மற்றும் உள்ளூர் சேவைகள்',
  'Packers & Movers': 'பேக்கர்ஸ் & மூவர்ஸ்',
  'AC Service': 'ஏசி சேவை',
  'AC Service & Repair': 'ஏசி பழுது & சேவை',
  'Pest Control': 'பூச்சி கட்டுப்பாடு',
  'Pest Control Services': 'பூச்சி கட்டுப்பாட்டு சேவைகள்',
  'Electrician': 'எலக்ட்ரீஷியன்',
  'Electricians': 'எலக்ட்ரீஷியன்கள்',
  'Cleaning Services': 'சுத்தம் செய்யும் சேவைகள்',
  'Deep Cleaning': 'முழுமையான சுத்தம் செய்தல்',
  'Plumbing': 'பிளம்பிங்',
  'Plumbing Services': 'பிளம்பிங் சேவைகள்',
  'Travel': 'பயணம்',
  'Travel & Transport': 'பயணம் & போக்குவரத்து',
  'Fitness': 'உடற்பயிற்சி',
  'Fitness & Gyms': 'உடற்பயிற்சி & ஜிம்',
  'Real Estate': 'ரியல் எஸ்டேட்',
  'Construction': 'கட்டுமானம்',
  'Events': 'நிகழ்வுகள் & கொண்டாட்டங்கள்',
  'Professional Services': 'தொழில்முறை சேவைகள்',
  'All Categories': 'அனைத்து வகைகள்',
  'Explore Categories': 'வகைகளை ஆராயுங்கள்',
  'FILTER BY CATEGORY': 'வகை வாரியாக வடிகட்டவும்',

  // Search Placeholders & Texts
  'Search businesses, services': 'வணிகங்கள், சேவைகளைத் தேடுங்கள்',
  'Search businesses, services...': 'வணிகங்கள், சேவைகளைத் தேடுங்கள்...',
  'Search businesses, services, categories...': 'வணிகங்கள், சேவைகள், வகைகளைத் தேடுங்கள்...',
  'Search discovered businesses and places...': 'வணிகங்கள் மற்றும் இடங்களைத் தேடுங்கள்...',
  'Search categories or businesses...': 'வகைகள் அல்லது வணிகங்களைத் தேடுங்கள்...',
  'Search in all categories...': 'அனைத்து வகைகளிலும் தேடுங்கள்...',
  'Search saved businesses...': 'சேமிக்கப்பட்ட வணிகங்களைத் தேடுங்கள்...',
  'Recent Searches': 'சமீபத்திய தேடல்கள்',
  'Popular Searches': 'பிரபலமான தேடல்கள்',
  'No businesses found': 'வணிகங்கள் எதுவும் கிடைக்கவில்லை',
  'Try another business name, category or service.': 'வேறு வணிகப் பெயர், வகை அல்லது சேவையை முயற்சிக்கவும்.',
  'No businesses available': 'வணிகங்கள் கிடைக்கவில்லை',
  'There are currently no businesses listed in this category.': 'இந்த வகையில் தற்போது வணிகங்கள் எதுவும் பட்டியலிடப்படவில்லை.',

  // Home Screen Sections & Banners
  'Discover Local Quality': 'உள்ளூர் தரமான சேவைகளைக் கண்டறியுங்கள்',
  'Discover verified businesses across Chennai': 'சென்னை முழுவதும் சரிபார்க்கப்பட்ட வணிகங்களைக் கண்டறியுங்கள்',
  'Featured on Tizara': 'டிசாராவில் சிறப்பம்சங்கள்',
  'Hand-picked top verified partners': 'தேர்ந்தெடுக்கப்பட்ட முன்னணி கூட்டாளர்கள்',
  'Trusted experts for doorstep repairs & maintenance': 'வீட்டு வாசலில் பழுது மற்றும் பராமரிப்புக்கான நிபுணர்கள்',
  'Exclusive Deals & Offers': 'பிரத்யேக தள்ளுபடிகள் & சலுகைகள்',
  'Save big with local discounts across your city': 'உங்கள் நகரத்தின் உள்ளூர் தள்ளுபடிகளுடன் அதிகம் சேமிக்கவும்',
  'Explore More Services': 'கூடுதல் சேவைகளை ஆராயுங்கள்',
  'Explore Chennai': 'சென்னையை ஆராயுங்கள்',
  'Find top-rated businesses, services & verified local merchants': 'உயர்தர வணிகங்கள், சேவைகள் மற்றும் உள்ளூர் வர்த்தகர்களைக் கண்டறியுங்கள்',
  'Quick Booking Assistance': 'விரைவான முன்பதிவு உதவி',
  'Need trusted assistance with local professionals?': 'நம்பகமான உள்ளூர் நிபுணர்களின் உதவி தேவையா?',
  'Connect Directly with Verified Service Experts': 'சரிபார்க்கப்பட்ட சேவை நிபுணர்களுடன் நேரடியாக இணையுங்கள்',

  // Profile Screen
  'Activity & Management': 'செயல்பாடு & மேலாண்மை',
  'My Business Dashboard': 'எனது வணிக டாஷ்போர்டு',
  'Manage your listing & enquiries': 'உங்கள் பட்டியல் & விசாரணைகளை நிர்வகிக்கவும்',
  'My Favorites': 'எனது விருப்பங்கள்',
  'Saved places & services': 'சேமிக்கப்பட்ட இடங்கள் & சேவைகள்',
  'My Enquiries': 'எனது விசாரணைகள்',
  'Recent quotes & booking requests': 'சமீபத்திய கோரிக்கைகள் & விசாரணைகள்',
  'Recently Viewed': 'சமீபத்தில் பார்த்தவை',
  'Recently Viewed Places': 'சமீபத்தில் பார்த்த இடங்கள்',
  'Places you visited recently': 'நீங்கள் சமீபத்தில் பார்வையிட்ட இடங்கள்',
  'My Reviews': 'எனது மதிப்பாய்வுகள்',
  'Feedback you left for businesses': 'வணிகங்களுக்கு நீங்கள் வழங்கிய கருத்துகள்',
  'Preferences & Support': 'விருப்பத்தேர்வுகள் & ஆதரவு',
  'Language': 'மொழி',
  'Select Language': 'மொழியைத் தேர்ந்தெடுக்கவும்',
  'Notifications & Alerts': 'அறிவிப்புகள் & எச்சரிக்கைகள்',
  'Offers, status updates & news': 'சலுகைகள், புதுப்பிப்புகள் & செய்திகள்',
  'Help & Support': 'உதவி & ஆதரவு',
  'FAQs & 24/7 customer care': 'கேள்விகள் & வாடிக்கையாளர் ஆதரவு',
  'About Tizara': 'டிசாரா பற்றி',
  'Privacy & Terms': 'தனியுரிமை & விதிமுறைகள்',
  'Privacy Policy & Terms': 'தனியுரிமைக் கொள்கை & விதிமுறைகள்',
  'User security & platform terms': 'பயனர் பாதுகாப்பு & தள விதிமுறைகள்',
  'Tiruppur Office': 'திருப்பூர் அலுவலகம்',
  'Need assistance with Tizara?': 'டிசாரா குறித்த உதவி தேவையா?',
  'Full Name': 'முழு பெயர்',
  'Email': 'மின்னஞ்சல்',
  'Phone': 'தொலைபேசி',
  'Save Changes': 'மாற்றங்களைச் சேமிக்கவும்',

  // Business Plans & Merchant Hub
  'Business Listing Plans': 'வணிக பட்டியல் திட்டங்கள்',
  'Merchant & Business Hub': 'வணிகர் & வணிக மையம்',
  'Choose Your Business Plan': 'உங்கள் வணிகத் திட்டத்தைத் தேர்ந்தெடுக்கவும்',
  'List your business on Tizara and reach more local customers.': 'டிசாராவில் உங்கள் வணிகத்தைப் பட்டியலிட்டு அதிகமான வாடிக்கையாளர்களை அடையுங்கள்.',
  'Starter Launch': 'தொடக்க திட்டம்',
  'Growth Professional': 'வளர்ச்சி திட்டம்',
  'Premium Dominance': 'பிரீமியம் திட்டம்',
  'Growth Plan': 'வளர்ச்சித் திட்டம்',
  'Premium Pro': 'பிரீமியம் புரோ',
  'Enterprise Elite': 'எண்டர்பிரைஸ் எலைட்',
  'Verified Business Badge': 'சரிபார்க்கப்பட்ட வணிக பேட்ஜ்',
  'Direct Customer Call & WhatsApp Leads': 'நேரடி அழைப்பு மற்றும் வாட்ஸ்அப் தொடர்புகள்',
  'Basic Search Visibility': 'அடிப்படை தேடல் தெரிவுநிலை',
  'Standard Category Placement': 'நிலையான வகை பட்டியல்',
  'Top Search Ranking': 'முதன்மையான தேடல் தரவரிசை',
  'Dedicated Account Manager': 'பிரத்யேக கணக்கு மேலாளர்',
  'Zero Commission on Leads': 'முழுமையான கமிஷன் இல்லா வணிகம்',
  'Special Promotion Banners': 'சிறப்பு விளம்பர பேனர்கள்',

  // Sorting Options
  'All Highlights': 'அனைத்து சிறப்பம்சங்கள்',
  'Featured Only': 'பிரத்யேகமானது மட்டும்',
  'Trending & Popular': 'பிரபலமானவை',
  'Highest Rated': 'அதிக மதிப்பீடு',
  'Most Popular': 'மிகவும் பிரபலமானது',
  'Nearest First': 'அருகிலுள்ளவை முதலில்',

  // Common Business Profile Labels
  'Overview': 'மேலோட்டம்',
  'Services': 'சேவைகள்',
  'Photos': 'புகைப்படங்கள்',
  'Reviews': 'மதிப்பாய்வுகள்',
  'Reviews & Ratings': 'மதிப்பாய்வுகள் & மதிப்பீடுகள்',
  'Working Hours': 'வேலை நேரம்',
  'Location & Address': 'இருப்பிடம் & முகவரி',
  'Contact Information': 'தொடர்பு விவரங்கள்',
  'About This Business': 'இந்த வணிகத்தைப் பற்றி',
  'Special Offers': 'சிறப்பு சலுகைகள்',
  'Write a Review': 'மதிப்பாய்வு எழுதுங்கள்',
  'Similar Businesses': 'தொடர்புடைய வணிகங்கள்',
  'Why Choose Us': 'ஏன் எங்களை தேர்வு செய்ய வேண்டும்',
  'Verified Professional': 'சரிபார்க்கப்பட்ட நிபுணர்',
  'Transparent Pricing': 'வெளிப்படையான கட்டணம்',
  'Doorstep Service': 'வீட்டு வாசலில் சேவை',
  'Customer Satisfaction': 'வாடிக்கையாளர் திருப்தி',

  // Enquiry Screen
  'Send Enquiry to': 'விசாரணையை அனுப்புங்கள்:',
  'Your Name': 'உங்கள் பெயர்',
  'Phone Number': 'தொலைபேசி எண்',
  'Email Address': 'மின்னஞ்சல் முகவரி',
  'Select Service Required': 'தேவையான சேவையைத் தேர்ந்தெடுக்கவும்',
  'Your Message / Requirement': 'உங்கள் செய்தி / தேவை',
  'Please describe your requirements...': 'உங்கள் தேவைகளை விவரிக்கவும்...',
  'Enter your name': 'உங்கள் பெயரை உள்ளிடவும்',
  'Enter your phone number': 'தொலைபேசி எண்ணை உள்ளிடவும்',
  'Enter your email': 'மின்னஞ்சலை உள்ளிடவும்',
  'Enquiry Sent Successfully!': 'விசாரணை வெற்றிகரமாக அனுப்பப்பட்டது!',
  'The business owner will contact you shortly.': 'வணிக உரிமையாளர் விரைவில் உங்களைத் தொடர்புகொள்வார்.',
  'Sending...': 'அனுப்புகிறது...',

  // Favorites Screen
  'My Saved Places': 'சேமிக்கப்பட்ட இடங்கள்',
  'No Favorites Yet': 'இன்னும் விருப்பங்கள் எதுவும் இல்லை',
  'Explore businesses and tap the heart icon to save your favorites here.': 'வணிகங்களை ஆராய்ந்து உங்கள் விருப்பங்களைச் சேமிக்க இதயக் குறியீட்டைத் தட்டவும்.',
  'Start Exploring': 'ஆராயத் தொடங்குங்கள்',

  // Notifications Screen
  'All': 'அனைத்தும்',
  'Unread': 'படிக்காதவை',
  'Deals': 'சலுகைகள்',
  'Mark all as read': 'அனைத்தையும் படித்ததாகக் குறிக்கவும்',
  'No Notifications': 'அறிவிப்புகள் எதுவும் இல்லை',
  'You are all caught up!': 'புதிய அறிவிப்புகள் எதுவும் இல்லை!',

  // Counts & Showing
  'businesses': 'வணிகங்கள்',
  'business': 'வணிகம்',
  'listings in category': 'பட்டியல்கள் இந்த வகையில்',
  'total verified businesses': 'மொத்த சரிபார்க்கப்பட்ட வணிகங்கள்',
  'verified listings': 'சரிபார்க்கப்பட்ட பட்டியல்கள்',
  'Showing': 'காட்டுகிறது',

  // Offers Screen
  'Food & Dining': 'உணவு & உணவகங்கள்',
  'Health & Care': 'சுகாதாரம் & நல்வாழ்வு',
  'Valid till': 'செல்லுபடியாகும் தேதி',
  'Use Coupon': 'கூப்பனைப் பயன்படுத்துங்கள்',
  'Copied!': 'நகலெடுக்கப்பட்டது!',

  // Onboarding
  'Discover Local Quality Businesses': 'உள்ளூர் தரமான வணிகங்களைக் கண்டறியுங்கள்',
  'Connect With Verified Experts': 'சரிபார்க்கப்பட்ட நிபுணர்களுடன் இணையுங்கள்',
  'Grow Your Local Network': 'உங்கள் உள்ளூர் தொடர்புகளை வளர்த்துக் கொள்ளுங்கள்',
  'Get Started Now': 'இப்போதே தொடங்குங்கள்',
  'Next': 'அடுத்து',
};

// Map of category slug / id to Tamil name
const CATEGORY_NAME_TAMIL: Record<string, string> = {
  'restaurants': 'உணவகங்கள்',
  'shopping': 'ஷாப்பிங்',
  'doctors': 'மருத்துவர்கள்',
  'education': 'கல்வி',
  'hotels': 'ஹோட்டல்கள்',
  'salons': 'அழகு நிலையங்கள்',
  'automotive': 'வாகன பராமரிப்பு',
  'services': 'வீட்டுச் சேவைகள்',
  'travel': 'பயணம்',
  'fitness': 'உடற்பயிற்சி',
  'real-estate': 'ரியல் எஸ்டேட்',
  'construction': 'கட்டுமானம்',
  'packers-movers': 'பேக்கர்ஸ் & மூவர்ஸ்',
  'ac-service': 'ஏசி சேவை',
  'pest-control': 'பூச்சி கட்டுப்பாடு',
  'electricians': 'எலக்ட்ரீஷியன்கள்',
  'cleaning-services': 'சுத்தம் செய்யும் சேவைகள்',
  'plumbing': 'பிளம்பிங்',
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (text: string, fallback?: string) => string;
  tCategory: (idOrName: string) => string;
  isTamil: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'English',
  setLanguage: () => {},
  t: (text) => text,
  tCategory: (name) => name,
  isTamil: false,
});

const STORAGE_KEY = 'tizara_user_language';

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'Tamil' || saved === 'English') {
        return saved;
      }
    } catch {
      // Ignore storage errors
    }
    return 'English';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore storage errors
    }
  };

  const isTamil = language === 'Tamil';

  const t = (text: string, fallback?: string): string => {
    if (!isTamil || !text) return fallback || text;
    const trimmed = text.trim();
    if (TAMIL_DICTIONARY[trimmed]) {
      return TAMIL_DICTIONARY[trimmed];
    }
    // Partial substring fallback if known
    if (CATEGORY_NAME_TAMIL[trimmed.toLowerCase()]) {
      return CATEGORY_NAME_TAMIL[trimmed.toLowerCase()];
    }
    return fallback || text;
  };

  const tCategory = (idOrName: string): string => {
    if (!isTamil || !idOrName) return idOrName;
    const normalized = idOrName.toLowerCase().trim();
    if (CATEGORY_NAME_TAMIL[normalized]) {
      return CATEGORY_NAME_TAMIL[normalized];
    }
    if (TAMIL_DICTIONARY[idOrName]) {
      return TAMIL_DICTIONARY[idOrName];
    }
    return idOrName;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tCategory, isTamil }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
