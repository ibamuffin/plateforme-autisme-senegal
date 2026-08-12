/**
 * Inject lang switcher into EN pages under en/ and fix active state.
 * Run: node scripts/inject-lang-switcher-en.js
 */
const fs = require('fs');
const path = require('path');

const EN_DIR = path.join(__dirname, '..', 'en');
const PAGES = [
  'index.html',
  'depliant.html',
  'associations-membres.html',
  'mot-presidente.html',
  'bureau-executif.html',
  'conseil-administration.html',
  'evenement.html',
  'temoignages-evenement.html',
  'jeux-interactifs.html',
  'repertoire-medecins.html',
  'repertoire-paramedicaux.html',
  'repertoire-ecoles.html',
  'mentions-legales.html',
  'politique-confidentialite.html'
];

const CSS_TAG = '<link rel="stylesheet" href="../styles/lang-switcher.css?v=2026-08-12">';
const JS_TAG = '<script src="../js/i18n-switcher.js?v=2026-08-12" defer></script>';

function switcherFor(file) {
  return (
    '<li class="nav-item lang-switcher-wrap">\n' +
    '              <div class="lang-switcher" role="group" aria-label="Language">\n' +
    '                <a href="../' + file + '" data-lang="fr" class="lang-btn" hreflang="fr" title="Français"><span aria-hidden="true">🇫🇷</span><span class="lang-code">FR</span></a>\n' +
    '                <a href="' + file + '" data-lang="en" class="lang-btn is-active" hreflang="en" title="English" aria-current="true"><span aria-hidden="true">🇬🇧</span><span class="lang-code">EN</span></a>\n' +
    '              </div>\n' +
    '            </li>\n'
  );
}

function hreflangBlock(file) {
  const base = 'https://www.plateforme-autisme-senegal.org/';
  const frUrl = base + (file === 'index.html' ? '' : file);
  const enUrl = base + 'en/' + file;
  return (
    '    <link rel="alternate" hreflang="fr" href="' + frUrl + '">\n' +
    '    <link rel="alternate" hreflang="en" href="' + enUrl + '">\n' +
    '    <link rel="alternate" hreflang="x-default" href="' + frUrl + '">\n'
  );
}

const NAV_EN = {
  'Accueil': 'Home',
  'Qui sommes-nous ?': 'About us',
  'Objectifs': 'Goals',
  'Activités': 'Activities',
  'Actualités': 'News',
  'Ressources': 'Resources',
  'Jeux Interactifs': 'Interactive Games',
  'Mot de la Présidente': "President's Message",
  'Associations Membres': 'Member Associations',
  'Organisation': 'Organisation',
  'Bureau Exécutif': 'Executive Board',
  "Conseil d'Administration": 'Board of Directors',
  'Événement': 'Event',
  'Témoignages': 'Testimonials',
  'Dépliant': 'Brochure',
  "Appel à l'action": 'Call to action',
  'Contact': 'Contact'
};

for (const file of PAGES) {
  const fp = path.join(EN_DIR, file);
  if (!fs.existsSync(fp)) {
    console.warn('skip', file);
    continue;
  }
  let html = fs.readFileSync(fp, 'utf8');

  html = html.replace(/<html lang="fr">/i, '<html lang="en">');

  if (!html.includes('lang-switcher.css')) {
    html = html.replace(
      /(<link[^>]*href="\.\.\/styles\/main\.css[^"]*"[^>]*>)/i,
      '$1\n    ' + CSS_TAG
    );
    if (!html.includes('lang-switcher.css')) {
      html = html.replace('</head>', '    ' + CSS_TAG + '\n</head>');
    }
  }

  if (!html.includes('i18n-switcher.js')) {
    html = html.replace('</body>', '    ' + JS_TAG + '\n</body>');
  }

  if (!html.includes('rel="alternate" hreflang="fr"')) {
    html = html.replace(
      /(<link rel="canonical"[^>]*>)/i,
      '$1\n' + hreflangBlock(file)
    );
    if (!html.includes('rel="alternate" hreflang="fr"')) {
      html = html.replace('</head>', hreflangBlock(file) + '</head>');
    }
  }

  // Fix canonical to en URL
  html = html.replace(
    /href="https:\/\/www\.plateforme-autisme-senegal\.org\/(?!en\/)/g,
    function (m) {
      return m; // leave other absolute links; fix canonical separately
    }
  );
  html = html.replace(
    /<link rel="canonical" href="https:\/\/www\.plateforme-autisme-senegal\.org\/([^"]*)">/,
    function (_, p) {
      if (p.startsWith('en/')) return '<link rel="canonical" href="https://www.plateforme-autisme-senegal.org/' + p + '">';
      return '<link rel="canonical" href="https://www.plateforme-autisme-senegal.org/en/' + (p || 'index.html') + '">';
    }
  );

  if (!html.includes('lang-switcher-wrap')) {
    const sw = switcherFor(file);
    if (html.includes('nav-menu nav-actions')) {
      html = html.replace(
        /(<ul class="nav-menu nav-actions"[^>]*>)\s*/i,
        '$1\n            ' + sw
      );
    }
  }

  // Basic nav label translation (visible link text)
  for (const [fr, en] of Object.entries(NAV_EN)) {
    const re = new RegExp('(>)' + fr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(<)', 'g');
    html = html.replace(re, '$1' + en + '$2');
  }

  // Fix nav links: index.html# -> keep relative; add ../ for sibling pages already handled by prepare-en

  fs.writeFileSync(fp, html, 'utf8');
  console.log('updated en/' + file);
}

console.log('done');
