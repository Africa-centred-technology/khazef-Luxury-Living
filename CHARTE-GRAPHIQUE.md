# Charte graphique — Khazef Luxury Living

> **خَزَف** · *L'art de vivre, ciselé dans la pierre.*
> Direction artistique : luxe méditerranéen contemporain, éditorial.

---

## 1. Logo

Le logo est un médaillon circulaire inspiré du zellige marocain, associant une calligraphie arabe de « خَزَف » (céramique) à la mention **KHAZEF · PROJET IMMOBILIER**. Il se décline en deux tailles :

| Usage | Fichier | Dimensions natives |
|---|---|---|
| Web, communication, impression standard | `assets/logo.png` | 652 × 800 px |
| Header, footer, favicon, signatures | `assets/logo-small.png` | 98 × 120 px |

**Zone de protection minimale** : une marge équivalente à la hauteur du « K » de KHAZEF tout autour du logo.
**Taille minimale** : 40 px de haut à l'écran, 12 mm en impression.
**Interdit** : déformer, recolorer, ajouter un contour, placer sur un fond qui compromet la lisibilité de la calligraphie bleue.

---

## 2. Palette de couleurs

### Teintes principales

| Rôle | Nom | HEX | Usage |
|---|---|---|---|
| Primaire | Indigo profond | `#0e1f4d` | Titres, texte principal, fonds sombres, navigation |
| Primaire clair | Indigo royal | `#1a3a8c` | Accents typographiques italiques, cartes, dégradés |
| Primaire soft | Indigo doux | `#2d4a9a` | Hover, bordures actives |
| Signature | Or doux | `#c9a961` | Éléments premium, hotspots, filets, icônes |
| Signature bright | Or lumineux | `#d9b873` | Dégradés, lueurs, surlignages |
| Signature deep | Or profond | `#a0843e` | Ombrage, bas de dégradés |
| Accent | Turquoise Méditerranée | `#5c9ba3` | Jardins, eau, fraîcheur, illustrations extérieures |

### Neutres

| Rôle | Nom | HEX | Usage |
|---|---|---|---|
| Fond principal | Blanc cassé chaud | `#faf7f2` | Fond du site |
| Fond secondaire | Crème | `#f2ede3` | Alternance de sections |
| Fond minéral | Pierre | `#e8e0d2` | Cartes, zones d'information |
| Texte sombre alt | Charbon | `#1a1d2e` | Footer, fonds graphiques |
| Texte secondaire | Gris muet | `#6b7280` | Légendes, texte de soutien |

### Dégradés signature

```css
/* Indigo */
linear-gradient(135deg, #1a3a8c 0%, #0e1f4d 100%);

/* Or */
linear-gradient(135deg, #d9b873 0%, #a0843e 100%);

/* Or lumineux (boutons, accents) */
linear-gradient(135deg, #e6c77a 0%, #a0843e 50%, #d9b873 100%);

/* Jardin méditerranéen */
linear-gradient(135deg, #5c9ba3 0%, #1a3a8c 100%);

/* Tadelakt chaud */
linear-gradient(135deg, #e8dcc0 0%, #d4c4a0 100%);

/* Ciel nocturne (section Engagements) */
linear-gradient(135deg, #0e1f4d 0%, #1a3a8c 50%, #0e1f4d 100%);
```

---

## 3. Typographie

Trois familles, une hiérarchie claire.

### Cormorant Garamond — Display

Sérif éditoriale, pour tous les titres et passages expressifs.
- Régulier (400) pour les titres
- *Italique (400)* pour les accents poétiques et les mises en avant ciselées
- Variable entre `clamp(2.3rem, 5.5vw, 4.2rem)` (h2) et `clamp(4rem, 12vw, 9.5rem)` (hero)

### Outfit — Body

Sans-serif géométrique moderne, pour tout le texte courant et l'interface.
- 300 (light) pour les longs paragraphes
- 400 (regular) pour le corps standard
- 500 (medium) pour les labels et boutons
- 600 (semibold) pour les mentions fortes

### Amiri — Arabe

Typographie arabe classique pour les éléments de calligraphie (خَزَف).
- Utilisée uniquement pour l'identité arabe et les ornements
- Toujours accompagnée d'un contraste fort (or sur indigo, ou indigo sur crème)

### Règles typographiques

- **Majuscules espacées** (`letter-spacing: 0.15em à 0.25em`) pour les labels, numéros de section, sur-titres.
- Les chiffres des statistiques et timelines sont toujours en Cormorant Garamond, grande taille.
- Pas plus de trois tailles de texte par écran pour préserver la hiérarchie.

---

## 4. Système de mise en page

| Token | Valeur | Usage |
|---|---|---|
| Container max | `1280px` | Largeur maximale des contenus |
| Gutter | `clamp(1.25rem, 4vw, 3rem)` | Marges latérales responsives |
| Mobile gutter | `1.25rem` | Marges sous 768 px |
| Grilles | 2 / 3 / 4 / 6 colonnes | Selon la section |

---

## 5. Ombres

Quatre niveaux d'élévation, tous teintés d'indigo pour rester cohérents avec la palette.

```css
--shadow-sm: 0 1px 2px  rgba(14, 31, 77, 0.06), 0 1px 3px  rgba(14, 31, 77, 0.04);
--shadow-md: 0 4px 6px  rgba(14, 31, 77, 0.05), 0 10px 15px rgba(14, 31, 77, 0.08);
--shadow-lg: 0 20px 40px rgba(14, 31, 77, 0.12), 0 10px 20px rgba(14, 31, 77, 0.08);
--shadow-xl: 0 40px 80px rgba(14, 31, 77, 0.18);
```

---

## 6. Éléments graphiques

- **Motifs zellige** : losanges et étoiles stylisées, tracés à `1 px` en or sur indigo, ou en indigo sur crème. Toujours en opacité réduite (12 à 20 %) pour rester en arrière-plan.
- **Filets fins** : `1 px` en or `#c9a961` pour souligner les titres et structurer les sections.
- **Hotspots** : cercles dorés pulsants de `16 px`, halo radial opacité 30 %.
- **Ornements** : arabesques SVG à 4 ou 8 branches, rotation lente en décor.

---

## 7. Ton de marque

| À privilégier | À éviter |
|---|---|
| Poésie, éditorial, ciselé | Superlatifs creux, langage agressif |
| Mots courts et précis | Jargon immobilier standard |
| Alternance français / arabe | Anglicismes gratuits |
| Concret : matériaux, mesures, dates | Promesses vagues |

Exemples de formulations signature :
- *« Entrez chez vous, avant tout le monde. »*
- *« L'art de vivre, ciselé dans la pierre. »*
- *« Une visite privée, sur simple demande. »*

---

## 8. Accessibilité

- Contraste minimum **AA** respecté partout (indigo `#0e1f4d` sur crème `#faf7f2` = ratio 14.2:1).
- L'or `#c9a961` n'est jamais utilisé seul pour du texte courant sur fond clair — uniquement sur fond indigo ou en gros caractère.
- Tailles tactiles : boutons de `48 px` minimum.
- Focus visible : contour or `2 px` + `outline-offset` de `4 px`.
