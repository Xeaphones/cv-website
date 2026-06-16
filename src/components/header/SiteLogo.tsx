import { Link } from "react-router-dom";

import { SITE_NAME } from "@/lib/siteConfig";

type SiteLogoProps = {
  className?: string;
  as?: "h1" | "h2";
};

export function SiteLogo({ className = "text-3xl", as: Tag = "h1" }: SiteLogoProps) {
  return (
    <Tag className={className}>
      <Link to="/">{SITE_NAME}</Link>
    </Tag>
  );
}
