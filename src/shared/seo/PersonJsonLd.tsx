import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

import { getAbsoluteUrl, OG_IMAGE_PATH, SITE_EMAIL, SITE_LINKS, SITE_NAME } from "@/lib/siteConfig";
import { withLocalePrefix } from "@/lib/locale";
import type { Locale } from "@/lib/content";

export function PersonJsonLd() {
  const { t, i18n } = useTranslation();
  const locale = (i18n.language.startsWith("fr") ? "fr" : "en") as Locale;
  const origin = getAbsoluteUrl(withLocalePrefix("/", locale));

  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    jobTitle: t("metaJobTitle"),
    url: origin,
    image: getAbsoluteUrl(OG_IMAGE_PATH),
    email: SITE_EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Toulouse",
      addressCountry: "FR",
    },
    sameAs: [SITE_LINKS.linkedin, SITE_LINKS.github],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
