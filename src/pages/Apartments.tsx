import Seo from "@/components/Seo";
import PageHeader from "@/components/PageHeader";
import CtaBanner from "@/components/CtaBanner";
import { Bed, Maximize, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import living from "@/assets/interior-living.jpg";
import bedroom from "@/assets/interior-bedroom.jpg";
import kitchen from "@/assets/interior-kitchen.jpg";

const apartments = [
  { code: "T2", name: "Suite Porcelaine", surface: "62 m²", rooms: "2 pièces", balcony: "Loggia 8 m²", price: "Sur demande", img: bedroom, units: 6 },
  { code: "T3", name: "Appartement Médina", surface: "92 m²", rooms: "3 pièces", balcony: "Balcon 12 m²", price: "Sur demande", img: living, units: 10 },
  { code: "T4", name: "Appartement Atlantique", surface: "118 m²", rooms: "4 pièces", balcony: "Terrasse 18 m²", price: "Sur demande", img: kitchen, units: 7 },
  { code: "T5", name: "Penthouse Khazef", surface: "186 m²", rooms: "5 pièces", balcony: "Toit-terrasse 60 m²", price: "Sur demande", img: living, units: 2 },
];

const features = [
  "Cuisine équipée premium en marbre",
  "Salles de bain en tadelakt et marbre",
  "Climatisation réversible silencieuse",
  "Domotique intégrée (lumière, volets)",
  "Parking sous-sol sécurisé",
  "Conciergerie privée",
];

const Apartments = () => {
  return (
    <>
      <Seo title="Appartements" description="Découvrez les 25 appartements Khazef — du T2 au penthouse, avec vues mer et terrasses." />
      <PageHeader
        eyebrow="Appartements"
        arabic="الشقق"
        title="Vingt-cinq écrins,"
        italicWord="vingt-cinq histoires."
        intro="Du T2 confidentiel au penthouse sur les toits, chaque appartement Khazef a été dessiné comme une pièce unique."
      />

      {/* GRID */}
      <section className="container-luxe py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          {apartments.map((a) => (
            <article key={a.code} className="group bg-background border border-border/60 overflow-hidden shadow-luxe-sm hover:shadow-luxe-lg transition-all duration-700">
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={a.img}
                  alt={`Intérieur ${a.name} — ${a.code}`}
                  className="h-full w-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute top-5 left-5 bg-background/95 backdrop-blur px-4 py-2 eyebrow text-primary">
                  {a.code} · {a.units} unités
                </div>
              </div>
              <div className="p-8 md:p-10">
                <h3 className="font-display text-3xl text-primary mb-5">{a.name}</h3>
                <div className="grid grid-cols-3 gap-4 text-sm border-y border-border/60 py-5 mb-6">
                  <div>
                    <Maximize className="h-4 w-4 text-gold mb-1.5" strokeWidth={1.4} />
                    <div className="text-muted-foreground text-xs">Surface</div>
                    <div className="font-medium text-primary">{a.surface}</div>
                  </div>
                  <div>
                    <Bed className="h-4 w-4 text-gold mb-1.5" strokeWidth={1.4} />
                    <div className="text-muted-foreground text-xs">Pièces</div>
                    <div className="font-medium text-primary">{a.rooms}</div>
                  </div>
                  <div>
                    <Sun className="h-4 w-4 text-gold mb-1.5" strokeWidth={1.4} />
                    <div className="text-muted-foreground text-xs">Extérieur</div>
                    <div className="font-medium text-primary">{a.balcony}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="eyebrow text-muted-foreground text-[10px]">Tarif</div>
                    <div className="font-display text-xl text-primary italic">{a.price}</div>
                  </div>
                  <Link to="/contact" className="link-luxe text-sm uppercase tracking-[0.18em] text-primary font-medium">
                    Demander
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-gradient-night text-secondary relative overflow-hidden">
        <div className="absolute inset-0 pattern-zellige opacity-20" />
        <div className="container-luxe relative py-24 md:py-32 grid md:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center gap-4 mb-5"><span className="gold-rule" /><span className="eyebrow text-gold">Prestations premium</span></div>
            <h2 className="h-display text-secondary">L'évidence, <em className="text-gold-bright">dans le détail.</em></h2>
          </div>
          <ul className="grid sm:grid-cols-2 gap-y-5 gap-x-8">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-4 text-secondary/90 font-light">
                <span className="text-gold text-2xl leading-none">✦</span> {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBanner />
    </>
  );
};

export default Apartments;
