@echo off
setlocal
set ROOT=%~dp0..
cd /d "%ROOT%"

echo.
echo ==========================================
echo  Mise a jour flux RSS — P.A.S
echo ==========================================
echo.

echo [1/2] Aggregation Google Actualites (Python)...
python "%ROOT%\scripts\update-news-feed.py"
if errorlevel 1 (
    echo ERREUR: echec update-news-feed.py
    exit /b 1
)

echo.
echo [2/2] Deploiement FTP des fichiers RSS...
if not exist "%ROOT%\deploy-ovh-news.bat" (
    echo deploy-ovh-news.bat introuvable — fichiers generes localement uniquement.
    exit /b 0
)

call "%ROOT%\deploy-ovh-news.bat"
echo.
echo Termine.
