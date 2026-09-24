import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { BlogBackLink } from "@/pages/blog/components/BlogBackLink";
import { BlogEntry } from "@/pages/blog/components/BlogEntry";
import { BlogPanel } from "@/pages/blog/components/BlogPanel";
import { BlogSearchBar } from "@/pages/blog/components/BlogSearchBar";
import { TagCloud } from "@/pages/blog/components/TagCloud";
import { PageMeta } from "@/shared/components/PageMeta";
import { PageShell } from "@/shared/components/PageShell";
import { filterBlogBySearch, filterBlogByTag, getBlogTags, useBlogPosts } from "@/lib/blog";
import { useLocalePath } from "@/lib/hooks";

/** How many posts the default “Latest” panel shows before “All posts”. */
const LATEST_POSTS_LIMIT = 5;

export const BlogList = () => {
  const { t, i18n } = useTranslation();
  const localize = useLocalePath();
  const posts = useBlogPosts();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTag = searchParams.get("tag");
  const activeProject = searchParams.get("project");
  const activeQuery = searchParams.get("q") ?? "";
  const showAll = searchParams.get("all") === "1";

  const filteredPosts = useMemo(() => {
    const byProject = activeProject
      ? posts.filter((post) => post.project === activeProject)
      : posts;
    return filterBlogBySearch(filterBlogByTag(byProject, activeTag), activeQuery);
  }, [posts, activeTag, activeProject, activeQuery]);

  const isFiltered = Boolean(activeTag || activeProject || activeQuery.trim());
  const hasSearch = Boolean(activeQuery.trim());
  /** Cap only the unfiltered landing list; filters / ?all=1 show everything. */
  const capped = !isFiltered && !showAll;
  const visiblePosts = capped ? filteredPosts.slice(0, LATEST_POSTS_LIMIT) : filteredPosts;
  const hasMore = capped && filteredPosts.length > LATEST_POSTS_LIMIT;

  const tags = useMemo(() => getBlogTags(posts), [posts]);

  const toggleTag = (tag: string) => {
    const next = new URLSearchParams(searchParams);
    if (activeTag === tag) {
      next.delete("tag");
    } else {
      next.set("tag", tag);
    }
    setSearchParams(next, { replace: true });
  };

  const onSearchChange = (value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value.trim()) {
      next.set("q", value);
    } else {
      next.delete("q");
    }
    setSearchParams(next, { replace: true });
  };

  const panelTitle = activeProject ?? (showAll && !isFiltered ? t("allPosts") : t("latestPosts"));

  return (
    <PageShell id="blog">
      <PageMeta page="blog" />
      <div className="mx-auto m-8 flex w-full max-w-4xl flex-col gap-6 px-4 font-sans">
        {(isFiltered || showAll) && <BlogBackLink />}

        <BlogSearchBar value={activeQuery} onChange={onSearchChange} />

        <BlogPanel
          title={panelTitle}
          allLinkLabel={hasMore ? t("allPosts") : undefined}
          allLinkTo={hasMore ? localize("/blog?all=1") : undefined}
          emptyLabel={hasSearch ? t("blogNoSearchResults") : t("blogEmpty")}
        >
          {visiblePosts.map((post) => (
            <BlogEntry key={post.slug} article={post} locale={i18n.language} />
          ))}
        </BlogPanel>

        {tags.length > 0 && (
          <section className="pt-2 text-center">
            <p className="mb-3 text-sm text-muted-foreground">{t("researchByTags")}</p>
            <div className="flex justify-center">
              <TagCloud tags={tags} activeTag={activeTag} onTagClick={toggleTag} />
            </div>
          </section>
        )}
      </div>
    </PageShell>
  );
};
