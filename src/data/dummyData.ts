import {
  BookItem,
  JournalItem,
  ArticleItem,
  TrainingProgram,
  CertificateRecord,
  StatusTrackingRecord,
  TestimonialItem,
} from '../types';

export const PUBLISHING_SERVICES = [
  {
    id: 'paket-penerbitan',
    title: 'Paket Penerbitan Buku',
    subtitle: 'Mulai dari Naskah Mentah hingga Buku Cetak Ber-ISBN Resmi',
    description: 'Fasilitas lengkap: pengurusan ISBN & Barcode resmi Perpusnas, tata letak interior (layout) profesional, desain cover premium, proofreading, cetak bukti terbit, dan distribusi ke marketplace.',
    badge: 'Paling Populer',
    icon: 'BookOpen',
    packages: [
      {
        name: 'Paket Mandiri (Hemat)',
        price: 'Rp 1.450.000',
        features: [
          'ISBN & Barcode Resmi Perpusnas RI',
          'Layout & Formatting Standar UNESCO (15.5 x 23 cm)',
          'Desain Cover 2 Opsi Alternatif',
          'Proofreading Ringan EBI',
          'Cetak 5 Eksemplar Bookpaper Mewah (Softcover)',
          'E-Certificate Kepengarangan Penulis',
          'Royalti Penjualan 100% Milik Penulis'
        ]
      },
      {
        name: 'Paket Akademisi (Silver)',
        price: 'Rp 2.850.000',
        isPopular: true,
        features: [
          'Semua fasilitas Paket Mandiri',
          'Pencatatan HAKI / Hak Cipta Kemenkumham (E-Hak Cipta)',
          'Uji Kemiripan Turnitin (Plagiarism Check <20%)',
          'Tata Letak Tipografi Akademik & Rumus/Tabel Rumit',
          'Cetak 10 Eksemplar (Kertas Bookpaper 72gsm)',
          'Pemasaran di Shopee, Tokopedia, & Web Licyum',
          'Diserahkan ke Deposit Perpustakaan Nasional (Wajib Serah Simpan)'
        ]
      },
      {
        name: 'Paket Mahakarya (Gold)',
        price: 'Rp 4.950.000',
        features: [
          'Semua fasilitas Paket Akademisi',
          'Hardcover Eksklusif Finishing Emboss / Spot UV',
          'Penyuntingan Substansi Naskah Mendalam oleh Editor Ahli',
          'Cetak 25 Eksemplar Siap Sebar & Promosi',
          'Pembuatan Landing Page Promosi Buku Khusus',
          'Buku Masuk Katalog Google Play Books & Google Scholar',
          'Pendampingan Konversi ke Angka Kredit Dosen (PAK / BKD)'
        ]
      }
    ]
  },
  {
    id: 'isbn-haki',
    title: 'Pengurusan ISBN & HAKI Cepat',
    subtitle: 'Legalitas Hak Cipta & Pengakuan Resmi Karya Anda',
    description: 'Kami adalah anggota resmi IKAPI yang memiliki jalur kemitraan terverifikasi dengan Perpustakaan Nasional RI dan Direktorat Jenderal Kekayaan Intelektual (DJKI) Kemenkumham.',
    badge: 'Legalitas Terjamin',
    icon: 'ShieldCheck',
    highlights: [
      'Proses ISBN 3-7 hari kerja (sesuai regulasi Perpusnas)',
      'Sertifikat Resmi E-Hak Cipta DJKI keluar dalam 1-2 hari kerja',
      'Barcode ISBN vektor resolusi tinggi siap cetak',
      'Surat Keterangan Penerbitan untuk kelengkapan BKD / Kum Dosen'
    ]
  },
  {
    id: 'konversi-karya',
    title: 'Konversi Skripsi, Tesis & Disertasi Jadi Buku',
    subtitle: 'Ubah Karya Ilmiah Kampus Menjadi Buku Referensi / Monograf Ber-ISBN',
    description: 'Tim editor doktoral Licyum merestrukturisasi bahasa kaku tugas akhir menjadi narasi buku ilmiah populer atau monograf berbobot sesuai standar BSNP dan Perpusnas.',
    badge: 'Spesialis Akademisi',
    icon: 'Layers',
    highlights: [
      'Menghilangkan format bab skripsi kaku (Bab 1, 2, 3) menjadi bab tematik menarik',
      'Penyesuaian gaya selingkung akademis populer',
      'Peer-review oleh mitra bestari bergelar Profesor / Doktor bidang terkait',
      'Bisa langsung diajukan untuk klaim angka kredit (KUM) 20 - 40 poin'
    ]
  }
];

