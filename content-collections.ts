import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";

const markdownDoc = z.object({
  content: z.string(),
});

const blogSchema = markdownDoc.extend({
  title: z.string(),
  summary: z.string(),
  date: z.coerce.date(),
  fr: z.string(),
  en: z.string(),
  draft: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  theme: z.url().optional(),
  project: z.string().optional(),
});

const experienceSchema = markdownDoc.extend({
  title: z.string(),
  dateLabel: z.string(),
  order: z.number(),
  company: z.string().optional(),
  companyUrl: z.string().url().optional(),
  location: z.string().optional(),
  summary: z.string().optional(),
  bullets: z.array(z.string()).default([]),
});

const projectSchema = markdownDoc.extend({
  title: z.string(),
  label: z.string(),
  order: z.number().default(0),
  thumbnail: z.string(),
  technologies: z.array(z.string()).default([]),
  objectives: z.string().optional().default(""),
  keyElements: z.array(z.string()).default([]),
  conclusion: z.string().optional().default(""),
});

const formationSchema = markdownDoc.extend({
  title: z.string(),
  dateLabel: z.string(),
  order: z.number(),
  location: z.string().optional(),
  bullets: z.array(z.string()).default([]),
});

function withSlug<T extends { _meta: { fileName: string } }>(doc: T) {
  return {
    ...doc,
    slug: doc._meta.fileName.replace(/\.md$/, ""),
  };
}

const blogPostsFr = defineCollection({
  name: "blogPostsFr",
  directory: "content/blog/posts/fr",
  include: "**/*.md",
  schema: blogSchema,
  transform: withSlug,
});

const blogPostsEn = defineCollection({
  name: "blogPostsEn",
  directory: "content/blog/posts/en",
  include: "**/*.md",
  schema: blogSchema,
  transform: withSlug,
});

const blogWriteupsFr = defineCollection({
  name: "blogWriteupsFr",
  directory: "content/blog/writeups/fr",
  include: "**/*.md",
  schema: blogSchema,
  transform: withSlug,
});

const blogWriteupsEn = defineCollection({
  name: "blogWriteupsEn",
  directory: "content/blog/writeups/en",
  include: "**/*.md",
  schema: blogSchema,
  transform: withSlug,
});

const experiencesFr = defineCollection({
  name: "experiencesFr",
  directory: "content/experiences/fr",
  include: "**/*.md",
  schema: experienceSchema,
  transform: withSlug,
});

const experiencesEn = defineCollection({
  name: "experiencesEn",
  directory: "content/experiences/en",
  include: "**/*.md",
  schema: experienceSchema,
  transform: withSlug,
});

const projectsFr = defineCollection({
  name: "projectsFr",
  directory: "content/projects/fr",
  include: "**/*.md",
  schema: projectSchema,
  transform: withSlug,
});

const projectsEn = defineCollection({
  name: "projectsEn",
  directory: "content/projects/en",
  include: "**/*.md",
  schema: projectSchema,
  transform: withSlug,
});

const formationsFr = defineCollection({
  name: "formationsFr",
  directory: "content/formations/fr",
  include: "**/*.md",
  schema: formationSchema,
  transform: withSlug,
});

const formationsEn = defineCollection({
  name: "formationsEn",
  directory: "content/formations/en",
  include: "**/*.md",
  schema: formationSchema,
  transform: withSlug,
});

export default defineConfig({
  content: [
    blogPostsFr,
    blogPostsEn,
    blogWriteupsFr,
    blogWriteupsEn,
    experiencesFr,
    experiencesEn,
    projectsFr,
    projectsEn,
    formationsFr,
    formationsEn,
  ],
});
