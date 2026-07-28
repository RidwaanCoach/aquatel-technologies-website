/* ============================================================
   Aquatel Technologies - Forms, Calculator & Plan Recommender
   Validates enquiry forms, shows SweetAlert2 confirmation,
   stores enquiries in localStorage (demo), and offers WhatsApp
   + mailto fallbacks. Also powers the water usage calculator.
   ============================================================ */
(function () {
  "use strict";
  const STORE = "aquatel-enquiries";
  const cfg = window.AQUATEL_CONFIG || {};

  /* ---------- Validation helpers ---------- */
  const validators = {
    required: v => v.trim().length > 0,
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    phone: v => /^[0-9+\s()-]{7,}$/.test(v)
  };

  function validateField(field) {
    const input = field.querySelector("input, select, textarea");
    if (!input) return true;
    let ok = true;
    if (input.hasAttribute("required")) ok = validators.required(input.value);
    if (ok && input.type === "email" && input.value) ok = validators.email(input.value);
    if (ok && input.dataset.validate === "phone" && input.value) ok = validators.phone(input.value);
    field.classList.toggle("invalid", !ok);
    return ok;
  }

  /* ---------- Enquiry forms (contact + index lead) ---------- */
  function initForms() {
    document.querySelectorAll("form[data-enquiry]").forEach(form => {
      // Honeypot: hidden field real users never see/fill; bots usually do.
      const hp = document.createElement("input");
      hp.type = "text"; hp.name = "company"; hp.tabIndex = -1;
      hp.autocomplete = "off"; hp.setAttribute("aria-hidden", "true");
      hp.style.cssText = "position:absolute;left:-9999px;width:1px;height:1px;opacity:0;pointer-events:none";
      form.prepend(hp);

      form.querySelectorAll(".field input, .field select, .field textarea").forEach(inp => {
        inp.addEventListener("blur", () => validateField(inp.closest(".field")));
      });

      form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Spam bot tripped the honeypot - silently drop.
        if (hp.value) { form.reset(); return; }
        const fields = Array.from(form.querySelectorAll(".field"));
        let valid = true; let firstBad = null;
        fields.forEach(f => { const ok = validateField(f); if (!ok && !firstBad) firstBad = f; if (!ok) valid = false; });

        if (!valid) {
          if (firstBad) firstBad.querySelector("input, select, textarea").focus();
          if (window.Swal) Swal.fire({ icon: "error", title: "Please check the form", text: "A few fields need your attention before we can send this.", confirmButtonColor: "#0057D9" });
          return;
        }

        const data = Object.fromEntries(new FormData(form).entries());
        data.submittedAt = new Date().toISOString();

        // store demo enquiry
        const all = JSON.parse(localStorage.getItem(STORE) || "[]");
        all.push(data); localStorage.setItem(STORE, JSON.stringify(all));

        const waMsg = buildEnquiryMessage(data);
        const waUrl = "https://wa.me/" + cfg.whatsappNumber + "?text=" + encodeURIComponent(waMsg);
        const mailUrl = "mailto:" + cfg.email + "?subject=" + encodeURIComponent("Aquatel enquiry from " + (data.name || "website")) + "&body=" + encodeURIComponent(waMsg);

        if (window.Swal) {
          Swal.fire({
            icon: "success",
            title: "Enquiry received",
            html: `<p style="margin:0 0 12px">Thanks ${data.name ? data.name.split(" ")[0] : "there"} - your enquiry is saved. Send it through now:</p>
                   <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center">
                     <a class="btn btn-whatsapp btn-sm" href="${waUrl}" target="_blank" rel="noopener">WhatsApp</a>
                     <a class="btn btn-outline btn-sm" href="${mailUrl}">Email</a>
                   </div>
                   <p style="font-size:.78rem;color:#5B6B84;margin:14px 0 0">Demo: stored locally in your browser. No data leaves this device until you send it.</p>`,
            showConfirmButton: true, confirmButtonText: "Done", confirmButtonColor: "#0057D9"
          });
        }
        form.reset();
        form.querySelectorAll(".field").forEach(f => f.classList.remove("invalid"));
      });
    });

    // Pre-select plan from ?plan= in URL on contact page
    const plan = new URLSearchParams(location.search).get("plan");
    if (plan) {
      const sel = document.querySelector('[name="interest"]');
      if (sel) { const opt = Array.from(sel.options).find(o => o.value.toLowerCase().includes(plan.split("-")[0])); if (opt) sel.value = opt.value; }
    }
  }

  function buildEnquiryMessage(d) {
    return [
      "Aquatel Technologies enquiry",
      "----------------------------",
      d.name ? "Name: " + d.name : "",
      d.phone ? "Phone: " + d.phone : "",
      d.email ? "Email: " + d.email : "",
      d.customerType ? "Customer type: " + d.customerType : "",
      d.interest ? "Interested in: " + d.interest : "",
      d.area ? "Delivery area: " + d.area : "",
      d.message ? "Message: " + d.message : ""
    ].filter(Boolean).join("\n");
  }

  /* ---------- Water usage calculator ---------- */
  function initCalculator() {
    const form = document.getElementById("calcForm");
    if (!form) return;
    const out = {
      week: document.getElementById("calcWeek"),
      product: document.getElementById("calcProduct"),
      plan: document.getElementById("calcPlan"),
      month: document.getElementById("calcMonth")
    };

    const compute = () => {
      const people = +form.people.value || 1;
      const perPerson = +form.perPerson.value || 2; // litres/person/day
      const freq = form.frequency.value;            // weekly / biweekly / monthly
      const ctype = form.context.value;

      const perDay = people * perPerson;
      const perWeek = perDay * 7;
      const perMonth = perDay * 30;

      // recommend product size
      let product = "5L Purified Water";
      if (perWeek > 600) product = "Bulk Office Supply";
      else if (perWeek > 180) product = "20L Refill";
      else if (perWeek > 70) product = "10L Refill";
      else if (perWeek > 30) product = "5L Purified Water";
      else product = "1.5L Purified Water";

      // recommend plan
      let plan = "Home Starter";
      if (ctype === "Office" || ctype === "Business" || perWeek > 200) plan = "Office Flow";
      if (perWeek > 600 || ctype === "Event") plan = "Bulk Supply";

      out.week.textContent = Math.round(perWeek);
      out.product.textContent = product;
      out.plan.textContent = plan + " (" + freq + ")";
      out.month.textContent = Math.round(perMonth) + "L";
    };

    form.addEventListener("input", compute);
    form.addEventListener("submit", (e) => { e.preventDefault(); compute(); });
    compute();

    const reqBtn = document.getElementById("calcRequest");
    if (reqBtn) reqBtn.addEventListener("click", () => {
      const msg = "Hi Aquatel, based on your calculator I'd like the " + out.plan.textContent +
        " plan - about " + out.week.textContent + "L/week (" + out.product.textContent + ").";
      window.open("https://wa.me/" + cfg.whatsappNumber + "?text=" + encodeURIComponent(msg), "_blank");
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initForms();
    initCalculator();
  });
})();
