import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Input } from "@/components/ui/input";

type BlogSearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function BlogSearchBar({ value, onChange }: BlogSearchBarProps) {
  const { t } = useTranslation();

  return (
    <div className="relative">
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
      <Input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={t("blogSearchPlaceholder")}
        aria-label={t("blogSearchPlaceholder")}
        className="pl-9"
      />
    </div>
  );
}
