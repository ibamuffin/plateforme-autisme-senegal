/**
 * Bump main.js + i18n-switcher.js cache query on public HTML pages.
 * Run: node scripts/bump-js-cache.js
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const ver = '2026-08-12e';
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

function bump(file) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) return;
  let html = fs.readFileSync(full, 'utf8');
  html = html.replace(/(?:\.\.\/)?js\/main\.js\?v=[^"']+/g, (m) =>
    m.replace(/\?v=[^"']+/, `?v=${ver}`)
  );
  html = html.replace(/(?:\.\.\/)?js\/i18n-switcher\.js\?v=[^"']+/g, (m) =>
    m.replace(/\?v=[^"']+/, `?v=${ver}`)
  );
  // also plain main.js without query
  html = html.replace(
    /(src="(?:\.\.\/)?js\/main\.js)(")/g,
    `$1?v=${ver}$2`
  );
  html = html.replace(/\?v=\d{4}-\d{2}-\d{2}d\?v=/g, `?v=`); // safety if double
  fs.writeFileSync(full, html);
  console.log('ok', file);
}

for (const p of pages) {
  bump(p);
  bump(path.join('en', p));
}
