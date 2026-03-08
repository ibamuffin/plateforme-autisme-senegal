// Fallback pour Font Awesome en cas d'échec de chargement
(function() {
    'use strict';
    
    // Vérifier si Font Awesome s'est chargé correctement
    function checkFontAwesome() {
        const testElement = document.createElement('div');
        testElement.className = 'fas fa-home';
        testElement.style.fontFamily = 'Font Awesome 6 Free';
        testElement.style.position = 'absolute';
        testElement.style.left = '-9999px';
        document.body.appendChild(testElement);
        
        const computedStyle = window.getComputedStyle(testElement);
        const fontFamily = computedStyle.getPropertyValue('font-family');
        
        document.body.removeChild(testElement);
        
        return fontFamily.includes('Font Awesome');
    }
    
    // Créer des icônes de fallback en Unicode/CSS
    function createFallbackIcons() {
        const fallbackStyle = document.createElement('style');
        fallbackStyle.innerHTML = `
            /* Fallback icons avec Unicode */
            .fa-puzzle-piece:before { content: "🧩"; font-family: "Apple Color Emoji", "Segoe UI Emoji", sans-serif; }
            .fa-heart:before { content: "❤️"; font-family: "Apple Color Emoji", "Segoe UI Emoji", sans-serif; }
            .fa-users:before { content: "👥"; font-family: "Apple Color Emoji", "Segoe UI Emoji", sans-serif; }
            .fa-graduation-cap:before { content: "🎓"; font-family: "Apple Color Emoji", "Segoe UI Emoji", sans-serif; }
            .fa-hospital:before { content: "🏥"; font-family: "Apple Color Emoji", "Segoe UI Emoji", sans-serif; }
            .fa-bullseye:before { content: "🎯"; font-family: "Apple Color Emoji", "Segoe UI Emoji", sans-serif; }
            .fa-clipboard-check:before { content: "📋"; font-family: "Apple Color Emoji", "Segoe UI Emoji", sans-serif; }
            .fa-chart-line:before { content: "📈"; font-family: "Apple Color Emoji", "Segoe UI Emoji", sans-serif; }
            .fa-handshake:before { content: "🤝"; font-family: "Apple Color Emoji", "Segoe UI Emoji", sans-serif; }
            .fa-envelope:before { content: "✉️"; font-family: "Apple Color Emoji", "Segoe UI Emoji", sans-serif; }
            .fa-phone:before { content: "📞"; font-family: "Apple Color Emoji", "Segoe UI Emoji", sans-serif; }
            .fa-map-marker-alt:before { content: "📍"; font-family: "Apple Color Emoji", "Segoe UI Emoji", sans-serif; }
            .fa-bars:before { content: "☰"; font-family: sans-serif; }
            .fa-times:before { content: "✕"; font-family: sans-serif; }
            .fa-gamepad:before { content: "🎮"; font-family: "Apple Color Emoji", "Segoe UI Emoji", sans-serif; }
            .fa-play:before { content: "▶️"; font-family: "Apple Color Emoji", "Segoe UI Emoji", sans-serif; }
            .fa-palette:before { content: "🎨"; font-family: "Apple Color Emoji", "Segoe UI Emoji", sans-serif; }
            .fa-seedling:before { content: "🌱"; font-family: "Apple Color Emoji", "Segoe UI Emoji", sans-serif; }
            .fa-shapes:before { content: "🔷"; font-family: "Apple Color Emoji", "Segoe UI Emoji", sans-serif; }
            .fa-music:before { content: "🎵"; font-family: "Apple Color Emoji", "Segoe UI Emoji", sans-serif; }
            .fa-clock:before { content: "🕐"; font-family: "Apple Color Emoji", "Segoe UI Emoji", sans-serif; }
            .fa-circle:before { content: "●"; font-family: sans-serif; }
            .fa-paw:before { content: "🐾"; font-family: "Apple Color Emoji", "Segoe UI Emoji", sans-serif; }
            .fa-paint-brush:before { content: "🖌️"; font-family: "Apple Color Emoji", "Segoe UI Emoji", sans-serif; }
            .fa-eye:before { content: "👁️"; font-family: "Apple Color Emoji", "Segoe UI Emoji", sans-serif; }
            .fa-universal-access:before { content: "♿"; font-family: "Apple Color Emoji", "Segoe UI Emoji", sans-serif; }
            .fa-adjust:before { content: "🌗"; font-family: "Apple Color Emoji", "Segoe UI Emoji", sans-serif; }
            .fa-crosshairs:before { content: "✚"; font-family: sans-serif; }
            .fa-redo:before { content: "↻"; font-family: sans-serif; }
            .fa-pause:before { content: "⏸️"; font-family: "Apple Color Emoji", "Segoe UI Emoji", sans-serif; }
            .fa-question:before { content: "❓"; font-family: "Apple Color Emoji", "Segoe UI Emoji", sans-serif; }
            .fa-check-circle:before { content: "✅"; font-family: "Apple Color Emoji", "Segoe UI Emoji", sans-serif; }
            .fa-trophy:before { content: "🏆"; font-family: "Apple Color Emoji", "Segoe UI Emoji", sans-serif; }
            .fa-thumbs-up:before { content: "👍"; font-family: "Apple Color Emoji", "Segoe UI Emoji", sans-serif; }
            .fa-spinner:before { content: "⟲"; font-family: sans-serif; animation: spin 1s linear infinite; }
            .fa-exclamation-circle:before { content: "⚠️"; font-family: "Apple Color Emoji", "Segoe UI Emoji", sans-serif; }
            .fa-info-circle:before { content: "ℹ️"; font-family: "Apple Color Emoji", "Segoe UI Emoji", sans-serif; }
            .fa-tint:before { content: "💧"; font-family: "Apple Color Emoji", "Segoe UI Emoji", sans-serif; }
            .fa-sun:before { content: "☀️"; font-family: "Apple Color Emoji", "Segoe UI Emoji", sans-serif; }
            .fa-flower-tulip:before { content: "🌷"; font-family: "Apple Color Emoji", "Segoe UI Emoji", sans-serif; }
            .fa-donate:before { content: "💝"; font-family: "Apple Color Emoji", "Segoe UI Emoji", sans-serif; }
            .fa-credit-card:before { content: "💳"; font-family: "Apple Color Emoji", "Segoe UI Emoji", sans-serif; }
            .fa-mobile-alt:before { content: "📱"; font-family: "Apple Color Emoji", "Segoe UI Emoji", sans-serif; }
            .fa-university:before { content: "🏛️"; font-family: "Apple Color Emoji", "Segoe UI Emoji", sans-serif; }
            
            /* Ajuster l'espacement pour les emojis */
            .fa[class*="fa-"]:before {
                margin-right: 0.25em;
                font-size: 0.9em;
                display: inline-block;
            }
            
            /* Animation pour spinner */
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(fallbackStyle);
        
        console.log('🎨 Fallback d\'icônes emoji activé pour une meilleure expérience utilisateur');
    }
    
    // Attendre que le DOM soit chargé
    function initFontAwesomeFallback() {
        // Vérifier après un délai pour s'assurer que les fonts ont eu le temps de se charger
        setTimeout(() => {
            if (!checkFontAwesome()) {
                console.warn('⚠️ Font Awesome n\'a pas pu être chargé, activation du fallback emoji');
                createFallbackIcons();
            } else {
                console.log('✅ Font Awesome chargé avec succès');
            }
        }, 1000);
    }
    
    // Initialiser quand le DOM est prêt
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFontAwesomeFallback);
    } else {
        initFontAwesomeFallback();
    }
    
    // Écouter les erreurs de chargement des fonts
    document.addEventListener('error', function(e) {
        if (e.target && e.target.tagName === 'LINK' && e.target.href.includes('font-awesome')) {
            console.warn('❌ Échec du chargement de Font Awesome, activation du fallback');
            createFallbackIcons();
        }
    }, true);
    
})();
