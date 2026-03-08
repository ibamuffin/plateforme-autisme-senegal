<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Instructions Copilot pour le Projet Plateforme Autisme Sénégal

## Contexte du Projet
Ce projet est un site web responsive dédié à la plateforme des associations d'autisme au Sénégal. Il vise à présenter les objectifs, activités et résultats attendus de cette initiative pour améliorer la prise en charge des enfants vivant avec les Troubles du Spectre Autistique (TSA).

## Technologies et Architecture
- **Frontend** : HTML5, CSS3, JavaScript ES6+
- **Design** : Responsive design avec Mobile-First approach
- **Bibliothèques** : Font Awesome pour les icônes, Google Fonts (Inter)
- **Approche** : Site statique avec interactions JavaScript

## Standards de Code

### HTML
- Utiliser la sémantique HTML5 appropriée (`<section>`, `<article>`, `<nav>`, etc.)
- Maintenir l'accessibilité avec les attributs ARIA appropriés
- Structurer le contenu de manière logique et hiérarchique
- Utiliser des IDs et classes significatives en français

### CSS
- Utiliser les Custom Properties (variables CSS) définies dans `:root`
- Privilégier Flexbox et CSS Grid pour les layouts
- Approche Mobile-First pour le responsive design
- Animations fluides avec les transitions CSS
- Nomenclature BEM ou similaire pour les classes

### JavaScript
- Code ES6+ moderne avec const/let, arrow functions, etc.
- Fonctions pures et modulaires
- Gestion d'erreurs appropriée
- Comments en français pour la documentation
- Utilisation d'addEventListener plutôt que les handlers inline

## Palette de Couleurs du Projet
```css
--primary-color: #2563eb    /* Bleu principal */
--secondary-color: #f59e0b  /* Orange/Jaune secondaire */
--accent-color: #10b981     /* Vert d'accent */
--text-dark: #1f2937        /* Texte principal */
--text-light: #6b7280       /* Texte secondaire */
--bg-light: #f8fafc         /* Arrière-plan clair */
```

## Thématique et Symbolisme
- **Pièces de puzzle** : Symbole universel de l'autisme
- **Couleurs vives** : Bleu (sensibilisation autisme), vert (espoir), orange (énergie)
- **Iconographie** : Icônes représentant la solidarité, l'éducation, la santé

## Contenu et Données Clés
- **Statistique OMS** : 1 personne sur 160 touchée par l'autisme
- **Statistique Sénégal** : 0,8% des enfants en bas âge (Source: Centre pédopsychiatrique Fann)
- **Focus** : Enfants vivant avec les TSA (Troubles du Spectre Autistique)

## Sections Principales
1. **Hero** - Présentation et statistiques clés
2. **Contexte** - Situation actuelle et défis
3. **Objectifs** - Buts de la plateforme (7 objectifs spécifiques)
4. **Activités** - Actions concrètes (5 étapes principales)
5. **Résultats** - Impact attendu (4 résultats majeurs)
6. **Contact** - Formulaire et informations

## Directives de Développement

### Accessibilité
- Contraste minimum WCAG AA
- Navigation au clavier
- Screen readers compatibility
- Textes alternatifs descriptifs

### Performance
- Optimiser les images et ressources
- Minifier CSS/JS en production
- Lazy loading pour les animations
- Éviter les repaints/reflows inutiles

### Responsive Design
- Breakpoints : 480px (mobile), 768px (tablette), 1024px+ (desktop)
- Menu hamburger sur mobile
- Images et textes adaptatifs
- Touch-friendly sur mobile

### Animations et Interactions
- Animations subtiles et fluides
- Respect des préférences de mouvement réduit
- États de hover/focus visibles
- Feedback visuel pour les actions utilisateur

## Conventions de Nommage
- **Variables CSS** : kebab-case avec préfixes (`--primary-color`)
- **Classes CSS** : kebab-case descriptif (`hero-content`, `nav-menu`)
- **IDs** : camelCase pour JavaScript (`contactForm`, `navMenu`)
- **Fonctions JS** : camelCase descriptif (`handleFormSubmit`, `toggleMobileNav`)

## Messages et Textes
- Langue principale : Français
- Ton professionnel mais accessible
- Terminologie médicale appropriée (TSA, autisme)
- Messages d'encouragement et d'espoir

## Fonctionnalités Spécifiques
- **Formulaire de contact** avec validation côté client
- **Navigation fluide** entre sections
- **Animations au scroll** avec Intersection Observer
- **Compteurs animés** pour les statistiques
- **Timeline interactive** pour les activités

## Références et Sources
- Termes de référence officiels de la plateforme
- Données du Centre pédopsychiatrique de l'hôpital Fann
- Statistiques OMS sur l'autisme
- Best practices d'accessibilité web

Lors de modifications ou d'ajouts au code, toujours considérer ces directives pour maintenir la cohérence et la qualité du projet.
