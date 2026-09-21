import { Outlet } from "react-router-dom";

import { BackToTop } from "@/components/BackToTop";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SiteFooter } from "@/components/footer";
import Header from "@/components/header";
import { ParticleCanvas } from "@/components/ParticleCanvas";
import { PersonJsonLd } from "@/components/PersonJsonLd";
import { RouteErrorFallback } from "@/components/RouteErrorFallback";
import { RybbitScript } from "@/components/RybbitScript";
import { Toaster } from "@/components/ui/toaster";

export function MainLayout() {
  return (
    <>
      <RybbitScript />
      <PersonJsonLd />
      <ParticleCanvas className="fixed inset-0 z-0" />
      <Header />
      <ErrorBoundary
        fallback={({ error, reset }) => (
          <RouteErrorFallback error={error} onReset={reset} />
        )}
      >
        <Outlet />
      </ErrorBoundary>
      <SiteFooter />
      <BackToTop />
      <Toaster />
    </>
  );
}
