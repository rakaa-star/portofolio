import React from "react";
import { TECH_STACK } from "@/lib/data";

export default function TechMarquee() {
  return (
    <section className="relative z-10 py-12 border-y border-slate-800/80 bg-slate-900/30 overflow-hidden backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 mb-6" data-aos="fade-up">
        <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-slate-400 font-bold text-center md:text-left">
          Tech Stack & Tools Favorit
        </p>
      </div>

      <div className="relative w-full overflow-hidden" data-aos="fade-up" data-aos-delay="100">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0b0f17] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0b0f17] to-transparent z-10 pointer-events-none"></div>

        <div className="flex gap-6 animate-marquee whitespace-nowrap py-2">
          {[...TECH_STACK, ...TECH_STACK].map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-3 px-6 py-3.5 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer ${item.bg}`}
            >
              <span className="font-bold text-sm sm:text-base tracking-wide">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
