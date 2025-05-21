document.addEventListener('DOMContentLoaded', () => {
  // Inicializa SimpleLightbox com opção de fade e teclado habilitado
  const lightbox = new SimpleLightbox('.portfolio-box', {
    fadeSpeed: 250,
    enableKeyboard: true,
  });

  // Fechar menu navbar no mobile ao clicar em link
  const navbarCollapse = document.getElementById('navbarResponsive');
  const navLinks = navbarCollapse.querySelectorAll('a.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
      if (bsCollapse && window.getComputedStyle(navbarCollapse).display !== 'none') {
        bsCollapse.hide();
      }
    });
  });

  // Scroll suave com offset para compensar navbar fixa
  const navbarHeight = document.querySelector('#mainNav').offsetHeight;
  document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const targetPosition = target.offsetTop - navbarHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Destacar link ativo na navbar conforme a rolagem
  const sections = Array.from(document.querySelectorAll('section, div[id]')).filter(s => s.id);
  const navItems = Array.from(navLinks);

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + navbarHeight + 10; // +10 pra margem
    let currentSectionId = null;

    for (const section of sections) {
      if (scrollPos >= section.offsetTop) {
        currentSectionId = section.id;
      }
    }

    navItems.forEach(link => {
      if (link.getAttribute('href') === '#' + currentSectionId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  });
});