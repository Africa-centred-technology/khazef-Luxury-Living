import { Link } from "react-router-dom";
import { ArrowRight, Building2, Compass, Sparkles } from "lucide-react";
import { useTranslation, Trans } from "react-i18next";
import Seo from "@/components/Seo";
import CtaBanner from "@/components/CtaBanner";
import hero from "@/assets/hero-building.jpg";
import living from "@/assets/interior-living.jpg";
import safiAerial from "@/assets/safi-aerial.jpg";
import logo from "@/assets/logo.png";

const highlightIcons = [Building2, Sparkles, Compass] as const;

const previewRoutes = ["/project", "/apartments", "/safi"] as const;

interface HighlightItem {
  title: string;
  text: string;
}

interface StatItem {
  n: string;
  l: string;
}

interface PreviewItem {
  label: string;
  title: string;
}

const Home = () => {
  const { t } = useTranslation("home");

  const highlightItems = t("highlights.items", { returnObjects: true }) as HighlightItem[];
  const statItems = t("stats.items", { returnObjects: true }) as StatItem[];
  const previewItems = t("previews.items", { returnObjects: true }) as PreviewItem[];

  return (
    <>
      <Seo
        title={t("seo.title")}
        description={t("seo.description")}
      />

      {/* HERO */}
      <section className="relative h-[100svh] min-h-[680px] w-full overflow-hidden">
        <img
          src={hero}
          alt={t("hero.imageAlt")}
          className="absolute inset-0 h-full w-full object-cover animate-slow-pan"
          width={1920}
          height={1080}
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/50 to-primary/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-primary/15 to-transparent md:to-primary/0" />
        <div className="absolute inset-0 pattern-zellige opacity-20" />

        <div className="container-luxe relative h-full flex flex-col justify-end pb-24 md:pb-32 text-white">
          <div className="flex items-center gap-4 mb-8 animate-fade-in">
            <span className="h-px w-16 bg-gold" />
            <span className="eyebrow text-gold" style={{ textShadow: "0 1px 3px hsl(var(--primary) / 0.7)" }}>{t("hero.eyebrow")}</span>
          </div>

          <h1
            className="h-hero text-white max-w-5xl text-balance animate-fade-in"
            style={{
              animationDelay: "0.15s",
              textShadow: "0 2px 18px hsl(var(--primary) / 0.7), 0 1px 3px hsl(var(--primary) / 0.85)",
            }}
          >
            {t("hero.titleLine1")}
            <br />
            <em className="font-light text-gold-bright">{t("hero.titleItalic")}</em>
          </h1>

          <div className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8 animate-fade-in" style={{ animationDelay: "0.35s" }}>
            <p
              className="max-w-md text-white/90 font-light text-lg leading-relaxed"
              style={{ textShadow: "0 1px 6px hsl(var(--primary) / 0.8)" }}
            >
              <Trans
                i18nKey="hero.intro"
                ns="home"
                components={{ 1: <span className="arabic text-gold" /> }}
              />
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 bg-gradient-gold-bright text-primary px-8 py-4 text-[12px] uppercase tracking-[0.22em] font-medium hover:shadow-luxe-lg transition-all duration-500"
              >
                {t("hero.ctaVisit")}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/project"
                className="inline-flex items-center gap-3 border border-secondary/40 text-secondary px-8 py-4 text-[12px] uppercase tracking-[0.22em] font-medium hover:bg-secondary/10 transition-all duration-500"
              >
                {t("hero.ctaProject")}
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-secondary/70 eyebrow text-[10px] flex flex-col items-center gap-2">
          <span>{t("hero.scroll")}</span>
          <span className="h-10 w-px bg-secondary/40 animate-pulse" />
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="container-luxe py-28 md:py-40 grid md:grid-cols-12 gap-12 items-end">
        <div className="md:col-span-5 space-y-6">
          <div className="flex items-center gap-4">
            <span className="gold-rule" />
            <span className="eyebrow text-gold">{t("manifesto.eyebrow")}</span>
          </div>
          <h2 className="h-display text-primary text-balance">
            {t("manifesto.titleLine1")}<br/>{t("manifesto.titleLine2Prefix")}<em>{t("manifesto.titleItalic")}</em>
          </h2>
        </div>
        <div className="md:col-span-6 md:col-start-7 space-y-6 text-muted-foreground font-light text-lg leading-relaxed">
          <p>
            <Trans
              i18nKey="manifesto.paragraph1"
              ns="home"
              components={{ 1: <span className="text-primary font-medium" /> }}
            />
          </p>
          <p>{t("manifesto.paragraph2")}</p>
          <Link to="/project" className="inline-flex items-center gap-2 text-primary link-luxe text-sm uppercase tracking-[0.2em] font-medium pt-4">
            {t("manifesto.link")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* CHIFFRES */}
      <section className="bg-gradient-night text-secondary relative overflow-hidden">
        <div className="absolute inset-0 pattern-zellige opacity-25" />
        <div className="container-luxe relative py-20 grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 text-center">
          {statItems.map((s) => (
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
            <span className="gold-rule" /><span className="eyebrow text-gold">{t("highlights.eyebrow")}</span>
          </div>
          <h2 className="h-display text-primary">{t("highlights.titlePrefix")}<em>{t("highlights.titleItalic")}</em></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-px bg-border">
          {highlightItems.map((item, index) => {
            const Icon = highlightIcons[index] ?? highlightIcons[0];
            return (
              <article key={item.title} className="bg-background p-10 md:p-12 group hover:bg-secondary/40 transition-colors duration-500">
                <Icon className="h-8 w-8 text-gold mb-8 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.2} />
                <h3 className="h-section text-primary mb-4">{item.title}</h3>
                <p className="text-muted-foreground font-light leading-relaxed">{item.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* CITATION + IMAGE */}
      <section className="grid md:grid-cols-2">
        <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[640px] overflow-hidden">
          <img
            src={living}
            alt={t("quote.imageAlt")}
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
              {t("quote.text")}
            </p>
            <div className="mt-8 eyebrow text-gold">{t("quote.attribution")}</div>
          </div>
        </div>
      </section>

      {/* PREVIEWS */}
      <section className="container-luxe py-28 md:py-36">
        <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-4 mb-5"><span className="gold-rule" /><span className="eyebrow text-gold">{t("previews.eyebrow")}</span></div>
            <h2 className="h-display text-primary">{t("previews.titlePrefix")}<em>{t("previews.titleItalic")}</em></h2>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {previewItems.map((p, i) => (
            <Link
              key={previewRoutes[i]}
              to={previewRoutes[i]}
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
                  {t("previews.discover")} <ArrowRight className="h-4 w-4" />
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
