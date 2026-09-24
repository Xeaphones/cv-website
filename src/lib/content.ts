import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type {
  ExperiencesEn,
  ExperiencesFr,
  FormationsEn,
  FormationsFr,
  ProjectsEn,
  ProjectsFr,
} from "content-collections";
import {
  allExperiencesEns,
  allExperiencesFrs,
  allFormationsEns,
  allFormationsFrs,
  allProjectsEns,
  allProjectsFrs,
} from "content-collections";

export type Locale = "fr" | "en";
export type Experience = ExperiencesFr | ExperiencesEn;
export type Formation = FormationsFr | FormationsEn;
export type Project = ProjectsFr | ProjectsEn;

export function getLocale(language: string): Locale {
  return language.startsWith("fr") ? "fr" : "en";
}

export function getExperiences(locale: Locale): Experience[] {
  const experiences = locale === "fr" ? allExperiencesFrs : allExperiencesEns;
  return [...experiences].sort((a, b) => a.order - b.order);
}

export function getProjects(locale: Locale): Project[] {
  const projects = locale === "fr" ? allProjectsFrs : allProjectsEns;
  return [...projects].sort((a, b) => a.order - b.order);
}

export function getFormations(locale: Locale): Formation[] {
  const formations = locale === "fr" ? allFormationsFrs : allFormationsEns;
  return [...formations].sort((a, b) => a.order - b.order);
}

export function useContentLocale(): Locale {
  const { i18n } = useTranslation();
  return getLocale(i18n.language);
}

export function useExperiences(): Experience[] {
  const locale = useContentLocale();
  return useMemo(() => getExperiences(locale), [locale]);
}

export function useProjects(): Project[] {
  const locale = useContentLocale();
  return useMemo(() => getProjects(locale), [locale]);
}

export function useFormations(): Formation[] {
  const locale = useContentLocale();
  return useMemo(() => getFormations(locale), [locale]);
}
