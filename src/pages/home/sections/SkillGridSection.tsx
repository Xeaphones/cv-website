import { useTranslation } from "react-i18next";

import { PageSection } from "@/shared/components/PageSection";

import { CursorWisp } from "../components/CursorWisp";
import { SkillAltar } from "../components/SkillAltar";
import { FEATURED_SKILLS, SKILL_GRID } from "../data/skillData";

const CRYSTAL_SKILLS = [...FEATURED_SKILLS, ...SKILL_GRID];

export function SkillGridSection() {
  const { t } = useTranslation();

  return (
    <PageSection id="skills" title={t("skills")} className="relative !m-0">
      <CursorWisp />
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center">
        <SkillAltar skills={CRYSTAL_SKILLS} />
      </div>
    </PageSection>
  );
}
