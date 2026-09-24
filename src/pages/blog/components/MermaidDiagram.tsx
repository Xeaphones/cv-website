import { useEffect, useId, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { useResolvedTheme } from "@/lib/hooks/useResolvedTheme";
import { cn } from "@/lib/utils";

type MermaidDiagramProps = {
  chart: string;
  className?: string;
};

export function MermaidDiagram({ chart, className }: MermaidDiagramProps) {
  const { t } = useTranslation();
  const isDark = useResolvedTheme() === "dark";
  const reactId = useId().replace(/:/g, "");
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function renderDiagram() {
      const host = containerRef.current;
      if (!host) return;

      setError(null);
      host.innerHTML = "";

      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: isDark ? "dark" : "default",
          fontFamily: "inherit",
        });

        const { svg } = await mermaid.render(`mermaid-${reactId}`, chart.trim());
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch (cause) {
        if (!cancelled) {
          setError(cause instanceof Error ? cause.message : t("mermaidRenderError"));
        }
      }
    }

    void renderDiagram();

    return () => {
      cancelled = true;
    };
  }, [chart, isDark, reactId, t]);

  return (
    <div
      className={cn(
        "blog-mermaid my-6 overflow-x-auto rounded-lg border p-4",
        error
          ? "border-destructive/40 bg-destructive/5"
          : "flex justify-center border-border/60 bg-muted/30",
        className,
      )}
      role={error ? "alert" : "img"}
      aria-label={error ? undefined : t("mermaidDiagram")}
    >
      {error ? (
        <>
          <p className="mb-2 text-sm text-destructive">{t("mermaidRenderError")}</p>
          <pre className="m-0 overflow-x-auto text-xs text-muted-foreground">{chart}</pre>
        </>
      ) : null}
      <div
        ref={containerRef}
        className={cn(
          "blog-mermaid-svg min-h-[4rem] w-full [&_svg]:mx-auto [&_svg]:max-w-full",
          error && "hidden",
        )}
      />
    </div>
  );
}
