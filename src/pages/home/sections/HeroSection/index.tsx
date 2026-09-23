import { ArrowDown } from "lucide-react";
import { useEffect, useRef, type MouseEvent } from "react";
import { useTranslation } from "react-i18next";

import { ParticleCanvas } from "@/shared/components/ParticleCanvas";
import { ThemeToggle } from "@/shared/components/themeToggle";
import { useHomeHeaderVisible, useScrollToHomeSection } from "@/lib/hooks";
import { cn, modCn } from "@/lib/utils";
import { LanguageSelect } from "@/shell/header/LanguageSelect";

import { HeroTypewriter } from "./HeroTypewriter";
import styles from "./HeroSection.module.scss";

function setInert(element: HTMLElement | null, inert: boolean) {
  if (!element) return;
  if (inert) {
    element.setAttribute("inert", "");
  } else {
    element.removeAttribute("inert");
  }
}

export function HeroSection() {
  const { t } = useTranslation();
  const { isHome, scrolled } = useHomeHeaderVisible();
  const scrollToSection = useScrollToHomeSection();
  const showCornerControls = isHome && !scrolled;
  const cornerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInert(cornerRef.current, !showCornerControls);
  }, [showCornerControls]);

  const scrollToAbout = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToSection("aboutme");
  };

  return (
    <section
      id="hero"
      className="relative z-10 h-[100dvh] w-full overflow-hidden bg-background2"
    >
      <ParticleCanvas linked fill className="absolute inset-0" />
      <div
        ref={cornerRef}
        data-hero-corner
        className={cn(
          "absolute right-4 top-4 z-20 flex gap-2 sm:right-6 sm:top-6",
          "transition-opacity duration-200 motion-reduce:transition-none",
          showCornerControls ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!showCornerControls}
      >
        <LanguageSelect compact />
        <ThemeToggle />
      </div>
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <h1
          className={modCn(
            styles,
            "hero-heading flex w-full max-w-5xl flex-col items-center text-center font-light leading-[1.15] text-foreground",
          )}
          aria-label={`${t("heroGreeting")} ${t("heroName")}. ${t("heroLine2")}`}
        >
          <span
            className={modCn(
              styles,
              "hero-heading__line hero-heading__line--left inline-block bg-background2/25 px-2",
            )}
          >
            {t("heroGreeting")}{" "}
            <span className="font-normal text-primary">{t("heroName")}</span>.
          </span>
          <span
            className={modCn(
              styles,
              "hero-heading__line hero-heading__line--right mt-1 flex w-full flex-wrap items-baseline justify-center gap-x-[0.35em] bg-background2/25 px-2 text-center",
            )}
          >
            <span>{t("heroLine2Before")}</span>
            <HeroTypewriter />
          </span>
        </h1>
        <a
          href="#aboutme"
          onClick={scrollToAbout}
          className={modCn(
            styles,
            "hero-cta group mt-8 inline-flex items-center gap-3 rounded-sm border-2 border-primary bg-background2/60 px-8 py-3 text-lg font-medium text-primary no-underline sm:text-xl",
          )}
        >
          {t("heroCta")}
          <ArrowDown className="h-5 w-5" aria-hidden />
        </a>
      </div>
    </section>
  );
}
