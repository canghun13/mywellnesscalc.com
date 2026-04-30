/* ============================================================
   MyWellnessCalc — Component Loader
   assets/js/components.js
   ============================================================ */

(function () {
  var path = window.location.pathname;
  // depth: root=0, tools/=1, blog/=1
  var depth = (path.match(/\//g) || []).length - 1;
  var base = depth >= 1 ? '../' : './';

  // Detect tools page (not blog, not root pages)
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

  document.addEventListener('DOMContentLoaded', function () {
    loadPartial('header-placeholder', 'header.html', function () {
      // Active nav link highlight
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
          nav.appendChild(back);
        }
      }
    });
    loadPartial('footer-placeholder', 'footer.html');
  });
})();
