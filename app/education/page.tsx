import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { EDUCATION_TIMELINE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Education & Certifications | Raka Febrian",
  description: "Latar belakang pendidikan formal, sertifikasi keahlian, dan validasi kompetensi Raka Febrian.",
};

const CERTIFICATES = [
  {
    title: "Full-Stack Web & Software Engineering",
    issuer: "Dicoding Academy",
    date: "2024",
    skills: ["REST API", "Database Design", "Clean Architecture", "Testing"],
  },
  {
    title: "Azure AI Fundamentals (AI-900) Certification",
    issuer: "Microsoft x KOMDIGI",
    date: "2025",
    skills: ["Cloud Concepts", "Machine Learning", "Computer Vision", "NLP"],
  },
  {
    title: "Advanced JavaScript & TypeScript Architecture",
    issuer: "Meta / Coursera",
    date: "2023",
    skills: ["State Management", "Type Safety", "Full-Stack React", "Design Patterns"],
  },
];

export default function EducationPage() {
  return (
    <div className="py-16 sm:py-24 px-5 sm:px-8 max-w-5xl mx-auto space-y-20 bg-[#0A0A0C] text-[#F8FAFC]">
      
      {/* 1. HEADER */}
      <div className="text-center space-y-4" data-aos="fade-up">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-amber-400 text-xs font-mono tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span>Academic Background</span>
        </div>
        <h1 className="font-sans text-4xl sm:text-6xl font-bold text-white tracking-tight">
          Edukasi & Fondasi Teknis
        </h1>
        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto font-sans leading-relaxed">
          Fondasi kejuruan di SMK Telkom Sidoarjo, sertifikasi industri berstandar global, dan rekam jejak inovasi berkelanjutan.
        </p>
      </div>

      {/* 2. TIMELINE */}
      <section className="relative border-l border-white/15 ml-4 md:ml-36 space-y-8 sm:space-y-12">
        {EDUCATION_TIMELINE.map((item, index) => (
          <div
            key={index}
            className="relative pl-6 sm:pl-8 group"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[7px] top-3 w-3.5 h-3.5 rounded-full bg-[#0A0A0C] border-2 border-amber-400 group-hover:scale-125 group-hover:bg-amber-400 transition-all duration-300 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />

            {/* Period Stamp for desktop */}
            <div className="hidden md:block absolute -left-40 top-2 text-xs font-mono tracking-wider uppercase text-slate-400 w-28 text-right group-hover:text-amber-400 transition-colors">
              {item.period}
            </div>

            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-3xl hover:border-white/20 transition-all duration-300 shadow-xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                  {item.type}
                </span>
                <span className="text-slate-600 text-xs md:hidden">•</span>
                <span className="text-xs font-mono text-slate-400 md:hidden">{item.period}</span>
              </div>
              <h2 className="font-sans text-xl sm:text-2xl text-white mb-1 group-hover:text-amber-400 transition-colors font-bold">
                {item.title}
              </h2>
              <p className="text-amber-400 text-sm font-sans mb-3 font-medium">
                {item.institution}
              </p>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-sans font-normal">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* 3. CERTIFICATIONS GRID */}
      <section className="space-y-8" data-aos="fade-up">
        <div className="text-center sm:text-left space-y-2 border-b border-white/10 pb-4">
          <h2 className="font-sans text-2xl sm:text-3xl font-bold text-white">
            Sertifikasi & Lisensi Resmi
          </h2>
          <p className="text-slate-400 text-sm font-sans">Validasi keahlian teknis dan standar industri.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CERTIFICATES.map((cert, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 space-y-4 flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono text-amber-400">
                  <span className="font-bold">{cert.issuer}</span>
                  <span className="text-slate-400">{cert.date}</span>
                </div>
                <h3 className="font-sans text-lg text-white font-bold leading-snug">{cert.title}</h3>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.08]">
                {cert.skills.map((s, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-slate-300"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CTA */}
      <div className="text-center pt-6" data-aos="fade-up">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-[#0A0A0C] font-sans font-bold text-sm transition-all hover:scale-[1.02] shadow-lg shadow-amber-500/20"
        >
          <span>Eksplorasi Proyek Nyata</span>
          <span>→</span>
        </Link>
      </div>

    </div>
  );
}
