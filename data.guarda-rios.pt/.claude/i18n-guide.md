# i18n Guide — data.guarda-rios.pt

This project uses **next-intl** for internationalisation with static export (`output: "export"`).
Supported locales: **`pt`** (default) and **`en`**.

---

## Architecture Overview

```
messages/
├── pt.json                         ← Portuguese strings (default)
└── en.json                         ← English strings

src/
├── i18n/
│   ├── routing.ts                  ← Locale list + defaultLocale
│   └── request.ts                  ← next-intl server config (loads messages)
├── navigation.ts                   ← Re-exports Link, usePathname, useRouter from next-intl
└── app/
    ├── layout.tsx                  ← Minimal pass-through (no html/body here)
    ├── page.tsx                    ← Client-side redirect → /pt
    └── [locale]/
        ├── layout.tsx              ← Real layout: html, body, NextIntlClientProvider, ThemeProvider
        ├── page.tsx                ← Home page
        └── dashboard/
            ├── geral/page.tsx
            ├── granja/page.tsx
            ├── ifest/page.tsx
            └── mostra-2025/page.tsx
```

URLs follow the pattern `/pt/...` and `/en/...`.
`/` redirects to `/pt` via a client-side `useEffect`.

---

## Adding a New Page

### 1. Create the page file
```
src/app/[locale]/dashboard/your-page/page.tsx
```

### 2. Add translations to BOTH message files
```json
// messages/pt.json  AND  messages/en.json
"dashboard": {
  "yourPage": {
    "title": "...",
    "description": "..."
  }
}
```
Keep the JSON key structure identical across all locale files — next-intl throws a build error if a key is missing in any locale.

### 3. Write the page component
```tsx
"use client";

import { useTranslations } from "next-intl";
import { DashboardPage } from "@/components/dashboard-page";

export default function YourPage() {
  const t  = useTranslations("dashboard");
  const tc = useTranslations("dashboard.charts");

  const charts = [
    { panelId: 99, title: tc("temperatura") },  // reuse existing chart keys where possible
    { panelId: 100, title: tc("turbidez") },
  ];

  return (
    <DashboardPage
      title={t("yourPage.title")}
      description={t("yourPage.description")}
      charts={charts}
      refreshInterval={300000}
      showRefreshButton  // optional
    />
  );
}
```

### 4. Add a sidebar nav item (optional)
In `src/components/sidebar.tsx`, add to the `navItems` array:
```tsx
{ labelKey: null, label: "Your Page", href: "/dashboard/your-page", icon: SomeIcon },
// OR, if the label needs translation, add it to messages nav section and use:
{ labelKey: "yourPage" as const, href: "/dashboard/your-page", icon: SomeIcon },
```

---

## Adding a New Language

### 1. Register the locale in `src/i18n/routing.ts`
```ts
export const routing = defineRouting({
  locales: ["pt", "en", "es"],   // ← add here
  defaultLocale: "pt",
});
```

### 2. Create the message file
```
messages/es.json   ← copy en.json, translate every value
```

That's all. `generateStaticParams` in `[locale]/layout.tsx` iterates `routing.locales` automatically, so static pages are generated for every locale at build time with no further changes.

---

## Critical Rules

| Rule | Reason |
|------|--------|
| All UI strings live **only** in `messages/*.json` | Single source of truth; never hardcode text in components |
| Import `Link` and `usePathname` from `@/navigation`, **not** `next/link` / `next/navigation` | `@/navigation` wraps next-intl and adds the locale prefix to URLs automatically |
| The **root** `app/layout.tsx` must NOT contain `<html>` or `<body>` | Those live in `[locale]/layout.tsx` so the `lang` attribute can be set per locale |
| Every new page goes under `src/app/[locale]/` | Pages outside `[locale]/` are not locale-aware and won't receive translations |
| `useTranslations` works in both server and client components | For client components (`"use client"`), use it directly; for server components, use `getTranslations` from `next-intl/server` |

---

## Available Translation Namespaces

| Namespace | Used in |
|-----------|---------|
| `metadata` | `[locale]/layout.tsx` — page title & meta description |
| `nav` | `sidebar.tsx` — navigation labels, section heading, status text |
| `header` | `header.tsx` — aria-labels |
| `home` | `[locale]/page.tsx` — entire home page |
| `dashboard` | all dashboard pages + `dashboard-page.tsx` |
| `dashboard.charts` | chart titles shared across all dashboard pages |

---

## Language Switcher

The switcher lives in `src/components/header.tsx`.
It uses `useLocale()` to detect the current locale and `<Link href={pathname} locale={otherLocale}>` to switch while staying on the same page.
To add a third language, no changes to the header are needed — extend the toggle logic if more than two locales are used.
