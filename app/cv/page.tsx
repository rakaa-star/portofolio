"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/languageContext";
import HeaderActions from "@/components/HeaderActions";

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

export default function CvPage() {
  const { lang } = useLanguage();
  const [selectedType, setSelectedType] = useState<"ats" | "creative">("ats");
  const [zoomLevel, setZoomLevel] = useState(100);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

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
    <div className="min-h-screen bg-[#0A0A0C] text-[#F8FAFC] py-6 sm:py-10 px-3 sm:px-6 relative">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Top Navigation & Action Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-2xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-sans font-medium text-slate-400 hover:text-white transition-colors group"
          >
            <span className="p-2 rounded-xl bg-white/[0.05] border border-white/10 group-hover:border-amber-400/50 transition-colors">
              <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </span>
            <span>{lang === "id" ? "Kembali ke Beranda" : "Back to Home"}</span>
          </Link>

          {/* Dual-Mode Format Switcher in Top Bar */}
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

          <div className="flex items-center gap-3">
            <HeaderActions />
            
            {/* Download Button */}
            <button
              type="button"
              onClick={() => triggerDownload(currentDoc.file, currentDoc.downloadName)}
              disabled={isDownloading}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs sm:text-sm font-sans font-bold bg-amber-500 hover:bg-amber-400 text-[#0A0A0C] transition-all cursor-pointer shadow-lg shadow-amber-500/20 active:scale-95"
            >
              <svg className={`w-4 h-4 ${isDownloading ? "animate-bounce" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>{isDownloading ? (lang === "id" ? "Mengunduh..." : "Downloading...") : (lang === "id" ? `Unduh ${selectedType.toUpperCase()}` : `Download ${selectedType.toUpperCase()}`)}</span>
            </button>

            {/* Print Button */}
            <button
              type="button"
              onClick={handlePrint}
              className="p-2.5 rounded-full bg-white/[0.04] border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer hidden sm:flex"
              title="Cetak CV"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Version Cards & Profile Details */}
          <div className="lg:col-span-4 space-y-4">
            
            <div className="p-6 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-4 shadow-xl">
              <div className="space-y-1">
                <p className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                  {lang === "id" ? "PILIHAN DOKUMEN" : "DOCUMENT SELECTOR"}
                </p>
                <h3 className="text-sm font-sans font-bold text-white">
                  {lang === "id" ? "Pilih Tampilan CV" : "Choose CV Presentation"}
                </h3>
              </div>

              {/* ATS Selector Card */}
              <div
                onClick={() => setSelectedType("ats")}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedType === "ats"
                    ? "bg-white/[0.08] border-amber-400/50 shadow-xl"
                    : "bg-white/[0.02] border-white/[0.06] hover:border-white/20"
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="relative w-12 h-16 rounded-xl overflow-hidden border border-white/15 shrink-0 bg-white shadow-sm">
                    <Image
                      src="/cv/CV_Raka_Febrian_ATS.jpg"
                      alt="Thumbnail ATS"
                      fill
                      className="object-cover object-top"
                      sizes="48px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-white">Format ATS</p>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                        Official ATS
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                      Standar monokrom resmi untuk sistem ATS recruiter.
                    </p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerDownload("/cv/CV_Raka_Febrian_ATS.jpg", "CV_Raka_Febrian_ATS.jpg");
                      }}
                      className="mt-2 text-[11px] font-mono font-bold text-amber-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span>Unduh File ATS</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Creative Selector Card */}
              <div
                onClick={() => setSelectedType("creative")}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedType === "creative"
                    ? "bg-white/[0.08] border-amber-400/50 shadow-xl"
                    : "bg-white/[0.02] border-white/[0.06] hover:border-white/20"
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="relative w-12 h-16 rounded-xl overflow-hidden border border-white/15 shrink-0 bg-white shadow-sm">
                    <Image
                      src="/cv/CV_Raka_Febrian_Kreatif.jpg"
                      alt="Thumbnail Kreatif"
                      fill
                      className="object-cover object-top"
                      sizes="48px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-white">Format Kreatif</p>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                        Visual Gold
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                      Desain visual artistik dengan sidebar gelap & aksen emas.
                    </p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerDownload("/cv/CV_Raka_Febrian_Kreatif.jpg", "CV_Raka_Febrian_Kreatif.jpg");
                      }}
                      className="mt-2 text-[11px] font-mono font-bold text-amber-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span>Unduh File Kreatif</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Document Details & Highlights */}
            <div className="p-6 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-3.5 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-sans font-bold text-white">{currentDoc.title}</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border border-amber-500/30 text-amber-400 bg-amber-500/10">
                  {currentDoc.tag}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-sans font-normal">
                {currentDoc.description}
              </p>

              <div className="pt-2 border-t border-white/[0.08] space-y-1.5">
                <p className="text-[10px] font-mono uppercase text-amber-400 font-bold">Highlights</p>
                <ul className="space-y-1 text-xs text-slate-200">
                  {currentDoc.highlights.map((hl, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quick Contact Box */}
            <div className="p-5 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-2.5 text-xs shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">Kontak Cepat</span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="text-[11px] font-mono text-amber-400 hover:underline cursor-pointer"
                >
                  {copiedEmail ? "✓ Tersalin!" : "Salin Email"}
                </button>
              </div>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=mr.rakka23@gmail.com"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-white font-bold truncate hover:text-amber-400 transition-colors inline-block"
                title="Kirim Email ke mr.rakka23@gmail.com"
              >
                mr.rakka23@gmail.com
              </a>
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1.5 border-t border-white/[0.08]">
                <span>WhatsApp</span>
                <a href="https://wa.me/6288991304142" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline font-mono">
                  088991304142
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: High-Definition Canvas */}
          <div className="lg:col-span-8 space-y-4">
            
            <div className="flex items-center justify-between px-5 py-3 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 text-xs">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-white font-medium">{currentDoc.title}</span>
                <span className="text-slate-500 font-mono text-[11px] hidden sm:inline">({currentDoc.downloadName})</span>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-[#0A0A0C] px-2 py-0.5 rounded-lg border border-white/10 text-[11px] font-mono">
                  <button
                    type="button"
                    onClick={() => setZoomLevel(Math.max(60, zoomLevel - 10))}
                    className="px-2 py-0.5 text-slate-400 hover:text-white font-bold cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-white">{zoomLevel}%</span>
                  <button
                    type="button"
                    onClick={() => setZoomLevel(Math.min(140, zoomLevel + 10))}
                    className="px-2 py-0.5 text-slate-400 hover:text-white font-bold cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setZoomLevel(100)}
                  className="px-3 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-[11px] font-mono text-white border border-white/10 cursor-pointer"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Document Canvas Sheet */}
            <div className="flex justify-center p-4 sm:p-7 bg-black/60 rounded-3xl border border-white/10 shadow-2xl overflow-y-auto max-h-[85vh] custom-scrollbar">
              <div
                style={{
                  width: "100%",
                  maxWidth: `${Math.round(760 * (zoomLevel / 100))}px`,
                  transition: "max-width 0.25s ease-out",
                }}
                className="rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-white group my-2"
              >
                <div className="w-full bg-white relative">
                  <Image
                    src={currentDoc.file}
                    alt={currentDoc.title}
                    width={1446}
                    height={2048}
                    unoptimized={true}
                    priority={true}
                    quality={100}
                    className="w-full h-auto block select-none object-contain"
                  />
                </div>

                {/* Bottom Bar */}
                <div className="p-4 bg-[#0A0A0C] border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono text-[11px] text-white">
                    {currentDoc.title} • HD 2048px
                  </span>
                  <button
                    type="button"
                    onClick={() => triggerDownload(currentDoc.file, currentDoc.downloadName)}
                    className="px-4.5 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-[#0A0A0C] font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-md shadow-amber-500/20"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>Unduh File Asli</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Format Download Links */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs">
              <span className="text-slate-400 font-mono">Tersedia 2 format siap unduh:</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => triggerDownload("/cv/CV_Raka_Febrian_ATS.jpg", "CV_Raka_Febrian_ATS.jpg")}
                  className="px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-amber-400 text-amber-400 font-medium transition-all cursor-pointer flex items-center gap-1.5"
                >
                  📄 Unduh CV ATS
                </button>
                <button
                  type="button"
                  onClick={() => triggerDownload("/cv/CV_Raka_Febrian_Kreatif.jpg", "CV_Raka_Febrian_Kreatif.jpg")}
                  className="px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-amber-400 text-amber-400 font-medium transition-all cursor-pointer flex items-center gap-1.5"
                >
                  🎨 Unduh CV Kreatif
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
