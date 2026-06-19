import { Helmet } from "react-helmet-async";

import { ANALYTICS_SCRIPT_URL, ANALYTICS_SITE_ID, isAnalyticsEnabled } from "@/lib/rybbit";

export function RybbitScript() {
  if (!isAnalyticsEnabled()) return null;

  return (
    <Helmet>
      <script
        async
        src={ANALYTICS_SCRIPT_URL}
        data-site-id={ANALYTICS_SITE_ID}
      />
    </Helmet>
  );
}
