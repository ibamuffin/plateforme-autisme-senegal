/**
 * Bandeau actualités RSS — autisme (Sénégal, Afrique, Monde, Science)
 */
(function () {
    'use strict';

    const ENDPOINTS = [
        'api/news-rss.php',
        'data/autism-news.json'
    ];

    const FALLBACK_ITEMS = [
        {
            title: 'La prise en charge de l\'autisme n\'est assurée que par trois structures à Dakar',
            link: 'https://aps.sn',
            source: 'APS',
            region: 'senegal',
            label: 'Sénégal'
        },
        {
            title: 'Spark 2026 : le Sénégal au cœur de la mobilisation mondiale pour l\'autisme',
            link: 'https://www.seneweb.com',
            source: 'Seneweb',
            region: 'senegal',
            label: 'Sénégal'
        },
        {
            title: 'Journée mondiale de l\'autisme : appel à l\'inclusion et à une meilleure prise en charge',
            link: 'https://www.dakaractu.com',
            source: 'Dakaractu',
            region: 'senegal',
            label: 'Sénégal'
        },
        {
            title: 'Reportage Afrique — En Tunisie, des ONG font évoluer les mentalités autour de l\'autisme',
            link: 'https://www.rfi.fr',
            source: 'RFI',
            region: 'afrique',
            label: 'Afrique'
        },
        {
            title: 'OMS — 1 personne sur 160 atteinte d\'autisme ; 1 enfant sur 100 TSA ; 15 millions en Afrique',
            link: 'https://www.who.int/fr/news-room/fact-sheets/detail/autism-spectrum-disorders',
            source: 'OMS',
            region: 'monde',
            label: 'Monde'
        },
        {
            title: 'Recherche — avancées sur le dépistage précoce et l\'intervention comportementale',
            link: 'https://pubmed.ncbi.nlm.nih.gov/?term=autism',
            source: 'PubMed',
            region: 'science',
            label: 'Science'
        }
    ];

    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function buildItemHtml(item) {
        const region = escapeHtml(item.region || 'monde');
        const label = escapeHtml(item.label || 'Monde');
        const title = escapeHtml(item.title);
        const link = escapeHtml(item.link);
        const source = item.source ? `<span class="news-ticker__source">· ${escapeHtml(item.source)}</span>` : '';

        return `<li class="news-ticker__item">
            <span class="news-ticker__badge news-ticker__badge--${region}">${label}</span>
            <a class="news-ticker__link" href="${link}" target="_blank" rel="noopener noreferrer">${title}</a>
            ${source}
        </li>`;
    }

    function renderTicker(items) {
        const ticker = document.getElementById('newsTicker');
        const track = document.getElementById('newsTickerTrack');
        if (!ticker || !track || !items.length) return;

        const listHtml = items.map(buildItemHtml).join('');
        track.innerHTML = `
            <ul class="news-ticker__list" aria-hidden="false">${listHtml}</ul>
            <ul class="news-ticker__list" aria-hidden="true">${listHtml}</ul>
        `;

        ticker.classList.remove('news-ticker--loading');

        const listWidth = track.querySelector('.news-ticker__list')?.scrollWidth || 3000;
        const duration = Math.max(60, Math.min(180, listWidth / 40));
        track.style.setProperty('--ticker-duration', `${duration}s`);
    }

    async function fetchNews() {
        for (const endpoint of ENDPOINTS) {
            try {
                const res = await fetch(endpoint, { cache: 'no-store' });
                if (!res.ok) continue;
                const data = await res.json();
                if (data.items && data.items.length) {
                    return data.items;
                }
            } catch (_) {
                /* try next endpoint */
            }
        }
        return FALLBACK_ITEMS;
    }

    function init() {
        const ticker = document.getElementById('newsTicker');
        if (!ticker) return;

        document.body.classList.add('has-news-ticker');

        fetchNews().then(items => {
            renderTicker(items.slice(0, 30));
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
