import { useCallback, useEffect, useId, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import Card, { CardSpread } from "@/pages/home/components/ServiceCard";
import { PageSection } from "@/shared/components/PageSection";
import { Button } from "@/shared/ui/button";
import { useIsMobile, usePrefersCoarsePointer } from "@/lib/hooks";
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
  imgAltKey: string;
  imgSRC: { light: string; dark: string };
};

const SERVICES: ServiceItem[] = [
  {
    titleKey: "webDevTitle",
    contentKey: "webDevContent",
    imgAltKey: "webDevImgAlt",
    imgSRC: { light: codeBlackIMG, dark: codeWhiteIMG },
  },
  {
    titleKey: "apiDevTitle",
    contentKey: "apiDevContent",
    imgAltKey: "apiDevImgAlt",
    imgSRC: { light: apiBlackIMG, dark: apiWhiteIMG },
  },
  {
    titleKey: "gameDevTitle",
    contentKey: "gameDevContent",
    imgAltKey: "gameDevImgAlt",
    imgSRC: { light: gameDevBlackIMG, dark: gameDevWhiteIMG },
  },
  {
    titleKey: "appDevTitle",
    contentKey: "appDevContent",
    imgAltKey: "appDevImgAlt",
    imgSRC: { light: appBlackIMG, dark: appWhiteIMG },
  },
];

function ServiceCard({
  item,
  index = 0,
  turned = false,
  focusable = true,
}: {
  item: ServiceItem;
  index?: number;
  turned?: boolean;
  focusable?: boolean;
}) {
  const { t } = useTranslation();

  return (
    <Card
      title={t(item.titleKey)}
      content={t(item.contentKey)}
      imgSRC={item.imgSRC}
      imgALT={t(item.imgAltKey)}
      index={index}
      turned={turned}
      tabIndex={focusable ? 0 : -1}
    />
  );
}

const SWIPE_THRESHOLD = 88;
const FLY_MS = 340;

