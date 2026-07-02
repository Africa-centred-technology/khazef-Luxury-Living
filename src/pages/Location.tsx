import { useTranslation } from "react-i18next";
import Seo from "@/components/Seo";
import PageHeader from "@/components/PageHeader";
import CtaBanner from "@/components/CtaBanner";
import { MapPin, ShoppingBag, GraduationCap, Hospital, Waves, Trees, type LucideIcon } from "lucide-react";
import { RENDERS } from "@/data/renders";

const safi = RENDERS.landscapedStreet;

type AmenityKey = "beach" | "medina" | "schools" | "hospital" | "gardens" | "airport";

interface AmenityItem {
  key: AmenityKey;
  name: string;
  dist: string;
}

const AMENITY_ICONS: Record<AmenityKey, LucideIcon> = {
  beach: Waves,
  medina: ShoppingBag,
  schools: GraduationCap,
  hospital: Hospital,
  gardens: Trees,
  airport: MapPin,
};

const Location = () => {
  const { t } = useTranslation("location");
  const amenities = t("amenities.items", { returnObjects: true }) as AmenityItem[];
  const lifestyleParagraphs = t("lifestyle.paragraphs", { returnObjects: true }) as string[];

  return (
    <>
      <Seo title={t("seo.title")} description={t("seo.description")} />
      <PageHeader
        eyebrow={t("header.eyebrow")}
        arabic={t("header.arabic")}
        title={t("header.title")}
        italicWord={t("header.italicWord")}
        intro={t("header.intro")}
        image={safi}
      />

      {/* MAP */}
      <section className="container-luxe py-20">
        <div className="aspect-[16/10] w-full overflow-hidden border border-border shadow-luxe-md bg-muted">
          <iframe
            title={t("map.iframeTitle")}
            src="https://www.openstreetmap.org/export/embed.html?bbox=-7.70%2C33.45%2C-7.63%2C33.51&layer=mapnik&marker=33.479327,-7.665879"
            className="h-full w-full grayscale-[20%]"
            loading="lazy"
          />
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          {t("map.address")} {t("map.separator")} <a className="link-luxe text-primary" href="https://maps.app.goo.gl/xYt5rhptRdtU6wk79" target="_blank" rel="noreferrer">{t("map.fullMapLink")}</a>
        </div>
      </section>

      {/* COMMODITES */}
      <section className="bg-secondary/40 py-24">
        <div className="container-luxe">
          <div className="max-w-2xl mb-14">
            <div className="flex items-center gap-4 mb-5"><span className="gold-rule" /><span className="eyebrow text-gold">{t("amenities.eyebrow")}</span></div>
            <h2 className="h-display text-primary">{t("amenities.titleBefore")} <em>{t("amenities.titleItalic")}</em></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {amenities.map(({ key, name, dist }) => {
              const Icon = AMENITY_ICONS[key];
              return (
                <div key={key} className="bg-background p-8 border border-border/60 shadow-luxe-sm hover:shadow-luxe-md transition-shadow flex items-center gap-5">
                  <div className="h-14 w-14 shrink-0 rounded-full bg-primary/5 text-gold flex items-center justify-center border border-gold/30">
                    <Icon className="h-6 w-6" strokeWidth={1.2} />
                  </div>
                  <div>
                    <div className="font-display text-xl text-primary">{name}</div>
                    <div className="eyebrow text-muted-foreground text-[11px] mt-1">{dist}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LIFESTYLE */}
      <section className="container-luxe py-24 grid md:grid-cols-12 gap-12 items-end">
        <div className="md:col-span-5 space-y-5">
          <div className="flex items-center gap-4"><span className="gold-rule" /><span className="eyebrow text-gold">{t("lifestyle.eyebrow")}</span></div>
          <h2 className="h-display text-primary">{t("lifestyle.titleBefore")} <em>{t("lifestyle.titleItalic")}</em></h2>
        </div>
        <div className="md:col-span-6 md:col-start-7 space-y-5 text-muted-foreground font-light text-lg leading-relaxed">
          {lifestyleParagraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>

      <CtaBanner />
    </>
  );
};

export default Location;
