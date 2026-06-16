import { Helmet } from "react-helmet-async";

import { getAbsoluteUrl, OG_IMAGE_PATH, SITE_NAME } from "@/lib/siteConfig";

type BlogPostingJsonLdProps = {
  title: string;
  description: string;
  url: string;
  datePublished: Date | string;
  language: string;
  tags?: string[];
};

export function BlogPostingJsonLd({
  title,
  description,
  url,
  datePublished,
  language,
  tags = [],
}: BlogPostingJsonLdProps) {
  const published = new Date(datePublished).toISOString();
  const pageUrl = getAbsoluteUrl(url);
  const inLanguage = language.startsWith("fr") ? "fr-FR" : "en-GB";

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished: published,
    dateModified: published,
    inLanguage,
    url: pageUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    image: getAbsoluteUrl(OG_IMAGE_PATH),
    author: {
      "@type": "Person",
      name: SITE_NAME,
      url: getAbsoluteUrl("/"),
    },
    publisher: {
      "@type": "Person",
      name: SITE_NAME,
    },
    ...(tags.length > 0 ? { keywords: tags.join(", ") } : {}),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
