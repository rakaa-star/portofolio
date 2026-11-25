"use client";

import React, { useEffect, useState } from "react";
import LivingCanvas from "@/components/LivingCanvas";

export default function InteractiveBackground() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0A0A0C]"
      aria-hidden="true"
    >
      {/* 1. Scroll-Driven Immersive 3D WebGL Background (R3F + GSAP ScrollTrigger) */}
      <LivingCanvas />

      {/* 2. Micro Dot Grid Texture (Minimalist Dark Architectural Grid) */}
      <div
        className="absolute inset-0 opacity-[0.022] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.7) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* 3. Interactive Cursor Spotlight (Deep Indigo + Subtle Gold Luster) */}
      {mounted && (
        <div
          className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `
              radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, rgba(245, 158, 11, 0.035), transparent 60%),
              radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.025), transparent 50%)
            `,
          }}
        />
      )}

      {/* 4. Sleek Ambient Lighting Gradients (Obsidian / Midnight Atmosphere) */}
      <div className="absolute -top-32 -left-32 w-[650px] h-[650px] bg-cyan-950/[0.06] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] bg-amber-500/[0.04] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute -bottom-32 left-1/3 w-[700px] h-[700px] bg-slate-900/[0.08] rounded-full blur-[200px] pointer-events-none" />
    </div>
  );
}
