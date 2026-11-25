"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/languageContext";
import { AchievementItemTranslation } from "@/lib/translations";
import CertificateModal from "@/components/CertificateModal";
import PrestasiCard from "@/components/PrestasiCard";
import ScrollCardReveal from "@/components/ScrollCardReveal";
import GlareCard from "@/components/GlareCard";
import MagneticButton from "@/components/MagneticButton";

interface PrestasiSectionProps {
  initialDisplayCount?: number;
  showAllByDefault?: boolean;
}

export default function PrestasiSection({
  initialDisplayCount = 6,
  showAllByDefault = true,
}: PrestasiSectionProps) {
  const { t } = useLanguage();

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(showAllByDefault);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const allItems: AchievementItemTranslation[] = t.achievements.items;

  // Filter Categories with Item Counts
  const categories = useMemo(() => {
    return [
      { id: "all", label: t.achievements.filterAll, count: allItems.length },
      {
        id: "akademik",
        label: t.achievements.filterAcademic,
        count: allItems.filter((i) => i.category === "akademik").length,
      },
      {
        id: "sertifikasi",
        label: t.achievements.filterCert,
        count: allItems.filter((i) => i.category === "sertifikasi").length,
      },
      {
        id: "kompetisi",
        label: t.achievements.filterComp,
        count: allItems.filter((i) => i.category === "kompetisi").length,
      },
      {
        id: "olahraga",
        label: t.achievements.filterSports,
        count: allItems.filter((i) => i.category === "olahraga").length,
      },
    ];
  }, [allItems, t.achievements]);

  // Filtered & Searched List
  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.issuer.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        (item.credentialId && item.credentialId.toLowerCase().includes(q)) ||
        (item.highlights && item.highlights.some((h) => h.toLowerCase().includes(q)));

      return matchesCategory && matchesSearch;
    });
  }, [allItems, selectedCategory, searchQuery]);

  const openCertificate = (item: AchievementItemTranslation) => {
    const idx = allItems.findIndex((i) => i.id === item.id);
    setSelectedIndex(idx >= 0 ? idx : 0);
    setModalOpen(true);
  };

  const isFilteringOrSearching = selectedCategory !== "all" || searchQuery.trim() !== "";
  const featuredItem = !isFilteringOrSearching && filteredItems.length > 0 ? filteredItems[0] : null;
  const standardItems = featuredItem ? filteredItems.slice(1) : filteredItems;
  const displayedItems = showAll ? standardItems : standardItems.slice(0, 4);

  return (
    <section
      id="prestasi"
      className="max-w-7xl mx-auto px-5 sm:px-8 space-y-12 scroll-mt-28 relative"
    >
      {/* 1. SECTION HEADER (WCAG AAA High Contrast) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8" data-aos="fade-up">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-amber-400">
            <span className="w-8 h-px bg-amber-400" />
            <span>04 / CURATED CREDENTIAL ARCHIVE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold text-white tracking-tight">
            {t.achievements.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl font-sans font-normal leading-relaxed">
            {t.achievements.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-amber-400 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
            {filteredItems.length} Verified Credentials
          </span>
        </div>
      </div>

      {/* 2. FILTER TABS & SEARCH CONTROLS */}
      <div
        className="flex flex-col md:flex-row items-center justify-between gap-5"
        data-aos="fade-up"
      >
        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-sans font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? "bg-amber-500 text-[#0A0A0C] font-bold shadow-lg shadow-amber-500/20"
                    : "bg-white/[0.04] text-slate-300 border border-white/10 hover:border-amber-400/50 hover:text-white"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                    isActive
                      ? "bg-[#0A0A0C]/20 text-[#0A0A0C] font-bold"
                      : "bg-white/[0.06] text-slate-400"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="w-full md:w-80 group">
          <div className="relative">
            <input
              type="text"
              placeholder={t.achievements.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-2.5 pl-11 pr-9 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/10 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all"
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

            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-3 text-slate-400 hover:text-white p-1 cursor-pointer"
                aria-label="Clear Search"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. CERTIFICATES ARCHIVE GRID (1 col mobile, 2 col tablet, 3 col desktop, 24px gap) */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-20 bg-white/[0.02] rounded-3xl border border-white/10 backdrop-blur-sm space-y-3">
          <svg
            className="w-10 h-10 text-slate-500 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="text-base font-sans font-bold text-white">
            {t.achievements.noResultsTitle}
          </p>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {t.achievements.noResultsDesc}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <ScrollCardReveal
              key={item.id}
              delay={index * 60}
              rotation={index % 2 === 0 ? 0.8 : -0.8}
            >
              <PrestasiCard
                item={item}
                index={index}
                onOpen={openCertificate}
                inspectLabel={t.achievements.inspectBtn}
              />
            </ScrollCardReveal>
          ))}
        </div>
      )}

      {/* 5. LIGHTBOX MODAL */}
      <CertificateModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        items={allItems}
        initialIndex={selectedIndex}
      />
    </section>
  );
}
