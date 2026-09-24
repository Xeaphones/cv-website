import { useTranslation } from "react-i18next";

import { PageSection } from "@/shared/components/PageSection";
import { modCn } from "@/lib/utils";

import { SkillCategoryCard } from "../components/SkillCategoryCard";
import { SKILL_CATEGORIES } from "../data/skillCategories";
import styles from "./DetailedSkillsSection.module.scss";

export function DetailedSkillsSection() {
  const { t } = useTranslation();

  return (
    <PageSection id="skills" title={t("skills")}>
      <div className={modCn(styles, "grid")}>
        {SKILL_CATEGORIES.map((category, index) => (
          <SkillCategoryCard
            key={category.id}
            category={category}
            title={t(category.labelKey)}
            topics={t(category.topicsKey)}
            level={t(category.levelKey)}
            className={modCn(styles, `span-${category.id}`)}
            animationDelay={index * 90}
          />
        ))}
      </div>
    </PageSection>
  );
}
