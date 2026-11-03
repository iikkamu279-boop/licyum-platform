import {
  BookItem,
  JournalItem,
  ArticleItem,
  TrainingProgram,
  CertificateRecord,
  StatusTrackingRecord
} from '../types';
import {
  BOOKS_DATA,
  JOURNALS_DATA,
  RECENT_ARTICLES,
  TRAINING_PROGRAMS,
  VERIFIED_CERTIFICATES,
  STATUS_TRACKING_SAMPLES
} from '../data/dummyData';
import { envConfig } from './config';

const STORAGE_KEYS = {
  BOOKS: 'licyum_db_books',
  JOURNALS: 'licyum_db_journals',
  ARTICLES: 'licyum_db_articles',
  TRAININGS: 'licyum_db_trainings',
  CERTIFICATES: 'licyum_db_certificates',
  TRACKINGS: 'licyum_db_trackings',
  ORDERS: 'licyum_db_orders'
};

// In-memory fallback for SSR and initial load
let inMemoryBooks: BookItem[] = [...BOOKS_DATA];
let inMemoryJournals: JournalItem[] = [...JOURNALS_DATA];
let inMemoryArticles: ArticleItem[] = [...RECENT_ARTICLES];
let inMemoryTrainings: TrainingProgram[] = [...TRAINING_PROGRAMS];
let inMemoryCertificates: Record<string, CertificateRecord> = { ...VERIFIED_CERTIFICATES };
let inMemoryTrackings: Record<string, StatusTrackingRecord> = { ...STATUS_TRACKING_SAMPLES };
let inMemoryOrders: any[] = [];

// Helper functions for LocalStorage persistence when running in client
function getStored<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from storage:`, e);
    return fallback;
  }
}

function setStored<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to storage:`, e);
  }
}

