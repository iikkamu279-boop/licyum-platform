'use client';

import React from 'react';
import {
  BookOpen,
  MapPin,
  Mail,
  Phone,
  Clock,
  ShieldCheck,
  Award,
  ArrowRight,
  ExternalLink,
  Globe,
  Share2,
  FileText,
  GraduationCap
} from 'lucide-react';
import { ActivePillar } from '../types';
import { envConfig } from '../lib/config';

interface FooterProps {
  onSelectPillar: (pillar: ActivePillar) => void;
  onOpenStatusModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectPillar, onOpenStatusModal }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="seksi-kontak" className="bg-[#0A192F] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Mission Column (Spans 2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md">
                <BookOpen className="w-6 h-6 text-[#0A192F]" />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight text-white">
                  LICYUM
                </span>
                <span className="ml-1 text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-amber-400 text-slate-950">
                  INDONESIA
                </span>
                <p className="text-xs text-slate-400 mt-0.5 font-medium">
                  Ekosistem Publikasi Buku, E-Journal & Pelatihan Terpadu
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Licyum hadir menjembatani diseminasi ilmu pengetahuan di Indonesia melalui integrasi penerbitan buku ber-ISBN resmi, pengelolaan e-journal berstandar OJS terindeks SINTA & DOAJ, serta pelatihan peningkatan mutu pendidik dan peneliti.
            </p>

            {/* Legal Badges */}
            <div className="p-3.5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs text-amber-400 font-bold">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Anggota Resmi IKAPI No. {envConfig.publishing.ikapiNumber}</span>
              </div>
              <div className="text-[11px] text-slate-400 leading-normal">
                Kemitraan Resmi Perpustakaan Nasional RI (Perpusnas), DJKI Kemenkumham, serta Terakreditasi SINTA Kemdikbudristek RI.
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 flex items-center justify-center transition-colors font-bold text-xs"
                aria-label="Instagram"
              >
                IG
              </a>
              <a
                href="https://licyum.id"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-300 flex items-center justify-center transition-colors"
                aria-label="Website"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-300 flex items-center justify-center transition-colors"
                aria-label="Kontak Hotline"
              >
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Penerbitan & Toko Buku */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Penerbitan Buku</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => {
                    onSelectPillar('publishing');
                    scrollTo('seksi-penerbitan');
                  }}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Paket Penerbitan Hemat & Silver
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectPillar('publishing');
                    scrollTo('seksi-penerbitan');
                  }}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Pengurusan ISBN & Barcode Perpusnas
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectPillar('publishing');
                    scrollTo('seksi-penerbitan');
                  }}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Pendaftaran HAKI / Hak Cipta Kemenkumham
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectPillar('publishing');
                    scrollTo('seksi-penerbitan');
                  }}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Konversi Tesis & Disertasi Jadi Buku
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectPillar('publishing');
                    scrollTo('seksi-penerbitan');
                  }}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Katalog Buku Referensi & Monograf
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenStatusModal}
                  className="text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>Cek Status Penerbitan ISBN</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Portal E-Journal OJS */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Portal E-Journal</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => {
                    onSelectPillar('journal');
                    scrollTo('seksi-jurnal');
                  }}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Licyum Journal of Educational Technology (SINTA 2)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectPillar('journal');
                    scrollTo('seksi-jurnal');
                  }}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Jurnal Inovasi Sains & Terapan (SINTA 3)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectPillar('journal');
                    scrollTo('seksi-jurnal');
                  }}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Licyum Social & Economic Review (SINTA 3)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectPillar('journal');
                    scrollTo('seksi-jurnal');
                  }}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Panduan Penulis & Template IMRaD
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectPillar('journal');
                    scrollTo('seksi-jurnal');
                  }}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Layanan Cek Turnitin No-Repository
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenStatusModal}
                  className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>Tracking Review Naskah OJS</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Kontak & Kantor */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-sky-400" />
              <span>Kantor & Kontak</span>
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Kantor Pusat:</strong> Gedung Graha Licyum Edukasi Lt. 3, Jl. Margonda Raya No. 188, Jakarta Selatan 12610
                </span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Kantor Riset:</strong> Jl. Kaliurang KM 9.2, Ngaglik, Sleman, D.I. Yogyakarta 55581
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${envConfig.contact.phone.replace(/[^0-9]/g, '')}`} className="hover:text-white">
                  {envConfig.contact.phone} / {envConfig.contact.whatsapp}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${envConfig.contact.email}`} className="hover:text-white">
                  {envConfig.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-500 shrink-0" />
                <span>Senin - Sabtu: 08.00 - 17.00 WIB</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 <strong>PT Licyum Cipta Akademika</strong>. Hak cipta dilindungi undang-undang.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#kebijakan" className="hover:text-slate-300">Kebijakan Privasi</a>
            <span>•</span>
            <a href="#syarat" className="hover:text-slate-300">Syarat & Ketentuan</a>
            <span>•</span>
            <a href="#etika" className="hover:text-slate-300">Etika Publikasi (COPE)</a>
            <span>•</span>
            <a href="#peta" className="hover:text-slate-300">Peta Situs</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
