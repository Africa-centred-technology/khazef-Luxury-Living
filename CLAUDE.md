# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Khazef — Porcelain Elegance** is a luxury real-estate marketing site for a residential project (R+6, 25 apartments, 2 shops) in Safi, Morocco. The UI is in French with Arabic calligraphy accents. Positioning: premium / editorial, not a template.

## Tech stack

- **Vite 5 + React 18 + TypeScript** (SWC via `@vitejs/plugin-react-swc`)
- **React Router DOM v6** — multi-route app under one BrowserRouter; each section is its own route
- **Tailwind CSS 3** with `tailwindcss-animate`, shadcn/ui primitives in `src/components/ui/`
- **Radix UI** (extensive) + **Framer Motion** + **lucide-react**
- **TanStack Query** (provider mounted, not heavily used yet)
- **Vitest + @testing-library/react + jsdom** for tests
- **bun** and **npm** lockfiles both exist — prefer the tool the user is actively using; `bun.lock` + `bun.lockb` are current, `package-lock.json` is also committed
- `lovable-tagger` is a dev-only Vite plugin (project originated on Lovable) — do not remove

> Note: `cahier_des_charges_site_web_projet_khazef.md` specifies Next.js, but the delivered implementation is Vite. Treat the cahier as product/UX requirements, not stack authority.

## Commands

Run from `khazef-porcelain-elegance/` (the repo root is `D:\Immobilier\` and contains only this project).

```bash
npm run dev         # Vite dev server on http://localhost:8080 (host "::", HMR overlay disabled)
npm run build       # production build
npm run build:dev   # build with mode=development (keeps lovable-tagger)
npm run preview     # preview the production build
npm run lint        # eslint . (flat config, eslint.config.js)
npm run test        # vitest run (one-shot)
npm run test:watch  # vitest watch mode
```

Run a single test file:

```bash
npx vitest run src/test/example.test.ts
npx vitest run -t "name of the test"   # by test name
```

## Architecture

### Routing shell
- `src/main.tsx` → `src/App.tsx` mounts `QueryClientProvider` → `TooltipProvider` → toasters → `BrowserRouter`.
- A single `<Route element={<Layout />}>` parent wraps every page. `Layout` (`src/components/layout/Layout.tsx`) renders `Navbar`, a keyed `<main key={pathname} className="page-enter">` for per-route fade-in animation, and `Footer`. It also scrolls to top on every `pathname` change.
- Pages live flat in `src/pages/` (`Home`, `Project`, `Location`, `Apartments`, `Plans`, `Timeline`, `VirtualTour`, `Gallery`, `Safi`, `Contact`, `NotFound`). Adding a new section = add a page file and a `<Route>` in `App.tsx`, plus a link in `src/components/layout/Navbar.tsx` (the `NAV` array, which also controls what appears in the sticky navbar vs. the mobile drawer — desktop uses `.slice(0, 9)`).

### Design system (single source of truth)
- `src/index.css` defines the entire palette, gradients, shadows, and typography tokens as HSL CSS variables on `:root`. **All colors go through these tokens** — do not hardcode hex values inside components.
- `tailwind.config.ts` consumes those variables (`hsl(var(--primary))`, `hsl(var(--gold))`, `hsl(var(--turquoise))`, etc.) and exposes custom font families: `font-display` (Cormorant Garamond), `font-sans` (Outfit), `font-arabic` (Amiri). Fonts are loaded via a Google Fonts `@import` at the top of `index.css`.
- Opinionated component classes live in `@layer components` of `index.css`: `.container-luxe`, `.h-hero`, `.h-display`, `.h-section`, `.eyebrow`, `.gold-rule`, `.link-luxe`, `.arabic`, `.pattern-zellige`, `.page-enter`, `.reveal`. Use these for editorial consistency instead of re-rolling bespoke styles.
- Custom keyframes: `fade-in`, `slow-pan` (hero images), `pulse-gold` (hotspots). Reach for these before adding new ones.
- `CHARTE-GRAPHIQUE.md` is the human-readable brand spec. When palette, typography, or spacing changes land in `index.css` / `tailwind.config.ts`, mirror the change there so design docs do not drift.

### Components
- `src/components/ui/` — shadcn/ui primitives. Aliases from `components.json`: `@/components`, `@/components/ui`, `@/lib`, `@/lib/utils`, `@/hooks`. Use these, not relative paths.
- `src/components/layout/` — app chrome: `Navbar` (sticky, transparent → glass on scroll), `Footer`, `Layout`.
- Page-agnostic building blocks at the top of `src/components/`: `CtaBanner`, `NavLink`, `PageHeader`, `Seo`.
- `src/components/Seo.tsx` is a client-side `useEffect` SEO shim — it mutates `document.title`, `<meta name="description">`, and the canonical `<link>`. Because this is a SPA (not SSR), metadata is not discoverable without JS; treat it as a convenience, not real SEO. Each page calls `<Seo title description />` at the top.

### TypeScript posture
`tsconfig.json` deliberately relaxes strictness: `strictNullChecks: false`, `noImplicitAny: false`, `noUnusedLocals: false`, `noUnusedParameters: false`, `allowJs: true`. Path alias is `@/* → src/*`. Do not tighten these blindly; prefer adding types at new public APIs and leaving legacy surfaces alone.

### Testing
- Vitest runs in `jsdom` with globals enabled. Setup file `src/test/setup.ts` imports `@testing-library/jest-dom` and stubs `window.matchMedia`.
- Test files live alongside source as `*.test.ts(x)` / `*.spec.ts(x)` under `src/**`.

### Dev server quirks
- Vite binds to `host: "::"` on port **8080**. HMR overlay is disabled (errors go to the console, not the page).
- React, ReactDOM, and TanStack Query are de-duped in `vite.config.ts` — relevant when adding a dependency that bundles its own React copy.
