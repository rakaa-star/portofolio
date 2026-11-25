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
      {/* Background Decorative Ambient Vignette */}
      <div className="absolute inset-0 bg-[#0A0A0C]/80 pointer-events-none" />

      {/* Main Modal Container */}
      <div
        className="relative w-full max-w-5xl bg-[#0E1217] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto z-10 animate-scaleUp max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-4 border-b border-white/[0.08] bg-[#0A0A0C]/90 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-white/[0.05] text-amber-400 border border-white/10 flex items-center justify-center font-mono text-xs font-bold">
              {currentIndex + 1}/{items.length}
            </span>
            <div>
              <h3 className="text-sm sm:text-base font-sans font-bold text-white truncate max-w-xs sm:max-w-md">
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
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-medium text-slate-200 hover:text-white transition-all cursor-pointer"
            >
              <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span className="hidden sm:inline">{t.achievements.openOriginal}</span>
            </a>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white border border-white/10 transition-all cursor-pointer"
              aria-label={t.achievements.closeModal}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Body: Two-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto flex-1 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08]">
          
          {/* Left / Center: Interactive Certificate Image Showcase */}
          <div className="lg:col-span-7 p-4 sm:p-7 flex flex-col items-center justify-center relative bg-[#0A0A0C] min-h-[300px] sm:min-h-[420px]">
            
            {/* Floating Navigation Controls */}
            {items.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-white/[0.08] hover:bg-amber-500 text-white hover:text-[#0A0A0C] border border-white/10 transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
                  aria-label="Previous Certificate"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-white/[0.08] hover:bg-amber-500 text-white hover:text-[#0A0A0C] border border-white/10 transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
                  aria-label="Next Certificate"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Certificate Image Frame */}
            <div
              className={`relative w-full max-w-xl aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl transition-all duration-300 group ${
                isZoomed ? "cursor-zoom-out scale-[1.02]" : "cursor-zoom-in"
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

              {/* Zoom Overlay Pill */}
              <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-[#0A0A0C]/85 backdrop-blur-md border border-white/10 text-[11px] font-mono text-slate-300 flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                <svg className="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      currentIndex === idx
                        ? "w-7 bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                        : "w-1.5 bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Go to certificate ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Certificate Metadata & Verification Details */}
          <div className="lg:col-span-5 p-5 sm:p-8 flex flex-col justify-between space-y-6 bg-[#0E1217]">
            
            <div className="space-y-5">
              {/* Category & Badge */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold border border-amber-500/30 bg-amber-500/10 text-amber-400 shadow-sm">
                  {current.badge}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/[0.04] text-slate-300 text-xs font-mono border border-white/10">
                  {current.categoryLabel}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white/[0.05] text-amber-400 text-xs font-mono border border-white/10 font-bold ml-auto">
                  {current.year}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-sans font-bold text-white leading-tight">
                {current.title}
              </h2>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans font-normal">
                {current.description}
              </p>

              {/* Metadata Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                
                {/* Issuer */}
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                  <p className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-bold">
                    {t.achievements.issuedByLabel}
                  </p>
                  <p className="text-xs font-sans font-semibold text-white">
                    {current.issuer}
                  </p>
                </div>

                {/* Recipient */}
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                  <p className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-bold">
                    {t.achievements.recipientLabel}
                  </p>
                  <p className="text-xs font-sans font-semibold text-white">
                    {current.recipient}
                  </p>
                </div>

                {/* Date */}
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                  <p className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-bold">
                    {t.achievements.dateLabel}
                  </p>
                  <p className="text-xs font-mono font-semibold text-white">
                    {current.date}
                  </p>
                </div>

                {/* Credential ID */}
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                  <p className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-bold">
                    {t.achievements.verifyIdLabel}
                  </p>
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-xs font-mono font-bold text-white truncate">
                      {current.credentialId || "Verified Credential"}
                    </p>
                    {current.credentialId && (
                      <button
                        onClick={(e) => handleCopyId(e, current.credentialId!)}
                        className="p-1 text-amber-400 hover:text-white cursor-pointer"
                        title="Copy ID"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    )}
                  </div>
                  {copied && (
                    <p className="text-[10px] font-mono text-amber-400 animate-fadeIn">
                      {t.achievements.copyIdSuccess}
                    </p>
                  )}
                </div>

              </div>

              {/* Highlights Focus */}
              {current.highlights && current.highlights.length > 0 && (
                <div className="space-y-2 pt-2">
                  <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    {t.achievements.highlightsLabel}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {current.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-[11px] font-mono text-white"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Footer Action */}
            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400">
                Terverifikasi • Dokumen Resmi
              </span>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-[#0A0A0C] font-sans font-bold text-xs transition-colors cursor-pointer shadow-md shadow-amber-500/20"
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