export const LicyumDatabase = {
  config: envConfig.database,

  // =========================================================================
  // 1. CRUD BUKU (Penerbitan & Toko Buku)
  // =========================================================================
  books: {
    getAll(): BookItem[] {
      return getStored<BookItem[]>(STORAGE_KEYS.BOOKS, inMemoryBooks);
    },
    getById(id: string): BookItem | undefined {
      const all = this.getAll();
      return all.find((b) => b.id === id);
    },
    create(data: Omit<BookItem, 'id'> & { id?: string }): BookItem {
      const all = this.getAll();
      const newBook: BookItem = {
        ...data,
        id: data.id || `lic-book-${Date.now().toString().slice(-4)}`
      };
      const updated = [newBook, ...all];
      setStored(STORAGE_KEYS.BOOKS, updated);
      inMemoryBooks = updated;
      return newBook;
    },
    update(id: string, updates: Partial<BookItem>): BookItem | null {
      const all = this.getAll();
      const index = all.findIndex((b) => b.id === id);
      if (index === -1) return null;
      all[index] = { ...all[index], ...updates };
      setStored(STORAGE_KEYS.BOOKS, all);
      inMemoryBooks = all;
      return all[index];
    },
    delete(id: string): boolean {
      const all = this.getAll();
      const filtered = all.filter((b) => b.id !== id);
      if (filtered.length === all.length) return false;
      setStored(STORAGE_KEYS.BOOKS, filtered);
      inMemoryBooks = filtered;
      return true;
    }
  },

  // =========================================================================
  // 2. CRUD ARTIKEL JURNAL (Portal E-Journal OJS)
  // =========================================================================
  articles: {
    getAll(): ArticleItem[] {
      return getStored<ArticleItem[]>(STORAGE_KEYS.ARTICLES, inMemoryArticles);
    },
    getById(id: string): ArticleItem | undefined {
      const all = this.getAll();
      return all.find((a) => a.id === id);
    },
    getByJournal(journalId: string): ArticleItem[] {
      const all = this.getAll();
      return all.filter((a) => a.journalId === journalId);
    },
    create(data: Omit<ArticleItem, 'id'> & { id?: string }): ArticleItem {
      const all = this.getAll();
      const newArticle: ArticleItem = {
        ...data,
        id: data.id || `art-${Date.now().toString().slice(-4)}`
      };
      const updated = [newArticle, ...all];
      setStored(STORAGE_KEYS.ARTICLES, updated);
      inMemoryArticles = updated;
      return newArticle;
    },
    update(id: string, updates: Partial<ArticleItem>): ArticleItem | null {
      const all = this.getAll();
      const index = all.findIndex((a) => a.id === id);
      if (index === -1) return null;
      all[index] = { ...all[index], ...updates };
      setStored(STORAGE_KEYS.ARTICLES, all);
      inMemoryArticles = all;
      return all[index];
    },
    delete(id: string): boolean {
      const all = this.getAll();
      const filtered = all.filter((a) => a.id !== id);
      if (filtered.length === all.length) return false;
      setStored(STORAGE_KEYS.ARTICLES, filtered);
      inMemoryArticles = filtered;
      return true;
    }
  },

  // =========================================================================
  // 3. CRUD PROGRAM PELATIHAN (Lembaga Pelatihan & Konsultan)
  // =========================================================================
  trainings: {
    getAll(): TrainingProgram[] {
      return getStored<TrainingProgram[]>(STORAGE_KEYS.TRAININGS, inMemoryTrainings);
    },
    getById(id: string): TrainingProgram | undefined {
      const all = this.getAll();
      return all.find((t) => t.id === id);
    },
    create(data: Omit<TrainingProgram, 'id'> & { id?: string }): TrainingProgram {
      const all = this.getAll();
      const newTraining: TrainingProgram = {
        ...data,
        id: data.id || `train-${Date.now().toString().slice(-4)}`
      };
      const updated = [newTraining, ...all];
      setStored(STORAGE_KEYS.TRAININGS, updated);
      inMemoryTrainings = updated;
      return newTraining;
    },
    update(id: string, updates: Partial<TrainingProgram>): TrainingProgram | null {
      const all = this.getAll();
      const index = all.findIndex((t) => t.id === id);
      if (index === -1) return null;
      all[index] = { ...all[index], ...updates };
      setStored(STORAGE_KEYS.TRAININGS, all);
      inMemoryTrainings = all;
      return all[index];
    },
    delete(id: string): boolean {
      const all = this.getAll();
      const filtered = all.filter((t) => t.id !== id);
      if (filtered.length === all.length) return false;
      setStored(STORAGE_KEYS.TRAININGS, filtered);
      inMemoryTrainings = filtered;
      return true;
    }
  },

  // =========================================================================
  // 4. CRUD SERTIFIKAT RESMI (Pusat Verifikasi & Penerbitan)
  // =========================================================================
  certificates: {
    getAll(): CertificateRecord[] {
      const map = getStored<Record<string, CertificateRecord>>(
        STORAGE_KEYS.CERTIFICATES,
        inMemoryCertificates
      );
      return Object.values(map);
    },
    getByNumber(certNumber: string): CertificateRecord | null {
      const map = getStored<Record<string, CertificateRecord>>(
        STORAGE_KEYS.CERTIFICATES,
        inMemoryCertificates
      );
      const cleaned = certNumber.trim().toUpperCase();
      return map[cleaned] || null;
    },
    create(data: CertificateRecord): CertificateRecord {
      const map = getStored<Record<string, CertificateRecord>>(
        STORAGE_KEYS.CERTIFICATES,
        inMemoryCertificates
      );
      const cleanedNumber = data.certificateNumber.trim().toUpperCase();
      map[cleanedNumber] = { ...data, certificateNumber: cleanedNumber };
      setStored(STORAGE_KEYS.CERTIFICATES, map);
      inMemoryCertificates = map;
      return map[cleanedNumber];
    },
    update(certNumber: string, updates: Partial<CertificateRecord>): CertificateRecord | null {
      const map = getStored<Record<string, CertificateRecord>>(
        STORAGE_KEYS.CERTIFICATES,
        inMemoryCertificates
      );
      const cleaned = certNumber.trim().toUpperCase();
      if (!map[cleaned]) return null;
      map[cleaned] = { ...map[cleaned], ...updates };
      setStored(STORAGE_KEYS.CERTIFICATES, map);
      inMemoryCertificates = map;
      return map[cleaned];
    },
    delete(certNumber: string): boolean {
      const map = getStored<Record<string, CertificateRecord>>(
        STORAGE_KEYS.CERTIFICATES,
        inMemoryCertificates
      );
      const cleaned = certNumber.trim().toUpperCase();
      if (!map[cleaned]) return false;
      delete map[cleaned];
      setStored(STORAGE_KEYS.CERTIFICATES, map);
      inMemoryCertificates = map;
      return true;
    }
  },

  // =========================================================================
  // 5. CRUD TRACKING STATUS SUBMISI (ISBN & JURNAL REVIEW)
  // =========================================================================
  trackings: {
    getAll(): StatusTrackingRecord[] {
      const map = getStored<Record<string, StatusTrackingRecord>>(
        STORAGE_KEYS.TRACKINGS,
        inMemoryTrackings
      );
      return Object.values(map);
    },
    getByCode(code: string): StatusTrackingRecord | null {
      const map = getStored<Record<string, StatusTrackingRecord>>(
        STORAGE_KEYS.TRACKINGS,
        inMemoryTrackings
      );
      const cleaned = code.trim().toUpperCase();
      return map[cleaned] || null;
    },
    create(data: StatusTrackingRecord): StatusTrackingRecord {
      const map = getStored<Record<string, StatusTrackingRecord>>(
        STORAGE_KEYS.TRACKINGS,
        inMemoryTrackings
      );
      const cleaned = data.trackingCode.trim().toUpperCase();
      map[cleaned] = { ...data, trackingCode: cleaned };
      setStored(STORAGE_KEYS.TRACKINGS, map);
      inMemoryTrackings = map;
      return map[cleaned];
    },
    update(code: string, updates: Partial<StatusTrackingRecord>): StatusTrackingRecord | null {
      const map = getStored<Record<string, StatusTrackingRecord>>(
        STORAGE_KEYS.TRACKINGS,
        inMemoryTrackings
      );
      const cleaned = code.trim().toUpperCase();
      if (!map[cleaned]) return null;
      map[cleaned] = { ...map[cleaned], ...updates };
      setStored(STORAGE_KEYS.TRACKINGS, map);
      inMemoryTrackings = map;
      return map[cleaned];
    },
    delete(code: string): boolean {
      const map = getStored<Record<string, StatusTrackingRecord>>(
        STORAGE_KEYS.TRACKINGS,
        inMemoryTrackings
      );
      const cleaned = code.trim().toUpperCase();
      if (!map[cleaned]) return false;
      delete map[cleaned];
      setStored(STORAGE_KEYS.TRACKINGS, map);
      inMemoryTrackings = map;
      return true;
    }
  },

  // Reset database back to default seed
  resetDefaults(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.BOOKS);
      localStorage.removeItem(STORAGE_KEYS.JOURNALS);
      localStorage.removeItem(STORAGE_KEYS.ARTICLES);
      localStorage.removeItem(STORAGE_KEYS.TRAININGS);
      localStorage.removeItem(STORAGE_KEYS.CERTIFICATES);
      localStorage.removeItem(STORAGE_KEYS.TRACKINGS);
      localStorage.removeItem(STORAGE_KEYS.ORDERS);
    }
    inMemoryBooks = [...BOOKS_DATA];
    inMemoryJournals = [...JOURNALS_DATA];
    inMemoryArticles = [...RECENT_ARTICLES];
    inMemoryTrainings = [...TRAINING_PROGRAMS];
    inMemoryCertificates = { ...VERIFIED_CERTIFICATES };
    inMemoryTrackings = { ...STATUS_TRACKING_SAMPLES };
  }
};
