import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

import { ThemedIcon } from "@/shared/components/ThemedIcon";
import { useLocalePath } from "@/lib/hooks";
import { stripLocalePrefix } from "@/lib/locale";
import { modCn } from "@/lib/utils";

import styles from "./SkillAltar.module.scss";

import type { HomeSkillEntry } from "@/pages/home/data/skillData";

const HOLD_MS = 2400;
const FADE_MS = 720;
const VIAL_HOLD_MS = 3600;
const CANDLE_HOLD_MS = 4200;
const SMOKE_RANGE = 28;

function shuffleSkills(skills: HomeSkillEntry[]) {
  const next = [...skills];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function splitSkillPools(skills: HomeSkillEntry[]) {
  const shuffled = shuffleSkills(skills);
  const base = Math.floor(shuffled.length / 3);
  const extra = shuffled.length % 3;
  let offset = 0;

  const take = (index: number) => {
    const count = base + (index < extra ? 1 : 0);
    const slice = shuffled.slice(offset, offset + count);
    offset += count;
    return slice;
  };

  return {
    candle: take(0),
    crystal: take(1),
    vial: take(2),
  };
}

export function SkillCrystal({ skills }: { skills: HomeSkillEntry[] }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const moreSkillsPath = useLocalePath("/profile#skills");
  const orbRef = useRef<HTMLSpanElement>(null);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const indexRef = useRef(0);
  const skill = skills[index] ?? skills[0];

  useEffect(() => {
    if (skills.length < 2) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let fadeTimer = 0;
    let holdTimer = 0;

    const goNext = () => {
      if (reduced) {
        const next = (indexRef.current + 1) % skills.length;
        indexRef.current = next;
        setIndex(next);
        holdTimer = window.setTimeout(goNext, HOLD_MS);
        return;
      }

      setVisible(false);
      fadeTimer = window.setTimeout(() => {
        const next = (indexRef.current + 1) % skills.length;
        indexRef.current = next;
        setIndex(next);
        setVisible(true);
        holdTimer = window.setTimeout(goNext, HOLD_MS);
      }, FADE_MS);
    };

    holdTimer = window.setTimeout(goNext, HOLD_MS);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(holdTimer);
    };
  }, [skills]);

  useEffect(() => {
    const orb = orbRef.current;
    if (!orb) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const rect = orb.getBoundingClientRect();
        const nx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width * 0.7);
        const ny = (event.clientY - (rect.top + rect.height / 2)) / (rect.height * 0.7);
        const dx = Math.max(-1, Math.min(1, nx)) * SMOKE_RANGE;
        const dy = Math.max(-1, Math.min(1, ny)) * SMOKE_RANGE;
        orb.style.setProperty("--smoke-x", `${dx}px`);
        orb.style.setProperty("--smoke-y", `${dy}px`);
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  if (!skill) return null;

  const Icon = skill.icon;

  const openSkills = () => {
    if (stripLocalePrefix(location.pathname) === "/profile") {
      document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
      window.history.replaceState(null, "", moreSkillsPath);
      return;
    }
    navigate(moreSkillsPath);
  };

  return (
    <button
      type="button"
      className={modCn(styles, "skill-crystal")}
      onClick={openSkills}
      aria-label={t("skillsCrystalAria", { name: skill.name })}
    >
      <span ref={orbRef} className={modCn(styles, "skill-crystal__orb")}>
        <span className={modCn(styles, "skill-crystal__halo")} aria-hidden />
        <span className={modCn(styles, "skill-crystal__glass")}>
          <span className={modCn(styles, "skill-crystal__smoke")} aria-hidden>
            <span />
            <span />
            <span />
            <span />
            <span />
          </span>
          <span className={modCn(styles, "skill-crystal__core")} aria-hidden />
          <span className={modCn(styles, "skill-crystal__vision", visible && "is-visible")}>
            <i>
              {skill.fillVariant ? <ThemedIcon icon={Icon} variant={skill.fillVariant} /> : <Icon />}
            </i>
            <span className={modCn(styles, "skill-crystal__name")}>{skill.name}</span>
          </span>
          <span className={modCn(styles, "skill-crystal__shine")} aria-hidden />
        </span>
      </span>
      <span className={modCn(styles, "skill-crystal__base")} aria-hidden>
        <span className={modCn(styles, "skill-crystal__socle")} />
      </span>
    </button>
  );
}

function SkillCandle({ skills }: { skills: HomeSkillEntry[] }) {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  const skill = skills[index] ?? skills[0];

  const advance = () => {
    if (skills.length < 2) return;
    const next = (indexRef.current + 1) % skills.length;
    indexRef.current = next;
    setIndex(next);
  };

  useEffect(() => {
    if (skills.length < 2) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) return;

    const holdTimer = window.setInterval(advance, CANDLE_HOLD_MS);
    return () => window.clearInterval(holdTimer);
  }, [skills]);

  const Icon = skill?.icon;

  return (
    <span className={modCn(styles, "skill-candle")} role="img" aria-label={skill?.name}>
      <span className={modCn(styles, "skill-candle__smoke")} aria-hidden>
        <span />
        <span />
        <span />
        {Icon ? (
          <span
            className={modCn(styles, "skill-candle__ember")}
            key={skill.name}
            onAnimationEnd={(event) => {
              if (event.target !== event.currentTarget) return;
              advance();
            }}
          >
            <i>
              {skill.fillVariant ? <ThemedIcon icon={Icon} variant={skill.fillVariant} /> : <Icon />}
            </i>
            <span className={modCn(styles, "skill-candle__name")}>{skill.name}</span>
          </span>
        ) : null}
      </span>
      <span className={modCn(styles, "skill-candle__flame")} aria-hidden>
        <span />
        <span />
      </span>
      <span className={modCn(styles, "skill-candle__wick")} aria-hidden />
      <span className={modCn(styles, "skill-candle__wax")} aria-hidden>
        <span className={modCn(styles, "skill-candle__melt")} />
        <span className={modCn(styles, "skill-candle__drip")} />
        <span className={modCn(styles, "skill-candle__drip")} />
      </span>
      <span className={modCn(styles, "skill-candle__holder")} aria-hidden />
    </span>
  );
}

