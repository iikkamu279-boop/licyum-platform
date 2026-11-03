'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  ShieldCheck,
  Layers,
  Sparkles,
  Search,
  ShoppingCart,
  Star,
  CheckCircle,
  ArrowRight,
  Bookmark,
  FileCheck,
  Send,
  HelpCircle,
  Percent
} from 'lucide-react';
import { BookItem } from '../types';
import { BOOKS_DATA, PUBLISHING_SERVICES } from '../data/dummyData';
import { createWhatsAppLink } from '../lib/config';

interface BookSectionProps {
  onSelectBook: (book: BookItem) => void;
  onOpenPublishingModal: (packageId: string) => void;
  searchFilter?: string;
}

export const BookSection: React.FC<BookSectionProps> = ({
  onSelectBook,
  onOpenPublishingModal,
  searchFilter = ''
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [localSearch, setLocalSearch] = useState<string>('');
  const [activePackageTab, setActivePackageTab] = useState<number>(0);

  const categories = [
    'Semua',
    'Pendidikan',
    'Teknologi & AI',
    'Manajemen & Bisnis',
    'Hukum',
    'Kesehatan & Medis',
    'Sosial Humaniora'
  ];

  const effectiveSearch = searchFilter || localSearch;

  const filteredBooks = BOOKS_DATA.filter((book) => {
    const matchesCategory =
      selectedCategory === 'Semua' || book.category === selectedCategory;
    const matchesSearch =
      effectiveSearch.trim() === '' ||
      book.title.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
      book.author.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
      book.isbn.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
      book.tags.some((tag) =>
        tag.toLowerCase().includes(effectiveSearch.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <section id="seksi-penerbitan" className="py-16 sm:py-20 bg-slate-50/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#0F2850] text-xs font-bold uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Pilar 1: Penerbitan & Toko Buku</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Penerbitan Buku Ber-ISBN Resmi & Katalog Akademik
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
              Inspirasi tata letak katalog terpadu ala Penerbit KBM. Menerbitkan naskah ilmiah, buku ajar, monograf, dan konversi tugas akhir dengan royalti 100% dan legalitas HAKI.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white px-3.5 py-2 rounded-xl border border-slate-200 self-start md:self-auto">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>Anggota IKAPI No. 612/DKI/2022</span>
          </div>
        </div>

        {/* 1. Sub-Menu Layanan Cepat Penerbitan (3 Layanan Utama) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {PUBLISHING_SERVICES.map((service, index) => {
            const Icon =
              service.id === 'paket-penerbitan'
                ? BookOpen
                : service.id === 'isbn-haki'
                ? ShieldCheck
                : Layers;

            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0F2850] group-hover:bg-[#0F2850] group-hover:text-amber-400 transition-colors flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-[#0F2850] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs font-semibold text-amber-700 mb-2">
                    {service.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Highlights or pricing peek */}
                  {service.highlights && (
                    <ul className="space-y-1.5 border-t border-slate-100 pt-3 text-xs text-slate-600">
                      {service.highlights.map((hl, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {service.packages && (
                    <div className="border-t border-slate-100 pt-3">
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Pilihan Paket Populer:
                      </div>
                      <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
                        {service.packages.map((pkg, i) => (
                          <div
                            key={i}
                            className={`p-1.5 rounded-lg border ${
                              pkg.isPopular
                                ? 'bg-blue-50 border-blue-300 font-bold text-[#0F2850]'
                                : 'bg-slate-50 border-slate-200 text-slate-700'
                            }`}
                          >
                            <div className="truncate text-[10px]">{pkg.name.split(' ')[1]}</div>
                            <div className="text-[11px] font-extrabold text-amber-700">{pkg.price.split(' ')[1]}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100">
                  <button
                    onClick={() => onOpenPublishingModal(service.id)}
                    className="w-full py-2.5 px-4 bg-slate-900 hover:bg-[#0F2850] text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Konsultasi & Ajukan Layanan</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2. Katalog Buku Terbaru (Gaya Penerbit KBM) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Katalog Buku Terbaru & Terlaris
                </h3>
                <span className="px-2.5 py-0.5 bg-blue-100 text-[#0F2850] rounded-full text-xs font-bold">
                  {filteredBooks.length} Judul Tersedia
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Koleksi buku referensi, monograf, dan ajar karya dosen & ilmuwan se-Indonesia. Siap dikirim ke seluruh nusantara.
              </p>
            </div>

            {/* Quick in-catalog Search Bar */}
            <div className="relative w-full lg:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Cari judul / penulis buku..."
                className="w-full pl-10 pr-3 py-2 text-xs sm:text-sm bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F2850] focus:bg-white"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 text-xs font-semibold scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0F2850] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Books Grid: 4 Columns on Desktop */}
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredBooks.map((book) => {
                const discount = Math.round(
                  ((book.originalPrice - book.price) / book.originalPrice) * 100
                );

                return (
                  <div
                    key={book.id}
                    className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
                  >
                    {/* Book Cover Container */}
                    <div
                      onClick={() => onSelectBook(book)}
                      className="relative bg-slate-100 h-64 overflow-hidden cursor-pointer flex items-center justify-center p-4 group"
                    >
                      <img
                        src={book.coverUrl}
                        alt={book.title}
                        className="h-full object-cover rounded-lg shadow-md group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />

                      {/* Category Badge */}
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-white/95 text-[#0F2850] shadow-sm backdrop-blur-sm border border-slate-200">
                        {book.category}
                      </span>

                      {/* Discount Badge */}
                      {discount > 0 && (
                        <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-black bg-rose-500 text-white shadow-sm">
                          -{discount}%
                        </span>
                      )}

                      {/* Overlay hover prompt */}
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="px-3 py-1.5 rounded-lg bg-white text-slate-900 font-bold text-xs shadow-lg">
                          Lihat Sinopsis
                        </span>
                      </div>
                    </div>

                    {/* Book Details */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Rating & Review */}
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5">
                          <div className="flex items-center text-amber-500">
                            <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                            <span className="ml-1 font-bold text-slate-800">{book.rating}</span>
                          </div>
                          <span>•</span>
                          <span className="text-[11px]">({book.reviewsCount} ulasan)</span>
                          <span className="ml-auto text-[10px] text-slate-400 font-mono">
                            {book.pages} Hal.
                          </span>
                        </div>

                        {/* Title */}
                        <h4
                          onClick={() => onSelectBook(book)}
                          className="font-bold text-slate-900 text-sm leading-snug hover:text-[#0F2850] cursor-pointer transition-colors line-clamp-2 mb-1"
                          title={book.title}
                        >
                          {book.title}
                        </h4>

                        {/* Author */}
                        <p className="text-xs text-slate-600 line-clamp-1 font-medium mb-2">
                          {book.author}
                        </p>

                        {/* ISBN info snippet */}
                        <div className="text-[10px] text-slate-400 font-mono mb-3 bg-slate-50 px-2 py-1 rounded border border-slate-100 flex items-center justify-between">
                          <span>ISBN: {book.isbn}</span>
                          <span className="font-sans font-medium text-slate-500">{book.year}</span>
                        </div>
                      </div>

                      {/* Price & Action Buttons */}
                      <div className="pt-3 border-t border-slate-100">
                        <div className="flex items-baseline gap-2 mb-3">
                          <span className="text-base font-extrabold text-[#0F2850]">
                            {formatRupiah(book.price)}
                          </span>
                          {book.originalPrice > book.price && (
                            <span className="text-xs text-slate-400 line-through">
                              {formatRupiah(book.originalPrice)}
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => onSelectBook(book)}
                            className="py-2 px-2.5 rounded-lg border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 font-semibold text-xs transition-colors text-center"
                          >
                            Detail
                          </button>
                          <button
                            onClick={() => {
                              const message = `Halo Admin Licyum, saya ingin memesan buku: "${book.title}" (ISBN: ${book.isbn}) seharga ${formatRupiah(book.price)}.`;
                              window.open(createWhatsAppLink(message), '_blank');
                            }}
                            className="py-2 px-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                            <span>Beli</span>
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h4 className="text-base font-bold text-slate-700">
                Tidak ada buku yang sesuai pencarian "{effectiveSearch}"
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Silakan coba kata kunci lain atau pilih kategori "Semua".
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('Semua');
                  setLocalSearch('');
                }}
                className="mt-3 px-4 py-2 bg-[#0F2850] text-white text-xs font-semibold rounded-lg"
              >
                Reset Filter
              </button>
            </div>
          )}

          {/* Catalog Footnote Banner */}
          <div className="mt-8 p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0F2850] text-white flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-slate-900">
                  Ingin Menerbitkan Buku Sendiri atau Mengubah Tesis Anda Jadi Buku Ber-ISBN?
                </h5>
                <p className="text-xs text-slate-600">
                  Konsultasikan naskah Anda bersama tim editor senior kami. Naskah Anda kami dampingi sampai cetak dan terdaftar di Perpusnas.
                </p>
              </div>
            </div>
            <button
              onClick={() => onOpenPublishingModal('paket-penerbitan')}
              className="px-5 py-2.5 bg-[#0F2850] hover:bg-[#1E3A8A] text-white rounded-xl text-xs font-bold transition-all shadow-md shrink-0 flex items-center gap-1.5"
            >
              <span>Ajukan Naskah Buku</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
