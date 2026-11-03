-- =========================================================================
-- PT LICYUM CIPTA AKADEMIKA — SUPABASE INITIAL MIGRATION
-- Project Reference: apdaijdbyunemscdbjsp
-- URL: https://apdaijdbyunemscdbjsp.supabase.co
-- =========================================================================

-- 1. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Grant schema usage to API roles
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

-- =========================================================================
-- TABEL 1: BUKU & PENERBITAN (books)
-- =========================================================================
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
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================================
-- TABEL 2: JURNAL ILMIAH (journals)
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.journals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    short_code VARCHAR(50),
    e_issn VARCHAR(50),
    p_issn VARCHAR(50),
    sinta_rank VARCHAR(50) DEFAULT 'SINTA 3',
    scope TEXT,
    frequency VARCHAR(100) DEFAULT '4 Terbitan per Tahun',
    cover_url TEXT,
    description TEXT,
    ojs_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================================
-- TABEL 3: ARTIKEL ILMIAH (articles)
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    journal_id UUID REFERENCES public.journals(id) ON DELETE SET NULL,
    title VARCHAR(350) NOT NULL,
    authors VARCHAR(350) NOT NULL,
    affiliation VARCHAR(255),
    abstract TEXT,
    doi VARCHAR(100),
    volume INTEGER DEFAULT 1,
    issue INTEGER DEFAULT 1,
    year INTEGER DEFAULT 2026,
    pdf_url TEXT,
    status VARCHAR(50) DEFAULT 'published',
    downloads INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================================
-- TABEL 4: PELATIHAN & WORKSHOP (trainings)
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.trainings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    instructor VARCHAR(255) NOT NULL,
    instructor_title VARCHAR(255),
    event_date VARCHAR(100) NOT NULL,
    event_time VARCHAR(100) DEFAULT '09.00 - 15.00 WIB',
    location_type VARCHAR(50) DEFAULT 'Online (Zoom & LMS)',
    price NUMERIC(12, 2) NOT NULL DEFAULT 0,
    quota INTEGER DEFAULT 50,
    registered_count INTEGER DEFAULT 0,
    hours_jp INTEGER DEFAULT 32,
    poster_url TEXT,
    description TEXT,
    status VARCHAR(50) DEFAULT 'open',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================================
-- TABEL 5: SERTIFIKAT PESERTA (certificates)
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    certificate_number VARCHAR(100) UNIQUE NOT NULL,
    participant_name VARCHAR(255) NOT NULL,
    participant_email VARCHAR(255),
    training_title VARCHAR(255) NOT NULL,
    hours_jp INTEGER DEFAULT 32,
    issue_date DATE DEFAULT CURRENT_DATE,
    qr_code_hash VARCHAR(255),
    status VARCHAR(50) DEFAULT 'valid',
    download_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================================
