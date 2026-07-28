/* ============================================================
   Aquatel Technologies - Water Quality Widget
   Chart.js radar comparison (tap vs Aquatel RO) + animated
   metric bars. Uses illustrative DEMO data only.
   ============================================================ */
(function () {
  "use strict";
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function themeColors() {
    const cs = getComputedStyle(document.documentElement);
    return {
      grid: cs.getPropertyValue("--border").trim() || "rgba(0,0,0,.1)",
      text: cs.getPropertyValue("--text-muted").trim() || "#5B6B84",
      aqua: cs.getPropertyValue("--aqua").trim() || "#00C2E8",
      deep: cs.getPropertyValue("--deep-blue").trim() || "#0057D9"
    };
  }

  let chart;
  function buildChart() {
    const canvas = document.getElementById("qualityChart");
    if (!canvas || !window.Chart || !window.waterQualityDemo) return;
    const c = themeColors();
    const data = window.waterQualityDemo;

    chart = new Chart(canvas, {
      type: "radar",
      data: {
        labels: data.labels,
        datasets: [
          { label: "Ordinary Tap Water", data: data.tapWater, borderColor: "#9aa7bd", backgroundColor: "rgba(154,167,189,.18)", borderWidth: 2, pointBackgroundColor: "#9aa7bd" },
          { label: "Aquatel RO Purified", data: data.aquatelWater, borderColor: c.aqua, backgroundColor: "rgba(0,194,232,.22)", borderWidth: 2, pointBackgroundColor: c.deep }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: true,
        animation: reduced ? false : { duration: 1100 },
        plugins: {
          legend: { position: "bottom", labels: { color: c.text, font: { family: "Inter", size: 13 }, padding: 16, usePointStyle: true } },
          tooltip: { callbacks: { label: (ctx) => `${ctx.dataset.label}: ${ctx.raw}/100 (demo)` } }
        },
        scales: {
          r: {
            min: 0, max: 100,
            grid: { color: c.grid }, angleLines: { color: c.grid },
            pointLabels: { color: c.text, font: { family: "Sora", size: 12, weight: "600" } },
            ticks: { display: false, stepSize: 25 }
          }
        }
      }
    });
  }

  /* Animated comparison bars (data-bar="value" on .bar-fill) */
  function animateBars() {
    const bars = document.querySelectorAll(".bar-fill[data-bar]");
    if (!bars.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.style.width = e.target.dataset.bar + "%"; io.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    bars.forEach(b => reduced ? (b.style.width = b.dataset.bar + "%") : io.observe(b));
  }

  /* Recolour chart when theme toggles */
  function watchTheme() {
    const obs = new MutationObserver(() => { if (chart) { chart.destroy(); buildChart(); } });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  }

  document.addEventListener("DOMContentLoaded", () => {
    buildChart();
    animateBars();
    watchTheme();
  });
})();
