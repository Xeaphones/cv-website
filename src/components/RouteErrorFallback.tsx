import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { PageMeta } from "@/components/PageMeta";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";

type RouteErrorFallbackProps = {
  error: Error;
  onReset: () => void;
};

export function RouteErrorFallback({ error, onReset }: RouteErrorFallbackProps) {
  const { t } = useTranslation();

  return (
    <PageShell id="error">
      <PageMeta title={t("metaErrorTitle")} description={t("metaErrorDescription")} noindex />
      <section className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center px-4 py-16 text-center sm:py-24">
        <p className="font-mono text-sm uppercase tracking-wide text-muted-foreground">
          {t("errorBoundaryLabel")}
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-foreground sm:text-4xl">
          {t("errorBoundaryTitle")}
        </h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
          {t("errorBoundaryDescription")}
        </p>
        {import.meta.env.DEV ? (
          <pre className="mt-6 max-w-full overflow-x-auto rounded-lg border border-border/60 bg-card/40 p-4 text-left text-xs text-muted-foreground">
            {error.message}
          </pre>
        ) : null}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button type="button" onClick={onReset}>
            {t("errorBoundaryRetry")}
          </Button>
          <Button asChild variant="outline">
            <Link to="/">{t("errorBoundaryBackHome")}</Link>
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
