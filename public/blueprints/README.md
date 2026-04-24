# Plans d'architecte — Luxury Living

Dépose ici les plans 2D que les visiteurs pourront consulter depuis la fiche de chaque typologie (bouton "Voir le plan d'architecte").

## Fichiers attendus

| Typologie | Fichier conseillé | Référencé par |
|---|---|---|
| Port (T2) | `port-t2.png` | `blueprintUrl: "/blueprints/port-t2.png"` |
| Atlantique (T3) | `atlantique-t3.png` | `blueprintUrl: "/blueprints/atlantique-t3.png"` |
| Ciel (Duplex) | `ciel-duplex.png` | `blueprintUrl: "/blueprints/ciel-duplex.png"` |

## Spécifications

- **Format** : PNG ou WebP (WebP recommandé, ~50% plus léger).
- **Dimensions** : 1600 × 1200 px minimum (le plan doit rester net en plein écran).
- **Poids** : < 500 Ko par fichier.
- **Fond** : blanc ou crème (`#faf7f2`). Traits en indigo `#0e1f4d` ou gris foncé.
- **Légendes** : inclure cotes principales, orientation (N), surfaces par pièce.
- **Exporter depuis** : AutoCAD / Archicad / Revit → PNG ; ou depuis Illustrator si retravaillé.

## Activer le plan pour une typologie

Dans `src/components/virtual-tour/data/apartment-typologies.ts`, ajoute ces deux champs à la typologie concernée :

```ts
{
  id: "atlantique-t3",
  // …existing fields…
  blueprintUrl: "/blueprints/atlantique-t3.webp",
  blueprintCaption: "Plan au 1/100ᵉ — 4ᵉ étage — orienté sud-ouest.",
}
```

Le bouton "Voir le plan d'architecte" apparaîtra automatiquement dans la fiche typologie.
