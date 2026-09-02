export interface TechItem {
  name: string;
  category?: "frontend" | "backend" | "tools" | "other";
  bg: string;
  iconName?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  category: "akademik" | "sertifikasi" | "kompetisi" | "olahraga";
  categoryLabel: string;
  issuer: string;
  recipient: string;
  date: string;
  year: string;
  credentialId?: string;
  image: string;
  description: string;
  highlights: string[];
  badge: string;
  badgeColor: string;
  accentGlow: string;
  featured?: boolean;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string[];
  tech: string[];
}

export interface EducationItem {
  type: "Education" | "Achievement" | "Certification";
  title: string;
  institution: string;
  period: string;
  description: string;
}

export interface ProjectItem {
  title: string;
  category: string;
  description: string;
  tech: string[];
  link: string;
  github?: string;
  gradient: string;
}

export const TECH_STACK: TechItem[] = [
  { name: "Vue.js", category: "frontend", bg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" },
  { name: "React.js", category: "frontend", bg: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400" },
  { name: "TypeScript", category: "frontend", bg: "bg-blue-500/10 border-blue-500/30 text-blue-400" },
  { name: "Tailwind CSS", category: "frontend", bg: "bg-sky-500/10 border-sky-500/30 text-sky-400" },
  { name: "Next.js", category: "frontend", bg: "bg-zinc-500/10 border-zinc-500/30 text-zinc-200" },
  { name: "Node.js", category: "backend", bg: "bg-green-500/10 border-green-500/30 text-green-400" },
  { name: "JavaScript", category: "frontend", bg: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400" },
  { name: "Git & GitHub", category: "tools", bg: "bg-orange-500/10 border-orange-500/30 text-orange-400" },
  { name: "Supabase", category: "backend", bg: "bg-emerald-600/10 border-emerald-600/30 text-emerald-300" },
  { name: "PostgreSQL", category: "backend", bg: "bg-indigo-500/10 border-indigo-500/30 text-indigo-400" },
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: "sija-best-project-2026",
    title: "Project Terbaik 3 — Ide Project Aplikasi Desa Sawotratap",
    category: "akademik",
    categoryLabel: "Akademik & SIJA",
    issuer: "SMK Telkom Sidoarjo",
    recipient: "Raka Febrian Ardi Pratama",
    date: "9 - 10 Juni 2026",
    year: "2026",
    image: "/image sertif/a4edc4b9-f434-45da-8726-47c2b8a624c2.png",
    description: "Meraih penghargaan bergengsi Project Terbaik 3 pada Ujian Kenaikan Level 2 kelas XI SIJA 2 Tahun Ajaran 2025/2026 melalui inovasi solusi digital konsep Aplikasi Desa Sawotratap.",
    highlights: ["Ujian Kenaikan Level 2 SIJA", "Digitalisasi Layanan Desa", "Inovasi Web & Sistem Informasi"],
    badge: "🏆 Juara 3 SIJA",
    badgeColor: "bg-amber-500/15 border-amber-500/40 text-amber-300",
    accentGlow: "from-amber-500/20 via-orange-500/10 to-transparent",
    featured: true,
  },
  {
    id: "azure-ai-fundamentals-2025",
    title: "Preparation Course for Azure AI Fundamentals (AI-900)",
    category: "sertifikasi",
    categoryLabel: "Sertifikasi AI & Cloud",
    issuer: "Microsoft x elevAIte x KOMDIGI",
    recipient: "Raka Febrian Ardi P",
    date: "24 September 2025",
    year: "2025",
    credentialId: "a76309b",
    image: "/image sertif/6d3cd50a-2045-4905-a6e2-7b04c8284427.png",
    description: "Sertifikasi kelulusan resmi program nasional Microsoft elevAIte untuk penguasaan fondasi Artificial Intelligence, Azure Machine Learning, Computer Vision, dan Natural Language Processing.",
    highlights: ["Microsoft Azure Cloud", "Artificial Intelligence Fundamentals", "Computer Vision & NLP"],
    badge: "🤖 Microsoft Azure AI",
    badgeColor: "bg-cyan-500/15 border-cyan-500/40 text-cyan-300",
    accentGlow: "from-cyan-500/20 via-blue-500/10 to-transparent",
    featured: true,
  },
  {
    id: "brand-ui-business-plan-2025",
    title: "High School Business Plan Competition BRAND UI 2025 Semifinalist",
    category: "kompetisi",
    categoryLabel: "Kompetisi & Bisnis",
    issuer: "Universitas Indonesia (HIMANIA FIA UI)",
    recipient: "Raka Febrian Ardi Pratama",
    date: "Tahun 2025",
    year: "2025",
    image: "/image sertif/Raka Febrian Ardi Pratama.jpg",
    description: "Penghargaan Certificate of Appreciation sebagai Semifinalis dalam kompetisi Business Plan tingkat SMA nasional bertema 'Street-Smart Innovation: Business Solutions for Real Urban Challenges'.",
    highlights: ["Tingkat SMA Nasional", "FIA Universitas Indonesia", "Urban Innovation Business Plan"],
    badge: "💡 Semifinalis UI 2025",
    badgeColor: "bg-blue-500/15 border-blue-500/40 text-blue-300",
    accentGlow: "from-blue-500/20 via-indigo-500/10 to-transparent",
    featured: true,
  },
  {
    id: "aafi-jatim-cup-2025",
    title: "Juara 3 AAFI JATIM CUP 2025 (Kelompok Usia 16)",
    category: "olahraga",
    categoryLabel: "Prestasi Olahraga",
    issuer: "AAFI Jawa Timur & Asosiasi Futsal Jatim",
    recipient: "Raka Febrian Ardi Pratama",
    date: "22 - 24 Agustus 2025",
    year: "2025",
    credentialId: "022/AAFIJATIMCUP/VIII/2025",
    image: "/image sertif/WhatsApp Image 2026-05-12 at 08.26.14.jpeg",
    description: "Meraih gelar Juara 3 tingkat Provinsi Jawa Timur bersama Akademi SQUADRA FC pada Kejuaraan Resmi AAFI Jatim Cup 2025 yang diselenggarakan di Surabaya.",
    highlights: ["Tingkat Provinsi Jawa Timur", "Akademi SQUADRA FC", "Kategori Usia 16"],
    badge: "🥉 Juara 3 Jatim",
    badgeColor: "bg-rose-500/15 border-rose-500/40 text-rose-300",
    accentGlow: "from-rose-500/20 via-red-500/10 to-transparent",
    featured: true,
  },
  {
    id: "aafi-league-surabaya-2025",
    title: "Juara 4 AAFI League Surabaya 2025 (Kelompok Usia 16 Putra)",
    category: "olahraga",
    categoryLabel: "Prestasi Olahraga",
    issuer: "Asosiasi Akademi Futsal Indonesia Regional Surabaya",
    recipient: "Raka Febrian Ardi Pratama",
    date: "Maret - Oktober 2025",
    year: "2025",
    credentialId: "081/AAFI/AFL/SBY-STFK/I/2025",
    image: "/image sertif/WhatsApp Image 2026-05-12 at 08.22.05.jpeg",
    description: "Pencapaian Juara 4 dalam rangkaian kompetisi liga futsal resmi AAFI League Surabaya 2025 yang berlangsung selama musim kompetisi Maret hingga Oktober 2025.",
    highlights: ["Liga Resmi AAFI Surabaya", "Akademi SQUADRA FC", "Musim 2025"],
    badge: "⚽ Juara 4 Surabaya",
    badgeColor: "bg-emerald-500/15 border-emerald-500/40 text-emerald-300",
    accentGlow: "from-emerald-500/20 via-teal-500/10 to-transparent",
    featured: false,
  },
  {
    id: "komdigi-digital-mindset-2026",
    title: "Pengantar Mindset Digital 1: Mengubah Masa Depan dengan Pola Pikir Digital",
    category: "sertifikasi",
    categoryLabel: "Pelatihan Digital Talent",
    issuer: "Badan Pengembangan SDM KOMDIGI",
    recipient: "Raka Febrian Ardi Pratama",
    date: "31 Juli 2026",
    year: "2026",
    credentialId: "2299815850-27019/MS/BLSDM.Komdigi/2026",
    image: "/image sertif/Screenshot 2026-08-30 183229.png",
    description: "Sertifikat kelulusan pelatihan Micro Skill Digital Talent Scholarship 2026 bidang Mindset Digital dari Pusat Pengembangan Literasi Digital, Kementerian Komunikasi dan Digital RI.",
    highlights: ["Digital Talent Scholarship 2026", "SDM KOMDIGI RI", "Pola Pikir & Literasi Digital"],
    badge: "📜 Micro Skill DTS 2026",
    badgeColor: "bg-sky-500/15 border-sky-500/40 text-sky-300",
    accentGlow: "from-sky-500/20 via-cyan-500/10 to-transparent",
    featured: false,
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    company: "Tech Corp Indonesia",
    role: "Front-End Developer",
    period: "2024 - Sekarang",
    description: [
      "Mengembangkan aplikasi web berbasis React.js dan Next.js dengan fokus pada optimasi performa dan SEO.",
      "Bekerja sama dengan tim UI/UX untuk mengimplementasikan design system yang konsisten dan responsif.",
      "Meningkatkan skor Lighthouse website utama dari 65 menjadi 95+.",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
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
    tech: ["Vue.js", "JavaScript", "REST API", "Tailwind CSS"],
  },
  {
    company: "Freelance / Remote",
    role: "Frontend Specialist",
    period: "2022 - 2023",
    description: [
      "Menerima proyek pembuatan portofolio, dashboard admin, dan e-commerce dari klien lokal.",
      "Memastikan tampilan web kompatibel cross-browser dan mobile-friendly.",
    ],
    tech: ["React.js", "Tailwind CSS", "Framer Motion", "Vite"],
  },
];

export const EDUCATION_TIMELINE: EducationItem[] = [
  {
    type: "Education",
    title: "Sistem Informasi, Jaringan & Aplikasi (SIJA)",
    institution: "SMK Telkom Sidoarjo",
    period: "2023 - Sekarang",
    description: "Fokus pada Rekayasa Perangkat Lunak, Struktur Data, Pemrograman Web Modern, Jaringan Komputer, dan Cloud.",
  },
  {
    type: "Achievement",
    title: "Project Terbaik 3 Ujian Kenaikan Level 2 SIJA",
    institution: "SMK Telkom Sidoarjo",
    period: "2026",
    description: "Penghargaan atas ide project inovatif digitalisasi sistem pelayanan Desa Sawotratap.",
  },
  {
    type: "Achievement",
    title: "Semifinalis High School Business Plan Competition",
    institution: "BRAND UI 2025 - Universitas Indonesia",
    period: "2025",
    description: "Inovasi solusi bisnis tantangan perkotaan dalam kompetisi nasional tingkat SMA.",
  },
  {
    type: "Certification",
    title: "Azure AI Fundamentals (AI-900) Prep Certification",
    institution: "Microsoft x KOMDIGI",
    period: "2025",
    description: "Sertifikasi keahlian fondasi Artificial Intelligence, Machine Learning, Computer Vision, dan NLP.",
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    title: "E-Commerce Modern Dashboard",
    category: "Web Application",
    description: "Dashboard analitik real-time dengan chart interaktif, dark mode, dan manajemen inventaris produk yang dinamis.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts", "Supabase"],
    link: "https://github.com",
    github: "https://github.com",
    gradient: "from-cyan-600 via-blue-600 to-indigo-800",
  },
  {
    title: "AI Writing Assistant App",
    category: "SaaS Platform",
    description: "Platform pembuat konten berbasis AI dengan antarmuka yang bersih, editor markdown cerdas, dan integrasi API OpenAI.",
    tech: ["React.js", "Tailwind CSS", "OpenAI API", "Node.js"],
    link: "https://github.com",
    github: "https://github.com",
    gradient: "from-purple-600 via-indigo-600 to-blue-800",
  },
  {
    title: "Interactive Learning Hub",
    category: "EdTech",
    description: "Aplikasi pembelajaran interaktif dengan fitur kuis berbatas waktu, modul video interaktif, dan pelacakan pencapaian pengguna.",
    tech: ["Vue.js", "Pinia", "Tailwind CSS", "Supabase"],
    link: "https://github.com",
    github: "https://github.com",
    gradient: "from-emerald-600 via-teal-600 to-cyan-800",
  },
  {
    title: "FinTech Personal Portfolio & Tracker",
    category: "Web Application",
    description: "Aplikasi pelacak keuangan pribadi dan portofolio investasi dengan visualisasi data interaktif dan ekspor laporan keuangan.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Chart.js"],
    link: "https://github.com",
    github: "https://github.com",
    gradient: "from-amber-600 via-orange-600 to-rose-800",
  },
];
