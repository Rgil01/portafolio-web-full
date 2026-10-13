/* Funcionalidades interactivas del portafolio */
document.addEventListener("DOMContentLoaded", () => {
  // 1. Menú móvil: abrir/cerrar y cerrarlo al seleccionar una sección.
  const menuToggle = document.querySelector("#menu-toggle");
  const navLinks = document.querySelector("#nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
      navLinks.classList.toggle("is-open", !isOpen);
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menú");
      });
    });
  }

  // 2. Año automático en el pie de página.
  const year = document.querySelector("#current-year");
  if (year) year.textContent = new Date().getFullYear();

  // 3. Animaciones de aparición al desplazarse (con alternativa sin animaciones).
  const revealElements = document.querySelectorAll(".reveal");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if ("IntersectionObserver" in window && !reduceMotion) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  }

  // 4. Buscador de proyectos: filtra las tarjetas mientras se escribe.
  const searchInput = document.querySelector("#project-search");
  const projectCards = [...document.querySelectorAll(".project-card")];
  const projectCount = document.querySelector("#project-count");
  const emptyState = document.querySelector("#empty-state");

  function filterProjects() {
    const query = (searchInput?.value || "").trim().toLocaleLowerCase("es");
    let visibleCount = 0;

    projectCards.forEach((card) => {
      const searchableText = `${card.textContent} ${card.dataset.search || ""}`.toLocaleLowerCase("es");
      const matches = searchableText.includes(query);
      card.hidden = !matches;
      if (matches) visibleCount += 1;
    });

    if (projectCount) {
      projectCount.textContent = `${visibleCount} ${visibleCount === 1 ? "proyecto" : "proyectos"}`;
    }
    if (emptyState) emptyState.hidden = visibleCount !== 0;
  }

  if (searchInput) searchInput.addEventListener("input", filterProjects);

  // 5. Resalta en el menú la sección visible en pantalla.
  const sections = document.querySelectorAll("main section[id]");
  const navItems = document.querySelectorAll(".nav-link");

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navItems.forEach((link) => {
          const active = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("active", active);
        });
      });
    }, { rootMargin: "-35% 0px -55% 0px" });

    sections.forEach((section) => sectionObserver.observe(section));
  }
});

// =========================================
// ANIMACIÓN DE BIENVENIDA DEL AVATAR
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    const avatar = document.querySelector("#avatar-ramon");

    if (!avatar) return;

    const reducirMovimiento = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // Saludo inicial al cargar la página.
    if (!reducirMovimiento) {

        avatar.classList.add("avatar-greeting");

        setTimeout(() => {
            avatar.classList.remove("avatar-greeting");
        }, 1200);

    }

    // Repetir el saludo cuando el visitante pulse el avatar.
    avatar.addEventListener("click", () => {

        if (reducirMovimiento) return;

        avatar.classList.remove("avatar-greeting");

        // Reinicia la animación.
        void avatar.offsetWidth;

        avatar.classList.add("avatar-greeting");

        setTimeout(() => {
            avatar.classList.remove("avatar-greeting");
        }, 1200);

    });

});