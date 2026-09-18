import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import Card, { CardSpread } from "@/components/card";
import { PageSection } from "@/components/PageSection";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/lib/hooks";
import { cn } from "@/lib/utils";

import apiBlackIMG from "@/assets/img/api_black_128.png";
import apiWhiteIMG from "@/assets/img/api_white_128.png";
import appBlackIMG from "@/assets/img/app_black_128.png";
import appWhiteIMG from "@/assets/img/app_white_128.png";
import codeBlackIMG from "@/assets/img/code_black_128.png";
import codeWhiteIMG from "@/assets/img/code_white_128.png";
import gameDevBlackIMG from "@/assets/img/game-dev_black_128.png";
import gameDevWhiteIMG from "@/assets/img/game-dev_white_128.png";

type ServiceItem = {
  titleKey: string;
  contentKey: string;
  imgSRC: { light: string; dark: string };
  imgALT: string;
};

const SERVICES: ServiceItem[] = [
  {
    titleKey: "webDevTitle",
    contentKey: "webDevContent",
    imgSRC: { light: codeBlackIMG, dark: codeWhiteIMG },
    imgALT: "Web Development icon",
  },
  {
    titleKey: "apiDevTitle",
    contentKey: "apiDevContent",
    imgSRC: { light: apiBlackIMG, dark: apiWhiteIMG },
    imgALT: "API Icon",
  },
  {
    titleKey: "gameDevTitle",
    contentKey: "gameDevContent",
    imgSRC: { light: gameDevBlackIMG, dark: gameDevWhiteIMG },
    imgALT: "Game Development icon",
  },
  {
    titleKey: "appDevTitle",
    contentKey: "appDevContent",
    imgSRC: { light: appBlackIMG, dark: appWhiteIMG },
    imgALT: "Application Development icon",
  },
];

function ServiceCard({ item, index = 0, turned = false }: { item: ServiceItem; index?: number; turned?: boolean }) {
  const { t } = useTranslation();

  return (
    <Card
      title={t(item.titleKey)}
      content={t(item.contentKey)}
      imgSRC={item.imgSRC}
      imgALT={item.imgALT}
      index={index}
      turned={turned}
    />
  );
}

function ServiceSlider({ items }: { items: ServiceItem[] }) {
  const { t } = useTranslation();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [seen, setSeen] = useState<boolean[]>(() => items.map(() => false));
  const labelId = useId();

  const goTo = useCallback((nextIndex: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(items.length - 1, nextIndex));
    el.scrollTo({ left: clamped * el.clientWidth, behavior: "smooth" });
  }, [items.length]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      const width = el.clientWidth;
      if (width === 0) return;
      setIndex(Math.round(el.scrollLeft / width));
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setInView(true);
      setSeen(items.map(() => true));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInView(true);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    if (!inView) return;
    const el = scrollerRef.current;
    if (!el) return;

    const revealSnapped = () => {
      const width = el.clientWidth;
      if (width === 0) return;
      const nextIndex = Math.max(0, Math.min(items.length - 1, Math.round(el.scrollLeft / width)));
      setSeen((prev) => {
        if (prev[nextIndex]) return prev;
        const next = [...prev];
        next[nextIndex] = true;
        return next;
      });
    };

    revealSnapped();

    let idle = 0;
    const onScrollIdle = () => {
      window.clearTimeout(idle);
      idle = window.setTimeout(revealSnapped, 60);
    };

    el.addEventListener("scrollend", revealSnapped);
    el.addEventListener("scroll", onScrollIdle, { passive: true });
    return () => {
      window.clearTimeout(idle);
      el.removeEventListener("scrollend", revealSnapped);
      el.removeEventListener("scroll", onScrollIdle);
    };
  }, [inView, items.length]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-1">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="shrink-0"
          aria-label={t("servicesPrevious")}
          disabled={index === 0}
          onClick={() => goTo(index - 1)}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div
          ref={scrollerRef}
          role="region"
          aria-roledescription="carousel"
          aria-labelledby={labelId}
          tabIndex={0}
          className="flex min-w-0 flex-1 snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") {
              event.preventDefault();
              goTo(index + 1);
            }
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              goTo(index - 1);
            }
          }}
        >
          {items.map((item, itemIndex) => (
            <div key={item.titleKey} className="w-full shrink-0 snap-center px-1" role="group" aria-label={t(item.titleKey)}>
              <ServiceCard item={item} index={itemIndex} turned={seen[itemIndex]} />
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="shrink-0"
          aria-label={t("servicesNext")}
          disabled={index === items.length - 1}
          onClick={() => goTo(index + 1)}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex justify-center gap-2" role="tablist" aria-label={t("services")}>
        {items.map((item, itemIndex) => (
          <button
            key={item.titleKey}
            type="button"
            role="tab"
            aria-selected={itemIndex === index}
            aria-label={t(item.titleKey)}
            className={cn(
              "h-2 rounded-full transition-all",
              itemIndex === index ? "w-6 bg-primary" : "w-2 bg-muted-foreground/40",
            )}
            onClick={() => goTo(itemIndex)}
          />
        ))}
      </div>
      <p id={labelId} className="sr-only">
        {t("services")}
      </p>
    </div>
  );
}

export function ServicesSection() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <PageSection id="wicd" title={t("services")} className="overflow-visible">
      {isMobile ? (
        <ServiceSlider items={SERVICES} />
      ) : (
        <CardSpread>
          {SERVICES.map((item, index) => (
            <ServiceCard key={item.titleKey} item={item} index={index} />
          ))}
        </CardSpread>
      )}
    </PageSection>
  );
}
