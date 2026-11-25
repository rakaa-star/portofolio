"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";

interface TechNode {
  name: string;
  category: "frontend" | "backend" | "database" | "design" | "tools";
  symbol: string;
  angle: number;
  radius: number;
  height: number;
  speed: number;
}

const NODES_DATA: TechNode[] = [
  { name: "React.js", category: "frontend", symbol: "⚛", angle: 0, radius: 2.3, height: 0.5, speed: 0.007 },
  { name: "Next.js", category: "frontend", symbol: "▲", angle: (Math.PI * 2) / 7, radius: 2.5, height: -0.4, speed: 0.006 },
  { name: "TypeScript", category: "frontend", symbol: "TS", angle: (Math.PI * 4) / 7, radius: 2.2, height: 0.8, speed: 0.008 },
  { name: "Tailwind CSS", category: "frontend", symbol: "≈", angle: (Math.PI * 6) / 7, radius: 2.4, height: -0.7, speed: 0.007 },
  { name: "Laravel", category: "backend", symbol: "⬡", angle: (Math.PI * 8) / 7, radius: 2.6, height: 0.3, speed: 0.005 },
  { name: "Supabase", category: "database", symbol: "⚡", angle: (Math.PI * 10) / 7, radius: 2.3, height: -0.5, speed: 0.006 },
  { name: "Figma", category: "design", symbol: "❖", angle: (Math.PI * 12) / 7, radius: 2.5, height: 0.6, speed: 0.007 },
];

interface TechStack3DViewerProps {
  activeCategory: string;
  hoveredTech: string | null;
  onSelectTech?: (name: string) => void;
}

