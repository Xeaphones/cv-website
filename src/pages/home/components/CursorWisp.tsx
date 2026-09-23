import { useEffect, useRef } from "react";

type Point = { x: number; y: number };

type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  size: number;
};

type Tone = {
  hue: number;
  sat: number;
  light: number;
};

let sessionTone: Tone | null = null;

function sessionToneOrRoll() {
  if (!sessionTone) {
    sessionTone = {
      hue: 172 + Math.random() * 148,
      sat: 84 + Math.random() * 16,
      light: 62 + Math.random() * 10,
    };
  }
  return sessionTone;
}

function hsla(hue: number, sat: number, light: number, alpha: number) {
  return `hsla(${hue} ${sat}% ${light}% / ${alpha})`;
}

function canAnimate() {
  return (
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    !window.matchMedia("(pointer: coarse)").matches &&
    window.innerWidth > 800
  );
}

export function CursorWisp() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const tone = sessionToneOrRoll();
    let width = 0;
    let height = 0;
    let frame = 0;
    let active = false;
    let visible = false;
    let fade = 0;
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let vx = 0;
    let vy = 0;
    let tick = 0;
    const trail: Point[] = [];
    const sparks: Spark[] = [];
    const TRAIL = 18;

    const host = canvas.parentElement;
    if (!host) return;

    const resize = () => {
      width = host.clientWidth;
      height = host.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      active = canAnimate();
      canvas.hidden = !active;
    };

    const glow = (cx: number, cy: number, radius: number, color: string) => {
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, hsla(tone.hue, tone.sat, tone.light, 0));
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const paint = () => {
      frame = requestAnimationFrame(paint);
      ctx.clearRect(0, 0, width, height);
      if (!active) return;

      tick += 1;
      fade += ((visible ? 1 : 0) - fade) * 0.14;
      if (fade <= 0.01) return;

      vx += (targetX - x) * 0.16;
      vy += (targetY - y) * 0.16;
      vx *= 0.68;
      vy *= 0.68;
      x += vx;
      y += vy;

      const hx = x;
      const hy = y + Math.sin(tick * 0.05) * 2.1;
      const speed = Math.hypot(vx, vy);

      trail.unshift({ x: hx, y: hy });
      if (trail.length > TRAIL) trail.length = TRAIL;

      if (speed > 2.2 && sparks.length < 36) {
        const count = speed > 12 ? 2 : 1;
        for (let i = 0; i < count; i += 1) {
          sparks.push({
            x: hx + (Math.random() - 0.5) * 7,
            y: hy + (Math.random() - 0.5) * 7,
            vx: -vx * 0.24 + (Math.random() - 0.5) * 0.65,
            vy: -vy * 0.24 - 0.16 + (Math.random() - 0.5) * 0.45,
            life: 1,
            max: 16 + Math.random() * 14,
            size: 1.1 + Math.random() * 2,
          });
        }
      }

      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      if (trail.length > 1) {
        for (let i = 1; i < trail.length; i += 1) {
          const t = 1 - i / trail.length;
          ctx.strokeStyle = hsla(tone.hue, tone.sat, tone.light, fade * t * 0.38);
          ctx.lineWidth = 1.4 + t * 6.5;
          ctx.beginPath();
          ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
          ctx.lineTo(trail[i].x, trail[i].y);
          ctx.stroke();
        }
      }

      for (let i = trail.length - 1; i >= 0; i -= 1) {
        const point = trail[i];
        const t = 1 - i / trail.length;
        glow(point.x, point.y, 8 + t * 7, hsla(tone.hue, tone.sat, tone.light, fade * t * 0.22));
      }

      for (let i = sparks.length - 1; i >= 0; i -= 1) {
        const spark = sparks[i];
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.vy -= 0.014;
        spark.life -= 1 / spark.max;
        if (spark.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        const alpha = fade * spark.life;
        glow(spark.x, spark.y, spark.size * 3.2, hsla(tone.hue, tone.sat, tone.light, alpha * 0.35));
        ctx.fillStyle = hsla(tone.hue, 36, 98, alpha * 0.85);
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, Math.max(0.4, spark.size * spark.life), 0, Math.PI * 2);
        ctx.fill();
      }

      glow(hx, hy, 26, hsla(tone.hue, tone.sat, tone.light, fade * 0.26));
      glow(hx, hy, 13, hsla(tone.hue, tone.sat, 88, fade * 0.52));
      glow(hx, hy, 5.8, hsla(tone.hue, 30, 100, fade * 0.95));

      ctx.globalCompositeOperation = "source-over";
    };

    const onMove = (event: PointerEvent) => {
      if (!active) return;
      const rect = host.getBoundingClientRect();
      const nextX = event.clientX - rect.left;
      const nextY = event.clientY - rect.top;
      const inside = nextX >= 0 && nextY >= 0 && nextX <= rect.width && nextY <= rect.height;
      if (!inside) {
        visible = false;
        return;
      }
      targetX = nextX;
      targetY = nextY;
      if (!visible) {
        x = targetX;
        y = targetY;
        trail.length = 0;
        visible = true;
      }
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    frame = requestAnimationFrame(paint);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-10" aria-hidden />;
}
