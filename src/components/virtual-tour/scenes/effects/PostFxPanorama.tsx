import { useMemo } from "react";
import {
  EffectComposer,
  Bloom,
  Vignette,
  ChromaticAberration,
  Noise,
  HueSaturation,
  SMAA,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Vector2 } from "three";

/**
 * Effect stack tuned for the immersive FIRST-PERSON panorama viewer.
 *
 * Stack:
 *  - Bloom: tasteful highlight lift for gold/brass accents & sun bounce.
 *  - Vignette: editorial darkening of the edges.
 *  - ChromaticAberration: very subtle lens fringing for cinematic realism.
 *  - Noise: gentle film grain, keeps the image from feeling sterile.
 *  - HueSaturation: +5% saturation for warmer Safi interior light.
 *  - SMAA: cheap antialiasing that plays well with bloom.
 */
export function PostFxPanorama() {
  const caOffset = useMemo(() => new Vector2(0.0008, 0.0008), []);

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={0.4}
        luminanceThreshold={0.85}
        luminanceSmoothing={0.3}
        mipmapBlur
      />
      <Vignette offset={0.22} darkness={0.55} eskil={false} />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={caOffset}
        radialModulation={false}
        modulationOffset={0}
      />
      <Noise opacity={0.025} premultiply />
      <HueSaturation hue={0} saturation={0.05} />
      <SMAA />
    </EffectComposer>
  );
}

export default PostFxPanorama;
