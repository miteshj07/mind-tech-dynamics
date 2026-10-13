import React, { useLayoutEffect } from 'react';

const SITE_URL = 'https://www.meethemind.com';

interface SeoProps {
  title: string;
  description?: string;
  /** Path (e.g. "/agentforce") or full URL. Used for canonical + og:url. */
  canonical?: string;
  /** One JSON-LD object or an array of them. */
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
  /** Share image (path or full URL) for LinkedIn/X/Slack previews. */
  image?: string;
}

const DEFAULT_IMAGE = '/lovable-uploads/284a223f-a649-48c8-adfb-b59481cce7ba.png';

const absolute = (url: string) => (url.startsWith('http') ? url : `${SITE_URL}${url}`);

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
 *, Helmet's deferred DOM updates race with the react-snap prerenderer and
 * produced non-deterministic <title> tags. JSON-LD is rendered as a normal body
 * element so the prerenderer always captures it. JSON-LD is valid anywhere in
 * the document.
 */
const Seo = ({ title, description, canonical, jsonLd, image }: SeoProps) => {
  const href = canonical ? absolute(canonical) : undefined;
  const img = absolute(image || DEFAULT_IMAGE);

  useLayoutEffect(() => {
    if (title) document.title = title;
    upsertMeta('name', 'description', description);
    upsertLink('canonical', href);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', href);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:image', img);
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', img);
  }, [title, description, href, img]);

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
