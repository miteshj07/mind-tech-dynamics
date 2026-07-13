import React from 'react';
import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from 'recharts';
import {
  ArrowDown,
  ArrowUp,
  Clock,
  Minus,
  MousePointerClick,
  UserPlus,
  Users,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { Kpis } from '@/types/analytics';
import { BRAND, formatDuration, formatNumber } from './format';

const Delta = ({ current, previous }: { current: number; previous?: number }) => {
  if (previous === undefined || previous === 0) {
    return <span className="text-xs text-gray-400">no prior data</span>;
  }
  const change = (current - previous) / previous;
  const Icon = change === 0 ? Minus : change > 0 ? ArrowUp : ArrowDown;
  const color =
    change === 0 ? 'text-gray-400' : change > 0 ? 'text-brand' : 'text-red-500';
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${color}`}>
      <Icon size={12} />
      {Math.abs(change * 100).toFixed(0)}%
    </span>
  );
};

interface Props {
  kpis: Kpis;
}

const KpiScorecard = ({ kpis }: Props) => {
  const prev = kpis.previous;
  const tiles = [
    {
      label: 'Sessions',
      value: formatNumber(kpis.sessions),
      current: kpis.sessions,
      previous: prev?.sessions,
      Icon: MousePointerClick,
    },
    {
      label: 'Active Users',
      value: formatNumber(kpis.activeUsers),
      current: kpis.activeUsers,
      previous: prev?.activeUsers,
      Icon: Users,
    },
    {
      label: 'Avg. Session',
      value: formatDuration(kpis.averageSessionDuration),
      current: kpis.averageSessionDuration,
      previous: prev?.averageSessionDuration,
      Icon: Clock,
    },
    {
      label: 'New Users',
      value: formatNumber(kpis.newUsers),
      current: kpis.newUsers,
      previous: prev?.newUsers,
      Icon: UserPlus,
    },
  ];

  const engagementPct = Math.round((kpis.engagementRate || 0) * 100);
  const radialData = [{ name: 'engagement', value: engagementPct, fill: BRAND }];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
      {tiles.map((t) => (
        <Card key={t.label}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <t.Icon className="text-brand" size={18} />
              <Delta current={t.current} previous={t.previous} />
            </div>
            <div className="text-2xl font-bold text-gray-900">{t.value}</div>
            <p className="text-xs text-gray-500 mt-1">{t.label}</p>
          </CardContent>
        </Card>
      ))}

      <Card>
        <CardContent className="p-4 flex flex-col items-center justify-center">
          <div className="relative h-[104px] w-[104px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                innerRadius="72%"
                outerRadius="100%"
                data={radialData}
                startAngle={90}
                endAngle={-270}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar dataKey="value" background cornerRadius={8} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold text-brand">{engagementPct}%</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">Engagement Rate</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default KpiScorecard;
