"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/lib/languageContext";

export default function CvModal() {
  const { isCvModalOpen, closeCvModal, lang, setLang, t } = useLanguage();
  const cv = t.cv;
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Handle ESC key to close modal
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

  if (!isCvModalOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto"
      onClick={closeCvModal}
    >
      {/* PDF Document Window Frame (Matching Screenshot 2) */}
      <div
        className="relative w-full max-w-5xl max-h-[94vh] flex flex-col bg-[#1e222d] border border-slate-700/80 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto select-none"
        onClick={(e) => e.stopPropagation()}
        data-aos="zoom-in"
      >
        {/* 1. TOP WINDOW BAR (macOS dots + Title + Unduh PDF button) */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#181b24] border-b border-slate-800">
          {/* macOS window control dots */}
          <div className="flex items-center gap-2">
            <button
              onClick={closeCvModal}
              className="w-3 h-3 rounded-full bg-[#ff5f56] hover:brightness-110 cursor-pointer transition-all"
              title="Close"
            />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            <span className="ml-3 text-xs sm:text-sm font-semibold text-slate-200 hidden sm:inline-block font-heading">
              Curriculum Vitae - {cv.name}
            </span>
          </div>

          {/* Right Action: Language Switch + Unduh PDF + Close */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Lang Switch */}
            <div className="inline-flex p-0.5 rounded-full bg-slate-900 border border-slate-700 text-[11px] font-bold">
              <button
                type="button"
                onClick={() => setLang("id")}
                className={`px-2.5 py-0.5 rounded-full transition-colors cursor-pointer ${
                  lang === "id"
                    ? "bg-cyan-500 text-black font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`px-2.5 py-0.5 rounded-full transition-colors cursor-pointer ${
                  lang === "en"
                    ? "bg-cyan-500 text-black font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                EN
              </button>
            </div>

            {/* Unduh PDF Button */}
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-[#0b0e14] hover:bg-black text-white border border-slate-700/80 shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>{cv.downloadPdf}</span>
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={closeCvModal}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* 2. PDF VIEWER SECONDARY TOOLBAR */}
        <div className="flex items-center justify-between px-3 sm:px-5 py-2 bg-[#252a37] border-b border-slate-700/80 text-xs text-slate-300">
          {/* Left: Sidebar toggle + Document title */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1 rounded hover:bg-slate-700 text-slate-300 cursor-pointer"
              title="Toggle Thumbnails"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </button>
            <span className="font-medium text-slate-300 truncate max-w-[140px] sm:max-w-[240px]">
              CV_Raka_Febrian_Frontend.pdf
            </span>
          </div>

          {/* Center: Page indicator & Zoom controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="font-mono bg-[#181b24] px-2.5 py-0.5 rounded text-[11px] border border-slate-700">
              1 / 1
            </span>
            <div className="hidden sm:flex items-center gap-1 bg-[#181b24] px-2 py-0.5 rounded border border-slate-700 text-[11px]">
              <button
                type="button"
                onClick={() => setZoomLevel(Math.max(70, zoomLevel - 10))}
                className="px-1.5 hover:text-cyan-400 font-bold"
              >
                -
              </button>
              <span className="w-10 text-center font-mono">{zoomLevel}%</span>
              <button
                type="button"
                onClick={() => setZoomLevel(Math.min(130, zoomLevel + 10))}
                className="px-1.5 hover:text-cyan-400 font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* Right: Print / Download shortcut buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="p-1 rounded hover:bg-slate-700 text-slate-300 cursor-pointer"
              title="Print"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            </button>
          </div>
        </div>

        {/* 3. MAIN PDF VIEWER WORKSPACE */}
        <div className="flex-1 flex overflow-hidden bg-[#181a20] relative">
          
          {/* Left Thumbnail Rail */}
          {isSidebarOpen && (
            <div className="hidden md:flex flex-col items-center w-36 sm:w-44 bg-[#1e222d] border-r border-slate-800 p-3 overflow-y-auto select-none shrink-0 animate-fadeIn">
              <div className="w-full space-y-2 cursor-pointer group">
                <div className="w-full aspect-[1/1.4] bg-white rounded-lg shadow-md border-2 border-cyan-500 p-2 overflow-hidden flex flex-col justify-between text-[4px] text-slate-800 pointer-events-none">
                  <div className="space-y-1">
                    <div className="h-2 w-16 bg-slate-900 rounded" />
                    <div className="h-1 w-10 bg-cyan-600 rounded" />
                  </div>
                  <div className="space-y-1">
                    <div className="h-1 w-full bg-slate-200 rounded" />
                    <div className="h-1 w-4/5 bg-slate-200 rounded" />
                  </div>
                  <div className="space-y-1">
                    <div className="h-1 w-12 bg-slate-400 rounded" />
                    <div className="h-1 w-full bg-slate-200 rounded" />
                  </div>
                </div>
                <p className="text-center text-xs font-mono font-bold text-cyan-400">1</p>
              </div>
            </div>
          )}

          {/* Main Printable A4 Document Sheet */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center bg-[#13151b] custom-scrollbar">
            
            <div
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "top center" }}
              className="w-full max-w-[760px] bg-white text-[#1a1f2c] rounded-lg shadow-2xl p-6 sm:p-10 space-y-6 font-sans select-text printable-cv transition-transform duration-200 my-2"
            >
              
              {/* Header Section: Name, Role, Photo & Contact Info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b-2 border-slate-200">
                {/* Left Name & Title */}
                <div className="space-y-1">
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
                    {cv.name}
                  </h1>
                  <p className="text-sm sm:text-base font-bold text-cyan-600 tracking-wide uppercase">
                    {cv.role}
                  </p>
                  <p className="text-xs font-semibold text-slate-500 font-mono">
                    {cv.schoolInfo}
                  </p>
                </div>

                {/* Avatar & Contact Meta */}
                <div className="flex items-center gap-4 ml-auto sm:ml-0">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shadow-md border-2 border-slate-200 shrink-0">
                    <img
                      src="/raka_profile.jpg"
                      alt="Raka Febrian"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="text-[11px] sm:text-xs text-slate-600 space-y-1.5 font-mono leading-tight">
                    <p className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-cyan-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>{cv.contactInfo.phone}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-cyan-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>{cv.contactInfo.email}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-cyan-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{cv.contactInfo.location}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-cyan-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      <span>{cv.contactInfo.github}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* 1. ABOUT ME */}
              <div className="space-y-2">
                <h2 className="text-xs font-bold font-mono tracking-widest text-slate-900 uppercase border-b border-slate-200 pb-1 flex items-center gap-2 font-heading">
                  <span className="w-2 h-2 rounded-full bg-cyan-600" />
                  {cv.summaryTitle}
                </h2>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                  {cv.summaryText}
                </p>
              </div>

              {/* 2. EDUCATION */}
              <div className="space-y-2.5">
                <h2 className="text-xs font-bold font-mono tracking-widest text-slate-900 uppercase border-b border-slate-200 pb-1 flex items-center gap-2 font-heading">
                  <span className="w-2 h-2 rounded-full bg-cyan-600" />
                  {cv.educationTitle}
                </h2>

                <div className="space-y-2 text-xs sm:text-sm">
                  {t.education.timeline.map((item, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 pb-2 border-b border-slate-100 last:border-0 last:pb-0">
                      <div>
                        <p className="font-bold text-slate-900">{item.institution}</p>
                        <p className="text-xs text-cyan-700 font-semibold">{item.title}</p>
                        <p className="text-[11px] text-slate-600 mt-0.5 leading-normal">{item.description}</p>
                      </div>
                      <span className="text-[11px] font-mono text-slate-500 shrink-0 font-semibold">
                        {item.period}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. EXPERIENCE */}
              <div className="space-y-2.5">
                <h2 className="text-xs font-bold font-mono tracking-widest text-slate-900 uppercase border-b border-slate-200 pb-1 flex items-center gap-2 font-heading">
                  <span className="w-2 h-2 rounded-full bg-cyan-600" />
                  {cv.experienceTitle}
                </h2>

                <div className="space-y-3 text-xs sm:text-sm">
                  {t.experience.items.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <p className="font-bold text-slate-900">
                          {item.role} <span className="text-cyan-700">@ {item.company}</span>
                        </p>
                        <span className="text-[11px] font-mono text-slate-500 font-semibold">
                          {item.period}
                        </span>
                      </div>
                      <ul className="list-disc list-inside text-[11px] sm:text-xs text-slate-600 space-y-0.5">
                        {item.description.map((desc, i) => (
                          <li key={i} className="leading-relaxed">
                            {desc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. SKILLS & CERTIFICATIONS GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                {/* Technical Skills */}
                <div className="space-y-2">
                  <h2 className="text-xs font-bold font-mono tracking-widest text-slate-900 uppercase border-b border-slate-200 pb-1 flex items-center gap-2 font-heading">
                    <span className="w-2 h-2 rounded-full bg-cyan-600" />
                    {cv.skillsTitle}
                  </h2>
                  <div className="space-y-1.5 text-[11px] text-slate-700">
                    <p>
                      <strong>Frontend:</strong> React.js, Next.js, Vue.js, TypeScript, Tailwind CSS, HTML5/CSS3
                    </p>
                    <p>
                      <strong>Backend & DB:</strong> PHP, Laravel, Supabase, MySQL, REST APIs
                    </p>
                    <p>
                      <strong>Tools & Design:</strong> Git, GitHub, Figma, Vercel, Postman
                    </p>
                  </div>
                </div>

                {/* Certifications & Languages */}
                <div className="space-y-2">
                  <h2 className="text-xs font-bold font-mono tracking-widest text-slate-900 uppercase border-b border-slate-200 pb-1 flex items-center gap-2 font-heading">
                    <span className="w-2 h-2 rounded-full bg-cyan-600" />
                    {cv.certificationsTitle}
                  </h2>
                  <div className="space-y-1 text-[11px] text-slate-700">
                    {t.education.certificates.map((cert, i) => (
                      <div key={i} className="flex justify-between">
                        <span className="font-semibold text-slate-900">• {cert.title}</span>
                        <span className="text-slate-500 font-mono">{cert.date}</span>
                      </div>
                    ))}
                    <div className="pt-1.5 flex gap-3 text-[11px] text-slate-600 border-t border-slate-100">
                      <span><strong>{cv.languagesTitle}:</strong></span>
                      {cv.languagesList.map((l, i) => (
                        <span key={i}>{l.lang} ({l.level})</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
