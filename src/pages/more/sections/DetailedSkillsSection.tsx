import type { ComponentType, SVGProps } from "react";
import { useTranslation } from "react-i18next";

import { PageSection } from "@/components/PageSection";
import { ThemedIcon } from "@/components/ThemedIcon";
import SkillBar from "@/components/skillBar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Docker,
  Git,
  Linux,
  NodeJS,
  PHP,
  Python,
  ReactTSX,
  Rust,
  TypeScript,
  Unity,
  UnrealEngine,
  VMware,
  Web,
  Windows,
  Wordpress,
} from "@/assets/svg";
import type { IconFillVariant } from "@/lib/iconFill";

type SkillBarEntry = {
  name: string;
  percent: number;
  color?: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  fillVariant?: IconFillVariant;
};

type SkillCategory = {
  id: string;
  labelKey: string;
  skills: SkillBarEntry[];
};

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "item-1",
    labelKey: "skillCategoryWeb",
    skills: [
      { name: "HTML/CSS/JS", percent: 100, color: "green", icon: Web, fillVariant: "muted" },
      { name: "Typescript", percent: 80, color: "hsl(var(--primary))", icon: TypeScript },
      { name: "React", percent: 96, color: "hsl(var(--primary))", icon: ReactTSX },
      { name: "NodeJS", percent: 100, color: "green", icon: NodeJS },
      { name: "PHP", percent: 80, color: "hsl(var(--primary))", icon: PHP, fillVariant: "dark" },
      { name: "Wordpress", percent: 50, color: "orange", icon: Wordpress },
    ],
  },
  {
    id: "item-2",
    labelKey: "skillCategoryEnvironment",
    skills: [
      { name: "Windows", percent: 70, color: "hsl(var(--primary))", icon: Windows },
      { name: "Windows Server", percent: 70, color: "hsl(var(--primary))", icon: Windows },
      { name: "Linux", percent: 90, color: "hsl(var(--primary))", icon: Linux, fillVariant: "dark" },
      { name: "VMWare", percent: 86, color: "hsl(var(--primary))", icon: VMware },
      { name: "Docker", percent: 90, color: "hsl(var(--primary))", icon: Docker },
      { name: "Git", percent: 100, color: "green", icon: Git },
    ],
  },
  {
    id: "item-3",
    labelKey: "skillCategoryApplication",
    skills: [
      { name: "Python", percent: 100, color: "green", icon: Python },
      { name: "Unity & C#", percent: 75, color: "hsl(var(--primary))", icon: Unity, fillVariant: "muted" },
      { name: "Unreal Engine & C++", percent: 40, color: "orange", icon: UnrealEngine, fillVariant: "muted" },
      { name: "Rust", percent: 45, color: "orange", icon: Rust, fillVariant: "muted" },
    ],
  },
];

export function DetailedSkillsSection() {
  const { t } = useTranslation();

  return (
    <PageSection id="skills" title={t("skills")}>
      <Accordion type="multiple" defaultValue={SKILL_CATEGORIES.map((category) => category.id)}>
        {SKILL_CATEGORIES.map((category) => (
          <AccordionItem key={category.id} value={category.id} className="mb-10">
            <AccordionTrigger className="AccordionTrigger text-xl">{t(category.labelKey)}</AccordionTrigger>
            <AccordionContent className="flex flex-wrap gap-10">
              {category.skills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  percent={skill.percent}
                  color={skill.color}
                  animationDelay={index * 60}
                  icon={
                    Icon ? (
                      skill.fillVariant ? (
                        <ThemedIcon icon={Icon} variant={skill.fillVariant} />
                      ) : (
                        <Icon />
                      )
                    ) : undefined
                  }
                />
              )})}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </PageSection>
  );
}
