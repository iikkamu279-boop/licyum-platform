import { NextResponse } from 'next/server';
import { LicyumDatabase } from '@/lib/database';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const cert = LicyumDatabase.certificates.getByNumber(params.id);
  if (!cert) {
    return NextResponse.json(
      { success: false, message: 'Sertifikat tidak ditemukan' },
      { status: 404 }
    );
  }
  return NextResponse.json({ success: true, data: cert });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updated = LicyumDatabase.certificates.update(params.id, body);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: 'Sertifikat tidak ditemukan untuk diperbarui' },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      message: 'Data sertifikat berhasil diperbarui',
      data: updated
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Gagal memperbarui sertifikat', error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const success = LicyumDatabase.certificates.delete(params.id);
  if (!success) {
    return NextResponse.json(
      { success: false, message: 'Sertifikat tidak ditemukan untuk dicabut/dihapus' },
      { status: 404 }
    );
  }
  return NextResponse.json({
    success: true,
    message: 'Sertifikat berhasil dihapus dari pangkalan data'
  });
}
