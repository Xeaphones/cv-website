import { useCallback, useEffect, useId, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
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

  const dismiss = useCallback((flyDir: -1 | 1) => {
    if (drag.current.leaving) return;
    const nextIndex = index + flyDir;
    if (nextIndex < 0 || nextIndex >= items.length) {
      snapBack();
      return;
    }

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

    if (dx >= SWIPE_THRESHOLD) dismiss(1);
    else if (dx <= -SWIPE_THRESHOLD) dismiss(-1);
    else snapBack();
  };

  return (
    <div className="flex flex-col gap-3 overflow-x-clip">
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
          ref={deckRef}
          role="region"
          aria-roledescription="carousel"
          aria-labelledby={labelId}
          tabIndex={0}
          className="relative mx-auto h-[calc(26rem+1rem)] min-w-0 flex-1 max-w-[17.5rem] touch-pan-y select-none [perspective:1100px]"
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
                <ServiceCard item={item} index={itemIndex} turned={seen[itemIndex]} />
              </div>
            );
          })}
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
