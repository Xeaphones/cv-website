export type CodeFenceMeta = {
  language: string;
  title?: string;
  highlights: number[];
  isTerminal: boolean;
  noTitle: boolean;
};

function parseHighlightSpec(spec?: string): number[] {
  if (!spec) return [];

  const lines = new Set<number>();

  for (const part of spec.split(/[,\s]+/).filter(Boolean)) {
    const range = part.match(/^(\d+)-(\d+)$/);
    if (range) {
      const start = Number(range[1]);
      const end = Number(range[2]);
      for (let line = start; line <= end; line += 1) {
        lines.add(line);
      }
      continue;
    }

    if (/^\d+$/.test(part)) {
      lines.add(Number(part));
    }
  }

  return [...lines].sort((a, b) => a - b);
}

export function parseCodeFenceMeta(className?: string, meta?: string | null): CodeFenceMeta {
  const combined = [className, meta].filter(Boolean).join(" ");
  const languageMatch = combined.match(/language-([\w-]+)/);
  const language = languageMatch?.[1] ?? "text";
  const title = combined.match(/title="([^"]+)"/)?.[1];
  const highlightFromAttr = combined.match(/highlight="([^"]+)"/)?.[1];
  const highlightFromBrace = combined.match(/\{([\d,\s-]+)\}/)?.[1];
  const highlights = parseHighlightSpec(highlightFromAttr ?? highlightFromBrace);
  const isTerminal =
    /\bis-terminal\b/.test(combined) || /is-terminal="(?:true|1)"/.test(combined);
  const noTitle = /\bno-title\b/.test(combined) || /no-title="(?:true|1)"/.test(combined);

  return { language, title, highlights, isTerminal, noTitle };
}
