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
      await navigator.clipboard.writeText("mr.rakka23@gmail.com");
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
      name: "WhatsApp",
      href: "https://wa.me/6288991304142",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "https://github.com/rakaa-star",
      icon: <TechIcon name="github" className="w-4 h-4" />,
    },
    {
      name: "Instagram",
      href: "https://instagram.com/rakaafeb_",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: "Email",
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=mr.rakka23@gmail.com",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-[85vh] flex flex-col justify-between px-4 sm:px-8 max-w-5xl mx-auto py-10 sm:py-16 space-y-16 bg-[#0A0A0C] text-[#F8FAFC]">
      
      {/* Top Header / Navigation Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-sans font-medium text-slate-400 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>{lang === "id" ? "Kembali ke Beranda" : "Back to Home"}</span>
        </Link>

        <HeaderActions />
      </div>

      {/* Hero Contact Focus Canvas */}
      <div className="relative flex flex-col items-center text-center space-y-8 my-auto py-8 sm:py-14" data-aos="fade-up">
        {/* Big Bold Headline */}
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-extrabold text-white tracking-tight leading-[1.12]">
            {contact.heroTitle}
          </h1>

          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-sans font-normal">
            {contact.heroSubtitle}
          </p>
        </div>

        {/* Central Action CTA Buttons Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 pt-4">
          {/* Primary Action Pill: Direct Gmail Compose */}
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=mr.rakka23@gmail.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-amber-500 hover:bg-amber-400 text-[#0A0A0C] font-sans font-bold text-sm sm:text-base shadow-xl shadow-amber-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer group"
          >
            <span>{contact.emailCta}</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>

          {/* Copy Email Button */}
          <button
            type="button"
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white font-sans font-medium text-sm sm:text-base border border-white/10 hover:border-amber-400 transition-all active:scale-95 cursor-pointer"
          >
            <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            <span>{copied ? contact.copiedEmail : contact.copyEmail}</span>
          </button>

          {/* Form Expansion Toggle */}
          <button
            type="button"
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/[0.02] hover:bg-white/[0.06] text-amber-400 font-sans font-medium text-sm sm:text-base border border-white/10 transition-all active:scale-95 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>{isFormOpen ? contact.closeFormCta : contact.openFormCta}</span>
          </button>
        </div>

        {/* Live Local Time Widget */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-2 text-xs sm:text-sm font-mono text-slate-400">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{contact.localTimeLabel}:</span>
            <span className="text-white font-bold tracking-wider">{localTime || "..."}</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">{contact.locationTag}</span>
          </div>
        </div>

        {/* Social Rounded Glass Icons */}
        <div className="flex items-center justify-center gap-3 pt-2">
          {SOCIAL_LINKS.map((soc) => (
            <a
              key={soc.name}
              href={soc.href}
              target="_blank"
              rel="noreferrer"
              title={soc.name}
              className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 text-slate-400 hover:text-amber-400 hover:border-amber-400 hover:scale-105 transition-all duration-300 shadow-sm cursor-pointer"
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
              className="p-8 sm:p-10 rounded-3xl bg-[#0E1217] border border-white/10 text-left space-y-6 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <h3 className="text-xl font-sans font-bold text-white">{contact.formTitle}</h3>
                <span className="text-xs font-mono text-amber-400">Direct Connect</span>
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
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-colors text-sm"
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
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-colors text-sm"
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
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-colors text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#0A0A0C] font-sans font-bold text-base transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-amber-500/20"
              >
                {isSubmitting ? contact.sendingButton : contact.sendButton}
              </button>

              {submitStatus === "success" && (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-center font-medium text-sm animate-fadeIn">
                  {contact.successMessage}
                </div>
              )}

              {submitStatus === "error" && (
                <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-center font-medium text-sm animate-fadeIn">
                  {contact.errorMessage}
                </div>
              )}
            </form>
          </div>
        )}

      </div>

      {/* Bottom Minimalist Footer Strip */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.08] text-xs text-slate-400 font-mono">
        <p>© 2026 Raka Febrian. {t.footer.rights}</p>
        <div className="flex items-center gap-4">
          <a href="https://wa.me/6288991304142" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors">
            WhatsApp
          </a>
          <a href="https://github.com/rakaa-star" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors">
            GitHub
          </a>
          <a href="https://instagram.com/rakaafeb_" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors">
            Instagram
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=mr.rakka23@gmail.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-amber-400 transition-colors"
          >
            Email
          </a>
        </div>
      </div>

    </div>
  );
}
