@echo off
setlocal
cd /d "%~dp0"
if /i "%~1"=="--check" goto check
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\abrir-site.ps1"
if not errorlevel 1 exit /b 0
pause
exit /b 1

:check
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\abrir-site.ps1" -CheckOnly
exit /b %errorlevel%
