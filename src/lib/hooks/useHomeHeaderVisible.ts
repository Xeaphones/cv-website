import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { stripLocalePrefix } from "@/lib/locale";

const HOME_SCROLL_THRESHOLD = 24;

export function useHomeHeaderVisible() {
  const navigate = useNavigate();
  const { pathname, search, hash } = useLocation();
  const isHome = stripLocalePrefix(pathname) === "/";
  // Deep-link arrival: show header until scroll settles; thereafter only scrollY matters
  // (hash alone must not pin the header when the user returns to the hero).
  const [scrolled, setScrolled] = useState(
    () => !isHome || (hash !== "" && hash !== "#hero"),
  );
  const leftHero = useRef(false);

  useEffect(() => {
    leftHero.current = false;
  }, [isHome]);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }

    const update = () => {
      const nearTop = window.scrollY <= HOME_SCROLL_THRESHOLD;
      setScrolled(!nearTop);

      if (!nearTop) {
        leftHero.current = true;
        return;
      }

      // Only clear hash after the user has been past the hero (avoids wiping deep-links
      // before HomeRest scrolls into place).
      if (leftHero.current && hash && hash !== "#hero") {
        leftHero.current = false;
        navigate({ pathname, search, hash: "" }, { replace: true });
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [hash, isHome, navigate, pathname, search]);

  return { isHome, scrolled };
}
