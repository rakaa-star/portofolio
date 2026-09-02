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
      {/* 1. LANGUAGE SWITCHER PILL (ID / EN) matching screenshot */}
      <div
        className="inline-flex items-center p-1 rounded-full bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 shadow-md shadow-black/20"
        role="group"
        aria-label="Language selector"
      >
        {/* Indonesian Option */}
        <button
          type="button"
          onClick={() => setLang("id")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
            lang === "id"
              ? "bg-white text-slate-950 shadow-md shadow-black/30 scale-100"
              : "text-slate-400 hover:text-white hover:bg-slate-800/60"
          }`}
          aria-pressed={lang === "id"}
          title="Bahasa Indonesia"
        >
          {/* Indonesian Flag SVG */}
          <span className="w-4 h-3 rounded-[2px] overflow-hidden flex flex-col border border-black/20 shadow-xs shrink-0">
            <span className="w-full h-1/2 bg-[#ff0000]" />
            <span className="w-full h-1/2 bg-[#ffffff]" />
          </span>
          <span className="tracking-wide">ID</span>
        </button>

        {/* English Option */}
        <button
          type="button"
          onClick={() => setLang("en")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
            lang === "en"
              ? "bg-white text-slate-950 shadow-md shadow-black/30 scale-100"
              : "text-slate-400 hover:text-white hover:bg-slate-800/60"
          }`}
          aria-pressed={lang === "en"}
          title="English"
        >
          {/* UK Flag SVG */}
          <span className="w-4 h-3 rounded-[2px] overflow-hidden relative bg-[#012169] border border-black/20 shadow-xs shrink-0">
            {/* White diagonals */}
            <svg className="w-full h-full" viewBox="0 0 60 30" fill="none">
              <clipPath id="uk-clip">
                <rect width="60" height="30" />
              </clipPath>
              <g clipPath="url(#uk-clip)">
                <path d="M0 0L60 30M60 0L0 30" stroke="#fff" strokeWidth="6" />
                <path d="M0 0L60 30M60 0L0 30" stroke="#C8102E" strokeWidth="2" />
                <path d="M30 0V30M0 15H60" stroke="#fff" strokeWidth="10" />
                <path d="M30 0V30M0 15H60" stroke="#C8102E" strokeWidth="6" />
              </g>
            </svg>
          </span>
          <span className="tracking-wide">EN</span>
        </button>
      </div>

      {/* 2. LIHAT CV / VIEW CV PILL BUTTON matching screenshot */}
      <button
        type="button"
        onClick={openCvModal}
        className={`group inline-flex items-center gap-2 rounded-full font-bold text-white bg-[#0e131f] hover:bg-[#161f32] border border-slate-700/90 hover:border-cyan-500/60 shadow-lg shadow-black/30 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${
          size === "large"
            ? "px-6 py-3 text-sm sm:text-base"
            : "px-4 sm:px-5 py-2 text-xs sm:text-sm"
        }`}
        aria-label={t.nav.viewCv}
      >
        {/* Document / CV Icon matching screenshot */}
        <svg
          className="w-4 h-4 text-cyan-400 group-hover:text-cyan-300 transition-colors shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <span className="tracking-wide font-extrabold">{t.nav.viewCv}</span>
      </button>
    </div>
  );
}
