/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  env: {
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Licyum Indonesia',
    NEXT_PUBLIC_APP_TAGLINE:
      process.env.NEXT_PUBLIC_APP_TAGLINE ||
      'Ekosistem Terpadu Penerbitan Buku, Jurnal Ilmiah & Pelatihan',
    NEXT_PUBLIC_WHATSAPP_NUMBER:
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6281234567890',
    NEXT_PUBLIC_SUPPORT_EMAIL:
      process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'redaksi@licyum.id',
    NEXT_PUBLIC_IKAPI_MEMBER_NUMBER:
      process.env.NEXT_PUBLIC_IKAPI_MEMBER_NUMBER || '612/DKI/2022',
  },
};

module.exports = nextConfig;
