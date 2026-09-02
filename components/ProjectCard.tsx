"use client";

import React, { useState, useRef, useCallback } from "react";
import { ProjectItem } from "@/lib/data";
import { useLanguage } from "@/lib/languageContext";

interface ProjectCardProps {
  proj: ProjectItem;
  idx: number;
}

export default function ProjectCard({ proj, idx }: ProjectCardProps) {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Relative coordinates
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Smooth subtle tilt
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = -((y - centerY) / centerY) * 7;
    const tiltY = ((x - centerX) / centerX) * 7;
    setTilt({ x: tiltX, y: tiltY });
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-aos="fade-up"
      data-aos-delay={idx * 120}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) translateY(-6px) scale3d(1.015, 1.015, 1.015)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)",
        transition: isHovered
          ? "transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease"
          : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease",
        transformStyle: "preserve-3d",
      }}
      className="group relative flex flex-col justify-between h-full rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/90 hover:border-cyan-500/50 shadow-xl hover:shadow-[0_20px_50px_rgba(6,182,212,0.15)] overflow-hidden will-change-transform z-10"
    >
      {/* Dynamic Cursor Spotlight Radial Glow */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl -z-10"
        style={{
          background: isHovered
            ? `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.18), transparent 60%)`
            : "none",
        }}
      />

      {/* Top Banner & Mockup Container */}
      <div style={{ transform: "translateZ(24px)" }}>
        <div
          className={`relative h-56 w-full bg-gradient-to-tr ${proj.gradient} p-5 sm:p-6 flex flex-col justify-between overflow-hidden border-b border-white/10`}
        >
          {/* Subtle Ambient Grid Background Pattern */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />

          {/* Glowing blurred orbs */}
          <div className="absolute -right-12 -bottom-12 w-44 h-44 rounded-full bg-white/20 blur-2xl group-hover:scale-150 group-hover:opacity-80 transition-all duration-700 ease-out" />
          <div className="absolute -left-8 -top-8 w-32 h-32 rounded-full bg-black/30 blur-2xl group-hover:scale-125 transition-transform duration-700 ease-out" />

          {/* Window Header / Meta Info */}
          <div className="flex items-center justify-between z-10">
            {/* macOS-style Window Dots */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-rose-500/80" />
              <span className="w-2 h-2 rounded-full bg-amber-500/80" />
              <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
            </div>

            {/* Category Badge */}
            <span className="text-[11px] font-mono font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-cyan-300 border border-cyan-500/30 shadow-sm">
              {proj.category}
            </span>
          </div>

          {/* Project Title and Showcase Icon */}
          <div className="z-10 space-y-1">
            <span className="text-[11px] font-mono text-cyan-200/80 font-bold uppercase tracking-widest">
              Project #{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
            </span>
            <h3 className="text-white font-extrabold text-2xl tracking-tight leading-tight group-hover:text-cyan-100 transition-colors drop-shadow-md">
              {proj.title}
            </h3>
          </div>
        </div>

        {/* Description Body */}
        <div className="p-6 sm:p-7 space-y-4">
          <p className="text-slate-300 text-sm sm:text-[15px] leading-relaxed font-normal">
            {proj.description}
          </p>
        </div>
      </div>

      {/* Tech Stack Pills & Action Links */}
      <div
        className="p-6 sm:p-7 pt-0 space-y-6 mt-auto"
        style={{ transform: "translateZ(18px)" }}
      >
        {/* Tech Badges */}
        <div className="flex flex-wrap gap-2">
          {proj.tech.map((t, i) => (
            <span
              key={i}
              className="text-xs font-mono font-medium px-3 py-1 rounded-lg bg-slate-950/70 text-slate-300 border border-slate-800 group-hover:border-slate-700 transition-colors"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
          <a
            href={proj.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 px-4 py-2.5 rounded-xl shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-[1.03] active:scale-95 group/link cursor-pointer"
          >
            <span>{t.projects.liveDemo}</span>
            <svg
              className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>

          {proj.github && (
            <a
              href={proj.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white px-3.5 py-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 transition-all duration-300 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span>{t.projects.github}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
