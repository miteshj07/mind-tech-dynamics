import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { DropoffRisk, TopPage } from '@/types/analytics';
import { avgEngagementSeconds, dropoffRisk } from './analyticsHeuristics';
import { formatDuration, formatNumber } from './format';

const riskStyles: Record<DropoffRisk, string> = {
  High: 'bg-red-100 text-red-700 border-transparent hover:bg-red-100',
  Medium: 'bg-amber-100 text-amber-700 border-transparent hover:bg-amber-100',
  Low: 'bg-green-100 text-green-700 border-transparent hover:bg-green-100',
};

interface Props {
  pages: TopPage[];
}

const ContentPerformance = ({ pages }: Props) => {
  const rows = [...(pages ?? [])].sort((a, b) => b.views - a.views);

  if (!rows.length) {
    return (
      <p className="text-sm text-gray-500 py-6 text-center">
        No page data yet — top pages appear once GA4 records views.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Page</TableHead>
            <TableHead className="text-right">Views</TableHead>
            <TableHead className="text-right">Avg. Time</TableHead>
            <TableHead className="text-right">Sessions</TableHead>
            <TableHead className="text-right">Drop-off Risk</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((p) => {
            const risk = dropoffRisk(p);
            return (
              <TableRow key={p.path}>
                <TableCell className="max-w-[320px]">
                  <div className="font-medium truncate">{p.path}</div>
                  {p.title && (
                    <div className="text-xs text-gray-400 truncate">{p.title}</div>
                  )}
                </TableCell>
                <TableCell className="text-right">{formatNumber(p.views)}</TableCell>
                <TableCell className="text-right">
                  {formatDuration(avgEngagementSeconds(p))}
                </TableCell>
                <TableCell className="text-right">{formatNumber(p.sessions)}</TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline" className={riskStyles[risk]}>
                    {risk}
                  </Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ContentPerformance;
