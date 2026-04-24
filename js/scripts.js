/* DJ Smalls Music — Scripts */

window.addEventListener('DOMContentLoaded', () => {

  // Navbar: add shrink class once the user scrolls past the top
  const nav = document.getElementById('mainNav');
  const applyShrink = () => {
    if (!nav) return;
    nav.classList.toggle('navbar-shrink', window.scrollY > 20);
  };
  applyShrink();
  document.addEventListener('scroll', applyShrink, { passive: true });

  // Close mobile menu after clicking a link
  const toggler = document.querySelector('.navbar-toggler');
  document.querySelectorAll('#navbarResponsive .nav-link, #navbarResponsive .dropdown-item').forEach(link => {
    link.addEventListener('click', () => {
      if (toggler && window.getComputedStyle(toggler).display !== 'none') {
        const collapse = document.getElementById('navbarResponsive');
        if (collapse && collapse.classList.contains('show')) toggler.click();
      }
    });
  });

  // Mark the active nav link based on current page (helps on inner pages)
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#navbarResponsive a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // Fade in BeatStars player once it has loaded
  document.querySelectorAll('.player-wrap iframe').forEach(iframe => {
    // If the iframe has already loaded by the time this runs (cached), mark it now
    if (iframe.complete || (iframe.contentDocument && iframe.contentDocument.readyState === 'complete')) {
      iframe.classList.add('loaded');
    }
    iframe.addEventListener('load', () => {
      iframe.classList.add('loaded');
    });
    // Fallback: force fade-in after 3s even if 'load' never fires (cross-origin can be quirky)
    setTimeout(() => iframe.classList.add('loaded'), 3000);
  });
});
