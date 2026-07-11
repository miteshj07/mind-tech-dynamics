// Generates dist/sitemap.xml from a hardcoded route list + any extra
// prerendered blog posts detected in dist/. Works whether or not
// react-snap ran successfully.
import { readdirSync, statSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const SITE = 'https://www.meethemind.com';
const DIST = 'dist';

// ── Known static routes (always included) ────────────────────────────────────
const STATIC_ROUTES = [
  '/',
  '/services',
  '/agentforce',
  '/b2b-lead-generation',
  '/about-us',
  '/case-studies',
  '/blog',
  '/careers',
  '/contact-us',
  '/apps',
  '/dealpulse',
];

// ── Blog slugs (keep in sync with Supabase blog posts) ───────────────────────
const BLOG_SLUGS = [
  'crm-integration-mistakes-to-avoid',
  'agentforce-future-of-salesforce-ai-agents',
  'apollo-io-salesforce-integration-guide',
  'b2b-lead-qualification-with-salesforce',
  'roi-of-salesforce-implementation',
  'salesforce-financial-services-firms',
  'salesforce-crm-australian-smes',
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

// ── Detect any extra prerendered blog routes from dist/ ───────────────────────
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

const knownBlogRoutes = BLOG_SLUGS.map(s => `/blog/${s}`);
const prerenderedBlogRoutes = findPrerenderedBlogRoutes(DIST);

// Merge: known routes + any prerendered extras not already listed
const allRoutes = [
  ...STATIC_ROUTES,
  ...knownBlogRoutes,
  ...prerenderedBlogRoutes.filter(r => !knownBlogRoutes.includes(r)),
].filter((r, i, a) => a.indexOf(r) === i && !EXCLUDE.has(r));

// ── Priority + changefreq ─────────────────────────────────────────────────────
const priority = (r) =>
  r === '/' ? '1.0'
  : /^\/(services|agentforce|b2b-lead-generation)$/.test(r) ? '0.9'
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
console.log(`✓ sitemap.xml written with ${allRoutes.length} URLs (${knownBlogRoutes.length} blog posts)`);
