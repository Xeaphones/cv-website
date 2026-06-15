---
title: "Un blog façon Astro sur mon site CV"
summary: "Pourquoi j'ai ajouté un blog markdown à mon portfolio, comment Content Collections et React le font tourner, et pourquoi ça reste le même site CV en dessous."
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

Je voulais un endroit pour écrire sur mon alternance, des expérimentations perso et des notes techniques — sans créer un second site ni abandonner le portfolio que les recruteurs ont déjà en favori.

Ce site reste **mon CV** : accueil, projets, expériences, contact. Le blog est une pièce en plus dans la même maison.

> [!NOTE]
> La stack est **React + Vite**, pas Astro. C'est surtout l'*expérience d'écriture* qui rappelle Astro : des fichiers markdown dans git, du frontmatter typé, et du contenu intégré au build.

## Ce que je visais

- **Un seul domaine, un seul déploiement** — pas de `blog.example.com` avec un autre design.
- **Du markdown dans le dépôt** — écrire dans l'IDE, relire en PR, publier avec le site.
- **Français et anglais** — slugs jumelés pour que le changement de langue retrouve la traduction.
- **Une lecture agréable** — sommaire, encadrés, blocs de code avec titre et surlignage de lignes, tags.

Des blogs comme [velnic.dev](https://velnic.dev) ont servi de référence : fenêtres de code, alertes GitHub, colonne de sommaire pendant le scroll.

## Organisation du contenu

Les articles sont rangés par langue :

```text title="content/blog/posts/"
posts/
├── en/   # articles en anglais
└── fr/   # articles en français
```

Chaque fichier partage les slugs de traduction dans le frontmatter (`fr` / `en`) pour lier `/blog/posts/blog-astro-sur-mon-cv` et la version anglaise.

[Content Collections](https://www.content-collections.dev/) valide le frontmatter avec Zod au build — titre, date, tags, brouillon — et génère des imports typés pour React. C'est l'équivalent le plus proche des content layers Astro ici : **fichiers → schéma → composants**.

## Au moment du build

```bash is-terminal title="Workflow de dev"
npm run dev
# predev régénère les exports des collections depuis le markdown
```

En `dev` et `build`, un script met à jour les modules générés. La liste du blog trie les articles ; chaque page utilise `BlogMarkdownContent` avec :

- **GFM** — tableaux, listes de tâches, barré
- **Alertes GitHub** — `> [!NOTE]`, `> [!TIP]`, etc.
- **Clôtures de code custom** — `title="..."`, `is-terminal`, `no-title`, `highlight="2-3"`

Le code inline comme `content-collections.ts` apparaît en pastille ; les blocs ont la coloration syntaxique et un bouton copier.

## CI/CD et déploiement

J'ai ajouté une pipeline CI/CD simple pour l'hébergement LWS avec GitHub Actions :

- `npm ci` puis `npm run build` à chaque push sur `main`
- déploiement de `dist/` en SSH avec `rsync --delete`
- les mises à jour markdown sont publiées automatiquement après push

Ça garde un workflow très proche d'Astro côté auteur : édition markdown dans git, push, puis rebuild + déploiement automatiques.

## Toujours un site CV

![Pam de The Office compare deux photos (the office meme)](/content/blog/same-picture.gif "no-background | La direction vous demande de trouver les différences entre ce CV et ce blog.")

Les routes portfolio ne changent pas :

- `/` — à propos et compétences
- `/projects` — frises et fiches projets
- `/blog` — derniers articles et writeups, filtres par tags, recherche
- `/contact` — formulaire et liens

Le header est le même ; **Blog** reste souligné sur les pages d'article. Thème clair/sombre, i18n et couleurs inspirées de Catppuccin partout.

## La suite

Des notes courtes sur mes experimentations du quotidien (homelab, outils, etc), des writeups plus longs quand le sujet le mérite, et parfois une note méta comme celle-ci quand le site évolue.

Si vous lisez ceci en production, la boucle est bouclée : fichier markdown → build → la page sous vos yeux.