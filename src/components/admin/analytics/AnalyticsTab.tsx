import React from 'react';
import { RefreshCw, BarChart3, Search, AlertCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useAnalyticsSnapshot } from '@/hooks/useAnalyticsSnapshot';
import KpiScorecard from './KpiScorecard';
import AcquisitionChannels from './AcquisitionChannels';
import SearchQueryIntent from './SearchQueryIntent';
import ContentPerformance from './ContentPerformance';
import FounderActionPanel from './FounderActionPanel';

const StatusBadge = ({ ok, label }: { ok: boolean; label: string }) => (
  <Badge
    variant="outline"
    className={
      ok
        ? 'bg-green-100 text-green-700 border-transparent'
        : 'bg-red-100 text-red-700 border-transparent'
    }
  >
    {label} {ok ? '✓' : '✗'}
  </Badge>
);

const AnalyticsTab = () => {
  const { snapshot, loading, error, refetch } = useAnalyticsSnapshot();

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-28 w-full" />
          ))}
        </div>
        <Skeleton className="h-72 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertCircle size={20} /> Couldn't load analytics
          </CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" onClick={() => refetch()}>
            <RefreshCw size={16} className="mr-2" /> Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!snapshot) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No analytics yet</CardTitle>
          <CardDescription>
            The first snapshot lands after the daily job runs (or once you invoke
            the <code className="text-xs">analytics-snapshot</code> function). GA4
            data matures ~24–48h and Search Console lags ~2–3 days, so early
            snapshots will be thin.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" onClick={() => refetch()}>
            <RefreshCw size={16} className="mr-2" /> Check again
          </Button>
        </CardContent>
      </Card>
    );
  }

  const ga4Range =
    snapshot.range_start && snapshot.range_end
      ? `${snapshot.range_start} → ${snapshot.range_end}`
      : '—';
  const gscRange =
    snapshot.gsc_totals?.rangeStart && snapshot.gsc_totals?.rangeEnd
      ? `${snapshot.gsc_totals.rangeStart} → ${snapshot.gsc_totals.rangeEnd}`
      : '—';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">Website Analytics</h3>
          <p className="text-sm text-gray-500">
            Snapshot from {snapshot.snapshot_date} · GA4 {ga4Range} · Search {gscRange}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge ok={snapshot.ga4_ok} label="GA4" />
          <StatusBadge ok={snapshot.gsc_ok} label="Search Console" />
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            <RefreshCw size={15} className="mr-1.5" /> Refresh
          </Button>
        </div>
      </div>

      {(!snapshot.ga4_ok || !snapshot.gsc_ok) && snapshot.error && (
        <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span>
            Part of the last pull failed, so some sections may be empty:{' '}
            <span className="font-mono text-xs">{snapshot.error}</span>
          </span>
        </div>
      )}

      {/* KPI scorecard */}
      <KpiScorecard kpis={snapshot.kpis} />

      {/* Traffic vs. Intent */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Traffic &amp; Intent</CardTitle>
          <CardDescription>
            Where visitors come from, and what they search to find you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="channels">
            <TabsList className="grid grid-cols-2 w-full max-w-md">
              <TabsTrigger value="channels" className="flex items-center gap-1.5">
                <BarChart3 size={14} /> Acquisition Channels
              </TabsTrigger>
              <TabsTrigger value="queries" className="flex items-center gap-1.5">
                <Search size={14} /> Search Query Intent
              </TabsTrigger>
            </TabsList>
            <TabsContent value="channels" className="pt-4">
              <AcquisitionChannels channels={snapshot.channels} />
            </TabsContent>
            <TabsContent value="queries" className="pt-4">
              <SearchQueryIntent
                queries={snapshot.top_queries}
                totals={snapshot.gsc_totals}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Content performance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Content Performance</CardTitle>
          <CardDescription>
            Your most-visited pages, with a drop-off risk flag from low
            time-on-page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ContentPerformance pages={snapshot.top_pages} />
        </CardContent>
      </Card>

      {/* Founder action panel */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Founder Action Panel</h3>
        <FounderActionPanel snapshot={snapshot} />
      </div>
    </div>
  );
};

export default AnalyticsTab;
