import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { blogProjectUrl } from "@/lib/blog";
import { useLocalePath } from "@/lib/hooks";

type ProjectBreadcrumbProps = {
  project: string;
};

export function ProjectBreadcrumb({ project }: ProjectBreadcrumbProps) {
  const { t } = useTranslation();
  const localize = useLocalePath();

  return (
    <nav aria-label={t("breadcrumb")} className="mb-4 font-sans text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link to={localize("/blog")} className="transition-colors hover:text-foreground">
            {t("blog")}
          </Link>
        </li>
        <li aria-hidden className="text-muted-foreground/60">
          /
        </li>
        <li>
          <Link
            to={localize(blogProjectUrl(project))}
            className="transition-colors hover:text-foreground"
          >
            {project}
          </Link>
        </li>
      </ol>
    </nav>
  );
}

/** @deprecated Use ProjectBreadcrumb */
export const WriteupBreadcrumb = ProjectBreadcrumb;
