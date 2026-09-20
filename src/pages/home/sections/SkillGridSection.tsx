import { useTranslation } from "react-i18next";

import { PageSection } from "@/components/PageSection";
import { ThemedIcon } from "@/components/ThemedIcon";
import SkillContainer from "@/components/skillContainer";
import { useIsMobile } from "@/lib/hooks";

import { FEATURED_SKILLS, SKILL_GRID } from "./skillData";

export function SkillGridSection() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <PageSection id="skills" title={t("skills")}>
      <div className="flex min-h-0 flex-1 flex-col justify-center">
        <div className={isMobile ? "flex flex-col gap-4" : "flex justify-center"}>
          {FEATURED_SKILLS.map(({ name, contentKey, icon: Icon, fillVariant }) => (
            <SkillContainer
              key={name}
              name={name}
              content={contentKey ? t(contentKey) : ""}
              icon={fillVariant ? <ThemedIcon icon={Icon} variant={fillVariant} /> : <Icon />}
            />
          ))}
        </div>
        <div className="flex justify-center gap-1.5 min-[801px]:gap-2 flex-wrap">
          {SKILL_GRID.map(({ name, icon: Icon, fillVariant, firstFillNone }) => (
            <SkillContainer
              key={name}
              name={name}
              content=""
              firstFillNone={firstFillNone}
              icon={fillVariant ? <ThemedIcon icon={Icon} variant={fillVariant} /> : <Icon />}
            />
          ))}
        </div>
      </div>
    </PageSection>
  );
}
