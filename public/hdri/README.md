# HDRI — Environnement 3D Khazef

Ce dossier accueille les environnement maps HDR utilisees pour l'eclairage
image-based de la scene 3D (reflets sur marbre, laiton, zellige).

## Formats acceptes

- `.hdr` (Radiance RGBE) — recommande, lu nativement par three.js.
- `.exr` (OpenEXR) — egalement supporte, poids plus lourd.

## Resolution conseillee

- **2K (2048 x 1024)** suffit largement pour un eclairage d'ambiance.
- 4K possible si le rendu justifie le surcout en bande passante.

## Fichier attendu

- `apartment-interior.hdr`

Le chemin est cable dans `panorama-assets.ts` via la constante `HDRI_URL`.

## Source recommandee

Poly Haven — licence CC0, usage commercial libre :
<https://polyhaven.com/hdris/indoor>

Selectionnez une scene d'interieur residentiel (baie vitree, lumiere
naturelle chaude), telechargez le HDR en 2K, renommez-le
`apartment-interior.hdr` et deposez-le ici.
