import type { CSSProperties } from "react";

import { ThemedIcon } from "@/shared/components/ThemedIcon";
import { cn, modCn } from "@/lib/utils";

import type { SkillCategory } from "../../data/skillCategories";
import styles from "./SkillCategoryCard.module.scss";

type SkillCategoryCardProps = {
  category: SkillCategory;
  title: string;
  topics: string;
  level: string;
  className?: string;
  animationDelay?: number;
};

export function SkillCategoryCard({
  category,
  title,
  topics,
  level,
  className,
  animationDelay = 0,
}: SkillCategoryCardProps) {
  const Icon = category.icon;

  return (
    <article
      className={cn(modCn(styles, "card"), styles[`accent-${category.accent}`], className)}
      style={{ "--skill-delay": `${animationDelay}ms` } as CSSProperties}
    >
      <header className={modCn(styles, "header")}>
        <span className={modCn(styles, "badge")} aria-hidden>
          <Icon className={modCn(styles, "badgeIcon")} strokeWidth={1.75} />
        </span>
        <div className={modCn(styles, "titles")}>
          <h3 className={modCn(styles, "title")}>{title}</h3>
          <p className={modCn(styles, "topics")}>{topics}</p>
        </div>
      </header>

      <div className={modCn(styles, "meter")}>
        <div className={modCn(styles, "meter-container")}>
        <div className={modCn(styles, "track")} aria-hidden>
          <div
            className={modCn(styles, "fill")}
            style={{ width: `${category.percent}%` }}
          />
        </div>
        <span className={modCn(styles, "percent")}>{category.percent}%</span>
        </div>
        <p className={modCn(styles, "level")}>{level}</p>
      </div>
      <span className="sr-only">
        {title}: {level} ({category.percent}%)
      </span>

      <ul className={modCn(styles, "chips")}>
        {category.skills.map((skill) => {
          const SkillIcon = skill.icon;
          return (
            <li key={skill.name} className={modCn(styles, "chip")}>
              <span
                className={cn(
                  modCn(styles, "chipIcon"),
                  skill.firstFillNone && modCn(styles, "chipIconBare"),
                )}
              >
                {skill.fillVariant ? (
                  <ThemedIcon icon={SkillIcon} variant={skill.fillVariant} />
                ) : (
                  <SkillIcon />
                )}
              </span>
              <span>{skill.name}</span>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
