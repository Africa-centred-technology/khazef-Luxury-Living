import { Suspense, useRef } from "react";
import { useTranslation } from "react-i18next";

import Seo from "@/components/Seo";
import PageHeader from "@/components/PageHeader";
import CtaBanner from "@/components/CtaBanner";
import hero from "@/assets/interior-living.jpg";

import { useTourStore } from "@/components/virtual-tour/hooks/useTourStore";
import {
  LazyPanorama360,
  LazyApartment3DScene,
  TourSuspenseFallback,
} from "@/components/virtual-tour/LazyVirtualTour";
import VirtualTourSchema from "@/components/virtual-tour/seo/VirtualTourSchema";
import VirtualTourAccessibility from "@/components/virtual-tour/VirtualTourAccessibility";
import XRProvider from "@/components/virtual-tour/scenes/XRProvider";

import { MiniMap } from "@/components/virtual-tour/ui/MiniMap";
import { RoomCarousel } from "@/components/virtual-tour/ui/RoomCarousel";
import { ModeSwitcher } from "@/components/virtual-tour/ui/ModeSwitcher";
import { CrosshairCompass } from "@/components/virtual-tour/ui/CrosshairCompass";
import { AmbienceToggle } from "@/components/virtual-tour/ui/AmbienceToggle";
import { InfoPanel } from "@/components/virtual-tour/ui/InfoPanel";
import { MeasurementTool } from "@/components/virtual-tour/ui/MeasurementTool";
import { XRButton } from "@/components/virtual-tour/ui/XRButton";
import HelpOverlay from "@/components/virtual-tour/ui/HelpOverlay";
import { ControlsHint } from "@/components/virtual-tour/ui/ControlsHint";
import { StageWheelGuard } from "@/components/virtual-tour/ui/StageWheelGuard";
import { ApartmentSelector } from "@/components/virtual-tour/ui/ApartmentSelector";
import { TypologyDetailPanel } from "@/components/virtual-tour/ui/TypologyDetailPanel";
import { TypologyHero } from "@/components/virtual-tour/ui/TypologyHero";
import { AmbienceLegend } from "@/components/virtual-tour/ui/AmbienceLegend";

import { useTourIntro, useTourTips } from "@/components/virtual-tour/data/editorial-copy";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";

function resolveIcon(name: string): LucideIcon {
  const icons = LucideIcons as unknown as Record<string, LucideIcon>;
  return icons[name] ?? LucideIcons.Sparkles;
}

const VirtualTour = () => {
  const { t } = useTranslation("virtualTour");
  const tourIntro = useTourIntro();
  const tourTips = useTourTips();
  const currentRoom = useTourStore((s) => s.currentRoom);
  const mode = useTourStore((s) => s.mode);
  const stageRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <Seo
        title={t("seo.title")}
        description={t("seo.description")}
      />
      <VirtualTourSchema
        name={t("schema.name")}
        description={t("schema.description")}
      />

      <VirtualTourAccessibility />

      <PageHeader
        eyebrow={tourIntro.eyebrow}
        arabic={tourIntro.arabic}
        title={tourIntro.title}
        italicWord={tourIntro.italicWord}
        image={hero}
      />

      {/* Immersive stage — panorama OR 3D scene */}
      <section className="container-luxe py-10">
        <XRProvider>
          <div
            id="immersive-stage"
            ref={stageRef}
            tabIndex={-1}
            className="relative h-[calc(100vh-180px)] min-h-[560px] w-full overflow-hidden bg-primary shadow-luxe-xl touch-none select-none [overscroll-behavior:contain] focus:outline-none"
          >
            <StageWheelGuard stageRef={stageRef} />
            <Suspense fallback={<TourSuspenseFallback />}>
              {mode === "panorama" ? (
                <LazyPanorama360 roomId={currentRoom} />
              ) : (
                <LazyApartment3DScene />
              )}
            </Suspense>

            {/* Editorial overlays — fixed within the stage */}
            <ApartmentSelector />
            <ModeSwitcher />
            <AmbienceToggle />
            <CrosshairCompass />
            <MiniMap />
            <RoomCarousel />
            <MeasurementTool />
            <InfoPanel />
            <TypologyDetailPanel />
            <ControlsHint />
            <AmbienceLegend />

            {/* VR entry point, bottom-left corner */}
            <div className="absolute bottom-6 left-6 z-30">
              <XRButton />
            </div>
          </div>
        </XRProvider>
      </section>

      <TypologyHero />

      {/* Tips — editorial rail beneath the viewer */}
      <section className="container-luxe pb-24">
        <div className="mb-10 flex items-center gap-4">
          <span className="gold-rule" aria-hidden="true" />
          <span className="eyebrow text-gold">{tourTips.eyebrow}</span>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {tourTips.items.map((tip) => {
            const Icon = resolveIcon(tip.icon);
            return (
              <article
                key={tip.title}
                className="group border border-border/60 bg-secondary/40 p-8 transition-shadow duration-500 hover:shadow-luxe-md"
              >
                <div className="mb-5 inline-flex h-10 w-10 items-center justify-center bg-gradient-gold text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mb-2 font-display text-2xl text-primary">{tip.title}</h3>
                <p className="font-light text-muted-foreground">{tip.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <HelpOverlay />
      <CtaBanner />
    </>
  );
};

export default VirtualTour;
