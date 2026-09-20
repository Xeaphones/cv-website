import { useEffect, useRef } from "react";

import { PageDivider } from "@/components/PageDivider";

import { AboutMeSection } from "./sections/AboutMeSection";
import { ServicesSection } from "./sections/ServicesSection";
import { SkillGridSection } from "./sections/SkillGridSection";

type HomeRestProps = {
  onReady: () => void;
};

function whenImageReady(image: HTMLImageElement) {
  if (image.complete && image.naturalWidth > 0) return Promise.resolve();
  if (typeof image.decode === "function") {
    return image.decode().then(
      () => undefined,
      () => undefined,
    );
  }
  return new Promise<void>((resolve) => {
    image.addEventListener("load", () => resolve(), { once: true });
    image.addEventListener("error", () => resolve(), { once: true });
  });
}

export default function HomeRest({ onReady }: HomeRestProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) {
      onReady();
      return;
    }

    let cancelled = false;
    const images = [...root.querySelectorAll("img")];
    const ready = Promise.all([
      document.fonts?.ready ?? Promise.resolve(),
      ...images.map(whenImageReady),
    ]);
    const timeout = new Promise<void>((resolve) => {
      window.setTimeout(resolve, 4000);
    });

    void Promise.race([ready, timeout]).then(() => {
      if (cancelled) return;
      requestAnimationFrame(() => onReady());
    });

    return () => {
      cancelled = true;
    };
  }, [onReady]);

  return (
    <div ref={ref}>
      <AboutMeSection />
      <div className="home-work">
        <ServicesSection />
        <PageDivider />
        <SkillGridSection />
      </div>
    </div>
  );
}
