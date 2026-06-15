# Blog content guide

How to write posts and writeups for this site. Reference style: [velnic.dev example](https://velnic.dev/posts/new-blog-s3-cloudfront-aws-deploy/).

## Folder layout

```
content/blog/
├── posts/
│   ├── fr/   # French blog posts
│   └── en/   # English blog posts
└── writeups/
    ├── fr/   # French technical writeups
    └── en/   # English technical writeups
```

- **Posts** → general articles (`content/blog/posts/`)
- **Writeups** → technical deep-dives (`content/blog/writeups/`)
- Each article exists in **both** `fr/` and `en/` with matching translation slugs in frontmatter

## Frontmatter

```yaml
---
title: "Article title"
summary: "Short description for listings and SEO"
date: 2025-06-01
fr: slug-en-francais
en: english-slug
draft: false
tags:
  - moodle
  - php
theme: https://www.youtube.com/watch?v=VIDEO_ID#t=42
project: Project Name
---
```

| Field | Required | Notes |
|-------|----------|-------|
| `title` | yes | Display title |
| `summary` | yes | Shown on blog index |
| `date` | yes | `YYYY-MM-DD` |
| `fr` | yes | Slug used in `/blog/.../fr-slug` when viewing FR |
| `en` | yes | Slug used in `/blog/.../en-slug` when viewing EN |
| `draft` | no | `true` hides from the blog (default: `false`) |
| `tags` | no | Used for tag filtering on `/blog` |
| `theme` | no | **Full URL** to a background music/video (hash `#` allowed) |
| `project` | no | Writeups only — shown in metadata line |

`theme` must be a URL, not a label:

```yaml
# Good
theme: https://www.youtube.com/watch?v=abc123#t=30

# Bad
theme: moodle
```

## Headings and summary

Headings `#`, `##`, and `###` in the body:

- Appear in the **right-hand summary** (table of contents)
- Get anchor links for in-page navigation
- The active section is highlighted while scrolling
- **Ignored inside fenced code blocks** — a `# comment` in a ` ``` ` block will not appear in the summary

The page title in frontmatter is shown separately in the header — the `#` heading in the body is optional but recommended for the summary.

## Callouts

Use GitHub alert syntax (same as velnic.dev):

```markdown
> [!NOTE]
> Information readers should notice.

> [!TIP]
> Optional helpful advice.

> [!IMPORTANT]
> Crucial information.

> [!WARNING]
> Risk or caution.

> [!CAUTION]
> Negative consequences of an action.
```

Multi-line callouts:

```markdown
> [!WARNING]
> Pricing depends on usage and region.
> Always check the AWS pricing page before deploying.
```

## Code blocks

Fenced blocks with a language tag get syntax highlighting and a **Copy** button (toast on success).

**Default (file window)** — tab label with a primary accent line, ideal for source files:

````markdown
```python title="app.py — the filter"
PING_BLOCK_RE = re.compile(r"[;|`$&]")
```
````

Without `title`, the language name is used as the tab label (e.g. `python`).

**Terminal style** — add `is-terminal` for shell commands (language left, title centered, copy right):

````markdown
```bash is-terminal title="Run the local Moodle stack"
npm run dev
```
````

**No header** — add `no-title` to hide the title bar; copy button floats inside the block (top-right):

````markdown
```json no-title
{ "hello": "world" }
```
````

Works with `is-terminal` and `highlight` as well.

### Line highlights

Highlight specific lines with a blue background and left accent — useful for drawing attention to key lines in a longer block.

Use `highlight="3-4"` for a range, or comma-separated values like `highlight="1,3-5"`:

````markdown
```bash is-terminal title="Run the local Moodle stack" highlight="2-3"
# From the project root
cd moodle-docker-wrapper
npm run dev
```
````

Alternative brace syntax: `{3-4}` on the fence line.

Supported languages follow [Prism](https://prismjs.com/#supported-languages) (e.g. `bash`, `php`, `js`, `ts`, `json`, `yaml`, `sql`).

### Inline code

Single backticks render as a primary-colored pill: `` `app.py` ``.

## Images

Markdown images render as a `blog-image` figure: gradient frame and shadow by default, optional caption inside the frame. Put files under `public/` and reference them with a root path:

```markdown
![Alt text for accessibility](/content/blog/example.gif)
```

The **alt text** is only for screen readers — it is not shown on the page. Use a caption (below) for visible text.

### Size and frame

Optional modifiers go in the image **title** (quoted string after the URL), separated by spaces or commas:

| Tag | Effect |
|-----|--------|
| `size-small` | Image max width ~14rem |
| `size-medium` | Image max width ~20rem (default) |
| `size-big` | Image max width ~48rem |
| `no-background` | No gradient frame or shadow |

**Size tags apply to the image only**, not the caption. The image stays centred inside the frame; with a caption, the caption bar spans the full width of the card.

Without a caption, the frame wraps tightly around the image. With a caption, the frame stretches to the full prose width — the image keeps its size limit, the caption sits below it inside the same background.

### Captions

Add a caption after ` | ` in the title (tags on the left, caption on the right). You can also use `caption:` when there are no other tags:

```markdown
![Pam comparing two photos](/content/blog/same-picture.gif "size-small, no-background | Corporate needs you to find the differences between this CV and this blog. (They're the same picture.)")

![Screenshot](/content/blog/ui.png "size-big | The new blog layout in light mode.")

![Logo](/content/blog/logo.png "caption: Project logo")
```

Captions render in italic inside the frame, below the image, with a shared border between image and caption.

## Inline formatting

```markdown
**bold** and *italic*

[link text](https://example.com)

- bullet list
- second item

1. numbered list
2. second item

| Column | Value |
|--------|-------|
| Key    | Data  |
```

Tables, strikethrough (`~~text~~`), and task lists (`- [ ] todo`) are supported via GFM.

## Full example

```markdown
---
title: "My article"
summary: "A short summary."
date: 2026-03-15
fr: mon-article
en: my-article
draft: false
tags:
  - web
theme: https://www.youtube.com/watch?v=example
---

# My article

Intro paragraph with **bold** text.

> [!NOTE]
> A note for the reader.

## First section

```bash title="Install dependencies"
npm install
```

## Conclusion

Final thoughts.
```

## Common mistakes

- Putting posts in `content/blog/fr/` — use `content/blog/posts/fr/` instead
- Using `kind: post` in frontmatter — folder (`posts/` vs `writeups/`) defines the type
- Mismatched `fr` / `en` slugs between translation files — language switch won't find the counterpart page
- Forgetting the matching file in the other locale folder
