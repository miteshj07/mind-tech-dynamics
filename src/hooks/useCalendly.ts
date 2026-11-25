import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

export const CALENDLY_URL = 'https://calendly.com/mitesh-meethemind/30min';

/** Loads the Calendly inline widget and records a conversion when a call is booked. */
export const useCalendly = () => {
  useEffect(() => {
    // Skip during prerender: the widget's injected iframe would be baked into
    // the snapshot and break hydration (prerender.mjs sets this user agent).
    if (navigator.userAgent === 'ReactSnap') return;
    if (document.querySelector('script[src*="calendly"]')) return;
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.head.appendChild(script);
    return () => { script.remove(); };
  }, []);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== 'https://calendly.com') return;
      if (e.data?.event === 'calendly.event_scheduled') {
        trackEvent('book_consultation', { method: 'calendly' });
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);
};
