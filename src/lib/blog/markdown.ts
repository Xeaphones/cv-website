export type MarkdownHeading = {
  id: string;
  text: string;
  level: number;
};

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function extractMarkdownHeadings(markdown: string): MarkdownHeading[] {
  const headings: MarkdownHeading[] = [];
  const usedIds = new Set<string>();
  let inCodeFence = false;

  for (const line of markdown.split("\n")) {
    const fenceMatch = line.trimStart().match(/^(`{3,}|~{3,})/);
    if (fenceMatch) {
      inCodeFence = !inCodeFence;
      continue;
    }

    if (inCodeFence) {
      continue;
    }

    const match = line.match(/^(#{1,3})\s+(.+)$/);
    if (!match) continue;

    const level = match[1].length;
    const text = match[2].replace(/\*\*|__|`/g, "").trim();
    let id = slugifyHeading(text);

    if (usedIds.has(id)) {
      let suffix = 2;
      while (usedIds.has(`${id}-${suffix}`)) suffix += 1;
      id = `${id}-${suffix}`;
    }

    usedIds.add(id);
    headings.push({ id, text, level });
  }

  return headings;
}

export function estimateReadingTimeMinutes(content: string): number {
  const words = content
    .replace(/[#*_[\]`>-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 200));
}
