@echo off
title Push to GitHub — iikkamu279-boop/licyum
echo =========================================================================
echo  PUSH PROJECT KE GITHUB: https://github.com/iikkamu279-boop/licyum.git
echo  PT LICYUM CIPTA AKADEMIKA
echo =========================================================================
echo.
set PATH=%PATH%;C:\Users\lenovo\AppData\Local\Programs\MinGit\cmd

echo Repository Target: https://github.com/iikkamu279-boop/licyum.git
echo Branch: main
echo.
echo Pilih metode autentikasi GitHub Anda:
echo  [1] Gunakan GitHub Personal Access Token (Direkomendasikan - 100%% Sukses)
echo  [2] Coba Login Biasa (Git Push langsung)
echo.
set /p PILIHAN="Pilih metode (1 atau 2, default 1): "

if "%PILIHAN%"=="2" (
    echo.
    echo Menjalankan git push -u origin main...
    call git push -u origin main
) else (
    echo.
    echo Cara membuat Personal Access Token di GitHub:
    echo  1. Buka browser: https://github.com/settings/tokens/new
    echo  2. Beri nama Note (misal: "licyum-deploy")
    echo  3. Centang opsi: "repo" (Full control of private/public repositories)
    echo  4. Klik tombol hijau "Generate token" di bagian paling bawah
    echo  5. Salin token tersebut (formatnya dimulai dengan: ghp_...)
    echo.
    set /p GH_TOKEN="Tempel (Paste) token GitHub Anda (ghp_...): "
    
    if "%GH_TOKEN%"=="" (
        echo Token tidak boleh kosong! Batal.
        pause
        exit /b
    )

    echo.
    echo Melakukan push ke https://github.com/iikkamu279-boop/licyum.git...
    call git push https://%GH_TOKEN%@github.com/iikkamu279-boop/licyum.git main
)

echo.
if %errorlevel% equ 0 (
    echo =========================================================================
    echo  SELAMAT! Project Licyum berhasil terdeploy ke GitHub:
    echo  https://github.com/iikkamu279-boop/licyum
    echo =========================================================================
) else (
    echo =========================================================================
    echo  Push belum berhasil.
    echo  Pastikan Token memiliki centang hak akses 'repo' dan akun Anda
    echo  adalah pemilik repository iikkamu279-boop/licyum.
    echo =========================================================================
)

pause