-- TABEL 6: SERVICE TRACKING (service_tracking)
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.service_tracking (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tracking_code VARCHAR(50) UNIQUE NOT NULL,
    service_type VARCHAR(50) NOT NULL,
    item_title VARCHAR(255) NOT NULL,
    submitter_name VARCHAR(255) NOT NULL,
    current_status VARCHAR(100) NOT NULL,
    stage_progress INTEGER DEFAULT 25,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================================
-- GRANT PERMISSIONS KEPADA ROLES (anon, authenticated, service_role)
-- =========================================================================
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated, service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON ROUTINES TO anon, authenticated, service_role;

-- =========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trainings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_tracking ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public Read Books" ON public.books;
DROP POLICY IF EXISTS "Enable All for Books" ON public.books;
CREATE POLICY "Public Read Books" ON public.books FOR SELECT USING (true);
CREATE POLICY "Enable All for Books" ON public.books FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Read Journals" ON public.journals;
DROP POLICY IF EXISTS "Enable All for Journals" ON public.journals;
CREATE POLICY "Public Read Journals" ON public.journals FOR SELECT USING (true);
CREATE POLICY "Enable All for Journals" ON public.journals FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Read Articles" ON public.articles;
DROP POLICY IF EXISTS "Enable All for Articles" ON public.articles;
CREATE POLICY "Public Read Articles" ON public.articles FOR SELECT USING (true);
CREATE POLICY "Enable All for Articles" ON public.articles FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Read Trainings" ON public.trainings;
DROP POLICY IF EXISTS "Enable All for Trainings" ON public.trainings;
CREATE POLICY "Public Read Trainings" ON public.trainings FOR SELECT USING (true);
CREATE POLICY "Enable All for Trainings" ON public.trainings FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Read Certificates" ON public.certificates;
DROP POLICY IF EXISTS "Enable All for Certificates" ON public.certificates;
CREATE POLICY "Public Read Certificates" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Enable All for Certificates" ON public.certificates FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Read Service Tracking" ON public.service_tracking;
DROP POLICY IF EXISTS "Enable All for Service Tracking" ON public.service_tracking;
CREATE POLICY "Public Read Service Tracking" ON public.service_tracking FOR SELECT USING (true);
CREATE POLICY "Enable All for Service Tracking" ON public.service_tracking FOR ALL USING (true) WITH CHECK (true);

-- =========================================================================
-- SEED INITIAL DATA
-- =========================================================================
INSERT INTO public.books (title, author, isbn, category, price, pages, status)
VALUES
('Metodologi Penelitian Terapan untuk Perguruan Tinggi', 'Prof. Dr. Hendra Wijaya, M.Pd.', '978-623-10-8912-4', 'Buku Ajar', 95000, 240, 'published'),
('Hukum Tata Kelola Korporasi Modern & Etika Bisnis', 'Dr. Sulistyo, S.H., M.H.', '978-623-10-8913-1', 'Monograf Riset', 88000, 198, 'published'),
('Kecerdasan Buatan Terapan & Transformasi Pendidikan', 'Tim Peneliti Komputasi Licyum', '978-623-10-8914-8', 'Referensi', 110000, 312, 'published'),
('Manajemen Mutu Sekolah Unggul & Berkarakter', 'Dra. Siti Rahmah, M.Pd.', '978-623-10-8915-5', 'Buku Guru', 75000, 164, 'published')
ON CONFLICT (isbn) DO NOTHING;

INSERT INTO public.trainings (title, instructor, instructor_title, event_date, location_type, price, quota, registered_count, hours_jp, status)
VALUES
('Klinik Naskah & Coaching Tembus Jurnal Terindeks Scopus Batch XII', 'Prof. Dr. Ir. Wahyu Wibowo', 'Reviewer Internasional Bereputasi', '15 - 16 Maret 2026', 'Online (Zoom & LMS)', 350000, 60, 42, 32, 'open'),
('Bootcamp Konversi Skripsi & Tesis Menjadi Buku Ajar Ber-ISBN', 'Dr. Muhammad Rizal, M.Hum.', 'Editor Ahli IKAPI & Asesor Buku', '22 - 23 Maret 2026', 'Online (Zoom & LMS)', 295000, 50, 42, 32, 'open'),
('Masterclass Olah Data SmartPLS 4 & Analisis Mediasi Moderasi', 'Bayu Anggoro, Ph.D.', 'Konsultan Riset & Statistik Terapan', '05 - 06 April 2026', 'Online (Praktik Interaktif)', 325000, 40, 28, 32, 'open')
ON CONFLICT DO NOTHING;

INSERT INTO public.certificates (certificate_number, participant_name, participant_email, training_title, hours_jp, issue_date, status)
VALUES
('SERT-LIC-2026-0891', 'Dr. Ahmad Fauzi, M.T.', 'ahmad.fauzi@kampus.ac.id', 'Pelatihan Penulisan Buku Ajar Ber-ISBN & HKI Nasional', 32, '2026-01-25', 'valid'),
('SERT-LIC-2026-0892', 'Dra. Nur Indah, M.Pd.', 'nur.indah@sekolah.sch.id', 'Workshop Penulisan Karya Tulis Ilmiah Guru Berbobot KUM', 32, '2026-01-28', 'valid')
ON CONFLICT (certificate_number) DO NOTHING;