export const BOOKS_DATA: BookItem[] = [
  {
    id: 'lic-book-001',
    title: 'Metodologi Penelitian Kualitatif & Mixed Methods: Panduan Komprehensif Akademisi',
    author: 'Prof. Dr. Hendra Suprayitno, M.Si.',
    authorTitle: 'Guru Besar Metodologi Penelitian UNY & Reviewer Nasional',
    category: 'Pendidikan',
    coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=700',
    price: 115000,
    originalPrice: 145000,
    rating: 4.9,
    reviewsCount: 128,
    pages: 348,
    year: 2025,
    isbn: '978-623-8891-12-8',
    synopsis: 'Buku ini mengupas tuntas paradigma penelitian kualitatif kontemporer, perancangan instrumen, teknik triangulasi data, hingga integrasi mixed methods (triangulasi konvergen dan eksplanatori sekuensial) yang dilengkapi studi kasus nyata.',
    tags: ['Metode Riset', 'Akademisi', 'Kualitatif', 'Tesis & Disertasi'],
    inStock: true,
    featured: true
  },
  {
    id: 'lic-book-002',
    title: 'Strategi Menembus Jurnal Bereputasi Internasional Terindeks Scopus & WoS',
    author: 'Dr. Ahmad Fauzan, Ph.D. & Tim Editor Licyum',
    authorTitle: 'Senior Reviewer di IEEE & Elsevier',
    category: 'Teknologi & AI',
    coverUrl: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777a?auto=format&fit=crop&q=80&w=700',
    price: 135000,
    originalPrice: 175000,
    rating: 5.0,
    reviewsCount: 240,
    pages: 290,
    year: 2025,
    isbn: '978-623-8891-24-1',
    synopsis: 'Buku panduan praktis dari A sampai Z mengenai cara memilih target jurnal Q1-Q4, menyusun naskah berstandar IMRaD tingkat lanjut, merespons feedback reviewer yang tajam, hingga strategi etis menghadapi desk reject.',
    tags: ['Scopus', 'Publikasi', 'Dosen', 'Jurnal Internasional'],
    inStock: true,
    featured: true
  },
  {
    id: 'lic-book-003',
    title: 'Kecerdasan Buatan (Generative AI) dalam Transformasi Pendidikan Tinggi Abad 21',
    author: 'Ir. Dian Kusuma Wardhana, M.Eng., Ph.D.',
    authorTitle: 'Dosen Teknik Informatika UI & Peneliti NLP',
    category: 'Teknologi & AI',
    coverUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=700',
    price: 120000,
    originalPrice: 150000,
    rating: 4.8,
    reviewsCount: 96,
    pages: 312,
    year: 2025,
    isbn: '978-623-8891-30-2',
    synopsis: 'Membahas integrasi etis model bahasa besar (LLM) seperti ChatGPT, Claude, dan Gemini ke dalam pedagogi modern, asesmen autentik mahasiswa, serta mitigasi academic dishonesty di era digital.',
    tags: ['Artificial Intelligence', 'Pedagogi Digital', 'Kampus Merdeka'],
    inStock: true,
    featured: false
  },
  {
    id: 'lic-book-004',
    title: 'Hukum Siber, Hak Kekayaan Intelektual, dan Perlindungan Data Pribadi di Indonesia',
    author: 'Dr. Natalia Christie, S.H., M.Kn., LL.M.',
    authorTitle: 'Pakar Hukum Siber & Konsultan Regulasi Digital',
    category: 'Hukum',
    coverUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=700',
    price: 125000,
    originalPrice: 160000,
    rating: 4.9,
    reviewsCount: 82,
    pages: 276,
    year: 2024,
    isbn: '978-623-8891-05-0',
    synopsis: 'Kajian komprehensif implementasi UU Perlindungan Data Pribadi (UU PDP No. 27/2022), hukum siber, hak cipta digital, dan studi kasus penanganan kebocoran data di era komputasi awan.',
    tags: ['UU PDP', 'Hukum Bisnis', 'HAKI Digital', 'Cyber Law'],
    inStock: true,
    featured: false
  },
  {
    id: 'lic-book-005',
    title: 'Manajemen Strategik Berkelanjutan: Teori, Kasus Korporat, & ESG di Asia Tenggara',
    author: 'Dr. Bambang Wicaksono, S.E., M.B.A.',
    authorTitle: 'Praktisi Bisnis & Dosen Manajemen Strategi UGM',
    category: 'Manajemen & Bisnis',
    coverUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=700',
    price: 130000,
    originalPrice: 165000,
    rating: 4.7,
    reviewsCount: 64,
    pages: 360,
    year: 2024,
    isbn: '978-623-8891-18-0',
    synopsis: 'Eksplorasi strategi keunggulan bersaing berorientasi ESG (Environmental, Social, Governance) dengan pendekatan terintegrasi antara studi empiris dan implementasi industri manufaktur maupun perbankan di ASEAN.',
    tags: ['ESG', 'Manajemen Bisnis', 'Studi Kasus', 'Keberlanjutan'],
    inStock: true,
    featured: false
  },
  {
    id: 'lic-book-006',
    title: 'Epidemiologi Komprehensif dan Kebijakan Kesehatan Masyarakat Berbasis Bukti',
    author: 'dr. Farah Annisa, M.Epid., Ph.D.',
    authorTitle: 'Peneliti Epidemiologi & Konsultan WHO Indonesia',
    category: 'Kesehatan & Medis',
    coverUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=700',
    price: 145000,
    originalPrice: 180000,
    rating: 4.9,
    reviewsCount: 75,
    pages: 410,
    year: 2025,
    isbn: '978-623-8891-44-9',
    synopsis: 'Buku pegangan wajib bagi dokter, akademisi kesehatan, dan pembuat kebijakan dalam merumuskan evidence-based policy berbasis pemodelan transmisi penyakit menular dan pencegahan sindemik pascapandemi.',
    tags: ['Kesehatan Masyarakat', 'Epidemiologi', 'Kedokteran', 'Riset Medis'],
    inStock: true,
    featured: false
  },
  {
    id: 'lic-book-007',
    title: 'Psikologi Pendidikan Inklusif: Mengembangkan Potensi Anak Berkebutuhan Khusus di Sekolah Reguler',
    author: 'Siti Rahmawati, S.Psi., M.Ed., Ph.D.',
    authorTitle: 'Konsultan Pendidikan Inklusi & Dosen Psikologi Perkembangan',
    category: 'Pendidikan',
    coverUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=700',
    price: 108000,
    originalPrice: 135000,
    rating: 4.8,
    reviewsCount: 53,
    pages: 254,
    year: 2024,
    isbn: '978-623-8891-09-8',
    synopsis: 'Panduan kurikulum diferensiasi, asesmen diagnostik dini, modifikasi perilaku, dan teknik konseling ramah anak bagi guru dan praktisi pendidikan yang menyelenggarakan program kelas inklusi.',
    tags: ['Pendidikan Inklusi', 'Psikologi Anak', 'Guru Penggerak'],
    inStock: true,
    featured: false
  },
  {
    id: 'lic-book-008',
    title: 'Sosiologi Urban dan Perubahan Sosial di Megapolitan Nusantara',
    author: 'Dr. Ilham Satria Pratama, S.Sos., M.Si.',
    authorTitle: 'Sosiolog Perkotaan & Dosen Ilmu Sosial Unair',
    category: 'Sosial Humaniora',
    coverUrl: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&q=80&w=700',
    price: 110000,
    originalPrice: 140000,
    rating: 4.7,
    reviewsCount: 48,
    pages: 298,
    year: 2024,
    isbn: '978-623-8891-52-4',
    synopsis: 'Analisis mendalam mengenai dinamika ruang publik, gentrifikasi, segregasi spasial, serta transformasi mata pencaharian komunitas pinggiran di era aglomerasi perkotaan modern Indonesia.',
    tags: ['Sosiologi', 'Tata Kota', 'Humaniora', 'Riset Sosial'],
    inStock: true,
    featured: false
  }
];

