// === Menu mobile (hamburger) ===
const menu = document.querySelector(".hamburger");
const nav = document.querySelector(".nav-links");
const top = document.querySelector("#toTop");
const year = document.querySelector("#year");

if (year) year.textContent = new Date().getFullYear();

menu?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav-links a").forEach((a) => {
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    menu?.setAttribute("aria-expanded", "false");
  });
});

// === Bouton retour en haut ===
window.addEventListener("scroll", () => {
  top?.classList.toggle("show", window.scrollY > 700);
});

top?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// === Ancres avec défilement fluide ===
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (!id || id === "#") return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// === Formulaire de contact (ouvre un email pré-rempli) ===
const form = document.querySelector("#contactForm");
const success = document.querySelector("#success");

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const fd = new FormData(form);
  const name = fd.get("name") || "";
  const email = fd.get("email") || "";
  const message = fd.get("message") || "";

  const subject = `Demande d'étude — ${name}`;
  const body = [
    "Bonjour Cosmetest,",
    "",
    "Je souhaite échanger au sujet d'un projet d'étude.",
    "",
    `Nom / société : ${name}`,
    `Email : ${email}`,
    "Projet :",
    message,
    "",
    "Bien cordialement",
  ].join("\n");

  const mailto = `mailto:contact.clients@cosmetest.com?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  window.location.href = mailto;

  if (success) success.hidden = false;
});
