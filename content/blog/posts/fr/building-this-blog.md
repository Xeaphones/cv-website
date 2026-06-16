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

Chaque fichier partage les slugs de traduction dans le frontmatter (`fr` / `en`) pour lier `/blog/posts/building-this-blog` et la version anglaise.

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

## Ce que le blog sait faire

Deux types de contenu coexistent :

```text title="content/blog/"
blog/
├── posts/     # articles courts ou notes
└── writeups/  # analyses techniques plus longues
```

Chaque entrée a un frontmatter validé au build :

```yaml title="Exemple de frontmatter"
---
title: "Titre de l'article"
summary: "Résumé pour la liste et le SEO"
date: 2026-06-15
fr: slug-francais
en: english-slug
draft: false
tags:
  - react
  - vite
theme: https://www.youtube.com/watch?v=pR4iCWB-VVQ
---
```

- **`draft: true`** — masque l'article du blog tant qu'il n'est pas prêt
- **`tags`** — filtres cliquables sur `/blog`
- **`theme`** — lien « Thème » dans la ligne de métadonnées (comme sur cet article)

Sur **`/blog`**, la liste propose une **recherche** plein texte et un **nuage de tags**. Les posts et writeups sont affichés séparément.

Sur **chaque article** :

- un **sommaire** à droite (ou en haut sur mobile) avec surbrillance de la section active au scroll
- la **date**, le **temps de lecture** et le **thème** sous le titre
- les **tags** en bas de page

Les images markdown passent par le composant `blog-image` — taille (`size-small`, `size-medium`, `size-big`), fond optionnel (`no-background`) et **légende** dans le titre :

```markdown
![Meme](/content/blog/same-picture.gif "no-background | Légende visible sous l'image")
```

> [!TIP]
> Le guide complet pour écrire est dans `content/blog/README.md` : callouts, blocs de code, tableaux GFM, pièges courants.

## CI/CD et déploiement

Le site est déployé automatiquement via GitHub Actions (`.github/workflows/deploy.yml`). Ça garde un workflow très proche d'Astro côté auteur : édition markdown dans git, push, puis rebuild + déploiement automatiques.


### Déclencheurs

- Chaque **push** sur `main`
- Lancement manuel via **workflow_dispatch** (onglet Actions → *Build and Deploy* → *Run workflow*)

### Pipeline

1. **Checkout** du dépôt
2. **Setup Node 20** avec cache npm
3. **`npm ci`** — installation stricte depuis `package-lock.json` (doit rester synchronisé avec `package.json`)
4. **`npm run build`** — exécute d'abord `prebuild` pour régénérer les Content Collections depuis le markdown, puis `vite build`
5. **Installation de `lftp`** sur le runner
6. **Déploiement de `dist/` en FTPS** — `mirror --reverse --delete` synchronise le build vers la racine web distante

### Secrets GitHub

Ils sont stockés dans **Settings → Secrets and variables → Actions**. Ils apparaissent en `***` dans les logs du workflow.


| Secret | Rôle |
|--------|------|
| `FTP_HOST` | Nom d'hôte du serveur FTP |
| `FTP_PORT` | Port FTP |
| `FTP_USER` | Identifiant FTP |
| `FTP_PASSWORD` | Mot de passe FTP |
| `FTP_PATH` | Racine web distante où `dist/` est déployé |

### Étape de déploiement (simplifiée)

```yaml title=".github/workflows/deploy.yml (extrait)"
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
> React Router gère les URLs côté client, mais un **rechargement** sur `/blog/posts/...` passe par Apache. Un `public/.htaccess` redirige les chemins inconnus vers `index.html` pour que les liens profonds fonctionnent en production.

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