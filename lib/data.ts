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
  { name: "React.js", category: "frontend", bg: "bg-[#14221E] border-[#B49A67]/20 text-[#F3EFE6]" },
  { name: "Next.js", category: "frontend", bg: "bg-[#14221E] border-[#B49A67]/20 text-[#F3EFE6]" },
  { name: "TypeScript", category: "frontend", bg: "bg-[#14221E] border-[#B49A67]/20 text-[#F3EFE6]" },
  { name: "Node.js", category: "backend", bg: "bg-[#14221E] border-[#B49A67]/20 text-[#F3EFE6]" },
  { name: "PHP", category: "backend", bg: "bg-[#14221E] border-[#B49A67]/20 text-[#F3EFE6]" },
  { name: "Laravel", category: "backend", bg: "bg-[#14221E] border-[#B49A67]/20 text-[#F3EFE6]" },
  { name: "MySQL", category: "backend", bg: "bg-[#14221E] border-[#B49A67]/20 text-[#F3EFE6]" },
  { name: "Supabase", category: "backend", bg: "bg-[#14221E] border-[#B49A67]/20 text-[#F3EFE6]" },
  { name: "Tailwind CSS", category: "frontend", bg: "bg-[#14221E] border-[#B49A67]/20 text-[#F3EFE6]" },
  { name: "Vue.js", category: "frontend", bg: "bg-[#14221E] border-[#B49A67]/20 text-[#F3EFE6]" },
  { name: "Git & GitHub", category: "tools", bg: "bg-[#14221E] border-[#B49A67]/20 text-[#F3EFE6]" },
  { name: "Figma", category: "tools", bg: "bg-[#14221E] border-[#B49A67]/20 text-[#F3EFE6]" },
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
    badge: "Juara 3 SIJA",
    badgeColor: "bg-[#B49A67]/15 border-[#B49A67]/30 text-[#B49A67]",
    accentGlow: "from-[#B49A67]/15 via-[#182A25]/40 to-transparent",
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
    badge: "Microsoft Azure AI",
    badgeColor: "bg-[#B49A67]/15 border-[#B49A67]/30 text-[#B49A67]",
    accentGlow: "from-[#B49A67]/15 via-[#182A25]/40 to-transparent",
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
    badge: "Semifinalis UI 2025",
    badgeColor: "bg-[#B49A67]/15 border-[#B49A67]/30 text-[#B49A67]",
    accentGlow: "from-[#B49A67]/15 via-[#182A25]/40 to-transparent",
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
    badge: "Juara 3 Jatim",
    badgeColor: "bg-[#B49A67]/15 border-[#B49A67]/30 text-[#B49A67]",
    accentGlow: "from-[#B49A67]/15 via-[#182A25]/40 to-transparent",
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
    badge: "Juara 4 Surabaya",
    badgeColor: "bg-[#B49A67]/15 border-[#B49A67]/30 text-[#B49A67]",
    accentGlow: "from-[#B49A67]/15 via-[#182A25]/40 to-transparent",
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
    badge: "Micro Skill DTS 2026",
    badgeColor: "bg-[#B49A67]/15 border-[#B49A67]/30 text-[#B49A67]",
    accentGlow: "from-[#B49A67]/15 via-[#182A25]/40 to-transparent",
    featured: false,
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    company: "Tech Corp Indonesia",
    role: "Software & Web Developer",
    period: "2024 - Sekarang",
    description: [
      "Mengembangkan aplikasi web dan sistem berbasis Next.js & React.js dengan fokus pada efisiensi arsitektur, optimasi performa, dan SEO.",
      "Mengintegrasikan database dan layanan cloud Supabase/PostgreSQL untuk mendukung fungsionalitas sistem yang dinamis.",
      "Bekerja sama dengan tim lintas disiplin untuk mengimplementasikan design system yang konsisten dan responsif.",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL"],
  },
  {
    company: "Digital Creative Studio",
    role: "Web & Application Developer",
    period: "2023 - 2024",
    description: [
      "Membangun berbagai antarmuka interaktif dan landing page modern menggunakan Vue.js dan Tailwind CSS.",
      "Mengintegrasikan REST API backend dan database ke dalam antarmuka pengguna secara real-time.",
      "Melakukan refactoring kode arsitektur untuk meningkatkan performa loading dan stabilitas sistem.",
    ],
    tech: ["Vue.js", "JavaScript", "REST API", "PHP", "Tailwind CSS"],
  },
  {
    company: "Freelance / Remote",
    role: "Full-Stack Web Developer",
    period: "2022 - 2023",
    description: [
      "Menerima proyek pembuatan sistem informasi, dashboard analitik, dan aplikasi web dari klien lokal.",
      "Merancang antarmuka di Figma dan mengimplementasikannya ke dalam arsitektur kode modern yang responsif dan mobile-friendly.",
    ],
    tech: ["React.js", "PHP / Laravel", "MySQL", "Tailwind CSS", "Vite"],
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
    gradient: "from-[#14221E] via-[#1A2C27] to-[#101A17]",
  },
  {
    title: "AI Writing Assistant App",
    category: "SaaS Platform",
    description: "Platform pembuat konten berbasis AI dengan antarmuka yang bersih, editor markdown cerdas, dan integrasi API OpenAI.",
    tech: ["React.js", "Tailwind CSS", "OpenAI API", "Node.js"],
    link: "https://github.com",
    github: "https://github.com",
    gradient: "from-[#182A25] via-[#14221E] to-[#101A17]",
  },
  {
    title: "Interactive Learning Hub",
    category: "EdTech",
    description: "Aplikasi pembelajaran interaktif dengan fitur kuis berbatas waktu, modul video interaktif, dan pelacakan pencapaian pengguna.",
    tech: ["Vue.js", "Pinia", "Tailwind CSS", "Supabase"],
    link: "https://github.com",
    github: "https://github.com",
    gradient: "from-[#14221E] via-[#1A2C27] to-[#101A17]",
  },
  {
    title: "FinTech Personal Portfolio & Tracker",
    category: "Web Application",
    description: "Aplikasi pelacak keuangan pribadi dan portofolio investasi dengan visualisasi data interaktif dan ekspor laporan keuangan.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Chart.js"],
    link: "https://github.com",
    github: "https://github.com",
    gradient: "from-[#1A2C27] via-[#14221E] to-[#101A17]",
  },
];
