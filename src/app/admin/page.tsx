"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Database,
  ExternalLink,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  BookOpen,
  GraduationCap,
  Award,
  ArrowLeft,
  FileCode,
  Save,
  X,
  Search,
  Sparkles
} from "lucide-react";

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  price: number;
  pages?: number;
  status?: string;
}

interface Training {
  id: string;
  title: string;
  instructor: string;
  event_date: string;
  location_type: string;
  price: number;
  status: string;
}

export default function AdminSupabaseDashboard() {
  const [activeTab, setActiveTab] = useState<"books" | "trainings" | "sql">("books");

  // Connection State
  const [connectionStatus, setConnectionStatus] = useState<{
    loading: boolean;
    connected: boolean;
    message: string;
    projectId: string;
    projectUrl: string;
  }>({
    loading: true,
    connected: false,
    message: "Memeriksa status koneksi ke Supabase...",
    projectId: "apdaijdbyunemscdbjsp",
    projectUrl: "https://apdaijdbyunemscdbjsp.supabase.co"
  });

  // Data States
  const [books, setBooks] = useState<Book[]>([]);
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State for Books
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [bookForm, setBookForm] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "Buku Ajar",
    price: 95000,
    pages: 200,
  });

  // Check Supabase Status
  const checkStatus = async () => {
    setConnectionStatus((prev) => ({ ...prev, loading: true }));
    try {
      const res = await fetch("/api/supabase/status");
      const data = await res.json();
      setConnectionStatus({
        loading: false,
        connected: data.connected,
        message: data.message,
        projectId: data.projectId || "apdaijdbyunemscdbjsp",
        projectUrl: data.projectUrl || "https://apdaijdbyunemscdbjsp.supabase.co"
      });
    } catch (err: any) {
      setConnectionStatus((prev) => ({
        ...prev,
        loading: false,
        connected: false,
        message: `Gagal menghubungi server API: ${err.message}`
      }));
    }
  };

  // Fetch Books
  const fetchBooks = async () => {
    setLoadingData(true);
    try {
      const res = await fetch("/api/books");
      const data = await res.json();
      if (data.success && data.data) {
        setBooks(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingData(false);
    }
  };

  // Fetch Trainings
  const fetchTrainings = async () => {
    try {
      const res = await fetch("/api/trainings");
      const data = await res.json();
      if (data.success && data.data) {
        setTrainings(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    checkStatus();
    fetchBooks();
    fetchTrainings();
  }, []);

  // Handle Save Book (Create / Update)
  const handleSaveBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookForm.title || !bookForm.author || !bookForm.isbn) {
      alert("Harap lengkapi judul, penulis, dan ISBN!");
      return;
    }

    try {
      if (editingBook) {
        // Update
        const res = await fetch(`/api/books/${editingBook.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookForm)
        });
        const data = await res.json();
        if (data.success) {
          alert("Buku berhasil diperbarui!");
          setIsBookModalOpen(false);
          setEditingBook(null);
          fetchBooks();
        } else {
          alert(`Gagal: ${data.message}`);
        }
      } else {
        // Create
        const res = await fetch("/api/books", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookForm)
        });
        const data = await res.json();
        if (data.success) {
          alert(data.message || "Buku berhasil ditambahkan!");
          setIsBookModalOpen(false);
          setBookForm({
            title: "",
            author: "",
            isbn: "",
            category: "Buku Ajar",
            price: 95000,
            pages: 200,
          });
          fetchBooks();
        } else {
          alert(`Gagal: ${data.message}`);
        }
      }
    } catch (err: any) {
      alert(`Terjadi kesalahan: ${err.message}`);
    }
  };

  // Handle Delete Book
  const handleDeleteBook = async (id: string, title: string) => {
    if (!confirm(`Hapus buku "${title}" dari database?`)) return;

    try {
      const res = await fetch(`/api/books/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setBooks((prev) => prev.filter((b) => b.id !== id));
      } else {
        alert(`Gagal menghapus: ${data.message}`);
      }
    } catch (err: any) {
      alert(`Kesalahan: ${err.message}`);
    }
  };

  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.isbn.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-slate-800 font-sans">
      
      {/* Top Header */}
      <header className="bg-[#0F2547] text-white border-b border-[#1B3B6F] py-3.5 px-4 sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <Link href="/" className="text-slate-300 hover:text-white flex items-center gap-1.5 text-xs font-semibold">
              <ArrowLeft className="w-4 h-4" />
              Portal Beranda
            </Link>
            <span className="text-slate-600">|</span>
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-[#F5B041]" />
              <h1 className="font-serif font-bold text-sm sm:text-base tracking-wide text-white">
                Admin & Supabase Hub — PT Licyum Cipta Akademika
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-300 hidden sm:inline font-mono">
              Project ID: <strong>apdaijdbyunemscdbjsp</strong>
            </span>
            <a
              href="https://supabase.com/dashboard/project/apdaijdbyunemscdbjsp/settings/general"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#F5B041] hover:bg-[#e5a030] text-[#0F2547] px-3 py-1.5 rounded-md font-bold flex items-center gap-1 transition-all"
            >
              <span>Buka Supabase ↗</span>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">

        {/* ===================================================================
            SUPABASE CONNECTION STATUS CARD
            =================================================================== */}
        <div className={`p-5 rounded-xl border shadow-sm transition-all ${
          connectionStatus.connected
            ? "bg-emerald-50/80 border-emerald-300 text-emerald-950"
            : "bg-amber-50/90 border-[#F5B041] text-amber-950"
        }`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                connectionStatus.connected ? "bg-emerald-600 text-white" : "bg-[#D48806] text-white"
              }`}>
                {connectionStatus.connected ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm sm:text-base">
                    {connectionStatus.connected
                      ? "Terhubung ke Supabase Database Aktif"
                      : "Supabase Siap Diintegrasikan"}
                  </h3>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/80 border">
                    {connectionStatus.projectId}
                  </span>
                </div>
                <p className="text-xs mt-1 leading-relaxed text-slate-700">
                  {connectionStatus.message}
                </p>
                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                  <a
                    href="https://supabase.com/dashboard/project/apdaijdbyunemscdbjsp/settings/api"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline decoration-[#0F2547] text-[#0F2547] flex items-center gap-1 hover:text-[#1B3B6F]"
                  >
                    1. Salin Anon Key dari Supabase API Settings ↗
                  </a>
                  <span className="text-slate-400">•</span>
                  <a
                    href="https://supabase.com/dashboard/project/apdaijdbyunemscdbjsp/sql/new"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline decoration-[#0F2547] text-[#0F2547] flex items-center gap-1 hover:text-[#1B3B6F]"
                  >
                    2. Eksekusi Schema di Supabase SQL Editor ↗
                  </a>
                </div>
              </div>
            </div>

            <button
              onClick={checkStatus}
              disabled={connectionStatus.loading}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs shrink-0 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${connectionStatus.loading ? "animate-spin" : ""}`} />
              <span>Tes Koneksi</span>
            </button>
          </div>
        </div>

        {/* ===================================================================
            TABS NAVIGATION
            =================================================================== */}
        <div className="flex border-b border-slate-200 gap-2">
          <button
            onClick={() => setActiveTab("books")}
            className={`pb-3 px-4 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === "books"
                ? "border-[#0F2547] text-[#0F2547]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Katalog Buku ({books.length})
          </button>
          <button
            onClick={() => setActiveTab("trainings")}
            className={`pb-3 px-4 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === "trainings"
                ? "border-[#0F2547] text-[#0F2547]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            Jadwal Pelatihan ({trainings.length})
          </button>
          <button
            onClick={() => setActiveTab("sql")}
            className={`pb-3 px-4 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === "sql"
                ? "border-[#0F2547] text-[#0F2547]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <FileCode className="w-4 h-4" />
            Script SQL Supabase
          </button>
        </div>

        {/* ===================================================================
            TAB 1: BUKU CRUD
            =================================================================== */}
        {activeTab === "books" && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden space-y-4 p-5">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Cari judul, penulis, atau ISBN..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F2547]"
                />
              </div>

              <button
                onClick={() => {
                  setEditingBook(null);
                  setBookForm({
                    title: "",
                    author: "",
                    isbn: `978-623-${Math.floor(10 + Math.random() * 89)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(Math.random() * 9)}`,
                    category: "Buku Ajar",
                    price: 95000,
                    pages: 220,
                  });
                  setIsBookModalOpen(true);
                }}
                className="bg-[#0F2547] hover:bg-[#1B3B6F] text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-2xs transition-colors shrink-0"
              >
                <Plus className="w-4 h-4" />
                Tambah Buku Baru
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-slate-100 rounded-lg">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0F2547] text-white uppercase text-[11px] font-semibold">
                  <tr>
                    <th className="py-2.5 px-4">Judul Buku & Penulis</th>
                    <th className="py-2.5 px-4">ISBN</th>
                    <th className="py-2.5 px-4">Kategori</th>
                    <th className="py-2.5 px-4">Harga</th>
                    <th className="py-2.5 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loadingData ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-400">
                        Memuat data buku...
                      </td>
                    </tr>
                  ) : filteredBooks.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-400">
                        Tidak ada data buku yang sesuai.
                      </td>
                    </tr>
                  ) : (
                    filteredBooks.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4">
                          <p className="font-semibold text-slate-800">{b.title}</p>
                          <p className="text-slate-500 text-[11px] mt-0.5">{b.author}</p>
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px] text-slate-600">
                          {b.isbn}
                        </td>
                        <td className="py-3 px-4">
                          <span className="bg-slate-100 text-[#0F2547] px-2 py-0.5 rounded text-[10px] font-bold">
                            {b.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-800">
                          Rp {b.price.toLocaleString("id-ID")}
                        </td>
                        <td className="py-3 px-4 text-right space-x-1.5">
                          <button
                            onClick={() => {
                              setEditingBook(b);
                              setBookForm({
                                title: b.title,
                                author: b.author,
                                isbn: b.isbn,
                                category: b.category,
                                price: b.price,
                                pages: b.pages || 200,
                              });
                              setIsBookModalOpen(true);
                            }}
                            className="p-1.5 text-slate-500 hover:text-[#0F2547] hover:bg-slate-100 rounded"
                            title="Edit"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteBook(b.id, b.title)}
                            className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded"
                            title="Hapus"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 2: PELATIHAN CRUD
            =================================================================== */}
        {activeTab === "trainings" && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-[#0F2547]">Jadwal Pelatihan & Workshop Aktif</h3>
              <button
                onClick={() => alert("Gunakan API POST /api/trainings untuk pendaftaran program baru.")}
                className="bg-[#0F2547] hover:bg-[#1B3B6F] text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" /> Tambah Pelatihan
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {trainings.map((t) => (
                <div key={t.id} className="p-4 border border-slate-200 rounded-lg hover:border-[#0F2547] transition-colors space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                    {t.status}
                  </span>
                  <h4 className="font-semibold text-xs text-[#0F2547] leading-snug line-clamp-2">{t.title}</h4>
                  <p className="text-[11px] text-slate-500">Instruktur: {t.instructor}</p>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-[#0F2547]">Rp {t.price.toLocaleString("id-ID")}</span>
                    <span className="text-slate-400 text-[10px]">{t.event_date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 3: SQL SCHEMA VIEWER
            =================================================================== */}
        {activeTab === "sql" && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-sm text-[#0F2547]">Schema SQL Lengkap Supabase</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Salin script SQL di bawah ini dan paste pada Supabase SQL Editor untuk membuat tabel dan RLS policies.
                </p>
              </div>
              <a
                href="https://supabase.com/dashboard/project/apdaijdbyunemscdbjsp/sql/new"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0F2547] hover:bg-[#1B3B6F] text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5"
              >
                <span>Buka SQL Editor Supabase</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#F5B041]" />
              </a>
            </div>

            <div className="p-4 bg-slate-900 text-slate-200 rounded-lg font-mono text-[11px] overflow-x-auto max-h-96 leading-relaxed">
              <pre>{`-- File: database/supabase_schema.sql
-- Silakan jalankan script ini di https://supabase.com/dashboard/project/apdaijdbyunemscdbjsp/sql/new

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. BERIKAN IZIN ROLE (Memperbaiki permission denied pada anon/publishable key)
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated, service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated, service_role;

-- 2. TABEL BUKU
CREATE TABLE IF NOT EXISTS public.books (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    isbn VARCHAR(50) UNIQUE,
    category VARCHAR(100) NOT NULL DEFAULT 'Buku Ajar',
    price NUMERIC(12, 2) NOT NULL DEFAULT 0,
    cover_url TEXT,
    synopsis TEXT,
    pages INTEGER DEFAULT 150,
    publisher VARCHAR(150) DEFAULT 'PT Licyum Cipta Akademika',
    status VARCHAR(50) DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABEL PELATIHAN
CREATE TABLE IF NOT EXISTS public.trainings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    instructor VARCHAR(255) NOT NULL,
    event_date VARCHAR(100) NOT NULL,
    location_type VARCHAR(50) DEFAULT 'Online (Zoom & LMS)',
    price NUMERIC(12, 2) NOT NULL DEFAULT 0,
    quota INTEGER DEFAULT 50,
    status VARCHAR(50) DEFAULT 'open',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. RLS POLICIES (Read & Write)
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trainings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public Read Books" ON public.books;
DROP POLICY IF EXISTS "Enable All Books" ON public.books;
CREATE POLICY "Public Read Books" ON public.books FOR SELECT USING (true);
CREATE POLICY "Enable All Books" ON public.books FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Read Trainings" ON public.trainings;
DROP POLICY IF EXISTS "Enable All Trainings" ON public.trainings;
CREATE POLICY "Public Read Trainings" ON public.trainings FOR SELECT USING (true);
CREATE POLICY "Enable All Trainings" ON public.trainings FOR ALL USING (true) WITH CHECK (true);`}</pre>
            </div>
          </div>
        )}

      </main>

      {/* ===================================================================
          MODAL: TAMBAH / EDIT BUKU
          =================================================================== */}
      {isBookModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setIsBookModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif font-bold text-[#0F2547] text-base mb-4">
              {editingBook ? "Edit Data Buku" : "Tambah Buku Baru ke Katalog"}
            </h3>

            <form onSubmit={handleSaveBook} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Judul Buku:</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Metodologi Penelitian Modern"
                  value={bookForm.title}
                  onChange={(e) => setBookForm({ ...bookForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F2547]"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Penulis:</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Prof. Dr. Hendra Wijaya"
                  value={bookForm.author}
                  onChange={(e) => setBookForm({ ...bookForm, author: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F2547]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">ISBN:</label>
                  <input
                    type="text"
                    required
                    placeholder="978-623-..."
                    value={bookForm.isbn}
                    onChange={(e) => setBookForm({ ...bookForm, isbn: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F2547]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Kategori:</label>
                  <select
                    value={bookForm.category}
                    onChange={(e) => setBookForm({ ...bookForm, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F2547]"
                  >
                    <option>Buku Ajar</option>
                    <option>Monograf Riset</option>
                    <option>Referensi</option>
                    <option>Buku Guru</option>
                    <option>Umum</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Harga (Rp):</label>
                  <input
                    type="number"
                    required
                    value={bookForm.price}
                    onChange={(e) => setBookForm({ ...bookForm, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F2547]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Jumlah Halaman:</label>
                  <input
                    type="number"
                    value={bookForm.pages}
                    onChange={(e) => setBookForm({ ...bookForm, pages: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F2547]"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsBookModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0F2547] hover:bg-[#1B3B6F] text-white rounded-lg font-semibold"
                >
                  {editingBook ? "Perbarui Buku" : "Simpan Buku"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
