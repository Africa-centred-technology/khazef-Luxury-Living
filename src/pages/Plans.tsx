import { useState } from "react";
import Seo from "@/components/Seo";
import PageHeader from "@/components/PageHeader";
import CtaBanner from "@/components/CtaBanner";
import { ZoomIn, X } from "lucide-react";

const levels = [
  { n: "RDC", t: "Hall + 2 commerces", d: "Hall d'entrée en marbre, conciergerie, deux espaces commerciaux." },
  { n: "R+1", t: "4 appartements", d: "Trois T3 traversants, un T2 jardin." },
  { n: "R+2", t: "4 appartements", d: "Configuration miroir, balcons orientés sud-ouest." },
  { n: "R+3", t: "4 appartements", d: "Vues dégagées sur la médina." },
  { n: "R+4", t: "4 appartements", d: "Premières vues mer, prestations renforcées." },
  { n: "R+5", t: "5 appartements", d: "Logements d'angle, terrasses élargies." },
  { n: "R+6", t: "2 penthouses", d: "Toits-terrasses privatifs avec piscine d'apparat." },
];

// Generate a stylised SVG floor plan placeholder
const FloorPlan = ({ label }: { label: string }) => (
  <svg viewBox="0 0 600 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <rect width="600" height="400" fill="hsl(38 38% 92%)" />
    <g stroke="hsl(224 69% 17%)" strokeWidth="2" fill="none">
      <rect x="40" y="40" width="520" height="320" />
      <line x1="40" y1="200" x2="380" y2="200" />
      <line x1="380" y1="40" x2="380" y2="360" />
      <line x1="380" y1="240" x2="560" y2="240" />
      <line x1="200" y1="200" x2="200" y2="360" />
      <line x1="280" y1="100" x2="380" y2="100" />
    </g>
    <g fill="hsl(224 69% 17%)" fontFamily="Outfit, sans-serif" fontSize="11" letterSpacing="2">
      <text x="120" y="130">SALON</text>
      <text x="290" y="80">CUISINE</text>
      <text x="100" y="290">CHAMBRE 1</text>
      <text x="240" y="290">CH. 2</text>
      <text x="430" y="150">CHAMBRE PARENTALE</text>
      <text x="430" y="290">SDB</text>
    </g>
    <g fill="hsl(41 47% 59%)" fontFamily="'Cormorant Garamond', serif" fontSize="22">
      <text x="40" y="30">{label}</text>
    </g>
  </svg>
);

const plans = [
  { id: "t2", name: "T2 — Suite Porcelaine", surface: "62 m²" },
  { id: "t3", name: "T3 — Médina", surface: "92 m²" },
  { id: "t4", name: "T4 — Atlantique", surface: "118 m²" },
  { id: "t5", name: "T5 — Penthouse", surface: "186 m²" },
];

const Plans = () => {
  const [zoom, setZoom] = useState<string | null>(null);

  return (
    <>
      <Seo title="Plans" description="Plans d'étage et typologies de la résidence Khazef à Safi." />
      <PageHeader
        eyebrow="Plans"
        arabic="المخططات"
        title="Sept étages,"
        italicWord="une partition précise."
        intro="Une lecture claire du bâtiment, niveau par niveau, appartement par appartement."
      />

      {/* PLANS GRID */}
      <section className="container-luxe py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {plans.map((p) => (
            <button
              key={p.id}
              onClick={() => setZoom(p.id)}
              className="group relative bg-background border border-border/60 overflow-hidden text-left shadow-luxe-sm hover:shadow-luxe-lg transition-all duration-500"
            >
              <div className="aspect-[3/2] bg-secondary/40 overflow-hidden">
                <FloorPlan label={p.name.split(" — ")[0]} />
              </div>
              <div className="p-7 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-2xl text-primary">{p.name}</h3>
                  <div className="eyebrow text-muted-foreground text-[11px] mt-1">{p.surface}</div>
                </div>
                <div className="h-12 w-12 rounded-full border border-gold/40 text-gold flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                  <ZoomIn className="h-5 w-5" strokeWidth={1.4} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* LEVELS */}
      <section className="bg-secondary/40 py-24">
        <div className="container-luxe">
          <div className="max-w-2xl mb-14">
            <div className="flex items-center gap-4 mb-5"><span className="gold-rule" /><span className="eyebrow text-gold">Niveau par niveau</span></div>
            <h2 className="h-display text-primary">La distribution <em>du bâtiment.</em></h2>
          </div>
          <div className="border-t border-border">
            {levels.map((l) => (
              <div key={l.n} className="grid md:grid-cols-12 gap-6 border-b border-border py-7 group hover:bg-background transition-colors px-2">
                <div className="md:col-span-2 font-display text-3xl text-gold">{l.n}</div>
                <div className="md:col-span-4 font-display text-2xl text-primary">{l.t}</div>
                <div className="md:col-span-6 text-muted-foreground font-light">{l.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {zoom && (
        <div
          className="fixed inset-0 z-[100] bg-primary/95 backdrop-blur p-6 flex items-center justify-center animate-fade-in"
          onClick={() => setZoom(null)}
        >
          <button
            className="absolute top-6 right-6 h-12 w-12 rounded-full border border-gold/40 text-secondary flex items-center justify-center hover:bg-gold/10"
            aria-label="Fermer"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="w-full max-w-5xl bg-background p-4 md:p-8 shadow-luxe-xl">
            <FloorPlan label={plans.find((p) => p.id === zoom)?.name ?? ""} />
          </div>
        </div>
      )}

      <CtaBanner />
    </>
  );
};

export default Plans;
