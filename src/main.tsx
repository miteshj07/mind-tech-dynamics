
import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root')!;

const app = (
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

// When react-snap has prerendered the page, the #root already contains markup.
// Hydrate it (adopt the existing HTML) instead of throwing it away and
// re-rendering from scratch. In dev / non-prerendered loads, render normally.
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
