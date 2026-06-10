import React, { useLayoutEffect } from 'react';

const SITE_URL = 'https://www.meethemind.com';

interface SeoProps {
  title: string;
  description?: string;
  /** Path (e.g. "/agentforce") or full URL. Used for canonical + og:url. */
  canonical?: string;
  /** One JSON-LD object or an array of them. */
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

function upsertMeta(attr: 'name' | 'property', key: string, content?: string) {
  if (!content) return;
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href?: string) {
  if (!href) return;
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Centralised <head> + structured data management.
 *
 * Title, description, canonical and Open Graph tags are written imperatively in
 * useLayoutEffect (synchronous, before paint) instead of via react-helmet-async
 * — Helmet's deferred DOM updates race with the react-snap prerenderer and
 * produced non-deterministic <title> tags. JSON-LD is rendered as a normal body
 * element so the prerenderer always captures it. JSON-LD is valid anywhere in
 * the document.
 */
const Seo = ({ title, description, canonical, jsonLd }: SeoProps) => {
  const href = canonical
    ? canonical.startsWith('http')
      ? canonical
      : `${SITE_URL}${canonical}`
    : undefined;

  useLayoutEffect(() => {
    if (title) document.title = title;
    upsertMeta('name', 'description', description);
    upsertLink('canonical', href);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', href);
    upsertMeta('property', 'og:type', 'website');
  }, [title, description, href]);

  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <>
      {blocks.map((block, i) => (
        <script
          type="application/ld+json"
          key={i}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
};

export default Seo;
