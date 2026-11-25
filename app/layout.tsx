import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AosProvider from "@/components/AosProvider";
import InteractiveBackground from "@/components/InteractiveBackground";
import { LanguageProvider } from "@/lib/languageContext";
import CvModal from "@/components/CvModal";
import CustomCursor from "@/components/CustomCursor";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Raka Febrian Ardi P. — Front-End Developer & UI Engineer",
  description: "Portfolio of Raka Febrian Ardi P. — Front-End Developer, UI Engineer, and UI/UX Designer crafting architectural web interfaces, interactive design systems, and modern digital products.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${plusJakarta.variable} ${cormorant.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#0A0A0C] text-[#F8FAFC] font-sans tracking-normal selection:bg-[#F59E0B] selection:text-[#0A0A0C] relative overflow-x-hidden">
        <LanguageProvider>
          <AosProvider>
            {/* Custom Interactive Cursor */}
            <CustomCursor />

            {/* Obsidian Ambient Texture & WebGL 3D Canvas Layer */}
            <InteractiveBackground />

            {/* Modern Glassmorphic Navbar */}
            <Navbar />
            
            <main className="flex-1 w-full relative z-10 pt-20 sm:pt-24">
              {children}
            </main>

            {/* Modern Glassmorphic Footer */}
            <Footer />

            {/* Global Curriculum Vitae Modal */}
            <CvModal />
          </AosProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
