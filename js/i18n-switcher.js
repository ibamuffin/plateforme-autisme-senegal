/**
 * PAS language switcher — FR (root) ↔ EN (/en/)
 * Persists preference; does NOT auto-redirect on every page load (SEO-safe).
 */
(function (global) {
  'use strict';

  var STORAGE_KEY = 'pas-lang';

  /** Canonical page filenames shared by FR root and EN mirror. */
  var PAGE_MAP = {
    'index.html': 'index.html',
    'associations-membres.html': 'associations-membres.html',
    'bureau-executif.html': 'bureau-executif.html',
    'conseil-administration.html': 'conseil-administration.html',
    'depliant.html': 'depliant.html',
    'depliant-print.html': 'depliant-print.html',
    'evenement.html': 'evenement.html',
    'jeux-interactifs.html': 'jeux-interactifs.html',
    'mentions-legales.html': 'mentions-legales.html',
    'mot-presidente.html': 'mot-presidente.html',
    'politique-confidentialite.html': 'politique-confidentialite.html',
    'repertoire-ecoles.html': 'repertoire-ecoles.html',
    'repertoire-medecins.html': 'repertoire-medecins.html',
    'repertoire-paramedicaux.html': 'repertoire-paramedicaux.html',
    'temoignages-evenement.html': 'temoignages-evenement.html'
  };

  var PAS_I18N = {
    map: PAGE_MAP,
    storageKey: STORAGE_KEY,

    detectLang: function () {
      var path = (global.location && global.location.pathname) || '';
      return /(?:^|\/)en(?:\/|$)/i.test(path) ? 'en' : 'fr';
    },

    currentFile: function () {
      var path = (global.location && global.location.pathname) || '';
      var seg = path.split('/').filter(Boolean);
      var last = seg.length ? seg[seg.length - 1] : '';
      if (!last || last === 'en') return 'index.html';
      return last;
    },

    /** Resolve sibling URL for target lang from current location. */
    siblingUrl: function (targetLang) {
      var file = this.currentFile();
      var mapped = PAGE_MAP[file] || file;
      var isIndex = !mapped || mapped === 'index.html' || mapped === 'index';

      if (targetLang === 'en') {
        if (isIndex) return 'en/index.html';
        return 'en/' + mapped;
      }

      /* target FR */
      if (this.detectLang() === 'en') {
        if (isIndex) return '../index.html';
        return '../' + mapped;
      }
      if (isIndex) return 'index.html';
      return mapped;
    },

    getPreference: function () {
      try {
        return localStorage.getItem(STORAGE_KEY);
      } catch (e) {
        return null;
      }
    },

    setPreference: function (lang) {
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch (e) { /* ignore */ }
    },

    markActive: function () {
      var lang = this.detectLang();
      var nodes = document.querySelectorAll('[data-lang]');
      for (var i = 0; i < nodes.length; i++) {
        var el = nodes[i];
        var isActive = el.getAttribute('data-lang') === lang;
        if (isActive) el.classList.add('is-active');
        else el.classList.remove('is-active');
        if (el.hasAttribute('aria-current')) {
          if (isActive) el.setAttribute('aria-current', 'true');
          else el.removeAttribute('aria-current');
        }
      }
    },

    /**
     * @param {string} [base] Relative prefix to site root from current page.
     *   FR root pages: '' or './'
     *   EN pages: '../'
     */
    buildLangSwitcherHTML: function (base) {
      base = base == null ? '' : String(base);
      if (base && base.slice(-1) !== '/') base += '/';
      var file = this.currentFile();
      var mapped = PAGE_MAP[file] || file;
      var isIndex = !mapped || mapped === 'index.html';

      var frHref = base + (isIndex ? 'index.html' : mapped);
      var enHref = base + 'en/' + (isIndex ? 'index.html' : mapped);

      /* When already under /en/, FR sibling is one level up; EN is same folder. */
      if (this.detectLang() === 'en') {
        frHref = '../' + (isIndex ? 'index.html' : mapped);
        enHref = isIndex ? 'index.html' : mapped;
      }

      return (
        '<div class="lang-switcher" role="group" aria-label="Language">' +
          '<a href="' + frHref + '" data-lang="fr" class="lang-btn" hreflang="fr" title="Français">' +
            '<span aria-hidden="true">🇫🇷</span><span class="lang-code">FR</span>' +
          '</a>' +
          '<a href="' + enHref + '" data-lang="en" class="lang-btn" hreflang="en" title="English">' +
            '<span aria-hidden="true">🇬🇧</span><span class="lang-code">EN</span>' +
          '</a>' +
        '</div>'
      );
    },

    bindClicks: function () {
      var self = this;
      document.addEventListener('click', function (ev) {
        var t = ev.target;
        if (!t || !t.closest) return;
        var a = t.closest('[data-lang]');
        if (!a) return;
        var lang = a.getAttribute('data-lang');
        if (lang !== 'fr' && lang !== 'en') return;
        self.setPreference(lang);
        /* Let the browser follow href; if href missing/hash, navigate ourselves. */
        var href = a.getAttribute('href');
        if (!href || href === '#' || href === '') {
          ev.preventDefault();
          global.location.href = self.siblingUrl(lang);
        }
      });
    },

    init: function () {
      this.markActive();
      this.bindClicks();
      /* Preference is used only for highlight / switcher; no auto-redirect. */
    }
  };

  global.PAS_I18N = PAS_I18N;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      PAS_I18N.init();
    });
  } else {
    PAS_I18N.init();
  }
})(typeof window !== 'undefined' ? window : this);
