import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { BackToTop } from "@/components/BackToTop";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SiteFooter } from "@/components/footer";
import Header from "@/components/header";
import { PageDivider } from "@/components/PageDivider";
import { ParticleCanvas } from "@/components/ParticleCanvas";
import { PersonJsonLd } from "@/components/PersonJsonLd";
import { RouteErrorFallback } from "@/components/RouteErrorFallback";
import { RybbitScript } from "@/components/RybbitScript";
import { Toaster } from "@/components/ui/toaster";

export function MainLayout() {
  const { t } = useTranslation();

  return (
    <>
      <RybbitScript />
      <PersonJsonLd />
      <a
        href="#main-content"
        className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:inline-flex focus:h-auto focus:w-auto focus:items-center focus:overflow-visible focus:whitespace-nowrap focus:rounded-md focus:border focus:border-border focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
      >
        {t("skipToContent")}
      </a>
      <ParticleCanvas className="fixed inset-0 z-0" />
      <Header />
      <ErrorBoundary
        fallback={({ error, reset }) => (
          <RouteErrorFallback error={error} onReset={reset} />
        )}
      >
        <Outlet />
      </ErrorBoundary>
      <PageDivider />
      <SiteFooter />
      <BackToTop />
      <Toaster />
    </>
  );
}
