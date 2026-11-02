(function() {
  "use strict";

  /**
   * Navbar effects and scrolltop buttons upon scrolling
   */
  const navbar = document.getElementById('header-nav')
  var body = document.getElementsByTagName("body")[0]
  const scrollTop = document.getElementById('scrolltop')
  document.addEventListener('click', function (e) {
    const navCollapse = document.getElementById('navbarSupportedContent');
    const toggler = document.querySelector('.navbar-toggler');
    if (navCollapse.classList.contains('show') && !navCollapse.contains(e.target) && !toggler.contains(e.target)) {
      toggler.click();
    }
  });

  document.getElementById('year').textContent = new Date().getFullYear();

  /**
   * Light/dark theme toggle (initial theme is set by an inline script in <head>)
   */
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  function syncThemeIcon() {
    const dark = root.getAttribute('data-theme') === 'dark';
    themeToggle.querySelector('i').className = dark ? 'bi-sun' : 'bi-moon-stars';
  }
  themeToggle.addEventListener('click', function () {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    syncThemeIcon();
  });
  syncThemeIcon();

  /**
   * Keyboard support for collapsible certification groups
   */
  document.querySelectorAll('.cert-group-toggle').forEach(function (el) {
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        el.click();
      }
    });
  });

  window.onscroll = () => {
    if (window.scrollY > 0) {
      navbar.classList.add('fixed-top', 'shadow-sm')
      body.style.paddingTop = navbar.offsetHeight + "px"
      scrollTop.style.visibility = "visible";
      scrollTop.style.opacity = 1;
    } else {
      navbar.classList.remove('fixed-top', 'shadow-sm')
      body.style.paddingTop = "0px"
      scrollTop.style.visibility = "hidden";
      scrollTop.style.opacity = 0;
    }
  };


})();
