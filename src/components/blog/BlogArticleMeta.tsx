import { useTranslation } from "react-i18next";

import type { BlogSection } from "@/lib/content";
import { estimateReadingTimeMinutes } from "@/lib/markdown";

type BlogArticleMetaProps = {
  date: Date;
  locale: string;
  content: string;
  section: BlogSection;
  theme?: string;
  project?: string;
};

function MetaSeparator() {
  return <span aria-hidden>|</span>;
}

export function BlogArticleMeta({ date, locale, content, section, theme, project }: BlogArticleMetaProps) {
  const { t } = useTranslation();
  const readingTime = estimateReadingTimeMinutes(content);

  const formattedDate = date.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <p className="flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
      <span>{formattedDate}</span>
      <MetaSeparator />
      <span>{t("minRead", { count: readingTime })}</span>
      {theme && (
        <>
          <MetaSeparator />
          <a
            href={theme}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-muted-foreground/50 underline-offset-2 transition-colors hover:text-foreground"
          >
            {t("blogTheme")}
          </a>
        </>
      )}
      {section === "writeups" && project && (
        <>
          <MetaSeparator />
          <span>{project}</span>
        </>
      )}
    </p>
  );
}
