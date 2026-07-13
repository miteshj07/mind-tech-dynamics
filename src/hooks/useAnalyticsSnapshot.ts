import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { AnalyticsSnapshot } from '@/types/analytics';

/**
 * Reads the most recent row from `analytics_snapshots` (admin-only via RLS).
 * The daily edge function writes those rows; this hook never calls Google.
 */
export const useAnalyticsSnapshot = () => {
  const [snapshot, setSnapshot] = useState<AnalyticsSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSnapshot = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: queryError } = await supabase
      .from('analytics_snapshots')
      .select('*')
      .order('snapshot_date', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (queryError) {
      setError(queryError.message);
      setSnapshot(null);
    } else {
      // JSONB columns come back as `Json`; the edge function guarantees the shapes.
      setSnapshot((data as unknown as AnalyticsSnapshot) ?? null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchSnapshot();
  }, [fetchSnapshot]);

  return { snapshot, loading, error, refetch: fetchSnapshot };
};
