import { useEffect, useId, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FiMenu, FiX } from "react-icons/fi";

import styles from "./Header.module.scss";
import { NavLinks } from "./NavLinks";
import { SiteLogo } from "./SiteLogo";

type MobileMenuProps = {
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
};

function setInert(element: HTMLElement | null, inert: boolean) {
  if (!element) return;
  if (inert) {
    element.setAttribute("inert", "");
  } else {
    element.removeAttribute("inert");
  }
}

export function MobileMenu({ open, onToggle, onClose }: MobileMenuProps) {
  const { t } = useTranslation();
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const logoWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInert(logoWrapRef.current, open);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const focusables = () =>
      panel
        ? Array.from(
            panel.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
            ),
          )
        : [];

    const first = focusables()[0];
    first?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panel) return;
      const items = focusables();
      if (items.length === 0) return;
      const firstItem = items[0];
      const lastItem = items[items.length - 1];
      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus?.();
      buttonRef.current?.focus();
    };
  }, [open, onClose]);

  return (
    <div className="flex gap-5">
      <button
        ref={buttonRef}
        type="button"
        className="hamburger-icon"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={open ? t("menuClose") : t("menuOpen")}
        onClick={onToggle}
      >
        {open ? <FiX size={30} aria-hidden /> : <FiMenu size={30} aria-hidden />}
      </button>
      {open ? (
        <div ref={panelRef} id={menuId} role="dialog" aria-modal="true" aria-label={t("menuLabel")}>
          <NavLinks
            orientation="vertical"
            className={styles.headerMobile}
            linkClassName="text-2xl"
            onNavigate={onClose}
          />
        </div>
      ) : null}
      <div ref={logoWrapRef}>
        <SiteLogo as="p" className="text-2xl" />
      </div>
    </div>
  );
}
