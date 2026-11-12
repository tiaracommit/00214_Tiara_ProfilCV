"use strict";

// 1. HAMBURGER MENU
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("#nav-menu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isExpanded =
      menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    navMenu.classList.toggle("is-open", !isExpanded);
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      navMenu.classList.remove("is-open");
    });
  });
}

// 2. DARK / LIGHT MODE
const themeToggle = document.querySelector("#theme-toggle");
const rootElement = document.documentElement;

function applyTheme(theme) {
  rootElement.setAttribute("data-theme", theme);

  const icon = document.querySelector(".theme-icon");
  const label = document.querySelector(".theme-label");

  if (icon) icon.textContent = theme === "dark" ? "☼" : "☾";
  if (label) label.textContent = theme === "dark" ? "Light mode" : "Dark mode";
}

let savedTheme = "dark";

try {
  savedTheme = localStorage.getItem("tiara-portfolio-theme") || "dark";
} catch (error) {}

applyTheme(savedTheme);

themeToggle?.addEventListener("click", () => {
  const nextTheme =
    rootElement.getAttribute("data-theme") === "dark" ? "light" : "dark";

  applyTheme(nextTheme);

  try {
    localStorage.setItem("tiara-portfolio-theme", nextTheme);
  } catch (error) {}
});

// 3. ACCORDION FAQ
const accordionButtons = document.querySelectorAll(".accordion-trigger");

accordionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";

    accordionButtons.forEach((other) => {
      other.setAttribute("aria-expanded", "false");

      const panel = other.closest(".accordion-item")
        ?.querySelector(".accordion-panel");

      if (panel) panel.hidden = true;
    });

    if (!expanded) {
      button.setAttribute("aria-expanded", "true");

      const panel = button.closest(".accordion-item")
        ?.querySelector(".accordion-panel");

      if (panel) panel.hidden = false;
    }
  });
});

// 4. SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));

    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// 5. AUTOMATIC COPYRIGHT YEAR
const yearElement = document.querySelector("#current-year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

console.log("Tiara Portfolio berhasil dijalankan!");