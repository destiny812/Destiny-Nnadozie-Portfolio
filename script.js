// ---------- 1. Mobile menu ----------
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
  const isOpen = navList.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

// Close the menu after tapping a link
navList.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navList.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// ---------- 2. Highlight the active nav link ----------
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('nav ul a');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === '#' + entry.target.id
          );
        });
      }
    });
  },
  { rootMargin: '-50% 0px -50% 0px' } // triggers when a section crosses the middle of the screen
);

sections.forEach((section) => navObserver.observe(section));

// ---------- 3. Reveal elements on scroll ----------
const revealItems = document.querySelectorAll(
  'section:not(#hero) h2, #about p, #skills li, .project'
);

revealItems.forEach((el) => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate only once
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((el) => revealObserver.observe(el));

// ---------- 4. Footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();