function ServiceSlider({ items }: { items: ServiceItem[] }) {
  const { t } = useTranslation();
  const deckRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const drag = useRef({
    id: -1,
    x: 0,
    y: 0,
    active: false,
    locked: false,
    leaving: false,
  });
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [seen, setSeen] = useState<boolean[]>(() => items.map(() => false));
  const labelId = useId();

  const setPull = (value: number) => {
    deckRef.current?.style.setProperty("--pull", String(value));
  };

  const placeTop = (x: number, y: number, rotate: number, animate: boolean) => {
    const el = topRef.current;
    if (!el) return;
    el.style.transition = animate ? "transform 0.34s cubic-bezier(0.22, 1, 0.36, 1)" : "none";
    el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg)`;
  };

  const snapBack = useCallback(() => {
    setPull(0);
    placeTop(0, 0, 0, true);
  }, []);

  const dismiss = useCallback((indexDelta: -1 | 1) => {
    if (drag.current.leaving) return;
    const nextIndex = index + indexDelta;
    if (nextIndex < 0 || nextIndex >= items.length) {
      snapBack();
      return;
    }

    // Card follows the swipe: next flies left, previous flies right.
    const flyDir = (-indexDelta) as -1 | 1;
    drag.current.leaving = true;
    drag.current.active = false;
    const distance = window.innerWidth + 96;
    setPull(1);
    placeTop(flyDir * distance, flyDir * 18, flyDir * 16, true);
    window.setTimeout(() => {
      setIndex(nextIndex);
      setPull(0);
      drag.current.leaving = false;
      requestAnimationFrame(() => placeTop(0, 0, 0, false));
    }, FLY_MS);
  }, [index, items.length, snapBack]);

  const goTo = useCallback((nextIndex: number) => {
    const clamped = Math.max(0, Math.min(items.length - 1, nextIndex));
    if (clamped === index || drag.current.leaving) return;
    if (Math.abs(clamped - index) === 1) {
      dismiss((clamped - index) as -1 | 1);
      return;
    }
    setIndex(clamped);
    setPull(0);
  }, [dismiss, index, items.length]);

  useEffect(() => {
    const el = deckRef.current;
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
    setSeen((prev) => {
      if (prev[index]) return prev;
      const next = [...prev];
      next[index] = true;
      return next;
    });
    requestAnimationFrame(() => placeTop(0, 0, 0, false));
  }, [inView, index]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (drag.current.leaving || event.button !== 0) return;
    drag.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      active: true,
      locked: false,
      leaving: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.active || event.pointerId !== drag.current.id) return;
    const dx = event.clientX - drag.current.x;
    const dy = event.clientY - drag.current.y;

    if (!drag.current.locked) {
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
      if (Math.abs(dy) > Math.abs(dx) + 2) {
        drag.current.active = false;
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
        return;
      }
      drag.current.locked = true;
      event.currentTarget.style.touchAction = "none";
    }

    event.preventDefault();
    const rotate = Math.max(-16, Math.min(16, dx / 18));
    setPull(Math.min(1, Math.abs(dx) / SWIPE_THRESHOLD));
    placeTop(dx, dy * 0.18, rotate, false);
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerId !== drag.current.id) return;
    const wasLocked = drag.current.locked;
    const dx = event.clientX - drag.current.x;
    drag.current.active = false;
    drag.current.locked = false;
    event.currentTarget.style.touchAction = "";
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (!wasLocked || drag.current.leaving) return;

    if (dx >= SWIPE_THRESHOLD) dismiss(-1);
    else if (dx <= -SWIPE_THRESHOLD) dismiss(1);
    else snapBack();
  };

  return (
    <div className="flex flex-col items-center gap-3 overflow-x-clip">
      <div
        ref={deckRef}
        role="region"
        aria-roledescription={t("servicesCarousel")}
        aria-labelledby={labelId}
        tabIndex={0}
        className="relative h-[calc(26rem+1rem)] w-full max-w-[17.5rem] touch-pan-y select-none [perspective:1100px]"
        style={{ ["--pull" as string]: 0 }}
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
          {items.map((item, itemIndex) => {
            const offset = itemIndex - index;
            if (offset < 0 || offset > 2) return null;
            const isTop = offset === 0;
            return (
              <div
                key={item.titleKey}
                ref={isTop ? topRef : undefined}
                role="group"
                aria-label={t(item.titleKey)}
                aria-hidden={!isTop}
                className={cn(
                  "absolute inset-x-0 top-0 h-[26rem] [transform-style:preserve-3d] will-change-transform",
                  isTop && "cursor-grab active:cursor-grabbing",
                )}
                style={{
                  zIndex: 8 - offset,
                  transform: isTop
                    ? undefined
                    : `translateY(${offset * 8}px) scale(calc(${1 - offset * 0.045} + ${offset === 1 ? "var(--pull, 0)" : 0} * 0.045))`,
                  transformOrigin: "50% 100%",
                  transition: isTop ? undefined : "transform 0.22s ease",
                  pointerEvents: isTop ? "auto" : "none",
                }}
                onPointerDown={isTop ? onPointerDown : undefined}
                onPointerMove={isTop ? onPointerMove : undefined}
                onPointerUp={isTop ? onPointerUp : undefined}
                onPointerCancel={isTop ? onPointerUp : undefined}
                onDragStart={(event) => event.preventDefault()}
              >
                <ServiceCard item={item} index={itemIndex} turned={seen[itemIndex]} focusable={isTop} />
              </div>
            );
          })}
      </div>
      <div className="flex items-center justify-center gap-2">
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
        <div className="flex justify-center gap-1" role="group" aria-label={t("services")}>
          {items.map((item, itemIndex) => (
            <button
              key={item.titleKey}
              type="button"
              aria-label={t(item.titleKey)}
              aria-current={itemIndex === index ? "true" : undefined}
              className="flex h-11 w-11 items-center justify-center rounded-full"
              onClick={() => goTo(itemIndex)}
            >
              <span
                className={cn(
                  "rounded-full transition-all",
                  itemIndex === index ? "h-2.5 w-6 bg-primary" : "h-2.5 w-2.5 bg-muted-foreground/40",
                )}
                aria-hidden
              />
            </button>
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
      <p id={labelId} className="sr-only">
        {t("services")}
      </p>
    </div>
  );
}

export function ServicesSection() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const coarsePointer = usePrefersCoarsePointer();
  // Narrow screens OR touch tablets (e.g. iPad landscape): swipe deck, not hover-flip spread.
  const useSwipeDeck = isMobile || coarsePointer;

  return (
    <PageSection id="wicd" title={t("services")} className="!m-0 overflow-visible">
      <div className="flex min-h-0 flex-1 flex-col justify-center">
        {useSwipeDeck ? (
          <ServiceSlider items={SERVICES} />
        ) : (
          <CardSpread>
            {SERVICES.map((item, index) => (
              <ServiceCard key={item.titleKey} item={item} index={index} />
            ))}
          </CardSpread>
        )}
      </div>
    </PageSection>
  );
}
