"use client";

import React, { useEffect, useRef, useState } from "react";

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "div" | "span";
}

export default function TextReveal({
  children,
  className = "",
  delay = 0,
  duration = 800,
  as: Component = "div",
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={containerRef as any}
      className={`overflow-hidden block ${className}`}
    >
      <span
        style={{
          transform: isRevealed ? "translate3d(0, 0%, 0)" : "translate3d(0, 115%, 0)",
          transition: `transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
          willChange: "transform",
        }}
        className="block"
      >
        {children}
      </span>
    </Component>
  );
}
