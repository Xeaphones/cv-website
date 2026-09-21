import { Helmet } from "react-helmet-async";

import { getAnalyticsScriptSrc, isAnalyticsEnabled } from "@/lib/rybbit";

export function RybbitScript() {
  if (!isAnalyticsEnabled()) return null;

  const src = getAnalyticsScriptSrc();
  if (!src) return null;

  return (
    <Helmet>
      <script defer src={src} />
    </Helmet>
  );
}
