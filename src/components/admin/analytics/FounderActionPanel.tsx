import React from 'react';
import { AlertTriangle, ListChecks, Trophy } from 'lucide-react';
import type { AnalyticsSnapshot } from '@/types/analytics';
import { buildActionPanel } from './analyticsHeuristics';

interface Props {
  snapshot: AnalyticsSnapshot;
}

const FounderActionPanel = ({ snapshot }: Props) => {
  const { win, bottleneck, tasks } = buildActionPanel(snapshot);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="rounded-xl border border-green-200 bg-green-50 p-5">
        <div className="flex items-center gap-2 mb-2 text-green-700">
          <Trophy size={18} />
          <h4 className="font-semibold">Traffic Win</h4>
        </div>
        <p className="text-sm text-gray-700">{win}</p>
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
        <div className="flex items-center gap-2 mb-2 text-amber-700">
          <AlertTriangle size={18} />
          <h4 className="font-semibold">Conversion Bottleneck</h4>
        </div>
        <p className="text-sm text-gray-700">{bottleneck}</p>
      </div>

      <div className="rounded-xl border border-brand/30 bg-brand/5 p-5">
        <div className="flex items-center gap-2 mb-2 text-brand-dark">
          <ListChecks size={18} />
          <h4 className="font-semibold">Do This Week</h4>
        </div>
        <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
          {tasks.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default FounderActionPanel;
