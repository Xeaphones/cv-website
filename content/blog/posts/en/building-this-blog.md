---
title: "Building an Astro-like blog on my CV site"
summary: "Why I added a markdown blog to my portfolio, how Content Collections and React power it, and how it stays the same resume website underneath."
date: 2026-06-15
fr: building-this-blog
en: building-this-blog
draft: false
theme: https://www.youtube.com/watch?v=pR4iCWB-VVQ
tags:
  - react
  - vite
  - blog
  - typescript
  - astro
---

I wanted a place to write about apprenticeships, side experiments, and technical notes — without spinning up a separate site or leaving behind the portfolio recruiters already bookmark.

This site is still **my CV**: home, projects, experience, contact. The blog is an extra room in the same house.

> [!NOTE]
> The stack is **React + Vite**, not Astro. The *authoring* experience is what feels Astro-like: markdown files in git, typed frontmatter, and content that builds into the app.

## What I was aiming for

- **One domain, one deploy** — no `blog.example.com` fork of the design system.
- **Markdown in the repo** — write in the IDE, review in PRs, ship with the site.
- **French and English** — matching slugs so the language switch finds the translation.
- **Nice reading UX** — table of contents, callouts, code blocks with titles and line highlights, tags.

Reference blogs like [velnic.dev](https://velnic.dev) helped: file-window code blocks, GitHub-style alerts, a summary column while you scroll.

## How content is organised

Posts live under locale folders, not a single `content/blog` pile:

```text title="content/blog/posts/"
posts/
├── en/   # English articles
└── fr/   # French articles
```

Each file shares translation slugs in frontmatter (`fr` / `en`) so `/blog/posts/building-this-blog` and the French counterpart stay linked.

[Content Collections](https://www.content-collections.dev/) validates frontmatter with Zod at build time — title, date, tags, draft flag — and generates typed imports for the React app. That is the closest thing here to Astro content layers: **filesystem → schema → components**.

## What happens at build time

```bash is-terminal title="Dev workflow"
npm run dev
# predev regenerates collection exports from markdown
```

On `dev` and `build`, a small script refreshes generated collection modules. The blog index reads sorted posts; each article page renders `BlogMarkdownContent` with:

- **GFM** — tables, task lists, strikethrough
- **GitHub alerts** — `> [!NOTE]`, `> [!TIP]`, and friends
- **Custom code fences** — `title="..."`, `is-terminal`, `no-title`, `highlight="2-3"`

Inline code like `content-collections.ts` gets a highlighted pill; fenced blocks get syntax highlighting and a copy button.

## Still a resume site

![Pam from The Office comparing two photos (the office meme)](/content/blog/same-picture.gif "no-background | Corporate needs you to find the differences between this CV and this blog. ")

Nothing about routing replaces the portfolio:

- `/` — about and skills
- `/projects` — timelines and project cards
- `/blog` — latest posts and writeups, tag filter, search
- `/contact` — form and links

The header stays the same; **Blog** stays underlined on post pages too. Theme toggle, i18n, and Catppuccin-inspired colours apply everywhere.

## What I might write next

Short posts from day-to-day experimentations (homelab, tooling and more), longer writeups when a topic deserves a deep dive, and the occasional meta note like this one when the site itself changes.

If you are reading this on the live site, the loop closed successfully: markdown file → build → the page you are on now.
