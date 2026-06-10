// Generates dist/sitemap.xml from the prerendered output so every published
// page (including blog posts) is listed automatically. Runs after react-snap.
import { readdirSync, statSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const SITE = 'https://www.meethemind.com';
const DIST = 'dist';

// Routes that exist as prerendered shells but should NOT be indexed.
const EXCLUDE = new Set([
  '/404',
  '/admin',
  '/admin-login',
  '/privacy-policy',
  '/terms-of-service',
  '/sitemap',
]);

function findRoutes(dir, base = '') {
  const routes = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (!statSync(full).isDirectory()) continue;
    const route = `${base}/${entry}`;
    if (existsSync(join(full, 'index.html'))) routes.push(route);
    routes.push(...findRoutes(full, route));
  }
  return routes;
}

const routes = ['/', ...findRoutes(DIST)].filter(
  (r, i, a) => a.indexOf(r) === i && !EXCLUDE.has(r)
);

const priority = (r) =>
  r === '/' ? '1.0' : /^\/(services|agentforce|b2b-lead-generation)$/.test(r) ? '0.9' : r.startsWith('/blog/') ? '0.7' : '0.6';
const changefreq = (r) => (r === '/' || r.startsWith('/blog')) ? 'weekly' : 'monthly';

const today = new Date().toISOString().slice(0, 10);
const urls = routes
  .sort()
  .map((r) => `  <url>\n    <loc>${SITE}${r === '/' ? '/' : r}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq(r)}</changefreq>\n    <priority>${priority(r)}</priority>\n  </url>`)
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
writeFileSync(join(DIST, 'sitemap.xml'), xml);
console.log(`✓ sitemap.xml written with ${routes.length} URLs`);