export const JOURNALS_DATA: JournalItem[] = [
  {
    id: 'ljet',
    name: 'Licyum Journal of Educational Technology (LJET)',
    acronym: 'LJET',
    sintaBadge: 'SINTA 2',
    indexing: ['SINTA 2', 'DOAJ', 'Crossref (DOI)', 'Google Scholar', 'Garuda', 'Dimensions'],
    pIssn: '2807-6125',
    eIssn: '2807-6133',
    fieldOfStudy: 'Pendidikan & Teknologi Pembelajaran',
    frequency: 'Triwulanan (Maret, Juni, September, Desember)',
    coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400',
    description: 'Jurnal ilmiah berkala yang mempublikasikan artikel riset empiris dan konseptual orisinal seputar inovasi media pembelajaran, e-learning, kecerdasan buatan dalam edukasi, dan kurikulum digital.',
    editorInChief: 'Prof. Dr. Supardi, M.Pd. (Universitas Negeri Yogyakarta)',
    apcCost: 'Rp 1.250.000 (Waiver tersedia bagi mahasiswa S1/S2 berprestasi)',
    submissionOpen: true,
    ojsUrl: 'https://journal.licyum.id/index.php/ljet'
  },
  {
    id: 'jist',
    name: 'Jurnal Inovasi Sains & Terapan (JIST)',
    acronym: 'JIST',
    sintaBadge: 'SINTA 3',
    indexing: ['SINTA 3', 'DOAJ', 'Crossref (DOI)', 'Google Scholar', 'Garuda', 'Index Copernicus'],
    pIssn: '2774-8841',
    eIssn: '2774-885X',
    fieldOfStudy: 'Ilmu Komputer, Rekayasa Sains & Terapan',
    frequency: 'Semesteran (Mei & November)',
    coverImage: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=400',
    description: 'Memfokuskan pada diseminasi karya ilmiah bidang algoritma komputer, machine learning, internet of things (IoT), rekayasa material, dan aplikasi sains terapan untuk industri.',
    editorInChief: 'Dr. Eng. Teguh Prasetyo, M.T. (Institut Teknologi Bandung)',
    apcCost: 'Rp 1.000.000',
    submissionOpen: true,
    ojsUrl: 'https://journal.licyum.id/index.php/jist'
  },
  {
    id: 'lser',
    name: 'Licyum Social & Economic Review (LSER)',
    acronym: 'LSER',
    sintaBadge: 'SINTA 3',
    indexing: ['SINTA 3', 'Crossref (DOI)', 'Google Scholar', 'Garuda', 'BASE', 'EBSCO Host'],
    pIssn: '2962-3347',
    eIssn: '2962-3355',
    fieldOfStudy: 'Ekonomi, Manajemen & Kebijakan Publik',
    frequency: 'Triwulanan (Februari, Mei, Agustus, November)',
    coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=400',
    description: 'Media pertukaran ide kritis bagi para akademisi dan praktisi ekonomi mengenai kebijakan fiskal, moneter, ekonomi digital, kewirausahaan, serta pembangunan berkelanjutan di negara berkembang.',
    editorInChief: 'Dr. Miranti Maharani, S.E., M.Sc. (Universitas Indonesia)',
    apcCost: 'Rp 1.000.000',
    submissionOpen: true,
    ojsUrl: 'https://journal.licyum.id/index.php/lser'
  },
  {
    id: 'jkpp',
    name: 'Jurnal Konseling & Psikologi Terapan (JKPT)',
    acronym: 'JKPT',
    sintaBadge: 'SINTA 4',
    indexing: ['SINTA 4', 'Crossref (DOI)', 'Google Scholar', 'Garuda', 'Moraref'],
    pIssn: '2829-9022',
    eIssn: '2829-9030',
    fieldOfStudy: 'Psikologi Terapan & Bimbingan Konseling',
    frequency: 'Semesteran (Juni & Desember)',
    coverImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    description: 'Menampung penelitian seputar kesehatan mental masyarakat, konseling keluarga, intervensi perilaku di lingkungan kerja, dan asesmen psikologi kontekstual di Indonesia.',
    editorInChief: 'Rina Kusumaningtyas, M.Psi., Psikolog (Universitas Gadjah Mada)',
    apcCost: 'Rp 750.000',
    submissionOpen: true,
    ojsUrl: 'https://journal.licyum.id/index.php/jkpt'
  }
];

