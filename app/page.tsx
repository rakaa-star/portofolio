"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import TechMarquee from "@/components/TechMarquee";
import ProjectCard from "@/components/ProjectCard";
import PrestasiSection from "@/components/PrestasiSection";
import InteractiveTools from "@/components/InteractiveTools";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import TextReveal from "@/components/TextReveal";
import MagneticButton from "@/components/MagneticButton";
import ScrollCardReveal from "@/components/ScrollCardReveal";
import GlareCard from "@/components/GlareCard";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/lib/languageContext";
import { TechIcon } from "@/components/TechIcon";

export default function Home() {
  const { t, lang, openCvModal } = useLanguage();

  // Dynamic Typewriter Role
  const [textIndex, setTextIndex] = useState(0);
  const roles = t.hero.roles;
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Projects Filter & Search State
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Contact Form State (Supabase) & UI State
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [localTime, setLocalTime] = useState("");

  // Live Local Time (WIB / Sidoarjo, Indonesia)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Jakarta",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setLocalTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("mr.rakka23@gmail.com");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 3000);
    } catch (err) {
      console.error("Gagal menyalin email:", err);
    }
  };

  // Typing animation for roles
  useEffect(() => {
    const currentRole = roles[textIndex % roles.length];
    const speed = isDeleting ? 30 : 75;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentRole) {
        setTimeout(() => setIsDeleting(true), 2400);
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
  }, [displayText, isDeleting, textIndex, roles]);

  // Project Categories Dynamic Filter
  const projectItems = t.projects.items;
  const uniqueCategories = Array.from(
    new Set(projectItems.map((p) => p.category))
  );
  const categories = [
    { id: "all", label: t.projects.allCategory },
    ...uniqueCategories.map((c) => ({ id: c, label: c })),
  ];

  const filteredProjects = projectItems.filter((proj) => {
    const matchesCategory =
      selectedCategory === "all" || proj.category === selectedCategory;
    const matchesSearch =
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.tech.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

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
      setTimeout(() => setSubmitStatus("idle"), 6000);
    }
  };

  const scrollTo = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const SOCIAL_LINKS = [
    {
      name: "WhatsApp",
      href: "https://wa.me/6288991304142",
      label: "088991304142",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "https://github.com/rakaa-star",
      label: "rakaa-star",
      icon: <TechIcon name="github" className="w-4 h-4" />,
    },
    {
      name: "Instagram",
      href: "https://instagram.com/rakaafeb_",
      label: "@rakaafeb_",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: "Email",
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=mr.rakka23@gmail.com",
      label: "mr.rakka23@gmail.com",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  const SKILL_ROWS = [
    {
      category: "FRONT-END ARCHITECTURE",
      items: "React.js · Next.js · TypeScript · Tailwind CSS · Vue.js · HTML5/CSS3",
    },
    {
      category: "BACK-END & DATABASE",
      items: "PHP · Laravel · Node.js · REST APIs · PostgreSQL / Supabase · MySQL",
    },
    {
      category: "DESIGN & TOOLING",
      items: "Figma · Design Tokens · Git & GitHub · Modern Motion Easing · Vercel",
    },
  ];

  const EDITORIAL_PRINCIPLES = [
    {
      number: "01",
      title: lang === "id" ? "Kejelasan Di Atas Kompleksitas" : "Clarity Over Complexity",
      subtitle: lang === "id" ? "Struktur Kode & Modularitas" : "Clean Code & Modularity",
      description:
        lang === "id"
          ? "Menghadirkan arsitektur kode yang modular, type-safe, dan terpelihara. Menyelesaikan masalah teknis dengan kesederhanaan terukur tanpa kerumitan yang tidak beralasan."
          : "Engineering modular, type-safe architectures. Solving engineering challenges with measured simplicity rather than gratuitous complexity.",
      tags: ["Clean Architecture", "Type-Safe", "Component Design"],
    },
    {
      number: "02",
      title: lang === "id" ? "Fungsi & Estetika Seimbang" : "Function & Aesthetic in Balance",
      subtitle: lang === "id" ? "Desain Antarmuka Terarah" : "Purposeful Interface Design",
      description:
        lang === "id"
          ? "Estetika bukan sekadar dekorasi visual, melainkan panduan navigasi yang memperjelas hierarki informasi dan mempermudah kenyamanan pengguna."
          : "Visual craft is not decorative surface; it is navigation clarity. Hierarchy, contrast, and typography guide human attention effortlessly.",
      tags: ["UI Craft", "Typography Scale", "Design Systems"],
    },
    {
      number: "03",
      title: lang === "id" ? "Perhatian Penuh Pada Detail" : "Obsessive Attention to Detail",
      subtitle: lang === "id" ? "Kecepatan & Aksesibilitas" : "Performance & Accessibility",
      description:
        lang === "id"
          ? "Setiap transisi mikro, target sentuh responsif, markup semantik, dan waktu muat halaman dioptimalkan untuk mencapai skor performa tinggi (Lighthouse 95+)."
          : "Every micro-interaction, responsive touch target, semantic HTML element, and load latency is tuned for high performance (Lighthouse 95+).",
      tags: ["Lighthouse 95+", "WCAG AAA", "Smooth Transitions"],
    },
    {
      number: "04",
      title: lang === "id" ? "Iterasi & Pembelajaran Berkelanjutan" : "Continuous Iteration & Mastery",
      subtitle: lang === "id" ? "Eksplorasi Teknologi Modern" : "Exploring Modern Frameworks",
      description:
        lang === "id"
          ? "Terus memperdalam ekosistem front-end modern, integrasi cloud, fondasi AI, serta animasi 2D berkelas untuk menciptakan karya bernilai tinggi."
          : "Continuously mastering modern front-end ecosystems, cloud integrations, AI fundamentals, and refined 2D motion craft.",
      tags: ["Lifelong Learning", "Cloud & AI", "Modern Motion"],
    },
  ];

  return (
    <div className="space-y-36 sm:space-y-48 lg:space-y-56 pb-24 scroll-smooth">

      {/* ========================================================================= */}
      {/* 1. HERO SECTION: PURE 2D EDITORIAL ASYMMETRIC GRID (NO 3D/WEBGL)          */}
      {/* ========================================================================= */}
      <section
        id="home"
        className="px-5 sm:px-8 max-w-7xl mx-auto min-h-[90vh] pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 scroll-mt-32 relative flex flex-col justify-between"
      >
        {/* Subtle Ambient Radial Lighting for Spatial Depth */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_75%_50%_at_50%_-10%,rgba(245,158,11,0.06),transparent)] pointer-events-none"
        />

        {/* Strict 12-Column Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative z-10">

          {/* ===================================================================== */}
          {/* LEFT COLUMN: STRONG TYPOGRAPHIC INTRODUCTION (lg:col-span-7)          */}
          {/* ===================================================================== */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">

            {/* Live Availability & Institution Indicator */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono tracking-wider uppercase backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-white font-semibold">AVAILABLE FOR PROJECTS</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">SIJA TELKOM SIDOARJO</span>
            </div>

            {/* Main Typographic Headline with Staggered Line Masking */}
            <div className="space-y-2">
              <TextReveal delay={100} as="h1" className="font-sans font-extrabold text-[clamp(2.75rem,5.5vw,5.25rem)] tracking-tight leading-[1.02] text-left text-white">
                Hi, I&apos;m Raka{" "}
                <span className="text-gradient-gold">Febrian</span>
                <span className="text-amber-500">.</span>
              </TextReveal>

              {/* Dynamic Role Sub-heading with High-Contrast Typewriter */}
              <TextReveal delay={250} as="div" className="pt-1 flex items-center gap-2.5 text-base sm:text-lg font-mono text-slate-300 min-h-[2rem]">
                <span className="text-amber-400 text-xs uppercase tracking-widest font-bold shrink-0">
                  {t.hero.rolePrefix}:
                </span>
                <span className="text-white font-semibold tracking-wide">
                  {displayText || "Front-End Developer & UI Engineer"}
                </span>
                <span className="w-2 h-4 bg-amber-400 animate-pulse rounded-xs" />
              </TextReveal>
            </div>

            {/* Impact Statement / Bio Copy with Staggered Reveal */}
            <TextReveal delay={350} as="p" className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl font-sans font-normal">
              {t.hero.bio}
            </TextReveal>

            {/* CTA Button Cluster with Magnetic Physics */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {/* Primary CTA: Magnetic Gold Button */}
              <MagneticButton
                onClick={() => scrollTo("projects")}
                className="h-12 px-7 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#0A0A0C] font-sans font-bold text-sm shadow-xl shadow-amber-500/25 group"
              >
                <span>{t.hero.viewProjects}</span>
                <span className="ml-2 text-base group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </MagneticButton>

              {/* Secondary CTA: Magnetic Glassmorphism Button */}
              <MagneticButton
                onClick={openCvModal}
                className="h-12 px-6 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 hover:border-amber-400/50 font-sans font-semibold text-sm backdrop-blur-md"
              >
                <span>{t.hero.viewCv}</span>
                <span className="ml-2 text-amber-400 text-xs">↗</span>
              </MagneticButton>

              {/* Tertiary CTA: Magnetic Contact Button */}
              <MagneticButton
                onClick={() => scrollTo("contact")}
                className="h-12 px-5 rounded-xl border border-white/[0.08] hover:border-white/20 bg-transparent hover:bg-white/[0.03] text-slate-400 hover:text-white font-sans font-medium text-sm"
              >
                <span>{t.hero.contactMe}</span>
              </MagneticButton>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>100% Lighthouse Performance</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Modern Glassmorphism</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>Scroll-Driven 3D WebGL Canvas</span>
              </div>
            </div>

          </div>

          {/* ===================================================================== */}
          {/* RIGHT COLUMN: 2D EDITORIAL GLARECARD BENTO SHOWCASE (NO 3D/WEBGL)     */}
          {/* ===================================================================== */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center">

            <div className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[400px]">
              {/* Radial Lighting Foundation */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-tr from-amber-500/[0.08] via-indigo-500/[0.06] to-transparent rounded-full blur-3xl pointer-events-none"
              />

              {/* 2D Interactive Glare Card with Mouse Shimmer & 1.02x Spring Elevation */}
              <GlareCard className="p-3 w-full shadow-2xl">
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-slate-950 border border-white/10 group">
                  <Image
                    src="/image raka/dfdc7ef9-b22d-44c5-902f-2a5132f2f509.png"
                    alt="Raka Febrian Ardi P."
                    fill
                    priority
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 380px"
                  />

                  {/* High Contrast Ambient Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/20 to-transparent opacity-85 group-hover:opacity-60 transition-opacity duration-500" />

                  {/* Top Live Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#0A0A0C]/90 text-amber-400 border border-white/10 backdrop-blur-md shadow-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      AVAILABLE Q2/Q3
                    </span>

                    <span className="font-mono text-[10px] text-white px-2.5 py-1 rounded-full bg-[#0A0A0C]/90 border border-white/10 backdrop-blur-md">
                      Sidoarjo, ID
                    </span>
                  </div>

                  {/* Bottom Caption Inside Card */}
                  <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-[#0A0A0C] to-transparent flex items-end justify-between z-10">
                    <div>
                      <p className="text-lg font-sans font-bold text-white leading-tight">
                        Raka Febrian
                      </p>
                      <p className="text-xs text-amber-400 font-mono mt-0.5">
                        Front-End & UI Engineer
                      </p>
                    </div>

                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-300 px-2.5 py-1 rounded-full bg-white/[0.08] border border-white/10 backdrop-blur-md">
                      SIJA Telkom
                    </span>
                  </div>
                </div>

                {/* Sub-card Micro Metric Strip */}
                <div className="mt-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-400">Architecture:</span>
                  <span className="text-amber-400 font-bold">Next.js 16 • React 19</span>
                  <span className="text-emerald-400">100% Valid</span>
                </div>
              </GlareCard>
            </div>

          </div>

        </div>

        {/* Technical Domain Skills Strip - Interactive Architecture Pills */}
        <div className="w-full pt-8 sm:pt-10 mt-12 sm:mt-16 border-t border-white/[0.08] relative z-10">
            <div className="max-w-5xl space-y-4">
              {SKILL_ROWS.map((row, i) => (
                <div
                  key={i}
                  className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-6 text-xs font-mono"
                >
                  <div className="flex items-center gap-2 w-56 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span className="text-amber-400 font-bold tracking-wider text-[11px] uppercase">
                      {row.category}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {row.items.split(" · ").map((item, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.08] text-zinc-300 hover:border-amber-400/40 hover:text-white transition-all text-xs"
                      >
                        <TechIcon name={item} className="w-3.5 h-3.5 text-zinc-400" />
                        <span>{item}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

      </section>

      {/* ========================================================================= */}
      {/* 2. REFINED TECH MARQUEE                                                   */}
      {/* ========================================================================= */}
      <TechMarquee />

      {/* ========================================================================= */}
      {/* 3. SECTION 01: PHILOSOPHY & PRINCIPLES                                    */}
      {/* ========================================================================= */}
      <section id="about" className="max-w-6xl mx-auto px-5 sm:px-8 space-y-14 scroll-mt-32">
        <div className="space-y-4" data-aos="fade-up">
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-amber-400">
            <span className="w-8 h-px bg-amber-400" />
            <span>01 / ENGINEERING PHILOSOPHY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold text-white tracking-tight">
            {t.about.principalsTitle}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl font-sans leading-relaxed">
            {t.about.principalsSubtitle}
          </p>
        </div>

        {/* 4 Pillars Grid with Glare & Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
          {EDITORIAL_PRINCIPLES.map((principle, idx) => (
            <ScrollCardReveal
              key={idx}
              delay={idx * 80}
              rotation={idx % 2 === 0 ? 0.6 : -0.6}
            >
              <GlareCard className="p-7 sm:p-9 h-full flex flex-col justify-between">
                <div className="space-y-6">
                  {/* Top Bar: Editorial index & Subtitle */}
                  <div className="flex items-center justify-between border-b border-white/[0.07] pb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-semibold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded">
                        SEC.{principle.number}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400/60" />
                    </div>
                    <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest">
                      {principle.subtitle}
                    </span>
                  </div>

                  {/* Main Editorial Title & Description */}
                  <div className="space-y-3">
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight leading-snug group-hover:text-amber-400 transition-colors duration-300">
                      {principle.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed font-sans font-normal">
                      {principle.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Tags */}
                <div className="flex flex-wrap gap-2 pt-5 mt-6 border-t border-white/[0.06]">
                  {principle.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] font-mono px-3 py-1 rounded-md bg-white/[0.03] text-zinc-300 border border-white/[0.07] group-hover:border-amber-400/20 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </GlareCard>
            </ScrollCardReveal>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SECTION 02: TECHNICAL INDEX (Grouped by Domains & 3D Core)             */}
      {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-6" data-aos="fade-up">
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-amber-400">
                <span className="w-8 h-px bg-amber-400" />
                <span>02 / TECHNICAL ARCHITECTURE</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-sans font-bold text-white">
                {t.about.techTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-sans max-w-xl">
                {t.about.techSubtitle}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-amber-400 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                Interactive 3D Technology Mesh
              </span>
            </div>
          </div>

          <div data-aos="fade-up">
            <InteractiveTools />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. SECTION 03: SLEEK INTERACTIVE EXPERIENCE TIMELINE                      */}
        {/* ========================================================================= */}
        <section id="experience" className="max-w-6xl mx-auto px-5 sm:px-8 space-y-14 scroll-mt-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8" data-aos="fade-up">
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-amber-400">
                <span className="w-8 h-px bg-amber-400" />
                <span>03 / TRACK RECORD & MILESTONES</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-sans font-bold text-white tracking-tight">
                {t.experience.title}
              </h2>
              <p className="text-slate-400 text-sm sm:text-base max-w-xl font-sans">
                {t.experience.subtitle}
              </p>
            </div>

            <span className="font-mono text-xs text-amber-400 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
              Verified Track Record
            </span>
          </div>

          {/* Sleek Interactive Editorial Timeline with Glowing Vertical Spine */}
          <ExperienceTimeline items={t.experience.items} lang={lang} />
        </section>

        {/* ========================================================================= */}
        {/* 6. SECTION 04: ACHIEVEMENTS & CERTIFICATES ARCHIVE                        */}
        {/* ========================================================================= */}
        <PrestasiSection />

        {/* ========================================================================= */}
        {/* 7. SECTION 05: SELECTED WORKS GALLERY                                     */}
        {/* ========================================================================= */}
        <section id="projects" className="max-w-7xl mx-auto px-5 sm:px-8 space-y-14 scroll-mt-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8" data-aos="fade-up">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-amber-400">
                <span className="w-8 h-px bg-amber-400" />
                <span>05 / SELECTED WORKS</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-sans font-bold text-white tracking-tight">
                {t.projects.title}
              </h2>
              <p className="text-slate-400 text-sm sm:text-base max-w-xl font-sans font-normal leading-relaxed">
                {t.projects.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-amber-400 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                {filteredProjects.length} Works Displayed
              </span>
            </div>
          </div>

          {/* Filter Controls & Search */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-5" data-aos="fade-up">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4.5 py-2 rounded-full text-xs font-sans font-medium transition-all duration-300 cursor-pointer ${selectedCategory === cat.id
                      ? "bg-amber-500 text-[#0A0A0C] font-bold shadow-lg shadow-amber-500/20"
                      : "bg-white/[0.04] text-slate-300 border border-white/10 hover:border-amber-400/50 hover:text-white"
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="w-full md:w-80 group">
              <div className="relative">
                <input
                  type="text"
                  placeholder={t.projects.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-5 py-2.5 pl-11 rounded-full bg-white/[0.04] border border-white/10 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all"
                />
                <svg
                  className="w-4 h-4 text-slate-400 absolute left-4 top-3.5 group-focus-within:text-amber-400 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Projects Editorial Gallery Grid with Scroll Reveal */}
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20 bg-white/[0.02] rounded-3xl border border-white/10">
              <p className="text-lg font-sans font-bold text-white mb-2">
                {t.projects.noResultsTitle}
              </p>
              <p className="text-slate-400 text-xs sm:text-sm">
                {t.projects.noResultsDesc}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((proj, idx) => (
                <ScrollCardReveal
                  key={idx}
                  delay={idx * 60}
                  rotation={idx % 2 === 0 ? 0.8 : -0.8}
                >
                  <ProjectCard
                    proj={proj}
                    idx={idx}
                  />
                </ScrollCardReveal>
              ))}
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* 8. SECTION 06: PORTRAIT & BACKGROUND SPOTLIGHT                            */}
        {/* ========================================================================= */}
        <section id="who-i-am" className="max-w-6xl mx-auto px-5 sm:px-8 space-y-12 scroll-mt-32">
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-amber-400" data-aos="fade-up">
            <span className="w-8 h-px bg-amber-400" />
            <span>06 / PORTRAIT & CREDENTIALS</span>
          </div>

          <GlareCard className="p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left Column: Portrait Frame */}
              <div className="lg:col-span-5 flex flex-col items-center lg:items-start space-y-5">
                <div className="relative group w-full max-w-[280px] sm:max-w-[300px]">
                  <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-slate-950 p-2 border border-white/10 shadow-2xl group-hover:border-amber-400/50 transition-colors">
                    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#0A0A0C]">
                      <Image
                        src="/image raka/2fc2d00b-c3a3-42fc-ad07-3856560d3bf5.png"
                        alt={t.profileSpotlight.name}
                        fill
                        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-transparent opacity-85" />

                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <p className="text-base font-sans font-bold leading-tight">
                          {t.profileSpotlight.name}
                        </p>
                        <p className="text-xs text-amber-400 font-mono mt-0.5">
                          Front-End & UI Engineer
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -top-2.5 -right-2.5 px-3 py-1 rounded-full bg-amber-500 text-[#0A0A0C] text-[10px] font-mono font-bold shadow-md">
                    SIJA Telkom
                  </div>
                </div>

                {/* Social Icons */}
                <div className="w-full max-w-[300px] flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    {SOCIAL_LINKS.map((soc) => (
                      <a
                        key={soc.name}
                        href={soc.href}
                        target="_blank"
                        rel="noreferrer"
                        title={`${soc.name}: ${soc.label}`}
                        className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-amber-400 hover:text-amber-400 transition-colors text-slate-400"
                      >
                        {soc.icon}
                      </a>
                    ))}
                  </div>

                  <span className="text-xs font-mono text-slate-400">
                    SMK Telkom Sidoarjo
                  </span>
                </div>
              </div>

              {/* Right Column: Personal Story & Metrics */}
              <div className="lg:col-span-7 space-y-6 text-slate-400">
                <div className="space-y-4">
                  <h3 className="text-2xl sm:text-3xl font-sans font-bold text-white tracking-tight">
                    {t.profileSpotlight.title}
                  </h3>
                  <p className="text-base sm:text-lg leading-relaxed font-sans font-normal text-slate-200">
                    {t.profileSpotlight.p1}
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed text-slate-400">
                    {t.profileSpotlight.p2}
                  </p>
                </div>

                {/* Stats Metrics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                  {t.profileSpotlight.stats.map((stat, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1"
                    >
                      <p className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                        {stat.label}
                      </p>
                      <p className="text-xl font-sans font-bold text-white">
                        {stat.value}
                      </p>
                      <p className="text-xs text-slate-400 font-sans">
                        {stat.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons with Magnetic Physics */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <MagneticButton
                    onClick={openCvModal}
                    className="px-7 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-[#0A0A0C] font-sans font-bold text-sm shadow-md"
                  >
                    <span>Curriculum Vitae (ATS & Kreatif)</span>
                    <span className="ml-1.5">→</span>
                  </MagneticButton>

                  <MagneticButton
                    asAnchor
                    href="https://wa.me/6288991304142"
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 rounded-full bg-white/[0.04] border border-white/10 text-white font-sans font-medium text-sm hover:border-amber-400 transition-colors"
                  >
                    <span>WhatsApp Direct</span>
                  </MagneticButton>
                </div>
              </div>

            </div>
          </GlareCard>
        </section>

        {/* ========================================================================= */}
        {/* 9. SECTION 07: CONCLUSION & CONTACT DIALOGUE                              */}
        {/* ========================================================================= */}
        <section id="contact" className="max-w-5xl mx-auto px-5 sm:px-8 space-y-12 scroll-mt-32 relative">
          <div className="text-center space-y-5" data-aos="fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-amber-400 text-xs font-mono uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>07 / CONCLUSION & DIALOGUE</span>
            </div>

            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-black text-white tracking-tight leading-[1.05] max-w-3xl mx-auto">
              LET&apos;S BUILD
              <br />
              <span className="text-gradient-gold italic font-bold">SOMETHING</span>
              <br />
              MEANINGFUL<span className="text-amber-500">.</span>
            </h2>

            <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-sans font-normal">
              {t.contact.heroSubtitle}
            </p>
          </div>

          {/* Action Buttons Bar with Magnetic Physics */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2" data-aos="fade-up">
            {/* Primary Direct Gmail Compose */}
            <MagneticButton
              asAnchor
              href="https://mail.google.com/mail/?view=cm&fs=1&to=mr.rakka23@gmail.com"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 rounded-full bg-amber-500 hover:bg-amber-400 text-[#0A0A0C] font-sans font-bold text-sm sm:text-base shadow-xl shadow-amber-500/20 group"
            >
              <span>{t.contact.emailCta}</span>
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </MagneticButton>

            {/* Copy Email Button */}
            <MagneticButton
              onClick={handleCopyEmail}
              className="px-6 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white font-sans font-medium text-sm sm:text-base border border-white/10 hover:border-amber-400"
            >
              <svg className="w-4 h-4 text-amber-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              <span>{copiedEmail ? t.contact.copiedEmail : t.contact.copyEmail}</span>
            </MagneticButton>

            {/* Form Expansion Toggle */}
            <MagneticButton
              onClick={() => setIsContactFormOpen(!isContactFormOpen)}
              className="px-6 py-4 rounded-full bg-white/[0.02] hover:bg-white/[0.06] text-amber-400 font-sans font-medium text-sm sm:text-base border border-white/10"
            >
              <span>{isContactFormOpen ? t.contact.closeFormCta : t.contact.openFormCta}</span>
            </MagneticButton>
          </div>

          {/* Live Local Time Widget */}
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-mono text-slate-400 pt-2" data-aos="fade-up">
            <div className="flex items-center gap-2.5 px-4.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{t.contact.localTimeLabel}:</span>
              <span className="text-white font-bold tracking-wider">{localTime || "..."}</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">{t.contact.locationTag}</span>
            </div>
          </div>

          {/* Expandable Supabase Message Form */}
          {isContactFormOpen && (
            <div className="w-full max-w-2xl mx-auto pt-6 animate-fadeIn" data-aos="fade-up">
              <form
                onSubmit={handleSubmit}
                className="p-8 sm:p-10 rounded-3xl bg-[#0E1217] border border-white/10 text-left space-y-6 shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                  <h3 className="text-xl font-sans font-bold text-white">{t.contact.formTitle}</h3>
                  <span className="text-xs font-mono text-amber-400">Direct Connect</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-slate-300 uppercase">{t.contact.nameLabel}</label>
                    <input
                      type="text"
                      required
                      placeholder={t.contact.namePlaceholder}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-colors text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-slate-300 uppercase">{t.contact.emailInputLabel}</label>
                    <input
                      type="email"
                      required
                      placeholder={t.contact.emailPlaceholder}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-colors text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-slate-300 uppercase">{t.contact.messageLabel}</label>
                  <textarea
                    required
                    rows={4}
                    placeholder={t.contact.messagePlaceholder}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-colors text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#0A0A0C] font-sans font-bold text-base transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  {isSubmitting ? t.contact.sendingButton : t.contact.sendButton}
                </button>

                {submitStatus === "success" && (
                  <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-center font-medium text-sm animate-fadeIn">
                    {t.contact.successMessage}
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-center font-medium text-sm animate-fadeIn">
                    {t.contact.errorMessage}
                  </div>
                )}
              </form>
            </div>
          )}

        </section>

    </div>
  );
}