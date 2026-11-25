
"use client";

import React, { useState } from "react";
import { TechIcon } from "@/components/TechIcon";
import TechStack3DViewer from "@/components/TechStack3DViewer";

interface TechGroup {
  category: "frontend" | "backend" | "database" | "design" | "tools";
  categoryLabelId: string;
  categoryLabelEn: string;
  domainCode: string;
  description: string;
  items: {
    name: string;
    role: string;
    level: string;
  }[];
}

const TECH_INDEX_GROUPS: TechGroup[] = [
  {
    category: "frontend",
    categoryLabelId: "Front-End Architecture",
    categoryLabelEn: "Front-End Architecture",
    domainCode: "DOMAIN_01",
    description:
      "Component modularity, server-rendered apps, and responsive UI craft.",
    items: [
      { name: "React.js", role: "Component Architecture", level: "Primary" },
      { name: "Next.js", role: "App Router & SSR", level: "Primary" },
      { name: "TypeScript", role: "Static Type Safety", level: "Core" },
      { name: "Tailwind CSS", role: "Utility Styling", level: "Primary" },
      { name: "Vue.js", role: "Reactive Interfaces", level: "Proficient" },
      { name: "HTML5", role: "Semantic Markup", level: "Standard" },
      { name: "CSS3", role: "Layout & Animations", level: "Standard" },
      { name: "JavaScript", role: "Modern ES6+ Logic", level: "Core" },
    ],
  },
  {
    category: "backend",
    categoryLabelId: "Back-End & Systems",
    categoryLabelEn: "Back-End & Systems",
    domainCode: "DOMAIN_02",
    description:
      "Scalable server environments, REST contracts, and MVC logic.",
    items: [
      { name: "PHP", role: "Server-side Language", level: "Production" },
      { name: "Laravel", role: "MVC Framework", level: "Primary" },
      { name: "Node.js", role: "Runtime Environment", level: "Proficient" },
      { name: "REST APIs", role: "Data Architecture", level: "Primary" },
    ],
  },
  {
    category: "database",
    categoryLabelId: "Database & Cloud",
    categoryLabelEn: "Database & Cloud",
    domainCode: "DOMAIN_03",
    description:
      "Structured relations, row-level security, and persistent stores.",
    items: [
      { name: "MySQL", role: "Relational Database", level: "Production" },
      { name: "Supabase", role: "PostgreSQL & Auth", level: "Primary" },
      { name: "PostgreSQL", role: "Structured Data", level: "Core" },
    ],
  },
  {
    category: "design",
    categoryLabelId: "Design & Tooling",
    categoryLabelEn: "Design & Tooling",
    domainCode: "DOMAIN_04",
    description:
      "User flow prototypes, design tokens, and aesthetic systems.",
    items: [
      { name: "Figma", role: "Prototyping & Flow", level: "Primary" },
      { name: "Design Tokens", role: "Design Guides", level: "Core" },
      { name: "Git", role: "Version Control", level: "Standard" },
      { name: "GitHub", role: "Collaborative Code", level: "Standard" },
      { name: "Vercel", role: "Cloud Deployment", level: "Primary" },
      { name: "VS Code", role: "Development Workflow", level: "Core" },
      {
        name: "Modern Motion Easing",
        role: "Motion Curves",
        level: "Refined",
      },
    ],
  },
];

interface InteractiveToolsProps {
  tools?: string[];
}

