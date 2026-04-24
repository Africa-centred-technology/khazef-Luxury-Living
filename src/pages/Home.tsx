import { Link } from "react-router-dom";
import { ArrowRight, Building2, Compass, Sparkles } from "lucide-react";
import Seo from "@/components/Seo";
import CtaBanner from "@/components/CtaBanner";
import hero from "@/assets/hero-building.jpg";
import living from "@/assets/interior-living.jpg";
import safiAerial from "@/assets/safi-aerial.jpg";
import logo from "@/assets/logo.png";

const highlights = [
  {
    icon: Building2,
    title: "Architecture R+6",
    text: "25 appartements et 2 commerces, ciselés sur 450 m² face à l'Atlantique.",
  },
  {
    icon: Sparkles,
    title: "Matières nobles",
    text: "Tadelakt chaud, marbre veiné d'or, zellige bleu cobalt — un hommage à la porcelaine de Safi.",
  },
  {
    icon: Compass,
    title: "Adresse rare",
    text: "Au cœur de Safi, entre médina millénaire, océan et collines minérales.",
  },
];

const previews = [
  { to: "/project", label: "Le projet", title: "Une vision architecturale" },
  { to: "/apartments", label: "Appartements", title: "Typologies & finitions" },
  { to: "/safi", label: "Ville de Safi", title: "Le berceau de la céramique" },
];