export const RECENT_ARTICLES: ArticleItem[] = [
  {
    id: 'art-001',
    journalId: 'ljet',
    journalName: 'Licyum Journal of Educational Technology (LJET)',
    title: 'Implementasi Model Project-Based Learning Berbantuan AI Generatif untuk Meningkatkan Keterampilan Pemecahan Masalah Mahasiswa Vokasi',
    authors: ['Fajar Anugrah', 'Tri Wahyuni', 'Dr. Muhammad Ridwan'],
    affiliation: 'Jurusan Teknik Mesin & Informatika, Politeknik Negeri Bandung & UPI',
    doi: '10.58921/ljet.v5i2.148',
    publicationDate: '15 Januari 2026',
    volume: 'Vol. 5 No. 2 (2026)',
    issue: 'Special Issue on AI Pedagogy',
    citations: 14,
    abstract: 'Penelitian eksperimen kuasi ini mengevaluasi pengaruh penerapan model pembelajaran berbasis proyek (PjBL) yang dipadukan dengan scaffold kecerdasan buatan generatif pada 124 mahasiswa semester empat program vokasi rekayasa. Hasil pre-test dan post-test menunjukkan peningkatan Normalized Gain (g = 0.72, kategori tinggi) secara signifikan dibanding kelas kontrol tradisional.',
    keywords: ['Project-Based Learning', 'Generative AI', 'Pendidikan Vokasi', 'Problem Solving Skills'],
    pdfDownloadUrl: '#'
  },
  {
    id: 'art-002',
    journalId: 'jist',
    journalName: 'Jurnal Inovasi Sains & Terapan (JIST)',
    title: 'Optimasi Arsitektur Convolutional Neural Network (CNN) untuk Deteksi Dini Penyakit Daun Padi Berbasis Citra Hiperspektral Lapangan',
    authors: ['Budi Santoso', 'Dr. Eng. Dian Permana', 'Siti Maulida'],
    affiliation: 'Departemen Ilmu Komputer & Fakultas Pertanian, Institut Pertanian Bogor (IPB)',
    doi: '10.58921/jist.v4i1.92',
    publicationDate: '28 Desember 2025',
    volume: 'Vol. 4 No. 1 (2025)',
    issue: 'Regular Issue',
    citations: 9,
    abstract: 'Studi ini mengembangkan modifikasi arsitektur ResNet-50 dengan mekanisme attention gating spasial untuk mendeteksi empat tipe penyakit daun tanaman padi (Bacterial Leaf Blight, Brown Spot, Leaf Blast, dan Tungro). Model yang diusulkan mencapai akurasi uji 98.4% dengan latensi inferensi hanya 32 ms pada perangkat edge mobile computing.',
    keywords: ['Deep Learning', 'CNN', 'Precision Agriculture', 'Deteksi Daun Padi', 'Edge AI'],
    pdfDownloadUrl: '#'
  },
  {
    id: 'art-003',
    journalId: 'lser',
    journalName: 'Licyum Social & Economic Review (LSER)',
    title: 'Dampak Literasi Keuangan Digital dan Layanan PayLater terhadap Perilaku Konsumtif Generasi Z: Studi Empiris Struktural Equation Modeling (SEM)',
    authors: ['Nadia Putri Utami', 'Prof. Dr. Hendri Rusli, M.Sc.'],
    affiliation: 'Fakultas Ekonomi dan Bisnis, Universitas Indonesia',
    doi: '10.58921/lser.v6i3.210',
    publicationDate: '10 Desember 2025',
    volume: 'Vol. 6 No. 3 (2025)',
    issue: 'Consumer Finance & Millennial Behavior',
    citations: 22,
    abstract: 'Menggunakan sampel 480 responden Gen Z di wilayah Jabodetabek, penelitian ini membuktikan bahwa kemudahan akses PayLater dan persepsi diskon memiliki pengaruh positif kuat terhadap perilaku impulsive buying, namun pengaruh tersebut dapat dimoderasi secara signifikan oleh tingkat literasi keuangan yang komprehensif.',
    keywords: ['Literasi Keuangan', 'Financial Technology', 'Buy Now Pay Later', 'Generasi Z', 'PLS-SEM'],
    pdfDownloadUrl: '#'
  },
  {
    id: 'art-004',
    journalId: 'jkpp',
    journalName: 'Jurnal Konseling & Psikologi Terapan (JKPT)',
    title: 'Efektivitas Brief Mindfulness-Based Cognitive Therapy (MBCT) dalam Menurunkan Tingkat Burnout pada Guru Honorer Tingkat Menengah',
    authors: ['Dewi Lestari, M.Psi.', 'Agus Priyono, S.Psi.'],
    affiliation: 'Pusat Studi Psikologi Terapan, Universitas Sebelas Maret (UNS)',
    doi: '10.58921/jkpt.v3i2.84',
    publicationDate: '18 November 2025',
    volume: 'Vol. 3 No. 2 (2025)',
    issue: 'Mental Health in Workplace',
    citations: 7,
    abstract: 'Intervensi MBCT berdurasi empat minggu dilakukan terhadap 36 guru honorer yang terindikasi mengalami emotional exhaustion tinggi berdasarkan Maslach Burnout Inventory (MBI). Uji Wilcoxon Signed-Rank membuktikan adanya penurunan skor kelelahan emosional yang signifikan secara statistik (p < 0.001) pascatreatment.',
    keywords: ['Mindfulness', 'MBCT', 'Teacher Burnout', 'Kesehatan Mental Guru', 'Kesejahteraan Subjektif'],
    pdfDownloadUrl: '#'
  }
];

