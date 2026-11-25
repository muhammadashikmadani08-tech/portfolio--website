/* Portfolio behaviour — no backend, no secrets.
   All visible text comes from config.js (window.SITE_CONFIG).
   Text is inserted safely (textContent / escaped), never with raw HTML from user input. */

(function () {
  "use strict";
  const config = window.SITE_CONFIG || {};
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  function setText(sel, value) {
    const el = $(sel);
    if (el && value) el.textContent = value;
  }

  function escapeHtml(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  // ---- Fill header / hero / about from config ----
  setText("[data-site-name]", config.name || "");
  setText("[data-site-role]", config.role || "");
  setText("[data-site-location]", config.location || "");
  setText("[data-site-bio]", config.bio || "");
  setText("[data-site-tagline]", config.tagline || "");
  setText("[data-site-email]", config.email || "");
  const emailLink = $("[data-email-link]");
  if (emailLink && config.email && !config.email.includes("example.com")) {
    emailLink.href = "mailto:" + config.email;
  }
  const githubLink = $("[data-github-link]");
  if (githubLink && config.github) githubLink.href = config.github;
  const fbLink = $("[data-facebook-link]");
  if (fbLink) {
    if (config.facebook) fbLink.href = config.facebook;
    else fbLink.style.display = "none";
  }
  document.title = config.name ? config.name + " — Portfolio" : "Portfolio";

  // ---- Marquee (duplicated for seamless scroll) ----
  const marquee = $("#marquee-track");
  if (marquee && Array.isArray(config.marquee)) {
    const items = config.marquee.map((t) => "<span>" + escapeHtml(t) + "</span><span>✳</span>").join("");
    marquee.innerHTML = items + items;
  }

  // ---- Services ----
  const servicesEl = $("#services-grid");
  if (servicesEl && Array.isArray(config.services)) {
    servicesEl.innerHTML = config.services
      .map(
        (s) =>
          "<article class='card'><div class='icon'>" + escapeHtml(s.icon || "✦") + "</div><h3>" +
          escapeHtml(s.title) + "</h3><p>" + escapeHtml(s.description) + "</p></article>"
      )
      .join("");
  }

  // ---- Stats ----
  const statsEl = $("#stats");
  if (statsEl && Array.isArray(config.stats)) {
    statsEl.innerHTML = config.stats
      .map((s) => "<div class='stat'><b>" + escapeHtml(s.value) + "</b><span>" + escapeHtml(s.label) + "</span></div>")
      .join("");
  }

  // ---- Tools ----
  const toolsEl = $("#tools");
  if (toolsEl && Array.isArray(config.tools)) {
    toolsEl.innerHTML = config.tools.map((t) => "<span class='tool'>" + escapeHtml(t) + "</span>").join("");
  }

  // ---- Projects + filter ----
  const projectsEl = $("#projects-grid");
  const filtersEl = $("#project-filters");
  function renderProjects(filter) {
    if (!projectsEl || !Array.isArray(config.projects)) return;
    const list = config.projects.filter((p) => !filter || filter === "All" || p.category === filter);
    projectsEl.innerHTML = list
      .map(
        (p) =>
          "<article class='project-card'><div class='project-thumb'>" + escapeHtml(p.title) +
          "</div><div class='project-body'><small>" + escapeHtml(p.category) + " • " + escapeHtml(p.year || "") +
          "</small><h3>" + escapeHtml(p.title) + "</h3><p>" + escapeHtml(p.description) + "</p></div></article>"
      )
      .join("");
    if (!list.length) projectsEl.innerHTML = "<p>No projects in this category yet.</p>";
  }
  if (filtersEl && Array.isArray(config.projects)) {
    const cats = ["All"].concat(Array.from(new Set(config.projects.map((p) => p.category))));
    filtersEl.innerHTML = cats
      .map((c, i) => "<button type='button' class='filter-btn" + (i === 0 ? " active" : "") + "' data-filter='" + escapeHtml(c) + "'>" + escapeHtml(c) + "</button>")
      .join("");
    filtersEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      $$(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderProjects(btn.dataset.filter);
    });
  }
  renderProjects("All");

  // ---- Process ----
  const processEl = $("#process-grid");
  if (processEl && Array.isArray(config.process)) {
    processEl.innerHTML = config.process
      .map((p) => "<article class='card'><b class='step'>" + escapeHtml(p.step) + "</b><h3>" + escapeHtml(p.title) + "</h3><p>" + escapeHtml(p.description) + "</p></article>")
      .join("");
  }

  // ---- Mobile menu ----
  const menuBtn = $("#menu-btn");
  const navLinks = $("#nav-links");
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
    navLinks.addEventListener("click", (e) => { if (e.target.tagName === "A") navLinks.classList.remove("open"); });
  }

  // ---- Footer year ----
  setText("[data-year]", String(new Date().getFullYear()));

  // ---- Contact form: validation + safe draft (no backend by default) ----
  const form = $("#contact-form");
  const result = $("#form-result");
  const copyBtn = $("#copy-message-btn");
  if (form) {
    form.addEventListener("submit", (e) => {
      const name = form.elements["name"].value.trim();
      const email = form.elements["email"].value.trim();
      const message = form.elements["message"].value.trim();
      // Basic validation (also enforced by required + type=email in HTML)
      if (name.length < 2 || message.length < 10 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        e.preventDefault();
        if (result) {
          result.hidden = false;
          result.textContent = "Please check: name (2+ letters), a valid email, and a message of 10+ letters.";
        }
        return;
      }
      // If a Formspree ID is set in config.js, let the browser POST there.
      // Otherwise stop the submit and build a safe mailto draft instead.
      if (!config.formspreeFormId) {
        e.preventDefault();
        const draft = "To: " + (config.email || "") + "\nFrom: " + name + " <" + email + ">\n\n" + message;
        if (result) { result.hidden = false; result.textContent = draft; }
        if (copyBtn) copyBtn.hidden = false;
        const subject = encodeURIComponent("Portfolio enquiry from " + name);
        const body = encodeURIComponent("Hi " + (config.name || "") + ",\n\n" + message + "\n\n— " + name + " (" + email + ")");
        window.location.href = "mailto:" + (config.email || "") + "?subject=" + subject + "&body=" + body;
      }
      // If Formspree is configured, form.action is set below and the POST goes there.
    });
    if (config.formspreeFormId) {
      form.action = "https://formspree.io/f/" + config.formspreeFormId;
      form.method = "POST";
    }
    if (copyBtn && result) {
      copyBtn.addEventListener("click", async () => {
        try { await navigator.clipboard.writeText(result.textContent); copyBtn.textContent = "Copied ✓"; }
        catch { copyBtn.textContent = "Copy failed — select the text manually"; }
      });
    }
  }
})();
