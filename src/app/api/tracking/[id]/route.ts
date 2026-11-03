import { NextResponse } from 'next/server';
import { LicyumDatabase } from '@/lib/database';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const item = LicyumDatabase.trackings.getByCode(params.id);
  if (!item) {
    return NextResponse.json(
      { success: false, message: 'Status pelacakan tidak ditemukan' },
      { status: 404 }
    );
  }
  return NextResponse.json({ success: true, data: item });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updated = LicyumDatabase.trackings.update(params.id, body);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: 'Kode tracking tidak ditemukan untuk diperbarui' },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      message: 'Status progres berhasil diperbarui!',
      data: updated
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Gagal memperbarui status', error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const success = LicyumDatabase.trackings.delete(params.id);
  if (!success) {
    return NextResponse.json(
      { success: false, message: 'Tracking tidak ditemukan untuk dihapus' },
      { status: 404 }
    );
  }
  return NextResponse.json({
    success: true,
    message: 'Data pelacakan berhasil dihapus'
  });
}
