// Small display formatters shared across the analytics dashboard.

export const BRAND = '#50B848';
export const BRAND_LIGHT = '#8CD680';

export const formatNumber = (n: number): string =>
  new Intl.NumberFormat('en-US').format(Math.round(n || 0));

export const formatPct = (fraction: number, dp = 1): string =>
  `${((fraction || 0) * 100).toFixed(dp)}%`;

export const formatDuration = (seconds: number): string => {
  const s = Math.round(seconds || 0);
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return m > 0 ? `${m}m ${rem}s` : `${rem}s`;
};

export const formatPosition = (p: number): string => (p ? p.toFixed(1) : '—');
