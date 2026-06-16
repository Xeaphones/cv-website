import { PageMeta } from "@/components/PageMeta";
import { PageDivider } from "@/components/PageDivider";
import { PageShell } from "@/components/PageShell";

import { ExperienceTimelineSection } from "./sections/ExperienceTimelineSection";
import { ProjectsGallerySection } from "./sections/ProjectsGallerySection";
import "./projects.scss";

export const Projects = () => (
  <PageShell id="project">
    <PageMeta page="projects" />
    <ExperienceTimelineSection />
    <PageDivider />
    <ProjectsGallerySection />
  </PageShell>
);
