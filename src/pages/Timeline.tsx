import { useTranslation } from "react-i18next";
import Seo from "@/components/Seo";
import PageHeader from "@/components/PageHeader";
import CtaBanner from "@/components/CtaBanner";
import { Check } from "lucide-react";
import hero from "@/assets/hero-building.jpg";

interface Phase {
  date: string;
  title: string;
  desc: string;
}

const phaseFlags: Array<{ done: boolean; current?: boolean }> = [
  { done: true },
  { done: true },
  { done: true },
  { done: false, current: true },
  { done: false },
  { done: false },
  { done: false },
];

const Timeline = () => {
  const { t } = useTranslation("timeline");
  const phaseItems = t("phases.items", { returnObjects: true }) as Phase[];
  const phases = phaseItems.map((phase, index) => ({
    ...phase,
    ...phaseFlags[index],
  }));

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

      <section className="container-luxe py-20 md:py-28">
        {/* Progress bar */}
        <div className="mb-16">
          <div className="flex items-end justify-between mb-3">
            <div className="eyebrow text-gold">{t("progress.eyebrow")}</div>
            <div className="font-display text-3xl text-primary">{t("progress.value")}</div>
          </div>
          <div className="h-1 bg-border overflow-hidden">
            <div className="h-full bg-gradient-gold" style={{ width: "52%" }} />
          </div>
        </div>

        {/* Vertical timeline */}
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" />
          <div className="space-y-12">
            {phases.map((p, i) => (
              <div key={p.title} className={`relative grid md:grid-cols-2 gap-6 md:gap-12 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                {/* Marker */}
                <div className="absolute left-4 md:left-1/2 top-3 -translate-x-1/2">
                  <div
                    className={`h-4 w-4 rounded-full border-2 ${
                      p.current
                        ? "bg-gold border-gold animate-pulse-gold"
                        : p.done
                        ? "bg-primary border-primary"
                        : "bg-background border-border"
                    }`}
                  />
                </div>

                <div className={`pl-12 md:pl-0 ${i % 2 ? "md:text-left md:pl-12" : "md:text-right md:pr-12"}`}>
                  <div className="eyebrow text-gold mb-2">{p.date}</div>
                  <h3 className="font-display text-2xl md:text-3xl text-primary mb-3 flex items-center gap-3 md:justify-end md:[&>*]:order-2">
                    {p.title}
                    {p.done && <Check className="h-5 w-5 text-gold" />}
                  </h3>
                </div>
                <div className={`pl-12 md:pl-0 ${i % 2 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <p className="text-muted-foreground font-light leading-relaxed">{p.desc}</p>
                  {p.current && (
                    <div className="mt-3 inline-block eyebrow text-gold border border-gold/40 px-3 py-1.5">{t("status.current")}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
};

export default Timeline;
