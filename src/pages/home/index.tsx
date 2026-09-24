import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import { PageMeta } from "@/shared/components/PageMeta";
import { PageShell } from "@/shared/components/PageShell";
import { scrollToHomeSection, usePreferMachineReadable } from "@/lib/hooks";

import { HomeCompact } from "./HomeCompact";
import { HeroSection } from "./sections/HeroSection";

const HomeRest = lazy(() => import("./HomeRest"));

function isDeepLink(hash: string) {
  return hash !== "" && hash !== "#hero";
}

export const Home = () => {
  const { t } = useTranslation();
  const { hash } = useLocation();
  const compact = usePreferMachineReadable();
  const deepLink = isDeepLink(hash);
  const [loadRest, setLoadRest] = useState(deepLink);
  const [ctaReady, setCtaReady] = useState(false);
  const markReady = useCallback(() => setCtaReady(true), []);

  useEffect(() => {
    if (compact || loadRest) return;
    const frame = window.requestAnimationFrame(() => setLoadRest(true));
    return () => window.cancelAnimationFrame(frame);
  }, [compact, loadRest]);

  useEffect(() => {
    if (compact || !ctaReady || !deepLink) return;
    const id = hash.slice(1);
    if (!id) return;
    scrollToHomeSection(id, "auto");
  }, [compact, ctaReady, deepLink, hash]);

  if (compact) {
    return <HomeCompact />;
  }

  const showDeepLinkStatus = deepLink && !ctaReady;

  return (
    <PageShell id="home">
      <PageMeta page="home" />
      <HeroSection />
      {showDeepLinkStatus ? (
        <p
          className="mx-auto max-w-lg px-6 py-10 text-center text-sm text-muted-foreground"
          role="status"
          aria-live="polite"
        >
          {t("homeDeepLinkLoading")}
        </p>
      ) : null}
      {loadRest ? (
        <Suspense
          fallback={
            showDeepLinkStatus ? null : (
              <div className="mx-auto max-w-3xl space-y-4 px-6 py-16" aria-hidden>
                <div className="h-8 w-1/3 animate-pulse rounded bg-muted" />
                <div className="h-24 animate-pulse rounded bg-muted/70" />
                <div className="h-24 animate-pulse rounded bg-muted/50" />
              </div>
            )
          }
        >
          <HomeRest onReady={markReady} />
        </Suspense>
      ) : null}
    </PageShell>
  );
};
