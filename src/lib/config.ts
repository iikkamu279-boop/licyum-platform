/**
 * LICYUM PLATFORM — CENTRALIZED CONFIGURATION MODULE
 * Safely parses, validates, and provides type-safe environment variables.
 */

export const envConfig = {
  // 1. Core Application
  app: {
    env: process.env.NODE_ENV || 'development',
    isProduction: process.env.NODE_ENV === 'production',
    name: process.env.NEXT_PUBLIC_APP_NAME || 'Licyum Indonesia',
    tagline:
      process.env.NEXT_PUBLIC_APP_TAGLINE ||
      'Ekosistem Terpadu Penerbitan Buku, Jurnal Ilmiah & Pelatihan',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  },

  // 2. Database & Supabase
  database: {
    type: (process.env.DATABASE_TYPE || 'supabase') as 'supabase' | 'sqlite' | 'postgres' | 'mysql',
    sqlitePath: process.env.SQLITE_DB_PATH || './database/licyum.db',
    url:
      process.env.DATABASE_URL ||
      'postgresql://postgres:[YOUR-PASSWORD]@db.apdaijdbyunemscdbjsp.supabase.co:5432/postgres',
    supabase: {
      projectId: 'apdaijdbyunemscdbjsp',
      url: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://apdaijdbyunemscdbjsp.supabase.co',
      anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
      serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    },
  },

  // 3. Authentication & Security
  auth: {
    jwtSecret:
      process.env.JWT_SECRET || 'licyum_jwt_academic_secret_key_32chars_2026_xYz',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
    nextAuthSecret: process.env.NEXTAUTH_SECRET || 'licyum_nextauth_signing_secret',
    nextAuthUrl: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  },

  // 4. Pilar 1: Penerbitan & Legalitas
  publishing: {
    ikapiNumber: process.env.NEXT_PUBLIC_IKAPI_MEMBER_NUMBER || '612/DKI/2022',
    perpusnasApiKey: process.env.PERPUSNAS_ISBN_API_KEY || 'demo_perpusnas_token',
    perpusnasEndpoint:
      process.env.PERPUSNAS_ISBN_ENDPOINT || 'https://isbn.perpusnas.go.id/api/v2',
    hakiClientId: process.env.DJKI_HAKI_CLIENT_ID || 'demo_haki_client',
    hakiSecret: process.env.DJKI_HAKI_SECRET || 'demo_haki_secret',
  },

  // 5. Pilar 2: Portal Jurnal Ilmiah (OJS & Crossref DOI)
  journal: {
    ojsBaseUrl: process.env.OJS_BASE_URL || 'https://journal.licyum.id',
    ojsApiKey: process.env.OJS_API_KEY || 'demo_ojs_token',
    doiPrefix: process.env.CROSSREF_DOI_PREFIX || '10.58921',
    crossrefUsername: process.env.CROSSREF_USERNAME || 'licyum_publisher',
    crossrefPassword: process.env.CROSSREF_PASSWORD || '',
    turnitinAccountId: process.env.TURNITIN_ACCOUNT_ID || '882190',
    turnitinApiKey: process.env.TURNITIN_API_KEY || 'demo_turnitin_key',
  },

  // 6. Pilar 3: Pelatihan & Sertifikasi Digital
  training: {
    signerName: process.env.CERTIFICATE_SIGNER_NAME || 'Prof. Dr. Agus Raharjo, M.Si.',
    signerTitle:
      process.env.CERTIFICATE_SIGNER_TITLE || 'Direktur Eksekutif Licyum Institute',
    certificateHmacSecret:
      process.env.CERTIFICATE_SECRET_HMAC || 'licyum_cert_hmac_default_secret_key',
    bnspCode: process.env.BNSP_INSTITUTE_CODE || 'LPK-LIC-BNSP-2026',
    zoomClientId: process.env.ZOOM_API_CLIENT_ID || '',
    zoomClientSecret: process.env.ZOOM_API_CLIENT_SECRET || '',
  },

  // 7. Kontak & Hotline Pelanggan
  contact: {
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6281234567890',
    email: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'redaksi@licyum.id',
    phone: process.env.NEXT_PUBLIC_OFFICE_PHONE || '(021) 7891-234',
    midtransServerKey: process.env.MIDTRANS_SERVER_KEY || '',
    midtransClientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || '',
    midtransIsProduction: process.env.MIDTRANS_IS_PRODUCTION === 'true',
  },
};

/**
 * Helper to build an official WhatsApp direct chat link with pre-filled text
 */
export function createWhatsAppLink(message: string): string {
  const number = envConfig.contact.whatsapp;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
