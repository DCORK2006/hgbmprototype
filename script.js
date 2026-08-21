document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("siteHeader");
  const menuButton = document.getElementById("menuButton");
  const nav = document.getElementById("mainNav");
  const year = document.getElementById("year");
  const reveals = document.querySelectorAll(".reveal");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const handleScroll = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 35);
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuButton.classList.toggle("active", open);
      menuButton.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("menu-open", open);
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuButton.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      });
    });
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px"
      }
    );

    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add("visible"));
  }

  // Make the first-screen elements visible immediately
  requestAnimationFrame(() => {
    reveals.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.96) {
        el.classList.add("visible");
      }
    });
  });

  // Very subtle hero movement on desktop only
  const stage = document.querySelector(".hero-stage");
  const books = document.querySelectorAll(".hero-stage .book");

  if (stage && books.length && window.matchMedia("(pointer:fine)").matches) {
    stage.addEventListener("mousemove", e => {
      const rect = stage.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) - 0.5;
      const y = ((e.clientY - rect.top) / rect.height) - 0.5;

      books.forEach((book, i) => {
        const amount = (i + 1) * 3;
        book.style.translate = `${x * amount}px ${y * amount}px`;
      });
    });

    stage.addEventListener("mouseleave", () => {
      books.forEach(book => {
        book.style.translate = "0 0";
      });
    });
  }
});
