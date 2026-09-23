import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";

import { stripLocalePrefix } from "@/lib/locale";

const HOME_SCROLL_THRESHOLD = 24;
/** Scroll-up larger than this in one event is route restoration, not a user scroll to hero. */
const INSTANT_JUMP_PX = 200;

export function useHomeHeaderVisible() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const { pathname, search, hash } = useLocation();
  const isHome = stripLocalePrefix(pathname) === "/";
  // Deep-link arrival: show header until scroll settles; thereafter only scrollY matters
  // (hash alone must not pin the header when the user returns to the hero).
  const [scrolled, setScrolled] = useState(
    () => !isHome || (hash !== "" && hash !== "#hero"),
  );
  const leftHero = useRef(false);
  const lastScrollY = useRef(
    typeof window !== "undefined" ? window.scrollY : 0,
  );

  const leavingHome =
    isHome &&
    navigation.location != null &&
    stripLocalePrefix(navigation.location.pathname) !== "/";

  useEffect(() => {
    leftHero.current = false;
  }, [isHome]);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }

    const update = () => {
      const y = window.scrollY;
      const jumpedUp = lastScrollY.current - y > INSTANT_JUMP_PX;
      lastScrollY.current = y;

      const nearTop = y <= HOME_SCROLL_THRESHOLD;

      if (!nearTop) {
        leftHero.current = true;
        setScrolled(true);
        return;
      }

      // Keep header visible across outbound navigations: RR jumps scrollY to 0
      // while still on `/`, which would otherwise slide the header away briefly.
      if (leavingHome || jumpedUp) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Only clear hash after the user has been past the hero (avoids wiping deep-links
      // before HomeRest scrolls into place).
      if (!leftHero.current) return;
      leftHero.current = false;

      // Defer and read the live URL — RR often scrolls to top before/as it updates
      // location when leaving home; a closed-over `pathname: "/"` would clobber /blog.
      requestAnimationFrame(() => {
        const livePath = window.location.pathname;
        const liveSearch = window.location.search;
        const liveHash = window.location.hash;
        if (stripLocalePrefix(livePath) !== "/") return;
        if (!liveHash || liveHash === "#hero") return;

        navigate(
          { pathname: livePath, search: liveSearch, hash: "" },
          { replace: true, preventScrollReset: true },
        );
      });
    };

    lastScrollY.current = window.scrollY;
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [hash, isHome, leavingHome, navigate, pathname, search]);

  return { isHome, scrolled: scrolled || leavingHome };
}
