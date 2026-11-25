"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function CalmingSculpture() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.LineSegments>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  // Scroll tracking state (anchored, calm)
  const scrollState = useRef({
    progress: 0,
    targetProgress: 0,
  });

  // Pointer tracking for subtle, soothing parallax
  const pointer = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      // Normalized pointer (-1 to 1)
      pointer.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    // GSAP ScrollTrigger for calm, anchored scale and opacity transition
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 0,
        end: () => document.documentElement.scrollHeight - window.innerHeight,
        scrub: 1.2,
        onUpdate: (self) => {
          scrollState.current.targetProgress = self.progress; // 0 to 1
        },
      });
    });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      ctx.revert();
    };
  }, []);

  // Programmatic Torus Knot Geometries (Smooth Dark Chrome / Frosted Glass Sculpture)
  const { knotGeo, wireGeo, innerRibbonGeo } = useMemo(() => {
    const mainKnot = new THREE.TorusKnotGeometry(1.15, 0.35, 180, 32, 2, 3);
    const wireKnot = new THREE.TorusKnotGeometry(1.155, 0.352, 54, 16, 2, 3);
    const wire = new THREE.WireframeGeometry(wireKnot);
    const innerRibbon = new THREE.TorusKnotGeometry(1.15, 0.04, 140, 16, 2, 3);

    return {
      knotGeo: mainKnot,
      wireGeo: wire,
      innerRibbonGeo: innerRibbon,
    };
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    // Smooth dampening for scroll
    scrollState.current.progress = THREE.MathUtils.damp(
      scrollState.current.progress,
      scrollState.current.targetProgress,
      2.5,
      delta
    );
    const p = scrollState.current.progress; // 0 to 1

    // Soothing, smooth pointer parallax
    pointer.current.x = THREE.MathUtils.damp(pointer.current.x, pointer.current.targetX, 2, delta);
    pointer.current.y = THREE.MathUtils.damp(pointer.current.y, pointer.current.targetY, 2, delta);

    if (groupRef.current) {
      // 1. Anchored position on the right side of the screen
      const baseX = 1.85;
      groupRef.current.position.x = baseX + pointer.current.x * 0.12;

      // 2. Calming, breathing idle vertical bobbing
      groupRef.current.position.y = Math.sin(time * 0.55) * 0.07;
      groupRef.current.position.z = -p * 1.5;

      // 3. Very slow, meditative continuous rotation
      groupRef.current.rotation.x = time * 0.08 + pointer.current.y * 0.18;
      groupRef.current.rotation.y = time * 0.12 + pointer.current.x * 0.22;
      groupRef.current.rotation.z = Math.sin(time * 0.3) * 0.08;

      // 4. On scroll: Gently scale down without flying across the screen
      const scale = THREE.MathUtils.lerp(1.0, 0.58, p);
      groupRef.current.scale.setScalar(scale);

      // 5. Gently soften opacity on scroll so text is 100% readable
      const opacity = THREE.MathUtils.lerp(0.9, 0.25, Math.min(1, p * 2.2));

      if (meshRef.current) {
        (meshRef.current.material as THREE.MeshPhysicalMaterial).opacity = opacity;
      }
      if (wireRef.current) {
        (wireRef.current.material as THREE.LineBasicMaterial).opacity = opacity * 0.22;
      }
      if (coreRef.current) {
        (coreRef.current.material as THREE.MeshStandardMaterial).opacity = opacity * 0.7;
      }
    }
  });

  return (
    <>
      {/* Refined Tech Lighting: Cool Cyan + Warm Gold + Top Slate Fill */}
      <ambientLight intensity={0.5} color="#ffffff" />
      <directionalLight position={[-4, 5, 4]} intensity={2.0} color="#06b6d4" />
      <directionalLight position={[5, -3, 3]} intensity={2.6} color="#f59e0b" />
      <directionalLight position={[0, 6, -2]} intensity={0.9} color="#94a3b8" />
      <pointLight position={[1.85, 0, 2]} intensity={1.5} distance={7} color="#f59e0b" />

      {/* Single Elegant 3D Sculpture Anchored on Right Side */}
      <group ref={groupRef} position={[1.85, 0, 0]}>
        {/* Main Body: Dark Chrome / Frosted Obsidian Glass Material */}
        <mesh ref={meshRef} geometry={knotGeo}>
          <meshPhysicalMaterial
            color="#0b0e14"
            emissive="#f59e0b"
            emissiveIntensity={0.06}
            roughness={0.14}
            metalness={0.9}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
            reflectivity={0.95}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Inner Glowing Gold Filament Ribbon */}
        <mesh ref={coreRef} geometry={innerRibbonGeo}>
          <meshStandardMaterial
            color="#f59e0b"
            emissive="#f59e0b"
            emissiveIntensity={0.7}
            roughness={0.2}
            metalness={0.5}
            transparent
            opacity={0.75}
          />
        </mesh>

        {/* Delicate Outer Wireframe Accent Lattice */}
        <lineSegments ref={wireRef} geometry={wireGeo}>
          <lineBasicMaterial color="#f59e0b" transparent opacity={0.2} />
        </lineSegments>
      </group>
    </>
  );
}

export default function LivingBackground3D() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 w-full h-full overflow-hidden"
    >
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 46, near: 0.1, far: 40 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        className="w-full h-full pointer-events-none"
      >
        <CalmingSculpture />
      </Canvas>
    </div>
  );
}
