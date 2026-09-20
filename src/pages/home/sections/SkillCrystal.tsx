import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ThemedIcon } from "@/components/ThemedIcon";
import { cn } from "@/lib/utils";

import type { HomeSkillEntry } from "./skillData";

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
  const navigate = useNavigate();
  const location = useLocation();
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
    if (location.pathname === "/more") {
      document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
      window.history.replaceState(null, "", "/more#skills");
      return;
    }
    navigate("/more#skills");
  };

  return (
    <button type="button" className="skill-crystal" onClick={openSkills} aria-label={skill.name}>
      <span ref={orbRef} className="skill-crystal__orb">
        <span className="skill-crystal__halo" aria-hidden />
        <span className="skill-crystal__glass">
          <span className="skill-crystal__smoke" aria-hidden>
            <span />
            <span />
            <span />
            <span />
            <span />
          </span>
          <span className="skill-crystal__core" aria-hidden />
          <span className={cn("skill-crystal__vision", visible && "is-visible")} aria-live="polite">
            <i>
              {skill.fillVariant ? <ThemedIcon icon={Icon} variant={skill.fillVariant} /> : <Icon />}
            </i>
            <span className="skill-crystal__name">{skill.name}</span>
          </span>
          <span className="skill-crystal__shine" aria-hidden />
        </span>
      </span>
      <span className="skill-crystal__base" aria-hidden>
        <span className="skill-crystal__socle" />
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
    <span className="skill-candle" aria-hidden>
      <span className="skill-candle__smoke">
        <span />
        <span />
        <span />
        {Icon ? (
          <span
            className="skill-candle__ember"
            key={skill.name}
            onAnimationEnd={(event) => {
              if (event.target !== event.currentTarget) return;
              advance();
            }}
          >
            <i>
              {skill.fillVariant ? <ThemedIcon icon={Icon} variant={skill.fillVariant} /> : <Icon />}
            </i>
            <span className="skill-candle__name">{skill.name}</span>
          </span>
        ) : null}
      </span>
      <span className="skill-candle__flame">
        <span />
        <span />
      </span>
      <span className="skill-candle__wick" />
      <span className="skill-candle__wax">
        <span className="skill-candle__melt" />
        <span className="skill-candle__drip" />
        <span className="skill-candle__drip" />
      </span>
      <span className="skill-candle__holder" />
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
    <span className="skill-vial" aria-hidden>
      <span className="skill-vial__vessel">
        <span className="skill-vial__collar" />
        <span className="skill-vial__seal">
          <span />
          <span />
          <span />
        </span>
        <span className="skill-vial__cork" />
        <span className="skill-vial__neck" />
        <span className="skill-vial__flask">
          <span className="skill-vial__cosmos">
            <span />
            <span />
            <span />
          </span>
          <i className={cn(visible && "is-visible")}>
            {skill.fillVariant ? <ThemedIcon icon={Icon} variant={skill.fillVariant} /> : <Icon />}
          </i>
          <span className="skill-vial__shine" />
        </span>
      </span>
      <span className="skill-vial__cradle">
        <span className="skill-vial__band" />
        <span className="skill-vial__band skill-vial__band--low" />
        <span className="skill-vial__prong" />
        <span className="skill-vial__prong" />
        <span className="skill-vial__prong" />
        <span className="skill-vial__rivet" />
        <span className="skill-vial__rivet" />
        <span className="skill-vial__rivet" />
        <span className="skill-vial__foot" />
        <span className="skill-vial__label">{skill.name}</span>
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
    <span className={cn("skill-wisp", `skill-wisp--${tone}`, ember && "skill-wisp--ember", className)} aria-hidden>
      {ember ? null : (
        <span className="skill-wisp__trail">
          <span />
          <span />
          <span />
          <span />
          <span />
        </span>
      )}
      <span className="skill-wisp__glow" />
      <span className="skill-wisp__flame" />
      {ember ? null : <span className="skill-wisp__core" />}
    </span>
  );
}

function SkillGreens({ side }: { side: "left" | "right" }) {
  return (
    <span className={cn("skill-greens", `skill-greens--${side}`)} aria-hidden>
      <span className="skill-greens__stem" />
      <span className="skill-greens__leaf" />
      <span className="skill-greens__leaf" />
      <span className="skill-greens__leaf" />
      <span className="skill-greens__leaf" />
      <span className="skill-greens__base" />
    </span>
  );
}

export function SkillAltar({ skills }: { skills: HomeSkillEntry[] }) {
  const pools = useMemo(() => splitSkillPools(skills), [skills]);

  return (
    <div className="skill-atelier">
      <div className="skill-atelier__stage">
        <span className="skill-wisp-field" aria-hidden>
          <SkillWisp tone="blue" className="skill-wisp--s1" />
          <SkillWisp tone="purple" ember className="skill-wisp--s2" />
          <SkillWisp tone="blue" ember className="skill-wisp--s3" />
          <SkillWisp tone="purple" className="skill-wisp--s4" />
          <SkillWisp tone="blue" ember className="skill-wisp--s5" />
          <SkillWisp tone="purple" ember className="skill-wisp--s6" />
          <SkillWisp tone="blue" className="skill-wisp--s7" />
          <SkillWisp tone="purple" className="skill-wisp--s8" />
        </span>
        <SkillGreens side="left" />
        <SkillCandle skills={pools.candle} />
        <span className="skill-tome" aria-hidden>
          <span className="skill-tome__book">
            <span className="skill-tome__pages" />
          </span>
          <span className="skill-tome__book">
            <span className="skill-tome__pages" />
          </span>
        </span>
        <div className="skill-atelier__hearth">
          <SkillCrystal skills={pools.crystal} />
        </div>
        <SkillVial skills={pools.vial} />
        <SkillGreens side="right" />
      </div>
      <div className="skill-atelier__table" aria-hidden>
        <span className="skill-atelier__moss" />
        <span className="skill-atelier__moss" />
        <span className="skill-atelier__moss" />
      </div>
    </div>
  );
}
