# Récapitulatif de conformité — Les Villas Ahlam

> Synthèse de l'implémentation au regard du **CDC v1.2**
> (`update/CDC-Site-Les-Villas-Ahlam (1).md`) et du **plan officiel du lotissement**
> (`update/LOTISSEMENT BOUSKOURA 21-05-2026.md`).

## Contexte

Reprise du site « Khazef » (Safi) **repurposé intégralement en « Les Villas Ahlam »** :
42 villas R+1 sur lots viabilisés à Bouskoura, lotisseur **Yatib Sakan**.

- **Frontend** : Vite + React + TypeScript + Tailwind (dépôt `khazef-Luxury-Living`)
- **Backend** : Django 5.1 + DRF, Postgres local (dépôt `villas-ahlam-api`)
- **Exposition** : tunnels Cloudflare + Workers stables

---

## §1–§5 · Identité, marque & message

- ✅ Marque, positionnement « Ahlam = rêves », baselines (« Là où vos rêves prennent racine »)
- ✅ Palette de la charte **exacte** (Orchid Rose `#942F67`, Dark Oak `#423934`, Honeycomb `#F2C368`, Fade Citrus `#D08F6B`, Jade `#86947A`, Ivoire `#F7F0EA`) dans `src/index.css`
- ✅ Typographie serif (Cormorant) + sans (Outfit) + arabe (Amiri)
- ✅ Prix « à partir de 4 500 DH/m² » + prix indicatif auto par lot (`surface × 4 500`)
- ✅ Contact Yatib Sakan · WhatsApp `wa.me/212661228619`

## §6 · Le Quartier

- ✅ Carte OpenStreetMap centrée sur le GPS `33.479327, -7.665879`
- ✅ Argumentaire de proximité (aéroport Mohammed V, Casablanca, forêt de Bouskoura, golf, écoles) **+ gare ONCF de Bouskoura**

## §7 · ⭐ Carte interactive des lots (fonctionnalité phare)

- ✅ **Vrai plan de l'architecte** extrait du PDF `LOTISSEMENT BOUSKOURA` (rendu HD PyMuPDF, nettoyé, WebP)
- ✅ **42 parcelles réelles** — polygones extraits du vectoriel du PDF, **colorées selon le statut** (Jade = disponible, Honeycomb = en cours, Dark Oak = vendu — §7.2)
- ✅ Survol → tooltip (n°, surface, statut, « à partir de X DH »), clic → fiche, **zoom molette + pinch mobile + pan**
- ✅ **Tunnel de réservation en ligne → rappel commercial** (§7.6) : formulaire complet (nom, tél, e-mail, ville/pays MRE, financement, message, RGPD), verrou anti-doublon + expiration lazy 72 h
- ✅ **Statuts temps réel** par polling (TanStack Query)
- ✅ Django Admin = interface opérateur Yatib Sakan

## §8 · Fonctionnalités

### Tier 1 — cœur de conversion
- ✅ #1 Carte interactive temps réel
- ✅ #2 Réservation en ligne → rappel
- ✅ #3 Prix indicatif auto « à partir de X DH »
- ✅ #4 WhatsApp intelligent (message pré-rempli + n° de lot)
- ✅ #5 Simulateur de crédit (Attijariwafa, Bank of Africa, CIH, BMCE) + « être rappelé »
- ✅ #6 « Imaginez votre villa » (rendu sur la fiche lot)
- ✅ #7 Brochure PDF (lead magnet contre coordonnées)

### Tier 2 — différenciateurs
- ✅ #8 Parcours MRE (ville/pays, réservation à distance, WhatsApp, FR/AR/EN)
- ✅ #9 Galerie immersive de rendus
- ✅ #10 Comparateur de lots (jusqu'à 3 : surface, prix, prix/m², îlot, statut)
- ✅ #11 Compteur de rareté + **badge « populaire »** (champ `highlight`/`vues`)
- ✅ #12 Prise de RDV (Calendly si `VITE_CALENDLY_URL`, sinon repli WhatsApp/tél)
- ✅ #13 Configurateur de façade (4 ambiances reprenant la palette + échantillons)
- ✅ #15 Liste d'attente (waitlist) sur lots en cours / vendus

