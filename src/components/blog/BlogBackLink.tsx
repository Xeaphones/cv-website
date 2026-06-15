import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

type BlogBackLinkProps = {
  to?: string;
};

export function BlogBackLink({ to = "/blog" }: BlogBackLinkProps) {
  const { t } = useTranslation();

  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      <ArrowLeft className="h-4 w-4" aria-hidden />
      {t("backToBlog")}
    </Link>
  );
}
