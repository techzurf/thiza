import { Business, Category } from '../types';

export type CanonicalCategory =
  | 'shopping'
  | 'doctors'
  | 'education'
  | 'hotels'
  | 'salons'
  | 'automotive'
  | 'restaurants'
  | 'electronics'
  | 'real-estate'
  | 'travel'
  | 'services'
  | 'professionals';

/**
 * Maps any category identifier or category name to its canonical domain category
 */
export function getCanonicalCategory(catIdOrName: string): CanonicalCategory | null {
  const normalized = (catIdOrName || '').toLowerCase().trim();
  if (!normalized) return null;

  // 1. Shopping
  if (
    normalized === 'shopping' ||
    normalized === 'retail' ||
    normalized.includes('shopping') ||
    normalized === 'fashion' ||
    normalized === 'fashions-clothing' ||
    normalized === 'jewellery' ||
    normalized === 'jewellery-watches' ||
    normalized === 'footwear' ||
    normalized === 'footwear-bags' ||
    normalized === 'bags & suitcases' ||
    normalized === 'groceries-supermarkets' ||
    normalized === 'grocery'
  ) {
    return 'shopping';
  }

  // 2. Doctors & Healthcare / Clinics
  if (
    normalized === 'doctors' ||
    normalized === 'doctor' ||
    normalized === 'clinic' ||
    normalized === 'clinics' ||
    normalized === 'clinics-hospitals' ||
    normalized === 'doctors & clinics' ||
    normalized === 'medical-services' ||
    normalized === 'pharmacy' ||
    normalized === 'dental-care' ||
    normalized === 'diagnostic-centres' ||
    normalized === 'ayurveda-homeopathy' ||
    normalized.includes('doctor') ||
    normalized.includes('clinic') ||
    normalized.includes('hospital') ||
    normalized.includes('pediatric') ||
    normalized.includes('diagnostic')
  ) {
    return 'doctors';
  }

  // 3. Education & Coaching / Institutes
  if (
    normalized === 'education' ||
    normalized === 'education & coaching' ||
    normalized === 'education-training' ||
    normalized === 'coaching-centres' ||
    normalized === 'schools' ||
    normalized === 'colleges' ||
    normalized === 'kids-play-schools' ||
    normalized.includes('education') ||
    normalized.includes('coaching') ||
    normalized.includes('academy') ||
    normalized.includes('school') ||
    normalized.includes('college') ||
    normalized.includes('tuition')
  ) {
    return 'education';
  }

  // 4. Hotels & Stays / Accommodation
  if (
    normalized === 'hotels' ||
    normalized === 'hotel' ||
    normalized === 'hotels & stays' ||
    normalized.includes('hotel') ||
    normalized.includes('resort') ||
    normalized.includes('lodge') ||
    normalized.includes('accommodation') ||
    normalized.includes('guest house')
  ) {
    return 'hotels';
  }

  // 5. Salons & Beauty / Spa
  if (
    normalized === 'salons' ||
    normalized === 'salon' ||
    normalized === 'salons-beauty' ||
    normalized === 'salons & beauty' ||
    normalized === 'salons & spa' ||
    normalized.includes('salon') ||
    normalized.includes('spa') ||
    normalized.includes('beauty parlour') ||
    normalized.includes('beauty parlor')
  ) {
    return 'salons';
  }

  // 6. Automotive & Repairs / Car & Bike
  if (
    normalized === 'automotive' ||
    normalized === 'auto' ||
    normalized === 'automotive services' ||
    normalized === 'automotive & repairs' ||
    normalized === 'car-services' ||
    normalized === 'bike-services' ||
    normalized === 'car-dealers-showrooms' ||
    normalized.includes('automotive') ||
    normalized.includes('car service') ||
    normalized.includes('bike service') ||
    normalized.includes('auto repair')
  ) {
    return 'automotive';
  }

  // 7. Restaurants & Dining / Food
  if (
    normalized === 'restaurants' ||
    normalized === 'restaurant' ||
    normalized === 'restaurants & dining' ||
    normalized === 'cafes' ||
    normalized === 'fine-dining' ||
    normalized.includes('restaurant') ||
    normalized.includes('dining') ||
    normalized.includes('cafe') ||
    normalized.includes('bistro')
  ) {
    return 'restaurants';
  }

  // 8. Electronics & Mobile / Computers
  if (
    normalized === 'electronics' ||
    normalized === 'electronics & mobile' ||
    normalized === 'mobile-accessories' ||
    normalized === 'mobile phone repair & service' ||
    normalized.includes('electronic') ||
    normalized.includes('mobile shop') ||
    normalized.includes('mobile care') ||
    normalized.includes('mobile phone') ||
    normalized.includes('computer')
  ) {
    return 'electronics';
  }

  // 9. Real Estate & Properties
  if (
    normalized === 'real-estate' ||
    normalized === 'real estate' ||
    normalized === 'real estate & properties' ||
    normalized.includes('real estate') ||
    normalized.includes('properties') ||
    normalized.includes('property') ||
    normalized.includes('builder')
  ) {
    return 'real-estate';
  }

  // 10. Travel & Tourism / Transport
  if (
    normalized === 'travel' ||
    normalized === 'travel-tourism' ||
    normalized === 'travel-transport' ||
    normalized === 'travel & tourism' ||
    normalized === 'travel & transport' ||
    normalized === 'tours-holidays' ||
    normalized.includes('travel') ||
    normalized.includes('tourism') ||
    normalized.includes('tour operator') ||
    normalized.includes('tour package')
  ) {
    return 'travel';
  }

  // 11. Professionals & Legal / Tax (Checked before services to prevent "professional services" matching "services")
  if (
    normalized === 'professionals' ||
    normalized === 'professional-services' ||
    normalized === 'professional services' ||
    normalized === 'legal-services' ||
    normalized.includes('lawyer') ||
    normalized.includes('advocate') ||
    normalized.includes('legal') ||
    normalized.includes('tax consultant') ||
    normalized.includes('chartered accountant')
  ) {
    return 'professionals';
  }

  // 12. Home Services / Local Services / Fitness
  if (
    normalized === 'services' ||
    normalized === 'home-services' ||
    normalized === 'home services' ||
    normalized === 'home & local services' ||
    normalized === 'repair-services' ||
    normalized === 'cleaning-services' ||
    normalized === 'deep-cleaning' ||
    normalized === 'electrical-services' ||
    normalized === 'electricians' ||
    normalized === 'plumbing' ||
    normalized === 'ac-services' ||
    normalized === 'ac-repair' ||
    normalized === 'pest-control' ||
    normalized === 'packers-movers' ||
    normalized === 'fitness-gym' ||
    normalized === 'gym & fitness studio' ||
    normalized.includes('home service') ||
    normalized.includes('plumb') ||
    normalized.includes('electrician') ||
    normalized.includes('pest control') ||
    normalized.includes('packers and movers') ||
    normalized.includes('fitness') ||
    normalized.includes('gym')
  ) {
    return 'services';
  }

  return null;
}

