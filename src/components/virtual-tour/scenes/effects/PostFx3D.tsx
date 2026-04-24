import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Vignette,
  BrightnessContrast,
  Noise,
  SMAA,
} from "@react-three/postprocessing";

/**
 * Effect stack tuned for the bird-eye (plan cavalier) 3D view of the apartment.
 *
 * Stack:
 *  - DepthOfField: shallow focal depth to add miniature / architectural model feel.
 *  - Bloom: warm highlight lift on lamps, gold fittings.
 *  - Vignette: editorial framing.
 *  - BrightnessContrast: tiny punch-up of contrast for crispness.
 *  - Noise: subtle grain.
 *  - SMAA: antialias final composite.
 *
 * Tuning values are intentionally gentle — the 3D scene already carries a
 * lot of geometric detail and should not feel over-processed.
 */
export function PostFx3D() {
  return (
    <EffectComposer multisampling={0}>
      <DepthOfField
        focusDistance={0.02}
        focalLength={0.09}
        bokehScale={2.5}
        height={480}
      />
      <Bloom
        intensity={0.22}
        luminanceThreshold={0.92}
        luminanceSmoothing={0.3}
        mipmapBlur
      />
      <Vignette offset={0.2} darkness={0.78} eskil={false} />
      <BrightnessContrast brightness={-0.08} contrast={0.12} />
      <Noise opacity={0.02} premultiply />
      <SMAA />
    </EffectComposer>
  );
}

export default PostFx3D;
