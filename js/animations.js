/* ============================================================
   Aquatel Technologies - GSAP Animations
   Hero entrance, scroll-triggered parallax, RO process stepper
   with travelling water droplet. Degrades gracefully if GSAP
   is unavailable or reduced-motion is on.
   ============================================================ */
(function () {
  "use strict";
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.addEventListener("DOMContentLoaded", () => {
    const hasGSAP = !!window.gsap;
    if (hasGSAP && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

    /* ----- Hero entrance ----- */
    if (hasGSAP && !reduced) {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.9 } });
      tl.from(".hero h1", { y: 40, opacity: 0 })
        .from(".hero__sub", { y: 30, opacity: 0 }, "-=0.55")
        .from(".hero__cta .btn", { y: 24, opacity: 0, stagger: 0.1 }, "-=0.5")
        .from(".hero__stat", { y: 20, opacity: 0, stagger: 0.08 }, "-=0.4")
        .from(".hero__bottle", { y: 60, opacity: 0, scale: 0.92, duration: 1.1 }, "-=1");

      // gentle bottle float driven by GSAP (CSS fallback also exists)
      gsap.to(".hero__bottle", { y: -18, duration: 3.4, repeat: -1, yoyo: true, ease: "sine.inOut" });

      // parallax decorative waves on scroll
      gsap.utils.toArray("[data-parallax]").forEach(el => {
        gsap.to(el, {
          yPercent: parseFloat(el.dataset.parallax) || -15,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true }
        });
      });
    }

    /* ----- RO Process stepper ----- */
    initProcessStepper(hasGSAP);
  });

  function initProcessStepper(hasGSAP) {
    const steps = Array.from(document.querySelectorAll(".process-step"));
    const droplet = document.getElementById("flowDroplet");
    const path = document.getElementById("flowPath");
    if (!steps.length) return;

    let length = 0;
    if (path && path.getTotalLength) length = path.getTotalLength();

    const setActive = (idx) => {
      steps.forEach((s, i) => s.classList.toggle("active", i === idx));
      // move droplet along the pipe
      if (droplet && length) {
        const t = steps.length > 1 ? idx / (steps.length - 1) : 0;
        const pt = path.getPointAtLength(length * t);
        if (hasGSAP && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          gsap.to(droplet, { attr: { cx: pt.x, cy: pt.y }, duration: 0.7, ease: "power2.inOut" });
        } else {
          droplet.setAttribute("cx", pt.x); droplet.setAttribute("cy", pt.y);
        }
      }
    };

    steps.forEach((s, i) => s.addEventListener("click", () => setActive(i)));
    setActive(0);

    // auto-advance when section is on screen (paused on hover)
    let auto = true, idx = 0;
    const wrap = document.querySelector(".process-steps");
    if (wrap) { wrap.addEventListener("mouseenter", () => auto = false); wrap.addEventListener("mouseleave", () => auto = true); }
    setInterval(() => { if (auto && document.visibilityState === "visible") { idx = (idx + 1) % steps.length; setActive(idx); } }, 3800);
  }
})();
