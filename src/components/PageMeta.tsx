import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import { getAbsoluteUrl, OG_IMAGE_PATH, SITE_NAME } from "@/lib/siteConfig";

export type PageKey = "home" | "more" | "projects" | "contact" | "blog";

type PageMetaProps =
  | { page: PageKey }
  | { title: string; description: string };

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

  return (
    <Helmet>
      <html lang={i18n.language} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="author" content={SITE_NAME} />
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="fr" href={getAbsoluteUrl(pathname)} />
      <link rel="alternate" hrefLang="en" href={getAbsoluteUrl(pathname)} />
      <link rel="alternate" hrefLang="x-default" href={getAbsoluteUrl(pathname)} />

      <meta property="og:type" content={"page" in props && props.page === "blog" ? "article" : "website"} />
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
