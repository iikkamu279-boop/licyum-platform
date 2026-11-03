@echo off
title Supabase CLI Linker — PT Licyum Cipta Akademika
echo =========================================================================
echo  SUPABASE CLI AUTOMATIC LINKER
echo  Project Reference: apdaijdbyunemscdbjsp
echo  Project URL: https://apdaijdbyunemscdbjsp.supabase.co
echo =========================================================================
echo.
echo [1/3] Membuka halaman Personal Access Token di browser Anda...
start https://supabase.com/dashboard/account/tokens
echo.
echo Langkah di browser:
echo  1. Klik tombol "Generate new token"
echo  2. Beri nama token (misal: "licyum-cli")
echo  3. Salin (Copy) token yang muncul (format: sbp_...)
echo.
set /p SUPABASE_TOKEN="[2/3] Tempel (Paste) token Supabase Anda di sini: "

if "%SUPABASE_TOKEN%"=="" (
    echo Token tidak boleh kosong! Batal.
    pause
    exit /b
)

echo.
echo [3/3] Melakukan login dan linking ke project apdaijdbyunemscdbjsp...
call npx supabase login --token %SUPABASE_TOKEN%
call npx supabase link --project-ref apdaijdbyunemscdbjsp
echo.
echo =========================================================================
echo  PROSES LINKING SELESAI!
echo  Untuk push skema migrasi ke database Supabase, jalankan:
echo    npx supabase db push
echo =========================================================================
pause
