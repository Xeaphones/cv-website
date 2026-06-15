import { useTranslation } from "react-i18next";

import { MarkdownContent, TechnologyIcons } from "@/components/MarkdownContent";
import { PageSection } from "@/components/PageSection";
import { useIsMobile } from "@/lib/hooks";
import { useProjects, type Project } from "@/lib/content";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Figma, Go, ReactTSX } from "@/assets/svg";

const TECHNOLOGY_ICONS = {
  react: ReactTSX,
  go: Go,
  figma: Figma,
} as const;

function ProjectCard({ name, imageSrc, imageAlt }: { name: string; imageSrc: string; imageAlt: string }) {
  return (
    <div className="thumbnail">
      <img src={imageSrc} alt={imageAlt} />
      <div className="content">
        <p>{name}</p>
      </div>
    </div>
  );
}

function ProjectDialog({ project }: { project: Project }) {
  const { t } = useTranslation();

  return (
    <DialogContent className="max-w-[80%!important]">
      <DialogHeader>
        <DialogTitle className="text-primary text-4xl">{project.title}</DialogTitle>
        <DialogDescription className="text-2xl mb-[1rem!important]">{project.label}</DialogDescription>
        <DialogDescription className="text-primary text-2xl">{t("objectives")}</DialogDescription>
        <DialogDescription>{project.objectives}</DialogDescription>
        <DialogDescription className="text-primary text-2xl">{t("technologies")}</DialogDescription>
        <TechnologyIcons technologies={project.technologies} iconMap={TECHNOLOGY_ICONS} />
        <DialogDescription className="text-primary text-2xl">{t("keyElements")}</DialogDescription>
        <ul className="text-base text-muted-foreground gap-2 flex flex-col">
          {project.keyElements.map((item: string) => (
            <li key={item} className="text-center break-words">
              {item}
            </li>
          ))}
        </ul>
        <DialogDescription className="text-primary text-2xl">{t("resume")}</DialogDescription>
        <DialogDescription>{project.conclusion}</DialogDescription>
        {project.content.trim() && (
          <MarkdownContent content={project.content} className="prose prose-invert max-w-none text-sm" />
        )}
      </DialogHeader>
    </DialogContent>
  );
}

export function ProjectsGallerySection() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const projects = useProjects();

  return (
    <PageSection id="projects" title={t("projects")}>
      <div className="flex flex-wrap gap-6">
        {projects.map((project) => (
          <Dialog key={project.slug}>
            <DialogTrigger className={!isMobile ? "w-[20%]" : undefined}>
              <ProjectCard name={project.title} imageSrc={project.thumbnail} imageAlt={project.title} />
            </DialogTrigger>
            <ProjectDialog project={project} />
          </Dialog>
        ))}
      </div>
    </PageSection>
  );
}
