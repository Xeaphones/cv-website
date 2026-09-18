import { useTranslation } from "react-i18next";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LANGUAGES } from "@/assets/config";
import { useLanguageAwareNavigation } from "@/lib/hooks";

type LanguageSelectProps = {
  compact?: boolean;
};

export function LanguageSelect({ compact }: LanguageSelectProps) {
  const { i18n, t } = useTranslation();
  const { changeLanguage } = useLanguageAwareNavigation();

  return (
    <Select value={i18n.language} onValueChange={changeLanguage}>
      <SelectTrigger className={compact ? "w-[70px] bg-background" : "w-[120px] bg-background"}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {LANGUAGES.map(({ code, label }) => (
          <SelectItem key={code} value={code}>
            {compact ? t(code) : t(label)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
