export type BlogImageSize = "small" | "medium" | "big";

export type BlogImageMeta = {
  size: BlogImageSize;
  noBackground: boolean;
  caption: string | null;
};

const SIZE_TAGS: Record<string, BlogImageSize> = {
  "size-small": "small",
  "size-medium": "medium",
  "size-big": "big",
};

const CAPTION_PREFIX = "caption:";

function parseTagTokens(raw: string): { size: BlogImageSize; noBackground: boolean } {
  const tokens = raw
    .split(/[\s,]+/)
    .map((token) => token.trim().toLowerCase())
    .filter(Boolean);

  let size: BlogImageSize = "medium";
  let noBackground = false;

  for (const token of tokens) {
    if (token in SIZE_TAGS) {
      size = SIZE_TAGS[token];
    } else if (token === "no-background") {
      noBackground = true;
    }
  }

  return { size, noBackground };
}

export function parseBlogImageMeta(title?: string | null): BlogImageMeta {
  const raw = title?.trim() ?? "";

  if (!raw) {
    return { size: "medium", noBackground: false, caption: null };
  }

  const pipeIndex = raw.indexOf(" | ");

  if (pipeIndex !== -1) {
    const tags = parseTagTokens(raw.slice(0, pipeIndex));
    const caption = raw.slice(pipeIndex + 3).trim();

    return {
      ...tags,
      caption: caption || null,
    };
  }

  const captionIndex = raw.toLowerCase().indexOf(CAPTION_PREFIX);

  if (captionIndex !== -1) {
    const tags = parseTagTokens(raw.slice(0, captionIndex));
    const caption = raw.slice(captionIndex + CAPTION_PREFIX.length).trim();

    return {
      ...tags,
      caption: caption || null,
    };
  }

  return {
    ...parseTagTokens(raw),
    caption: null,
  };
}
