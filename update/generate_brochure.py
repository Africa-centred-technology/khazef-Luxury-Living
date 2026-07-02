"""
Generateur de la brochure commerciale « Les Villas Ahlam » (multi-pages, A4).

Compose les rendus HD de update/images/ + le contenu reel du projet en un PDF
premium. Sortie : public/brochure-villas-ahlam.pdf.

Usage : python update/generate_brochure.py   (depuis la racine du repo front)
"""
import os
from PIL import Image, ImageDraw, ImageFont

# --- Palette marque (charte Ahlam) ---
ORCHID = (148, 47, 103)
HONEY = (242, 195, 104)
IVORY = (247, 240, 234)
OAK = (66, 57, 52)
JADE = (134, 148, 122)
WHITE = (255, 255, 255)
GREY = (96, 86, 80)

# --- A4 portrait @150 dpi ---
W, H = 1240, 1754
MARGIN = 96

SRC = "update/images"
OUT = "public/brochure-villas-ahlam.pdf"

# --- Surfaces des 42 lots (CDC §13) ---
SURFACES = {
    1: 303, 2: 340, 3: 200, 4: 200, 5: 200, 6: 200, 7: 200, 8: 200, 9: 200,
    10: 200, 11: 200, 12: 303, 13: 340, 14: 200, 15: 200, 16: 300, 17: 452,
    18: 281, 19: 200, 20: 200, 21: 200, 22: 200, 23: 200, 24: 200, 25: 200,
    26: 461, 27: 323, 28: 250, 29: 363, 30: 250, 31: 200, 32: 200, 33: 200,
    34: 318, 35: 200, 36: 332, 37: 269, 38: 200, 39: 200, 40: 200, 41: 200,
    42: 318,
}

F = "C:/Windows/Fonts/"


def font(paths, size):
    for p in paths:
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()


def serif_b(s):
    return font([F + "georgiab.ttf", F + "timesbd.ttf", F + "arialbd.ttf"], s)


def serif(s):
    return font([F + "georgia.ttf", F + "times.ttf", F + "arial.ttf"], s)


def sans(s):
    return font([F + "arial.ttf"], s)


def sans_b(s):
    return font([F + "arialbd.ttf"], s)


def load(keyword):
    for fn in os.listdir(SRC):
        if keyword.lower() in fn.lower() and fn.lower().endswith(".png"):
            return Image.open(os.path.join(SRC, fn)).convert("RGB")
    raise FileNotFoundError(keyword)


