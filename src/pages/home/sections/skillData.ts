import type { ComponentType, SVGProps } from "react";

import {
  BDD,
  Cpp,
  Css,
  Docker,
  Figma,
  Git,
  Go,
  Heroku,
  Html5,
  JavaScript,
  Linux,
  MongoDB,
  NPM,
  NodeJS,
  PHP,
  Python,
  ReactTSX,
  Rust,
  Scss,
  Trello,
  TypeScript,
  Unity,
  UnrealEngine,
  Vite,
  VsCode,
  VsStudio,
  Wordpress,
  Kubernetes,
  Gitlab,
  Jenkins,
  Laravel,
  Flutter,
  MQTT,
  RaspberryPi,
  AWS,
  Kotlin,
  Android,
  RabbitMQ,
} from "@/assets/svg";
import type { IconFillVariant } from "@/lib/iconFill";

export type HomeSkillEntry = {
  name: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  contentKey?: string;
  fillVariant?: IconFillVariant;
  firstFillNone?: boolean;
};

export const FEATURED_SKILLS: HomeSkillEntry[] = [
  { name: "React", contentKey: "react", icon: ReactTSX },
  { name: "Rust", contentKey: "rust", icon: Rust, fillVariant: "dark" },
  { name: "Unity", contentKey: "unity", icon: Unity, fillVariant: "muted" },
];

export const SKILL_GRID: HomeSkillEntry[] = [
  { name: "TypeScript", icon: TypeScript },
  { name: "Javascript", icon: JavaScript },
  { name: "NodeJS", icon: NodeJS },
  { name: "Html5", icon: Html5 },
  { name: "CSS", icon: Css },
  { name: "SCSS", icon: Scss },
  { name: "Visual Studio Code", icon: VsCode },
  { name: "Visual Studio", icon: VsStudio },
  { name: "Git", icon: Git },
  { name: "Gitlab", icon: Gitlab },
  { name: "NPM", icon: NPM },
  { name: "Docker", icon: Docker },
  { name: "Kubernetes", icon: Kubernetes, firstFillNone: true },
  { name: "Heroku", icon: Heroku },
  { name: "AWS", icon: AWS },
  { name: "Jenkins", icon: Jenkins },
  { name: "Wordpress", icon: Wordpress },
  { name: "Trello", icon: Trello },
  { name: "Figma", icon: Figma },
  { name: "C++", icon: Cpp },
  { name: "Linux", icon: Linux, fillVariant: "dark" },
  { name: "PHP", icon: PHP, fillVariant: "dark" },
  { name: "Laravel", icon: Laravel },
  { name: "Databases", icon: BDD, fillVariant: "dark" },
  { name: "MongoDB", icon: MongoDB },
  { name: "Python", icon: Python },
  { name: "Unreal Engine", icon: UnrealEngine, fillVariant: "dark" },
  { name: "Vite", icon: Vite },
  { name: "Go", icon: Go },
  { name: "Flutter", icon: Flutter },
  { name: "Kotlin", icon: Kotlin },
  { name: "Android", icon: Android },
  { name: "MQTT", icon: MQTT },
  { name: "RabbitMQ", icon: RabbitMQ },
  { name: "Raspberry Pi", icon: RaspberryPi },
];
