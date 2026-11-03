@echo off
title Push to GitHub — iikkamu279-boop/licyum-platform
echo =========================================================================
echo  PUSH PROJECT KE GITHUB: https://github.com/iikkamu279-boop/licyum-platform.git
echo  PT LICYUM CIPTA AKADEMIKA
echo =========================================================================
echo.
set PATH=%PATH%;C:\Users\lenovo\AppData\Local\Programs\MinGit\cmd

echo Repository Target: https://github.com/iikkamu279-boop/licyum-platform.git
echo Branch: main
echo.
echo Membuka halaman generate token di browser Anda...
start https://github.com/settings/tokens/new
echo.
echo Langkah di browser:
echo  1. Halaman pembuatan token GitHub sudah terbuka.
echo  2. Beri nama Note (misal: "licyum-platform-token").
echo  3. Pastikan kotak [repo] dicentang.
echo  4. Klik tombol hijau "Generate token" di bawah.
echo  5. Salin token tersebut (dimulai dengan ghp_...).
echo.
set /p GH_TOKEN="Tempelkan (Paste) token GitHub Anda (ghp_...) di sini: "

if "%GH_TOKEN%"=="" (
    echo.
    echo Token kosong. Mencoba push langsung (interaktif)...
    call git push -u origin main
) else (
    echo.
    echo Mengunggah ke https://github.com/iikkamu279-boop/licyum-platform.git...
    call git push https://%GH_TOKEN%@github.com/iikkamu279-boop/licyum-platform.git main
)

echo.
if %errorlevel% equ 0 (
    echo =========================================================================
    echo  SELAMAT! Seluruh project Licyum berhasil terdeploy ke GitHub:
    echo  https://github.com/iikkamu279-boop/licyum-platform
    echo =========================================================================
) else (
    echo =========================================================================
    echo  Push belum berhasil.
    echo  Pastikan Token Anda memiliki centang hak akses 'repo'.
    echo =========================================================================
)

pause