export default function TechStack3DViewer({
  activeCategory,
  hoveredTech,
  onSelectTech,
}: TechStack3DViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNodeName, setActiveNodeName] = useState<string>("Torus Architecture");
  const [nodeCoords, setNodeCoords] = useState<{ name: string; symbol: string; category: string; x: number; y: number; isVisible: boolean }[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    const width = container.clientWidth || 450;
    const height = container.clientHeight || 550;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.8);

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    container.appendChild(renderer.domElement);

    // Root Master Group
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 1. Core Gold / Titanium Procedural Sculpture (Preserved & Enhanced Gold Torus Knot)
    const sculptureGroup = new THREE.Group();
    masterGroup.add(sculptureGroup);

    const knotGeometry = new THREE.TorusKnotGeometry(1.25, 0.36, 180, 32, 2, 3);
    const wireKnotGeometry = new THREE.TorusKnotGeometry(1.256, 0.362, 54, 16, 2, 3);
    const wireGeo = new THREE.WireframeGeometry(wireKnotGeometry);
    const innerRibbonGeo = new THREE.TorusKnotGeometry(1.25, 0.045, 140, 16, 2, 3);

    // Rich antique gold & titanium physical materials
    const goldPhysicalMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#d97706"),
      emissive: new THREE.Color("#78350f"),
      emissiveIntensity: 0.12,
      roughness: 0.18,
      metalness: 0.92,
      clearcoat: 0.9,
      clearcoatRoughness: 0.15,
      reflectivity: 0.95,
      sheen: 0.6,
      sheenColor: new THREE.Color("#fef3c7"),
    });

    const wireMat = new THREE.LineBasicMaterial({
      color: new THREE.Color("#f59e0b"),
      transparent: true,
      opacity: 0.28,
    });

    const coreGoldMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#fbbf24"),
      emissive: new THREE.Color("#f59e0b"),
      emissiveIntensity: 0.85,
      roughness: 0.25,
      metalness: 0.8,
    });

    const mainMesh = new THREE.Mesh(knotGeometry, goldPhysicalMat);
    const wireMesh = new THREE.LineSegments(wireGeo, wireMat);
    const innerRibbonMesh = new THREE.Mesh(innerRibbonGeo, coreGoldMat);

    sculptureGroup.add(mainMesh);
    sculptureGroup.add(wireMesh);
    sculptureGroup.add(innerRibbonMesh);

    // 2. Technical Orbital Rings (Thin Engineering Latitudinal Latitude Rings)
    const ringGroup = new THREE.Group();
    masterGroup.add(ringGroup);

    const ringMat1 = new THREE.LineBasicMaterial({ color: new THREE.Color("#f59e0b"), transparent: true, opacity: 0.18 });
    const ringMat2 = new THREE.LineBasicMaterial({ color: new THREE.Color("#ffffff"), transparent: true, opacity: 0.08 });

    const createRing = (radius: number, mat: THREE.LineBasicMaterial, tiltX = 0, tiltY = 0) => {
      const ringGeo = new THREE.BufferGeometry();
      const segments = 64;
      const points: THREE.Vector3[] = [];
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
      }
      ringGeo.setFromPoints(points);
      const ring = new THREE.Line(ringGeo, mat);
      ring.rotation.x = tiltX;
      ring.rotation.y = tiltY;
      return ring;
    };

    const orbit1 = createRing(2.35, ringMat1, 0.35, 0.2);
    const orbit2 = createRing(2.55, ringMat2, -0.4, 0.5);
    const orbit3 = createRing(2.15, ringMat1, 0.8, -0.3);
    ringGroup.add(orbit1);
    ringGroup.add(orbit2);
    ringGroup.add(orbit3);

    // 3. Cinematic Studio Lighting
    const ambientLight = new THREE.AmbientLight(new THREE.Color("#18181b"), 1.8);
    scene.add(ambientLight);

    const keyGold = new THREE.DirectionalLight(new THREE.Color("#f59e0b"), 3.2);
    keyGold.position.set(4, 5, 4);
    scene.add(keyGold);

    const fillCool = new THREE.DirectionalLight(new THREE.Color("#94a3b8"), 1.2);
    fillCool.position.set(-4, -3, 3);
    scene.add(fillCool);

    const rimGold = new THREE.DirectionalLight(new THREE.Color("#fde68a"), 2.2);
    rimGold.position.set(0, 4, -4);
    scene.add(rimGold);

    const centerPoint = new THREE.PointLight(new THREE.Color("#f59e0b"), 1.8, 8);
    centerPoint.position.set(0, 0, 1.5);
    scene.add(centerPoint);

    // 4. Subtle Ambient Stardust Nodes
    const particleCount = 24;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 6.5;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 5.5;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 4.5;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: new THREE.Color("#f59e0b"),
      size: 0.04,
      transparent: true,
      opacity: 0.45,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Dynamic 3D Spheres for Interactive Tech Nodes in Scene
    const nodeSpheresGroup = new THREE.Group();
    masterGroup.add(nodeSpheresGroup);

    const nodeSpheres: { mesh: THREE.Mesh; line: THREE.Line; data: TechNode; currentAngle: number }[] = [];
    const sphereGeo = new THREE.SphereGeometry(0.065, 16, 16);

    NODES_DATA.forEach((node) => {
      const isMatch = activeCategory === "all" || node.category === activeCategory;
      const sphereMat = new THREE.MeshStandardMaterial({
        color: isMatch ? new THREE.Color("#fbbf24") : new THREE.Color("#71717a"),
        emissive: isMatch ? new THREE.Color("#f59e0b") : new THREE.Color("#27272a"),
        emissiveIntensity: isMatch ? 0.9 : 0.2,
        roughness: 0.2,
        metalness: 0.8,
      });

      const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);

      // Connecting line from center to node
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 0),
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: new THREE.Color("#f59e0b"),
        transparent: true,
        opacity: 0.15,
      });
      const connLine = new THREE.Line(lineGeo, lineMat);

      nodeSpheresGroup.add(sphereMesh);
      nodeSpheresGroup.add(connLine);

      nodeSpheres.push({
        mesh: sphereMesh,
        line: connLine,
        data: node,
        currentAngle: node.angle,
      });
    });

    // Mouse Parallax & Interaction
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = x;
      mouse.targetY = y;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Resize Handler
    const onResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 450;
      const newH = container.clientHeight || 550;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", onResize);

    // Animation Loop
    let animationId: number;
    let clock = new THREE.Clock();

    const tempV = new THREE.Vector3();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth mouse damping
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Gentle continuous rotation & breathing
      sculptureGroup.rotation.x = time * 0.15 + mouse.y * 0.35;
      sculptureGroup.rotation.y = time * 0.22 + mouse.x * 0.45;
      sculptureGroup.position.y = Math.sin(time * 0.8) * 0.08;

      ringGroup.rotation.x = time * 0.08;
      ringGroup.rotation.y = -time * 0.12;

      // Update Node Positions & Projection to Screen Coordinates
      const screenNodes: { name: string; symbol: string; category: string; x: number; y: number; isVisible: boolean }[] = [];

      nodeSpheres.forEach((item) => {
        item.currentAngle += item.data.speed;
        const x = Math.cos(item.currentAngle) * item.data.radius;
        const z = Math.sin(item.currentAngle) * item.data.radius;
        const y = item.data.height + Math.sin(time * 1.2 + item.currentAngle) * 0.12;

        item.mesh.position.set(x, y, z);

        // Update connecting line geometry
        const linePos = item.line.geometry.attributes.position as THREE.BufferAttribute;
        linePos.setXYZ(0, 0, 0, 0);
        linePos.setXYZ(1, x * 0.7, y * 0.7, z * 0.7);
        linePos.needsUpdate = true;

        // Screen projection
        item.mesh.getWorldPosition(tempV);
        tempV.project(camera);

        const isVisible = tempV.z < 1;
        const screenX = ((tempV.x + 1) * width) / 2;
        const screenY = ((-tempV.y + 1) * height) / 2;

        screenNodes.push({
          name: item.data.name,
          symbol: item.data.symbol,
          category: item.data.category,
          x: screenX,
          y: screenY,
          isVisible,
        });
      });

      setNodeCoords(screenNodes);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      knotGeometry.dispose();
      wireKnotGeometry.dispose();
      goldPhysicalMat.dispose();
      wireMat.dispose();
      coreGoldMat.dispose();
    };
  }, [activeCategory]);

  return (
    <div className="relative w-full h-[460px] sm:h-[540px] lg:h-[580px] rounded-2xl bg-gradient-to-b from-[#0c0c0e]/95 via-[#0c0c0e]/80 to-[#08080a]/95 border border-white/[0.08] overflow-hidden flex items-center justify-center select-none group">
      {/* Top Hairline Accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent z-20"
      />

      {/* Grid Pattern Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:20px_20px] opacity-70"
      />

      {/* Ambient Gold Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute w-72 h-72 rounded-full bg-amber-500/[0.07] blur-3xl"
      />

      {/* Top Header Technical Badge */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-black/60 border border-white/10 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300/90 font-medium">
            3D Geometric Core
          </span>
        </div>

        <span className="text-[10px] font-mono text-zinc-500 bg-black/40 px-2 py-0.5 rounded border border-white/5">
          WebGL ACES • 60 FPS
        </span>
      </div>

      {/* 3D Canvas Mount Point */}
      <div ref={containerRef} className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing" />

      {/* Overlay HTML Interactive Technology Nodes */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
        {nodeCoords.map((node, i) => {
          const isHighlighted =
            (activeCategory === "all" || node.category === activeCategory) &&
            (!hoveredTech || hoveredTech.toLowerCase() === node.name.toLowerCase());

          return (
            <div
              key={i}
              style={{
                transform: `translate3d(${node.x}px, ${node.y}px, 0) translate(-50%, -50%)`,
                opacity: node.isVisible ? (isHighlighted ? 1 : 0.3) : 0,
                transition: "opacity 0.25s ease-out",
              }}
              className="absolute pointer-events-auto"
            >
              <button
                type="button"
                onClick={() => onSelectTech?.(node.name)}
                className={`group/node flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-mono tracking-tight transition-all duration-300 cursor-pointer backdrop-blur-md border ${
                  isHighlighted
                    ? "bg-black/85 text-amber-300 border-amber-400/40 shadow-[0_0_12px_rgba(245,158,11,0.25)] scale-105"
                    : "bg-black/60 text-zinc-400 border-white/10 hover:border-white/20"
                }`}
              >
                <span className="text-amber-400 font-semibold">{node.symbol}</span>
                <span className="hidden sm:inline font-medium">{node.name}</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Bottom Architectural Metadata Panel */}
      <div className="absolute bottom-4 inset-x-4 z-20 pointer-events-none">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <div>
              <p className="text-[11px] font-mono text-white font-medium">
                Autonomous Architecture Visualizer
              </p>
              <p className="text-[10px] font-mono text-zinc-500">
                Toroidal Topology • Real-time Node Synchronization
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto text-[10px] font-mono text-amber-400/90">
            <span className="px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">
              Interactive View
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
