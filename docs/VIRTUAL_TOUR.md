# Visite immersive — documentation technique

> **خَزَف** · Visite 360° / 3D / WebXR pour le projet résidentiel Khazef à Safi.

Cette documentation couvre l'architecture, les données et les points d'extension
de la visite immersive accessible via la route `/virtual-tour`
(`src/pages/VirtualTour.tsx`).

---

## 1. Vue d'ensemble

La visite offre trois modes complémentaires :

| Mode       | Description                                                      |
|------------|------------------------------------------------------------------|
| `panorama` | Image équirectangulaire 360°, navigation libre au regard.        |
| `3d`       | Plan volumique interactif du T3, lecture des proportions.        |
| WebXR      | Immersion complète au casque (Meta Quest, Chrome desktop).       |

Un visiteur démarre par défaut en mode `panorama`, pièce `living`. Un overlay
d'aide s'affiche lors de la première visite (persistance via `localStorage`).

---

## 2. Cartographie des fichiers

```
src/components/virtual-tour/
├── data/
│   ├── tour-data.ts            # TOUR_ROOMS, ROOM_ORDER, types Room / Hotspot
│   ├── panorama-assets.ts      # mapping placeholders → fichiers équirectangulaires
│   └── editorial-copy.ts       # tous les textes éditoriaux (FR/AR)
├── hooks/
│   └── useTourStore.ts         # zustand store (source de vérité)
├── scenes/
│   ├── RoomVolume.tsx          # volume 3D d'une pièce
│   └── XRProvider.tsx          # bootstrap WebXR
├── ui/
│   ├── AmbienceToggle.tsx      # on/off son d'ambiance
│   ├── CrosshairCompass.tsx    # réticule + cap
│   ├── InfoPanel.tsx           # fiche matériau (ouverte via store.infoPanelId)
│   ├── MeasurementTool.tsx     # mesure point-à-point en 3D
│   ├── MiniMap.tsx             # plan miniature + position
│   ├── ModeSwitcher.tsx        # bascule panorama ↔ 3d
│   ├── PanoramaLoading.tsx     # skeleton + shimmer
│   ├── RoomCarousel.tsx        # sélecteur de pièce en bas
│   ├── XRButton.tsx            # entrée en VR, fallback si non supporté
│   └── HelpOverlay.tsx         # teaching overlay première visite
├── Panorama360Viewer.tsx       # lecteur équirectangulaire (three.js)
├── Apartment3DScene.tsx        # scène 3D du T3
└── VirtualTourAccessibility.tsx # side-effects : lang, reduced-motion, clavier
```

```
docs/
└── VIRTUAL_TOUR.md             # ce fichier
```

---

## 3. Flux de données

`useTourStore` (zustand) est l'unique source de vérité côté client :

| Clé             | Type                         | Rôle                                 |
|-----------------|------------------------------|--------------------------------------|
| `currentRoom`   | `"living" \| "kitchen" \| "bedroom"` | pièce active                 |
| `mode`          | `"panorama" \| "3d"`         | mode de rendu                        |
| `xrActive`      | `boolean`                    | session WebXR en cours               |
| `audioEnabled`  | `boolean`                    | son d'ambiance actif                 |
| `infoPanelId`   | `string \| null`             | matériau ouvert en fiche             |

Schéma :

```
  [RoomCarousel]   [ModeSwitcher]   [XRButton]
         ↓                ↓              ↓
         └─── useTourStore (zustand) ────┘
                         ↓
         ┌──────────────┼───────────────┐
         ↓              ↓               ↓
   Panorama360Viewer  Apartment3DScene  InfoPanel
```

Aucun composant ne doit dupliquer ces champs dans un `useState` local.

---

## 4. Ajouter une pièce

1. Déposer les assets :
   - Panorama équirectangulaire 4K dans `public/panoramas/<id>.jpg`.
   - Miniature carrée 512×512 dans `src/assets/interior-<id>.jpg`.
2. Déclarer la pièce dans `TOUR_ROOMS` (`src/components/virtual-tour/data/tour-data.ts`) :
   - `id`, `name`, `arabic`, `description`, `surface`,
   - `panorama`, `thumbnail`, `mapPosition`,
   - `navHotspots` (transitions entre pièces),
   - `materialHotspots` (points dorés).
