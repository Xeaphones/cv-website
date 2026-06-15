import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { PageMeta } from "@/components/PageMeta";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <PageShell id="not-found">
      <PageMeta title={t("meta404Title")} description={t("meta404Description")} />
      <section className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center justify-center px-4 text-center">
        <p className="font-mono text-sm uppercase tracking-wide text-muted-foreground">404</p>
        <h1 className="mt-2 text-3xl font-semibold text-foreground sm:text-4xl">{t("notFoundTitle")}</h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">{t("notFoundDescription")}</p>
        <Button asChild className="mt-6">
          <Link to="/">{t("notFoundBackHome")}</Link>
        </Button>
      </section>
    </PageShell>
  );
}
