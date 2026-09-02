import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Raka Febrian",
  description: "Tentang Raka Febrian, Front-End Developer & UI/UX enthusiast dari Sidoarjo, Indonesia.",
};

const SKILLS = [
  "HTML5",
  "CSS3",
  "JavaScript (ES6+)",
  "TypeScript",
  "React.js",
  "Next.js",
  "Vue.js",
  "Tailwind CSS",
  "PHP",
  "Laravel",
  "MySQL",
  "Supabase",
  "Figma",
  "Git & GitHub",
  "Vercel",
];

const INTERESTS = [
  {
    title: "Front-End Development",
    desc: "Membangun web app modern dengan React, Next.js, dan Tailwind CSS yang teroptimasi performanya.",
    tag: "Frontend",
  },
  {
    title: "UI/UX Design & Prototyping",
    desc: "Merancang wireframe, user flow, dan desain antarmuka bernuansa modern dan rapi di Figma.",
    tag: "Design",
  },
  {
    title: "Full-Stack Integration",
    desc: "Menghubungkan antarmuka ke backend dan database serverless seperti Supabase, Laravel, dan REST API.",
    tag: "Fullstack",
  },
  {
    title: "Interactive Micro-Interactions",
    desc: "Menambahkan animasi halus, efek hover, dan transisi visual yang membuat web terasa hidup.",
    tag: "Motion",
  },
];

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-20 px-4 sm:px-8 max-w-6xl mx-auto space-y-20">
      
      {/* 1. HERO SECTION */}
      <section className="grid items-center gap-12 lg:grid-cols-[1.2fr_.8fr]">
        <div data-aos="fade-right" className="space-y-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>01 / ABOUT ME</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.05]">
            Designing and building{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
              digital experiences.
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            Halo! Saya <strong>Raka Febrian</strong>, siswa jurusan <strong>SIJA</strong> (Sistem Informasi, Jaringan, dan Aplikasi) di <strong>SMK Telkom Sidoarjo</strong>. Saya memiliki minat mendalam pada <strong>Front-End Development</strong> dan <strong>UI/UX Design</strong>.
          </p>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Bagi saya, website yang baik bukan hanya tentang estetika visual yang memanjakan mata, tetapi juga tentang bagaimana kode di baliknya tersusun rapi, cepat diakses, dan memberikan kenyamanan nyata bagi penggunanya.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all"
            >
              <span>Lihat Hasil Project</span>
              <span>→</span>
            </Link>

            <Link
              href="/#contact"
              className="px-6 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-slate-500 text-slate-200 font-semibold text-sm hover:bg-slate-800 transition-all"
            >
              Hubungi Saya
            </Link>
          </div>
        </div>

        {/* Profile Card Frame */}
        <div data-aos="fade-left" data-aos-delay="150" className="relative mx-auto w-full max-w-[340px] lg:ml-auto">
          <div className="relative aspect-[4/5] rounded-3xl border border-slate-700/70 bg-[#0d131c]/90 p-5 shadow-2xl backdrop-blur-xl flex flex-col justify-between overflow-hidden group">
            {/* Ambient Background Glow inside card */}
            <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-cyan-500/15 blur-2xl group-hover:scale-125 transition-transform duration-700" />
            
            <div className="flex items-center justify-between text-xs font-mono text-slate-500">
              <span>PORTRAIT</span>
              <span className="text-cyan-400 font-semibold">RF / 2026</span>
            </div>

            <div className="my-auto py-8 text-center space-y-4">
              <div className="mx-auto w-24 h-24 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center text-3xl font-black text-white shadow-inner group-hover:scale-105 transition-transform">
                RF
              </div>
              <div>
                <p className="text-xl font-bold text-white tracking-wide">Raka Febrian</p>
                <p className="text-xs font-mono text-cyan-400 mt-1 uppercase tracking-wider">
                  Front-End / UI UX Enthusiast
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Sidoarjo, Indonesia</span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Available
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BENTO DETAILS & STORY */}
      <section className="space-y-12">
        <div className="border-t border-slate-800/80 pt-16" data-aos="fade-up">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400 font-bold">
                02 / BACKGROUND
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white tracking-tight sm:text-4xl">
                Bagaimana Saya Memulai
              </h2>
            </div>

            <div className="space-y-5 text-sm sm:text-base leading-relaxed text-slate-300">
              <p>
                Ketertarikan saya pada dunia pemrograman web berawal dari rasa penasaran tentang bagaimana ide visual dan interaksi digital diwujudkan menjadi website yang dapat digunakan ribuan orang.
              </p>
              <p>
                Melalui kurikulum kejuruan <strong>SIJA di SMK Telkom Sidoarjo</strong> serta eksplorasi mandiri, saya mendalami fundamental pemrograman mulai dari <strong>HTML, CSS, JavaScript, PHP, dan MySQL</strong>, hingga ekosistem modern seperti <strong>React, Next.js, Tailwind CSS, dan Supabase</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* 3. FOCUS AREAS */}
        <div className="space-y-6 pt-6" data-aos="fade-up">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400 font-bold">
                03 / SPECIALIZATION
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-white">
                Fokus Keahlian
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {INTERESTS.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1 space-y-3"
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-cyan-400 font-bold uppercase">{item.tag}</span>
                  <span className="text-slate-600">0{idx + 1}</span>
                </div>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. TECH TOOLKIT */}
        <div className="space-y-6 pt-6" data-aos="fade-up">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400 font-bold">
              04 / TOOLKIT
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-white">
              Teknologi yang Biasa Digunakan
            </h2>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {SKILLS.map((skill, index) => (
              <div
                key={skill}
                className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-all text-xs sm:text-sm font-mono"
              >
                <span className="text-[10px] text-slate-500 font-bold">{String(index + 1).padStart(2, "0")}</span>
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 5. APPROACH & VALUES */}
        <div
          className="p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6"
          data-aos="fade-up"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400 font-bold">
            05 / DESIGN & CODE APPROACH
          </p>

          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            Simple Interfaces, Thoughtful Details.
          </h3>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            Saya percaya bahwa interface yang berkualitas tercipta dari keseimbangan antara tampilan visual yang bersih dan fungsionalitas yang mulus. Setiap detail seperti warna, tipografi, spacing, dan respon animasi harus memiliki tujuan yang jelas untuk membantu pengalaman pengguna.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {["Clean Structure", "Responsive Design", "Fast Loading", "Interactive UI"].map((trait) => (
              <span key={trait} className="px-3.5 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono">
                {trait}
              </span>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
