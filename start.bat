@echo off
title Sant Kakaya - Dev Server
echo ========================================
echo   Sant Kakaya - Starting Dev Servers
echo ========================================
echo.
echo [1/2] Installing dependencies (if needed)...
cd /d "%~dp0"
call npm install --silent 2>nul

echo.
echo [2/2] Starting Frontend + Backend...
echo.
echo  Frontend  : http://localhost:5173
echo  Backend   : http://localhost:5000
echo.
echo Press Ctrl+C to stop all servers.
echo ========================================
echo.
call npm run dev:all
pause
