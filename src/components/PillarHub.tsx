'use client';

import React from 'react';
import {
  BookOpen,
  FileSpreadsheet,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Eye,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { ActivePillar } from '../types';

interface PillarHubProps {
  activePillar: ActivePillar;
  onSelectPillar: (pillar: ActivePillar) => void;
}

export const PillarHub: React.FC<PillarHubProps> = ({ activePillar, onSelectPillar }) => {
  const pillars = [
    {
      id: 'publishing' as ActivePillar,
      sectionId: 'seksi-penerbitan',
      title: 'Penerbitan & Toko Buku',
      subtitle: 'Inspirasi: Penerbit KBM',
      tagline: 'Cetak Buku Ber-ISBN, Barcode Perpusnas & HAKI Hak Cipta',
      badge: 'Anggota Resmi IKAPI',
      badgeColor: 'bg-blue-100 text-[#0F2850] border-blue-200',
      icon: BookOpen,
      iconBg: 'bg-blue-50 text-[#0F2850]',
      hoverBorder: 'hover:border-blue-400',
      activeBorder: 'border-2 border-[#0F2850] ring-4 ring-blue-500/10 shadow-xl bg-gradient-to-b from-blue-50/50 to-white',
      stats: '1.480+ Judul Terbit',
      highlights: [
        'Paket Penerbitan Lengkap (ISBN + HAKI + Cetak)',
        'Konversi Skripsi, Tesis & Disertasi ke Buku Referensi',
        'Katalog Buku Akademik dengan Royalti Penulis 100%'
      ],
      ctaText: 'Jelajahi Penerbitan & Toko Buku'
    },
    {
      id: 'journal' as ActivePillar,
      sectionId: 'seksi-jurnal',
      title: 'Portal Jurnal Ilmiah (OJS)',
      subtitle: 'Inspirasi: E-Journal OJS',
      tagline: 'Publikasi Artikel Bereputasi Terindeks SINTA 2-4 & DOAJ',
      badge: 'Akreditasi SINTA & DOAJ',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-200',
      icon: FileSpreadsheet,
      iconBg: 'bg-emerald-50 text-emerald-700',
      hoverBorder: 'hover:border-emerald-400',
      activeBorder: 'border-2 border-emerald-600 ring-4 ring-emerald-500/10 shadow-xl bg-gradient-to-b from-emerald-50/50 to-white',
      stats: '4 E-Journal Aktif (OJS 3)',
      highlights: [
        'Peer-Review Double Blind Transparan & Cepat',
        'Download Langsung Full-Text PDF & Metadata DOI Crossref',
        'Author Guidelines, Template Word/LaTeX & Cek Turnitin'
      ],
      ctaText: 'Buka Portal E-Journal OJS'
    },
    {
      id: 'training' as ActivePillar,
      sectionId: 'seksi-pelatihan',
      title: 'Pelatihan & Konsultan Kampus',
      subtitle: 'Inspirasi: Kuanta.id',
      tagline: 'Workshop Penulisan, In-House Training 32 JP & BNSP',
      badge: 'Sertifikat Resmi 32-40 JP',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-200',
      icon: GraduationCap,
      iconBg: 'bg-amber-50 text-amber-600',
      hoverBorder: 'hover:border-amber-400',
      activeBorder: 'border-2 border-amber-500 ring-4 ring-amber-500/10 shadow-xl bg-gradient-to-b from-amber-50/50 to-white',
      stats: '34.500+ Alumni se-Indonesia',
      highlights: [
        'Masterclass Tembus Scopus & Penulisan Buku Ajar BSNP',
        'In-House Training Kampus & Pendampingan Akreditasi',
        'Sistem Online Verifikasi & Unduh Sertifikat Real-Time'
      ],
      ctaText: 'Lihat Jadwal Pelatihan & Sertifikasi'
    }
  ];

  const handlePillarClick = (pillarId: ActivePillar, sectionId: string) => {
    onSelectPillar(pillarId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative -mt-10 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Switcher Header Pill */}
      <div className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-2xl p-3 sm:p-4 shadow-lg border border-slate-200/80 mb-6 gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#0F2850] text-amber-400 flex items-center justify-center font-bold">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              3-Pillar Interactive Feature Hub
            </h3>
            <p className="text-xs text-slate-500">
              Pilih pilar layanan untuk navigasi cepat atau memfokuskan tampilan dashboard
            </p>
          </div>
        </div>

        {/* Global Filter Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => onSelectPillar('all')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activePillar === 'all'
                ? 'bg-white text-[#0F2850] shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Semua Layanan (Lengkap)
          </button>
          <button
            onClick={() => handlePillarClick('publishing', 'seksi-penerbitan')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activePillar === 'publishing'
                ? 'bg-[#0F2850] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            1. Buku
          </button>
          <button
            onClick={() => handlePillarClick('journal', 'seksi-jurnal')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activePillar === 'journal'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            2. Jurnal OJS
          </button>
          <button
            onClick={() => handlePillarClick('training', 'seksi-pelatihan')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activePillar === 'training'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            3. Pelatihan
          </button>
        </div>
      </div>

      {/* 3 Interactive Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {pillars.map((item) => {
          const Icon = item.icon;
          const isActive = activePillar === item.id;

          return (
            <div
              key={item.id}
              onClick={() => handlePillarClick(item.id, item.sectionId)}
              className={`rounded-2xl p-6 sm:p-7 bg-white border transition-all duration-300 cursor-pointer group flex flex-col justify-between relative overflow-hidden ${
                isActive
                  ? item.activeBorder
                  : `border-slate-200/90 shadow-md hover:shadow-xl ${item.hoverBorder}`
              }`}
            >
              {/* Active Glow Bar on Top */}
              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 to-[#0F2850]" />
              )}

              <div>
                {/* Header row with badge & icon */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm ${item.iconBg}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <div className="mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {item.subtitle}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0F2850] transition-colors mt-0.5">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mb-4">
                  {item.tagline}
                </p>

                {/* Highlights List */}
                <div className="space-y-2 border-t border-slate-100 pt-4 mb-6">
                  {item.highlights.map((hl, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-slate-500">
                  {item.stats}
                </span>

                <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0F2850] group-hover:text-amber-600 transition-colors">
                  <span>{item.ctaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
