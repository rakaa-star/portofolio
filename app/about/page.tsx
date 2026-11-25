import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Raka Febrian — Software Developer",
  description: "Tentang Raka Febrian, Software Developer & Tech Enthusiast dari SIJA SMK Telkom Sidoarjo.",
};

const SKILLS = [
  "TypeScript",
  "JavaScript",
  "React.js",
  "Next.js",
  "Node.js",
  "PHP",
  "Laravel",
  "MySQL",
  "PostgreSQL",
  "Supabase",
  "Tailwind CSS",
  "Figma",
  "Git & GitHub",
];

const INTERESTS = [
  "Full-Stack Web Development",
  "Software Engineering",
  "UI/UX & Product Design",
  "Cloud & AI Technologies",
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0A0A0C] text-[#F8FAFC]">
      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-24 pt-16 sm:px-8 sm:pt-24">

        {/* HERO */}
        <section className="grid items-center gap-14 lg:grid-cols-[1.25fr_.75fr]">
          <div data-aos="fade-up">
            <div className="mb-6 flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-amber-400">
              <span className="h-px w-8 bg-amber-400" />
              About me
            </div>

            <h1 className="max-w-3xl text-4xl sm:text-6xl lg:text-7xl font-sans font-bold leading-[1.05] tracking-tight text-white">
              Engineering
              <br />
              <span className="text-slate-400 italic font-medium">and crafting</span>
              <br />
              digital solutions.
            </h1>

            <p className="mt-8 max-w-xl text-base leading-8 text-slate-400 sm:text-lg font-sans font-normal">
              Saya Raka Febrian, siswa SIJA di SMK Telkom Sidoarjo dengan
              passion mendalam pada Software Engineering, Full-Stack Web Development,
              dan UI/UX Design. Saya suka merancang dan membangun sistem digital
              yang terstruktur rapi, efisien, dan memberikan solusi nyata.
            </p>

            <div className="mt-9 flex flex-wrap gap-3.5">
              <Link
                href="/#projects"
                className="group inline-flex items-center gap-3 rounded-xl bg-amber-500 hover:bg-amber-400 px-6 py-3 text-sm font-sans font-bold text-[#0A0A0C] transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20 active:scale-95 shadow-sm"
              >
                Lihat project
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                href="/#contact"
                className="inline-flex items-center rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] px-6 py-3 text-sm font-sans font-medium text-white transition-all duration-300 hover:border-amber-400/50"
              >
                Hubungi saya
              </Link>
            </div>
          </div>

          {/* PROFILE VISUAL */}
          <div
            className="relative mx-auto w-full max-w-[330px] lg:mx-0 lg:ml-auto"
            data-aos="fade-left"
            data-aos-delay="120"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl p-4">
              <div className="absolute right-5 top-5 font-mono text-[10px] tracking-[0.25em] text-amber-400">
                01 / ABOUT
              </div>

              <div className="relative h-full flex flex-col items-center justify-center text-center p-4">
                <div className="relative w-24 h-24 mb-4 rounded-2xl overflow-hidden border border-white/10 bg-white/[0.04] p-3">
                  <Image
                    src="/rf-logo.png"
                    alt="Raka Febrian Logo"
                    fill
                    className="object-contain p-2"
                    sizes="96px"
                  />
                </div>

                <p className="text-xl font-sans font-bold text-white">
                  Raka Febrian
                </p>

                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-amber-400 font-mono font-semibold">
                  Software & UI Engineer
                </p>

                <div className="mt-8 pt-4 w-full flex items-center justify-between border-t border-white/[0.08] text-[11px] font-mono text-slate-400">
                  <span>Sidoarjo, ID</span>
                  <span className="flex items-center gap-1.5 text-white">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Available
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DIVIDER */}
        <div className="my-20 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* STORY */}
        <section
          className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]"
          data-aos="fade-up"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-amber-400">
              02 / My story
            </p>

            <h2 className="mt-4 text-3xl sm:text-4xl font-sans font-bold tracking-tight text-white">
              Bukan cuma membuat website terlihat bagus.
            </h2>
          </div>

          <div className="space-y-6 text-sm sm:text-base leading-8 text-slate-400 font-sans font-normal">
            <p>
              Ketertarikan saya pada web development berawal dari rasa ingin
              tahu bagaimana sebuah desain bisa berubah menjadi sesuatu yang
              benar-benar dapat digunakan.
            </p>

            <p>
              Dari sana saya mulai mempelajari HTML, CSS, JavaScript, PHP,
              database, hingga framework dan tools yang membantu proses
              pengembangan website.
            </p>

            <p>
              Saya juga tertarik pada UI/UX karena menurut saya tampilan dan
              fungsi tidak bisa dipisahkan. Website yang baik bukan hanya
              menarik ketika pertama kali dilihat, tetapi juga terasa mudah
              ketika digunakan.
            </p>
          </div>
        </section>

        {/* CURRENT FOCUS */}
        <section className="mt-20" data-aos="fade-up">
          <div className="mb-10 flex items-end justify-between gap-5">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-amber-400">
                03 / Currently
              </p>

              <h2 className="mt-3 text-3xl sm:text-4xl font-sans font-bold tracking-tight text-white">
                What I&apos;m into
              </h2>
            </div>

            <span className="hidden font-mono text-xs text-slate-400 sm:block">
              2026
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {INTERESTS.map((item, index) => (
              <div
                key={item}
                className="group relative bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] p-7 sm:p-8 rounded-3xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-amber-400">
                    0{index + 1}
                  </span>

                  <span className="text-slate-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-amber-400">
                    ↗
                  </span>
                </div>

                <h3 className="text-xl font-sans font-bold text-white transition-colors group-hover:text-amber-400">
                  {item}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section className="mt-20" data-aos="fade-up">
          <div className="mb-10">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-amber-400">
              04 / Toolkit
            </p>

            <h2 className="mt-3 text-3xl sm:text-4xl font-sans font-bold tracking-tight text-white">
              Tools I use
            </h2>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {SKILLS.map((skill, index) => (
              <div
                key={skill}
                className="group flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400/50 hover:bg-white/[0.06]"
              >
                <span className="font-mono text-[10px] text-amber-400 font-bold">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="text-sm font-sans font-medium text-white transition-colors group-hover:text-amber-300">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* PRINCIPLE */}
        <section
          className="relative mt-20 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 sm:p-12 shadow-2xl"
          data-aos="fade-up"
        >
          <div className="relative grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-amber-400">
                05 / Approach
              </p>

              <h2 className="mt-4 max-w-sm text-3xl font-sans font-bold leading-tight tracking-tight text-white">
                Simple interfaces. Thoughtful details.
              </h2>
            </div>

            <div className="space-y-5 text-sm sm:text-base leading-8 text-slate-400 font-sans font-normal">
              <p>
                Saya lebih memilih desain yang memiliki alasan daripada
                sekadar menambahkan elemen agar terlihat ramai.
              </p>

              <p>
                Setiap spacing, warna, typography, interaction, dan animasi
                seharusnya membantu pengguna memahami sebuah interface.
              </p>

              <div className="flex flex-wrap gap-2 pt-3">
                <span className="rounded-full bg-white/[0.04] border border-white/10 px-4 py-1.5 text-xs text-white font-mono">
                  Clean UI
                </span>
                <span className="rounded-full bg-white/[0.04] border border-white/10 px-4 py-1.5 text-xs text-white font-mono">
                  Responsive
                </span>
                <span className="rounded-full bg-white/[0.04] border border-white/10 px-4 py-1.5 text-xs text-white font-mono">
                  Accessible (WCAG AAA)
                </span>
                <span className="rounded-full bg-white/[0.04] border border-white/10 px-4 py-1.5 text-xs text-white font-mono">
                  WebGL 3D Ready
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 text-center" data-aos="fade-up">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-amber-400">
            Have a project?
          </p>

          <h2 className="mx-auto mt-4 max-w-3xl text-3xl sm:text-5xl font-sans font-bold tracking-tight text-white">
            Let&apos;s make something
            <span className="text-amber-400 italic font-semibold"> useful.</span>
          </h2>

          <Link
            href="/#contact"
            className="group mt-8 inline-flex items-center gap-3 rounded-full bg-amber-500 hover:bg-amber-400 px-8 py-4 text-sm font-sans font-bold text-[#0A0A0C] transition-all duration-300 hover:scale-[1.02] shadow-xl shadow-amber-500/25 active:scale-95"
          >
            Start a conversation
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </section>

      </div>
    </main>
  );
}