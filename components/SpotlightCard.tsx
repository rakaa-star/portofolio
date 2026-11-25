"use client";

import React, { useRef, useState, useCallback } from "react";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  spotlightSize?: number;
}

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(245, 158, 11, 0.08)",
  spotlightSize = 460,
  ...props
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl border border-white/[0.08] bg-[#0c0c0e]/95 backdrop-blur-md overflow-hidden group transition-all duration-300 ease-out hover:border-amber-400/25 hover:-translate-y-1 hover:shadow-[0_16px_36px_-12px_rgba(0,0,0,0.8),0_0_24px_rgba(245,158,11,0.06)] ${className}`}
      {...props}
    >
      {/* 1. Subtle Radial Spotlight Glow following cursor */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
        style={{
          background: `radial-gradient(${spotlightSize}px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 65%)`,
        }}
      />

      {/* 2. Delicate Border Spotlight Highlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20"
        style={{
          background: `radial-gradient(280px circle at ${position.x}px ${position.y}px, rgba(245, 158, 11, 0.35), rgba(255, 255, 255, 0.15) 30%, transparent 65%)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />

      {/* 3. Top Edge Ambient Highlight (Ultra subtle hairline) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent group-hover:via-amber-400/30 transition-all duration-500 z-20"
      />

      {/* 4. Card Inner Structure */}
      <div className="relative z-0 w-full h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
}
