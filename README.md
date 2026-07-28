# Aquatel Technologies - Website

A premium, design-forward static website for **Aquatel Technologies**, a reverse osmosis purified water brand (bottled water, refills, and bulk supply for homes, offices, gyms, events and businesses).

**Theme:** Pure water. Refined by science. Delivered for everyday life.

Built with plain **HTML5 + CSS3 + vanilla JavaScript** and free CDN libraries. No build step, no backend - just open `index.html`.

---

## Project overview

- 8 fully-built pages with a shared, JS-injected navigation and footer (edit once, applies everywhere).
- Custom glassmorphism design system in CSS variables (navy / deep blue / aqua / cyan).
- Interactive features: RO process stepper, product enquiry cart (localStorage), water usage calculator, subscription toggle, water-quality radar chart, FAQ accordion, service tabs, tooltips, form validation + SweetAlert confirmation, dark/light mode, smooth scroll, particles, and more.
- Mobile-first, responsive, accessible (skip link, focus states, ARIA, reduced-motion support), SEO-friendly (unique titles, meta, Open Graph, JSON-LD schema).

---

## Folder structure

```
aquatel-technologies-website/
├── index.html            # Flagship landing page (all sections A-L)
├── about.html            # Brand story, mission, vision, values, timeline
├── products.html         # Catalogue + filters + enquiry cart
├── services.html         # Services + customer-type tabs
├── process.html          # 6-stage RO process explained
├── quality.html          # TDS/pH/purity, comparison chart, report placeholder
├── subscriptions.html    # Plans + toggle + comparison table + recommender
├── contact.html          # Enquiry form + WhatsApp/email + map placeholder
├── 404.html              # Branded not-found page
├── robots.txt            # Crawler rules (update domain before launch)
├── sitemap.xml           # XML sitemap (update domain before launch)
├── site.webmanifest      # PWA manifest placeholder
│
├── assets/
│   ├── images/           # bottle renders: bottle-330ml/500ml/750ml/1-5l/5l.png
│   ├── brand/            # Logo Design.png + cropped logo-horizontal.png, logo-icon.png, logo-icon-trans.png
│   ├── labels/           # print labels: label-generic-front.png, label-330ml ... label-5l.png
│   ├── icons/            # favicon.svg
│   ├── lottie/           # (optional Lottie JSON; CSS/SVG fallbacks used by default)
│   └── mockups/          # (optional app mockup)
│
├── css/
│   ├── style.css         # Design system + all components
│   ├── responsive.css    # Breakpoints (1024 / 768 / 560 / 380)
│   └── animations.css    # Keyframes, scroll-reveal, reduced-motion
│
├── js/
│   ├── products-data.js  # EDIT ME: products, plans, contact config, demo data
│   ├── main.js           # Nav/footer injection + global interactions
│   ├── animations.js     # GSAP hero + RO process stepper
│   ├── product-configurator.js  # Product cards, quick-view modal, enquiry cart
│   ├── water-quality-widget.js  # Chart.js radar + animated bars
│   └── form-handler.js   # Form validation, SweetAlert, calculator, recommender
│
└── README.md
```

---

## How to run the site

1. Download / clone the folder.
2. Open `index.html` directly in any modern browser, **or** serve it locally for best results (some browsers restrict `fetch`/modules on `file://`, though this site avoids those):

   ```bash
   # any one of these from inside the project folder
   npx serve .
   python -m http.server 8000
   ```
3. Visit `http://localhost:8000` (if using a server).

No installation or build step is required.

---

## How to edit common things

All quick edits live in **`js/products-data.js`**.

### Products
Edit the `aquatelProducts` array - change `name`, `type`, `sizeLitres`, `customerTypes`, `description`, `useCase`, `image`, and `price`. Cards, filters, the quick-view modal, and the enquiry cart all update automatically. The 5 bottled-water SKUs (330ml, 500ml, 750ml, 1.5L, 5L) use the real product renders in `assets/images/`; the refill/bulk items have no `image` and fall back to an abstract SVG.

### Brand assets
The logo lives in `assets/brand/`. `logo-icon-trans.png` (transparent droplet) is used in the nav/footer next to the CSS wordmark; `logo-horizontal.png` is the full lockup used on the About page and as the Open Graph image. Both were cropped from your `Logo Design.png` sheet - re-crop from there if you need different proportions.

### Subscription plans
Edit the `aquatelPlans` array - update `name`, `forWho`, `features`, and the `weekly` / `monthly` figures.

