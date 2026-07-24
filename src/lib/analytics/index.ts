// Public surface for the analytics layer. Import tracking helpers from here.
//
//   import { trackEvent, trackPageview } from '@/lib/analytics';

import { initGA } from './gtag';
import { initLinkedIn } from './linkedin';

export { trackPageview, trackEvent } from './gtag';
export { trackLinkedInConversion } from './linkedin';
export { GA_MEASUREMENT_ID, LINKEDIN_PARTNER_ID } from './config';

let started = false;

// Personal opt-out so the team's own visits don't pollute analytics. Visit the
// site once with ?notrack=1 to set it (per browser, survives IP changes);
// ?notrack=0 clears it.
function isOptedOut(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('notrack') === '1') localStorage.setItem('mtm_notrack', '1');
    if (params.get('notrack') === '0') localStorage.removeItem('mtm_notrack');
    return localStorage.getItem('mtm_notrack') === '1';
  } catch {
    return false;
  }
}

// Initialize every configured analytics provider exactly once. Safe to call on
// every mount; providers with no ID configured simply do nothing.
export function initAnalytics(): void {
  if (started) return;
  started = true;
  if (isOptedOut()) return;
  initGA();
  initLinkedIn();
}
