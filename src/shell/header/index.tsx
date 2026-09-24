import { useEffect, useRef, useState } from "react";

import { ThemeToggle } from "@/shared/components/themeToggle";
import { useHomeHeaderVisible, useIsMobile } from "@/lib/hooks";
import { cn } from "@/lib/utils";

import { LanguageSelect } from "./LanguageSelect";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";
import { SiteLogo } from "./SiteLogo";
import styles from "./Header.module.scss";

function setInert(element: Element | null, inert: boolean) {
  if (!(element instanceof HTMLElement)) return;
  if (inert) {
    element.setAttribute("inert", "");
  } else {
    element.removeAttribute("inert");
  }
}

const Header = () => {
  const { isHome, scrolled } = useHomeHeaderVisible();
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const visible = !isHome || scrolled || menuOpen;
  const headerRef = useRef<HTMLElement>(null);
  const extrasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isHome) setMenuOpen(false);
  }, [isHome]);

  useEffect(() => {
    setInert(headerRef.current, !visible);
  }, [visible]);

  useEffect(() => {
    if (!menuOpen) return;

    const targets = [
      document.getElementById("main-content"),
      document.querySelector("footer"),
      document.querySelector("[data-hero-corner]"),
      extrasRef.current,
    ];

    for (const el of targets) setInert(el, true);
    return () => {
      for (const el of targets) setInert(el, false);
    };
  }, [menuOpen]);

  return (
    <>
      {!isHome ? <div className="h-20 w-full shrink-0" aria-hidden /> : null}
      <header
        ref={headerRef}
        className={cn(
          styles.siteHeader,
          "fixed top-0 z-50 flex h-20 w-full items-center justify-between px-4 font-sans min-[801px]:px-10",
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
        <div ref={extrasRef} className="inline-flex gap-2" data-header-extras>
          <LanguageSelect compact={isMobile} />
          <ThemeToggle />
        </div>
      </header>
    </>
  );
};

export default Header;
