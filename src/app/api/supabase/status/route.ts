import { NextResponse } from 'next/server';
import { checkSupabaseConnection } from '@/lib/supabaseDb';

export async function GET() {
  try {
    const status = await checkSupabaseConnection();
    return NextResponse.json({
      success: true,
      ...status
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      connected: false,
      message: error.message
    }, { status: 500 });
  }
}