const Home = () => {
  return (
    <>
      <Seo
        title="Khazef — Résidence de prestige à Safi"
        description="Khazef · L'art de vivre, ciselé dans la pierre. Résidence R+6 de 25 appartements à Safi, Maroc."
      />

      {/* HERO */}
      <section className="relative h-[100svh] min-h-[680px] w-full overflow-hidden">
        <img
          src={hero}
          alt="Façade luxueuse de la résidence Khazef à Safi au coucher du soleil"
          className="absolute inset-0 h-full w-full object-cover animate-slow-pan"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/20 to-primary/80" />
        <div className="absolute inset-0 pattern-zellige opacity-20" />

        <div className="container-luxe relative h-full flex flex-col justify-end pb-24 md:pb-32 text-secondary">
          <div className="flex items-center gap-4 mb-8 animate-fade-in">
            <span className="h-px w-16 bg-gold" />
            <span className="eyebrow text-gold">Safi · Maroc · 2025</span>
          </div>

          <h1 className="h-hero text-secondary max-w-5xl text-balance animate-fade-in" style={{ animationDelay: "0.15s" }}>
            L'art de vivre,
            <br />
            <em className="font-light text-gold-bright">ciselé dans la pierre.</em>
          </h1>

          <div className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8 animate-fade-in" style={{ animationDelay: "0.35s" }}>
            <p className="max-w-md text-secondary/85 font-light text-lg leading-relaxed">
              Khazef — <span className="arabic text-gold">خَزَف</span> — est une résidence confidentielle de 25 appartements, signée par l'élégance méditerranéenne et le savoir-faire de la porcelaine.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 bg-gradient-gold-bright text-primary px-8 py-4 text-[12px] uppercase tracking-[0.22em] font-medium hover:shadow-luxe-lg transition-all duration-500"
              >
                Réserver une visite
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/project"
                className="inline-flex items-center gap-3 border border-secondary/40 text-secondary px-8 py-4 text-[12px] uppercase tracking-[0.22em] font-medium hover:bg-secondary/10 transition-all duration-500"
              >
                Découvrir le projet
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-secondary/70 eyebrow text-[10px] flex flex-col items-center gap-2">
          <span>Défiler</span>
          <span className="h-10 w-px bg-secondary/40 animate-pulse" />
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="container-luxe py-28 md:py-40 grid md:grid-cols-12 gap-12 items-end">
        <div className="md:col-span-5 space-y-6">
          <div className="flex items-center gap-4">
            <span className="gold-rule" />
            <span className="eyebrow text-gold">Le manifeste</span>
          </div>
          <h2 className="h-display text-primary text-balance">
            Une résidence pensée comme<br/>une <em>pièce d'orfèvrerie.</em>
          </h2>
        </div>
        <div className="md:col-span-6 md:col-start-7 space-y-6 text-muted-foreground font-light text-lg leading-relaxed">
          <p>
            Khazef puise son nom dans la <span className="text-primary font-medium">céramique</span> — cette matière fragile que les artisans de Safi transforment, depuis des siècles, en éclats de bleu et d'or.
          </p>
          <p>
            Chaque appartement, chaque détail, chaque seuil porte cette même exigence : une beauté lente, ciselée, durable. Un hommage contemporain au minéral marocain.
          </p>
          <Link to="/project" className="inline-flex items-center gap-2 text-primary link-luxe text-sm uppercase tracking-[0.2em] font-medium pt-4">
            Lire le manifeste <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* CHIFFRES */}
      <section className="bg-gradient-night text-secondary relative overflow-hidden">
        <div className="absolute inset-0 pattern-zellige opacity-25" />
        <div className="container-luxe relative py-20 grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 text-center">
          {[
            { n: "25", l: "Appartements" },
            { n: "02", l: "Commerces" },
            { n: "R+6", l: "Étages" },
            { n: "450", l: "m² de foncier" },
          ].map((s) => (
            <div key={s.l} className="space-y-2">
              <div className="font-display text-6xl md:text-7xl text-gold-bright leading-none">{s.n}</div>
              <div className="eyebrow text-secondary/70">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="container-luxe py-28 md:py-36">
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-4 mb-5">
            <span className="gold-rule" /><span className="eyebrow text-gold">L'essentiel</span>
          </div>
          <h2 className="h-display text-primary">Trois promesses, <em>tenues.</em></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-px bg-border">
          {highlights.map(({ icon: Icon, title, text }) => (
            <article key={title} className="bg-background p-10 md:p-12 group hover:bg-secondary/40 transition-colors duration-500">
              <Icon className="h-8 w-8 text-gold mb-8 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.2} />
              <h3 className="h-section text-primary mb-4">{title}</h3>
              <p className="text-muted-foreground font-light leading-relaxed">{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* CITATION + IMAGE */}
      <section className="grid md:grid-cols-2">
        <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[640px] overflow-hidden">
          <img
            src={living}
            alt="Salon luxueux d'un appartement Khazef avec canapé en velours indigo et finitions dorées"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2000ms] hover:scale-105"
            loading="lazy"
            width={1600}
            height={1200}
          />
        </div>
        <div className="bg-secondary/50 flex items-center px-8 md:px-16 py-20">
          <div className="max-w-md">
            <img src={logo} alt="" className="h-16 w-16 mb-8 opacity-80" width={64} height={64} />
            <p className="font-display text-3xl md:text-4xl text-primary leading-snug italic">
              « La porcelaine vit deux fois : sous les mains de l'artisan, puis sous le regard de celui qui s'y reconnaît. »
            </p>
            <div className="mt-8 eyebrow text-gold">Le manifeste Khazef</div>
          </div>
        </div>
      </section>

      {/* PREVIEWS */}
      <section className="container-luxe py-28 md:py-36">
        <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-4 mb-5"><span className="gold-rule" /><span className="eyebrow text-gold">Explorer</span></div>
            <h2 className="h-display text-primary">Le voyage <em>commence ici.</em></h2>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {previews.map((p, i) => (
            <Link
              key={p.to}
              to={p.to}
              className="group relative aspect-[3/4] overflow-hidden bg-primary"
            >
              <img
                src={[hero, living, safiAerial][i]}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-80 transition-all duration-[1500ms] group-hover:scale-110 group-hover:opacity-60"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-secondary">
                <div className="eyebrow text-gold mb-3">{p.label}</div>
                <h3 className="font-display text-3xl mb-4">{p.title}</h3>
                <span className="link-luxe text-sm uppercase tracking-[0.2em] inline-flex items-center gap-2 w-fit">
                  Découvrir <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CtaBanner />
    </>
  );
};

export default Home;
