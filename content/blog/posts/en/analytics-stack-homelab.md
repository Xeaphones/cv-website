---
title: "Self-hosting an analytics stack"
summary: "Why Umami left the utils box, how Rybbit, Beszel, Speedtest, and Dockhand share one analytics LXC, and what stays internal versus public."
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

I used to keep site analytics on the same “utils” LXC as dashboards and password vault. It worked until it did not: SPA double pageviews, a public hostname glued to the wrong proxy, and a growing urge to separate **product analytics** from **host monitoring**.

So analytics got its own Debian Docker LXC. Call it `analytics-server`. Everything that answers “is the site healthy?”, “is the lab healthy?”, or “which image is stale?” lives there (or talks to a hub there).

> [!NOTE]
> Hostnames below use `example.com` and `192.168.x.x`. Patterns only. Secrets stay in a password manager and deploy env.

## What belongs on that box


| Concern                        | Tool                                                                                                   | Audience                       |
| ------------------------------ | ------------------------------------------------------------------------------------------------------ | ------------------------------ |
| Website traffic                | **[Rybbit](https://rybbit.io "icon: sh/rybbit")** (ClickHouse + Postgres + Redis)                                        | Me · optional public dashboard |
| Host / Docker metrics          | **[Beszel](https://beszel.dev "icon: sh/beszel")** hub + agents                                                          | LAN only                       |
| WAN speed history              | **[Speedtest Tracker](https://docs.linuxserver.io/images/docker-speedtest-tracker/ "icon: si/speedtest")**                  | LAN only                       |
| Image updates / remote compose | **[Dockhand](https://github.com/Finsys/dockhand "icon: si/github")** + [Hawser](https://github.com/Finsys/hawser "icon: si/github") agents | LAN only                       |


Rybbit, Speedtest, and the shared Postgres sit under `/opt/analytics`. Beszel has its own compose under `/opt/beszel`. Dockhand is a separate compose under `/opt/dockhand` with a Docker socket mount: ops glue for the fleet, not a metrics product.

## Umami → Rybbit

[Umami](https://umami.is "icon: si/umami") was fine for a static page. On a React SPA it was easy to fire a pageview twice (router hook + script). [Rybbit](https://rybbit.io "icon: sh/rybbit")’s script can track SPA navigations on its own (`autoTrackSpa`). Rule that stuck:

> Do **not** also call a manual `pageview()` on every client route change.

The public script loads from an **external** hostname (`analytics.external.example.com` style). The CV site is hosted elsewhere; browsers must reach the collector over the internet. The LAN hostname stays for the dashboard when I am home.

Caddy splits the app the same way as other dual-port stacks:

- `/api/*` → backend (`:3001`)
- everything else → client UI (`:3002`)

Internal edge: `tls internal`. External edge: public ACME, port-forward only what that hostname needs.

Build-time env on the site (CI secrets) injects script URL and site id. No analytics keys in the git tree.

## Beszel: small hub, many agents

[Beszel](https://beszel.dev "icon: sh/beszel") is the “are the boxes alive?” layer: CPU, RAM, disk, Docker stats, alerts. Hub on analytics-server; a **local** agent talks over a unix socket. Other LXCs run remote agents that call the hub on its LAN IP (not through Caddy).

That split matters. Dashboards and humans use `beszel.internal.example.com`. Agents use a boring `http://192.168.x.x:8090` so a proxy blip does not look like every host dying at once.

## Speedtest on the shared Postgres

[Speedtest Tracker](https://docs.linuxserver.io/images/docker-speedtest-tracker/ "icon: si/speedtest") moved onto the same compose as Rybbit and got its **own** Postgres database on the shared `postgres` service (fresh DB, not a SQLite lift-and-shift). Scheduled runs a couple of times a day, prune old rows, expose the UI on an internal hostname only.

Sharing Postgres keeps the CT smaller. Separate databases keep a Speedtest migration from touching Rybbit.

## Dockhand: image hygiene and remote stacks

[Dockhand](https://github.com/Finsys/dockhand "icon: si/github") watches running containers for newer images (**digest**-based, not “tag moved”). It can auto-pull with a CVE gate before recreate, notify via Apprise, and manage compose stacks from a UI.

On analytics-server it mounts:

- the host Docker socket (local env);
- `/opt:/opt` so the Adopt browser can see host compose trees (without that mount, only the container’s empty FS shows up);
- a data dir for its SQLite DB.

### Local vs remote environments


| Environment                       | How it connects                                           | Typical use                   |
| --------------------------------- | --------------------------------------------------------- | ----------------------------- |
| `analytics-server`                | Local Docker socket                                       | Stacks on the same CT         |
| Remote hosts (arr, game panel, …) | **[Hawser](https://github.com/Finsys/hawser "icon: si/github")** edge agent | Compose living on another LXC |


Hawser is a small outbound Go agent: it dials **out** to Dockhand over WebSocket. No inbound ports and no SSH keys on the managed host. The agent compose lives in its own project (never nested inside a managed stack), and the container gets `dockhand.update=false` so Dockhand never “helpfully” recreates its own agent mid-flight.

### Adopting a stack that already runs elsewhere

The Adopt dialog only browses the **Dockhand host** filesystem. For a remote stack (for example the *arr compose):

1. Copy the compose onto the Dockhand host under something like `/opt/dockhand-stacks/<name>/`.
2. In the UI, select that remote environment → Adopt → point at the copied file.
3. Prefer **absolute** volume paths in compose so a remote deploy reconciles in place instead of inventing a second copy of the data.

After adoption, edit in the Dockhand UI (or move to a Git-backed stack). A hand edit on the remote `/opt/.../docker-compose.yml` is invisible to Dockhand, and the reverse is also true.

### Gotchas that burned time

- After auth failures, Dockhand rate-limits by IP **before** checking the token. Symptom: `failed to receive welcome` with a fresh token. Restart both sides.
- Large pulls through Hawser may need a longer request timeout on the agent.
- LAN `ws://` to Dockhand’s port is enough at first; if you later put Dockhand behind HTTPS Caddy, agents switch to `wss://` and need a CA (or a temporary skip-verify for tests).

UI stays on `dockhand.internal.example.com`. Agents keep talking to the hub over the LAN WebSocket URL, same idea as Beszel: bookmarks ≠ agent endpoints.

## Internal vs external (again)

Same rule as the rest of the lab:


| Hostname style | Example role                                           |
| -------------- | ------------------------------------------------------ |
| `*.internal`   | Beszel, Speedtest, Dockhand, Rybbit dashboard on LAN   |
| `*.external`   | Rybbit collector (and dashboard if you want it public) |


Only the collector needs WAN. Everything else can stay behind the internal proxy.

## What stuck

- **SPA analytics:** one auto-tracker, not two.
- **Public BASE_URL** for Rybbit must match the external hostname the script uses, or auth and cookies get weird.
- **Agent URLs ≠ bookmark URLs** for Beszel and Dockhand/Hawser.
- **Dockhand:** new host = new environment + new Hawser token; label the agent `dockhand.update=false`.

## Recap

The analytics stack is a dedicated LXC with clear jobs: Rybbit for the site, Beszel for host health, Speedtest for the WAN, Dockhand for image updates and remote compose. Public DNS only where a browser on the internet must talk back. The rest stays on `*.internal`.