def cover(img, w, h):
    """Recadre l'image pour remplir w x h (cover)."""
    r_t, r_s = w / h, img.width / img.height
    if r_s > r_t:
        nw = int(img.height * r_t)
        img = img.crop(((img.width - nw) // 2, 0, (img.width - nw) // 2 + nw, img.height))
    else:
        nh = int(img.width / r_t)
        img = img.crop((0, (img.height - nh) // 2, img.width, (img.height - nh) // 2 + nh))
    return img.resize((w, h), Image.LANCZOS)


def gradient_overlay(img, strength=190, start=0.45):
    """Assombrit le bas de l'image pour la lisibilite du texte."""
    w, h = img.size
    col = Image.new("L", (1, h), 0)
    for y in range(h):
        t = max(0, (y - h * start) / (h * (1 - start)))
        col.putpixel((0, y), int(strength * t))
    mask = col.resize((w, h))
    dark = Image.new("RGB", (w, h), OAK)
    return Image.composite(dark, img, mask)


def wrap(draw, text, fnt, max_w):
    words, lines, cur = text.split(), [], ""
    for word in words:
        trial = (cur + " " + word).strip()
        if draw.textlength(trial, font=fnt) <= max_w:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = word
    if cur:
        lines.append(cur)
    return lines


def paragraph(draw, text, fnt, x, y, max_w, fill, leading=1.45):
    lh = int(fnt.size * leading)
    for line in wrap(draw, text, fnt, max_w):
        draw.text((x, y), line, font=fnt, fill=fill)
        y += lh
    return y


def eyebrow(draw, text, x, y, color=ORCHID):
    draw.rectangle([x, y + 6, x + 46, y + 9], fill=HONEY)
    draw.text((x + 62, y), text, font=sans_b(24), fill=color)
    return y + 44


def footer(draw, page_no):
    draw.line([MARGIN, H - 70, W - MARGIN, H - 70], fill=(225, 215, 206), width=2)
    draw.text((MARGIN, H - 56), "Les Villas Ahlam · Bouskoura", font=sans(20), fill=GREY)
    label = f"{page_no:02d}"
    draw.text((W - MARGIN - draw.textlength(label, font=sans_b(20)), H - 56), label,
              font=sans_b(20), fill=ORCHID)


pages = []


def new_page(bg=IVORY):
    p = Image.new("RGB", (W, H), bg)
    return p, ImageDraw.Draw(p)


# ============ PAGE 1 — COUVERTURE ============
p, d = new_page()
hero = gradient_overlay(cover(load("1. hero"), W, int(H * 0.72)), strength=210, start=0.35)
p.paste(hero, (0, 0))
y = int(H * 0.72) - 360
d.rectangle([MARGIN, y, MARGIN + 60, y + 5], fill=HONEY)
d.text((MARGIN, y + 26), "DOMAINE RÉSIDENTIEL PRIVÉ · BOUSKOURA", font=sans_b(28), fill=HONEY)
d.text((MARGIN - 4, y + 74), "Les Villas", font=serif_b(118), fill=WHITE)
d.text((MARGIN - 4, y + 196), "Ahlam", font=serif_b(118), fill=WHITE)
d.text((MARGIN, y + 340), "Là où vos rêves prennent racine.", font=serif(44), fill=IVORY)
# bandeau bas
d.rectangle([0, H - 150, W, H], fill=ORCHID)
d.text((MARGIN, H - 118), "Plaquette de présentation", font=serif_b(40), fill=WHITE)
d.text((MARGIN, H - 60), "Yatib Sakan  ·  06 61 22 86 19  ·  wa.me/212661228619",
       font=sans_b(26), fill=IVORY)
pages.append(p)

# ============ PAGE 2 — LE DOMAINE ============
p, d = new_page()
img = cover(load("portail"), W, 720)
p.paste(img, (0, 0))
y = 780
y = eyebrow(d, "LE DOMAINE", MARGIN, y)
d.text((MARGIN - 2, y), "Un domaine privé,", font=serif_b(64), fill=OAK)
d.text((MARGIN - 2, y + 70), "où vos rêves prennent racine.", font=serif(56), fill=ORCHID)
y += 170
txt = ("42 villas R+1 sur lots viabilisés, dans un domaine clos et sécurisé à Bouskoura. "
       "Un ensemble organisé en deux îlots, des rues paysagées d'oliviers et de bougainvilliers, "
       "et l'intimité d'un terrain bien à soi.")
y = paragraph(d, txt, sans(30), MARGIN, y, W - 2 * MARGIN, GREY)
y += 20
txt2 = ("Aux portes de la forêt de Bouskoura et de Bouskoura Golf City, le domaine conjugue "
        "la nature et la ville : l'air pur d'un côté, Casablanca à vingt minutes de l'autre.")
y = paragraph(d, txt2, sans(30), MARGIN, y, W - 2 * MARGIN, GREY)
# facts
y += 40
facts = [("42", "villas R+1"), ("2", "îlots"), ("200–461 m²", "de terrain"), ("4 500 DH/m²", "à partir de")]
cw = (W - 2 * MARGIN) // 4
for i, (big, small) in enumerate(facts):
    x = MARGIN + i * cw
    d.text((x, y), big, font=serif_b(46), fill=ORCHID)
    d.text((x, y + 60), small, font=sans(24), fill=GREY)
footer(d, 2)
pages.append(p)

# ============ PAGE 3 — ARCHITECTURE ============
p, d = new_page()
y = eyebrow(d, "ARCHITECTURE", MARGIN, MARGIN)
d.text((MARGIN - 2, y), "Une architecture", font=serif_b(58), fill=OAK)
d.text((MARGIN - 2, y + 64), "marocaine contemporaine.", font=serif(50), fill=ORCHID)
y += 170
img = cover(load("jour"), W - 2 * MARGIN, 560)
p.paste(img, (MARGIN, y))
y += 580
half = (W - 2 * MARGIN - 24) // 2
img2 = cover(load("crépuscule"), half, 300)
p.paste(img2, (MARGIN, y))
# texte a droite
tx = MARGIN + half + 24
d.text((tx, y), "Jour & nuit", font=serif_b(40), fill=OAK)
feats = ["Façades enduites crème, toits plats", "Grandes baies à menuiserie sombre",
         "Zellige, tadelakt, pierre & bois", "Toit-terrasse aménageable", "Villas R+1 personnalisables"]
yy = y + 70
for fe in feats:
    d.ellipse([tx, yy + 8, tx + 10, yy + 18], fill=HONEY)
    d.text((tx + 26, yy), fe, font=sans(26), fill=GREY)
    yy += 46
footer(d, 3)
pages.append(p)

# ============ PAGE 4 — INTERIEURS ============
p, d = new_page()
y = eyebrow(d, "INTÉRIEURS", MARGIN, MARGIN)
d.text((MARGIN - 2, y), "Des intérieurs", font=serif_b(58), fill=OAK)
d.text((MARGIN - 2, y + 64), "à vivre.", font=serif(50), fill=ORCHID)
y += 160
big = cover(load("salon"), W - 2 * MARGIN, 470)
p.paste(big, (MARGIN, y))
y += 490
half = (W - 2 * MARGIN - 24) // 2
p.paste(cover(load("cuisine"), half, 360), (MARGIN, y))
p.paste(cover(load("chambre"), half, 360), (MARGIN + half + 24, y))
y += 380
d.text((MARGIN, y), "Salon · Cuisine ouverte · Suite parentale", font=serif(30), fill=OAK)
footer(d, 4)
pages.append(p)

# ============ PAGE 5 — LE QUARTIER ============
p, d = new_page()
img = cover(load("Allée"), W, 640)
p.paste(img, (0, 0))
y = 700
y = eyebrow(d, "LE QUARTIER", MARGIN, y)
d.text((MARGIN - 2, y), "À Bouskoura,", font=serif_b(60), fill=OAK)
d.text((MARGIN - 2, y + 66), "entre forêt et ville.", font=serif(52), fill=ORCHID)
y += 170
prox = [("Aéroport Mohammed V", "15–20 min"), ("Centre de Casablanca", "20–25 min"),
        ("Forêt de Bouskoura", "à proximité"), ("Bouskoura Golf City", "à proximité"),
        ("Écoles internationales", "à proximité"), ("Cliniques & commerces", "à proximité")]
for name, dist in prox:
    d.text((MARGIN, y), name, font=sans(30), fill=OAK)
    d.text((W - MARGIN - d.textlength(dist, font=sans_b(30)), y), dist, font=sans_b(30), fill=ORCHID)
    d.line([MARGIN, y + 48, W - MARGIN, y + 48], fill=(228, 218, 209), width=2)
    y += 74
footer(d, 5)
pages.append(p)

# ============ PAGE 6 — PLAN & PRIX ============
p, d = new_page()
img = cover(load("lots"), W, 520)
p.paste(img, (0, 0))
y = 580
y = eyebrow(d, "PLAN & DISPONIBILITÉS", MARGIN, y)
d.text((MARGIN - 2, y), "42 lots, deux îlots.", font=serif_b(58), fill=OAK)
y += 90
d.text((MARGIN, y), "Prix indicatif « à partir de » = surface × 4 500 DH/m². Prix exact sur demande.",
       font=sans(26), fill=GREY)
y += 64
# table 2 colonnes (ilot A 1-16, ilot B 17-42)
col_w = (W - 2 * MARGIN - 40) // 2

def draw_lot_table(x, y0, title, nums):
    d.text((x, y0), title, font=sans_b(28), fill=ORCHID)
    yy = y0 + 46
    for n in nums:
        s = SURFACES[n]
        d.text((x, yy), f"Lot {n:>2}", font=sans(24), fill=OAK)
        d.text((x + 150, yy), f"{s} m²", font=sans(24), fill=GREY)
        d.text((x + 300, yy), f"{s*4500:,}".replace(",", " ") + " DH", font=sans(24), fill=OAK)
        yy += 38
    return yy

draw_lot_table(MARGIN, y, "ÎLOT A · lots 1 à 16", range(1, 17))
draw_lot_table(MARGIN + col_w + 40, y, "ÎLOT B · lots 17 à 42", range(17, 43))
footer(d, 6)
pages.append(p)

# ============ PAGE 7 — FINANCEMENT & CONTACT ============
p, d = new_page()
img = gradient_overlay(cover(load("famille"), W, 560), strength=160, start=0.4)
p.paste(img, (0, 0))
d.text((MARGIN, 430), "Réservez votre lot en ligne", font=serif_b(50), fill=WHITE)
y = 640
y = eyebrow(d, "FINANCEMENT", MARGIN, y)
txt = ("Un simulateur de crédit en ligne estime votre mensualité, et nos conseillers vous "
       "accompagnent auprès des grandes banques marocaines.")
y = paragraph(d, txt, sans(30), MARGIN, y, W - 2 * MARGIN, GREY)
y += 16
d.text((MARGIN, y), "Attijariwafa Bank   ·   Bank of Africa   ·   CIH Bank   ·   BMCE",
       font=sans_b(28), fill=ORCHID)
y += 90
# bloc contact orchidee
d.rectangle([0, H - 380, W, H], fill=ORCHID)
yy = H - 340
d.text((MARGIN, yy), "Parlons de votre projet", font=serif_b(54), fill=WHITE)
yy += 90
lines = [
    "Yatib Sakan — 06 61 22 86 19",
    "WhatsApp : wa.me/212661228619",
    "Bouskoura, Douar Rmel Lahlal · Casablanca-Settat",
    "GPS 33.479327, -7.665879  ·  TF 23025/63  ·  Architecte : Badik Meriem",
]
for ln in lines:
    d.text((MARGIN, yy), ln, font=sans(28), fill=IVORY)
    yy += 50
pages.append(p)

# --- Export PDF ---
pages[0].save(OUT, "PDF", resolution=150.0, save_all=True, append_images=pages[1:])
print(f"Brochure {len(pages)} pages -> {OUT} ({os.path.getsize(OUT)//1024} ko)")
