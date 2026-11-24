/**
 * All copy, prices and links for the homepage live here so they can be
 * edited in one place without touching layout code.
 */
import { BOOKING_URL, CONTACT_EMAIL, CONTACT_PHONE } from '@/lib/constants/site';

export { BOOKING_URL, CONTACT_EMAIL, CONTACT_PHONE };

/** "tel:" href built from whatever format the phone number was entered in. */
export const PHONE_HREF = CONTACT_PHONE ? `tel:+1${CONTACT_PHONE.replace(/\D/g, '').replace(/^1/, '')}` : '';

export const PRICE_START = '$500';
export const PRICE_MONTHLY = '$30';

export const CHORES = [
  'Retype the same data in 3 places',
  'Text the schedule, one by one',
  'Chase paperwork and signatures',
  'Rebuild the weekly report',
  'Answer the same question again',
];

export const MARQUEE = [
  'A website that takes orders',
  'Booking pages that fill your calendar',
  'A site that makes the phone ring',
  'Scheduling that runs itself',
  'AI assistants that know your business',
  'Customer portals',
  'Reports that build themselves',
  'Intake forms that file themselves',
  'Spreadsheets, retired',
  'Reminders nobody has to send',
  'Dashboards you actually open',
];

export const WHATEVER: { title: string; text: string; tone: 'sun' | 'white' | 'tomato' | 'leaf' }[] = [
  {
    title: 'A website that books or sells',
    text: 'Looks sharp, loads fast, and takes bookings, orders or quote requests while you sleep.',
    tone: 'sun',
  },
  {
    title: 'A custom app or portal',
    text: 'Your customers, staff or drivers log in to one place built around how you really work.',
    tone: 'white',
  },
  {
    title: 'An AI assistant',
    text: 'Answers customer questions from your own info, day and night.',
    tone: 'tomato',
  },
  {
    title: 'Automation',
    text: 'Scheduling, reports, reminders and paperwork that run themselves.',
    tone: 'leaf',
  },
];

export type Note = { you: string; we: string; tone: 'sun' | 'paper' | 'tomato' | 'leaf' | 'white'; tilt: number };

export const NOTES: Note[] = [
  {
    you: '“I retype the same info into three different places.”',
    we: 'Enter it once. Everywhere else fills itself in.',
    tone: 'sun',
    tilt: -2,
  },
  {
    you: '“The schedule lives in my head and a group text.”',
    we: 'A schedule that builds itself and nudges the right people.',
    tone: 'white',
    tilt: 1.5,
  },
  {
    you: '“Customers ask the same ten questions all day.”',
    we: 'An AI assistant that answers from your own info, 24/7.',
    tone: 'tomato',
    tilt: -1,
  },
  {
    you: '“Month-end reports eat my whole weekend.”',
    we: 'Reports that assemble themselves and land in your inbox.',
    tone: 'leaf',
    tilt: 2,
  },
  {
    you: '“Paperwork is everywhere. Some of it is lost.”',
    we: 'Digital intake. Every form filed where it belongs.',
    tone: 'white',
    tilt: -1.5,
  },
  {
    you: '“My spreadsheet is held together with hope.”',
    we: 'A real app on top of your real data. No more fragile formulas.',
    tone: 'sun',
    tilt: 1,
  },
];

export const STEPS = [
  {
    n: '1',
    title: 'Tell us what’s eating your time',
    body: 'A free intro call. Plain English, no tech talk. You describe the chore, we ask the questions.',
  },
  {
    n: '2',
    title: 'Get a fixed price',
    body: 'You see the scope and the price before anything starts. No hourly meter running in the background.',
  },
  {
    n: '3',
    title: 'Watch it go live',
    body: 'We build it around the way you already work and ship it in days, not months.',
  },
];

export const FAQ = [
  {
    q: 'Do I need to be technical?',
    a: 'Not at all. If you can describe the chore that annoys you, that is enough. We handle the rest.',
  },
  {
    q: 'Is AI the answer to everything?',
    a: 'No. Sometimes the right fix is a simple form or a script. We use AI where it actually saves you time, and we will tell you when something simpler does the job.',
  },
  {
    q: `What if my problem is bigger than ${PRICE_START}?`,
    a: 'Then you get a fixed quote before any work begins. Bigger jobs are priced to the job, never by the hour.',
  },
  {
    q: `What does the ${PRICE_MONTHLY} a month cover?`,
    a: 'Keeping it running: hosting plus small fixes and tweaks after launch.',
  },
  {
    q: 'What kinds of businesses do you work with?',
    a: 'Small businesses with a repeatable chore that eats hours every week. If it involves scheduling, paperwork, customer questions or reports, we have probably automated something like it.',
  },
];
