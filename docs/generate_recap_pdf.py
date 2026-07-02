"""
Genere le PDF designe du recapitulatif de conformite CDC « Les Villas Ahlam ».

Rendu premium (PIL) a la charte Ahlam, multi-pages A4 avec pagination auto.
Sortie : docs/RECAP-CONFORMITE-CDC.pdf

Usage : python docs/generate_recap_pdf.py   (depuis la racine du repo front)
"""
import os
from PIL import Image, ImageDraw, ImageFont

# --- Palette (charte Ahlam) ---
ORCHID = (148, 47, 103)
HONEY = (242, 195, 104)
IVORY = (247, 240, 234)
OAK = (66, 57, 52)
JADE = (120, 138, 104)
WHITE = (255, 255, 255)
GREY = (96, 86, 80)
LINE = (228, 218, 209)

W, H = 1240, 1754          # A4 @150 dpi
MARGIN = 104
TOP = 150
BOTTOM = H - 120           # limite basse du contenu (footer en dessous)

# Chemins calcules depuis l'emplacement du script (independant du dossier courant).
_HERE = os.path.dirname(os.path.abspath(__file__))
_ROOT = os.path.dirname(_HERE)               # racine du repo frontend
SRC = os.path.join(_ROOT, "update", "images")
OUT = os.path.join(_HERE, "RECAP-CONFORMITE-CDC.pdf")
F = "C:/Windows/Fonts/"


def _font(paths, size):
    for p in paths:
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()


def serif_b(s): return _font([F + "georgiab.ttf", F + "timesbd.ttf", F + "arialbd.ttf"], s)
def serif(s):   return _font([F + "georgia.ttf", F + "times.ttf", F + "arial.ttf"], s)
def sans(s):    return _font([F + "arial.ttf"], s)
def sans_b(s):  return _font([F + "arialbd.ttf"], s)


def load(keyword):
    if os.path.isdir(SRC):
        for fn in os.listdir(SRC):
            if keyword.lower() in fn.lower() and fn.lower().endswith(".png"):
                return Image.open(os.path.join(SRC, fn)).convert("RGB")
    return None


