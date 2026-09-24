import { useTheme } from "@/shared/components/themeProvider";

export type ResolvedTheme = "light" | "dark";

export function useResolvedTheme(): ResolvedTheme {
  const { theme } = useTheme();

  if (theme === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  return theme;
}
