import { useState } from "react";

import { ThemeToggle } from "@/components/themeToggle";
import { useIsMobile } from "@/lib/hooks";

import { LanguageSelect } from "./LanguageSelect";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";
import { SiteLogo } from "./SiteLogo";
import "./header.scss";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <header className="site-header sticky top-0 z-50 flex h-20 w-full items-center justify-between px-10 font-mono">
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
