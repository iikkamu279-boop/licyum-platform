import { NextResponse } from 'next/server';
import { getCertificates, verifyCertificate } from '@/lib/supabaseDb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code') || searchParams.get('number');

    if (code) {
      const result = await verifyCertificate(code);
      if (!result.data) {
        return NextResponse.json(
          {
            success: false,
            message: `Nomor sertifikat "${code}" tidak ditemukan pada database resmi.`
          },
          { status: 404 }
        );
      }
      return NextResponse.json({
        success: true,
        isSupabase: result.isSupabase,
        data: result.data
      });
    }

    const result = await getCertificates();
    return NextResponse.json({
      success: true,
      isSupabase: result.isSupabase,
      supabaseProject: "apdaijdbyunemscdbjsp",
      data: result.data
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Gagal verifikasi sertifikat', error: error.message },
      { status: 500 }
    );
  }
}
