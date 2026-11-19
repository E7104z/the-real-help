/**
 * Verified business facts for The Real Help, LLC.
 *
 * Single source of truth for structured data (LocalBusiness, Organization,
 * Service) and any copy that needs the legal name, address, phone or URLs.
 *
 * Rule: only facts confirmed in writing by Jason Griffin belong here. Fields
 * Jason has not yet confirmed are left blank and are omitted from generated
 * schema so we never invent facts.
 */
import { BOOKING_URL, CONTACT_EMAIL, CONTACT_PHONE } from './site';

export const BUSINESS = {
  legalName: 'The Real Help, LLC',
  name: 'The Real Help',
  url: 'https://therealhelp.com',
  description:
    'Custom software, AI tools and workflow automation for small businesses.',
  email: CONTACT_EMAIL,
  phone: CONTACT_PHONE,
  bookingUrl: BOOKING_URL,
  founder: 'Jason Griffin',

  // Physical address. City / region / country are confirmed (St. Louis, MO).
  // Street and ZIP are left blank until Jason confirms them in writing.
  address: {
    streetAddress: '',
    addressLocality: 'St. Louis',
    addressRegion: 'MO',
    postalCode: '',
    addressCountry: 'US',
  },

  // Geo coordinates (lat/lng). Blank until Jason confirms them.
  geo: {
    latitude: '',
    longitude: '',
  },

  // Service area. Confirmed city; Jason can expand to counties later.
  areaServed: ['St. Louis, MO'],

  // Opening hours. Blank until Jason confirms them.
  openingHours: [] as string[],

  // Same-as profiles (Google Business Profile, LinkedIn, etc.). Blank until
  // Jason confirms the exact URLs.
  sameAs: [] as string[],

  logo: '/images/Logo/Real Logo1.png',

  // schema.org priceRange hint (1–4 dollar signs).
  priceRange: '$',
};
