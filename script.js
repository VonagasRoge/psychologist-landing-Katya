const SCROLL_OFFSET = 24;

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const hash = link.getAttribute("href");

    if (!hash || hash === "#") {
      event.preventDefault();
      return;
    }

    const target = document.querySelector(hash);

    if (!target) {
      return;
    }

    event.preventDefault();

    const top = target.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;

    window.scrollTo({
      top,
      behavior: prefersReducedMotion.matches ? "auto" : "smooth",
    });

    try {
      history.pushState(null, "", hash);
    } catch {
      // History API can be unavailable when the page is opened from the file system.
    }
  });
});
