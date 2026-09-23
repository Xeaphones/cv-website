import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { BackToTop } from "@/shared/components/BackToTop";
import { ErrorBoundary } from "@/shared/components/ErrorBoundary";
import { SiteFooter } from "@/shell/footer";
import Header from "@/shell/header";
import { PageDivider } from "@/shared/components/PageDivider";
import { ParticleCanvas } from "@/shared/components/ParticleCanvas";
import { PersonJsonLd } from "@/shared/seo/PersonJsonLd";
import { RouteErrorFallback } from "@/shared/components/RouteErrorFallback";
import { RybbitScript } from "@/shared/seo/RybbitScript";
import { Toaster } from "@/shared/ui/toaster";

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
