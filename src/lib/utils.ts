import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Map BEM/local tokens through a CSS module; leave other class names (e.g. Tailwind) as-is. */
export function modCn(
  styles: Record<string, string>,
  ...inputs: ClassValue[]
) {
  const merged = clsx(inputs)
  if (!merged) return ""
  return twMerge(
    merged
      .split(/\s+/)
      .filter(Boolean)
      .map((token) => styles[token] ?? token)
      .join(" "),
  )
}
