-- ============================================================================
-- LICYUM PLATFORM INITIAL SEED DATA
-- ============================================================================

-- 1. SEED CATEGORIES
INSERT INTO book_categories (id, name, slug, description) VALUES
('cat-pendidikan', 'Pendidikan', 'pendidikan', 'Buku ajar, model pembelajaran, dan pedagogi digital'),
('cat-teknologi', 'Teknologi & AI', 'teknologi-ai', 'Kecerdasan buatan, komputasi awan, dan rekayasa perangkat lunak'),
('cat-hukum', 'Hukum', 'hukum', 'Hukum siber, perlindungan data pribadi, dan HAKI'),
('cat-manajemen', 'Manajemen & Bisnis', 'manajemen-bisnis', 'Strategi korporat, ESG, dan kewirausahaan digital'),
('cat-kesehatan', 'Kesehatan & Medis', 'kesehatan-medis', 'Epidemiologi, kesehatan masyarakat, dan farmakologi klinik'),
('cat-sosial', 'Sosial Humaniora', 'sosial-humaniora', 'Sosiologi urban, antropologi, dan kajian budaya Nusantara');

-- 2. SEED ADMIN & EDITORS
INSERT INTO users (id, name, email, password_hash, role, institution, academic_title) VALUES
('usr-admin-01', 'Administrator Licyum', 'admin@licyum.id', '$2a$12$e8Y...encrypted_hash', 'SUPER_ADMIN', 'PT Licyum Cipta Akademika', 'S.Kom., M.T.I.'),
('usr-ed-01', 'Prof. Dr. Hendra Suprayitno', 'hendra@uny.ac.id', '$2a$12$e8Y...encrypted_hash', 'EDITOR_PENERBITAN', 'Universitas Negeri Yogyakarta', 'M.Si.'),
('usr-ed-02', 'Dr. Eng. Teguh Prasetyo', 'teguh@itb.ac.id', '$2a$12$e8Y...encrypted_hash', 'EDITOR_JURNAL', 'Institut Teknologi Bandung', 'M.T.'),
('usr-inst-01', 'Prof. Dr. Agus Raharjo', 'agus@unnes.ac.id', '$2a$12$e8Y...encrypted_hash', 'INSTRUKTUR', 'Universitas Negeri Semarang', 'M.Si.');

-- 3. SEED JOURNALS (OJS)
INSERT INTO journals (id, name, acronym, sinta_badge, p_issn, e_issn, field_of_study, frequency, cover_image, editor_in_chief, apc_cost, ojs_url) VALUES
('ljet', 'Licyum Journal of Educational Technology (LJET)', 'LJET', 'SINTA 2', '2807-6125', '2807-6133', 'Pendidikan & Teknologi Pembelajaran', 'Triwulanan (Maret, Juni, September, Desember)', 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400', 'Prof. Dr. Supardi, M.Pd. (UNY)', 'Rp 1.250.000', 'https://journal.licyum.id/index.php/ljet'),
('jist', 'Jurnal Inovasi Sains & Terapan (JIST)', 'JIST', 'SINTA 3', '2774-8841', '2774-885X', 'Ilmu Komputer, Rekayasa Sains & Terapan', 'Semesteran (Mei & November)', 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=400', 'Dr. Eng. Teguh Prasetyo, M.T. (ITB)', 'Rp 1.000.000', 'https://journal.licyum.id/index.php/jist'),
('lser', 'Licyum Social & Economic Review (LSER)', 'LSER', 'SINTA 3', '2962-3347', '2962-3355', 'Ekonomi, Manajemen & Kebijakan Publik', 'Triwulanan (Februari, Mei, Agustus, November)', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=400', 'Dr. Miranti Maharani, S.E., M.Sc. (UI)', 'Rp 1.000.000', 'https://journal.licyum.id/index.php/lser'),
('jkpt', 'Jurnal Konseling & Psikologi Terapan (JKPT)', 'JKPT', 'SINTA 4', '2829-9022', '2829-9030', 'Psikologi Terapan & Bimbingan Konseling', 'Semesteran (Juni & Desember)', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400', 'Rina Kusumaningtyas, M.Psi. (UGM)', 'Rp 750.000', 'https://journal.licyum.id/index.php/jkpt');

-- 4. SEED SAMPLE CERTIFICATES
INSERT INTO certificates (id, certificate_number, participant_name, program_title, institution, issue_date, grade, jp_total, status, credential_id) VALUES
('cert-01', 'LCY-2024-EDU-092', 'Dra. Endang Sulistyowati, M.Pd.', 'Pelatihan Penulisan Buku Ajar & Monograf Ber-ISBN Sesuai Standar BSNP', 'Universitas Negeri Semarang (UNNES)', '24 Oktober 2024', 'Sangat Memuaskan (A)', 32, 'VALID & TERVERIFIKASI', 'CRED-98231-LIC-2024'),
('cert-02', 'LCY-2024-JRN-108', 'Dr. Ir. Raden Sukoco, M.T.', 'Workshop Intensif Menembus Jurnal Terindeks Scopus & SINTA 1-2', 'Institut Teknologi Sepuluh Nopember (ITS)', '15 November 2024', 'Dengan Pujian (Cum Laude / A+)', 24, 'VALID & TERVERIFIKASI', 'CRED-54129-LIC-2024'),
('cert-03', 'LCY-2024-WRK-415', 'Ahmad Fauzi, S.Pd., M.Ed.', 'In-House Training: Integrasi AI Generatif dalam Pembelajaran Kampus Merdeka', 'Universitas Muhammadiyah Surakarta', '08 Desember 2024', 'Sangat Memuaskan (A)', 32, 'VALID & TERVERIFIKASI', 'CRED-77812-LIC-2024');

-- 5. SEED PUBLISHING TRACKING SUBMISSIONS
INSERT INTO publishing_submissions (id, tracking_code, applicant_name, applicant_institution, title, package_type, current_step, status_percent, status_label, notes, isbn_assigned) VALUES
('sub-01', 'ISBN-9281-2024', 'Dr. Wahyu Pratama, M.Pd.', 'Universitas Negeri Jakarta', 'Transformasi Digital dan Tata Kelola Sekolah Unggul', 'Paket Akademisi', 'Penetapan Nomor ISBN & Barcode oleh Tim Perpusnas RI', 85, 'Disetujui Perpusnas', 'Draft final cover dan layout selesai divalidasi. Surat resmi ISBN sedang diterbitkan oleh Perpustakaan Nasional RI.', '978-623-8891-99-1');
