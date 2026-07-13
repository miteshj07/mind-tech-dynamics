import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { Channel } from '@/types/analytics';
import { BRAND, formatNumber } from './format';

interface Props {
  channels: Channel[];
}

const AcquisitionChannels = ({ channels }: Props) => {
  const data = [...(channels ?? [])].sort((a, b) => b.sessions - a.sessions);

  if (!data.length) {
    return (
      <p className="text-sm text-gray-500 py-8 text-center">
        No channel data yet — this fills in once GA4 records traffic.
      </p>
    );
  }

  return (
    <div style={{ height: Math.max(220, data.length * 44) }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ left: 8, right: 24, top: 8, bottom: 8 }}
        >
          <CartesianGrid horizontal={false} stroke="#eee" />
          <XAxis type="number" tick={{ fontSize: 12 }} allowDecimals={false} />
          <YAxis
            type="category"
            dataKey="channel"
            width={120}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            cursor={{ fill: 'rgba(80,184,72,0.08)' }}
            formatter={(value: number, name) => [
              formatNumber(value),
              name === 'sessions' ? 'Sessions' : 'Active Users',
            ]}
          />
          <Bar dataKey="sessions" radius={[0, 4, 4, 0]} fill={BRAND} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AcquisitionChannels;
