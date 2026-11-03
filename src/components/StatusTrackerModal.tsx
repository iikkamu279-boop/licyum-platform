'use client';

import React, { useState } from 'react';
import {
  X,
  Search,
  CheckCircle2,
  Clock,
  BookOpen,
  FileText,
  Award,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { STATUS_TRACKING_SAMPLES } from '../data/dummyData';
import { StatusTrackingRecord } from '../types';
import { createWhatsAppLink } from '../lib/config';

interface StatusTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: 'ISBN' | 'NASKAH_JURNAL' | 'SERTIFIKAT';
}

export const StatusTrackerModal: React.FC<StatusTrackerModalProps> = ({
  isOpen,
  onClose,
  defaultType = 'ISBN'
}) => {
  const [activeTab, setActiveTab] = useState<'ISBN' | 'NASKAH_JURNAL' | 'SERTIFIKAT'>(defaultType);
  const [trackingInput, setTrackingInput] = useState<string>('ISBN-9281-2024');
  const [trackingResult, setTrackingResult] = useState<StatusTrackingRecord | null>(
    STATUS_TRACKING_SAMPLES['ISBN-9281-2024']
  );
  const [hasSearched, setHasSearched] = useState<boolean>(true);

  if (!isOpen) return null;

  const handleTabChange = (tab: 'ISBN' | 'NASKAH_JURNAL' | 'SERTIFIKAT') => {
    setActiveTab(tab);
    let sampleCode = '';
    if (tab === 'ISBN') sampleCode = 'ISBN-9281-2024';
    if (tab === 'NASKAH_JURNAL') sampleCode = 'JRN-REV-304';
    if (tab === 'SERTIFIKAT') sampleCode = 'SRT-VER-882';

    setTrackingInput(sampleCode);
    setTrackingResult(STATUS_TRACKING_SAMPLES[sampleCode] || null);
    setHasSearched(true);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const cleaned = trackingInput.trim().toUpperCase();

    if (STATUS_TRACKING_SAMPLES[cleaned]) {
      setTrackingResult(STATUS_TRACKING_SAMPLES[cleaned]);
    } else {
      // Dynamic fallback simulation
      setTrackingResult({
        trackingCode: cleaned,
        type: activeTab,
        title: `Pelacakan Dokumen ${cleaned}`,
        applicant: 'Akademisi Terdaftar Licyum',
        submissionDate: '15 Januari 2025',
        currentStep:
          activeTab === 'ISBN'
            ? 'Pemeriksaan Berkas Tata Letak & Formulir Perpusnas'
            : activeTab === 'NASKAH_JURNAL'
            ? 'Tahap Reviewer Kedua (Double Blind Review)'
            : 'Penerbitan Nomor Induk Sertifikat Nasional',
        statusPercent: 50,
        statusLabel: 'Proses Review',
        notes: 'Dokumen sedang diproses sesuai SLA layanan Licyum. Tim kami akan memperbarui status secara berkala.'
      });
    }
  };

  const getStatusBadgeColor = (label: string) => {
    switch (label) {
      case 'Terbit & Final':
      case 'Disetujui Perpusnas':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Proses Review':
        return 'bg-blue-100 text-[#0F2850] border-blue-300';
      case 'Revisi Diperlukan':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-[#0F2850] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold">
                Layanan Cek Status Terpadu Licyum
              </h3>
              <p className="text-xs text-slate-300">
                Lacak penerbitan ISBN, perkembangan naskah jurnal OJS, atau verifikasi sertifikat
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {/* Service Selector Tabs */}
          <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1.5 rounded-2xl text-xs font-bold">
            <button
              onClick={() => handleTabChange('ISBN')}
              className={`py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'ISBN'
                  ? 'bg-white text-[#0F2850] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Status ISBN Buku</span>
            </button>
            <button
              onClick={() => handleTabChange('NASKAH_JURNAL')}
              className={`py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'NASKAH_JURNAL'
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>Naskah Jurnal</span>
            </button>
            <button
              onClick={() => handleTabChange('SERTIFIKAT')}
              className={`py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'SERTIFIKAT'
                  ? 'bg-white text-amber-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Award className="w-4 h-4 text-amber-600" />
              <span>Sertifikat Pelatihan</span>
            </button>
          </div>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="space-y-2">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={trackingInput}
                  onChange={(e) => setTrackingInput(e.target.value)}
                  placeholder={
                    activeTab === 'ISBN'
                      ? 'Ketik kode tracking (misal: ISBN-9281-2024)'
                      : activeTab === 'NASKAH_JURNAL'
                      ? 'Ketik ID naskah OJS (misal: JRN-REV-304)'
                      : 'Ketik nomor sertifikat (misal: SRT-VER-882)'
                  }
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#0F2850]"
                  required
                />
              </div>
              <button
                type="submit"
                className="py-2.5 px-5 bg-[#0F2850] hover:bg-[#1E3A8A] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all shrink-0 cursor-pointer"
              >
                Lacak
              </button>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <span>Sampel cepat: </span>
              <button
                type="button"
                onClick={() => {
                  setTrackingInput('ISBN-9281-2024');
                  setActiveTab('ISBN');
                  setTrackingResult(STATUS_TRACKING_SAMPLES['ISBN-9281-2024']);
                }}
                className="text-blue-700 underline font-mono"
              >
                ISBN-9281-2024
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => {
                  setTrackingInput('JRN-REV-304');
                  setActiveTab('NASKAH_JURNAL');
                  setTrackingResult(STATUS_TRACKING_SAMPLES['JRN-REV-304']);
                }}
                className="text-emerald-700 underline font-mono"
              >
                JRN-REV-304
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => {
                  setTrackingInput('SRT-VER-882');
                  setActiveTab('SERTIFIKAT');
                  setTrackingResult(STATUS_TRACKING_SAMPLES['SRT-VER-882']);
                }}
                className="text-amber-700 underline font-mono"
              >
                SRT-VER-882
              </button>
            </div>
          </form>

          {/* Result Card */}
          {hasSearched && trackingResult && (
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
              
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div>
                  <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                    Kode Tracking:
                  </span>
                  <div className="font-mono text-sm font-black text-slate-900">
                    {trackingResult.trackingCode}
                  </div>
                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full font-bold border ${getStatusBadgeColor(
                    trackingResult.statusLabel
                  )}`}
                >
                  {trackingResult.statusLabel}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm leading-snug">
                  {trackingResult.title}
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  <strong>Pemohon/Penulis:</strong> {trackingResult.applicant}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Tanggal Pengajuan: {trackingResult.submissionDate}
                </p>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
                  <span>Tahapan Saat Ini:</span>
                  <span className="text-[#0F2850]">{trackingResult.statusPercent}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-[#0F2850] rounded-full transition-all duration-500"
                    style={{ width: `${trackingResult.statusPercent}%` }}
                  />
                </div>
                <p className="text-xs text-[#0F2850] font-semibold mt-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{trackingResult.currentStep}</span>
                </p>
              </div>

              {/* Notes */}
              <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
                <strong className="text-slate-800">Catatan Tim Redaksi:</strong> {trackingResult.notes}
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">
                  Terakhir diperbarui: Hari ini, 09.30 WIB
                </span>
                <a
                  href={createWhatsAppLink(`Halo Licyum, saya ingin menanyakan progres ${trackingResult.trackingCode}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#0F2850] hover:text-amber-600 flex items-center gap-1"
                >
                  <span>Chat Tim Pendamping</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 p-4 border-t border-slate-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold transition-colors"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