function SkillVial({ skills }: { skills: HomeSkillEntry[] }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const indexRef = useRef(0);
  const skill = skills[index] ?? skills[0];

  useEffect(() => {
    if (skills.length < 2) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let fadeTimer = 0;
    let holdTimer = 0;

    const goNext = () => {
      if (reduced) {
        const next = (indexRef.current + 1) % skills.length;
        indexRef.current = next;
        setIndex(next);
        holdTimer = window.setTimeout(goNext, VIAL_HOLD_MS);
        return;
      }

      setVisible(false);
      fadeTimer = window.setTimeout(() => {
        const next = (indexRef.current + 1) % skills.length;
        indexRef.current = next;
        setIndex(next);
        setVisible(true);
        holdTimer = window.setTimeout(goNext, VIAL_HOLD_MS);
      }, FADE_MS);
    };

    holdTimer = window.setTimeout(goNext, VIAL_HOLD_MS);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(holdTimer);
    };
  }, [skills]);

  if (!skill) return null;

  const Icon = skill.icon;

  return (
    <span className={modCn(styles, "skill-vial")} role="img" aria-label={skill.name}>
      <span className={modCn(styles, "skill-vial__vessel")} aria-hidden>
        <span className={modCn(styles, "skill-vial__collar")} />
        <span className={modCn(styles, "skill-vial__seal")}>
          <span />
          <span />
          <span />
        </span>
        <span className={modCn(styles, "skill-vial__cork")} />
        <span className={modCn(styles, "skill-vial__neck")} />
        <span className={modCn(styles, "skill-vial__flask")}>
          <span className={modCn(styles, "skill-vial__cosmos")}>
            <span />
            <span />
            <span />
          </span>
          <i className={modCn(styles, visible && "is-visible")}>
            {skill.fillVariant ? <ThemedIcon icon={Icon} variant={skill.fillVariant} /> : <Icon />}
          </i>
          <span className={modCn(styles, "skill-vial__shine")} />
        </span>
      </span>
      <span className={modCn(styles, "skill-vial__cradle")}>
        <span className={modCn(styles, "skill-vial__band")} aria-hidden />
        <span className={modCn(styles, "skill-vial__band skill-vial__band--low")} aria-hidden />
        <span className={modCn(styles, "skill-vial__prong")} aria-hidden />
        <span className={modCn(styles, "skill-vial__prong")} aria-hidden />
        <span className={modCn(styles, "skill-vial__prong")} aria-hidden />
        <span className={modCn(styles, "skill-vial__rivet")} aria-hidden />
        <span className={modCn(styles, "skill-vial__rivet")} aria-hidden />
        <span className={modCn(styles, "skill-vial__rivet")} aria-hidden />
        <span className={modCn(styles, "skill-vial__foot")} aria-hidden />
        <span className={modCn(styles, "skill-vial__label")}>{skill.name}</span>
      </span>
    </span>
  );
}

