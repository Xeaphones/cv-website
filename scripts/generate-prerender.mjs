/**
 * Post-build prerender: copy dist/index.html into locale route folders
 * with route-specific title/description/canonical/hreflang injected.
 *
 * URL scheme: `/` = FR (default), `/en` = EN, `/fr` optional mirror of FR.
 */
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createBuilder } from "@content-collections/core";
import { siteUrl } from "./site-url.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");

const meta = {
  fr: {
    home: {
      title: "Yohan Velay | Portfolio",
      description:
        "Portfolio de Yohan Velay, développeur Fullstack / IoT / DevOps chez Andil. Développement web, API, plugins Moodle et projets personnels à Toulouse.",
    },
    profile: {
      title: "Compétences & Parcours | Yohan Velay",
      description:
        "Compétences détaillées, parcours scolaire, centres d'intérêt et CV téléchargeable de Yohan Velay.",
    },
    projects: {
      title: "Expériences & Projets | Yohan Velay",
      description:
        "Expériences professionnelles chez Andil, Veltech et projets Ynov dont CarnetSportif et développement de jeux VR.",
    },
    contact: {
      title: "Contact | Yohan Velay",
      description: "Contactez Yohan Velay par email, téléphone, LinkedIn ou GitHub.",
    },
    blog: {
      title: "Blog | Yohan Velay",
      description:
        "Articles sur le développement web, Moodle, PHP et notes techniques par Yohan Velay.",
    },
  },
  en: {
    home: {
      title: "Yohan Velay | Portfolio",
      description:
        "Portfolio of Yohan Velay, fullstack / IoT / DevOps developer at Andil. Web development, APIs, Moodle plugins, and personal projects in Toulouse.",
    },
    profile: {
      title: "Skills & Education | Yohan Velay",
      description:
        "Detailed skills, education timeline, interests, and downloadable resume for Yohan Velay.",
    },
    projects: {
      title: "Experience & Projects | Yohan Velay",
      description:
        "Professional experience at Andil, Veltech, and Ynov projects including CarnetSportif and VR game development.",
    },
    contact: {
      title: "Contact | Yohan Velay",
      description: "Get in touch with Yohan Velay by email, phone, LinkedIn, or GitHub.",
    },
    blog: {
      title: "Blog | Yohan Velay",
      description:
        "Articles about web development, Moodle, PHP, and technical notes by Yohan Velay.",
    },
  },
};

const staticRoutes = [
  { bare: "/", key: "home", file: "index.html" },
  { bare: "/blog", key: "blog", file: "blog/index.html" },
  { bare: "/profile", key: "profile", file: "profile/index.html" },
  { bare: "/projects", key: "projects", file: "projects/index.html" },
  { bare: "/contact", key: "contact", file: "contact/index.html" },
];

const template = readFileSync(path.join(distDir, "index.html"), "utf8");

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Canonical public path: FR unprefixed, EN under /en. */
function publicPath(bare, locale) {
  if (locale === "fr") return bare === "/" ? "/" : bare;
  return bare === "/" ? "/en" : `/en${bare}`;
}

function injectHead(html, { title, description, canonical, locale, frUrl, enUrl }) {
  let next = html.replace(/<html[^>]*>/, `<html lang="${locale}">`);
  next = next.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`);

  // Drop template / prior inject tags so EN shells don't keep FR og:* leftovers.
  next = next.replace(/<meta\s+name="description"[^>]*>\s*/gi, "");
  next = next.replace(/<meta\s+property="og:[^"]+"[^>]*>\s*/gi, "");
  next = next.replace(/<meta\s+name="twitter:[^"]+"[^>]*>\s*/gi, "");
  next = next.replace(/<link\s+rel="canonical"[^>]*>\s*/gi, "");
  next = next.replace(/<link\s+rel="alternate"[^>]*>\s*/gi, "");

  const image = `${siteUrl}/og-image.jpg`;
  const headBits = [
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
    `<link rel="alternate" hreflang="fr" href="${escapeHtml(frUrl)}" />`,
    `<link rel="alternate" hreflang="en" href="${escapeHtml(enUrl)}" />`,
    `<link rel="alternate" hreflang="x-default" href="${escapeHtml(frUrl)}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="${locale === "fr" ? "fr_FR" : "en_GB"}" />`,
    `<meta property="og:image" content="${escapeHtml(image)}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(image)}" />`,
  ].join("\n    ");

  return next.replace("</head>", `    ${headBits}\n  </head>`);
}

