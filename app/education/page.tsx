import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { EDUCATION_TIMELINE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Education & Achievements | Raka Febrian",
  description: "Latar belakang pendidikan, sertifikasi keahlian, dan penghargaan yang diraih oleh Raka Febrian.",
};

const CERTIFICATES = [
  {
    title: "Frontend Developer Expert",
    issuer: "Dicoding Academy",
    date: "2023",
    skills: ["PWA", "Web Performance", "Clean Code", "Testing"],
  },
  {
    title: "React & Next.js Architecture Specialist",
    issuer: "Coursera / Meta",
    date: "2023",
    skills: ["React Server Components", "State Management", "SSR & SSG"],
  },
  {
    title: "Advanced JavaScript & TypeScript Mastery",
    issuer: "Udemy",
    date: "2022",
    skills: ["Asynchronous JS", "Generics", "Type Safety", "Design Patterns"],
  },
];

export default function EducationPage() {
  return (
    <div className="py-12 sm:py-20 px-4 sm:px-8 max-w-5xl mx-auto space-y-20">
      
      {/* 1. HEADER */}
      <div className="text-center space-y-4" data-aos="fade-up">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs sm:text-sm font-semibold">
          <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
          </svg>
          <span>Pendidikan & Prestasi</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white">Edukasi & Pencapaian</h1>
        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
          Fondasi akademis, sertifikasi profesional, dan pencapaian kompetisi yang telah saya lalui.
        </p>
      </div>

      {/* 2. TIMELINE */}
      <section className="relative border-l-2 border-slate-800 ml-4 md:ml-36 space-y-8 sm:space-y-12">
        {EDUCATION_TIMELINE.map((item, index) => (
          <div
            key={index}
            className="relative pl-6 sm:pl-8 group"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-slate-900 border-2 border-cyan-400 group-hover:scale-150 group-hover:bg-cyan-400 group-hover:shadow-lg group-hover:shadow-cyan-400/50 transition-all duration-300"></div>

            {/* Period Stamp for desktop */}
            <div className="hidden md:block absolute -left-40 top-1 text-sm font-mono font-bold text-slate-400 w-28 text-right group-hover:text-cyan-400 transition-colors">
              {item.period}
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-6 sm:p-8 rounded-2xl hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-300 hover:-translate-y-1">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold block mb-2">
                {item.type} • <span className="inline md:hidden">{item.period}</span>
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                {item.title}
              </h2>
              <p className="text-slate-400 text-sm sm:text-base font-semibold mb-3">
                {item.institution}
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* 3. CERTIFICATIONS GRID */}
      <section className="space-y-8" data-aos="fade-up">
        <div className="text-center sm:text-left space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Sertifikasi & Lisensi</h2>
          <p className="text-slate-400 text-sm">Validasi kompetensi teknis dari platform terkemuka.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CERTIFICATES.map((cert, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono text-cyan-400">
                  <span>{cert.issuer}</span>
                  <span>{cert.date}</span>
                </div>
                <h3 className="text-lg font-bold text-white">{cert.title}</h3>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/80">
                {cert.skills.map((s, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-slate-800 text-slate-300"
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
          href="/#projects"
          className="inline-block px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all hover:-translate-y-0.5"
        >
          Lihat Implementasi Proyek Nyata
        </Link>
      </div>

    </div>
  );
}
