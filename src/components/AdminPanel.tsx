'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Plus,
  Trash2,
  Edit3,
  CheckCircle,
  Database,
  BookOpen,
  FileSpreadsheet,
  GraduationCap,
  Award,
  RefreshCw,
  Search,
  Check,
  AlertTriangle,
  Sliders,
  Layers,
  Save
} from 'lucide-react';
import { LicyumDatabase } from '../lib/database';
import { BookItem, ArticleItem, TrainingProgram, CertificateRecord, StatusTrackingRecord } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onDataChanged: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose, onDataChanged }) => {
  const [activeTab, setActiveTab] = useState<'books' | 'articles' | 'trainings' | 'certificates' | 'tracking'>('books');
  const [notification, setNotification] = useState<string | null>(null);

  // Lists
  const [books, setBooks] = useState<BookItem[]>([]);
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [trainings, setTrainings] = useState<TrainingProgram[]>([]);
  const [certificates, setCertificates] = useState<CertificateRecord[]>([]);
  const [trackings, setTrackings] = useState<StatusTrackingRecord[]>([]);

  // Book Form State
  const [bookForm, setBookForm] = useState({
    title: '',
    author: '',
    authorTitle: '',
    category: 'Pendidikan' as BookItem['category'],
    price: 120000,
    originalPrice: 150000,
    isbn: '',
    pages: 280,
    year: 2026,
    synopsis: '',
    coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600'
  });
  const [editingBookId, setEditingBookId] = useState<string | null>(null);

  // Article Form State
  const [articleForm, setArticleForm] = useState({
    journalId: 'ljet',
    journalName: 'Licyum Journal of Educational Technology (LJET)',
    title: '',
    authors: '',
    affiliation: '',
    doi: '',
    volume: 'Vol. 5 No. 3 (2026)',
    abstract: '',
    keywords: ''
  });
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);

  // Training Form State
  const [trainingForm, setTrainingForm] = useState({
    title: '',
    category: 'Penulisan & Publikasi' as TrainingProgram['category'],
    instructorName: '',
    instructorRole: '',
    date: '',
    time: '08.30 - 16.00 WIB',
    durationJp: 32,
    method: 'Online (Zoom HD)' as TrainingProgram['method'],
    quota: 50,
    price: 650000,
    earlyBirdPrice: 450000
  });

  // Certificate Form State
  const [certForm, setCertForm] = useState({
    certificateNumber: `LCY-2026-EDU-${Math.floor(100 + Math.random() * 900)}`,
    participantName: '',
    programTitle: 'Pelatihan Penulisan Buku Ajar & Monograf Ber-ISBN Sesuai Standar BSNP',
    institution: '',
    issueDate: '28 Februari 2026',
    grade: 'Sangat Memuaskan (A)',
    jpTotal: 32
  });

  // Tracking Form State
  const [trackingForm, setTrackingForm] = useState({
    trackingCode: `ISBN-${Math.floor(1000 + Math.random() * 9000)}-2026`,
    type: 'ISBN' as StatusTrackingRecord['type'],
    title: '',
    applicant: '',
    currentStep: 'Penetapan Nomor ISBN & Barcode oleh Tim Perpusnas RI',
    statusPercent: 75,
    statusLabel: 'Disetujui Perpusnas' as StatusTrackingRecord['statusLabel'],
    notes: 'Draft final cover dan naskah telah divalidasi redaksi.'
  });

  const refreshAllData = () => {
    setBooks(LicyumDatabase.books.getAll());
    setArticles(LicyumDatabase.articles.getAll());
    setTrainings(LicyumDatabase.trainings.getAll());
    setCertificates(LicyumDatabase.certificates.getAll());
    setTrackings(LicyumDatabase.trackings.getAll());
    onDataChanged();
  };

  useEffect(() => {
    if (isOpen) {
      refreshAllData();
    }
  }, [isOpen]);

  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  if (!isOpen) return null;

  // 1. Book CRUD Handlers
  const handleSaveBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBookId) {
      LicyumDatabase.books.update(editingBookId, bookForm);
      showNotice(`Buku "${bookForm.title}" berhasil diperbarui!`);
      setEditingBookId(null);
    } else {
      LicyumDatabase.books.create({
        ...bookForm,
        rating: 5.0,
        reviewsCount: 1,
        tags: ['Akademisi', 'Terbitan Baru'],
        inStock: true
      });
      showNotice(`Buku baru "${bookForm.title}" berhasil ditambahkan!`);
    }
    setBookForm({
      title: '',
      author: '',
      authorTitle: '',
      category: 'Pendidikan',
      price: 120000,
      originalPrice: 150000,
      isbn: '',
      pages: 280,
      year: 2026,
      synopsis: '',
      coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600'
    });
    refreshAllData();
  };

  const handleEditBook = (book: BookItem) => {
    setEditingBookId(book.id);
    setBookForm({
      title: book.title,
      author: book.author,
      authorTitle: book.authorTitle,
      category: book.category,
      price: book.price,
      originalPrice: book.originalPrice,
      isbn: book.isbn,
      pages: book.pages,
      year: book.year,
      synopsis: book.synopsis,
      coverUrl: book.coverUrl
    });
  };

  const handleDeleteBook = (id: string, title: string) => {
    if (confirm(`Yakin ingin menghapus buku "${title}" dari database?`)) {
      LicyumDatabase.books.delete(id);
      showNotice(`Buku "${title}" berhasil dihapus.`);
      refreshAllData();
    }
  };

  // 2. Article CRUD Handlers
  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    const authorsArr = articleForm.authors.split(',').map((s) => s.trim());
    const keywordsArr = articleForm.keywords.split(',').map((s) => s.trim());

    if (editingArticleId) {
      LicyumDatabase.articles.update(editingArticleId, {
        ...articleForm,
        authors: authorsArr,
        keywords: keywordsArr
      });
      showNotice('Artikel ilmiah berhasil diperbarui!');
      setEditingArticleId(null);
    } else {
      LicyumDatabase.articles.create({
        ...articleForm,
        authors: authorsArr,
        keywords: keywordsArr,
        publicationDate: 'Terbitan Baru 2026',
        issue: 'Special Issue',
        citations: 0,
        pdfDownloadUrl: '#'
      });
      showNotice('Artikel baru berhasil dipublikasikan ke OJS!');
    }
    setArticleForm({
      journalId: 'ljet',
      journalName: 'Licyum Journal of Educational Technology (LJET)',
      title: '',
      authors: '',
      affiliation: '',
      doi: '',
      volume: 'Vol. 5 No. 3 (2026)',
      abstract: '',
      keywords: ''
    });
    refreshAllData();
  };

  const handleDeleteArticle = (id: string, title: string) => {
    if (confirm(`Hapus paper "${title}" dari repositori OJS?`)) {
      LicyumDatabase.articles.delete(id);
      showNotice('Artikel berhasil dihapus.');
      refreshAllData();
    }
  };

  // 3. Certificate CRUD Handlers
  const handleCreateCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    LicyumDatabase.certificates.create({
      ...certForm,
      status: 'VALID & TERVERIFIKASI',
      credentialId: `CRED-${Math.floor(10000 + Math.random() * 90000)}-LIC-2026`
    });
    showNotice(`E-Sertifikat ${certForm.certificateNumber} berhasil diterbitkan dan siap diverifikasi!`);
    setCertForm({
      certificateNumber: `LCY-2026-EDU-${Math.floor(100 + Math.random() * 900)}`,
      participantName: '',
      programTitle: 'Pelatihan Penulisan Buku Ajar & Monograf Ber-ISBN',
      institution: '',
      issueDate: '28 Februari 2026',
      grade: 'Sangat Memuaskan (A)',
      jpTotal: 32
    });
    refreshAllData();
  };

  const handleDeleteCertificate = (certNum: string) => {
    if (confirm(`Cabut / Hapus sertifikat nomor "${certNum}"?`)) {
      LicyumDatabase.certificates.delete(certNum);
      showNotice(`Sertifikat ${certNum} berhasil dicabut.`);
      refreshAllData();
    }
  };

  // 4. Tracking CRUD Handlers
  const handleSaveTracking = (e: React.FormEvent) => {
    e.preventDefault();
    LicyumDatabase.trackings.create({
      ...trackingForm,
      submissionDate: 'Hari Ini'
    });
    showNotice(`Status pelacakan ${trackingForm.trackingCode} berhasil diperbarui!`);
    refreshAllData();
  };

  const handleResetDatabase = () => {
    if (confirm('Apakah Anda yakin ingin me-reset seluruh database kembali ke data awal pabrik?')) {
      LicyumDatabase.resetDefaults();
      showNotice('Database Licyum berhasil di-reset ke data bawaan.');
      refreshAllData();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Admin Header */}
        <div className="bg-[#0A192F] text-white p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black tracking-tight text-white">
                  Licyum Ekosistem & Database CRUD Center
                </h3>
                <span className="text-[10px] font-bold bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-full uppercase">
                  Live Persistent
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Pusat kontrol data untuk Buku, Naskah Jurnal OJS, Pelatihan, E-Sertifikat, dan Tracking ISBN.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetDatabase}
              title="Reset ke Data Bawaan"
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
              <span>Reset DB</span>
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Floating Notification */}
        {notification && (
          <div className="bg-emerald-600 text-white px-4 py-2 text-xs font-bold flex items-center justify-between animate-fadeIn">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" />
              {notification}
            </span>
            <button onClick={() => setNotification(null)} className="text-white/80 hover:text-white">✕</button>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="bg-slate-100 px-6 py-2 border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('books')}
            className={`py-2 px-3.5 rounded-xl flex items-center gap-1.5 transition-all ${
              activeTab === 'books'
                ? 'bg-white text-[#0F2850] shadow-sm font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span>1. Kelola Buku ({books.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('articles')}
            className={`py-2 px-3.5 rounded-xl flex items-center gap-1.5 transition-all ${
              activeTab === 'articles'
                ? 'bg-white text-emerald-800 shadow-sm font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>2. Kelola Jurnal & Artikel ({articles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('trainings')}
            className={`py-2 px-3.5 rounded-xl flex items-center gap-1.5 transition-all ${
              activeTab === 'trainings'
                ? 'bg-white text-amber-800 shadow-sm font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-amber-600" />
            <span>3. Kelola Pelatihan ({trainings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('certificates')}
            className={`py-2 px-3.5 rounded-xl flex items-center gap-1.5 transition-all ${
              activeTab === 'certificates'
                ? 'bg-white text-purple-800 shadow-sm font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-4 h-4 text-purple-600" />
            <span>4. Penerbitan Sertifikat ({certificates.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('tracking')}
            className={`py-2 px-3.5 rounded-xl flex items-center gap-1.5 transition-all ${
              activeTab === 'tracking'
                ? 'bg-white text-rose-800 shadow-sm font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4 text-rose-600" />
            <span>5. Progres Tracking ({trackings.length})</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: KELOLA BUKU CRUD */}
          {activeTab === 'books' && (
            <div className="space-y-6">
              
              {/* Form Tambah/Edit Buku */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                    <Plus className="w-4 h-4 text-blue-600" />
                    <span>{editingBookId ? 'Edit Data Buku' : 'Tambah Buku Baru ke Katalog'}</span>
                  </h4>
                  {editingBookId && (
                    <button
                      onClick={() => setEditingBookId(null)}
                      className="text-xs text-rose-600 font-bold hover:underline"
                    >
                      Batal Edit
                    </button>
                  )}
                </div>

                <form onSubmit={handleSaveBook} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1">Judul Buku *</label>
                    <input
                      type="text"
                      required
                      value={bookForm.title}
                      onChange={(e) => setBookForm({ ...bookForm, title: e.target.value })}
                      placeholder="Contoh: Metodologi Penelitian Tindakan Kelas Kontemporer"
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Kategori *</label>
                    <select
                      value={bookForm.category}
                      onChange={(e) => setBookForm({ ...bookForm, category: e.target.value as any })}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl"
                    >
                      <option value="Pendidikan">Pendidikan</option>
                      <option value="Teknologi & AI">Teknologi & AI</option>
                      <option value="Manajemen & Bisnis">Manajemen & Bisnis</option>
                      <option value="Hukum">Hukum</option>
                      <option value="Kesehatan & Medis">Kesehatan & Medis</option>
                      <option value="Sosial Humaniora">Sosial Humaniora</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Penulis *</label>
                    <input
                      type="text"
                      required
                      value={bookForm.author}
                      onChange={(e) => setBookForm({ ...bookForm, author: e.target.value })}
                      placeholder="Dr. Nama Penulis, M.Pd."
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Gelar / Afiliasi</label>
                    <input
                      type="text"
                      value={bookForm.authorTitle}
                      onChange={(e) => setBookForm({ ...bookForm, authorTitle: e.target.value })}
                      placeholder="Dosen Pascasarjana UNY"
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Nomor ISBN *</label>
                    <input
                      type="text"
                      required
                      value={bookForm.isbn}
                      onChange={(e) => setBookForm({ ...bookForm, isbn: e.target.value })}
                      placeholder="978-623-8891-xx-x"
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Harga Diskon (Rp) *</label>
                    <input
                      type="number"
                      required
                      value={bookForm.price}
                      onChange={(e) => setBookForm({ ...bookForm, price: Number(e.target.value) })}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Harga Asli (Coret) (Rp)</label>
                    <input
                      type="number"
                      value={bookForm.originalPrice}
                      onChange={(e) => setBookForm({ ...bookForm, originalPrice: Number(e.target.value) })}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Jumlah Halaman</label>
                    <input
                      type="number"
                      value={bookForm.pages}
                      onChange={(e) => setBookForm({ ...bookForm, pages: Number(e.target.value) })}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block font-bold text-slate-700 mb-1">Sinopsis Ringkas</label>
                    <textarea
                      rows={2}
                      value={bookForm.synopsis}
                      onChange={(e) => setBookForm({ ...bookForm, synopsis: e.target.value })}
                      placeholder="Ringkasan naskah buku..."
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div className="sm:col-span-3 flex justify-end">
                    <button
                      type="submit"
                      className="py-2.5 px-6 bg-[#0F2850] hover:bg-[#1E3A8A] text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5"
                    >
                      <Save className="w-4 h-4" />
                      <span>{editingBookId ? 'Simpan Perubahan Buku' : 'Tambah Buku ke Database'}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Tabel Daftar Buku */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                  <h4 className="font-black text-slate-900 text-sm">Daftar Buku di Database ({books.length})</h4>
                  <span className="text-xs text-slate-500">Perubahan langsung tampil di halaman depan</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="p-3">Cover</th>
                        <th className="p-3">Judul & Kategori</th>
                        <th className="p-3">Penulis</th>
                        <th className="p-3">ISBN</th>
                        <th className="p-3">Harga</th>
                        <th className="p-3 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {books.map((b) => (
                        <tr key={b.id} className="hover:bg-slate-50/80">
                          <td className="p-3">
                            <img src={b.coverUrl} className="w-10 h-14 object-cover rounded shadow" />
                          </td>
                          <td className="p-3">
                            <strong className="text-slate-900 block font-bold">{b.title}</strong>
                            <span className="text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-bold">{b.category}</span>
                          </td>
                          <td className="p-3 text-slate-600">{b.author}</td>
                          <td className="p-3 font-mono text-slate-500">{b.isbn}</td>
                          <td className="p-3 font-black text-[#0F2850]">Rp {b.price.toLocaleString('id-ID')}</td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleEditBook(b)}
                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                                title="Edit Buku"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteBook(b.id, b.title)}
                                className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                                title="Hapus Buku"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: KELOLA ARTIKEL JURNAL CRUD */}
          {activeTab === 'articles' && (
            <div className="space-y-6">
              
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-emerald-600" />
                  <span>Publikasikan Artikel Baru ke Portal E-Journal OJS</span>
                </h4>

                <form onSubmit={handleSaveArticle} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Target E-Journal *</label>
                    <select
                      value={articleForm.journalId}
                      onChange={(e) => {
                        const id = e.target.value;
                        const name =
                          id === 'ljet'
                            ? 'Licyum Journal of Educational Technology (LJET)'
                            : id === 'jist'
                            ? 'Jurnal Inovasi Sains & Terapan (JIST)'
                            : id === 'lser'
                            ? 'Licyum Social & Economic Review (LSER)'
                            : 'Jurnal Konseling & Psikologi Terapan (JKPT)';
                        setArticleForm({ ...articleForm, journalId: id, journalName: name });
                      }}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl"
                    >
                      <option value="ljet">LJET (SINTA 2)</option>
                      <option value="jist">JIST (SINTA 3)</option>
                      <option value="lser">LSER (SINTA 3)</option>
                      <option value="jkpt">JKPT (SINTA 4)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1">Judul Paper / Naskah Ilmiah *</label>
                    <input
                      type="text"
                      required
                      value={articleForm.title}
                      onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                      placeholder="Contoh: Analisis Komparasi Model Pembelajaran Berbasis AI..."
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Nama Penulis (Pisahkan Koma) *</label>
                    <input
                      type="text"
                      required
                      value={articleForm.authors}
                      onChange={(e) => setArticleForm({ ...articleForm, authors: e.target.value })}
                      placeholder="Budi Santoso, Dr. Ratna Dewi"
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Afiliasi Penulis *</label>
                    <input
                      type="text"
                      required
                      value={articleForm.affiliation}
                      onChange={(e) => setArticleForm({ ...articleForm, affiliation: e.target.value })}
                      placeholder="Universitas Indonesia"
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Nomor DOI *</label>
                    <input
                      type="text"
                      required
                      value={articleForm.doi}
                      onChange={(e) => setArticleForm({ ...articleForm, doi: e.target.value })}
                      placeholder="10.58921/ljet.v5i3.290"
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-mono"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block font-bold text-slate-700 mb-1">Abstrak *</label>
                    <textarea
                      rows={2}
                      required
                      value={articleForm.abstract}
                      onChange={(e) => setArticleForm({ ...articleForm, abstract: e.target.value })}
                      placeholder="Abstrak naskah..."
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div className="sm:col-span-3 flex justify-end">
                    <button
                      type="submit"
                      className="py-2.5 px-6 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow transition-all flex items-center gap-1.5"
                    >
                      <Save className="w-4 h-4" />
                      <span>Simpan & Terbitkan Paper ke OJS</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Tabel Artikel */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 font-bold uppercase text-slate-600">
                    <tr>
                      <th className="p-3">Jurnal</th>
                      <th className="p-3">Judul Paper</th>
                      <th className="p-3">Penulis</th>
                      <th className="p-3">DOI</th>
                      <th className="p-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {articles.map((art) => (
                      <tr key={art.id} className="hover:bg-slate-50/80">
                        <td className="p-3">
                          <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {art.journalName.split(' ')[0]}
                          </span>
                        </td>
                        <td className="p-3 font-bold text-slate-900 max-w-xs truncate">{art.title}</td>
                        <td className="p-3 text-slate-600">{art.authors.join(', ')}</td>
                        <td className="p-3 font-mono text-slate-500">{art.doi}</td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => handleDeleteArticle(art.id, art.title)}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                            title="Hapus Paper"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* TAB 4: PENERBITAN SERTIFIKAT CRUD (Highlight) */}
          {activeTab === 'certificates' && (
            <div className="space-y-6">
              
              <div className="bg-purple-50/70 p-5 rounded-2xl border border-purple-200 space-y-3">
                <h4 className="text-sm font-black text-purple-950 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-purple-700" />
                  <span>Penerbitan E-Sertifikat Resmi 32-40 JP Baru</span>
                </h4>
                <p className="text-xs text-purple-900">
                  Sertifikat yang diterbitkan di sini langsung terdaftar di pangkalan data publik dan dapat diverifikasi oleh peserta melalui fitur "Verifikasi Sertifikat".
                </p>

                <form onSubmit={handleCreateCertificate} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Nomor Sertifikat Resmi *</label>
                    <input
                      type="text"
                      required
                      value={certForm.certificateNumber}
                      onChange={(e) => setCertForm({ ...certForm, certificateNumber: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-mono font-bold"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1">Nama Lengkap & Gelar Peserta *</label>
                    <input
                      type="text"
                      required
                      value={certForm.participantName}
                      onChange={(e) => setCertForm({ ...certForm, participantName: e.target.value })}
                      placeholder="Contoh: Dr. Budi Santoso, M.Pd."
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1">Judul Program Pelatihan *</label>
                    <input
                      type="text"
                      required
                      value={certForm.programTitle}
                      onChange={(e) => setCertForm({ ...certForm, programTitle: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Asal Institusi / Kampus *</label>
                    <input
                      type="text"
                      required
                      value={certForm.institution}
                      onChange={(e) => setCertForm({ ...certForm, institution: e.target.value })}
                      placeholder="Universitas Indonesia"
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Beban Waktu (Jam Pelajaran / JP)</label>
                    <input
                      type="number"
                      value={certForm.jpTotal}
                      onChange={(e) => setCertForm({ ...certForm, jpTotal: Number(e.target.value) })}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Predikat Kelulusan</label>
                    <input
                      type="text"
                      value={certForm.grade}
                      onChange={(e) => setCertForm({ ...certForm, grade: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Tanggal Terbit</label>
                    <input
                      type="text"
                      value={certForm.issueDate}
                      onChange={(e) => setCertForm({ ...certForm, issueDate: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div className="sm:col-span-3 flex justify-end">
                    <button
                      type="submit"
                      className="py-2.5 px-6 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-xl shadow transition-all flex items-center gap-1.5"
                    >
                      <Award className="w-4 h-4" />
                      <span>Terbitkan & Sinkronkan ke Database Verifikasi</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Tabel Sertifikat */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 font-bold uppercase text-slate-600">
                    <tr>
                      <th className="p-3">Nomor Sertifikat</th>
                      <th className="p-3">Nama Peserta</th>
                      <th className="p-3">Program</th>
                      <th className="p-3">Institusi</th>
                      <th className="p-3">Beban JP</th>
                      <th className="p-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {certificates.map((c) => (
                      <tr key={c.certificateNumber} className="hover:bg-slate-50/80">
                        <td className="p-3 font-mono font-bold text-emerald-800">{c.certificateNumber}</td>
                        <td className="p-3 font-bold text-slate-900">{c.participantName}</td>
                        <td className="p-3 text-slate-600 max-w-xs truncate">{c.programTitle}</td>
                        <td className="p-3 text-slate-500">{c.institution}</td>
                        <td className="p-3 font-bold">{c.jpTotal} JP</td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => handleDeleteCertificate(c.certificateNumber)}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                            title="Cabut Sertifikat"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* TAB 5: PROGRES TRACKING CRUD */}
          {activeTab === 'tracking' && (
            <div className="space-y-6">
              
              <div className="bg-rose-50/70 p-5 rounded-2xl border border-rose-200 space-y-3">
                <h4 className="text-sm font-black text-rose-950 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-rose-700" />
                  <span>Update Progres Tracking ISBN / Naskah Jurnal</span>
                </h4>

                <form onSubmit={handleSaveTracking} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Kode Tracking *</label>
                    <input
                      type="text"
                      required
                      value={trackingForm.trackingCode}
                      onChange={(e) => setTrackingForm({ ...trackingForm, trackingCode: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Jenis Layanan</label>
                    <select
                      value={trackingForm.type}
                      onChange={(e) => setTrackingForm({ ...trackingForm, type: e.target.value as any })}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl"
                    >
                      <option value="ISBN">ISBN Penerbitan Buku</option>
                      <option value="NASKAH_JURNAL">Naskah Jurnal OJS</option>
                      <option value="SERTIFIKAT">Sertifikat Pelatihan</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Progres (%)</label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={trackingForm.statusPercent}
                      onChange={(e) => setTrackingForm({ ...trackingForm, statusPercent: Number(e.target.value) })}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-bold"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1">Judul Karya / Naskah *</label>
                    <input
                      type="text"
                      required
                      value={trackingForm.title}
                      onChange={(e) => setTrackingForm({ ...trackingForm, title: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Nama Pemohon / Dosen *</label>
                    <input
                      type="text"
                      required
                      value={trackingForm.applicant}
                      onChange={(e) => setTrackingForm({ ...trackingForm, applicant: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1">Tahapan Saat Ini *</label>
                    <input
                      type="text"
                      required
                      value={trackingForm.currentStep}
                      onChange={(e) => setTrackingForm({ ...trackingForm, currentStep: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Label Status</label>
                    <select
                      value={trackingForm.statusLabel}
                      onChange={(e) => setTrackingForm({ ...trackingForm, statusLabel: e.target.value as any })}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl"
                    >
                      <option value="Dalam Antrean">Dalam Antrean</option>
                      <option value="Proses Review">Proses Review</option>
                      <option value="Revisi Diperlukan">Revisi Diperlukan</option>
                      <option value="Disetujui Perpusnas">Disetujui Perpusnas</option>
                      <option value="Terbit & Final">Terbit & Final</option>
                    </select>
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block font-bold text-slate-700 mb-1">Catatan Redaksi untuk Penulis</label>
                    <textarea
                      rows={2}
                      value={trackingForm.notes}
                      onChange={(e) => setTrackingForm({ ...trackingForm, notes: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-xl"
                    />
                  </div>

                  <div className="sm:col-span-3 flex justify-end">
                    <button
                      type="submit"
                      className="py-2.5 px-6 bg-rose-700 hover:bg-rose-800 text-white font-bold rounded-xl shadow transition-all flex items-center gap-1.5"
                    >
                      <Save className="w-4 h-4" />
                      <span>Simpan & Perbarui Status Pelacakan</span>
                    </button>
                  </div>
                </form>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 p-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Semua operasi CRUD tersimpan otomatis ke persistent local database & REST API engine.</span>
          <button
            onClick={onClose}
            className="py-2 px-5 bg-slate-900 text-white rounded-xl font-bold hover:bg-[#0F2850] transition-colors"
          >
            Selesai & Tutup Panel
          </button>
        </div>

      </div>
    </div>
  );
};
