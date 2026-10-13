// Data fetched while prerendering is recorded here and embedded into the
// snapshot as window.__PRERENDER_DATA__ (see scripts/prerender.mjs), so the
// first client render uses the same data as the prerendered HTML and
// hydration matches instead of falling back to a full client render.
const w = window as unknown as { __PRERENDER_DATA__?: Record<string, unknown> };
const store = (w.__PRERENDER_DATA__ ??= {});

export const getPrerendered = <T = any>(key: string): T | undefined => store[key] as T | undefined;

export const setPrerendered = (key: string, value: unknown) => {
  store[key] = value;
};
