import { useTranslation } from "react-i18next";
import Seo from "@/components/Seo";
import PageHeader from "@/components/PageHeader";
import CtaBanner from "@/components/CtaBanner";
import zellige from "@/assets/material-zellige.jpg";
import tadelakt from "@/assets/material-tadelakt.jpg";
import marble from "@/assets/material-marble.jpg";
import { RENDERS } from "@/data/renders";

const hero = RENDERS.entranceGate;
const living = RENDERS.rooftopSunset;

type MaterialKey = "tadelakt" | "zellige" | "marble";
type CommitmentKey = "01" | "02" | "03" | "04";
type VisionFeatureKey = "ceiling" | "glazing" | "hvac" | "elevator";

interface MaterialEntry {
  key: MaterialKey;
  img: string;
}

const MATERIALS: ReadonlyArray<MaterialEntry> = [
  { key: "tadelakt", img: tadelakt },
  { key: "zellige", img: zellige },
  { key: "marble", img: marble },
];

const COMMITMENTS: ReadonlyArray<CommitmentKey> = ["01", "02", "03", "04"];
const VISION_FEATURES: ReadonlyArray<VisionFeatureKey> = [
  "ceiling",
  "glazing",
  "hvac",
  "elevator",
];

const Project = () => {
  const { t } = useTranslation("project");

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

      {/* CONCEPT */}
      <section className="container-luxe py-24 md:py-32 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5 space-y-6">
          <div className="flex items-center gap-4">
            <span className="gold-rule" />
            <span className="eyebrow text-gold">{t("concept.eyebrow")}</span>
          </div>
          <h2 className="h-display text-primary">
            {t("concept.titleLead")} <em>{t("concept.titleItalic")}</em>
          </h2>
        </div>
        <div className="md:col-span-6 md:col-start-7 text-muted-foreground font-light text-lg leading-relaxed space-y-5">
          <p>{t("concept.paragraph1")}</p>
          <p>{t("concept.paragraph2")}</p>
          <p>{t("concept.paragraph3")}</p>
        </div>
      </section>

      {/* MATERIAUX */}
      <section className="bg-secondary/40 py-24 md:py-32">
        <div className="container-luxe">
          <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="gold-rule" />
                <span className="eyebrow text-gold">{t("materials.eyebrow")}</span>
              </div>
              <h2 className="h-display text-primary">
                {t("materials.titleLead")} <em>{t("materials.titleItalic")}</em>
              </h2>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {MATERIALS.map((m) => {
              const name = t(`materials.items.${m.key}.name`);
              const desc = t(`materials.items.${m.key}.desc`);
              return (
                <article
                  key={m.key}
                  className="group bg-background overflow-hidden shadow-luxe-sm hover:shadow-luxe-lg transition-shadow duration-700"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={m.img}
                      alt={name}
                      className="h-full w-full object-cover transition-transform [transition-duration:2000ms] group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="font-display text-2xl text-primary mb-3">{name}</h3>
                    <p className="text-muted-foreground font-light leading-relaxed">{desc}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* VISION ARCHITECTURALE */}
      <section className="grid md:grid-cols-2">
        <div className="bg-primary text-secondary px-8 md:px-16 py-20 flex items-center order-2 md:order-1">
          <div className="max-w-md space-y-6">
            <div className="eyebrow text-gold">{t("vision.eyebrow")}</div>
            <h2 className="h-display text-secondary">
              {t("vision.titleLead")}{" "}
              <em className="text-gold-bright">{t("vision.titleItalic")}</em>
            </h2>
            <p className="text-secondary/80 font-light leading-relaxed">
              {t("vision.paragraph")}
            </p>
            <ul className="space-y-3 text-secondary/85 text-sm">
              {VISION_FEATURES.map((key) => (
                <li key={key} className="flex gap-3">
                  <span className="text-gold">·</span> {t(`vision.features.${key}`)}
                </li>
              ))}
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
          <div className="flex items-center gap-4 mb-5">
            <span className="gold-rule" />
            <span className="eyebrow text-gold">{t("commitments.eyebrow")}</span>
          </div>
          <h2 className="h-display text-primary">
            {t("commitments.titleLead")} <em>{t("commitments.titleItalic")}</em>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-px bg-border">
          {COMMITMENTS.map((n) => (
            <div key={n} className="bg-background p-10 md:p-12 flex gap-8">
              <div className="font-display text-5xl text-gold leading-none">{n}</div>
              <div>
                <h3 className="font-display text-2xl text-primary mb-3">
                  {t(`commitments.items.${n}.title`)}
                </h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  {t(`commitments.items.${n}.desc`)}
                </p>
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
