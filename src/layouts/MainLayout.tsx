import { Outlet } from "react-router-dom";

import { BackToTop } from "@/components/BackToTop";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Header from "@/components/header";
import { PersonJsonLd } from "@/components/PersonJsonLd";
import { RouteErrorFallback } from "@/components/RouteErrorFallback";
import { Toaster } from "@/components/ui/toaster";

export function MainLayout() {
  return (
    <>
      <PersonJsonLd />
      <Header />
      <ErrorBoundary
        fallback={({ error, reset }) => (
          <RouteErrorFallback error={error} onReset={reset} />
        )}
      >
        <Outlet />
      </ErrorBoundary>
      <BackToTop />
      <Toaster />
    </>
  );
}
