import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const HOME_SCROLL_THRESHOLD = 24;

export function useHomeHeaderVisible() {
  const { pathname, hash } = useLocation();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(() => !isHome);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }

    const update = () => {
      const pastHero = hash !== "" && hash !== "#hero";
      setScrolled(pastHero || window.scrollY > HOME_SCROLL_THRESHOLD);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [hash, isHome]);

  return { isHome, scrolled };
}
