// Generates dist/sitemap.xml. Static pages come from the maintained list below;
// blog posts are discovered from whatever the prerender step actually wrote to
// dist/blog/* — so the sitemap can never drift out of sync with published posts
// (no hardcoded slug list to go stale). Runs after prerender in `postbuild`.
import { readdirSync, statSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const SITE = 'https://www.meethemind.com';
const DIST = 'dist';

// ── Indexable static routes (stable; excludes legal/admin — see EXCLUDE) ──────
const STATIC_ROUTES = [
  '/',
  '/services',
  '/agentforce',
  '/agentforce-implementation',
  '/apollo-io-salesforce-integration',
  '/salesforce-revops',
  '/salesforce-health-check',
  '/salesforce-data-cloud',
  '/b2b-lead-generation',
  '/about-us',
  '/case-studies',
  '/blog',
  '/careers',
  '/contact-us',
  '/apps',
  '/dealpulse',
];

// ── Routes to never index ─────────────────────────────────────────────────────
const EXCLUDE = new Set([
  '/404',
  '/admin',
  '/admin-login',
  '/privacy-policy',
  '/terms-of-service',
  '/sitemap',
]);

// ── Discover blog posts from the prerendered output (single source of truth) ──
function findPrerenderedBlogRoutes(dir) {
  const blogDir = join(dir, 'blog');
  if (!existsSync(blogDir)) return [];
  const routes = [];
  for (const entry of readdirSync(blogDir)) {
    const full = join(blogDir, entry);
    if (statSync(full).isDirectory() && existsSync(join(full, 'index.html'))) {
      routes.push(`/blog/${entry}`);
    }
  }
  return routes;
}

const blogRoutes = findPrerenderedBlogRoutes(DIST);

const allRoutes = [...STATIC_ROUTES, ...blogRoutes].filter(
  (r, i, a) => a.indexOf(r) === i && !EXCLUDE.has(r),
);

// ── Priority + changefreq ─────────────────────────────────────────────────────
const HIGH_PRIORITY = /^\/(services|agentforce|agentforce-implementation|apollo-io-salesforce-integration|salesforce-revops|salesforce-health-check|salesforce-data-cloud|b2b-lead-generation)$/;

const priority = (r) =>
  r === '/' ? '1.0'
  : HIGH_PRIORITY.test(r) ? '0.9'
  : r.startsWith('/blog/') ? '0.7'
  : '0.6';

const changefreq = (r) =>
  r === '/' || r.startsWith('/blog') ? 'weekly' : 'monthly';

// ── Write ─────────────────────────────────────────────────────────────────────
const today = new Date().toISOString().slice(0, 10);
const urls = allRoutes
  .sort()
  .map(r =>
    `  <url>\n    <loc>${SITE}${r}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq(r)}</changefreq>\n    <priority>${priority(r)}</priority>\n  </url>`
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
writeFileSync(join(DIST, 'sitemap.xml'), xml);
console.log(`✓ sitemap.xml written with ${allRoutes.length} URLs (${blogRoutes.length} blog posts)`);
