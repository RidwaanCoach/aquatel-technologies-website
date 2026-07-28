/* ============================================================
   Aquatel Technologies - Product Configurator & Enquiry Cart
   Renders product cards, quick-view modal, and a localStorage
   enquiry cart (no payment gateway). Powers index preview and
   the full products.html catalogue with filters.
   ============================================================ */
(function () {
  "use strict";
  const CART_KEY = "aquatel-enquiry-cart";

  /* ----- Abstract SVG product art per type ----- */
  function art(type, size) {
    const tall = type === "Refill" || size >= 5;
    if (type === "Bulk Supply") {
      return `<svg viewBox="0 0 120 150" fill="none" aria-hidden="true">
        <defs><linearGradient id="bg1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#DDF8FF"/><stop offset="1" stop-color="#00C2E8"/></linearGradient></defs>
        <rect x="20" y="60" width="34" height="80" rx="8" fill="url(#bg1)" opacity=".9"/>
        <rect x="60" y="40" width="40" height="100" rx="10" fill="url(#bg1)"/>
        <rect x="68" y="20" width="24" height="24" rx="6" fill="#0057D9"/>
        <circle cx="80" cy="80" r="12" fill="#fff" opacity=".5"/>
      </svg>`;
    }
    if (tall) {
      return `<svg viewBox="0 0 90 150" fill="none" aria-hidden="true">
        <defs><linearGradient id="bg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#DDF8FF"/><stop offset="1" stop-color="#00C2E8"/></linearGradient></defs>
        <rect x="36" y="6" width="18" height="20" rx="4" fill="#0057D9"/>
        <path d="M22 40c0-8 6-14 14-14h18c8 0 14 6 14 14v92c0 8-6 14-14 14H36c-8 0-14-6-14-14V40Z" fill="url(#bg2)"/>
        <rect x="30" y="62" width="30" height="40" rx="6" fill="#fff" opacity=".55"/>
        <circle cx="58" cy="118" r="7" fill="#fff" opacity=".45"/>
      </svg>`;
    }
    return `<svg viewBox="0 0 70 150" fill="none" aria-hidden="true">
      <defs><linearGradient id="bg3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#DDF8FF"/><stop offset="1" stop-color="#00C2E8"/></linearGradient></defs>
      <rect x="28" y="4" width="14" height="16" rx="3" fill="#0057D9"/>
      <path d="M20 34c0-6 4-12 10-14h10c6 2 10 8 10 14v96c0 7-5 12-12 12H32c-7 0-12-5-12-12V34Z" fill="url(#bg3)"/>
      <rect x="26" y="54" width="18" height="34" rx="4" fill="#fff" opacity=".55"/>
    </svg>`;
  }

  /* ----- Cart helpers ----- */
  const getCart = () => { try { return JSON.parse(localStorage.getItem(CART_KEY)) || {}; } catch { return {}; } };
  const setCart = (c) => localStorage.setItem(CART_KEY, JSON.stringify(c));

  function addToCart(id, qty = 1) {
    const cart = getCart();
    cart[id] = (cart[id] || 0) + qty;
    setCart(cart);
    renderCartBar();
    toast(`${productById(id).name} added to your enquiry`);
  }
  function setQty(id, qty) {
    const cart = getCart();
    if (qty <= 0) delete cart[id]; else cart[id] = qty;
    setCart(cart);
    renderCartBar();
    renderProductsPage();
  }
  const productById = (id) => aquatelProducts.find(p => p.id === id);

  function cartTotals() {
    const cart = getCart();
    let items = 0, litres = 0;
    Object.entries(cart).forEach(([id, q]) => {
      const p = productById(id); if (!p) return;
      items += q; litres += p.sizeLitres * q;
    });
    return { items, litres, cart };
  }

  function toast(msg) {
    if (window.Swal) {
      Swal.fire({ toast: true, position: "top-end", icon: "success", title: msg, showConfirmButton: false, timer: 2200, timerProgressBar: true });
    }
  }

  /* ----- Product visual: real photo when available, else SVG ----- */
  function visual(p, cls) {
    if (p.image) return `<img src="${p.image}" alt="${p.name} - reverse osmosis purified water" class="${cls || ""}" loading="lazy" decoding="async">`;
    return art(p.type, p.sizeLitres);
  }

  /* ----- Card markup ----- */
  function cardHTML(p, withQty) {
    const cart = getCart();
    const qty = cart[p.id] || 0;
    return `
    <article class="card card--hover product-card${p.image ? " has-photo" : ""}" data-reveal data-tilt data-product="${p.id}">
      <span class="badge">${p.type}</span>
      <div class="product-art">${visual(p, "product-photo")}</div>
      <span class="product-type">${p.sizeLitres}L</span>
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <div class="use-case">${p.useCase || ""}</div>
      <div class="price">${p.price === "Pricing TBC" || p.price === "Custom Quote" ? "From " + AQUATEL_CONFIG.currency + "XX" : p.price}<small>${p.price}</small></div>
      ${withQty && qty > 0 ? `
        <div class="qty" style="margin:0 auto 12px">
          <button data-dec="${p.id}" aria-label="Decrease">-</button>
          <input type="number" value="${qty}" min="0" data-qty="${p.id}" aria-label="Quantity">
          <button data-inc="${p.id}" aria-label="Increase">+</button>
        </div>` : ""}
      <div class="flex-cta" style="justify-content:center;width:100%">
        <button class="btn btn-ghost btn-sm" data-view="${p.id}"><i data-lucide="eye"></i>Quick view</button>
        <button class="btn btn-primary btn-sm" data-add="${p.id}"><i data-lucide="plus"></i>Add</button>
      </div>
    </article>`;
  }

  /* ----- Index preview grid ----- */
  function renderPreview() {
    const mount = document.getElementById("productPreview");
    if (!mount) return;
    mount.innerHTML = aquatelProducts.map(p => cardHTML(p, false)).join("");
    afterRender(mount);
  }

  /* ----- Full products page w/ filters ----- */
  function renderProductsPage() {
    const mount = document.getElementById("productGrid");
    if (!mount) return;
    const typeF = document.getElementById("filterType")?.value || "all";
    const custF = document.getElementById("filterCustomer")?.value || "all";
    const list = aquatelProducts.filter(p =>
      (typeF === "all" || p.type === typeF) &&
      (custF === "all" || p.customerTypes.includes(custF)));
    mount.innerHTML = list.length
      ? list.map(p => cardHTML(p, true)).join("")
      : `<p class="muted center" style="grid-column:1/-1">No products match these filters.</p>`;
    afterRender(mount);
  }

  function afterRender(mount) {
    if (window.lucide) lucide.createIcons();
    if (window.AQUATEL) window.AQUATEL.reveal();
    if (window.VanillaTilt) VanillaTilt.init(mount.querySelectorAll("[data-tilt]"), { max: 5, speed: 400, glare: true, "max-glare": 0.12 });
  }

  /* ----- Quick-view modal ----- */
  function buildModal() {
    if (document.getElementById("pvModal")) return;
    const o = document.createElement("div");
    o.className = "modal-overlay"; o.id = "pvModal";
    o.innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-labelledby="pvTitle">
      <button class="modal-close" id="pvClose" aria-label="Close"><i data-lucide="x"></i></button>
      <div id="pvBody"></div></div>`;
    document.body.appendChild(o);
    o.addEventListener("click", e => { if (e.target === o) closeModal(); });
    o.querySelector("#pvClose").addEventListener("click", closeModal);
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
  }
  function openModal(id) {
    buildModal();
    const p = productById(id);
    const body = document.getElementById("pvBody");
    body.innerHTML = `
      <span class="badge">${p.type}</span>
      <div class="product-art" style="height:240px;margin:12px 0">${visual(p, "product-photo-lg")}</div>
      <h2 id="pvTitle" style="margin-bottom:6px">${p.name}</h2>
      <p class="muted">${p.description}</p>
      <ul class="value-list" style="margin:16px 0">
        <li><i data-lucide="droplet"></i><span>Volume: <b>${p.sizeLitres}L</b></span></li>
        <li><i data-lucide="users"></i><span>Ideal for: ${p.customerTypes.join(", ")}</span></li>
        <li><i data-lucide="tag"></i><span>Price: <b>${p.price}</b> <small class="muted">(configurable)</small></span></li>
      </ul>
      <div class="flex-cta">
        <button class="btn btn-primary" data-add="${p.id}"><i data-lucide="plus"></i>Add to enquiry</button>
        <a class="btn btn-whatsapp" href="https://wa.me/${AQUATEL_CONFIG.whatsappNumber}?text=${encodeURIComponent("Hi Aquatel, I'm interested in " + p.name)}" target="_blank" rel="noopener"><i data-lucide="message-circle"></i>Ask on WhatsApp</a>
      </div>`;
    if (window.lucide) lucide.createIcons();
    document.getElementById("pvModal").classList.add("open");
  }
  function closeModal() { const m = document.getElementById("pvModal"); if (m) m.classList.remove("open"); }

  /* ----- Floating enquiry cart bar (products page) ----- */
  function buildCartBar() {
    if (!document.getElementById("productGrid") || document.getElementById("cartBar")) return;
    const bar = document.createElement("div");
    bar.className = "cart-bar"; bar.id = "cartBar";
    bar.innerHTML = `<div class="container">
      <div class="cart-summary">Enquiry: <span id="cartItems">0</span> items &middot; <span id="cartLitres">0</span>L total</div>
      <div class="flex-cta">
        <button class="btn btn-ghost btn-sm" id="cartExport"><i data-lucide="file-text"></i>Export summary</button>
        <button class="btn btn-ghost btn-sm" id="cartClear"><i data-lucide="trash-2"></i>Clear</button>
        <a class="btn btn-whatsapp btn-sm" id="cartWhats" target="_blank" rel="noopener"><i data-lucide="message-circle"></i>Send via WhatsApp</a>
      </div></div>`;
    document.body.appendChild(bar);
    document.getElementById("cartClear").addEventListener("click", () => { setCart({}); renderCartBar(); renderProductsPage(); });
    document.getElementById("cartExport").addEventListener("click", exportSummary);
  }

  function summaryText() {
    const { cart, litres } = cartTotals();
    let lines = ["Aquatel Technologies - Enquiry Summary", "-------------------------------------"];
    Object.entries(cart).forEach(([id, q]) => { const p = productById(id); if (p) lines.push(`${q} x ${p.name} (${p.sizeLitres}L each)`); });
    lines.push("-------------------------------------", `Total volume: ${litres}L`, "Pricing to be confirmed by Aquatel.");
    return lines.join("\n");
  }

  function exportSummary() {
    const text = summaryText();
    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "aquatel-enquiry.txt"; a.click();
    URL.revokeObjectURL(a.href);
    toast("Enquiry summary downloaded");
  }

  function renderCartBar() {
    const bar = document.getElementById("cartBar");
    if (!bar) return;
    const { items, litres } = cartTotals();
    bar.classList.toggle("show", items > 0);
    document.getElementById("cartItems").textContent = items;
    document.getElementById("cartLitres").textContent = +litres.toFixed(1);
    const wa = document.getElementById("cartWhats");
    wa.href = "https://wa.me/" + AQUATEL_CONFIG.whatsappNumber + "?text=" + encodeURIComponent(summaryText());
  }

  /* ----- Delegated events ----- */
  function bindEvents() {
    document.body.addEventListener("click", (e) => {
      const add = e.target.closest("[data-add]");
      const view = e.target.closest("[data-view]");
      const inc = e.target.closest("[data-inc]");
      const dec = e.target.closest("[data-dec]");
      if (add) addToCart(add.dataset.add);
      if (view) openModal(view.dataset.view);
      if (inc) setQty(inc.dataset.inc, (getCart()[inc.dataset.inc] || 0) + 1);
      if (dec) setQty(dec.dataset.dec, (getCart()[dec.dataset.dec] || 0) - 1);
    });
    document.body.addEventListener("change", (e) => {
      const q = e.target.closest("[data-qty]");
      if (q) setQty(q.dataset.qty, parseInt(q.value, 10) || 0);
    });
    ["filterType", "filterCustomer"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("change", renderProductsPage);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (!window.aquatelProducts) return;
    renderPreview();
    renderProductsPage();
    buildCartBar();
    renderCartBar();
    bindEvents();
  });
})();
