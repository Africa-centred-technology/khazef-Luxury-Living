import { useTranslation } from "react-i18next";
import Seo from "@/components/Seo";
import PageHeader from "@/components/PageHeader";
import CtaBanner from "@/components/CtaBanner";
import { RENDERS } from "@/data/renders";

const hero = RENDERS.heroAerial;
const coast = RENDERS.villaDusk;
const pottery = RENDERS.lifestyleFamily;

interface StatItem {
  n: string;
  l: string;
}

const Safi = () => {
  const { t } = useTranslation("safi");
  const statItems = t("stats.items", { returnObjects: true }) as StatItem[];

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

      {/* Storytelling */}
      <section className="container-luxe py-24 md:py-32 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5 space-y-5">
          <div className="flex items-center gap-4"><span className="gold-rule" /><span className="eyebrow text-gold">{t("history.eyebrow")}</span></div>
          <h2 className="h-display text-primary">{t("history.title")} <em>{t("history.italicWord")}</em></h2>
        </div>
        <div className="md:col-span-6 md:col-start-7 space-y-5 text-muted-foreground font-light text-lg leading-relaxed">
          <p>{t("history.p1")}</p>
          <p>{t("history.p2")}</p>
        </div>
      </section>

      {/* Two image storytelling */}
      <section className="grid md:grid-cols-2">
        <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[520px]">
          <img src={pottery} alt={t("culture.imageAlt")} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        </div>
        <div className="bg-secondary/40 px-8 md:px-16 py-20 flex items-center">
          <div className="max-w-md space-y-5">
            <div className="eyebrow text-gold">{t("culture.eyebrow")}</div>
            <h3 className="h-section text-primary">{t("culture.title")}</h3>
            <p className="text-muted-foreground font-light leading-relaxed">
              {t("culture.text")}
            </p>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2">
        <div className="bg-primary text-secondary px-8 md:px-16 py-20 flex items-center order-2 md:order-1">
          <div className="max-w-md space-y-5">
            <div className="eyebrow text-gold">{t("coast.eyebrow")}</div>
            <h3 className="h-section text-secondary">{t("coast.title")} <em className="text-gold-bright">{t("coast.italicWord")}</em></h3>
            <p className="text-secondary/80 font-light leading-relaxed">
              {t("coast.text")}
            </p>
          </div>
        </div>
        <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[520px] order-1 md:order-2">
          <img src={coast} alt={t("coast.imageAlt")} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        </div>
      </section>

      {/* Stats */}
      <section className="container-luxe py-24 grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 text-center">
        {statItems.map((s) => (
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
