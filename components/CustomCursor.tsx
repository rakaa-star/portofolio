"use client";

import React, { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverLabel, setHoverLabel] = useState("");
  const [isClicking, setIsClicking] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on desktop with fine pointer
    const isTouchDevice =
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;

    if (isTouchDevice) return;

    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Smooth trailing ring loop
    const animate = () => {
      const ease = 0.18;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(animate);
    };

    // Contextual Hover Detection
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveElem = target.closest(
        'a, button, input, textarea, [role="button"], [data-cursor]'
      ) as HTMLElement | null;

      if (interactiveElem) {
        setIsHovered(true);
        const customCursor = interactiveElem.getAttribute("data-cursor");
        if (customCursor) {
          setHoverLabel(customCursor);
        } else {
          setHoverLabel("");
        }
      } else {
        setIsHovered(false);
        setHoverLabel("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    animFrameId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isVisible]);

  if (!mounted) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* 1. Center Tiny Solid White Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white transition-[width,height,opacity] duration-200 ease-out will-change-transform pointer-events-none ${
          hoverLabel
            ? "w-1 h-1 opacity-0"
            : isHovered
            ? "w-1.5 h-1.5 opacity-90 shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            : "w-1.5 h-1.5 opacity-100 shadow-[0_0_6px_rgba(255,255,255,0.7)]"
        }`}
      />

      {/* 2. Trailing Sleek Amber/Gold Outer Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-400/80 flex items-center justify-center transition-[width,height,border-color,background-color] duration-300 ease-out will-change-transform pointer-events-none ${
          hoverLabel
            ? "w-14 h-14 bg-[#0A0A0C]/90 backdrop-blur-md border-amber-400 shadow-[0_0_24px_rgba(245,158,11,0.4)]"
            : isHovered
            ? "w-10 h-10 border-amber-400 bg-amber-400/10 shadow-[0_0_16px_rgba(245,158,11,0.2)]"
            : isClicking
            ? "w-6 h-6 border-amber-400 scale-90"
            : "w-8 h-8"
        }`}
      >
        {hoverLabel && (
          <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-amber-400 uppercase animate-fadeIn select-none">
            {hoverLabel}
          </span>
        )}
      </div>
    </div>
  );
}
