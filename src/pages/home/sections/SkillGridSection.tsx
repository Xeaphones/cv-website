import { useTranslation } from "react-i18next";

import { CursorWisp } from "@/components/CursorWisp";
import { PageSection } from "@/components/PageSection";

import { SkillAltar } from "./SkillCrystal";
import { FEATURED_SKILLS, SKILL_GRID } from "./skillData";

const CRYSTAL_SKILLS = [...FEATURED_SKILLS, ...SKILL_GRID];

export function SkillGridSection() {
  const { t } = useTranslation();

  return (
    <PageSection id="skills" title={t("skills")} className="relative">
      <CursorWisp />
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center">
        <SkillAltar skills={CRYSTAL_SKILLS} />
      </div>
    </PageSection>
  );
}
