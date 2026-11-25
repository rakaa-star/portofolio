"use client";

import React, { useRef, useState } from "react";

interface GlareCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  dataAos?: string;
  dataAosDelay?: number;
  dataCursor?: string;
}

export default function GlareCard({
  children,
  className = "",
  onClick,
  style = {},
  dataAos,
  dataAosDelay,
  dataCursor,
}: GlareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-aos={dataAos}
      data-aos-delay={dataAosDelay}
      data-cursor={dataCursor}
      style={{
        ...style,
        transform: isHovered ? "translateY(-3px)" : "translateY(0px)",
        boxShadow: isHovered
          ? "0 24px 48px -12px rgba(0, 0, 0, 0.85), 0 0 24px rgba(245, 158, 11, 0.06)"
          : "0 8px 24px -10px rgba(0, 0, 0, 0.5)",
        transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease",
      }}
      className={`relative group rounded-2xl bg-[#0c0c0e]/95 backdrop-blur-md border border-white/[0.08] hover:border-amber-400/25 overflow-hidden ${className}`}
    >
      {/* 1. Dynamic Mouse-Follow Glare Border Light */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.18), rgba(245, 158, 11, 0.25) 35%, transparent 70%)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />

      {/* 2. Top Edge Subtle Hairline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent group-hover:via-amber-400/30 transition-all duration-500 z-20"
      />

      {/* 2. Soft Cursor Surface Shimmer */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.035), rgba(245, 158, 11, 0.02) 40%, transparent 75%)`,
        }}
      />

      {/* 3. Card Inner Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
}
