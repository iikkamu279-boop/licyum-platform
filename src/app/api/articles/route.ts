import { NextResponse } from 'next/server';
import { LicyumDatabase } from '@/lib/database';

// GET /api/articles - Mengambil daftar artikel jurnal
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const journalId = searchParams.get('journalId');
    const query = searchParams.get('q');

    let articles = LicyumDatabase.articles.getAll();

    if (journalId && journalId !== 'all') {
      articles = articles.filter((a) => a.journalId === journalId);
    }

    if (query) {
      const q = query.toLowerCase();
      articles = articles.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.authors.some((au) => au.toLowerCase().includes(q)) ||
          a.doi.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({
      success: true,
      total: articles.length,
      data: articles
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Gagal memuat artikel', error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/articles - Submit artikel baru ke OJS
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.title || !body.journalId || !body.abstract) {
      return NextResponse.json(
        { success: false, message: 'Field wajib: title, journalId, abstract' },
        { status: 400 }
      );
    }

    const createdArticle = LicyumDatabase.articles.create({
      journalId: body.journalId,
      journalName: body.journalName || 'Licyum Journal',
      title: body.title,
      authors: Array.isArray(body.authors) ? body.authors : [body.authors || 'Penulis Peneliti'],
      affiliation: body.affiliation || 'Institusi Akademik',
      doi: body.doi || `10.58921/${body.journalId}.v1i1.${Math.floor(100 + Math.random() * 900)}`,
      publicationDate: body.publicationDate || 'Terbitan Terbaru 2026',
      volume: body.volume || 'Vol. 1 No. 1 (2026)',
      issue: body.issue || 'Regular Issue',
      citations: Number(body.citations || 0),
      abstract: body.abstract,
      keywords: Array.isArray(body.keywords) ? body.keywords : ['Riset', 'Publikasi'],
      pdfDownloadUrl: body.pdfDownloadUrl || '#'
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Artikel berhasil didaftarkan ke portal jurnal!',
        data: createdArticle
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Gagal membuat artikel', error: error.message },
      { status: 500 }
    );
  }
}
