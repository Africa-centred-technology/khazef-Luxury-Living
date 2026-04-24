import Seo from "@/components/Seo";
import PageHeader from "@/components/PageHeader";
import CtaBanner from "@/components/CtaBanner";
import safi from "@/assets/safi-aerial.jpg";
import coast from "@/assets/safi-coast.jpg";
import pottery from "@/assets/safi-pottery.jpg";

const Safi = () => {
  return (
    <>
      <Seo title="Ville de Safi" description="Découvrez Safi, ville portuaire et capitale marocaine de la céramique." />
      <PageHeader
        eyebrow="Ville de Safi"
        arabic="آسفي"
        title="Safi,"
        italicWord="le bleu et le feu."
        intro="Ville portuaire millénaire, capitale marocaine de la poterie, Safi tisse depuis toujours un dialogue rare entre la terre, l'océan et le feu."
        image={safi}
      />

      {/* Storytelling */}
      <section className="container-luxe py-24 md:py-32 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5 space-y-5">
          <div className="flex items-center gap-4"><span className="gold-rule" /><span className="eyebrow text-gold">Histoire</span></div>
          <h2 className="h-display text-primary">Mille ans <em>de céramique.</em></h2>
        </div>
        <div className="md:col-span-6 md:col-start-7 space-y-5 text-muted-foreground font-light text-lg leading-relaxed">
          <p>Depuis le XIIe siècle, Safi est connue pour ses ateliers de potiers. Ses fours alignés sur la colline d'Asfi enseignent encore aujourd'hui un art devenu marque de fabrique du Maroc.</p>
          <p>Le bleu cobalt de Safi — profond, intense — est devenu un emblème : c'est lui que l'on retrouve dans le logo et l'âme de Khazef.</p>
        </div>
      </section>

      {/* Two image storytelling */}
      <section className="grid md:grid-cols-2">
        <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[520px]">
          <img src={pottery} alt="Atelier de poterie à Safi" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        </div>
        <div className="bg-secondary/40 px-8 md:px-16 py-20 flex items-center">
          <div className="max-w-md space-y-5">
            <div className="eyebrow text-gold">Culture & artisanat</div>
            <h3 className="h-section text-primary">La main qui pense.</h3>
            <p className="text-muted-foreground font-light leading-relaxed">
              Dans les ateliers de la colline aux potiers, la matière prend forme sous des gestes transmis depuis huit générations. Une tradition vivante, intime, exigeante.
            </p>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2">
        <div className="bg-primary text-secondary px-8 md:px-16 py-20 flex items-center order-2 md:order-1">
          <div className="max-w-md space-y-5">
            <div className="eyebrow text-gold">Côte atlantique</div>
            <h3 className="h-section text-secondary">Le large, <em className="text-gold-bright">à perte de vue.</em></h3>
            <p className="text-secondary/80 font-light leading-relaxed">
              Falaises de grès doré, criques préservées, vagues légendaires : Safi offre 50 km de littoral parmi les plus authentiques du Maroc, à quelques minutes seulement de Khazef.
            </p>
          </div>
        </div>
        <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[520px] order-1 md:order-2">
          <img src={coast} alt="Côte atlantique de Safi" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        </div>
      </section>

      {/* Stats */}
      <section className="container-luxe py-24 grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 text-center">
        {[
          { n: "1100", l: "Année de fondation" },
          { n: "350K", l: "Habitants" },
          { n: "50", l: "Km de côte" },
          { n: "8", l: "Générations de potiers" },
        ].map((s) => (
          <div key={s.l} className="space-y-2">
            <div className="font-display text-5xl md:text-6xl text-primary leading-none">{s.n}</div>
            <div className="eyebrow text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </section>

      <CtaBanner />
    </>
  );
};

export default Safi;
