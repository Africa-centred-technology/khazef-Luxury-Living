# Cahier des charges — Site web vitrine « Les Villas Ahlam »

> **Domaine Résidentiel Privé — Bouskoura**
> Lotisseur : **Yatib Sakan** · Tél **06 61 22 86 19**
> Document de référence à transmettre à l'équipe de développement.
> Version 1.2 — Juin 2026 — *Mode « moyens du bord » : le site se produit à partir des seuls éléments existants.*

---

## 0. En un coup d'œil (résumé exécutif)

Site **vitrine de commercialisation** pour un lotissement de **42 lots de villas R+1** à Bouskoura (lotisseur **Yatib Sakan**). Objectif : générer des leads et des **réservations en ligne**, autour d'une **carte interactive des lots en temps réel** et d'un **message marketing fort** jouant sur le sens du nom *Ahlam* (« rêves » en arabe).

**Modèle de vente :** réservation **en ligne** (choix du lot + formulaire) → **le service commercial recontacte** pour finaliser. **Tous les lots commercialisés d'un coup.** Prix « sur demande », **à partir de 4 500 DH/m²**.

---

## 0.1 ⚙️ Contrainte de production : on travaille avec les moyens du bord

**Aucun élément supplémentaire ne sera fourni par le lotisseur.** Le site se construit intégralement à partir des éléments déjà en notre possession. Cette section est la règle du jeu pour l'équipe.

