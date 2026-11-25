"use client";

import React from "react";
import Image from "next/image";
import { ProjectItem } from "@/lib/data";
import { useLanguage } from "@/lib/languageContext";
import SpotlightCard from "@/components/SpotlightCard";

interface ProjectCardProps {
  proj: ProjectItem & { image?: string };
  idx: number;
}

export default function ProjectCard({ proj, idx }: ProjectCardProps) {
  const { t } = useLanguage();
  const projectNumber = idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`;

  return (
    <SpotlightCard className="h-full">
      {/* ===================================================================== */}
      {/* TOP HALF: IMAGE CONTAINER (Strict 16:9, Perfectly Flush With Edges)   */}
      {/* ===================================================================== */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-950 border-b border-white/[0.08]">
        {proj.image ? (
          <Image
            src={proj.image}
            alt={proj.title}
            fill
            className="object-cover object-top grayscale-[20%] opacity-90 brightness-95 group-hover:grayscale-0 group-hover:opacity-100 group-hover:brightness-100 group-hover:scale-[1.03] transition-all duration-500 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          />
        ) : (
          /* High-Fidelity Flush Developer Canvas (Vercel / Linear Aesthetic) */
          <div className="relative w-full h-full bg-[#0a0a0c] flex flex-col justify-between p-4 sm:p-5 select-none overflow-hidden grayscale-[20%] opacity-90 brightness-95 group-hover:grayscale-0 group-hover:opacity-100 group-hover:brightness-100 group-hover:scale-[1.02] transition-all duration-500 ease-out">
            {/* Subtle Engineering Grid Background */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"
            />

            {/* Ambient Radial Accent */}
            <div
              aria-hidden="true"
              className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-amber-500/[0.08] blur-2xl pointer-events-none group-hover:bg-amber-500/[0.14] transition-all duration-500"
            />

            {/* Top Bar: Window Controls & Category */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-700/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-700/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-700/80" />
                <span className="text-[11px] font-mono text-zinc-500 ml-2">
                  src/{proj.category.toLowerCase().replace(/\s+/g, "-")}.tsx
                </span>
              </div>

              <span className="text-[10px] font-mono font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
                #{projectNumber}
              </span>
            </div>

            {/* Center: Live Architecture Preview Box */}
            <div className="z-10 rounded-xl bg-zinc-900/90 border border-white/10 p-3 shadow-xl backdrop-blur-md">
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-zinc-300 font-semibold">{proj.title}</span>
                </span>
                <span className="text-zinc-500 text-[10px]">v1.0.0</span>
              </div>

              {/* Progress Bar / Metric Line */}
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-2">
                <div
                  className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full transition-all duration-700 ease-out group-hover:w-full"
                  style={{ width: `${72 + (idx % 3) * 11}%` }}
                />
              </div>
            </div>

            {/* Bottom Meta Bar */}
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 z-10">
              <span>TypeScript • React 19</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Live Deployed
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ===================================================================== */}
      {/* BOTTOM HALF: CONTENT AREA (Generous p-6, Strict Typography & Uniform)  */}
      {/* ===================================================================== */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
        <div className="space-y-2.5">
          {/* Header Tag */}
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="uppercase tracking-wider text-[11px] text-amber-400 font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 shrink-0" />
              {proj.category}
            </span>
            <span className="text-[11px] text-zinc-500">Project {projectNumber}</span>
          </div>

          {/* Title: Crisp, White, Bold Typography */}
          <h3 className="text-lg font-semibold tracking-tight text-white group-hover:text-amber-400 transition-colors duration-200 line-clamp-1">
            {proj.title}
          </h3>

          {/* Description: Exactly 2 Lines Uniform Limit */}
          <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2 font-normal">
            {proj.description}
          </p>
        </div>

        {/* Footer: Tech Stack Pills & Action Links */}
        <div className="space-y-4 pt-1">
          {/* Tech Stack Pills: Tiny text-[11px], rounded-md, bg-white/3, 1px border */}
          <div className="flex flex-wrap gap-1.5 items-center">
            {proj.tech.map((techItem, i) => (
              <span
                key={i}
                className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.08] text-zinc-300 group-hover:border-amber-400/20 transition-colors"
              >
                {techItem}
              </span>
            ))}
          </div>

          {/* Action Links Bar */}
          <div className="pt-3.5 border-t border-white/[0.07] flex items-center justify-between text-xs">
            <a
              href={proj.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-amber-400 hover:text-amber-300 transition-colors group/link cursor-pointer"
            >
              <span>{t.projects.liveDemo}</span>
              <span className="group-hover/link:translate-x-1 transition-transform">
                →
              </span>
            </a>

            {proj.github && (
              <a
                href={proj.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <span>{t.projects.github}</span>
                <span className="text-amber-400">↗</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}
