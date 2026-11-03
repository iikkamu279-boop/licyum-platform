import { NextResponse } from 'next/server';
import { LicyumDatabase } from '@/lib/database';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const training = LicyumDatabase.trainings.getById(params.id);
  if (!training) {
    return NextResponse.json(
      { success: false, message: 'Pelatihan tidak ditemukan' },
      { status: 404 }
    );
  }
  return NextResponse.json({ success: true, data: training });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updated = LicyumDatabase.trainings.update(params.id, body);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: 'Pelatihan tidak ditemukan untuk diperbarui' },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      message: 'Jadwal pelatihan berhasil diperbarui',
      data: updated
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Gagal memperbarui pelatihan', error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const success = LicyumDatabase.trainings.delete(params.id);
  if (!success) {
    return NextResponse.json(
      { success: false, message: 'Pelatihan tidak ditemukan untuk dihapus' },
      { status: 404 }
    );
  }
  return NextResponse.json({
    success: true,
    message: 'Pelatihan berhasil dihapus dari jadwal'
  });
}
