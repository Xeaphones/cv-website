import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useLocalePath } from "@/lib/hooks";
import { stripLocalePrefix } from "@/lib/locale";
import { cn } from "@/lib/utils";

import { HEADER_ROUTES } from "./routes";

function isNavLinkActive(link: string, pathname: string): boolean {
  const bare = stripLocalePrefix(pathname);
  if (link === "/") {
    return bare === "/";
  }
  return bare === link || bare.startsWith(`${link}/`);
}

type NavLinksProps = {
  orientation?: "horizontal" | "vertical";
  className?: string;
  linkClassName?: string;
  onNavigate?: () => void;
};

export function NavLinks({
  orientation = "horizontal",
  className,
  linkClassName,
  onNavigate,
}: NavLinksProps) {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const localize = useLocalePath();

  return (
    <NavigationMenu orientation={orientation === "vertical" ? "vertical" : undefined} className={className}>
      <NavigationMenuList className={orientation === "vertical" ? "flex-col" : undefined}>
        {HEADER_ROUTES.map(({ link, labelKey }) => {
          const active = isNavLinkActive(link, pathname);

          return (
            <NavigationMenuItem key={link}>
              <NavigationMenuLink asChild>
                <Link
                  to={localize(link)}
                  className={cn(navigationMenuTriggerStyle(), linkClassName)}
                  onClick={onNavigate}
                  data-current={active ? "current" : undefined}
                  aria-current={active ? "page" : undefined}
                >
                  {t(labelKey)}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
