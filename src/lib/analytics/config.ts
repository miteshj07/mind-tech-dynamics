// Analytics configuration.
//
// GA4 and LinkedIn IDs are PUBLIC identifiers — they ship inside the client
// bundle no matter what, so there is no secret to protect here. You can supply
// them either way:
//
//   1. (Preferred) In a .env file at the project root:
//        VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
//        VITE_LINKEDIN_PARTNER_ID=1234567
//
//   2. Or by pasting them into the fallback constants just below.
//
// Until an ID is present, the whole analytics layer stays dark (no scripts
// load, every tracking call is a no-op). So it is safe to ship this as-is.

const HARDCODED_GA_ID = 'G-4SCGB3ZDCD';  // Meet The Mind — GA4 web stream
const HARDCODED_LINKEDIN_ID = '9644964';  // Meet The Mind — LinkedIn Insight Tag (partner ID)

export const GA_MEASUREMENT_ID = (
  (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined) || HARDCODED_GA_ID || ''
).trim();

export const LINKEDIN_PARTNER_ID = (
  (import.meta.env.VITE_LINKEDIN_PARTNER_ID as string | undefined) || HARDCODED_LINKEDIN_ID || ''
).trim();

// Log tracking calls to the console during local development only.
export const ANALYTICS_DEBUG = Boolean(import.meta.env.DEV);