function SkillWisp({
  tone,
  ember,
  className,
}: {
  tone: "blue" | "purple";
  ember?: boolean;
  className?: string;
}) {
  return (
    <span className={modCn(styles, "skill-wisp", `skill-wisp--${tone}`, ember && "skill-wisp--ember", className)} aria-hidden>
      {ember ? null : (
        <span className={modCn(styles, "skill-wisp__trail")}>
          <span />
          <span />
          <span />
          <span />
          <span />
        </span>
      )}
      <span className={modCn(styles, "skill-wisp__glow")} />
      <span className={modCn(styles, "skill-wisp__flame")} />
      {ember ? null : <span className={modCn(styles, "skill-wisp__core")} />}
    </span>
  );
}

function SkillGreens({ side }: { side: "left" | "right" }) {
  return (
    <span className={modCn(styles, "skill-greens", `skill-greens--${side}`)} aria-hidden>
      <span className={modCn(styles, "skill-greens__stem")} />
      <span className={modCn(styles, "skill-greens__leaf")} />
      <span className={modCn(styles, "skill-greens__leaf")} />
      <span className={modCn(styles, "skill-greens__leaf")} />
      <span className={modCn(styles, "skill-greens__leaf")} />
      <span className={modCn(styles, "skill-greens__base")} />
    </span>
  );
}

export function SkillAltar({ skills }: { skills: HomeSkillEntry[] }) {
  const pools = useMemo(() => splitSkillPools(skills), [skills]);

  return (
    <div className={modCn(styles, "skill-atelier")}>
      <div className={modCn(styles, "skill-atelier__stage")}>
        <span className={modCn(styles, "skill-wisp-field")} aria-hidden>
          <SkillWisp tone="blue" className={modCn(styles, "skill-wisp--s1")} />
          <SkillWisp tone="purple" ember className={modCn(styles, "skill-wisp--s2")} />
          <SkillWisp tone="blue" ember className={modCn(styles, "skill-wisp--s3")} />
          <SkillWisp tone="purple" className={modCn(styles, "skill-wisp--s4")} />
          <SkillWisp tone="blue" ember className={modCn(styles, "skill-wisp--s5")} />
          <SkillWisp tone="purple" ember className={modCn(styles, "skill-wisp--s6")} />
          <SkillWisp tone="blue" className={modCn(styles, "skill-wisp--s7")} />
          <SkillWisp tone="purple" className={modCn(styles, "skill-wisp--s8")} />
        </span>
        <SkillGreens side="left" />
        <SkillCandle skills={pools.candle} />
        <span className={modCn(styles, "skill-tome")} aria-hidden>
          <span className={modCn(styles, "skill-tome__book")}>
            <span className={modCn(styles, "skill-tome__pages")} />
          </span>
          <span className={modCn(styles, "skill-tome__book")}>
            <span className={modCn(styles, "skill-tome__pages")} />
          </span>
        </span>
        <div className={modCn(styles, "skill-atelier__hearth")}>
          <SkillCrystal skills={pools.crystal} />
        </div>
        <SkillVial skills={pools.vial} />
        <SkillGreens side="right" />
      </div>
      <div className={modCn(styles, "skill-atelier__table")} aria-hidden>
        <span className={modCn(styles, "skill-atelier__moss")} />
        <span className={modCn(styles, "skill-atelier__moss")} />
        <span className={modCn(styles, "skill-atelier__moss")} />
      </div>
    </div>
  );
}
