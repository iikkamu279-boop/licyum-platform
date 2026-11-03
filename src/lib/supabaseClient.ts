import { createClient } from "@supabase/supabase-js";

/**
 * =========================================================================
 * SUPABASE CLIENT (BROWSER / CLIENT-SIDE)
 * Project ID: apdaijdbyunemscdbjsp
 * Project URL: https://apdaijdbyunemscdbjsp.supabase.co
 * Dashboard: https://supabase.com/dashboard/project/apdaijdbyunemscdbjsp/settings/api
 * =========================================================================
 */

export const SUPABASE_PROJECT_ID = "apdaijdbyunemscdbjsp";
export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://apdaijdbyunemscdbjsp.supabase.co";
export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Helper untuk mengecek apakah Supabase Anon Key sudah diisi oleh pengguna
export const isSupabaseConfigured = (): boolean => {
  return (
    Boolean(SUPABASE_URL) &&
    Boolean(SUPABASE_ANON_KEY) &&
    SUPABASE_ANON_KEY !== "YOUR_SUPABASE_ANON_KEY_HERE" &&
    SUPABASE_ANON_KEY.length > 20
  );
};

// Singleton Client instance
export const supabase = isSupabaseConfigured()
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;
