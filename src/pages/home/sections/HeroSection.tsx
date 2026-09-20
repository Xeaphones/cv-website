import { ArrowDown } from "lucide-react";
import type { MouseEvent } from "react";
import { useTranslation } from "react-i18next";

import { ParticleCanvas } from "@/components/ParticleCanvas";
import { LanguageSelect } from "@/components/header/LanguageSelect";
import { ThemeToggle } from "@/components/themeToggle";
import { useHomeHeaderVisible } from "@/lib/hooks";
import { cn } from "@/lib/utils";

import { HeroTypewriter } from "./HeroTypewriter";

const HEADER_OFFSET_PX = 80;

export function scrollToHomeSection(id: string, behavior: ScrollBehavior = "smooth") {
  const el = document.getElementById(id);
  if (!el) return;

  const fullPane = window.matchMedia("(min-width: 801px)").matches;
  const target = fullPane ? (el.closest(".home-work") ?? el) : el;
  const header = document.querySelector("header");
  const headerHeight =
    header instanceof HTMLElement ? header.getBoundingClientRect().height : HEADER_OFFSET_PX;
  const usesTopPadding =
    target.classList.contains("profile") ||
    (fullPane && target.classList.contains("home-work"));
  const offset = usesTopPadding ? 0 : headerHeight;
  const top = Math.max(0, window.scrollY + target.getBoundingClientRect().top - offset);

  window.scrollTo({ top, behavior });
}

export function HeroSection({ ctaReady = false }: { ctaReady?: boolean }) {
  const { t } = useTranslation();
  const { isHome, scrolled } = useHomeHeaderVisible();
  const showCornerControls = isHome && !scrolled;

  const scrollToAbout = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToHomeSection("aboutme");
  };

  return (
    <section
      id="hero"
      className="relative z-10 h-[100dvh] w-full overflow-hidden bg-background2"
    >
      <ParticleCanvas linked fill className="absolute inset-0" />
      <div
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
          className="hero-heading flex w-full max-w-5xl flex-col items-center text-center font-light leading-[1.15] text-foreground"
          aria-label={`${t("heroGreeting")} ${t("heroName")}. ${t("heroLine2")}`}
        >
          <span className="hero-heading__line hero-heading__line--left inline-block bg-background2/25 px-2">
            {t("heroGreeting")}{" "}
            <span className="font-normal text-primary">{t("heroName")}</span>.
          </span>
          <span className="hero-heading__line hero-heading__line--right mt-1 flex w-full flex-wrap items-baseline justify-center gap-x-[0.35em] bg-background2/25 px-2 text-center">
            <span>{t("heroLine2Before")}</span>
            <HeroTypewriter />
          </span>
        </h1>
        <a
          href="#aboutme"
          onClick={scrollToAbout}
          className={cn(
            "hero-cta group mt-8 inline-flex items-center gap-3 rounded-sm border-2 border-primary bg-background2/60 px-8 py-3 text-lg font-medium text-primary no-underline sm:text-xl",
            ctaReady && "is-ready",
          )}
          aria-hidden={ctaReady ? undefined : true}
          tabIndex={ctaReady ? undefined : -1}
        >
          {t("heroCta")}
          <ArrowDown className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5" />
        </a>
      </div>
    </section>
  );
}
