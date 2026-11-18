/**
 * Central site configuration.
 *
 * The public contact email and the "Book a Call" destination live here so they
 * can be changed in one place. They can also be overridden at build time via
 * Vercel env vars VITE_CONTACT_EMAIL and VITE_BOOKING_URL.
 */

export const CONTACT_EMAIL =
  import.meta.env.VITE_CONTACT_EMAIL ?? 'info@thecdscloud.com';

/**
 * Destination for every "Book a Call" / "Schedule a Call" button.
 * Points to the Cal.com booking link. Override via VITE_BOOKING_URL if the
 * Cal.com username/link changes.
 */
export const BOOKING_URL =
  import.meta.env.VITE_BOOKING_URL ?? 'https://cal.com/jason-griffin-0covhm';

/**
 * Public phone number for the "Call" buttons. Override with VITE_CONTACT_PHONE.
 * If set to an empty string, the call buttons are hidden and the booking link
 * becomes the primary action.
 */
export const CONTACT_PHONE: string = import.meta.env.VITE_CONTACT_PHONE ?? '314-660-2890';

/** True when a URL is a full http(s) link (open in a new tab). */
export const isExternalUrl = (url: string): boolean => /^https?:\/\//i.test(url);
