export const ANALYTICS_SCRIPT_URL = import.meta.env.VITE_ANALYTICS_SCRIPT_URL as string | undefined;

export function isAnalyticsEnabled(): boolean {
  return Boolean(ANALYTICS_SCRIPT_URL?.trim());
}
