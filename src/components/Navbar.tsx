'use client';

import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Search,
  Menu,
  X,
  ChevronDown,
  ShieldCheck,
  FileText,
  GraduationCap,
  CheckCircle2,
  LogIn,
  PhoneCall,
  ExternalLink,
  BookMarked,
  Database
} from 'lucide-react';
import { ActivePillar } from '../types';
import { envConfig, createWhatsAppLink } from '../lib/config';

interface NavbarProps {
  activePillar: ActivePillar;
  onSelectPillar: (pillar: ActivePillar) => void;
  onOpenStatusModal: (defaultType?: 'ISBN' | 'NASKAH_JURNAL' | 'SERTIFIKAT') => void;
  onOpenAuthModal: () => void;
  onOpenGlobalSearch: () => void;
  onOpenAdminPanel?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePillar,
  onSelectPillar,
  onOpenStatusModal,
  onOpenAuthModal,
  onOpenGlobalSearch,
  onOpenAdminPanel
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    setIsServicesDropdownOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Banner Notice */}
      <div className="bg-[#0A192F] text-slate-300 text-xs py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-amber-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" /> Anggota Resmi IKAPI No. {envConfig.publishing.ikapiNumber}
            </span>
            <span className="hidden md:inline text-slate-500">•</span>
            <span className="hidden md:inline">Terakreditasi SINTA Kemdikbudristek & Terindeks DOAJ</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <button
              onClick={() => onOpenStatusModal('ISBN')}
              className="hover:text-amber-300 transition-colors flex items-center gap-1"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Cek Status ISBN / Naskah
            </button>
            <span className="text-slate-600">|</span>
            <a
              href={createWhatsAppLink('Halo Licyum, saya ingin konsultasi publikasi')}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-300 transition-colors flex items-center gap-1 font-medium text-emerald-400"
            >
              <PhoneCall className="w-3 h-3" /> Hotline: {envConfig.contact.whatsapp}
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <nav
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-slate-200'
            : 'bg-white py-4 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Logo */}
            <div
              onClick={() => {
                onSelectPillar('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0F2850] to-[#1E3A8A] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200 text-white">
                <BookOpen className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl font-black tracking-tight text-[#0F2850]">
                    LICYUM
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
                    ID
                  </span>
                </div>
                <p className="text-[11px] font-medium text-slate-500 tracking-wide">
                  Penerbitan • Jurnal Ilmiah • Pelatihan
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 font-medium text-sm text-slate-700">
              <button
                onClick={() => {
                  onSelectPillar('all');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-3.5 py-2 rounded-lg hover:text-[#0F2850] hover:bg-slate-100 transition-colors"
              >
                Beranda
              </button>

              {/* Layanan Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsServicesDropdownOpen(true)}
                onMouseLeave={() => setIsServicesDropdownOpen(false)}
              >
                <button
                  className="flex items-center gap-1 px-3.5 py-2 rounded-lg hover:text-[#0F2850] hover:bg-slate-100 transition-colors"
                >
                  <span>Layanan Kami</span>
                  <ChevronDown className="w-4 h-4 text-slate-400 transition-transform duration-200" />
                </button>

                {isServicesDropdownOpen && (
                  <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-2.5 mt-1 animate-fadeIn">
                    <div
                      onClick={() => {
                        onSelectPillar('publishing');
                        scrollToSection('seksi-penerbitan');
                      }}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-blue-50/80 cursor-pointer transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-blue-100 text-[#0F2850] flex items-center justify-center shrink-0 group-hover:bg-[#0F2850] group-hover:text-white transition-colors">
                        <BookMarked className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 text-sm group-hover:text-[#0F2850]">
                          Penerbitan & Toko Buku
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          ISBN resmi, HAKI Kemenkumham, konversi tesis & katalog buku.
                        </p>
                      </div>
                    </div>

                    <div
                      onClick={() => {
                        onSelectPillar('journal');
                        scrollToSection('seksi-jurnal');
                      }}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-emerald-50/80 cursor-pointer transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 text-sm group-hover:text-emerald-800">
                          Portal Jurnal Ilmiah (OJS)
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Terakreditasi SINTA 2-4, terindeks DOAJ, Crossref & download paper.
                        </p>
                      </div>
                    </div>

                    <div
                      onClick={() => {
                        onSelectPillar('training');
                        scrollToSection('seksi-pelatihan');
                      }}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-amber-50/80 cursor-pointer transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 text-sm group-hover:text-amber-800">
                          Pelatihan & Konsultan Kampus
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Workshop penulisan, in-house training 32 JP & sertifikasi BNSP.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => scrollToSection('tentang-kami')}
                className="px-3.5 py-2 rounded-lg hover:text-[#0F2850] hover:bg-slate-100 transition-colors"
              >
                Tentang Kami
              </button>

              <button
                onClick={() => onOpenStatusModal()}
                className="px-3.5 py-2 rounded-lg hover:text-[#0F2850] hover:bg-slate-100 transition-colors flex items-center gap-1.5"
              >
                <span>Cek Status</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </button>

              <button
                onClick={() => scrollToSection('seksi-kontak')}
                className="px-3.5 py-2 rounded-lg hover:text-[#0F2850] hover:bg-slate-100 transition-colors"
              >
                Kontak
              </button>
            </div>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-2.5">
              {/* Global Search Trigger */}
              <button
                onClick={onOpenGlobalSearch}
                className="p-2.5 text-slate-600 hover:text-[#0F2850] hover:bg-slate-100 rounded-xl transition-colors flex items-center gap-2"
                title="Cari Buku, Paper, atau Pelatihan"
              >
                <Search className="w-5 h-5" />
                <span className="hidden xl:inline text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  Ctrl + K
                </span>
              </button>

              {/* Admin CRUD Center Quick Button */}
              {onOpenAdminPanel && (
                <button
                  onClick={onOpenAdminPanel}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-500 rounded-xl transition-all shadow-sm"
                  title="Pusat CRUD Database & Ekosistem"
                >
                  <Database className="w-4 h-4 text-slate-950" />
                  <span>CRUD Admin</span>
                </button>
              )}

              {/* Status Tracking Quick Button */}
              <button
                onClick={() => onOpenStatusModal('SERTIFIKAT')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-[#0F2850] bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border border-slate-200"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Verifikasi Sertifikat</span>
              </button>

              {/* Masuk / Daftar CTA */}
              <button
                onClick={onOpenAuthModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-semibold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
              >
                <LogIn className="w-4 h-4" />
                <span>Masuk / Daftar</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 animate-fadeIn">
            <div className="flex flex-col gap-1 text-sm font-medium text-slate-700">
              <button
                onClick={() => {
                  onSelectPillar('all');
                  setIsMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-left px-3 py-2.5 rounded-lg hover:bg-slate-100"
              >
                Beranda
              </button>

              <div className="border-t border-slate-100 my-1 pt-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3">
                  Tiga Layanan Utama
                </span>
                <button
                  onClick={() => {
                    onSelectPillar('publishing');
                    scrollToSection('seksi-penerbitan');
                  }}
                  className="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-blue-50 text-slate-800"
                >
                  <BookMarked className="w-4 h-4 text-[#0F2850]" />
                  <span>1. Penerbitan & Toko Buku</span>
                </button>
                <button
                  onClick={() => {
                    onSelectPillar('journal');
                    scrollToSection('seksi-jurnal');
                  }}
                  className="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-emerald-50 text-slate-800"
                >
                  <FileText className="w-4 h-4 text-emerald-700" />
                  <span>2. Portal Jurnal Ilmiah (OJS)</span>
                </button>
                <button
                  onClick={() => {
                    onSelectPillar('training');
                    scrollToSection('seksi-pelatihan');
                  }}
                  className="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-amber-50 text-slate-800"
                >
                  <GraduationCap className="w-4 h-4 text-amber-700" />
                  <span>3. Pelatihan & Sertifikasi</span>
                </button>
              </div>

              <div className="border-t border-slate-100 my-1 pt-1">
                {onOpenAdminPanel && (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenAdminPanel();
                    }}
                    className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-lg bg-amber-50 text-amber-950 font-bold mb-1"
                  >
                    <span className="flex items-center gap-2">
                      <Database className="w-4 h-4 text-amber-700" />
                      Pusat CRUD Database Licyum
                    </span>
                    <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full">
                      Admin
                    </span>
                  </button>
                )}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenStatusModal();
                  }}
                  className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-slate-100 text-slate-800"
                >
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Cek Status Terpadu (ISBN/Jurnal/Sertifikat)
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                    Online
                  </span>
                </button>
                <button
                  onClick={() => scrollToSection('tentang-kami')}
                  className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-slate-100 text-slate-800"
                >
                  Tentang Licyum
                </button>
                <button
                  onClick={() => scrollToSection('seksi-kontak')}
                  className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-slate-100 text-slate-800"
                >
                  Kontak & Lokasi Kantor
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
