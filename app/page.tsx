"use client";

import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { supabase } from "@/lib/supabase";

// ==========================================
// DATA PORTOFOLIO - RAKA FEBRIAN
// ==========================================

const TECH_STACK = [
  { name: "Vue.js", bg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" },
  { name: "React.js", bg: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400" },
  { name: "TypeScript", bg: "bg-blue-500/10 border-blue-500/30 text-blue-400" },
  { name: "Tailwind CSS", bg: "bg-sky-500/10 border-sky-500/30 text-sky-400" },
  { name: "Next.js", bg: "bg-zinc-500/10 border-zinc-500/30 text-zinc-200" },
  { name: "Node.js", bg: "bg-green-500/10 border-green-500/30 text-green-400" },
  { name: "JavaScript", bg: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400" },
  { name: "Git & GitHub", bg: "bg-orange-500/10 border-orange-500/30 text-orange-400" },
];

const EXPERIENCES = [
  {
    company: "Tech Corp Indonesia",
    role: "Front-End Developer",
    period: "2024 - Sekarang",
    description: [
      "Mengembangkan aplikasi web berbasis React.js dan Next.js dengan fokus pada optimasi performa dan SEO.",
      "Bekerja sama dengan tim UI/UX untuk mengimplementasikan design system yang konsisten dan responsif.",
      "Meningkatkan skor Lighthouse website utama dari 65 menjadi 95+.",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    company: "Digital Creative Studio",
    role: "Junior Web Developer",
    period: "2023 - 2024",
    description: [
      "Membangun lebih dari 10 landing page interaktif menggunakan Vue.js dan Tailwind CSS.",
      "Mengintegrasikan REST API backend ke dalam antarmuka pengguna secara real-time.",
      "Melakukan refactoring kode legacy untuk mempercepat loading speed halaman.",
    ],
    tech: ["Vue.js", "JavaScript", "REST API"],
  },
  {
    company: "Freelance / Remote",
    role: "Frontend Specialist",
    period: "2022 - 2023",
    description: [
      "Menerima proyek pembuatan portofolio, dashboard admin, dan e-commerce dari klien lokal.",
      "Memastikan tampilan web kompatibel cross-browser dan mobile-friendly.",
    ],
    tech: ["React.js", "Tailwind CSS", "Framer Motion"],
  },
];

const EDUCATION_TIMELINE = [
  {
    type: "Education",
    title: "S1 Teknik Informatika / Sistem Informasi",
    institution: "Universitas Teknologi",
    period: "2020 - 2024",
    description: "Fokus pada Rekayasa Perangkat Lunak dan Pemrograman Web.",
  },
  {
    type: "Achievement",
    title: "Juara 1 Hackathon Web Development",
    institution: "National Tech Competition",
    period: "2023",
    description: "Membuat platform interaktif berbasis Next.js dalam waktu 48 jam.",
  },
  {
    type: "Certification",
    title: "Frontend Developer Career Path",
    institution: "Dicoding / Coursera",
    period: "2023",
    description: "Sertifikasi keahlian spesialisasi React, Vue, dan Web Performance Optimization.",
  },
];

const PROJECTS = [
  {
    title: "E-Commerce Modern Dashboard",
    category: "Web Application",
    description: "Dashboard analitik real-time dengan chart interaktif, dark mode, dan manajemen produk.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts"],
    link: "#",
    gradient: "from-cyan-600 via-blue-600 to-indigo-800",
  },
  {
    title: "AI Writing Assistant App",
    category: "SaaS Platform",
    description: "Platform pembuat konten berbasis AI dengan antarmuka yang bersih dan editor kaya fitur.",
    tech: ["React.js", "Tailwind CSS", "OpenAI API"],
    link: "#",
    gradient: "from-purple-600 via-indigo-600 to-blue-800",
  },
  {
    title: "Interactive Learning Hub",
    category: "EdTech",
    description: "Aplikasi pembelajaran interaktif dengan fitur kuis, modul video, dan pencapaian pengguna.",
    tech: ["Vue.js", "Pinia", "Tailwind CSS"],
    link: "#",
    gradient: "from-emerald-600 via-teal-600 to-cyan-800",
  },
];

// ==========================================
// KOMPONEN UTAMA
// ==========================================

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Form State & Feedback
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // Typing Effect
  const [textIndex, setTextIndex] = useState(0);
  const roles = ["Front-End Developer", "UI/UX Enthusiast", "React & Vue Specialist"];
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Inisialisasi AOS (Animate On Scroll)
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
      offset: 120,
    });
  }, []);

  // Scroll Handler Navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Typing Effect Logic
  useEffect(() => {
    const currentRole = roles[textIndex % roles.length];
    const speed = isDeleting ? 40 : 90;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentRole) {
        setTimeout(() => setIsDeleting(true), 1800);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setTextIndex((prev) => prev + 1);
      } else {
        setDisplayText(
          isDeleting
            ? currentRole.substring(0, displayText.length - 1)
            : currentRole.substring(0, displayText.length + 1)
        );
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, textIndex]);

  // Project Categories Dynamic Filter
  const categories = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))];
  const filteredProjects =
    selectedCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  // Form Submit Handler (Supabase)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("messages").insert([
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
      ]);

      if (error) {
        throw error;
      }

      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Gagal mengirim pesan ke Supabase:", err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Education", href: "#education" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 font-sans tracking-wide selection:bg-cyan-500 selection:text-black scroll-smooth relative overflow-x-hidden">
      
      {/* BACKGROUND GLOW DEKORATIF */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] md:w-[1000px] h-[300px] sm:h-[500px] bg-gradient-to-tr from-cyan-500/10 via-blue-600/10 to-transparent blur-[100px] sm:blur-[140px] pointer-events-none z-0"></div>

      {/* 1. STICKY / FLOATING NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 transition-all duration-500 pointer-events-none">
        <nav
          className={`mx-auto pointer-events-auto transition-all duration-500 ease-in-out ${
            scrolled
              ? "max-w-5xl rounded-full bg-[#0b0f17]/80 backdrop-blur-xl border border-slate-800/80 py-3 px-6 shadow-2xl shadow-cyan-950/30"
              : "max-w-7xl rounded-2xl bg-transparent py-4 px-4 border border-transparent"
          }`}
        >
          <div className="w-full flex items-center justify-between">
            <a href="#" className="font-extrabold text-2xl tracking-tight flex items-center gap-3 group">
              <span className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 font-mono text-base font-bold shadow-lg shadow-cyan-500/10">
                RF
              </span>
              <span className="text-white group-hover:text-cyan-400 transition-colors">Portofolio</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8 text-base font-semibold text-slate-300">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="hover:text-cyan-400 transition-all hover:-translate-y-0.5"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="hidden md:block">
              <a
                href="#contact"
                className="text-sm font-bold px-6 py-2.5 rounded-full border-2 border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 active:scale-95 inline-block"
              >
                Get In Touch
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-slate-300 hover:text-white focus:outline-none p-2 rounded-lg bg-slate-900/50 border border-slate-800"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Navigation Drawer */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-slate-800 flex flex-col gap-4 animate-fadeIn">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-slate-300 hover:text-cyan-400 font-semibold text-lg py-1 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-center text-sm font-bold px-6 py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-all mt-2"
              >
                Get In Touch
              </a>
            </div>
          )}
        </nav>
      </header>

      {/* 2. HERO SECTION */}
      <section id="about" className="relative z-10 pt-36 sm:pt-48 pb-16 sm:pb-24 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 sm:gap-16 min-h-[90vh]">
        <div className="flex-1 space-y-6 sm:space-y-8 text-center md:text-left" data-aos="fade-right">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold shadow-sm hover:scale-105 transition-transform duration-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            Available for Work
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-tight">
            Hi, Saya <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 animate-pulse">Raka Febrian</span>
          </h1>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-200 min-h-[40px] flex items-center justify-center md:justify-start gap-2">
            <span>Saya seorang</span> <span className="text-cyan-400 font-bold">{displayText}</span>
            <span className="w-1 h-6 sm:h-7 bg-cyan-400 animate-pulse"></span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl font-normal mx-auto md:mx-0">
            Berfokus pada pembuatan antarmuka web yang bersih, responsif, dan kaya interaksi visual dengan performa tinggi.
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-5 pt-2 sm:pt-4">
            <a
              href="#projects"
              className="w-full sm:w-auto text-center px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-base shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/50 hover:-translate-y-1 transition-all duration-300 active:scale-95"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto text-center px-8 py-4 rounded-xl bg-slate-800/90 border border-slate-700 text-slate-200 font-bold text-base hover:bg-slate-800 hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-300 active:scale-95"
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* Profile Frame with Glow */}
        <div className="relative group w-full max-w-[280px] sm:max-w-sm md:w-auto" data-aos="zoom-in" data-aos-delay="200">
          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition duration-700 group-hover:scale-110"></div>
          
          <div className="relative w-full aspect-[4/5] rounded-2xl border-2 border-dashed border-slate-700 bg-slate-900/90 p-4 shadow-2xl flex flex-col items-center justify-center group-hover:border-cyan-500/50 transition-all duration-500 group-hover:-translate-y-2">
            <div className="w-full h-full rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-20 h-20 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-cyan-500/50 transition-all duration-300 shadow-md">
                <svg className="w-10 h-10 text-slate-500 group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <p className="text-base font-bold text-slate-300 mb-1">Foto Profile</p>
              <p className="text-xs font-mono text-slate-500">Area pasfoto / portrait</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TECH STACK / TOOLS */}
      <section className="relative z-10 py-14 border-y border-slate-800/80 bg-slate-900/30 overflow-hidden backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 mb-8" data-aos="fade-up">
          <p className="text-sm font-mono uppercase tracking-widest text-slate-400 font-bold text-center md:text-left">
            Tech Stack & Tools Favorit
          </p>
        </div>

        {/* Infinite Moving Tools Marquee dengan Overlay Masking */}
        <div className="relative w-full overflow-hidden" data-aos="fade-up" data-aos-delay="100">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0b0f17] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0b0f17] to-transparent z-10 pointer-events-none"></div>
          
          <div className="flex gap-6 animate-marquee whitespace-nowrap py-2">
            {[...TECH_STACK, ...TECH_STACK].map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-3 px-6 py-4 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer ${item.bg}`}
              >
                <span className="font-bold text-base tracking-wide">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. EXPERIENCE SECTION */}
      <section id="experience" className="relative z-10 py-20 sm:py-28 max-w-5xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-12 sm:mb-20" data-aos="fade-up">
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">Pengalaman Kerja</h2>
          <p className="text-slate-400 text-base sm:text-lg">Jejak karir dan kontribusi saya dalam pengembangan perangkat lunak.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-10 bg-slate-900/60 backdrop-blur-md p-6 sm:p-10 rounded-3xl border border-slate-800 hover:border-cyan-500/30 transition-all duration-500 shadow-xl" data-aos="fade-up" data-aos-delay="100">
          {/* Company List Tabs */}
          <div className="flex md:flex-col overflow-x-auto gap-2 sm:gap-3 border-b md:border-b-0 md:border-r border-slate-800 pb-4 md:pb-0 md:pr-6 min-w-full md:min-w-[220px]">
            {EXPERIENCES.map((exp, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`text-left px-5 py-3.5 rounded-xl text-sm sm:text-base font-bold transition-all duration-300 whitespace-nowrap ${
                  activeTab === index
                    ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/40 shadow-lg shadow-cyan-500/10 translate-x-0 md:translate-x-1"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                {exp.company}
              </button>
            ))}
          </div>

          {/* Details Content */}
          <div className="flex-1 space-y-6 pt-2 md:pt-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {EXPERIENCES[activeTab].role}{" "}
                <span className="text-cyan-400">@ {EXPERIENCES[activeTab].company}</span>
              </h3>
              <span className="text-xs font-mono font-bold text-slate-300 bg-slate-800/90 border border-slate-700 px-4 py-1.5 rounded-full w-fit">
                {EXPERIENCES[activeTab].period}
              </span>
            </div>

            <ul className="space-y-4 pt-2">
              {EXPERIENCES[activeTab].description.map((desc, i) => (
                <li key={i} className="text-slate-300 text-sm sm:text-base flex items-start gap-4 leading-relaxed">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 mt-2 shrink-0 shadow-sm shadow-cyan-400"></span>
                  <span>{desc}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 sm:gap-3 pt-4">
              {EXPERIENCES[activeTab].tech.map((t, i) => (
                <span key={i} className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. EDUCATION & ACHIEVEMENTS */}
      <section id="education" className="relative z-10 py-20 sm:py-28 bg-slate-900/20 border-y border-slate-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-12 sm:mb-20" data-aos="fade-up">
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">Edukasi & Pencapaian</h2>
            <p className="text-slate-400 text-base sm:text-lg">Latar belakang pendidikan formal dan sertifikasi keahlian.</p>
          </div>

          <div className="relative border-l-2 border-slate-800 ml-4 md:ml-36 space-y-8 sm:space-y-12">
            {EDUCATION_TIMELINE.map((item, index) => (
              <div key={index} className="relative pl-6 sm:pl-8 group" data-aos="fade-up" data-aos-delay={index * 100}>
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
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">{item.title}</h3>
                  <p className="text-slate-400 text-sm sm:text-base font-semibold mb-3">{item.institution}</p>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FEATURED PROJECTS */}
      <section id="projects" className="relative z-10 py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-10 sm:mb-16" data-aos="fade-up">
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">Featured Projects</h2>
          <p className="text-slate-400 text-base sm:text-lg mb-8">Kumpulan proyek unggulan yang pernah saya bangun.</p>

          {/* Interactive Project Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20"
                    : "bg-slate-800/80 text-slate-300 border border-slate-700 hover:border-cyan-500/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredProjects.map((proj, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 150}
              className="group bg-slate-900/50 rounded-3xl border border-slate-800 overflow-hidden hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 hover:-translate-y-3 flex flex-col justify-between"
            >
              <div>
                {/* Visual Cover Banner Gradient */}
                <div className={`relative h-48 sm:h-52 w-full bg-gradient-to-tr ${proj.gradient} p-6 sm:p-8 flex flex-col justify-between overflow-hidden group-hover:scale-105 transition-transform duration-500`}>
                  <div className="flex justify-between items-center z-10">
                    <span className="text-xs font-mono font-bold bg-black/50 text-slate-200 px-3 py-1 rounded-md backdrop-blur-md">
                      Project #{idx + 1}
                    </span>
                    <svg className="w-5 h-5 text-slate-200 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>

                  <div className="z-10">
                    <p className="text-white font-extrabold text-lg sm:text-xl tracking-wide">{proj.title}</p>
                  </div>

                  <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-white/10 blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                </div>

                {/* Project Info */}
                <div className="p-6 sm:p-8 space-y-4">
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">{proj.category}</span>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{proj.description}</p>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0 space-y-6">
                <div className="flex flex-wrap gap-2">
                  {proj.tech.map((t, i) => (
                    <span key={i} className="text-xs font-mono px-3 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href={proj.link}
                  className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-cyan-400 hover:text-cyan-300 transition-colors group/link"
                >
                  View Details
                  <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. INTERACTIVE CONTACT SECTION */}
      <section id="contact" className="relative z-10 py-20 sm:py-28 border-t border-slate-800/80 bg-slate-900/30 px-4 sm:px-8">
        <div className="max-w-3xl mx-auto space-y-8" data-aos="zoom-in">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-5xl font-black text-white">Mari Bekerja Sama!</h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Saya selalu terbuka untuk berdiskusi tentang peluang karir baru, proyek freelance, atau sekadar bertukar pikiran seputar pengembangan web.
            </p>
          </div>

          {/* Form Kontak Interaktif */}
          <form onSubmit={handleSubmit} className="bg-slate-900/80 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-5 text-left shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-slate-300 uppercase">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-slate-300 uppercase">Email</label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-slate-300 uppercase">Pesan</label>
              <textarea
                required
                rows={4}
                placeholder="Halo Raka, saya berminat untuk bekerja sama..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors text-sm resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-cyan-500 text-black font-extrabold text-base hover:bg-cyan-400 hover:shadow-xl hover:shadow-cyan-500/30 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending Message..." : "Kirim Pesan"}
            </button>

            {/* Notification Alert */}
            {submitStatus === "success" && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-center font-semibold text-sm animate-fadeIn">
                ✓ Pesan berhasil terkirim! Saya akan segera menghubungi Anda.
              </div>
            )}
          </form>

          <div className="pt-4 flex justify-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 font-bold text-sm hover:bg-slate-700 hover:border-cyan-500/50 transition-all hover:-translate-y-0.5 active:scale-95"
            >
              GitHub Profile
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-10 border-t border-slate-800 text-center text-xs sm:text-sm font-medium text-slate-400">
        <p>© {new Date().getFullYear()} Raka Febrian. Built with Next.js & Tailwind CSS.</p>
      </footer>

      {/* CSS Animation Keyframes */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}