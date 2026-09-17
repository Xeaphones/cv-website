import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";

const TYPE_MS = 70;
const DELETE_MS = 40;
const HOLD_MS = 3600;
const START_DELAY_MS = 1600;

function useCyclingTypewriter(words: string[]) {
  const [text, setText] = useState(words[0] ?? "");
  const [typing, setTyping] = useState(false);
  const wordKey = words.join("|");

  useEffect(() => {
    if (words.length === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setText(words.join(" / "));
      setTyping(false);
      return;
    }

    let cancelled = false;
    let timeout = 0;
    let current = words[0];
    setText(current);

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timeout = window.setTimeout(resolve, ms);
      });

    const run = async () => {
      await wait(START_DELAY_MS);
      let index = 0;
      while (!cancelled) {
        await wait(HOLD_MS);
        if (cancelled) return;
        setTyping(true);
        while (current.length > 0 && !cancelled) {
          current = current.slice(0, -1);
          setText(current);
          await wait(DELETE_MS);
        }
        if (cancelled) return;
        index = (index + 1) % words.length;
        const next = words[index];
        while (current.length < next.length && !cancelled) {
          current = next.slice(0, current.length + 1);
          setText(current);
          await wait(TYPE_MS);
        }
        setTyping(false);
      }
    };

    void run();
    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [wordKey]);

  return { text, typing };
}

export function HeroTypewriter() {
  const { t, i18n } = useTranslation();
  const words = t("heroRoles", { returnObjects: true });
  const after = t("heroLine2After");
  const roles = useMemo(
    () => (Array.isArray(words) ? words.map(String) : ["a Fullstack developer"]),
    [words, i18n.language],
  );
  const { text, typing } = useCyclingTypewriter(roles);

  return (
    <span className="hero-typewriter font-normal text-primary">
      {text}
      <span
        className={cn("hero-typewriter__caret", typing && "hero-typewriter__caret--solid")}
        aria-hidden
      />
      <span className="font-light text-foreground">{after}</span>
    </span>
  );
}
