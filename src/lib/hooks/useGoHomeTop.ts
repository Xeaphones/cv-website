import { useCallback, type MouseEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { stripLocalePrefix } from "@/lib/locale";

import { useLocalePath } from "./useLocalePath";

export function scrollToHomeTop(behavior: ScrollBehavior = "smooth") {
  const motion =
    behavior === "smooth" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : behavior;
  window.scrollTo({ top: 0, behavior: motion });
}

/**
 * Home logo / footer Home: if already on `/`, scroll to hero + clear hash
 * (React Router same-route navigation does not scroll).
 */
export function useGoHomeTop() {
  const navigate = useNavigate();
  const location = useLocation();
  const homePath = useLocalePath("/");

  const goHomeTop = useCallback(
    (event?: MouseEvent<HTMLAnchorElement>) => {
      if (stripLocalePrefix(location.pathname) !== "/") return;

      event?.preventDefault();
      scrollToHomeTop("smooth");
      if (location.hash) {
        navigate(
          { pathname: location.pathname, search: location.search, hash: "" },
          { replace: true, preventScrollReset: true },
        );
      }
    },
    [location.hash, location.pathname, location.search, navigate],
  );

  return { homePath, goHomeTop };
}
