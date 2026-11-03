export type ActivePillar = 'all' | 'publishing' | 'journal' | 'training';

export type SearchCategory = 'Semua' | 'Buku' | 'Artikel Jurnal' | 'Program Pelatihan';

export interface BookItem {
  id: string;
  title: string;
  author: string;
  authorTitle: string;
  category: 'Pendidikan' | 'Teknologi & AI' | 'Manajemen & Bisnis' | 'Hukum' | 'Kesehatan & Medis' | 'Sosial Humaniora';
  coverUrl: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  pages: number;
  year: number;
  isbn: string;
  synopsis: string;
  tags: string[];
  inStock: boolean;
  featured?: boolean;
}

export interface JournalItem {
  id: string;
  name: string;
  acronym: string;
  sintaBadge: 'SINTA 2' | 'SINTA 3' | 'SINTA 4' | 'SINTA 5';
  indexing: string[];
  pIssn: string;
  eIssn: string;
  fieldOfStudy: string;
  frequency: string;
  coverImage: string;
  description: string;
  editorInChief: string;
  apcCost: string;
  submissionOpen: boolean;
  ojsUrl: string;
}

export interface ArticleItem {
  id: string;
  journalId: string;
  journalName: string;
  title: string;
  authors: string[];
  affiliation: string;
  doi: string;
  publicationDate: string;
  volume: string;
  issue: string;
  citations: number;
  abstract: string;
  keywords: string[];
  pdfDownloadUrl: string;
}

export interface TrainingProgram {
  id: string;
  title: string;
  category: 'Penulisan & Publikasi' | 'In-House Kampus' | 'Akreditasi' | 'Webinar & Workshop';
  instructor: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  time: string;
  durationJp: number;
  method: 'Online (Zoom HD)' | 'Offline (Hotel Bintang 4)' | 'Hybrid';
  location?: string;
  quota: number;
  enrolled: number;
  price: number;
  earlyBirdPrice: number;
  bannerImage: string;
  benefits: string[];
  featured?: boolean;
}

export interface CertificateRecord {
  certificateNumber: string;
  participantName: string;
  programTitle: string;
  institution: string;
  issueDate: string;
  grade: string;
  jpTotal: number;
  status: 'VALID & TERVERIFIKASI' | 'TIDAK DITEMUKAN' | 'KEDALUWARSA';
  credentialId: string;
}

export interface StatusTrackingRecord {
  trackingCode: string;
  type: 'ISBN' | 'NASKAH_JURNAL' | 'SERTIFIKAT';
  title: string;
  applicant: string;
  submissionDate: string;
  currentStep: string;
  statusPercent: number;
  statusLabel: 'Dalam Antrean' | 'Proses Review' | 'Revisi Diperlukan' | 'Disetujui Perpusnas' | 'Terbit & Final';
  notes: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  title: string;
  institution: string;
  avatar: string;
  serviceType: 'Penerbitan Buku' | 'Jurnal Ilmiah' | 'Pelatihan & Konsultasi';
  content: string;
  rating: number;
}
