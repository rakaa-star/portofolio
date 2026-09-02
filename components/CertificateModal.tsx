"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AchievementItemTranslation } from "@/lib/translations";
import { useLanguage } from "@/lib/languageContext";

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: AchievementItemTranslation[];
  initialIndex?: number;
}

export default function CertificateModal({
  isOpen,
  onClose,
  items,
  initialIndex = 0,
}: CertificateModalProps) {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [copied, setCopied] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        if (isZoomed) {
          setIsZoomed(false);
        } else {
          onClose();
        }
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isZoomed, items.length, onClose]);

  if (!isOpen || !items || items.length === 0) return null;

  const current = items[currentIndex] || items[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
  };

  const handleCopyId = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Gagal menyalin No. Sertifikat:", err);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl animate-fadeIn overflow-y-auto"
      onClick={onClose}
    >
      {/* Background Decorative Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/40 via-transparent to-blue-950/30 pointer-events-none" />

      {/* Main Modal Container */}
      <div
        className="relative w-full max-w-5xl bg-[#0d131f] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto z-10 animate-scaleUp max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-4 border-b border-slate-800/80 bg-[#0a0f19]/90 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-mono text-xs font-bold">
              {currentIndex + 1}/{items.length}
            </span>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white font-heading truncate max-w-xs sm:max-w-md">
                {t.achievements.modalTitle}
              </h3>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                {t.achievements.modalSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Direct Open High-Res in New Tab */}
            <a
              href={current.image}
              target="_blank"
              rel="noreferrer"
              title={t.achievements.openOriginal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-cyan-400 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span className="hidden sm:inline">{t.achievements.openOriginal}</span>
            </a>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900/80 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-500/40 transition-all cursor-pointer"
              aria-label={t.achievements.closeModal}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Body: Two-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto flex-1 divide-y lg:divide-y-0 lg:divide-x divide-slate-800/80">
          
          {/* Left / Center: Interactive Certificate Image Showcase */}
          <div className="lg:col-span-7 p-4 sm:p-7 flex flex-col items-center justify-center relative bg-gradient-to-b from-[#0a0f18] to-[#0d131f] min-h-[300px] sm:min-h-[420px]">
            
            {/* Floating Navigation Controls */}
            {items.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-slate-950/80 hover:bg-cyan-500 text-slate-300 hover:text-black border border-slate-700 hover:border-cyan-400 transition-all shadow-xl hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md"
                  aria-label="Previous Certificate"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-slate-950/80 hover:bg-cyan-500 text-slate-300 hover:text-black border border-slate-700 hover:border-cyan-400 transition-all shadow-xl hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md"
                  aria-label="Next Certificate"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Certificate Image Frame */}
            <div
              className={`relative w-full max-w-xl aspect-[4/3] rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950 shadow-2xl transition-all duration-300 group ${
                isZoomed ? "cursor-zoom-out scale-[1.03]" : "cursor-zoom-in"
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <Image
                src={current.image}
                alt={current.title}
                fill
                className="object-contain transition-transform duration-300"
                priority
                sizes="(max-width: 768px) 100vw, 600px"
              />

              {/* Subtle Zoom Overlay Pill */}
              <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-[11px] font-mono text-slate-300 flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
                <span>{isZoomed ? "Zoom Out" : t.achievements.zoomInHint}</span>
              </div>
            </div>

            {/* Pagination Dots */}
            {items.length > 1 && (
              <div className="flex items-center gap-2 pt-4">
                {items.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setIsZoomed(false);
                      setCurrentIndex(idx);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      currentIndex === idx
                        ? "w-8 bg-cyan-400 shadow-md shadow-cyan-400/50"
                        : "w-2 bg-slate-700 hover:bg-slate-500"
                    }`}
                    aria-label={`Go to certificate ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Certificate Metadata & Verification Details */}
          <div className="lg:col-span-5 p-5 sm:p-8 flex flex-col justify-between space-y-6 bg-[#0e1422]/70">
            
            <div className="space-y-5">
              {/* Category & Badge */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border shadow-sm ${current.badgeColor}`}>
                  {current.badge}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-900/90 text-slate-300 text-xs font-mono border border-slate-800">
                  {current.categoryLabel}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono border border-cyan-500/20 font-bold ml-auto">
                  {current.year}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-black text-white leading-tight font-heading">
                {current.title}
              </h2>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {current.description}
              </p>

              {/* Metadata Cards Grid */}
              <div className="space-y-3 pt-2">
                {/* Issuer */}
                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="space-y-0.5 flex-1 min-w-0">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                      {t.achievements.issuedByLabel}
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-slate-200">
                      {current.issuer}
                    </p>
                  </div>
                </div>

                {/* Recipient & Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0 mt-0.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="space-y-0.5 flex-1 min-w-0">
                      <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                        {t.achievements.recipientLabel}
                      </p>
                      <p className="text-xs sm:text-sm font-bold text-slate-200 truncate">
                        {current.recipient}
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0 mt-0.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="space-y-0.5 flex-1 min-w-0">
                      <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                        {t.achievements.dateLabel}
                      </p>
                      <p className="text-xs sm:text-sm font-bold text-slate-200 truncate">
                        {current.date}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Credential ID / Verification with 1-Click Copy */}
                {current.credentialId && (
                  <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-cyan-500/30 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        {t.achievements.verifyIdLabel}
                      </p>
                      <p className="text-xs font-mono font-bold text-slate-200 truncate select-all">
                        {current.credentialId}
                      </p>
                    </div>

                    <button
                      onClick={(e) => handleCopyId(e, current.credentialId!)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                        copied
                          ? "bg-emerald-500 text-black shadow-md shadow-emerald-500/30"
                          : "bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
                      }`}
                    >
                      {copied ? (
                        <>
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Tersalin</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          <span>Salin ID</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Highlights Chips */}
              {current.highlights && current.highlights.length > 0 && (
                <div className="space-y-2 pt-1">
                  <p className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
                    {t.achievements.highlightsLabel}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {current.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-[11px] font-mono"
                      >
                        #{h}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Action Controls */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
              <a
                href={current.image}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs sm:text-sm text-center shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>{t.achievements.openOriginal}</span>
              </a>

              <button
                onClick={onClose}
                className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs sm:text-sm font-bold transition-all cursor-pointer"
              >
                {t.achievements.closeModal}
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
