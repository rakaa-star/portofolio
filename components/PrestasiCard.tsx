"use client";

import React from "react";
import Image from "next/image";
import { AchievementItemTranslation } from "@/lib/translations";
import SpotlightCard from "@/components/SpotlightCard";

interface PrestasiCardProps {
  item: AchievementItemTranslation;
  index: number;
  onOpen: (item: AchievementItemTranslation) => void;
  inspectLabel: string;
}

export default function PrestasiCard({
  item,
  index,
  onOpen,
  inspectLabel,
}: PrestasiCardProps) {
  return (
    <div
      onClick={() => onOpen(item)}
      className="cursor-pointer h-full"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(item);
        }
      }}
    >
      <SpotlightCard className="h-full">
        {/* ===================================================================== */}
        {/* TOP HALF: IMAGE CONTAINER (Strict 16:9, Perfectly Flush With Edges)   */}
        {/* ===================================================================== */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-950 border-b border-white/[0.08]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover object-top grayscale-[20%] opacity-90 brightness-95 group-hover:grayscale-0 group-hover:opacity-100 group-hover:brightness-100 group-hover:scale-[1.03] transition-all duration-500 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          />

          {/* Floating Category Badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono font-medium border border-amber-400/25 bg-black/85 text-amber-400 backdrop-blur-md shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              {item.badge}
            </span>
          </div>

          {/* Year Label */}
          <div className="absolute top-3 right-3 z-10">
            <span className="font-mono text-[10px] font-medium text-zinc-300 px-2 py-0.5 rounded-md bg-black/85 border border-white/15 backdrop-blur-md">
              {item.year}
            </span>
          </div>

          {/* Hover Inspect Indicator */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 backdrop-blur-[2px]">
            <span className="px-3.5 py-1.5 rounded-full bg-amber-400 text-zinc-950 font-semibold text-xs shadow-xl flex items-center gap-2 font-sans scale-95 group-hover:scale-100 transition-transform duration-300">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <span>{inspectLabel}</span>
            </span>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* BOTTOM HALF: CONTENT AREA (Generous p-6, Strict Typography & Uniform)  */}
        {/* ===================================================================== */}
        <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
          <div className="space-y-2.5">
            {/* Meta Issuer & Date */}
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-amber-400 font-medium truncate max-w-[200px] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 shrink-0" />
                {item.issuer}
              </span>
              <span className="text-[11px] shrink-0 text-zinc-500">
                {item.date}
              </span>
            </div>

            {/* Title: Crisp, White, Bold Typography */}
            <h3 className="text-lg font-semibold tracking-tight text-white group-hover:text-amber-400 transition-colors duration-200 line-clamp-1">
              {item.title}
            </h3>

            {/* Description: Exactly 2 Lines Uniform Limit */}
            <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2 font-normal">
              {item.description}
            </p>
          </div>

          {/* Footer: Tech/Highlight Pills & Action Prompt */}
          <div className="space-y-4 pt-1">
            {/* Pills: Tiny text-xs, rounded-md, bg-white/3, 1px border */}
            <div className="flex flex-wrap gap-1.5 items-center">
              {item.highlights.slice(0, 2).map((tag, i) => (
                <span
                  key={i}
                  className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.08] text-zinc-300 group-hover:border-amber-400/20 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Action Bar */}
            <div className="pt-3.5 border-t border-white/[0.07] flex items-center justify-between text-xs">
              <span className="text-[11px] font-mono text-zinc-500">
                Verified Credential
              </span>

              <span className="inline-flex items-center gap-1.5 font-medium text-amber-400 group-hover:text-amber-300 transition-colors">
                <span>Detail</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </span>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
}
