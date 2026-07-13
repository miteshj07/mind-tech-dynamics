// Shapes of the JSONB payloads stored in `analytics_snapshots` by the
// `analytics-snapshot` edge function. Kept in sync with that function.

export interface KpiMetrics {
  sessions: number;
  activeUsers: number;
  engagementRate: number;        // 0..1
  averageSessionDuration: number; // seconds
  screenPageViews: number;
  newUsers: number;
}

export interface Kpis extends KpiMetrics {
  /** Prior 28-day window, for delta arrows. May be absent on old rows. */
  previous?: KpiMetrics;
}

export interface Channel {
  channel: string;
  sessions: number;
  activeUsers: number;
}

export interface TopPage {
  path: string;
  title: string;
  views: number;
  /** Total user engagement time on the page, in seconds. */
  engagementDuration: number;
  sessions: number;
  engagementRate: number; // 0..1
}

export interface TopQuery {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;      // 0..1
  position: number; // average position (lower is better)
}

export interface GscTotals {
  clicks: number;
  impressions: number;
  ctr: number;      // 0..1
  position: number;
  rangeStart?: string;
  rangeEnd?: string;
}

export interface AnalyticsSnapshot {
  id: string;
  snapshot_date: string;
  range_start: string | null;
  range_end: string | null;
  kpis: Kpis;
  channels: Channel[];
  top_pages: TopPage[];
  top_queries: TopQuery[];
  gsc_totals: GscTotals;
  ga4_ok: boolean;
  gsc_ok: boolean;
  error: string | null;
  created_at: string;
  updated_at: string;
}

export type DropoffRisk = "Low" | "Medium" | "High";

export interface ActionPanel {
  win: string;
  bottleneck: string;
  tasks: string[];
}
