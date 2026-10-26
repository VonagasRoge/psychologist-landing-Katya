import Swiper from "swiper";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const SCROLL_OFFSET = 24;

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

new Swiper(".path-swiper", {
  modules: [Pagination],
  slidesPerView: 2,
  slidesPerGroup: 2,
  spaceBetween: 18,
  pagination: {
    el: ".path-swiper .swiper-pagination",
    clickable: true,
  },
});

new Swiper(".contacts-swiper", {
  modules: [Pagination],
  slidesPerView: 1,
  pagination: {
    el: ".contacts-swiper .swiper-pagination",
    clickable: true,
  },
});

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