export const TRAINING_PROGRAMS: TrainingProgram[] = [
  {
    id: 'train-001',
    title: 'Masterclass: Penulisan Buku Ajar & Monograf Ber-ISBN Sesuai Standar BSNP & BKD Dosen',
    category: 'Penulisan & Publikasi',
    instructor: {
      name: 'Prof. Dr. Agus Raharjo, M.Si.',
      role: 'Asesor Beban Kerja Dosen (BKD) & Penulis 28 Judul Buku Ber-ISBN',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'
    },
    date: '18 - 20 Maret 2026',
    time: '08.30 - 16.00 WIB',
    durationJp: 32,
    method: 'Online (Zoom HD)',
    quota: 60,
    enrolled: 48,
    price: 650000,
    earlyBirdPrice: 450000,
    bannerImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=700',
    benefits: [
      'Sertifikat Resmi 32 Jam Pelajaran (32 JP) Bernomor Induk',
      'Pendampingan Bedah Naskah hingga Siap Diterbitkan & Terbit ISBN',
      'Template Bab Baku Buku Monograf & Buku Referensi (Word)',
      'Konsultasi Hak Cipta / HAKI Kemenkumham Gratis 1 Karya',
      'Akses Rekaman Video & E-Modul Pembelajaran Selamanya'
    ],
    featured: true
  },
  {
    id: 'train-002',
    title: 'Workshop Intensif: Tembus Jurnal Bereputasi Internasional Scopus Q1-Q2 & Penulisan IMRaD Unggul',
    category: 'Penulisan & Publikasi',
    instructor: {
      name: 'Dr. Ratna Dewi Sartika, M.Ed., Ph.D.',
      role: 'Reviewer Internasional & Penerima Penghargaan Peneliti Terbaik SINTA',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200'
    },
    date: '25 - 26 Maret 2026',
    time: '09.00 - 16.30 WIB',
    durationJp: 24,
    method: 'Online (Zoom HD)',
    quota: 50,
    enrolled: 42,
    price: 750000,
    earlyBirdPrice: 490000,
    bannerImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=700',
    benefits: [
      'Sertifikat 24 JP Terakreditasi Asosiasi Dosen',
      'Checklist Evaluasi Naskah Standar Reviewer Elsevier & Springer',
      'Teknik Menanggapi Major Revision Tanpa Ditolak',
      'Voucher Diskon Proofreading Internasional Rp 300.000',
      'Grup Pendampingan Mentoring Naskah selama 30 Hari'
    ],
    featured: true
  },
  {
    id: 'train-003',
    title: 'In-House Training: Penguatan Budaya Riset Dosen, Tata Kelola OJS 3, & Percepatan Akreditasi SINTA',
    category: 'In-House Kampus',
    instructor: {
      name: 'Ir. Hendra Gunawan, S.Kom., M.Cs., Ph.D. & Tim Konsultan Licyum',
      role: 'Fasilitator Akreditasi Jurnal Nasional & Konsultan SPMI Perguruan Tinggi',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
    },
    date: '10 - 12 April 2026',
    time: '08.00 - 17.00 WIB (3 Hari Penuh)',
    durationJp: 40,
    method: 'Offline (Hotel Bintang 4)',
    location: 'Hotel Santika Premiere, Yogyakarta / Bisa Dipanggil ke Kampus Anda',
    quota: 30,
    enrolled: 18,
    price: 2850000,
    earlyBirdPrice: 2250000,
    bannerImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=700',
    benefits: [
      'Audit Langsung Sistem OJS 3 Kampus Peserta oleh Praktisi',
      'Roadmap Lengkap Menuju SINTA 2 & DOAJ 2026',
      'Format Instrumen Akreditasi Baru Berdasarkan Pedoman ARJUNA',
      'Modul Pelatihan Khusus Tata Letak XML/HTML Galley Paper',
      'Pendampingan Simulasi Penilaian Akreditasi'
    ],
    featured: false
  },
  {
    id: 'train-004',
    title: 'Sertifikasi BNSP: Certified Educational Consultant & Instruktur Pelatihan Berstandar Nasional',
    category: 'Akreditasi',
    instructor: {
      name: 'Dr. Tri Wibowo, S.Pd., M.M., CBA.',
      role: 'Master Asesor BNSP & Direktur LPK Licyum Professional Institute',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
    },
    date: '22 - 24 April 2026',
    time: '08.30 - 16.30 WIB',
    durationJp: 36,
    method: 'Hybrid',
    location: 'Jakarta Cyber Hall & Zoom Meeting',
    quota: 25,
    enrolled: 19,
    price: 3450000,
    earlyBirdPrice: 2950000,
    bannerImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=700',
    benefits: [
      'Sertifikat Kompetensi Resmi Berlogo Garuda dari BNSP (Bila Lulus Asesmen)',
      'Sertifikat Pelatihan 36 JP Licyum Institute',
      'Portofolio Standar Asesmen Siap Uji',
      'Konsultasi Pra-Asesmen Bersama Master Asesor',
      'Terdaftar di Database Tenaga Profesional Terverifikasi'
    ],
    featured: false
  }
];

