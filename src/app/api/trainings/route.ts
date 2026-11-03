import { NextResponse } from 'next/server';
import { getTrainings, createTraining } from '@/lib/supabaseDb';

export async function GET(request: Request) {
  try {
    const result = await getTrainings();
    return NextResponse.json({
      success: true,
      isSupabase: result.isSupabase,
      supabaseProject: "apdaijdbyunemscdbjsp",
      total: result.data.length,
      data: result.data
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Gagal memuat jadwal pelatihan', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.title || !body.instructor || !body.event_date) {
      return NextResponse.json(
        { success: false, message: 'Field wajib: title, instructor, event_date' },
        { status: 400 }
      );
    }

    const result = await createTraining({
      title: body.title,
      instructor: body.instructor,
      instructor_title: body.instructor_title || '',
      event_date: body.event_date,
      event_time: body.event_time || '09.00 - 15.00 WIB',
      location_type: body.location_type || 'Online (Zoom & LMS)',
      price: Number(body.price) || 0,
      quota: Number(body.quota) || 50,
      registered_count: Number(body.registered_count) || 0,
      hours_jp: Number(body.hours_jp) || 32,
      poster_url: body.poster_url || '',
      description: body.description || '',
      status: body.status || 'open'
    });

    return NextResponse.json({
      success: true,
      message: 'Pelatihan baru berhasil didaftarkan',
      isSupabase: result.isSupabase,
      data: result.data
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Gagal membuat pelatihan', error: error.message },
      { status: 500 }
    );
  }
}
