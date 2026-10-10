/* ============================================================
   Thiago Rodrigues — interações da página
   Tema claro/escuro, menu mobile, scrollspy, typewriter,
   reveal on scroll e barra de progresso. Vanilla JS.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initScrollProgress();
  initScrollSpy();
  initTypeWriter();
  initRevealOnScroll();
  initYear();
});

/* ---------- Tema claro/escuro (com preferência salva) ---------- */
function initTheme() {
  const toggle = document.getElementById('themeToggle');
  const icon = toggle.querySelector('i');
  const saved = localStorage.getItem('theme');

  if (saved === 'light') applyTheme('light', icon);

  toggle.addEventListener('click', () => {
    const isLight = document.body.classList.contains('theme-light');
    applyTheme(isLight ? 'dark' : 'light', icon);
    localStorage.setItem('theme', isLight ? 'dark' : 'light');
  });
}

function applyTheme(theme, icon) {
  document.body.classList.toggle('theme-light', theme === 'light');
  icon.classList.toggle('fa-sun', theme === 'light');
  icon.classList.toggle('fa-moon', theme === 'dark');
}

/* ---------- Menu mobile ---------- */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
  });

  // Fecha o menu ao clicar em um link
  links.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => {
      links.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    })
  );
}

/* ---------- Barra de progresso de scroll ---------- */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');

  const update = () => {
    const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    bar.style.width = `${Math.min(scrolled * 100, 100)}%`;
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ---------- Scrollspy: destaca a seção ativa no menu ---------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link =>
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`)
      );
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(section => observer.observe(section));
}

/* ---------- Typewriter com rotação de papéis ---------- */
function initTypeWriter() {
  const target = document.getElementById('typed');
  const phrases = ['Full Stack', 'Backend Node.js', 'Front-End React', 'AWS Serverless', 'TypeScript Lover'];
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const type = () => {
    const phrase = phrases[phraseIndex];

    charIndex += deleting ? -1 : 1;
    target.textContent = phrase.slice(0, charIndex);

    let delay = deleting ? 45 : 90;

    if (!deleting && charIndex === phrase.length) {
      delay = 1800; // pausa com a frase completa
      deleting = true;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }

    setTimeout(type, delay);
  };

  type();
}

/* ---------- Reveal on scroll ---------- */
function initRevealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => observer.observe(el));
}

/* ---------- Ano no footer ---------- */
function initYear() {
  document.getElementById('year').textContent = new Date().getFullYear();
}
