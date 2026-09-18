import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { PageMeta } from "@/components/PageMeta";
import { PageShell } from "@/components/PageShell";

import { HeroSection } from "./sections/HeroSection";
import "./home.scss";

const HomeRest = lazy(() => import("./HomeRest"));

function isDeepLink(hash: string) {
  return hash !== "" && hash !== "#hero";
}

export const Home = () => {
  const { hash } = useLocation();
  const deepLink = isDeepLink(hash);
  const [loadRest, setLoadRest] = useState(deepLink);
  const [ctaReady, setCtaReady] = useState(false);
  const markReady = useCallback(() => setCtaReady(true), []);

  useEffect(() => {
    if (loadRest) return;
    const frame = window.requestAnimationFrame(() => setLoadRest(true));
    return () => window.cancelAnimationFrame(frame);
  }, [loadRest]);

  useEffect(() => {
    if (!ctaReady || !deepLink) return;
    const id = hash.slice(1);
    if (!id) return;
    document.getElementById(id)?.scrollIntoView();
  }, [ctaReady, deepLink, hash]);

  return (
    <PageShell id="home">
      <PageMeta page="home" />
      <HeroSection ctaReady={ctaReady} />
      {loadRest ? (
        <Suspense fallback={null}>
          <HomeRest onReady={markReady} />
        </Suspense>
      ) : null}
    </PageShell>
  );
};
