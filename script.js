document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  const revealItems = document.querySelectorAll(".reveal");
  const year = document.getElementById("year");
  const glow = document.querySelector(".cursor-glow");

  if (year) year.textContent = new Date().getFullYear();

  const updateHeader = () => {
    if (header) header.classList.toggle("scrolled", window.scrollY > 40);
  };
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("menu-open", isOpen);
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      });
    });
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -45px 0px" });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  if (glow && window.matchMedia("(pointer:fine)").matches) {
    window.addEventListener("mousemove", e => {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
      glow.style.opacity = "1";
    });
    document.documentElement.addEventListener("mouseleave", () => glow.style.opacity = "0");
  }

  const hero = document.querySelector(".hero");
  const heroBooks = document.querySelectorAll(".hero-book");

  if (hero && heroBooks.length && window.matchMedia("(pointer:fine)").matches) {
    hero.addEventListener("mousemove", e => {
      const b = hero.getBoundingClientRect();
      const x = (e.clientX - b.left) / b.width - 0.5;
      const y = (e.clientY - b.top) / b.height - 0.5;
      heroBooks.forEach((book, i) => {
        const depth = (i + 1) * 4;
        book.style.translate = `${x * depth}px ${y * depth}px`;
      });
    });

    hero.addEventListener("mouseleave", () => {
      heroBooks.forEach(book => book.style.translate = "0 0");
    });
  }
});
