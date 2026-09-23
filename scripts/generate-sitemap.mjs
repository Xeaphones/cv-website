import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createBuilder } from "@content-collections/core";
import { siteUrl } from "./site-url.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const configPath = path.join(root, "content-collections.ts");

const builder = await createBuilder(configPath);
await builder.build();

const generatedPath = path.join(root, ".content-collections/generated/index.js");
const generated = await import(pathToFileURL(generatedPath).href);

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toIsoDate(date) {
  return new Date(date).toISOString().slice(0, 10);
}

/** FR unprefixed, EN under /en. Optional /fr is not the canonical FR URL. */
function withLocale(pathname, locale) {
  if (locale === "fr") return pathname === "/" ? "/" : pathname;
  return pathname === "/" ? "/en" : `/en${pathname}`;
}

function collectArticles(locale) {
  const posts = locale === "fr" ? generated.allBlogPostsFrs : generated.allBlogPostsEns;
  const writeups = locale === "fr" ? generated.allBlogWriteupsFrs : generated.allBlogWriteupsEns;

  return [
    ...posts.map((article) => ({ ...article, section: "posts" })),
    ...writeups.map((article) => ({ ...article, section: "writeups" })),
  ]
    .filter((article) => !article.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function xhtmlLinks(barePath) {
  const frUrl = `${siteUrl}${withLocale(barePath, "fr")}`;
  const enUrl = `${siteUrl}${withLocale(barePath, "en")}`;
  return [
    `    <xhtml:link rel="alternate" hreflang="fr" href="${escapeXml(frUrl)}" />`,
    `    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(enUrl)}" />`,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(frUrl)}" />`,
  ].join("\n");
}

function buildUrlEntry(barePath, locale, { lastmod, changefreq, priority }) {
  const loc = `${siteUrl}${withLocale(barePath, locale)}`;
  return `  <url>
    <loc>${escapeXml(loc)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${xhtmlLinks(barePath)}
  </url>`;
}

const buildDate = toIsoDate(new Date());
const staticPages = [
  { pathname: "/", changefreq: "weekly", priority: "1.0" },
  { pathname: "/blog", changefreq: "weekly", priority: "0.9" },
  { pathname: "/profile", changefreq: "monthly", priority: "0.8" },
  { pathname: "/projects", changefreq: "monthly", priority: "0.8" },
  { pathname: "/contact", changefreq: "yearly", priority: "0.7" },
];

const staticEntries = staticPages.flatMap((page) =>
  ["fr", "en"].map((locale) =>
    buildUrlEntry(page.pathname, locale, {
      lastmod: buildDate,
      changefreq: page.changefreq,
      priority: page.priority,
    }),
  ),
);

const blogUrlBlocks = [];
for (const locale of ["fr", "en"]) {
  for (const article of collectArticles(locale)) {
    const slug = locale === "fr" ? article.fr : article.en;
    const altLocale = locale === "fr" ? "en" : "fr";
    const altSlug = altLocale === "fr" ? article.fr : article.en;
    const bare = `/blog/${article.section}/${slug}`;
    const pathname = withLocale(`/blog/${article.section}/${slug}`, locale);
    const altPath = withLocale(`/blog/${article.section}/${altSlug}`, altLocale);
    const frPath = withLocale(`/blog/${article.section}/${article.fr}`, "fr");
    blogUrlBlocks.push(`  <url>
    <loc>${escapeXml(`${siteUrl}${pathname}`)}</loc>
    <lastmod>${toIsoDate(article.date)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="${locale}" href="${escapeXml(`${siteUrl}${pathname}`)}" />
    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${escapeXml(`${siteUrl}${altPath}`)}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(`${siteUrl}${frPath}`)}" />
  </url>`);
  }
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${[...staticEntries, ...blogUrlBlocks].join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

const publicDir = path.join(root, "public");
mkdirSync(publicDir, { recursive: true });
writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap, "utf8");
writeFileSync(path.join(publicDir, "robots.txt"), robots, "utf8");

console.log(`Generated sitemap.xml (${staticEntries.length + blogUrlBlocks.length} URLs) and robots.txt`);
