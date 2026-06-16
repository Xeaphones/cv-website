import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import { getAbsoluteUrl, getRssFeedPath, OG_IMAGE_PATH, SITE_NAME } from "@/lib/siteConfig";

export type PageKey = "home" | "more" | "projects" | "contact" | "blog";

type ArticleMeta = {
  publishedTime: Date | string;
  modifiedTime?: Date | string;
  section: string;
  tags?: string[];
};

type PageMetaProps =
  | { page: PageKey; noindex?: boolean }
  | {
      title: string;
      description: string;
      type?: "website" | "article";
      article?: ArticleMeta;
      noindex?: boolean;
    };

export function PageMeta(props: PageMetaProps) {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();

  const pageTitle =
    "page" in props ? t(`meta${capitalize(props.page)}Title`) : props.title;
  const description =
    "page" in props ? t(`meta${capitalize(props.page)}Description`) : props.description;
  const fullTitle =
    "page" in props && props.page === "home" ? pageTitle : `${pageTitle} | ${SITE_NAME}`;
  const canonical = getAbsoluteUrl(pathname);
  const image = getAbsoluteUrl(OG_IMAGE_PATH);
  const imageAlt = t("metaImageAlt");
  const isBlogRoute = pathname.startsWith("/blog");
  const rssFeedUrl = getAbsoluteUrl(getRssFeedPath(i18n.language));
  const noindex = props.noindex ?? false;
  const ogType =
    !("page" in props) && (props.type === "article" || props.article)
      ? "article"
      : "website";
  const publishedTime =
    !("page" in props) && props.article
      ? new Date(props.article.publishedTime).toISOString()
      : undefined;
  const modifiedTime =
    !("page" in props) && props.article?.modifiedTime
      ? new Date(props.article.modifiedTime).toISOString()
      : publishedTime;
  const articleTags = !("page" in props) && props.article ? props.article.tags ?? [] : [];

  return (
    <Helmet>
      <html lang={i18n.language} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="author" content={SITE_NAME} />
      {noindex ? <meta name="robots" content="noindex, follow" /> : null}
      <link rel="canonical" href={canonical} />
      {isBlogRoute ? (
        <link
          rel="alternate"
          type="application/rss+xml"
          title={t("blogFooterRss")}
          href={rssFeedUrl}
        />
      ) : null}

      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:locale" content={t("metaOgLocale")} />
      <meta
        property="og:locale:alternate"
        content={i18n.language === "fr" ? "en_GB" : "fr_FR"}
      />
      {publishedTime ? <meta property="article:published_time" content={publishedTime} /> : null}
      {modifiedTime ? <meta property="article:modified_time" content={modifiedTime} /> : null}
      {ogType === "article" ? <meta property="article:author" content={SITE_NAME} /> : null}
      {articleTags.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={imageAlt} />
    </Helmet>
  );
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
