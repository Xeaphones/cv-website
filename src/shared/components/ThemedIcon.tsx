import type { ComponentType, SVGProps } from "react";

import { getIconFill, type IconFillVariant } from "@/lib/iconFill";
import { useResolvedTheme } from "@/lib/hooks";

type ThemedIconProps = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  variant?: IconFillVariant;
} & SVGProps<SVGSVGElement>;

export function ThemedIcon({ icon: Icon, variant = "muted", fill, ...props }: ThemedIconProps) {
  const theme = useResolvedTheme();
  return <Icon fill={fill ?? getIconFill(theme, variant)} {...props} />;
}
