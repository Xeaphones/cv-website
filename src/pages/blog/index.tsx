import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { BlogBackLink } from "@/components/blog/BlogBackLink";
import { BlogEntry } from "@/components/blog/BlogEntry";
import { BlogPanel } from "@/components/blog/BlogPanel";
import { BlogSearchBar } from "@/components/blog/BlogSearchBar";
import { TagCloud } from "@/components/blog/TagCloud";
import { PageMeta } from "@/components/PageMeta";
import { PageShell } from "@/components/PageShell";
import {
  filterBlogBySearch,
  filterBlogByTag,
  getBlogTags,
  useBlogPosts,
  useBlogWriteups,
} from "@/lib/content";

export const BlogList = () => {
  const { t, i18n } = useTranslation();
  const posts = useBlogPosts();
  const writeups = useBlogWriteups();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTag = searchParams.get("tag");
  const activeKind = searchParams.get("kind");
  const activeQuery = searchParams.get("q") ?? "";

  const filteredPosts = useMemo(
    () => filterBlogBySearch(filterBlogByTag(posts, activeTag), activeQuery),
    [posts, activeTag, activeQuery],
  );
  const filteredWriteups = useMemo(
    () => filterBlogBySearch(filterBlogByTag(writeups, activeTag), activeQuery),
    [writeups, activeTag, activeQuery],
  );
  const tags = useMemo(() => getBlogTags(posts, writeups), [posts, writeups]);

  const showPosts = !activeKind || activeKind === "post";
  const showWriteups = !activeKind || activeKind === "writeup";
  const isFiltered = Boolean(activeTag || activeKind || activeQuery.trim());
  const hasSearch = Boolean(activeQuery.trim());

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

  return (
    <PageShell id="blog">
      <PageMeta page="blog" />
      <div className="mx-auto m-8 flex w-full max-w-4xl flex-col gap-6 px-4 font-sans">
        {isFiltered && <BlogBackLink />}

        <BlogSearchBar value={activeQuery} onChange={onSearchChange} />

        {showPosts && (
          <BlogPanel
            title={t("latestPosts")}
            allLinkLabel={t("allPosts")}
            allLinkTo={activeKind === "post" ? "/blog" : "/blog?kind=post"}
            emptyLabel={hasSearch ? t("blogNoSearchResults") : t("blogEmpty")}
          >
            {filteredPosts.map((post) => (
              <BlogEntry key={post.slug} article={post} section="posts" locale={i18n.language} />
            ))}
          </BlogPanel>
        )}

        {showWriteups && (
          <BlogPanel
            title={t("latestWriteups")}
            allLinkLabel={t("allWriteups")}
            allLinkTo={activeKind === "writeup" ? "/blog" : "/blog?kind=writeup"}
            emptyLabel={hasSearch ? t("blogNoSearchResults") : t("writeupsEmpty")}
          >
            {filteredWriteups.map((writeup) => (
              <BlogEntry key={writeup.slug} article={writeup} section="writeups" locale={i18n.language} />
            ))}
          </BlogPanel>
        )}

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