/**
 * Checks if a business belongs to a given canonical category
 */
export function isBusinessInCanonicalCategory(
  business: Business,
  canonicalCat: CanonicalCategory
): boolean {
  const bCat = (business.category || '').toLowerCase().trim();
  return bCat === canonicalCat;
}

/**
 * Filter businesses by a category object or category ID
 * Guarantees that ONLY businesses belonging to that category are returned.
 */
export function filterBusinessesByCategory(
  businesses: Business[],
  categoryOrId: Category | string
): Business[] {
  const catId = (typeof categoryOrId === 'string' ? categoryOrId : categoryOrId.id || '')
    .toLowerCase()
    .trim();
  const catName = (typeof categoryOrId === 'string' ? categoryOrId : categoryOrId.name || '')
    .toLowerCase()
    .trim();

  // 1. Direct canonical matching for top primary categories
  const canonical = getCanonicalCategory(catId) || getCanonicalCategory(catName);

  const isPrimaryCategory = [
    'shopping',
    'doctors',
    'education',
    'hotels',
    'salons',
    'salons-beauty',
    'automotive',
    'restaurants',
    'real-estate',
    'electronics',
    'travel',
    'travel-tourism',
    'travel-transport',
    'home-services',
    'services',
    'professional-services',
    'professionals',
  ].includes(catId);

  if (isPrimaryCategory && canonical) {
    return businesses.filter((b) => isBusinessInCanonicalCategory(b, canonical));
  }

  // 2. Specific Subcategories with existing mock data
  // Mobile & Accessories:
  if (catId === 'mobile-accessories' || catName.includes('mobile')) {
    return businesses.filter(
      (b) =>
        b.category === 'electronics' &&
        (b.name.toLowerCase().includes('mobile') || b.categoryName.toLowerCase().includes('mobile'))
    );
  }

  // Fashion:
  if (catId === 'fashion' || catName === 'fashion') {
    return businesses.filter(
      (b) =>
        (b.category === 'shopping' || b.category === 'education') &&
        (b.name.toLowerCase().includes('fashion') || b.categoryName.toLowerCase().includes('fashion'))
    );
  }

  // Fitness & Gym:
  if (catId === 'fitness-gym' || catName.includes('fitness') || catName.includes('gym')) {
    return businesses.filter(
      (b) =>
        b.category === 'services' &&
        (b.name.toLowerCase().includes('fitness') ||
          b.categoryName.toLowerCase().includes('fitness') ||
          b.categoryName.toLowerCase().includes('gym'))
    );
  }

  // Cafes:
  if (catId === 'cafes' || catName.includes('cafe')) {
    return businesses.filter(
      (b) =>
        b.category === 'restaurants' &&
        (b.name.toLowerCase().includes('cafe') ||
          b.categoryName.toLowerCase().includes('cafe') ||
          b.description.toLowerCase().includes('cafe'))
    );
  }

  // Car Services:
  if (catId === 'car-services') {
    return businesses.filter(
      (b) =>
        b.category === 'automotive' &&
        (b.name.toLowerCase().includes('car') ||
          b.name.toLowerCase().includes('motor') ||
          b.name.toLowerCase().includes('auto'))
    );
  }

  // Bike Services:
  if (catId === 'bike-services') {
    return businesses.filter(
      (b) =>
        b.category === 'automotive' &&
        (b.name.toLowerCase().includes('bike') || b.categoryName.toLowerCase().includes('bike'))
    );
  }

  // Legal Services:
  if (catId === 'legal-services') {
    return businesses.filter(
      (b) =>
        b.category === 'professionals' &&
        (b.name.toLowerCase().includes('legal') || b.name.toLowerCase().includes('tax'))
    );
  }

  // Home Services subcategories (cleaning, plumbing, ac, electrical, pest, packers):
  if (
    catId === 'cleaning-services' ||
    catId === 'deep-cleaning' ||
    catId === 'plumbing' ||
    catId === 'ac-services' ||
    catId === 'ac-repair' ||
    catId === 'electrical-services' ||
    catId === 'electricians' ||
    catId === 'pest-control' ||
    catId === 'packers-movers'
  ) {
    return businesses.filter((b) => b.category === 'services');
  }

  // Education subcategories:
  if (
    catId === 'education-training' ||
    catId === 'coaching-centres' ||
    catId === 'schools' ||
    catId === 'colleges'
  ) {
    return businesses.filter((b) => b.category === 'education');
  }

  // Medical subcategories:
  if (
    catId === 'medical-services' ||
    catId === 'dental-care' ||
    catId === 'diagnostic-centres' ||
    catId === 'pharmacy'
  ) {
    return businesses.filter((b) => b.category === 'doctors');
  }

  // Tours & Holidays:
  if (catId === 'tours-holidays') {
    return businesses.filter((b) => b.category === 'travel');
  }

  // Direct exact match fallback
  const directMatches = businesses.filter((b) => {
    const bCat = (b.category || '').toLowerCase().trim();
    const bCatName = (b.categoryName || '').toLowerCase().trim();
    return bCat === catId || bCatName === catName;
  });

  if (directMatches.length > 0) {
    return directMatches;
  }

  // Category has no businesses in mock data -> returns empty list
  return [];
}

