import Seo from "@/components/Seo";
import PageHeader from "@/components/PageHeader";
import CtaBanner from "@/components/CtaBanner";
import { ArrowUpRight, Bed, Maximize, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import hero from "@/assets/interior-living.jpg";
import living from "@/assets/interior-living.jpg";
import bedroom from "@/assets/interior-bedroom.jpg";
import heroBuilding from "@/assets/hero-building.jpg";
import safiCoast from "@/assets/safi-coast.jpg";
import { TYPOLOGIES, type TypologyId } from "@/components/virtual-tour/data/apartment-typologies";

const IMG_PER_TYPOLOGY: Record<TypologyId, string> = {
  "harbour-t2": safiCoast,
  "atlantic-t3": living,
  "penthouse-duplex": heroBuilding,
};

const UNITS_PER_TYPOLOGY: Record<TypologyId, number> = {
  "harbour-t2": 8,
  "atlantic-t3": 12,
  "penthouse-duplex": 2,
};

const EXTERIOR_PER_TYPOLOGY: Record<TypologyId, string> = {
  "harbour-t2": "Loggia 4 m²",
  "atlantic-t3": "Balcon filant 6 m²",
  "penthouse-duplex": "Terrasse panoramique 34 m²",
};

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
      <Seo title="Appartements" description="Découvrez les 25 appartements Luxury Living — du T2 au penthouse, avec vues mer et terrasses." />
      <PageHeader
        eyebrow="Appartements"
        arabic="الشقق"
        title="Vingt-cinq écrins,"
        italicWord="vingt-cinq histoires."
        intro="Du T2 confidentiel au penthouse sur les toits, chaque appartement Luxury Living a été dessiné comme une pièce unique."
        image={hero}
      />

      {/* GRID — 3 typologies réelles, chaque carte link vers sa page détail */}
      <section className="container-luxe py-20 md:py-28">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {TYPOLOGIES.map((t) => {
            const img = IMG_PER_TYPOLOGY[t.id];
            const units = UNITS_PER_TYPOLOGY[t.id];
            const exterior = EXTERIOR_PER_TYPOLOGY[t.id];
            return (
              <Link
                key={t.id}
                to={`/apartments/${t.id}`}
                className="group relative bg-background border border-border/60 overflow-hidden shadow-luxe-sm hover:shadow-luxe-xl hover:-translate-y-1 transition-all duration-700 block"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={img}
                    alt={`Intérieur ${t.name} — typologie ${t.id}`}
                    className="h-full w-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/15 to-transparent" />
                  <div className="absolute top-5 left-5 bg-background/95 backdrop-blur px-4 py-2 eyebrow text-primary">
                    {t.id.split("-")[1]?.toUpperCase() ?? t.id} · {units} unités
                  </div>
                  <div
                    className="absolute top-5 right-5 arabic text-3xl text-gold"
                    style={{ textShadow: "0 2px 12px hsl(var(--primary) / 0.6)" }}
                  >
                    {t.arabic}
                  </div>
                  <div className="absolute bottom-5 left-6 right-6 flex items-baseline justify-between gap-4">
                    <h3
                      className="font-display text-3xl md:text-[34px] text-white leading-tight"
                      style={{ textShadow: "0 2px 14px hsl(var(--primary) / 0.7)" }}
                    >
                      {t.name}
                    </h3>
                  </div>
                </div>
                <div className="p-8 md:p-10">
                  <p className="font-display italic text-primary/80 mb-5">{t.tagline}</p>
                  <div className="grid grid-cols-3 gap-4 text-sm border-y border-border/60 py-5 mb-6">
                    <div>
                      <Maximize className="h-4 w-4 text-gold mb-1.5" strokeWidth={1.4} />
                      <div className="text-muted-foreground text-xs">Surface</div>
                      <div className="font-medium text-primary">{t.surface}</div>
                    </div>
                    <div>
                      <Bed className="h-4 w-4 text-gold mb-1.5" strokeWidth={1.4} />
                      <div className="text-muted-foreground text-xs">Chambres</div>
                      <div className="font-medium text-primary">
                        {t.bedrooms} chambre{t.bedrooms > 1 ? "s" : ""}
                      </div>
                    </div>
                    <div>
                      <Sun className="h-4 w-4 text-gold mb-1.5" strokeWidth={1.4} />
                      <div className="text-muted-foreground text-xs">Extérieur</div>
                      <div className="font-medium text-primary">{exterior}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="eyebrow text-muted-foreground text-[10px]">Tarif</div>
                      <div className="font-display text-xl text-primary italic">
                        {t.priceRange ?? "Sur demande"}
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-gold font-medium">
                      Découvrir
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
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
