import Seo from "@/components/Seo";
import PageHeader from "@/components/PageHeader";
import CtaBanner from "@/components/CtaBanner";
import { Play } from "lucide-react";
import living from "@/assets/interior-living.jpg";

const VirtualTour = () => {
  return (
    <>
      <Seo title="Visite 360°" description="Explorez Khazef en immersion virtuelle 360°." />
      <PageHeader
        eyebrow="Visite immersive"
        arabic="جولة افتراضية"
        title="Franchissez le seuil,"
        italicWord="à 360°."
      />

      <section className="container-luxe py-16">
        <div className="relative aspect-video w-full overflow-hidden bg-primary shadow-luxe-xl group">
          <img src={living} alt="Aperçu visite virtuelle" className="absolute inset-0 h-full w-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-secondary">
            <button className="h-24 w-24 rounded-full bg-gold text-primary flex items-center justify-center shadow-luxe-lg hover:scale-110 transition-transform duration-500 animate-pulse-gold mb-8">
              <Play className="h-9 w-9 ml-1" fill="currentColor" />
            </button>
            <div className="eyebrow text-gold mb-3">Expérience immersive</div>
            <h2 className="font-display text-3xl md:text-5xl text-secondary text-center max-w-2xl px-4">
              Lancez la visite à <em className="text-gold-bright">360°</em>
            </h2>
            <p className="mt-4 text-secondary/80 text-sm max-w-md text-center px-4">
              Naviguez librement dans un appartement témoin Khazef. Casque VR compatible.
            </p>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {[
            { t: "Salon traversant", d: "Volume cathédrale, vue mer." },
            { t: "Cuisine & îlot", d: "Marbre, brass et lumière naturelle." },
            { t: "Suite parentale", d: "Tadelakt, dressing, salle de bain privée." },
          ].map((s) => (
            <div key={s.t} className="bg-secondary/40 p-8 border border-border/60">
              <div className="eyebrow text-gold mb-3">Espace</div>
              <h3 className="font-display text-2xl text-primary mb-2">{s.t}</h3>
              <p className="text-muted-foreground font-light">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBanner />
    </>
  );
};

export default VirtualTour;
