// ============================================================
// Edge function: analytics-snapshot
// Purpose:   Pull website traffic from GA4 (Data API) + Google
//            Search Console and upsert a single daily snapshot row
//            into public.analytics_snapshots. Invoked once a day by
//            pg_cron (see the migration). The /admin dashboard only
//            READS that row — it never calls Google itself.
//
// Auth:      A Google Cloud service account (RS256 JWT-bearer flow,
//            minted here with Deno Web Crypto — no npm deps). The
//            same token works for GA4 + GSC.
//
// Secrets (set via Supabase → Edge Functions → Secrets):
//   GOOGLE_SERVICE_ACCOUNT_JSON  full contents of the SA key file
//   GA4_PROPERTY_ID              numeric property id (NOT G-XXXX)
//   GSC_SITE_URL                 e.g. "sc-domain:meethemind.com"
//   CRON_SECRET                  shared secret the cron sends
//   SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY   (auto-injected)
// ============================================================

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-cron-secret",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });

// ── helpers ──────────────────────────────────────────────────

const num = (v: unknown): number => {
  const n = parseFloat(String(v ?? "0"));
  return Number.isFinite(n) ? n : 0;
};

const ymd = (d: Date): string => d.toISOString().slice(0, 10);

const daysAgo = (n: number): Date => {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d;
};

