// ─── YEAR ───
const yr = document.getElementById('yr');
if (yr) yr.textContent = new Date().getFullYear();

// ─── MOBILE MENU ───
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navLinks.classList.remove('open'))
  );
}

// ─── SCROLL REVEAL ───
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
  });
}, { threshold: 0.09 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ─── COUNT-UP ANIMATION ───
const fmt = (n, decimals) => decimals > 0
  ? n.toFixed(decimals)
  : Math.floor(n).toLocaleString('en-US');

const countObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target   = parseFloat(el.dataset.count);
    const suffix   = el.dataset.suffix || '';
    const decimals = (el.dataset.count.split('.')[1] || '').length;
    const dur = 1600;
    const start = performance.now();
    const step = (t) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * eased, decimals) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    countObs.unobserve(el);
  });
}, { threshold: 0.4 });
document.querySelectorAll('[data-count]').forEach(el => countObs.observe(el));

// ─── ACTIVE NAV HIGHLIGHT (homepage only) ───
const sectionIds = ['home','about','experience','projects','skills','contact'];
const sections   = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
const anchors    = document.querySelectorAll('.nav-links a');
if (sections.length && anchors.length) {
  const navObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        anchors.forEach(a =>
          a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id)
        );
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => navObs.observe(s));
}
