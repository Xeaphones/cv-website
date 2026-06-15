import { Download } from "lucide-react";
import { useTranslation } from "react-i18next";

import { PageSection } from "@/components/PageSection";
import { PDF } from "@/assets/svg";
import { cn } from "@/lib/utils";

export function CvDownloadSection() {
  const { t, i18n } = useTranslation();
  const fileName = i18n.language.startsWith("fr") ? "yohan-velay-fr.pdf" : "yohan-velay-en.pdf";

  return (
    <PageSection id="cv" title={t("cv")}>
      <div className="mx-auto w-full max-w-md">
        <a
          href={t("cvLink")}
          download={fileName}
          className={cn(
            "group flex items-center gap-4 rounded-lg border border-border/60 bg-card/30 p-4 shadow-sm",
            "transition-colors hover:border-primary/40 sm:p-5",
          )}
        >
          <div className="flex h-14 w-11 shrink-0 items-center justify-center sm:h-16 sm:w-12">
            <PDF className="h-full w-full" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium leading-snug text-foreground">{fileName}</p>
            <p className="mt-0.5 text-sm text-muted-foreground">PDF</p>
          </div>
          <Download
            aria-hidden
            className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
          />
        </a>
      </div>
    </PageSection>
  );
}