export const VERIFIED_CERTIFICATES: Record<string, CertificateRecord> = {
  'LCY-2024-EDU-092': {
    certificateNumber: 'LCY-2024-EDU-092',
    participantName: 'Dra. Endang Sulistyowati, M.Pd.',
    programTitle: 'Pelatihan Penulisan Buku Ajar & Monograf Ber-ISBN Sesuai Standar BSNP',
    institution: 'Universitas Negeri Semarang (UNNES)',
    issueDate: '24 Oktober 2024',
    grade: 'Sangat Memuaskan (A)',
    jpTotal: 32,
    status: 'VALID & TERVERIFIKASI',
    credentialId: 'CRED-98231-LIC-2024'
  },
  'LCY-2024-JRN-108': {
    certificateNumber: 'LCY-2024-JRN-108',
    participantName: 'Dr. Ir. Raden Sukoco, M.T.',
    programTitle: 'Workshop Intensif Menembus Jurnal Terindeks Scopus & SINTA 1-2',
    institution: 'Institut Teknologi Sepuluh Nopember (ITS)',
    issueDate: '15 November 2024',
    grade: 'Dengan Pujian (Cum Laude / A+)',
    jpTotal: 24,
    status: 'VALID & TERVERIFIKASI',
    credentialId: 'CRED-54129-LIC-2024'
  },
  'LCY-2024-WRK-415': {
    certificateNumber: 'LCY-2024-WRK-415',
    participantName: 'Ahmad Fauzi, S.Pd., M.Ed.',
    programTitle: 'In-House Training: Integrasi AI Generatif dalam Pembelajaran Kampus Merdeka',
    institution: 'Universitas Muhammadiyah Surakarta',
    issueDate: '08 Desember 2024',
    grade: 'Sangat Memuaskan (A)',
    jpTotal: 32,
    status: 'VALID & TERVERIFIKASI',
    credentialId: 'CRED-77812-LIC-2024'
  }
};

