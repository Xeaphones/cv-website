import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { PageSection } from "@/components/PageSection";
import { calculateAge } from "@/lib/age";

import { HeroTypewriter } from "./HeroTypewriter";

export function AboutMeSection() {
  const { t, i18n } = useTranslation();
  const ticker = t("profileTicker", { returnObjects: true });
  const loop = useMemo(() => {
    const base = Array.isArray(ticker) ? ticker.map(String) : ["Fullstack"];
    return [...base, ...base, ...base, ...base];
  }, [ticker, i18n.language]);

  return (
    <PageSection
      id="aboutme"
      title={t("aboutme")}
      headingClassName="sr-only"
      className="profile"
    >
      <div className="profile-intro">
        <p className="profile-badge">
          <span className="profile-badge__dot" aria-hidden />
          {t("profileBadge")}
        </p>

        <p className="profile-hello">{t("profileHello")}</p>

        <p className="profile-name">
          <span className="profile-name__first">{t("heroName")}</span>{" "}
          <span className="profile-name__last">{t("heroLastName")}</span>
        </p>

        <p className="profile-role">
          <span className="profile-role__arrow" aria-hidden>
            →
          </span>
          <HeroTypewriter />
        </p>

        <p className="profile-bio">{t("bio")}</p>

        <ul className="profile-meta">
          <li>
            {calculateAge()} {t("years")}
          </li>
          <li>Toulouse</li>
          <li>{t("student")}</li>
        </ul>

        <div className="profile-actions">
          <Link to="/contact" className="profile-btn profile-btn--solid">
            {t("contactme")}
          </Link>
          <Link to="/projects" className="profile-btn profile-btn--ghost">
            {t("profileViewWork")}
          </Link>
        </div>
      </div>

      <div className="profile-marquee" aria-hidden>
        <div className="profile-marquee__track">
          {loop.map((item, index) => (
            <span key={`${item}-${index}`} className="profile-marquee__item">
              {item}
            </span>
          ))}
        </div>
      </div>
    </PageSection>
  );
}
