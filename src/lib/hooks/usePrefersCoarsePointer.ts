import { useEffect, useState } from "react";

/** True for touch / stylus primary pointers (iPad, phones) — not mouse. */
export function usePrefersCoarsePointer(): boolean {
  const [coarse, setCoarse] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(pointer: coarse)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const onChange = () => setCoarse(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return coarse;
}
