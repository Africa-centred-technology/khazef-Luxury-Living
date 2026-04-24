import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { ACESFilmicToneMapping } from "three";

import { ApartmentModel } from "./ApartmentModel";
import { PostFx3D } from "./effects/PostFx3D";
import { useCurrentTypology } from "../hooks/useCurrentTypology";

/**
 * Bird-eye 3D view — rendered as a dark editorial doll-house. Ceiling removed
 * so the camera can look down into the rooms, exterior void kept dark to
 * isolate the apartment and rest the viewer's eyes.
 */
export function Apartment3DScene() {
  const typology = useCurrentTypology();
  const maxDist = Math.max(typology.footprint[0], typology.footprint[1]) * 1.5 + 6;

  return (
    <Canvas
      key={typology.id}
      shadows
      dpr={[1, 2]}
      camera={{ position: [9, 7, 8], fov: 45 }}
      gl={{
        antialias: true,
        toneMapping: ACESFilmicToneMapping,
        toneMappingExposure: 0.85,
      }}
    >
      {/* Dark editorial void — indigo nuit, non agressif */}
      <color attach="background" args={["#0a0e1c"]} />
      <fog attach="fog" args={["#0a0e1c", 12, 32]} />

      {/* Key light only on the apartment — rest stays dark */}
      <directionalLight
        castShadow
        position={[8, 12, 6]}
        intensity={0.9}
        color="#ffe3b8"
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <ambientLight intensity={0.12} color="#3a4560" />
      <hemisphereLight args={["#ffeccc", "#101624", 0.18]} />

      <Suspense fallback={null}>
        <Environment preset="night" />
        <ApartmentModel typology={typology} clickableFloors showCeiling={false} />
      </Suspense>

      <OrbitControls
        enablePan
        enableDamping
        dampingFactor={0.08}
        maxPolarAngle={Math.PI / 2 - 0.05}
        minDistance={4}
        maxDistance={maxDist}
        target={[0, 1.2, 0]}
      />

      <PostFx3D />
    </Canvas>
  );
}

export default Apartment3DScene;
