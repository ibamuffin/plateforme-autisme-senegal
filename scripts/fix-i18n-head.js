/**
 * Ensure early i18n script in <head> and bump cache versions.
 * Run: node scripts/fix-i18n-head.js
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const ver = '2026-08-12c';

const pages = [
  'index.html',
  'associations-membres.html',
  'bureau-executif.html',
  'conseil-administration.html',
  'depliant.html',
  'depliant-print.html',
  'evenement.html',
  'jeux-interactifs.html',
  'mentions-legales.html',
  'mot-presidente.html',
  'politique-confidentialite.html',
  'repertoire-ecoles.html',
  'repertoire-medecins.html',
  'repertoire-paramedicaux.html',
  'temoignages-evenement.html'
];

function fix(file, isEn) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) return;
  let html = fs.readFileSync(full, 'utf8');
  const jsSrc = isEn ? `../js/i18n-switcher.js?v=${ver}` : `js/i18n-switcher.js?v=${ver}`;
  const cssSrc = isEn ? `../styles/lang-switcher.css?v=${ver}` : `styles/lang-switcher.css?v=${ver}`;

  html = html.replace(/\s*<script[^>]*i18n-switcher\.js[^>]*><\/script>/gi, '');

  if (/lang-switcher\.css/i.test(html)) {
    html = html.replace(/(?:\.\.\/)?styles\/lang-switcher\.css\?v=[^"']+/gi, cssSrc);
  } else if (/main\.css/i.test(html)) {
    html = html.replace(
      /(<link[^>]*main\.css[^>]*>)/i,
      `$1\n    <link rel="stylesheet" href="${cssSrc}">`
    );
  }

  html = html.replace(/(?:\.\.\/)?styles\/main\.css\?v=[^"']+/gi, (m) =>
    m.replace(/\?v=[^"']+/, `?v=${ver}`)
  );

  const tag = `    <script src="${jsSrc}"></script>\n`;
  if (/<\/head>/i.test(html)) {
    html = html.replace(/<\/head>/i, tag + '</head>');
  } else {
    html = tag + html;
  }

  fs.writeFileSync(full, html);
  console.log('ok', file);
}

for (const p of pages) {
  fix(p, false);
  fix(path.join('en', p), true);
}
