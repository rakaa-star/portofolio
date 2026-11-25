"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface Sculpture3DProps {
  className?: string;
  isHeroBackground?: boolean;
  mode?: "standalone" | "background" | "scroll";
}

export default function Sculpture3D({
  className = "",
  isHeroBackground = false,
  mode = "standalone",
}: Sculpture3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGlSupported, setWebGlSupported] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Initialize WebGL Renderer with graceful fallback
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch (e) {
      console.warn("WebGL not supported, using artistic fallback:", e);
      setWebGlSupported(false);
      return;
    }

    const scene = new THREE.Scene();
    const isMobile = window.innerWidth < 768;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    container.appendChild(renderer.domElement);

    // Master sculpture root group
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Sculpture inner group for rotation & micro-movement
    const sculptureGroup = new THREE.Group();
    masterGroup.add(sculptureGroup);

    // ==========================================
    // 1. PROCEDURAL ARCHITECTURAL GEOMETRY
    // ==========================================
    class ArchitecturalSculptureCurve extends THREE.Curve<THREE.Vector3> {
      scale: number;
      constructor(scale = 1) {
        super();
        this.scale = scale;
      }
      getPoint(t: number, optionalTarget = new THREE.Vector3()) {
        const point = optionalTarget;
        const u = t * Math.PI * 2;
        const x = Math.sin(u) * (1.9 + 0.35 * Math.cos(2 * u)) * this.scale;
        const y = (Math.cos(u) * 1.5 + Math.sin(3 * u) * 0.45) * this.scale;
        const z = (Math.sin(2 * u) * 1.15 + Math.cos(u) * 0.35) * this.scale;
        return point.set(x, y, z);
      }
    }

    const path = new ArchitecturalSculptureCurve(0.95);
    const tubularSegments = isMobile ? 100 : 160;
    const radius = 0.28;
    const radialSegments = isMobile ? 20 : 32;
    const primaryGeometry = new THREE.TubeGeometry(
      path,
      tubularSegments,
      radius,
      radialSegments,
      true
    );

    // Secondary Interlocking Curve
    class SecondaryFinCurve extends THREE.Curve<THREE.Vector3> {
      scale: number;
      constructor(scale = 1) {
        super();
        this.scale = scale;
      }
      getPoint(t: number, optionalTarget = new THREE.Vector3()) {
        const point = optionalTarget;
        const u = t * Math.PI * 2;
        const x = Math.cos(u) * 1.45 * this.scale;
        const y = Math.sin(2 * u) * 0.95 * this.scale;
        const z = Math.cos(3 * u) * 0.75 * this.scale;
        return point.set(x, y, z);
      }
    }

    const secondaryPath = new SecondaryFinCurve(0.85);
    const secondaryGeometry = new THREE.TubeGeometry(
      secondaryPath,
      isMobile ? 70 : 120,
      0.14,
      isMobile ? 16 : 24,
      true
    );

    // Tertiary Accent Filament
    const accentPath = new ArchitecturalSculptureCurve(1.08);
    const accentGeometry = new THREE.TubeGeometry(
      accentPath,
      isMobile ? 60 : 90,
      0.02,
      8,
      true
    );

    // ==========================================
    // 2. OBSIDIAN TITANIUM & AMBER GOLD MATERIALS
    // ==========================================
    const primaryMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#0F172A"),
      emissive: new THREE.Color("#020617"),
      roughness: 0.32,
      metalness: 0.9,
      clearcoat: 0.65,
      clearcoatRoughness: 0.25,
      reflectivity: 0.9,
      ior: 1.45,
      sheen: 0.5,
      sheenRoughness: 0.3,
      sheenColor: new THREE.Color("#F59E0B"),
    });

    const secondaryMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#1E293B"),
      emissive: new THREE.Color("#0A0A0C"),
      roughness: 0.28,
      metalness: 0.88,
      clearcoat: 0.7,
      clearcoatRoughness: 0.2,
      reflectivity: 0.92,
      sheen: 0.6,
      sheenColor: new THREE.Color("#FBBF24"),
    });

    const accentMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#F59E0B"),
      emissive: new THREE.Color("#78350F"),
      roughness: 0.2,
      metalness: 0.95,
      clearcoat: 0.85,
    });

    const primaryMesh = new THREE.Mesh(primaryGeometry, primaryMaterial);
    const secondaryMesh = new THREE.Mesh(secondaryGeometry, secondaryMaterial);
    const accentMesh = new THREE.Mesh(accentGeometry, accentMaterial);

    sculptureGroup.add(primaryMesh);
    sculptureGroup.add(secondaryMesh);
    sculptureGroup.add(accentMesh);

    sculptureGroup.rotation.set(0.4, 0.6, 0.2);

    // ==========================================
    // 3. CINEMATIC STUDIO LIGHTING
    // ==========================================
    const ambientLight = new THREE.AmbientLight(new THREE.Color("#0F172A"), 2.4);
    scene.add(ambientLight);

    const keyGoldLight = new THREE.DirectionalLight(new THREE.Color("#F59E0B"), 3.4);
    keyGoldLight.position.set(4.5, 5.0, 4.0);
    scene.add(keyGoldLight);

    const fillLight = new THREE.DirectionalLight(new THREE.Color("#60A5FA"), 1.6);
    fillLight.position.set(-4.0, -3.5, 2.5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(new THREE.Color("#FBBF24"), 2.4);
    rimLight.position.set(-1.0, 4.5, -4.5);
    scene.add(rimLight);

    const cursorLight = new THREE.PointLight(new THREE.Color("#FDE68A"), 1.6, 10);
    cursorLight.position.set(0, 0, 4);
    scene.add(cursorLight);

    // ==========================================
    // 4. ATMOSPHERIC PARTICLES
    // ==========================================
    const particleCount = isMobile ? 16 : 28;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 8.5;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 7.5;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 5.5;
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: new THREE.Color("#F59E0B"),
      size: 0.035,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // ==========================================
    // 5. MOUSE & RESIZE HANDLING
    // ==========================================
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || 400;
      const newHeight = container.clientHeight || 400;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize);

    setIsLoaded(true);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;

        sculptureGroup.rotation.y += delta * 0.22;
        sculptureGroup.rotation.x = 0.4 + Math.sin(elapsedTime * 0.5) * 0.1 + mouse.y * 0.2;
        sculptureGroup.rotation.z = 0.2 + mouse.x * 0.2;

        cursorLight.position.x = mouse.x * 3;
        cursorLight.position.y = mouse.y * 3;

        particles.rotation.y = elapsedTime * 0.03;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      primaryGeometry.dispose();
      secondaryGeometry.dispose();
      accentGeometry.dispose();
      particleGeometry.dispose();

      primaryMaterial.dispose();
      secondaryMaterial.dispose();
      accentMaterial.dispose();
      particleMaterial.dispose();

      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };
  }, [isHeroBackground, mode]);

  return (
    <div
      ref={containerRef}
      className={`relative select-none transition-opacity duration-1000 ${
        isLoaded ? "opacity-100" : "opacity-0"
      } ${className}`}
      aria-hidden="true"
    >
      {!webGlSupported && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 rounded-full border border-amber-500/20 bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
            <div
              className="w-44 h-44 rounded-full border border-amber-400/30 border-dashed animate-spin"
              style={{ animationDuration: "24s" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
