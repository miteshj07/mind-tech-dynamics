import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { GscTotals, TopQuery } from '@/types/analytics';
import { formatNumber, formatPct, formatPosition } from './format';

interface Props {
  queries: TopQuery[];
  totals: GscTotals;
}

const Totals = ({ totals }: { totals: GscTotals }) => (
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
    {[
      { label: 'Clicks', value: formatNumber(totals.clicks) },
      { label: 'Impressions', value: formatNumber(totals.impressions) },
      { label: 'Avg. CTR', value: formatPct(totals.ctr) },
      { label: 'Avg. Position', value: formatPosition(totals.position) },
    ].map((s) => (
      <div key={s.label} className="rounded-lg bg-gray-50 p-3 text-center">
        <div className="text-lg font-bold text-gray-900">{s.value}</div>
        <div className="text-xs text-gray-500">{s.label}</div>
      </div>
    ))}
  </div>
);

const SearchQueryIntent = ({ queries, totals }: Props) => {
  const rows = [...(queries ?? [])].sort((a, b) => b.clicks - a.clicks);

  return (
    <div>
      <Totals totals={totals} />
      {rows.length === 0 ? (
        <p className="text-sm text-gray-500 py-6 text-center">
          No search-query data yet — Search Console lags ~2–3 days and needs traffic to accumulate.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Search Query</TableHead>
                <TableHead className="text-right">Clicks</TableHead>
                <TableHead className="text-right">Impressions</TableHead>
                <TableHead className="text-right">CTR</TableHead>
                <TableHead className="text-right">Avg. Pos.</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((q) => (
                <TableRow key={q.query}>
                  <TableCell className="font-medium max-w-[280px] truncate">
                    {q.query}
                  </TableCell>
                  <TableCell className="text-right">{formatNumber(q.clicks)}</TableCell>
                  <TableCell className="text-right">{formatNumber(q.impressions)}</TableCell>
                  <TableCell className="text-right">{formatPct(q.ctr)}</TableCell>
                  <TableCell className="text-right">{formatPosition(q.position)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default SearchQueryIntent;
