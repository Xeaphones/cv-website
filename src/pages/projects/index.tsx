import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { PageMeta } from "@/shared/components/PageMeta";
import { PageDivider } from "@/shared/components/PageDivider";
import { PageShell } from "@/shared/components/PageShell";

import { ExperienceTimelineSection } from "./sections/ExperienceTimelineSection";
import { ProjectsGallerySection } from "./sections/ProjectsGallerySection";

export const Projects = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
  }, [hash]);

  return (
    <PageShell id="project">
      <PageMeta page="projects" />
      <ExperienceTimelineSection />
      <PageDivider />
      <ProjectsGallerySection />
    </PageShell>
  );
};