### Ce dont on dispose (et qui suffit pour lancer)
| Élément | Source | Usage |
|---|---|---|
| Plan du lotissement, 42 lots numérotés + surfaces | **PDF fourni** (plan de l'architecte) | Base de la **carte interactive** (à tracer en SVG par-dessus) + tableau des lots |
| Logo | **PNG fourni** (`logoAhlam.png`) | Identité ; à **vectoriser/upscaler** depuis le PNG |
| Charte couleurs (6 teintes + HEX) | Fournie | Design system complet (§4) |
| Référence architecturale (villa contemporaine R+1) | Image fournie | Style des **rendus IA** (§12) |
| Localisation GPS exacte | `33.479327, -7.665879` | Carte quartier + repères de proximité (§6) |
| Prix | 4 500 DH/m² | Affichage « à partir de » + prix indicatif par lot |
| Modèle de vente | Réservation en ligne + rappel commercial | Tunnel §7.6 |
| Contact | Yatib Sakan — 06 61 22 86 19 | WhatsApp `wa.me/212661228619`, formulaires |
| Réassurance juridique | TF **23025/63**, architecte **Badik Meriem**, lotissement autorisé | Section « Confiance » en **texte** (pas de scans) |

### Ce qu'on n'aura pas → le contournement
| Manque | Solution « moyens du bord » |
|---|---|
| Pas de fichier DWG du plan | **Tracer les 42 polygones SVG par-dessus l'image du plan PDF** (le PDF est la source) |
| Pas de COS/CUS ni règlement officiel | **Pas de calculateur réglementaire** ; on remplace par une **projection visuelle « Imaginez votre villa »** (§8) ; détails constructibles renvoyés au commercial |
| Pas de plans de villa type | Les **rendus IA** (§12) tiennent lieu de visuels d'architecture |
| Pas de photos réelles du site | **Rendus IA** + visuels d'ambiance du quartier (forêt de Bouskoura, golf) si libres de droits |
| Pas de documents légaux scannés | On **cite les références en texte** (TF, architecte, « lotissement autorisé »), sans afficher de scans |
| Pas de villa témoin / visite 360° | Reportée ; remplacée par une **galerie immersive de rendus** |
| Pas d'e-mail commercial dédié communiqué | À ouvrir côté projet (ex. `commercial@…`) ; **fallback** : notifications de réservation envoyées par **WhatsApp/SMS au 06 61 22 86 19** |

> **À retenir :** le plan PDF + le logo + la charte + le GPS + le prix suffisent à livrer un site complet et vendeur. Tout le reste est généré (rendus IA) ou dérivé (proximités depuis le GPS).

---

## 1. Le projet

| Élément | Donnée |
|---|---|
| Nom commercial | **Les Villas Ahlam** — Domaine Résidentiel Privé |
| Lotisseur | **Yatib Sakan** — Tél **06 61 22 86 19** (WhatsApp : `wa.me/212661228619`) |
| Localisation | Bouskoura, Commune de Douar Rmel Lahlal, Préfecture de Bouskoura, Région Casablanca-Settat |
| **Coordonnées GPS** | **33.479327, -7.665879** — [Google Maps](https://maps.app.goo.gl/xYt5rhptRdtU6wk79) |
| Accès | Route de 30 m vers Bouskoura ; Allée Ben Doukali ; à proximité d'une école communale |
| Nature | Lotissement de villas (lots viabilisés destinés à des villas R+1) |
| Nombre de lots | **42 lots** |
| Typologie | Villas **R+1** (rez-de-chaussée + 1 étage) |
| Surfaces des lots | de **200 m²** à **461 m²** |
| **Prix** | **À partir de 4 500 DH/m²** — affiché « prix sur demande » |
| Commercialisation | **Tous les lots d'un coup** (pas de tranches) |
| Architecte | Badik Meriem |
| Propriétaire foncier | Abdelhafid Fertate et Consorts |
| Titre foncier | 23025/63 |

**Atouts à faire valoir :** domaine privé sécurisé et clôturé, proximité immédiate de l'aéroport Mohammed V et de Casablanca, axe routier de 30 m, environnement résidentiel calme, projet autorisé et titré (réassurance), architecture contemporaine soignée.

---

## 2. Objectifs du site

**Objectif principal :** vendre les lots.

**KPI :** taux de conversion visiteur → lead (réservation en ligne / WhatsApp / brochure) **> 5 %** · nombre de demandes de réservation transmises au commercial / mois · coût par lead (campagnes Meta/Google) · temps passé sur la carte interactive.

**Secondaires :** crédibiliser Yatib Sakan, rassurer juridiquement, alimenter les campagnes (pixel Meta + GA4), faciliter la diaspora (MRE).

---

## 3. Cibles & personas

| Persona | Description | Attentes sur le site |
|---|---|---|
| **Primo-accédant casablancais** | Couple 30–45 ans, classe moyenne sup. | Prix, financement, sécurité, proximité écoles |
| **Investisseur** | Cherche plus-value | Surface, prix au m², emplacement |
| **MRE (diaspora)** | Achète à distance | Confiance, rendus immersifs, réservation à distance, rappel commercial, multilingue |
| **Famille en montée de gamme** | Veut extérieur, calme, prestige discret | Architecture, ambiance du domaine, intimité |

> **Insight :** la cible MRE est un levier majeur. Prévoir un **parcours à distance complet** (galerie immersive + réservation en ligne + rappel commercial + multilingue FR/AR/EN).

---

## 4. Identité visuelle (charte graphique)

### 4.1 Palette (charte officielle du projet)
| Rôle | Nom | HEX | Usage |
|---|---|---|---|
| Primaire / signature | Orchid Rose | `#942F67` | Logo, titres forts, marque |
| Texte / contraste | Dark Oak | `#423934` | Corps de texte, fonds sombres, footer |
| Accent / CTA | Honeycomb | `#F2C368` | Boutons, badges, lignes décoratives |
| Accent chaud | Fade Citrus | `#D08F6B` | Survols, dégradés, lifestyle |
| Nature / calme | Jade | `#86947A` | Sections « environnement », icônes nature |
| Fond | Ivoire | `#F7F0EA` | Arrière-plan principal (premium, chaleureux) |

**Principe :** fond ivoire dominant, Orchid Rose + Dark Oak pour la hiérarchie, Honeycomb pour les CTA lumineux, Jade pour respirer. **Pas de blanc pur.**

### 4.2 Typographie
- **Titres :** serif élégante dans l'esprit du logotype « AHLAM » (*Cormorant Garamond*, *Playfair Display*, *EB Garamond*).
- **Texte :** sans-serif claire (*Inter*, *Manrope*, *Poppins*).

### 4.3 Logo & assets
- Logo fourni en **PNG** : maison + branche d'olivier dans un losange doré, fond ivoire.
- **À produire à partir du PNG** : version vectorisée (retrace), favicon, version sur fond sombre, picto seul. *(Vectorisation possible via outil de tracé auto + nettoyage, ou redessin fidèle au PNG.)*

### 4.4 Ton & DA
Élégant, chaleureux, rassurant, premium accessible. Lumière dorée (golden hour), végétation, matières naturelles (bois chaud, pierre, verre), beaucoup d'espace ivoire, micro-interactions soignées.

---

## 5. Message marketing (positionnement & copy)

### 5.1 Idée centrale
**« Ahlam » = « rêves » en arabe.** On ne vend pas un terrain, on vend **la concrétisation d'un rêve**.

### 5.2 Signatures / baselines
- **« Là où vos rêves prennent racine. »**
- **« Ahlam — donnez vie à vos rêves. »**
- **« Votre villa. Votre domaine. Votre rêve. »**

### 5.3 Messages-clés
- Un **domaine privé et sécurisé**, pour la tranquillité des familles.
- Une **architecture contemporaine R+1**, lumineuse et intemporelle.
- À **15 min de l'aéroport Mohammed V** et tout près de Casablanca (§6).
- Un **projet autorisé et titré** (TF 23025/63, architecte Badik Meriem) — *la confiance d'abord*.
- **Votre lot dès 200 m²**, à partir de **4 500 DH/m²**.

### 5.4 Affichage du prix (règle UX)
- Officiel : **« Prix sur demande »**. Accroche : **« Lots à partir de 4 500 DH/m² »**.
- Chaque fiche lot affiche un **prix indicatif de départ** auto-calculé : `surface × 4 500 DH`, présenté **« À partir de X DH »** (prix exact donné par le commercial). Exemples : 200 m² → **900 000 DH** · 250 m² → **1 125 000 DH** · 300 m² → **1 350 000 DH** · 461 m² → **2 074 500 DH**.
- Fourchette projet : **de 900 000 DH à ~2 074 500 DH**.
- *Le « à partir de » concerne le prix du lot viabilisé ; la villa R+1 est à bâtir par l'acquéreur.*

### 5.5 Tone of voice
Chaleureux, posé, valorisant. On s'adresse au « vous ». Pas de jargon agressif. On raconte une vie.

---

## 6. Le Quartier (dérivé du GPS — argumentaire de proximité)

> Repères **indicatifs**, basés sur la position de Bouskoura (à affiner par mesure depuis le point GPS exact `33.479327, -7.665879`). Carte de localisation centrée sur ce point (Mapbox/Leaflet/Google Maps).

| Destination | Distance ≈ | Temps voiture ≈ |
|---|---|---|
| **Aéroport Mohammed V** | ~15 km | ~15–20 min |
| **Centre de Casablanca** | ~16–20 km | ~20–25 min |
| **Forêt de Bouskoura** (poumon vert) | à proximité | quelques min |
| **Bouskoura Golf City** | à proximité | quelques min |
| **Écoles internationales / commerces de Bouskoura** | à proximité | quelques min |

**Atouts du secteur à exploiter en copy :** secteur résidentiel en plein essor au sud de Casablanca · grand axe routier de 30 m · zone desservie par le train ONCF (gare de Bouskoura) · cadre verdoyant (forêt d'eucalyptus de Bouskoura) · proximité golf et écoles. *Le calme de la périphérie sans l'éloignement.*

---

## 7. ⭐ Fonctionnalité phare : la carte interactive des lots

Cœur technique et commercial. Priorité absolue.

### 7.1 Principe
Le **plan du PDF** (42 lots + îlots A et B) devient une **carte cliquable**, chaque lot coloré selon son **statut temps réel**.

### 7.2 Statuts & couleurs
| Statut | Couleur | Comportement |
|---|---|---|
| **Disponible** | Jade `#86947A` | Cliquable → fiche + CTA « Réserver ce lot » |
| **En cours / réservé** | Honeycomb `#F2C368` | Réservation soumise, en attente de confirmation commerciale ; → « Bientôt indisponible » + liste d'attente |
| **Vendu** | Dark Oak `#423934` (grisé) | Non cliquable, « Vendu » |

### 7.3 Interaction
- **Survol** → tooltip : n° lot, surface, statut, **« À partir de X DH »**.
- **Clic** → panneau latéral (desktop) / fiche plein écran (mobile) : n° + surface + orientation, **prix indicatif** + « prix exact sur demande », **« Imaginez votre villa »** (§8), galerie de rendus, boutons **« Réserver ce lot »**, **« Être rappelé »**, **« WhatsApp »** (message pré-rempli + n° de lot, vers `wa.me/212661228619`).
- **Filtres** : surface, prix indicatif, statut, îlot. **Compteur de rareté** : « Plus que X lots disponibles ». **Recherche** : slider surface + budget.

### 7.4 Spécification technique de la carte (moyens du bord)
On n'a **pas de DWG** : on **trace la carte sur l'image du plan PDF**.
1. **Exporter la page du plan PDF en image haute résolution** (PNG/WebP), nettoyée/recadrée.
2. La poser en fond, puis **tracer 42 polygones SVG** (`<path>`/`<polygon>`) calés sur chaque lot, avec `data-lot-id`, `data-status`, `data-surface`. *(Tracé manuel dans un éditeur SVG type Figma/Illustrator/Inkscape — c'est le gros du travail de prod de la carte.)*
3. Remplissage piloté dynamiquement par la source de données (statuts).
4. `mouseenter` / `click` → état React → panneau de détail.
5. **Zoom/pan** fluide (`svg-pan-zoom` ou wrapper custom).

> Pour la **carte du quartier** (§6), Mapbox/Leaflet/Google Maps centrée sur `33.479327, -7.665879`.

### 7.5 Modèle de données d'un lot (JSON)
```json
{
  "id": "lot-17",
  "numero": 17,
  "ilot": "B",
  "surface_m2": 452,
  "hauteur": "R+1",
  "statut": "disponible",            // disponible | en_cours | vendu
  "prix_m2_mad": 4500,
  "prix_indicatif_mad": 2034000,     // surface_m2 * 4500, affiché "À partir de"
  "prix_exact": "sur_demande",
  "orientation": "Sud-Ouest",
  "rendus": ["villa-jour.jpg", "villa-nuit.jpg"],
  "highlight": true,
  "vues": 0
}
```

### 7.6 Tunnel de réservation en ligne (modèle confirmé)
**Réservation en ligne, puis rappel du service commercial. Pas de paiement en ligne au lancement.**
1. Clic **« Réserver ce lot »** sur un lot disponible.
2. **Formulaire** : nom, téléphone, e-mail, ville/pays (utile MRE), intention de financement (cash/crédit), message, consentement RGPD.
3. À la soumission, le lot passe en **« en cours »** (verrou anti-doublon).
4. **Notification immédiate au commercial** (e-mail dédié à ouvrir, **fallback WhatsApp/SMS au 06 61 22 86 19**) + e-mail de confirmation au client (« demande reçue, un conseiller vous rappelle sous 24 h »).
5. Le commercial rappelle, puis met le lot en **« vendu »** ou le **réouvre** via l'admin.

**Garde-fous :** verrou « en cours » à **expiration automatique** (48–72 h) ; **interface d'admin simple** pour Yatib Sakan (changer statuts, voir les demandes) ; *(phase 2)* acompte en ligne via **CMI**.

### 7.7 Temps réel
Backend léger (**Supabase**/Firebase) pour statuts + demandes ; mise à jour de la carte **sans rechargement**.

---

## 8. ⭐ Fonctionnalités originales & créatives

### Tier 1 — Cœur de conversion (lancement)
1. **Carte interactive des lots en temps réel** (§7).
2. **Réservation en ligne → rappel commercial** (§7.6).
3. **Prix indicatif auto « À partir de X DH »** par lot (`surface × 4 500`).
4. **WhatsApp intelligent** → `wa.me/212661228619`, message pré-rempli avec le lot.
5. **Simulateur de crédit immobilier** : apport, durée, taux → mensualité estimée (base = prix indicatif du lot). Banques : Attijariwafa, Bank of Africa, CIH, BMCE. CTA « Être rappelé pour mon financement ».
6. **« Imaginez votre villa »** *(remplace le calculateur réglementaire, faute de COS/CUS)* : sur la fiche lot, un visuel projette une villa R+1 type sur le lot, avec galerie de rendus ; mention « surface constructible et règles précisées par votre conseiller ». *Le client se projette sans chiffre réglementaire inventé.*
7. **Demande de brochure (lead magnet)** : plaquette PDF en échange de l'e-mail/téléphone.

### Tier 2 — Différenciateurs forts
8. **Parcours Diaspora / MRE dédié** : galerie immersive, réservation à distance + rappel commercial, FR/AR/EN, infos achat depuis l'étranger.
9. **Galerie immersive de rendus** *(remplace la visite 360°, faute de villa témoin)* : plein écran, jour/nuit, ambiances.
10. **Comparateur de lots** (jusqu'à 3) : surface / prix indicatif / orientation.
11. **Compteur de rareté & « lots populaires »** (badge basé sur le compteur de vues).
12. **Prise de RDV de visite** (agenda type Calendly + rappel SMS/WhatsApp).
13. **Configurateur de façade / finitions** : ambiances de finitions reprenant la palette.
14. **Mode jour / nuit sur les rendus** (curseur).
15. **Liste d'attente intelligente** sur lots en cours/vendus.

### Tier 3 — Phase 2
16. **Espace acquéreur** (suivi réservation + suivi chantier en photos). 17. **Acompte en ligne (CMI).** 18. **Parrainage.** 19. **Scrollytelling** (page « Le Domaine »). 20. **AR** (villa posée sur le lot). 21. **Heatmap d'intérêt.** 22. **QR codes terrain** → fiche lot.

---

## 9. Spécifications techniques

### 9.1 Format
**Multi-pages légère** (SEO + clarté). Accueil immersif ; « Plan & Disponibilités », « Financement », « Le Quartier » en pages dédiées.

### 9.2 Stack recommandée
| Couche | Reco | Alternative |
|---|---|---|
| Framework | **Next.js (React)** | Astro |
| Styling | **Tailwind CSS** | — |
| Animations | Framer Motion | GSAP |
| Carte des lots | **SVG interactif custom** tracé sur l'image du plan PDF (+ `svg-pan-zoom`) | — |
| Carte quartier | Mapbox GL / Leaflet / Google Maps (centre 33.479327, -7.665879) | — |
| Backend / données / réservations | **Supabase** (Postgres + temps réel + auth + storage) | Firebase |
| Formulaires + notif commercial | API routes Next.js + e-mail + WhatsApp/SMS (fallback 0661228619) | Formspree |
| Paiement acompte (phase 2) | **CMI** | PayZone / Naps |
| WhatsApp | `wa.me/212661228619` (v1) → WhatsApp Business API (v2) | — |
| CMS (lots/contenus éditables) | Table Supabase + admin | Sanity / Strapi |
| Multilingue | next-intl / i18n (**FR / AR / EN**, AR = RTL) | — |
| Hébergement | **Vercel** | Netlify |
| Analytics | **GA4 + Meta Pixel** + Hotjar | — |

### 9.3 Exigences transverses
Mobile-first absolu · Lighthouse > 90 (WebP/AVIF, lazy-load, CDN) · accessibilité AA · RTL arabe · RGPD/loi 09-08 (cookies, consentement) · HTTPS, anti-spam, verrou anti double-réservation.

---

## 10. SEO, analytics, conformité
- **SEO local** : « villa Bouskoura », « lotissement Bouskoura », « lot villa Bouskoura », « acheter villa Bouskoura », « terrain villa Casablanca ». Données structurées `RealEstateListing`/`Residence`.
- **Open Graph** soignés (partages WhatsApp/Facebook = visuel premium).
- **Tracking conversion** GA4 + Meta : clic WhatsApp, brochure, réservation soumise, RDV.
- Sitemap.xml + robots.txt ; mentions légales, politique de confidentialité, cookies.

---

## 11. Contenu à produire (tout en interne, moyens du bord)

### 11.1 Rédactionnel
Accroche + manifeste « Ahlam / rêves » · descriptifs (domaine, villas, quartier, confiance) · gabarit fiche lot · FAQ (financement, réservation en ligne + rappel, juridique, MRE, délais) · réassurance juridique · versions **FR / AR / EN**.

### 11.2 Visuels (100 % générés / dérivés)
- **Rendus 3D IA** (prompts §12) : aérien du domaine, façades jour/nuit, intérieurs, lifestyle, entrée, allée.
- **Carte interactive** : image HD du plan PDF + tracé SVG des 42 lots.
- **Logo** : vectorisation/déclinaisons depuis le PNG.
- **Brochure PDF** premium (déclinaison charte).
- **Carte quartier** : Mapbox/Leaflet centrée sur le GPS.

### 11.3 Pas de dépendance au lotisseur
**Aucun livrable attendu de Yatib Sakan.** Tout est produit à partir de l'existant : plan PDF → carte ; logo PNG → identité ; charte → design ; référence villa → rendus IA ; GPS → quartier ; TF + architecte → réassurance texte. *Seules actions côté projet : ouvrir un e-mail commercial de réception des réservations (sinon fallback WhatsApp 0661228619), et valider les textes/visuels.*

---

## 12. 🎨 Prompts de génération d'images (GPT Image / modèle de génération)

> **Conseils** : prompts en **anglais** ; garder le même bloc de style partout ; si l'outil accepte une image de référence, fournir le rendu de villa existant pour caler le style ; éviter le texte précis dans l'image (le logo s'ajoute en post-prod) ; injecter la palette en accents : Orchid Rose `#942F67`, Dark Oak `#423934`, Honeycomb `#F2C368`, Fade Citrus `#D08F6B`, Jade `#86947A`, Ivoire `#F7F0EA`.
> **Bloc de style commun** (à coller en tête) : *"Photorealistic architectural visualization, ultra-detailed, professional real-estate photography, natural warm golden-hour lighting, high dynamic range, shot on a 35mm full-frame camera, shallow depth of field, premium and elegant mood."*

**1. Hero — vue aérienne du domaine**
> *Aerial drone view of a modern private gated villa community in Morocco at golden hour, around 40 contemporary two-story (ground + 1 floor) villas with flat roofs, white and warm-grey rendered facades with warm timber wood accent panels and large dark-framed windows, organized along clean landscaped streets with olive trees, palms and green strips, a secured entrance gate, soft warm sunset light, blue sky with light clouds, lush greenery, premium real-estate aerial photography, ultra-detailed, photorealistic, wide angle, 16:9.*

**2. Entrée du domaine (gate)**
> *Elegant entrance gate of a private residential domain in Morocco at dusk, modern minimalist architecture, warm stone and dark oak wood cladding, subtle golden accent lighting, a low elegant sign wall (no readable text), olive branches and manicured landscaping, security gatehouse, warm welcoming evening atmosphere, photorealistic architectural visualization, 16:9.*

**3. Villa — façade de jour**
> *Modern contemporary two-story villa (R+1) in Morocco, flat roof, white and warm-grey rendered facade with a vertical warm timber wood accent panel, large dark-framed glazing, a rooftop with small plants, a warm wood front gate and garage door, white perimeter wall with vertical wood slats, minimalist desert-style landscaping with cacti, agave and small palms, clear blue sky, bright midday natural light, photorealistic architectural rendering, eye-level front view, 4:3.*

**4. Villa — façade au crépuscule**
> *Same modern two-story Moroccan villa at twilight (blue hour), warm interior lights glowing through large windows, soft pool of light on the wood entrance, deep blue sky with last orange sunset glow on the horizon, subtle landscape lighting, cozy luxurious evening mood, terracotta and honey-gold light accents, photorealistic architectural visualization, eye-level, 4:3.*

**5. Salon / séjour**
> *Interior of a luxurious modern living room in a contemporary Moroccan villa, double-height ceiling, large floor-to-ceiling windows with garden view, warm natural light, neutral cream and beige tones with elegant accents of deep magenta (orchid rose), warm terracotta cushions, sage-green plants, honey-gold brass details, dark oak wood furniture, refined Moroccan-contemporary fusion, cozy and upscale, photorealistic interior photography, 3:2.*

**6. Cuisine**
> *Modern open-plan kitchen in an upscale Moroccan villa, sleek matte cabinetry in cream and dark oak wood, large central island, warm brass (honey-gold) fixtures, natural stone countertop, large window with soft daylight, minimal and elegant, subtle terracotta and green plant accents, photorealistic interior photography, 3:2.*

**7. Chambre principale (suite)**
> *Master bedroom suite in a luxury contemporary villa, calm and elegant, soft cream and ivory palette with deep orchid-rose (#942F67) headboard accent and warm terracotta throw, sage-green plants, warm wood floor, large window with golden morning light and garden view, serene premium hospitality mood, photorealistic interior photography, 3:2.*

**8. Lifestyle — famille devant la villa**
> *A happy modern Moroccan family standing and smiling in front of their contemporary two-story villa in a private gated community, golden afternoon light, child playing, lush green front yard, warm aspirational lifestyle, candid and natural, premium real-estate lifestyle photography, photorealistic, faces not in sharp focus, 3:2.*

**9. Allée paysagère du domaine**
> *Landscaped private residential street inside a modern gated villa community in Morocco, clean paved road, rows of contemporary villas, olive and palm trees, green strips, manicured hedges, golden-hour light, a couple walking, calm and upscale suburban atmosphere, photorealistic architectural photography, slight perspective view, 16:9.*

**10. Toit-terrasse au coucher du soleil**
> *Rooftop terrace of a modern Moroccan villa at sunset, outdoor lounge with elegant furniture, warm terracotta and honey-gold cushions, sage-green potted plants, a glass railing, view over the villa community and distant horizon, string lights, warm romantic golden light, premium lifestyle architectural visualization, photorealistic, 16:9.*

**11. Visuel « lots » (contexte carte)**
> *Aerial top-down view of a freshly serviced residential subdivision in Morocco, neatly arranged empty villa plots separated by new paved roads and sidewalks, green strips and young trees, clean modern urban planning, warm afternoon light, photorealistic drone photography, top-down 90-degree angle, 1:1.*

**12. Texture / motif de marque (fonds)**
> *Subtle elegant seamless pattern inspired by olive branches and geometric Moroccan lines, very minimal, soft ivory (#F7F0EA) background with thin gold (#F2C368) and orchid-rose (#942F67) line work, refined luxury branding texture, flat vector style, light and airy, suitable as a website background.*

> 💡 Génère d'abord **#3 (façade jour)**, valide le style, puis réutilise la même villa comme référence pour #4, #8, #9, #10.

---

## 13. Données du lotissement — les 42 lots

> Surfaces **telles que lues sur le plan PDF (seule source disponible)**. Tous en **R+1**. Prix indicatif = `surface × 4 500 DH` (affiché « À partir de », prix exact sur demande). Îlots indicatifs. *À relire visuellement sur l'image du plan lors du tracé de la carte.*

| Lot | Surface (m²) | Hauteur | « À partir de » (DH) | Îlot |
|----|----|----|----|----|
| 1 | 303 | R+1 | 1 363 500 | A |
| 2 | 340 | R+1 | 1 530 000 | A |
| 3 | 200 | R+1 | 900 000 | A |
| 4 | 200 | R+1 | 900 000 | A |
| 5 | 200 | R+1 | 900 000 | A |
| 6 | 200 | R+1 | 900 000 | A |
| 7 | 200 | R+1 | 900 000 | A |
| 8 | 200 | R+1 | 900 000 | A |
| 9 | 200 | R+1 | 900 000 | A |
| 10 | 200 | R+1 | 900 000 | A |
| 11 | 200 | R+1 | 900 000 | A |
| 12 | 303 | R+1 | 1 363 500 | A |
| 13 | 340 | R+1 | 1 530 000 | A |
| 14 | 200 | R+1 | 900 000 | A |
| 15 | 200 | R+1 | 900 000 | A |
| 16 | 300 | R+1 | 1 350 000 | A |
| 17 | 452 | R+1 | 2 034 000 | B |
| 18 | 281 | R+1 | 1 264 500 | B |
| 19 | 200 | R+1 | 900 000 | B |
| 20 | 200 | R+1 | 900 000 | B |
| 21 | 200 | R+1 | 900 000 | B |
| 22 | 200 | R+1 | 900 000 | B |
| 23 | 200 | R+1 | 900 000 | B |
| 24 | 200 | R+1 | 900 000 | B |
| 25 | 200 | R+1 | 900 000 | B |
| 26 | 461 | R+1 | 2 074 500 | B |
| 27 | 323 | R+1 | 1 453 500 | B |
| 28 | 250 | R+1 | 1 125 000 | B |
| 29 | 363 | R+1 | 1 633 500 | B |
| 30 | 250 | R+1 | 1 125 000 | B |
| 31 | 200 | R+1 | 900 000 | B |
| 32 | 200 | R+1 | 900 000 | B |
| 33 | 200 | R+1 | 900 000 | B |
| 34 | 318 | R+1 | 1 431 000 | B |
| 35 | 200 | R+1 | 900 000 | B |
| 36 | 332 | R+1 | 1 494 000 | B |
| 37 | 269 | R+1 | 1 210 500 | B |
| 38 | 200 | R+1 | 900 000 | B |
| 39 | 200 | R+1 | 900 000 | B |
| 40 | 200 | R+1 | 900 000 | B |
| 41 | 200 | R+1 | 900 000 | B |
| 42 | 318 | R+1 | 1 431 000 | B |

**Repères macro (du plan) :** Îlot A ≈ 13 731 m² · Îlot B ≈ 1 322 m² (notation à reconfirmer). Bornes/coordonnées dans le PDF pour le géoréférencement.

---

## 14. Planning & livrables

| Phase | Livrables | Durée ≈ |
|---|---|---|
| **0. Prép.** | Image HD du plan PDF, vectorisation logo, textes, e-mail commercial (ou fallback WhatsApp) | court |
| **1. Design** | Maquettes UI (accueil + carte + fiche lot + réservation), validation charte | ~1–2 sem. |
| **2. Visuels** | Rendus IA (§12), tracé SVG des 42 lots, brochure | en parallèle |
| **3. Dev MVP** | Site + carte temps réel + réservation en ligne + notif commercial + WhatsApp + brochure + FR | ~2–4 sem. |
| **4. Conversion** | Simulateur crédit + « Imaginez votre villa » + RDV + AR/EN + MRE | ~2–3 sem. |
| **5. Lancement** | Tests, SEO, GA4/Pixel, conformité, mise en ligne (tous lots d'un coup) | ~1 sem. |
| **6. Phase 2** | Espace acquéreur, suivi chantier, acompte CMI, parrainage | post-lancement |

---

## 15. Points ouverts (mineurs — n'empêchent pas le lancement)

**Confirmé** ✅ : localisation GPS · prix 4 500 DH/m² « sur demande » · réservation en ligne + rappel commercial · tous lots d'un coup · lotisseur Yatib Sakan / 06 61 22 86 19 · aucun élément attendu du lotisseur.

**À trancher en interne (sans dépendance externe) :**
1. **E-mail de réception** des réservations à ouvrir (sinon fallback WhatsApp/SMS au 0661228619).
2. **Langues** au lancement : FR seul, ou FR/AR/EN d'emblée.
3. **Yatib propose-t-il la construction clé en main** ou seulement le lot ? (ajuste le copy ; à défaut d'info, on parle de **lot viabilisé R+1**).
4. **Relecture visuelle des 42 surfaces** (§13) sur l'image du plan lors du tracé de la carte.
5. **Comptes réseaux sociaux** à créer/lier (pixel Meta + liens).

---

*Fin — Les Villas Ahlam · Lotisseur Yatib Sakan · Cahier des charges site vitrine v1.2 (mode moyens du bord)*
