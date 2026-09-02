"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/lib/languageContext";
import { TechIcon } from "@/components/TechIcon";
import HeaderActions from "@/components/HeaderActions";

export default function ContactPage() {
  const { lang, t } = useLanguage();
  const contact = t.contact;

  // Real-time Local Time (WIB / Sidoarjo, Indonesia - UTC+7)
  const [localTime, setLocalTime] = useState("");
  const [copied, setCopied] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form State (Supabase)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

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
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error("Gagal menyalin:", err);
    }
  };

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
    <div className="min-h-[85vh] flex flex-col justify-between px-4 sm:px-8 max-w-5xl mx-auto py-10 sm:py-16 space-y-16">
      
      {/* Top Header / Navigation Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/70 backdrop-blur-md border border-slate-800">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-300 hover:text-cyan-400 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>{lang === "id" ? "Kembali ke Beranda" : "Back to Home"}</span>
        </Link>

        <HeaderActions />
      </div>

      {/* Hero Contact Focus Canvas (Matching Concept Screenshot) */}
      <div className="relative flex flex-col items-center text-center space-y-8 my-auto py-8 sm:py-14" data-aos="fade-up">
        
        {/* Ambient Radial Spotlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Big Bold Headline */}
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] font-heading">
            {contact.heroTitle}
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
            {contact.heroSubtitle}
          </p>
        </div>

        {/* Central Action CTA Buttons Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-4">
          
          {/* Primary Action Pill: Mailto */}
          <a
            href="mailto:raka.febrian@example.com"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#0d121c] hover:bg-black text-white font-extrabold text-sm sm:text-base border border-slate-700/80 shadow-xl hover:border-cyan-500/60 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer group"
          >
            <span className="text-cyan-400 group-hover:translate-x-1 transition-transform">→</span>
            <span>{contact.emailCta}</span>
          </a>

          {/* Secondary Action Pill: Salin Email Clipboard */}
          <button
            type="button"
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white font-bold text-sm sm:text-base border border-slate-800 hover:border-slate-700 transition-all active:scale-95 cursor-pointer"
          >
            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            <span>{copied ? contact.copiedEmail : contact.copyEmail}</span>
          </button>

          {/* Direct Form Expansion Toggle */}
          <button
            type="button"
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 font-bold text-sm sm:text-base border border-cyan-500/30 transition-all active:scale-95 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>{isFormOpen ? contact.closeFormCta : contact.openFormCta}</span>
          </button>

        </div>

        {/* Live Local Time Widget */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-2 text-xs sm:text-sm font-mono text-slate-400">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{contact.localTimeLabel}:</span>
            <span className="text-slate-100 font-bold tracking-wider">{localTime || "..."}</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">{contact.locationTag}</span>
          </div>
        </div>

        {/* Social Rounded Glass Icons Cluster */}
        <div className="flex items-center justify-center gap-3 pt-2">
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
        {isFormOpen && (
          <div className="w-full max-w-2xl pt-8 animate-fadeIn" data-aos="fade-up">
            <form
              onSubmit={handleSubmit}
              className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 backdrop-blur-2xl border border-slate-800 text-left space-y-6 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h3 className="text-xl font-bold text-white font-heading">{contact.formTitle}</h3>
                <span className="text-xs font-mono text-cyan-400">Supabase Connected</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-slate-300 uppercase">{contact.nameLabel}</label>
                  <input
                    type="text"
                    required
                    placeholder={contact.namePlaceholder}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-slate-300 uppercase">{contact.emailInputLabel}</label>
                  <input
                    type="email"
                    required
                    placeholder={contact.emailPlaceholder}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-slate-300 uppercase">{contact.messageLabel}</label>
                <textarea
                  required
                  rows={4}
                  placeholder={contact.messagePlaceholder}
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
                {isSubmitting ? contact.sendingButton : contact.sendButton}
              </button>

              {submitStatus === "success" && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-center font-semibold text-sm animate-fadeIn">
                  {contact.successMessage}
                </div>
              )}

              {submitStatus === "error" && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-center font-semibold text-sm animate-fadeIn">
                  {contact.errorMessage}
                </div>
              )}
            </form>
          </div>
        )}

      </div>

      {/* Bottom Minimalist Footer Strip */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-800/80 text-xs text-slate-500 font-mono">
        <p>© 2026 Raka Febrian. {t.footer.rights}</p>
        <div className="flex items-center gap-4">
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
            LinkedIn
          </a>
          <a href="https://github.com/mrrakaa2345-design" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
            GitHub
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
            Instagram
          </a>
          <a href="mailto:raka.febrian@example.com" className="hover:text-cyan-400 transition-colors">
            Email
          </a>
        </div>
      </div>

    </div>
  );
}
