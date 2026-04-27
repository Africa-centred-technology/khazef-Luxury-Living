# Khazef — Luxury Living

> Site vitrine immobilier de prestige · Résidence R+6 · Safi, Maroc

[![CI](https://github.com/jesse-act/khazef-porcelain-elegance/actions/workflows/ci.yml/badge.svg)](https://github.com/jesse-act/khazef-porcelain-elegance/actions/workflows/ci.yml)
[![Deploy](https://github.com/jesse-act/khazef-porcelain-elegance/actions/workflows/deploy.yml/badge.svg)](https://github.com/jesse-act/khazef-porcelain-elegance/actions/workflows/deploy.yml)

---

## À propos du projet

**Khazef — Luxury Living** est le site marketing officiel d'une résidence immobilière haut de gamme située à **Safi, Maroc**. Le nom *Khazef* (خَزَف) rend hommage à la tradition séculaire de la céramique safienne : chaque détail du site reflète cet ancrage artisanal et méditerranéen.

La résidence comprend :
- **25 appartements** du T2 au penthouse duplex
- **2 espaces commerciaux** en rez-de-chaussée
- **7 niveaux** (R+6) avec vue sur l'Atlantique

---

## Fonctionnalités

| Page | Description |
|---|---|
| **Accueil** | Hero éditorial, manifeste de marque, chiffres clés, aperçus sections |
| **Projet** | Concept architectural, matériaux (tadelakt, zellige, marbre), engagements promoteur |
| **Appartements** | Catalogue des 3 typologies avec fiches complètes |
| **Détail appartement** | Narratif immersif, palette matières, plan 3D interactif, formulaire de réservation |
| **Plans** | Distribution niveau par niveau, typologies T2 → T5 |
| **Visite virtuelle** | Panorama 360°, mode 3D, hotspots matières, support WebXR / VR |
| **Emplacement** | Carte, points d'intérêt, art de vivre à Safi |
| **Livraison** | Timeline de chantier avec avancement |
| **Safi** | Histoire, culture potière, côte atlantique |
| **Galerie** | Mosaïque photos avec lightbox |
| **Contact** | Formulaire de visite privée, coordonnées bureau de vente |

---

## Stack technique

### Frontend
- **Vite 5** + **React 18** + **TypeScript** (compilateur SWC)
- **React Router DOM v6** — routing multi-pages SPA
- **Tailwind CSS 3** + shadcn/ui + Radix UI
- **Framer Motion** — animations et transitions de page

### 3D & Visite virtuelle
- **Three.js** + **@react-three/fiber** + **@react-three/drei**
- **@react-three/xr** — support WebXR (Meta Quest, Chrome WebXR)
- **@photo-sphere-viewer** — panorama 360° avec plugins (markers, compass, autorotate)

### Internationalisation
- **i18next** + **react-i18next** — 15 namespaces, support RTL arabe complet
- Langues : 🇫🇷 Français · 🇲🇦 العربية

### State & Formulaires
- **TanStack Query** — gestion état serveur
- **React Hook Form** + **Zod** — validation formulaires
- **Zustand** — état global léger

### Déploiement
- **Docker** multi-stage (Node 20 build → Nginx 1.27 serve)
- **GitHub Actions** — CI (lint + build + test) + CD (SSH deploy)

---

## Installation & Développement

### Prérequis

- Node.js ≥ 20
- npm ≥ 10

### Démarrage rapide

```bash
git clone https://github.com/jesse-act/khazef-porcelain-elegance.git
cd khazef-porcelain-elegance
npm install
npm run dev
```

Le serveur de développement démarre sur **http://localhost:8080**

### Commandes disponibles

```bash
npm run dev          # Serveur de développement (HMR)
npm run build        # Build production → dist/
npm run preview      # Prévisualiser le build production
npm run lint         # ESLint
npm run test         # Tests unitaires (Vitest, one-shot)
npm run test:watch   # Tests en mode watch
```

---

## Structure du projet

```
khazef-porcelain-elegance/
├── .github/
│   └── workflows/
│       ├── ci.yml          # Lint + build + test sur chaque push/PR
│       └── deploy.yml      # SSH deploy sur push vers main
├── scripts/
│   └── deploy.sh           # Script de déploiement côté serveur
├── src/
│   ├── components/
│   │   ├── layout/         # Navbar, Footer, Layout
│   │   ├── ui/             # Primitives shadcn/ui
│   │   └── virtual-tour/   # Scènes 3D, panorama 360°, hotspots, UI overlay
│   ├── locales/
│   │   ├── fr/             # 15 namespaces français
│   │   └── ar/             # 15 namespaces arabe (RTL)
│   ├── pages/              # Une page par route
│   ├── hooks/              # Hooks personnalisés
│   └── index.css           # Tokens design (palette HSL, typo, animations)
├── Dockerfile              # Build multi-stage Node → Nginx
├── docker-compose.yml      # Déploiement conteneur
├── nginx.conf              # Config Nginx (SPA fallback, cache, headers)
├── fr.md                   # Référence textes français (traduction)
└── TRADUCTION-AR.md        # Tableaux FR | AR pour révision manuelle
```

### Design system

Toutes les couleurs, gradients et typographies sont définis comme **variables CSS HSL** dans `src/index.css` et consommés via `tailwind.config.ts`. Ne jamais utiliser de valeurs hex directement dans les composants.

Polices chargées via Google Fonts :
- **Cormorant Garamond** — titres display
- **Outfit** — corps de texte
- **Amiri** — textes arabes

---

## Internationalisation

Les traductions se trouvent dans `src/locales/<lang>/`. Chaque page correspond à un namespace JSON indépendant.

Pour réviser les traductions arabes, deux fichiers de référence sont disponibles à la racine :

- **`fr.md`** — tous les textes français organisés par page/namespace
- **`TRADUCTION-AR.md`** — tableaux FR | AR côte-à-côte pour correction manuelle

Pour corriger une traduction : éditer directement `src/locales/ar/<namespace>.json` puis commiter.

---

## Déploiement

### Docker (recommandé pour le serveur Ubuntu)

```bash
# Premier lancement
git clone https://github.com/jesse-act/khazef-porcelain-elegance.git /opt/khazef
cd /opt/khazef
docker compose up -d --build

# Mise à jour
git pull && docker compose up -d --build

# Logs en direct
docker logs khazef -f
```

Le site est accessible sur le **port 80**.

### Prérequis serveur Ubuntu (une seule fois)

```bash
sudo apt update && sudo apt install -y docker.io docker-compose-plugin
sudo systemctl enable --now docker
sudo usermod -aG docker $USER   # Puis se déconnecter/reconnecter
```

### Script de déploiement manuel

```bash
cd /opt/khazef
bash scripts/deploy.sh
```

---

## CI/CD

### CI — `ci.yml`

Déclenché sur chaque **push** et **pull request** vers `main` :

1. Installation des dépendances (`npm ci`)
2. Lint (`eslint`)
3. Build de production (`vite build`)
4. Tests unitaires (`vitest`)

### CD — `deploy.yml`

Déclenché sur chaque **push vers `main`** :

- Connexion SSH au serveur Ubuntu
- Exécution de `scripts/deploy.sh` (git pull → docker compose up → image prune)

### Secrets GitHub requis

| Secret | Description |
|---|---|
| `SSH_PRIVATE_KEY` | Clé privée SSH du compte deploy sur le serveur |
| `SERVER_HOST` | IP ou hostname du serveur |
| `SERVER_USER` | Utilisateur SSH (ex. `deploy`) |
| `SERVER_PATH` | Chemin du repo sur le serveur (ex. `/opt/khazef`) |
| `SERVER_PORT` | Port SSH — optionnel, `22` par défaut |

### Générer la clé SSH pour GitHub Actions

```bash
# Sur le serveur
ssh-keygen -t ed25519 -C "github-actions-khazef" -f ~/.ssh/github_deploy
cat ~/.ssh/github_deploy.pub >> ~/.ssh/authorized_keys

# Copier le contenu de ~/.ssh/github_deploy dans le secret SSH_PRIVATE_KEY
```

---

## Repositories

| Compte | URL |
|---|---|
| Principal (`jesse-act`) | https://github.com/jesse-act/khazef-porcelain-elegance |
| Organisation ACT | https://github.com/Africa-centred-technology/khazef-Luxury-Living |
| Personnel (`mpigajesse`) | https://github.com/mpigajesse/Luxury-Living-khazef- |

---

## Licence

Projet propriétaire — © 2025 Luxury Living · Khazef · Safi, Maroc. Tous droits réservés.
