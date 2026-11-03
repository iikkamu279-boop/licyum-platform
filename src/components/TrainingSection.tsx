'use client';

import React, { useState } from 'react';
import {
  GraduationCap,
  Calendar,
  Clock,
  MapPin,
  Users,
  Award,
  Sparkles,
  CheckCircle,
  Search,
  Download,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Building2,
  FileCheck2,
  BadgeCheck
} from 'lucide-react';
import { TrainingProgram, CertificateRecord } from '../types';
import { TRAINING_PROGRAMS, VERIFIED_CERTIFICATES } from '../data/dummyData';

interface TrainingSectionProps {
  onSelectProgram: (program: TrainingProgram) => void;
  onOpenConsultationModal: (serviceType?: string) => void;
  searchFilter?: string;
}

export const TrainingSection: React.FC<TrainingSectionProps> = ({
  onSelectProgram,
  onOpenConsultationModal,
  searchFilter = ''
}) => {
  const [certInput, setCertInput] = useState<string>('LCY-2024-EDU-092');
  const [certResult, setCertResult] = useState<CertificateRecord | null>(null);
  const [hasSearchedCert, setHasSearchedCert] = useState<boolean>(false);
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<string>('Semua');

  const categories = ['Semua', 'Penulisan & Publikasi', 'In-House Kampus', 'Akreditasi'];

  const filteredPrograms = TRAINING_PROGRAMS.filter((prog) => {
    const matchesCategory =
      selectedCategoryTab === 'Semua' || prog.category === selectedCategoryTab;
    const matchesSearch =
      searchFilter.trim() === '' ||
      prog.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      prog.instructor.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      prog.category.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleVerifyCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearchedCert(true);
    const cleaned = certInput.trim().toUpperCase();

    if (VERIFIED_CERTIFICATES[cleaned]) {
      setCertResult(VERIFIED_CERTIFICATES[cleaned]);
    } else {
      // Demo fallback: if not matched directly, create a fallback verified or not found
      if (cleaned.startsWith('LCY')) {
        setCertResult({
          certificateNumber: cleaned,
          participantName: 'Peserta Terdaftar Licyum',
          programTitle: 'Pelatihan Kompetensi Akademik & Penulisan Ilmiah',
          institution: 'Perguruan Tinggi Indonesia',
          issueDate: '10 Januari 2025',
          grade: 'Sangat Baik (A)',
          jpTotal: 32,
          status: 'VALID & TERVERIFIKASI',
          credentialId: `CRED-${Math.floor(10000 + Math.random() * 90000)}-LIC`
        });
      } else {
        setCertResult(null);
      }
    }
  };

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <section id="seksi-pelatihan" className="py-16 sm:py-20 bg-slate-50/70 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Pilar 3: Pelatihan & Konsultan Pendidikan</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Pengembangan Kompetensi Dosen, Guru & Institusi
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
              Inspirasi pendekatan korporat edukasi ala Kuanta.id. Menghadirkan pelatihan penulisan buku, workshop tembus Scopus, in-house training sekolah/kampus bersertifikat resmi 32 JP, dan pendampingan akreditasi.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenConsultationModal('In-House Training Kampus')}
              className="px-5 py-2.5 bg-slate-900 hover:bg-[#0F2850] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>Undang In-House Training ke Kampus</span>
            </button>
          </div>
        </div>

        {/* 1. Banner 3 Program Unggulan (Kuanta.id Inspired Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-gradient-to-br from-[#0F2850] to-[#1E3A8A] text-white rounded-3xl p-6 sm:p-7 shadow-md flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-400 flex items-center justify-center mb-4">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                Program Dosen & Peneliti
              </span>
              <h3 className="text-xl font-bold mt-1 mb-2">
                Pelatihan Penulisan Buku & Jurnal Internasional
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                Pendampingan intensif dari outline naskah, perancangan metodologi IMRaD, respon reviewer, hingga naskah terbit dan siap dinilai untuk BKD atau kenaikan jabatan lektor/profesor.
              </p>
            </div>
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-amber-300">
              <span>Sertifikat Resmi 32 JP</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-md flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#0F2850] flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                Program Khusus Institusi
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1 mb-2">
                In-House Training Sekolah & Perguruan Tinggi
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                Program kustomisasi yang dirancang sesuai kebutuhan kampus Anda: penguatan iklim riset dosen, tata kelola OJS 3 terakreditasi ARJUNA, dan penulisan PTK bagi guru sekolah penggerak.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0F2850]">
              <span>MOU Tri Dharma Perguruan Tinggi</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 rounded-3xl p-6 sm:p-7 shadow-md flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/30 text-slate-950 flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-900">
                Sertifikasi Profesi
              </span>
              <h3 className="text-xl font-black mt-1 mb-2 text-slate-950">
                Sertifikasi BNSP & Konsultan Pendidikan
              </h3>
              <p className="text-xs sm:text-sm text-slate-900 leading-relaxed mb-4 font-medium">
                Uji kompetensi resmi berstandar Badan Nasional Sertifikasi Profesi (BNSP) untuk mencetak instruktur pelatihan terakreditasi, asesor kompetensi, dan konsultan manajemen pendidikan.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-900/10 flex items-center justify-between text-xs font-black text-slate-950">
              <span>Sertifikat Berlogo Garuda BNSP</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* 2. Kartu Jadwal Pelatihan Terdekat */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                Jadwal Workshop & Masterclass Terdekat
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Pilih program pelatihan terbaik untuk meningkatkan kompetensi dan portofolio profesional Anda.
              </p>
            </div>

            {/* Category tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-semibold">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategoryTab(cat)}
                  className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors ${
                    selectedCategoryTab === cat
                      ? 'bg-[#0F2850] text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPrograms.map((program) => {
              const remaining = program.quota - program.enrolled;
              const quotaPercent = Math.round((program.enrolled / program.quota) * 100);

              return (
                <div
                  key={program.id}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                >
                  {/* Poster Banner Image Container */}
                  <div className="relative h-48 overflow-hidden bg-slate-900">
                    <img
                      src={program.bannerImage}
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#0F2850]/90 text-white backdrop-blur-md border border-white/20">
                        {program.category}
                      </span>
                      <span className="px-3 py-1 rounded-full text-[11px] font-black bg-amber-400 text-slate-950 shadow-sm">
                        {program.durationJp} Jam Pelajaran (JP)
                      </span>
                    </div>

                    {/* Method Tag */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs font-semibold text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>{program.method}</span>
                      {program.location && <span className="text-slate-300">({program.location})</span>}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Date & Time */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-3">
                        <span className="flex items-center gap-1 font-semibold text-slate-700">
                          <Calendar className="w-3.5 h-3.5 text-amber-600" />
                          {program.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {program.time}
                        </span>
                      </div>

                      {/* Title */}
                      <h4
                        onClick={() => onSelectProgram(program)}
                        className="text-base sm:text-lg font-bold text-slate-900 hover:text-[#0F2850] cursor-pointer leading-snug mb-3 transition-colors"
                      >
                        {program.title}
                      </h4>

                      {/* Instructor */}
                      <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-2xl border border-slate-100 mb-4">
                        <img
                          src={program.instructor.avatar}
                          alt={program.instructor.name}
                          className="w-10 h-10 rounded-full object-cover border border-amber-300"
                        />
                        <div className="overflow-hidden">
                          <p className="text-xs font-bold text-slate-900 truncate">
                            {program.instructor.name}
                          </p>
                          <p className="text-[11px] text-slate-500 truncate">
                            {program.instructor.role}
                          </p>
                        </div>
                      </div>

                      {/* Benefits preview */}
                      <ul className="space-y-1.5 mb-4 text-xs text-slate-600">
                        {program.benefits.slice(0, 3).map((bnf, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{bnf}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Quota Progress Bar */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 mb-1">
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3 text-[#0F2850]" />
                            Terisi: {program.enrolled} dari {program.quota} kursi
                          </span>
                          <span className="text-rose-600 font-bold">
                            Sisa {remaining} Kursi!
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-600 to-amber-500 rounded-full transition-all duration-500"
                            style={{ width: `${quotaPercent}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Price & Registration Button */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider">
                          Promo Early Bird
                        </div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-lg font-black text-[#0F2850]">
                            {formatRupiah(program.earlyBirdPrice)}
                          </span>
                          <span className="text-xs text-slate-400 line-through">
                            {formatRupiah(program.price)}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => onSelectProgram(program)}
                        className="py-2.5 px-5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
                      >
                        <span>Daftar Sekarang</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Fitur "Cek & Unduh Sertifikat" Berdasarkan Nomor Peserta (INTI PERSYARATAN) */}
        <div id="verifikasi-sertifikat" className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-lg">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto mb-3 shadow-inner">
              <BadgeCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Pusat Verifikasi & Unduh E-Sertifikat Resmi
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Validasi keaslian sertifikat pelatihan 32-40 JP yang dikeluarkan oleh Licyum Institute. Masukkan nomor sertifikat atau nomor peserta untuk mengecek legalitas dan mengunduh berkas digital (PDF).
            </p>
          </div>

          {/* Form Input */}
          <form onSubmit={handleVerifyCertificate} className="max-w-2xl mx-auto mb-6">
            <div className="flex flex-col sm:flex-row gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={certInput}
                  onChange={(e) => setCertInput(e.target.value)}
                  placeholder="Contoh nomor: LCY-2024-EDU-092 atau LCY-2024-JRN-108"
                  className="w-full pl-11 pr-4 py-3 bg-white text-slate-800 text-sm font-mono rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  required
                />
              </div>
              <button
                type="submit"
                className="py-3 px-6 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>Verifikasi Sekarang</span>
              </button>
            </div>
            <div className="mt-2 text-center text-xs text-slate-400">
              <span>Coba nomor sampel: </span>
              <button
                type="button"
                onClick={() => setCertInput('LCY-2024-EDU-092')}
                className="text-emerald-700 underline font-mono ml-1 hover:text-emerald-900"
              >
                LCY-2024-EDU-092
              </button>
              <span className="mx-1.5">•</span>
              <button
                type="button"
                onClick={() => setCertInput('LCY-2024-JRN-108')}
                className="text-emerald-700 underline font-mono hover:text-emerald-900"
              >
                LCY-2024-JRN-108
              </button>
              <span className="mx-1.5">•</span>
              <button
                type="button"
                onClick={() => setCertInput('LCY-2024-WRK-415')}
                className="text-emerald-700 underline font-mono hover:text-emerald-900"
              >
                LCY-2024-WRK-415
              </button>
            </div>
          </form>

          {/* Verification Result Card */}
          {hasSearchedCert && (
            <div className="max-w-2xl mx-auto animate-fadeIn">
              {certResult ? (
                <div className="bg-emerald-50/70 border-2 border-emerald-500/40 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
                  <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-emerald-200/40 rounded-full blur-2xl pointer-events-none" />

                  <div className="flex items-center justify-between border-b border-emerald-200 pb-4 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-800">
                          Status Sertifikat
                        </span>
                        <h4 className="text-base font-black text-emerald-950">
                          {certResult.status}
                        </h4>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 font-bold">
                      {certResult.certificateNumber}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm mb-6">
                    <div>
                      <span className="text-slate-500 text-xs">Nama Peserta:</span>
                      <p className="font-extrabold text-slate-900 text-base">
                        {certResult.participantName}
                      </p>
                    </div>

                    <div>
                      <span className="text-slate-500 text-xs">Asal Institusi / Kampus:</span>
                      <p className="font-bold text-slate-800">
                        {certResult.institution}
                      </p>
                    </div>

                    <div className="sm:col-span-2">
                      <span className="text-slate-500 text-xs">Program Pelatihan:</span>
                      <p className="font-bold text-slate-900">
                        {certResult.programTitle}
                      </p>
                    </div>

                    <div>
                      <span className="text-slate-500 text-xs">Beban Waktu:</span>
                      <p className="font-bold text-slate-800">
                        {certResult.jpTotal} Jam Pelajaran (JP)
                      </p>
                    </div>

                    <div>
                      <span className="text-slate-500 text-xs">Predikat Kelulusan:</span>
                      <p className="font-bold text-emerald-800">
                        {certResult.grade}
                      </p>
                    </div>

                    <div>
                      <span className="text-slate-500 text-xs">Tanggal Terbit:</span>
                      <p className="font-bold text-slate-800">
                        {certResult.issueDate}
                      </p>
                    </div>

                    <div>
                      <span className="text-slate-500 text-xs">ID Kredensial Digital:</span>
                      <p className="font-mono text-xs text-slate-600">
                        {certResult.credentialId}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-emerald-200">
                    <button
                      onClick={() =>
                        alert(
                          `Mengunduh Berkas Sertifikat Resmi (${certResult.certificateNumber}) berformat PDF ber-barcode digital...`
                        )
                      }
                      className="w-full sm:w-auto flex-1 py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Unduh Sertifikat Resmi (PDF)</span>
                    </button>
                    <button
                      onClick={() =>
                        alert(
                          `Transkrip Nilai & Capaian Pembelajaran untuk ${certResult.participantName} berhasil disiapkan.`
                        )
                      }
                      className="w-full sm:w-auto py-2.5 px-4 bg-white hover:bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-xl text-xs font-bold transition-all text-center"
                    >
                      Lihat Transkrip Capaian
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-center">
                  <AlertCircle className="w-10 h-10 text-rose-500 mx-auto mb-2" />
                  <h4 className="font-bold text-rose-950 text-base">
                    Nomor Sertifikat Tidak Ditemukan
                  </h4>
                  <p className="text-xs text-rose-800 mt-1 max-w-md mx-auto">
                    Nomor "{certInput}" tidak terdaftar di pangkalan data resmi Licyum. Harap pastikan kembali format penulisan nomor sertifikat Anda.
                  </p>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
