'use client';

import React from 'react';
import {
  BookOpen,
  FileText,
  Users,
  Award,
  Star,
  Quote,
  ShieldCheck,
  CheckCircle2,
  Building,
  GraduationCap
} from 'lucide-react';
import { METRICS_DATA, PARTNERS_DATA, TESTIMONIALS_DATA } from '../data/dummyData';

export const TrustSection: React.FC = () => {
  return (
    <section id="tentang-kami" className="py-16 sm:py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Counter Statistik Capaian */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-20">
          {METRICS_DATA.map((item, index) => {
            const Icon =
              item.icon === 'BookOpen'
                ? BookOpen
                : item.icon === 'FileText'
                ? FileText
                : item.icon === 'Users'
                ? Users
                : Award;

            return (
              <div
                key={index}
                className="bg-slate-50/70 rounded-3xl p-6 border border-slate-200/90 text-center hover:border-amber-400 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#0F2850] text-amber-400 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl sm:text-4xl font-black text-[#0F2850] tracking-tight mb-1">
                  {item.value}
                </div>
                <h4 className="text-sm font-bold text-slate-800 mb-1">
                  {item.label}
                </h4>
                <p className="text-xs text-slate-500">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* 2. Logo Mitra Perguruan Tinggi, Sekolah & Lembaga Resmi */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Jejaring Kemitraan & Pengindeks Resmi
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
              Dipercaya oleh Lebih dari 140+ Perguruan Tinggi & Lembaga Nasional
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {PARTNERS_DATA.map((partner, i) => (
              <div
                key={i}
                className="bg-slate-50 hover:bg-white rounded-2xl p-4 border border-slate-200/80 flex flex-col items-center justify-center text-center transition-all duration-200 hover:shadow-md hover:border-blue-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-200/70 group-hover:bg-[#0F2850] text-[#0F2850] group-hover:text-amber-400 flex items-center justify-center font-bold text-xs mb-2 transition-colors">
                  <Building className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-800 tracking-tight">
                  {partner.short}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Testimoni dari Dosen, Penulis & Peserta Pelatihan */}
        <div className="bg-gradient-to-br from-[#0F2850] via-[#143265] to-[#0A192F] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center max-w-2xl mx-auto mb-10 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold mb-2">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>Pengalaman Nyata Mitra & Alumni Licyum</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Apa Kata Para Akademisi dan Penulis Kami?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Komitmen kami adalah memberikan pendampingan yang hangat, transparan, dan berstandar akademik tinggi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {TESTIMONIALS_DATA.map((t) => (
              <div
                key={t.id}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 flex flex-col justify-between hover:bg-white/15 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md bg-amber-400 text-slate-950">
                      {t.serviceType}
                    </span>
                    <div className="flex text-amber-400">
                      {[...Array(t.rating)].map((_, idx) => (
                        <Star key={idx} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                  </div>

                  <Quote className="w-8 h-8 text-white/20 mb-2" />

                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic mb-6">
                    "{t.content}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-amber-400/80"
                  />
                  <div>
                    <h5 className="font-bold text-white text-sm">
                      {t.name}
                    </h5>
                    <p className="text-[11px] text-slate-300 leading-tight">
                      {t.title}
                    </p>
                    <p className="text-[10px] text-amber-300 font-medium mt-0.5">
                      {t.institution}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Social Proof Footer Pill */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              100% Hak Cipta & Royalti Milik Penulis
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Standar Review OJS Double-Blind
            </span>
            <span className="flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              Sertifikat Bernomor Induk Resmi
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
