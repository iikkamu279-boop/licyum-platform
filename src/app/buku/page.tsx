'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '../../components/Navbar';
import { BookSection } from '../../components/BookSection';
import { Footer } from '../../components/Footer';
import { BookDetailModal } from '../../components/BookDetailModal';
import { StatusTrackerModal } from '../../components/StatusTrackerModal';
import { AuthModal } from '../../components/AuthModal';
import { BookItem } from '../../types';
import { ArrowLeft, BookOpen, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { envConfig, createWhatsAppLink } from '../../lib/config';

export default function BukuPortalPage() {
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleOpenPublishingModal = (packageId: string) => {
    const text = `Halo Penerbit Licyum, saya ingin konsultasi penerbitan buku (${packageId}).`;
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
            Divisi Penerbitan & Toko Buku Akademik • Anggota IKAPI No. {envConfig.publishing.ikapiNumber}
          </span>
        </div>
      </div>

      {/* Header Banner */}
      <header className="bg-gradient-to-r from-[#0F2547] to-[#1B3B6F] text-white py-12 px-4 sm:px-6 lg:px-8 border-b-4 border-[#F5B041]">
        <div className="max-w-7xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Unit Layanan 01 — Divisi Penerbitan Buku</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight">
            Penerbitan Buku Ber-ISBN & Katalog Akademik
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-normal">
            Layanan resmi penerbitan buku ber-ISBN Perpusnas, Hak Cipta HAKI Kemenkumham, konversi tugas akhir, serta distribusi buku ilmiah ke seluruh perguruan tinggi di Indonesia.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <BookSection
          onSelectBook={(book) => setSelectedBook(book)}
          onOpenPublishingModal={handleOpenPublishingModal}
        />
      </main>

      {/* Footer */}
      <Footer
        onSelectPillar={() => {}}
        onOpenStatusModal={() => setIsStatusModalOpen(true)}
      />

      {/* Modals */}
      <BookDetailModal
        book={selectedBook}
        isOpen={!!selectedBook}
        onClose={() => setSelectedBook(null)}
      />
      <StatusTrackerModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        defaultType="ISBN"
      />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}
