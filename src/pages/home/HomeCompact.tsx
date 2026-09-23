import { useTranslation } from "react-i18next";

import { PageMeta } from "@/shared/components/PageMeta";
import { PageShell } from "@/shared/components/PageShell";
import { calculateAge } from "@/lib/age";
import { SITE_EMAIL, SITE_LINKS, formatPhoneDisplay } from "@/lib/siteConfig";
import { useLocalePath } from "@/lib/hooks";

const SERVICES = [
  { titleKey: "webDevTitle", contentKey: "webDevContent" },
  { titleKey: "apiDevTitle", contentKey: "apiDevContent" },
  { titleKey: "gameDevTitle", contentKey: "gameDevContent" },
  { titleKey: "appDevTitle", contentKey: "appDevContent" },
] as const;

/** Lean homepage for headless browsers / curl.md / agent crawlers. */
export function HomeCompact() {
  const { t } = useTranslation();
  const localize = useLocalePath();
  const pdfHref = t("cvLink");

  return (
    <PageShell id="home">
      <PageMeta page="home" />
      <article className="mx-auto max-w-2xl space-y-8 px-4 py-10 font-sans text-foreground">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold">
            {t("heroName")} {t("heroLastName")}
          </h1>
          <p className="text-muted-foreground">
            {t("student")} · Toulouse · {calculateAge()} {t("years")} · {t("profileBadge")}
          </p>
        </header>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">{t("aboutme")}</h2>
          <p className="leading-relaxed text-muted-foreground">{t("bio")}</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">{t("contact")}</h2>
          <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
            <li>
              Email: <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>
            </li>
            <li>
              {t("phone")}: {formatPhoneDisplay()}
            </li>
            <li>
              LinkedIn:{" "}
              <a href={SITE_LINKS.linkedin} rel="noreferrer">
                {SITE_LINKS.linkedin}
              </a>
            </li>
            <li>
              GitHub:{" "}
              <a href={SITE_LINKS.github} rel="noreferrer">
                {SITE_LINKS.github}
              </a>
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">{t("services")}</h2>
          {SERVICES.map(({ titleKey, contentKey }) => (
            <div key={titleKey}>
              <h3 className="font-medium">{t(titleKey)}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{t(contentKey)}</p>
            </div>
          ))}
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">{t("links")}</h2>
          <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
            <li>
              <a href={pdfHref}>{t("cv")}</a> ({pdfHref})
            </li>
            <li>
              <a href={localize("/projects")}>{t("projects")}</a>
            </li>
            <li>
              <a href={localize("/profile")}>{t("profile")}</a>
            </li>
            <li>
              <a href={localize("/blog")}>{t("blog")}</a>
            </li>
            <li>
              <a href={localize("/contact")}>{t("contactme")}</a>
            </li>
          </ul>
        </section>
      </article>
    </PageShell>
  );
}
