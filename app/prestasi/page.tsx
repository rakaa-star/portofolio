import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import PrestasiSection from "@/components/PrestasiSection";

export const metadata: Metadata = {
  title: "Prestasi & Sertifikasi | Raka Febrian — SIJA SMK Telkom Sidoarjo",
  description:
    "Koleksi lengkap sertifikat lisensi resmi, penghargaan inovasi kejuruan SIJA, kompetisi bisnis nasional, dan kejuaraan olahraga Raka Febrian.",
};

export default function PrestasiPage() {
  return (
    <div className="py-12 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Top Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
        <Link href="/" className="hover:text-cyan-400 transition-colors">
          Beranda
        </Link>
        <span>/</span>
        <span className="text-cyan-400 font-bold">Prestasi & Sertifikasi</span>
      </div>

      {/* Main Prestasi Section showing all items by default */}
      <PrestasiSection initialDisplayCount={100} showAllByDefault={true} />

      {/* Bottom Collaboration CTA */}
      <div className="text-center pt-12 border-t border-slate-800/80 space-y-4" data-aos="fade-up">
        <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
          Tertarik untuk Bekerja Sama atau Mengundang Kolaborasi?
        </h3>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Saya siap berkontribusi dalam project web development, magang industri, atau kompetisi inovasi digital berikutnya.
        </p>
        <div className="pt-2">
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-sm shadow-lg shadow-cyan-500/25 hover:scale-105 active:scale-95 transition-all"
          >
            <span>Hubungi Saya</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>

    </div>
  );
}
