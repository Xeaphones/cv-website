export const ANALYTICS_SITE_ID = import.meta.env.VITE_ANALYTICS_SITE_ID as string | undefined;
export const ANALYTICS_SCRIPT_URL = import.meta.env.VITE_ANALYTICS_SCRIPT_URL as string | undefined;

export function isAnalyticsEnabled(): boolean {
  return Boolean(ANALYTICS_SITE_ID?.trim() && ANALYTICS_SCRIPT_URL?.trim());
}

/** Build the tracking script URL with ?siteId= (Rybbit’s preferred form). */
export function getAnalyticsScriptSrc(): string | null {
  const base = ANALYTICS_SCRIPT_URL?.trim();
  const siteId = ANALYTICS_SITE_ID?.trim();
  if (!base || !siteId) return null;

  try {
    const url = new URL(base);
    url.searchParams.set("siteId", siteId);
    return url.toString();
  } catch {
    const join = base.includes("?") ? "&" : "?";
    return `${base}${join}siteId=${encodeURIComponent(siteId)}`;
  }
}
