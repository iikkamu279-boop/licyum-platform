/**
 * =========================================================================
 * UNIFIED SUPABASE CRUD SERVICE LAYER
 * PT Licyum Cipta Akademika
 * Project ID: apdaijdbyunemscdbjsp (https://apdaijdbyunemscdbjsp.supabase.co)
 * =========================================================================
 */

import { getSupabaseServerClient, isServerSupabaseConfigured } from "./supabaseServer";

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  price: number;
  cover_url?: string;
  synopsis?: string;
  pages?: number;
  publisher?: string;
  status?: string;
  created_at?: string;
}

export interface Journal {
  id: string;
  name: string;
  short_code: string;
  e_issn: string;
  p_issn?: string;
  sinta_rank: string;
  scope: string;
  frequency: string;
  ojs_url?: string;
}

export interface Article {
  id: string;
  journal_id?: string;
  title: string;
  authors: string;
  affiliation?: string;
  abstract?: string;
  doi?: string;
  volume: number;
  issue: number;
  year: number;
  pdf_url?: string;
  status?: string;
  downloads?: number;
  created_at?: string;
}

export interface Training {
  id: string;
  title: string;
  instructor: string;
  instructor_title?: string;
  event_date: string;
  event_time?: string;
  location_type: string;
  price: number;
  quota: number;
  registered_count: number;
  hours_jp: number;
  poster_url?: string;
  description?: string;
  status: string;
  created_at?: string;
}

export interface Certificate {
  id: string;
  certificate_number: string;
  participant_name: string;
  participant_email?: string;
  training_title: string;
  hours_jp: number;
  issue_date: string;
  status: string;
  download_url?: string;
  created_at?: string;
}

export interface ServiceTracking {
  id: string;
  tracking_code: string;
  service_type: string;
  item_title: string;
  submitter_name: string;
  current_status: string;
  stage_progress: number;
  notes?: string;
  updated_at?: string;
}

// =========================================================================
// DEFAULT FALLBACK DATA (Aktif jika Supabase belum diisi API Key)
// =========================================================================
const FALLBACK_BOOKS: Book[] = [
  {
    id: "b1",
    title: "Metodologi Penelitian Terapan untuk Perguruan Tinggi",
    author: "Prof. Dr. Hendra Wijaya, M.Pd.",
    isbn: "978-623-10-8912-4",
    category: "Buku Ajar",
    price: 95000,
    pages: 240,
    status: "published",
    created_at: new Date().toISOString()
  },
  {
    id: "b2",
    title: "Hukum Tata Kelola Korporasi Modern & Etika Bisnis",
    author: "Dr. Sulistyo, S.H., M.H.",
    isbn: "978-623-10-8913-1",
    category: "Monograf Riset",
    price: 88000,
    pages: 198,
    status: "published",
    created_at: new Date().toISOString()
  },
  {
    id: "b3",
    title: "Kecerdasan Buatan Terapan & Transformasi Pendidikan",
    author: "Tim Peneliti Komputasi Licyum",
    isbn: "978-623-10-8914-8",
    category: "Referensi",
    price: 110000,
    pages: 312,
    status: "published",
    created_at: new Date().toISOString()
  },
  {
    id: "b4",
    title: "Manajemen Mutu Sekolah Unggul & Berkarakter",
    author: "Dra. Siti Rahmah, M.Pd.",
    isbn: "978-623-10-8915-5",
    category: "Buku Guru",
    price: 75000,
    pages: 164,
    status: "published",
    created_at: new Date().toISOString()
  }
];

const FALLBACK_TRAININGS: Training[] = [
  {
    id: "t1",
    title: "Klinik Naskah & Coaching Tembus Jurnal Terindeks Scopus Batch XII",
    instructor: "Prof. Dr. Ir. Wahyu Wibowo",
    event_date: "15 - 16 Maret 2026",
    location_type: "Online (Zoom & LMS)",
    price: 350000,
    quota: 60,
    registered_count: 42,
    hours_jp: 32,
    status: "open"
  },
  {
    id: "t2",
    title: "Bootcamp Konversi Skripsi & Tesis Menjadi Buku Ajar Ber-ISBN",
    instructor: "Dr. Muhammad Rizal, M.Hum.",
    event_date: "22 - 23 Maret 2026",
    location_type: "Online (Zoom & LMS)",
    price: 295000,
    quota: 50,
    registered_count: 42,
    hours_jp: 32,
    status: "open"
  },
  {
    id: "t3",
    title: "Masterclass Olah Data SmartPLS 4 & Analisis Mediasi Moderasi",
    instructor: "Bayu Anggoro, Ph.D.",
    event_date: "05 - 06 April 2026",
    location_type: "Online (Praktik Interaktif)",
    price: 325000,
    quota: 40,
    registered_count: 28,
    hours_jp: 32,
    status: "open"
  }
];

