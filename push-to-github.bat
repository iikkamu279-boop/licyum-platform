@echo off
title Push to GitHub — PT Licyum Cipta Akademika
echo =========================================================================
echo  PUSH PROJECT KE GITHUB REPOSITORY
echo  PT LICYUM CIPTA AKADEMIKA
echo =========================================================================
echo.
echo Langkah Persiapan:
echo  1. Buka browser: https://github.com/new
echo  2. Buat repository baru (misal: "licyum-platform" atau "licyum")
echo     (JANGAN centang "Add a README file" atau .gitignore)
echo  3. Salin (Copy) URL repository Anda (HTTPS).
echo.
set /p REPO_URL="Tempel (Paste) URL GitHub Repository Anda di sini: "

if "%REPO_URL%"=="" (
    echo URL tidak boleh kosong! Dibatalkan.
    pause
    exit /b
)

echo.
echo [1/3] Menghubungkan remote origin ke %REPO_URL%...
call git remote remove origin 2>nul
call git remote add origin %REPO_URL%

echo.
echo [2/3] Memastikan branch utama adalah main...
call git branch -M main

echo.
echo [3/3] Melakukan push ke GitHub...
echo (Jika diminta login, silakan klik Sign in with browser di jendela yang muncul)
echo.
call git push -u origin main

echo.
if %errorlevel% equ 0 (
    echo =========================================================================
    echo  SELAMAT! Project berhasil terdeploy ke GitHub:
    echo  %REPO_URL%
    echo =========================================================================
) else (
    echo =========================================================================
    echo  Push gagal atau dibatalkan. Pastikan URL repository benar dan Anda
    echo  memiliki izin akses ke repository tersebut.
    echo =========================================================================
)

pause
