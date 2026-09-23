import { Github, Linkedin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { MouseEvent } from "react";

import { useGoHomeTop, useLocalePath, useScrollToHomeSection } from "@/lib/hooks";
import { stripLocalePrefix } from "@/lib/locale";
import { SITE_LINKS, SITE_NAME } from "@/lib/siteConfig";

import "./footer.scss";

const FOOTER_ROUTES = [
  { to: "/", labelKey: "home" },
  { to: "/#aboutme", labelKey: "aboutme" },
  { to: "/projects#experiences", labelKey: "experiences" },
  { to: "/projects#projects", labelKey: "projects" },
  { to: "/#skills", labelKey: "skills" },
  { to: "/contact", labelKey: "contact" },
] as const;

export function SiteFooter() {
  const { t } = useTranslation();
  const localize = useLocalePath();
  const location = useLocation();
  const { goHomeTop } = useGoHomeTop();
  const scrollToHomeSection = useScrollToHomeSection();
  const year = new Date().getFullYear();
  const onHome = stripLocalePrefix(location.pathname) === "/";

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
    <footer className="site-footer">
      <div className="site-footer__main">
        <div className="site-footer__brand">
          <p className="site-footer__name">
            <Link to={localize("/")} onClick={goHomeTop}>
              {SITE_NAME}.
            </Link>
          </p>
          <p className="site-footer__tagline">{t("footerTagline")}</p>
        </div>

        <nav aria-label={t("footerNavigate")}>
          <p className="site-footer__label">
            <span className="site-footer__paren">(</span> {t("footerNavigate")}{" "}
            <span className="site-footer__paren">)</span>
          </p>
          <ul className="site-footer__links">
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
          <p className="site-footer__label">
            <span className="site-footer__paren">(</span> {t("footerConnect")}{" "}
            <span className="site-footer__paren">)</span>
          </p>
          <ul className="site-footer__socials">
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
          </ul>
        </nav>
      </div>

      <div className="site-footer__bar">
        <p>
          © {year} {SITE_NAME}
        </p>
        <p>
          {t("footerBuiltWith")} <span className="site-footer__heart">♥</span> {t("footerBuiltAnd")} Vite
        </p>
      </div>
    </footer>
  );
}
