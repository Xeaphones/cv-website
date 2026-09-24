import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

import { useResolvedTheme } from "@/lib/hooks";
import { cn } from "@/lib/utils";

import style from "./ServiceCard.module.scss";

type CardContent = {
    title: string;
    content: string;
    imgSRC: { light: string; dark: string };
    imgALT: string;
    index?: number;
    turned?: boolean;
    tabIndex?: number;
};

const ROMAN = ["I", "II", "III", "IV"] as const;

const FAN: Array<{ fan: string; z: number }> = [
    { fan: "-10deg", z: 2 },
    { fan: "-3.5deg", z: 3 },
    { fan: "3.5deg", z: 3 },
    { fan: "10deg", z: 2 },
];

export function CardSpread({ children }: { children: ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const [dealt, setDealt] = useState(false);
    const [settled, setSettled] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced) {
            setDealt(true);
            setSettled(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                setDealt(true);
                observer.disconnect();
            },
            { threshold: 0.28 },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!dealt || settled) return;
        const timeout = window.setTimeout(() => setSettled(true), 1100);
        return () => window.clearTimeout(timeout);
    }, [dealt, settled]);

    return (
        <div ref={ref} className={cn(style.spread, dealt && style.dealt, settled && style.settled)}>
            {children}
        </div>
    );
}

const Card = ({ title, content, imgSRC, index = 0, turned = false, tabIndex = 0 }: CardContent) => {
    const theme = useResolvedTheme();
    const src = theme === "light" ? imgSRC.light : imgSRC.dark;
    const fan = FAN[index] ?? FAN[0];
    const paragraphs = content.split("\n").map((item, i) => <p key={i}>{item}</p>);
    const [cardSettled, setCardSettled] = useState(turned);

    useEffect(() => {
        if (!turned || cardSettled) return;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced) {
            setCardSettled(true);
            return;
        }
        const timeout = window.setTimeout(() => setCardSettled(true), 1200);
        return () => window.clearTimeout(timeout);
    }, [turned, cardSettled]);

    return (
        <div className={style.scene}>
            <article
                className={cn(style.card, turned && style.turned, cardSettled && style.settled)}
                aria-label={title}
                tabIndex={tabIndex}
                style={
                    {
                        "--i": index,
                        "--fan": fan.fan,
                        "--z": fan.z,
                    } as CSSProperties
                }
            >
                <div className={style.inner}>
                    <div className={[style.face, style.back].join(" ")} aria-hidden>
                        <div className={style.identity}>
                            <span className={style.numeral}>{ROMAN[index] ?? ROMAN[0]}</span>
                            <img src={src} alt="" />
                            <h3>{title}</h3>
                        </div>
                        <div className={style.monogram}>
                            <span>YV</span>
                        </div>
                    </div>
                    <div className={[style.face, style.front].join(" ")}>
                        <span className={style.numeral}>{ROMAN[index] ?? ROMAN[0]}</span>
                        <img src={src} alt="" aria-hidden />
                        <h3>{title}</h3>
                        {paragraphs}
                        <div className={style.ornament} aria-hidden />
                    </div>
                </div>
            </article>
        </div>
    );
};

export default Card;
