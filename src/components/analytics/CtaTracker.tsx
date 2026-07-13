import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

// Destinations that signal buying intent. A click heading toward one of these
// is a meaningful CTA no matter where on the site it happens — so we can see
// which pages actually push visitors toward contact / booking.
const INTENT_TARGETS = ['/contact-us', '/salesforce-health-check'];

/**
 * Single document-level click listener that reports a `cta_click` event with
 * the button label, its destination, and — most importantly — the page the
 * visitor clicked from. Renders nothing. Also fires for any element carrying a
 * `data-cta` attribute, so future CTAs can opt in explicitly.
 */
const CtaTracker = () => {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0) return; // primary click only
      const el = e.target as Element | null;
      const anchor = el?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!anchor) return;

      let path = '';
      try {
        path = new URL(anchor.href, window.location.origin).pathname;
      } catch {
        return;
      }

      const isIntent = INTENT_TARGETS.includes(path);
      const isTagged = anchor.hasAttribute('data-cta') || !!anchor.closest('[data-cta]');
      if (!isIntent && !isTagged) return;

      const label = (anchor.innerText || anchor.getAttribute('aria-label') || '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 100);

      trackEvent('cta_click', {
        cta_text: label || '(unlabeled)',
        destination: path,
        source_page: window.location.pathname,
      });
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
};

export default CtaTracker;