### Contact details (WhatsApp, email, phone, hours, social)
Edit the `AQUATEL_CONFIG` object:

```js
const AQUATEL_CONFIG = {
  whatsappNumber: "27000000000",   // intl format, no + or spaces
  email: "hello@aquatel-placeholder.co.za",
  phoneDisplay: "Contact number placeholder",
  address: "Delivery areas to be confirmed",
  hours: "Mon - Sat, business hours (to be confirmed)",
  currency: "R",
  social: { facebook: "#", instagram: "#", linkedin: "#", x: "#" }
};
```

These feed the footer, floating WhatsApp button, contact page, and all enquiry messages.

### Colours / theme
Edit the CSS variables at the top of **`css/style.css`** under `:root` (and `[data-theme="dark"]` for dark mode). Changing a few variables re-themes the whole site.

### Demo water-quality numbers
Edit `waterQualityDemo` in `js/products-data.js` (clearly illustrative, not lab data).

---

## CDN libraries used

All loaded from jsDelivr (free, public), deferred for performance:

| Library | Purpose |
|---|---|
| Google Fonts (Sora, Inter, Manrope) | Typography |
| Lucide Icons | Line icons |
| GSAP + ScrollTrigger | Hero motion, parallax, process droplet |
| Lenis | Smooth scrolling |
| Swiper.js | Testimonial carousel |
| tsParticles | Hero bubble particles |
| Chart.js | Water-quality radar chart |
| VanillaTilt.js | Subtle card tilt |
| Tippy.js (+ Popper) | Tooltips for TDS/pH/RO terms |
| SweetAlert2 | Form confirmation modals |

> Note on AOS/ScrollReveal: deliberately **not** included - scroll reveals use a lightweight custom `IntersectionObserver` (`[data-reveal]`) to avoid duplicating GSAP. Lottie is optional; CSS/SVG animations are used as the default so the site works offline-friendly.

---

## Notes on demo data

- All pricing shows **"Pricing TBC" / "Custom Quote"** and placeholder `RXX` values - intentionally configurable.
- The water-quality chart and metric bars use **illustrative demo data only**, clearly labelled as not lab results.
- The enquiry cart and contact forms store data in **localStorage** only (a front-end demo). Nothing is sent anywhere until the user chooses WhatsApp or email.

---

## Deployment options

This is a static site, so deployment is simple:

- **Netlify** - drag-and-drop the folder onto the Netlify dashboard, or connect the repo. Publish directory: project root.
- **Vercel** - `vercel` from the project folder, or import the repo (Framework preset: "Other").
- **GitHub Pages** - push to a repo, then Settings → Pages → deploy from branch (root).
- **cPanel / shared hosting** - upload the folder contents to `public_html` via File Manager or FTP.

No environment variables or build commands needed.

---

## Placeholders to replace before launch

- [ ] **WhatsApp number** (`AQUATEL_CONFIG.whatsappNumber`) - currently `27000000000`
- [ ] **Email** (`AQUATEL_CONFIG.email`)
- [ ] **Phone number** display
- [ ] **Delivery areas / address**
- [ ] **Business hours**
- [ ] **Social media links** (`AQUATEL_CONFIG.social`)
- [ ] **Product pricing** in `aquatelProducts` and `aquatelPlans`
- [ ] **Water quality report** download (quality.html) - currently a placeholder modal
- [ ] **Certification details** - only display once confirmed
- [ ] **Embedded delivery map** (contact.html) - replace the placeholder block
- [ ] **Testimonials** - replace placeholder quotes with real ones (with permission)
- [ ] **Domain** - replace `https://www.aquatel-placeholder.co.za` in `robots.txt` and `sitemap.xml` with the real domain
- [ ] **Refill/bulk product photos** (optional) - 10L, 20L and Bulk Office Supply currently use an abstract SVG; add an `image:` in `js/products-data.js` if/when renders exist

---

## Accessibility & performance

- Respects `prefers-reduced-motion` (disables heavy motion/particles).
- Keyboard navigable with visible focus states and a skip link.
- Semantic HTML, ARIA labels on icon-only controls, labelled form fields with inline validation.
- Lightweight inline SVG illustrations (no heavy images), deferred scripts, lazy reveals.

---

&copy; Aquatel Technologies. Designed for purified water delivery, refill and bottled supply. Pricing, certifications and delivery areas to be confirmed.
