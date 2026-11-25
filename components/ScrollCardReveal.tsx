"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollCardRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  rotation?: number;
}

export default function ScrollCardReveal({
  children,
  className = "",
  delay = 0,
  duration = 850,
  rotation = 1.2,
}: ScrollCardRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translate3d(0, 0, 0) scale(1) rotate(0deg)"
          : `translate3d(0, 36px, 0) scale(0.96) rotate(${rotation}deg)`,
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: "transform, opacity",
      }}
      className={className}
    >
      {children}
    </div>
  );
}
