import { Link } from "react-router-dom";

import { useGoHomeTop } from "@/lib/hooks";
import { SITE_NAME } from "@/lib/siteConfig";

type SiteLogoProps = {
  className?: string;
  as?: "h1" | "h2" | "p" | "div";
};

export function SiteLogo({ className = "text-3xl", as: Tag = "p" }: SiteLogoProps) {
  const { homePath, goHomeTop } = useGoHomeTop();

  return (
    <Tag className={className}>
      <Link to={homePath} onClick={goHomeTop}>
        {SITE_NAME}
      </Link>
    </Tag>
  );
}
