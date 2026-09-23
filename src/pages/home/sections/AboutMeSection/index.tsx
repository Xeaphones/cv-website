import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { PageSection } from "@/shared/components/PageSection";
import { calculateAge } from "@/lib/age";
import { useLocalePath, useScrollToHomeSection } from "@/lib/hooks";
import { modCn } from "@/lib/utils";

import { HeroTypewriter } from "../HeroSection/HeroTypewriter";
import styles from "./AboutMeSection.module.scss";

export function AboutMeSection() {
  const { t, i18n } = useTranslation();
  const localize = useLocalePath();
  const scrollToSection = useScrollToHomeSection();
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
      className={modCn(styles, "profile")}
    >
      <div className={modCn(styles, "profile-intro")}>
        <p className={modCn(styles, "profile-hello")}>
          <span className={modCn(styles, "profile-hello__paren")}>(</span>
          <span>{t("profileHello")}</span>
          <span className={modCn(styles, "profile-hello__paren")}>)</span>
        </p>

        <p className={modCn(styles, "profile-name")}>
          <span className={modCn(styles, "profile-name__first")}>{t("heroName")}</span>{" "}
          <span className={modCn(styles, "profile-name__last")}>{t("heroLastName")}</span>
        </p>

        <p className={modCn(styles, "profile-role")}>
          <span className={modCn(styles, "profile-role__arrow")} aria-hidden>
            →
          </span>
          <HeroTypewriter />
        </p>

        <p className={modCn(styles, "profile-bio")}>{t("bio")}</p>

        <p className={modCn(styles, "profile-badge")}>
          <span className={modCn(styles, "profile-badge__bracket")}>[</span>
          <span>{t("profileBadge")}</span>
          <span className={modCn(styles, "profile-badge__bracket")}>]</span>
        </p>

        <ul className={modCn(styles, "profile-meta")}>
          <li>
            {calculateAge()} {t("years")}
          </li>
          <li>Toulouse</li>
          <li>{t("student")}</li>
        </ul>

        <div className={modCn(styles, "profile-actions")}>
          <Link
            to={localize("/contact")}
            className={modCn(styles, "profile-btn profile-btn--solid")}
          >
            {t("contactme")}
          </Link>
          <Link
            to={localize("/projects")}
            className={modCn(styles, "profile-btn profile-btn--ghost")}
          >
            {t("profileViewWork")}
          </Link>
        </div>
      </div>

      <button
        type="button"
        className={modCn(styles, "profile-scroll")}
        onClick={() => scrollToSection("wicd")}
        aria-label={t("profileScroll")}
      >
        <span className={modCn(styles, "profile-scroll__mouse")} aria-hidden>
          <span className={modCn(styles, "profile-scroll__wheel")} />
        </span>
        <span className={modCn(styles, "profile-scroll__label")} aria-hidden>
          {t("profileScroll")}
        </span>
      </button>

      <div className={modCn(styles, "profile-marquee")} aria-hidden>
        <div className={modCn(styles, "profile-marquee__track")}>
          {loop.map((item, index) => (
            <span key={`${item}-${index}`} className={modCn(styles, "profile-marquee__item")}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </PageSection>
  );
}
