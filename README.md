# Plateforme Associations Autisme - Sénégal 🧩

Un site web responsive et moderne dédié à la plateforme des associations d'autisme au Sénégal, visant à améliorer la prise en charge des enfants vivant avec les Troubles du Spectre Autistique (TSA).

## 🌐 **SITE EN LIGNE** 
🚀 **Accès temporaire pour présentation :** [plateforme-autisme-senegal.netlify.app](https://plateforme-autisme-senegal.netlify.app)

## 📋 Description

Ce projet présente la plateforme des associations d'autisme au Sénégal, créée pour coordonner les efforts de toutes les associations travaillant dans le domaine de l'autisme. Le site met en avant :

- **Contexte et justification** : Les défis de l'autisme au Sénégal
- **Objectifs** : Les buts de la plateforme pour améliorer la prise en charge
- **Activités** : Les actions concrètes menées par la plateforme
- **Résultats attendus** : L'impact espéré sur la situation des enfants avec TSA

## 🎯 Statistiques Clés

- **1 personne sur 160** est touchée par l'autisme selon l'OMS
- **0,8% des enfants** en bas âge sont concernés au Sénégal (Centre pédopsychiatrique de l'hôpital Fann)

## ✨ Fonctionnalités

### Design et UX
- ✅ Design responsive (mobile, tablette, desktop)
- ✅ Interface moderne et accessible
- ✅ Animations CSS fluides
- ✅ Thème cohérent avec symbolique de l'autisme (pièces de puzzle)

### Navigation
- ✅ Menu de navigation fixe avec effet de scroll
- ✅ Menu hamburger pour mobile
- ✅ Navigation au clavier (Alt + flèches)
- ✅ Défilement fluide entre les sections

### Interactivité
- ✅ Formulaire de contact avec validation
- ✅ Animations à l'apparition des éléments
- ✅ Compteurs animés pour les statistiques
- ✅ Barres de progression pour les résultats
- ✅ Notifications système

### Accessibilité
- ✅ Contraste de couleurs conforme
- ✅ Navigation au clavier
- ✅ Textes alternatifs pour les icônes
- ✅ Structure sémantique HTML5

## 🛠️ Technologies Utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Styles modernes avec Flexbox/Grid, animations
- **JavaScript ES6+** : Interactivité et fonctionnalités dynamiques
- **Font Awesome** : Icônes vectorielles
- **Google Fonts** : Typographie (Inter)

## 📁 Structure du Projet

```
d:\MINE\Projets\Autisme\Sites\
├── index.html                          # Page principale
├── styles/
│   ├── main.css                        # Feuilles de styles
│   └── fontawesome-local.css           # Styles Font Awesome
├── js/
│   ├── main.js                         # Scripts JavaScript
│   └── fontawesome-fallback.js         # Fallback Font Awesome
├── logos/                              # Logos vectoriels source
│   ├── logo-autisme-senegal-v1.svg
│   ├── logo-autisme-senegal-v2-improved.svg
│   ├── logo-autisme-senegal-v2-improved-senegal.svg
│   ├── logo-autisme-senegal-v2-baobab.svg
│   ├── logo-autisme-senegal-v2-baobab-senegal.svg
│   ├── logo-autisme-senegal-moderne-1.svg  # Nouveau
│   ├── logo-autisme-senegal-moderne-2.svg  # Nouveau
│   ├── logo-autisme-senegal-moderne-3.svg  # Nouveau
│   ├── logo-autisme-senegal-moderne-4.svg  # Nouveau
│   └── logo-autisme-senegal-moderne-5.svg  # Nouveau
├── images/                             # Images et logos PNG
│   ├── logo-*.png (36 fichiers)        # 9 logos × 4 résolutions
│   └── ... (autres images)
├── fonts/                              # Polices personnalisées
├── .github/
│   └── copilot-instructions.md         # Instructions Copilot
├── .vscode/
│   └── tasks.json                      # Tâches VS Code
├── convert_logo_to_png.py              # Script conversion SVG→PNG
├── logos-comparison.html               # Comparaison logos V1-V3
├── logos-modernes.html                 # Comparaison logos modernes
├── LOGOS_MODERNES_DOCUMENTATION.md     # Doc nouveaux logos
├── netlify.toml                        # Configuration Netlify
├── _redirects                          # Redirections Netlify
└── README.md                           # Documentation
```

## 🎨 Collection de Logos

Le projet dispose d'une collection complète de 9 logos professionnels :

### Logos Originaux (4 logos)
1. **V2-Improved (Bleu Autisme)** - 6 mains, 3 enfants jouant
2. **V2-Improved-Senegal** - Version couleurs nationales (vert/bleu/jaune)
3. **V2-Baobab (Bleu Autisme)** - Baobab et 5 enfants
4. **V2-Baobab-Senegal** - Version couleurs nationales

### Nouveaux Logos Modernes (5 logos) 🆕
5. **Moderne 1 - "P" Dynamique** - Lettre P avec swoosh bleu autisme
6. **Moderne 2 - "A" Culturel** - Lettre A avec rubans tricolores Sénégal
7. **Moderne 3 - "P" Circulaire** - Design circulaire, 4 puzzles en constellation
8. **Moderne 4 - "S" Solidarité** - Lettre S ruban, fusion culturelle
9. **Moderne 5 - "P" Premium** - Design haut de gamme, 5 puzzles colorés

**Formats disponibles :**
- SVG vectoriel (source éditable)
- PNG 4 résolutions : 200px, 400px, 800px, 1600px (300 DPI)

**Pages de comparaison :**
- `logos-comparison.html` - Logos V1-V3 originaux
- `logos-modernes.html` - 5 nouveaux logos modernes

**Documentation détaillée :**
- `LOGOS_MODERNES_DOCUMENTATION.md` - Guide complet des nouveaux logos

## 🚀 Installation et Utilisation

### Prérequis
- Navigateur web moderne
- Serveur local (optionnel pour le développement)

### Lancement
1. Clonez ou téléchargez le projet
2. Ouvrez `index.html` dans votre navigateur
3. Ou utilisez un serveur local pour le développement :
   ```bash
   # Avec Python
   python -m http.server 8000
   
   # Avec Node.js (live-server)
   npx live-server
   ```

## 📱 Responsive Design

Le site s'adapte automatiquement aux différentes tailles d'écran :

- **Desktop** : Layout en grille avec sidebar
- **Tablette** : Layout adapté avec navigation simplifiée  
- **Mobile** : Menu hamburger, layout vertical

### Points de rupture
- Mobile : < 768px
- Tablette : 768px - 1024px
- Desktop : > 1024px

## 🎨 Palette de Couleurs

```css
--primary-color: #2563eb    /* Bleu principal */
--secondary-color: #f59e0b  /* Orange secondaire */
--accent-color: #10b981     /* Vert d'accent */
--text-dark: #1f2937        /* Texte sombre */
--text-light: #6b7280       /* Texte clair */
--bg-light: #f8fafc         /* Arrière-plan clair */
```

## 📋 Fonctionnalités Détaillées

### Section Hero
- Animation des pièces de puzzle
- Statistiques animées
- Call-to-action prominent

### Section Contexte
- Mise en évidence des défis
- Infographies interactives
- Boîtes d'information stylisées

### Section Objectifs
- Grille responsive de cartes
- Icônes représentatives
- Animations au scroll

### Section Activités
- Timeline interactive
- Progression visuelle
- Marqueurs colorés

### Section Résultats
- Métriques d'impact
- Barres de progression animées
- Projections visuelles

### Formulaire de Contact
- Validation côté client
- Types de contact sélectionnables
- Messages de retour visuels
- Adaptation mobile

## 🔧 Personnalisation

### Couleurs
Modifiez les variables CSS dans `:root` du fichier `styles/main.css`

### Contenu
Éditez directement le HTML dans `index.html`

### Animations
Ajustez les keyframes et transitions dans le CSS

## 📈 Performance

### Optimisations Implémentées
- ✅ CSS minifié et organisé
- ✅ Images optimisées (utilisation d'icônes vectorielles)
- ✅ Lazy loading des animations
- ✅ Debouncing des événements de scroll

### Métriques Cibles
- First Contentful Paint : < 1.5s
- Largest Contentful Paint : < 2.5s
- Cumulative Layout Shift : < 0.1

## 🌐 Compatibilité Navigateurs

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🤝 Contribution

Pour contribuer au projet :

1. Forkez le repository
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add AmazingFeature'`)
4. Pushez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Contact

Pour toute question concernant le projet ou la plateforme :

- **Email** : contact@plateformeautismesenegal.org
- **Téléphone** : +221 XX XXX XX XX
- **Adresse** : Dakar, Sénégal

## 🙏 Remerciements

- Centre pédopsychiatrique de l'hôpital Fann pour les statistiques
- Toutes les associations partenaires
- L'Organisation Mondiale de la Santé pour les données de référence

---

**Ensemble pour améliorer la prise en charge des enfants vivant avec les Troubles du Spectre Autistique au Sénégal** 🧩
