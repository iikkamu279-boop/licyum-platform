'use client';

import React from 'react';
import {
  X,
  Star,
  BookOpen,
  Calendar,
  Layers,
  ShieldCheck,
  ShoppingCart,
  Share2,
  CheckCircle,
  Truck,
  BookMarked
} from 'lucide-react';
import { BookItem } from '../types';
import { createWhatsAppLink } from '../lib/config';

interface BookDetailModalProps {
  book: BookItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({
  book,
  isOpen,
  onClose
}) => {
  if (!isOpen || !book) return null;

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(num);
  };

  const discount = Math.round(
    ((book.originalPrice - book.price) / book.originalPrice) * 100
  );

  const handleOrderWhatsApp = () => {
    const text = `Halo Admin Penerbit Licyum, saya tertarik memesan buku berikut:\n\n*Judul:* ${book.title}\n*Penulis:* ${book.author}\n*ISBN:* ${book.isbn}\n*Harga Promo:* ${formatRupiah(book.price)}\n\nMohon info ketersediaan stok & ongkos kirim ke alamat saya. Terima kasih!`;
    window.open(createWhatsAppLink(text), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#0F2850] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold uppercase tracking-wider">
            <BookMarked className="w-4 h-4" />
            <span>Katalog Penerbitan Licyum • Anggota IKAPI</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Book Cover */}
            <div className="flex flex-col items-center">
              <div className="relative w-48 sm:w-full max-w-[220px] rounded-2xl overflow-hidden shadow-xl border border-slate-200">
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-full h-auto object-cover"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-[#0F2850] text-white">
                  {book.category}
                </span>
                {discount > 0 && (
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-black bg-rose-500 text-white">
                    -{discount}%
                  </span>
                )}
              </div>

              <div className="mt-4 w-full text-center space-y-1">
                <div className="text-xs text-slate-500">Kondisi: <strong>100% Buku Baru / Asli</strong></div>
                <div className="text-xs text-emerald-600 font-semibold flex items-center justify-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Stok Tersedia
                </div>
              </div>
            </div>

            {/* Book Details */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="flex text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="ml-1 text-xs font-bold text-slate-800">{book.rating}</span>
                  </div>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs text-slate-500">({book.reviewsCount} Ulasan Pembaca)</span>
                </div>

                <h3 className="text-lg sm:text-2xl font-black text-slate-900 leading-snug">
                  {book.title}
                </h3>

                <p className="text-sm font-semibold text-[#0F2850] mt-1">
                  {book.author}
                </p>
                <p className="text-xs text-slate-500">
                  {book.authorTitle}
                </p>
              </div>

              {/* Pricing banner */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-baseline gap-3">
                <span className="text-2xl font-black text-[#0F2850]">
                  {formatRupiah(book.price)}
                </span>
                {book.originalPrice > book.price && (
                  <span className="text-sm text-slate-400 line-through">
                    {formatRupiah(book.originalPrice)}
                  </span>
                )}
                <span className="ml-auto text-xs font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                  Diskon Spesial Akademisi
                </span>
              </div>

              {/* Specs Table */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-slate-400 block text-[11px]">ISBN:</span>
                  <span className="font-mono font-bold text-slate-800">{book.isbn}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Tahun Terbit:</span>
                  <span className="font-bold text-slate-800">{book.year}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Halaman:</span>
                  <span className="font-bold text-slate-800">{book.pages} Hal.</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Kertas:</span>
                  <span className="font-bold text-slate-800">Bookpaper 72g</span>
                </div>
              </div>

              {/* Synopsis */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Sinopsis / Deskripsi Buku:
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white p-3.5 rounded-xl border border-slate-100">
                  {book.synopsis}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {book.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[11px] bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg border border-slate-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-100 p-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Truck className="w-4 h-4 text-emerald-600" />
            <span>Pengiriman aman bubble wrap ke seluruh Indonesia</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="py-2.5 px-4 bg-white hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold border border-slate-300 transition-colors"
            >
              Tutup
            </button>
            <button
              onClick={handleOrderWhatsApp}
              className="flex-1 sm:flex-initial py-2.5 px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Pesan Sekarang (WhatsApp)</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
