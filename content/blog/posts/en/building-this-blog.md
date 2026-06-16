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

Reference blogs like [velnic.dev](https://velnic.dev) served as inspiration: file-window code blocks, GitHub-style alerts, a summary column while you scroll.

## Content organisation

Posts are sorted by language:

```text title="content/blog/posts/"
posts/
├── en/   # English articles
└── fr/   # French articles
```

Each file shares translation slugs in frontmatter (`fr` / `en`) to link `/blog/posts/building-this-blog` and the French counterpart.

[Content Collections](https://www.content-collections.dev/) validates frontmatter with Zod at build time — title, date, tags, draft flag — and generates typed imports for React. That is the closest thing here to Astro content layers: **filesystem → schema → components**.

## At build time

```bash is-terminal title="Dev workflow"
npm run dev
# predev regenerates collection exports from markdown
```

On `dev` and `build`, a small script refreshes generated collection modules. The blog index reads sorted posts; each article page renders `BlogMarkdownContent` with:

- **GFM** — tables, task lists, strikethrough
- **GitHub alerts** — `> [!NOTE]`, `> [!TIP]`, and friends
- **Custom code fences** — `title="..."`, `is-terminal`, `no-title`, `highlight="2-3"`

Inline code like `content-collections.ts` gets a highlighted pill; fenced blocks get syntax highlighting and a copy button.

## What the blog can do

Two content types live side by side:

```text title="content/blog/"
blog/
├── posts/     # shorter articles and notes
└── writeups/  # longer technical deep-dives
```

Each entry has frontmatter validated at build time:

```yaml title="Frontmatter example"
---
title: "Article title"
summary: "Short description for listings and SEO"
date: 2026-06-15
fr: french-slug
en: english-slug
draft: false
tags:
  - react
  - vite
theme: https://www.youtube.com/watch?v=pR4iCWB-VVQ
---
```

- **`draft: true`** — hides the article from the blog until it is ready
- **`tags`** — clickable filters on `/blog`
- **`theme`** — a **Theme** link in the metadata line (like on this article)

On **`/blog`**, the index offers **full-text search** and a **tag cloud**. Posts and writeups are listed separately.

On **each article page**:

- a **table of contents** on the right (or at the top on mobile) with the active section highlighted while scrolling
- **date**, **reading time**, and **theme** below the title
- **tags** at the bottom of the page

Markdown images go through the `blog-image` component — size (`size-small`, `size-medium`, `size-big`), optional frame (`no-background`), and **captions** in the title attribute:

```markdown
![Meme](/content/blog/same-picture.gif "no-background | Caption shown below the image")
```

> [!TIP]
> The full authoring guide lives in `content/blog/README.md`: callouts, code blocks, GFM tables, common mistakes.

## CI/CD and deployment

The site is deployed automatically with GitHub Actions (`.github/workflows/deploy.yml`). This keeps the content workflow close to Astro-like authoring: edit markdown in git, push, and let CI rebuild + deploy.

### Triggers

- every **push** to `main`
- manual run via **workflow_dispatch** (Actions tab → *Build and Deploy* → *Run workflow*)

### Pipeline

1. **Checkout** the repository
2. **Setup Node 20** with npm cache
3. **`npm ci`** — strict install from `package-lock.json` (must stay in sync with `package.json`)
4. **`npm run build`** — runs `prebuild` first to regenerate Content Collections from markdown, then `vite build`
5. **Install `lftp`** on the runner
6. **Deploy `dist/` over FTPS** — `mirror --reverse --delete` syncs the build output to the remote web root

### GitHub secrets

These are stored in **Settings → Secrets and variables → Actions**. They appear as `***` in workflow logs.

| Secret | Role |
|--------|------|
| `FTP_HOST` | FTP server hostname |
| `FTP_PORT` | FTP port |
| `FTP_USER` | FTP login |
| `FTP_PASSWORD` | FTP password |
| `FTP_PATH` | Remote web root where `dist/` is deployed |

### Deploy step (simplified)

```yaml title=".github/workflows/deploy.yml (excerpt)"
- name: Deploy dist/ with FTPS
  env:
    FTP_HOST: ***          # secrets.FTP_HOST
    FTP_PORT: ***          # secrets.FTP_PORT
    FTP_USER: ***          # secrets.FTP_USER
    FTP_PASSWORD: ***      # secrets.FTP_PASSWORD
    FTP_PATH: ***          # secrets.FTP_PATH
  run: |
    lftp -u "$FTP_USER","$FTP_PASSWORD" "ftp://$FTP_HOST:$FTP_PORT" <<EOF
    set ftp:ssl-force true
    set ftp:ssl-protect-data true
    set ssl:verify-certificate no
    mirror --reverse --delete --verbose ./dist "$FTP_PATH"
    bye
    EOF
```

> [!WARNING]
> React Router handles URLs client-side, but a **page reload** on `/blog/posts/...` hits Apache directly. A `public/.htaccess` rewrites unknown paths to `index.html` so deep links work in production.

## Still a resume site

![Pam from The Office comparing two photos (the office meme)](/content/blog/same-picture.gif "no-background | Corporate needs you to find the differences between this CV and this blog. ")

Nothing about routing replaces the portfolio:

- `/` — about and skills
- `/projects` — timelines and project cards
- `/blog` — latest posts and writeups, tag filter, search
- `/contact` — form and links

The header stays the same; **Blog** stays underlined on post pages too. Theme toggle, i18n, and Catppuccin-inspired colours apply everywhere.

## What's next

Short posts from day-to-day experimentations (homelab, tooling and more), longer writeups when a topic deserves a deep dive, and the occasional meta note like this one when the site itself changes.

If you are reading this on the live site, the loop closed successfully: markdown file → build → the page you are on now.
