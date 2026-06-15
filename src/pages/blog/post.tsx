import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { BlogArticleMeta } from "@/components/blog/BlogArticleMeta";
import { BlogArticleTags } from "@/components/blog/BlogArticleTags";
import { BlogBackLink } from "@/components/blog/BlogBackLink";
import { BlogTableOfContents } from "@/components/blog/BlogTableOfContents";
import { BlogMarkdownContent } from "@/components/blog/BlogMarkdownContent";
import { PageMeta } from "@/components/PageMeta";
import { PageShell } from "@/components/PageShell";
import { getBlogArticle, useContentLocale, type BlogSection } from "@/lib/content";
import { useActiveHeading } from "@/lib/hooks";
import { extractMarkdownHeadings } from "@/lib/markdown";

function parseBlogSection(section: string | undefined): BlogSection | undefined {
  if (section === "posts" || section === "writeups") return section;
  return undefined;
}

export const BlogPost = () => {
  const { section, slug } = useParams();
  const { t, i18n } = useTranslation();
  const locale = useContentLocale();
  const blogSection = parseBlogSection(section);
  const article = blogSection && slug ? getBlogArticle(locale, blogSection, slug) : undefined;
  const headings = useMemo(() => (article ? extractMarkdownHeadings(article.content) : []), [article]);
  const activeHeadingId = useActiveHeading(headings);

  if (!article || !blogSection) {
    return (
      <PageShell id="blog-post">
        <PageMeta page="blog" />
        <div className="mx-auto m-8 max-w-4xl px-4 font-sans">
          <h1 className="mb-6 text-3xl">{t("blogNotFound")}</h1>
          <BlogBackLink />
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell id="blog-post">
      <PageMeta title={article.title} description={article.summary} />
      <article className="mx-auto m-8 w-full max-w-6xl px-4 font-sans">
        <div className="mb-6">
          <BlogBackLink />
        </div>

        <header className="mb-8">
          <h1 className="mb-4 text-3xl font-semibold text-foreground">{article.title}</h1>
          <BlogArticleMeta
            date={article.date}
            locale={i18n.language}
            content={article.content}
            section={blogSection}
            theme={article.theme}
            project={article.project}
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
            {article.tags.length > 0 && (
              <footer className="mt-10 border-t border-border/60 pt-6 not-prose">
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {t("blogTags")}
                </p>
                <BlogArticleTags tags={article.tags} />
              </footer>
            )}
          </div>

          {headings.length > 0 && (
            <aside className="hidden w-56 shrink-0 lg:block" aria-hidden />
          )}
        </div>

        {headings.length > 0 && (
          <div className="blog-summary-fixed hidden lg:block">
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
