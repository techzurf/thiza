import { Business, BusinessOffer } from '../types';

/**
 * Extracts normalized city identifier from location string.
 * Handles "Tiruppur, Tamil Nadu" -> "tiruppur", "Chennai, Tamil Nadu" -> "chennai", etc.
 */
export function getCityKey(locationStr: string): string {
  if (!locationStr) return '';
  return locationStr.split(',')[0].trim().toLowerCase();
}

/**
 * Returns formatted city display name (e.g. "Tiruppur", "Chennai")
 */
export function getCityDisplayName(locationStr: string): string {
  if (!locationStr) return 'Tiruppur';
  return locationStr.split(',')[0].trim();
}

/**
 * Strictly checks whether a business belongs to the specified location.
 */
export function isBusinessInLocation(business: Business, locationStr: string): boolean {
  if (!business || !locationStr) return false;
  const targetCity = getCityKey(locationStr);
  if (!targetCity) return false;

  const bCity = (business.city || '').trim().toLowerCase();
  if (bCity === targetCity) return true;

  const bLocality = (business.locality || '').toLowerCase();
  if (bLocality.includes(targetCity)) return true;

  const bAddress = (business.address || '').toLowerCase();
  if (bAddress.includes(targetCity)) return true;

  return false;
}

/**
 * Strictly filters businesses by location.
 * If no businesses exist in this location, returns [] (EMPTY ARRAY).
 * Under NO circumstances does it fall back to other cities.
 */
export function filterBusinessesByLocation(
  businesses: Business[],
  locationStr: string
): Business[] {
  if (!businesses || !locationStr) return [];
  return businesses.filter((b) => isBusinessInLocation(b, locationStr));
}

/**
 * Strictly filters offers by location based on the business they belong to.
 */
export function filterOffersByLocation(
  offers: BusinessOffer[],
  businesses: Business[],
  locationStr: string
): BusinessOffer[] {
  if (!offers || !locationStr) return [];
  const locationBusinessIds = new Set(
    filterBusinessesByLocation(businesses, locationStr).map((b) => b.id)
  );
  return offers.filter((o) => locationBusinessIds.has(o.businessId));
}