export default function InteractiveTools({ }: InteractiveToolsProps) {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const filteredGroups =
    activeTab === "all"
      ? TECH_INDEX_GROUPS
      : TECH_INDEX_GROUPS.filter(
        (group) => group.category === activeTab
      );

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-start gap-2 border-b border-white/[0.07] pb-4">
        <button
          type="button"
          onClick={() => setActiveTab("all")}
          className={`px-4 py-1.5 rounded-md text-xs font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer ${activeTab === "all"
              ? "bg-amber-400 text-zinc-950 font-bold shadow-md shadow-amber-400/20"
              : "bg-white/[0.03] text-zinc-400 border border-white/[0.08] hover:border-amber-400/40 hover:text-white"
            }`}
        >
          All Architectures
        </button>

        {TECH_INDEX_GROUPS.map((group) => (
          <button
            key={group.category}
            type="button"
            onClick={() => setActiveTab(group.category)}
            className={`px-4 py-1.5 rounded-md text-xs font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer ${activeTab === group.category
                ? "bg-amber-400 text-zinc-950 font-bold shadow-md shadow-amber-400/20"
                : "bg-white/[0.03] text-zinc-400 border border-white/[0.08] hover:border-amber-400/40 hover:text-white"
              }`}
          >
            {group.categoryLabelEn}
          </button>
        ))}
      </div>

      {/* Main Two-Part Architecture Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT AREA: STRUCTURED TECHNOLOGY GROUPS */}
        <div className="lg:col-span-7 space-y-6">
          {filteredGroups.map((group) => (
            <div
              key={group.category}
              className="rounded-2xl bg-[#0c0c0e]/95 backdrop-blur-md border border-white/[0.08] p-5 sm:p-6 space-y-4 hover:border-amber-400/25 transition-all duration-300 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.7)] group relative overflow-hidden"
            >
              {/* Top Hairline Accent */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent group-hover:via-amber-400/30 transition-all duration-500"
              />

              {/* Group Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.07] pb-3.5">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-[10px] text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded">
                    {group.domainCode}
                  </span>

                  <h4 className="font-sans font-bold text-base sm:text-lg text-white group-hover:text-amber-400 transition-colors">
                    {group.categoryLabelEn}
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-zinc-400">
                    {group.items.length} Modules
                  </span>

                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                {group.description}
              </p>

              {/* Technology Modules Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {group.items.map((item, i) => {
                  const isHovered = hoveredTech === item.name;

                  return (
                    <div
                      key={i}
                      onMouseEnter={() => setHoveredTech(item.name)}
                      onMouseLeave={() => setHoveredTech(null)}
                      className={`group/item flex items-center justify-between p-2.5 rounded-xl border transition-all duration-200 cursor-default ${isHovered
                          ? "bg-amber-400/[0.07] border-amber-400/40 translate-x-1"
                          : "bg-white/[0.02] border-white/[0.05] hover:border-amber-400/20 hover:bg-white/[0.04]"
                        }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center shrink-0 group-hover/item:border-amber-400/40 group-hover/item:bg-amber-400/[0.06] transition-colors">
                          <TechIcon
                            name={item.name}
                            className="w-3.5 h-3.5 text-zinc-300 group-hover/item:text-amber-400 transition-colors"
                          />
                        </div>

                        <div className="truncate">
                          <p className="text-xs font-sans font-medium text-zinc-200 group-hover/item:text-white transition-colors truncate">
                            {item.name}
                          </p>

                          <p className="text-[10px] font-mono text-zinc-500 truncate">
                            {item.role}
                          </p>
                        </div>
                      </div>

                      <span className="text-[10px] font-mono text-amber-400/80 px-2 py-0.5 rounded bg-white/[0.02] border border-white/[0.06] shrink-0 ml-2">
                        {item.level}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT AREA: 3D GOLD OBJECT & ORBITAL NODES */}
        <div className="lg:col-span-5 sticky top-28 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
              <span className="w-6 h-px bg-amber-400" />
              <span>CORE ARCHITECTURAL SCULPTURE</span>
            </div>

            <p className="text-xs text-zinc-400 font-sans">
              Real-time procedural 3D model connecting front-end, back-end,
              and cloud systems.
            </p>
          </div>

          <TechStack3DViewer
            activeCategory={activeTab}
            hoveredTech={hoveredTech}
            onSelectTech={(name) => setHoveredTech(name)}
          />

          {/* Quick Technical Architecture Metrics */}
          <div className="grid grid-cols-3 gap-2.5 pt-1">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.07] text-center">
              <p className="text-[10px] font-mono text-zinc-500 uppercase">
                Latency
              </p>
              <p className="text-xs sm:text-sm font-mono font-bold text-amber-400">
                &lt; 16ms
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.07] text-center">
              <p className="text-[10px] font-mono text-zinc-500 uppercase">
                Architecture
              </p>
              <p className="text-xs sm:text-sm font-mono font-bold text-white">
                Full-Stack
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.07] text-center">
              <p className="text-[10px] font-mono text-zinc-500 uppercase">
                Sync State
              </p>
              <p className="text-xs sm:text-sm font-mono font-bold text-emerald-400">
                Reactive
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