const b64url = (input: Uint8Array | string): string => {
  const bin =
    typeof input === "string"
      ? input
      : Array.from(input, (b) => String.fromCharCode(b)).join("");
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

// Mint a Google OAuth2 access token from the service-account key
// using a self-signed RS256 JWT (jwt-bearer grant). One token, both
// scopes, reused for every API call in this run.
async function getAccessToken(): Promise<string> {
  const raw = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_JSON");
  if (!raw) throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON secret is not set");
  const sa = JSON.parse(raw);

  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = b64url(
    JSON.stringify({
      iss: sa.client_email,
      scope: [
        "https://www.googleapis.com/auth/analytics.readonly",
        "https://www.googleapis.com/auth/webmasters.readonly",
      ].join(" "),
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    }),
  );
  const signingInput = `${header}.${claims}`;

  // Google issues PKCS#8 keys ("BEGIN PRIVATE KEY").
  const pem = String(sa.private_key)
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s+/g, "");
  const der = Uint8Array.from(atob(pem), (c) => c.charCodeAt(0));
  const key = await crypto.subtle.importKey(
    "pkcs8",
    der,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = new Uint8Array(
    await crypto.subtle.sign(
      "RSASSA-PKCS1-v1_5",
      key,
      new TextEncoder().encode(signingInput),
    ),
  );
  const assertion = `${signingInput}.${b64url(sig)}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  if (!res.ok) throw new Error(`token exchange failed: ${await res.text()}`);
  const data = await res.json();
  if (!data.access_token) throw new Error("token exchange returned no access_token");
  return data.access_token as string;
}

// ── GA4 Data API ─────────────────────────────────────────────

async function ga4RunReport(
  token: string,
  propertyId: string,
  body: unknown,
): Promise<any> {
  const res = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );
  if (!res.ok) throw new Error(`GA4 ${res.status}: ${await res.text()}`);
  return await res.json();
}

const KPI_METRICS = [
  "sessions",
  "activeUsers",
  "engagementRate",
  "averageSessionDuration",
  "screenPageViews",
  "newUsers",
] as const;

function kpiFromRow(row: any): Record<string, number> {
  const out: Record<string, number> = {};
  KPI_METRICS.forEach((name, i) => {
    out[name] = num(row?.metricValues?.[i]?.value);
  });
  return out;
}

// With two dateRanges GA4 adds a "dateRange" dimension whose value is
// "date_range_0" / "date_range_1"; fall back to positional order.
function rowByRange(report: any, id: string, index: number): any {
  const rows = report?.rows ?? [];
  return (
    rows.find((r: any) => r?.dimensionValues?.[0]?.value === id) ??
    rows[index] ??
    null
  );
}

async function pullGa4(token: string, propertyId: string) {
  // (a) KPIs — current 28d + prior 28d for deltas
  const kpiReport = await ga4RunReport(token, propertyId, {
    dateRanges: [
      { startDate: "28daysAgo", endDate: "yesterday" },
      { startDate: "56daysAgo", endDate: "29daysAgo" },
    ],
    metrics: KPI_METRICS.map((name) => ({ name })),
  });
  const current = kpiFromRow(rowByRange(kpiReport, "date_range_0", 0));
  const previous = kpiFromRow(rowByRange(kpiReport, "date_range_1", 1));
  const kpis = { ...current, previous };

  // (b) Sessions by default channel grouping
  const channelReport = await ga4RunReport(token, propertyId, {
    dateRanges: [{ startDate: "28daysAgo", endDate: "yesterday" }],
    dimensions: [{ name: "sessionDefaultChannelGroup" }],
    metrics: [{ name: "sessions" }, { name: "activeUsers" }],
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    limit: 10,
  });
  const channels = (channelReport.rows ?? []).map((r: any) => ({
    channel: r?.dimensionValues?.[0]?.value ?? "(unknown)",
    sessions: num(r?.metricValues?.[0]?.value),
    activeUsers: num(r?.metricValues?.[1]?.value),
  }));

  // (c) Top pages
  const pageReport = await ga4RunReport(token, propertyId, {
    dateRanges: [{ startDate: "28daysAgo", endDate: "yesterday" }],
    dimensions: [{ name: "pagePath" }, { name: "pageTitle" }],
    metrics: [
      { name: "screenPageViews" },
      { name: "userEngagementDuration" },
      { name: "sessions" },
      { name: "engagementRate" },
    ],
    orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
    limit: 25,
  });
  const topPages = (pageReport.rows ?? []).map((r: any) => ({
    path: r?.dimensionValues?.[0]?.value ?? "",
    title: r?.dimensionValues?.[1]?.value ?? "",
    views: num(r?.metricValues?.[0]?.value),
    engagementDuration: num(r?.metricValues?.[1]?.value),
    sessions: num(r?.metricValues?.[2]?.value),
    engagementRate: num(r?.metricValues?.[3]?.value),
  }));

  return { kpis, channels, topPages };
}

// ── Google Search Console ────────────────────────────────────

async function gscQuery(
  token: string,
  siteUrl: string,
  body: unknown,
): Promise<any> {
  const res = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(
      siteUrl,
    )}/searchAnalytics/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );
  if (!res.ok) throw new Error(`GSC ${res.status}: ${await res.text()}`);
  return await res.json();
}

async function pullGsc(token: string, siteUrl: string) {
  // GSC data lags ~2-3 days and needs explicit ISO dates.
  const start = ymd(daysAgo(30));
  const end = ymd(daysAgo(3));

  const queryReport = await gscQuery(token, siteUrl, {
    startDate: start,
    endDate: end,
    dimensions: ["query"],
    rowLimit: 25,
    type: "web",
  });
  const topQueries = (queryReport.rows ?? []).map((r: any) => ({
    query: r?.keys?.[0] ?? "",
    clicks: num(r?.clicks),
    impressions: num(r?.impressions),
    ctr: num(r?.ctr),
    position: num(r?.position),
  }));

  const totalReport = await gscQuery(token, siteUrl, {
    startDate: start,
    endDate: end,
    dimensions: [],
    type: "web",
  });
  const t = totalReport.rows?.[0];
  const gscTotals = {
    clicks: num(t?.clicks),
    impressions: num(t?.impressions),
    ctr: num(t?.ctr),
    position: num(t?.position),
    rangeStart: start,
    rangeEnd: end,
  };

  return { topQueries, gscTotals };
}

// ── handler ──────────────────────────────────────────────────

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Public URL (verify_jwt=false) → the shared secret is the real gate.
  if (req.headers.get("x-cron-secret") !== Deno.env.get("CRON_SECRET")) {
    return json({ success: false, error: "unauthorized" }, 401);
  }

  try {
    const propertyId = Deno.env.get("GA4_PROPERTY_ID");
    const siteUrl = Deno.env.get("GSC_SITE_URL");
    if (!propertyId) throw new Error("GA4_PROPERTY_ID secret is not set");
    if (!siteUrl) throw new Error("GSC_SITE_URL secret is not set");

    // If the token can't be minted there is nothing to store — fail
    // without upserting so the previous good snapshot is preserved.
    const token = await getAccessToken();

    let kpis: unknown = {};
    let channels: unknown = [];
    let topPages: unknown = [];
    let topQueries: unknown = [];
    let gscTotals: unknown = {};
    let ga4_ok = false;
    let gsc_ok = false;
    const errors: string[] = [];

    // GA4 and GSC are independent — a failure in one must not blank the other.
    try {
      const ga4 = await pullGa4(token, propertyId);
      kpis = ga4.kpis;
      channels = ga4.channels;
      topPages = ga4.topPages;
      ga4_ok = true;
    } catch (e) {
      console.error("GA4 pull failed:", (e as Error).message);
      errors.push(`GA4: ${(e as Error).message}`);
    }

    try {
      const gsc = await pullGsc(token, siteUrl);
      topQueries = gsc.topQueries;
      gscTotals = gsc.gscTotals;
      gsc_ok = true;
    } catch (e) {
      console.error("GSC pull failed:", (e as Error).message);
      errors.push(`GSC: ${(e as Error).message}`);
    }

    const snapshot = {
      snapshot_date: ymd(new Date()),
      range_start: ymd(daysAgo(28)),
      range_end: ymd(daysAgo(1)),
      kpis,
      channels,
      top_pages: topPages,
      top_queries: topQueries,
      gsc_totals: gscTotals,
      ga4_ok,
      gsc_ok,
      error: errors.length ? errors.join(" | ") : null,
    };

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    const { error: upsertError } = await supabase
      .from("analytics_snapshots")
      .upsert(snapshot, { onConflict: "snapshot_date" });
    if (upsertError) throw new Error(`upsert failed: ${upsertError.message}`);

    console.log(
      `snapshot ${snapshot.snapshot_date} stored (ga4_ok=${ga4_ok}, gsc_ok=${gsc_ok})`,
    );
    return json({
      success: true,
      snapshot_date: snapshot.snapshot_date,
      ga4_ok,
      gsc_ok,
      errors,
    });
  } catch (error) {
    console.error("analytics-snapshot failed:", (error as Error).message);
    return json({ success: false, error: (error as Error).message }, 500);
  }
});
