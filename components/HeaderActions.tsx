"use client";

import React from "react";
import { useLanguage } from "@/lib/languageContext";

export default function HeaderActions({
  className = "",
  size = "normal",
}: {
  className?: string;
  size?: "normal" | "compact" | "large";
}) {
  const { lang, setLang, openCvModal, t } = useLanguage();

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 ${className}`}>
      {/* 1. LANGUAGE SELECTOR (ID / EN) - High Contrast Glassmorphic Toggle */}
      <div
        className="inline-flex items-center p-0.5 rounded-full bg-white/[0.04] border border-white/10 shadow-sm"
        role="group"
        aria-label="Language selector"
      >
        <button
          type="button"
          onClick={() => setLang("id")}
          className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-medium transition-all duration-300 cursor-pointer ${
            lang === "id"
              ? "bg-[#F59E0B] text-[#0A0A0C] font-bold shadow-xs"
              : "text-slate-400 hover:text-white"
          }`}
          aria-pressed={lang === "id"}
          title="Bahasa Indonesia"
        >
          ID
        </button>

        <button
          type="button"
          onClick={() => setLang("en")}
          className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-medium transition-all duration-300 cursor-pointer ${
            lang === "en"
              ? "bg-[#F59E0B] text-[#0A0A0C] font-bold shadow-xs"
              : "text-slate-400 hover:text-white"
          }`}
          aria-pressed={lang === "en"}
          title="English"
        >
          EN
        </button>
      </div>

      {/* 2. CV ACTION BUTTON - Sleek Glass Pill */}
      <button
        type="button"
        onClick={openCvModal}
        className={`group inline-flex items-center gap-1.5 rounded-full font-sans font-medium text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-[#F59E0B]/50 transition-all duration-300 active:scale-95 cursor-pointer ${
          size === "compact"
            ? "px-3 py-1 text-xs"
            : size === "large"
            ? "px-5 py-2.5 text-sm"
            : "px-4 py-1.5 sm:px-4.5 sm:py-2 text-xs"
        }`}
        aria-label={t.nav.viewCv}
      >
        <span>{t.nav.viewCv}</span>
        <span className="text-[#F59E0B] text-[11px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
          ↗
        </span>
      </button>
    </div>
  );
}
