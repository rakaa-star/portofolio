"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/languageContext";

interface CvDocItem {
  id: "ats" | "creative";
  title: string;
  subtitle: string;
  tag: string;
  tagColor: string;
  file: string;
  downloadName: string;
  description: string;
  highlights: string[];
}

export default function CvModal() {
  const { isCvModalOpen, closeCvModal, lang } = useLanguage();
  const [selectedType, setSelectedType] = useState<"ats" | "creative">("ats");
  const [zoomLevel, setZoomLevel] = useState(100);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const CV_DOCS: Record<"ats" | "creative", CvDocItem> = {
    ats: {
      id: "ats",
      title: lang === "id" ? "CV Format ATS" : "ATS-Friendly CV",
      subtitle: lang === "id" ? "Standar Industri & Recruiter ATS" : "Industry Standard & ATS-Friendly",
      tag: "ATS Format",
      tagColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      file: "/cv/CV_Raka_Febrian_ATS.jpg",
      downloadName: "CV_Raka_Febrian_ATS.jpg",
      description:
        lang === "id"
          ? "Format formal monokrom yang dioptimalkan untuk sistem ATS (Applicant Tracking System), menonjolkan ringkasan keahlian, pendidikan SMK Telkom Sidoarjo, dan pengalaman proyek."
          : "Clean monochrome structure tailored for Applicant Tracking Systems (ATS), emphasizing skills, education at SMK Telkom Sidoarjo, and project track record.",
      highlights: [
        lang === "id" ? "Ringkasan Profil & Kontak" : "Profile Summary & Contact",
        lang === "id" ? "Pendidikan SIJA 2024-2028" : "SIJA Vocational Education",
        lang === "id" ? "Skill Frontend & Backend" : "Frontend & Backend Skillset",
        lang === "id" ? "Pengalaman Proyek Nyata" : "Real-world Project Experience",
      ],
    },
    creative: {
      id: "creative",
      title: lang === "id" ? "CV Format Kreatif" : "Creative Visual CV",
      subtitle: lang === "id" ? "Desain Visual Editorial & Gold" : "Editorial & Gold Visual Design",
      tag: "Visual Design",
      tagColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      file: "/cv/CV_Raka_Febrian_Kreatif.jpg",
      downloadName: "CV_Raka_Febrian_Kreatif.jpg",
      description:
        lang === "id"
          ? "Desain visual modern berkarakter dengan sidebar kontras gelap, aksen emas, serta tata letak artistik yang cocok untuk portofolio UI/UX dan presentasi visual."
          : "A modern, distinctive layout with dark contrast sidebar, gold accents, and visual hierarchy suited for UI/UX portfolios and creative showcases.",
      highlights: [
        lang === "id" ? "Desain Sidebar Kontras" : "High-Contrast Sidebar Layout",
        lang === "id" ? "Aksen Emas Elegan" : "Sophisticated Gold Accents",
        lang === "id" ? "Data Diri & Sosmed Lengkap" : "Complete Personal Meta",
        lang === "id" ? "Visual Hierarki Rapi" : "Structured Visual Hierarchy",
      ],
    },
  };

  const currentDoc = CV_DOCS[selectedType];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeCvModal();
      }
    };
    if (isCvModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCvModalOpen, closeCvModal]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [selectedType]);

  if (!isCvModalOpen) return null;

  const triggerDownload = (fileUrl: string, fileName: string) => {
    setIsDownloading(true);
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setIsDownloading(false), 1200);
  };

  const handlePrint = () => {
    const printWindow = window.open(currentDoc.file, "_blank");
    if (printWindow) {
      printWindow.focus();
      printWindow.onload = () => {
        printWindow.print();
      };
    } else {
      window.print();
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("mr.rakka23@gmail.com");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch (err) {
      console.error("Gagal menyalin email:", err);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-2xl animate-fadeIn overflow-y-auto"
      onClick={closeCvModal}
    >
      <div className="absolute inset-0 bg-[#0A0A0C]/80 pointer-events-none" />

      {/* Main Glassmorphic Modal Sheet */}
      <div
        className="relative w-full max-w-5xl bg-[#0E1217] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto z-10 animate-scaleUp max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-7 py-3.5 border-b border-white/[0.08] bg-[#0A0A0C]/90 backdrop-blur-md">
          {/* Format Switcher */}
          <div className="flex items-center p-1 rounded-full bg-white/[0.04] border border-white/10 shadow-inner">
            <button
              type="button"
              onClick={() => setSelectedType("ats")}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
                selectedType === "ats"
                  ? "bg-amber-500 text-[#0A0A0C] font-bold shadow-md shadow-amber-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>{lang === "id" ? "Format ATS" : "ATS Format"}</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedType("creative")}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
                selectedType === "creative"
                  ? "bg-amber-500 text-[#0A0A0C] font-bold shadow-md shadow-amber-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>{lang === "id" ? "Format Kreatif" : "Creative Format"}</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Download Button */}
            <button
              type="button"
              onClick={() => triggerDownload(currentDoc.file, currentDoc.downloadName)}
              disabled={isDownloading}
              className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-[#0A0A0C] text-xs font-bold transition-all shadow-md shadow-amber-500/20 active:scale-95 cursor-pointer"
            >
              <svg className={`w-3.5 h-3.5 ${isDownloading ? "animate-bounce" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>{isDownloading ? (lang === "id" ? "Mengunduh..." : "Downloading...") : (lang === "id" ? `Unduh CV (${selectedType.toUpperCase()})` : `Download CV`)}</span>
            </button>

            {/* Print Button */}
            <button
              type="button"
              onClick={handlePrint}
              className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer hidden sm:flex"
              title="Cetak CV"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            </button>

            {/* Close Modal */}
            <button
              type="button"
              onClick={closeCvModal}
              className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Tutup Modal"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal 2-Column Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto flex-1 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08]">
          
          {/* Left Column: Metadata & Format Picker */}
          <div className="lg:col-span-4 p-5 sm:p-6 flex flex-col justify-between space-y-4 bg-[#0E1217]">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                  Curriculum Vitae
                </span>
                <h3 className="text-base font-sans font-bold text-white">
                  {currentDoc.title}
                </h3>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed font-sans font-normal">
                {currentDoc.description}
              </p>

              {/* Highlights */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-2">
                <p className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-bold">
                  Highlights
                </p>
                <ul className="space-y-1 text-xs text-slate-200">
                  {currentDoc.highlights.map((hl, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Contact Box */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Kontak</span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="text-[10px] font-mono text-amber-400 hover:underline cursor-pointer"
                  >
                    {copiedEmail ? "✓ Tersalin" : "Salin Email"}
                  </button>
                </div>
                <p className="font-mono text-xs text-white font-bold truncate">
                  mr.rakka23@gmail.com
                </p>
                <p className="text-[11px] text-slate-400 font-mono">
                  WhatsApp: <a href="https://wa.me/6288991304142" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">088991304142</a>
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>Raka Febrian</span>
              <span>SMK Telkom Sidoarjo</span>
            </div>
          </div>

          {/* Right Column: CV Preview Canvas */}
          <div className="lg:col-span-8 p-4 sm:p-6 bg-[#0A0A0C] flex flex-col space-y-3">
            {/* Zoom Controls Bar */}
            <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-slate-400">
              <span className="font-mono text-[11px] text-white">{currentDoc.title}</span>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-[#0A0A0C] px-2 py-0.5 rounded-lg border border-white/10 text-[11px] font-mono">
                  <button
                    type="button"
                    onClick={() => setZoomLevel(Math.max(60, zoomLevel - 10))}
                    className="px-1.5 py-0.5 text-slate-400 hover:text-white font-bold cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-9 text-center text-white">{zoomLevel}%</span>
                  <button
                    type="button"
                    onClick={() => setZoomLevel(Math.min(140, zoomLevel + 10))}
                    className="px-1.5 py-0.5 text-slate-400 hover:text-white font-bold cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setZoomLevel(100)}
                  className="px-2 py-0.5 rounded-md bg-white/[0.06] text-[10px] font-mono text-white border border-white/10 hover:bg-white/[0.1] cursor-pointer"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Document Canvas Sheet */}
            <div
              ref={scrollContainerRef}
              className="flex justify-center p-3 sm:p-4 bg-black/60 rounded-2xl border border-white/10 overflow-y-auto max-h-[70vh] custom-scrollbar"
            >
              <div
                style={{
                  width: "100%",
                  maxWidth: `${Math.round(680 * (zoomLevel / 100))}px`,
                  transition: "max-width 0.2s ease-out",
                }}
                className="rounded-xl overflow-hidden shadow-2xl border border-white/20 bg-white"
              >
                <Image
                  src={currentDoc.file}
                  alt={currentDoc.title}
                  width={1446}
                  height={2048}
                  unoptimized={true}
                  priority={true}
                  className="w-full h-auto block select-none object-contain"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
