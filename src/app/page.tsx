"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ExternalLink,
  BookOpen,
  GraduationCap,
  Award,
  Building2,
  CheckCircle2,
  FileText,
  Phone,
  Mail,
  MapPin,
  Clock,
  Search,
  ChevronRight,
  ShieldCheck,
  Download,
  HelpCircle,
  Layers,
  ArrowUpRight,
  Sparkles,
  Printer,
  Users,
  Send,
  Calendar,
  Compass,
  Check,
  X
} from "lucide-react";

/**
 * =========================================================================
 * KONFIGURASI URL PORTAL UTAMA (PORTAL_URLS)
 * Anda dapat mengarahkan link ke sub-halaman lokal (/buku, /jurnal, /pelatihan)
 * atau ke subdomain mandiri (contoh: https://penerbit.licyum.id, https://journal.licyum.id)
 * melalui file .env atau langsung diubah pada objek di bawah ini.
 * =========================================================================
 */
const PORTAL_URLS = {
  buku: process.env.NEXT_PUBLIC_PORTAL_BUKU_URL || "/buku",
  jurnal: process.env.NEXT_PUBLIC_PORTAL_JURNAL_URL || "/jurnal",
  pelatihan: process.env.NEXT_PUBLIC_PORTAL_PELATIHAN_URL || "/pelatihan",
  whatsapp: "https://wa.me/6281234567890",
  email: "sekretariat@licyum.id"
};

