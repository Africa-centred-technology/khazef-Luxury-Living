import { useState } from "react";
import { useTranslation } from "react-i18next";
import Seo from "@/components/Seo";
import PageHeader from "@/components/PageHeader";
import CtaBanner from "@/components/CtaBanner";
import { ZoomIn, X } from "lucide-react";
import hero from "@/assets/interior-kitchen.jpg";

interface LevelItem {
  n: string;
  t: string;
  d: string;
}

interface PlanItem {
  id: string;
  name: string;
  surface: string;
}

interface FloorPlanLabels {
  living: string;
  kitchen: string;
  bedroom1: string;
  bedroom2: string;
  master: string;
  bathroom: string;
}

interface FloorPlanProps {
  label: string;
  labels: FloorPlanLabels;
}

// Generate a stylised SVG floor plan placeholder
const FloorPlan = ({ label, labels }: FloorPlanProps) => (
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
      <text x="120" y="130">{labels.living}</text>
      <text x="290" y="80">{labels.kitchen}</text>
      <text x="100" y="290">{labels.bedroom1}</text>
      <text x="240" y="290">{labels.bedroom2}</text>
      <text x="430" y="150">{labels.master}</text>
      <text x="430" y="290">{labels.bathroom}</text>
    </g>
    <g fill="hsl(41 47% 59%)" fontFamily="'Cormorant Garamond', serif" fontSize="22">
      <text x="40" y="30">{label}</text>
    </g>
  </svg>
);

const Plans = () => {
  const { t } = useTranslation("plans");
  const [zoom, setZoom] = useState<string | null>(null);

  const plans = t("typologies.items", { returnObjects: true }) as PlanItem[];
  const levels = t("levels.items", { returnObjects: true }) as LevelItem[];
  const floorPlanLabels = t("floorPlanLabels", { returnObjects: true }) as FloorPlanLabels;

  return (
    <>
      <Seo title={t("seo.title")} description={t("seo.description")} />
      <PageHeader
        eyebrow={t("header.eyebrow")}
        arabic={t("header.arabic")}
        title={t("header.title")}
        italicWord={t("header.italicWord")}
        intro={t("header.intro")}
        image={hero}
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
                <FloorPlan label={p.name.split(" — ")[0]} labels={floorPlanLabels} />
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
            <div className="flex items-center gap-4 mb-5"><span className="gold-rule" /><span className="eyebrow text-gold">{t("levels.eyebrow")}</span></div>
            <h2 className="h-display text-primary">{t("levels.titleBefore")} <em>{t("levels.titleItalic")}</em></h2>
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
            aria-label={t("lightbox.closeLabel")}
          >
            <X className="h-6 w-6" />
          </button>
          <div className="w-full max-w-5xl bg-background p-4 md:p-8 shadow-luxe-xl">
            <FloorPlan label={plans.find((p) => p.id === zoom)?.name ?? ""} labels={floorPlanLabels} />
          </div>
        </div>
      )}

      <CtaBanner />
    </>
  );
};

export default Plans;
