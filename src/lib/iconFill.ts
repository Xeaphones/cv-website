import type { ResolvedTheme } from "@/lib/hooks";

export type IconFillVariant = "muted" | "dark";

export function getIconFill(theme: ResolvedTheme, variant: IconFillVariant = "muted"): string {
  if (variant === "dark") {
    return theme === "light" ? "#4c4f69" : "#cdd6f4";
  }
  return theme === "light" ? "#5c5f77" : "#bac2de";
}