export default function CorporateDirectoryPage() {
  // Modal states for interactive features
  const [activeModal, setActiveModal] = useState<"verify" | "guidelines" | "contact" | null>(null);
  const [verifyType, setVerifyType] = useState<"isbn" | "sertifikat" | "jurnal">("isbn");
  const [verifyQuery, setVerifyQuery] = useState("");
  const [verifyResult, setVerifyResult] = useState<any>(null);

  // Handle Verify Lookup
  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyQuery.trim()) return;

    if (verifyType === "isbn") {
      setVerifyResult({
        found: true,
        title: "Metodologi Penelitian Terapan untuk Perguruan Tinggi",
        meta: "ISBN: 978-623-10-8912-4 | Penulis: Prof. Dr. Hendra Wijaya, M.Pd.",
        status: "RESMI TERDAFTAR PERPUSNAS & TERBIT PT LICYUM",
        date: "14 Januari 2026",
      });
    } else if (verifyType === "sertifikat") {
      setVerifyResult({
        found: true,
        title: "Pelatihan Penulisan Buku Ajar Ber-ISBN & HKI Nasional",
        meta: "No. Sertifikat: SERT-LIC-2026-0891 | Peserta: Dr. Ahmad Fauzi, M.T.",
        status: "VALID & TERVERIFIKASI PUSAT SERTIFIKASI LICYUM",
        date: "25 Januari 2026 (32 JP)",
      });
    } else {
      setVerifyResult({
        found: true,
        title: "Jurnal Pendidikan dan Evaluasi Inovatif (JPEI)",
        meta: "E-ISSN: 2987-1234 | Akreditasi: SINTA 3 (SK No. 152/E/KPT/2025)",
        status: "TERINDEKS SINTA, GARUDA & CROSSREF DOI",
        date: "Volume 4 No. 1 (Januari 2026)",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-slate-800 font-sans antialiased selection:bg-[#F5B041]/30 selection:text-[#0F2547]">
      
      {/* =========================================================================
          TOP BAR (Thin Dark Navy)
          ========================================================================= */}
      <header className="bg-[#0B1A33] text-slate-200 border-b border-[#1B3B6F] text-xs sticky top-0 z-40 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2 font-medium tracking-wide">
            <span className="inline-block w-2 h-2 rounded-full bg-[#F5B041] animate-pulse"></span>
            <span className="font-semibold text-white tracking-wider">PT LICYUM CIPTA AKADEMIKA</span>
            <span className="text-slate-400 hidden sm:inline">|</span>
            <span className="text-slate-300 hidden sm:inline">Portal Resmi Korporasi & Direktori Layanan Terpadu</span>
          </div>

          <nav className="flex items-center space-x-4 text-[11px] font-medium text-slate-300">
            <a href="#profil" className="hover:text-[#F5B041] transition-colors">Profil</a>
            <a href="#layanan" className="hover:text-[#F5B041] transition-colors">Unit Layanan</a>
            <a href="#sop" className="hover:text-[#F5B041] transition-colors">SOP & Alur</a>
            <button 
              onClick={() => setActiveModal("verify")} 
              className="text-[#F5B041] hover:underline flex items-center gap-1 font-semibold"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Cek Keaslian
            </button>
            <Link
              href="/admin"
              className="bg-[#F5B041] hover:bg-[#e5a030] text-[#0F2547] px-2.5 py-0.5 rounded font-bold transition-all shadow-2xs"
            >
              Supabase CRUD ⚙
            </Link>
          </nav>
        </div>
      </header>

      {/* =========================================================================
          HERO BANNER (Navy Gradient & Formal Academic Header)
          ========================================================================= */}
      <section className="bg-gradient-to-b from-[#0F2547] via-[#142F5B] to-[#1B3B6F] text-white py-12 px-4 shadow-md relative overflow-hidden">
        {/* Subtle decorative geometric overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#F5B041_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Badge Emas */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5B041]/20 border border-[#F5B041]/40 text-[#F5B041] text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3 h-3" />
            PORTAL RESMI KORPORASI & AKADEMIK
          </div>

          {/* Judul Utama Besar Font Serif */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
            PT LICYUM CIPTA AKADEMIKA
          </h1>

          {/* Sub-judul deskriptif */}
          <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-light">
            Lembaga penyelenggara ekosistem ilmiah terpadu: Penerbitan Buku Ber-ISBN (Anggota IKAPI), 
            Pengelolaan Portal E-Journal OJS Terakreditasi Nasional, serta Pusat Pengembangan Kompetensi SDM & Konsultasi Pendidikan.
          </p>

          {/* Tagline Cepat */}
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-slate-300">
            <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-md border border-white/10">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#F5B041]" /> SK Kemenkumham Resmi
            </span>
            <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-md border border-white/10">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#F5B041]" /> Anggota Resmi IKAPI No. 421/JBA/2024
            </span>
            <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-md border border-white/10">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#F5B041]" /> Standar OJS 3 & Akreditasi SINTA
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CALLOUT BOX (Kotak Pengumuman Kuning Pucat)
          ========================================================================= */}
      <div className="max-w-4xl mx-auto px-4 -mt-4 relative z-20">
        <div className="bg-[#FEF9E7] border border-[#F5B041]/60 rounded-lg p-4 shadow-sm text-center">
          <p className="text-xs sm:text-sm text-[#7D5A08] leading-relaxed font-medium">
            <strong className="text-[#0F2547]">Pemberitahuan Resmi:</strong> Seluruh naskah buku ber-ISBN, submisi artikel jurnal OJS, dan pendaftaran pelatihan telah terintegrasi melalui portal unit kerja masing-masing. Silakan klik tombol <span className="underline decoration-[#F5B041] font-semibold text-[#0F2547]">&quot;Buka Portal ↗&quot;</span> pada unit terkait untuk akses instan di tab baru.
          </p>
        </div>
      </div>

      {/* =========================================================================
          MAIN CONTAINER (Single-Column Vertical Layout)
          ========================================================================= */}
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-10">

        {/* =====================================================================
            SEKSI 1: IDENTITAS & LEGALITAS LEMBAGA (Format Tabel Bersih)
            ===================================================================== */}
        <section id="profil" className="bg-white rounded-xl shadow-sm border border-slate-200/80 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            {/* Garis aksen kecil warna emas */}
            <div className="w-12 h-1 bg-[#F5B041] mb-2 rounded-full"></div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0F2547]">
              PROFIL & IDENTITAS LEMBAGA
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
              PT Licyum Cipta Akademika adalah badan usaha berbadan hukum resmi yang bergerak di bidang perbukuan, publikasi karya ilmiah, dan pelatihan SDM akademisi serta praktisi. Seluruh tata kelola kami berpedoman pada standar hukum dan etika publikasi ilmiah nasional.
            </p>
          </div>

          {/* Tabel Identitas Dua Kolom Alternating */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <tbody className="divide-y divide-slate-100">
                <tr className="bg-slate-50/50 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-6 font-semibold text-slate-700 w-1/3">Nama Resmi Badan Hukum</td>
                  <td className="py-3 px-6 text-[#0F2547] font-medium">PT LICYUM CIPTA AKADEMIKA</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-6 font-semibold text-slate-700">Nomor SK Kemenkumham / AHU</td>
                  <td className="py-3 px-6 text-slate-800 font-mono text-xs">AHU-0019284.AH.01.01.TAHUN 2024</td>
                </tr>
                <tr className="bg-slate-50/50 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-6 font-semibold text-slate-700">Nomor Induk Berusaha (NIB)</td>
                  <td className="py-3 px-6 text-slate-800 font-mono text-xs">2408240019821 (KBLI 58111, 58130, 85499)</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-6 font-semibold text-slate-700">Nomor Pokok Wajib Pajak (NPWP)</td>
                  <td className="py-3 px-6 text-slate-800 font-mono text-xs">40.128.983.4-429.000</td>
                </tr>
                <tr className="bg-slate-50/50 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-6 font-semibold text-slate-700">Keanggotaan IKAPI</td>
                  <td className="py-3 px-6 text-slate-800">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Anggota Resmi IKAPI No. 421/JBA/2024
                    </span>
                  </td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-6 font-semibold text-slate-700">Bidang Usaha Pokok</td>
                  <td className="py-3 px-6 text-slate-800">
                    Penerbitan Buku Akademik & Referensi, Pengelolaan E-Journal (OJS), Sertifikasi & Konsultasi Pendidikan.
                  </td>
                </tr>
                <tr className="bg-slate-50/50 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-6 font-semibold text-slate-700">Alamat Kantor Pusat</td>
                  <td className="py-3 px-6 text-slate-800">
                    Jl. Ir. H. Juanda No. 88, Zona Pendidikan & Riset, Kota Bandung, Jawa Barat 40135
                  </td>
                </tr>
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-6 font-semibold text-slate-700">Email & Kontak Resmi</td>
                  <td className="py-3 px-6 text-slate-800 flex flex-wrap items-center gap-4">
                    <span className="flex items-center gap-1 text-slate-700">
                      <Mail className="w-3.5 h-3.5 text-[#0F2547]" /> sekretariat@licyum.id
                    </span>
                    <span className="flex items-center gap-1 text-slate-700">
                      <Phone className="w-3.5 h-3.5 text-emerald-600" /> +62 812-3456-7890 (WhatsApp CS)
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =====================================================================
            SEKSI 2: 3 KARTU UNIT LAYANAN UTAMA (Berurutan Vertikal)
            ===================================================================== */}
        <section id="layanan" className="space-y-8">

          {/* -------------------------------------------------------------------
              KARTU 1: DIVISI PENERBITAN & KATALOG BUKU (Gaya Penerbit KBM)
              ------------------------------------------------------------------- */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200/90 overflow-hidden hover:shadow-md transition-shadow">
            {/* Header Kartu */}
            <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-slate-50 via-white to-white">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wider uppercase bg-[#0F2547] text-white mb-1.5">
                  UNIT LAYANAN 01
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F2547]">
                  Penerbitan Buku Ber-ISBN & Katalog Buku Akademik
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
                <BookOpen className="w-4 h-4 text-[#0F2547]" /> Divisi Perbukuan
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Bagian Atas: Mockup Buku + Deskripsi */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Kolom Mockup Kiri */}
                <div className="md:col-span-4 bg-gradient-to-br from-slate-100 to-amber-50 rounded-lg p-4 border border-slate-200 text-center flex flex-col items-center justify-center">
                  <div className="w-28 h-40 bg-gradient-to-tr from-[#0F2547] to-[#1B3B6F] rounded shadow-md border-l-4 border-[#F5B041] p-3 text-white flex flex-col justify-between text-left relative overflow-hidden">
                    <div>
                      <span className="text-[8px] uppercase tracking-widest text-[#F5B041] font-semibold">Licyum Press</span>
                      <p className="text-[11px] font-serif font-bold leading-tight mt-1">Buku Ajar & Referensi 2026</p>
                    </div>
                    <div className="text-[7px] text-slate-300">
                      Ber-ISBN Resmi & Hak Cipta EC00
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-slate-600 mt-3">Standar Cetak Bookpaper & Hardcover</span>
                </div>

                {/* Kolom Deskripsi Kanan */}
                <div className="md:col-span-8 text-xs sm:text-sm text-slate-600 space-y-3 leading-relaxed">
                  <p>
                    Melayani penerbitan karya dosen, peneliti, guru, dan praktisi dari seluruh Indonesia. Menyediakan fasilitas pengurusan ISBN resmi Perpusnas RI, sertifikat Hak Cipta (HKI) Kemenkumham, tata letak profesional, desain sampul eksklusif, serta distribusi cetak dan e-book secara nasional.
                  </p>
                  <p>
                    Tersedia program <strong>Konversi Skripsi, Tesis, dan Disertasi</strong> menjadi Buku Referensi/Monograf bernilai angka kredit (KUM) tinggi untuk kepangkatan fungsional dosen.
                  </p>
                </div>
              </div>

              {/* Bagian Tengah: Kotak Abu-abu Muda 3 Kolom */}
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200/70 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-slate-600 uppercase font-semibold block text-[10px]">Cakupan Layanan</span>
                  <span className="font-semibold text-slate-800">ISBN, HAKI, Layout & Percetakan</span>
                </div>
                <div>
                  <span className="text-slate-600 uppercase font-semibold block text-[10px]">Estimasi Terbit</span>
                  <span className="font-semibold text-slate-800">2 - 4 Minggu Kerja Cepat</span>
                </div>
                <div>
                  <span className="text-slate-600 uppercase font-semibold block text-[10px]">Legalitas & Status</span>
                  <span className="font-semibold text-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> Anggota Resmi IKAPI
                  </span>
                </div>
              </div>

              {/* Tag / Pill Kategori Buku */}
              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-2">
                  Kategori Buku Terbitan:
                </label>
                <div className="flex flex-wrap gap-2 text-xs">
                  {["Pendidikan & Keguruan", "Hukum & Kenegaraan", "Ekonomi & Bisnis", "Teknologi & Komputasi", "Agama & Filsafat", "Monograf Riset", "Buku Ajar Kampus"].map((tag, idx) => (
                    <span key={idx} className="bg-white border border-slate-200 text-slate-700 px-2.5 py-1 rounded-md text-xs font-medium hover:border-[#0F2547] transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Grid 6 Kotak Kecil (2 baris x 3 kolom) */}
              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-2.5">
                  Cuplikan Judul Terbaru & Paket Penerbitan:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { title: "Metodologi Riset Kuantitatif", author: "Prof. Dr. Hendra W.", type: "Buku Ajar", code: "ISBN 978-623-01" },
                    { title: "Hukum Tata Kelola Korporasi", author: "Dr. Sulistyo, S.H., M.H.", type: "Monograf", code: "ISBN 978-623-02" },
                    { title: "Kecerdasan Buatan Terapan", author: "Tim Riset IT Licyum", type: "Referensi", code: "ISBN 978-623-03" },
                    { title: "Manajemen Mutu Sekolah", author: "Dra. Siti Rahmah, M.Pd.", type: "Buku Guru", code: "ISBN 978-623-04" },
                    { title: "Paket Penerbitan Bronze", author: "ISBN + 5 Eks Cetak", type: "Paket Hemat", code: "Rp 1.450.000" },
                    { title: "Paket Konversi Disertasi", author: "ISBN + HKI + 20 Eks", type: "Paket KUM Dosen", code: "Rp 3.850.000" },
                  ].map((item, idx) => (
                    <div key={idx} className="p-3 bg-white border border-slate-200 rounded-lg hover:border-[#0F2547]/50 hover:bg-slate-50/50 transition-colors">
                      <span className="text-[10px] font-bold text-[#D48806] bg-[#FEF9E7] px-2 py-0.5 rounded border border-[#F5B041]/30">
                        {item.type}
                      </span>
                      <h4 className="font-semibold text-xs text-[#0F2547] mt-1.5 line-clamp-1">{item.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">{item.author}</p>
                      <p className="text-[10px] font-mono text-slate-600 mt-1">{item.code}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* TOMBOL AKSI UTAMA (Membuka Tab Baru) */}
              <div className="pt-2">
                <a
                  href={PORTAL_URLS.buku}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0F2547] hover:bg-[#1B3B6F] text-white px-6 py-3 rounded-lg font-medium text-sm transition-all shadow-sm group"
                >
                  <span>Buka Portal Buku & Katalog</span>
                  <ExternalLink className="w-4 h-4 text-[#F5B041] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <span className="text-xs text-slate-600 ml-3 block sm:inline mt-2 sm:mt-0">
                  (Membuka tab baru ke repositori katalog dan sistem pengajuan naskah)
                </span>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------------------------
              KARTU 2: DIVISI PUBLIKASI JURNAL ILMIAH (Gaya OJS E-Journal)
              ------------------------------------------------------------------- */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200/90 overflow-hidden hover:shadow-md transition-shadow">
            {/* Header Kartu */}
            <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-slate-50 via-white to-white">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wider uppercase bg-[#0F2547] text-white mb-1.5">
                  UNIT LAYANAN 02
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F2547]">
                  Portal E-Journal & Publikasi Ilmiah Terakreditasi
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
                <Layers className="w-4 h-4 text-[#0F2547]" /> Divisi Jurnal Ilmiah (OJS)
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Bagian Atas: Mockup OJS + Deskripsi */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Kolom Mockup Kiri */}
                <div className="md:col-span-4 bg-gradient-to-br from-slate-100 to-sky-50 rounded-lg p-4 border border-slate-200 text-center flex flex-col items-center justify-center">
                  <div className="w-28 h-40 bg-white rounded shadow-md border border-slate-300 p-2.5 flex flex-col justify-between text-left relative overflow-hidden">
                    <div className="border-b border-slate-100 pb-1.5">
                      <span className="text-[8px] font-bold text-sky-800 tracking-wider">OPEN JOURNAL SYSTEMS</span>
                      <p className="text-[10px] font-serif font-bold text-[#0F2547] leading-tight mt-1">Jurnal Pendidikan & Inovasi Riset</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[7px] bg-emerald-100 text-emerald-800 font-bold px-1 py-0.2 rounded block text-center">SINTA 3 ACCREDITED</span>
                      <p className="text-[7px] text-slate-500 text-center font-mono">E-ISSN 2987-1234</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-slate-600 mt-3">Sistem OJS 3 Terindeks Crossref DOI</span>
                </div>

                {/* Kolom Deskripsi Kanan */}
                <div className="md:col-span-8 text-xs sm:text-sm text-slate-600 space-y-3 leading-relaxed">
                  <p>
                    Pengelolaan publikasi artikel ilmiah berbasis sistem <em>Open Journal Systems (OJS 3)</em> dengan proses <em>double-blind peer review</em> yang ketat dan transparan. Menjamin kepastian waktu review, pendampingan perbaikan format (cek Turnitin & plagiarisme), dan penerbitan DOI Crossref resmi pada setiap artikel.
                  </p>
                  <p>
                    Jurnal-jurnal di bawah naungan PT Licyum Cipta Akademika telah terakreditasi <strong>SINTA (Peringkat 2, 3, dan 4)</strong> serta terindeks di Garuda, Google Scholar, BASE, Moraref, dan Dimensions.
                  </p>
                </div>
              </div>

              {/* Bagian Tengah: Kotak Abu-abu Muda 3 Kolom */}
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200/70 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-slate-600 uppercase font-semibold block text-[10px]">Sistem Platform</span>
                  <span className="font-semibold text-slate-800">OJS Versi 3.3 LTS Resmi PKP</span>
                </div>
                <div>
                  <span className="text-slate-600 uppercase font-semibold block text-[10px]">Indeksasi & Pengenal</span>
                  <span className="font-semibold text-slate-800">SINTA, Crossref DOI, Garuda</span>
                </div>
                <div>
                  <span className="text-slate-600 uppercase font-semibold block text-[10px]">Frekuensi Terbit</span>
                  <span className="font-semibold text-slate-800">Bulanan, Dwi-Bulanan & Triwulanan</span>
                </div>
              </div>

              {/* Tag / Pill Ruang Lingkup Ilmu */}
              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-2">
                  Ruang Lingkup Bidang Keilmuan:
                </label>
                <div className="flex flex-wrap gap-2 text-xs">
                  {["Manajemen Pendidikan", "Ekonomi & Bisnis Syariah", "Ilmu Hukum & Sosial", "Sosial Humaniora", "Sains & Teknologi Rekayasa", "Kesehatan Masyarakat", "Informatika"].map((tag, idx) => (
                    <span key={idx} className="bg-white border border-slate-200 text-slate-700 px-2.5 py-1 rounded-md text-xs font-medium hover:border-[#0F2547] transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Grid 6 Kotak Kecil (2 baris x 3 kolom) */}
              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-2.5">
                  Daftar Jurnal Aktif yang Dikelola:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { name: "Jurnal Pendidikan & Inovasi (JPEI)", issn: "E-ISSN: 2987-1234", sinta: "SINTA 3", issue: "Vol 4 No 1 - Jan 2026" },
                    { name: "Licyum Journal of Management", issn: "E-ISSN: 2988-5678", sinta: "SINTA 2", issue: "Vol 3 No 2 - Feb 2026" },
                    { name: "Jurnal Studi Hukum & Keadilan", issn: "E-ISSN: 2989-9012", sinta: "SINTA 4", issue: "Vol 2 No 1 - Jan 2026" },
                    { name: "Journal of Applied Tech & AI", issn: "E-ISSN: 3012-3456", sinta: "Garuda / Crossref", issue: "Vol 1 No 3 - Des 2025" },
                    { name: "Jurnal Riset Sosial & Humaniora", issn: "E-ISSN: 3021-7890", sinta: "SINTA 4", issue: "Vol 2 No 2 - Feb 2026" },
                    { name: "Licyum Health Science Review", issn: "E-ISSN: 3034-5678", sinta: "Copernicus / DOAJ", issue: "Call for Paper 2026" },
                  ].map((journal, idx) => (
                    <div key={idx} className="p-3 bg-white border border-slate-200 rounded-lg hover:border-[#0F2547]/50 hover:bg-slate-50/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {journal.sinta}
                        </span>
                        <span className="text-[10px] text-slate-600 font-mono">{journal.issn}</span>
                      </div>
                      <h4 className="font-semibold text-xs text-[#0F2547] mt-1.5 line-clamp-1">{journal.name}</h4>
                      <p className="text-[11px] text-slate-500 mt-1">{journal.issue}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* TOMBOL AKSI UTAMA (Membuka Tab Baru) */}
              <div className="pt-2">
                <a
                  href={PORTAL_URLS.jurnal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0F2547] hover:bg-[#1B3B6F] text-white px-6 py-3 rounded-lg font-medium text-sm transition-all shadow-sm group"
                >
                  <span>Buka Portal E-Journal (OJS)</span>
                  <ExternalLink className="w-4 h-4 text-[#F5B041] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <span className="text-xs text-slate-600 ml-3 block sm:inline mt-2 sm:mt-0">
                  (Membuka tab baru ke dashboard OJS untuk submisi naskah dan unduh template)
                </span>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------------------------
              KARTU 3: DIVISI PELATIHAN, SERTIFIKASI & KONSULTAN (Gaya Kuanta.id)
              ------------------------------------------------------------------- */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200/90 overflow-hidden hover:shadow-md transition-shadow">
            {/* Header Kartu */}
            <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-slate-50 via-white to-white">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wider uppercase bg-[#0F2547] text-white mb-1.5">
                  UNIT LAYANAN 03
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F2547]">
                  Pusat Pelatihan, Workshop Akademik & Konsultan Pendidikan
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
                <GraduationCap className="w-4 h-4 text-[#0F2547]" /> Divisi Diklat & Konsultasi
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Bagian Atas: Poster Pelatihan + Deskripsi */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Kolom Mockup Kiri */}
                <div className="md:col-span-4 bg-gradient-to-br from-slate-100 to-amber-50 rounded-lg p-4 border border-slate-200 text-center flex flex-col items-center justify-center">
                  <div className="w-32 h-40 bg-gradient-to-br from-[#1A365D] to-[#2B6CB0] rounded shadow-md border-2 border-white p-2.5 text-white flex flex-col justify-between text-left relative overflow-hidden">
                    <div>
                      <span className="text-[8px] uppercase tracking-wider text-[#F5B041] font-bold">Licyum Academy</span>
                      <p className="text-[10px] font-bold leading-tight mt-1">Bootcamp Intensif Penulisan Scopus & SINTA</p>
                    </div>
                    <div>
                      <span className="text-[8px] bg-[#F5B041] text-[#0F2547] font-bold px-1.5 py-0.5 rounded inline-block">32 JP Bersertifikat</span>
                      <p className="text-[7px] text-slate-200 mt-0.5">Online Zoom & LMS Mandiri</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-slate-600 mt-3">Sertifikat Resmi Ber-QR Code Valid</span>
                </div>

                {/* Kolom Deskripsi Kanan */}
                <div className="md:col-span-8 text-xs sm:text-sm text-slate-600 space-y-3 leading-relaxed">
                  <p>
                    Menyelenggarakan program pelatihan profesional, workshop kepenulisan buku ajar, <em>academic writing coaching</em> untuk tembus jurnal Scopus/SINTA, serta pendampingan akreditasi institusi dan sekolah. 
                  </p>
                  <p>
                    Didukung narasumber berintegritas tinggi (Reviewer Nasional, Asesor BAN-PT, dan Editor Jurnal Bereputasi). Melayani program <strong>In-House Training Kampus & Sekolah</strong> dengan kurikulum yang dapat disesuaikan kebutuhan mitra.
                  </p>
                </div>
              </div>

              {/* Bagian Tengah: Kotak Abu-abu Muda 3 Kolom */}
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200/70 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-slate-600 uppercase font-semibold block text-[10px]">Metode Pelaksanaan</span>
                  <span className="font-semibold text-slate-800">Daring (Zoom/LMS), Luring, & In-House</span>
                </div>
                <div>
                  <span className="text-slate-600 uppercase font-semibold block text-[10px]">Fasilitas Peserta</span>
                  <span className="font-semibold text-slate-800">E-Sertifikat 32 JP, Modul & Rekaman</span>
                </div>
                <div>
                  <span className="text-slate-600 uppercase font-semibold block text-[10px]">Sasaran Program</span>
                  <span className="font-semibold text-slate-800">Dosen, Guru, Peneliti & Mahasiswa</span>
                </div>
              </div>

              {/* Tag / Pill Topik Pelatihan */}
              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-2">
                  Topik Pelatihan & Konsultasi Unggulan:
                </label>
                <div className="flex flex-wrap gap-2 text-xs">
                  {["Penulisan Artikel Scopus & SINTA", "Konversi Skripsi/Tesis ke Buku Ajar", "Metodologi Riset Eksperimen & R&D", "Manajemen Sekolah & Akreditasi", "Digitalisasi Media Pembelajaran", "Olah Data SPSS & SmartPLS"].map((tag, idx) => (
                    <span key={idx} className="bg-white border border-slate-200 text-slate-700 px-2.5 py-1 rounded-md text-xs font-medium hover:border-[#0F2547] transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Grid 6 Kotak Kecil (2 baris x 3 kolom) */}
              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-2.5">
                  Jadwal Program & Workshop Terdekat:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { title: "Klinik Naskah Scopus Batch XII", date: "15 - 16 Maret 2026", type: "Online (32 JP)", status: "Pendaftaran Dibuka" },
                    { title: "Konversi Tesis ke Buku Ber-ISBN", date: "22 - 23 Maret 2026", type: "Online (32 JP)", status: "Kuota Terbatas" },
                    { title: "Pelatihan Olah Data SmartPLS 4", date: "05 - 06 April 2026", type: "Praktik Interaktif", status: "Pendaftaran Dibuka" },
                    { title: "Workshop AI Tools untuk Riset Dosen", date: "12 April 2026", type: "Webinar 8 JP", status: "Pendaftaran Dibuka" },
                    { title: "In-House Training Penulisan Buku Guru", date: "Sesuai Request Mitra", type: "Luring / Onsite", status: "Buka MoU Sekolah" },
                    { title: "Pendampingan Tata Kelola OJS Kampus", date: "Sesuai Request Mitra", type: "Konsultasi Khusus", status: "Buka MoU Kampus" },
                  ].map((prog, idx) => (
                    <div key={idx} className="p-3 bg-white border border-slate-200 rounded-lg hover:border-[#0F2547]/50 hover:bg-slate-50/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-[#0F2547] bg-slate-100 px-2 py-0.5 rounded">
                          {prog.type}
                        </span>
                        <span className="text-[10px] font-semibold text-emerald-700">{prog.status}</span>
                      </div>
                      <h4 className="font-semibold text-xs text-[#0F2547] mt-1.5 line-clamp-1">{prog.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" /> {prog.date}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* TOMBOL AKSI UTAMA (Membuka Tab Baru) */}
              <div className="pt-2">
                <a
                  href={PORTAL_URLS.pelatihan}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0F2547] hover:bg-[#1B3B6F] text-white px-6 py-3 rounded-lg font-medium text-sm transition-all shadow-sm group"
                >
                  <span>Buka Portal Pelatihan & Sertifikasi</span>
                  <ExternalLink className="w-4 h-4 text-[#F5B041] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <span className="text-xs text-slate-600 ml-3 block sm:inline mt-2 sm:mt-0">
                  (Membuka tab baru ke katalog silabus pelatihan, formulir pendaftaran, & unduh e-sertifikat)
                </span>
              </div>
            </div>
          </div>

        </section>

        {/* =====================================================================
            SEKSI 3: TABEL ALUR LAYANAN & STANDAR OPERASIONAL (SOP)
            ===================================================================== */}
        <section id="sop" className="bg-white rounded-xl shadow-sm border border-slate-200/80 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <div className="w-12 h-1 bg-[#F5B041] mb-2 rounded-full"></div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0F2547]">
              ALUR PENGAJUAN LAYANAN & STANDAR OPERASIONAL (SOP)
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
              Panduan langkah ringkas bagi penulis, pengelola jurnal, dan peserta kegiatan mulai dari pengajuan awal hingga diterbitkannya luaran resmi berlegalitas.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#0F2547] text-white font-serif text-xs uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 sm:px-6">Tahapan Kerja</th>
                  <th className="py-3 px-4 sm:px-6">Uraian Prosedur Standar</th>
                  <th className="py-3 px-4 sm:px-6">Output / Luaran</th>
                  <th className="py-3 px-4 sm:px-6">Estimasi Waktu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-[#0F2547] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-[#0F2547] flex items-center justify-center text-xs font-mono">1</span>
                    Submisi Naskah / Pendaftaran
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-slate-700">
                    Pengiriman draf naskah buku (Word) atau artikel ilmiah via portal OJS, atau registrasi program pelatihan secara daring.
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 font-medium text-slate-800">Bukti Tanda Terima Digital</td>
                  <td className="py-3.5 px-4 sm:px-6 text-slate-600 font-mono text-xs">1 Hari Kerja</td>
                </tr>

                <tr className="bg-slate-50/60 hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-[#0F2547] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-[#0F2547] flex items-center justify-center text-xs font-mono">2</span>
                    Review, Plagiarisme & Layout
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-slate-700">
                    Pemeriksaan plagiarisme (Turnitin max 20%), proses blind peer review naskah jurnal, serta penataan format baku tata letak buku.
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 font-medium text-slate-800">Laporan Similarity & Proof Draf</td>
                  <td className="py-3.5 px-4 sm:px-6 text-slate-600 font-mono text-xs">3 - 7 Hari Kerja</td>
                </tr>

                <tr className="bg-white hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-[#0F2547] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-[#0F2547] flex items-center justify-center text-xs font-mono">3</span>
                    Legitimasi Legal & Publikasi
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-slate-700">
                    Pendaftaran ISBN ke Perpusnas RI, penerbitan Sertifikat HKI Kemenkumham, deposit DOI Crossref, dan pencetakan dummy buku.
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 font-medium text-slate-800">ISBN, Sertifikat HKI & DOI Aktif</td>
                  <td className="py-3.5 px-4 sm:px-6 text-slate-600 font-mono text-xs">7 - 14 Hari Kerja</td>
                </tr>

                <tr className="bg-slate-50/60 hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-[#0F2547] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-[#0F2547] flex items-center justify-center text-xs font-mono">4</span>
                    Distribusi & Arsip Repositori
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-slate-700">
                    Pengiriman buku cetak ke alamat penulis/kampus, wajib serah simpan Perpusnas & Perpusda, serta penerbitan E-Sertifikat Pelatihan.
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 font-medium text-slate-800">Buku Fisik & Sertifikat Terverifikasi</td>
                  <td className="py-3.5 px-4 sm:px-6 text-slate-600 font-mono text-xs">Sesuai Ekspedisi / Instant</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-200/70 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-3">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#0F2547]" />
              <strong>Jam Operasional Helpdesk:</strong> Senin - Jumat (08.30 - 17.00 WIB) | Sabtu (09.00 - 14.00 WIB)
            </span>
            <span className="text-slate-500 italic">Layanan Submisi Digital Mandiri (OJS & Web) Beroperasi 24 Jam Nonstop</span>
          </div>
        </section>

        {/* =====================================================================
            SEKSI 4: 3 KOTAK BANTUAN & CALL-TO-ACTION (CTA) BAWAH
            ===================================================================== */}
        <section className="space-y-6">
          {/* Grid 3 Kotak Putih Kecil */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Kotak 1: Panduan & Template */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-[#0F2547]/50 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-lg bg-amber-50 text-[#D48806] flex items-center justify-center mb-3">
                  <FileText className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-slate-900 text-sm">Panduan & Template Naskah</h4>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Unduh template penulisan buku ber-ISBN dan format naskah jurnal standar OJS (DOCX/Latex).
                </p>
              </div>
              <button
                onClick={() => setActiveModal("guidelines")}
                className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#0F2547] hover:text-[#1B3B6F] hover:underline"
              >
                Unduh Template Dokumen <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Kotak 2: Cek Keaslian ISBN / Sertifikat */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-[#0F2547]/50 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-slate-900 text-sm">Cek Keaslian Dokumen</h4>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Verifikasi keabsahan ISBN buku, status nomor sertifikat pelatihan, dan SK indeksasi artikel jurnal.
                </p>
              </div>
              <button
                onClick={() => setActiveModal("verify")}
                className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:underline"
              >
                Verifikasi Online Mandiri <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Kotak 3: Layanan Bantuan Admin */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-[#0F2547]/50 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-800 flex items-center justify-center mb-3">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-slate-900 text-sm">Layanan Bantuan Admin</h4>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Konsultasikan kendala teknis submisi, biaya paket penerbitan, atau penawaran pelatihan khusus via CS.
                </p>
              </div>
              <a
                href={PORTAL_URLS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-sky-800 hover:underline"
              >
                Hubungi Customer Care <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
            </div>

          </div>

          {/* Banner Kotak Navy Gelap: Kerja Sama Kelembagaan (MoU Kampus / Sekolah) */}
          <div className="bg-gradient-to-r from-[#0F2547] to-[#1B3B6F] rounded-xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#F5B041] text-[#0F2547]">
                  KERJA SAMA KELEMBAGAAN (MoU)
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold leading-tight">
                  Tingkatkan Mutu Akademik Perguruan Tinggi & Sekolah Anda Bersama Licyum
                </h3>
                <p className="text-slate-200 text-xs sm:text-sm font-light leading-relaxed">
                  Kami membuka kemitraan resmi pengelolaan jurnal kampus, penerbitan buku karya civitas akademika, dan pelaksanaan pelatihan in-house training bersertifikat resmi.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                <a
                  href={`${PORTAL_URLS.whatsapp}?text=Halo%20Admin%20Licyum,%20kami%20ingin%20mengajukan%20MoU%20Kerja%20Sama%20Kelembagaan.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#F5B041] hover:bg-[#e5a030] text-[#0F2547] font-bold px-5 py-3 rounded-lg text-xs sm:text-sm transition-all shadow-sm"
                >
                  <Phone className="w-4 h-4" />
                  Ajukan MoU via WhatsApp
                </a>
                <button
                  onClick={() => setActiveModal("contact")}
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-4 py-3 rounded-lg text-xs sm:text-sm border border-white/20 transition-all"
                >
                  <Mail className="w-4 h-4" />
                  Kirim Surat Resmi
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* =========================================================================
          FOOTER (Navy Sangat Gelap)
          ========================================================================= */}
      <footer className="bg-[#0A1830] text-slate-400 text-xs border-t border-slate-800 py-10 mt-12">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="font-serif text-base font-bold text-white tracking-wide block">
                PT LICYUM CIPTA AKADEMIKA
              </span>
              <p className="text-slate-300 text-[11px] mt-0.5">
                Penerbit Buku Terdaftar IKAPI | Pengelola E-Journal OJS | Lembaga Diklat Akademik
              </p>
            </div>
            <div className="flex items-center gap-4 text-slate-300 text-[11px]">
              <a href={PORTAL_URLS.buku} target="_blank" rel="noopener noreferrer" className="hover:text-[#F5B041]">Portal Buku ↗</a>
              <span>•</span>
              <a href={PORTAL_URLS.jurnal} target="_blank" rel="noopener noreferrer" className="hover:text-[#F5B041]">Portal OJS ↗</a>
              <span>•</span>
              <a href={PORTAL_URLS.pelatihan} target="_blank" rel="noopener noreferrer" className="hover:text-[#F5B041]">Portal Diklat ↗</a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] text-slate-300">
            <div>
              <p className="font-semibold text-slate-300">Kantor Pusat Administrasi:</p>
              <p className="mt-1 leading-relaxed">
                Gedung Graha Riset & Publikasi Licyum Lt. 2, Jl. Ir. H. Juanda No. 88, Kota Bandung, Jawa Barat 40135, Indonesia.
              </p>
            </div>
            <div>
              <p className="font-semibold text-slate-300">Legalitas & Ketentuan Hukum:</p>
              <p className="mt-1 leading-relaxed">
                Seluruh naskah terbitan dilindungi oleh Undang-Undang Republik Indonesia Nomor 28 Tahun 2014 tentang Hak Cipta. Pengutipan wajib mencantumkan sumber resmi.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-400 text-[10px]">
            <p>© {new Date().getFullYear()} PT Licyum Cipta Akademika. Seluruh Hak Cipta Dilindungi Undang-Undang.</p>
            <p>Direktori Terpadu Korporasi & Publikasi Ilmiah Nasional</p>
          </div>
        </div>
      </footer>

      {/* =========================================================================
          MODALS INTERAKTIF (Untuk Panduan, Verifikasi & Surat Resmi)
          ========================================================================= */}

      {/* MODAL 1: Cek Keaslian Dokumen */}
      {activeModal === "verify" && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative animate-in fade-in zoom-in-95 duration-150">
            <button 
              onClick={() => { setActiveModal(null); setVerifyResult(null); }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-[#0F2547] text-lg">Cek Keaslian & Legalitas</h3>
            </div>

            <p className="text-xs text-slate-600 mb-4">
              Pilih jenis dokumen dan masukkan nomor identifikasi untuk memeriksa status validitas di database resmi Licyum.
            </p>

            <div className="flex rounded-lg bg-slate-100 p-1 mb-4 text-xs">
              <button
                type="button"
                onClick={() => { setVerifyType("isbn"); setVerifyResult(null); }}
                className={`flex-1 py-1.5 rounded-md font-medium transition-all ${verifyType === "isbn" ? "bg-white text-[#0F2547] shadow-xs" : "text-slate-600 hover:text-slate-900"}`}
              >
                ISBN Buku
              </button>
              <button
                type="button"
                onClick={() => { setVerifyType("sertifikat"); setVerifyResult(null); }}
                className={`flex-1 py-1.5 rounded-md font-medium transition-all ${verifyType === "sertifikat" ? "bg-white text-[#0F2547] shadow-xs" : "text-slate-600 hover:text-slate-900"}`}
              >
                No. Sertifikat
              </button>
              <button
                type="button"
                onClick={() => { setVerifyType("jurnal"); setVerifyResult(null); }}
                className={`flex-1 py-1.5 rounded-md font-medium transition-all ${verifyType === "jurnal" ? "bg-white text-[#0F2547] shadow-xs" : "text-slate-600 hover:text-slate-900"}`}
              >
                Jurnal / DOI
              </button>
            </div>

            <form onSubmit={handleVerify} className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  {verifyType === "isbn" ? "Masukkan Nomor ISBN Buku:" : verifyType === "sertifikat" ? "Masukkan Nomor Sertifikat:" : "Masukkan Nama Jurnal atau Kode DOI:"}
                </label>
                <input
                  type="text"
                  placeholder={verifyType === "isbn" ? "Contoh: 978-623-10-8912-4" : verifyType === "sertifikat" ? "Contoh: SERT-LIC-2026-0891" : "Contoh: JPEI atau 10.58921/jpei..."}
                  value={verifyQuery}
                  onChange={(e) => setVerifyQuery(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#0F2547] focus:outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#0F2547] text-white py-2 rounded-lg text-xs font-semibold hover:bg-[#1B3B6F] transition-colors"
              >
                Periksa Data Sekarang
              </button>
            </form>

            {verifyResult && (
              <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs space-y-1">
                <span className="text-[10px] font-bold text-emerald-800 uppercase block tracking-wider">
                  ✓ {verifyResult.status}
                </span>
                <p className="font-semibold text-slate-900">{verifyResult.title}</p>
                <p className="text-slate-600 text-[11px]">{verifyResult.meta}</p>
                <p className="text-slate-500 text-[10px] pt-1 border-t border-emerald-200/60 mt-1">Terdaftar: {verifyResult.date}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 2: Panduan & Template Naskah */}
      {activeModal === "guidelines" && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 relative">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#D48806] flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-[#0F2547] text-lg">Download Template Dokumen Resmi</h3>
            </div>

            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Silakan unduh dokumen panduan dan tata letak baku naskah sebelum diajukan ke redaksi PT Licyum Cipta Akademika.
            </p>

            <div className="space-y-2 text-xs">
              {[
                { title: "Template Buku Ajar / Monograf (MS Word .docx)", size: "245 KB", ext: "DOCX" },
                { title: "Template Naskah Jurnal OJS Licyum (Format APA 7th)", size: "180 KB", ext: "DOCX" },
                { title: "Formulir Surat Pernyataan Keaslian & HKI", size: "95 KB", ext: "PDF" },
                { title: "Panduan Konversi Skripsi/Tesis ke Buku Referensi", size: "1.2 MB", ext: "PDF" },
              ].map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold bg-[#0F2547] text-white px-1.5 py-0.5 rounded">{doc.ext}</span>
                    <div>
                      <p className="font-medium text-slate-800">{doc.title}</p>
                      <span className="text-[10px] text-slate-400">{doc.size}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert(`Mengunduh berkas: ${doc.title}`)}
                    className="p-1.5 text-[#0F2547] hover:bg-slate-200 rounded transition-colors"
                    title="Unduh Berkas"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-5 text-right">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Form Kontak Resmi / MoU */}
      {activeModal === "contact" && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-[#0F2547] text-lg">Pengajuan Kerja Sama Resmi</h3>
            </div>

            <p className="text-xs text-slate-600 mb-4">
              Isi data instansi Anda untuk menerima draft surat perjanjian kerja sama (MoU) atau proposal in-house training dari tim sekretariat.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); alert("Terima kasih! Surat pengajuan kerja sama Anda telah diterima oleh Sekretariat PT Licyum Cipta Akademika. Tim kami akan menghubungi Anda dalam 1x24 jam kerja."); setActiveModal(null); }} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nama Instansi / Kampus / Sekolah:</label>
                <input required type="text" placeholder="Contoh: Universitas Nusantara Mandiri" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0F2547] focus:outline-none" />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nama Pejabat / Narahubung:</label>
                <input required type="text" placeholder="Contoh: Dr. Budi Santoso, M.Pd." className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0F2547] focus:outline-none" />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nomor WhatsApp & Email:</label>
                <input required type="text" placeholder="Contoh: 08123456789 / dekanat@kampus.ac.id" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0F2547] focus:outline-none" />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Kebutuhan Kerja Sama:</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0F2547] focus:outline-none">
                  <option>Penerbitan Buku Ajar Dosen Kolektif (ISBN & HKI)</option>
                  <option>Pengelolaan & Akreditasi Jurnal OJS Kampus</option>
                  <option>In-House Workshop Penulisan Scopus Dosen</option>
                  <option>Pelatihan Guru & Sertifikasi Kompetensi</option>
                  <option>Kemitraan Tri Dharma Perguruan Tinggi Komprehensif</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0F2547] hover:bg-[#1B3B6F] text-white rounded-lg font-semibold"
                >
                  Kirim Surat Permohonan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
