# Audit final — Accessibilité & Responsive · Les Villas Ahlam

> Dernière tâche de mise en conformité CDC. Le site couvre désormais l'intégralité
> du cahier des charges v1.2. Ce document récapitule la passe finale
> accessibilité / responsive et l'état de production.

---

## 1. Corrections appliquées lors de cette passe

| Point | Problème | Correctif |
|---|---|---|
| **Landmark `<main>`** | `<main>` imbriqués (Layout + pages `Lots`/`LegalShell`) → landmark invalide | Un seul `<main id="main" tabindex="-1">` dans `Layout` ; les pages passent en `<div>` |
| **Lien d'évitement** | Absent (navigation clavier fastidieuse) | Skip link « Aller au contenu » (visible au focus) en tête du `Layout`, cible `#main` |
| **Mouvement réduit** | Animations (logo, transitions, pan) non gérées | `@media (prefers-reduced-motion: reduce)` global dans `index.css` (WCAG 2.3.3) |
| **Marqueur `<details>` (FAQ)** | Marqueur natif visible sur Safari/WebKit | `summary::-webkit-details-marker { display: none }` |

---

## 2. Points déjà conformes (vérifiés)

- **Focus visible** : `*:focus-visible { outline: 2px solid gold }` global.
- **Contenu débordant** : tableau du comparateur dans `overflow-x-auto` (pas de scroll horizontal de page).
- **Images** : toutes les `<img>` des composants récents (carte, configurateur) ont un `alt` pertinent ; décoratifs en `aria-hidden`.
- **Boutons icône seule** : `aria-label` présents (fermer, zoomer, retirer du comparateur, langue…).
- **Sélecteur de langue** : `aria-pressed` + `aria-label` par langue (FR/AR/EN).
- **Formulaires** : chaque champ a un `<label>` associé ; consentement RGPD explicite.
- **RTL arabe** : `<html dir="rtl" lang="ar">` piloté par le module i18n au changement de langue.
- **Bannière cookies** : `role="dialog"`, `aria-live="polite"`, boutons texte.
- **Carte des lots** : marqueurs `role="button"`, `aria-label` (n°, surface, statut), navigation clavier (Enter/Espace), zoom molette + pinch + boutons.

---

## 3. Responsive — points vérifiés

- **Breakpoints** : grilles `lg:grid-cols-*` avec repli 1 colonne en mobile (Lots, Contact, configurateur).
- **Carte des lots** : image fluide `w-full h-auto`, zoom/pan tactile (pinch) + boutons pour mobile.
- **Comparateur** : barre flottante `flex-wrap` ; tableau scrollable horizontalement sur petit écran.
- **Navbar** : menu desktop + tiroir mobile plein écran (portal), scroll bloqué à l'ouverture.
- **Tableau comparatif & médias larges** : conteneurs `overflow-x-auto` dédiés.

---

## 4. Points mineurs restants (non bloquants)

- **Positionnement physique de quelques contrôles** (`right-3` des boutons de zoom, barre comparateur) non inversé en RTL — le contenu principal, lui, s'inverse via `dir`. Amélioration possible : classes logiques (`inset-inline`).
- **Cibles tactiles** : boutons de zoom ~32 px (conforme WCAG 2.5.8 AA ≥ 24 px ; l'objectif AAA de 44 px n'est pas atteint).
- **Superposition** possible bannière cookies / barre comparateur (bas d'écran) si les deux sont visibles simultanément — cas rare (cookies masqués après 1er choix).
- **Lighthouse** : non mesuré automatiquement ici ; cibles CWV (LCP < 2,5 s, CLS < 0,1) à valider en préproduction (images en WebP + `width/height` déjà en place).

---

## 5. État de production

Le site est **fonctionnel sans configuration** (replis gracieux). Pour activer les
services externes, renseigner ces variables d'environnement côté frontend (`.env`) :

| Variable | Rôle | Repli si absente |
|---|---|---|
| `VITE_API_URL` | Base de l'API Django | **Auto** : `/api` (via tunnel) ou `http://127.0.0.1:8000/api` en local |
| `VITE_GA4_ID` | Google Analytics 4 | Aucun script chargé |
| `VITE_META_PIXEL_ID` | Meta Pixel | Aucun script chargé |
| `VITE_CALENDLY_URL` | Prise de RDV Calendly | Repli WhatsApp / téléphone |

> Analytics et Pixel ne se chargent **qu'après consentement** (bannière cookies, loi 09-08).

---

## 6. Conformité CDC — synthèse

Toutes les fonctionnalités du CDC v1.2 sont livrées : carte parcellaire réelle
(plan de l'architecte), réservation en ligne + rappel, WhatsApp, simulateur de
crédit, « Imaginez votre villa », brochure, comparateur de lots, prise de RDV,
configurateur de façade, FAQ, multilingue FR/AR/EN, pages légales (loi 09-08) +
cookies, données structurées (RealEstateListing/Residence + FAQPage), GA4/Pixel,
sitemap.xml, et nettoyage des pages legacy.
