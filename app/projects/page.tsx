"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PROJECTS } from "@/lib/data";
import ProjectCard from "@/components/ProjectCard";
import ScrollCardReveal from "@/components/ScrollCardReveal";
import MagneticButton from "@/components/MagneticButton";

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))];

  const filteredProjects = PROJECTS.filter((proj) => {
    const matchesCategory = selectedCategory === "All" || proj.category === selectedCategory;
    const matchesSearch =
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 sm:py-20 px-5 sm:px-8 max-w-7xl mx-auto space-y-14 bg-[#0A0A0C] text-[#F8FAFC]">
      <div className="text-center space-y-4" data-aos="fade-up">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-amber-400 text-xs font-mono uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span>Selected Works</span>
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-bold text-white tracking-tight">
          Featured Projects
        </h1>
        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-sans font-normal">
          Koleksi proyek web aplikasi, dashboard analitik, dan platform digital yang telah saya rancang dan kembangkan.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-5" data-aos="fade-up">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-sans font-medium transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-amber-500 text-[#0A0A0C] font-bold shadow-lg shadow-amber-500/20"
                  : "bg-white/[0.04] text-slate-300 border border-white/10 hover:border-amber-400/50 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="w-full md:w-80 group">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari teknologi atau nama proyek..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-2.5 pl-11 rounded-full bg-white/[0.04] border border-white/10 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-colors"
            />
            <svg
              className="w-4 h-4 text-slate-400 absolute left-4 top-3.5 group-focus-within:text-amber-400 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-20 bg-white/[0.02] rounded-3xl border border-white/10">
          <p className="text-lg font-sans font-bold text-white mb-2">Pencarian tidak ditemukan</p>
          <p className="text-slate-400 text-xs sm:text-sm">Coba gunakan kata kunci atau teknologi lain.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj, idx) => (
            <ScrollCardReveal
              key={idx}
              delay={idx * 60}
              rotation={idx % 2 === 0 ? 0.8 : -0.8}
            >
              <ProjectCard proj={proj} idx={idx} />
            </ScrollCardReveal>
          ))}
        </div>
      )}

      <div className="text-center pt-12 pb-8 border-t border-white/[0.08]" data-aos="fade-up">
        <p className="text-slate-400 text-sm mb-4">Punya ide proyek atau butuh aplikasi web kustom?</p>
        <MagneticButton
          asAnchor
          href="/#contact"
          className="px-8 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-[#0A0A0C] font-sans font-bold text-sm shadow-lg shadow-amber-500/20 group"
        >
          <span>Mari Diskusikan Proyek Anda</span>
          <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
        </MagneticButton>
      </div>
    </div>
  );
}
