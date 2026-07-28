/* ============================================================
   Aquatel Technologies - Core JS
   Shared nav + footer injection, theme, mobile menu, scroll
   reveal, counters, FAQ, tabs, subscriptions, particles,
   smooth scroll, cursor glow, back-to-top, floating WhatsApp.
   ============================================================ */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cfg = window.AQUATEL_CONFIG || {};
  const waLink = "https://wa.me/" + (cfg.whatsappNumber || "") +
    "?text=" + encodeURIComponent("Hi Aquatel Technologies, I'd like to enquire about purified water / refill options.");
  const mailLink = "mailto:" + (cfg.email || "") + "?subject=" + encodeURIComponent("Aquatel water enquiry");

  /* Brand mark - real Aquatel droplet icon (transparent PNG) */
  const LOGO = `<img class="brand__mark" src="assets/brand/logo-icon-trans.png" alt="Aquatel Technologies logo" width="40" height="40">`;

  /* Inline brand glyphs (lucide dropped brand icons in recent versions) */
  const SOCIAL = {
    facebook: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z"/></svg>`,
    instagram: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>`,
    linkedin: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.05c.53-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21H9V9Z"/></svg>`,
    x: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M18.2 2H21l-6.4 7.3L22 22h-6.3l-4.9-6.4L5.1 22H2.3l6.9-7.9L2 2h6.5l4.4 5.8L18.2 2Zm-1.1 18h1.7L7 3.8H5.2L17.1 20Z"/></svg>`
  };

  const NAV_ITEMS = [
    ["index.html", "Home"], ["about.html", "About"], ["products.html", "Products"],
    ["services.html", "Services"], ["process.html", "Process"], ["quality.html", "Quality"],
    ["subscriptions.html", "Subscriptions"], ["contact.html", "Contact"]
  ];

  const here = location.pathname.split("/").pop() || "index.html";

  /* ---------- Inject NAV ---------- */
  function buildNav() {
    const links = NAV_ITEMS.map(([href, label]) =>
      `<a href="${href}"${href === here ? ' aria-current="page"' : ''}>${label}</a>`).join("");
    const mobileLinks = NAV_ITEMS.map(([href, label]) =>
      `<a href="${href}"${href === here ? ' aria-current="page"' : ''}>${label}</a>`).join("");

    const nav = document.createElement("header");
    nav.className = "nav";
    nav.innerHTML = `
      <div class="container nav__inner">
        <a href="index.html" class="brand" aria-label="Aquatel Technologies home">
          ${LOGO}
          <span>Aquatel<small>TECHNOLOGIES</small></span>
        </a>
        <nav class="nav__links" aria-label="Primary">${links}</nav>
        <div class="nav__actions">
          <button class="theme-toggle" id="themeToggle" aria-label="Toggle dark mode">
            <i data-lucide="moon"></i>
          </button>
          <a href="contact.html" class="btn btn-primary btn-sm nav-cta">Order Water</a>
          <button class="nav__burger" id="navBurger" aria-label="Open menu" aria-expanded="false"><span></span></button>
        </div>
      </div>`;

    const overlay = document.createElement("div");
    overlay.className = "nav-overlay";
    overlay.id = "navOverlay";

    const panel = document.createElement("aside");
    panel.className = "mobile-panel";
    panel.id = "mobilePanel";
    panel.setAttribute("aria-label", "Mobile menu");
    panel.innerHTML = `${mobileLinks}<a href="contact.html" class="btn btn-primary">Order Water</a>`;

    document.body.prepend(nav, overlay, panel);
  }

  /* ---------- Inject FOOTER ---------- */
  function buildFooter() {
    const f = document.createElement("footer");
    f.className = "footer";
    f.innerHTML = `
      <div class="container">
        <div class="footer__grid">
          <div class="footer__brand">
            <a href="index.html" class="brand">${LOGO}<span>Aquatel<small>TECHNOLOGIES</small></span></a>
            <p>Reverse osmosis purified drinking water for homes, offices, gyms, events, and bulk refill customers. Pure water, refined by science.</p>
            <div class="footer__social">
              <a href="${cfg.social?.facebook || '#'}" aria-label="Facebook">${SOCIAL.facebook}</a>
              <a href="${cfg.social?.instagram || '#'}" aria-label="Instagram">${SOCIAL.instagram}</a>
              <a href="${cfg.social?.linkedin || '#'}" aria-label="LinkedIn">${SOCIAL.linkedin}</a>
              <a href="${cfg.social?.x || '#'}" aria-label="X">${SOCIAL.x}</a>
            </div>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><a href="about.html">About</a></li>
              <li><a href="process.html">RO Process</a></li>
              <li><a href="quality.html">Water Quality</a></li>
              <li><a href="subscriptions.html">Subscriptions</a></li>
            </ul>
          </div>
          <div>
            <h4>Products & Services</h4>
            <ul>
              <li><a href="products.html">Bottled Water</a></li>
              <li><a href="products.html">Refill Options</a></li>
              <li><a href="services.html">Delivery Services</a></li>
              <li><a href="services.html">Office Supply</a></li>
            </ul>
          </div>
          <div>
            <h4>Get in Touch</h4>
            <ul class="footer__contact">
              <li><i data-lucide="phone"></i><span>${cfg.phoneDisplay || 'Contact number placeholder'}</span></li>
              <li><i data-lucide="mail"></i><a href="${mailLink}">${cfg.email || 'email placeholder'}</a></li>
              <li><i data-lucide="map-pin"></i><span>${cfg.address || 'Delivery areas to be confirmed'}</span></li>
              <li><i data-lucide="clock"></i><span>${cfg.hours || 'Hours to be confirmed'}</span></li>
            </ul>
          </div>
        </div>
        <div class="footer__bottom">
          <span>&copy; ${new Date().getFullYear()} Aquatel Technologies. All rights reserved. Pricing, certifications & delivery areas to be confirmed.</span>
          <span>Designed for purified water delivery, refill and bottled supply.</span>
        </div>
      </div>`;
    document.body.appendChild(f);
  }

  /* ---------- Floating UI: WhatsApp + back-to-top ---------- */
  function buildFloatingUI() {
    const wa = document.createElement("a");
    wa.className = "float-whatsapp";
    wa.href = waLink;
    wa.target = "_blank";
    wa.rel = "noopener";
    wa.setAttribute("aria-label", "Order on WhatsApp");
    wa.innerHTML = `<i data-lucide="message-circle"></i>`;

    const top = document.createElement("button");
    top.className = "back-top";
    top.id = "backTop";
    top.setAttribute("aria-label", "Back to top");
    top.innerHTML = `<i data-lucide="arrow-up"></i>`;

    document.body.append(wa, top);

    top.addEventListener("click", () => window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" }));
  }

  /* ---------- Theme toggle ---------- */
  function initTheme() {
    const saved = localStorage.getItem("aquatel-theme");
    if (saved === "dark") document.documentElement.setAttribute("data-theme", "dark");
    const btn = document.getElementById("themeToggle");
    const sync = () => {
      const dark = document.documentElement.getAttribute("data-theme") === "dark";
      btn.innerHTML = `<i data-lucide="${dark ? "sun" : "moon"}"></i>`;
      if (window.lucide) lucide.createIcons();
    };
    sync();
    btn.addEventListener("click", () => {
      const dark = document.documentElement.getAttribute("data-theme") === "dark";
      if (dark) { document.documentElement.removeAttribute("data-theme"); localStorage.setItem("aquatel-theme", "light"); }
      else { document.documentElement.setAttribute("data-theme", "dark"); localStorage.setItem("aquatel-theme", "dark"); }
      sync();
    });
  }

  /* ---------- Mobile menu ---------- */
  function initMobileMenu() {
    const burger = document.getElementById("navBurger");
    const panel = document.getElementById("mobilePanel");
    const overlay = document.getElementById("navOverlay");
    const close = () => { burger.classList.remove("open"); panel.classList.remove("open"); overlay.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); document.body.style.overflow = ""; };
    const open = () => { burger.classList.add("open"); panel.classList.add("open"); overlay.classList.add("open"); burger.setAttribute("aria-expanded", "true"); document.body.style.overflow = "hidden"; };
    burger.addEventListener("click", () => burger.classList.contains("open") ? close() : open());
    overlay.addEventListener("click", close);
    panel.querySelectorAll("a").forEach(a => a.addEventListener("click", close));
    document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
  }

  /* ---------- Nav scroll state + back-to-top visibility ---------- */
  function initScrollState() {
    const nav = document.querySelector(".nav");
    const top = document.getElementById("backTop");
    const bar = document.createElement("div");
    bar.className = "scroll-progress";
    document.body.appendChild(bar);
    const onScroll = () => {
      const y = window.scrollY;
      nav.classList.toggle("scrolled", y > 30);
      top.classList.toggle("show", y > 500);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  function initReveal() {
    const els = document.querySelectorAll("[data-reveal]");
    if (prefersReduced || !("IntersectionObserver" in window)) {
      els.forEach(el => el.classList.add("in-view"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in-view"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(el => io.observe(el));
  }

  /* ---------- Animated counters ---------- */
  function initCounters() {
    const counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;
    const run = (el) => {
      const target = parseFloat(el.dataset.count);
      const dec = (el.dataset.count.split(".")[1] || "").length;
      const dur = 1400; const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toFixed(dec);
        if (p < 1) requestAnimationFrame(tick); else el.textContent = target.toFixed(dec);
      };
      requestAnimationFrame(tick);
    };
    if (prefersReduced) { counters.forEach(c => c.textContent = c.dataset.count); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.6 });
    counters.forEach(c => io.observe(c));
  }

  /* ---------- FAQ accordion ---------- */
  function initFAQ() {
    document.querySelectorAll(".faq-item").forEach(item => {
      const q = item.querySelector(".faq-q");
      const a = item.querySelector(".faq-a");
      q.setAttribute("aria-expanded", "false");
      q.addEventListener("click", () => {
        const open = item.classList.contains("open");
        item.classList.toggle("open");
        q.setAttribute("aria-expanded", String(!open));
        a.style.maxHeight = open ? null : a.scrollHeight + "px";
      });
    });
  }

  /* ---------- Generic tabs (services / customer types) ---------- */
  function initTabs() {
    document.querySelectorAll("[data-tabs]").forEach(group => {
      const btns = group.querySelectorAll(".tab-btn");
      const panels = group.querySelectorAll(".tab-panel");
      btns.forEach(btn => btn.addEventListener("click", () => {
        btns.forEach(b => b.classList.remove("active"));
        panels.forEach(p => p.classList.remove("active"));
        btn.classList.add("active");
        const panel = group.querySelector("#" + btn.dataset.tab);
        if (panel) panel.classList.add("active");
      }));
    });
  }

  /* ---------- Subscription weekly/monthly toggle ---------- */
  function initPlanToggle() {
    const mount = document.getElementById("plansMount");
    if (!mount || !window.aquatelPlans) return;
    let mode = "weekly";

    const render = () => {
      mount.innerHTML = aquatelPlans.map(p => {
        const d = p[mode];
        return `
        <article class="card card--hover plan-card ${p.featured ? "featured" : ""}" data-reveal data-tilt>
          <span class="plan-tag">${p.tag}</span>
          <h3>${p.name}</h3>
          <p class="muted" style="margin:0">${p.forWho}</p>
          <div class="plan-price">${d.price}<small> / ${mode === "weekly" ? "week" : "month"}</small></div>
          <p class="muted" style="font-size:.85rem;margin:0">${d.litres} &middot; ${d.freq}</p>
          <ul class="features">${p.features.map(f => `<li><i data-lucide="check-circle-2"></i>${f}</li>`).join("")}</ul>
          <a href="contact.html?plan=${p.id}" class="btn ${p.featured ? "btn-primary" : "btn-outline"} btn-block">Request this plan</a>
        </article>`;
      }).join("");
      if (window.lucide) lucide.createIcons();
      initReveal();
      if (window.VanillaTilt) VanillaTilt.init(mount.querySelectorAll("[data-tilt]"), { max: 5, speed: 400, glare: true, "max-glare": 0.15 });
    };

    document.querySelectorAll("[data-plan-mode]").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("[data-plan-mode]").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        mode = btn.dataset.planMode;
        render();
      });
    });
    render();
  }

  /* ---------- tsParticles bubbles in hero ---------- */
  function initParticles() {
    const el = document.getElementById("heroParticles");
    if (!el || !window.tsParticles || prefersReduced) return;
    tsParticles.load({
      id: "heroParticles",
      options: {
        fpsLimit: 60, fullScreen: { enable: false },
        particles: {
          number: { value: 38, density: { enable: true, area: 900 } },
          color: { value: ["#7FE9FF", "#00C2E8", "#ffffff"] },
          opacity: { value: { min: 0.1, max: 0.4 } },
          size: { value: { min: 2, max: 7 } },
          move: { enable: true, direction: "top", speed: { min: 0.4, max: 1.4 }, outModes: { default: "out" } },
          shape: { type: "circle" }
        },
        detectRetina: true
      }
    });
  }

  /* ---------- Cursor-following water glow (desktop only) ---------- */
  function initCursorGlow() {
    if (prefersReduced || window.matchMedia("(pointer: coarse)").matches) return;
    const glow = document.createElement("div");
    glow.className = "cursor-glow";
    document.body.appendChild(glow);
    let raf;
    window.addEventListener("mousemove", (e) => {
      glow.style.opacity = "1";
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => { glow.style.left = e.clientX + "px"; glow.style.top = e.clientY + "px"; });
    });
    window.addEventListener("mouseleave", () => glow.style.opacity = "0");
  }

  /* ---------- Button ripple ---------- */
  function initRipple() {
    document.body.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn");
      if (!btn || prefersReduced) return;
      const r = document.createElement("span");
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      r.className = "ripple";
      r.style.width = r.style.height = size + "px";
      r.style.left = (e.clientX - rect.left - size / 2) + "px";
      r.style.top = (e.clientY - rect.top - size / 2) + "px";
      btn.appendChild(r);
      setTimeout(() => r.remove(), 600);
    });
  }

  /* ---------- Lenis smooth scroll ---------- */
  function initLenis() {
    if (prefersReduced || !window.Lenis) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    window.aquatelLenis = lenis;
    // anchor links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        if (id.length > 1) { const t = document.querySelector(id); if (t) { e.preventDefault(); lenis.scrollTo(t, { offset: -90 }); } }
      });
    });
  }

  /* ---------- Swiper carousels ---------- */
  function initSwiper() {
    if (!window.Swiper) return;
    document.querySelectorAll(".swiper[data-swiper]").forEach(el => {
      new Swiper(el, {
        slidesPerView: 1, spaceBetween: 24, grabCursor: true,
        loop: el.children[0]?.children.length > 2,
        autoplay: prefersReduced ? false : { delay: 4500, disableOnInteraction: false },
        pagination: { el: el.querySelector(".swiper-pagination"), clickable: true },
        navigation: { nextEl: el.querySelector(".swiper-next"), prevEl: el.querySelector(".swiper-prev") },
        breakpoints: { 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
      });
    });
  }

  /* ---------- Page loader fade-out ---------- */
  function hideLoader() {
    const l = document.getElementById("pageLoader");
    if (l) setTimeout(() => l.classList.add("done"), 350);
  }

  /* ---------- Tippy tooltips + VanillaTilt + Lucide ---------- */
  function initEnhancers() {
    try { if (window.lucide) lucide.createIcons(); } catch (e) { console.warn("lucide:", e); }
    try { if (window.VanillaTilt) VanillaTilt.init(document.querySelectorAll("[data-tilt]"), { max: 6, speed: 400, glare: true, "max-glare": 0.18, scale: 1.01 }); } catch (e) { console.warn("tilt:", e); }
    // Bind tooltips after icon re-rendering settles (lucide replaces <i> with
    // <svg> during product/plan rendering, which would drop early instances).
    const bindTips = () => {
      try {
        if (typeof window.tippy !== "function") return;
        const els = Array.from(document.querySelectorAll("[data-tippy-content]")).filter(el => !el._tippy);
        if (els.length) window.tippy(els, { animation: "shift-away", maxWidth: 260 });
      } catch (e) { console.warn("tippy:", e); }
    };
    setTimeout(bindTips, 300);
  }

  /* ---------- Boot ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    buildNav();
    buildFooter();
    buildFloatingUI();
    initTheme();
    initMobileMenu();
    initScrollState();
    initEnhancers();   // icons first so reveal/tilt see them
    initReveal();
    initCounters();
    initFAQ();
    initTabs();
    initPlanToggle();
    initParticles();
    initCursorGlow();
    initRipple();
    initSwiper();
    initLenis();
    hideLoader();
    // expose for other modules
    window.AQUATEL = { waLink, mailLink, refreshIcons: () => window.lucide && lucide.createIcons(), reveal: initReveal };
  });
})();
