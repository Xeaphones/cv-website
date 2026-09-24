import type { ComponentType, SVGProps } from "react";
import {
  Cloud,
  Code2,
  Cpu,
  Gamepad2,
  Server,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

import {
  Android,
  Angular,
  Ansible,
  AWS,
  BDD,
  Cpp,
  Csharp,
  Css,
  Docker,
  ESP32,
  Expo,
  Express,
  Figma,
  Flutter,
  Git,
  Gitlab,
  Go,
  Html5,
  Java,
  JavaScript,
  Jenkins,
  Kubernetes,
  Laravel,
  Linux,
  MongoDB,
  MQTT,
  Nginx,
  NodeJS,
  PHP,
  Proxmox,
  Python,
  RabbitMQ,
  RaspberryPi,
  ReactNative,
  ReactTSX,
  Rust,
  Scss,
  SpringBoot,
  TypeScript,
  Unity,
  UnrealEngine,
  Vite,
} from "@/assets/svg";
import { Astro, Bash, Grafana, InfluxDB, Lua, Moodle } from "@/assets/svg/extras";
import type { IconFillVariant } from "@/lib/iconFill";

export type SkillChip = {
  name: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  fillVariant?: IconFillVariant;
  firstFillNone?: boolean;
};

export type SkillCategoryAccent = "blue" | "teal" | "green" | "pink" | "peach" | "lavender";

export type SkillCategory = {
  id: string;
  labelKey: string;
  topicsKey: string;
  levelKey: string;
  percent: number;
  accent: SkillCategoryAccent;
  icon: LucideIcon;
  skills: SkillChip[];
};

/** Profile skill domains aligned with the French CV. */
export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "backend",
    labelKey: "skillCategoryBackend",
    topicsKey: "skillTopicsBackend",
    levelKey: "skillLevelBackend",
    percent: 90,
    accent: "green",
    icon: Server,
    skills: [
      { name: "Python", icon: Python },
      { name: "Go", icon: Go },
      { name: "Rust", icon: Rust, fillVariant: "muted" },
      { name: "Node.js", icon: NodeJS },
      { name: "Express", icon: Express, fillVariant: "dark" },
      { name: "Java", icon: Java },
      { name: "Spring Boot", icon: SpringBoot },
      { name: "PHP", icon: PHP, fillVariant: "dark" },
      { name: "Laravel", icon: Laravel },
      { name: "Moodle", icon: Moodle },
      { name: "SQL", icon: BDD, fillVariant: "dark" },
      { name: "MongoDB", icon: MongoDB },
      { name: "InfluxDB", icon: InfluxDB },
      { name: "RabbitMQ", icon: RabbitMQ },
    ],
  },
  {
    id: "frontend",
    labelKey: "skillCategoryFrontend",
    topicsKey: "skillTopicsFrontend",
    levelKey: "skillLevelFrontend",
    percent: 92,
    accent: "teal",
    icon: Code2,
    skills: [
      { name: "React", icon: ReactTSX },
      { name: "Angular", icon: Angular },
      { name: "Astro", icon: Astro },
      { name: "HTML5", icon: Html5 },
      { name: "CSS", icon: Css },
      { name: "JavaScript", icon: JavaScript },
      { name: "TypeScript", icon: TypeScript },
      { name: "SCSS", icon: Scss },
      { name: "Vite", icon: Vite },
      { name: "Figma", icon: Figma },
    ],
  },
  {
    id: "app",
    labelKey: "skillCategoryApp",
    topicsKey: "skillTopicsApp",
    levelKey: "skillLevelApp",
    percent: 78,
    accent: "blue",
    icon: Smartphone,
    skills: [
      { name: "Expo", icon: Expo, fillVariant: "dark" },
      { name: "React Native", icon: ReactNative },
      { name: "Flutter", icon: Flutter },
      { name: "Android", icon: Android },
    ],
  },
  {
    id: "cloud",
    labelKey: "skillCategoryCloud",
    topicsKey: "skillTopicsCloud",
    levelKey: "skillLevelCloud",
    percent: 88,
    accent: "peach",
    icon: Cloud,
    skills: [
      { name: "Linux", icon: Linux, fillVariant: "dark" },
      { name: "Bash", icon: Bash },
      { name: "Docker", icon: Docker },
      { name: "Kubernetes", icon: Kubernetes, firstFillNone: true },
      { name: "Proxmox", icon: Proxmox },
      { name: "AWS", icon: AWS },
      { name: "Nginx", icon: Nginx },
      { name: "Grafana", icon: Grafana },
      { name: "Git", icon: Git },
      { name: "GitLab", icon: Gitlab },
      { name: "Ansible", icon: Ansible, fillVariant: "dark" },
      { name: "Jenkins", icon: Jenkins },
    ],
  },
  {
    id: "iot",
    labelKey: "skillCategoryIot",
    topicsKey: "skillTopicsIot",
    levelKey: "skillLevelIot",
    percent: 75,
    accent: "lavender",
    icon: Cpu,
    skills: [
      { name: "MQTT", icon: MQTT },
      { name: "Raspberry Pi", icon: RaspberryPi },
      { name: "ESP32", icon: ESP32 },
    ],
  },
  {
    id: "gamedev",
    labelKey: "skillCategoryGame",
    topicsKey: "skillTopicsGame",
    levelKey: "skillLevelGame",
    percent: 70,
    accent: "pink",
    icon: Gamepad2,
    skills: [
      { name: "Unity", icon: Unity, fillVariant: "muted" },
      { name: "Unreal Engine", icon: UnrealEngine, fillVariant: "muted" },
      { name: "C#", icon: Csharp },
      { name: "C++", icon: Cpp },
      { name: "Lua", icon: Lua },
    ],
  },
];
