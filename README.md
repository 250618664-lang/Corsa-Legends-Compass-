# Corsa Legends Compass

Unofficial Corsa Legends (Roblox) source-safe helper — Tune & Code Checker.

**Mode:** Roblox fast-test static site on Vercel temporary domain.
**Ads:** OFF. **Analytics:** NONE.

## Pages

| URL | Purpose |
|---|---|
| `/` | Home Task Hub |
| `/codes/` | Official code status checker |
| `/tune-helper/` | Tune category checklist |
| `/updates/` | Update tracker |
| `/wiki-discord/` | Wiki & Discord source status |
| `/sources/` | Source trust cards |
| `/about/` | Unofficial disclaimer & boundaries |

## Commands

```bash
npm install
npm run dev      # local dev server
npm run build    # production build
npm run check    # Astro type check
npm run validate # content validator (banned phrases)
```

## Build requirements

- Node.js 18+
- No external image assets — CSS-only UI
- No analytics or tracking scripts
- `npm run build` must pass before any deployment

## Content rules

Banned phrases — only allowed in "Not confirmed" / "Hold" / "Cannot verify" context:

- `best car` / `best engine` / `best tune`
- `exact tune` / `supra tune`
- `all working codes` / `active codes`
- `official Discord`
- `car values` / `money farm`

## What's NOT in this repo

```
research/  — private evidence pack
runs/      — private run records
data/      — project data (not site data)
.agents/   — agent memory
*.md       — project docs (except this README)
```

## Public registry (src/data/)

Only minimal, page-runtime data is in `src/data/`:
- `site.ts` — site config, nav, page list
- `claims.ts` — approved claims only, no research notes

## Deploy

This repo is deploy-ready to Vercel/Cloudflare Pages with a standard Astro static build.

**Do not connect to Echoes Compass or Demon Born Compass repos, domains, or GSC properties.**
