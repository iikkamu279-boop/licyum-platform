import { createClient } from "@supabase/supabase-js";

/**
 * =========================================================================
 * SUPABASE SERVER CLIENT (API ROUTES & SERVER COMPONENTS)
 * Digunakan pada Server-side API handler dengan hak akses penuh (Service Role)
 * atau fallback ke anon key jika service role belum disetel.
 * =========================================================================
 */

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://apdaijdbyunemscdbjsp.supabase.co";

const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "";

export const isServerSupabaseConfigured = (): boolean => {
  return (
    Boolean(SUPABASE_URL) &&
    Boolean(SUPABASE_SERVICE_ROLE_KEY) &&
    SUPABASE_SERVICE_ROLE_KEY !== "YOUR_SUPABASE_SERVICE_ROLE_KEY_HERE" &&
    SUPABASE_SERVICE_ROLE_KEY.length > 20
  );
};

export const getSupabaseServerClient = () => {
  if (!isServerSupabaseConfigured()) {
    return null;
  }
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};
