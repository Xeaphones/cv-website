import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { BlogArticleMeta } from "@/pages/blog/components/BlogArticleMeta";
import { BlogArticleTags } from "@/pages/blog/components/BlogArticleTags";
import { BlogBackLink } from "@/pages/blog/components/BlogBackLink";
import { BlogTableOfContents } from "@/pages/blog/components/BlogTableOfContents";
import { BlogMarkdownContent } from "@/pages/blog/components/BlogMarkdownContent";
import { ProjectBreadcrumb } from "@/pages/blog/components/ProjectBreadcrumb";
import { ProjectSeriesNav } from "@/pages/blog/components/ProjectSeriesNav";
import { BlogPostingJsonLd } from "@/shared/seo/BlogPostingJsonLd";
import { PageMeta } from "@/shared/components/PageMeta";
import { PageShell } from "@/shared/components/PageShell";
import { useLocalePath, useActiveHeading } from "@/lib/hooks";
import { useContentLocale } from "@/lib/content";
import { getBlogPost, getPostsByProject } from "@/lib/blog";
import { extractMarkdownHeadings } from "@/lib/blog/markdown";

export const BlogPost = () => {
  const { section, slug } = useParams();
  const { t, i18n } = useTranslation();
  const locale = useContentLocale();
  const localize = useLocalePath();
  const article =
    slug && (section === "posts" || section === "writeups")
      ? getBlogPost(locale, slug)
      : undefined;
  const headings = useMemo(() => (article ? extractMarkdownHeadings(article.content) : []), [article]);
  const activeHeadingId = useActiveHeading(headings);

  const project = article?.project;
  const projectPosts = useMemo(() => {
    if (!project || !slug) return [];
    return getPostsByProject(locale, project, { includeSlug: slug });
  }, [locale, project, slug]);
  const showProjectNav = Boolean(project && projectPosts.length > 0);

  if (!article || !slug) {
    return (
      <PageShell id="blog-post">
        <PageMeta page="blog" noindex />
        <div className="mx-auto m-8 max-w-4xl px-4 font-sans">
          <h1 className="mb-6 text-3xl">{t("blogNotFound")}</h1>
          <BlogBackLink />
        </div>
      </PageShell>
    );
  }

  const canonicalPath = `/blog/posts/${slug}`;

  return (
    <PageShell id="blog-post">
      <PageMeta
        title={article.title}
        description={article.summary}
        type="article"
        article={{
          publishedTime: article.date,
          section: project ?? "posts",
          tags: article.tags,
        }}
        noindex={article.draft}
      />
      <BlogPostingJsonLd
        title={article.title}
        description={article.summary}
        url={localize(canonicalPath)}
        datePublished={article.date}
        language={i18n.language}
        tags={article.tags}
      />
      <article
        className={
          showProjectNav
            ? "blog-writeup-layout mx-auto m-8 w-full max-w-7xl px-4 font-sans"
            : "mx-auto m-8 w-full max-w-6xl px-4 font-sans"
        }
      >
        <div
          className={
            showProjectNav
              ? "flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10 xl:gap-12"
              : undefined
          }
        >
          {showProjectNav && project && (
            <aside className="hidden w-52 shrink-0 lg:block xl:w-56">
              <div className="blog-project-nav-sticky">
                <ProjectSeriesNav project={project} posts={projectPosts} currentSlug={slug} />
              </div>
            </aside>
          )}

          <div className="min-w-0 flex-1">
            {showProjectNav && project ? (
              <>
                <div className="mb-6 lg:hidden">
                  <ProjectSeriesNav project={project} posts={projectPosts} currentSlug={slug} />
                </div>
                <ProjectBreadcrumb project={project} />
              </>
            ) : (
              <div className="mb-6">
                <BlogBackLink />
              </div>
            )}

            <header className="mb-8">
              <h1 className="mb-4 text-3xl font-semibold text-foreground">{article.title}</h1>
              <BlogArticleMeta
                date={article.date}
                locale={i18n.language}
                content={article.content}
                theme={article.theme}
              />
            </header>

            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
              <div className="min-w-0 flex-1">
                {headings.length > 0 && (
                  <div className="mb-8 lg:hidden">
                    <BlogTableOfContents
                      headings={headings}
                      activeId={activeHeadingId}
                      title={t("blogSummary")}
                    />
                  </div>
                )}
                <BlogMarkdownContent
                  content={article.content}
                  className="prose max-w-none blog-prose dark:prose-invert"
                />
                {article.tags.length > 0 ? (
                  <footer className="mt-10 border-t border-border/60 pt-6 not-prose">
                    <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {t("blogTags")}
                    </p>
                    <BlogArticleTags tags={article.tags} />
                  </footer>
                ) : null}
              </div>

              {headings.length > 0 && (
                <aside className="hidden w-56 shrink-0 lg:block" aria-hidden />
              )}
            </div>
          </div>
        </div>

        {headings.length > 0 && (
          <div
            className={
              showProjectNav
                ? "blog-summary-fixed blog-summary-fixed--with-project-nav hidden lg:block"
                : "blog-summary-fixed hidden lg:block"
            }
          >
            <BlogTableOfContents
              headings={headings}
              activeId={activeHeadingId}
              title={t("blogSummary")}
            />
          </div>
        )}
      </article>
    </PageShell>
  );
};
