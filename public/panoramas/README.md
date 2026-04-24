# Panoramas 360deg — Khazef

Ce dossier accueille les photos equirectangulaires utilisees par la visite
virtuelle (photo-sphere-viewer).

## Qu'est-ce qu'une image equirectangulaire ?

Une projection 360deg x 180deg sur un rectangle au **ratio 2:1**. L'horizon
occupe la ligne mediane ; le haut et le bas de l'image sont fortement
etires (pole nord / pole sud). Toute photo qui n'est pas au ratio 2:1 sera
deformee par le viewer.

## Specification attendue

- Resolution : **6144 x 3072** (6K) — 4096 x 2048 acceptable en degrade.
- Format : JPEG, qualite ~85 %.
- Poids cible : **~1.5 Mo max par image** (pensez mobile).
- Espace colorimetrique : sRGB.
- Nord de la scene : face a la fenetre principale, pour coherence
  inter-pieces.

## Fichiers attendus

- `living-6k.jpg`
- `kitchen-6k.jpg`
- `bedroom-6k.jpg`

Une fois ces trois fichiers en place, basculez le drapeau
`USE_REAL_PANORAMAS` a `true` dans
`src/components/virtual-tour/data/panorama-assets.ts`.

## Sources et materiel

- HDRIs libres (CC0) : <https://polyhaven.com/hdris> — utiles pour tests.
- Panoramas d'interieurs : typiquement captures avec **Insta360 One RS 1-Inch
  360** ou **Ricoh Theta Z1**, puis exportes en equirectangulaire.
