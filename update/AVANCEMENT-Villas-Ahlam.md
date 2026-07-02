# Avancement — Les Villas Ahlam

> Suivi de la transformation du site `khazef-porcelain-elegance` (ex-Khazef/Safi)
> en **« Les Villas Ahlam »** — lotissement de 42 villas R+1 à Bouskoura.
> Source de vérité : `update/CDC-Site-Les-Villas-Ahlam (1).md` (CDC v1.2).
>
> **Dernière mise à jour :** 2026-06-22
> **Dernier commit :** `af0a39a` — *feat: rebrand site vers Les Villas Ahlam + carte interactive des lots* (poussé sur `origin/main`).

---

## ✅ Fait (1er passage)

### 1. Charte graphique (CDC §4)
- [x] Palette Ahlam remappée sur les tokens HSL existants dans `src/index.css` + `tailwind.config.ts` :
  - Orchid Rose `#942F67` → `--primary`
  - Honeycomb `#F2C368` → `--gold` / accent / CTA
  - Jade `#86947A` → `--jade` / `--turquoise`
  - Fade Citrus `#D08F6B` → `--citrus` / `--gold-deep`
  - Ivoire `#F7F0EA` → `--background`
  - Dark Oak `#423934` → `--foreground` / `--charcoal`
- [x] Typographie : titres **Cormorant Garamond**, texte → **Inter** (CDC §4.2)
- [x] Gradients, ombres et tokens sidebar mis en cohérence
- [x] Logo Ahlam intégré (`src/assets/logo.png`, `public/favicon.png`)

### 2. Données socle
- [x] `src/data/villas-ahlam.ts` — constantes marque, contact **Yatib Sakan** (`06 61 22 86 19` / `wa.me/212661228619`), GPS `33.479327, -7.665879`, prix `4 500 DH/m²`, baselines, proximités, helpers (`formatDH`, `prixIndicatif`, `whatsappLien`)
- [x] `src/data/lots.ts` — les **42 lots** (CDC §13) avec surfaces, îlots A/B, statuts, prix indicatif auto

### 3. Carte interactive des lots (CDC §7) — route `/lots`
- [x] `src/components/lots/LotsMap.tsx` — SVG cliquable, lots colorés par statut, tooltip au survol, taille ∝ surface, accessible clavier, `data-lot-id`/`data-status`
- [x] Filtres (statut / îlot / surface) + compteur de rareté « Plus que X lots disponibles » + légende (CDC §7.2/§7.3)
- [x] Panneau de détail (prix indicatif, « Imaginez votre villa », CTA Réserver / WhatsApp / Être rappelé)
- [x] `src/components/lots/ReservationDialog.tsx` — **tunnel de réservation multi-étapes** (wizard : Votre lot → Coordonnées → Financement → Confirmation → Succès), stepper + récap latéral, inspiré des sites de lotissement type « Arrajaa » (CDC §7.6) → WhatsApp pré-rempli avec n° de lot (fallback prévu au CDC)
- [x] `update/PROMPTS-IMAGES-Villas-Ahlam.md` — prompts GPT Image **adaptés à l'architecture marocaine locale** (zellige, tadelakt, moucharabieh, pierre, bougainvilliers) + palette Ahlam (CDC §12)

### 4. Identité / contenu
- [x] i18n FR : `common.json`, `home.json`, `footer.json` réécrits en « Ahlam »
- [x] i18n AR : `common.json` (nom de marque أحلام)
- [x] Navbar (logo, filigrane arabe أحلام, contacts, libellés de nav)
- [x] Footer (contenu + contacts Yatib Sakan + lien `/lots`)
- [x] `index.html` (titre, meta description, Open Graph, thème Orchid Rose, favicon)
- [x] Build de production vérifié ✅

---

## ✅ Fait (2e passage — backend Django, 2026-06-24)

