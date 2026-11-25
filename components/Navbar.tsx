"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "@/lib/languageContext";
import HeaderActions from "@/components/HeaderActions";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLanguage();

  const NAV_LINKS = [
    { name: t.nav.home, id: "home", num: "01" },
    { name: t.nav.about, id: "about", num: "02" },
    { name: t.nav.experience || "Experience", id: "experience", num: "03" },
    { name: t.nav.achievements, id: "prestasi", num: "04" },
    { name: t.nav.projects, id: "projects", num: "05" },
    { name: t.nav.contact, id: "contact", num: "06" },
  ];

  // Scroll listener for sticky glass header & active section detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (pathname === "/") {
        const sections = ["home", "about", "experience", "prestasi", "projects", "contact"];
        const scrollPosition = window.scrollY + 280;

        for (let i = sections.length - 1; i >= 0; i--) {
          const sectionId = sections[i];
          const elem = document.getElementById(sectionId);
          if (elem && elem.offsetTop <= scrollPosition) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (pathname === "/") {
      const elem = document.getElementById(sectionId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
        setActiveSection(sectionId);
      }
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        scrolled
          ? "bg-[#0A0A0C]/85 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-2xl shadow-black/60"
          : "bg-[#0A0A0C]/40 backdrop-blur-md border-b border-white/[0.04] py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        
        {/* Brand Wordmark & Identity */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "home")}
          className="group flex items-center gap-3 cursor-pointer select-none"
        >
          <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/10 bg-white/[0.04] p-1 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0">
            <Image
              src="/rf-logo.png"
              alt="Raka Febrian Logo"
              width={24}
              height={24}
              priority
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-bold text-base sm:text-lg text-white tracking-tight group-hover:text-amber-400 transition-colors">
              Raka Febrian<span className="text-amber-500">.</span>
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 -mt-0.5">
              UI Engineer
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links (WCAG AAA High Contrast) */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-mono tracking-[0.14em] uppercase text-slate-400">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === "/" ? activeSection === link.id : false;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`relative py-1.5 transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? "text-white font-semibold"
                    : "hover:text-white"
                }`}
              >
                <span>{link.name}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-amber-500 rounded-full animate-fadeIn shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Header Action Controls (Language Selector ID/EN + CV Action) */}
        <div className="hidden md:flex items-center gap-3">
          <HeaderActions />
        </div>

        {/* Mobile Hamburger & Quick Action */}
        <div className="flex md:hidden items-center gap-2">
          <HeaderActions size="compact" />

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 rounded-xl border border-white/10 bg-white/[0.05] text-white hover:text-amber-400 hover:border-amber-400/40 transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Glassmorphic Midnight Obsidian) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-[#0A0A0C]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-8 shadow-2xl animate-fadeIn">
          <div className="space-y-4">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-400">
              Navigation Index
            </p>
            <div className="flex flex-col space-y-2">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === "/" ? activeSection === link.id : false;
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className={`flex items-center justify-between py-2.5 border-b border-white/[0.06] text-base font-sans transition-colors ${
                      isActive
                        ? "text-amber-400 font-bold"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    <span>{link.name}</span>
                    <span className="font-mono text-xs text-slate-400">
                      {link.num}
                    </span>
                  </a>
                );
              })}
            </div>

            <div className="pt-4">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "contact")}
                className="w-full block text-center py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-[#0A0A0C] font-sans font-bold text-sm shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
              >
                {t.nav.getInTouch}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
