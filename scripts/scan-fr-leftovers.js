const fs = require('fs');
const files = [
  'index.html',
  'associations-membres.html',
  'mot-presidente.html',
  'bureau-executif.html',
  'conseil-administration.html',
  'depliant.html'
];
const keep = /Sénégal|Aïssatou|Ndeye|Kër|Xaleyi|Colombins|Delossi|Français|Liberté|Fann|Rufisque|Ouakam|Malika|Colobane|Cheikh|Diop|Gendarmerie|Rouilly|pédopsychiatrique|CHNU|INSEPS|Solidarité|Enfance|Espoir|Sourire|Maison|Monde|Naby|Sociale|Olympics|Enfants|Soleil|Collectif|Parents|Amis|Plateforme|Autisme|Camara|Seynabou|Kasse|Lamine|Khouma|Raby|Seydou|Khady|Aminata|Niane|Khadim|Magor|Marieme|Sadio|Mame|Seye|Thiam|Khadidiatou|Professeur|Guisse|Colobane|Iba|Mar|Anta|Assemblée|Médecins|Paramédicaux|Écoles|Spécialisées|répertoire|autisme|troubles|spectre|autistique|journée|avril|écoles|spécialisées|pédopsychiatrie|santé|publique|Afrique|ensemble|dépliant|bureau|exécutif|conseil|administration|membres|fédération|gouvernance|présidente|plaidoyer|familles|mobilisation|inclusion|scolaire|Ouest|sensibilisation|direction|organisation|plan|actions|assemblée|générale|Dakar|associations/;

for (const f of files) {
  const html = fs.readFileSync('en/' + f, 'utf8');
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ');
  const words = text.match(/[A-Za-zÀ-ÿ'’-]{3,}/g) || [];
  const leftovers = [...new Set(words.filter((w) => /[àâäéèêëïîôùûüç]/i.test(w) && !keep.test(w)))];
  console.log('\n==', f);
  console.log(leftovers.join(', ') || '(none)');
}
