import { Business } from '../types';
import { getCanonicalCategory } from './categoryFilter';

/**
 * Normalizes text for case-insensitive search
 */
function normalize(str: string | undefined | null): string {
  return (str || '').toLowerCase().trim();
}

/**
 * Determines whether a business matches a search query
 */
export function matchBusinessSearch(business: Business, rawQuery: string): boolean {
  const query = normalize(rawQuery);
  if (!query) return false;

  const name = normalize(business.name);
  const category = normalize(business.category);
  const categoryName = normalize(business.categoryName);
  const tagline = normalize(business.tagline);
  const description = normalize(business.description);
  const locality = normalize(business.locality);
  const city = normalize(business.city);
  const address = normalize(business.address);

  // Direct substring match on primary fields
  if (
    name.includes(query) ||
    category.includes(query) ||
    categoryName.includes(query) ||
    tagline.includes(query) ||
    description.includes(query) ||
    locality.includes(query) ||
    city.includes(query) ||
    address.includes(query)
  ) {
    return true;
  }

  // Services matching (name, description)
  if (
    business.services &&
    business.services.some((s) => {
      const sName = normalize(s.name);
      const sDesc = normalize(s.description);
      return sName.includes(query) || sDesc.includes(query);
    })
  ) {
    return true;
  }

  // Offers matching
  if (
    business.offers &&
    business.offers.some((o) => {
      const oTitle = normalize(o.title);
      const oDesc = normalize(o.description);
      return oTitle.includes(query) || oDesc.includes(query);
    })
  ) {
    return true;
  }

  // Keyword / Canonical Category Synonyms
  // 1. Kids / Child Education
  if (
    /kid|child|abacus|phonics|math|vedic|tuition|academy|school/.test(query) &&
    (category === 'education' ||
      name.includes('kid') ||
      tagline.includes('math') ||
      description.includes('child'))
  ) {
    return true;
  }

  // 2. Doctor / Clinic / Healthcare
  if (
    /doctor|clinic|medic|hospital|health|physician|dental|dentist|ortho|ayurved|pediatric|surgeon|ent|skin|eye/.test(
      query
    ) &&
    (category === 'doctors' ||
      categoryName.includes('doctor') ||
      description.includes('health') ||
      description.includes('medic') ||
      description.includes('clinic'))
  ) {
    return true;
  }

  // 3. Fashion / Clothing / Apparel
  if (
    /fashion|cloth|apparel|garment|boutique|textile|knitwear|pattern|tailor|shirt|dress|wear/.test(
      query
    ) &&
    (category === 'shopping' ||
      name.includes('fashion') ||
      tagline.includes('fashion') ||
      description.includes('fashion') ||
      description.includes('apparel') ||
      description.includes('garment'))
  ) {
    return true;
  }

  // 4. Mobile / Phones / Electronics
  if (
    /mobile|phone|cell|electronic|smartphone|gadget|laptop|computer/.test(query) &&
    (category === 'electronics' ||
      name.includes('mobile') ||
      name.includes('electronic') ||
      description.includes('mobile') ||
      description.includes('smartphone'))
  ) {
    return true;
  }

  // 5. Fitness / Gym
  if (
    /fitness|gym|workout|trainer|crossfit|bodybuilding|yoga/.test(query) &&
    (name.includes('gym') ||
      name.includes('fitness') ||
      description.includes('gym') ||
      description.includes('fitness') ||
      tagline.includes('fitness'))
  ) {
    return true;
  }

  // 6. Food / Restaurant / Dining
  if (
    /food|restaurant|dining|hotel|cafe|bistro|biryani|bakery|snack|coffee/.test(query) &&
    (category === 'restaurants' ||
      categoryName.includes('restaurant') ||
      description.includes('dining') ||
      description.includes('restaurant'))
  ) {
    return true;
  }

  // 7. Salons / Beauty
  if (
    /salon|spa|beauty|hair|parlour|grooming|makeup|massage/.test(query) &&
    (category === 'salons' ||
      categoryName.includes('salon') ||
      description.includes('salon') ||
      description.includes('spa'))
  ) {
    return true;
  }

  // 8. Automotive / Car / Bike
  if (
    /car|automotive|auto|vehicle|bike|mechanic|garage|service centre|tyre|wash/.test(query) &&
    (category === 'automotive' ||
      categoryName.includes('automotive') ||
      description.includes('car') ||
      description.includes('auto'))
  ) {
    return true;
  }

  // 9. Home Services (AC, Electrician, Plumber, Pest Control, Cleaning, Packers)
  if (
    /service|repair|plumb|electric|ac|air condition|pest|clean|pack|mover/.test(query) &&
    (category === 'services' ||
      categoryName.includes('service') ||
      description.includes('service'))
  ) {
    return true;
  }

  // Multi-term matching: all words in query match at least one attribute
  const terms = query.split(/\s+/).filter(Boolean);
  if (terms.length > 1) {
    const combinedSearchableString = [
      name,
      category,
      categoryName,
      tagline,
      description,
      locality,
      city,
      address,
      ...(business.services || []).map((s) => `${normalize(s.name)} ${normalize(s.description)}`),
    ].join(' ');

    const allTermsMatch = terms.every((term) => combinedSearchableString.includes(term));
    if (allTermsMatch) return true;
  }

  return false;
}

/**
 * Filter a list of businesses by search query and optional category filter
 */
export function filterBusinesses(
  businesses: Business[],
  query: string,
  categoryFilter?: string | null
): Business[] {
  let list = businesses;

  if (categoryFilter && categoryFilter.trim()) {
    const cat = categoryFilter.toLowerCase().trim();
    const canonical = getCanonicalCategory(cat);
    list = list.filter((b) => {
      if (canonical) {
        return (
          getCanonicalCategory(b.category) === canonical ||
          getCanonicalCategory(b.categoryName) === canonical
        );
      }
      return (
        b.category.toLowerCase() === cat ||
        b.categoryName.toLowerCase() === cat
      );
    });
  }

  if (!query || !query.trim()) {
    return categoryFilter ? list : businesses;
  }

  return list.filter((b) => matchBusinessSearch(b, query));
}
