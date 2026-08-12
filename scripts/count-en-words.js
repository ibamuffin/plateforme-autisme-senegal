const fs = require('fs');
const files = [
  'index.html',
  'associations-membres.html',
  'mot-presidente.html',
  'bureau-executif.html',
  'conseil-administration.html',
  'depliant.html'
];
let total = 0;
for (const f of files) {
  const t = fs
    .readFileSync('en/' + f, 'utf8')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ');
  const n = t.split(/\s+/).filter(Boolean).length;
  total += n;
  console.log(f, n);
}
console.log('TOTAL_VISIBLE_WORDS', total);
// Rough translated body (exclude nav chrome): ~80% of visible
console.log('APPROX_TRANSLATED', Math.round(total * 0.85));
