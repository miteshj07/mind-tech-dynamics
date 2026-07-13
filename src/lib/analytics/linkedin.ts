// LinkedIn Insight Tag.
//
// Enables LinkedIn-sourced traffic reporting and lets you retarget visitors who
// did not convert on their first visit — the single most valuable audience for
// a B2B Salesforce consultancy. Stays dark until a Partner ID is configured.

import { LINKEDIN_PARTNER_ID, ANALYTICS_DEBUG } from './config';

let initialized = false;

const isPrerender = () =>
  typeof navigator !== 'undefined' && navigator.userAgent === 'ReactSnap';

interface LinkedInWindow {
  _linkedin_partner_id?: string;
  _linkedin_data_partner_ids?: string[];
  lintrk?: ((action: string, data?: unknown) => void) & { q?: unknown[] };
}

export function initLinkedIn(): void {
  if (initialized) return;
  if (!LINKEDIN_PARTNER_ID) return;
  if (typeof window === 'undefined') return;
  if (isPrerender()) return;

  const w = window as unknown as LinkedInWindow;
  w._linkedin_partner_id = LINKEDIN_PARTNER_ID;
  w._linkedin_data_partner_ids = w._linkedin_data_partner_ids || [];
  w._linkedin_data_partner_ids.push(LINKEDIN_PARTNER_ID);

  // Stub so lintrk() calls made before the library loads are queued.
  if (!w.lintrk) {
    const lintrk = function (a: string, b?: unknown) {
      (lintrk.q = lintrk.q || []).push([a, b]);
    } as ((action: string, data?: unknown) => void) & { q?: unknown[] };
    lintrk.q = [];
    w.lintrk = lintrk;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
  document.head.appendChild(script);

  initialized = true;
  if (ANALYTICS_DEBUG) console.info('[analytics] LinkedIn Insight Tag initialized', LINKEDIN_PARTNER_ID);
}

// Fire a LinkedIn conversion. Pass the numeric conversion_id from a LinkedIn
// Campaign Manager conversion once you have created one.
export function trackLinkedInConversion(conversionId: number): void {
  if (!LINKEDIN_PARTNER_ID || typeof window === 'undefined') return;
  const w = window as unknown as LinkedInWindow;
  if (typeof w.lintrk === 'function') {
    w.lintrk('track', { conversion_id: conversionId });
  }
}
