/**
 * Inject lang switcher CSS/JS + nav flags into FR public pages.
 * Run: node scripts/inject-lang-switcher.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
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

const CSS_TAG = '<link rel="stylesheet" href="styles/lang-switcher.css?v=2026-08-12">';
const JS_TAG = '<script src="js/i18n-switcher.js?v=2026-08-12" defer></script>';

function switcherFor(file) {
  const en = 'en/' + file;
  return (
    '<li class="nav-item lang-switcher-wrap">\n' +
    '              <div class="lang-switcher" role="group" aria-label="Language">\n' +
    '                <a href="' + file + '" data-lang="fr" class="lang-btn is-active" hreflang="fr" title="Français" aria-current="true"><span aria-hidden="true">🇫🇷</span><span class="lang-code">FR</span></a>\n' +
    '                <a href="' + en + '" data-lang="en" class="lang-btn" hreflang="en" title="English"><span aria-hidden="true">🇬🇧</span><span class="lang-code">EN</span></a>\n' +
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

for (const file of PAGES) {
  const fp = path.join(ROOT, file);
  if (!fs.existsSync(fp)) {
    console.warn('skip missing', file);
    continue;
  }
  let html = fs.readFileSync(fp, 'utf8');

  if (!html.includes('lang-switcher.css')) {
    html = html.replace(
      /(<link[^>]*href="styles\/main\.css[^"]*"[^>]*>)/i,
      '$1\n    ' + CSS_TAG
    );
    if (!html.includes('lang-switcher.css')) {
      html = html.replace('</head>', '    ' + CSS_TAG + '\n</head>');
    }
  }

  if (!html.includes('i18n-switcher.js')) {
    html = html.replace('</body>', '    ' + JS_TAG + '\n</body>');
  }

  if (!html.includes('hreflang="fr"') || !html.includes('rel="alternate" hreflang="fr"')) {
    if (!html.includes('rel="alternate" hreflang="fr"')) {
      html = html.replace(
        /(<link rel="canonical"[^>]*>)/i,
        '$1\n' + hreflangBlock(file)
      );
      if (!html.includes('rel="alternate" hreflang="fr"')) {
        html = html.replace('</head>', hreflangBlock(file) + '</head>');
      }
    }
  }

  if (!html.includes('lang-switcher-wrap')) {
    const sw = switcherFor(file);
    // Insert before first item in nav-actions
    if (html.includes('nav-menu nav-actions')) {
      html = html.replace(
        /(<ul class="nav-menu nav-actions"[^>]*>)\s*/i,
        '$1\n            ' + sw
      );
    }
  }

  // Link to print brochure from depliant page
  if (file === 'depliant.html' && !html.includes('depliant-print.html')) {
    html = html.replace(
      /(<a href="depliant\.html"[^>]*>.*?Dépliant<\/a>)/i,
      '$1'
    );
  }

  fs.writeFileSync(fp, html, 'utf8');
  console.log('updated', file);
}

console.log('done');
