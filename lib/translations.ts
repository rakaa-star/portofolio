export type Language = "id" | "en";

export interface AchievementItemTranslation {
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

export interface TranslationData {
  nav: {
    home: string;
    about: string;
    achievements: string;
    experience?: string;
    projects: string;
    contact: string;
    getInTouch: string;
    viewCv: string;
  };
  hero: {
    greeting: string;
    name: string;
    rolePrefix: string;
    roles: string[];
    bio: string;
    statusBadge: string;
    locationBadge: string;
    viewProjects: string;
    viewCv: string;
    contactMe: string;
    techPillTitle: string;
    cardLatestWorkTitle: string;
    cardLatestWorkName: string;
    cardLatestWorkDesc: string;
    cardSchool: string;
    cardStatus: string;
  };
  about: {
    principalsTitle: string;
    principalsSubtitle: string;
    statement: string;
    orbitPills: {
      left: { title: string; iconKey: string; bg: string }[];
      right: { title: string; iconKey: string; bg: string }[];
    };
    techTitle: string;
    techSubtitle: string;
    processBadge: string;
    processTitle: string;
    processSubtitle: string;
    steps: {
      number: string;
      title: string;
      desc: string;
      tag: string;
      phaseLabel: string;
      metricsLabel: string;
      highlights: string[];
      iconKey: "design" | "code" | "rocket";
    }[];
  };
  achievements: {
    badge: string;
    title: string;
    subtitle: string;
    filterAll: string;
    filterAcademic: string;
    filterCert: string;
    filterComp: string;
    filterSports: string;
    searchPlaceholder: string;
    noResultsTitle: string;
    noResultsDesc: string;
    viewAllBtn: string;
    viewLessBtn: string;
    openGalleryBtn: string;
    inspectBtn: string;
    verifyIdLabel: string;
    issuedByLabel: string;
    recipientLabel: string;
    dateLabel: string;
    highlightsLabel: string;
    closeModal: string;
    modalTitle: string;
    modalSubtitle: string;
    zoomInHint: string;
    openOriginal: string;
    copyIdSuccess: string;
    items: AchievementItemTranslation[];
  };
  experience: {
    badge: string;
    title: string;
    subtitle: string;
    items: {
      company: string;
      role: string;
      period: string;
      description: string[];
      tech: string[];
    }[];
  };
  education: {
    badge: string;
    title: string;
    subtitle: string;
    timeline: {
      type: string;
      title: string;
      institution: string;
      period: string;
      description: string;
    }[];
    certificates: {
      title: string;
      issuer: string;
      date: string;
      skills: string[];
    }[];
  };
  projects: {
    badge: string;
    title: string;
    subtitle: string;
    allCategory: string;
    searchPlaceholder: string;
    noResultsTitle: string;
    noResultsDesc: string;
    liveDemo: string;
    github: string;
    items: {
      title: string;
      category: string;
      description: string;
      tech: string[];
      link: string;
      github?: string;
      gradient: string;
    }[];
  };
  profileSpotlight: {
    badge: string;
    title: string;
    subtitle: string;
    name: string;
    role: string;
    school: string;
    p1: string;
    p2: string;
    stats: {
      label: string;
      value: string;
      desc: string;
    }[];
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    heroTitle: string;
    heroSubtitle: string;
    emailCta: string;
    copyEmail: string;
    copiedEmail: string;
    openFormCta: string;
    closeFormCta: string;
    localTimeLabel: string;
    locationTag: string;
    socials: {
      linkedin: string;
      github: string;
      email: string;
      instagram: string;
    };
    infoTitle: string;
    infoDesc: string;
    emailLabel: string;
    githubLabel: string;
    statusText: string;
    formTitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailInputLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    sendButton: string;
    sendingButton: string;
    successMessage: string;
    errorMessage: string;
  };
  footer: {
    role: string;
    rights: string;
    techNote: string;
  };
  cv: {
    modalTitle: string;
    downloadPdf: string;
    print: string;
    close: string;
    name: string;
    role: string;
    schoolInfo: string;
    contactInfo: {
      location: string;
      email: string;
      phone: string;
      github: string;
      website: string;
    };
    summaryTitle: string;
    summaryText: string;
    experienceTitle: string;
    educationTitle: string;
    skillsTitle: string;
    certificationsTitle: string;
    languagesTitle: string;
    languagesList: { lang: string; level: string }[];
  };
}

export const TRANSLATIONS: Record<Language, TranslationData> = {
  id: {
    nav: {
      home: "Beranda",
      about: "Prinsip",
      experience: "Pengalaman",
      achievements: "Sertifikasi",
      projects: "Karya",
      contact: "Kontak",
      getInTouch: "Hubungi Saya",
      viewCv: "Lihat CV",
    },
    hero: {
      greeting: "Halo, saya",
      name: "Raka Febrian Ardi P.",
      rolePrefix: "Disiplin",
      roles: [
        "Front-End Developer & UI Engineer",
        "Web & Software Engineering",
        "Digital Interface Designer",
      ],
      bio: "Siswa jurusan SIJA di SMK Telkom Sidoarjo yang berfokus pada pengembangan web, rekayasa perangkat lunak, dan perancangan antarmuka digital.",
      statusBadge: "Terbuka untuk Magang & Kolaborasi",
      locationBadge: "Sidoarjo, Jawa Timur",
      viewProjects: "Lihat Hasil Karya",
      viewCv: "Lihat CV",
      contactMe: "Hubungi Saya",
      techPillTitle: "Fokus Utama",
      cardLatestWorkTitle: "Karya Terpilih",
      cardLatestWorkName: "E-Commerce Dashboard & Analytics",
      cardLatestWorkDesc: "Real-time analytics chart, dark mode, dan dynamic inventory.",
      cardSchool: "SMK Telkom Sidoarjo — SIJA",
      cardStatus: "Online & Siap Berkolaborasi",
    },
    about: {
      principalsTitle: "My Principles",
      principalsSubtitle: "Filosofi Rekayasa Front-End & Antarmuka",
      statement: "Saya memandang pengembangan perangkat lunak sebagai disiplin presisi: memadukan arsitektur kode yang terstruktur, integrasi data yang andal, dan desain antarmuka yang menghargai perhatian pengguna.",
      orbitPills: {
        left: [
          { title: "Full-Stack & Web Dev", iconKey: "code", bg: "bg-[#14221E] border-[#B49A67]/25 text-[#F3EFE6]" },
          { title: "Performa & Optimasi Sistem", iconKey: "zap", bg: "bg-[#14221E] border-[#B49A67]/25 text-[#F3EFE6]" },
          { title: "UI/UX & Product Design", iconKey: "layout", bg: "bg-[#14221E] border-[#B49A67]/25 text-[#F3EFE6]" },
        ],
        right: [
          { title: "Arsitektur Software Bersih", iconKey: "box", bg: "bg-[#14221E] border-[#B49A67]/25 text-[#F3EFE6]" },
          { title: "Integrasi API, Database & Cloud", iconKey: "database", bg: "bg-[#14221E] border-[#B49A67]/25 text-[#F3EFE6]" },
          { title: "Solusi Digital & Problem Solving", iconKey: "target", bg: "bg-[#14221E] border-[#B49A67]/25 text-[#F3EFE6]" },
        ],
      },
      techTitle: "Tech Stack & Tools",
      techSubtitle: "Koleksi teknologi, framework, dan tools yang saya gunakan untuk membangun produk digital modern.",
      processBadge: "Alur Kerja",
      processTitle: "Prinsip Kerja Saya",
      processSubtitle: "Pendekatan sistematis mulai dari konsep arsitektur & desain hingga tahap rilis produksi.",
      steps: [
        {
          number: "01",
          title: "Konsep & Desain UI/UX",
          desc: "Merancang wireframe, tata letak visual, serta user flow yang intuitif dan sistematis menggunakan Figma.",
          tag: "Concept & UI/UX",
          phaseLabel: "Fase 01 — Desain & Solusi",
          metricsLabel: "User-Centered Flow",
          highlights: ["Figma Prototype", "Wireframing", "Design System", "User Journey"],
          iconKey: "design",
        },
        {
          number: "02",
          title: "Rekayasa & Pengembangan",
          desc: "Membangun sistem dan aplikasi yang modular, scalable, dan type-safe menggunakan ekosistem modern baik frontend maupun backend.",
          tag: "Full-Stack Engineering",
          phaseLabel: "Fase 02 — Pengembangan Sistem",
          metricsLabel: "Clean & Type-Safe",
          highlights: ["Modular Code", "Next.js & React", "REST & Database", "Type-Safe"],
          iconKey: "code",
        },
        {
          number: "03",
          title: "Optimasi, Cloud & Peluncuran",
          desc: "Mengoptimalkan performa kecepatan (Lighthouse 95+), keamanan, integrasi database, dan deployment handal.",
          tag: "Performance & Deploy",
          phaseLabel: "Fase 03 — Rilis & Cloud",
          metricsLabel: "Lighthouse 95+ Score",
          highlights: ["Kecepatan Kilat", "SEO & Keamanan", "Cloud Deploy", "Reliability"],
          iconKey: "rocket",
        },
      ],
    },
    achievements: {
      badge: "Prestasi & Sertifikasi",
      title: "Pencapaian & Sertifikat Resmi",
      subtitle: "Dokumentasi lisensi kompetensi, penghargaan inovasi kejuruan SIJA, kompetisi bisnis nasional, dan kejuaraan olahraga.",
      filterAll: "Semua Kategori",
      filterAcademic: "Akademik & SIJA",
      filterCert: "Sertifikasi AI & Digital",
      filterComp: "Kompetisi & Bisnis",
      filterSports: "Olahraga",
      searchPlaceholder: "Cari berdasarkan judul, kategori, atau penerbit...",
      noResultsTitle: "Sertifikat Tidak Ditemukan",
      noResultsDesc: "Tidak ada sertifikat yang cocok dengan kata kunci atau filter yang Anda pilih.",
      viewAllBtn: "Lihat Semua Prestasi",
      viewLessBtn: "Tampilkan Lebih Sedikit",
      openGalleryBtn: "Buka Galeri Penuh",
      inspectBtn: "Lihat Sertifikat",
      verifyIdLabel: "No. Sertifikat",
      issuedByLabel: "Diterbitkan Oleh",
      recipientLabel: "Diberikan Kepada",
      dateLabel: "Waktu Penerbitan",
      highlightsLabel: "Fokus & Keahlian",
      closeModal: "Tutup",
      modalTitle: "Detail Dokumen Sertifikat",
      modalSubtitle: "Pratinjau resolusi tinggi dokumen sertifikat resmi dan informasi verifikasi.",
      zoomInHint: "Klik gambar untuk melihat resolusi penuh",
      openOriginal: "Buka Gambar Asli",
      copyIdSuccess: "No. Sertifikat berhasil disalin!",
      items: [
        {
          id: "sija-best-project-2026",
          title: "Project Terbaik 3 — Ide Project 'Aplikasi Desa Sawotratap'",
          category: "akademik",
          categoryLabel: "Akademik & Kejuruan SIJA",
          issuer: "SMK Telkom Sidoarjo",
          recipient: "Raka Febrian Ardi Pratama",
          date: "9 - 10 Juni 2026",
          year: "2026",
          image: "/image sertif/a4edc4b9-f434-45da-8726-47c2b8a624c2.png",
          description: "Meraih predikat bergengsi Project Terbaik 3 pada Ujian Kenaikan Level 2 kelas XI SIJA 2 Tahun Ajaran 2025/2026 melalui karya inovatif digitalisasi sistem pelayanan publik Desa Sawotratap.",
          highlights: ["Ujian Kenaikan Level 2 SIJA", "Digitalisasi Layanan Desa", "Inovasi Web & Arsitektur Sistem"],
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
          description: "Sertifikat penyelesaian program nasional Microsoft elevAIte mencakup penguasaan konsep Artificial Intelligence, Azure Machine Learning, Computer Vision, dan Pemrosesan Bahasa Alami (NLP).",
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
          categoryLabel: "Kompetisi & Bisnis Nasional",
          issuer: "Universitas Indonesia (HIMANIA FIA UI)",
          recipient: "Raka Febrian Ardi Pratama",
          date: "Tahun 2025",
          year: "2025",
          image: "/image sertif/Raka Febrian Ardi Pratama.jpg",
          description: "Sertifikat penghargaan sebagai Semifinalis dalam ajang kompetisi Business Plan tingkat SMA tingkat nasional bertajuk 'Street-Smart Innovation: Business Solutions for Real Urban Challenges'.",
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
          categoryLabel: "Prestasi Olahraga & Futsal",
          issuer: "AAFI Jawa Timur & Asosiasi Futsal Jatim",
          recipient: "Raka Febrian Ardi Pratama",
          date: "22 - 24 Agustus 2025",
          year: "2025",
          credentialId: "022/AAFIJATIMCUP/VIII/2025",
          image: "/image sertif/WhatsApp Image 2026-05-12 at 08.26.14.jpeg",
          description: "Meraih gelar Juara 3 Kejuaraan Futsal tingkat Provinsi Jawa Timur bersama Akademi SQUADRA FC pada perhelatan resmi turnamen AAFI Jatim Cup 2025 di Surabaya.",
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
          categoryLabel: "Prestasi Olahraga & Futsal",
          issuer: "Asosiasi Akademi Futsal Indonesia Regional Surabaya",
          recipient: "Raka Febrian Ardi Pratama",
          date: "Maret - Oktober 2025",
          year: "2025",
          credentialId: "081/AAFI/AFL/SBY-STFK/I/2025",
          image: "/image sertif/WhatsApp Image 2026-05-12 at 08.22.05.jpeg",
          description: "Pencapaian Juara 4 dalam rangkaian liga futsal bergengsi AAFI League Surabaya musim 2025 kategori Kelompok Usia 16 Putra bersama Akademi SQUADRA FC.",
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
      ],
    },
    experience: {
      badge: "Rekam Jejak & Pengalaman",
      title: "Pengalaman & Tonggak Proyek",
      subtitle: "Rekam jejak kontribusi teknis, perancangan sistem web, dan pencapaian akademik kejuruan.",
      items: [
        {
          company: "SMK Telkom Sidoarjo (SIJA)",
          role: "Siswa Rekayasa Perangkat Lunak & SIJA",
          period: "2023 — Sekarang",
          description: [
            "Mendalami arsitektur pemrograman web modern, struktur data, dan pengembangan aplikasi full-stack.",
            "Membangun antarmuka interaktif responsif berbasis Next.js, React, Tailwind CSS, serta integrasi PHP/Laravel dan MySQL.",
            "Mengimplementasikan integrasi database relasional dan otentikasi Supabase/PostgreSQL.",
          ],
          tech: ["Next.js", "TypeScript", "Tailwind CSS", "PHP / Laravel", "MySQL"],
        },
        {
          company: "Inovasi Digital Desa Sawotratap",
          role: "Lead Developer & UI/UX Designer",
          period: "2026",
          description: [
            "Merancang konsep sistem informasi pelayanan publik digital terpadu untuk warga Desa Sawotratap.",
            "Meraih predikat Project Terbaik 3 pada Ujian Kenaikan Level 2 kelas XI SIJA 2 Tahun Ajaran 2025/2026.",
            "Menyusun prototipe sistem lengkap mulai dari user journey di Figma hingga arsitektur web responsif.",
          ],
          tech: ["UI/UX Architecture", "Figma", "Web Systems", "SIJA Architecture"],
        },
        {
          company: "Microsoft x KOMDIGI x elevAIte",
          role: "Peserta Sertifikasi Nasional Azure AI",
          period: "2025",
          description: [
            "Menyelesaikan kurikulum resmi nasional mencakup fondasi Artificial Intelligence, Azure Cloud, Machine Learning, Computer Vision, dan NLP.",
            "Memperoleh sertifikat penyelesaian resmi Preparation Course for Azure AI Fundamentals (AI-900).",
          ],
          tech: ["Microsoft Azure", "AI Fundamentals", "Machine Learning", "Computer Vision"],
        },
        {
          company: "Universitas Indonesia (HIMANIA FIA UI)",
          role: "Semifinalis High School Business Plan (BRAND UI 2025)",
          period: "2025",
          description: [
            "Mengembangkan proposal inovasi model bisnis digital bertema 'Street-Smart Innovation: Business Solutions for Real Urban Challenges'.",
            "Mencapai babak semifinal tingkat SMA nasional melalui presentasi solusi teknologi aplikatif.",
          ],
          tech: ["Business Model", "Urban Innovation", "Pitch Presentation"],
        },
      ],
    },
    education: {
      badge: "Pendidikan & Prestasi",
      title: "Edukasi & Pencapaian",
      subtitle: "Latar belakang pendidikan formal kejuruan serta sertifikasi keahlian teknologi.",
      timeline: [
        {
          type: "Pendidikan Formal",
          title: "Sistem Informasi, Jaringan, dan Aplikasi (SIJA)",
          institution: "SMK Telkom Sidoarjo",
          period: "2023 - Sekarang",
          description: "Fokus pada rekayasa perangkat lunak, pemrograman web modern, basis data, arsitektur jaringan komputer, dan cloud computing.",
        },
        {
          type: "Pencapaian / Prestasi",
          title: "Project Terbaik 3 Ujian Kenaikan Level 2 SIJA",
          institution: "SMK Telkom Sidoarjo",
          period: "2026",
          description: "Penghargaan atas ide project inovatif digitalisasi sistem pelayanan Desa Sawotratap.",
        },
        {
          type: "Prestasi Kompetisi",
          title: "Semifinalis High School Business Plan Competition",
          institution: "BRAND UI 2025 - Universitas Indonesia",
          period: "2025",
          description: "Inovasi solusi bisnis tantangan perkotaan dalam kompetisi nasional tingkat SMA.",
        },
        {
          type: "Sertifikasi Resmi",
          title: "Azure AI Fundamentals (AI-900) Prep Certification",
          institution: "Microsoft x KOMDIGI x elevAIte",
          period: "2025",
          description: "Sertifikasi keahlian fondasi Artificial Intelligence, Machine Learning, Computer Vision, dan NLP.",
        },
      ],
      certificates: [
        {
          title: "Microsoft Azure AI Fundamentals (AI-900)",
          issuer: "Microsoft x KOMDIGI",
          date: "2025",
          skills: ["Azure Cloud", "AI Concepts", "Machine Learning", "NLP"],
        },
        {
          title: "Project Terbaik 3 Level 2 SIJA (Desa Sawotratap)",
          issuer: "SMK Telkom Sidoarjo",
          date: "2026",
          skills: ["Web System", "Public Service App", "SIJA Architecture"],
        },
        {
          title: "BRAND UI 2025 Business Plan Semifinalist",
          issuer: "FIA Universitas Indonesia",
          date: "2025",
          skills: ["Business Planning", "Urban Innovation", "Presentation"],
        },
        {
          title: "Juara 3 AAFI JATIM CUP 2025 (U-16)",
          issuer: "AAFI Jawa Timur",
          date: "2025",
          skills: ["Teamwork", "Discipline", "Championship"],
        },
      ],
    },
    projects: {
      badge: "Hasil Karya",
      title: "Proyek Pilihan",
      subtitle: "Koleksi proyek web aplikasi, dashboard analitik, dan platform digital yang telah saya kembangkan.",
      allCategory: "Semua",
      searchPlaceholder: "Cari teknologi atau nama proyek...",
      noResultsTitle: "Pencarian tidak ditemukan",
      noResultsDesc: "Coba gunakan kata kunci atau teknologi lain.",
      liveDemo: "Lihat Demo",
      github: "Kode Sumber",
      items: [
        {
          title: "E-Commerce Modern Dashboard",
          category: "Web Application",
          description: "Dashboard analitik real-time dengan chart interaktif, dark mode, dan manajemen inventaris produk yang dinamis.",
          tech: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts", "Supabase"],
          link: "https://github.com",
          github: "https://github.com",
          gradient: "from-[#162420] via-[#1D2E29] to-[#101A17]",
        },
        {
          title: "AI Writing Assistant App",
          category: "SaaS Platform",
          description: "Platform pembuat konten berbasis AI dengan antarmuka yang bersih, editor markdown cerdas, dan integrasi API OpenAI.",
          tech: ["React.js", "Tailwind CSS", "OpenAI API", "Node.js"],
          link: "https://github.com",
          github: "https://github.com",
          gradient: "from-[#1D2E29] via-[#22352F] to-[#101A17]",
        },
        {
          title: "Interactive Learning Hub",
          category: "EdTech",
          description: "Aplikasi pembelajaran interaktif dengan fitur kuis berbatas waktu, modul video interaktif, dan pelacakan pencapaian pengguna.",
          tech: ["Vue.js", "Pinia", "Tailwind CSS", "Supabase"],
          link: "https://github.com",
          github: "https://github.com",
          gradient: "from-[#182823] via-[#14221E] to-[#101A17]",
        },
        {
          title: "FinTech Personal Portfolio & Tracker",
          category: "Web Application",
          description: "Aplikasi pelacak keuangan pribadi dan portofolio investasi dengan visualisasi data interaktif dan ekspor laporan keuangan.",
          tech: ["Next.js", "TypeScript", "Tailwind CSS", "Chart.js"],
          link: "https://github.com",
          github: "https://github.com",
          gradient: "from-[#22352F] via-[#182823] to-[#101A17]",
        },
      ],
    },
    profileSpotlight: {
      badge: "Siapa Saya",
      title: "Mengenal Saya Lebih Dekat",
      subtitle: "Perjalanan, visi, dan dedikasi saya dalam rekayasa perangkat lunak dan pengembangan teknologi modern.",
      name: "Raka Febrian",
      role: "Software Developer & Tech Enthusiast",
      school: "SMK Telkom Sidoarjo — SIJA",
      p1: "Saya adalah seorang Software Developer dan siswa aktif jurusan Sistem Informasi, Jaringan, dan Aplikasi (SIJA) di SMK Telkom Sidoarjo yang memiliki antusiasme mendalam dalam rekayasa perangkat lunak, pengembangan web modern, dan eksplorasi teknologi digital untuk memecahkan masalah nyata.",
      p2: "Dengan pemahaman dalam ekosistem web modern (Frontend & Backend), basis data, fondasi Cloud & AI, serta desain UI/UX di Figma, saya terbiasa membangun solusi digital yang terstruktur rapi, efisien, berkecepatan tinggi, dan nyaman digunakan.",
      stats: [
        { label: "Fokus Bidang", value: "Software & Web Dev", desc: "Full-Stack, Cloud & UI/UX" },
        { label: "Status Siswa", value: "SIJA SMK Telkom", desc: "Sidoarjo, Jawa Timur" },
        { label: "Ketersediaan", value: "Siap Kolaborasi", desc: "Magang / Project Dev" },
      ],
    },
    contact: {
      badge: "Kontak & Kolaborasi",
      title: "Mari Berkolaborasi!",
      subtitle: "Saya selalu terbuka untuk berdiskusi tentang peluang magang, proyek software & web, atau sekadar berdiskusi seputar inovasi teknologi.",
      heroTitle: "Tertarik Bekerja Sama atau Mengembangkan Proyek?",
      heroSubtitle: "Saya selalu terbuka untuk berdiskusi tentang proyek pengembangan software, web modern, sistem informasi, atau peluang magang dan kolaborasi baru.",
      emailCta: "Hubungi via Email",
      copyEmail: "Salin Email",
      copiedEmail: "Email Berhasil Disalin!",
      openFormCta: "Kirim Pesan Langsung",
      closeFormCta: "Sembunyikan Form",
      localTimeLabel: "Waktu Lokal",
      locationTag: "Sidoarjo, Indonesia (WIB / UTC+7)",
      socials: {
        linkedin: "LinkedIn",
        github: "GitHub",
        email: "Email",
        instagram: "Instagram",
      },
      infoTitle: "Informasi Kontak",
      infoDesc: "Saya biasanya merespons pesan dalam waktu kurang dari 24 jam.",
      emailLabel: "Email",
      githubLabel: "GitHub",
      statusText: "Terbuka untuk Magang, Part-time & Freelance",
      formTitle: "Kirim Pesan Langsung",
      nameLabel: "Nama Lengkap *",
      namePlaceholder: "Contoh: Rian Pratama",
      emailInputLabel: "Alamat Email *",
      emailPlaceholder: "rian@example.com",
      messageLabel: "Pesan / Kebutuhan Proyek *",
      messagePlaceholder: "Ceritakan tentang proyek Anda atau kesempatan kerjasama...",
      sendButton: "Kirim Pesan Sekarang",
      sendingButton: "Mengirim ke Database...",
      successMessage: "✓ Pesan berhasil dikirim! Terima kasih, saya akan segera menghubungi Anda.",
      errorMessage: "✕ Terjadi kendala saat mengirim. Silakan hubungi via email langsung.",
    },
    footer: {
      role: "Siswa SIJA SMK Telkom Sidoarjo & Software Developer",
      rights: "Hak Cipta Dilindungi.",
      techNote: "Dibuat dengan Next.js, Tailwind CSS & Supabase.",
    },
    cv: {
      modalTitle: "Curriculum Vitae — Raka Febrian",
      downloadPdf: "Unduh PDF",
      print: "Cetak",
      close: "Tutup",
      name: "RAKA FEBRIAN",
      role: "SOFTWARE DEVELOPER & TECH ENTHUSIAST",
      schoolInfo: "SMK TELKOM SIDOARJO — SIJA",
      contactInfo: {
        location: "Sidoarjo, Jawa Timur, Indonesia",
        email: "mr.rakka23@gmail.com",
        phone: "+62 889-9130-4142",
        github: "github.com/rakaa-star",
        website: "instagram.com/rakaafeb_",
      },
      summaryTitle: "ABOUT ME",
      summaryText: "Saya adalah siswa jurusan Sistem Informasi, Jaringan, dan Aplikasi (SIJA) di SMK Telkom Sidoarjo yang memiliki kompetensi luas dalam rekayasa perangkat lunak, pengembangan web (frontend & backend), integrasi database, dan perancangan UI/UX. Memiliki pengalaman dalam membangun aplikasi modern menggunakan React.js, Next.js, TypeScript, PHP/Laravel, dan Tailwind CSS. Berorientasi pada arsitektur kode yang rapi, performa cepat, dan solusi bernilai nyata.",
      experienceTitle: "EXPERIENCE & ACHIEVEMENTS",
      educationTitle: "EDUCATION",
      skillsTitle: "TECHNICAL SKILLS",
      certificationsTitle: "CERTIFICATIONS & AWARDS",
      languagesTitle: "LANGUAGES",
      languagesList: [
        { lang: "Bahasa Indonesia", level: "Native" },
        { lang: "English", level: "Professional Working" },
      ],
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "Principles",
      experience: "Experience",
      achievements: "Certificates",
      projects: "Works",
      contact: "Contact",
      getInTouch: "Get In Touch",
      viewCv: "View CV",
    },
    hero: {
      greeting: "Hello, I'm",
      name: "Raka Febrian Ardi P.",
      rolePrefix: "Discipline",
      roles: [
        "Front-End Developer & UI Engineer",
        "Web & Software Engineering",
        "Digital Interface Designer",
      ],
      bio: "A SIJA student at SMK Telkom Sidoarjo focusing on web development, software engineering, and digital interface design.",
      statusBadge: "Available for Internships & Projects",
      locationBadge: "Sidoarjo, East Java, ID",
      viewProjects: "Explore Works",
      viewCv: "View CV",
      contactMe: "Contact Me",
      techPillTitle: "Core Focus",
      cardLatestWorkTitle: "Featured Work",
      cardLatestWorkName: "E-Commerce Dashboard & Analytics",
      cardLatestWorkDesc: "Real-time analytics chart, dark mode, and dynamic inventory.",
      cardSchool: "SMK Telkom Sidoarjo (SIJA)",
      cardStatus: "Online & Ready to Collaborate",
    },
    about: {
      principalsTitle: "My Principles",
      principalsSubtitle: "Front-End Engineering & Interface Philosophy",
      statement: "I view software engineering as a discipline of precision: combining structured code architecture, dependable data integration, and user-centered interface craft that respects human attention.",
      orbitPills: {
        left: [
          { title: "Full-Stack & Web Dev", iconKey: "code", bg: "bg-[#14221E] border-[#B49A67]/25 text-[#F3EFE6]" },
          { title: "System & Performance Optimization", iconKey: "zap", bg: "bg-[#14221E] border-[#B49A67]/25 text-[#F3EFE6]" },
          { title: "UI/UX & Product Design", iconKey: "layout", bg: "bg-[#14221E] border-[#B49A67]/25 text-[#F3EFE6]" },
        ],
        right: [
          { title: "Clean Software Architecture", iconKey: "box", bg: "bg-[#14221E] border-[#B49A67]/25 text-[#F3EFE6]" },
          { title: "API, Database & Cloud Integration", iconKey: "database", bg: "bg-[#14221E] border-[#B49A67]/25 text-[#F3EFE6]" },
          { title: "Digital Solutions & Problem Solving", iconKey: "target", bg: "bg-[#14221E] border-[#B49A67]/25 text-[#F3EFE6]" },
        ],
      },
      techTitle: "Tech Stack & Tools",
      techSubtitle: "A versatile toolkit that I use to build robust, scalable, and modern digital products.",
      processBadge: "Workflow",
      processTitle: "My Work Process",
      processSubtitle: "A systematic approach from system architecture & UI/UX concept to production deployment.",
      steps: [
        {
          number: "01",
          title: "Concept & UI/UX Design",
          desc: "Crafting intuitive wireframes, system architecture, and user flows in Figma.",
          tag: "Concept & UI/UX",
          phaseLabel: "Phase 01 — Concept & Design",
          metricsLabel: "User-Centered Flow",
          highlights: ["Figma Prototype", "Wireframing", "Design System", "User Journey"],
          iconKey: "design",
        },
        {
          number: "02",
          title: "Software & Web Engineering",
          desc: "Building modular, scalable, and type-safe systems across modern frontend and backend tech stacks.",
          tag: "Full-Stack Engineering",
          phaseLabel: "Phase 02 — Core Engineering",
          metricsLabel: "Clean & Type-Safe",
          highlights: ["Modular Code", "Next.js & React", "REST & Database", "Type-Safe"],
          iconKey: "code",
        },
        {
          number: "03",
          title: "Optimization, Cloud & Launch",
          desc: "Ensuring blazing fast load speeds (Lighthouse 95+), robust database performance, and reliable deployment.",
          tag: "Performance & Deploy",
          phaseLabel: "Phase 03 — Cloud & Launch",
          metricsLabel: "Lighthouse 95+ Score",
          highlights: ["Ultra Fast Speed", "SEO & Security", "Cloud Deploy", "Reliability"],
          iconKey: "rocket",
        },
      ],
    },
    achievements: {
      badge: "Awards & Certifications",
      title: "Achievements & Official Certificates",
      subtitle: "Verified documentation of technical competencies, academic awards, business competitions, and sports championships.",
      filterAll: "All Categories",
      filterAcademic: "Academic & SIJA",
      filterCert: "AI & Tech Certs",
      filterComp: "Competitions & Business",
      filterSports: "Sports & Athletics",
      searchPlaceholder: "Search by title, category, or issuer...",
      noResultsTitle: "No Certificates Found",
      noResultsDesc: "No certificates match your query. Try selecting another filter or searching a different term.",
      viewAllBtn: "View All Achievements",
      viewLessBtn: "Show Less",
      openGalleryBtn: "Open Full Gallery",
      inspectBtn: "Inspect Certificate",
      verifyIdLabel: "Credential ID",
      issuedByLabel: "Issued By",
      recipientLabel: "Recipient",
      dateLabel: "Issue Date",
      highlightsLabel: "Focus & Domain",
      closeModal: "Close",
      modalTitle: "Certificate Document Preview",
      modalSubtitle: "High-resolution official credential preview with verification metadata.",
      zoomInHint: "Click image to inspect in full resolution",
      openOriginal: "Open Original High-Res",
      copyIdSuccess: "Credential ID copied to clipboard!",
      items: [
        {
          id: "sija-best-project-2026",
          title: "3rd Best Project Award — 'Sawotratap Village App' Concept",
          category: "akademik",
          categoryLabel: "Academic & SIJA Vocational",
          issuer: "SMK Telkom Sidoarjo",
          recipient: "Raka Febrian Ardi Pratama",
          date: "June 9 - 10, 2026",
          year: "2026",
          image: "/image sertif/a4edc4b9-f434-45da-8726-47c2b8a624c2.png",
          description: "Earned the 3rd Best Project Award in the Level 2 Competency Examination for Grade XI SIJA 2 for innovative public service digitizing concepts for Sawotratap Village.",
          highlights: ["SIJA Level 2 Examination", "Public Service Digitization", "Web Architecture & UX"],
          badge: "3rd Best SIJA Project",
          badgeColor: "bg-[#B49A67]/15 border-[#B49A67]/30 text-[#B49A67]",
          accentGlow: "from-[#B49A67]/15 via-[#182A25]/40 to-transparent",
          featured: true,
        },
        {
          id: "azure-ai-fundamentals-2025",
          title: "Preparation Course for Azure AI Fundamentals (AI-900)",
          category: "sertifikasi",
          categoryLabel: "AI & Cloud Certification",
          issuer: "Microsoft x elevAIte x KOMDIGI",
          recipient: "Raka Febrian Ardi P",
          date: "September 24, 2025",
          year: "2025",
          credentialId: "a76309b",
          image: "/image sertif/6d3cd50a-2045-4905-a6e2-7b04c8284427.png",
          description: "Official completion credential for the national Microsoft elevAIte program covering Artificial Intelligence principles, Azure Machine Learning, Computer Vision, and Natural Language Processing.",
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
          categoryLabel: "National Business Competition",
          issuer: "Universitas Indonesia (HIMANIA FIA UI)",
          recipient: "Raka Febrian Ardi Pratama",
          date: "Year 2025",
          year: "2025",
          image: "/image sertif/Raka Febrian Ardi Pratama.jpg",
          description: "Certificate of Appreciation awarded as a Semifinalis in the National High School Business Plan Competition themed 'Street-Smart Innovation: Business Solutions for Real Urban Challenges'.",
          highlights: ["National High School Level", "FIA Universitas Indonesia", "Urban Innovation Business Plan"],
          badge: "UI 2025 Semifinalist",
          badgeColor: "bg-[#B49A67]/15 border-[#B49A67]/30 text-[#B49A67]",
          accentGlow: "from-[#B49A67]/15 via-[#182A25]/40 to-transparent",
          featured: true,
        },
        {
          id: "aafi-jatim-cup-2025",
          title: "3rd Place AAFI JATIM CUP 2025 (Under-16 Category)",
          category: "olahraga",
          categoryLabel: "Sports & Futsal Championship",
          issuer: "AAFI East Java & Provincial Futsal Association",
          recipient: "Raka Febrian Ardi Pratama",
          date: "August 22 - 24, 2025",
          year: "2025",
          credentialId: "022/AAFIJATIMCUP/VIII/2025",
          image: "/image sertif/WhatsApp Image 2026-05-12 at 08.26.14.jpeg",
          description: "Secured 3rd Place at the East Java Provincial Championship with Squadra FC Academy at the official AAFI Jatim Cup 2025 tournament held in Surabaya.",
          highlights: ["East Java Provincial Level", "SQUADRA FC Academy", "Under-16 Division"],
          badge: "3rd Place East Java",
          badgeColor: "bg-[#B49A67]/15 border-[#B49A67]/30 text-[#B49A67]",
          accentGlow: "from-[#B49A67]/15 via-[#182A25]/40 to-transparent",
          featured: true,
        },
        {
          id: "aafi-league-surabaya-2025",
          title: "4th Place AAFI League Surabaya 2025 (Under-16 Boys)",
          category: "olahraga",
          categoryLabel: "Sports & Futsal League",
          issuer: "Indonesian Futsal Academy Association Surabaya",
          recipient: "Raka Febrian Ardi Pratama",
          date: "March - October 2025",
          year: "2025",
          credentialId: "081/AAFI/AFL/SBY-STFK/I/2025",
          image: "/image sertif/WhatsApp Image 2026-05-12 at 08.22.05.jpeg",
          description: "Achieved 4th Place in the prestigious AAFI League Surabaya 2025 tournament across the March-October season competing for Squadra FC Academy.",
          highlights: ["Official AAFI League Surabaya", "SQUADRA FC Academy", "2025 Season"],
          badge: "4th Place Surabaya",
          badgeColor: "bg-[#B49A67]/15 border-[#B49A67]/30 text-[#B49A67]",
          accentGlow: "from-[#B49A67]/15 via-[#182A25]/40 to-transparent",
          featured: false,
        },
        {
          id: "komdigi-digital-mindset-2026",
          title: "Digital Mindset Transformation — Digital Talent Scholarship",
          category: "sertifikasi",
          categoryLabel: "Digital Talent Program",
          issuer: "Human Resources Development Agency KOMDIGI",
          recipient: "Raka Febrian Ardi Pratama",
          date: "July 31, 2026",
          year: "2026",
          credentialId: "2299815850-27019/MS/BLSDM.Komdigi/2026",
          image: "/image sertif/Screenshot 2026-08-30 183229.png",
          description: "Completed the Micro Skill Digital Talent Scholarship 2026 program by the Digital Literacy Development Center, Ministry of Communication and Digital RI.",
          highlights: ["Digital Talent Scholarship 2026", "KOMDIGI Republic of Indonesia", "Digital Mindset & Literacy"],
          badge: "Micro Skill DTS 2026",
          badgeColor: "bg-[#B49A67]/15 border-[#B49A67]/30 text-[#B49A67]",
          accentGlow: "from-[#B49A67]/15 via-[#182A25]/40 to-transparent",
          featured: false,
        },
      ],
    },
    experience: {
      badge: "Track Record & Experience",
      title: "Experience & Key Milestones",
      subtitle: "Verified track record of technical contributions, web system architecture, and vocational achievements.",
      items: [
        {
          company: "SMK Telkom Sidoarjo (SIJA)",
          role: "Software Engineering & SIJA Student",
          period: "2023 — Present",
          description: [
            "Mastering modern web engineering architectures, data structures, and full-stack application development.",
            "Building responsive, interactive web interfaces with Next.js, React, Tailwind CSS, along with PHP/Laravel and MySQL integration.",
            "Implementing relational database systems and secure auth workflows with Supabase/PostgreSQL.",
          ],
          tech: ["Next.js", "TypeScript", "Tailwind CSS", "PHP / Laravel", "MySQL"],
        },
        {
          company: "Sawotratap Village Digital Innovation",
          role: "Lead Developer & UI/UX Designer",
          period: "2026",
          description: [
            "Architected a comprehensive public service digital application concept for citizens of Sawotratap Village.",
            "Awarded 3rd Best Project in the Level 2 Vocational Competency Examination for Grade XI SIJA 2 (2025/2026).",
            "Designed end-to-end Figma interactive prototypes and mapped responsive web architecture.",
          ],
          tech: ["UI/UX Architecture", "Figma", "Web Systems", "SIJA Architecture"],
        },
        {
          company: "Microsoft x KOMDIGI x elevAIte",
          role: "Azure AI National Certification Participant",
          period: "2025",
          description: [
            "Completed the official national curriculum covering Artificial Intelligence foundations, Azure Cloud, Machine Learning, Computer Vision, and NLP.",
            "Earned verified certification for the Preparation Course for Azure AI Fundamentals (AI-900).",
          ],
          tech: ["Microsoft Azure", "AI Fundamentals", "Machine Learning", "Computer Vision"],
        },
        {
          company: "Universitas Indonesia (HIMANIA FIA UI)",
          role: "National Semifinalist (BRAND UI 2025)",
          period: "2025",
          description: [
            "Engineered a digital business model proposal under the theme 'Street-Smart Innovation: Business Solutions for Real Urban Challenges'.",
            "Reached the national semifinal round among high school competitors with an actionable tech presentation.",
          ],
          tech: ["Business Model", "Urban Innovation", "Pitch Presentation"],
        },
      ],
    },
    education: {
      badge: "Education & Awards",
      title: "Education & Achievements",
      subtitle: "Formal vocational background and verified technical certifications.",
      timeline: [
        {
          type: "Formal Education",
          title: "Information Systems, Networks & Applications (SIJA)",
          institution: "SMK Telkom Sidoarjo",
          period: "2023 - Present",
          description: "Focused on software engineering, modern web development, relational database systems, networking architecture, and cloud computing.",
        },
        {
          type: "Achievement / Award",
          title: "3rd Best Project Award in SIJA Level 2 Examination",
          institution: "SMK Telkom Sidoarjo",
          period: "2026",
          description: "Honored for the innovative digital public service concept for Sawotratap Village.",
        },
        {
          type: "Competition",
          title: "National Semifinalist High School Business Plan",
          institution: "BRAND UI 2025 - Universitas Indonesia",
          period: "2025",
          description: "Innovative solutions addressing urban challenges in a nationwide high school competition.",
        },
        {
          type: "Certification",
          title: "Azure AI Fundamentals (AI-900) Prep Certification",
          institution: "Microsoft x KOMDIGI x elevAIte",
          period: "2025",
          description: "Certified in Artificial Intelligence fundamentals, Machine Learning, Computer Vision, and NLP.",
        },
      ],
      certificates: [
        {
          title: "Microsoft Azure AI Fundamentals (AI-900)",
          issuer: "Microsoft x KOMDIGI",
          date: "2025",
          skills: ["Azure Cloud", "AI Concepts", "Machine Learning", "NLP"],
        },
        {
          title: "3rd Best SIJA Project Award (Sawotratap Village)",
          issuer: "SMK Telkom Sidoarjo",
          date: "2026",
          skills: ["Web System", "Public Service App", "SIJA Architecture"],
        },
        {
          title: "BRAND UI 2025 Business Plan Semifinalist",
          issuer: "FIA Universitas Indonesia",
          date: "2025",
          skills: ["Business Planning", "Urban Innovation", "Presentation"],
        },
        {
          title: "3rd Place AAFI JATIM CUP 2025 (U-16)",
          issuer: "AAFI East Java",
          date: "2025",
          skills: ["Teamwork", "Discipline", "Championship"],
        },
      ],
    },
    projects: {
      badge: "Featured Work",
      title: "Featured Projects",
      subtitle: "A showcase of web applications, interactive dashboards, and digital platforms I've engineered.",
      allCategory: "All",
      searchPlaceholder: "Search by tech or project name...",
      noResultsTitle: "No projects found",
      noResultsDesc: "Try searching with a different keyword or tech stack.",
      liveDemo: "Live Demo",
      github: "Source Code",
      items: [
        {
          title: "E-Commerce Modern Dashboard",
          category: "Web Application",
          description: "Real-time analytics dashboard with interactive charts, dark mode, and dynamic product inventory management.",
          tech: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts", "Supabase"],
          link: "https://github.com",
          github: "https://github.com",
          gradient: "from-[#162420] via-[#1D2E29] to-[#101A17]",
        },
        {
          title: "AI Writing Assistant App",
          category: "SaaS Platform",
          description: "AI-driven content generation platform featuring a clean UI, smart markdown editor, and OpenAI API integration.",
          tech: ["React.js", "Tailwind CSS", "OpenAI API", "Node.js"],
          link: "https://github.com",
          github: "https://github.com",
          gradient: "from-[#1D2E29] via-[#22352F] to-[#101A17]",
        },
        {
          title: "Interactive Learning Hub",
          category: "EdTech",
          description: "Interactive learning platform with timed quizzes, dynamic video modules, and student achievement tracking.",
          tech: ["Vue.js", "Pinia", "Tailwind CSS", "Supabase"],
          link: "https://github.com",
          github: "https://github.com",
          gradient: "from-[#182823] via-[#14221E] to-[#101A17]",
        },
        {
          title: "FinTech Personal Portfolio & Tracker",
          category: "Web Application",
          description: "Personal finance and investment tracker application with interactive data visualization and financial report export.",
          tech: ["Next.js", "TypeScript", "Tailwind CSS", "Chart.js"],
          link: "https://github.com",
          github: "https://github.com",
          gradient: "from-[#22352F] via-[#182823] to-[#101A17]",
        },
      ],
    },
    profileSpotlight: {
      badge: "Who I Am",
      title: "Getting to Know Me Closer",
      subtitle: "My journey, vision, and dedication in software engineering and modern technology.",
      name: "Raka Febrian",
      role: "Software Developer & Tech Enthusiast",
      school: "SMK Telkom Sidoarjo — SIJA",
      p1: "I am a Software Developer and an active student majoring in Information Systems, Networks, and Applications (SIJA) at SMK Telkom Sidoarjo with a passion for software engineering, full-stack web development, and engineering digital solutions that solve real-world problems.",
      p2: "Equipped with a solid foundation in modern web ecosystems (Frontend & Backend), databases, cloud & AI fundamentals, and UI/UX design in Figma, I am committed to creating clean, modular, performant, and reliable applications that deliver meaningful value.",
      stats: [
        { label: "Core Fields", value: "Software & Web Dev", desc: "Full-Stack, Cloud & UI/UX" },
        { label: "Education", value: "SIJA SMK Telkom", desc: "Sidoarjo, East Java" },
        { label: "Availability", value: "Ready to Collaborate", desc: "Internship / Project Dev" },
      ],
    },
    contact: {
      badge: "Get in Touch",
      title: "Let's Work Together!",
      subtitle: "I am always excited to discuss new internship opportunities, software & web projects, or simply chat about modern technology.",
      heroTitle: "Interested in Collaborating or Building a Project?",
      heroSubtitle: "I am always open to discussing software engineering, full-stack web systems, or new internship and collaboration opportunities.",
      emailCta: "Contact via Email",
      copyEmail: "Copy Email",
      copiedEmail: "Email Copied to Clipboard!",
      openFormCta: "Send Direct Message",
      closeFormCta: "Hide Form",
      localTimeLabel: "Local Time",
      locationTag: "Sidoarjo, Indonesia (WIB / UTC+7)",
      socials: {
        linkedin: "LinkedIn",
        github: "GitHub",
        email: "Email",
        instagram: "Instagram",
      },
      infoTitle: "Contact Information",
      infoDesc: "I typically reply to messages in less than 24 hours.",
      emailLabel: "Email",
      githubLabel: "GitHub",
      statusText: "Open for Internships, Part-time & Freelance",
      formTitle: "Send a Direct Message",
      nameLabel: "Full Name *",
      namePlaceholder: "e.g. John Doe",
      emailInputLabel: "Your Email *",
      emailPlaceholder: "john@example.com",
      messageLabel: "Message / Project Scope *",
      messagePlaceholder: "Tell me about your project needs or opportunity...",
      sendButton: "Send Message Now",
      sendingButton: "Saving to Database...",
      successMessage: "✓ Message sent successfully! Thank you, I will get back to you shortly.",
      errorMessage: "✕ Failed to send message. Please contact directly via email.",
    },
    footer: {
      role: "SIJA Student at SMK Telkom Sidoarjo & Software Developer",
      rights: "All rights reserved.",
      techNote: "Built with Next.js, Tailwind CSS & Supabase.",
    },
    cv: {
      modalTitle: "Curriculum Vitae — Raka Febrian",
      downloadPdf: "Download PDF",
      print: "Print CV",
      close: "Close",
      name: "RAKA FEBRIAN",
      role: "SOFTWARE DEVELOPER & TECH ENTHUSIAST",
      schoolInfo: "SMK TELKOM SIDOARJO — SIJA",
      contactInfo: {
        location: "Sidoarjo, East Java, Indonesia",
        email: "mr.rakka23@gmail.com",
        phone: "+62 889-9130-4142",
        github: "github.com/rakaa-star",
        website: "instagram.com/rakaafeb_",
      },
      summaryTitle: "ABOUT ME",
      summaryText: "I am a vocational high school student majoring in Information Systems, Networks, and Applications (SIJA) at SMK Telkom Sidoarjo with skills across software engineering, modern web development (frontend & backend), database integration, and UI/UX design. Experienced in building responsive, scalable applications with React.js, Next.js, TypeScript, PHP/Laravel, and Tailwind CSS. Committed to clean architecture, performance optimization, and practical problem solving.",
      experienceTitle: "EXPERIENCE & ACHIEVEMENTS",
      educationTitle: "EDUCATION",
      skillsTitle: "TECHNICAL SKILLS",
      certificationsTitle: "CERTIFICATIONS & AWARDS",
      languagesTitle: "LANGUAGES",
      languagesList: [
        { lang: "Indonesian", level: "Native" },
        { lang: "English", level: "Professional Working" },
      ],
    },
  },
};
