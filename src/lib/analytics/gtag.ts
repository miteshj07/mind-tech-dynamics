// Google Analytics 4 (gtag.js) integration for a client-rendered SPA.
//
// Router changes do not reload the page, so GA's automatic page_view would only
// ever fire once (on the homepage). We disable the automatic hit and send a
// page_view manually on every route change — see RouteAnalytics.

import { GA_MEASUREMENT_ID, ANALYTICS_DEBUG } from './config';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

let initialized = false;

// react-snap prerenders the site with a headless browser at build time. We do
// not want analytics to load or fire during that pass.
const isPrerender = () =>
  typeof navigator !== 'undefined' && navigator.userAgent === 'ReactSnap';

export function initGA(): void {
  if (initialized) return;
  if (!GA_MEASUREMENT_ID) return;      // no ID configured → stay dark
  if (typeof window === 'undefined') return;
  if (isPrerender()) return;

  // Load the gtag.js library once.
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  // We fire page_view manually on each route change, so suppress the auto hit.
  window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: false });

  initialized = true;
  if (ANALYTICS_DEBUG) console.info('[analytics] GA4 initialized', GA_MEASUREMENT_ID);
}

export function trackPageview(path: string, title?: string): void {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: title ?? document.title,
  });
  if (ANALYTICS_DEBUG) console.info('[analytics] page_view', path);
}

export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', name, params);
  if (ANALYTICS_DEBUG) console.info('[analytics] event', name, params);
}
