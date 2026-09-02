"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/languageContext";
import HeaderActions from "@/components/HeaderActions";

export default function CvPage() {
  const { lang, t } = useLanguage();
  const cv = t.cv;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-8 sm:py-12 px-3 sm:px-6 max-w-5xl mx-auto space-y-6">
      {/* Top Navigation & Action Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-800 shadow-lg">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-300 hover:text-cyan-400 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>{lang === "id" ? "Kembali ke Portofolio" : "Back to Portfolio"}</span>
        </Link>

        <div className="flex items-center gap-3">
          <HeaderActions />
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-bold bg-cyan-500 text-black hover:bg-cyan-400 transition-all cursor-pointer shadow-md shadow-cyan-500/20"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>{cv.downloadPdf} / {cv.print}</span>
          </button>
        </div>
      </div>

      {/* PDF Canvas Sheet */}
      <div className="flex justify-center p-4 sm:p-8 bg-[#13151b] rounded-3xl border border-slate-800 shadow-2xl">
        <div className="w-full max-w-[780px] bg-white text-[#1a1f2c] rounded-xl shadow-2xl p-6 sm:p-12 space-y-6 font-sans select-text printable-cv">
          
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
  );
}
