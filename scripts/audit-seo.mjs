// Audits a finished build (run `npm run build` first, then
// `node scripts/audit-seo.mjs`). For every page in dist/sitemap.xml it prints
// the title and description lengths Google will see and whether the snapshot
// was taken with the CMS data loaded. Exits 1 if any page was snapshotted
// without CMS data (the prerender race) so that regression is caught. Long
// titles and descriptions are only flagged: some come from the database.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const DIST = process.argv[2] || 'dist';
const SITE = 'https://www.meethemind.com';
const xml = readFileSync(join(DIST, 'sitemap.xml'), 'utf8');
const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(SITE, '') || '/');
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');
let noCms = 0;
let longTitle = 0;
let longDesc = 0;
for (const p of paths) {
  const html = readFileSync(join(DIST, p === '/' ? 'index.html' : join(p, 'index.html')), 'utf8');
  const title = decode((html.match(/<title>([^<]*)<\/title>/) || [])[1] || '');
  const desc = decode((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '');
  const data = (html.match(/__PRERENDER_DATA__=(\{[\s\S]*?)<\/script>/) || [])[1] || '';
  const cms = data.includes('"cms_content"');
  if (!cms) noCms += 1;
  if (title.length > 60) longTitle += 1;
  if (desc.length > 160) longDesc += 1;
  const flags = [!cms && 'NO-CMS', title.length > 60 && 'LONG-TITLE', desc.length > 160 && 'long-desc'].filter(Boolean).join(' ');
  console.log(`T${String(title.length).padStart(3)} D${String(desc.length).padStart(4)} ${p}  ${flags}\n      ${title}`);
}
console.log(`\n${paths.length} pages: ${noCms} without CMS data, ${longTitle} titles over 60, ${longDesc} descriptions over 160`);
process.exit(noCms ? 1 : 0);
