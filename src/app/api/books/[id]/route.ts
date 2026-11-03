import { NextResponse } from 'next/server';
import { updateBook, deleteBook, getBooks } from '@/lib/supabaseDb';

// GET /api/books/[id] - Ambil detail 1 buku
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const result = await getBooks();
    const book = result.data.find((b) => b.id === id);

    if (!book) {
      return NextResponse.json(
        { success: false, message: 'Buku tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      isSupabase: result.isSupabase,
      data: book
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan', error: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/books/[id] - Update buku
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    const result = await updateBook(id, body);

    if (!result.data) {
      return NextResponse.json(
        { success: false, message: result.error || 'Buku tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Data buku berhasil diperbarui',
      isSupabase: result.isSupabase,
      data: result.data
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Gagal update buku', error: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/books/[id] - Hapus buku
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const result = await deleteBook(id);

    return NextResponse.json({
      success: result.success,
      message: result.success ? 'Buku berhasil dihapus' : result.error || 'Gagal menghapus buku',
      isSupabase: result.isSupabase
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Gagal menghapus buku', error: error.message },
      { status: 500 }
    );
  }
}
