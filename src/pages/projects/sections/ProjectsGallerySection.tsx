import { useTranslation } from "react-i18next";

import { MarkdownContent } from "@/components/MarkdownContent";
import { PageSection } from "@/components/PageSection";
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

type ProjectSection = {
  title: string;
  content: string;
};

function buildImageSources(src: string) {
  const base = src.replace(/\.[^.]+$/, "");
  return {
    avif: `${base}.avif`,
    webp: `${base}.webp`,
    fallback: src,
  };
}

function extractProjectSections(content: string): ProjectSection[] {
  const lines = content.split("\n");
  const sections: ProjectSection[] = [];
  let currentTitle: string | null = null;
  let currentContent: string[] = [];

  for (const line of lines) {
    const heading = line.match(/^##\s+(.+)$/);
    if (heading) {
      if (currentTitle) {
        sections.push({
          title: currentTitle,
          content: currentContent.join("\n").trim(),
        });
      }
      currentTitle = heading[1].trim();
      currentContent = [];
      continue;
    }

    if (currentTitle) {
      currentContent.push(line);
    }
  }

  if (currentTitle) {
    sections.push({
      title: currentTitle,
      content: currentContent.join("\n").trim(),
    });
  }

  return sections.filter((section) => section.content.length > 0);
}

function ProjectCard({ name, imageSrc, imageAlt }: { name: string; imageSrc: string; imageAlt: string }) {
  const sources = buildImageSources(imageSrc);

  return (
    <div className="group overflow-hidden rounded-lg border border-border/60 bg-card/30 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
      <div className="aspect-[4/3] overflow-hidden bg-background2/60">
        <picture>
          <source srcSet={sources.avif} type="image/avif" />
          <source srcSet={sources.webp} type="image/webp" />
          <img
            src={sources.fallback}
            alt={imageAlt}
            width={952}
            height={523}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </picture>
      </div>
      <p className="truncate px-3 py-2 text-sm font-medium text-foreground">{name}</p>
    </div>
  );
}

function ProjectDialog({ project }: { project: Project }) {
  const { t } = useTranslation();
  const sources = buildImageSources(project.thumbnail);
  const markdownSections = extractProjectSections(project.content);
  const fallbackSections: ProjectSection[] = [
    { title: t("objectives"), content: project.objectives ?? "" },
    {
      title: t("keyElements"),
      content:
        project.keyElements.length > 0
          ? project.keyElements.map((item: string) => `- ${item}`).join("\n")
          : "",
    },
    { title: t("resume"), content: project.conclusion ?? "" },
  ].filter((section) => section.content.trim().length > 0);
  const sections = markdownSections.length > 0 ? markdownSections : fallbackSections;

  return (
    <DialogContent
      className="max-h-[90vh] w-[95vw] max-w-4xl overflow-y-auto border-border/60 bg-background2 p-0 sm:rounded-xl"
      closeButtonClassName="right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/55 p-0 text-white opacity-100 backdrop-blur-sm hover:bg-black/70 focus:ring-white/70 sm:right-4 sm:top-4"
    >
      <div className="overflow-hidden rounded-t-xl border-b border-border/60 bg-card/20">
        <picture>
          <source srcSet={sources.avif} type="image/avif" />
          <source srcSet={sources.webp} type="image/webp" />
          <img
            src={sources.fallback}
            alt={project.title}
            width={952}
            height={523}
            loading="eager"
            decoding="async"
            className="h-44 w-full object-cover sm:h-56"
          />
        </picture>
      </div>
      <DialogHeader className="space-y-6 p-5 sm:p-7">
        <div className="mx-auto w-full max-w-3xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <DialogTitle className="text-2xl font-semibold leading-tight text-primary sm:text-3xl">
              {project.title}
            </DialogTitle>
            {project.technologies.length > 0 && (
              <div className="flex flex-wrap justify-start gap-2 sm:max-w-[55%] sm:justify-end">
                {project.technologies.map((tech: string) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 rounded-full border border-primary/35 bg-primary/10 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-primary"
                  >
                    {(() => {
                      const Icon = TECHNOLOGY_ICONS[tech as keyof typeof TECHNOLOGY_ICONS];
                      return Icon ? <Icon className="h-3.5 w-3.5" /> : null;
                    })()}
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
          <DialogDescription className="mt-2 text-base leading-relaxed">{project.label}</DialogDescription>
        </div>

        {sections.map((section) => (
          <section
            key={section.title}
            className="mx-auto w-full max-w-3xl rounded-lg border border-border/50 bg-card/20 p-4 sm:p-5"
          >
            <h3 className="text-base font-semibold text-primary">{section.title}</h3>
            <div className="mt-2">
              <MarkdownContent
                content={section.content}
                className="prose max-w-none blog-prose dark:prose-invert [&_p]:my-0 [&_ul]:my-0"
              />
            </div>
          </section>
        ))}
      </DialogHeader>
    </DialogContent>
  );
}

export function ProjectsGallerySection() {
  const { t } = useTranslation();
  const projects = useProjects();

  return (
    <PageSection id="projects" title={t("projects")}>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {projects.map((project) => (
          <Dialog key={project.slug}>
            <DialogTrigger>
              <ProjectCard name={project.title} imageSrc={project.thumbnail} imageAlt={project.title} />
            </DialogTrigger>
            <ProjectDialog project={project} />
          </Dialog>
        ))}
      </div>
    </PageSection>
  );
}
