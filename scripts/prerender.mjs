#!/usr/bin/env node
// Runs react-snap with a working Chromium executable.
// - On CI/Vercel (Linux): resolves the path from puppeteer's installed Chrome.
// - Locally on macOS: falls back to system Chrome.
// Falls back to skipping prerender entirely if no Chromium is found,
// so the build never fails (site works as a plain SPA).

import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

// On Vercel's build infra, react-snap (puppeteer 1.x) is incompatible with
// modern Chromium. Skip prerendering there — Google renders JavaScript anyway.
// The sitemap is hardcoded, so it always includes all routes.
if (process.env.VERCEL) {
  console.log('ℹ Vercel environment detected — skipping react-snap (Google renders JS; sitemap is hardcoded).');
  process.exit(0);
}

async function findChromiumPath() {
  // 1. Explicit override (set in Vercel env vars or locally)
  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    return process.env.PUPPETEER_EXECUTABLE_PATH;
  }

  // 2. Try puppeteer's installed Chrome (works on Vercel Linux after npm install)
  try {
    const pup = await import('puppeteer');
    const executablePath = pup.executablePath ?? pup.default?.executablePath;
    if (typeof executablePath === 'function') {
      const p = executablePath();
      console.log(`[prerender] puppeteer.executablePath() → ${p}`);
      if (p && existsSync(p)) return p;
      console.warn(`[prerender] puppeteer path not found on disk: ${p}`);
    }
  } catch (e) { console.warn('[prerender] puppeteer import failed:', e.message); }

  // 3. Common Linux paths (Vercel / CI environments)
  for (const p of [
    '/usr/bin/google-chrome-stable',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
    '/snap/bin/chromium',
  ]) {
    if (existsSync(p)) return p;
  }

  // 4. macOS system Chrome
  const mac = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  if (existsSync(mac)) return mac;

  return null;
}

const chromePath = await findChromiumPath();

if (!chromePath) {
  console.warn('⚠ No Chromium found — skipping react-snap prerender. Site will work as a JS-rendered SPA.');
  process.exit(0);
}

console.log(`✓ Chromium found: ${chromePath}`);

const result = spawnSync('npx', ['react-snap'], {
  stdio: 'inherit',
  env: { ...process.env, PUPPETEER_EXECUTABLE_PATH: chromePath },
  shell: true,
});

if (result.status !== 0) {
  console.warn(`⚠ react-snap exited with code ${result.status} — continuing without prerender.`);
}

// Always exit 0 so sitemap generation still runs
process.exit(0);
