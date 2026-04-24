import Seo from "@/components/Seo";
import PageHeader from "@/components/PageHeader";
import CtaBanner from "@/components/CtaBanner";
import { MapPin, ShoppingBag, GraduationCap, Hospital, Waves, Trees } from "lucide-react";
import safi from "@/assets/safi-aerial.jpg";

const amenities = [
  { icon: Waves, name: "Plage de Safi", dist: "5 min" },
  { icon: ShoppingBag, name: "Médina & souks", dist: "7 min" },
  { icon: GraduationCap, name: "Écoles internationales", dist: "10 min" },
  { icon: Hospital, name: "Hôpital Mohammed V", dist: "8 min" },
  { icon: Trees, name: "Jardins publics", dist: "3 min" },
  { icon: MapPin, name: "Aéroport Essaouira", dist: "1 h 20" },
];

const Location = () => {
  return (
    <>
      <Seo title="Emplacement" description="Khazef — au cœur de Safi, entre océan, médina et collines minérales." />
      <PageHeader
        eyebrow="Emplacement"
        arabic="الموقع"
        title="Au croisement"
        italicWord="de l'océan et de la médina."
        intro="Une adresse rare, à quelques pas de l'Atlantique et des artères les plus vivantes de Safi."
        image={safi}
      />

      {/* MAP */}
      <section className="container-luxe py-20">
        <div className="aspect-[16/10] w-full overflow-hidden border border-border shadow-luxe-md bg-muted">
          <iframe
            title="Plan d'accès Khazef à Safi"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-9.27%2C32.28%2C-9.21%2C32.32&layer=mapnik&marker=32.30,-9.24"
            className="h-full w-full grayscale-[20%]"
            loading="lazy"
          />
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          Avenue Atlantique, Safi 46000 — <a className="link-luxe text-primary" href="https://www.openstreetmap.org/?mlat=32.30&mlon=-9.24#map=14/32.30/-9.24" target="_blank" rel="noreferrer">Voir le plan en grand</a>
        </div>
      </section>

      {/* COMMODITES */}
      <section className="bg-secondary/40 py-24">
        <div className="container-luxe">
          <div className="max-w-2xl mb-14">
            <div className="flex items-center gap-4 mb-5"><span className="gold-rule" /><span className="eyebrow text-gold">À deux pas</span></div>
            <h2 className="h-display text-primary">Tout, <em>à portée de regard.</em></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {amenities.map(({ icon: Icon, name, dist }) => (
              <div key={name} className="bg-background p-8 border border-border/60 shadow-luxe-sm hover:shadow-luxe-md transition-shadow flex items-center gap-5">
                <div className="h-14 w-14 shrink-0 rounded-full bg-primary/5 text-gold flex items-center justify-center border border-gold/30">
                  <Icon className="h-6 w-6" strokeWidth={1.2} />
                </div>
                <div>
                  <div className="font-display text-xl text-primary">{name}</div>
                  <div className="eyebrow text-muted-foreground text-[11px] mt-1">{dist}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIFESTYLE */}
      <section className="container-luxe py-24 grid md:grid-cols-12 gap-12 items-end">
        <div className="md:col-span-5 space-y-5">
          <div className="flex items-center gap-4"><span className="gold-rule" /><span className="eyebrow text-gold">Art de vivre</span></div>
          <h2 className="h-display text-primary">Une ville <em>à hauteur d'homme.</em></h2>
        </div>
        <div className="md:col-span-6 md:col-start-7 space-y-5 text-muted-foreground font-light text-lg leading-relaxed">
          <p>Safi cultive un rythme rare : celui d'une ville d'art, lente, méditative, ouverte sur l'océan.</p>
          <p>Les terrasses des cafés y voisinent avec les ateliers de potiers, les criques sauvages avec les places ombragées. Vivre à Khazef, c'est habiter ce tempo.</p>
        </div>
      </section>

      <CtaBanner />
    </>
  );
};

export default Location;
