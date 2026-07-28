@echo off
REM Aquatel Technologies - local phone preview launcher
cd /d "%~dp0"
echo.
echo ============================================================
echo   AQUATEL TECHNOLOGIES - LOCAL PREVIEW
echo ============================================================
echo.
echo   On THIS PC open:     http://localhost:8080
echo.
echo   On your PHONE (same WiFi) open one of the addresses
echo   shown below as "http://...:8080" (use the 192.x or 172.x one)
echo.
echo   Press Ctrl+C in this window to stop the server.
echo ============================================================
echo.
npx http-server -p 8080 -c-1
pause
