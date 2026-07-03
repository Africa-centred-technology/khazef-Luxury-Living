"""
Génère le fond « relief » de la carte des lots à partir du plan + des parcelles.

Les parcelles apparaissent en tuiles surélevées (ombre portée + bevel), alignées
sur le plan (mêmes coordonnées normalisées que src/data/lot-parcels.ts).
Sortie : public/plan-lotissement-relief.webp

Usage : python update/generate_relief_bg.py   (depuis n'importe quel dossier)
"""
import os
import re

from PIL import Image, ImageDraw, ImageFilter

_HERE = os.path.dirname(os.path.abspath(__file__))
_ROOT = os.path.dirname(_HERE)
PARCELS_TS = os.path.join(_ROOT, "src", "data", "lot-parcels.ts")
PLAN = os.path.join(_ROOT, "public", "plan-lotissement.webp")
OUT = os.path.join(_ROOT, "public", "plan-lotissement-relief.webp")

ts = open(PARCELS_TS, encoding="utf-8").read()
W = int(re.search(r"PLAN_WIDTH = (\d+)", ts).group(1))
H = int(re.search(r"PLAN_HEIGHT = (\d+)", ts).group(1))
parcels = []
for _n, arr in re.findall(r"(\d+):\s*(\[\[.*?\]\]),", ts):
    pts = [(float(x) * W, float(y) * H) for x, y in re.findall(r"\[([\d.]+),([\d.]+)\]", arr)]
    if len(pts) >= 3:
        parcels.append(pts)

# Base : plan très éclairci (rues / traits en filigrane).
base = Image.open(PLAN).convert("RGB").point(lambda o: int(255 - (255 - o) * 0.45))

# 1) Ombre portée des parcelles (relief).
sh = Image.new("RGBA", (W, H), (0, 0, 0, 0))
sd = ImageDraw.Draw(sh)
for poly in parcels:
    sd.polygon([(x, y + 10) for x, y in poly], fill=(40, 32, 28, 140))
sh = sh.filter(ImageFilter.GaussianBlur(9))
img = Image.alpha_composite(base.convert("RGBA"), sh)

# 2) Tuiles claires (plateau surélevé) + liseré.
tile = Image.new("RGBA", (W, H), (0, 0, 0, 0))
td = ImageDraw.Draw(tile)
for poly in parcels:
    td.polygon(poly, fill=(238, 229, 220, 255), outline=(210, 196, 183, 255))
img = Image.alpha_composite(img, tile)

# 3) Reflet de bord haut (bevel).
bev = Image.new("RGBA", (W, H), (0, 0, 0, 0))
bd = ImageDraw.Draw(bev)
for poly in parcels:
    top = sorted(poly, key=lambda p: p[1])[:2]
    if len(top) == 2:
        bd.line([top[0], top[1]], fill=(255, 252, 248, 220), width=3)
img = Image.alpha_composite(img, bev.filter(ImageFilter.GaussianBlur(1))).convert("RGB")

img.save(OUT, "WEBP", quality=82, method=6)
print(f"Relief -> {OUT} ({os.path.getsize(OUT) // 1024} ko)")
