/* ============================================================
   MyWellnessCalc — Component Loader
   assets/js/components.js
   ============================================================ */

(function () {
  var path = window.location.pathname;
  var depth = (path.match(/\//g) || []).length - 1;
  var base = depth >= 1 ? '../' : './';

  var isToolPage = path.indexOf('/tools/') !== -1 ||
    (depth >= 1 && path.indexOf('/blog/') === -1 &&
      path.indexOf('about') === -1 && path.indexOf('privacy') === -1);

  function loadPartial(placeholderId, file, callback) {
    var el = document.getElementById(placeholderId);
    if (!el) return;
    fetch(base + 'assets/partials/' + file)
      .then(function (r) { return r.text(); })
      .then(function (html) {
        el.outerHTML = html.replace(/\{\{BASE\}\}/g, base);
        if (callback) callback();
      })
      .catch(function (e) { console.warn('Component load failed:', file, e); });
  }

  function initNav() {
    // Active nav link
    var links = document.querySelectorAll('.nav-links a');
    links.forEach(function (a) {
      if (a.href === window.location.href) a.classList.add('active');
    });

    // Add "← All tools" back link for tool pages
    if (isToolPage) {
      var nav = document.querySelector('nav');
      if (nav && !nav.querySelector('.nav-back')) {
        var back = document.createElement('a');
        back.href = base + '#tools';
        back.className = 'nav-back';
        back.textContent = '← All tools';
        nav.insertBefore(back, nav.querySelector('.nav-hamburger'));
      }
    }

    // Hamburger toggle
    var hamburger = document.getElementById('nav-hamburger');
    var navLinks = document.getElementById('nav-links');
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', function () {
        navLinks.classList.toggle('open');
        hamburger.classList.toggle('open');
      });
    }

    // Dropdown toggle
    document.querySelectorAll('.nav-dropdown-toggle').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var li = btn.closest('.nav-has-dropdown');
        var isOpen = li.classList.contains('open');
        document.querySelectorAll('.nav-has-dropdown').forEach(function (el) {
          el.classList.remove('open');
        });
        if (!isOpen) li.classList.add('open');
      });
    });

    // Close dropdown on outside click
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.nav-has-dropdown')) {
        document.querySelectorAll('.nav-has-dropdown').forEach(function (el) {
          el.classList.remove('open');
        });
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    loadPartial('header-placeholder', 'header.html', initNav);
    loadPartial('footer-placeholder', 'footer.html');
  });
})();