function writeRoute(relativeFile, html) {
  const target = path.join(distDir, relativeFile);
  mkdirSync(path.dirname(target), { recursive: true });
  writeFileSync(target, html, "utf8");
}

function diskFile(bare, locale) {
  const file = staticRoutes.find((r) => r.bare === bare)?.file ?? "index.html";
  if (locale === "fr") return file; // root: index.html, blog/index.html, …
  return `en/${file}`;
}

let count = 0;

for (const locale of ["fr", "en"]) {
  for (const route of staticRoutes) {
    const pathname = publicPath(route.bare, locale);
    const frUrl = `${siteUrl}${publicPath(route.bare, "fr")}`;
    const enUrl = `${siteUrl}${publicPath(route.bare, "en")}`;
    const pageMeta = meta[locale][route.key];
    const html = injectHead(template, {
      title: pageMeta.title,
      description: pageMeta.description,
      canonical: `${siteUrl}${pathname === "/" ? "/" : pathname}`,
      locale,
      frUrl,
      enUrl,
    });
    writeRoute(diskFile(route.bare, locale), html);
    count += 1;
  }
}

// Optional /fr mirror of French pages
for (const route of staticRoutes) {
  const src = path.join(distDir, diskFile(route.bare, "fr"));
  const html = readFileSync(src, "utf8");
  writeRoute(`fr/${route.file}`, html);
  count += 1;
}

const configPath = path.join(root, "content-collections.ts");
const builder = await createBuilder(configPath);
await builder.build();
const generated = await import(
  pathToFileURL(path.join(root, ".content-collections/generated/index.js")).href
);

for (const locale of ["fr", "en"]) {
  const altLocale = locale === "fr" ? "en" : "fr";
  const posts = locale === "fr" ? generated.allBlogPostsFrs : generated.allBlogPostsEns;
  const writeups = locale === "fr" ? generated.allBlogWriteupsFrs : generated.allBlogWriteupsEns;
  const articles = [
    ...posts.map((a) => ({ ...a, section: "posts" })),
    ...writeups.map((a) => ({ ...a, section: "writeups" })),
  ].filter((a) => !a.draft);

  for (const article of articles) {
    const slug = locale === "fr" ? article.fr : article.en;
    const altSlug = altLocale === "fr" ? article.fr : article.en;
    const bare = `/blog/${article.section}/${slug}`;
    const pathname = publicPath(bare, locale);
    const frUrl = `${siteUrl}${publicPath(`/blog/${article.section}/${article.fr}`, "fr")}`;
    const enUrl = `${siteUrl}${publicPath(`/blog/${article.section}/${article.en}`, "en")}`;
    const html = injectHead(template, {
      title: `${article.title} | Yohan Velay`,
      description: article.summary,
      canonical: `${siteUrl}${pathname}`,
      locale,
      frUrl,
      enUrl,
    });
    const out =
      locale === "fr"
        ? `blog/${article.section}/${slug}/index.html`
        : `en/blog/${article.section}/${slug}/index.html`;
    writeRoute(out, html);
    count += 1;

    if (locale === "fr") {
      writeRoute(`fr/blog/${article.section}/${slug}/index.html`, html);
      count += 1;
    }
  }
}

copyFileSync(path.join(distDir, "index.html"), path.join(distDir, "404.html"));

// Dedicated 404 shell: noindex so soft-crawl of ErrorDocument stays out of the index.
{
  let notFound = readFileSync(path.join(distDir, "404.html"), "utf8");
  notFound = notFound.replace(/<html[^>]*>/, `<html lang="fr">`);
  notFound = notFound.replace(
    /<title>[^<]*<\/title>/,
    `<title>404 | Yohan Velay</title>`,
  );
  notFound = notFound.replace(
    /<meta name="robots"[^>]*>/,
    `<meta name="robots" content="noindex, follow" />`,
  );
  if (!notFound.includes('name="robots"')) {
    notFound = notFound.replace(
      "</head>",
      `    <meta name="robots" content="noindex, follow" />\n  </head>`,
    );
  }
  notFound = notFound.replace(
    /<meta name="description"[^>]*>/,
    `<meta name="description" content="Page not found." />`,
  );
  writeFileSync(path.join(distDir, "404.html"), notFound, "utf8");
}

console.log(`Prerendered ${count} HTML shells (FR at /, EN at /en, optional /fr)`);
