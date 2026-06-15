import { FiMenu } from "react-icons/fi";

import { NavLinks } from "./NavLinks";
import { SiteLogo } from "./SiteLogo";

type MobileMenuProps = {
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
};

export function MobileMenu({ open, onToggle, onClose }: MobileMenuProps) {
  return (
    <div className="flex gap-5">
      <button
        type="button"
        className="hamburger-icon"
        aria-expanded={open}
        aria-label="Toggle navigation menu"
        onClick={onToggle}
      >
        <FiMenu size={30} />
      </button>
      {open && (
        <NavLinks
          orientation="vertical"
          className="header-mobile"
          linkClassName="text-2xl"
          onNavigate={onClose}
        />
      )}
      <SiteLogo as="h2" className="text-2xl" />
    </div>
  );
}