def cover_img(img, w, h):
    r_t, r_s = w / h, img.width / img.height
    if r_s > r_t:
        nw = int(img.height * r_t)
        img = img.crop(((img.width - nw) // 2, 0, (img.width - nw) // 2 + nw, img.height))
    else:
        nh = int(img.width / r_t)
        img = img.crop((0, (img.height - nh) // 2, img.width, (img.height - nh) // 2 + nh))
    return img.resize((w, h), Image.LANCZOS)


def gradient_bottom(img, strength=200, start=0.4):
    w, h = img.size
    col = Image.new("L", (1, h), 0)
    for y in range(h):
        t = max(0, (y - h * start) / (h * (1 - start)))
        col.putpixel((0, y), int(strength * t))
    dark = Image.new("RGB", (w, h), OAK)
    return Image.composite(dark, img, col.resize((w, h)))


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


class Doc:
    """Moteur de flux : ecrit du contenu en paginant automatiquement."""

    def __init__(self):
        self.pages = []
        self.page_no = 0
        self._new()

    def _new(self):
        self.p = Image.new("RGB", (W, H), IVORY)
        self.d = ImageDraw.Draw(self.p)
        self.y = TOP
        self.page_no += 1
        self.pages.append(self.p)
        self._footer()

    def _footer(self):
        self.d.line([MARGIN, H - 78, W - MARGIN, H - 78], fill=LINE, width=2)
        self.d.text((MARGIN, H - 62), "Les Villas Ahlam · Conformité CDC v1.2",
                    font=sans(19), fill=GREY)
        lbl = f"{self.page_no:02d}"
        self.d.text((W - MARGIN - self.d.textlength(lbl, font=sans_b(19)), H - 62),
                    lbl, font=sans_b(19), fill=ORCHID)

    def ensure(self, space):
        if self.y + space > BOTTOM:
            self._new()

    def gap(self, h):
        self.y += h

    def section(self, eyebrow_txt, title):
        self.ensure(150)
        if self.y > TOP + 5:
            self.y += 20
        self.d.rectangle([MARGIN, self.y + 6, MARGIN + 44, self.y + 9], fill=HONEY)
        self.d.text((MARGIN + 60, self.y - 2), eyebrow_txt.upper(), font=sans_b(21), fill=ORCHID)
        self.y += 40
        for ln in wrap(self.d, title, serif_b(38), W - 2 * MARGIN):
            self.d.text((MARGIN, self.y), ln, font=serif_b(38), fill=OAK)
            self.y += 50
        self.d.line([MARGIN, self.y + 4, W - MARGIN, self.y + 4], fill=LINE, width=2)
        self.y += 24

    def subtitle(self, text):
        self.ensure(60)
        self.d.text((MARGIN, self.y), text, font=sans_b(24), fill=ORCHID)
        self.y += 44

    def check(self, text):
        fnt = sans(23)
        indent = MARGIN + 40
        lines = wrap(self.d, text, fnt, W - indent - MARGIN)
        self.ensure(len(lines) * 34 + 6)
        cx, cy = MARGIN + 6, self.y + 4
        self.d.line([(cx, cy + 11), (cx + 8, cy + 19)], fill=JADE, width=4)
        self.d.line([(cx + 8, cy + 19), (cx + 22, cy + 2)], fill=JADE, width=4)
        for i, ln in enumerate(lines):
            self.d.text((indent, self.y), ln, font=fnt, fill=OAK if i == 0 else GREY)
            self.y += 34
        self.y += 6

    def note(self, text):
        fnt = sans(22)
        lines = wrap(self.d, text, fnt, W - 2 * MARGIN - 24)
        self.ensure(len(lines) * 32 + 20)
        y0 = self.y
        for ln in lines:
            self.d.text((MARGIN + 24, self.y), ln, font=fnt, fill=GREY)
            self.y += 32
        self.d.line([MARGIN, y0 - 2, MARGIN, self.y - 6], fill=HONEY, width=4)
        self.y += 14

    def table(self, headers, rows, widths):
        rh = 46
        self.ensure(rh * (len(rows) + 1) + 10)
        x0 = MARGIN
        # entete
        self.d.rectangle([x0, self.y, W - MARGIN, self.y + rh], fill=ORCHID)
        cx = x0
        for h_txt, w in zip(headers, widths):
            self.d.text((cx + 14, self.y + 12), h_txt, font=sans_b(21), fill=IVORY)
            cx += w
        self.y += rh
        # lignes
        for r, row in enumerate(rows):
            bg = IVORY if r % 2 == 0 else (240, 231, 223)
            self.d.rectangle([x0, self.y, W - MARGIN, self.y + rh], fill=bg)
            cx = x0
            for cell, w in zip(row, widths):
                lines = wrap(self.d, cell, sans(20), w - 22)
                self.d.text((cx + 14, self.y + (rh - len(lines) * 26) // 2),
                            "\n".join(lines), font=sans(20), fill=OAK, spacing=4)
                cx += w
            self.y += rh
        self.y += 16

    def save(self):
        self.pages[0].save(OUT, "PDF", resolution=150.0, save_all=True,
                           append_images=self.pages[1:])


# ============================ COUVERTURE ============================
doc = Doc()
cov = doc.pages[0]
cd = doc.d
hero = load("hero") or load("aérienne") or load("lots")
if hero:
    band = gradient_bottom(cover_img(hero, W, 900), strength=205, start=0.32)
    cov.paste(band, (0, 0))
else:
    cd.rectangle([0, 0, W, 900], fill=OAK)
# effacer footer de couverture (redessine par-dessus)
yb = 900 - 360
cd.rectangle([MARGIN, yb, MARGIN + 60, yb + 5], fill=HONEY)
cd.text((MARGIN, yb + 24), "DOMAINE RÉSIDENTIEL PRIVÉ · BOUSKOURA", font=sans_b(24), fill=HONEY)
cd.text((MARGIN - 3, yb + 66), "Récapitulatif", font=serif_b(96), fill=WHITE)
cd.text((MARGIN - 3, yb + 168), "de conformité", font=serif_b(96), fill=WHITE)
cd.text((MARGIN, yb + 292), "Les Villas Ahlam · Cahier des charges v1.2", font=serif(38), fill=IVORY)
# bandeau bas
cd.rectangle([0, H - 250, W, H], fill=ORCHID)
cd.text((MARGIN, H - 214), "Synthèse d'implémentation", font=serif_b(46), fill=WHITE)
cd.text((MARGIN, H - 150),
        "42 villas R+1 · Bouskoura · Lotisseur Yatib Sakan", font=sans_b(26), fill=IVORY)
cd.text((MARGIN, H - 108),
        "Conforme au CDC v1.2 et au plan officiel du lotissement (TF 23025/63).",
        font=sans(24), fill=IVORY)
cd.text((MARGIN, H - 66), "06 61 22 86 19  ·  wa.me/212661228619", font=sans_b(24), fill=HONEY)
doc.y = BOTTOM + 1  # force une nouvelle page pour le contenu


# ============================ CONTENU ============================
doc._new()

doc.section("Contexte", "Reprise Khazef — Les Villas Ahlam")
doc.check("Site « Khazef » (Safi) repurposé intégralement en « Les Villas Ahlam » : "
          "42 villas R+1 sur lots viabilisés à Bouskoura, lotisseur Yatib Sakan.")
doc.check("Frontend : Vite + React + TypeScript + Tailwind (dépôt khazef-Luxury-Living).")
doc.check("Backend : Django 5.1 + DRF, Postgres local (dépôt villas-ahlam-api).")
doc.check("Exposition : tunnels Cloudflare + Workers stables.")

doc.section("§1–§5", "Identité, marque & message")
doc.check("Marque, positionnement « Ahlam = rêves », baselines (« Là où vos rêves prennent racine »).")
doc.check("Palette de la charte exacte (Orchid Rose, Dark Oak, Honeycomb, Fade Citrus, Jade, Ivoire).")
doc.check("Typographie serif (Cormorant) + sans (Outfit) + arabe (Amiri).")
doc.check("Prix « à partir de 4 500 DH/m² » + prix indicatif auto par lot (surface × 4 500).")
doc.check("Contact Yatib Sakan · WhatsApp wa.me/212661228619.")

doc.section("§6", "Le Quartier")
doc.check("Carte OpenStreetMap centrée sur le GPS 33.479327, -7.665879.")
doc.check("Proximités (aéroport Mohammed V, Casablanca, forêt, golf, écoles) + gare ONCF de Bouskoura.")

doc.section("§7", "Carte interactive des lots — fonctionnalité phare")
doc.check("Vrai plan de l'architecte extrait du PDF LOTISSEMENT BOUSKOURA (rendu HD, nettoyé, WebP).")
doc.check("42 parcelles réelles (polygones extraits du vectoriel) colorées selon le statut "
          "(Jade = disponible, Honeycomb = en cours, Dark Oak = vendu).")
doc.check("Survol → tooltip, clic → fiche, zoom molette + pinch mobile + pan.")
doc.check("Réservation en ligne → rappel commercial : verrou anti-doublon + expiration 72 h.")
doc.check("Statuts temps réel par polling ; Django Admin = interface opérateur.")

doc.section("§8", "Fonctionnalités")
doc.subtitle("Tier 1 — cœur de conversion")
doc.check("Carte temps réel · réservation → rappel · prix indicatif auto · WhatsApp intelligent.")
doc.check("Simulateur de crédit (Attijariwafa, Bank of Africa, CIH, BMCE) + « être rappelé ».")
doc.check("« Imaginez votre villa » (rendu sur la fiche lot) · brochure PDF (lead magnet).")
doc.subtitle("Tier 2 — différenciateurs")
doc.check("Parcours MRE · galerie immersive · comparateur de lots (jusqu'à 3).")
doc.check("Compteur de rareté + badge « populaire » · prise de RDV (Calendly / repli WhatsApp).")
doc.check("Configurateur de façade (4 ambiances palette) · liste d'attente (waitlist).")

doc.section("§9", "Spécifications techniques")
doc.check("Multi-pages · Tailwind · SVG interactif · mobile-first · RTL arabe · HTTPS · "
          "verrou anti double-réservation.")
doc.check("Formulaires + notification commerciale (e-mail + fallback WhatsApp).")
doc.note("Stack adapté par décision : Vite au lieu de Next.js ; Postgres local au lieu de "
         "Supabase (licence non prise).")

doc.section("§10", "SEO, analytics & conformité")
doc.check("Données structurées JSON-LD : RealEstateAgent + RealEstateListing/Residence "
          "(géo, AggregateOffer 42 lots) + FAQPage + ItemList des lots.")
doc.check("GA4 + Meta Pixel chargés uniquement après consentement cookies.")
doc.check("sitemap.xml + robots.txt ; OpenGraph / Twitter cards.")
doc.check("Pages légales loi 09-08 (mentions, confidentialité/CNDP, cookies) + bannière de consentement.")

doc.section("§11", "Contenu (FR / AR / EN)")
doc.check("Trilingue complet — le contenu arabe (resté legacy Safi) a été entièrement retraduit.")
doc.check("FAQ (financement, réservation, juridique, MRE, délais).")
doc.check("Rendus IA (façades jour/nuit, intérieurs, domaine) · réassurance juridique en texte.")

doc.section("§13 + plan officiel", "Données des 42 lots")
doc.check("42 lots (surfaces 200–461 m², îlots A = 1–16, B = 17–42, tous R+1) seedés en base "
          "conformément au tableau du plan de l'architecte (seed_lots).")
doc.check("Titre foncier 23025/63, architecte Badik Meriem, propriétaire Fertate et Consorts — cités.")
doc.check("Brochure PDF 7 pages corrigée (couverture, chevauchements, table des 42 lots).")

doc.section("Infrastructure", "Fiabilisation & déploiement")
doc.check("Tunnels Cloudflare : Workers villas-ahlam-front / -back, Service Binding, script PowerShell.")
doc.check("Backend : .env Postgres local, settings (ALLOWED_HOSTS/CORS/CSRF/SSL), racine → admin.")
doc.check("Notifications commerciales : contact/rappel et liste d'attente (+ bug waitlist corrigé).")
doc.check("Accessibilité : <main> unique + skip link, prefers-reduced-motion, focus visible.")

doc.section("Dépôts", "Tout committé et poussé")
doc.table(
    ["Dépôt", "Rôle"],
    [["Africa-centred-technology/khazef-Luxury-Living", "Frontend"],
     ["Africa-centred-technology/villas-ahlam-api", "Backend (privé)"]],
    [760, W - 2 * MARGIN - 760],
)

doc.section("Production", "Reste à configurer (replis gracieux en place)")
doc.table(
    ["Variable / config", "Rôle", "Repli si absent"],
    [["VITE_API_URL", "Base API", "Auto (/api ou localhost)"],
     ["VITE_GA4_ID", "Google Analytics 4", "Aucun script"],
     ["VITE_META_PIXEL_ID", "Meta Pixel", "Aucun script"],
     ["VITE_CALENDLY_URL", "Prise de RDV", "Repli WhatsApp / tél"],
     ["COMMERCIAL_EMAIL + SMTP", "Alerte e-mail des demandes", "Admin + log"]],
    [330, 350, W - 2 * MARGIN - 680],
)

doc.section("Conclusion", "CDC v1.2 intégralement couvert")
doc.check("Toutes les fonctionnalités du cahier des charges sont livrées, les données du plan "
          "officiel intégrées, le site est trilingue, accessible et déployable.")

doc.save()
print(f"Recap {len(doc.pages)} pages -> {OUT} ({os.path.getsize(OUT)//1024} ko)")
