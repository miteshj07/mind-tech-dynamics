import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initAnalytics, trackPageview } from '@/lib/analytics';

/**
 * Boots the analytics providers once, then reports a page_view on every
 * client-side route change. Renders nothing. Must live inside <BrowserRouter>.
 */
const RouteAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    // Defer one tick so react-helmet-async has updated document.title before we
    // read it for the page_view.
    const id = window.setTimeout(() => {
      trackPageview(location.pathname + location.search);
    }, 0);
    return () => window.clearTimeout(id);
  }, [location.pathname, location.search]);

  return null;
};

export default RouteAnalytics;
