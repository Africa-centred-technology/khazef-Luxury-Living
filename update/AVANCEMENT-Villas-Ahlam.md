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