const FALLBACK_CERTIFICATES: Certificate[] = [
  {
    id: "c1",
    certificate_number: "SERT-LIC-2026-0891",
    participant_name: "Dr. Ahmad Fauzi, M.T.",
    training_title: "Pelatihan Penulisan Buku Ajar Ber-ISBN & HKI Nasional",
    hours_jp: 32,
    issue_date: "2026-01-25",
    status: "valid"
  },
  {
    id: "c2",
    certificate_number: "SERT-LIC-2026-0892",
    participant_name: "Dra. Nur Indah, M.Pd.",
    training_title: "Workshop Penulisan Karya Tulis Ilmiah Guru Berbobot KUM",
    hours_jp: 32,
    issue_date: "2026-01-28",
    status: "valid"
  }
];

// In-memory store for fallback operations when Supabase is not connected
let memoryBooks = [...FALLBACK_BOOKS];
let memoryTrainings = [...FALLBACK_TRAININGS];
let memoryCertificates = [...FALLBACK_CERTIFICATES];

// =========================================================================
// CRUD: BUKU (books)
// =========================================================================
export const getBooks = async (): Promise<{ data: Book[]; isSupabase: boolean; error?: string }> => {
  const supabase = getSupabaseServerClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        return { data: data as Book[], isSupabase: true };
      }
      return { data: memoryBooks, isSupabase: false, error: error?.message };
    } catch (err: any) {
      return { data: memoryBooks, isSupabase: false, error: err.message };
    }
  }
  return { data: memoryBooks, isSupabase: false };
};

export const createBook = async (bookData: Omit<Book, "id">): Promise<{ data: Book | null; isSupabase: boolean; error?: string }> => {
  const supabase = getSupabaseServerClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("books")
        .insert([bookData])
        .select()
        .single();

      if (!error && data) {
        return { data: data as Book, isSupabase: true };
      }
      return { data: null, isSupabase: false, error: error?.message };
    } catch (err: any) {
      return { data: null, isSupabase: false, error: err.message };
    }
  }

  // Fallback in-memory
  const newBook: Book = {
    ...bookData,
    id: `book-${Date.now()}`,
    created_at: new Date().toISOString()
  };
  memoryBooks = [newBook, ...memoryBooks];
  return { data: newBook, isSupabase: false };
};

export const updateBook = async (id: string, updates: Partial<Book>): Promise<{ data: Book | null; isSupabase: boolean; error?: string }> => {
  const supabase = getSupabaseServerClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("books")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (!error && data) {
        return { data: data as Book, isSupabase: true };
      }
      return { data: null, isSupabase: false, error: error?.message };
    } catch (err: any) {
      return { data: null, isSupabase: false, error: err.message };
    }
  }

  // Fallback in-memory
  memoryBooks = memoryBooks.map((b) => (b.id === id ? { ...b, ...updates } : b));
  const updated = memoryBooks.find((b) => b.id === id) || null;
  return { data: updated, isSupabase: false };
};

export const deleteBook = async (id: string): Promise<{ success: boolean; isSupabase: boolean; error?: string }> => {
  const supabase = getSupabaseServerClient();
  if (supabase) {
    try {
      const { error } = await supabase.from("books").delete().eq("id", id);
      if (!error) {
        return { success: true, isSupabase: true };
      }
      return { success: false, isSupabase: false, error: error?.message };
    } catch (err: any) {
      return { success: false, isSupabase: false, error: err.message };
    }
  }

  memoryBooks = memoryBooks.filter((b) => b.id !== id);
  return { success: true, isSupabase: false };
};

// =========================================================================
// CRUD: PELATIHAN (trainings)
// =========================================================================
export const getTrainings = async (): Promise<{ data: Training[]; isSupabase: boolean; error?: string }> => {
  const supabase = getSupabaseServerClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("trainings")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        return { data: data as Training[], isSupabase: true };
      }
      return { data: memoryTrainings, isSupabase: false, error: error?.message };
    } catch (err: any) {
      return { data: memoryTrainings, isSupabase: false, error: err.message };
    }
  }
  return { data: memoryTrainings, isSupabase: false };
};

