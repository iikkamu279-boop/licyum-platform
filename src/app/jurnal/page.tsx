'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { JournalSection } from '../../components/JournalSection';
import { Footer } from '../../components/Footer';
import { ArticleDetailModal } from '../../components/ArticleDetailModal';
import { StatusTrackerModal } from '../../components/StatusTrackerModal';
import { AuthModal } from '../../components/AuthModal';
import { ArticleItem } from '../../types';
import { ArrowLeft, FileSpreadsheet, Send, ShieldCheck } from 'lucide-react';
import { envConfig, createWhatsAppLink } from '../../lib/config';

export default function JurnalPortalPage() {
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleOpenSubmitModal = (journalName?: string) => {
    const text = `Halo Redaksi Jurnal Licyum, saya ingin submit naskah untuk jurnal: ${journalName || 'OJS Licyum'}.`;
    window.open(createWhatsAppLink(text), '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-slate-900 font-sans">
      
      {/* Top Banner Navigation */}
      <div className="bg-[#0A192F] text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-bold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda Portal Utama PT Licyum</span>
          </Link>
          <span className="hidden sm:inline text-slate-400">
            Divisi Publikasi Berkala Ilmiah OJS • Terakreditasi SINTA 2-4 & DOAJ
          </span>
        </div>
      </div>

      {/* Header Banner */}
      <header className="bg-gradient-to-r from-[#0F2547] to-[#1B3B6F] text-white py-12 px-4 sm:px-6 lg:px-8 border-b-4 border-[#F5B041]">
        <div className="max-w-7xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-400/30">
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>Unit Layanan 02 — Divisi Publikasi Jurnal Ilmiah (OJS)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight">
            Portal E-Journal OJS & Repositori Ilmiah Terakreditasi
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-normal">
            Pengelolaan 4 berkala ilmiah bereputasi berstandar Open Journal Systems 3, terindeks SINTA, DOAJ, Google Scholar, dan terhubung DOI Crossref resmi.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <JournalSection
          onSelectArticle={(article) => setSelectedArticle(article)}
          onOpenGuidelinesModal={() => {
            alert('Panduan Penulis (Author Guidelines): Format IMRaD, Turnitin <20%, referensi APA 7th ed.');
          }}
          onOpenSubmitModal={handleOpenSubmitModal}
        />
      </main>

      {/* Footer */}
      <Footer
        onSelectPillar={() => {}}
        onOpenStatusModal={() => setIsStatusModalOpen(true)}
      />

      {/* Modals */}
      <ArticleDetailModal
        article={selectedArticle}
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
      <StatusTrackerModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        defaultType="NASKAH_JURNAL"
      />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}