3. Ajouter l'`id` à `ROOM_ORDER` pour la navigation clavier et le carrousel.
4. Si un nouveau matériau est cité, l'ajouter à `MATERIAL_STORIES`
   dans `data/editorial-copy.ts` (types `MaterialKey`).

---

## 5. Remplacer les panoramas placeholder

Les panoramas par défaut sont les images d'intérieur (`src/assets/interior-*.jpg`).
Pour passer en production :

1. Lire `public/panoramas/README.md` (contraintes de prise de vue).
2. Exporter en équirectangulaire `.jpg` ou `.webp`, ratio strict 2:1,
   résolution recommandée **4096×2048** (8 Mo max après compression).
3. Déposer dans `public/panoramas/<room-id>.jpg`.
4. Mettre à jour `panorama-assets.ts` pour pointer vers le chemin public.

---

## 6. Performance

- **Lazy-loading** : `Panorama360Viewer` et `Apartment3DScene` sont importés
  via `React.lazy` dans `VirtualTour.tsx`. Le bundle initial de la page reste
  sous le budget **< 150 kb** gzip (cf. `rules/web/performance.md`).
- **Images** : servir en WebP/AVIF quand possible, dimensions explicites.
- **HDRI** : une seule HDRI chargée côté 3D (≤ 2 Mo), réutilisée entre pièces.
- **Son d'ambiance** : fichier `.ogg` < 400 Ko, lecture déclenchée par geste
  utilisateur uniquement.
- **WebXR** : initialisation différée jusqu'au clic sur `XRButton`.

---

## 7. Accessibilité

`VirtualTourAccessibility` (composant invisible, monté par `VirtualTour.tsx`)
prend en charge :

- `document.documentElement.lang = "fr"` sur montage, restauration au démontage.
- Détection de `prefers-reduced-motion: reduce` : désactivation XR, son coupé,
  callback `onReducedMotion` pour couper autorotate / parallax côté orchestrateur.
- Raccourcis clavier globaux :
  - `←` / `→` : pièce précédente / suivante dans `ROOM_ORDER`.
  - `Échap` : fermeture de la fiche matériau ouverte.
- Ignore les événements clavier émis depuis un champ éditable.

ARIA :

- `HelpOverlay` utilise `role="dialog"`, `aria-modal`, `aria-labelledby`,
  `aria-describedby`, focus géré sur le bouton « Entrer ».
- `InfoPanel` doit exposer un `role="dialog"` et un titre lisible.
- Les points dorés sont des `<button>` avec `aria-label` explicite.

---

## 8. Support navigateur WebXR

| Navigateur            | Panorama | 3D  | WebXR     |
|-----------------------|:--------:|:---:|:---------:|
| Chrome desktop        | ✅       | ✅  | ⚠️ flag   |
| Edge desktop          | ✅       | ✅  | ⚠️ flag   |
| Firefox desktop       | ✅       | ✅  | ❌        |
| Safari desktop        | ✅       | ✅  | ❌        |
| Safari iOS            | ✅       | ✅  | ❌        |
| Chrome Android        | ✅       | ✅  | ⚠️ limité |
| Meta Quest Browser    | ✅       | ✅  | ✅        |

Quand WebXR n'est pas disponible, `XRButton` s'efface au profit d'un message
éditorial (`VR_HELP_COPY.fallbackBody`).

---

## 9. Limitations connues et TODO

- [ ] Remplacer les images d'intérieur par de vrais panoramas équirectangulaires.
- [ ] Sourcer une HDRI extérieure (ciel de Safi, fin d'après-midi).
- [ ] Produire le fichier d'ambiance (`public/audio/ambience.ogg`).
- [ ] Option : fallback Matterport pour navigateurs sans support 3D.
- [ ] Tests visuels Playwright sur 3 breakpoints (`320`, `768`, `1440`).
- [ ] Audit Lighthouse cible LCP < 2,5 s sur la route `/virtual-tour`.

---

## 10. Références internes

- Charte graphique : `CHARTE-GRAPHIQUE.md` (§7 ton de marque, §8 accessibilité).
- Règles front : `~/.claude/rules/web/`.
- Convention SEO : `src/components/Seo.tsx` (titre + meta par route).
