import type { Metadata } from 'next';
import './globals.css';
import { envConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: `${envConfig.app.name} — ${envConfig.app.tagline}`,
  description:
    'Satu ekosistem terintegrasi untuk publikasi buku ber-ISBN resmi IKAPI, portal e-journal OJS terakreditasi SINTA & DOAJ, serta lembaga pelatihan & konsultan pendidikan bersertifikat 32-40 JP.',
  keywords: [
    'Penerbitan Buku',
    'ISBN Perpusnas',
    'Jurnal Ilmiah',
    'SINTA Kemdikbud',
    'OJS 3',
    'Pelatihan Dosen',
    'Pelatihan Guru',
    'Sertifikasi BNSP',
    'Licyum',
    'HAKI Hak Cipta'
  ],
  authors: [{ name: 'Licyum Cipta Akademika' }]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-['Plus_Jakarta_Sans',sans-serif] bg-white text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
