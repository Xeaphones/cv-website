import { useTranslation } from "react-i18next";

import { PageSection } from "@/components/PageSection";

export function ContactDetailsSection() {
  const { t } = useTranslation();

  return (
    <PageSection id="contacts">
      <div className="mx-auto grid w-full max-w-3xl gap-4 sm:grid-cols-2">
        <a
          href="mailto:yohan.velay@free.fr"
          className="cursor-pointer rounded-lg border border-border/60 bg-card/30 p-4 text-center shadow-sm transition-colors hover:border-primary/40 hover:bg-card/50"
        >
          <p className="text-sm font-medium uppercase tracking-wide text-primary">Mail</p>
          <p className="mt-1 break-all text-base text-foreground">yohan.velay@free.fr</p>
        </a>
        <a
          href="tel:+33781072178"
          className="cursor-pointer rounded-lg border border-border/60 bg-card/30 p-4 text-center shadow-sm transition-colors hover:border-primary/40 hover:bg-card/50"
        >
          <p className="text-sm font-medium uppercase tracking-wide text-primary">{t("phone")}</p>
          <p className="mt-1 text-base text-foreground">07 81 07 21 78</p>
        </a>
      </div>
    </PageSection>
  );
}
