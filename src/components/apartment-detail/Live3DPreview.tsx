import { lazy, Suspense, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { ApartmentTypology } from "@/components/virtual-tour/data/apartment-typologies";
import { useTourStore } from "@/components/virtual-tour/hooks/useTourStore";

const Apartment3DScene = lazy(() =>
  import("@/components/virtual-tour/scenes/Apartment3DScene").then((module) => ({
    default: module.Apartment3DScene,
  })),
);

interface Live3DPreviewProps {
  typology: ApartmentTypology;
}

export function Live3DPreview({ typology }: Live3DPreviewProps) {
  const { t } = useTranslation("apartmentDetail");

  useEffect(() => {
    useTourStore.getState().setTypology(typology.id);
  }, [typology.id]);

  const legend = t("preview3d.legend", {
    returnObjects: true,
  }) as readonly string[];

  return (
    <section
      className="relative bg-primary py-20 md:py-28 overflow-hidden"
      aria-labelledby="live-3d-preview-heading"
    >
      {/* Subtle top gold rule to echo the editorial frame */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
      />

      {/* Atmospheric radial accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(var(--gold)/0.08),transparent_60%)]"
      />

      <div className="container-luxe relative">
        {/* Eyebrow row */}
        <div className="flex flex-wrap items-center gap-4">
          <span className="gold-rule" />
          <span className="eyebrow text-gold">{t("preview3d.eyebrow")}</span>
          <span className="arabic text-2xl text-gold/80">
            {t("preview3d.arabic")}
          </span>
        </div>

        {/* Heading */}
        <h2
          id="live-3d-preview-heading"
          className="h-display text-balance text-secondary mt-6 max-w-3xl"
        >
          {t("preview3d.title")}
        </h2>

        {/* Intro */}
        <p className="mt-6 max-w-2xl text-base md:text-lg font-light leading-relaxed text-secondary/80">
          {t("preview3d.intro", { name: typology.name })}
        </p>

        {/* 3D viewer */}
        <div className="relative mt-10 aspect-[16/10] md:aspect-[16/8] w-full border border-gold/30 overflow-hidden bg-[#0a0e1c]">
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-full text-gold/70 eyebrow">
                {t("preview3d.loading")}
              </div>
            }
          >
            <Apartment3DScene />
          </Suspense>

          {/* Inner gold inset for editorial frame */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/10"
          />
        </div>

        {/* Legend chips */}
        <ul
          className="mt-8 flex flex-wrap items-center gap-3"
          aria-label={t("preview3d.legendAria")}
        >
          {legend.map((chip) => (
            <li
              key={chip}
              className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/5 px-4 py-2 text-xs font-medium tracking-wide text-secondary/90 backdrop-blur-md"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
              {chip}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <Link
            to="/virtual-tour"
            aria-label={t("preview3d.launchTourAria")}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-gold-bright px-8 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-primary shadow-lg shadow-black/30 transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            {t("preview3d.launchTour")}
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Live3DPreview;
