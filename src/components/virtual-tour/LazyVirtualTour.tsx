import { lazy } from "react";

/**
 * Code-split the heavy immersive pieces of the virtual tour so the initial
 * JS payload for the page stays small. These imports are resolved only when
 * the component is actually rendered (inside a <Suspense> boundary).
 */

/**
 * First-person walkthrough of the 3D apartment — replaces the photo-based
 * panorama viewer. Renders the exact same `<ApartmentModel>` as the 3D
 * bird-eye scene, so both modes show the same real apartment.
 */
export const LazyPanorama360 = lazy(() =>
  import("./scenes/FirstPersonViewer").then((m) => ({ default: m.default })),
);

export const LazyApartment3DScene = lazy(() =>
  import("./scenes/Apartment3DScene").then((m) => ({ default: m.default })),
);

/**
 * Minimal Khazef-styled fallback for Suspense while the immersive bundles
 * load. Intentionally free of external dependencies.
 */
export const TourSuspenseFallback = () => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[60vh] w-full items-center justify-center bg-background"
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <div
          aria-hidden="true"
          className="h-12 w-12 animate-spin rounded-full border-2 border-[hsl(var(--gold))] border-t-transparent"
        />
        <p className="eyebrow text-[hsl(var(--muted-foreground))]">
          Chargement immersif
        </p>
        <p className="font-display text-xl text-[hsl(var(--foreground))]">
          Preparation de la visite
        </p>
      </div>
    </div>
  );
};
