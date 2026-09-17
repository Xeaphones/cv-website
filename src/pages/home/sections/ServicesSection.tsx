import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import Card from "@/components/card";
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

function ServiceCard({ item }: { item: ServiceItem }) {
  const { t } = useTranslation();

  return (
    <Card
      title={t(item.titleKey)}
      content={t(item.contentKey)}
      imgSRC={item.imgSRC}
      imgALT={item.imgALT}
    />
  );
}

function ServiceSlider({ items }: { items: ServiceItem[] }) {
  const { t } = useTranslation();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
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
          {items.map((item) => (
            <div key={item.titleKey} className="w-full shrink-0 snap-center px-1" role="group" aria-label={t(item.titleKey)}>
              <ServiceCard item={item} />
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
    <PageSection id="wicd" title={t("services")}>
      {isMobile ? (
        <ServiceSlider items={SERVICES} />
      ) : (
        <div className="flex flex-wrap justify-center gap-20">
          {SERVICES.map((item) => (
            <ServiceCard key={item.titleKey} item={item} />
          ))}
        </div>
      )}
    </PageSection>
  );
}
