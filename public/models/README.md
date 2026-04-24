# Modèles 3D (.glb) — Luxury Living

Dépose ici les modèles 3D exportés depuis les plans de l'architecte / Blender. Le site charge automatiquement le `.glb` correspondant à une typologie dès que le champ `modelUrl` est renseigné dans `apartment-typologies.ts`. Tant qu'aucun fichier n'est fourni, le moteur rend un appartement paramétrique (primitives Three.js) par défaut.

## Fichiers attendus

| Typologie | Fichier conseillé | Référencé par |
|---|---|---|
| Port (T2) | `port-t2.glb` | `modelUrl: "/models/port-t2.glb"` |
| Atlantique (T3) | `atlantique-t3.glb` | `modelUrl: "/models/atlantique-t3.glb"` |
| Ciel (Duplex) | `ciel-duplex.glb` | `modelUrl: "/models/ciel-duplex.glb"` |

## Spécifications

- **Format** : `.glb` (binaire, textures intégrées). Pas de `.gltf` + dossier annexe.
- **Poids** : < 15 Mo (viser 5-10 Mo avec compression Draco / Meshopt).
- **Triangles** : < 200 000 par modèle.
- **Unités** : **mètres** (1 Blender unit = 1 m). Y vers le haut (convention glTF).
- **Origine** : au centre du plan, sol à `y=0`.
- **Orientation** : façade principale vers `z négatif`.
- **Textures** : 1024 ou 2048 px max, KTX2 compressé si possible.
- **Pas de lumières intégrées** — elles sont définies en code.
- **Baking** : ambient occlusion bakée recommandée (gain de perf).

## Pipeline depuis un plan 2D

### Option 1 — Blender manuel (gratuit, maîtrise totale)
1. **File → Import image as reference** : importer le plan PNG à l'échelle (1 m = 1 unité Blender).
2. **Extruder les murs** (Shift+E) sur 2.80 m.
3. Ajouter portes, fenêtres, mobilier (bibliothèque gratuite : blenderkit.com).
4. **Matériaux** : marbre, tadelakt, indigo, or (palette Luxury Living).
5. **File → Export → glTF 2.0 (.glb)** avec "Compression: Draco" activée.

### Option 2 — IA accélérée (en quelques minutes)
- **CubiCasa AI** (cubicasa.com) : upload plan PNG → sortie `.glb`.
- **Planner 5D** : redessin rapide + export.
- **Archilabs** : pipeline architecte avec rendu photoréaliste.

### Option 3 — Sous-traitance (250-600 € par appartement ~90 m²)
Freelance Blender 3D sur Malt, Upwork, Fiverr (4-6 h de travail).

## Activer un modèle

Dans `src/components/virtual-tour/data/apartment-typologies.ts` :

```ts
{
  id: "ciel-duplex",
  // …champs existants…
  modelUrl: "/models/ciel-duplex.glb",
}
```

Au prochain rechargement, le viewer charge le vrai modèle. **Aucune autre ligne à changer** — collisions, caméra, hotspots et navigation restent pilotés par les `rooms[]` de la typologie. Quand `modelUrl` est absent, le site retombe sur le rendu paramétrique (primitives Three.js).

## Vérification locale

1. `npm run dev`
2. Ouvrir `/virtual-tour`
3. Sélectionner la typologie — le `.glb` s'affiche
4. Si 404, vérifier le chemin `/models/xxx.glb` et la taille (< 15 Mo).