export const STATUS_TRACKING_SAMPLES: Record<string, StatusTrackingRecord> = {
  'ISBN-9281-2024': {
    trackingCode: 'ISBN-9281-2024',
    type: 'ISBN',
    title: 'Transformasi Digital dan Tata Kelola Sekolah Unggul',
    applicant: 'Dr. Wahyu Pratama, M.Pd. (Universitas Negeri Jakarta)',
    submissionDate: '28 Oktober 2024',
    currentStep: 'Penetapan Nomor ISBN & Barcode oleh Tim Perpusnas RI',
    statusPercent: 85,
    statusLabel: 'Disetujui Perpusnas',
    notes: 'Draft final cover dan layout selesai divalidasi. Surat resmi ISBN sedang diterbitkan oleh Perpustakaan Nasional RI.'
  },
  'JRN-REV-304': {
    trackingCode: 'JRN-REV-304',
    type: 'NASKAH_JURNAL',
    title: 'Penerapan Algoritma Deep Residual Learning pada Klasifikasi Spektrum Citra Medis',
    applicant: 'Dian Permadi, S.Kom., M.Cs.',
    submissionDate: '14 November 2024',
    currentStep: 'Double-Blind Peer Review (2 Reviewer Bidang Informatika)',
    statusPercent: 60,
    statusLabel: 'Proses Review',
    notes: 'Reviewer 1 telah mengirimkan catatan perbaikan minor. Menunggu ulasan dari Reviewer 2 paling lambat tanggal 10 Desember.'
  },
  'SRT-VER-882': {
    trackingCode: 'SRT-VER-882',
    type: 'SERTIFIKAT',
    title: 'Sertifikat Pelatihan Penulisan Artikel Ilmiah 32 JP',
    applicant: 'Siti Nurhaliza, M.Si.',
    submissionDate: '02 Desember 2024',
    currentStep: 'Verifikasi Tanda Tangan Digital & Nomor Registrasi Nasional',
    statusPercent: 100,
    statusLabel: 'Terbit & Final',
    notes: 'Sertifikat resmi telah diterbitkan dan telah terdaftar pada pangkalan data verifikasi keaslian Licyum.'
  }
};

export const METRICS_DATA = [
  {
    value: '1.480+',
    label: 'Buku Ber-ISBN Terbit',
    description: 'Terdaftar resmi di Perpusnas RI & anggota IKAPI',
    icon: 'BookOpen'
  },
  {
    value: '920+',
    label: 'Artikel Jurnal Terpublikasi',
    description: 'Terindeks SINTA 2-4, DOAJ, & Crossref DOI',
    icon: 'FileText'
  },
  {
    value: '34.500+',
    label: 'Alumni Pelatihan & Guru/Dosen',
    description: 'Tersebar di 38 provinsi di seluruh Nusantara',
    icon: 'Users'
  },
  {
    value: '140+',
    label: 'Mitra Kampus & Sekolah',
    description: 'Kerjasama resmi Tri Dharma Perguruan Tinggi',
    icon: 'Award'
  }
];

