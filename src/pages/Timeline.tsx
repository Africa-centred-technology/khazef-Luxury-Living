import Seo from "@/components/Seo";
import PageHeader from "@/components/PageHeader";
import CtaBanner from "@/components/CtaBanner";
import { Check } from "lucide-react";

const phases = [
  { date: "T1 2024", title: "Étude & permis", desc: "Conception architecturale, dépôt et obtention du permis de construire.", done: true },
  { date: "T3 2024", title: "Fondations", desc: "Terrassements et fondations spéciales en sous-sol.", done: true },
  { date: "T2 2025", title: "Gros œuvre", desc: "Élévation des sept niveaux et structure du bâtiment.", done: true },
  { date: "T4 2025", title: "Façades & toiture", desc: "Pose des parements minéraux, balcons et toit-terrasse.", done: false, current: true },
  { date: "T2 2026", title: "Second œuvre", desc: "Cloisons, plomberie, électricité, finitions intérieures.", done: false },
  { date: "T4 2026", title: "Aménagements & VRD", desc: "Lobby, espaces communs, voirie et plantations.", done: false },
  { date: "T1 2027", title: "Livraison", desc: "Remise des clés aux acquéreurs Khazef.", done: false },
];

const Timeline = () => {
  return (
    <>
      <Seo title="Construction & Livraison" description="Calendrier de construction et planning de livraison de la résidence Khazef." />
      <PageHeader
        eyebrow="Construction & Livraison"
        arabic="الإنجاز"
        title="Le chantier,"
        italicWord="comme une partition tenue."
        intro="Étape après étape, Khazef avance avec rigueur. Suivez le rythme de sa construction."
      />

      <section className="container-luxe py-20 md:py-28">
        {/* Progress bar */}
        <div className="mb-16">
          <div className="flex items-end justify-between mb-3">
            <div className="eyebrow text-gold">Avancement global</div>
            <div className="font-display text-3xl text-primary">52%</div>
          </div>
          <div className="h-1 bg-border overflow-hidden">
            <div className="h-full bg-gradient-gold" style={{ width: "52%" }} />
          </div>
        </div>

        {/* Vertical timeline */}
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" />
          <div className="space-y-12">
            {phases.map((p, i) => (
              <div key={p.title} className={`relative grid md:grid-cols-2 gap-6 md:gap-12 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                {/* Marker */}
                <div className="absolute left-4 md:left-1/2 top-3 -translate-x-1/2">
                  <div
                    className={`h-4 w-4 rounded-full border-2 ${
                      p.current
                        ? "bg-gold border-gold animate-pulse-gold"
                        : p.done
                        ? "bg-primary border-primary"
                        : "bg-background border-border"
                    }`}
                  />
                </div>

                <div className={`pl-12 md:pl-0 ${i % 2 ? "md:text-left md:pl-12" : "md:text-right md:pr-12"}`}>
                  <div className="eyebrow text-gold mb-2">{p.date}</div>
                  <h3 className="font-display text-2xl md:text-3xl text-primary mb-3 flex items-center gap-3 md:justify-end md:[&>*]:order-2">
                    {p.title}
                    {p.done && <Check className="h-5 w-5 text-gold" />}
                  </h3>
                </div>
                <div className={`pl-12 md:pl-0 ${i % 2 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <p className="text-muted-foreground font-light leading-relaxed">{p.desc}</p>
                  {p.current && (
                    <div className="mt-3 inline-block eyebrow text-gold border border-gold/40 px-3 py-1.5">En cours</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
};

export default Timeline;
