---
title: "Self-hoster une stack analytics"
summary: "Pourquoi Umami a quitté la boîte utils, comment Rybbit, Beszel, Speedtest et Dockhand partagent un LXC analytics, et ce qui reste interne versus public."
date: 2026-09-24
fr: stack-analytics-homelab
en: analytics-stack-homelab
draft: false
tags:
  - analytics
  - docker
  - dockhand
  - homelab
  - monitoring
project: Homelab
---

Les analytics du site vivaient sur le même LXC « utils » que les dashboards et le coffre de mots de passe. Ça tenait jusqu'au moment où ça a coincé : double pageview SPA, hostname public collé au mauvais proxy, et l'envie de séparer **analytics produit** et **monitoring des hôtes**.

Donc un LXC Debian + Docker dédié. Appelons-le `analytics-server`. Tout ce qui répond à « le site va bien ? », « le lab va bien ? » ou « quelle image est périmée ? » vit là (ou parle à un hub là).

> [!NOTE]
> Les hostnames ci-dessous utilisent `example.com` et `192.168.x.x`. Des motifs seulement. Les secrets restent dans un gestionnaire de mots de passe et l'env de deploy.



## Ce qui vit sur cette boîte


| Besoin                         | Outil                                                                                                  | Audience                         |
| ------------------------------ | ------------------------------------------------------------------------------------------------------ | -------------------------------- |
| Trafic du site                 | **[Rybbit](https://rybbit.io "icon: sh/rybbit")** (ClickHouse + Postgres + Redis)                                        | Moi · dashboard public optionnel |
| Métriques hôtes / Docker       | **[Beszel](https://beszel.dev "icon: sh/beszel")** hub + agents                                                          | LAN seulement                    |
| Historique débit WAN           | **[Speedtest Tracker](https://docs.linuxserver.io/images/docker-speedtest-tracker/ "icon: si/speedtest")**                  | LAN seulement                    |
| MàJ d'images / compose distant | **[Dockhand](https://github.com/Finsys/dockhand "icon: si/github")** + agents [Hawser](https://github.com/Finsys/hawser "icon: si/github") | LAN seulement                    |


Rybbit, Speedtest et le Postgres partagé sont sous `/opt/analytics`. Beszel a son propre compose sous `/opt/beszel`. Dockhand est un compose à part sous `/opt/dockhand` avec le socket Docker monté : de la colle ops pour la flotte, pas un produit de métriques.

## Umami → Rybbit

[Umami](https://umami.is "icon: si/umami") allait bien pour une page statique. Sur une SPA React, il est facile de tirer un pageview deux fois (hook router + script). Le script [Rybbit](https://rybbit.io "icon: sh/rybbit") peut suivre les navigations SPA tout seul (`autoTrackSpa`). La règle qui est restée :

> Ne **pas** appeler aussi un `pageview()` manuel à chaque changement de route client.

Le script public charge depuis un hostname **externe** (style `analytics.external.example.com`). Le site CV est hébergé ailleurs ; les navigateurs doivent joindre le collector depuis Internet. Le hostname LAN reste pour le dashboard quand je suis à la maison.

Caddy découpe l'app comme les autres stacks bi-ports :

- `/api/*` → backend (`:3001`)
- tout le reste → UI client (`:3002`)

Bord interne : `tls internal`. Bord externe : ACME public, port-forward uniquement pour ce hostname.

L'env de build du site (secrets CI) injecte l'URL du script et l'id de site. Aucune clé analytics dans le dépôt git.

## Beszel : petit hub, beaucoup d'agents

[Beszel](https://beszel.dev "icon: sh/beszel"), c'est la couche « les boîtes sont vivantes ? » : CPU, RAM, disque, stats Docker, alertes. Hub sur analytics-server ; un agent **local** parle en unix socket. Les autres LXC tournent des agents distants qui appellent le hub sur son IP LAN (pas via Caddy).

Ce split compte. Humains et dashboards utilisent `beszel.internal.example.com`. Les agents utilisent un banal `http://192.168.x.x:8090` pour qu'un blip proxy ne ressemble pas à tous les hôtes morts d'un coup.

## Speedtest sur le Postgres partagé

[Speedtest Tracker](https://docs.linuxserver.io/images/docker-speedtest-tracker/ "icon: si/speedtest") a migré sur le même compose que Rybbit, avec sa **propre** base Postgres sur le service `postgres` partagé (DB neuve, pas un lift SQLite). Runs planifiés deux fois par jour, prune des vieux résultats, UI sur un hostname interne seulement.

Partager Postgres garde le CT léger. Séparer les databases évite qu'une migration Speedtest touche Rybbit.

## Dockhand : hygiène des images et stacks distantes

[Dockhand](https://github.com/Finsys/dockhand "icon: si/github") surveille les conteneurs pour de nouvelles images (par **digest**, pas « le tag a bougé »). Il peut auto-pull avec un gate CVE avant recreate, notifier via Apprise, et gérer des stacks compose depuis une UI.

Sur analytics-server il monte :

- le socket Docker hôte (env local) ;
- `/opt:/opt` pour que le navigateur Adopt voie les arbres compose de l'hôte (sans ça, seul le FS vide du conteneur apparaît) ;
- un data dir pour sa SQLite.



### Environnements locaux vs distants


| Environnement                       | Connexion                                                 | Usage typique                    |
| ----------------------------------- | --------------------------------------------------------- | -------------------------------- |
| `analytics-server`                  | Socket Docker local                                       | Stacks sur le même CT            |
| Hôtes distants (arr, panel jeux, …) | Agent edge **[Hawser](https://github.com/Finsys/hawser "icon: si/github")** | Compose qui vit sur un autre LXC |


Hawser est un petit agent Go en outbound : il dial **vers** Dockhand en WebSocket. Pas de ports entrants, pas de clés SSH sur l'hôte géré. Le compose de l'agent vit dans son propre projet (jamais imbriqué dans une stack gérée), avec le label `dockhand.update=false` pour que Dockhand ne recrée pas « gentiment » son propre agent en plein vol.

### Adopter une stack déjà en route ailleurs

Le dialogue Adopt ne parcourt que le filesystem de l'**hôte Dockhand**. Pour une stack distante (par ex. le compose *arr) :

1. Copier le compose sur l'hôte Dockhand sous quelque chose comme `/opt/dockhand-stacks/<nom>/`.
2. Dans l'UI, choisir cet environnement distant → Adopt → pointer le fichier copié.
3. Préférer des chemins de volumes **absolus** dans le compose pour qu'un deploy distant réconcilie sur place au lieu d'inventer une seconde copie des data.

Après adoption, éditer dans l'UI Dockhand (ou passer en stack Git). Une modif à la main sur le `/opt/.../docker-compose.yml` distant est invisible pour Dockhand, et l'inverse aussi.

### Pièges qui ont coûté du temps

- Après des échecs d'auth, Dockhand rate-limit par IP **avant** de vérifier le token. Symptôme : `failed to receive welcome` avec un token frais. Restart des deux côtés.
- Les gros pulls via Hawser peuvent demander un request timeout plus long côté agent.
- Du `ws://` LAN vers le port Dockhand suffit au début ; si tu mets Dockhand derrière Caddy en HTTPS plus tard, les agents passent en `wss://` et ont besoin d'une CA (ou d'un skip-verify temporaire pour les tests).

L'UI reste sur `dockhand.internal.example.com`. Les agents gardent l'URL WebSocket LAN du hub, même idée que Beszel : favoris ≠ endpoints agents.

## Interne vs externe (encore)

Même règle que le reste du lab :


| Style de hostname | Exemple de rôle                                          |
| ----------------- | -------------------------------------------------------- |
| `*.internal`      | Beszel, Speedtest, Dockhand, dashboard Rybbit sur le LAN |
| `*.external`      | Collector Rybbit (et dashboard si tu le veux public)     |


Seul le collector a besoin du WAN. Le reste peut rester derrière le proxy interne.

## Ce qu'il fallait retenir

- **Analytics SPA :** un auto-tracker, pas deux.
- Le **BASE_URL** public de Rybbit doit matcher le hostname externe du script, sinon auth et cookies deviennent bizarres.
- **URLs agents ≠ URLs favoris** pour Beszel et Dockhand/Hawser.
- **Dockhand :** nouvel hôte = nouvel environnement + nouveau token Hawser ; labeler l'agent `dockhand.update=false`.



## Récap

La stack analytics, c'est un LXC dédié avec des jobs clairs : Rybbit pour le site, Beszel pour la santé des hôtes, Speedtest pour le WAN, Dockhand pour les màj d'images et le compose distant. DNS public seulement là où un navigateur sur Internet doit rappeler. Le reste reste en `*.internal`.