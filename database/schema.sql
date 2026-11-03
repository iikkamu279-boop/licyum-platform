-- ============================================================================
-- LICYUM PLATFORM INTEGRATED ECOSYSTEM DATABASE SCHEMA
-- Compatible with PostgreSQL, MySQL, and SQLite (ANSI SQL Compliant)
-- ============================================================================

-- 1. USERS & ROLES TABLE (Single Sign-On across all 3 services)
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'USER_AKADEMISI', -- 'SUPER_ADMIN', 'EDITOR_PENERBITAN', 'EDITOR_JURNAL', 'INSTRUKTUR', 'USER_AKADEMISI'
    institution VARCHAR(255),
    academic_title VARCHAR(150),
    phone VARCHAR(50),
    avatar_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. PILAR 1: PENERBITAN & TOKO BUKU
CREATE TABLE IF NOT EXISTS book_categories (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS books (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE,
    author VARCHAR(255) NOT NULL,
    author_title VARCHAR(255),
    category_id VARCHAR(50) REFERENCES book_categories(id),
    category_name VARCHAR(100) NOT NULL,
    cover_url VARCHAR(500),
    price DECIMAL(12, 2) NOT NULL,
    original_price DECIMAL(12, 2) NOT NULL,
    rating DECIMAL(2, 1) DEFAULT 5.0,
    reviews_count INT DEFAULT 0,
    pages INT NOT NULL,
    year INT NOT NULL,
    isbn VARCHAR(50) UNIQUE NOT NULL,
    synopsis TEXT,
    tags TEXT, -- JSON array string or comma separated
    stock INT DEFAULT 100,
    in_stock BOOLEAN DEFAULT TRUE,
    featured BOOLEAN DEFAULT FALSE,
    publisher_id VARCHAR(36) REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS publishing_submissions (
    id VARCHAR(36) PRIMARY KEY,
    tracking_code VARCHAR(50) UNIQUE NOT NULL, -- e.g. ISBN-9281-2024
    user_id VARCHAR(36) REFERENCES users(id),
    applicant_name VARCHAR(255) NOT NULL,
    applicant_institution VARCHAR(255),
    title VARCHAR(500) NOT NULL,
    package_type VARCHAR(100) NOT NULL, -- 'Paket Mandiri', 'Paket Akademisi', 'Paket Mahakarya'
    manuscript_url VARCHAR(500),
    haki_requested BOOLEAN DEFAULT FALSE,
    current_step VARCHAR(255) NOT NULL,
    status_percent INT DEFAULT 10,
    status_label VARCHAR(50) NOT NULL DEFAULT 'Dalam Antrean', -- 'Dalam Antrean', 'Proses Review', 'Revisi Diperlukan', 'Disetujui Perpusnas', 'Terbit & Final'
    notes TEXT,
    isbn_assigned VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS book_orders (
    id VARCHAR(36) PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    user_id VARCHAR(36) REFERENCES users(id),
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    customer_email VARCHAR(255),
    shipping_address TEXT NOT NULL,
    book_id VARCHAR(36) REFERENCES books(id),
    book_title VARCHAR(500) NOT NULL,
    quantity INT DEFAULT 1,
    unit_price DECIMAL(12, 2) NOT NULL,
    shipping_cost DECIMAL(12, 2) DEFAULT 0,
    total_amount DECIMAL(12, 2) NOT NULL,
    payment_status VARCHAR(50) DEFAULT 'PENDING', -- 'PENDING', 'PAID', 'SHIPPED', 'COMPLETED', 'CANCELLED'
    tracking_airwaybill VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. PILAR 2: PORTAL JURNAL ILMIAH (OJS E-JOURNAL)
CREATE TABLE IF NOT EXISTS journals (
    id VARCHAR(50) PRIMARY KEY, -- e.g. 'ljet', 'jist', 'lser', 'jkpt'
    name VARCHAR(255) NOT NULL,
    acronym VARCHAR(50) NOT NULL,
    sinta_badge VARCHAR(50) NOT NULL, -- 'SINTA 2', 'SINTA 3', 'SINTA 4'
    p_issn VARCHAR(50),
    e_issn VARCHAR(50),
    field_of_study VARCHAR(255) NOT NULL,
    frequency VARCHAR(100) NOT NULL,
    cover_image VARCHAR(500),
    description TEXT,
    editor_in_chief VARCHAR(255) NOT NULL,
    apc_cost VARCHAR(100),
    ojs_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS articles (
    id VARCHAR(36) PRIMARY KEY,
    journal_id VARCHAR(50) REFERENCES journals(id),
    journal_name VARCHAR(255) NOT NULL,
    title VARCHAR(500) NOT NULL,
    authors TEXT NOT NULL, -- JSON string or comma separated
    affiliation TEXT NOT NULL,
    doi VARCHAR(100) UNIQUE NOT NULL,
    volume VARCHAR(100) NOT NULL,
    issue VARCHAR(100),
    publication_date VARCHAR(50) NOT NULL,
    citations_count INT DEFAULT 0,
    abstract TEXT NOT NULL,
    keywords TEXT NOT NULL,
    pdf_url VARCHAR(500),
    peer_review_status VARCHAR(50) DEFAULT 'PUBLISHED', -- 'SUBMITTED', 'UNDER_REVIEW', 'REVISION', 'ACCEPTED', 'PUBLISHED'
    tracking_code VARCHAR(50) UNIQUE, -- e.g. JRN-REV-304
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. PILAR 3: PELATIHAN & KONSULTAN PENDIDIKAN
CREATE TABLE IF NOT EXISTS training_programs (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    category VARCHAR(100) NOT NULL, -- 'Penulisan & Publikasi', 'In-House Kampus', 'Akreditasi', 'Webinar & Workshop'
    instructor_name VARCHAR(255) NOT NULL,
    instructor_role VARCHAR(255),
    instructor_avatar VARCHAR(500),
    date_schedule VARCHAR(100) NOT NULL,
    time_schedule VARCHAR(100) NOT NULL,
    duration_jp INT NOT NULL, -- e.g. 32 JP, 40 JP
    method VARCHAR(100) NOT NULL, -- 'Online (Zoom HD)', 'Offline (Hotel Bintang 4)', 'Hybrid'
    location VARCHAR(255),
    quota INT NOT NULL DEFAULT 50,
    enrolled_count INT DEFAULT 0,
    price DECIMAL(12, 2) NOT NULL,
    early_bird_price DECIMAL(12, 2) NOT NULL,
    banner_image VARCHAR(500),
    benefits TEXT, -- JSON string or delimited
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS training_registrations (
    id VARCHAR(36) PRIMARY KEY,
    registration_number VARCHAR(50) UNIQUE NOT NULL,
    program_id VARCHAR(36) REFERENCES training_programs(id),
    program_title VARCHAR(500) NOT NULL,
    user_id VARCHAR(36) REFERENCES users(id),
    participant_name VARCHAR(255) NOT NULL,
    participant_title VARCHAR(150),
    institution VARCHAR(255) NOT NULL,
    whatsapp VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    ticket_tier VARCHAR(50) NOT NULL, -- 'earlyBird', 'regular'
    total_price DECIMAL(12, 2) NOT NULL,
    payment_status VARCHAR(50) DEFAULT 'PENDING', -- 'PENDING', 'PAID', 'VERIFIED'
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS certificates (
    id VARCHAR(36) PRIMARY KEY,
    certificate_number VARCHAR(100) UNIQUE NOT NULL, -- e.g. LCY-2024-EDU-092
    participant_name VARCHAR(255) NOT NULL,
    program_title VARCHAR(500) NOT NULL,
    institution VARCHAR(255) NOT NULL,
    issue_date VARCHAR(50) NOT NULL,
    grade VARCHAR(50) NOT NULL, -- e.g. 'Sangat Memuaskan (A)'
    jp_total INT NOT NULL DEFAULT 32,
    status VARCHAR(50) NOT NULL DEFAULT 'VALID & TERVERIFIKASI',
    credential_id VARCHAR(100) UNIQUE NOT NULL,
    qr_code_payload VARCHAR(500),
    pdf_download_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- INDEXES FOR MAXIMUM SEARCH & VERIFICATION PERFORMANCE
-- ============================================================================
CREATE INDEX idx_books_isbn ON books(isbn);
CREATE INDEX idx_books_category ON books(category_id);
CREATE INDEX idx_articles_doi ON articles(doi);
CREATE INDEX idx_articles_journal ON articles(journal_id);
CREATE INDEX idx_certificates_number ON certificates(certificate_number);
CREATE INDEX idx_publishing_tracking ON publishing_submissions(tracking_code);
CREATE INDEX idx_orders_number ON book_orders(order_number);
