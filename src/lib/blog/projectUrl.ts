/** Blog index URL filtered to posts for a given project frontmatter value. */
export function blogProjectUrl(project: string): string {
  const params = new URLSearchParams({ project });
  return `/blog?${params.toString()}`;
}

/** @deprecated Use blogProjectUrl */
export const blogWriteupProjectUrl = blogProjectUrl;
