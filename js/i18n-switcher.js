/**
 * PAS language switcher — FR (root) ↔ EN (/en/)
 * - Persists choice in localStorage + cookie (shared across www / apex)
 * - Redirects on load when preference ≠ current language
 * - Rewrites internal links so navigation stays in the chosen language
 */
(function (global) {
  'use strict';

  var STORAGE_KEY = 'pas-lang';
  var COOKIE_KEY = 'pas_lang';
  var COOKIE_DAYS = 365;

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

  function cookieDomain() {
    try {
      var host = (global.location && global.location.hostname) || '';
      if (/plateforme-autisme-senegal\.org$/i.test(host)) {
        return '; Domain=.plateforme-autisme-senegal.org';
      }
    } catch (e) { /* ignore */ }
    return '';
  }

  function readCookie(name) {
    try {
      var parts = (';.cookie || '').split(';');
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i].replace(/^\s+/, '');
        if (p.indexOf(name + '=') === 0) {
          return decodeURIComponent(p.slice(name.length + 1));
        }
      }
    } catch (e) { /* ignore */ }
    return null;
  }

  function writeCookie(name, value, days) {
    try {
      var maxAge = Math.floor(days * 24 * 60 * 60);
      var secure = global.location && global.location.protocol === 'https:' ? '; Secure' : '';
      document.cookie =
        name + '=' + encodeURIComponent(value) +
        '; path=/' +
        cookieDomain() +
        '; max-age=' + maxAge +
        '; SameSite=Lax' +
        secure;
    } catch (e) { /* ignore */ }
  }

  function fileFromPathname(pathname) {
    var seg = String(pathname || '').split('/').filter(Boolean);
    var last = seg.length ? seg[seg.length - 1] : '';
    if (!last || last === 'en') return 'index.html';
    return last;
  }

  function isEnPath(pathname) {
    return /(?:^|\/)en(?:\/|$)/i.test(String(pathname || ''));
  }

  function absoluteSibling(file, targetLang, search, hash) {
    var mapped = PAGE_MAP[file] || file;
    var isIndex = !mapped || mapped === 'index.html' || mapped === 'index';
    var path;
    if (targetLang === 'en') {
      path = isIndex ? '/en/index.html' : '/en/' + mapped;
    } else {
      path = isIndex ? '/index.html' : '/' + mapped;
    }
    return path + (search || '') + (hash || '');
  }

  var PAS_I18N = {
    map: PAGE_MAP,
    storageKey: STORAGE_KEY,
    _bound: false,

    detectLang: function () {
      return isEnPath((global.location && global.location.pathname) || '') ? 'en' : 'fr';
    },

    currentFile: function () {
      return fileFromPathname((global.location && global.location.pathname) || '');
    },

    siblingUrl: function (targetLang) {
      var search = (global.location && global.location.search) || '';
      var hash = (global.location && global.location.hash) || '';
      return absoluteSibling(this.currentFile(), targetLang, search, hash);
    },

    getPreference: function () {
      var fromStorage = null;
      try {
        fromStorage = localStorage.getItem(STORAGE_KEY);
      } catch (e) { /* ignore */ }
      if (fromStorage === 'fr' || fromStorage === 'en') {
        writeCookie(COOKIE_KEY, fromStorage, COOKIE_DAYS);
        return fromStorage;
      }
      var fromCookie = readCookie(COOKIE_KEY);
      if (fromCookie === 'fr' || fromCookie === 'en') {
        try { localStorage.setItem(STORAGE_KEY, fromCookie); } catch (e2) { /* ignore */ }
        return fromCookie;
      }
      return null;
    },

    setPreference: function (lang) {
      if (lang !== 'fr' && lang !== 'en') return;
      try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
      writeCookie(COOKIE_KEY, lang, COOKIE_DAYS);
    },

    applyPreference: function () {
      var pref = this.getPreference();
      if (pref !== 'fr' && pref !== 'en') return false;
      if (pref === this.detectLang()) return false;
      var file = this.currentFile();
      if (!PAGE_MAP[file]) return false;
      global.location.replace(this.siblingUrl(pref));
      return true;
    },

    markActive: function () {
      var lang = this.detectLang();
      var nodes = document.querySelectorAll('[data-lang]');
      for (var i = 0; i < nodes.length; i++) {
        var el = nodes[i];
        var isActive = el.getAttribute('data-lang') === lang;
        el.classList.toggle('is-active', isActive);
        if (isActive) el.setAttribute('aria-current', 'true');
        else el.removeAttribute('aria-current');
        /* Keep href absolute so mid-site relative paths never break the switcher. */
        try {
          el.setAttribute('href', absoluteSibling(this.currentFile(), el.getAttribute('data-lang'), '', ''));
        } catch (e) { /* ignore */ }
      }
    },

    ensureSwitcherVisible: function () {
      var wrap = document.querySelector('.nav-lang-end');
      if (!wrap) return;
      wrap.hidden = false;
      wrap.style.display = 'flex';
      wrap.style.visibility = 'visible';
      wrap.style.opacity = '1';
      if (!wrap.querySelector('.lang-switcher')) {
        wrap.innerHTML =
          '<div class="lang-switcher" role="group" aria-label="Language">' +
            '<a href="/index.html" data-lang="fr" class="lang-btn" hreflang="fr" title="Français">' +
              '<span aria-hidden="true">🇫🇷</span><span class="lang-code">FR</span></a>' +
            '<a href="/en/index.html" data-lang="en" class="lang-btn" hreflang="en" title="English">' +
              '<span aria-hidden="true">🇬🇧</span><span class="lang-code">EN</span></a>' +
          '</div>';
      }
    },

    bindClicks: function () {
      if (this._bound) return;
      this._bound = true;
      var self = this;

      document.addEventListener('click', function (ev) {
        if (ev.defaultPrevented) return;
        if (ev.button != null && ev.button !== 0) return;
        if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return;

        var t = ev.target;
        if (!t || !t.closest) return;

        /* Explicit language switch */
        var langBtn = t.closest('[data-lang]');
        if (langBtn) {
          var lang = langBtn.getAttribute('data-lang');
          if (lang === 'fr' || lang === 'en') {
            self.setPreference(lang);
            ev.preventDefault();
            global.location.assign(self.siblingUrl(lang));
          }
          return;
        }

        /* Keep browsing inside preferred language for internal pages */
        var pref = self.getPreference();
        if (pref !== 'fr' && pref !== 'en') return;

        var a = t.closest('a[href]');
        if (!a) return;
        var href = a.getAttribute('href');
        if (!href || href.charAt(0) === '#') return;
        if (/^(mailto:|tel:|javascript:|data:)/i.test(href)) return;

        var url;
        try {
          url = new URL(href, global.location.href);
        } catch (e) {
          return;
        }
        if (url.origin !== global.location.origin) return;

        var file = fileFromPathname(url.pathname);
        if (!PAGE_MAP[file]) return;

        var linkLang = isEnPath(url.pathname) ? 'en' : 'fr';
        if (linkLang === pref) return;

        ev.preventDefault();
        global.location.assign(absoluteSibling(file, pref, url.search, url.hash));
      }, true);
    },

    initUi: function () {
      this.ensureSwitcherVisible();
      this.markActive();
      this.bindClicks();
    },

    init: function () {
      var pref = this.getPreference();
      /* First visit: remember the language of the page the user opened. */
      if (!pref) this.setPreference(this.detectLang());
      if (this.applyPreference()) return;
      var self = this;
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
          self.initUi();
        });
      } else {
        self.initUi();
      }
    }
  };

  global.PAS_I18N = PAS_I18N;
  PAS_I18N.init();
})(typeof window !== 'undefined' ? window : this);
