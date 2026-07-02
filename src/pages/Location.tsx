import { useState } from "react";
import { useTranslation } from "react-i18next";
import Seo from "@/components/Seo";
import PageHeader from "@/components/PageHeader";
import CtaBanner from "@/components/CtaBanner";
import { MapPin, ShoppingBag, GraduationCap, Hospital, Waves, Trees, TrainFront, Map as MapIcon, Satellite, type LucideIcon } from "lucide-react";
import { RENDERS } from "@/data/renders";
import { GPS } from "@/data/villas-ahlam";

const safi = RENDERS.landscapedStreet;

type AmenityKey = "beach" | "medina" | "schools" | "hospital" | "gardens" | "airport" | "train";

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
  train: TrainFront,
};

const PLAN_SRC =
  "https://www.openstreetmap.org/export/embed.html?bbox=-7.70%2C33.45%2C-7.63%2C33.51&layer=mapnik&marker=33.479327,-7.665879";
const SAT_SRC = `https://maps.google.com/maps?q=${GPS.lat},${GPS.lng}&t=k&z=16&hl=fr&output=embed`;

const Location = () => {
  const { t } = useTranslation("location");
  const amenities = t("amenities.items", { returnObjects: true }) as AmenityItem[];
  const lifestyleParagraphs = t("lifestyle.paragraphs", { returnObjects: true }) as string[];
  const [mapView, setMapView] = useState<"plan" | "satellite">("plan");

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
        {/* Bascule Plan / Satellite */}
        <div className="mb-4 flex justify-end">
          <div
            role="group"
            aria-label={t("map.viewToggle")}
            className="inline-flex overflow-hidden rounded-sm border border-border/60 bg-background shadow-luxe-sm"
          >
            <button
              type="button"
              onClick={() => setMapView("plan")}
              aria-pressed={mapView === "plan"}
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-[0.14em] transition-colors ${
                mapView === "plan" ? "bg-primary text-primary-foreground" : "text-primary hover:bg-secondary"
              }`}
            >
              <MapIcon className="h-4 w-4" /> {t("map.plan")}
            </button>
            <button
              type="button"
              onClick={() => setMapView("satellite")}
              aria-pressed={mapView === "satellite"}
              className={`inline-flex items-center gap-2 border-l border-border/60 px-4 py-2 text-xs uppercase tracking-[0.14em] transition-colors ${
                mapView === "satellite" ? "bg-primary text-primary-foreground" : "text-primary hover:bg-secondary"
              }`}
            >
              <Satellite className="h-4 w-4" /> {t("map.satellite")}
            </button>
          </div>
        </div>

        <div className="aspect-[16/10] w-full overflow-hidden border border-border shadow-luxe-md bg-muted">
          <iframe
            key={mapView}
            title={t("map.iframeTitle")}
            src={mapView === "satellite" ? SAT_SRC : PLAN_SRC}
            className={`h-full w-full ${mapView === "plan" ? "grayscale-[20%]" : ""}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
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
