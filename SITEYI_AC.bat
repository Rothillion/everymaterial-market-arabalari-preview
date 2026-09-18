@echo off
setlocal
cd /d "%~dp0"
set PORT=8080

echo EveryMaterial onizleme siteyi baslatiyor...
echo.

where python >nul 2>nul
if %errorlevel%==0 (
    start "EveryMaterial Preview Server" /min cmd /c "python -m http.server %PORT%"
    goto :launch
)

where py >nul 2>nul
if %errorlevel%==0 (
    start "EveryMaterial Preview Server" /min cmd /c "py -m http.server %PORT%"
    goto :launch
)

where npx >nul 2>nul
if %errorlevel%==0 (
    start "EveryMaterial Preview Server" /min cmd /c "npx --yes serve -l %PORT% ."
    goto :launch
)

echo Python veya Node.js bulunamadi.
echo Lutfen birini kurun:
echo   Python: https://www.python.org/downloads/
echo   Node.js: https://nodejs.org/
pause
exit /b 1

:launch
timeout /t 2 /nobreak >nul
start "" http://localhost:%PORT%/index.html
echo.
echo Site tarayicida acildi: http://localhost:%PORT%/index.html
echo Bu pencereyi KAPATMAYIN - kapatirsaniz site de durur.
echo Bitirdiginizde bu pencereyi kapatabilirsiniz.
pause