export const createTraining = async (trainingData: Omit<Training, "id">): Promise<{ data: Training | null; isSupabase: boolean; error?: string }> => {
  const supabase = getSupabaseServerClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("trainings")
        .insert([trainingData])
        .select()
        .single();

      if (!error && data) {
        return { data: data as Training, isSupabase: true };
      }
      return { data: null, isSupabase: false, error: error?.message };
    } catch (err: any) {
      return { data: null, isSupabase: false, error: err.message };
    }
  }

  const newTraining: Training = {
    ...trainingData,
    id: `train-${Date.now()}`,
    created_at: new Date().toISOString()
  };
  memoryTrainings = [newTraining, ...memoryTrainings];
  return { data: newTraining, isSupabase: false };
};

export const deleteTraining = async (id: string): Promise<{ success: boolean; isSupabase: boolean; error?: string }> => {
  const supabase = getSupabaseServerClient();
  if (supabase) {
    try {
      const { error } = await supabase.from("trainings").delete().eq("id", id);
      if (!error) {
        return { success: true, isSupabase: true };
      }
      return { success: false, isSupabase: false, error: error?.message };
    } catch (err: any) {
      return { success: false, isSupabase: false, error: err.message };
    }
  }

  memoryTrainings = memoryTrainings.filter((t) => t.id !== id);
  return { success: true, isSupabase: false };
};

// =========================================================================
// CRUD: SERTIFIKAT (certificates)
// =========================================================================
export const getCertificates = async (): Promise<{ data: Certificate[]; isSupabase: boolean; error?: string }> => {
  const supabase = getSupabaseServerClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from("certificates").select("*");
      if (!error && data) {
        return { data: data as Certificate[], isSupabase: true };
      }
    } catch {}
  }
  return { data: memoryCertificates, isSupabase: false };
};

export const verifyCertificate = async (certificateNumber: string): Promise<{ data: Certificate | null; isSupabase: boolean; error?: string }> => {
  const supabase = getSupabaseServerClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .ilike("certificate_number", certificateNumber.trim())
        .single();

      if (!error && data) {
        return { data: data as Certificate, isSupabase: true };
      }
    } catch {}
  }

  const found = memoryCertificates.find(
    (c) => c.certificate_number.toLowerCase() === certificateNumber.trim().toLowerCase()
  );
  return { data: found || null, isSupabase: false };
};

// =========================================================================
// STATUS CONNECTION CHECKER
// =========================================================================
export const checkSupabaseConnection = async (): Promise<{
  connected: boolean;
  projectUrl: string;
  projectId: string;
  message: string;
}> => {
  const isConfigured = isServerSupabaseConfigured();
  if (!isConfigured) {
    return {
      connected: false,
      projectId: "apdaijdbyunemscdbjsp",
      projectUrl: "https://apdaijdbyunemscdbjsp.supabase.co",
      message: "API Keys belum terisi di .env. Silakan salin Anon Key dari dashboard Supabase Anda."
    };
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return {
      connected: false,
      projectId: "apdaijdbyunemscdbjsp",
      projectUrl: "https://apdaijdbyunemscdbjsp.supabase.co",
      message: "Gagal menginisialisasi klien Supabase."
    };
  }

  try {
    const { count, error } = await supabase.from("books").select("*", { count: "exact", head: true });
    if (error) {
      if (error.code === '42501') {
        return {
          connected: false,
          projectId: "apdaijdbyunemscdbjsp",
          projectUrl: "https://apdaijdbyunemscdbjsp.supabase.co",
          message: `Endpoint Supabase terhubung! Namun tabel books terkunci (Permission Denied 42501). Buka Supabase SQL Editor dan jalankan: GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;`
        };
      }
      return {
        connected: false,
        projectId: "apdaijdbyunemscdbjsp",
        projectUrl: "https://apdaijdbyunemscdbjsp.supabase.co",
        message: `Terhubung ke API Supabase, namun ada kendala: ${error.message}. Jalankan schema di Supabase SQL Editor.`
      };
    }
    return {
      connected: true,
      projectId: "apdaijdbyunemscdbjsp",
      projectUrl: "https://apdaijdbyunemscdbjsp.supabase.co",
      message: `Berhasil terhubung ke Supabase! Jumlah buku terdaftar: ${count ?? 0}.`
    };
  } catch (err: any) {
    return {
      connected: false,
      projectId: "apdaijdbyunemscdbjsp",
      projectUrl: "https://apdaijdbyunemscdbjsp.supabase.co",
      message: `Koneksi gagal: ${err.message}`
    };
  }
};
