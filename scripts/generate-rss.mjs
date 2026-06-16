import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createBuilder } from "@content-collections/core";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const configPath = path.join(root, "content-collections.ts");
const siteUrl = (process.env.VITE_SITE_URL ?? "https://yohanvelay.nybtech.fr").replace(/\/$/, "");

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

function toRfc822(date) {
  return new Date(date).toUTCString();
}

function collectArticles(locale) {
  const posts = locale === "fr" ? generated.allBlogPostsFrs : generated.allBlogPostsEns;
  const writeups = locale === "fr" ? generated.allBlogWriteupsFrs : generated.allBlogWriteupsEns;

  return [...posts.map((article) => ({ ...article, section: "posts" })), ...writeups.map((article) => ({ ...article, section: "writeups" }))]
    .filter((article) => !article.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function articleUrl(locale, section, article) {
  const slug = locale === "fr" ? article.fr : article.en;
  return `${siteUrl}/blog/${section}/${slug}`;
}

function buildFeed(locale, articles) {
  const feedPath = `/rss/${locale}.xml`;
  const channelLink = `${siteUrl}/blog`;
  const title = locale === "fr" ? "Blog — Yohan Velay" : "Blog — Yohan Velay";
  const description =
    locale === "fr"
      ? "Articles et writeups techniques de Yohan Velay."
      : "Articles and technical writeups by Yohan Velay.";

  const items = articles
    .map((article) => {
      const link = articleUrl(locale, article.section, article);
      return `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${toRfc822(article.date)}</pubDate>
      <description>${escapeXml(article.summary)}</description>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${escapeXml(channelLink)}</link>
    <description>${escapeXml(description)}</description>
    <language>${locale === "fr" ? "fr-FR" : "en-GB"}</language>
    <lastBuildDate>${toRfc822(new Date())}</lastBuildDate>
    <atom:link href="${escapeXml(siteUrl + feedPath)}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
}

const outDir = path.join(root, "public/rss");
mkdirSync(outDir, { recursive: true });

for (const locale of ["fr", "en"]) {
  const feed = buildFeed(locale, collectArticles(locale));
  writeFileSync(path.join(outDir, `${locale}.xml`), feed, "utf8");
}

console.log("Generated RSS feeds in public/rss/");
