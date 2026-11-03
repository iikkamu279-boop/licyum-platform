import { NextResponse } from 'next/server';
import { getBooks, createBook } from '@/lib/supabaseDb';

// GET /api/books - Mendapatkan daftar buku dari Supabase (atau fallback)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const query = searchParams.get('q');

    const result = await getBooks();
    let books = result.data;

    if (category && category !== 'Semua') {
      books = books.filter((b) => b.category.toLowerCase() === category.toLowerCase());
    }

    if (query) {
      const q = query.toLowerCase();
      books = books.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          (b.isbn && b.isbn.includes(q))
      );
    }

    return NextResponse.json({
      success: true,
      isSupabase: result.isSupabase,
      supabaseProject: "apdaijdbyunemscdbjsp",
      total: books.length,
      data: books,
      note: result.isSupabase
        ? "Data diambil langsung dari Supabase Database (public.books)"
        : (result.error ? `Koneksi Supabase aktif, namun: ${result.error}. Jalankan skema/GRANT di SQL Editor.` : "Menggunakan fallback lokal")
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Gagal memuat buku', error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/books - Menambahkan buku baru ke Supabase
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.title || !body.author || !body.isbn) {
      return NextResponse.json(
        {
          success: false,
          message: 'Field wajib belum lengkap: title, author, isbn'
        },
        { status: 400 }
      );
    }

    const result = await createBook({
      title: body.title,
      author: body.author,
      isbn: body.isbn,
      category: body.category || 'Buku Ajar',
      price: Number(body.price) || 0,
      pages: Number(body.pages) || 150,
      cover_url: body.cover_url || '',
      synopsis: body.synopsis || '',
      publisher: body.publisher || 'PT Licyum Cipta Akademika',
      status: body.status || 'published'
    });

    if (result.error && !result.data) {
      return NextResponse.json(
        { success: false, message: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: result.isSupabase
          ? 'Buku berhasil disimpan ke Supabase database!'
          : 'Buku disimpan ke memory (Masukkan Supabase key di .env untuk sinkronisasi permanen)',
        isSupabase: result.isSupabase,
        data: result.data
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Gagal menambahkan buku', error: error.message },
      { status: 500 }
    );
  }
}