/**
 * Generates an accurate, clean header title for a selected category
 */
export function getCategoryHeaderTitle(category: Category): string {
  const catId = (category.id || '').toLowerCase().trim();
  const catName = (category.name || '').trim();

  // 1. Shopping
  if (catId === 'shopping' || catName.toLowerCase() === 'shopping') {
    return 'Shopping Businesses';
  }
  // 2. Doctors
  if (
    catId === 'doctors' ||
    catId === 'doctor' ||
    catName.toLowerCase() === 'doctors' ||
    catName.toLowerCase() === 'doctor'
  ) {
    return 'Doctors Near You';
  }
  // 3. Education
  if (catId === 'education' || catName.toLowerCase() === 'education') {
    return 'Education Businesses';
  }
  // 4. Hotels
  if (
    catId === 'hotels' ||
    catId === 'hotel' ||
    catName.toLowerCase() === 'hotels' ||
    catName.toLowerCase() === 'hotel'
  ) {
    return 'Hotels Near You';
  }
  // 5. Salons & Beauty
  if (
    catId === 'salons' ||
    catId === 'salons-beauty' ||
    catId === 'salon' ||
    catName.toLowerCase() === 'salons' ||
    catName.toLowerCase() === 'salons & beauty'
  ) {
    return 'Salons Near You';
  }
  // 6. Automotive
  if (
    catId === 'automotive' ||
    catName.toLowerCase() === 'automotive' ||
    catName.toLowerCase() === 'automotive services'
  ) {
    return 'Automotive Services';
  }
  // 7. Restaurants
  if (
    catId === 'restaurants' ||
    catId === 'restaurant' ||
    catName.toLowerCase() === 'restaurants' ||
    catName.toLowerCase() === 'restaurant'
  ) {
    return 'Restaurants & Dining';
  }
  // 8. Real Estate
  if (catId === 'real-estate' || catName.toLowerCase() === 'real estate') {
    return 'Real Estate & Properties';
  }
  // 9. Electronics
  if (catId === 'electronics' || catName.toLowerCase() === 'electronics') {
    return 'Electronics & Mobile Stores';
  }
  // 10. Travel & Tourism / Transport
  if (
    catId === 'travel' ||
    catId === 'travel-tourism' ||
    catId === 'travel-transport' ||
    catName.toLowerCase().includes('travel')
  ) {
    return 'Travel & Tourism';
  }
  // 11. Home Services
  if (
    catId === 'home-services' ||
    catId === 'services' ||
    catName.toLowerCase() === 'home services' ||
    catName.toLowerCase() === 'home & local services'
  ) {
    return 'Home & Local Services';
  }
  // 12. Professional Services
  if (
    catId === 'professional-services' ||
    catId === 'professionals' ||
    catName.toLowerCase() === 'professional services' ||
    catName.toLowerCase() === 'professionals'
  ) {
    return 'Professional Services';
  }

  // Subcategory titles
  if (
    catName.toLowerCase().endsWith('services') ||
    catName.toLowerCase().endsWith('businesses') ||
    catName.toLowerCase().endsWith('stores') ||
    catName.toLowerCase().endsWith('care') ||
    catName.toLowerCase().endsWith('centres') ||
    catName.toLowerCase().endsWith('centers')
  ) {
    return catName;
  }

  return `${catName} Businesses`;
}
