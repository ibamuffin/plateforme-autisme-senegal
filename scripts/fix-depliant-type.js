/**
 * Bump depliant-print typography + fill contact panel void (FR + EN).
 * Run: node scripts/fix-depliant-type.js
 */
const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, '..', 'depliant-print.html'),
  path.join(__dirname, '..', 'en', 'depliant-print.html')
];

const contactCss = `
.contact-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3mm 4mm 2.5mm;
  position: relative;
  z-index: 2;
  width: 100%;
  gap: 2.2mm;
  overflow: hidden;
  min-height: 0;
  justify-content: space-between;
}

.contact-logo-circle {
  width: 26mm; height: 26mm;
  border-radius: 50%;
  border: 2px solid rgba(230,126,34,0.65);
  background: rgba(0,114,188,0.18);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.contact-pas {
  font-family: 'Montserrat', sans-serif;
  font-size: 15pt;
  font-weight: 900;
  color: var(--orange);
  letter-spacing: 2px;
  line-height: 1;
}
.contact-name {
  font-size: 4.8pt;
  font-weight: 700;
  color: rgba(255,255,255,0.9);
  letter-spacing: 0.3px;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  margin-top: 0.8mm;
  max-width: 24mm;
  line-height: 1.15;
}

.contact-divider {
  width: 88%;
  display: flex;
  align-items: center;
  gap: 2mm;
  flex-shrink: 0;
}
.contact-div-line {
  flex: 1;
  height: 1px;
  background: rgba(230,126,34,0.45);
}
.contact-div-dot {
  width: 3.5mm; height: 3.5mm;
  background: var(--orange);
  border-radius: 50%;
  flex-shrink: 0;
}

.contact-items {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2mm;
  flex-shrink: 0;
}
.contact-item {
  display: flex;
  align-items: center;
  gap: 2mm;
}
.contact-badge {
  width: 12mm; height: 6.5mm;
  border-radius: 1.5mm;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Montserrat', sans-serif;
  font-size: 6.5pt;
  font-weight: 700;
  color: var(--blanc);
  flex-shrink: 0;
}
.contact-val {
  font-size: 7.5pt;
  color: rgba(255,255,255,0.95);
  line-height: 1.35;
  word-break: break-word;
  font-family: 'Open Sans', sans-serif;
}

/* Ruban puzzles (masqué pour laisser place aux 12 logos) */
.puzzle-ribbon {
  display: none;
}
.puzz-chip {
  width: 8mm; height: 8mm;
  clip-path: polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%);
}

/* ── LOGOS ASSOCIATIONS MEMBRES ── */
.members-section {
  width: 100%;
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 2mm;
  justify-content: flex-end;
}
.members-hd {
  display: flex;
  align-items: center;
  gap: 2mm;
  flex-shrink: 0;
}
.members-hd-line {
  flex: 1;
  height: 1px;
  background: rgba(230,126,34,0.45);
}
.members-hd-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 7pt;
  font-weight: 800;
  color: var(--orange);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
}
.members-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 1.5mm;
  width: 100%;
  flex: 1 1 auto;
  min-height: 52mm;
}
.member-logo {
  background: rgba(255,255,255,0.96);
  border-radius: 1.5mm;
  border: 1px solid rgba(230,126,34,0.25);
  height: 100%;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.22);
}
.member-logo img {
  width: 100%; height: 100%;
  object-fit: contain;
  padding: 1mm;
  display: block;
}
.member-logo--dark {
  background: #0f172a;
}
/* Badge texte pour association sans logo */
.member-badge {
  background: linear-gradient(135deg, var(--bleu-nuit), var(--bleu-corps));
  border-radius: 1.5mm;
  border: 1px solid rgba(230,126,34,0.5);
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1mm;
  box-shadow: 0 1px 3px rgba(0,0,0,0.22);
  gap: 0.5mm;
}
.member-badge-icon {
  font-size: 8pt;
  line-height: 1;
}
.member-badge-name {
  font-family: 'Montserrat', sans-serif;
  font-size: 4.2pt;
  font-weight: 800;
  color: var(--blanc);
  text-align: center;
  line-height: 1.15;
  letter-spacing: 0.2px;
}
.members-tagline {
  font-family: 'Open Sans', sans-serif;
  font-size: 6pt;
  color: rgba(255,255,255,0.75);
  text-align: center;
  font-style: italic;
  line-height: 1.35;
  flex-shrink: 0;
}

.contact-slogan {
  width: 100%;
  background: var(--orange);
  border-radius: 2mm;
  padding: 2.5mm 3mm;
  text-align: center;
  flex-shrink: 0;
}
.contact-slogan-text {
  font-family: 'Montserrat', sans-serif;
  font-size: 7.5pt;
  font-weight: 800;
  color: var(--blanc);
  letter-spacing: 0.3px;
}
`;

function bump(html) {
  const reps = [
    [/\.stat-val \{\s*font-family: 'Montserrat', sans-serif;\s*font-size: 16pt;/g,
      ".stat-val {\n  font-family: 'Montserrat', sans-serif;\n  font-size: 18pt;"],
    [/\.stat-lbl \{\s*font-size: 6pt;/g, '.stat-lbl {\n  font-size: 7.2pt;'],
    [/\.ctx-text \{\s*font-size: 7\.5pt;/g, '.ctx-text {\n  font-size: 8.5pt;'],
    [/\.ctx-quote p \{\s*font-size: 7\.5pt;/g, '.ctx-quote p {\n  font-size: 8.5pt;'],
    [/\.act-title \{\s*font-family: 'Montserrat', sans-serif;\s*font-size: 7pt;/g,
      ".act-title {\n  font-family: 'Montserrat', sans-serif;\n  font-size: 8pt;"],
    [/\.act-desc \{\s*font-size: 6\.8pt;/g, '.act-desc {\n  font-size: 7.6pt;'],
    [/\.res-title \{\s*font-family: 'Montserrat', sans-serif;\s*font-weight: 700;\s*font-size: 7\.5pt;/g,
      ".res-title {\n  font-family: 'Montserrat', sans-serif;\n  font-weight: 700;\n  font-size: 8.5pt;"],
    [/\.res-desc \{\s*font-size: 6\.8pt;/g, '.res-desc {\n  font-size: 7.6pt;'],
    [/\.oms-title \{\s*font-family: 'Montserrat', sans-serif;\s*font-size: 7pt;/g,
      ".oms-title {\n  font-family: 'Montserrat', sans-serif;\n  font-size: 8pt;"],
    [/\.oms-text \{\s*font-size: 7pt;/g, '.oms-text {\n  font-size: 8pt;'],
    [/\.oms-sub \{\s*font-size: 5\.8pt;/g, '.oms-sub {\n  font-size: 6.8pt;'],
  ];
  for (const [re, to] of reps) html = html.replace(re, to);

  // Replace contact block from .contact-body through .contact-slogan-text
  const start = html.indexOf('.contact-body {');
  const endMarker = '.contact-bottom {';
  const end = html.indexOf(endMarker);
  if (start === -1 || end === -1) throw new Error('contact CSS markers not found');
  html = html.slice(0, start) + contactCss.trim() + '\n\n' + html.slice(end);
  return html;
}

for (const f of files) {
  let html = fs.readFileSync(f, 'utf8');
  html = bump(html);
  fs.writeFileSync(f, html);
  console.log('ok', path.relative(path.join(__dirname, '..'), f));
}
