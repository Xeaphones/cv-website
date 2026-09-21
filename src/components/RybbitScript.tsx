import { Helmet } from "react-helmet-async";

import { ANALYTICS_SCRIPT_URL, isAnalyticsEnabled } from "@/lib/rybbit";

export function RybbitScript() {
  if (!isAnalyticsEnabled()) return null;

  return (
    <Helmet>
      <script defer src={ANALYTICS_SCRIPT_URL} />
    </Helmet>
  );
}
