'use client';

import React, { useState } from 'react';
import {
  Search,
  BookOpen,
  FileText,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  TrendingUp,
  SlidersHorizontal
} from 'lucide-react';
import { SearchCategory, ActivePillar } from '../types';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: SearchCategory;
  onSelectCategory: (category: SearchCategory) => void;
  onTriggerSearch: () => void;
  activePillar: ActivePillar;
  onSelectPillar: (pillar: ActivePillar) => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  onTriggerSearch,
  activePillar,
  onSelectPillar
}) => {
  const categories: SearchCategory[] = ['Semua', 'Buku', 'Artikel Jurnal', 'Program Pelatihan'];

  const quickChips = [
    { label: 'Buku Metodologi Riset', cat: 'Buku' as SearchCategory, query: 'Metodologi' },
    { label: 'Jurnal SINTA 2', cat: 'Artikel Jurnal' as SearchCategory, query: 'SINTA' },
    { label: 'Pelatihan Scopus & IMRaD', cat: 'Program Pelatihan' as SearchCategory, query: 'Scopus' },
    { label: 'Paket ISBN Cepat', cat: 'Buku' as SearchCategory, query: 'ISBN' },
    { label: 'Kecerdasan Buatan (AI)', cat: 'Semua' as SearchCategory, query: 'AI' }
  ];

  const handleChipClick = (cat: SearchCategory, query: string) => {
    onSelectCategory(cat);
    onSearchChange(query);
    onTriggerSearch();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onTriggerSearch();
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0A192F] via-[#0F2850] to-[#143265] text-white pt-12 pb-20 lg:pt-16 lg:pb-24">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Trust Badge */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs sm:text-sm font-medium text-amber-300 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Platform Terpadu Publikasi Ilmiah & Pendidikan Tinggi Indonesia</span>
          </div>
          <div className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-300">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Terdaftar Resmi di Perpusnas RI & IKAPI</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Satu Ekosistem untuk{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
              Publikasi Buku
            </span>
            ,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-blue-300 to-indigo-300">
              Jurnal Ilmiah
            </span>
            , dan{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-400">
              Pengembangan Kompetensi
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed font-normal max-w-3xl mx-auto">
            Solusi komprehensif bagi akademisi, peneliti, guru, dosen, dan institusi pendidikan untuk menerbitkan karya ber-ISBN resmi, mempublikasikan naskah di jurnal terakreditasi SINTA & DOAJ, serta meningkatkan kapasitas profesional melalui pelatihan bersertifikasi.
          </p>
        </div>

        {/* Unified Search Engine Bar (INTI FITUR) */}
        <div className="mt-8 sm:mt-10 max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur-lg p-2 sm:p-3 rounded-2xl shadow-2xl border border-white/20">
            
            {/* Category Tabs */}
            <div className="flex items-center gap-1 sm:gap-2 pb-2 mb-2 border-b border-slate-200/80 overflow-x-auto text-xs sm:text-sm">
              <span className="hidden sm:flex items-center gap-1 text-slate-400 font-semibold px-2 uppercase text-[11px] tracking-wider">
                <SlidersHorizontal className="w-3.5 h-3.5" /> Filter:
              </span>
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => onSelectCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-all duration-150 whitespace-nowrap flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#0F2850] text-white shadow-sm font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {cat === 'Buku' && <BookOpen className="w-3.5 h-3.5 text-amber-500" />}
                    {cat === 'Artikel Jurnal' && <FileText className="w-3.5 h-3.5 text-blue-500" />}
                    {cat === 'Program Pelatihan' && <GraduationCap className="w-3.5 h-3.5 text-emerald-500" />}
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>

            {/* Input & Search CTA Button */}
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    selectedCategory === 'Buku'
                      ? 'Cari judul buku, penulis, atau topik (contoh: Metodologi, Tesis, Akuntansi)...'
                      : selectedCategory === 'Artikel Jurnal'
                      ? 'Cari judul paper, nama author, afiliasi kampus, atau DOI...'
                      : selectedCategory === 'Program Pelatihan'
                      ? 'Cari workshop penulisan, pelatihan OJS, atau sertifikasi BNSP...'
                      : 'Ketik kata kunci untuk mencari di seluruh katalog buku, jurnal & pelatihan...'
                  }
                  className="w-full pl-12 pr-4 py-3 text-slate-800 placeholder-slate-400 text-sm sm:text-base rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F2850] focus:border-transparent transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded"
                  >
                    Hapus
                  </button>
                )}
              </div>

              <button
                onClick={onTriggerSearch}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                <span>Cari Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Search Chips */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-300">
            <span className="text-slate-400 font-medium flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-amber-400" /> Populer dicari:
            </span>
            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleChipClick(chip.cat, chip.query)}
                className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-slate-200 hover:text-amber-300 border border-white/10 transition-colors cursor-pointer"
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
