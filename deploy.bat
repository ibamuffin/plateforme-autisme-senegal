@echo off
echo ========================================
echo   DEPLOIEMENT PLATEFORME AUTISME SENEGAL
echo ========================================
echo.

echo Preparation du site pour deploiement...
echo.

echo Verification des fichiers necessaires...
if not exist "index.html" (
    echo ERREUR: index.html non trouve!
    pause
    exit /b 1
)

if not exist "styles\main.css" (
    echo ERREUR: styles/main.css non trouve!
    pause
    exit /b 1
)

if not exist "js\main.js" (
    echo ERREUR: js/main.js non trouve!
    pause
    exit /b 1
)

echo ✓ Tous les fichiers sont presents
echo.

echo Options de deploiement disponibles:
echo.
echo 1. Netlify Drag ^& Drop (Recommande)
echo 2. Vercel
echo 3. GitHub Pages
echo 4. Firebase Hosting
echo 5. Surge.sh
echo.

set /p choice="Choisissez une option (1-5): "

if "%choice%"=="1" (
    echo.
    echo ===========================================
    echo   DEPLOIEMENT NETLIFY DRAG ^& DROP
    echo ===========================================
    echo.
    echo 1. Ouvrez votre navigateur sur: https://netlify.com/drop
    echo 2. Glissez-deposez ce dossier sur la page
    echo 3. Votre site sera en ligne en quelques secondes
    echo.
    echo Ouverture de Netlify Drop...
    start https://netlify.com/drop
    echo.
    echo Ouverture du dossier du projet...
    start .
)

if "%choice%"=="2" (
    echo.
    echo ===========================================
    echo   DEPLOIEMENT VERCEL
    echo ===========================================
    echo.
    echo 1. Ouvrez votre navigateur sur: https://vercel.com
    echo 2. Cliquez sur "Import Project"
    echo 3. Glissez-deposez ce dossier
    echo.
    start https://vercel.com
    start .
)

if "%choice%"=="3" (
    echo.
    echo ===========================================
    echo   DEPLOIEMENT GITHUB PAGES
    echo ===========================================
    echo.
    echo 1. Creez un repository GitHub
    echo 2. Uploadez tous les fichiers
    echo 3. Activez GitHub Pages dans Settings
    echo.
    start https://github.com
)

if "%choice%"=="4" (
    echo.
    echo ===========================================
    echo   DEPLOIEMENT FIREBASE
    echo ===========================================
    echo.
    echo Installation de Firebase CLI...
    npm install -g firebase-tools
    echo Initialisation...
    firebase login
    firebase init hosting
    echo Deploiement...
    firebase deploy
)

if "%choice%"=="5" (
    echo.
    echo ===========================================
    echo   DEPLOIEMENT SURGE.SH
    echo ===========================================
    echo.
    echo Installation de Surge...
    npm install -g surge
    echo Deploiement...
    surge
)

echo.
echo Deploiement termine!
echo Votre site est maintenant accessible en ligne.
echo.
pause
