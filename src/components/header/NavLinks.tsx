import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { HEADER_ROUTES } from "./routes";

function isNavLinkActive(link: string, pathname: string): boolean {
  if (link === "/") {
    return pathname === "/";
  }

  return pathname === link || pathname.startsWith(`${link}/`);
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

  return (
    <NavigationMenu orientation={orientation === "vertical" ? "vertical" : undefined} className={className}>
      <NavigationMenuList className={orientation === "vertical" ? "flex-col" : undefined}>
        {HEADER_ROUTES.map(({ link, labelKey }) => (
          <NavigationMenuItem key={link}>
            <Link to={link} className={linkClassName} onClick={onNavigate}>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                data-current={isNavLinkActive(link, pathname) ? "current" : undefined}
              >
                {t(labelKey)}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
