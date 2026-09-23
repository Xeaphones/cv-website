import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const HEADER_OFFSET_PX = 80;

function resolveBehavior(behavior: ScrollBehavior): ScrollBehavior {
  if (behavior !== "smooth") return behavior;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "auto";
  return "smooth";
}

/** Scroll only — use `useScrollToHomeSection` when the URL hash must stay in sync. */
export function scrollToHomeSection(id: string, behavior: ScrollBehavior = "smooth") {
  const el = document.getElementById(id);
  if (!el) return;

  const header = document.querySelector("header");
  const headerHeight =
    header instanceof HTMLElement ? header.getBoundingClientRect().height : HEADER_OFFSET_PX;
  // Full-viewport home sections that already pad for the header (e.g. aboutme).
  // Don't key off CSS module class names — those are hashed.
  const usesOwnHeaderPadding = id === "aboutme";
  const offset = usesOwnHeaderPadding ? 0 : headerHeight;
  const top = Math.max(0, window.scrollY + el.getBoundingClientRect().top - offset);

  window.scrollTo({ top, behavior: resolveBehavior(behavior) });
}

/**
 * Update hash via RR without the instant native/RR jump to the target element.
 * Temporarily strips the element id so hash resolution finds nothing, then restores
 * it and runs our smooth (or instant) scroll.
 */
export function useScrollToHomeSection() {
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(
    (id: string, behavior: ScrollBehavior = "smooth") => {
      const nextHash = `#${id}`;
      const el = document.getElementById(id);

      if (el) {
        el.removeAttribute("id");
      }

      if (location.hash !== nextHash) {
        navigate(
          { pathname: location.pathname, search: location.search, hash: nextHash },
          { replace: true, preventScrollReset: true },
        );
      }

      const runScroll = () => {
        if (el) el.id = id;
        scrollToHomeSection(id, behavior);
      };

      // After RR finishes hash handling (which finds no element), restore + smooth scroll.
      requestAnimationFrame(() => requestAnimationFrame(runScroll));
    },
    [navigate, location.pathname, location.search, location.hash],
  );
}
