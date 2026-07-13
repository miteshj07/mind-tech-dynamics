// Public surface for the analytics layer. Import tracking helpers from here.
//
//   import { trackEvent, trackPageview } from '@/lib/analytics';

import { initGA } from './gtag';
import { initLinkedIn } from './linkedin';

export { trackPageview, trackEvent } from './gtag';
export { trackLinkedInConversion } from './linkedin';
export { GA_MEASUREMENT_ID, LINKEDIN_PARTNER_ID } from './config';

let started = false;

// Initialize every configured analytics provider exactly once. Safe to call on
// every mount; providers with no ID configured simply do nothing.
export function initAnalytics(): void {
  if (started) return;
  started = true;
  initGA();
  initLinkedIn();
}
