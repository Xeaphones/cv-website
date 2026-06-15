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
      <div className="flex flex-col">
        <div className={isMobile ? "flex justify-center flex-col" : "flex justify-center"}>
          {FEATURED_SKILLS.map(({ name, contentKey, icon: Icon, fillVariant }) => (
            <SkillContainer
              key={name}
              name={name}
              content={contentKey ? t(contentKey) : ""}
              icon={fillVariant ? <ThemedIcon icon={Icon} variant={fillVariant} /> : <Icon />}
            />
          ))}
        </div>
        <div className="flex justify-center gap-2 flex-wrap">
          {SKILL_GRID.map(({ name, icon: Icon, fillVariant }) => (
            <SkillContainer
              key={name}
              name={name}
              content=""
              icon={fillVariant ? <ThemedIcon icon={Icon} variant={fillVariant} /> : <Icon />}
            />
          ))}
        </div>
      </div>
    </PageSection>
  );
}
