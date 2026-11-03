'use client';

import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  Award,
  ArrowRight,
  ShieldCheck,
  Send,
  Sparkles
} from 'lucide-react';
import { TrainingProgram } from '../types';
import { createWhatsAppLink } from '../lib/config';

interface RegisterTrainingModalProps {
  program: TrainingProgram | null;
  isOpen: boolean;
  onClose: () => void;
}

export const RegisterTrainingModal: React.FC<RegisterTrainingModalProps> = ({
  program,
  isOpen,
  onClose
}) => {
  const [formData, setFormData] = useState({
    name: '',
    institution: '',
    email: '',
    whatsapp: '',
    ticketTier: 'earlyBird',
    notes: ''
  });

  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !program) return null;

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(num);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  const selectedPrice =
    formData.ticketTier === 'earlyBird'
      ? program.earlyBirdPrice
      : program.price;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 p-5 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-sm">
            <Award className="w-5 h-5 text-slate-900" />
            <span>Formulir Pendaftaran Pelatihan & Workshop Resmi</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-black/10 hover:bg-black/20 text-slate-900 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Program Info Card */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0F2850] bg-blue-100 px-2 py-0.5 rounded">
              {program.category} • {program.durationJp} JP
            </span>
            <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {program.title}
            </h4>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1 font-semibold text-slate-700">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                {program.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {program.time}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                {program.method}
              </span>
            </div>
          </div>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Ticket Tier Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Pilihan Tiket / Skema Pembayaran:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setFormData({ ...formData, ticketTier: 'earlyBird' })}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      formData.ticketTier === 'earlyBird'
                        ? 'border-amber-500 bg-amber-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">Tiket Early Bird</span>
                      <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded font-bold">
                        Hemat!
                      </span>
                    </div>
                    <div className="text-lg font-extrabold text-[#0F2850] mt-1">
                      {formatRupiah(program.earlyBirdPrice)}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Termasuk e-sertifikat 32 JP, rekaman materi, & materi ajar.
                    </p>
                  </div>

                  <div
                    onClick={() => setFormData({ ...formData, ticketTier: 'regular' })}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      formData.ticketTier === 'regular'
                        ? 'border-amber-500 bg-amber-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">Tiket Regular</span>
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">
                        Standar
                      </span>
                    </div>
                    <div className="text-lg font-extrabold text-[#0F2850] mt-1">
                      {formatRupiah(program.price)}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Tarif normal bila kuota Early Bird telah habis.
                    </p>
                  </div>
                </div>
              </div>

              {/* Form inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nama Lengkap & Gelar (untuk Sertifikat) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Contoh: Dr. Budi Santoso, M.Pd."
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Asal Kampus / Sekolah / Institusi *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    placeholder="Contoh: Universitas Indonesia / SMA N 1"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nomor WhatsApp Aktif *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder="Contoh: 08123456789"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Alamat Email Aktif *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="nama@kampus.ac.id"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Harapan / Topik Khusus yang Ingin Dipelajari (Opsional)
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Ceritakan kendala atau kebutuhan Anda seputar materi pelatihan ini..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <div>
                  <span className="text-[11px] text-slate-500">Total Investasi Pelatihan:</span>
                  <div className="text-xl font-black text-[#0F2850]">
                    {formatRupiah(selectedPrice)}
                  </div>
                </div>

                <button
                  type="submit"
                  className="py-3 px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Kirim & Dapatkan Kursi</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          ) : (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-4 animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-black text-emerald-950">
                Pendaftaran Berhasil Dikirim!
              </h4>
              <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
                Terima kasih, <strong>{formData.name || 'Bapak/Ibu'}</strong>. Data Anda telah masuk ke sistem registrasi Licyum Institute. Invoice & tautan grup koordinasi WhatsApp akan dikirimkan ke nomor <strong>{formData.whatsapp || 'WhatsApp Anda'}</strong>.
              </p>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => {
                    const msg = `Halo Licyum, saya baru saja mendaftar pelatihan: ${program.title} atas nama ${formData.name}. Mohon info pembayaran & invoice.`;
                    window.open(createWhatsAppLink(msg), '_blank');
                  }}
                  className="py-2.5 px-5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <span>Konfirmasi Pembayaran via WhatsApp</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-slate-100 p-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Jaminan Pembelajaran Berkualitas & Sertifikat Resmi Terverifikasi
          </span>
          <button
            onClick={onClose}
            className="py-1.5 px-3 bg-white hover:bg-slate-200 text-slate-700 rounded-lg font-bold border border-slate-300"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
