import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/themeToggle";
import { useHomeHeaderVisible, useIsMobile } from "@/lib/hooks";
import { cn } from "@/lib/utils";

import { LanguageSelect } from "./LanguageSelect";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";
import { SiteLogo } from "./SiteLogo";
import "./header.scss";

const Header = () => {
  const { isHome, scrolled } = useHomeHeaderVisible();
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const visible = !isHome || scrolled || menuOpen;

  useEffect(() => {
    if (!isHome) setMenuOpen(false);
  }, [isHome]);

  return (
    <header
      className={cn(
        "site-header z-50 flex h-20 w-full items-center justify-between px-10 font-sans",
        isHome ? "fixed top-0" : "sticky top-0",
        visible ? "translate-y-0" : "-translate-y-full pointer-events-none",
        isHome && "transition-transform duration-300 ease-out motion-reduce:transition-none",
      )}
      aria-hidden={!visible}
    >
      {!isMobile && (
        <>
          <SiteLogo />
          <NavLinks />
        </>
      )}
      {isMobile && (
        <MobileMenu
          open={menuOpen}
          onToggle={() => setMenuOpen((open) => !open)}
          onClose={() => setMenuOpen(false)}
        />
      )}
      <div className="inline-flex gap-2">
        <LanguageSelect compact={isMobile} />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
