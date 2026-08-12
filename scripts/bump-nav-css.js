const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const files = [
  'index.html', 'depliant.html', 'associations-membres.html', 'jeux-interactifs.html',
  'evenement.html', 'temoignages-evenement.html', 'mot-presidente.html', 'bureau-executif.html',
  'conseil-administration.html', 'repertoire-medecins.html', 'repertoire-paramedicaux.html',
  'repertoire-ecoles.html', 'mentions-legales.html', 'politique-confidentialite.html',
  'en/index.html', 'en/depliant.html', 'en/associations-membres.html', 'en/jeux-interactifs.html',
  'en/evenement.html', 'en/temoignages-evenement.html', 'en/mot-presidente.html',
  'en/bureau-executif.html', 'en/conseil-administration.html', 'en/repertoire-medecins.html',
  'en/repertoire-paramedicaux.html', 'en/repertoire-ecoles.html', 'en/mentions-legales.html',
  'en/politique-confidentialite.html'
];
for (const f of files) {
  const p = path.join(root, f);
  if (!fs.existsSync(p)) continue;
  let h = fs.readFileSync(p, 'utf8');
  h = h.replace(/main\.css\?v=[^"']+/g, 'main.css?v=2026-08-12a');
  h = h.replace(/lang-switcher\.css\?v=[^"']+/g, 'lang-switcher.css?v=2026-08-12a');
  if (!h.includes('lang-switcher.css')) {
    h = h.replace(/main\.css\?v=2026-08-12a"/, 'main.css?v=2026-08-12a">\n    <link rel="stylesheet" href="' + (f.startsWith('en/') ? '../' : '') + 'styles/lang-switcher.css?v=2026-08-12a"');
  }
  fs.writeFileSync(p, h);
  console.log('ok', f);
}
