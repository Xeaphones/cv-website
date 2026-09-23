import { Github, Linkedin, Mail, Rss } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { MouseEvent } from "react";

import { useGoHomeTop, useLocalePath, useScrollToHomeSection } from "@/lib/hooks";
import { stripLocalePrefix } from "@/lib/locale";
import { getRssFeedPath, SITE_EMAIL, SITE_LINKS, SITE_NAME } from "@/lib/siteConfig";

import styles from "./Footer.module.scss";

const FOOTER_ROUTES = [
  { to: "/", labelKey: "home" },
  { to: "/#aboutme", labelKey: "aboutme" },
  { to: "/projects#experiences", labelKey: "experiences" },
  { to: "/projects#projects", labelKey: "projects" },
  { to: "/#skills", labelKey: "skills" },
  { to: "/contact", labelKey: "contact" },
] as const;

export function SiteFooter() {
  const { t, i18n } = useTranslation();
  const localize = useLocalePath();
  const location = useLocation();
  const { goHomeTop } = useGoHomeTop();
  const scrollToHomeSection = useScrollToHomeSection();
  const year = new Date().getFullYear();
  const onHome = stripLocalePrefix(location.pathname) === "/";
  const rssPath = getRssFeedPath(i18n.language);

  const onNavClick = (to: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (to === "/") {
      goHomeTop(event);
      return;
    }
    const hash = to.startsWith("/#") ? to.slice(2) : null;
    if (hash && onHome) {
      event.preventDefault();
      scrollToHomeSection(hash);
    }
  };

  return (
    <footer className={styles.siteFooter}>
      <div className={styles.siteFooterMain}>
        <div className={styles.siteFooterBrand}>
          <p className={styles.siteFooterName}>
            <Link to={localize("/")} onClick={goHomeTop}>
              {SITE_NAME}.
            </Link>
          </p>
          <p className={styles.siteFooterTagline}>{t("footerTagline")}</p>
        </div>

        <nav aria-label={t("footerNavigate")}>
          <p className={styles.siteFooterLabel}>
            <span className={styles.siteFooterParen}>(</span> {t("footerNavigate")}{" "}
            <span className={styles.siteFooterParen}>)</span>
          </p>
          <ul className={styles.siteFooterLinks}>
            {FOOTER_ROUTES.map(({ to, labelKey }) => (
              <li key={to}>
                <Link to={localize(to)} onClick={onNavClick(to)}>
                  {t(labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t("footerConnect")}>
          <p className={styles.siteFooterLabel}>
            <span className={styles.siteFooterParen}>(</span> {t("footerConnect")}{" "}
            <span className={styles.siteFooterParen}>)</span>
          </p>
          <ul className={styles.siteFooterSocials}>
            <li>
              <a href={SITE_LINKS.github} target="_blank" rel="noreferrer">
                <Github className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                {t("blogFooterGithub")}
              </a>
            </li>
            <li>
              <a href={SITE_LINKS.linkedin} target="_blank" rel="noreferrer">
                <Linkedin className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                {t("blogFooterLinkedin")}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE_EMAIL}`}>
                <Mail className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                {t("blogFooterEmail")}
              </a>
            </li>
            <li>
              <a href={rssPath}>
                <Rss className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                {t("blogFooterRss")}
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className={styles.siteFooterBar}>
        <p>
          © {year} {SITE_NAME}
        </p>
        <p>
          {t("footerBuiltWith")} <span className={styles.siteFooterHeart}>♥</span> {t("footerBuiltAnd")} Vite
        </p>
      </div>
    </footer>
  );
}
