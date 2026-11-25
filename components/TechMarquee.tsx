"use client";

import React from "react";
import { TECH_STACK } from "@/lib/data";

export default function TechMarquee() {
  return (
    <section className="relative z-10 py-8 border-y border-white/[0.06] bg-white/[0.015] overflow-hidden backdrop-blur-xs">
      <div className="max-w-7xl mx-auto px-6 mb-4" data-aos="fade-up">
        <p className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-slate-400 font-semibold text-center md:text-left flex items-center gap-2 justify-center md:justify-start">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span>Core Engineering & Design Ecosystem</span>
        </p>
      </div>

      <div className="relative w-full overflow-hidden" data-aos="fade-up" data-aos-delay="80">
        {/* Obsidian side gradient fades */}
        <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-[#0A0A0C] via-[#0A0A0C]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-[#0A0A0C] via-[#0A0A0C]/80 to-transparent z-10 pointer-events-none" />

        <div className="flex gap-4 animate-marquee whitespace-nowrap py-1">
          {[...TECH_STACK, ...TECH_STACK].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 px-4.5 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md transition-all duration-300 hover:border-amber-400/50 hover:bg-white/[0.06] hover:scale-105 cursor-default group shrink-0"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400/50 group-hover:bg-amber-400 transition-colors shadow-xs" />
              <span className="font-sans font-medium text-xs sm:text-sm tracking-wide text-slate-200 group-hover:text-white transition-colors">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
