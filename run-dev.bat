@echo off
title Licyum Platform — Development Server
echo =========================================================================
echo  PT LICYUM CIPTA AKADEMIKA — DEVELOPMENT SERVER
echo  Project Supabase: apdaijdbyunemscdbjsp
echo  Local Server: http://localhost:3000
echo =========================================================================
echo.
cd /d "%~dp0"
call npm run dev
pause