## §9 · Spécifications techniques

- ✅ Multi-pages, Tailwind, SVG interactif, **mobile-first**, **RTL arabe**, HTTPS, verrou anti double-réservation
- ✅ Formulaires + notification commerciale (e-mail + fallback WhatsApp)
- ⚠️ Stack adapté par décision : **Vite** au lieu de Next.js ; **Postgres local** au lieu de Supabase (licence non prise)

## §10 · SEO, analytics, conformité

- ✅ Données structurées JSON-LD : `RealEstateAgent` + `RealEstateListing`/`Residence` (adresse, géo, `AggregateOffer` 42 lots) + `FAQPage` + `ItemList` des lots
- ✅ GA4 + Meta Pixel — **chargés uniquement après consentement** cookies
- ✅ `sitemap.xml` + `robots.txt` ; OpenGraph / Twitter cards
- ✅ **Pages légales loi 09-08** : mentions légales, politique de confidentialité (CNDP), cookies + **bannière de consentement** (privacy-first)
- ✅ SEO local (mots-clés villa/lot Bouskoura), suivi conversions (WhatsApp, brochure, réservation, RDV)

## §11 · Contenu (FR / AR / EN)

- ✅ **Trilingue complet** — le contenu arabe (resté legacy Safi) a été **entièrement retraduit** vers Les Villas Ahlam / Bouskoura
- ✅ FAQ (financement, réservation, juridique, MRE, délais)
- ✅ Rendus IA (façades jour/nuit, intérieurs, domaine, lifestyle)
- ✅ Réassurance juridique en texte (TF 23025/63, architecte Badik Meriem)

## §13 + plan officiel · Données des 42 lots

- ✅ Les **42 lots** (surfaces 200–461 m², îlots A = 1–16, B = 17–42, tous R+1) seedés en base **conformément au tableau du plan de l'architecte** (`manage.py seed_lots`)
- ✅ Titre foncier **23025/63**, architecte **Badik Meriem**, propriétaire Abdelhafid Fertate et Consorts — cités
- ✅ **Brochure PDF 7 pages corrigée** : couverture, chevauchements de chiffres, table des 42 lots qui débordait sous le footer

---

## Infrastructure & fiabilisation

- **Tunnels Cloudflare** : Workers `villas-ahlam-front` / `villas-ahlam-back` (compte `mpj-dev`), **Service Binding** frontend→backend, script `Launch-Tunnels.ps1`
- **Backend** : `.env` Postgres local, `settings.py` (ALLOWED_HOSTS / CORS / CSRF / SSL conditionnel), racine `/` → admin, dépôt git créé et poussé
- **Notifications commerciales** ajoutées pour **contact/rappel** et **liste d'attente** (+ correction d'un bug bloquant du waitlist)
- **Accessibilité** : `<main>` unique + skip link, `@media prefers-reduced-motion`, focus visible → voir `docs/AUDIT-FINAL-A11Y-RESPONSIVE.md`

## Dépôts (tout committé et poussé)

| Dépôt | Rôle |
|---|---|
| `Africa-centred-technology/khazef-Luxury-Living` | Frontend |
| `Africa-centred-technology/villas-ahlam-api` | Backend (privé) |

## Reste à faire (config de production — replis gracieux en place)

| Variable / config | Rôle | Repli si absent |
|---|---|---|
| `VITE_API_URL` | Base API | **Auto** (`/api` en tunnel, `127.0.0.1:8000` en local) |
| `VITE_GA4_ID` | Google Analytics 4 | Aucun script chargé |
| `VITE_META_PIXEL_ID` | Meta Pixel | Aucun script chargé |
| `VITE_CALENDLY_URL` | Prise de RDV | Repli WhatsApp / téléphone |
| `COMMERCIAL_EMAIL` + `EMAIL_HOST` (SMTP) | Alerte e-mail des demandes | Demandes visibles dans l'admin + log |

---

**✅ Conclusion : le CDC v1.2 est intégralement couvert**, les données du plan officiel du
lotissement sont intégrées, le site est trilingue, accessible et déployable.
