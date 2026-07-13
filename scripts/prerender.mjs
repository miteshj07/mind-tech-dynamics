#!/usr/bin/env node
// ============================================================
// Prerenderer (modern puppeteer)
//
// Serves the built `dist/` locally, drives a real headless Chrome over every
// public route, and saves the fully-rendered HTML to dist/<route>/index.html.
// Because it's a real browser, the app's client-side rendering — including the
// imperative <head> writes in Seo.tsx, CMS content, and async blog fetches —
// all work exactly as they do for a visitor. Non-JS crawlers (AI answer
// engines, social unfurlers) then get complete, per-page HTML.
//
// Replaces the old react-snap setup, whose bundled puppeteer 1.x was
// incompatible with modern Chromium on Vercel. Uses puppeteer-core with
// @sparticuz/chromium on Linux (a Chromium built to run inside Vercel's minimal
// build image, which lacks the system libs a normal Chromium needs), and a
// system Chrome when run locally (macOS/Windows).
//
// FAILS SAFE: if Chromium can't launch, it logs a warning and exits 0, leaving
// the plain SPA build intact — so it can never break the deploy. The app's
// main.tsx hydrates the prerendered HTML (hydrateRoot when #root has markup).
// ============================================================

import http from 'node:http';
import {
  existsSync, mkdirSync, readFileSync, statSync, writeFileSync,
} from 'node:fs';
import { extname, join } from 'node:path';

const DIST = 'dist';
const PORT = 45678;

// Supabase (public, publishable — same values as src/integrations/supabase/client.ts)
const SB_URL = 'https://rlfansvalprvofpuqmsb.supabase.co';
const SB_KEY = 'sb_publishable_EsIXaQP9xnMWmfy6DS0kiw_9rubIkga';

// Public routes to prerender. Keep in sync with src/App.tsx (admin/auth routes
// are intentionally excluded — they're client-only and behind auth).
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
  '/apps',
  '/dealpulse',
  '/careers',
  '/contact-us',
  '/privacy-policy',
  '/terms-of-service',
  '/sitemap',
];

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.gif': 'image/gif', '.webp': 'image/webp', '.avif': 'image/avif',
  '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2',
  '.ttf': 'font/ttf', '.mp4': 'video/mp4', '.webm': 'video/webm',
  '.xml': 'application/xml', '.txt': 'text/plain', '.map': 'application/json',
};

if (!existsSync(join(DIST, 'index.html'))) {
  console.warn('⚠ dist/index.html not found — run the build first. Skipping prerender.');
  process.exit(0);
}

// Fetch published blog slugs so blog posts get prerendered too (published posts
// are public via RLS). Best-effort — skip blog routes if the fetch fails.
async function fetchBlogRoutes() {
  try {
    const res = await fetch(
      `${SB_URL}/rest/v1/blog_posts?select=slug&status=eq.published`,
      { headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` } },
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const rows = await res.json();
    const routes = rows.map((r) => `/blog/${r.slug}`).filter((r) => r !== '/blog/');
    console.log(`[prerender] ${routes.length} published blog posts`);
    return routes;
  } catch (e) {
    console.warn(`[prerender] couldn't fetch blog slugs (${e.message}) — skipping blog routes`);
    return [];
  }
}

async function launchBrowser() {
  const puppeteer = (await import('puppeteer-core')).default;

  // Linux (Vercel build / CI): @sparticuz/chromium ships a Chromium + the shared
  // libraries these minimal images lack — the fix for "couldn't launch Chrome".
  if (process.platform === 'linux') {
    const chromium = (await import('@sparticuz/chromium')).default;
    return await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });
  }

  // Local dev (macOS/Windows): drive a system Chrome.
  const args = ['--no-sandbox', '--disable-setuid-sandbox'];
  const candidates = [
    process.env.PUPPETEER_EXECUTABLE_PATH,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/local/bin/chromium',
  ].filter(Boolean);
  for (const executablePath of candidates) {
    if (existsSync(executablePath)) {
      return await puppeteer.launch({ headless: 'new', args, executablePath });
    }
  }
  throw new Error('no local Chrome found (set PUPPETEER_EXECUTABLE_PATH)');
}

// Serve dist/. The SPA shell is cached in memory once so that writing
// prerendered per-route files during this run doesn't change what the server
// returns for still-to-be-rendered routes.
const SHELL = readFileSync(join(DIST, 'index.html'));

function startServer() {
  return http.createServer((req, res) => {
    const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
    const filePath = join(DIST, urlPath);
    const isFile = extname(urlPath) && existsSync(filePath) && statSync(filePath).isFile();
    if (isFile) {
      res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] || 'application/octet-stream' });
      res.end(readFileSync(filePath));
    } else {
      // SPA fallback → always the original shell
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(SHELL);
    }
  });
}

async function main() {
  let browser;
  try {
    browser = await launchBrowser();
  } catch (e) {
    console.warn(`⚠ Could not launch Chromium (${e.message}) — skipping prerender; site ships as a plain SPA.`);
    process.exit(0);
  }

  const server = startServer();
  await new Promise((resolve) => server.listen(PORT, resolve));

  const routes = [...STATIC_ROUTES, ...(await fetchBlogRoutes())];
  let ok = 0;
  let failed = 0;

  for (const route of routes) {
    const page = await browser.newPage();
    try {
      // Match the app's isPrerender guard (navigator.userAgent === 'ReactSnap')
      // so GA/LinkedIn don't fire and pollute the snapshot with tracking noise.
      await page.setUserAgent('ReactSnap');
      await page.goto(`http://localhost:${PORT}${route}`, {
        waitUntil: 'networkidle2',
        timeout: 45000,
      });
      // Ensure React has rendered something into #root.
      await page.waitForSelector('#root > *', { timeout: 15000 }).catch(() => {});
      // Blog detail pages fetch their body from Supabase after mount — wait for
      // the article to render (and for Seo.tsx to set the per-post canonical)
      // before snapshotting, or we'd capture just the page chrome. networkidle2
      // can fire before that fetch resolves on slower (CI) networks.
      if (/^\/blog\/.+/.test(route)) {
        await page.waitForSelector('article', { timeout: 25000 }).catch(() => {});
      }
      const html = await page.content();

      const outDir = route === '/' ? DIST : join(DIST, route);
      mkdirSync(outDir, { recursive: true });
      writeFileSync(join(outDir, 'index.html'), html);
      ok += 1;
      console.log(`  ✓ ${route}`);
    } catch (e) {
      failed += 1;
      console.warn(`  ✗ ${route} — ${e.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  await new Promise((resolve) => server.close(resolve));
  console.log(`[prerender] done — ${ok} prerendered, ${failed} failed.`);
  // Never fail the build on prerender problems.
  process.exit(0);
}

main().catch((e) => {
  console.warn(`⚠ prerender error (${e.message}) — continuing without prerender.`);
  process.exit(0);
});
