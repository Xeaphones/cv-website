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

function toIsoDate(date) {
  return new Date(date).toISOString().slice(0, 10);
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

function collectBlogPaths() {
  const paths = new Map();

  for (const locale of ["fr", "en"]) {
    for (const article of collectArticles(locale)) {
      const slug = locale === "fr" ? article.fr : article.en;
      const pathname = `/blog/${article.section}/${slug}`;
      const lastmod = toIsoDate(article.date);
      const existing = paths.get(pathname);

      if (!existing || lastmod > existing) {
        paths.set(pathname, lastmod);
      }
    }
  }

  return paths;
}

function buildUrlEntry(loc, { lastmod, changefreq, priority }) {
  return `  <url>
    <loc>${escapeXml(loc)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

const buildDate = toIsoDate(new Date());
const staticPages = [
  { pathname: "/", changefreq: "weekly", priority: "1.0" },
  { pathname: "/blog", changefreq: "weekly", priority: "0.9" },
  { pathname: "/more", changefreq: "monthly", priority: "0.8" },
  { pathname: "/projects", changefreq: "monthly", priority: "0.8" },
  { pathname: "/contact", changefreq: "yearly", priority: "0.7" },
];

const blogPaths = collectBlogPaths();
const staticEntries = staticPages.map((page) =>
  buildUrlEntry(`${siteUrl}${page.pathname}`, {
    lastmod: buildDate,
    changefreq: page.changefreq,
    priority: page.priority,
  }),
);
const blogEntries = [...blogPaths.entries()].map(([pathname, lastmod]) =>
  buildUrlEntry(`${siteUrl}${pathname}`, {
    lastmod,
    changefreq: "monthly",
    priority: "0.7",
  }),
);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticEntries, ...blogEntries].join("\n")}
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

console.log(`Generated sitemap.xml (${staticPages.length + blogPaths.size} URLs) and robots.txt`);
