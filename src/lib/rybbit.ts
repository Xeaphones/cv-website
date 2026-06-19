export const ANALYTICS_SITE_ID = import.meta.env.VITE_ANALYTICS_SITE_ID as string | undefined;
export const ANALYTICS_SCRIPT_URL = import.meta.env.VITE_ANALYTICS_SCRIPT_URL as string | undefined;

export function isAnalyticsEnabled(): boolean {
  return Boolean(ANALYTICS_SITE_ID?.trim() && ANALYTICS_SCRIPT_URL?.trim());
}
