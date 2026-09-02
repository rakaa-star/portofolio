import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AosProvider from "@/components/AosProvider";
import InteractiveBackground from "@/components/InteractiveBackground";
import { LanguageProvider } from "@/lib/languageContext";
import CvModal from "@/components/CvModal";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Raka Febrian | Front-End Developer & UI/UX Specialist",
  description: "Portfolio Raka Febrian - Siswa SIJA SMK Telkom Sidoarjo & Front-End Developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${plusJakarta.variable} ${outfit.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#080b10] text-slate-100 font-sans tracking-wide selection:bg-cyan-500 selection:text-black relative overflow-x-hidden">
        <LanguageProvider>
          <AosProvider>
            {/* Interactive Grid Background with Cursor Tracking Spotlight */}
            <InteractiveBackground />

            <Navbar />
            
            <main className="flex-1 w-full relative z-10 pt-20 sm:pt-24">
              {children}
            </main>

            <Footer />

            {/* Global Curriculum Vitae Modal */}
            <CvModal />
          </AosProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
