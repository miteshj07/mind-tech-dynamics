import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://www.meethemind.com';

interface SeoProps {
  title: string;
  description?: string;
  /** Path (e.g. "/agentforce") or full URL. Used for canonical + og:url. */
  canonical?: string;
  /** One JSON-LD object or an array of them. */
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

/**
 * Centralised <head> management: title, meta description, canonical, Open
 * Graph, and any structured data. Works with react-snap so the tags and
 * JSON-LD are baked into the prerendered HTML for search and AI crawlers.
 */
const Seo = ({ title, description, canonical, jsonLd }: SeoProps) => {
  const href = canonical
    ? canonical.startsWith('http')
      ? canonical
      : `${SITE_URL}${canonical}`
    : undefined;

  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <>
      <Helmet>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
        {href && <link rel="canonical" href={href} />}
        {href && <meta property="og:url" content={href} />}
        <meta property="og:title" content={title} />
        {description && <meta property="og:description" content={description} />}
        <meta property="og:type" content="website" />
      </Helmet>
      {/* JSON-LD is rendered as a normal element (not via Helmet) so the
          prerenderer captures it deterministically. JSON-LD is valid anywhere
          in the document, so body placement is fine for search/AI crawlers. */}
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
