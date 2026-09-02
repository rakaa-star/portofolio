"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import TechMarquee from "@/components/TechMarquee";
import ProjectCard from "@/components/ProjectCard";
import PrestasiSection from "@/components/PrestasiSection";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/lib/languageContext";
import { TechIcon } from "@/components/TechIcon";

export default function Home() {
  const { t, lang, openCvModal } = useLanguage();

  // Typing Effect
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
      await navigator.clipboard.writeText("raka.febrian@example.com");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 3000);
    } catch (err) {
      console.error("Gagal menyalin email:", err);
    }
  };


  // Typing animation for roles
  useEffect(() => {
    const currentRole = roles[textIndex % roles.length];
    const speed = isDeleting ? 30 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentRole) {
        setTimeout(() => setIsDeleting(true), 2200);
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
  const uniqueCategories = Array.from(new Set(projectItems.map((p) => p.category)));
  const categories = [
    { id: "all", label: t.projects.allCategory },
    ...uniqueCategories.map((c) => ({ id: c, label: c })),
  ];

  const filteredProjects = projectItems.filter((proj) => {
    const matchesCategory = selectedCategory === "all" || proj.category === selectedCategory;
    const matchesSearch =
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.tech.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));
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

  const TECH_TOOLS = [
    "HTML5",
    "CSS3",
    "JavaScript",
    "TypeScript",
    "React.js",
    "Next.js",
    "Vue.js",
    "Tailwind CSS",
    "PHP",
    "Laravel",
    "MySQL",
    "Supabase",
    "Git",
    "GitHub",
    "Figma",
    "Vercel",
  ];

  const renderOrbitIcon = (iconKey: string) => {
    switch (iconKey) {
      case "code":
        return (
          <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      case "zap":
        return (
          <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case "layout":
        return (
          <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
        );
      case "box":
        return (
          <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        );
      case "database":
        return (
          <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
          </svg>
        );
      case "target":
        return (
          <svg className="w-4 h-4 text-rose-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
        );
    }
  };

  const SOCIAL_LINKS = [
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "https://github.com/mrrakaa2345-design",
      icon: <TechIcon name="github" className="w-4 h-4" />,
    },
    {
      name: "Email",
      href: "mailto:raka.febrian@example.com",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://instagram.com",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-28 sm:space-y-40 pb-20 scroll-smooth">
      
      {/* 1. HERO SECTION (PERSONAL GREETING, HERO PHOTO FRAME CARD & HIGH CONTRAST) */}
      <section
        id="home"
        className="px-4 sm:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 min-h-[82vh] pt-4 sm:pt-8 scroll-mt-28 relative"
      >
        {/* Left Column: Greeting, Dynamic Role & CTAs */}
        <div className="flex-1 space-y-7 text-center lg:text-left z-10" data-aos="fade-right">
          
          {/* Status & Location Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-mono shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300 font-semibold">{t.hero.statusBadge}</span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-slate-400 hidden sm:inline">{t.hero.locationBadge}</span>
          </div>

          {/* Personal Greeting Headline */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] font-heading">
              {t.hero.greeting}{" "}
              <span className="text-cyan-400 font-black">
                {t.hero.name}
              </span>
            </h1>

            {/* Dynamic Typewriter Role */}
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-300 min-h-[40px] flex items-center justify-center lg:justify-start gap-2">
              <span className="text-slate-400 font-normal">{t.hero.rolePrefix}</span>
              <span className="text-white font-extrabold border-b-2 border-cyan-400/50 pb-0.5 font-heading">
                {displayText}
              </span>
              <span className="w-0.5 h-6 sm:h-7 bg-cyan-400 animate-pulse inline-block" />
            </h2>
          </div>

          {/* Bio Description */}
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal mx-auto lg:mx-0">
            {t.hero.bio}
          </p>

          {/* Clear Call-To-Action (CTA) Buttons Bar */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
            {/* Primary CTA: Explore Projects */}
            <button
              type="button"
              onClick={() => scrollTo("projects")}
              className="w-full sm:w-auto text-center px-7 py-3.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-sm sm:text-base shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/50 hover:-translate-y-0.5 transition-all duration-300 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{t.hero.viewProjects}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

            {/* Secondary CTA: Lihat CV Button (Matching Screenshot) */}
            <button
              type="button"
              onClick={openCvModal}
              className="w-full sm:w-auto text-center px-6 py-3.5 rounded-full bg-[#0d121d] hover:bg-[#151c2d] text-white border border-slate-700/90 hover:border-cyan-500/60 font-bold text-sm sm:text-base shadow-md transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer group"
            >
              <svg
                className="w-4 h-4 text-cyan-400 group-hover:text-cyan-300 transition-colors"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>{t.nav.viewCv}</span>
            </button>

            {/* Tertiary CTA: Contact */}
            <button
              type="button"
              onClick={() => scrollTo("contact")}
              className="w-full sm:w-auto text-center px-6 py-3.5 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 font-semibold text-sm sm:text-base hover:bg-slate-800 hover:text-white hover:border-slate-700 transition-all duration-300 active:scale-95 cursor-pointer"
            >
              {t.hero.contactMe}
            </button>
          </div>

          {/* Core Tech Stack Strip */}
          <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs font-mono">
            <span className="text-slate-500 font-semibold uppercase tracking-wider mr-1">
              {t.hero.techPillTitle}:
            </span>
            {["React 19", "Next.js 15", "TypeScript", "Tailwind CSS", "Supabase", "Figma"].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300 font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: Tactile Photo Frame & Creator Card */}
        <div
          className="w-full max-w-sm lg:max-w-md"
          data-aos="zoom-in"
          data-aos-delay="150"
        >
          <div className="relative rounded-3xl bg-[#0e131d]/90 backdrop-blur-xl border border-slate-800 p-6 sm:p-7 shadow-2xl space-y-6 hover:border-cyan-500/40 transition-all duration-500 group">
            
            {/* Card Header: Photo Avatar Frame + Online Status */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
              <div className="flex items-center gap-3.5">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-cyan-500/40 shadow-lg shrink-0 group-hover:scale-105 transition-transform">
                  <Image
                    src="/raka_profile.jpg"
                    alt="Raka Febrian"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base font-heading">Raka Febrian</h3>
                  <p className="text-xs text-slate-400 font-mono">Front-End & UI Specialist</p>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold border border-emerald-500/20 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online
                </span>
              </div>
            </div>

            {/* School & Discipline */}
            <div className="space-y-1 text-xs">
              <p className="text-slate-400 font-mono uppercase tracking-wider text-[11px]">Institusi</p>
              <p className="text-slate-200 font-semibold text-sm">
                SMK Telkom Sidoarjo — Sistem Informasi, Jaringan & Aplikasi (SIJA)
              </p>
            </div>

            {/* Featured Work Spotlight Container */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-cyan-400 font-bold uppercase">{t.hero.cardLatestWorkTitle}</span>
                <span className="text-slate-500">2026</span>
              </div>
              <h4 className="text-sm font-bold text-white font-heading">
                {t.hero.cardLatestWorkName}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t.hero.cardLatestWorkDesc}
              </p>
            </div>

            {/* Quick Action Links */}
            <div className="pt-2 flex items-center gap-2.5">
              <button
                type="button"
                onClick={openCvModal}
                className="flex-1 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>{t.nav.viewCv}</span>
              </button>

              <a
                href="mailto:raka.febrian@example.com"
                className="flex-1 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Email Me</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TECH STACK MARQUEE */}
      <TechMarquee />

      {/* 3. ABOUT SECTION (MY PRINCIPALS & WORKFLOW) */}
      <section id="about" className="max-w-6xl mx-auto px-4 sm:px-8 space-y-24 scroll-mt-28">
        
        {/* Part A: My Principals (Statement with Flanking Orbital Badges) */}
        <div className="space-y-10 text-center" data-aos="fade-up">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-heading">
              {t.about.principalsTitle}
            </h2>
            <p className="text-xs sm:text-sm font-mono text-cyan-400 uppercase tracking-widest">
              {t.about.principalsSubtitle}
            </p>
          </div>

          {/* Central Statement flanked with badges */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
            
            {/* Left Orbiting Badges */}
            <div className="lg:col-span-3 flex flex-row lg:flex-col justify-center gap-3 order-2 lg:order-1 flex-wrap">
              {t.about.orbitPills.left.map((pill, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full border text-xs sm:text-sm font-medium shadow-sm transition-all hover:scale-105 ${pill.bg}`}
                >
                  <span className="shrink-0">{renderOrbitIcon(pill.iconKey)}</span>
                  <span>{pill.title}</span>
                </div>
              ))}
            </div>

            {/* Center High-Impact Statement */}
            <div className="lg:col-span-6 p-6 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800/80 shadow-xl backdrop-blur-md order-1 lg:order-2">
              <p className="text-base sm:text-lg lg:text-xl text-slate-200 leading-relaxed font-medium">
                "{t.about.statement}"
              </p>
            </div>

            {/* Right Orbiting Badges */}
            <div className="lg:col-span-3 flex flex-row lg:flex-col justify-center gap-3 order-3 flex-wrap">
              {t.about.orbitPills.right.map((pill, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full border text-xs sm:text-sm font-medium shadow-sm transition-all hover:scale-105 ${pill.bg}`}
                >
                  <span className="shrink-0">{renderOrbitIcon(pill.iconKey)}</span>
                  <span>{pill.title}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Part B: Tech Stack & Tools (Official SVG Logos Grid) */}
        <div className="text-center space-y-8" data-aos="fade-up">
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight font-heading">
              {t.about.techTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              {t.about.techSubtitle}
            </p>
          </div>

          {/* Centered Icons Cluster with Official SVG Logos */}
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 max-w-3xl mx-auto pt-2">
            {TECH_TOOLS.map((toolName) => (
              <div
                key={toolName}
                className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/90 transition-all duration-300 hover:scale-105 shadow-sm cursor-default"
              >
                <div className="shrink-0 transition-transform group-hover:scale-110">
                  <TechIcon name={toolName} className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-mono text-slate-300 group-hover:text-white transition-colors">
                  {toolName}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Part C: Prinsip Kerja Saya (3 Step Connected Process with Depth & Curves) */}
        <div className="space-y-12" data-aos="fade-up">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest">
              {t.about.processBadge}
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-heading">
              {t.about.processTitle}
            </h3>
            <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto">
              {t.about.processSubtitle}
            </p>
          </div>

          {/* 3 Step Connected Process Cards with Visual Connector Lines */}
          <div className="relative pt-4">
            
            {/* Connector Curve Path for Desktop (between cards) */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 -translate-y-1/2 pointer-events-none z-0 px-24">
              <svg className="w-full h-24 overflow-visible" viewBox="0 0 800 100" fill="none">
                <path
                  d="M 180 50 Q 280 10, 380 50"
                  stroke="#06b6d4"
                  strokeWidth="2"
                  strokeOpacity="0.4"
                  className="animate-connector"
                />
                <path
                  d="M 440 50 Q 540 90, 640 50"
                  stroke="#06b6d4"
                  strokeWidth="2"
                  strokeOpacity="0.4"
                  className="animate-connector"
                />
              </svg>
            </div>

            {/* Cards Grid */}
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch z-10">
              {t.about.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="relative p-8 rounded-3xl bg-[#0e131d]/90 backdrop-blur-xl border border-slate-800 hover:border-cyan-500/50 hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between shadow-2xl space-y-6 group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                      <span className="text-4xl font-black text-cyan-400 font-mono tracking-tighter group-hover:scale-110 transition-transform">
                        {step.number}
                      </span>
                      <span className="text-[11px] font-mono text-cyan-300 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                        {step.tag}
                      </span>
                    </div>

                    <h4 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors font-heading">
                      {step.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                      {step.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>Phase {step.number}</span>
                    <span className="text-cyan-400 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      Standard Process
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </section>

      {/* 4. PRESTASI & SERTIFIKASI SECTION */}
      <PrestasiSection />

      {/* 5. FEATURED PROJECTS SECTION */}
      <section id="projects" className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16 scroll-mt-28">
        <div className="text-center space-y-4" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs sm:text-sm font-semibold tracking-wide">
            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span>{t.projects.badge}</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 font-heading">
            {t.projects.title}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            {t.projects.subtitle}
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6" data-aos="fade-up">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-105"
                    : "bg-slate-900/60 text-slate-300 border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800"
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
                className="w-full px-5 py-3 pl-12 rounded-2xl bg-slate-900/60 backdrop-blur-sm border border-slate-700 text-slate-100 placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner"
              />
              <svg
                className="w-5 h-5 text-slate-500 absolute left-4 top-3.5 group-focus-within:text-cyan-500 transition-colors"
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

        {/* 3D Project Cards Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-24 bg-slate-900/40 rounded-[2rem] border border-slate-800 backdrop-blur-sm">
            <svg className="w-12 h-12 text-slate-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-xl font-bold text-slate-300 mb-2 font-heading">{t.projects.noResultsTitle}</p>
            <p className="text-slate-500 text-sm">{t.projects.noResultsDesc}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {filteredProjects.map((proj, idx) => (
              <ProjectCard key={idx} proj={proj} idx={idx} />
            ))}
          </div>
        )}
      </section>

      {/* 6. PROFILE SPOTLIGHT SECTION: "MENGENAL SAYA LEBIH DEKAT" */}
      <section id="who-i-am" className="max-w-6xl mx-auto px-4 sm:px-8 space-y-16 scroll-mt-28">
        
        {/* Section Header */}
        <div className="text-center space-y-3" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs sm:text-sm font-semibold tracking-wide font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>{t.profileSpotlight.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-heading">
            {t.profileSpotlight.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            {t.profileSpotlight.subtitle}
          </p>
        </div>

        {/* Tactile Split Card */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center bg-[#0d121c]/90 backdrop-blur-2xl p-8 sm:p-12 rounded-[2.5rem] border border-slate-800/90 shadow-2xl hover:border-cyan-500/30 transition-all duration-500 relative overflow-hidden"
          data-aos="fade-up"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Left Column: Portrait Photo Frame with Social Badges */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start space-y-6" data-aos="fade-right">
            <div className="relative group">
              <div className="relative w-64 sm:w-72 aspect-[4/5] rounded-3xl overflow-hidden bg-slate-950 p-2 border-2 border-slate-700/80 shadow-2xl shadow-cyan-950/40 group-hover:border-cyan-400/60 group-hover:-translate-y-1.5 transition-all duration-500">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image
                    src="/raka_profile.jpg"
                    alt={t.profileSpotlight.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-sm font-bold font-heading leading-tight">{t.profileSpotlight.name}</p>
                    <p className="text-[11px] text-cyan-300 font-mono">{t.profileSpotlight.role}</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-3 -right-3 px-3 py-1 rounded-full bg-cyan-500 text-black text-[11px] font-extrabold shadow-lg font-mono">
                SIJA Student
              </div>
            </div>

            <div className="w-full max-w-[288px] flex items-center justify-between pt-1 text-slate-400">
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map((soc) => (
                  <a
                    key={soc.name}
                    href={soc.href}
                    target="_blank"
                    rel="noreferrer"
                    title={soc.name}
                    className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500 hover:text-cyan-400 hover:scale-110 transition-all cursor-pointer"
                  >
                    {soc.icon}
                  </a>
                ))}
              </div>

              <div className="text-right">
                <span className="text-[11px] font-mono text-slate-500 font-semibold">
                  SMK Telkom
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Personal Story & Focus Chips */}
          <div className="lg:col-span-7 space-y-6 text-slate-300" data-aos="fade-left">
            <div className="space-y-4">
              <p className="text-base sm:text-lg leading-relaxed font-normal text-slate-200">
                {t.profileSpotlight.p1}
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-slate-400">
                {t.profileSpotlight.p2}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {t.profileSpotlight.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90 hover:border-cyan-500/40 transition-all duration-300 space-y-1"
                >
                  <p className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <p className="text-sm font-bold text-white font-heading">
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-400 font-mono">
                    {stat.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={openCvModal}
                className="px-6 py-3 rounded-full bg-cyan-500 text-black font-extrabold text-sm hover:bg-cyan-400 transition-all shadow-md shadow-cyan-500/20 active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <span>{t.nav.viewCv}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => scrollTo("contact")}
                className="px-6 py-3 rounded-full bg-slate-900 border border-slate-800 text-slate-300 font-semibold text-sm hover:text-white hover:border-slate-700 transition-all active:scale-95 cursor-pointer"
              >
                {t.contact.badge}
              </button>
            </div>
          </div>

        </div>

      </section>

      {/* 7. CONTACT SECTION: HIGH-IMPACT COLLABORATION CANVAS (MATCHING REQUESTED CONCEPT) */}
      <section id="contact" className="max-w-5xl mx-auto px-4 sm:px-8 space-y-12 scroll-mt-28 relative">
        
        {/* Ambient Radial Mesh Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Big Bold Headline & Narrative */}
        <div className="text-center space-y-4" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs sm:text-sm font-semibold tracking-wide font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>{t.contact.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] font-heading max-w-3xl mx-auto">
            {t.contact.heroTitle}
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
            {t.contact.heroSubtitle}
          </p>
        </div>

        {/* Action Buttons Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2" data-aos="fade-up" data-aos-delay="100">
          
          {/* Primary Action: Mailto */}
          <a
            href="mailto:raka.febrian@example.com"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#0d121c] hover:bg-black text-white font-extrabold text-sm sm:text-base border border-slate-700/80 shadow-xl hover:border-cyan-500/60 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer group"
          >
            <span className="text-cyan-400 group-hover:translate-x-1 transition-transform">→</span>
            <span>{t.contact.emailCta}</span>
          </a>

          {/* Salin Email Clipboard Button */}
          <button
            type="button"
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white font-bold text-sm sm:text-base border border-slate-800 hover:border-slate-700 transition-all active:scale-95 cursor-pointer"
          >
            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            <span>{copiedEmail ? t.contact.copiedEmail : t.contact.copyEmail}</span>
          </button>

          {/* Direct Message Form Toggle */}
          <button
            type="button"
            onClick={() => setIsContactFormOpen(!isContactFormOpen)}
            className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 font-bold text-sm sm:text-base border border-cyan-500/30 transition-all active:scale-95 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>{isContactFormOpen ? t.contact.closeFormCta : t.contact.openFormCta}</span>
          </button>

        </div>

        {/* Live Local Time Widget */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs sm:text-sm font-mono text-slate-400 pt-2" data-aos="fade-up">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{t.contact.localTimeLabel}:</span>
            <span className="text-slate-100 font-bold tracking-wider">{localTime || "..."}</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">{t.contact.locationTag}</span>
          </div>
        </div>

        {/* Social Rounded Glass Icons */}
        <div className="flex items-center justify-center gap-3 pt-1" data-aos="fade-up">
          {SOCIAL_LINKS.map((soc) => (
            <a
              key={soc.name}
              href={soc.href}
              target="_blank"
              rel="noreferrer"
              title={soc.name}
              className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-slate-800 hover:scale-110 transition-all duration-300 shadow-md cursor-pointer"
            >
              {soc.icon}
            </a>
          ))}
        </div>

        {/* Expandable Supabase Direct Message Form */}
        {isContactFormOpen && (
          <div className="w-full max-w-2xl mx-auto pt-6 animate-fadeIn" data-aos="fade-up">
            <form
              onSubmit={handleSubmit}
              className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 backdrop-blur-2xl border border-slate-800 text-left space-y-6 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h3 className="text-xl font-bold text-white font-heading">{t.contact.formTitle}</h3>
                <span className="text-xs font-mono text-cyan-400">Supabase Connected</span>
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
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors text-sm"
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
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors text-sm"
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
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors text-sm resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold text-base hover:shadow-xl hover:shadow-cyan-500/30 hover:brightness-110 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? t.contact.sendingButton : t.contact.sendButton}
              </button>

              {submitStatus === "success" && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-center font-semibold text-sm animate-fadeIn">
                  {t.contact.successMessage}
                </div>
              )}

              {submitStatus === "error" && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-center font-semibold text-sm animate-fadeIn">
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