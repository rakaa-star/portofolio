"use client";

import React, { useEffect, useRef, useState } from "react";
import { ExperienceItem, EDUCATION_TIMELINE, EducationItem } from "@/lib/data";
import SpotlightCard from "@/components/SpotlightCard";

interface ExperienceTimelineProps {
  items: ExperienceItem[];
  lang?: "id" | "en";
}

type TimelineFilter = "all" | "experience" | "education";

interface UnifiedTimelineNode {
  id: string;
  category: "experience" | "education";
  period: string;
  roleOrTitle: string;
  organization: string;
  description: string[];
  tech?: string[];
  badge: string;
}

export default function ExperienceTimeline({
  items,
  lang = "id",
}: ExperienceTimelineProps) {
  const [activeFilter, setActiveFilter] = useState<TimelineFilter>("all");
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Normalize data into a unified, rich timeline format
  const unifiedData: UnifiedTimelineNode[] = React.useMemo(() => {
    const expNodes: UnifiedTimelineNode[] = items.map((exp, i) => ({
      id: `exp-${i}`,
      category: "experience",
      period: exp.period,
      roleOrTitle: exp.role,
      organization: exp.company,
      description: exp.description,
      tech: exp.tech,
      badge: lang === "id" ? "Pengalaman Kerja" : "Professional Work",
    }));

    const eduNodes: UnifiedTimelineNode[] = EDUCATION_TIMELINE.map((edu, i) => ({
      id: `edu-${i}`,
      category: "education",
      period: edu.period,
      roleOrTitle: edu.title,
      organization: edu.institution,
      description: [edu.description],
      tech:
        edu.type === "Certification"
          ? ["Cloud", "AI-900", "Fundamentals"]
          : edu.type === "Achievement"
          ? ["Inovasi", "UI/UX", "SIJA"]
          : ["Software Engineering", "Web Dev", "Networking"],
      badge:
        edu.type === "Education"
          ? lang === "id"
            ? "Pendidikan Formal"
            : "Formal Education"
          : edu.type === "Certification"
          ? "Sertifikasi Resmi"
          : "Prestasi Akademik",
    }));

    // Interleave or stack based on chronological order
    return [...expNodes, ...eduNodes];
  }, [items, lang]);

  const filteredNodes = React.useMemo(() => {
    if (activeFilter === "experience") {
      return unifiedData.filter((n) => n.category === "experience");
    }
    if (activeFilter === "education") {
      return unifiedData.filter((n) => n.category === "education");
    }
    return unifiedData;
  }, [unifiedData, activeFilter]);

  // Observer to trigger glowing active state as nodes scroll into viewport
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    // Reset active indices on filter change
    setActiveIndices([0]);

    itemRefs.current.forEach((el, index) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndices((prev) =>
              prev.includes(index) ? prev : [...prev, index]
            );
          }
        },
        {
          threshold: 0.25,
          rootMargin: "0px 0px -15% 0px",
        }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [filteredNodes]);

  return (
    <div ref={containerRef} className="relative w-full space-y-12">
      {/* 1. FILTER TABS: Interactive Mode Switcher */}
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        <button
          type="button"
          onClick={() => setActiveFilter("all")}
          className={`px-5 py-2 rounded-full text-xs font-mono font-medium transition-all duration-300 cursor-pointer ${
            activeFilter === "all"
              ? "bg-amber-500 text-zinc-950 font-bold shadow-lg shadow-amber-500/25 scale-102"
              : "bg-white/5 text-zinc-400 hover:text-white border border-white/10 hover:border-white/20"
          }`}
        >
          {lang === "id" ? "Semua Jejak Rekam" : "All Milestones"} ({unifiedData.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter("experience")}
          className={`px-5 py-2 rounded-full text-xs font-mono font-medium transition-all duration-300 cursor-pointer ${
            activeFilter === "experience"
              ? "bg-amber-500 text-zinc-950 font-bold shadow-lg shadow-amber-500/25 scale-102"
              : "bg-white/5 text-zinc-400 hover:text-white border border-white/10 hover:border-white/20"
          }`}
        >
          {lang === "id" ? "Pengalaman Kerja" : "Work Experience"} (
          {unifiedData.filter((n) => n.category === "experience").length})
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter("education")}
          className={`px-5 py-2 rounded-full text-xs font-mono font-medium transition-all duration-300 cursor-pointer ${
            activeFilter === "education"
              ? "bg-amber-500 text-zinc-950 font-bold shadow-lg shadow-amber-500/25 scale-102"
              : "bg-white/5 text-zinc-400 hover:text-white border border-white/10 hover:border-white/20"
          }`}
        >
          {lang === "id" ? "Pendidikan & Sertifikasi" : "Education & Credentials"} (
          {unifiedData.filter((n) => n.category === "education").length})
        </button>
      </div>

      {/* 2. THE VERTICAL TIMELINE CONTAINER */}
      <div className="relative w-full max-w-5xl mx-auto pt-4 pb-10">
        {/* Subtle Glowing Center / Left Spine Line */}
        <div
          aria-hidden="true"
          className="absolute left-6 md:left-1/2 top-4 bottom-8 w-[2px] -translate-x-1/2 bg-gradient-to-b from-amber-500/80 via-amber-500/40 to-white/10 shadow-[0_0_16px_rgba(245,158,11,0.4)] pointer-events-none"
        />

        <div className="space-y-12 sm:space-y-16">
          {filteredNodes.map((node, idx) => {
            const isActive = activeIndices.includes(idx);
            const isEven = idx % 2 === 0;

            return (
              <div
                key={node.id}
                ref={(el) => {
                  itemRefs.current[idx] = el;
                }}
                className="relative grid grid-cols-1 md:grid-cols-12 items-center gap-6 md:gap-12 group"
              >
                {/* ================================================================= */}
                {/* TIMELINE NODE INDICATOR (Glows with #F59E0B on Scroll Activation) */}
                {/* ================================================================= */}
                <div
                  className={`absolute left-6 md:left-1/2 top-8 md:top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center transition-all duration-500 ${
                    isActive ? "scale-100 opacity-100" : "scale-75 opacity-40 group-hover:opacity-80"
                  }`}
                >
                  {/* Outer Pulsing Glow Ring */}
                  <div
                    className={`absolute -inset-2 rounded-full transition-all duration-700 pointer-events-none ${
                      isActive
                        ? "bg-amber-500/25 blur-sm scale-110 animate-pulse"
                        : "opacity-0"
                    }`}
                  />

                  {/* Core Node Circle */}
                  <div
                    className={`w-6 h-6 rounded-full border-2 transition-all duration-500 flex items-center justify-center ${
                      isActive
                        ? "bg-zinc-950 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.9)]"
                        : "bg-zinc-950 border-white/20"
                    }`}
                  >
                    <div
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                        isActive
                          ? "bg-amber-400 shadow-[0_0_8px_#f59e0b] scale-100"
                          : "bg-white/30 scale-75"
                      }`}
                    />
                  </div>
                </div>

                {/* ================================================================= */}
                {/* DATE / YEAR SIDE (Clean Typography Highlighted on One Side)       */}
                {/* ================================================================= */}
                <div
                  className={`pl-16 md:pl-0 md:col-span-5 ${
                    isEven
                      ? "md:text-right md:order-1"
                      : "md:order-2 md:col-start-7 md:text-left"
                  }`}
                >
                  <div
                    style={{
                      transform: isActive
                        ? "translate3d(0, 0, 0)"
                        : isEven
                        ? "translate3d(-20px, 0, 0)"
                        : "translate3d(20px, 0, 0)",
                      opacity: isActive ? 1 : 0,
                      transition:
                        "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                    className="space-y-2"
                  >
                    {/* Badge */}
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-medium uppercase border ${
                        isActive
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-sm shadow-amber-500/10"
                          : "bg-white/5 text-zinc-400 border-white/10"
                      }`}
                    >
                      <span>{node.badge}</span>
                      <span className="text-zinc-600">•</span>
                      <span>#{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span>
                    </div>

                    {/* Big Highlighted Year / Period Display */}
                    <h4 className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight group-hover:text-amber-400 transition-colors">
                      {node.period}
                    </h4>

                    <p className="text-xs font-mono text-zinc-500 font-normal">
                      {node.organization}
                    </p>
                  </div>
                </div>

                {/* ================================================================= */}
                {/* CONTENT CARD SIDE (Role + Organization + Muted Description)       */}
                {/* ================================================================= */}
                <div
                  className={`pl-16 md:pl-0 md:col-span-6 ${
                    isEven
                      ? "md:order-2 md:col-start-7"
                      : "md:order-1 md:col-start-1"
                  }`}
                >
                  <div
                    style={{
                      transform: isActive
                        ? "translate3d(0, 0, 0) scale(1)"
                        : "translate3d(0, 24px, 0) scale(0.96)",
                      opacity: isActive ? 1 : 0,
                      transition:
                        "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 80ms, opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 80ms",
                    }}
                  >
                    <SpotlightCard className="p-6 sm:p-8">
                      <div className="space-y-4">
                        {/* Role & Company Header */}
                        <div className="space-y-2 border-b border-white/[0.07] pb-4">
                          <div className="flex items-center justify-between gap-3">
                            <h3 className="text-lg sm:text-xl font-sans font-bold text-white tracking-tight leading-snug group-hover:text-amber-400 transition-colors duration-200">
                              {node.roleOrTitle}
                            </h3>
                            <span className="hidden sm:inline-block font-mono text-[11px] text-zinc-400 bg-white/[0.04] border border-white/[0.08] px-2.5 py-0.5 rounded shrink-0">
                              {node.period}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-sm font-medium text-amber-400/90">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                            <span>{node.organization}</span>
                          </div>
                        </div>

                        {/* Description with refined bullet points */}
                        <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                          {node.description.map((desc, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400/60 mt-2 shrink-0" />
                              <span className="text-zinc-300 leading-relaxed">{desc}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Tech Stack Pills at Bottom */}
                        {node.tech && node.tech.length > 0 && (
                          <div className="pt-4 border-t border-white/[0.07] flex flex-wrap gap-1.5">
                            {node.tech.map((t, tIdx) => (
                              <span
                                key={tIdx}
                                className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.08] text-zinc-300 group-hover:border-amber-400/20 transition-colors"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </SpotlightCard>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
