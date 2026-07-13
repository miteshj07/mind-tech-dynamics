// Pure, I/O-free helpers over a pulled snapshot. Kept separate so they're
// trivially unit-testable and reusable across the dashboard components.

import type {
  ActionPanel,
  AnalyticsSnapshot,
  DropoffRisk,
  TopPage,
} from '@/types/analytics';

// Pages below this view count are too low-traffic to judge — ignore for risk.
const MIN_PAGE_VIEWS = 20;

/** Average engagement time per view, in seconds. */
export const avgEngagementSeconds = (page: TopPage): number =>
  page.views > 0 ? page.engagementDuration / page.views : 0;

/**
 * Drop-off risk from low time-on-page / low engagement. Pages under the
 * traffic floor are treated as Low so the grid isn't full of noise.
 */
export const dropoffRisk = (page: TopPage): DropoffRisk => {
  if (page.views < MIN_PAGE_VIEWS) return 'Low';
  const avg = avgEngagementSeconds(page);
  if (avg < 15) return 'High';
  if (avg < 30 || page.engagementRate < 0.4) return 'Medium';
  return 'Low';
};

const asPct = (fraction: number): string => `${(fraction * 100).toFixed(1)}%`;

/**
 * Founder Action Panel: 1 win, 1 bottleneck, 3 tasks — all derived from the
 * pulled snapshot only. Degrades gracefully when data is thin.
 */
export const buildActionPanel = (snapshot: AnalyticsSnapshot): ActionPanel => {
  const channels = snapshot.channels ?? [];
  const pages = snapshot.top_pages ?? [];
  const queries = snapshot.top_queries ?? [];
  const kpis = snapshot.kpis;

  const topChannel = [...channels].sort((a, b) => b.sessions - a.sessions)[0];
  const topQuery = [...queries].sort((a, b) => b.clicks - a.clicks)[0];

  // ── WIN ──────────────────────────────────────────────────
  let win =
    'Not enough traffic yet to call a clear win — this fills in as data accumulates.';
  if (topChannel && topChannel.sessions > 0) {
    win = `${topChannel.channel} is your top traffic source with ${topChannel.sessions} sessions in the last 28 days.`;
    if (topQuery && topQuery.clicks > 0) {
      win += ` Best search query: "${topQuery.query}" (${topQuery.clicks} clicks).`;
    }
  } else if (topQuery && topQuery.clicks > 0) {
    win = `"${topQuery.query}" is your best search query, driving ${topQuery.clicks} clicks from Google.`;
  }

  // ── BOTTLENECK ───────────────────────────────────────────
  const riskyPage = [...pages]
    .filter((p) => p.views >= MIN_PAGE_VIEWS && dropoffRisk(p) === 'High')
    .sort((a, b) => b.views - a.views)[0];

  // High impressions but poor CTR + poor rank = an SEO opportunity being wasted.
  const seoGap = [...queries]
    .filter((q) => q.impressions >= 50 && q.ctr < 0.02 && q.position > 10)
    .sort((a, b) => b.impressions - a.impressions)[0];

  let bottleneck =
    'No obvious bottleneck yet — keep an eye on engagement as traffic grows.';
  if (riskyPage) {
    bottleneck = `Your high-traffic page ${riskyPage.path} has low engagement (~${Math.round(
      avgEngagementSeconds(riskyPage),
    )}s avg over ${riskyPage.views} views) — visitors are landing but not staying.`;
  } else if (seoGap) {
    bottleneck = `"${seoGap.query}" gets ${seoGap.impressions} impressions but only ${asPct(
      seoGap.ctr,
    )} CTR at avg position ${seoGap.position.toFixed(1)} — visible in search, but not clicked.`;
  } else if (kpis && kpis.engagementRate > 0 && kpis.engagementRate < 0.5) {
    bottleneck = `Site-wide engagement rate is ${asPct(
      kpis.engagementRate,
    )} — under half of sessions are engaged. Something's losing people early.`;
  }

  // ── TASKS ────────────────────────────────────────────────
  const tasks: string[] = [];
  if (seoGap) {
    tasks.push(
      `Rewrite the page title + meta description for "${seoGap.query}" — ${seoGap.impressions} impressions at ${asPct(
        seoGap.ctr,
      )} CTR is unclaimed traffic.`,
    );
  }
  if (riskyPage) {
    tasks.push(
      `Strengthen ${riskyPage.path}: tighten the opening, add a clear CTA to /contact-us, and cut anything slowing the first screen.`,
    );
  }
  if (topChannel && topChannel.sessions > 0) {
    tasks.push(
      `Double down on ${topChannel.channel} — it's already your #1 source. Publish/post more of what's working there this week.`,
    );
  }
  if (topQuery && topQuery.clicks > 0) {
    tasks.push(
      `Create a dedicated page or article targeting "${topQuery.query}" to capture more of that search demand.`,
    );
  }

  // Fallbacks so there are always exactly 3 actionable tasks.
  const fallbacks = [
    'Submit any new/updated pages for indexing in Search Console to speed up ranking.',
    'Add a clear primary CTA (Book a call) above the fold on your top 3 landing pages.',
    'Publish one focused article this week targeting a high-intent Salesforce/Agentforce query.',
    'Review your lowest-engagement top page and A/B test a stronger headline.',
  ];
  for (const f of fallbacks) {
    if (tasks.length >= 3) break;
    if (!tasks.includes(f)) tasks.push(f);
  }

  return { win, bottleneck, tasks: tasks.slice(0, 3) };
};