export const PARTNERS_DATA = [
  { name: 'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi', short: 'Kemendikbudristek', logoText: 'KEMENDIKBUDRISTEK' },
  { name: 'Perpustakaan Nasional Republik Indonesia', short: 'Perpusnas RI', logoText: 'PERPUSNAS RI' },
  { name: 'Ikatan Penerbit Indonesia', short: 'IKAPI', logoText: 'ANGGOTA IKAPI' },
  { name: 'DJKI Kementerian Hukum dan HAM', short: 'DJKI Kemenkumham', logoText: 'DJKI HAKI' },
  { name: 'Science and Technology Index', short: 'SINTA Ristekdikti', logoText: 'SINTA KEMDIKBUD' },
  { name: 'Directory of Open Access Journals', short: 'DOAJ Indexed', logoText: 'DOAJ' },
  { name: 'Crossref DOI Official Member', short: 'Crossref', logoText: 'Crossref DOI' },
  { name: 'Universitas Indonesia', short: 'UI Mitra Riset', logoText: 'UNIVERSITAS INDONESIA' },
  { name: 'Universitas Gadjah Mada', short: 'UGM Publishing Partner', logoText: 'UNIVERSITAS GADJAH MADA' },
  { name: 'Institut Teknologi Bandung', short: 'ITB Academic Collab', logoText: 'ITB BANDUNG' }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 'testi-01',
    name: 'Prof. Dr. Ir. Suyanto, M.Eng.',
    title: 'Guru Besar Teknik Elektro & Reviewer Jurnal Internasional',
    institution: 'Universitas Diponegoro',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
    serviceType: 'Penerbitan Buku',
    content: 'Mengonversi riset disertasi dan proyek laboratorium menjadi buku referensi ber-ISBN di Licyum adalah keputusan tepat. Tim layoutnya sangat rapi menangani rumus matematis rumit, pengurusan ISBN Perpusnas cepat, dan buku saya langsung dipasarkan profesional.',
    rating: 5
  },
  {
    id: 'testi-02',
    name: 'Dr. Anindita Kusuma Wardani, S.Pd., M.Hum.',
    title: 'Dosen Pendidikan Bahasa & Editor Jurnal',
    institution: 'Universitas Negeri Yogyakarta',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    serviceType: 'Jurnal Ilmiah',
    content: 'Proses peer-review di portal jurnal Licyum sangat transparan dan berstandar OJS kelas dunia. Catatan dari mitra bestari sangat konstruktif memperkaya artikel kami hingga akhirnya terbit dan terindeks SINTA 2.',
    rating: 5
  },
  {
    id: 'testi-03',
    name: 'Drs. H. Mulyadi Kartodipuro, M.M.',
    title: 'Kepala Sekolah Penggerak & Ketua MKKS',
    institution: 'SMA Negeri 1 Klaten',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    serviceType: 'Pelatihan & Konsultasi',
    content: 'Kami mengundang tim Licyum untuk in-house training penulisan karya ilmiah populer bagi 60 guru kami. Materinya sangat aplikatif, narasumber kredibel, dan sertifikat 32 JP-nya lengkap dengan nomor induk yang diakui resmi saat kenaikan pangkat.',
    rating: 5
  }
];

export const AUTHOR_GUIDELINES = [
  {
    step: '1',
    title: 'Format Penulisan IMRaD',
    description: 'Naskah ditulis mengikuti struktur baku: Judul (maks 15 kata), Abstrak (150-250 kata, bahasa Indonesia & Inggris), Introduction, Methods, Results & Discussion, serta Conclusion.'
  },
  {
    step: '2',
    title: 'Manajemen Referensi Baku',
    description: 'Wajib menggunakan reference manager standar (Mendeley, Zotero, atau EndNote) dengan gaya APA 7th Edition. Minimal 80% rujukan berasal dari artikel jurnal bereputasi 5 tahun terakhir.'
  },
  {
    step: '3',
    title: 'Uji Kemiripan (Turnitin < 20%)',
    description: 'Seluruh naskah wajib melalui pemeriksaan plagiarisme. Licyum menyediakan layanan cek pra-submit Turnitin dengan filter exclude bibliography dan quotes.'
  },
  {
    step: '4',
    title: 'Double-Blind Peer Review',
    description: 'Menjamin objektivitas penilaian saintifik. Identitas penulis disamarkan sebelum diteruskan kepada dua pakar reviewer independen di bidang yang selaras.'
  }
];
