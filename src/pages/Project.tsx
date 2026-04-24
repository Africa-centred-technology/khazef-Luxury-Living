import Seo from "@/components/Seo";
import PageHeader from "@/components/PageHeader";
import CtaBanner from "@/components/CtaBanner";
import zellige from "@/assets/material-zellige.jpg";
import tadelakt from "@/assets/material-tadelakt.jpg";
import marble from "@/assets/material-marble.jpg";
import hero from "@/assets/hero-building.jpg";
import living from "@/assets/interior-living.jpg";

const materials = [
  { img: tadelakt, name: "Tadelakt", desc: "Enduit chaulé, lissé à la pierre, pour une lumière douce et minérale." },
  { img: zellige, name: "Zellige cobalt", desc: "Mosaïque émaillée, taillée à la main par les maîtres de Safi." },
  { img: marble, name: "Marbre veiné d'or", desc: "Carrare blanc, traversé d'éclats dorés — surfaces et sols nobles." },
];

const engagements = [
  { n: "01", t: "Le geste juste", d: "Chaque finition validée par un comité d'architectes et d'artisans locaux." },
  { n: "02", t: "Matériaux sourcés", d: "Pierre, tadelakt et zellige : 80% des matériaux issus du Maroc." },
  { n: "03", t: "Performance énergétique", d: "Isolation renforcée, double vitrage acoustique, ventilation maîtrisée." },
  { n: "04", t: "Garantie décennale", d: "Suivi post-livraison de dix ans assuré par le promoteur." },
];

const Project = () => {
  return (
    <>
      <Seo title="Le projet" description="Khazef — concept architectural, matières et engagements du promoteur." />
      <PageHeader
        eyebrow="Le projet"
        arabic="المشروع"
        title="Une architecture"
        italicWord="comme une calligraphie."
        intro="R+6, 25 appartements, 2 commerces. Une silhouette ciselée pensée pour épouser la lumière atlantique."
        image={hero}
      />

      {/* CONCEPT */}
      <section className="container-luxe py-24 md:py-32 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5 space-y-6">
          <div className="flex items-center gap-4"><span className="gold-rule" /><span className="eyebrow text-gold">Concept</span></div>
          <h2 className="h-display text-primary">Le minéral, <em>en mouvement.</em></h2>
        </div>
        <div className="md:col-span-6 md:col-start-7 text-muted-foreground font-light text-lg leading-relaxed space-y-5">
          <p>L'architecture de Khazef joue sur deux registres : la masse minérale, héritée des remparts de Safi, et la finesse du zellige, qui ouvre les façades comme une dentelle.</p>
          <p>À chaque étage, les balcons s'avancent ou se retirent selon l'orientation du soleil — un dialogue précis entre intimité et panorama.</p>
          <p>Au pied de l'immeuble, deux commerces de charme animent l'avenue, prolongeant l'esprit de la médina dans une scénographie contemporaine.</p>
        </div>
      </section>

      {/* MATERIAUX */}
      <section className="bg-secondary/40 py-24 md:py-32">
        <div className="container-luxe">
          <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-4 mb-4"><span className="gold-rule" /><span className="eyebrow text-gold">Matériaux & finitions</span></div>
              <h2 className="h-display text-primary">Trois matières, <em>une grammaire.</em></h2>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {materials.map((m) => (
              <article key={m.name} className="group bg-background overflow-hidden shadow-luxe-sm hover:shadow-luxe-lg transition-shadow duration-700">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={m.img}
                    alt={m.name}
                    className="h-full w-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="p-8">
                  <h3 className="font-display text-2xl text-primary mb-3">{m.name}</h3>
                  <p className="text-muted-foreground font-light leading-relaxed">{m.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* VISION ARCHITECTURALE */}
      <section className="grid md:grid-cols-2">
        <div className="bg-primary text-secondary px-8 md:px-16 py-20 flex items-center order-2 md:order-1">
          <div className="max-w-md space-y-6">
            <div className="eyebrow text-gold">Vision architecturale</div>
            <h2 className="h-display text-secondary">Le silence <em className="text-gold-bright">comme luxe.</em></h2>
            <p className="text-secondary/80 font-light leading-relaxed">
              Plafonds hauts, murs épais, ouvertures généreuses. Khazef est conçu pour le silence, la lumière et la durée.
            </p>
            <ul className="space-y-3 text-secondary/85 text-sm">
              <li className="flex gap-3"><span className="text-gold">·</span> Hauteur sous plafond 3,10 m</li>
              <li className="flex gap-3"><span className="text-gold">·</span> Double vitrage acoustique 44.2</li>
              <li className="flex gap-3"><span className="text-gold">·</span> Climatisation invisible par gaines</li>
              <li className="flex gap-3"><span className="text-gold">·</span> Ascenseur silencieux dernière génération</li>
            </ul>
          </div>
        </div>
        <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[600px] overflow-hidden order-1 md:order-2">
          <img src={living} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        </div>
      </section>

      {/* ENGAGEMENTS */}
      <section className="container-luxe py-28 md:py-36">
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-4 mb-5"><span className="gold-rule" /><span className="eyebrow text-gold">Engagements du promoteur</span></div>
          <h2 className="h-display text-primary">Des promesses, <em>écrites dans la pierre.</em></h2>
        </div>
        <div className="grid md:grid-cols-2 gap-px bg-border">
          {engagements.map((e) => (
            <div key={e.n} className="bg-background p-10 md:p-12 flex gap-8">
              <div className="font-display text-5xl text-gold leading-none">{e.n}</div>
              <div>
                <h3 className="font-display text-2xl text-primary mb-3">{e.t}</h3>
                <p className="text-muted-foreground font-light leading-relaxed">{e.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBanner />
    </>
  );
};

export default Project;
