'use client';

import React, { useState } from 'react';
import {
  FileText,
  FileSpreadsheet,
  Download,
  ExternalLink,
  Award,
  CheckCircle2,
  BookCheck,
  FileCode,
  ShieldAlert,
  Search,
  ChevronRight,
  Sparkles,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { JournalItem, ArticleItem } from '../types';
import { JOURNALS_DATA, RECENT_ARTICLES, AUTHOR_GUIDELINES } from '../data/dummyData';

interface JournalSectionProps {
  onSelectArticle: (article: ArticleItem) => void;
  onOpenGuidelinesModal: () => void;
  onOpenSubmitModal: (journalName?: string) => void;
  searchFilter?: string;
}

export const JournalSection: React.FC<JournalSectionProps> = ({
  onSelectArticle,
  onOpenGuidelinesModal,
  onOpenSubmitModal,
  searchFilter = ''
}) => {
  const [selectedJournalTab, setSelectedJournalTab] = useState<string>('all');
  const [articleSearch, setArticleSearch] = useState<string>('');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const effectiveArticleSearch = searchFilter || articleSearch;

  const filteredArticles = RECENT_ARTICLES.filter((art) => {
    const matchesJournal =
      selectedJournalTab === 'all' || art.journalId === selectedJournalTab;
    const matchesSearch =
      effectiveArticleSearch.trim() === '' ||
      art.title.toLowerCase().includes(effectiveArticleSearch.toLowerCase()) ||
      art.authors.some((a) =>
        a.toLowerCase().includes(effectiveArticleSearch.toLowerCase())
      ) ||
      art.affiliation.toLowerCase().includes(effectiveArticleSearch.toLowerCase()) ||
      art.keywords.some((k) =>
        k.toLowerCase().includes(effectiveArticleSearch.toLowerCase())
      );
    return matchesJournal && matchesSearch;
  });

  const handleDownloadPdf = (article: ArticleItem) => {
    setDownloadSuccess(article.id);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 3000);
  };

  const getSintaColor = (badge: string) => {
    switch (badge) {
      case 'SINTA 2':
        return 'bg-amber-100 text-amber-900 border-amber-300 font-bold';
      case 'SINTA 3':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold';
      case 'SINTA 4':
        return 'bg-blue-100 text-blue-900 border-blue-300 font-bold';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300 font-bold';
    }
  };

  return (
    <section id="seksi-jurnal" className="py-16 sm:py-20 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Pilar 2: Portal Jurnal Ilmiah</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Portal E-Journal OJS Terakreditasi Nasional
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
              Inspirasi tata kelola repositori OJS (Open Journal Systems). Mengelola berkala ilmiah terindeks SINTA 2, SINTA 3, SINTA 4, DOAJ, serta terhubung DOI Crossref aktif.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenSubmitModal()}
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Submit Artikel (OJS)</span>
            </button>
          </div>
        </div>

        {/* 1. Daftar Jurnal yang Dikelola (Horizontal Cards) */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span>Daftar E-Journal Resmi Licyum Publishing</span>
              <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold">
                {JOURNALS_DATA.length} Jurnal Aktif
              </span>
            </h3>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              Sistem OJS 3 Terintegrasi PKP Preservation Network
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {JOURNALS_DATA.map((journal) => (
              <div
                key={journal.id}
                className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/90 hover:border-emerald-500 hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row gap-5"
              >
                {/* Journal Cover Thumbnail */}
                <div className="w-full sm:w-36 h-48 sm:h-auto rounded-xl overflow-hidden shrink-0 relative bg-slate-200 shadow-inner">
                  <img
                    src={journal.coverImage}
                    alt={journal.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-md border shadow-sm ${getSintaColor(
                        journal.sintaBadge
                      )}`}
                    >
                      {journal.sintaBadge}
                    </span>
                  </div>
                </div>

                {/* Journal Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {journal.acronym}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {journal.frequency}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug hover:text-emerald-800 transition-colors">
                      {journal.name}
                    </h4>

                    <p className="text-xs text-slate-500 mt-1 mb-2">
                      <span className="font-semibold text-slate-700">Bidang:</span> {journal.fieldOfStudy}
                    </p>

                    <div className="text-[11px] font-mono text-slate-500 space-y-0.5 bg-white p-2 rounded-lg border border-slate-200 mb-3">
                      <div><strong className="text-slate-700 font-sans">e-ISSN:</strong> {journal.eIssn} | <strong className="text-slate-700 font-sans">p-ISSN:</strong> {journal.pIssn}</div>
                      <div className="truncate"><strong className="text-slate-700 font-sans">Editor:</strong> {journal.editorInChief}</div>
                    </div>

                    {/* Indexing Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {journal.indexing.slice(0, 4).map((idx, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-slate-200/70 text-slate-700 font-medium px-2 py-0.5 rounded"
                        >
                          {idx}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                    <button
                      onClick={() => onOpenSubmitModal(journal.name)}
                      className="flex-1 py-2 px-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Submit Artikel</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setSelectedJournalTab(journal.id)}
                      className="py-2 px-3 bg-white hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold border border-slate-300 transition-colors"
                    >
                      Lihat Arsip
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* 2. Dua Kolom: Daftar Artikel Terbaru & Sidebar Informasi Penulis */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Kolom 1 & 2: Daftar Artikel Terbaru */}
          <div className="lg:col-span-2">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Artikel Ilmiah Terbaru
                </h3>
                <p className="text-xs text-slate-500">
                  Terbitan mutakhir ber-DOI resmi yang siap diunduh secara Open Access (Creative Commons CC BY 4.0).
                </p>
              </div>

              {/* Filter Tabs by Journal */}
              <div className="flex items-center gap-1 text-xs overflow-x-auto pb-1">
                <button
                  onClick={() => setSelectedJournalTab('all')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all whitespace-nowrap ${
                    selectedJournalTab === 'all'
                      ? 'bg-emerald-800 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Semua ({RECENT_ARTICLES.length})
                </button>
                {JOURNALS_DATA.map((j) => (
                  <button
                    key={j.id}
                    onClick={() => setSelectedJournalTab(j.id)}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition-all whitespace-nowrap ${
                      selectedJournalTab === j.id
                        ? 'bg-emerald-800 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {j.acronym}
                  </button>
                ))}
              </div>
            </div>

            {/* Articles List */}
            <div className="space-y-4">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all duration-200"
                >
                  {/* Journal Source & Date */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 mb-2">
                    <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {article.journalName}
                    </span>
                    <span className="text-[11px]">{article.volume} • {article.publicationDate}</span>
                  </div>

                  {/* Title */}
                  <h4
                    onClick={() => onSelectArticle(article)}
                    className="text-base sm:text-lg font-bold text-slate-900 hover:text-emerald-800 cursor-pointer leading-snug transition-colors mb-2"
                  >
                    {article.title}
                  </h4>

                  {/* Authors & Affiliation */}
                  <div className="text-xs text-slate-600 mb-2">
                    <span className="font-semibold text-slate-800">
                      {article.authors.join(', ')}
                    </span>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {article.affiliation}
                    </p>
                  </div>

                  {/* Abstract Preview */}
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-3">
                    {article.abstract}
                  </p>

                  {/* DOI & Action Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        DOI: {article.doi}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">
                        • {article.citations} Sitasi
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectArticle(article)}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
                      >
                        Lihat Abstrak
                      </button>

                      <button
                        onClick={() => handleDownloadPdf(article)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                          downloadSuccess === article.id
                            ? 'bg-emerald-600 text-white'
                            : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                        }`}
                      >
                        {downloadSuccess === article.id ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>PDF Terunduh</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-3.5 h-3.5" />
                            <span>Unduh PDF</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Kolom 3: Box Informasi Cepat & Author Resources */}
          <div className="space-y-6">
            
            {/* Quick Box 1: Panduan & Template Naskah */}
            <div className="bg-gradient-to-br from-[#0F2850] to-[#1E3A8A] text-white rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-2.5 mb-3">
                <BookCheck className="w-6 h-6 text-amber-400" />
                <h4 className="text-base font-bold text-white">
                  Informasi Penting Penulis
                </h4>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed mb-4">
                Pastikan naskah Anda memenuhi panduan etika publikasi ilmiah sebelum melakukan submit di sistem OJS kami.
              </p>

              <div className="space-y-2.5">
                <button
                  onClick={onOpenGuidelinesModal}
                  className="w-full py-2.5 px-3.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-semibold text-white transition-colors flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-amber-400" />
                    Panduan Penulis (Author Guidelines)
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </button>

                <a
                  href="#download-template"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Template naskah jurnal Licyum (.DOCX) berhasil diunduh ke komputer Anda.');
                  }}
                  className="w-full py-2.5 px-3.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-semibold text-white transition-colors flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-sky-400" />
                    Download Template Word (.DOCX)
                  </span>
                  <Download className="w-4 h-4 text-slate-300" />
                </a>

                <a
                  href="#download-latex"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Template naskah LaTeX Licyum (.ZIP) berhasil diunduh.');
                  }}
                  className="w-full py-2.5 px-3.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-semibold text-white transition-colors flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-emerald-400" />
                    Download Template LaTeX (.ZIP)
                  </span>
                  <Download className="w-4 h-4 text-slate-300" />
                </a>
              </div>
            </div>

            {/* Quick Box 2: Cek Plagiarisme Turnitin Resmi */}
            <div className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-5">
              <div className="flex items-center gap-2.5 mb-2">
                <ShieldAlert className="w-5 h-5 text-amber-700" />
                <h4 className="text-sm font-bold text-amber-950">
                  Layanan Cek Turnitin & Proofreading
                </h4>
              </div>
              <p className="text-xs text-amber-900 leading-relaxed mb-3">
                Uji kemiripan naskah Anda dengan akun Turnitin No-Repository resmi (tidak tersimpan di database). Hasil instan dalam 30 menit dilengkapi laporan PDF berwarna.
              </p>
              <div className="flex items-center justify-between text-xs text-amber-800 font-bold bg-white/80 p-2.5 rounded-xl border border-amber-200 mb-3">
                <span>Biaya Mulai:</span>
                <span className="text-sm text-[#0F2850]">Rp 25.000 / Naskah</span>
              </div>
              <button
                onClick={() => {
                  window.open(
                    'https://wa.me/6281234567890?text=Halo%20Licyum,%20saya%20ingin%20cek%20Turnitin%20No-Repository',
                    '_blank'
                  );
                }}
                className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Ajukan Cek Plagiasi Sekarang</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Box 3: Ringkasan 4 Langkah Submit */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Alur Publikasi Cepat di OJS Licyum:
              </h4>
              <div className="space-y-3">
                {AUTHOR_GUIDELINES.map((guide) => (
                  <div key={guide.step} className="flex items-start gap-2.5 text-xs">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[11px]">
                      {guide.step}
                    </span>
                    <div>
                      <h5 className="font-bold text-slate-800">{guide.title}</h5>
                      <p className="text-slate-500 text-[11px] leading-normal mt-0.5">
                        {guide.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
