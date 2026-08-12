/**
 * Move FR/EN flags out of crowded nav-actions to far-right .nav-lang-end
 * Run: node scripts/fix-nav-lang-end.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const FR_PAGES = [
  'index.html', 'depliant.html', 'associations-membres.html', 'mot-presidente.html',
  'bureau-executif.html', 'conseil-administration.html', 'evenement.html',
  'temoignages-evenement.html', 'jeux-interactifs.html', 'repertoire-medecins.html',
  'repertoire-paramedicaux.html', 'repertoire-ecoles.html', 'mentions-legales.html',
  'politique-confidentialite.html'
];

const EN_PAGES = FR_PAGES.map((f) => path.join('en', f));

function fixPage(rel) {
  const fp = path.join(ROOT, rel);
  if (!fs.existsSync(fp)) return console.warn('skip', rel);
  let html = fs.readFileSync(fp, 'utf8');

  // Extract existing lang switcher inner HTML if present
  const wrapRe = /<li class="nav-item lang-switcher-wrap">[\s\S]*?<\/li>\s*/i;
  const m = html.match(wrapRe);
  if (!m) {
    console.warn('no switcher in', rel);
    return;
  }
  const inner = m[0]
    .replace(/<li class="nav-item lang-switcher-wrap">/i, '')
    .replace(/<\/li>\s*$/i, '')
    .trim();

  // Remove from nav-actions
  html = html.replace(wrapRe, '');

  // Don't duplicate
  if (html.includes('nav-lang-end')) {
    html = html.replace(/<div class="nav-lang-end"[\s\S]*?<\/div>\s*(?=<div class="hamburger"|<\/div>\s*<\/nav>)/i, '');
  }

  const block =
    '            <div class="nav-lang-end" aria-label="Language">\n' +
    '              ' + inner + '\n' +
    '            </div>\n';

  // Insert before hamburger
  if (html.includes('class="hamburger"')) {
    html = html.replace(
      /(\s*)(<div class="hamburger">)/,
      '\n' + block + '$1$2'
    );
  } else {
    // insert before closing nav-container
    html = html.replace(
      /(<\/div>\s*<\/nav>)/,
      block + '$1'
    );
  }

  fs.writeFileSync(fp, html, 'utf8');
  console.log('fixed', rel);
}

[...FR_PAGES, ...EN_PAGES].forEach(fixPage);
console.log('done');
