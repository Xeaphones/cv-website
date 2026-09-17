import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

type Dot = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  token: string;
};

type Palette = {
  isLight: boolean;
  primary: string;
  tokens: string[];
  lightnessShift: number;
  minDotAlpha: number;
};

type ParticleCanvasProps = {
  linked?: boolean;
  fill?: boolean;
  className?: string;
};

function densityForWidth(width: number, linked: boolean) {
  let count = 110;
  let linkDist = 0;
  let mouseRadius = 0;
  if (width > 1600) {
    count = 480;
    linkDist = 70;
    mouseRadius = 280;
  } else if (width > 1300) {
    count = 400;
    linkDist = 60;
    mouseRadius = 250;
  } else if (width > 1100) {
    count = 320;
    linkDist = 55;
    mouseRadius = 220;
  } else if (width > 800) {
    count = 220;
  }
  if (!linked) {
    return { count: Math.min(count, 220), linkDist: 0, mouseRadius: 0 };
  }
  return { count, linkDist, mouseRadius };
}

function readToken(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function toHsla(token: string, alpha: number, lightnessShift = 0): string {
  const match = token.trim().match(/^([\d.]+)\s+([\d.]+)%\s+([\d.]+)%$/);
  if (!match) return `hsla(0, 0%, 0%, ${alpha})`;
  const lightness = Math.min(100, Math.max(0, Number(match[3]) + lightnessShift));
  return `hsla(${match[1]}, ${Number(match[2])}%, ${lightness}%, ${alpha})`;
}

function readPalette(): Palette {
  const isLight = !document.documentElement.classList.contains("dark");
  const primary = readToken("--primary");
  const accent = readToken("--ctp-pink") || readToken("--destructive");
  return {
    isLight,
    primary,
    tokens: [primary, primary, primary, primary, accent],
    lightnessShift: isLight ? -22 : 0,
    minDotAlpha: isLight ? 0.22 : 0.18,
  };
}

export function ParticleCanvas({ linked = false, fill = false, className }: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: !fill });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dots: Dot[] = [];
    let mouseX = 0;
    let mouseY = 0;
    let frame = 0;
    let lastIsLight: boolean | null = null;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const spawnDots = (palette: Palette) => {
      const { count } = densityForWidth(width, linked);
      dots = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: -0.45 + Math.random() * 0.9,
        vy: -0.45 + Math.random() * 0.9,
        radius: index === 0 && linked ? 1.6 : 0.4 + Math.random() * 1.2,
        token:
          index === 0 && linked
            ? palette.primary
            : palette.tokens[Math.floor(Math.random() * palette.tokens.length)],
      }));
      mouseX = width * 0.5;
      mouseY = height * 0.42;
      if (linked && dots[0]) {
        dots[0].x = mouseX;
        dots[0].y = mouseY;
      }
    };

    const resize = () => {
      const parent = canvas.parentElement;
      width = fill ? (parent?.clientWidth ?? window.innerWidth) : window.innerWidth;
      height = fill ? (parent?.clientHeight ?? window.innerHeight) : window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lastIsLight = null;
    };

    const paint = () => {
      const palette = readPalette();
      if (lastIsLight !== palette.isLight) {
        lastIsLight = palette.isLight;
        spawnDots(palette);
      }

      if (fill) {
        const parent = canvas.parentElement;
        ctx.fillStyle = parent
          ? getComputedStyle(parent).backgroundColor
          : `hsl(${readToken("--background2")})`;
        ctx.fillRect(0, 0, width, height);
      } else {
        ctx.clearRect(0, 0, width, height);
      }

      const { linkDist, mouseRadius } = densityForWidth(width, linked);

      if (!reducedMotion) {
        const start = linked ? 1 : 0;
        for (let i = start; i < dots.length; i += 1) {
          const dot = dots[i];
          dot.x += dot.vx;
          dot.y += dot.vy;
          if (dot.x < 0 || dot.x > width) dot.vx *= -1;
          if (dot.y < 0 || dot.y > height) dot.vy *= -1;
        }
        if (linked && dots[0]) {
          dots[0].x = mouseX;
          dots[0].y = mouseY;
        }
      }

      if (linkDist > 0 && mouseRadius > 0) {
        ctx.lineWidth = 0.3;
        for (let i = 0; i < dots.length; i += 1) {
          const a = dots[i];
          if (Math.abs(a.x - mouseX) > mouseRadius || Math.abs(a.y - mouseY) > mouseRadius) {
            continue;
          }
          for (let j = i + 1; j < dots.length; j += 1) {
            const b = dots[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            if (Math.abs(dx) > linkDist || Math.abs(dy) > linkDist) continue;

            const fromMouse = Math.hypot(a.x - mouseX, a.y - mouseY);
            const fade = Math.max(0, fromMouse / mouseRadius - 0.3);
            ctx.strokeStyle = toHsla(palette.primary, 1 - fade, palette.lightnessShift);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      const fadeRange = width / 1.7;
      const fadeOriginX = linked ? mouseX : width * 0.5;
      const fadeOriginY = linked ? mouseY : height * 0.45;
      for (const dot of dots) {
        const fade = Math.min(1, Math.hypot(dot.x - fadeOriginX, dot.y - fadeOriginY) / fadeRange);
        ctx.fillStyle = toHsla(dot.token, Math.max(palette.minDotAlpha, 1 - fade), palette.lightnessShift);
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      frame = requestAnimationFrame(paint);
    };

    const onMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = event.clientX - rect.left;
      mouseY = event.clientY - rect.top;
    };

    resize();
    paint();
    if (linked) window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frame);
      if (linked) window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, [fill, linked]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none h-full w-full", className)}
      aria-hidden
    />
  );
}
