import { NextResponse } from 'next/server';
import { LicyumDatabase } from '@/lib/database';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (code) {
      const found = LicyumDatabase.trackings.getByCode(code);
      if (!found) {
        return NextResponse.json(
          {
            success: false,
            message: `Berkas dengan kode pelacakan "${code}" tidak ditemukan.`
          },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: found });
    }

    const all = LicyumDatabase.trackings.getAll();
    return NextResponse.json({ success: true, total: all.length, data: all });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Gagal memuat status pelacakan', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.trackingCode || !body.title || !body.applicant) {
      return NextResponse.json(
        { success: false, message: 'Field wajib: trackingCode, title, applicant' },
        { status: 400 }
      );
    }

    const created = LicyumDatabase.trackings.create({
      trackingCode: body.trackingCode.trim().toUpperCase(),
      type: body.type || 'ISBN',
      title: body.title,
      applicant: body.applicant,
      submissionDate: body.submissionDate || 'Hari Ini',
      currentStep: body.currentStep || 'Penerimaan Naskah & Verifikasi Dokumen',
      statusPercent: Number(body.statusPercent || 20),
      statusLabel: body.statusLabel || 'Dalam Antrean',
      notes: body.notes || 'Naskah telah masuk ke sistem registrasi redaksi.'
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Kode pelacakan baru berhasil dibuat!',
        data: created
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Gagal membuat tracking', error: error.message },
      { status: 500 }
    );
  }
}
