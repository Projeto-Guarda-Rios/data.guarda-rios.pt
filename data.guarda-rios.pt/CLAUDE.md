# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**See also:** `../CLAUDE.md` for project-level context about Guarda Rios and the Websites directory as a whole.

## About This Site

`data.guarda-rios.pt` is the public data portal for the Guarda Rios project. All monitoring stations send their readings to an API running on the project server; this site visualises those readings via embedded Grafana panels. Every measurement from every station and every river is freely accessible here — no login required.

**UI style:** Developer/brutalist aesthetic, minimalistic, monospace font throughout.

## Commands

```bash
npm run dev       # Start dev server at localhost:3000
npm run build     # Static export to /out (output: "export")
npm run start     # Serve production build
npm run lint      # ESLint
```

There are no tests. Build output is a fully static site in `/out/`.

## Architecture

**Stack:** Next.js 15 (App Router, static export) · React 19 · TypeScript · Tailwind CSS · next-intl · next-themes · shadcn-style components (Radix UI)

### Routing & i18n

All routes are locale-prefixed (`/pt/...`, `/en/...`). The root `/` redirects client-side to `/pt`.

```
src/app/
├── layout.tsx           ← Minimal pass-through (no <html>/<body>)
├── page.tsx             ← Client redirect → /pt
└── [locale]/
    ├── layout.tsx       ← Real layout: html, body, providers, sidebar+header shell
    ├── page.tsx         ← Home page
    └── dashboard/
        └── <station>/page.tsx
```

- `src/i18n/routing.ts` — defines locales (`pt`, `en`) and default (`pt`)
- `src/i18n/request.ts` — server-side next-intl config that loads `messages/<locale>.json`
- `src/navigation.ts` — re-exports `Link`, `usePathname`, `useRouter` from next-intl (always import from here, not `next/link`)
- `messages/pt.json` + `messages/en.json` — all UI strings; keys must be identical across both files

`generateStaticParams` in `[locale]/layout.tsx` iterates `routing.locales`, so new locales only need a new messages file + registration in `routing.ts`.

### Data Visualisation

`src/components/grafana-chart.tsx` embeds Grafana panels as iframes:
- Grafana base URL: `https://data.guarda-rios.pt/grafic-embed/d-solo/ae9l1138nc5xce/pgr-all-data`
- Each chart takes a `panelId` (integer from Grafana)
- Theme syncs with the app's dark/light mode via `?theme=` param
- Timestamps update to show last 1 hour; auto-refreshes at a configurable interval (default 5 min)

### Adding a New Dashboard (Station)

1. Create `src/app/[locale]/dashboard/<slug>/page.tsx` using `DashboardPage` component
2. Add translations to **both** `messages/pt.json` and `messages/en.json` under `dashboard.<key>`
3. Optionally add a nav item to the `navItems` array in `src/components/sidebar.tsx`

See `.claude/i18n-guide.md` for the exact code patterns.

### Key Components

| Component | Purpose |
|-----------|---------|
| `DashboardPage` | Reusable dashboard layout — takes `title`, `description`, `charts[]`, `refreshInterval` |
| `GrafanaChart` | Single Grafana panel iframe with theme-awareness and auto-refresh |
| `Sidebar` / `MobileSidebar` | Desktop sidebar + mobile sheet nav |
| `Header` | Terminal-style breadcrumb, language toggle (pt↔en), theme toggle |
| `ThemeProvider` | Wraps next-themes; default theme is dark |

### Critical Rules

- Always import `Link` and `usePathname` from `@/navigation`, not `next/link` / `next/navigation`
- All UI strings live only in `messages/*.json` — never hardcode text in components
- Every new page must go under `src/app/[locale]/` to be locale-aware
- Root `app/layout.tsx` must stay a minimal pass-through — `<html>`/`<body>` only in `[locale]/layout.tsx`
- `output: "export"` means no server-side features (no API routes, no middleware, no ISR)
