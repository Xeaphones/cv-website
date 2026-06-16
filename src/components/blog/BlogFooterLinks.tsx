import { Github, Linkedin, Mail, Rss } from "lucide-react";
import { useTranslation } from "react-i18next";

import { getRssFeedPath, SITE_EMAIL, SITE_LINKS } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";

type BlogFooterLinksProps = {
  className?: string;
  align?: "center" | "end";
};

const iconClassName = "h-5 w-5";

const linkClassName =
  "text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm";

export function BlogFooterLinks({ className, align = "center" }: BlogFooterLinksProps) {
  const { t, i18n } = useTranslation();
  const rssPath = getRssFeedPath(i18n.language);

  return (
    <nav
      aria-label={t("blogFooterLinks")}
      className={cn("flex items-center gap-6", align === "end" ? "justify-end" : "justify-center", className)}
    >
      <a
        href={SITE_LINKS.github}
        target="_blank"
        rel="noreferrer"
        aria-label={t("blogFooterGithub")}
        className={linkClassName}
      >
        <Github className={iconClassName} strokeWidth={1.75} aria-hidden />
      </a>
      <a
        href={SITE_LINKS.linkedin}
        target="_blank"
        rel="noreferrer"
        aria-label={t("blogFooterLinkedin")}
        className={linkClassName}
      >
        <Linkedin className={iconClassName} strokeWidth={1.75} aria-hidden />
      </a>
      <a href={`mailto:${SITE_EMAIL}`} aria-label={t("blogFooterEmail")} className={linkClassName}>
        <Mail className={iconClassName} strokeWidth={1.75} aria-hidden />
      </a>
      <a href={rssPath} aria-label={t("blogFooterRss")} className={linkClassName}>
        <Rss className={iconClassName} strokeWidth={1.75} aria-hidden />
      </a>
    </nav>
  );
}