> Décision : backend en **Django** (override du stack Supabase/Next.js du CDC §9.2),
> mais en couvrant les **exigences fonctionnelles** du CDC à la lettre.
> Projet : `D:\Immobilier\villas-ahlam-api\` (dossier voisin du front). Temps réel = **polling**.
> DB = **Postgres Supabase** en direct via `DATABASE_URL` (ref `axgcfiptvhhvsvvlgnsz`, pooler 5432).

- [x] Projet Django 5.1 + DRF + CORS + dj-database-url + dotenv (venv `.venv`)
- [x] App `lots` : model `Lot` (CDC §7.5), statuts (§7.2), prix indicatif dérivé, compteur de vues
- [x] App `reservations` : `Reservation`, `RappelRequest`, `BrochureLead`, `WaitlistEntry`
- [x] Tunnel de réservation : verrou anti-doublon atomique (`select_for_update`) + **expiration lazy 72 h** (§7.6)
- [x] Notification commerciale : e-mail (console en dev) + **fallback WhatsApp** renvoyé dans la réponse (§7.6)
- [x] **Django Admin** = interface Yatib Sakan (actions : marquer vendu / réouvrir / confirmer vente) (§7.6)
- [x] Endpoints : lots, stats rareté, détail, vue, réservations, rappels, brochure, waitlist, **simulateur de crédit** (§8.5)
- [x] Seed idempotent des 42 lots (`manage.py seed_lots`, CDC §13)
- [x] `check` + `makemigrations` OK · `.env.example` · README · `.gitignore`
- [x] **`migrate` + `seed_lots` exécutés sur Supabase** (42 lots créés) · superuser `admin` créé
- [x] **API testée en conditions réelles** : health, lots, stats, détail, simulateur de crédit ✅ ;
      réservation → verrou anti-doublon (double résa refusée), validation RGPD, fallback WhatsApp ✅
- [x] Données de test nettoyées (42 lots `disponible`, 0 réservation)
- [x] **Front branché sur l'API** (2026-06-24) :
  - `src/lib/api.ts` — client (map snake_case→camelCase, `fetchLots`/`createReservation`/`simulerCredit`, `ApiError`)
  - `src/hooks/useLots.ts` — TanStack Query + **polling 20 s** (temps réel §7.7), fallback statique si API down
  - `Lots.tsx` — carte alimentée par l'API, lot sélectionné « live », bannière hors-ligne, compteur de rareté dynamique
  - `ReservationDialog.tsx` — soumission POST réelle, invalidation du cache (carte rafraîchie), gestion lot déjà pris, **repli WhatsApp** si API injoignable
  - `.env.example` (`VITE_API_URL`) · `tsc --noEmit` OK · `npm run build` OK · CORS validé depuis :8080
- [x] **Simulateur de crédit + page Financement** (2026-06-24, CDC §8.5) :
  - `src/components/financement/CreditSimulator.tsx` — sliders prix/apport/durée/taux, appel API débouncé (350 ms),
    mensualité + coût total/intérêts ; formule = backend (DRY)
  - `src/pages/Financement.tsx` — page `/financement` : simulateur + banques partenaires (Attijariwafa, Bank of Africa, CIH, BMCE)
    + formulaire **« Être rappelé pour mon financement »** (POST `/api/rappels/` sujet=financement)
  - Route `/financement` + nav repointée : l'entrée « Financement » menait à `/timeline` (échéancier chantier) → corrigée ;
    `nav.timeline` renommé « Livraison » (FR) / clés AR ajoutées
  - `api.ts` : `createRappel` ajouté · `tsc` OK · `build` OK · endpoints testés (mensualité 4 555 DH, rappel 201)
- [x] **Brochure lead magnet** (2026-06-24, CDC §8.7) :
  - `src/components/brochure/BrochureDialog.tsx` — dialog capture nom/e-mail/tél → POST `/api/brochure/` → téléchargement PDF
  - `api.ts` : `createBrochureLead` ajouté ; placé dans le **Footer** (toutes pages) + page **Lots** (proche du compteur de rareté)
  - `public/brochure-villas-ahlam.pdf` = **vraie brochure commerciale 7 pages** (1,7 Mo) générée par `update/generate_brochure.py` :
    Couverture · Le Domaine · Architecture (jour/nuit) · Intérieurs · Le Quartier (proximités) · Plan & Prix des 42 lots · Financement & Contact.
    Composée des rendus HD + données réelles (surfaces, prix, contact, GPS, TF, architecte). Régénérable via le script. Servie par Vite.
  - i18n FR/AR (footer : `financement`, `brochure`) · `tsc` OK · `build` OK · endpoint testé (201 + refus si pas de contact)
- [x] **Rendus 3D IA intégrés** (2026-06-24, CDC §12) — l'utilisateur a généré les 13 images (`update/images/`) :
  - 12 rendus convertis en **WebP optimisé** (~2,7 Mo total au lieu de 35 Mo) dans `src/assets/renders/` via Pillow
  - `src/data/renders.ts` — module d'imports + galerie typée (catégories Architecture/Intérieurs/Domaine/Art de vivre)
  - **Galerie** `/gallery` réécrite (mosaïque bento + filtres par catégorie, rendus Ahlam) — CDC §8.9
  - **« Imaginez votre villa »** : placeholder texte → **rendu façade jour** (fiche lot + dialog réservation) — CDC §8.6
  - **Home** : hero → vue aérienne du domaine, citation → salon, previews → allée
  - **Open Graph** : `public/og.jpg` (1200×630) généré depuis la vue aérienne — CDC §10
  - `tsc` OK · `build` OK
- [x] **Réécriture du contenu des pages héritées** (2026-06-24, copy Ahlam/Bouskoura) :
  - `Project` → **« Le Domaine »** : concept domaine privé, architecture marocaine contemporaine, art de vivre, engagements lotisseur
  - `Location` → **« Le Quartier »** : proximités réelles (aéroport MV, Casablanca, forêt, golf), carte OSM recentrée sur Bouskoura
  - `Safi` → **« Bouskoura »** : forêt, connexions, stats (15 min aéroport, 42 villas, 4 500 DH/m²)
  - `Contact` : copy Yatib Sakan, vrais contacts (tel + WhatsApp), carte Bouskoura, **formulaire branché sur `/api/rappels/`** (testé 201)
  - Images héritées repointées vers les rendus (entrée, toit-terrasse, allée, façade crépuscule, lifestyle)
  - i18n **FR** réécrit (project/location/safi/contact) · `tsc` OK · `build` OK
  - ⚠️ Traductions **AR** de ces pages encore en contenu Khazef/Safi → à refaire au passage multilingue (CDC §9.2)
- [x] **Liaison fiche lot → simulateur** (2026-06-24) : lien « Simuler mon financement » dans la fiche du lot →
      `/financement?prix=<prixIndicatif>` ; `Financement` lit `?prix` (`useSearchParams`) et pré-remplit `CreditSimulator`
- [x] **`CLAUDE.md` mis à jour** : décrit Les Villas Ahlam (42 villas R+1 Bouskoura) + backend Django voisin + repère legacy/CDC
- [x] **Retrait des pages 3D héritées** (2026-06-24) :
  - Supprimés : pages `Apartments`, `ApartmentDetail`, `VirtualTour` + dossiers `components/virtual-tour/` et `components/apartment-detail/`
  - Routes + imports retirés d'`App.tsx` ; refs repointées (`CtaBanner`→/lots, `Navbar`/`Footer` virtual-tour retiré, +lien Financement footer)
  - Heros `Plans`/`Timeline` repointés vers rendus ; assets hérités inutilisés supprimés (`hero-building`, `interior-*`, `safi-*`)
  - Dossiers `public/` 3D placeholders retirés
  - **Bundle : ~2,4 Mo + chunks 3D 1,5–2 Mo → un seul chunk de 592 ko** ; build 28s → ~11s · `tsc` OK · `build` OK
- [ ] Reste (non bloquant) : carte calée sur le **plan d'architecte HD**, **vraie brochure PDF**,
      **traductions AR/EN complètes**, optionnel : retirer les dépendances 3D inutilisées de `package.json` (three / @react-three)

---

## ⏳ Reste à faire (CDC)

### Priorité haute — cœur de conversion (CDC Tier 1, §8)
- [ ] **Carte SVG calée sur le vrai plan d'architecte** : exporter le plan PDF en image HD, tracer les 42 polygones réels par-dessus (CDC §7.4). *Bloquant : image HD du plan non fournie dans `update/`.* Actuellement carte schématique provisoire.
- [ ] **Backend temps réel** (Supabase) pour les statuts des lots + persistance des réservations (CDC §7.7)
- [ ] **Verrou « en cours »** anti-double-réservation + expiration auto 48–72 h (CDC §7.6)
- [ ] **Notification commercial** par e-mail (à ouvrir) + fallback WhatsApp/SMS (CDC §7.6)
- [ ] **Interface d'admin simple** pour Yatib Sakan (changer les statuts, voir les demandes)
- [ ] **Simulateur de crédit immobilier** (apport / durée / taux → mensualité) (CDC §8.5)
- [ ] **Demande de brochure (lead magnet)** PDF contre e-mail/téléphone (CDC §8.7)

### Priorité moyenne — différenciateurs (CDC Tier 2)
- [ ] Réécriture des **pages de contenu** en copy Ahlam : `Project` (Le Domaine), `Location` (Le Quartier), `Safi` (Bouskoura), `Plans`, `Timeline` (Financement), `Contact`
- [ ] **Carte du quartier** Mapbox/Leaflet centrée sur le GPS (CDC §6)
- [ ] **Galerie immersive de rendus** (remplace la visite 360°) (CDC §8.9)
- [ ] **Comparateur de lots** (jusqu'à 3) (CDC §8.10)
- [ ] **Parcours Diaspora / MRE** dédié (CDC §8.8)
- [ ] **Prise de RDV de visite** (type Calendly) (CDC §8.12)
- [ ] **Multilingue complet FR / AR / EN** (traductions AR à finir, EN à créer ; AR = RTL) (CDC §9.2)

### Priorité basse — phase 2 (CDC Tier 3)
- [ ] Espace acquéreur + suivi chantier · Acompte en ligne (CMI) · Parrainage · Scrollytelling · AR (réalité augmentée) · QR codes terrain

### Contenu / visuels à produire (CDC §11–12)
- [ ] **Rendus 3D IA** (prompts CDC §12) : aérien du domaine, façades jour/nuit, intérieurs, lifestyle
- [ ] Vectorisation/déclinaisons du logo (favicon haute déf, version fond sombre)
- [ ] Brochure PDF premium
- [ ] Réassurance juridique en texte (TF 23025/63, architecte Badik Meriem)

### SEO / conformité (CDC §10)
- [ ] SEO local (« villa Bouskoura »…), données structurées `RealEstateListing`
- [ ] GA4 + Meta Pixel (tracking conversions : WhatsApp, brochure, réservation)
- [ ] Sitemap.xml, robots.txt, mentions légales, politique de confidentialité, cookies (RGPD / loi 09-08)

### Dette / cohérence
- [ ] Mettre à jour `CLAUDE.md` (décrit encore le projet Khazef/Safi)
- [ ] Pages héritées encore en thème Safi : `Apartments`, `ApartmentDetail`, `VirtualTour`, `Gallery` — à réorienter ou retirer
- [ ] ⚠️ **Sécurité** : un token GitHub en clair est présent dans l'URL du remote `origin` — à révoquer et reconfigurer via un credential manager

---

## Points ouverts à trancher en interne (CDC §15)
1. E-mail de réception des réservations à ouvrir (sinon fallback WhatsApp `0661228619`)
2. Langues au lancement : FR seul, ou FR/AR/EN d'emblée
3. Construction clé en main ou lot seul (ajuste le copy)
4. Relecture visuelle des 42 surfaces sur l'image du plan lors du tracé de la carte
5. Comptes réseaux sociaux à créer/lier (pixel Meta + liens)
